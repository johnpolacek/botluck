import type { NextApiRequest, NextApiResponse } from "next"
import {
  OpenChatGPTStream,
  type ChatGPTStreamPayload,
  type Message,
} from "../../utils/OpenAIStream"
import {
  checkAndRecordRateLimit,
  MAX_GENERATION_TOKENS,
  MAX_PROMPT_CHARACTERS,
  reserveTokenUsage,
} from "../../lib/firebase/admin"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16kb",
    },
  },
}

const getClientIp = (req: NextApiRequest) => {
  const forwardedFor = req.headers["x-forwarded-for"]
  const forwardedValue = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor

  return (
    forwardedValue?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"]?.toString() ||
    req.socket.remoteAddress ||
    "unknown"
  )
}

const estimateInputTokens = ({
  prompt,
  messages,
}: {
  prompt?: string
  messages?: Message[]
}) => {
  const inputCharacters =
    messages?.reduce((total, message) => total + message.content.length, 0) ||
    prompt?.length ||
    0

  return Math.ceil(inputCharacters / 4)
}

const writeStreamToResponse = async (
  stream: ReadableStream<Uint8Array>,
  res: NextApiResponse
) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  })

  const reader = stream.getReader()

  try {
    while (true) {
      const { value, done } = await reader.read()

      if (done) {
        break
      }

      if (value) {
        res.write(Buffer.from(value))
      }
    }
  } finally {
    res.end()
    reader.releaseLock()
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { prompt, tokens, messages } = req.body as {
      prompt?: string
      tokens?: number
      messages?: Message[]
    }

    if (!prompt && !messages?.length) {
      return res
        .status(400)
        .json({ message: "No prompt or messages in the request" })
    }

    const inputCharacters =
      messages?.reduce((total, message) => total + message.content.length, 0) ||
      prompt?.length ||
      0

    if (inputCharacters > MAX_PROMPT_CHARACTERS) {
      return res.status(400).json({ message: "Prompt is too long" })
    }

    const rateLimit = await checkAndRecordRateLimit(getClientIp(req))

    if (!rateLimit.allowed) {
      return res.status(429).json({ message: "Too many requests" })
    }

    const maxTokens = Math.min(
      Math.max(1, Math.ceil(Number(tokens) || MAX_GENERATION_TOKENS)),
      MAX_GENERATION_TOKENS
    )
    const estimatedTokens =
      estimateInputTokens({ prompt, messages }) + maxTokens
    const tokenReservation = await reserveTokenUsage(estimatedTokens)

    if (!tokenReservation.allowed) {
      return res.status(429).json({ message: "Daily generation limit reached" })
    }

    const payload: ChatGPTStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: messages || [{ role: "user", content: prompt } as Message],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: maxTokens,
      stream: true,
      n: 1,
    }

    const stream = await OpenChatGPTStream(payload)
    return await writeStreamToResponse(stream, res)
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to generate response" })
    }

    res.end()
  }
}

export default handler

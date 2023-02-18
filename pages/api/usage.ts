import { getCurrentTokenUsage } from "../../lib/firebase/admin"

export default async (req: any, res: any) => {
  const MAX_DAILY_TOKENS = 10000

  try {
    console.log("getCurrentTokenUsage")
    const usage: number = await getCurrentTokenUsage()
    console.log({ usage })
    res.status(200).json({ usage: usage < MAX_DAILY_TOKENS })
  } catch (error) {
    res.status(500).json({ message: "Failed to store potluck data", error })
  }
}

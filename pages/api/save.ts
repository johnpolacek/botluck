import { storePotLuckData, increaseTokenUsage } from "../../lib/firebase/admin"

export default async (req: any, res: any) => {
  try {
    const { data, tokens } = req.body
    const id = await storePotLuckData(data)
    await increaseTokenUsage(tokens)
    res.status(200).json({ message: "Potluck data stored successfully", id })
  } catch (error) {
    res.status(500).json({ message: "Failed to store potluck data", error })
  }
}

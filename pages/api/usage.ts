import { getAboveDailyUsageLimit } from "../../lib/firebase/admin"

export default async (req: any, res: any) => {
  try {
    const usage: boolean = await getAboveDailyUsageLimit()
    res.status(200).json({ usage })
  } catch (error) {
    res.status(500).json({ message: "Failed to store potluck data", error })
  }
}

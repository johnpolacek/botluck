import { getAboveDailyUsageLimit } from "../../lib/firebase/admin"

export default async (req: any, res: any) => {
  try {
    const isAboveLimit: boolean = await getAboveDailyUsageLimit()
    res.status(200).json({ isAboveLimit })
  } catch (error) {
    res.status(500).json({ message: "Failed to store potluck data", error })
  }
}

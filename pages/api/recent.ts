import { getRecentPotLucks } from "../../lib/firebase/admin"

export default async (req: any, res: any) => {
  try {
    const { startAfter } = req.body
    const recent = await getRecentPotLucks(startAfter)
    res.status(200).json({ recent })
  } catch (error) {
    res.status(500).json({ message: "Failed to store potluck data", error })
  }
}

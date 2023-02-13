import React, { useEffect, useState } from "react"
import { PotLuckData } from "./Types"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

type RecentPotLuck = {
  created: string
  data: PotLuckData
}

const Recent = () => {
  const [recentPotlucks, setRecentPotlucks] = useState<RecentPotLuck[] | null>(
    null
  )

  useEffect(() => {
    getRecent()
  }, [])

  const getRecent = async () => {
    const response = await fetch("/api/recent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    })

    const data = response.body
    if (!data) {
      return
    }

    const { recent } = await response.json()

    setRecentPotlucks(recent)
  }

  return (
    <div className="pb-16 flex flex-col gap-2">
      <h4 className="pb-2">Check out these recent Pot Luck Themes</h4>
      {recentPotlucks &&
        recentPotlucks.map((recentData: RecentPotLuck) => (
          <div
            className={`text-2xl font-bold text-blue-600 ${dancingScript.className}`}
          >
            {recentData.data.theme}
          </div>
        ))}
    </div>
  )
}

export default Recent

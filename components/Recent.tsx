import React, { useEffect, useState } from "react"
import { PotLuckData, Courses } from "./Types"
import { Dancing_Script } from "@next/font/google"
import Link from "next/link"
import Heading from "./ui/Heading"
import Card from "./ui/Card"
import Separator from "./ui/Separator"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

type RecentPotLuck = {
  id: string
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
    <div className="pb-16 text-center">
      <Separator />
      <Heading>Recently on Bot Luck...</Heading>
      <div className="flex flex-wrap px-8 pb-8 justify-center">
        {recentPotlucks &&
          recentPotlucks.map((potluck: RecentPotLuck) => (
            <Card className="w-[540px] mt-8" key={potluck.id}>
              <div
                className={`text-4xl py-2 font-bold text-primary-50 ${dancingScript.className}`}
              >
                {potluck.data.theme}
              </div>
              <div className="pt-2 pb-4">
                <Link
                  className="bg-primary-500 text-primary-100 rounded-lg px-6 py-1"
                  href={`/recipes/${potluck.id}`}
                >
                  View Recipes
                </Link>
              </div>
              <>
                {Object.keys(potluck.data.courses)
                  .sort()
                  .map((course) => (
                    <div className="pt-6" key={course}>
                      <div
                        className={`text-2xl font-bold text-primary-600 w-full pb-4 ${dancingScript.className}`}
                      >
                        {course}
                      </div>
                      <div>
                        {Array.isArray(
                          potluck.data.courses[course as keyof Courses]
                        ) &&
                          potluck.data.courses[course as keyof Courses]?.map(
                            (dish, i) => (
                              <div
                                className={`text-2xl font-bold text-primary-700 w-full pb-2 ${dancingScript.className}`}
                                key={`dish-${i}`}
                              >
                                {dish.name}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  ))}
              </>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default Recent

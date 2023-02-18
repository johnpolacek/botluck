import React, { useEffect, useState, useContext } from "react"
import { PotLuckData, Courses } from "./Types"
import Link from "next/link"
import Heading from "./ui/Heading"
import Card from "./ui/Card"
import Separator from "./ui/Separator"
import { useRouter } from "next/router"

type RecentPotLuck = {
  id: string
  created: string
  data: PotLuckData
}

const Recent = () => {
  const [recentPotlucks, setRecentPotlucks] = useState<RecentPotLuck[] | null>(
    null
  )

  const router = useRouter()

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
      <div className="flex flex-wrap sm:px-8 pb-8 justify-center">
        {recentPotlucks &&
          recentPotlucks.map((potluck: RecentPotLuck) => (
            <Card className="w-full sm:w-[540px] mt-8" key={potluck.id}>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/recipes/${potluck.id}`)
                }}
              >
                <div
                  className="text-2xl sm:text-4xl py-2 font-bold text-primary-50"
                  style={{
                    textShadow: "0px 0px 2px #613932",
                  }}
                >
                  {potluck.data.theme}
                </div>
                <div className="pt-2 pb-4">
                  <Link
                    className="bg-transparent sm:text-lg text-primary-100 rounded-lg px-6 py-1"
                    href={`/recipes/${potluck.id}`}
                    style={{
                      boxShadow: "inset 0 0 60px rgba(149, 69, 53, 0.8)",
                      textShadow: "0 0 2px #613932",
                    }}
                  >
                    View Recipes
                  </Link>
                </div>
                <>
                  {Object.keys(potluck.data.courses)
                    .sort()
                    .map((course) => (
                      <div className="pt-6" key={course}>
                        <div className="text-lg sm:text-2xl font-bold text-primary-700 w-full pb-4 mix-blend-hard-light">
                          {course}
                        </div>
                        <div>
                          {Array.isArray(
                            potluck.data.courses[course as keyof Courses]
                          ) &&
                            potluck.data.courses[course as keyof Courses]?.map(
                              (dish, i) => (
                                <div
                                  className="text-xl sm:text-2xl font-bold text-primary-700 w-full pb-2"
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
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default Recent

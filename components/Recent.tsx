import React, { useEffect, useState } from "react"
import { PotLuck } from "./Types"
import PotluckCard from "./PotluckCard"
import Heading from "./ui/Heading"
import Separator from "./ui/Separator"

const Recent = ({ loadMore }: { loadMore?: boolean }) => {
  const [recentPotlucks, setRecentPotlucks] = useState<PotLuck[] | null>(null)

  useEffect(() => {
    getRecent()
  }, [])

  const getRecent = async (startAfter?: {
    _seconds: number
    _nanoseconds: number
  }) => {
    const response = await fetch("/api/recent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startAfter,
      }),
    })

    const data = response.body
    if (!data) {
      return
    }
    const { recent } = await response.json()

    setRecentPotlucks(
      recentPotlucks ? [...recentPotlucks].concat(recent) : recent
    )
  }

  return (
    <div className="pb-16 text-center">
      <Separator />
      <Heading>Recently on Bot Luck...</Heading>
      <div className="flex flex-wrap py-4 justify-center">
        {recentPotlucks &&
          recentPotlucks.map((potluck: PotLuck) => (
            <PotluckCard key={potluck.id} potluck={potluck} />
          ))}
      </div>
      {loadMore && recentPotlucks?.at(-1)?.created && (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              getRecent(recentPotlucks?.at(-1)?.created)
            }}
            className="bg-primary-600 text-3xl rounded-xl text-white font-medium px-12 py-4 mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 relative -top-1 -left-3 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default Recent

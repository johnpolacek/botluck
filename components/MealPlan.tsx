import React, { useContext, useState, useEffect } from "react"
import { AppContext } from "./AppContext"
import { Courses } from "./Types"
import { Dancing_Script } from "@next/font/google"
import Dish from "./Dish"
import LoadingAnimation from "./LoadingAnimation"
import Separator from "./Separator"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const MealPlan = () => {
  const { potLuckData, theme, isSubmitted } = useContext(AppContext)

  return (
    <div className={`py-8 ${isSubmitted ? "" : "hidden"}`}>
      <h3
        className={`text-7xl text-primary-700 w-full pb-12 ${dancingScript.className}`}
      >
        {theme}
      </h3>
      {potLuckData ? (
        <>
          {Object.keys(potLuckData.courses).map((course) => (
            <div className="py-8" key={course}>
              <Separator />
              <div
                className={`text-4xl font-bold text-primary-500 w-full pb-12 ${dancingScript.className}`}
              >
                {course}
              </div>
              <div className="flex flex-wrap px-16 pb-8 justify-center">
                {potLuckData.courses[course as keyof Courses]?.map((dish) => (
                  <Dish dish={dish} />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  )
}

export default MealPlan

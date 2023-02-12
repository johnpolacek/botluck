import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const MealPlanner = () => {
  const { mealPlan, setMealPlan } = useContext(AppContext)

  const handleAppetizersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMealPlan({ ...mealPlan, appetizers: Number(event.target.value) })
  }

  const handleMainsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealPlan({ ...mealPlan, mains: Number(event.target.value) })
  }

  const handleSidesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealPlan({ ...mealPlan, sides: Number(event.target.value) })
  }

  const handleDessertsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealPlan({ ...mealPlan, desserts: Number(event.target.value) })
  }

  return (
    <div className="py-8">
      <h3
        className={`text-4xl font-bold w-full pb-6 text-primary-700 ${dancingScript.className}`}
      >
        Set up a meal plan
      </h3>
      <div className="flex max-w-2xl mx-auto">
        <div className="flex-inline items-center w-full">
          <label className="text-right pr-2">Appetizers</label>
          <input
            className="w-16 rounded-md border px-2 py-1 border-gray-300 shadow-sm focus:border-black focus:ring-black my-2 text-center"
            type="number"
            max="10"
            value={mealPlan.appetizers}
            onChange={handleAppetizersChange}
          />
        </div>
        <div className="flex-inline items-center w-full">
          <label className="text-right pr-2">Mains</label>
          <input
            className="w-16 rounded-md border px-2 py-1 border-gray-300 shadow-sm focus:border-black focus:ring-black my-2 text-center"
            type="number"
            max="10"
            value={mealPlan.mains}
            onChange={handleMainsChange}
          />
        </div>
        <div className="flex-inline items-center w-full">
          <label className="text-right pr-2">Sides</label>
          <input
            className="w-16 rounded-md border px-2 py-1 border-gray-300 shadow-sm focus:border-black focus:ring-black my-2 text-center"
            type="number"
            max="10"
            value={mealPlan.sides}
            onChange={handleSidesChange}
          />
        </div>
        <div className="flex-inline items-center w-full">
          <label className="text-right pr-2">Desserts</label>
          <input
            className="w-16 rounded-md border px-2 py-1 border-gray-300 shadow-sm focus:border-black focus:ring-black my-2 text-center"
            type="number"
            max="10"
            value={mealPlan.desserts}
            onChange={handleDessertsChange}
          />
        </div>
      </div>
      <p className="pt-8 text-gray-600 max-w-lg mx-auto">
        A potluck dinner for 10 guests should typically have 6 to 8 appetizers,
        2 to 3 main courses, 3 to 4 side dishes, and 2 to 3 desserts
      </p>
    </div>
  )
}

export default MealPlanner

import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import Heading from "./ui/Heading"

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

  const MealPlanInput = ({
    value,
    onChange,
  }: {
    value: number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      className="w-16 relative -top-3 sm:top-0 my-2 text-white text-center bg-transparent text-xl sm:text-2xl border-b-[6px] border-double py-2 pl-6 mr-6 border-transparent border-b-primary-800 focus:outline-none"
      style={{
        textShadow: "0px 0px 2px #613932",
      }}
      type="number"
      max="10"
      value={value}
      onChange={onChange}
    />
  )

  return (
    <div className="py-8 text-primary-800">
      <Heading>Set up a meal plan</Heading>
      <div className="flex flex-wrap justify-center sm:-mt-4 pt-6 sm:pt-0 pb-4 max-w-[180px] sm:max-w-2xl mx-auto w-full">
        <div className="flex relative left-8 sm:left-0 sm:block justify-end w-full sm:w-auto sm:px-2">
          <label className="text-right pt-1 pr-6 sm:pr-2 text-xl">
            Appetizers
          </label>
          <MealPlanInput
            value={mealPlan.appetizers}
            onChange={handleAppetizersChange}
          />
        </div>
        <div className="flex relative left-8 sm:left-0 sm:block justify-end w-full sm:w-auto sm:px-2">
          <label className="text-right pt-1 pr-6 sm:pr-2 text-xl">Mains</label>
          <MealPlanInput value={mealPlan.mains} onChange={handleMainsChange} />
        </div>
        <div className="flex relative left-8 sm:left-0 sm:block justify-end w-full sm:w-auto sm:px-2">
          <label className="text-right pt-1 pr-6 sm:pr-2 text-xl">Sides</label>
          <MealPlanInput value={mealPlan.sides} onChange={handleSidesChange} />
        </div>
        <div className="flex relative left-8 sm:left-0 sm:block justify-end w-full sm:w-auto sm:px-2">
          <label className="text-right pt-1 pr-6 sm:pr-2 text-xl">
            Desserts
          </label>
          <MealPlanInput
            value={mealPlan.desserts}
            onChange={handleDessertsChange}
          />
        </div>
      </div>
      <p className="max-w-xs sm:max-w-none text-primary-900 mx-auto px-4 sm:px-0">
        A potluck dinner for 10 guests should typically have 6 to 8 appetizers,
        2 to 3 main courses, 3 to 4 side dishes, and 2 to 3 desserts
      </p>
    </div>
  )
}

export default MealPlanner

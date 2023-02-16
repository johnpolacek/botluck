import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import ThemePicker from "./ThemePicker"
import MealPlanner from "./MealPlanner"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const Form: React.FC = () => {
  const context = useContext(AppContext)

  const onSubmitRequest = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    context.setIsSubmitted(true)
    const prompt = `Generate recipes with ingredients in JSON format for a pot luck dinner in the theme of ${
      context.theme
    } with ${
      context.mealPlan.appetizers
        ? context.mealPlan.appetizers + " appetizers, "
        : ""
    } ${
      context.mealPlan.mains ? context.mealPlan.mains + " main courses, " : ""
    } ${
      context.mealPlan.sides ? context.mealPlan.sides + " side dishes" : ""
    } ${
      context.mealPlan.desserts
        ? " and " + context.mealPlan.desserts + " desserts"
        : ""
    }. Your response must be in JSON format as {"Appetizers": Dish[],"Main Course": Dish[],"Side Dishes": Dish[],"Dessert": Dish[]} where type Dish = { name: string; ingredients: string[]}.`
    const tokens =
      (context.mealPlan.appetizers +
        context.mealPlan.mains +
        context.mealPlan.sides +
        context.mealPlan.desserts) *
        200 +
      Math.ceil(prompt.length / 4)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        tokens: tokens > 2048 ? 2048 : tokens,
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false
    let isJson = null

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      if (isJson === null && chunkValue.length) {
        // check that this is JSON, if not then need to retry
        isJson = chunkValue.charAt(0) === "{"
        if (!isJson) {
          done = true
          console.log({ chunkValue })
          alert("Sorry there was an error with the robot. Please try again.")
        }
      }
      context.setGeneratedPotLuck(chunkValue)
    }

    context.incrementTokensUsed(
      (prompt.length + context.generatedPotLuck.length) / 4
    )
    console.log("ingredients complete", context.potLuckData)
    context.setIngredientsComplete(true)
  }

  return (
    <form
      className={`max-w-5xl pb-16 mx-auto ${
        context.isSubmitted ? "hidden" : ""
      } ${dancingScript.className}`}
      onSubmit={onSubmitRequest}
    >
      <h1 className="text-8xl font-bold text-primary-700 mx-auto">
        Pot Luck Dinners
      </h1>
      <h1 className="text-2xl font-bold text-primary-700 tracking-wider mx-auto -mt-2 mb-6">
        ~ powered by robots ~
      </h1>
      <div>
        <ThemePicker />
        <MealPlanner />
        <button
          type="submit"
          className="bg-primary-700 rounded-xl text-white font-medium text-2xl py-4 pl-12 pr-16 mt-4"
        >
          <span className="inline-block relative">
            Generate Your Recipes{" "}
            <span className="font-thin text-4xl absolute -top-2 -right-8 pt-px">
              »
            </span>
          </span>
        </button>
      </div>
    </form>
  )
}

export default Form

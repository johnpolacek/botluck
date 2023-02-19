import React, { createContext, useState, useEffect } from "react"
import { getDataFromStream } from "../lib/openai/generate"
import { Dish, MealPlan, PotLuckData, Courses, AppContextType } from "./Types"

const defaultMealPlan: MealPlan = {
  appetizers: 3,
  mains: 2,
  sides: 2,
  desserts: 1,
}

const AppContext = createContext<AppContextType>({
  mealPlan: defaultMealPlan,
  setMealPlan: () => {},
  theme: "",
  setTheme: () => {},
  generatedPotLuck: "",
  setGeneratedPotLuck: () => {},
  potLuckData: null,
  isSubmitted: false,
  setIsSubmitted: () => {},
  ingredientsComplete: false,
  setIngredientsComplete: () => {},
  instructionsComplete: 0,
  setInstructionsComplete: () => {},
  tokensUsed: 0,
  incrementTokensUsed: () => {},
  generatedId: undefined,
})

const AppContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState({
    mealPlan: defaultMealPlan,
    theme: "",
    generatedPotLuck: "",
    isSubmitted: false,
    ingredientsComplete: false,
    potLuckData: null as PotLuckData | null,
    instructionsComplete: 0,
    tokensUsed: 0,
  })

  useEffect(() => {
    const newData = getDataFromStream(state.generatedPotLuck)
    if (newData) {
      const newPotLuckData = {
        theme: state.theme,
        courses: newData,
      }
      setPotLuckData(newPotLuckData)
    }
  }, [state.generatedPotLuck])

  // This function retrieves dishes from state.potLuckData and uses the Object.keys() method
  // to loop over the state.potLuckData.courses object and the forEach() method to
  // loop over each dish in each course as it is streamed from the OpenAI API.

  // For each dish, the function checks if the dish has a name and ingredients,
  // and if so pushes the dish to the array of completely formed dish objects.
  const dishes: Dish[] = (() => {
    let dishesArray: Dish[] = []
    if (state.potLuckData) {
      Object.keys(state.potLuckData.courses).forEach((course) => {
        if (
          Array.isArray(state.potLuckData?.courses[course as keyof Courses])
        ) {
          state.potLuckData?.courses[course as keyof Courses]?.forEach(
            (dish: Dish) => {
              const name = dish.name
              const ingredients = dish.ingredients
              if (name && ingredients?.length) {
                dishesArray.push(dish)
              }
            }
          )
        }
      })
    }
    return dishesArray
  })()

  useEffect(() => {
    if (state.ingredientsComplete && dishes.length > 0) {
      // when ingredients are complete, get the recipe instructions
      getRecipeInstructions(dishes[0])
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [state.ingredientsComplete])

  useEffect(() => {
    if (dishes.length > 0) {
      if (state.instructionsComplete === dishes.length) {
        ;(async () => {
          // All done! Save the result
          const response = await fetch("/api/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: state.potLuckData,
              tokens: state.tokensUsed,
            }),
          })
          const { generatedId } = await response.json()
          setGeneratedId(generatedId)
        })()
      } else {
        getRecipeInstructions(dishes[state.instructionsComplete])
      }
    }
  }, [state.instructionsComplete])

  const setMealPlan = (newMealPlan: MealPlan) => {
    setState((prevState) => ({ ...prevState, mealPlan: newMealPlan }))
  }

  const setTheme = (newTheme: string) => {
    setState((prevState) => ({ ...prevState, theme: newTheme }))
  }

  const setGeneratedPotLuck = (newPotLuck: string) => {
    setState((prevState) => ({
      ...prevState,
      generatedPotLuck: prevState.generatedPotLuck + newPotLuck,
    }))
  }

  const setPotLuckData = (newPotLuckData: PotLuckData) => {
    setState((prevState) => ({ ...prevState, potLuckData: newPotLuckData }))
  }

  const setIsSubmitted = (isSubmitted: boolean) => {
    setState((prevState) => ({ ...prevState, isSubmitted }))
  }

  const setIngredientsComplete = (ingredientsComplete: boolean) => {
    setState((prevState) => ({ ...prevState, ingredientsComplete }))
  }

  const setInstructionsComplete = (instructionsComplete: number) => {
    setState((prevState) => ({ ...prevState, instructionsComplete }))
  }

  const incrementTokensUsed = (newTokens: number) => {
    setState((prevState) => ({
      ...prevState,
      tokensUsed: state.tokensUsed + Math.ceil(newTokens),
    }))
  }

  const setGeneratedId = (generatedId: string) => {
    setState((prevState) => ({ ...prevState, generatedId }))
  }

  const getRecipeInstructions = async (newDish: Dish) => {
    const prompt = `Generate recipe instructions for ${
      newDish.name
    } with ingredient of ${newDish.ingredients.toString()}.`
    const tokens = Math.ceil(prompt.length / 4) + 300

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        tokens,
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
    let recipe = ""

    if (state.potLuckData) {
      let courseToUpdate: string = ""
      let dishIndex: number | null = null
      Object.keys(state.potLuckData.courses).forEach((course) => {
        if (
          Array.isArray(state.potLuckData?.courses[course as keyof Courses])
        ) {
          state.potLuckData?.courses[course as keyof Courses]?.forEach(
            (dish: Dish, index) => {
              if (dish.name === newDish.name) {
                courseToUpdate = course
                dishIndex = index
              }
            }
          )
        }
      })

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        if (chunkValue) {
          recipe += chunkValue
          if (courseToUpdate && typeof dishIndex === "number") {
            const updatedCourses = { ...state.potLuckData.courses }
            const updatedCourse =
              updatedCourses[courseToUpdate as keyof Courses]
            if (updatedCourse && updatedCourse[dishIndex]) {
              updatedCourse[dishIndex].instructions = recipe
              updatedCourses[courseToUpdate as keyof Courses] = updatedCourse
              const newPotLuckData = {
                theme: state.theme,
                courses: updatedCourses,
              }
              setPotLuckData(newPotLuckData)
            }
          }
        }
      }

      // clean up recipe instructions at end to remove extraneous text
      if (courseToUpdate && typeof dishIndex === "number") {
        const updatedCourses = { ...state.potLuckData.courses }
        const updatedCourse = updatedCourses[courseToUpdate as keyof Courses]
        if (updatedCourse && updatedCourse[dishIndex]) {
          updatedCourse[dishIndex].instructions = recipe
            .split("Instructions:")[0]
            .trimEnd()
          updatedCourses[courseToUpdate as keyof Courses] = updatedCourse
          const newPotLuckData = {
            theme: state.theme,
            courses: updatedCourses,
          }
          setPotLuckData(newPotLuckData)
        }
      }

      incrementTokensUsed((prompt.length + recipe.length) / 4)
      setInstructionsComplete(state.instructionsComplete + 1)
    }
  }

  return (
    <AppContext.Provider
      value={{
        mealPlan: state.mealPlan,
        setMealPlan,
        theme: state.theme,
        setTheme,
        generatedPotLuck: state.generatedPotLuck,
        setGeneratedPotLuck,
        isSubmitted: state.isSubmitted,
        setIsSubmitted,
        ingredientsComplete: state.ingredientsComplete,
        setIngredientsComplete,
        potLuckData: state.potLuckData,
        instructionsComplete: state.instructionsComplete,
        setInstructionsComplete,
        tokensUsed: state.tokensUsed,
        incrementTokensUsed,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }

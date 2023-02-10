import React, { createContext, useState, useEffect } from "react"
import { getDataFromStream } from "../lib/openai/generate"
import { MealPlan, PotLuckData } from "./Types"

type AppContextType = {
  mealPlan: MealPlan
  setMealPlan: (mealPlan: MealPlan) => void
  theme: string
  setTheme: (theme: string) => void
  generatedPotLuck: string
  setGeneratedPotLuck: (newPotLuck: string) => void
  potLuckData: PotLuckData | null
  children?: React.ReactNode
  isSubmitted: boolean
  setIsSubmitted: (isSubmitted: boolean) => void
}

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
})

const AppContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState({
    mealPlan: defaultMealPlan,
    theme: "",
    generatedPotLuck: "",
    isSubmitted: false,
    potLuckData: null as PotLuckData | null,
  })

  useEffect(() => {
    const newData = getDataFromStream(state.generatedPotLuck)
    if (newData) {
      const newPotLuckData = {
        theme: state.theme,
        courses: newData,
      }
      setState((prevState) => ({ ...prevState, potLuckData: newPotLuckData }))
    }
  }, [state.generatedPotLuck])

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

  const setIsSubmitted = (isSubmitted: boolean) => {
    setState((prevState) => ({ ...prevState, isSubmitted }))
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
        potLuckData: state.potLuckData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }

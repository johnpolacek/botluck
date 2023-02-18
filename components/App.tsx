import React, { useContext } from "react"
import GeneratedMealPlan from "./GeneratedMealPlan"
import { AppContext } from "./AppContext"
import Form from "./Form"
import Recent from "./Recent"

const App: React.FC = () => {
  const context = useContext(AppContext)
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-start text-center px-4 pt-3 sm:pt-8">
      <div className="w-full">
        <Form />
        <GeneratedMealPlan />
        {(!context.isSubmitted || context.ingredientsComplete) && <Recent />}
      </div>
    </main>
  )
}

export default App

import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import MealPlan from "./MealPlan"
import LoadingAnimation from "./LoadingAnimation"

const GeneratedMealPlan = () => {
  const { potLuckData, isSubmitted, generatedId } = useContext(AppContext)

  return (
    <div className={`py-8 ${isSubmitted ? "" : "hidden"}`}>
      {potLuckData ? (
        <MealPlan
          isGenerating={true}
          generatedId={generatedId}
          potLuckData={potLuckData}
        />
      ) : (
        <LoadingAnimation loadingText="Cooking up your dishes..." />
      )}
    </div>
  )
}

export default GeneratedMealPlan

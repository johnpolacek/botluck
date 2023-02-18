import React, { useEffect, useRef } from "react"
import { Dish } from "./Types"
import Card from "./ui/Card"

const Dish = ({ dish, scrollTo }: { dish: Dish; scrollTo?: boolean }) => {
  const targetRef = useRef<HTMLHeadingElement>(null)
  const name = dish.name
  const ingredients = dish.ingredients

  // Scroll to this element when ingredients or instructions start generating
  useEffect(() => {
    if (scrollTo && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }, [
    ingredients.length > 0,
    dish.instructions && dish.instructions.length > 0,
  ])

  return (
    <Card>
      <div className="sm:pt-4 pb-4 sm:pb-8">
        <h4
          ref={targetRef}
          className="text-2xl sm:text-3xl pb-4 sm:pb-8 text-primary-700"
        >
          {name}
        </h4>
        <div className="grid sm:grid-cols-2 opacity-80 text-left sm:px-6 gap-x-4 gap-y-2 font-sans text-xs sm:text-sm">
          {ingredients
            ? ingredients.map((ingredient, i) => (
                <p key={`ingredient-${i}`}>{ingredient}</p>
              ))
            : null}
        </div>
      </div>
      <div className="pt-4 sm:pt-8 flex-grow opacity-80 sm:pb-4 w-full border-t-2 sm:border-t border-primary-400 text-xs sm:text-sm">
        {dish.instructions ? (
          <div className="whitespace-pre-wrap text-left w-full sm:px-6  font-sans">
            {dish.instructions}
          </div>
        ) : (
          <div className="text-center text-xl text-primary-700">
            Instructions coming soon...
          </div>
        )}
      </div>
    </Card>
  )
}

export default Dish

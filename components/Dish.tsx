import React, { useEffect, useRef } from "react"
import { Dish } from "./Types"
import Card from "./ui/Card"

const Dish = ({
  dish,
  scrollTo,
  instacartLink,
}: {
  dish: Dish
  scrollTo?: boolean
  instacartLink?: string
}) => {
  const targetRef = useRef<HTMLHeadingElement>(null)
  const name = dish.name
  const ingredients = dish.ingredients

  // Scroll to this element when ingredients or instructions start generating
  useEffect(() => {
    if (scrollTo && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 72,
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
                <p itemProp="recipeIngredient" key={`ingredient-${i}`}>
                  {ingredient}
                </p>
              ))
            : null}
        </div>
        {instacartLink && (
          <div className="pt-8">
            <a
              href={instacartLink}
              aria-label="shop with instacart"
              className="inline-flex items-center font-semibold justify-center bg-[rgb(0,61,41)] rounded-xl px-8 py-2 font-sans text-white"
            >
              <span className="text-xs pr-1">Get ingredients with</span>
              <img
                src="https://www.instacart.com/assets/Instacart_Logo_AllWhite-319e1f075674f75ad7818d194682c04c.svg"
                alt=""
                className="w-16 h-8 inline-block"
              />
            </a>
          </div>
        )}
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

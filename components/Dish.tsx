import { Dish } from "./Types"
import { Dancing_Script } from "@next/font/google"
import Card from "./ui/Card"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const Dish = ({ dish }: { dish: Dish }) => {
  const name = dish.name
  const ingredients = dish.ingredients

  return (
    <Card>
      <div className="pt-4 pb-8">
        <h4
          className={`font-bold text-3xl pb-8 text-primary-700 ${dancingScript.className}`}
        >
          {name}
        </h4>
        <div className="grid grid-cols-2 text-left px-6 gap-x-4 gap-y-2">
          {ingredients
            ? ingredients.map((ingredient, i) => (
                <p key={`ingredient-${i}`}>{ingredient}</p>
              ))
            : null}
        </div>
      </div>
      <div className="pt-8 flex-grow pb-4 w-full border-t border-primary-100">
        {dish.instructions ? (
          <div className="whitespace-pre-wrap text-left w-full px-6">
            {dish.instructions}
          </div>
        ) : (
          <div className="text-center italic text-gray-500">
            Instructions coming soon...
          </div>
        )}
      </div>
    </Card>
  )
}

export default Dish

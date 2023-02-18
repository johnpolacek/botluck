import Recent from "./Recent"
import Link from "next/link"
import MealPlan from "./MealPlan"
import { PotLuckData } from "./Types"

const RecipeDetail = ({ potLuckData }: { potLuckData: PotLuckData }) => {
  return (
    <main className={`flex-grow flex flex-col items-center justify-center py-12`}>
      <div className="flex-grow flex flex-col items-center justify-center">
        {potLuckData ? (
          <MealPlan potLuckData={potLuckData}></MealPlan>
        ) : (
          <div>Recipe not found</div>
        )}
      </div>
      <Link
        className={`text-3xl text-blue-600 pb-4 mb-16`}
        href="/"
      >
        Generate your own
      </Link>
      <Recent />
    </main>
  )
}

export default RecipeDetail

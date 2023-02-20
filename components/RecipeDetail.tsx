import Recent from "./Recent"
import Link from "next/link"
import MealPlan from "./MealPlan"
import { PotLuckData } from "./Types"

const RecipeDetail = ({ potLuckData }: { potLuckData: PotLuckData }) => {
  return (
    <main
      className={`flex-grow flex flex-col items-center justify-center py-12`}
    >
      <div className="flex-grow flex flex-col items-center justify-center">
        {potLuckData ? (
          <MealPlan potLuckData={potLuckData}></MealPlan>
        ) : (
          <div>Recipe not found</div>
        )}
      </div>
      <div className="-mt-16 mb-16">
        <div id="shop-with-instacart-v1" data-affiliate_id="2482" data-source_origin="affiliate_hub" data-affiliate_platform="recipe_widget"></div></div>
      <Link
        className={`rounded-lg bg-primary-600 text-white px-8 py-2 text-3xl pb-4 -mt-8 mb-16`}
        href="/"
      >
        generate your own
      </Link>
      <Recent />
    </main>
  )
}

export default RecipeDetail

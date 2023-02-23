import { Dish as DishType } from "./Types"
import Dish from "./Dish"
import Separator from "./ui/Separator"
import { useRouter } from "next/router"

type Props = {
  course: string
  dishes: DishType[]
  isGenerating?: boolean
}

const Dishes = ({ course, dishes, isGenerating }: Props) => {
  const router = useRouter()
  const { id } = router.query

  return dishes.length > 0 ? (
    <div className="py-8" key={course}>
      <Separator />
      <div className="text-3xl font-bold text-primary-700 w-full pb-16 mix-blend-hard-light">
        {course}
      </div>
      <div className="flex flex-wrap px-4 sm:px-8 pb-8 justify-center">
        {dishes.map((dish, i) => (
          <Dish
            instacartLink={
              isGenerating || !id
                ? ""
                : `https://www.instacart.com/store/partner_recipes?recipeSourceUrl=https%3A%2F%2Fwww.botluck.fun%2Frecipes%2F${id}%2F${i}&utm_source=instacart_growth_partnerships&utm_medium=partner_recipe_unknown&recipeSourceOrigin=unknown&aff_id=2482&offer_id=1&affiliate_platform=recipe_widget&content_id=b4897fbb-fc05-4f43-bb62-a17669f0eae7`
            }
            scrollTo={isGenerating}
            key={`dish-${i}`}
            dish={dish}
          />
        ))}
      </div>
    </div>
  ) : null
}

export default Dishes

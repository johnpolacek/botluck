import { Dish as DishType } from "./Types"
import Dish from "./Dish"
import Separator from "./ui/Separator"

type Props = {
  course: string
  dishes: DishType[]
  isGenerating?: boolean
}

const Dishes = ({ course, dishes, isGenerating }: Props) => {
  return dishes.length > 0 ? (
    <div className="py-8" key={course}>
      <Separator />
      <div className="text-3xl font-bold text-primary-700 w-full pb-16 mix-blend-hard-light">
        {course}
      </div>
      <div className="flex flex-wrap px-4 sm:px-8 pb-8 justify-center">
        {dishes.map((dish, i) => (
          <Dish scrollTo={isGenerating} key={`dish-${i}`} dish={dish} />
        ))}
      </div>
    </div>
  ) : null
}

export default Dishes

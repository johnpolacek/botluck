import { Courses, PotLuckData } from "./Types"
import Dishes from "./Dishes"

type Props = {
  potLuckData: PotLuckData
  isGenerating?: boolean
}

const MealPlan = ({ potLuckData, isGenerating }: Props) => {
  return (
    <div className="text-center">
      <h3 className={`text-3xl sm:text-6xl text-primary-700 w-full pb-8`}>
        {potLuckData.theme}
      </h3>
      {["Appetizers", "Main Course", "Side Dishes", "Dessert"].map(
        (course) =>
          potLuckData.courses[course as keyof Courses] && (
            <Dishes
              key={course}
              course={course}
              dishes={potLuckData.courses[course as keyof Courses]}
              isGenerating={isGenerating}
            />
          )
      )}
    </div>
  )
}

export default MealPlan

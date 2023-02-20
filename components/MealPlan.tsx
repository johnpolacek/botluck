import { Courses, PotLuckData } from "./Types"
import Dishes from "./Dishes"
import AllSet from "./AllSet"

type Props = {
  potLuckData: PotLuckData
  isGenerating?: boolean
  generatedId?: string
}

const MealPlan = ({ potLuckData, isGenerating, generatedId }: Props) => {
  return (
    <div itemScope itemType="https://schema.org/Recipe" className="text-center">
      <h3
        itemProp="name"
        className={`text-3xl sm:text-6xl text-primary-700 w-full pb-8`}
      >
        {potLuckData.theme}
      </h3>
      {generatedId && <AllSet id={generatedId} />}
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

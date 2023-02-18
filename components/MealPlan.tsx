import { Courses, PotLuckData } from "./Types"
import Dish from "./Dish"
import Separator from "./ui/Separator"

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
      {Object.keys(potLuckData.courses)
        .sort()
        .map((course) => (
          <div className="py-8" key={course}>
            {potLuckData.courses[course as keyof Courses].length > 0 && (
              <>
                <Separator />
                <div className="text-3xl font-bold text-primary-700 w-full pb-16 mix-blend-hard-light">
                  {course}
                </div>
                <div className="flex flex-wrap px-4 sm:px-8 pb-8 justify-center">
                  {Array.isArray(
                    potLuckData.courses[course as keyof Courses]
                  ) &&
                    potLuckData.courses[course as keyof Courses]?.map(
                      (dish, i) => (
                        <Dish
                          scrollTo={isGenerating}
                          key={`dish-${i}`}
                          dish={dish}
                        />
                      )
                    )}
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  )
}

export default MealPlan

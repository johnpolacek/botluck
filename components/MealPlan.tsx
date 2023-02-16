import { Courses, PotLuckData } from "./Types"
import Dish from "./Dish"
import Separator from "./ui/Separator"
import { Dancing_Script } from "@next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

type Props = {
  potLuckData: PotLuckData
}

const MealPlan = ({ potLuckData }: Props) => {
  return (
    <div className="text-center">
      <h3
        className={`text-7xl text-primary-700 w-full pb-12 ${dancingScript.className}`}
      >
        {potLuckData.theme}
      </h3>
      {Object.keys(potLuckData.courses)
        .sort()
        .map((course) => (
          <div className="py-8" key={course}>
            {potLuckData.courses[course as keyof Courses].length > 0 && (
              <>
                <Separator />
                <div
                  className={`text-5xl font-bold text-primary-600 w-full pb-16 ${dancingScript.className}`}
                >
                  {course}
                </div>
                <div className="flex flex-wrap px-8 pb-8 justify-center">
                  {Array.isArray(
                    potLuckData.courses[course as keyof Courses]
                  ) &&
                    potLuckData.courses[course as keyof Courses]?.map(
                      (dish, i) => <Dish key={`dish-${i}`} dish={dish} />
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

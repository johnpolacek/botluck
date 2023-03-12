import { Courses, PotLuck } from "./Types"
import Link from "next/link"
import Card from "./ui/Card"
import { useRouter } from "next/router"

const formatDateFromSeconds = (numSeconds: number): string => {
  const date = new Date(numSeconds * 1000) // Multiply by 1000 to convert seconds to milliseconds
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Add leading zero if month < 10
  const day = date.getDate() // Add leading zero if day < 10
  return `${month}/${day}/${year}`
}

const PotluckCard = ({ potluck }: { potluck: PotLuck }) => {
  const router = useRouter()

  return (
    <Card className="w-full sm:w-[400px]" key={potluck.id}>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault()
          router.push(`/recipes/${potluck.id}`)
        }}
      >
        <div
          className="text-xl sm:text-2xl font-bold text-primary-50"
          style={{
            textShadow: "0px 0px 2px #613932",
          }}
        >
          {potluck.data.theme}
        </div>
        <div className="pb-4 italic text-primary-600">
          Created on {formatDateFromSeconds(potluck.created._seconds)}
        </div>
        <div>
          <Link
            className="bg-primary-400 sm:text-lg text-primary-100 rounded-lg px-6 py-1"
            href={`/recipes/${potluck.id}`}
          >
            View Details
          </Link>
        </div>
        <>
          {["Appetizers", "Main Course", "Side Dishes", "Dessert"].map(
            (course) =>
              Array.isArray(potluck.data.courses[course as keyof Courses]) &&
              potluck.data.courses[course as keyof Courses].length > 0 ? (
                <div className="pt-6" key={course}>
                  <div className="text-lg font-bold text-primary-700 w-full pb-2 mix-blend-hard-light">
                    {course}
                  </div>
                  <div>
                    {potluck.data.courses[course as keyof Courses].map(
                      (dish, i) => (
                        <div
                          className="font-bold text-primary-700 w-full"
                          key={`dish-${i}`}
                        >
                          {dish.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : null
          )}
        </>
      </div>
    </Card>
  )
}

export default PotluckCard

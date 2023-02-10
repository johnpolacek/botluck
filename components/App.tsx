import MealPlan from "./MealPlan"
import Form from "./Form"

const App: React.FC = () => {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-start text-center px-4 pt-8 bg-orange-50">
      <div className="w-full">
        <Form />
        <MealPlan />
      </div>
    </main>
  )
}

export default App

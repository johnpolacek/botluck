import MealPlan from './MealPlan'
import Form from './Form';

const App: React.FC = () => {

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
      <div className="max-w-3xl w-full">
        <MealPlan />
        <Form />
      </div>
    </main>
  )
};

export default App;

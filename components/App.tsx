import MealPlan from './MealPlan'
import Form from './Form';

const App: React.FC = () => {

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 pt-8 bg-slate-50">
      <div className="max-w-3xl w-full">
        <MealPlan />
        <Form />
      </div>
    </main>
  )
};

export default App;

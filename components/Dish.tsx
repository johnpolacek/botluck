import { Dancing_Script } from '@next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

type Dish = {
  name: string;
  Name?: never;
  ingredients: string[];
  Ingredients?: never;
} | {
  name?: never;
  Name: string;
  ingredients: string[];
  Ingredients?: never;
} | {
  name: string;
  Name?: never;
  ingredients?: never;
  Ingredients: string[];
} | {
  name?: never;
  Name: string;
  ingredients?: never;
  Ingredients: string[];
};

const Dish = ({ dish }: { dish: Dish }) => {

  const name = dish.name || dish.Name;
  const ingredients = dish.ingredients || dish.Ingredients;

  return (
    <div className="w-1/3 px-4">
      <div className="flex flex-col bg-white shadow rounded-lg p-6 mb-6 h-full">
        <div className="pt-4 flex-grow border-b border-primary-100">
          <h4 className={`font-bold text-3xl pb-8 text-primary-700 ${dancingScript.className}`}>{name}</h4>
          {ingredients ? ingredients.map((ingredient) => (<p>{ingredient}</p>)) : null}
        </div>
        <div className="flex flex-col justify-end items-center gap-4 pt-8 pb-4">
          <button className="w-40 font-semibold text-lg py-2 bg-green-600 text-white rounded-lg">Get Recipe</button>
          <button className="w-40 font-semibold text-lg py-2 bg-blue-600 text-white rounded-lg">Re-Roll</button>
        </div>
      </div>
    </div>
  );
};

export default Dish;

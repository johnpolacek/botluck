import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { attemptToCompleteJSON } from '../lib/openai/generate';

const MealPlan = () => {
  const { generatedPotLuck, theme } = useContext(AppContext);
  const [data, setData] = useState<MealPlan | null>(null)

  useEffect(() => {
    let parsed
    try {
      if (generatedPotLuck) {
        parsed = JSON.parse(attemptToCompleteJSON(generatedPotLuck))
        if (parsed) {
          setData(parsed)
        }
        console.log({ parsed })
      }
    } catch (error) {
      console.error(error);
    }
  }, [generatedPotLuck])

  type Meal = {
    Name: string;
    Ingredients: string[]
  }

  type MealPlan = {
    Appetizers: Meal[];
    "Main Course": Meal[];
    "Side Dishes": Meal[];
    Desserts: Meal[];
  }

  return (
    <div className="py-8">
      <h3 className="text-5xl font-bold w-full pb-8">{theme}</h3>
      {
        data ? (
          <>
            {
              Object.keys(data).map((meal) => (
                <div className="pb-4" key={meal}>
                  <div className="text-2xl pb-4">{meal}</div>
                  {data[meal as keyof MealPlan] && data[meal as keyof MealPlan].map((dish) => (
                    <div className="bg-white shadow rounded-lg p-6 mb-4">
                      <h4 className="font-bold text-lg">{dish.Name}</h4>
                      {
                        dish.Ingredients.map((ingredient) => (<p>{ingredient}</p>))
                      }
                    </div>
                  ))}
                </div>
              ))
            }
          </>
        ) : (<div></div>)
      }
    </div>
  );
};

export default MealPlan;

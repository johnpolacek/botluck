import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import ThemePicker from './ThemePicker';
import MealPlanner from './MealPlanner';

const Form: React.FC = () => {

  const context = useContext(AppContext);

  const onSubmitRequest = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const prompt = `Generate recipes for a pot luck dinner in the theme of ${context.theme} with ${context.mealPlan.appetizers} appetizers, ${context.mealPlan.mains} main courses, ${context.mealPlan.sides} side dishes and ${context.mealPlan.desserts} desserts in JSON format`;
    const tokens = (context.mealPlan.appetizers + context.mealPlan.mains + context.mealPlan.sides + context.mealPlan.desserts) * 400
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        tokens,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      context.setGeneratedPotLuck(chunkValue);
    }
  }

  return (
    <form
      className={`pb-16 mb-8 ${context.generatedPotLuck ? 'hidden' : ''}`}
      onSubmit={onSubmitRequest}
    >
      <h1 className="sm:text-6xl text-4xl max-w-3xl font-bold text-slate-900">
        Generate recipes for a fun group Pot Luck Dinner
      </h1>
      <div className="max-w-lg mx-auto">
        <ThemePicker />
        <MealPlanner />
        <button
          type="submit"
          className="bg-black rounded-xl text-white font-medium text-2xl p-4 sm:mt-10 mt-8 hover:bg-black/80 w-full"
        >
          Generate your recipes &rarr;
        </button>
      </div>
    </form>
  );
};

export default Form;

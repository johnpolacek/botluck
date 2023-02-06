import React, { createContext, useState } from 'react';

type MealPlan = {
  appetizers: number;
  mains: number;
  sides: number;
  desserts: number;
};

type AppContextType = {
  mealPlan: MealPlan;
  setMealPlan: (mealPlan: MealPlan) => void;
  theme: string;
  setTheme: (theme: string) => void;
  generatedPotLuck: string;
  setGeneratedPotLuck: (newPotLuck: string) => void;
  children?: React.ReactNode;
};

const defaultMealPlan: MealPlan = {
  appetizers: 6,
  mains: 2,
  sides: 3,
  desserts: 2,
};

const AppContext = createContext<AppContextType>({
  mealPlan: defaultMealPlan,
  setMealPlan: () => { },
  theme: '',
  setTheme: () => { },
  generatedPotLuck: '',
  setGeneratedPotLuck: () => { },
});

interface Props {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState({
    mealPlan: defaultMealPlan,
    theme: '',
    generatedPotLuck: '',
  });

  const setMealPlan = (newMealPlan: MealPlan) => {
    setState(prevState => ({ ...prevState, mealPlan: newMealPlan }));
  };

  const setTheme = (newTheme: string) => {
    setState(prevState => ({ ...prevState, theme: newTheme }));
  };

  const setGeneratedPotLuck = (newPotLuck: string) => {
    setState(prevState => ({ ...prevState, generatedPotLuck: prevState.generatedPotLuck + newPotLuck }));
  };

  return (
    <AppContext.Provider
      value={{
        mealPlan: state.mealPlan,
        setMealPlan,
        theme: state.theme,
        setTheme,
        generatedPotLuck: state.generatedPotLuck,
        setGeneratedPotLuck,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };

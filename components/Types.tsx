export type PotLuckData = {
  theme: string
  courses: Courses
}

export type Courses = {
  Appetizers: Dish[]
  "Main Course": Dish[]
  "Side Dishes": Dish[]
  Dessert: Dish[]
}

export type MealPlan = {
  appetizers: number
  mains: number
  sides: number
  desserts: number
}

export type Dish = {
  name: string
  ingredients: string[]
  instructions?: string
}

export type DishRaw =
  | {
    name: string
    Name?: never
    Recipe?: never
    ingredients: string[]
    Ingredients?: never
  }
  | {
    name?: never
    Name: string
    Recipe?: never
    ingredients: string[]
    Ingredients?: never
  }
  | {
    name?: never
    Name: never
    Recipe?: string
    ingredients: string[]
    Ingredients?: never
  }
  | {
    name: string
    Name?: never
    Recipe?: never
    ingredients?: never
    Ingredients: string[]
  }
  | {
    name?: never
    Name: string
    Recipe?: never
    ingredients?: never
    Ingredients: string[]
  }
  | {
    name?: never
    Name: never
    Recipe?: string
    ingredients?: never
    Ingredients: string[]
  }

export type AppContextType = {
  mealPlan: MealPlan
  setMealPlan: (mealPlan: MealPlan) => void
  theme: string
  setTheme: (theme: string) => void
  generatedPotLuck: string
  setGeneratedPotLuck: (newPotLuck: string) => void
  potLuckData: PotLuckData | null
  children?: React.ReactNode
  isSubmitted: boolean
  setIsSubmitted: (isSubmitted: boolean) => void
  ingredientsComplete: boolean
  setIngredientsComplete: (isSubmitted: boolean) => void
  instructionsComplete: number
  setInstructionsComplete: (instructionsComplete: number) => void
  tokensUsed: number
  incrementTokensUsed: (instructionsComplete: number) => void
}

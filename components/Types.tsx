export type PotLuckData = {
  theme: string;
  courses: Courses;
}

export type Courses = {
  Appetizers?: Meal[];
  "Main Course"?: Meal[];
  "Side Dishes"?: Meal[];
  Desserts?: Meal[];
}

export type Meal = {
  name: string;
  ingredients: string[]
}

export type MealPlan = {
  appetizers: number;
  mains: number;
  sides: number;
  desserts: number;
};
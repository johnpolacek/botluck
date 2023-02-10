export type MealPlan = {
  appetizers: number;
  mains: number;
  sides: number;
  desserts: number;
};

export type Meal = {
  name: string;
  ingredients: string[]
}

export type Courses = {
  Appetizers?: Meal[];
  "Main Course"?: Meal[];
  "Side Dishes"?: Meal[];
  Desserts?: Meal[];
}

export type PotLuckData = {
  theme: string;
  courses: Courses;
}
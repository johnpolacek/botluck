import untruncateJson from "untruncate-json"
import { Courses, DishRaw } from "../../components/Types"

export const attemptToCompleteJSON = (incompleteJSON: string) => {
  let stack = []
  let i = 0
  let complete = ""
  let openQuotes = false

  while (i < incompleteJSON.length) {
    let char = incompleteJSON[i]

    switch (char) {
      case '"':
        openQuotes = !openQuotes
        break
      case "{":
        stack.push("{")
        break
      case "}":
        if (stack[stack.length - 1] === "{") {
          stack.pop()
        }
        break
      case "[":
        stack.push("[")
        break
      case "]":
        if (stack[stack.length - 1] === "[") {
          stack.pop()
        }
        break
    }

    complete += char
    i++
  }

  if (openQuotes) {
    complete += '"'
  }

  for (let i = stack.length - 1; i >= 0; i--) {
    const char = stack[i]
    if (char === "[") {
      complete += "]"
    } else if (char === "{") {
      complete += "}"
    }
  }

  return complete
}

const getCourseKey = (str: string) => {
  if (str.toLowerCase().includes("appetizer")) {
    return "Appetizers"
  } else if (str.toLowerCase().includes("main")) {
    return "Main Course"
  } else if (str.toLowerCase().includes("side")) {
    return "Side Dishes"
  } else if (str.toLowerCase().includes("dessert")) {
    return "Dessert"
  }
}

const normalizeData = (data: Record<string, DishRaw | DishRaw[]>) => {
  const normalized: Courses = {
    Appetizers: [],
    "Main Course": [],
    "Side Dishes": [],
    Dessert: [],
  }

  const keys = Object.keys(data)

  for (let i = 0; i < keys.length; i++) {
    const rawKey = keys[i]
    const courseKey = getCourseKey(rawKey)
    if (courseKey) {
      if (Array.isArray(data[rawKey])) {
        const dishArray = data[rawKey] as DishRaw[]
        for (let j = 0; j < dishArray.length; j++) {
          const dish = dishArray[j]
          normalized[courseKey].push({
            name: dish.name || dish.Name || "",
            ingredients: dish.ingredients || dish.Ingredients || [],
          })
        }
      } else {
        // if the request was for a single dish in the course,
        // the result may come back as a single object instead of an array
        const dish = data[rawKey] as DishRaw
        normalized[courseKey].push({
          name: dish.name || dish.Name || dish.Recipe || "",
          ingredients: dish.ingredients || dish.Ingredients || [],
        })
      }
    }
  }
  return normalized
}

export const getDataFromStream = (stream: string) => {
  let parsed
  try {
    if (stream) {
      const rawData = JSON.parse(untruncateJson(stream))
      parsed = normalizeData(rawData)
    }
  } catch (error) {
    // parsing incomplete json is unreliable so some errors are expected
    // console.error(error);
  }
  return parsed
}

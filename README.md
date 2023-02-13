# [BotLuck.fun](https://botluck.fun/)

This project generates group pot luck dinner recipes for you using AI.

---

### Starting Point

My inspiration for this project was a combination of [this blog post](https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions)
 and [this tweet](https://twitter.com/seanlinehan/status/1620159578653720577)

I created a local fork of the [TwitterBio repository](https://github.com/Nutlope/twitterbio) created by [https://www.elmghari.com/](Hassan El Mghari) aka [Nutlope](https://twitter.com/nutlope). (Note: There are lots of other [AI Templates](https://vercel.com/templates/ai) available as well).

Next, I signed up for an [OpenAI Dev Account](https://openai.com/api/) so I could have access to the [GPT-3 API](https://platform.openai.com/docs/). 


### Building the Form

Like [TwitterBio](https://www.twitterbio.com/), we will have a form that  submits a request with a prompt to OpenAI.

The difference is that our form is going to be slightly more complex. We’ll need some form fields that build the prompt by combining a theme with a meal plan for the number of appetizers, main courses, sides and desserts.

We could use OpenAI to generate a theme, but in order to keep our request count down (and on the free tier!) we could instead pull from a randomly sorted big array of pot luck theme ideas.

We can even use different [ChatGPT](https://chat.openai.com/) prompts to suggest some good themes with a prompt like:

```
Write a javascript array of strings with 20 different movie-based themes for a pot luck dinner and export it so it can be used in other modules
```

Which gets a nice result we can copy right into our project in a [Themes utility helper](https://github.com/johnpolacek/botluck/blob/main/utils/Themes.ts) for generating random themes:

```
const movieThemes = [
  "The Lord of the Rings: Middle-earth Feasts",
  "Harry Potter: A Wizarding Feast",
  "Star Wars: A Galactic Gathering",
  "The Hunger Games: Capitol Cuisine",
  "Indiana Jones: A Adventurer's Banquet",
  "Pirates of the Caribbean: A Swashbuckler's Spread",
  "Jurassic Park: A Prehistoric Picnic",
  "The Matrix: A Futuristic Feast",
  "The Avengers: A Superhero Smorgasbord",
  "Back to the Future: A Time-Traveling Treat",
  "Ghostbusters: A Spooky Spread",
  "The Terminator: A Cybergenic Cuisine",
  "The Princess Bride: A Fairytale Feast",
  "The Matrix: A Futuristic Feast",
  "The Big Lebowski: A Dude's Diner",
  "Superhero Movie Potluck",
  "Disney-Pixar Potluck",
  "Scary Movie Potluck",
  "Comedy Movie Potluck",
  "Action Movie Potluck"
];

export default movieThemes;

```

So our [form](https://github.com/johnpolacek/botluck/blob/main/components/Form.tsx) will consist of a [ThemePicker input](https://github.com/johnpolacek/botluck/blob/main/components/ThemePicker.tsx) for entering a theme (or getting a random one) and some number inputs to configure the courses.

Our form submit will look very much like the [blog post example](https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions) with its use of a [Next.js API Route](https://github.com/johnpolacek/botluck/blob/main/pages/api/generate.ts) and [OpenAIStream Edge Function](https://github.com/johnpolacek/botluck/blob/main/utils/OpenAIStream.ts) which incrementally streams responses to the client as we get data from OpenAI.

Ultimately, we need our form to create a prompt that gets good results from the OpenAI API. It is nice to use the [Open AI Playground](https://platform.openai.com/playground) to experiment with different prompt formats.


### Using AI to Write Code

In the TwitterBio example, handling the response is fairly trivial as it is just a string. In our case, we are going to get a list of courses, each with a name and ingredient list. Ideally, we would like to have this data be structured [https://github.com/johnpolacek/botluck/blob/main/components/Types.tsx](like this).

Fortunately, in our prompt we can specify that we want the response to be formatted as JSON. This is great, but there's a big catch!

When JSON is streamed, it will be incomplete. The full response from the API can take quite a long time. Rather than wait for it to finish, it would be nice to be able to display it as it streams.

Do I really want to spend a bunch of time trying to write my own incomplete JSON parsing solution? Surely someone else must have written one. I [searched StackOverflow](https://stackoverflow.com/search?q=parse+incomplete+JSON&s=6979732a-ead3-4306-b198-313c399fa85b) and didn't turn up anything all that useful (well later on I did find a nice [untruncate-json library](https://github.com/dphilipson/untruncate-json) but forget that for now).

I decided to turn to AI to see if it could come up with anything. Here's the prompt:

```
Write a function that can take an incomplete JSON string and attempt to close all braces, quotes, and commas
```

And it came back with this, which at first look, seems pretty good:

```
function attemptToCompleteJSON(incompleteJSON) {
  let stack = [];
  let i = 0;
  let complete = "";
  let openBraces = 0;
  let openQuotes = 0;
  let openSquareBrackets = 0;

  while (i < incompleteJSON.length) {
    let char = incompleteJSON[i];

    switch (char) {
      case "{":
        stack.push("{");
        openBraces++;
        break;
      case "}":
        if (stack[stack.length - 1] === "{") {
          stack.pop();
          openBraces--;
        }
        break;
      case '"':
        if (stack[stack.length - 1] === '"') {
          stack.pop();
        } else {
          stack.push('"');
        }
        openQuotes++;
        break;
      case "[":
        stack.push("[");
        openSquareBrackets++;
        break;
      case "]":
        if (stack[stack.length - 1] === "[") {
          stack.pop();
          openSquareBrackets--;
        }
        break;
    }

    complete += char;
    i++;
  }

  while (openQuotes > 0) {
    complete += '"';
    openQuotes--;
  }

  while (openSquareBrackets > 1) {
    complete += "]";
    openSquareBrackets--;
  }

  complete += "]\n";

  while (openBraces > 1) {
    complete += "}";
    openBraces--;
  }

  complete += "}\n";

  return complete;
}
```

Unfortunately, when put to the test, it didn't work. For example it would end the JSON with:

```
"In a shallow bowl, combine cocon"""""""""""""""]]}}
```

When it should be:

```
"In a shallow bowl, combine cocon"]}]}
```

I tried a few attempts at prompting ChatGPT to fix its own code to no avail. Ultimately I was able to refactor it a bit myself though. Still way faster than if I had tried to write it all myself.

The key was to treat an open quote as a boolean (there should only ever be one open quote) and to close the stack in the reverse order of the square and curly quotes.

```
if (openQuotes) {
  complete += '"';
}

for (let i = stack.length - 1; i >= 0; i--) {
  const char = stack[i]
  if (char === "[") {
    complete += "]";
  } else if (char === "{") {
    complete += "}";
  }
}

```

### Using AI to Fix Type Errors

This was actually my favorite use of AI when writing code. Just copy and paste your type errors into ChatGPT and it will fix them up.

For example this prompt:

```
Given:
{
  data && Object.keys(data).map((meal: any) => (
  <div key={meal}>
    <div>{meal}</div>
    <h4>{data[meal].Name}</h4>
  </div>))
}

Results in:
Argument of type '(meal: keyof MealPlan) => JSX.Element' is not assignable to parameter of type '(value: string, index: number, array: string[]) => Element'.
  Types of parameters 'meal' and 'value' are incompatible.
    Type 'string' is not assignable to type 'keyof MealPlan'.
```

Will get you a fixed up typed version like:

```
interface MealPlan {
  [meal: string]: {
    Name: string;
  };
}

const data: MealPlan = {
  // ...
};

{
  data && Object.keys(data).map((meal: keyof MealPlan) => (
  <div key={meal}>
    <div>{meal}</div>
    <h4>{data[meal].Name}</h4>
  </div>))
}
```

Even if it doesn't get it exactly perfect, it can help get you on the right path.


### Handling the Response

Now that we are able to parse the response from the OpenAI API as it streams, we can display the results as they come in. We can do this with a useEffect hook in our [AppContext](https://github.com/johnpolacek/botluck/blob/main/components/AppContext.tsx).	

```
useEffect(() => {
    const newData = getDataFromStream(state.generatedPotLuck)
    if (newData) {
      const newPotLuckData = {
        theme: state.theme,
        courses: newData,
      }
      setState((prevState) => ({ ...prevState, potLuckData: newPotLuckData }))
    }
  }, [state.generatedPotLuck])
```

This gets us what we need to be able to render the name and ingredient list for each dish as it comes in. 

We could try to get the recipe instructions for each dish in the initial request, but unfortunately it would make the response too large and often would be omitted anyway.

We could wait for the initial request to complete, then make each additional request for recipe instructions, but that is no fun. Instead, as each meal name is provied, we will make a new request for the instructions and for some really cool parallelization.

### Using AI to Explain Code

Do you ever spend a bunch of time coding and look at it and say, how do I explain what the hell I just did. Let AI give it a shot.

For example, paste this function into ChatGPT:

```
const getMeals = () => {
    let mealNames = []
    if (state.potLuckData) {
      Object.keys(state.potLuckData.courses).forEach((course) => {
          state.potLuckData?.courses[course as keyof Courses]?.forEach((dish: Dish) => {
            const name = dish.name || dish.Name
            const ingredents = dish.ingredients || dish.Ingredients
            if (name && ingredents?.length) {
              mealNames.push(name)
            }
          })
        }
      )
    }
  }
```

It will respond with:

> This is a JavaScript function that retrieves meal names from an object called state.potLuckData. The state.potLuckData object represents data for a potluck event, which has a structure of courses and dishes.
> 
> The function uses the Object.keys() method to loop over the courses in the state.potLuckData.courses object and the forEach() method to loop over each dish in each course.
> 
> For each dish, the function checks if the dish has a name and ingredients, and if so, pushes the name of the dish to the mealNames array.
> 
> It's worth noting that the structure of the data appears to be somewhat inconsistent, as the code checks for both dish.name and dish.Name, and also dish.ingredients and dish.Ingredients. This may lead to unexpected results or errors, so it would be a good idea to ensure that the data structure is consistent.

Thanks for that last bit, I know I should probably clean up the data structure when parsing. I'm just hacking on a project here!


### Using AI to Transform Code

AI is great at taking a block of code and transforming it into other uses. For example, given the `getMeals()` function above, we can turn it into something else:

```
Convert getMeals into an immediately invoked function that sets the value of a const named mealNames as ES6 TypeScript
```

Or you can ask it to refactor, for example give it a block of code and tell it to make it more DRY:

```
const normalizeData = ((data: Record<string, Dish[]>) => {
  const normalized:Courses = {
    Appetizers: [],
    "Main Course": [],
    "Side Dishes": [],
    Desserts: [],
  }

  // Normalize the keys, e.g convert `appetizer` to `Appetizers`
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    switch (i) {
      case 0:
        normalized["Appetizers"] = (data[key] as Dish[]).map((dish: Dish) => {
          return {
            name: dish.name || dish.Name || "",
            ingredients: dish.ingredients || dish.Ingredients || [],
          }
        });
        break;
      case 1:
        normalized["Main Course"] = (data[key] as Dish[]).map((dish: Dish) => {
          return {
            name: dish.name || dish.Name || "",
            ingredients: dish.ingredients || dish.Ingredients || [],
          }
        });
        break;
      case 2:
        normalized["Side Dishes"] = (data[key] as Dish[]).map((dish: Dish) => {
          return {
            name: dish.name || dish.Name || "",
            ingredients: dish.ingredients || dish.Ingredients || [],
          }
        });
        break;
      case 3:
        normalized["Desserts"] = (data[key] as Dish[]).map((dish: Dish) => {
          return {
            name: dish.name || dish.Name || "",
            ingredients: dish.ingredients || dish.Ingredients || [],
          }
        });
        break;
    }
  }
  return normalized;
});
```


### Data Inconsistency

Unfortunately, there are some issues with the data formatting. Even though we are telling the API to return JSON, we can't control the format that comes back.

Sometimes it will ignore the instruction and send back regular text.

Sometimes the keys are capitalized and other times lowercase. The ingredients are usually supplied as an array, but sometimes they come through as one big string. We can try to mitigate by appending 'with the ingredients as an array of strings' to our prompt, but it isn't 100% guaranteed to work.

If the user asks for a single Appetizer, the data key will be `Appetizer` instead of `Appetizers`.

### Storing Results on Firebase

I want to store the generated recipes so I spun up a quick [Firebase Project](https://firebase.google.com/). I attempted to have ChatGPT generate some of the firebase code, but it generated code that was out of date or not for the version of the SDK I was using (e.g. client or Node vs Admin SDK). It looked good at first glance, but no go.

However, if your brain is a little fried and you can use ChatGPT to give you a shortcut:

> Update the following firebase admin sdk code in the getRecentPotLucks function to return the data from the most recent 20 in the snapshot:
export const getRecentPotLucks = async () => {
  const potlucksRef = db.collection('potluck');
  const snapshot = await potlucksRef.orderBy('created').get();
}


### Rate Limiting

The OpenAI API is not free, but it does have a free plan where you get $18 of credits to get started. Usage is tracked by tokens, which are pieces of words where 1,000 tokens is about 750 words at approximately 4 characters per token. However, it isn't an exact measurement. You can use [Open AI's Tokenizer Tool](https://platform.openai.com/tokenizer) to test out different prompts and responses for how many tokens they translate into.

Every request that comes into the API is tracked for how many tokens it uses which consists of the length of the prompt plus the length of the response.

Calculating your usage is not an exact science as you can't control the exact length of what the response will be. The best we can do is make a calculated guess.

I'd rather not have this app cost me lots of money, so I'll want to put some daily rate limiting on it. I'll implement a daily usage count where I can keep track of how many tokens it has consumed and turn it off when it hits a limit.







### Deploying

To make the app available to the public, we can deploy to Vercel. We can create a new Vercel project by connecting to Github. We'll need to add the secret keys and as environment variables in the Vercel project settings.


In looking at the usage graphs on my account, it looks like each individual recipe will consume about 132 tokens. We can round up to 150 to be safe with some buffer.

Every language model has a [different pricing](https://openai.com/api/pricing/), with Davinci being the most expensive and best. It costs 2¢ per 1K tokens. This means at $18 our free tier can handle 900k tokens. For a 30 day month, that would be 30k tokens per day. With 150 tokens per recipe, we can generate about 200 per day. That's just for the name and ingredients.


Limit requests per day. Track this in Firebase. 4 characters per token, 620 tokens = 1 cent for 2480 characters

If hit limit, allow purchase of credits. $1 = 5 credits

Store reference in local storage on device

Instacart Affiliate

https://instacart-tastemakers.zendesk.com/hc/en-us/articles/8801040243476-Make-your-site-shoppable

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

Now that we are able to parse the response from the OpenAI API as it streams, we can display the results as they come in.


### Deploying

To make the app available to the public, we can deploy to Vercel. We can create a new Vercel project by connecting to Github. We'll need to add the secret keys and as environment variables in the Vercel project settings.

We could use OpenAI to generate a theme, but in order to keep our request count down (and on the free tier!) we could instead pull from a randomly sorted big array of pot luck theme ideas.


Limit requests per day. Track this in Firebase.

If hit limit, allow purchase of credits. $1 = 5 credits

Store reference in local storage on device

Instacart Affiliate

https://instacart-tastemakers.zendesk.com/hc/en-us/articles/8801040243476-Make-your-site-shoppable

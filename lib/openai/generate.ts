export const attemptToCompleteJSON = (incompleteJSON: string) => {
  let stack = [];
  let i = 0;
  let complete = "";
  let openQuotes = false;

  while (i < incompleteJSON.length) {
    let char = incompleteJSON[i];

    switch (char) {
      case '"':
        openQuotes = !openQuotes
        break;
      case "{":
        stack.push("{");
        break;
      case "}":
        if (stack[stack.length - 1] === "{") {
          stack.pop();
        }
        break;
      case "[":
        stack.push("[");
        break;
      case "]":
        if (stack[stack.length - 1] === "[") {
          stack.pop();
        }
        break;
    }

    complete += char;
    i++;
  }

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

  return complete;
}

export const getDataFromStream = ((stream: string) => {
  let parsed
  try {
    if (stream) {
      parsed = JSON.parse(attemptToCompleteJSON(stream))
      console.log({ parsed })
    }
  } catch (error) {
    // parsing incomplete json is unreliable so some errors are expected
    // console.error(error);
  }
  return parsed
})
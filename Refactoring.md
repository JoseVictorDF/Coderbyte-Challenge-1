# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
- Consider only before "feat: remove unnecessary creation of data param" commit, as everything after that was made after the 2 hours limit;

1. Move "magic" strings to constants, it tells the dev what those strings means and make it easy to change in all places they are used at same time;
2. Set TRIVIAL_PARTITION_KEY as default value for candidate var, with this we don't need to check if candidate has value to set it;
3. Move create hash logic to a function, with this we eliminate duplicated code, making it more readable and maintainable;
4. As the event as JSON (const data) is only used once, we don't need to set it's value to a variable;
5. Move all the logic inside de "if (event)" because it's unnecessary in the default path;
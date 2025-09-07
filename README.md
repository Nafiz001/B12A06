#### 1) What is the difference between var, let, and const?

**var** has function scope and can be redeclared, **let** has block scope and can be reassigned but not redeclared, and **const** has block scope and cannot be reassigned or redeclared. **var** is hoisted and initialized with undefined, while **let** and **const** are hoisted but not initialized. **const** must be initialized at declaration time.

#### 2) What is the difference between map(), forEach(), and filter()?

**forEach()** executes a function for each array element and returns undefined, **map()** creates a new array with the results of calling a function on every element, and **filter()** creates a new array with elements that pass a test condition. **forEach()** is for side effects, **map()** transforms data, and **filter()** selects specific elements.

#### 3) What are arrow functions in ES6?

Arrow functions are a shorter syntax for writing functions using `=>`. They don't have their own `this` binding and inherit it from the enclosing scope. They're great for callbacks and one-liner functions like `const add = (a, b) => a + b` instead of `function add(a, b) { return a + b }`.

#### 4) How does destructuring assignment work in ES6?

Destructuring allows you to extract values from arrays or objects into distinct variables. For arrays: `const [a, b] = [1, 2]` assigns 1 to a and 2 to b. For objects: `const {name, age} = person` extracts name and age properties from the person object into variables.

#### 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks `` ` `` and allow embedded expressions with `${}` syntax. They support multiline strings and are more readable than concatenation. Instead of `"Hello " + name + "!"` you can write `` `Hello ${name}!` ``. They also preserve line breaks and spacing naturally.
var obj = {num:2};

var addToThis = function(a, b) {
   return this.num + a + b;
};

// demonstrating Standard built-in methods and properties for functions

// 1. fun.call(thisArg[, arg1[, arg2[, ...]]])
//temporarily attach addToThis() function to Object obj and pass the given params
//note: this function will not be given
//param1: the object you are applying the function to
//param2: the argument to use in the function
console.log(addToThis.call(obj, 3, 4));

// 2. fun.apply(thisArg, [argsArray])
//apply works the same as call, but uses array
var arr = [3, 4];
console.log(addToThis.apply(obj, arr));

// 3. fun.bind(thisArg[, arg1[, arg2[, ...]]])
// creates a new function that, when called, has its 'this' keyword set to the provided obj
var newFunction = addToThis.bind(obj);
console.log(newFunction(3,4));

// 4. function.toString() - returns a string representing the source code of the function
console.log(addToThis.toString());

// 5. function arguments
var anotherFunction = function(a, b, c) {
   console.log(arguments);
   console.log(arguments.length);
   console.log(arguments[0]);
   console.log(arguments[1]);
};
anotherFunction(1, 2, 3);
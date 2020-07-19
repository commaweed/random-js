# JavaScript - the basics (well some of them - Douglas Crockford)
## Only has 6 types of values

Numbers
Strings
Booleans
Objects
null
undefined

### Numbers

No Integers
Only one type: 64-bit floating point → “Double”
    .1 + .2 != .3 (cuz it’s floating point - so multiply by 100, then scale back)
Number(value) - converts the value into a numer
```javascript
console.log(Number("275") === 275);
console.log(Number("xyz")); // NaN
console.log(Number("275") === +"275"); //similar to + prefix operator
console.log(parseInt("275", 10)); // second value is the radix (e.g. base-10, base-16), usually good to use

//Math operations are separate, so examples
console.log(Math.floor(245.6));     // 245
console.log(Math.pow(2, 3));        // 8
console.log(Math.max(5,2));        // 5
```
### NaN - the result of an undefined or erroneous operation
```javascript
console.log(NaN === NaN);  // false, NaN is not equal to anything, including NaN
console.log(typeof NaN === 'number');  // true, NaN is a special number (i.e. 'Not a Number')

//toxic: Any arithmetic operation with NaN as an input will have NaN as a result
//(4 + 3 + 7 + NaN + 33 + 12) -> NaN);
```
### String

Sequence of 0 or more 16-bit characters
Unicode Type: UCS-2, not quite UTF-16 (no awareness of surrogate pairs)
No Character type (= strings with length 1)
Immutable
Similar strings are equal (==)
String literals can use “ or ‘
```javascript
// common string members (properties and methods)
console.log("travis".length); // 6, 16-bit characters (not same as # unicode chars)
console.log(typeof String(2348) === "string"); // true
console.log("travis".charAt(1) === "r"); // true
console.log("travis".concat("co")); // travco
console.log("travis".indexOf("is") === 4);
// other examples: match, replace, search, slice, split, substring, toLowerCase, toUpperCase
```
### Boolean

only two values, true and false
```javascript
// returns false if value is falsy (types of falsy values below)
console.log(Boolean(false) === false);
console.log(Boolean(null) === false);
console.log(Boolean(undefined) === false);
console.log(Boolean("") === false);
console.log(Boolean(0) === false);
console.log(Boolean(NaN) === false);

// returns true if value is truthy (all other values, including objects are truthy)
console.log(Boolean(true) === true);
console.log(Boolean("false") === true);
console.log(Boolean("0") === true);
console.log(Boolean(5) === true);
console.log(Boolean({"name": "travis"}) === true);
console.log(Boolean({}) === true);
```
### null - a value that isn’t anything
### undefined

The default value for variables and parameters
The value of missing members in objects
If you define a variable and don’t initialize it, it gets this value

### Objects

Hashtable, but no hash nature is visible (no hash codes or rehash methods)
new Object() produces an empty container of name/value pairs
a name can be any string, a value can be any value (except undefined)
members can be accessed with dot notation or subscript notation

### special operator behavior
```javascript
// always use === which matches value AND type        (or use !==)
console.log(5 == "5"); // true
console.log(5 === "5"); // false

// urnary + prefix works like Number("string")
console.log(typeof +"111" === 'number'); // true

// The guard operator (&&): if 1st operand is truthy, then result = 2nd operand, else result = 1st operand
console.log("true" && 5 === 5);    // 1st operand is truthy, so 2nd operand is result -> true

// the default operator (||): if 1st operand is truthy, they result = 1st operand, else result = 2nd operand
console.log(null || 5 === 5);    // true, 1st operand is falsy, so use default of 5
```
### special for statement - iterate over members of an object
```javascript
var person = {
   "name": "travis",
   "age": 45,
   "address": null
};

for (var name in person) {
   // without this check, it will iterate over the inherited members (we only want this object)
   if (person.hasOwnProperty(name)) {
      console.log(name + "=" + person[name]);
   }
}

//output
//name=travis
//age=45
//address=null
```
### switch statements

switch expression can be number or string
case values can be expression or value

### Try statement - similar to java (two types of throw statements)

JavaScript can produce these exception names:

Error
EvalError
RangeError
SyntaxError
TypeError
URIError
```javascript
      var useError = false;
      try {
         if (useError) {
            // throw Error Object
            throw new Error("yo mama!");
         } else {
            // throw object literal
            throw {
               "name": "SomeExceptionName",
               message: "who cares",
               blah: 'some-thing'
            };
         }
      } catch (e) {
         switch (e.name) {
            case 'SomeExceptionName':
               console.log('you threw my exception as object literal: ' + e.blah);
               break;
            case 'Error':
               console.log('you threw an Error object: ' + e.message);
               break;
            default:
               throw e;
         }
      }
```
### With Statement

Intended as a short-hand for dealing with objects
It’s ambiguous, error-prone, and you shouldn’t use it (Douglas Crockford)
```javascript
with (o) {
   foo = null;    // it could mean o.foo = null or global variable foo = null (it depends on what o is)
}
```
### Var Statement

Defines variables (Dynamic Type - types are determined at runtime)
initial values are optional
All declarations are hoisted (as if they are defined and brought to the top - really just declared in memory)
b = 2; really var b = undefined;
var b; means b = 2;

### Scope

{blocks} do not have scope
   only functions have scope - vars defined in a function are not visible outside of the function
   if you create a variable ANYWHERE inside a function, it is visible everywhere in the function
   if you create a variable twice inside a function, it only gets created once
   javascript has implied globals - if you create a variable and forget to declare it, it assumes global
in strict mode, references to undeclared variables is an error
```javascript
// it's as-if these statements happen here: (don't think order matters - they are all declared in same memory space)
// var a = undefined;  -> as global
// var b = undefined;  -> as global
// entire function test, variables are inspected and function is linked to global object
// var d = undefined; -> as global (but doesn't happen until test is called)
// var e = undefined; -> as global

var a = 1;  // definition: hoisted; declaration: assignment happens here
b = 2;         // definition: hoisted; declaration: assignment happens here

console.log("before function call (a,b): (" + a + ',' + b + ")"); // before function call (a,b): (1,2)

test();     // execute function -> inside (a,b,c): (1,2,undefined)

// definition of function:  hoisted

function test() {
// it's as-if the following statements happen here
// var c = undefined; -> as local to test function

// d is not visible here
console.log("inside (a,b,c): (" + a + ',' + b + ',' + c + ")");
var c = 3;    // scope in function only (assignment happens here)
d = 4;    // this variable is implied global because it was not declared with var keyword
}

// c and d are out of scope and e is not visible here
console.log("outside (a,c,d): (" + a + ',' + b + "," + d + ")"); // outside (a,b,c,d,e): (1,2,4)

e = 5;    // declaration is hoisted, but definition occurs here
```
### Return Statement

In JavaScript every function returns something (there is no void type)
thus return; actually returns undefined and no return statement does as well
The exception is constructors, whose default return value is the this pointer

### Objects

Nearly everything is an object, including arrays and functions
Objects can contain data and methods
Objects can inherit from other objects
Objects are an unordered collection of name/value pairs
Names are strings and values are any type, including other objects
Every object is a little database
Objects are always passed by reference to functions
=== (and ==) operator compares object references, not values
members can be deleted with: delete myObject[name];

###Object Literals

Object literals are wrapped in {}
Names can be names or strings (i.e. quotes or no quotes)
Values can be expressions
Object literals can be used anywhere a value can appear
three ways to create an object:

1.  new Object()
2.  object literal {}
3.  Object.create(o)
```javascript
var myObject = { name: 'travis', age: 45 };

// use dot notation to access a member
console.log(myObject.name); // travis

// use subscript notation to access a member
console.log(myObject["age"]); // 45
```
### Maker Function (i.e. a factory)

another way to make an object
```javascript
function makerFactory(name, age) {
   var me = {};
   me.name = name;
   me["age"] = age;
   return me;
};
var myObject = makerFactory("travis", 45);
console.log(myObject); // {age: 45, name: "travis"}
```
###Object Augmentation

You can add new stuff to an existing object at any time (no need to define a new class)
```javascript
var myObject = { name: 'travis', age: 45 };
myObject.personality = 'weird';
myObject["color"] = 'white';
console.log(myObject); // {age: 45, color: "white", name: "travis", personality: "weird"}
```
### Linkage

When objects are created, they are done so with a secret link to another object (this is how inheritance is achieved)
If an attempt to access a name fails, the secret link object will be used
The secret link is not used when storing (new members are only added to the primar object);
All objects are descended from Object; they inherit methods and properties from Object.prototype
The Object.create(o) Creates a new object with the specified prototype object and properties.
   All objects are linked directly or indirectly to Object.prototype
```javascript
var myOldObject = { name: 'travis', age: 45 };

//myNewobject links to myOldObject; i.e. myObject inherits from myOldObject
var myNewObject = Object.create(myOldObject);
console.log(myOldObject); // {age: 45, name: "travis"}
console.log(myNewObject); // {age: 45, name: "travis"}

myNewObject.name = 'bob';
myNewObject.address = 'some address';
myOldObject.blah = 5;
console.log(myOldObject); // {age: 45, blah: 5, name: "travis"}
console.log(myNewObject); // {address: "some address", age: 45, blah: 5, name: "bob"}

delete myNewObject["name"];
console.log(myOldObject); // {age: 45, blah: 5}
console.log(myNewObject); // {address: "some address", age: 45, blah: 5, name: "travis"}

delete myOldObject["name"];
console.log(myOldObject); // {age: 45, blah: 5}
console.log(myNewObject); // {address: "some address", age: 45, blah: 5}

myOldObject = undefined;
console.log(myOldObject); // undefined
console.log(myNewObject); // {address: "some address", age: 45, blah: 5}
```
### Garbage Collection

There is mark and sweep garbage collection

Arrays

Array inherits from Object
Indexes are converted to strings and used as names for retrieving values
Very efficient for sparse arrays, but not so much for other
   One advantage: no need to provide a length or type when creating an arrays
Arrays, unlike objects, have a special length member, doesn’t represent number of elements in the arrays
length is always one larger than highest integer subscript
DO NOT USE for..in with arrays
   you can add stuff to arrays at any time
append with myList[myList.length] = ‘some value’; or myList.push(‘some value’);
some array methods: concat, join, pop, push, slice, sort, splice
Arrays get linked to Array.prototype
ways to determine if array: (1) value.constructor === Array (2) value instancof Array
Don’t use arrays as prototypes (i.e. do not inherit from arrays) - you won’t get length property
```javascript
var myArray = [2, 4, 6];

// avoid doing this
//for(i in myArray) { console.log(i); }

// use this instead
myArray.forEach(function(element, index, array) {
   //console.log(element);
});

// constructor function (allows you to add prototype functions)
var Counter = function() { this.sum = 0, this.count = 0 }; // definition only

//add a function called add to Counter object (it will have handle to this pointer of Counter)
Counter.prototype.add = function(array) {
   array.forEach(function(element, index, array) {
      this.sum += element;
      this.count = array.length;
   }, this); // this reference references to Counter because add function will belong to it
};

Counter.prototype.clear = function() { this.sum = 0; this.count = 0; };

var myArrayCounter = new Counter();
myArrayCounter.add(myArray);
console.log(myArrayCounter);  // {count: 3, sum: 12}

// append to the array (a couple of ways)
myArray[myArray.length] = 8;
myArray.push(10);

myArrayCounter.clear();
myArrayCounter.add(myArray);
console.log(myArrayCounter);  // {count: 5, sum: 30}

console.log(myArray);
delete myArray[1];    // removes element, leaves hole
console.log(myArray);
myArray.splice(1,1);  // removes element and hole
console.log(myArray);

// determine if reference is Array
console.log(myArray.constructor === Array);  // true
console.log(myArray instanceof Array);  //true
```
### Functions

They are first-class objects
They can be passed, returned, and stored just like any other value
They inherit from Object and can store name/value pairs
The function operator: function optionalName(optionalParameters) { statements; }
A function can appear anywhere that an expression can appear
other languages call it lambda
it is a secure construct (scopes)
function foo(){} expands to var foo = function(){};
Functions can be defined inside of functions (inner)
inner functions have access to variables and params of functions that it is contained within
above is known as static or lexical scoping
closure: The scope that an inner function enjoys continues even after the parent functions have returned
don’t create functions in a loop
When a function is stored in an object, we call it a method
if a function is called with too-few values, the other arguments are treated as undefined
functions have access to the arguments array-like object that represents a list of passed parameters (not real array)
5 ways to call a function

Function Form: myFunction(arguments);
a. the this pointer is set to the global object
Method Form: this.myMethod(arguments);
a. the this pointer is set to the bounding object
Constructor Form: new MyFunctionObject(arguments);
a. a new object is created and assigned to the this pointer that is internal to the function
b. if there is not an explicit return value, the this pointer will be returned
```javascript
function MyFunctionConstructor(name, age) {
this.name = name;
this.age = age;

// declaring it here is not must effective way because each instance will set it
MyFunctionConstructor.prototype.sayHello = function() { return 'hello ' + this.name };
}

// using new operator causes newObject to link to MyFunctionConstructor.prototype
var newObject = new MyFunctionConstructor('travis', 45);

console.log(newObject.sayHello());
```
Apply Form: myFunctionObject.apply(thisObject, [ arrayArguments ]);
Call Form: myFunction.call(thisObject, arguments);

### Augmenting Built-in Types by adding to prototype - it will apply to all instances of that type

Object.prototype
Array.prototype
Function.prototype
Number.prototype
String.prototype
Boolean.prototype
```javascript
var  someString = "abcd";
console.log(someString); // abcd

String.prototype.addFavDay = function() {
   return this + " (Friday!!!)";
};

console.log(someString.addFavDay()); // abcd (Friday!!!)
console.log("xyz".addFavDay());  // xyz (Friday!!!)
```
### typeof
   TYPE 	typeof
   object 	‘object
function 	‘function’
array 	‘object’
number 	‘number’
string 	‘string’
boolean 	‘boolean’
null 	‘object’
undefined 	‘undefined’
eval

powerful and dangerous - recommend you don’t use it - for Json use JSON.parse(text[, reviver])
gives you access to the javascript compiler and interpretter
The eval(string) function compiles and executes the string in the context of the eval function and returns the result.
   it is what the browser uses to convert strings into actions
It is one of the most misused features of the language.
   It calls new Function(parameters, body) and that is what gives you access to compiler

###Douglas Crockford object inheritance method
```javascript
function object(o) {
function F() {}
F.prototype = o;
return new F();
}
```
### The (global) Object

it doesn’t have a name
it is the container for all global variables and all built-in objects
Sometimes the this pointer points to it (var global = this;)
on browsers, window is the global object
(i.e. assigned to the global object a window member whose value is the global object)
global variables are evil
use of global namespace has to be minimized
Any var which is not properly declared is assumed to be global by default
JSLint is a JS Compiler written in JavaScript which helps identify implied globals and other weaknesses
Build your own namespaces

### Threads

Threads are evil - language definition is neutral on threads
most application environments (like browsers) do not provide it

### Prototypal Inheritance

class-free
Objects inherit from objects
An object contains a secret link to another object called proto (mozilla) - don’t use
```javascript
function object(o) {
function F() {}
F.prototype = o;
return new F();
}

var newObject = object(oldObject);
// newObject.__proto__ -> oldObject

var grandParent = {
   one: function() { return 1; },
   two: function() { return 2; }
};

var parent = object(grandParent);
parent.three = function() { return 3; };

var child = object(parent);
console.log(child.one());         // 1
console.log(child.two());         // 2
console.log(child.three());     // 3
```
### Example of a memoize function
```javascript
function memoizer(lookupTable, formula) {

// this is the function returned
var recursiveFunction = function(currentNumber) {

   // first look in table to find result
   var result = lookupTable[currentNumber];

   // if we don't find, use recursion to find result for formula
   if (typeof result !== 'number') {
      result = formula(recursiveFunction, currentNumber);
      lookupTable[currentNumber] = result;
   }

   return result;
}

return recursiveFunction;
}

var factorial = memoizer([1,1], function (recursiveFunction, currentNumber) {
return currentNumber * recursiveFunction(currentNumber - 1); //formula for factorial
});

console.log(factorial(10)); // 3628800
```
## singleton example
```javascript
var singleton = function() {
   var privateVariable = 4;
   function privateFunction(x) {
      console.log(x);
   }
   return {
      displayAdd: function(a, b) {
         privateFunction((a + b + privateVariable));
      }
   };
}();

singleton.displayAdd(1,2); // 7
console.log(singleton.privateVariable); // undefined
console.log(singleton.privateFunction(4)); // error
```
```javascript
// a simple global object
var obj = {num:2};

// a simple global function
var addToThis = function(a, b) {
   return this.num + a + b;
}
```
### 1. fun.call(thisArg[, arg1[, arg2[, …]]]) - How does the call() method work
```javascript
//temporarily attach addToThis() function to Object obj and pass the given params
//note: this function will not be given
//param1: the object you are applying the function to
//param2: the argument to use in the function
console.log(addToThis.call(obj, 3, 4));
```
### 2. fun.apply(thisArg, [argsArray]) - how does the apply() method work
```javascript
//apply works the same as call, but uses array
var arr = [3, 4];
console.log(addToThis.apply(obj, arr));
```
### 3. fun.bind(thisArg[, arg1[, arg2[, …]]]) - how does the bind() method work
```javascript
// creates a new function that, when called, has its 'this' keyword set to the provided obj
var newFunction = addToThis.bind(obj);
console.log(newFunction(3,4));
```
### 4. function.toString() - returns a string representing the source code of the function
```javascript
console.log(addToThis.toString());
```
### 5. function arguments - arguments is implicit object for all functions
```javascript
var anotherFunction = function(a, b, c) {
   console.log(arguments);
   console.log(arguments.length);
   console.log(arguments[0]);
   console.log(arguments[1]);
}
anotherFunction(1, 2, 3);
```
## JavaCcript Object Creation Patterns (4 ways)

Useful Links

JS Fiddle - Test your code
Typescript Playground

```
##Object Creation Patterns
###1. Constructor Pattern​
```javascript
var peopleConstructor = function(name, age, state) {
   this.name = name;
   this.age = age;
   this.state = state;

   // every instance that is created gets a copy of the display function; thus creating functions
   // inside the constructor is poorer performance.
   // to avoid creating this every time, use prototype (see examples below)
   this.display = function() {
      console.log(this.name + ", " + this.age + ", " + this.state);
   }
}

var travis = new peopleConstructor('travis', 45, 'MD');
var john = new peopleConstructor('john', 22, 'CA');

travis.display();
john.display();
```
    ​
### 2. factory pattern
```javascript
// option 1: use property setters on object
var peopleFactory = function(name, age, state) {

   // create a new JavaScript object called temp
   var temp = {};

   temp.age = age;
   temp.name = name;
   temp.state = state;

   // each instance also gets its own display function (similar to constructor pattern)
   temp.display = function() {
      console.log(this.name + ", " + this.age + ", " + this.state);
   }

   // return a reference to the new JS object
   return temp;
}

// option 2:  use JSON notation
var peopleFactory = function(name, age, state) {

   // create a new JavaScript object called temp
   var temp = {
      age: age,
      name: name,
      state: state,
      display: function() {
         console.log(this.name + ", " + this.age + ", " + this.state);
      }
   };

   // return a reference to the new JS object
   return temp;
}

// option 3: instantiate using Object
var peopleFactory = function(name, age, state) {

   // create a new JavaScript object called temp
   var temp = new Object();

   // set can either be done like in option 1 or as...
   temp['age'] = age;
   temp['name'] = name;
   temp['state'] = state;

   // each instance also gets its own display function (similar to constructor pattern)
   temp['display'] = function() {
      console.log(this.name + ", " + this.age + ", " + this.state);
   }

   // return a reference to the new JS object
   return temp;
}

var travis = peopleFactory('travis', 45, 'MD');
var john = peopleFactory('john', 22, 'CA');

travis.display();
john.display();
```
### 3. prototype pattern
```javascript
// Object has prototype and instances will share things created on it
// Only add functions to prototype, but not properties

var peopleProto = function() {}
peopleProto.prototype.age = 0;
peopleProto.prototype.name = 'name not set';
peopleProto.prototype.state = 'state not set';
peopleProto.prototype.display = function() {
   console.log(this.name + ", " + this.age + ", " + this.state);
}

var travis = new peopleProto('travis', 45, 'MD');
var john = new peopleProto('john', 22, 'CA');

travis.display();
john.display();
```
### 4. dynamic prototype pattern
```javascript
var peopleDynamicProto = function(name, age, state) {
   this.age = age;
   this.name = name;
   this.state = state;

   // if we don't find display() function, add it to the prototype
   // otherwise every instance would repeat this step
   if (typeof this.display !== 'function') {
      peopleDynamicProto.prototype.display = function() {
         console.log(this.name + ", " + this.age + ", " + this.state);
      }
   }
}

var travis = new peopleProto('travis', 45, 'MD');
var john = new peopleProto('john', 22, 'CA');
```
## How Typescript transpiles it to an object (create class in Typescript)
```javascript
// avoid global variables by defining class in a namespace
var whateverMod;

/* functions wrapped in () will automatically get executed because they are self-executing anonymous functions.
   It is a useful construct when trying to hide variables from the parent namespace. All the code within the
   function is contained in the private scope of the function, meaning it can't be accessed at all from outside the function,
   making it truly private. */
(function (whateverMod) {

   // another self-executing anonymous function to define your 'class'
   // it is only executed one time, no matter the number of instances
   var Person = (function () {

      // acts as a constructor for initializing
      function Person(message, name, age, state) {
         //these are meant to be private fields
         //typescript won't let you modify them, but javascript will
         this.greeting = message;
         this.name = name;
         this.age = age;
         this.state = state;
      }

      // never add public properties to the prototype
      // instead, expose public properties using getters in this manner
      Object.defineProperty(Person.prototype, "getGreeting", {
         get: function () {
            return this.greeting;
         },
         enumerable: true,
         configurable: true
      });

      // functions:  only functions are added to prototype so they are shared between objects
      Person.prototype.display = function () {
         console.log(this.name + ", " + this.age + ", " + this.state);
      };
      Person.prototype.greet = function () {
         return "Hello, " + this.greeting;
      };

      // sample static field
      Person.count = 10;

      return Person;
   }());

   whateverMod.Person = Person;
})(whateverMod || (whateverMod = {}));

var travis = new whateverMod.Person('hello', 'travis', 45, 'MD');
var john = new whateverMod.Person('goodbye', 'john', 22, 'CA');
travis.display();
john.display();

// edit the public property which also has a getter
console.log(travis.greeting);
console.log(travis.getGreeting);
console.log(whateverMod.Person.count);
```
### Example Inheritance using Typescript transpiling
```javascript
// The lookup time for properties that are high up on the prototype chain can have a negative
// impact on performance, and this may be significant in code where performance is critical.
//Additionally, trying to access nonexistent properties will always traverse the full prototype chain

// this helper function is needed to support inheritance
var __extends = (this && this.__extends) || function (d, b) {
   for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
   function __() { this.constructor = d; }
   d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

// define the namespace and then add the classes to it
var Travis;
(function (Travis) {

   // parent class
   var Animal = (function () {
      function Animal(name) {
         this.name = name;
      }
      Animal.prototype.move = function (meters) {
         alert(this.name + " moved " + meters + "m.");
      };
      return Animal;
   }());

   // Animal -> Snake
   var Snake = (function (_super) {
      __extends(Snake, _super);
      function Snake(name) {
         _super.call(this, name);
      }
      Snake.prototype.move = function () {
         alert("Slithering...");
         _super.prototype.move.call(this, 5);
      };
      return Snake;
   }(Animal));

   // Animal -> Horse
   var Horse = (function (_super) {
      __extends(Horse, _super);
      function Horse(name) {
         _super.call(this, name);
      }
      Horse.prototype.move = function () {
         alert("Galloping...");
         _super.prototype.move.call(this, 45);
      };
      return Horse;
   }(Animal));

   // expose the classes for outside use
   Travis.Animal = Animal;
   Travis.Snake = Snake;
   Travis.Horse = Horse;
})(Travis || (Travis = {}));

var sam = new Travis.Snake("Sammy the Python");
var tom = new Travis.Horse("Tommy the Palomino");
sam.move();
tom.move(34);
```
# Other notes on JavaScript

## Versions and Features

### ES5	(2009)					
### ES6/ECMAScript2015		
	arrow functions
    classes
    enhanced object literals
    template strings
    destructuring
    default + rest + spread
    let + const
    iterators + for..of
    generators
    unicode
    modules
    module loaders
    map + set + weakmap + weakset
    proxies
    symbols
    subclassable built-ins
    promises
    math + number + string + array + object APIs
    binary and octal literals
    reflect api
    tail calls
### ES7/ECMAScript2016		
    Array.prototype.includes
    Exponentiation Operator
### ES8/ECMAScript2017		
    Async functions (Async / Await)
    Object.entries
    Object.values
    Object.getOwnPropertyDescriptors
    Trailing commas
### ES9/ECMAScript2018	
    Async iterators
    Object rest properties
    Object spread properties
    Promise.prototype.finally
### ES10/ECMAScript2019					
	Array.prototype.{flat,flatMap}
	Object.fromEntries
	String.prototype.{trimStart,trimEnd}
	Symbol.prototype.description
	Optional catch binding

## ES5 (and javascript in general) 

### primitives
	* Numbers, String, Booleans, Undefined, Null
		o unary plus on numbers is fast way to convert a string to a number (similar to parseInt or parseFloat when decimals are in the number)
			+'2e3' === 2000; but parseInt('2e3',10) === 2;
			+'0xf' === 15; but parseInt("0xf", 10) === 0;
	* assigning primitives are copies of the value (var a=5; b=a; // b will be a copy of a and changing a will not reflect in b); references are copies of the pointer
	* Date
		-- const date = new Date();
		-- date.getDay() // etc.
		-- date.getTime() // gives epoch since 1970
		-- const date = new Date(dateObject);
		-- const date = new Date('07/11/19');
		-- date - date2 = differenceTimeInMillis
### coercion
	* applies to boolean expressions; when using ==, javascript will try to coerce the data type of one of the sides to get them to match
	* use === or !== to avoid coercion	
### falsy values
	* you can have boolean expressions with a single non-boolean value; javascript will use coercion to turn it into boolean
	* there are 7 falsy values; everything else is treated as true
		--  false, 0 (number), 0n (BigInt), "" or '' or ``, null, undefined, NaN (number)	
### object creation in ES5
	* object literal (only 1 copy)
	* function constructor
		-- use prototype for methods because including in constructor would reproduce method for all instances
		-- function Blah(name) { this.name = name; }
		   var newBlah = new Blah(name);
	* var newObject = Object.create(prototypeToUse, { name: { value: 'Jane', configurable: true, enumerable: true, writable: false }}); // 2nd param is object descriptor map
	* new Object(); // this one isn't used that often, but it creates an empty {}
### object creation in ES6+
	* classes - they are basically syntactic sugar and mostly work the same as in javascript
	* supports inheritance; can only extend one class; super must be first line in constructor 
	* constructor is called constructor
	* instanceof operator exists and can be used with DOM elements as well
	* private variables exist, but this is a very new feature; prepend with #
	* for the most part, the "this" pointer refers to the object, but again, depends on how it's called	
		- e.g. if an event listener is added to a method, it's this will be for that element (e.g. button)
			o one way to avoid that is to use an arrow function
			o another way is to use bind()
	* constructor function versus classes
		-- CF: all properties and methods are enumerable by default (i.e. can be used with for (const key in object) {}
		-- classes: methods aree non-enumerable by default
		-- classes always use strict mode whereas CF do not by default
	* functions inside a class are called methods and are declared without the function keyword
		-- they are added to the prototype of the object (every instance shares a copy)
		-- alternatively, you can create a property and assign it a function 
			+ every instance will have it's own copy of the function
			+ one use case for this is to use the arrow function for a function that will be used as a event handlers (it will use "this" of object)
### objects
	* ways to loop through object properties
		-- for (const key in object) 
			o The problem with a for...in loop is that it iterates through properties in the Prototype chain. 
			  When you loop through an object with the for...in loop, you need to check if the property belongs to the object. 
				for (var property in object) {
					if (object.hasOwnProperty(property)) {
						// Do things here
					}
				}
		-- better way to loop through objects is first to convert the object into an array; some techniques to convert to array
			o Object.keys(), Object.values(), Object.entries()
	* can put a variable without a value, a number, a square bracket: const blah = { someVar1, [someVar2]: "someValue", 1.5: "someValue" };
	* copy an object:
		-- const returnedTarget = Object.assign(target, source);
			o Object.assign({}, existingObject);
		-- use the spread operator: const blah = { ...blah1 };
		-- JSON.parse(JSON.stringify(object));
	* property existence
		-- if ('propertyName' in object) {}
		-- if (object.hasOwnProperty(property)) {}
		-- if (object.property === undefined) {}
	* destructuring: const { value0, value1, ...otherValues } = object;
	* getter/setter (same for classes)
		const language = {
		  get current() { return this.name; }
		  set current(name) { this.name = name; }
		}
		language.current = 'EN';
		console.log(language.current);	
	* private variables in classes (not quite supported): #varName
	* object descriptors
		-- Object.getOwnPropertyDescriptor(object, "key")
		-- Object.getOwnPropertyDescriptors(object)
			configurable - you can delete it
			enumerable - appears in for in loop (e.g. for (key in object) {}
			writable - you can update it
		-- Object.defineProperty(object, 'propertyName', { writable: false }); // every value you don't set gets set to false
	* delete a property:  delete object.propertyName
	* all objects inherit from Object; this is sometimes called the "global" Object
	* the global Object has a bunch of static methods; the same can be added to your function constructors
		o Person.someFunction = function() {}
			-- it will not add that function to an instantiation of the Person object 
			-- instead, it adds it to the function constructor (i.e. the function object itself)
### prototype
	* is an Object itself
	* whenever you create an object, it gets a default prototype (e.g. Object.prototype; Person.prototype)
		-- when using "new FunctionConstructor()", the prototype is assigned to the instance upon creation
		-- every object has a prototype and it is how javascript shares code
		-- you can think of prototypes as "fallback objects"; if it cannot find a function, it will look up the chain for a prototype that might have the function
			o this is how ES5 did inheritance
		-- all objects inherit from Object, which also has a prototype
			o if you call personObject.someMethod(), if not in personObject
				+ it will look in personObject's prototype object (i.e. personObject.__proto__), and if not there
				+ it will look in Object's prototype (i.e. personObject.__proto__.__proto__), and if not there
				+ throws an error
			o this is known as the prototype chain
		-- the browser will use the __proto__ for the object's prototype (not meant to be used by programmers)
			o it is present on every object
	* ways to assign functions to prototypes (properties behave similarly)
		-- Person.prototype.functionName = function() {}; // will add this function to the Person's prototype object (i.e. {})
		-- Person.prototype = { functionName() {} }; // can be used to assign many things at once to a prototype (because it is an object)
			o this will replace the prototype object and so a function constructor will lose the constructor() method (DON'T DO IT THIS WAY)
			o one way to create a new object using prototype is:  const p2 = new p.__proto__.constructor(); (demonstrational of function constructor low-level)
	* the fallback of all objects is eventually Object.prototype (not Object and not Object.prototype.__proto__)
	* setting and getting prototype (official way)
		-- Object.getPrototypeOf(object)
		-- Object.setPrototypeOf(object, prototypeToUse)
### this pointer
	* in general, the "this" refers to whatever is responsible for executing the function (but there are exceptions)
	* in a regular function call, it points to the global object (window in the browser)
		o when a function is called within a method, it will point to the global object, even from within an IIFE
	* in a method call, it points to the object that is calling the method
	* in event handler functions, the browser binds it to the DOM element that triggered the event (i.e. event.target)
	* in a function in an IEFE, "this" refers to the wrapper function
		var help = (function() {
		  var test = function() {
			console.dir(this);
		  };
		  return {
			test: test
		  }
		})();
		help.test(); // [object Object] { test: function() { window.runnerWindow.proxyConsole.dir(this); }}				
	* arrow functions are an exception to the cases above
		o they don't bind "this" to anything; "this" refers to the "this" that is outside the arrow function
	* inside a constructor of a class, it refers to the object being created
### hoisting
	* works for variables declared with var and function declarations (but not function expressions)
		-- variables are stored in execution context and initialized to undefined
		-- function declarations are also stored in the execution context; this is why you can call the function before using it
		-- function declaration (DOES HOIST): function() { ... } 
		-- function expression (DOES NOT HOIST):  var someFunc = function() { ... };		
### function
	* all functions have an arguments variable; calling a function without declaring the parameters can still assign values to arguments	
		-- function blah () {}; blah("one", "two"); arguments[0] = "one", etc.
	* each function creates a scope
		-- lexical scoping - a function that is lexically within another function gets access to the scope of the outer function
	* function declaration or statement
	        -- A declared function is “saved for later use”, and will be executed later, when it is invoked (called).
		-- function blah () {}; 
		-- they are hoisted
			alert(foo()); // Alerts 5. Declarations are loaded before any code can run.
                        function foo() { return 5; }
	* function expression
	        -- A function expression can be stored in a variable:  var x = function (a, b) {return a * b};
		-- After a function expression has been stored in a variable, the variable can be used as a function. 
		-- Functions stored in variables do not need function names. 
		-- They are always invoked (called) using the variable name. 
		-- function name can be omitted in function expressions to create anonymous functions (but not function declarations) - see IIFE below
		-- function expressions are not hoisted, which allows them to retain a copy of the local variables from the scope where they were defined.
			alert(foo()); // ERROR! foo wasn't loaded yet
			var foo = function() { return 5; }
		-- benefits:    
			o As closures
			o As arguments to other functions
			o As Immediately Invoked Function Expressions (IIFE)
	* IIFE - Immediately Invoked Function Expression - runs as soon as it is defined (immediately invoked)
		-- (function() { ... })();        
	* functions are objects (inherit from the "global" Object as well)
		-- it also has a prototype (i.e. __proto__)
		-- it also has a special prototype property (called "prototype" in browser); it is related to using the "new" operator on a constructor
			o it's the default object every constructor function get's assigned when instantiated
			o it only exists with functions and is not considered a "fallback" object
			o it is the same reference as the function's __proto__
			o const p = new Person(); p.__proto__ === Person.prototype; // true
### closure
	* functions in JavaScript form closures
	* A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 
	* gives you access to an outer function’s scope from an inner function
		o that is, inner functions have access to the variables of outer functions
	* they are created every time a function is created, at function creation time.	
		function init() {
		  var name = 'Mozilla'; // name is a local variable created by init
		  function displayName() { // displayName() is the inner function, a closure
			alert(name); // use variable declared in the parent function
		  }
		  displayName();
		}
		init();	
	* Closures are useful because they let you associate data (the lexical environment) with a function that operates on that data. 
	  This has obvious parallels to object-oriented programming, where objects allow you to associate data (the object's properties) 
	  with one or more methods.			
### bind, call, and apply
	* often used to control "this" reference
	* call() and apply() are called immediately; bind returns a new function 
		o apply allows you to pass additional arguments as an array
	* bind() can be used to bind parameters
### execution call stack, web API, task/event queue, event loop
	* javascript engine is single-threaded; there is only one execution call stack
	* tasks on the task/event queue will not get executed until the execution call stack is empty
	* setTimeout, ajax, etc. are executed by other web APIs and this is why they are async
		-- callback is placed on task/event queue once web API process returns
		-- it won't get executed until execution call stack is empty 
			(this is why setTimeout for an amount of time is not definite (it will try to run it at the time indicated, but must wait on call stack)
	* the event loop will watch the task/event queue (aka callback queue) for callbacks from web APIs or from event driven callbacks
	* browser wants to repaint the screen like 60 frames a second for example
		-- it is constrained by javascript; it cannot do a render if their is code on the execution call stack (render behaves like a high priority callback)
		-- renderer is giving a higher priority than our callbacks that are on the task/event queue 	
		-- you can use a debounce() to prevent things that are event intensive (e.g. scroll events) from continually pushing things to the task/event queue (which will block rendering)
		-- often referred to as "don't block the event loop" or "keep the call stack empty as much as possible
### arrays 
	* iteratable:  objects that implement "iterable" protocol and have an @@iterator method (i.e. Symbol.iterator); basically can do "for-of" on it
		o NodeList, String, Map, Set
	* Array-Like Object:  objects that have a length property and use indexes to access items
		o NodeList, String
	* creating
		o const arr = [ 1, 2 ];
		o const arr = Array.of(1);
		o const arr = Array.from(nodeList); // convert array-like to array (const arr = Array.from(someString); makes array with each character
		o const arr = new Array(5); // empty array with 5 elements
		o const arr = new Array(5, 2); // two elements 5 and 2 (can also do const arr = Array(5, 2);
	* push(), pop(), shift(), unshift()
	* splice()
		o only works with real arrays
		o can help insert or remove elements (in the middle for example)
		o splice(0) removes all elements
		o var removed = myFish.splice(startIndex, numOfItemsToDelete);
		o hobbies.splice(startIndex, numToDelete, ...itemsToInsert); hobbies.splice(0, 0, 'someNewElement"); // inserts "someNewElement" at index 0
		o works with negative index and will go to end of array and look from the right
	* slice()
		o returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
		o a way to copy an array (arr.slice()) : good way to get a range of an array
		o var arr = slice(startIndex, endIndexNonInclusive);
		o does support negatives index for both and this means it goes from the right
	* concat()
		o used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
		o const arr = array1.concat(array2);
	* indexOf() and lastIndexOf()
	* const objectFound = find((object, index, array) => {}) // or findIndex()
	* includes() returns boolean (same as indexOf() === -1) 
		o good for primitive values
	* forEach((object, index, array) => {})
	* sort((a, b) => a > b ? 1 : a < b ? -1 : 0) 
	* array.reverse()
	* map(), reduce((prevValue, curValue, curIndex, prices) => {}, initialValue), filter()
	* var string = someArray.join(separator); // default is comma
	* spread operator: const copiedNameFragments = [...nameFragements];
	* destructuring: const [ value0, value1, ...otherValues ] = array;
### Maps
	* key/value
	* order is guaranteed, no duplicate keys, key-based access
### Sets
	* order is not guaranteed (no indices) and duplicates not allowed
	* const ids = new Set([1,2,3]);
	* set.has(value), set.add(value), set.entries() // returns iterable, but each entry is an array (like a key/value but they are the same)
	* set.delete(value)
### "use strict" 
	* enforces several javascript rules, such as ensuring all statements end in semicolon, etc.
### can use defer and async to load scripts in HTML (done in <HEAD> section)
	* defer 
		-- tells the browser to download script right away and not block HTML parsing; execution of the script will happen after it is downloaded and after HTML parsing finishes
		-- order is guaranteed
	* async 
		-- tells the browser to download script asap and execute immediately; it does not block the HTML parsing, but still will execute before it finishes
		-- order is not guaranteed
### Error object
	* new Error('some message');
	* throw new Error('some message');
	* when logged, also gives you a stacktrace
	* since it is an object, you can add stuff to it
	
## ES6+

### let and const 
	* block scoping
### arrow functions
	* treat this as lexical scope 
		-- arrow functions don't get their own this reference
		-- their this comes from the outer this
### destructuring
### spread operator
	* can be used with array
		-- const copiedNameFragments = [...nameFragements];
	* can be used with object
		-- const person2 = { ...person, someVar: "override if exists" };
### rest operator
	function(one, two, ...three) {} // three gets treated like an array
### function default parameters
### Map
	* const myMap = new Map();
### classes and subclasses
### string expressions (`${varName}`) 
	* the variables must be expressions (not code)
	* also known as string interpolation
	* also called template literals
	* supports multi-line
### Arrays class 
	* Arrays.from() to convert a NodeList to an array for example 
### for of
	for (const varName of someArray) { }
### promises
	* you can use a shim to polyfill (e.g. es6shim)
### async / await
### fetch / axios (vendor ajax api)
### modules
### classes, inheritance, static, private variables, etc.
	* classes are syntactic suger; methods will be assign to the prototype of the object they are added to

## DOM manipulation

### Element Node versus Text Node
	* .children only returns element nodes (HTMLCollection)
		-- this is usually the most popular
	* .childNodes returns NodeList which will include element and text nodes (all nodes)
	* text nodes	
		- "data" property is the value of the text node
		- text nodes are also used for the whitespace that is between elements (e.g. <HTML>\n<BODY>)
		- cannot have child nodes; they can only hold text
	* parentNode and parentElement are almost always the same, with the exception of the document.documentElement
		- document.documentElement.parentElement = null
		- document.documentElement.parentNode = #document
### document
	* document.body selects the <body> element node
	* document.head selects the <HEAD> element node
	* document.documentElement selects the <html> element node
### you can call querySelector() and querySelectorAll() on any element (and not just document)
	* querySelector():  returns null if no element is found 
	* querySelectorAll(): returns empty NodeList if no element is found
		o takes a snapshot of the dom; additions to real dom are not reflected on snapshot (but reference changes are seen; just not addition/removal of nodes)
		o more flexible than the older getElementsByTagName, but it is a snapshot
### document.getElementById()
	o live (not a snapshot)
	o returns null if no match
### document.getElementByClassName("someCssClassName")
	* returns an empty HTMLCollection if no match
### document.getElementsByTagName("p")
	* returns an empty HTMLCollection if no match 
		o unlike querySelectorAll(), any addition/removal of node will be seen because it is a live list
### document.querySelectorAll() returns a NodeList which looks like an array but isn't
	* can use var newArray = Array.prototype.slice.call(myNodeList); // ES5 way
	* Arrays.from() // ES6 way
### traversal
	* descendant traversal
		-- querySelector() and querySelectorAll() can sometimes be slower than using direct traversal
		-- children (HTMLCollection) or childNodes (NodeList)
		-- firstChild versus firstElementChild (the first one can return text nodes)	
		-- lastChild and lastElementChild
	* ancestor traversal
		-- parentNode and parentElement
		-- closest('cssSelector') 
			o ancestor method that works like querySelector() in that it takes a CSS selector
			o it will pick the nearest ancestor
			o it's css selector query includes the element itself if it matches
	* sibling traversal
		-- previousSibling and previousElementSibling
		-- nextSibling and nextElementSibling
### styling dom elements
	* style property 
		-- assigned on the style property will override any other style assigned by a class, etc.
		-- they are based upon the CSS properties but are adjusted because they don't allow hyphens, for example (e.g. style.backgroundColor)
	* className property 
		-- string
		-- can set to empty string to clear it (className = '')
		-- can set multivalues as such: className = 'classNameOne classNameTwo'
	* classList property
		-- object
		-- easier to manage if you have multiple classes
		-- methods	
			element.classList.contains()
			element.classList.add()
			element.classList.remove()
			element.classList.replace()
			element.classList.toggle() // removes if exists or adds if not
### creating and inserting elements
	* HTML string
		-- innerHTML - add (render) HTML string of an existing element
			o always replaces the current content, including descendants
			o only use if you want to replace all; don't use to add to
		-- insertAdjacentHTML() - add (render) HTML string in a specific position to an existing element
			o 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
			o use this one to add to existing HTML
			o does not give you direct access to the newly added HTML
		-- textContent
			o gives all the text content of all the child elements 
			o you can set it, but it will also remove all the elements in it
			o only use this if text is the content you want to change on your node
	* createElement('tagName')
		-- creates a new element node; e.g. var newElement = document.createElement('li', {is: ...});
	* adding / inserting / replacing / appending nodes
		-- appendChild(node) / append(node) - append new DOM element/node
			o append can also take a string and will append it as a text node; append is not supported by IE and by older browsers
		-- prepend(), before(), after(), insertBefore() - insert new DOM element/node in specific position
			o before and after have issues on safari
		-- replaceChild(), replaceWith() - replace existing element/node with new one
		-- insertAdjacentElement() - add (render) element node in a specific position to an existing element
			o 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
			o safer than before() and after() because it is supported in most browsers
### removing nodes
	* node.remove() - renders the removal of the element from the DOM
		o IE doesn't support it
	* node.parentELement.removeChild(node)
		o supported by all browsers
### clone nodes
	* element.cloneNode(boolean deepClone) - returns a brand new node
		o deepClone true means all child descendants are cloned (all children)
### moving nodes
	* if you get a reference to an existing node and append it somewhere else, it will move the node (not add another)
		const sourceEl = document.getElementById(id);
		const destinationEl = document.querySelector(someCssSelector);
		destinationEl.append(sourceEl); // will move the existing element as child of destinationEl
### data-* attributes (on HTML elements)
	* it is a way to add data to your HTML elements that can be accessed from javascript 
	* it is stored on the DOM node in a Map called dataset (actual type is DOMStringMap)
### element box dimensions
	* element.getBoundingClientRect() // returns DOMRect
	* position is always top left corner (x = left, y = top) to (right, bottom) (y=0 top to y=#### bottom), (x=0 left to x=#### right)
	* el.offsetTop, el.offsetLeft - always relative to your document start, NOT the viewport (i.e. it does not change when scrolling)
	* el.clientTop, el.clientLeft - give you the inner positioning (how far it is from top-left to content of the box)
		o content of box implies box without borders or potential scroll bars
	* el.offsetWidth, el.offsetHeight - height and width of the box, including all borders and scrollbars
	* el.clientWidth, el.clientHeight - inner width and height without borders and scrollbars
	* el.scrollHeight - gives entire height of the content, including the non-visible parts
	* el.scrollTop - tells you how much you scolled content in the box
	* to assign new positions to an element, you need to use CSS (el.style.position = 'absolute'; // to position it relative to the screen)
		--  el.style.left = x + 'px'; el.style.top = y + 'px';
### document width and height
	* window.innerWidth and window.innerHeight
		-- problem is if you have a visible scrollbar, it includes it 
	* (better way) document.documentElement.clientWidth and document.documentElement.clientHeight (these deduct any visible scroll bars)
### scrolling
	* to scroll to absolute: el.scrollTo(x, y) // x,y is how much you want to scroll right and down in absolute values (in pixels)
	* to scroll to relative: el.scrollBy(x, y) // x,y is how much you want to scroll right and down from where you are
	* scrollTo() and scrollBy() also take behavior when an object is passed in (e.g. scrollBy({top: 50, behavior: 'smooth' }))
	* to make an element visible: el.scrollIntoView({ behavior: 'smooth' }); // jumps (no animation) when no object is provided
### template tags
	* <template> is an HTML tag that is not rendered on it's own
		-- it's content by default is not rendered, but it is part of the DOM
		-- it can have have an id attributes
		-- of HTML that you want rendered is within the template, to render content:		
			const someTemplate = document.getElementById('someTemplateId');
			const bodyOfTemplate = document.importNode(someTemplate.content, true); // creates a new node with a deep import 
			hostEl.append(bodyOfTemplate);
### load script dynamically
	* example doing it by hand
		const someScript = document.createElement('script');
		someScript.textContent = 'alert("Hi there")';
		document.head.append(someScript);
	* file example
		const someScript = document.createElement('script');
		someScript.src = 'relative/to/html_file/someScript.js';
		someScript.defer = 'true;
		document.head.append(someScript);
	
## Events

### adding event listeners
	* can add onXxxx attribute to the Html element
		-- this is not the preferred way
	* button.addEventListener('click', () => {});
	* add same property that HTML node uses:  button.onClick  = function() {}
		-- doesn't support assigning more than one function this way
### removing event listeners	
	* clone / replaceWith
		static clearEventListeners(element) {
			// doing it this way will drop all event listeners (they will be garbage collected)
			const clone = element.cloneNode(true);
			element.replaceWith(clone);
			return clone;
		}	
	* el.removeEventListener('eventName', sameFunctionHandler)
### to get event listeners in chrome
	getEventListener($0)
### older browsers use event.which versus event.keyCode
### event delegation
	* add a single event handler to a parent element in order to avoid having to add event handlers to multiple child elements
	* the event will propagate up
	* in the handler we get event.target and that tells us where the event actually happened
	* can also do event.target.tagName to get the element tag (e.g. LI, UL, BUTTON, etc.)
### you can assign multiple event listeners to the same object and event the same event type
	* if you add the same event handler function, nothing extra gets added; but new functions will get added
	* be careful when adding multiple event handlers with different functions; if you intended to replace the previous one, you'll need to remove it
		Class DomHelper {
			static clearEventListeners(element) {
				// doing it this way will drop all event listeners (they will be garbage collected)
				const clone = element.cloneNode(true);
				element.replaceWith(cloneElement);
				return clonedElement;
			}
		}
### mouse events, drag events, other events
	* they all have event.target
	* mouse enter, etc.: relatedTarget will tell you the element it was on before entering for example
### to disable an event target
	* event.target.disabled = true; // you'll see disabled on the HTML element
### event.preventDefault()
	* prevents the default behavior 
		-- example a submit button in a form		
### DOM Events have two phases (event propagation)
	1.  capturing phase - down
		* checks for capturing listener first on parent nodes - but by default event listeners turn this off
	2.  bubbling phase - up
		* checks first on child nodes then works it's way up
	* can change to capturing phase if you set the third parameter in addEventListener to true
	* all events will get called while the event propagates (unless propagation is stopped)
	* event.stopPropagation() stops the event from propogating
		-- any other listeners for the same type of event on an ancestor will not receive event
	* not all events propagate (see reference for each event)
		-- click event does propagate
		-- can log the event and "bubbles: false" means it doesn't propagate
	* event delegation - means to have an event listener on an ancestor versus putting it on all the children
		-- event.target - the actual element on which you clicked
		-- event.currentTarget - the element you added the listener to
		-- event.target.closest('li') - to get the closest ancestor (<li> element in this case) of the target
### trigger events
	* if you trigger an event programmatically, any existing event listener will be skipped
	* el.click() - triggers click event on the element
### how to add drag and drop capability
	1.  required: mark element as "draggable"
		* on the element in the HTML, add attribute draggable="true"
	2.  required: listen to "dragstart" event - describe operation and append data
		* el.addEventListener('dragstart', event => { event.dataTransfer.setData('text/plain', this.id); event.dataTransfer.effectAllowed = 'move'; });
		* can append id in the event handler so that we know what to do with it when it is dropped
	3.  required: mark an area where it can be dropped by adding an event listener (i.e. drop zone)
		* accept drop via "dragenter" and "dragover" Events 
		* in the event listeners, you need to call event.preventDefault()
		* el.addEventListener('dragenter', event => { 
			 if (event.dataTransfer.types[0] === 'text/plain') {
				el.parentElement.classList.add('droppable'); // this is a homegrown CSS class that provide UI visibility
				event.preventDefault(); 
			 }	 
		  });
		  el.addEventListener('dragover', event => { 
			 if (event.dataTransfer.types[0] === 'text/plain') {
				event.preventDefault(); 
			 }
		  });
		* you cannot read / get the data here
	4.  optional: listen to "dragleave" Event - e.g. update styles
		  el.addEventListener('dragleave', event => { 
			 if (event.relatedTarget.closest('someCSSselectorForParent') !== el) { // relatedTarget points at the element we moved to
				el.parentElement.classList.remove('droppable');
			 }		   
		  });	
	5.  required: listen to "drop" Event, then update data / UI
		* we can now extract data we added in the dataTransfer 'dragstart' event
		  el.addEventListener('drop', event => { 
			 const dataId = event.dataTransfer.getData('text/plain');	
			 // if find your element by id here, don't add it (return)
			 // add to this area
			 // remove from old area 
			 el.parentElement.classList.remove('droppable');
			 event.preventDefault(); // not required
		  });
	6.  optional: listen to a "dragend" Event, then update data / UI
		* do this in same place you added the 'dragstart' event listener
		* el.addEventListener('dragend', event => { 
			 // do something if you want	
			 // you can check the event.dataTransfer.dropAffect to see if it is "none" which means it didn't work
		  });
		
### Async stuff

### call once: const id = setTimeout(callback, timeInMillis); 
	* executed by web API call - that's why it is async (javascript engine is single threaded)
	* callback goes onto task queue when time has elapsed 
	* callback won't be called until execution stack is empty (thus it may have to wait a longer than timeInMillis
	* to stop: clearTimeout(id);
### call periodically: const id = setInterval(callback, timeInMillis, []);
	* to stop: clearInterval(id); // clearTimeout(id) works too, but use this one
### const promise = new Promise((resolve, reject) => { resolve(data) or reject(error) });
	* promise.then((success) => { return anotherPromise; }, error => console.log(error)).then((success) => {}).catch((error) => {}).finally(() => {});
	* returning something from then() will auto-wrap it in a promise (return a string that is)
	* you can add .catch() anywhere in the chain; it will catch any error that happens in the promise chain
		-- but it does not cancel the entire promise chain
		-- you can return another promise from it and then() blocks there after will continue to work
		-- even if you don't return a promise from a catch(), then() blocks that are after will execute
			o when you have another then() block after a catch() or then(), the promise re-enters PENDING mode 
		-- move catch() to end to cancel the then() chain on error
		-- you can have multiple catch() blocks
		-- promise states
			PENDING => promise is doing work; then() nor catch() will execute
			RESOLVED => promise is resolved; then() executes
			REJECTED => promise was rejected; catch() executes
			SETTLED => this is a final mode; there are no more then() or catch()
	* both then() and catch() always return a new Promise()
	* once SETTLED, you can use a special block finally() to do final cleanup work
### aysnc / await
	* less syntax then promises; it replicates then() blocks behind the scenes (catch() blocks are handled with inner try/catch)
	* can only be used with functions (await will only work inside an async function)
	* async functions automatically return a Promise; it wraps all the content of the function in a promise
	* add await in front of any Promise within; it awaits for it to succeed or fail (blocks - well really it is waiting to call the invisible then() or catch())
	* async function imWrappingContentInAPromise() { await somePromise(); console.log("I will run once somePromise resolves or rejects"); }
	* to do error handling, use a try/catch/finally block (wrap your await command with try/catch)
### Promise.all([ promiseOne, promiseTwo ]).then((combinedDataOfAllPromises) => { })
	* static method
	* takes an array of promises
	* executes all promises and waits for all of them to finish before sending results to then()
	* returns an array of values, one element per promise, unless one of the promises fail
	* if one promise fails, it cancels and only the error will return to the then() or catch()
### Promise.allSettled() 
	* same as promiseAll(), but it makes sure all promises finish, even if one fails
	* returns an array with status/reason on error (status: "rejected") and status/value if success (status: "fulfilled")
### Promise.race([ promiseOne, promiseTwo ]).then((fastestResult => console.log(fastestResult));
	* static method
	* takes an array of promises
	* the data returned will be the result of the fastest promise; this includes a reject from a promise
	
## browser objects

### window
	* the global object for browsers
	* it contains location, document, history, navigator
### location
	* location.href = 'url';
	* location.replace(''); // back button won't work
	* location.host // tells you the host the file is running on
	* location.origin // full domain including protocol
	* location.pathname // the path after 
### history
	* allows you to interact with the history
	* history.back // go back to page we came from 
	* history.forward
	* history.length // how many steps the user took in current tab
	* history.go(5) // go back 5 steps
### navigator
	* allows you to interact with the browser and limited OS
	* navigator.userAgent // all browser names (thus not really that useful)
	* navigator.clipboard
	* navigator.geolocation.getCurrentPosition((data) => console.log(data)) 
		-- const promise = new Promise((resolve, reject) => {
			  navigator.geolocation.getCurrentPosition(success => resolve(success), error => reject(error), options);
		  });
		  promise.then(success => console.log(success)).catch(error => console.log(error));

## HTTP requests

### dummy online server for testing: JSONPlaceHolder
### const xhr = new XMLHttpRequest();
	* supported by all browsers
	* xhr.open('GET', 'https://jsonplaceholder.typicode/posts');
		-- no network activity starts here
		-- 1st arg is the HttpMethod
		-- 2nd arg is the URL
	* xhr.responseType = 'json'; // like an ACCEPT header
	* xhr.send();
		-- sends the request to the server, but does not receive the response here (asynchronously)
		-- need a listener callback to handle the response
	
	* callback listener 1:  xhr.onload = function() { console.log(xhr.response); }
		-- widely supported by all browsers
	* callback listener 2:  xhr.addEventListener(() => {});
		-- some browsers don't support it (IE and old versions)
	* xhr.response 
		-- gives you JSON data and is not javascript you can work with it
		-- JSON.parse(xhr.response) -> converts JSON to javascript
	* xhr.onerror = function() { console.log(xhr.response); console.log(xhr.status); }
		-- only gets called if we have a network error 
		-- if request succeeds and you get any server response (error or not), it will go into onload
		-- so you'll want to check your in your onload handler
			if (xhr.status >= 200 && xhr.status < 300) { resolve(xx); } else { reject(xx); }
	* JSON
		-- can only store data, no functions or methods
		-- fields/properties have to be wrapped with double quotes
		-- use JSON.stringify(javascriptObject) to convert a javascript object to JSON 
	* function sendHttpRequest(method, url, requestPayload) {
		 const promise = new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.responseType = 'json';
			xhr.onLoad = function() {
				resolve(xhr.response);
			}
			xhr.send(requestPayload) // if 'POST', 'PUT', etc.
		 });
		 
		 return promise;
	  }
	  sendHttpRequest('GET', 'https://blah').then(responseData => { console.log(JSON.parse(responseData)) });
	* xhr.setRequestHeader('Content-Type', 'application/json'); // once added, it cannot be removed
		-- can call it multiple times to add additional headers
### fetch API
	* a more modern alternatively; IE and some older browsers don't support it
	* it is a globally available function
	* const promise = fetch(url);
		-- sends a 'GET' request to that URL
	* by default, it is Promise based; calling it returns a promise
	* fetch does not give us a fully parsed response; instead it gives us a stream response
		-- fetch(url).then(response => response.json());
		-- response.json() turns the stream response into fully parsed javascript object, but as a Promise
	* response.text - returns plain text
	* response.blob() - gives access to file or binary data
	* there is probably a way to read/write from stream
	* fetch(url, {
		 method: 'POST',
		 body: JSON.stringify(requestPayload),
		 headers: {
			'Content-Type': 'application/json'
		 }
	  }
	* errors behave similarly to XMLHttpRequest
		-- any response from server won't go to promise catch() block
		-- can check in then() block for correct status
		-- error handling is klunky
### sending form data
	* const fd = new FormData();
	  fd.append('key', someValueVar);
	  fd.append('key2', someValueVar2);
	* in the fetch API, set body: data instead of JSON.stringify(data)
	* ContentType: multipart/formdata
	* const fd = new FormFata(formReference); // javascript will try and send all fields in form
		-- requires each form fields to have name attribute
	* not all APIs support FormData
### third party library is better: Axios 
	* easier to use then fetch; don't need to parse to javascript object; you get javascript object automatically
		-- does not treat technically successful responses as successful
		-- throws an error with status code is 400+, 500+, etc.
		-- use error.response
	* axios.get(), etc., returns a Promise
		-- use const reesponse = axios.get(); response.data (but with async/await or then()
	* axios.post(url, requestPayload)
		-- we don't have to set the 'Content-Type' header
		-- axios is smart about setting the headers; for example, if form data, it will set the multipart/formdata Content-Type header correctly
		-- also, requestPayload is JSON.stringify() automatically
		
## modules

### don't need to worry about the order of your script files that depend upon each other when using modules
### with modules, every file gets it's own scope; classes, variables, functions are only available outside when using export
### the window object will still be available to all module files
	o you can add something to the window object
### the globalThis is similar to window (and "this" in non-module files)
	o it is meant to be used with non-browser engines (e.g. node.js)
	o it can be used in the browser as well and it actually points to window in the browser
	o it can be used to read/write data
### even if a file is imported more than once in more than one file, it is only downloaded by the first file that used it
	o when a module file is imported for the first time, it will be downloaded, parsed, and executed
	o thus, you can have code that you execute in the file (this isn't the most common, but it's possible)
### modules run in "strict" mode
### the "this" reference in a module will return undefined
### export
	* export class SomeClass {} 
		-- says SomeClass is available outside the file	
	* used without "default", it is referred to as a named export; the import needs to refer to it by name (for the most part)
	* to the script HTML tag, you add type="module"
		-- <script src="app.js" type="module"></script>
		-- you can add it to multiple scripts
		-- when using it with export / import, you don't need to add the <script> tag for the file being exported / imported
			* it will automatically download the script
		-- do this to your main app.js script and then all other file dependencies will automatically be downloaded
	* will give CORS error when testing with file system; thus it requires a web-server to serve the files
	* you can export more than one thing
	* other examples
		-- export function myFunc() {}
		-- export const myConstant;
	* export default
		-- often used when it is the only element, but can be used with other exports
		-- meant to be used as a default import so you don't need to specify the name
		-- often called a nameless export because javascript ignores the name
			o export default class {} // the class name is optional and ignored if present
		-- you can only have one export default per file
### import
	* can import variables, functions, classes that were exported in other files
	* import { ExactName } from './relative/path/to/file.extension'; // use .. to navigate up
		-- where another file is export ExactName
	* the import statement is automatically sorted to the top
		-- you should always put your statements at the top
	* .mjs is an extension some people use to denote it's a module js file
	* can import from multiple files
		-- import { ServiceOne } from '../services/ServiceOne.js';
		   import { ServiceTwo } from '../services/ServiceTwo.js';
	* can import multiple things from one file
		-- import { someFunction, ServiceTwo } from '../services/ServiceTwo.js';
		-- import * as AnyNameOfYourChoice from '../services/ServiceTwo.js';
			o bundle together all the exports of the file into the object called AnyNameOfYourChoice
			o AnyNameOfYourChoice.someFunction()
			o AnyNameOfYourChoice.ServiceTwo.blah()
		-- you can also use the 'as' notation to assign a new name (i.e. an alias)
			o import { ServiceOne as service } from '../services/ServiceOne.js';
	* importing of default exports
		-- import AnyNameOfYourChoice from './fileName.js'; // this will get assigned the default export of the file
		-- disadvantage is every team member might use a different naming convention when they import the default from the same file
		-- with multiple imports including default
			o import AnyNameOfYourChoice, { NameExportOne, NameExportTwo } from './fileName.js';
	* static versus dynamic import
		-- static import is the normal import syntax; import of file is downloaded when the file that includes the import is executed
		-- dynamic import allows you to load imports conditionally
			o call import('./fileToImport.js'); in your code
			o returns a Promise
				import('./fileToImport.js').then(module => (do your code here and use module to call methods, etc.));
### you can have import of some things and export of things in same file
### for ES5 browsers, can use traceur.js (transpiler) and system.js (modules) together to support ES6 and modules 
	* this is when not using a bundler (e.g. webpack)
	* ensure the following comes before your other script tags
		-- <script src="traceur-compiler/src/traceur.js"></script>
		   <script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
		   <script src="traceur-compiler/src/bootstrap.js"></script>
		   alternative to BrowserSystem: <script src="system.js"></script>
		-- with system.js, use System.import
	* ES6 to ES5 transpiler:  https://github.com/google/traceur-compiler
	  ES6 module support:  https://github.com/systemjs/systemjs

## development servers

### npm serve.js
	* spins up a mini-server
	* it is meant to be used with npm and the node.js runtime
	* sudo npm install -g serve (global package)
	* running serve from the folder that has index.html will cause it to load index.html automatically
	

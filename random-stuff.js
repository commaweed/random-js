JavaScript - the basics (well some of them - Douglas Crockford)
Only has 6 types of values

Numbers
Strings
Booleans
Objects
null
undefined

Numbers

No Integers
Only one type: 64-bit floating point → “Double”
    .1 + .2 != .3 (cuz it’s floating point - so multiply by 100, then scale back)
Number(value) - converts the value into a numer

console.log(Number("275") === 275);
console.log(Number("xyz")); // NaN
console.log(Number("275") === +"275"); //similar to + prefix operator
console.log(parseInt("275", 10)); // second value is the radix (e.g. base-10, base-16), usually good to use

//Math operations are separate, so examples
console.log(Math.floor(245.6));     // 245
console.log(Math.pow(2, 3));        // 8
console.log(Math.max(5,2));        // 5

NaN - the result of an undefined or erroneous operation

console.log(NaN === NaN);  // false, NaN is not equal to anything, including NaN
console.log(typeof NaN === 'number');  // true, NaN is a special number (i.e. 'Not a Number')

//toxic: Any arithmetic operation with NaN as an input will have NaN as a result
//(4 + 3 + 7 + NaN + 33 + 12) -> NaN);

String

Sequence of 0 or more 16-bit characters
Unicode Type: UCS-2, not quite UTF-16 (no awareness of surrogate pairs)
No Character type (= strings with length 1)
Immutable
Similar strings are equal (==)
String literals can use “ or ‘

// common string members (properties and methods)
console.log("travis".length); // 6, 16-bit characters (not same as # unicode chars)
console.log(typeof String(2348) === "string"); // true
console.log("travis".charAt(1) === "r"); // true
console.log("travis".concat("co")); // travco
console.log("travis".indexOf("is") === 4);
// other examples: match, replace, search, slice, split, substring, toLowerCase, toUpperCase

Boolean

only two values, true and false

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

null - a value that isn’t anything
undefined

The default value for variables and parameters
The value of missing members in objects
If you define a variable and don’t initialize it, it gets this value

Objects

Hashtable, but no hash nature is visible (no hash codes or rehash methods)
new Object() produces an empty container of name/value pairs
a name can be any string, a value can be any value (except undefined)
members can be accessed with dot notation or subscript notation

special operator behavior

// always use === which matches value AND type        (or use !==)
console.log(5 == "5"); // true
console.log(5 === "5"); // false

// urnary + prefix works like Number("string")
console.log(typeof +"111" === 'number'); // true

// The guard operator (&&): if 1st operand is truthy, then result = 2nd operand, else result = 1st operand
console.log("true" && 5 === 5);    // 1st operand is truthy, so 2nd operand is result -> true

// the default operator (||): if 1st operand is truthy, they result = 1st operand, else result = 2nd operand
console.log(null || 5 === 5);    // true, 1st operand is falsy, so use default of 5

special for statement - iterate over members of an object

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

switch statements

   switch expression can be number or string
   case values can be expression or value

      Try statement - similar to java (two types of throw statements)

      JavaScript can produce these exception names:

      Error
      EvalError
      RangeError
      SyntaxError
      TypeError
      URIError

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

      With Statement

      Intended as a short-hand for dealing with objects
      It’s ambiguous, error-prone, and you shouldn’t use it (Douglas Crockford)

      with (o) {
         foo = null;    // it could mean o.foo = null or global variable foo = null (it depends on what o is)
      }

      Var Statement

      Defines variables (Dynamic Type - types are determined at runtime)
      initial values are optional
      All declarations are hoisted (as if they are defined and brought to the top - really just declared in memory)
      b = 2; really var b = undefined;
      var b; means b = 2;

      Scope

   {blocks} do not have scope
      only functions have scope - vars defined in a function are not visible outside of the function
      if you create a variable ANYWHERE inside a function, it is visible everywhere in the function
      if you create a variable twice inside a function, it only gets created once
      javascript has implied globals - if you create a variable and forget to declare it, it assumes global
   in strict mode, references to undeclared variables is an error

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

      Return Statement

      In JavaScript every function returns something (there is no void type)
      thus return; actually returns undefined and no return statement does as well
      The exception is constructors, whose default return value is the this pointer

   Objects

   Nearly everything is an object, including arrays and functions
   Objects can contain data and methods
   Objects can inherit from other objects
   Objects are an unordered collection of name/value pairs
   Names are strings and values are any type, including other objects
   Every object is a little database
   Objects are always passed by reference to functions
   === (and ==) operator compares object references, not values
   members can be deleted with: delete myObject[name];

   Object Literals

   Object literals are wrapped in {}
   Names can be names or strings (i.e. quotes or no quotes)
   Values can be expressions
   Object literals can be used anywhere a value can appear
   three ways to create an object:

      new Object()
   object literal {}
   Object.create(o)

   var myObject = { name: 'travis', age: 45 };

// use dot notation to access a member
   console.log(myObject.name); // travis

// use subscript notation to access a member
   console.log(myObject["age"]); // 45

   Maker Function (i.e. a factory)

   another way to make an object

function makerFactory(name, age) {
   var me = {};
   me.name = name;
   me["age"] = age;
   return me;
};
   var myObject = makerFactory("travis", 45);
   console.log(myObject); // {age: 45, name: "travis"}

   Object Augmentation

   You can add new stuff to an existing object at any time (no need to define a new class)

   var myObject = { name: 'travis', age: 45 };
   myObject.personality = 'weird';
   myObject["color"] = 'white';
   console.log(myObject); // {age: 45, color: "white", name: "travis", personality: "weird"}

   Linkage

   When objects are created, they are done so with a secret link to another object (this is how inheritance is achieved)
   If an attempt to access a name fails, the secret link object will be used
   The secret link is not used when storing (new members are only added to the primar object);
   All objects are descended from Object; they inherit methods and properties from Object.prototype
   The Object.create(o) Creates a new object with the specified prototype object and properties.
      All objects are linked directly or indirectly to Object.prototype

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

   Garbage Collection

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

   Functions

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

function MyFunctionConstructor(name, age) {
   this.name = name;
   this.age = age;

   // declaring it here is not must effective way because each instance will set it
   MyFunctionConstructor.prototype.sayHello = function() { return 'hello ' + this.name };
}

// using new operator causes newObject to link to MyFunctionConstructor.prototype
   var newObject = new MyFunctionConstructor('travis', 45);

   console.log(newObject.sayHello());

   Apply Form: myFunctionObject.apply(thisObject, [ arrayArguments ]);
   Call Form: myFunction.call(thisObject, arguments);

   Augmenting Built-in Types by adding to prototype - it will apply to all instances of that type

   Object.prototype
   Array.prototype
   Function.prototype
   Number.prototype
   String.prototype
   Boolean.prototype

   var  someString = "abcd";
   console.log(someString); // abcd

   String.prototype.addFavDay = function() {
      return this + " (Friday!!!)";
   };

   console.log(someString.addFavDay()); // abcd (Friday!!!)
   console.log("xyz".addFavDay());  // xyz (Friday!!!)

   typeof
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

   Douglas Crockford object inheritance method

function object(o) {
   function F() {}
   F.prototype = o;
   return new F();
}

   The (global) Object

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

   Threads

   Threads are evil - language definition is neutral on threads
   most application environments (like browsers) do not provide it

   Prototypal Inheritance

class-free
   Objects inherit from objects
   An object contains a secret link to another object called proto (mozilla) - don’t use

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

   Example of a memoize function

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

   singleton example

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

   On Sun, Feb 28, 2016 at 2:38 PM, Travis Jenkins <travisjenkins@elegantts.com> wrote:

   All,

      It has been awhile since I have played with javascript and below are some sample things I built to help me remember and learn again.  The first part includes a sample for how the built-in function methods and properties work.  The second part gives various ways to build javascript object-oriented code for re-use.  I also included the way Typescript does it (it seems to be the best way) and lastly I included a sample Typescript inheritance example.

      Standard JavaScript built-in function methods and properties

   These samples demonstrate to me how the builtin function methods and properties work
   global object and function (to be used in the samples below

   // a simple global object
   var obj = {num:2};

   // a simple global function
   var addToThis = function(a, b) {
      return this.num + a + b;
   }

   1. fun.call(thisArg[, arg1[, arg2[, …]]]) - How does the call() method work

   //temporarily attach addToThis() function to Object obj and pass the given params
   //note: this function will not be given
   //param1: the object you are applying the function to
   //param2: the argument to use in the function
   console.log(addToThis.call(obj, 3, 4));

   2. fun.apply(thisArg, [argsArray]) - how does the apply() method work

   //apply works the same as call, but uses array
   var arr = [3, 4];
   console.log(addToThis.apply(obj, arr));

   3. fun.bind(thisArg[, arg1[, arg2[, …]]]) - how does the bind() method work

   // creates a new function that, when called, has its 'this' keyword set to the provided obj
   var newFunction = addToThis.bind(obj);
   console.log(newFunction(3,4));

   4. function.toString() - returns a string representing the source code of the function

console.log(addToThis.toString());

   5. function arguments - arguments is implicit object for all functions

   var anotherFunction = function(a, b, c) {
      console.log(arguments);
      console.log(arguments.length);
      console.log(arguments[0]);
      console.log(arguments[1]);
   }
   anotherFunction(1, 2, 3);

   JavaCcript Object Creation Patterns (4 ways)
   Useful Links

    ​
    JS Fiddle - Test your code
   Typescript Playground
   Object Creation Patterns
   1. Constructor Pattern​

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

    ​
    2. factory pattern

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

   3. prototype pattern

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

   4. dynamic prototype pattern

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

   How Typescript transpiles it to an object (create class in Typescript)

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

   Example Inheritance using Typescript transpiling

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

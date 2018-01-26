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
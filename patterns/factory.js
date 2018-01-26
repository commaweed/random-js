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
   };

   // return a reference to the new JS object
   return temp;
};

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
   };

   // return a reference to the new JS object
   return temp;
};

// option 4: using Object.create()
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
   };

   // return a reference to the new JS object
   return temp;
};

var travis = peopleFactory('travis', 45, 'MD');
var john = peopleFactory('john', 22, 'CA');

travis.display();
john.display();
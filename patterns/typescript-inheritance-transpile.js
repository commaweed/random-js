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
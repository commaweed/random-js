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
};

var travis = new peopleProto('travis', 45, 'MD');
var john = new peopleProto('john', 22, 'CA');
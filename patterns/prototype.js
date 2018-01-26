// Object has prototype and instances will share things created on it
// Only add functions to prototype, but not properties

var peopleProto = function() {};
peopleProto.prototype.age = 0;
peopleProto.prototype.name = 'name not set';
peopleProto.prototype.state = 'state not set';
peopleProto.prototype.display = function() {
   console.log(this.name + ", " + this.age + ", " + this.state);
};

var travis = new peopleProto('travis', 45, 'MD');
var john = new peopleProto('john', 22, 'CA');

travis.display();
john.display();
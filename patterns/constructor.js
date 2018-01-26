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
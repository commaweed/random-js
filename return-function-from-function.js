function doConsole(functionName) {
   console.log("executing a function!");
   console.log(functionName + " function ran!");
}

function generateDisplay(functionName) {
   console.log("executing a function!");
   return function() {
      console.log("executing a function!");
      console.log(functionName + " function ran!");
   }
}

var test1 = {
   one: function() {
      console.log("executing a function!");
      return doConsole("one1");
   },
   two: function() {
      console.log("executing a function!");
      return doConsole("two1");
   },
   three: function() {
      console.log("executing a function!");
      return doConsole("three1");
   },
   four: function() {
      console.log("executing a function!");
      return doConsole("four1");
   }
};

test1.one();
test1.two();
test1.three();
test1.four();

console.log('\n\n');

var test2 = {
   one: generateDisplay("one2"),
   two: generateDisplay("two2"),
   three: generateDisplay("three2"),
   four: generateDisplay("four2")
};

test2.one();
test2.two();
test2.three();
test2.four();


/*
executing a function! _display:64:4
executing a function! _display:46:2
two1 function ran! _display:47:2
executing a function! _display:68:4
executing a function! _display:46:2
three1 function ran! _display:47:2
executing a function! _display:72:4
executing a function! _display:46:2
four1 function ran! _display:47:2


_display:82:1
executing a function! _display:51:2
executing a function! _display:53:5
one2 function ran! _display:54:4
executing a function! _display:53:5
two2 function ran! _display:54:4
executing a function! _display:53:5
three2 function ran! _display:54:4
executing a function! _display:53:5
four2 function ran!*/

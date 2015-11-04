/*
 * TreatJS: Sandbox 
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 *
 * Copyright (c) 2014, Proglang, University of Freiburg.
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 * All rights reserved.
 *
 * Released under the MIT license
 * http://proglang.informatik.uni-freiburg.de/treatjs/license
 *
 * Author Matthias Keil
 * http://www.informatik.uni-freiburg.de/~keilr/
 */

var x="[X]";
var global = {x:"[Y]"};

/*
   function printx() {
   "use strict";
   print(this.x);
   function closure() {
//print(this.x);
print(x);
}
closure();
}
global.printx = printx;
//printx();
global.printx();

printx.apply(global);


with(global) {
function printx() {
"use strict";
print(this.x);
function closure() {
"use strict";
//print(this.x);
print(x);
}
closure();
}
printx();
}*/

print(111111111);
var printx = eval("with(global) { (function() { \"use strict\"; print(this.x); function closure() {print(this.x); print(x); } closure.apply(this); }) }");
printx.apply(global);

print(2222222222222)
  var printy = eval("with(global) { (function() { \"use strict\"; print(this.x); function closure() {print(this.x); print(x); } return closure; }) }");
  printy.apply(global).apply(global);



  quit();

  this.x = "[X]";
  function a() {
    print(this.x);
    return function () {
      print(this.x);
    }
  }

//a()();
//a.apply({x:"[Y]"})();

function b() {
  print(this.x);
  function bb() {
    print(this.x);
  }
  bb();
}

//b();
//b.apply({x:"[Y]"});
with({this:{},x:"[Y]"}) {
  function c() {
    //  "use strict"; // see strict mode
    print(this.x);
    function cc() {
      print(this.x);
    }
    cc();
  }
  //c();
}

//({}).eval('x');
//
//this.x=2354245;
//(eval("var fgh = (function() { return this.x;})").apply({x:345}));
var fgh = eval.apply({x:345}, ["(function() { return this.x;})"]);
print(fgh());

//with({get eval(){ console.log('eval called'); return proxied }}) {
//    /* client code */
//  }

quit();



var thisArg = {}
var global = this;
/*
   function m() {
   print("@1.1 " + (this===thisArg));
   print("@1.2 " + (this===global));
   return function() {
   print("@2.1 " + (this===thisArg));
   print("@2.2 " + (this===global));
   }
   }

   m()();
   print("-");
   m.apply(thisArg)();


   var c = function() { return eval("with({this:thisArg}){(function() {print(\"@1.1 \" + (this===thisArg));print(\"@1.2 \" + (this===global));return function() {print(\"@2.1 \" + (this===thisArg));print(\"@2.2 \" + (this===global));}})}"); }
   print("-");
   thisArg.n = c.apply(thisArg);
   thisArg.n()();
   */


function m() {
  print("M:"+(this===global));
  function n() {
    print("N:"+(this===global));
  } n();
}

with({global:{}})
  m.apply({});

  //var myDebugger = new Debugger;
  var myDebugger = new Debugger(m);



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

function A() {
  this.a = "a";
}

function B() {
  this.b = "b";
}
B.prototype = new A();

var b = new B();
print("b.a");
print("..."+(b.a));
print("a in b");
print("..."+("a" in b));
print("Object.hasOwnProperty(b,a)");
print("..."+b.hasOwnProperty("a"));
print("b.b");
print("..."+(b.b));
print("b in b");
print("..."+("b" in b));
print("Object.hasOwnProperty(b,b)");
print("..."+b.hasOwnProperty("b"));
print("b instanceof A");
print("..."+(b instanceof A));
print("b instanceof B");
print("..."+(b instanceof B));


function clone(target) {
  var object = Object.create(Object.getPrototypeOf(target));

  for (var property in target) {
    if (target.hasOwnProperty(property)) object[property] = target[property];
  }
  return object;
}


print("-------------------");
var x = clone(b);

print("x.a");
print("..."+(x.a));
print("a in x");
print("..."+("a" in x));
print("Object.hasOwnProperty(x,a)");
print("..."+x.hasOwnProperty("a"));
print("x.b");
print("..."+(x.b));
print("b in x");
print("..."+("b" in x));
print("Object.hasOwnProperty(x,b)");
print("..."+x.hasOwnProperty("b"));
print("x instanceof A");
print("..."+(x instanceof A));
print("x instanceof B");
print("..."+(x instanceof B));

function A() {
  this.a = "a";
}

function B() {
  this.b = "b";
}
B.prototype = new A();

function clone(target) {
  var object = Object.create(Object.getPrototypeOf(target));

  for (var property in target) {
    if (target.hasOwnProperty(property)) object[property] = target[property];
  }
  return object;
}

function cloneFun(target) {
  var func = decompile(target, {});
  //  print(Object.getPrototypeOf(target));
  func.prototype = target.prototype;
  return func;
}

var X = cloneFun(B);

print("XXXXXXXXXXXXXXXX");
print(B.prototype.a);
print(X);
print(X.prototype.a);

function decompile(fun, env) {
  var body = "(" + fun.toString() + ")"; 
  var sbxed = eval("(function() { with(env) { return " + body + " }})();");
  return sbxed;
}

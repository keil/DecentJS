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

(new Testcase(function(object) {
  object.a = "~";
  object.x = "~";

  var outcome = "";
  outcome += Object.prototype.hasOwnProperty.call(object, "a");
  outcome += Object.prototype.hasOwnProperty.call(object, "b");

  outcome += Object.prototype.hasOwnProperty.call(object, "c");
  outcome += Object.prototype.hasOwnProperty.call(object, "x");
  outcome += Object.prototype.hasOwnProperty.call(object, "y");

  return outcome;
}, this, {}, [{a:4711, b:4712, c:4713}], "Object.hasOwn # 1")).run();



(new Testcase(function(b) {

  var outcome = "";
  for(var property in b) outcome = outcome + " " + property + ":" + b[property] + "-" + Object.prototype.hasOwnProperty.call(b, property);

  outcome+=" / ";

  b.a = "[x]";
  for(var property in b) outcome = outcome + " " + property + ":" + b[property] + "-" + Object.prototype.hasOwnProperty.call(b, property);

  outcome+=" / ";

  delete b.a;
  for(var property in b) outcome = outcome + " " + property + ":" + b[property] + "-" + Object.prototype.hasOwnProperty.call(b, property);

  return outcome;
}, this, {}, [(function(){

  function A() {
    this.a = "[a]";
  }
  function B() {
    this.b = "[b]";
  }
  B.prototype = new A();

  return new B();

})()], "Object.hasOwn # 2")).run();

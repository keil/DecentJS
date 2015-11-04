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
  for(var property in object) outcome = outcome + " " + property + ":" + (property in object);
  return outcome;
}, this, {}, [{a:4711, b:4712, c:4713}], "Object.has # 1")).run();

(new Testcase(function(b) {

  var outcome = "";
  for(var property in b) outcome = outcome + " " + property + ":" + b[property] + "-" + (property in b);

  outcome+=" / ";

  b.a = "[x]";
  for(var property in b) outcome = outcome + " " + property + ":" + b[property] + "-" + (property in b);

  outcome+=" / ";

  delete b.a;
  for(var property in b) outcome = outcome + " " + property + ":" + b[property] + "-" + (property in b);

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

})()], "Object.has # 2")).run();

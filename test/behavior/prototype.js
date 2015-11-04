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

(new Testcase(function(B) {
  var b = new B();
  var outcome = "" ; 

  outcome += (b.a);
  outcome += (b.b);
  outcome += (b.a="[x]");
  outcome += (b.a);
  outcome += (b.b);
  outcome += (B.prototype.a);

  return outcome;
}, {}, {}, [(function() {
  function A() {
    this.a = "[a]";
  }

  function B() {
    this.b = "[b]";
  }
  B.prototype = new A();

  return B;

})()], "Prototype")).run();

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

(new Testcase(function({B:B, A:A, x:x, y:y}) {
  var outcome = "" ;

  B.prototype = new A();
  function C() {};
  C.prototype = new A();

  var a = new A();
  var b = new B();
  var c = new C();

  outcome += (a instanceof A);
  outcome += (a instanceof B);

  outcome += (b instanceof A);
  outcome += (b instanceof B);

  outcome += (c instanceof A);
  outcome += (c instanceof C);

  return outcome;
}, {}, {}, [(function() {
  function A() {
    this.a = "[a]";
  }

  function B() {
    this.b = "[b]";
  }
  B.prototype = new A();

  return {B:B, A:A, x:new A(), y:new B()};

})()], "Prototype # 1")).run();


(new Testcase(function({B:B, A:A, x:x, y:y}) {
  var outcome = "" ;

  var a = new A();

  outcome += Object.getPrototypeOf(x);

  outcome += (a instanceof A);
  outcome += (a instanceof B);

  outcome += (x instanceof A);
  outcome += (x instanceof B);

  return outcome;
}, this, {}, [(function() {
  function A() {
    this.a = "[a]";
  }

  function B() {
    this.b = "[b]";
  }
  B.prototype = new A();

  return {B:B, A:A, x:new A(), y:new B()};

})()], "Prototype # 2")).run();


(new Testcase(function({B:B, A:A, x:x, y:y}) {
  var outcome = "" ;

  var b = new B();

  outcome += (b instanceof A);
  outcome += (b instanceof B);

  outcome += (y instanceof A);
  outcome += (y instanceof B);

  return outcome;
}, {}, {}, [(function() {
  function A() {
    this.a = "[a]";
  }

  function B() {
    this.b = "[b]";
  }
  B.prototype = new A();

  return {B:B, A:A, x:new A(), y:new B()};

})()], "Prototype # 3")).run();

(new Testcase(function({B:B, A:A, x:x, y:y}) {
  var outcome = "" ;

  var a = new A();

  var b = new B();
  var outcome = "" ; 

  outcome += (b.a);
  outcome += (b.b);
  outcome += (b.a="[x]");
  outcome += (b.a);
  outcome += (b.b);
  outcome += (B.prototype.a);

  outcome += (b instanceof A);
  outcome += (b instanceof B);

  return outcome;
}, {}, {}, [(function() {
  function A() {
    this.a = "[a]";
  }

  function B() {
    this.b = "[b]";
  }
  B.prototype = new A();

  return {B:B, A:A, x:new A(), y:new B()};

})()], "Prototype # 3")).run();

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

(function() {

  function A() {
    this.a = "[a]";
  }

  function B() {
    this.b = "[b]";
  }
  B.prototype = new A();

  this.B=B;

  function test() {
    var b = new B();

    print(b.a);
    print(b.b);
    print(b.a="[x]");
    print(b.a);
    print(b.b);
    print(B.prototype.a);
  }

  var sbx = new Sandbox();
  sbx.apply(test, this);
  print("--");
  test();

})();

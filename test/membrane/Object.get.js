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
  var outcome = "";
  outcome = outcome + object.a;
  outcome = outcome + object.b;
  outcome = outcome + object.c;
  outcome = outcome + ((object.d===undefined) ? "~undefined~" : object.d);
  return outcome;
}, this, {}, [{a:4711, b:4712, c:4713}], "Object.get # 1")).run();

(new Testcase(function(object) {
  var outcome = "";
  outcome = outcome + object.a;
  outcome = outcome + object.b;
  outcome = outcome + object.c.x;
  outcome = outcome + object.c.y;
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714, z:{}}}], "Object.get # 2")).run();

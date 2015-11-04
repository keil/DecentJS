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

var arg1 = [{a:4711, b:4712, c:4713}];

(new Testcase(function(object) {
  object.a = "~";
  object.b = "~";
  object.x = "~";
  object.y = "~";

  var outcome = "";
  outcome = outcome + object.a;
  outcome = outcome + object.b;
  outcome = outcome + object.c;
  outcome = outcome + ((object.d===undefined) ? "~undefined~" : object.d);
  return outcome;
}, this, {}, arg1, "Object.set # 1")).run();

var arg2 = [{a:4711, b:4712, c:{x:4713, y:4714, z:{}}}];

(new Testcase(function(object) {
  object.c = {};
  object.c.x = "~";
  object.c.y = "~";
  object.c.z = "~";

  var outcome = "";
  outcome = outcome + object.a;
  outcome = outcome + object.b;
  outcome = outcome + object.c.x;
  outcome = outcome + object.c.y;
  return outcome;
}, this, {}, arg2, "Object.set # 2")).run();

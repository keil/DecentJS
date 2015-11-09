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

  // 1
  outcome += " 1) " + Object.getOwnPropertyNames(object);

  //2

  object.b = 1;
  object.z = 2;
  
  outcome += " 2) " + Object.getOwnPropertyNames(object);

  //3
  
  delete object.y;

  outcome += " 2) " + Object.getOwnPropertyNames(object);

  return outcome;
}, this, {}, [{a:4711, x:4712, y:4713}], "Object.getOwnPropertyNames # 1")).run();

(new Testcase(function(object) {
  object.a = "~";
  object.x = "~";

  object.c.x = "~";
  object.c.z = "~";

  var m = Object.getOwnPropertyNames(object);
  var n = Object.getOwnPropertyNames(object.c);

  var outcome = "";
  for(var p in m) outcome = outcome + m[p];
  for(var p in n) outcome = outcome + n[p];
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.getOwnPropertyNames # 2")).run();

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
  outcome += " 1) ";
  for(var p in object) outcome += p;

  //2

  object.b = 1;
  object.z = 2;

  outcome += " 2) ";
  for(var p in object) outcome += p;

  //3

  delete object.y;

  outcome += " 3) ";
  for(var p in object) outcome += p;

  return outcome;
}, this, {}, [{a:4711, x:4712, y:4713}], "Object.enumberate # 1")).run();

(new Testcase(function(object) {
  object.a = "~";
  object.x = "~";

  var outcome = "";
  for(var property in object) outcome = outcome + property;
  return outcome;
}, this, {}, [{a:4711, b:4712, c:4713}], "Object.enumberate # 2")).run();

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

  object.c.x = "~";
  object.c.z = "~";

  var m = Object.getOwnPropertyNames(object);
  var n = Object.getOwnPropertyNames(object.c);

  var outcome = "";
  for(var p in m) outcome = outcome + p;
  for(var p in n) outcome = outcome + p;
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.getOwnPropertyNames")).run();

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

  object.xx = "~";
  object.xxx = "~";
  object.xxxx = "~";

  object.c.x = "~";
  object.c.z = "~";

  var m = Object.keys(object);
  var n = Object.keys(object.c);

  var outcome = "";
  for(var p in m) outcome = outcome + " " + ((m[p] instanceof Function) ? "~" : m[p]);
  for(var p in n) outcome = outcome + " " + ((n[p] instanceof Function) ? "~" : n[p]);
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.keys")).run();

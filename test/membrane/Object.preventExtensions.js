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
  delete object.b;
  object.x = "~";

  object.c.x = "~";
  delete object.c.y;
  object.c.z = "~";

  var outcome = "" + " a)" + object.a + " b)" + object.b + " c.x)" + object.c.x + " c.y)" + object.c.y + " c.z)" + object.c.z + " x)" + object.x;
  outcome += "?" + Object.isExtensible(object) + " " + Object.isExtensible(object.c);
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.preventExtensions")).run();

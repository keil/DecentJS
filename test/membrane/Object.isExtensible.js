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
  Object.preventExtensions(object.c);

  var outcome = "" + Object.isFrozen(object) + Object.isFrozen(object.c) + Object.isSealed(object) + Object.isSealed(object.c) + Object.isExtensible(object) + Object.isExtensible(object.c);
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.isExtensible")).run();

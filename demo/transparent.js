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

// default sandbox parameters
var __paramst__ = {
  verbose:true,           // Verbose Mode
  statistic:true,         // Enable Statistic
  decompile:true,         // Decompile
  membrane:true,          // Membrane
  effect:true,            // Effect
  transparent:true ,      // Transparent
  metahandler:true,       // MetaHandler
  nativepassthrough:true, // Native Function pass-through
  out:ShellOut()          // Output
}

var x = 1;
var y = 1;
var z = 1;

var o = {x:0, y:0}

function f() {
  o.x = x;
  o.y = y;
  o.z = z;
  z = x+y+z;
}

function show() {
  var s1 = "x) " + x + ", y) " + y + ", z) " + z;
  var s2 = "o.x) " + o.x + ", o.y) " + o.y + ", o.z) " + o.z;
  var prints = print;
  prints(s1);
  prints(s2);
}

show();

var sbx = new Sandbox(this, __paramst__);
sbx.apply(f);

show();

sbx.rollback();

show();

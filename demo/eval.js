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

var x = 4711;
this.y = 4712;

var sbx = new Sandbox(this, Sandbox.DEFAULT);
sbx.apply(function() {
  x="1";
  y="1";

  //eval("'use strict'; y=999; var z = 999; print(\"EVAL$z: \"+z)");
  eval("y=999; var z = 999; print(\"EVAL$z: \"+z)");

  print("SBX$x: " + x);
  print("SBX$y: " + y);
  print("SBX$z: " + z);

});

print("GLOBAL$x: " + x);
print("GLOBAL$y: " + y);
//print("GLOBAL$z: " + z);

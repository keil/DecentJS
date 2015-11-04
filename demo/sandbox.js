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


var x = 1;
var y = 1;
var z = 1;

function f() {
  x = x + 1;
  print("x) " + x, ", y) " + y + ", z) " + z);
}

function g() {
  z = x + y;
  print("x) " + x, ", y) " + y + ", z) " + z);
}

function show() {
  print("x) " + x, ", y) " + y + ", z) " + z);
}

var sbx = new Sandbox(this, __params__);
sbx.apply(f);
sbx.apply(f);
sbx.apply(g);
print("x) " + x, ", y) " + y + ", z) " + z);

//sbx.call(f);
//sbx.call(f);
//sbx.call(g);
////print("x) " + x, ", y) " + y + ", z) " + z);

//var sbxf = sbx.bind(f);
//var sbxg = sbx.bind(g);
//sbxf();
//sbxf();
//sbxg();
//print("x) " + x, ", y) " + y + ", z) " + z);

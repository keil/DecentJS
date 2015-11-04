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

var o = {x:0, y:0}

function f() {
  x = 2;
  o.x = 2;
}

var sbx = new Sandbox(this, __params__);
sbx.apply(f);

print("x) " + x, ", y) " + y + ", z) " + z);
print("o.x) " + o.x, ", o.y) " + o.y + ", o.z) " + o.z);

print("InDifference(o): " + (sbx.hasDifferenceWith(o)));

var difso = sbx.differencesOf(o);
print(";;; Differences of o");
difso.foreach(function(i, e) {print(e)});
print("\n");


print("InDifference: " + (sbx.hasDifference()));

var difs = sbx.differences();
print(";;; All Differences");
difs.foreach(function(i, e) {print(e)});
print("\n");

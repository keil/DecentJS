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

function g() {
  z = x+y;
  o.z = o.x+o.y
}

var sbxA = new Sandbox(this, __params__);
sbxA.apply(f);

var sbxB = new Sandbox(this, __params__);
sbxB.apply(g);

print("x) " + x, ", y) " + y + ", z) " + z);
print("o.x) " + o.x, ", o.y) " + o.y + ", o.z) " + o.z);

print("InClonflict(o): " + (sbxA.inConflictWith(sbxB, o)));
//print("InClonflict(o): " + (sbxB.inConflictWith(sbxA, o)));

//var coftso = sbxA.conflictsOf(sbxB, o);
//print(";;; Conflicts of o");
//coftso.foreach(function(i, e) {print(e)});
//print("\n");


////print("InClonflict: " + (sbxA.inConflict(sbxB)));
//print("InClonflict: " + (sbxB.inCconflict(sbxA)));

//var cofts = sbxA.conflicts(sbxB);
//print(";;; All Conflicts");
//cofts.foreach(function(i, e) {print(e)});
//print("\n");

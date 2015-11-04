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
  o.x = x;
  o.y = y;
  o.z = z;
 }

var sbx = new Sandbox(this, __params__);
sbx.apply(f);

var rects = sbx.readeffectsOf(this);
print(";;; Read Effects");
rects.foreach(function(i, e) {print(e)});
print("\n");

var wects = sbx.writeeffectsOf(this);
print(";;; Write Effects");
wects.foreach(function(i, e) {print(e)});
print("\n");

var ects = sbx.effectsOf(this);
print(";;; All Effects");
ects.foreach(function(i, e) {print(e)});
print("\n");

var rectso = sbx.readeffectsOf(o);
print(";;; Read Effects of o");
rectso.foreach(function(i, e) {print(e)});
print("\n");

var wectso = sbx.writeeffectsOf(o);
print(";;; Write Effects of o");
wectso.foreach(function(i, e) {print(e)});
print("\n");

var ects = sbx.effectsOf(o);
print(";;; All Effects of o");
ects.foreach(function(i, e) {print(e)});
print("\n");

// Note:
// - sbx.readeffects
// - sbx.readeffects
// - sbx.effets
// returns a list og all effects

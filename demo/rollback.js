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
  z = x+y+z;
}

function show() {
  var s1 = "x) " + x + ", y) " + y + ", z) " + z;
  var s2 = "o.x) " + o.x + ", o.y) " + o.y + ", o.z) " + o.z;
  var prints = print;
  prints(s1);
  prints(s2);
}

var sbx = new Sandbox(this, __params__);
sbx.apply(f);
sbx.apply(show);

var effects = sbx.writeeffects;
print(";;; Read Effects");
effects.foreach(function(i, e) {print(e)});
print("\n");


sbx.writeeffectsOf(this).foreach(function(i, e) {
  print("Rollback: " + e + "/" + e.origin);
  e.rollback()
});
sbx.apply(show);

sbx.rollback(o)
sbx.apply(show);

//quit();

sbx.apply(f);
sbx.apply(show);
sbx.rollback();
sbx.apply(show);

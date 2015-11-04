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

var sbx = new Sandbox(this, __params__);
sbx.apply(f);

print("o.x) " + o.x, ", o.y) " + o.y + ", o.z) " + o.z + ", z) " + z);


var wects = sbx.writeeffects;
print(";;; Read Effects");
wects.foreach(function(i, e) {print(e)});
print("\n");


wects[0].commit();
print("o.x) " + o.x, ", o.y) " + o.y + ", o.z) " + o.z + ", z) " + z);

sbx.commitOf(o);
print("o.x) " + o.x, ", o.y) " + o.y + ", o.z) " + o.z + ", z) " + z);

sbx.commit();
print("o.x) " + o.x, ", o.y) " + o.y + ", o.z) " + o.z + ", z) " + z);

// Note
// There is not flag to store if an effect is alredy commited

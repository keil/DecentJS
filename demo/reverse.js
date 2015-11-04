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

/**
 * Theoretical mathematicians catch elephants in a cage by building a cage,
 * going inside, closing the door and - defining outside as inside.
 */

var o = {
  x:1,
  y:1,
  f:function() {
    this.z=this.x+this.y;
  },
  g:function() {
    print("this.x) " + this.x, ", this.y) " + this.y + ", this.z) " + this.z);
  } 
}

function f() {
  p.z=p.x+p.y;
}

function g() {
    print("p.x) " + p.x, ", p.y) " + p.y + ", p.z) " + p.z);
  } 

//o.g();
//o.f();
//f();
//o.g();
//g();

var sbx = new Sandbox(this, __params__);
//var p = (sbx.bind(function() { return o; }))();
var p = sbx.wrap(o);

o.g();
p.g();

//f();
//g();
//p.g();
//o.g();

//p.f();
//p.g();
//g();
//o.g();

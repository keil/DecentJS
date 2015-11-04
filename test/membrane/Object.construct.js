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
  var outcome = "";
  outcome += (new object.f()).a;
  outcome += (new (new object.g()).b()).c;
  outcome += (new object.h()).x;
  outcome += (new object.h()).y;
  return outcome;
}, this, {}, [{
  f:function() { 
    this.a = "4711";},
g:function() {
  this.b = function() {
    this.c = "4712";
  }},
h:function() {
  return {x:4713, y:4714};
}}], "Object.construct")).run();

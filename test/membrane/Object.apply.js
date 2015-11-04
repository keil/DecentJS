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
  var outcome = "" + object.f() + object.g()() + object.h().x + object.h().y;
  return outcome;
}, this, {}, [{
  f:function() { 
    return "4711";},
g:function() {
  return function() {
    return "4712";
  }},
h:function() {
  return {x:4713, y:4714};
}}], "Object.apply")).run();

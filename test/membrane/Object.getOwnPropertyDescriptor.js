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

  Object.defineProperty(object,"a", {value: "~"});
  Object.defineProperty(object,"x", {value: "~", configurable:true});
  Object.defineProperty(object.c,"x", {value: "~", enumerablex:false});
  Object.defineProperty(object,"a", {value: "~", enumerablex:false});
  Object.defineProperty(object.c,"z", {value: "~", configurable:true});

  function dump(pd) {
    if(pd===undefined) return "undefined";
    return " value:" + pd.value + " writeable:" + pd.writeable + " enumerable: " + pd.enumerable + " configurable:" + pd.configurable + " get:"+pd.get + " set:"+pd.set;
  }

  var outcome = "  -  " +
//  dump(Object.getOwnPropertyDescriptor(object, "a")) + 
//  dump(Object.getOwnPropertyDescriptor(object, "b")) +
//  dump(Object.getOwnPropertyDescriptor(object, "c")) +
//  dump(Object.getOwnPropertyDescriptor(object.c, "x")) +
//  dump(Object.getOwnPropertyDescriptor(object.c, "y")) +
//  dump(Object.getOwnPropertyDescriptor(object.c, "x")) +
//  dump(Object.getOwnPropertyDescriptor(object, "x"))
    "";

return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.getOwnPropertyDescriptor # 1")).run();

(new Testcase(function(object) {
  var outcome = "" + object.a + object.b + object.c.x + object.c.y + object.c.z + object.x;
  
  var desc = Object.getOwnPropertyDescriptor(object, "c");
  desc.value.x="~";

  outcome += " - " + object.a + object.b + object.c.x + object.c.y + object.c.z + object.x;
  return outcome;

}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.getOwnPropertyDescriptor # 2")).run();

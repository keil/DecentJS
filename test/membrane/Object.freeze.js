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
  "use strict";

  Object.freeze(object);

  var outcome = "";
  outcome += Object.isExtensible(object);
  outcome += Object.isFrozen(object);
  outcome += Object.isSealed(object);

  // update
  try{ 
    outcome += object.a = 'xxx';
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }
  try{
    outcome += object.c.x = 'xxx';
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }

  // extend
  try{
    outcome += object.x = 'xxx';
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }

  // delete
  try{
    outcome += delete object.b;
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }

  // (re)define property
  try{
    outcome += Object.defineProperty(object, 'a', { value: 'xxx' });
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }
  try{
    outcome += Object.defineProperty(object, 'y1', { value: 'y1' });
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }

  try{
    outcome += Object.defineProperty(object, 'a', { get: function() { return 'xxx'; } });
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }
  try{
    outcome += Object.defineProperty(object, 'y2', { get: function() { return 'y2'; } });
  } catch (err) {
    print(err);
    outcome += 'TypeError';
  }

  for(var p in object) {
    outcome += p + ":" + object[p];
  }

  return outcome;

}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.freeze # 1")).run();

quit(); // TODO

(new Testcase(function(object) {
  Object.freeze(object.c);

  var outcome = Object.isFrozen(object.c);

  //object.a = "~";
  //delete object.b;
  //object.x = "~";

//  object.c.x = "~";
//  delete object.c.y;
  //object.c.y = "L";
  object.c.z = "~";

 // var outcome = "" + object.a + object.b + object.c.x + object.c.y + object.c.z + object.x;
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.freeze # 2")).run();

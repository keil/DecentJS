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

  Object.preventExtensions(object);

  var outcome = "";
  outcome += Object.isExtensible(object);
  outcome += Object.isFrozen(object);
  outcome += Object.isSealed(object);

  // update
  try{ 
    outcome += object.a = 'xxx';
  } catch (err) {
    print(err);
    outcome += '1TypeError';
  }
  try{
    outcome += object.c.x = 'xxx';
  } catch (err) {
    print(err);
    outcome += '2TypeError';
  }

  // extend
  try{
    outcome += object.x = 'xxx';
  } catch (err) {
    print(err);
    outcome += '3TypeError';
  }

  // delete
  try{
    outcome += delete object.b;
  } catch (err) {
    print(err);
    outcome += '4TypeError';
  }

  // (re)define property
  try{
    outcome += Object.defineProperty(object, 'a', { value: 'xxx' });
  } catch (err) {
    print(err);
    outcome += '5TypeError';
  }
  try{
    outcome += Object.defineProperty(object, 'y1', { value: 'y1' });
  } catch (err) {
    print(err);
    outcome += '6TypeError';
  }

  try{
    outcome += Object.defineProperty(object, 'a', { get: function() { return 'xxx'; } });
  } catch (err) {
    print(err);
    outcome += '7TypeError';
    throw err;
  }
  try{
    outcome += Object.defineProperty(object, 'y2', { get: function() { return 'y2'; } });
  } catch (err) {
    print(err);
    outcome += '8TypeError';
  }

  for(var p in object) {
    outcome += p + ":" + object[p];
  }

  return outcome;

}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.preventExtensions # 1")).run();

(new Testcase(function(object) {
  object.a = "~";
  delete object.b;
  object.x = "~";

  object.c.x = "~";
  delete object.c.y;
  object.c.z = "~";

  var outcome = "" + " a)" + object.a + " b)" + object.b + " c.x)" + object.c.x + " c.y)" + object.c.y + " c.z)" + object.c.z + " x)" + object.x;
  outcome += "?" + Object.isExtensible(object) + " " + Object.isExtensible(object.c);
  return outcome;
}, this, {}, [{a:4711, b:4712, c:{x:4713, y:4714}}], "Object.preventExtensions # 2")).run();

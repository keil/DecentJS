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

var obj = {};

(function () {
  var value = 0;
  Object.defineProperty(obj, "a", {
    get: function () { return value+1; },
    set: function (arg) { return (value=arg); },
    enumerable: true
  });
})();

obj.a = 1;
print((typeof obj.a)); // number
print(obj.a); // 2

obj.a = 2;
print((typeof obj.a)); // number
print(obj.a); // 3


(function () {
  Object.defineProperty(obj, "b", {
    get: function () { return {toString:function() {return 0}, valueOf:function(){return 1;}}; },
    enumerable: true
  });
})();

print(obj.b); // 0
print(obj.b); // 9
print(obj.b+1); // 2
print(obj.b-1); // 2
print(obj.b*1); // 2

(function () {
  Object.defineProperty(Object.prototype, "c", {
    get: function () {
      var obj = {};
      Object.defineProperty(this, "c", {
        get: function() {return obj;}
      });
      return {};
    },
    enumerable: true
  });
})();

print(obj.c==obj.c); // false
print(obj.c==obj.c); // true



// pROXY
// has keys shows something different than for in

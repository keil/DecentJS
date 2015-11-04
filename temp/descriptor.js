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

var object = {a:4711, b:4711};
var handler = new MetaHandler({
  getOwnPropertyDescriptor: function(target, name) {
    return Object.getOwnPropertyDescriptor(target, name);
  },
    defineProperty: function(target, name, desc) {
      print("XXXXXX");
      print(dump(desc));
      return Object.defineProperty(target, name, desc);
    }
});
var proxy = new Proxy(object, handler);

var desc = {value:5};
//print(dump(desc));

print("a)"+dump(Object.getOwnPropertyDescriptor(object, "a")));
print("b)"+dump(Object.getOwnPropertyDescriptor(object, "b")));

Object.defineProperty(proxy, "a", desc);
Object.defineProperty(object, "b", desc);

print("a)"+dump(Object.getOwnPropertyDescriptor(proxy, "a")));
print("b)"+dump(Object.getOwnPropertyDescriptor(proxy, "b")));
print("a)"+dump(Object.getOwnPropertyDescriptor(object, "a")));
print("b)"+dump(Object.getOwnPropertyDescriptor(object, "b")));

/*
 * TreatJS: Sandbox 
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 *
 * Copyright (c) 2014-2015, Proglang, University of Freiburg.
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 * All rights reserved.
 *
 * Released under the MIT license
 * http://proglang.informatik.uni-freiburg.de/treatjs/license
 *
 * Author Matthias Keil
 * http://www.informatik.uni-freiburg.de/~keilr/
 */

//   _                     
//  /_\  _ _ _ _ __ _ _  _ 
// / _ \| '_| '_/ _` | || |
///_/ \_\_| |_| \__,_|\_, |
//                    |__/ 
//

Object.defineProperty(Array.prototype, "foreach", {value: function( callback ) {
  for( var k=0; k<this .length; k++ ) {
    callback( k, this[ k ] );
  }
},enumerable:false});

// Array Remove - By John Resig (MIT Licensed)
Object.defineProperty(Array.prototype, "remove", {value: function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}, enumerable:false});

Object.defineProperty(Array.prototype, "clone", {value: function() {
  return this.slice(0);
}, enumerable:false});

Object.defineProperty(Array.prototype, "clear", {value: function() {
  while (this.length > 0) {
    this.pop();
  }
}, enumerable:false});


// ___                  
//|   \ _  _ _ __  _ __ 
//| |) | || | '  \| '_ \
//|___/ \_,_|_|_|_| .__/
//                |_|   

function __dump(value) {
  if (value === Object(value)) return "[" + typeof value + "]";
  if (typeof value == "string") return "\"" + value + "\"";
  return "" + value;
}

// ___       __ _          
//|   \ ___ / _(_)_ _  ___ 
//| |) / -_)  _| | ' \/ -_)
//|___/\___|_| |_|_||_\___|

function define (name, value, target) {
  Object.defineProperty(target, name, {
    value: value, enumerable: true
  });
}

function getter(name, getter, target) {
  Object.defineProperty(target, name, {
    get: getter, enumerable: true
  });
}

// ___         _                 
//| _ \__ _ __| |____ _ __ _ ___ 
//|  _/ _` / _| / / _` / _` / -_)
//|_| \__,_\__|_\_\__,_\__, \___|
//                     |___/     

function Package(name) {
  if(!(this instanceof Package)) return new Package();

  Object.defineProperty(this, "name", {
    value: name
  });
}

Package.prototype = {};

Package.prototype.toString = function() {
  return "{Package: "+this.name+"}";
}

Package.extend = function(name, value) {
  Object.defineProperty(this, name, {
    value: value, enumerable: true
  });
}

Package.export = function(name, value, target) {
  Object.defineProperty(target, name, {
    value: value, enumerable: true
  });
}

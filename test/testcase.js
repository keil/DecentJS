/*
 * TreatJS: Higher-Order Contracts for JavaScript 
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

/*
function dumpPassThrough(obj, list = new Set(), cache = new WeakMap()) {
//  if(cache.has(obj)) return list;
//  else cache.set(obj, obj);

  for(var p of Object.getOwnPropertyNames(obj)) {
    if(obj[p] instanceof Function) list.add(obj[p]);
    if(p == "prototype") dumpPassThrough(obj[p], list, cache);
    //if(obj[p] instanceof Object) dumpPassThrough(obj[p], list, cache);
  }
  return list;
}

var passthrough = new Set();
dumpPassThrough(this, passthrough);
dumpPassThrough(Object, passthrough);
dumpPassThrough(Function, passthrough);
dumpPassThrough(Math, passthrough);
dumpPassThrough(Date, passthrough);
dumpPassThrough(Error, passthrough);



print("***", passthrough.size);
//for(var f of passthrough) print("===", f);
print("***");

//throw  new Error();
//quit();
*/
var passthrough = dumpGlobal();
print("size", passthrough.size);

function Testcase(fun, globalArg, thisArg, argsArray, name, quitOnExit) {

  var exit = (quitOnExit!==undefined) ? quitOnExit : true;

  var out = new ShellOut();

  var params = {
    verbose: true,
    statistic: true,
    debug:true,
    passthrough:passthrough,
    /*passthrough:new Set([
      print, 
      valueOf,
      Function, 
      Function.prototype.call, 
      Function.prototype.apply,
      Function.prototype.toString, 
      Object, 
      Object.hasOwnProperty,
      Object.prototype.keys,
      Object.keys,
      Object.prototype.getPrototypeOf,
      Object.prototype.toString,
      Object.defineProperty,
      Object.getOwnPropertyDescriptor,
      Object.getOwnPropertyNames,
      Object.getPrototypeOf,
      Object.setPrototypeOf,
      Object.seal,
      Object.isSealed,
      Object.freeze,
      Object.isFrozen,
      Object.preventExtensions,
      Object.isExtensible
    ]),*/
    out: out
  }

  function run() {
    var sbx = new Sandbox(globalArg, params);

    try{
      var outcomeA = sbx.apply(fun, thisArg, argsArray);
    } catch(e) {
      var outcomeA = e.toString() + "\n" + e.stack;
    }

    try{
      var outcomeB = fun.apply(thisArg, argsArray);
    } catch(e) {
      var outcomeB = e.toString() + "\n" + e.stack;
    }
    
    var result = (outcomeA===outcomeB);

    var id = (sbx!==undefined) ? "@" + sbx.id : "";
    out.out(out.head("TestCase # "+name) + " " +id);
    if(result) out.ok();
    else out.fail();

    out.notice("SANDBOX:  " + outcomeA);
    out.notice("BASELINE: " + outcomeB);

    if(exit && (!result)) quit();
  }
  this.run = run; 
}

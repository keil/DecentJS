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

function Testcase(fun, globalArg, thisArg, argsArray, name, quitOnExit) {

  var exit = (quitOnExit!==undefined) ? quitOnExit : true;

  var out = new ShellOut();

  var params = {
    verbose: true,
    passthrough:[
      print, 
      valueOf,
      Function, 
      Function.prototype.call, 
      Function.prototype.apply,
      Function.prototype.toString, 
      Object, 
      Object.hasOwnProperty,
      Object.prototype.keys, 
      Object.prototype.getPrototypeOf,
      Object.prototype.toString
    ],
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

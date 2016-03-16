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

var global = dumpGlobal();

this.alert = function(str) {
  print(str);
};

function getNewSandbox() {
  // default sandbox parameters
  var sbxArgs = {
    /** Verbose Mode
     * (default: false)
     */ verbose:false,
    /** Enable Statistic
     * (default: false)
     */ statistic:false,
    /** Decompile
     * (default: true)
     */ decompile:true,
    /** Effect
     * (default: true)
     */ effect:false,
    /** Transparent Mode
     * (default: false)
     */ transparent:false,
    /** MetaHandler
     * (default: true)
     */ metahandler:false,
    /** Debug Mode
     * (default: false)
     */ debug:false,
    /** Function pass-through
     * (default: [])
     */ passthrough:global,
    /** Allow Strict Mode Eval
     * (default: false)
     */ eval:true,
    /** Output handler
     * (default: ShellOut)
     */ out:ShellOut()
  }
  return new Sandbox(this, sbxArgs);
}


function makeBenchmark(benchmark) {
  var basestr = read(basefile);
  var runstr = read(runfile);

  if(benchmark instanceof Array) {
    var benchmarkstr = "";
    for(var i in benchmark) benchmarkstr += read(benchmark[i]);

  } else {
    var benchmarkstr = read(benchmark);
  }

  var str = "(function() { \"use strict\";\n " + basestr + benchmarkstr + runstr + "})";
  //print(str);
  var fun = eval(str);
  return fun;
}

function runBenchmark(inSandbox) {
  for(var i in benchmarks) {
    print("\n\n\n*** Include " + benchmarks[i] + " ***");
    var fun = makeBenchmark(benchmarks[i]);
    var sbx = getNewSandbox();
    try{
      if(inSandbox) { 
        sbx.apply(fun);
        print(sbx.statistic);
        print("#effects", sbx.effects.size);
        print("#readeffects", sbx.readeffects.size);
        print("#writeeffects", sbx.writeeffects.size);
        print("#calleffects", sbx.calleffects.size);
        //print(";;; read effects")
        //for(var effect of sbx.readeffects)
        //  print(effect);
        //print(";;; write effects");
        //for(var effect of sbx.writeeffects)
        //  print(effect);
      }
      else fun.apply(this);
    }catch(e){
      print(e);
      print("\n");
      print(e.stack);
    }
  }
}

runBenchmark(true);

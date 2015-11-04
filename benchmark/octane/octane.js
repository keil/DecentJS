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

var base_dir = 'benchmark/octane/';

var basefile = (base_dir + 'base.js');
var runfile  = (base_dir + 'run.js');

var benchmarks = [];

benchmarks.push(base_dir + 'richards.js');
//benchmarks.push(base_dir + 'deltablue.js');
//benchmarks.push(base_dir + 'crypto.js');
//benchmarks.push(base_dir + 'raytrace.js');
//benchmarks.push(base_dir + 'earley-boyer.js'); 
//benchmarks.push(base_dir + 'regexp.js');
//benchmarks.push(base_dir + 'splay.js'); 
//benchmarks.push(base_dir + 'navier-stokes.js');
//benchmarks.push(base_dir + 'pdfjs.js');
//benchmarks.push(base_dir + 'mandreel.js');
//benchmarks.push([base_dir + 'gbemu-part1.js', base_dir + 'gbemu-part2.js']);
//benchmarks.push(base_dir + 'code-load.js');
//benchmarks.push(base_dir + 'box2d.js');
//benchmarks.push([base_dir + 'zlib.js', base_dir + 'zlib-data.js']); //Error: eval not supported
//benchmarks.push([base_dir + 'typescript-input.js', base_dir + 'typescript-compiler.js', base_dir + 'typescript.js']);

//for(var i in benchmarks) print("$$$" + benchmarks[i]);

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
    /** Membrane
     * (default: true)
     */ membrane:true,
    /** Effect
     * (default: true)
     */ effect:true,
    /** Transparent Mode
     * (default: false)
     */ transparent:false,
    /** MetaHandler
     * (default: true)
     */ metahandler:false,
    /** Function pass-through
     * (default: [])
     */ passthrough:[print, Function.prototype.call, Function.prototype.apply, Date, Error, Math, Math.pow, Array, Math.log],
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
      }
      else fun.apply(this);
    }catch(e){
      print(e);
      print("\n");
      print(e.stack);
    }
  }
}

runBenchmark(false);

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

load("lib/padding.js");

load("src/misc.js");
load("src/out.js");
load("src/shell.js");
load("src/statistic.js");

load("src/effect.js");
load("src/sandbox.js");

load('test/testcase.js');
load('test/metahandler.js');

// ==================================================

// default sandbox parameters
var sbxArgs = {
  /** Verbose Mode
   * (default: false)
   */ verbose:true,
  /** Enable Statistic
   * (default: false)
   */ statistic:true,
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
   */ metahandler:true,
  /** Function pass-through
   * (default: [])
   */ passthrough:[print, Function.prototype.call, Function.prototype.apply],
  /** Output handler
   * (default: ShellOut)
   */ out:ShellOut()
}

// ==================================================

quit();

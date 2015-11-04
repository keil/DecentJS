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

function MetaHandler(handler) {
  var out = new ShellOut();
  var metahandler = {
    get: function(target, name) {
      out.notice("call trap: " + name);
      return target[name];
    }
  };
  return new Proxy(handler, metahandler)
}

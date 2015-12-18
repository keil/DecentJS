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

var Policy = (function() {

  function Policy(...rules) {
    if(!(this instanceof Policy)) return new Policy(...rules);

    Object.defineProperties(this, {
      "rules": {
        value: rules
      }
    });
  }
  Policy.prototype = {};
  Policy.prototype.toString = function() {
    return "[[DecentJS/Policy]]";
  }

  Policy.from = function(rules) {
    return new Policy(new Set(rules));
  }

  //                       _   
  // _____ ___ __  ___ _ _| |_ 
  /// -_) \ / '_ \/ _ \ '_|  _|
  //\___/_\_\ .__/\___/_|  \__|
  //        |_|                

  return Policy;

})();

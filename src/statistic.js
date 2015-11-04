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

/** Statistic 
 * Sandbox Statistic.
 */
function Statistic() {
  if(!(this instanceof Statistic)) return new Statistic();

  var statistic = {};

  define("get", function(op) {
    return statistic[op];
  }, this);

  getter("keys", function() {
    return Object.keys(statistic);
  }, this);

  define("increment", function(op) {
    if(statistic[op]===undefined) statistic[op]=0;
    statistic[op]++;
  }, this);

  define("toString", function() {
    var string = "Statistic: ";
    for(op in statistic) {
      string += op+":"+statistic[op]+" ";
    }
    return string;
  }, this);
}

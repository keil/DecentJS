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

function Policy(name) {
  if(!(this instanceof Policy)) return new Policy(name);

  var commits = new Set();

  Object.defineProperties(this, {
    "name": {
      value: name
    },
    "add": {
      value: function(...rules) {
        for(var rule of rules) {
          if(rule instanceof Rule.Commit) commits.add(rule);
        }
      }
    },
    rules : {
      value : commits
    }
  });
}


var Rule = (function() {

  function Rule(target) {
    if(!(this instanceof Rule)) return new Rule(target);

    Object.defineProperties(this, {
      "target": {
        value: target
      }
    });
  }
  Rule.prototype = {};
  Rule.prototype.toString = function() {
    return "[[DecentJS/Rule]]";
  }

  function Commit(target, name, predicate) {
    if(!(this instanceof Commit)) return new Commit(target, name, predicate);
    else Rule.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      },
      "predicate": {
        value: predicate
      },
    });

  }
  Commit.prototype = Object.create(Rule.prototype);
  Commit.prototype.toString = function() {
    return "[[DecentJS/Commit]]";
  }



  var Rules = new Package("Rule");

  // Core Effects
  Package.export("Rule", Rule, Rules);
  Package.export("Commit", Commit, Rules);

  return Rules;

})();

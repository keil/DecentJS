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

var Rules = (function() {

  // ___      _     
  //| _ \_  _| |___ 
  //|   / || | / -_)
  //|_|_\\_,_|_\___|

  function Rule(body, predicate) {
    if(!(this instanceof Rule)) return new Rule(body, predicate);

    if(!(body instanceof Function)) throw new TypeError("Invalid rule body.");
    if(!(predicate instanceof Function)) throw new TypeError("Invalid rule predicate.");

    Object.defineProperties(this, {
      "body" : {
        value: body
      },
      "predicate": {
        value: predicate
      }
    });
  }
  Rule.prototype = {};
  Rule.prototype.toString = function() {
    return "[[DecentJS/Rule]]";
  }
  Rule.from = function(rules) {
    return new Policy(new Set(rules));
  } 

  //  ___                 _ _    ___   __ 
  // / __|___ _ __  _ __ (_) |_ / _ \ / _|
  //| (__/ _ \ '  \| '  \| |  _| (_) |  _|
  // \___\___/_|_|_|_|_|_|_|\__|\___/|_|  

  function CommitOf(type, target, name, predicate) {
    if(!(this instanceof CommitOf)) return new CommitOf(type, target, name, predicate);
    else Rule.call(this, function(sandbox) {
      for(var effect of sandbox.writeeffectsOn(target)) {
        if(effect instanceof type && effect.name===name) effect.commit();
      }
    }, predicate);
  }
  CommitOf.prototype = Object.create(Rule.prototype);
  CommitOf.prototype.toString = function() {
    return "[[DecentJS/CommitOf]]";
  }

  //  ___                 _ _    ___       
  // / __|___ _ __  _ __ (_) |_ / _ \ _ _  
  //| (__/ _ \ '  \| '  \| |  _| (_) | ' \ 
  // \___\___/_|_|_|_|_|_|_|\__|\___/|_||_|

  function CommitOn(target, predicate) {
    if(!(this instanceof CommitOn)) return new CommitOn(target, predicate);
    else Rule.call(this, function(sandbox) {
      sandbox.commitOn(target);
    }, predicate);
  }
  CommitOn.prototype = Object.create(Rule.prototype);
  CommitOn.prototype.toString = function() {
    return "[[DecentJS/CommitOn]]";
  }

  //  ___                 _ _   
  // / __|___ _ __  _ __ (_) |_ 
  //| (__/ _ \ '  \| '  \| |  _|
  // \___\___/_|_|_|_|_|_|_|\__|

  function Commit(predicate) {
    if(!(this instanceof Commit)) return new Commit(predicate);
    else Rule.call(this, function(sandbox) {
      sandbox.commit();
    }, predicate);
  }
  Commit.prototype = Object.create(Rule.prototype);
  Commit.prototype.toString = function() {
    return "[[DecentJS/Commit]]";
  }

  // ___     _ _ _             _    ___   __ 
  //| _ \___| | | |__  __ _ __| |__/ _ \ / _|
  //|   / _ \ | | '_ \/ _` / _| / / (_) |  _|
  //|_|_\___/_|_|_.__/\__,_\__|_\_\\___/|_|  

  function RollbackOf(type, target, name, predicate) {
    if(!(this instanceof RollbackOf)) return new RollbackOf(type, target, name, predicate);
    else Rule.call(this, function(sandbox) {
      for(var effect of sandbox.writeeffectsOn(target)) {
        if(effect instanceof type && effect.name===name) effect.rollback();
      }
    }, predicate);
  }
  RollbackOf.prototype = Object.create(Rule.prototype);
  RollbackOf.prototype.toString = function() {
    return "[[DecentJS/RollbackOf]]";
  }

  // ___     _ _ _             _    ___       
  //| _ \___| | | |__  __ _ __| |__/ _ \ _ _  
  //|   / _ \ | | '_ \/ _` / _| / / (_) | ' \ 
  //|_|_\___/_|_|_.__/\__,_\__|_\_\\___/|_||_|

  function RollbackOn(target, predicate) {
    if(!(this instanceof RollbackOn)) return new RollbackOn(target, predicate);
    else Rule.call(this, function(sandbox) {
      effect.rollbackOn(target);
    }, predicate);
  }
  RollbackOn.prototype = Object.create(Rule.prototype);
  RollbackOn.prototype.toString = function() {
    return "[[DecentJS/RollbackOn]]";
  }

  // ___     _ _ _             _   
  //| _ \___| | | |__  __ _ __| |__
  //|   / _ \ | | '_ \/ _` / _| / /
  //|_|_\___/_|_|_.__/\__,_\__|_\_\

  function Rollback(predicate) {
    if(!(this instanceof Rollback)) return new Rollback(predicate);
    else Rule.call(this, function(sandbox) {
      sandbox.rollback();
    }, predicate);
  }
  Rollback.prototype = Object.create(Rule.prototype);
  Rollback.prototype.toString = function() {
    return "[[DecentJS/Rollback]]";
  }

  // ___                 _    ___       
  //| _ \_____ _____ _ _| |_ / _ \ _ _  
  //|   / -_) V / -_) '_|  _| (_) | ' \ 
  //|_|_\___|\_/\___|_|  \__|\___/|_||_|

  function RevertOn(target, predicate) {
    if(!(this instanceof RevertOn)) return new RevertOn(target, predicate);
    else Rule.call(this, function(sandbox) {
      effect.rollbackOn(target);
    }, predicate);
  }
  RevertOn.prototype = Object.create(Rule.prototype);
  RevertOn.prototype.toString = function() {
    return "[[DecentJS/RevertOn]]";
  }

  // ___                 _   
  //| _ \_____ _____ _ _| |_ 
  //|   / -_) V / -_) '_|  _|
  //|_|_\___|\_/\___|_|  \__|

  function Revert(predicate) {
    if(!(this instanceof Revert)) return new Revert(predicate);
    else Rule.call(this, function(sandbox) {
      sandbox.rollback();
    }, predicate);
  }
  Revert.prototype = Object.create(Rule.prototype);
  Revert.prototype.toString = function() {
    return "[[DecentJS/Revert]]";
  }

  //                       _   
  // _____ ___ __  ___ _ _| |_ 
  /// -_) \ / '_ \/ _ \ '_|  _|
  //\___/_\_\ .__/\___/_|  \__|
  //        |_|                

  var Rules = new Package("Rule");

  Package.export("Rule", Rule, Rules);

  Package.export("CommitOf", CommitOf, Rules);
  Package.export("CommitOn", CommitOn, Rules);
  Package.export("Commit", Commit, Rules);

  Package.export("RollbackOf", RollbackOf, Rules);
  Package.export("RollbackOn", RollbackOn, Rules);
  Package.export("Rollback", Rollback, Rules);

  Package.export("RevertOn", RevertOn, Rules);
  Package.export("Revert", Revert, Rules);

  return Rules;

})();

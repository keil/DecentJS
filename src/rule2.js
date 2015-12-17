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

function Rule(operation, predicate) {
  if(!(this instanceof Rule)) return new Rule(operation, predicate);

  Object.defineProperties(this, {
    "operation" : {
      value: operation
    },
    "predicate": {
      value: predicate
    }
  });
}



function CommitOf? (target, name, predicate) {
  if(!(this instanceof CommitOf)) return new CommitOf(effect, predicate);
  else Rule(function(sandbox) {
          for(var effect of sandbox.writeeffectson(target)) {
                if(effect.name===name) effect.commit();
          }
  }, predicate)
}

function CommitOn (target, predicate) {
  if(!(this instanceof CommitOf)) return new CommitOf(effect, predicate);
  else Rule(function(sandbox) {
        sandbox.commitOn(target); 
  }, predicate)
}

function Commit (target, predicate) {
  if(!(this instanceof CommitOf)) return new CommitOf(effect, predicate);
  else Rule(function(sandbox) {
        sandbox.commit(); 
  }, predicate)
}




function Rollback? (target, predicate) {
  if(!(this instanceof RollbackOn)) return new RollbackOn(...Arrayfrom(arguments));
  else Rule(function(sandbox) {
        sandbox.rollback(); 
  }, predicate)
}

function RollbackOn (target, predicate) {
  if(!(this instanceof RollbackOn)) return new RollbackOn(...Arrayfrom(arguments));
  else Rule(function(sandbox) {
        sandbox.rollbackOn(target); 
  }, predicate)
}

function Rollback (predicate) {
  if(!(this instanceof Rollback)) return new Rollback(...Arrayfrom(arguments));
  else Rule(function(sandbox) {
        sandbox.rollback(); 
  }, predicate)
}



function RevertOn (target, predicate) {
  if(!(this instanceof RevertOn)) return new RevertOn(...Arrayfrom(arguments));
  else Rule(function(sandbox) {
        sandbox.revertOn(target); 
  }, predicate)
}

function Revert (predicate) {
  if(!(this instanceof Revert)) return new Revert(...Arrayfrom(arguments));
  else Rule(function(sandbox) {
        sandbox.rollback(); 
  }, predicate)
}




var Rule(function(sbx) {}, function(sbx){ return true;});

var Rule.CommitOn(target, function(sbx){return true;});

var Rule.CommitOn(target, "name", function(sbx){return true;});

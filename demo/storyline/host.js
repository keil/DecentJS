// _  _         _     
//| \| |___  __| |___ 
//| .` / _ \/ _` / -_)
//|_|\_\___/\__,_\___|

function Node (value, left, right) {
  if(!(this instanceof Node)) return new Node (value, left, right);

  this.value = value;
  this.left = left;
  this.right = right;
}
Node.prototype.toString = function () {
  return (this.left?this.left + ", ":"") + this.value +(this.right?", "+this.right:"");
}

//              _   
// _ _ ___  ___| |_ 
//| '_/ _ \/ _ \  _|
//|_| \___/\___/\__|

var root = Node(0, Node(0, Node(0), Node(0)), Node(0));

// _      _ _   _      _      _        _       
//(_)_ _ (_) |_(_)__ _| |  __| |_ __ _| |_ ___ 
//| | ' \| |  _| / _` | | (_-<  _/ _` |  _/ -_)
//|_|_||_|_|\__|_\__,_|_| /__/\__\__,_|\__\___|

(function() {

  print(";;; initial state");
  print("tree: " + root);
//  print("sumOf: " + sumOf(root));
//  print("deptOf: " + depthOf(root));

})();

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

(function() {

  load("demo/storyline/guest.js");

  print(";;; normal");
  print("tree: " + root);
//  print("sumOf: " + sumOf(root));
//  print("deptOf: " + depthOf(root));

});

//                  _ _             
// ___ __ _ _ _  __| | |__  _____ __
//(_-</ _` | ' \/ _` | '_ \/ _ \ \ /
///__/\__,_|_||_\__,_|_.__/\___/_\_\

var sbx = new Sandbox(this, Sandbox.DEFAULT);

(function() {
  
  sbx.load("demo/storyline/guest.js");

  print(";;; outside sandbox");
  print("tree: " + root);
//  print("sumOf: " + sumOf(root));
//  print("deptOf: " + depthOf(root));

  print(";;; inside sandbbox");
  print("tree: " + sbx.call(root.toString, root));
//  print("sumOf: " + sbx.call(sumOf, this, root));
//  print("deptOf: " + sbx.call(depthOf, this, root));

  print(sbx.statistic);

})();

//      __  __        _      
// ___ / _|/ _|___ __| |_ ___
/// -_)  _|  _/ -_) _|  _(_-<
//\___|_| |_| \___\__|\__/__/


(function() {

  var effects = sbx.effectsOf(this);
  print(";;; All Effects of this");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  var effects = sbx.writeeffectsOf(root);
  print(";;; Write Effects of root");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  var effects = sbx.writeeffects;
  print(";;; All Write Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");


/*

  var rects = sbx.readeffectsOf(this);
  print(";;; Read Effects");
  rects.forEach(function(i, e) {print(e)});
  print("\n");

  var wects = sbx.writeeffectsOf(this);
  print(";;; Write Effects");
  wects.forEach(function(i, e) {print(e)});
  print("\n");

  var cects = sbx.calleffectsOf(this);
  print(";;; Call Effects");
  cects.forEach(function(i, e) {print(e)});
  print("\n"); */



/*  var rectso = sbx.readeffectsOf(root);
  print(";;; Read Effects of root");
  rectso.forEach(function(i, e) {print(e)});
  print("\n");

  var wectso = sbx.writeeffectsOf(root);
  print(";;; Write Effects of root");
  wectso.forEach(function(i, e) {print(e)});
  print("\n");

  var cectso = sbx.calleffectsOf(root);
  print(";;; Call Effects of root");
  cectso.forEach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.effectsOf(root);
  print(";;; All Effects of root");
  ects.forEach(function(i, e) {print(e)});
  print("\n");

  // Note:
  // - sbx.readeffects
  // - sbx.readeffects
  // - sbx.effets
  // returns a list og all effects

  var ects = sbx.readeffects;
  print(";;; All Read Effects ");
  ects.forEach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.writeeffects;
  print(";;; All Write Effects");
  ects.forEach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.calleffects;
  print(";;; All Call Effects");
  ects.forEach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.effects;
  print(";;; All Effects");
  ects.forEach(function(i, e) {print(e)});
  print("\n");
*/
})();

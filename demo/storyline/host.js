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
  //print("sumOf: " + sumOf(root));
  //print("deptOf: " + depthOf(root));

})();

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

(function() {

  load("demo/storyline/guest.js");

  print(";;; normal");
  print("tree: " + root);
  //print("sumOf: " + sumOf(root));
  //print("deptOf: " + depthOf(root));

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
  //print("sumOf: " + sumOf(root));
  //print("deptOf: " + depthOf(root));

  print(";;; inside sandbbox");
  print("tree: " + sbx.call(root.toString, root));
  //print("sumOf: " + sbx.call(sumOf, this, root));
  //print("deptOf: " + sbx.call(depthOf, this, root));

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

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

(function() {

  load("demo/storyline/guest2.js");

  print(";;; normal");
  print("tree: " + root);
  //print("sumOf: " + sumOf(root));
  //print("deptOf: " + depthOf(root));

});

//              __ _ _       _   
// __ ___ _ _  / _| (_)__ __| |_ 
/// _/ _ \ ' \|  _| | / _(_-<  _|
//\__\___/_||_|_| |_|_\__/__/\__|

var sbx2 = new Sandbox(this, Sandbox.DEFAULT);

(function() {

  print(";;; outside sandbox");
  print("tree: " + root);
  //print("sumOf: " + sumOf(root));
  //print("deptOf: " + depthOf(root));

  print(";;; inside sandbbox 1");
  print("tree: " + sbx.call(root.toString, root));
  //print("sumOf: " + sbx.call(sumOf, this, root));
  //print("deptOf: " + sbx.call(depthOf, this, root));

  sbx2.load("demo/storyline/guest2.js");

  //print(";;; inside sandbbox 2");
  //print("tree: " + sbx2.call(root.toString, root));
  //print("sumOf: " + sbx2.call(sumOf, this, root));
  //print("deptOf: " + sbx2.call(depthOf, this, root));

  print(sbx2.statistic);

  /**
   * Note: Matthias Keil
   * No Conflicts, because sbx reads before sbx2 writes
   * to root.right. 
   */

  print("InClonflictWith(root): " + (sbx.inConflictWith(sbx2, root)));
  print("InClonflictWith(root): " + (sbx2.inConflictWith(sbx, root)));

  print("InClonflict: " + (sbx.inConflict(sbx2)));
  print("InClonflict: " + (sbx2.inConflict(sbx)));

  print(";;; inside sandbox 1");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  //print("sumOf: " + sbx.call(sumOf, this, root));
  //print("deptOf: " + sbx.call(depthOf, this, root));

  //print(";;; inside sandbox 2");
  //print("tree: " + sbx2.call(Node.prototype.toString, root));
  //print("sumOf: " + sbx2.call(sumOf, this, root));
  //print("deptOf: " + sbx2.call(depthOf, this, root));  

  /**
   * Note: Matthias Keil
   * In conflict, because sbx reads root.right, which has 
   * been written by sbx2 before.
   */

  print("InClonflictWith(root): " + (sbx.inConflictWith(sbx2, root)));
  print("InClonflictWith(root): " + (sbx2.inConflictWith(sbx, root)));

  print("InClonflict: " + (sbx.inConflict(sbx2)));
  print("InClonflict: " + (sbx2.inConflict(sbx)));

  var cofts = sbx.conflicts(sbx2);
  print(";;; All Conflicts");
  cofts.forEach(function(i, e) {print(e)});
  print("\n");

  /**
   * Note: Matthias Keil
   * Until now, we have only Read-Write Conflicts.
   */
/*
  sbx.call(setValue, this, root);

  var cofts2 = sbx.conflicts(sbx2);
  print(";;; All Conflicts");
  cofts2.forEach(function(i, e) {print(e)});
  print("\n");

  var coftso = sbx.conflictsOf(sbx2, root);
  print(";;; Conflicts of root");
  coftso.forEach(function(i, e) {print(e)});
  print("\n"); 
*/
});

//                    _ _   
// __ ___ _ __  _ __ (_) |_ 
/// _/ _ \ '  \| '  \| |  _|
//\__\___/_|_|_|_|_|_|_|\__|

(function() {

  /*var wects = sbx.writeeffects;

  print(";;; Write Effects");
  wects.forEach(function(i, e) {print(e)});
  print("\n");

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  sbx.commitOf(root);

  var wects = sbx.writeeffects;

  print(";;; Write Effects");
  wects.forEach(function(i, e) {print(e)});
  print("\n");*/

  sbx.commit();
  
  print(";;; outside sandbox");
  print("tree: " + root);
  //print("sumOf: " + sumOf(root));
  //print("deptOf: " + depthOf(root));

  //var wects = sbx.writeeffects;

  //print(";;; Write Effects");
  //wects.forEach(function(i, e) {print(e)});
  //print("\n");

})();

//         _ _ _             _   
// _ _ ___| | | |__  __ _ __| |__
//| '_/ _ \ | | '_ \/ _` / _| / /
//|_| \___/_|_|_.__/\__,_\__|_\_\

(function() {

  root.value = -1;

  var effects = sbx.writeeffects;
  print(";;; Write Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.rollbackOf(root);
  
  var effects = sbx.writeeffects;
  print(";;; Write Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.rollback();

  var effects = sbx.writeeffects;
  print(";;; Write Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

});

//                     _   
// _ _ _____ _____ _ _| |_ 
//| '_/ -_) V / -_) '_|  _|
//|_| \___|\_/\___|_|  \__|

(function() {

  var effects = sbx.effects;
  print(";;; Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.revertOf(root);

  var effects = sbx.effects;
  print(";;; Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.revert();

  var effects = sbx.effects;
  print(";;; Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  sbx.clean();

  var effects = sbx.effects;
  print(";;; Effects");
  effects.forEach(function(i, e) {print(e)});
  print("\n");

});


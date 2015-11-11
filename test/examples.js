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

//               ___   __ 
// ____  _ _ __ / _ \ / _|
//(_-< || | '  \ (_) |  _|
///__/\_,_|_|_|_\___/|_|  

function sumOf (node) {
  return (node) ? node.value + sumOf(node.left) + sumOf(node.right) : 0;
}

//    _          _   _    ___   __ 
// __| |___ _ __| |_| |_ / _ \ / _|
/// _` / -_) '_ \  _| ' \ (_) |  _|
//\__,_\___| .__/\__|_||_\___/|_|  
//         |_|                     

function depthOf (node) {
  return node ? Math.max(depthOf(node.left), depthOf(node.right))+1 : -1;
  //return Math.max(((node.left)?depthOf(node.left)+1:0), ((node.right)?depthOf(node.right)+1:0));
}

//              _   
// _ _ ___  ___| |_ 
//| '_/ _ \/ _ \  _|
//|_| \___/\___/\__|

var root = Node(0, Node(0, Node(0), Node(0)), Node(0));

//         _ __   __    _          
// ___ ___| |\ \ / /_ _| |_  _ ___ 
//(_-</ -_)  _\ V / _` | | || / -_)
///__/\___|\__|\_/\__,_|_|\_,_\___|

function setValue (node) {
  if (node) {
    node.value=depthOf(node);
    setValue(node.left);
    setValue(node.right);
  }
}

// _      _ _   _      _      _        _       
//(_)_ _ (_) |_(_)__ _| |  __| |_ __ _| |_ ___ 
//| | ' \| |  _| / _` | | (_-<  _/ _` |  _/ -_)
//|_|_||_|_|\__|_\__,_|_| /__/\__\__,_|\__\___|

(function() {

  print(";;; initial state");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

})();

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

(function() {

  setValue(root);

  print(";;; normal");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

});

//                  _ _             
// ___ __ _ _ _  __| | |__  _____ __
//(_-</ _` | ' \/ _` | '_ \/ _ \ \ /
///__/\__,_|_||_\__,_|_.__/\___/_\_\

var params = {
  /** Verbose Mode
   * (default: false)
   */ verbose:false,
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
   */ passthrough:dumpGlobal(),
  /** Allow Strict Mode Eval
   * (default: false)
   */ eval:true,
  /** Output handler
   * (default: ShellOut)
   */ out:ShellOut()
}

var sbx = new Sandbox(this, params);

(function() {

  sbx.call(setValue, this, root);

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbbox");
  print("tree: " + sbx.call(root.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

})();

//      __  __        _      
// ___ / _|/ _|___ __| |_ ___
/// -_)  _|  _/ -_) _|  _(_-<
//\___|_| |_| \___\__|\__/__/


(function() {

  var rects = sbx.readeffectsOf(this);
  print(";;; Read Effects");
  rects.foreach(function(i, e) {print(e)});
  print("\n");

  var wects = sbx.writeeffectsOf(this);
  print(";;; Write Effects");
  wects.foreach(function(i, e) {print(e)});
  print("\n");

  var cects = sbx.calleffectsOf(this);
  print(";;; Call Effects");
  cects.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.effectsOf(this);
  print(";;; All Effects");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  var rectso = sbx.readeffectsOf(root);
  print(";;; Read Effects of root");
  rectso.foreach(function(i, e) {print(e)});
  print("\n");

  var wectso = sbx.writeeffectsOf(root);
  print(";;; Write Effects of root");
  wectso.foreach(function(i, e) {print(e)});
  print("\n");

  var cectso = sbx.calleffectsOf(root);
  print(";;; Call Effects of root");
  cectso.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.effectsOf(root);
  print(";;; All Effects of root");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  // Note:
  // - sbx.readeffects
  // - sbx.readeffects
  // - sbx.effets
  // returns a list og all effects

  var ects = sbx.readeffects;
  print(";;; All Read Effects ");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.writeeffects;
  print(";;; All Write Effects");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.calleffects;
  print(";;; All Call Effects");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.effects;
  print(";;; All Effects");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

});

//    _ _  __  __                            
// __| (_)/ _|/ _|___ _ _ ___ _ _  __ ___ ___
/// _` | |  _|  _/ -_) '_/ -_) ' \/ _/ -_|_-<
//\__,_|_|_| |_| \___|_| \___|_||_\__\___/__/


(function() {

  print("HasDifferenceWith(root): " + (sbx.hasDifferenceWith(root)));

  var difso = sbx.differencesOf(root);
  print(";;; Differences of root");
  difso.foreach(function(i, e) {print(e)});
  print("\n");

  print("HasDifference: " + (sbx.hasDifference));

  var difs = sbx.differences;
  print(";;; All Differences");
  difs.foreach(function(i, e) {print(e)});
  print("\n");

});

//    _                          
// __| |_  __ _ _ _  __ _ ___ ___
/// _| ' \/ _` | ' \/ _` / -_|_-<
//\__|_||_\__,_|_||_\__, \___/__/
//                  |___/        

/*(function() {

  print("HasChanges(root): " + (sbx.hasChangesOn(root)));

  var difso = sbx.changesOf(root);
  print(";;; Changes of root");
  difso.foreach(function(i, e) {print(e)});
  print("\n");

  root.value = -1;
  print("HasChanges: " + (sbx.hasChanges));

  var difs = sbx.changes;
  print(";;; All Changes");
  difs.foreach(function(i, e) {print(e)});
  print("\n");

  });*/ // Notes: changes are deprecated


//                    _ _   
// __ ___ _ __  _ __ (_) |_ 
/// _/ _ \ '  \| '  \| |  _|
//\__\___/_|_|_|_|_|_|_|\__|

(function() {

  var wects = sbx.writeeffects;

  print(";;; Read Effects");
  wects.foreach(function(i, e) {print(e)});
  print("\n");

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  //sbx.commitOf(root);
  //sbx.commit();

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

});

//         _ _ _             _   
// _ _ ___| | | |__  __ _ __| |__
//| '_/ _ \ | | '_ \/ _` / _| / /
//|_| \___/_|_|_.__/\__,_\__|_\_\

(function() {

  root.value = -1;

  var effects = sbx.writeeffects;
  print(";;; Read Effects");
  effects.foreach(function(i, e) {print(e)});
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

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.rollback();

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

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.revertOf(root);

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.revert();

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

});

//              __ _ _       _   
// __ ___ _ _  / _| (_)__ __| |_ 
/// _/ _ \ ' \|  _| | / _(_-<  _|
//\__\___/_||_|_| |_|_\__/__/\__|

var sbx2 = new Sandbox(this, params);

(function() {

  function appendRight (node) {
    var subtree = Node('a', Node('b'), Node('c'));
    node.right = subtree;
  }

  sbx2.call(appendRight, this, root);


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
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  print(";;; inside sandbox 2");
  print("tree: " + sbx2.call(Node.prototype.toString, root));
  print("sumOf: " + sbx2.call(sumOf, this, root));
  print("deptOf: " + sbx2.call(depthOf, this, root));  

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
  cofts.foreach(function(i, e) {print(e)});
  print("\n");

  /**
   * Note: Matthias Keil
   * Until now, we have only Read-Write Conflicts.
   */

  sbx.call(setValue, this, root);

  var cofts = sbx.conflicts(sbx2);
  print(";;; All Conflicts");
  cofts.foreach(function(i, e) {print(e)});
  print("\n");

  var coftso = sbx.conflictsOf(sbx2, root);
  print(";;; Conflicts of root");
  coftso.foreach(function(i, e) {print(e)});
  print("\n"); 

});

// _                                           _   
//| |_ _ _ __ _ _ _  ____ __  __ _ _ _ ___ _ _| |_ 
//|  _| '_/ _` | ' \(_-< '_ \/ _` | '_/ -_) ' \  _|
// \__|_| \__,_|_||_/__/ .__/\__,_|_| \___|_||_\__|
//                     |_|                         


var params2 = {
  /** Verbose Mode
   * (default: false)
   */ verbose:false,
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
   */ transparent:true,
  /** MetaHandler
   * (default: true)
   */ metahandler:true,
  /** Function pass-through
   * (default: [])
   */ passthrough:dumpGlobal(), 
  /** Allow Strict Mode Eval
   * (default: false)
   */ eval:true,
  /** Output handler
   * (default: ShellOut)
   */ out:ShellOut()
}

var tsbx = new Sandbox(this, params2);

(function() {

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  tsbx.call(setValue, this, root);

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  tsbx.rollback();

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

});

//               _        _       
// __ _ _ ___ __| |_ __ _| |_ ___ 
//| '_ \ '_/ -_|_-<  _/ _` |  _/ -_)
//| .__/_| \___/__/\__\__,_|\__\___|
//|_|                               

(function() {
  var sbx3 = new Sandbox(this, params, [root]);

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx3.call(Node.prototype.toString, root));
  print("sumOf: " + sbx3.call(sumOf, this, root));
  print("deptOf: " + sbx3.call(depthOf, this, root));

  sbx3.call(setValue, this, root);

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx3.call(Node.prototype.toString, root));
  print("sumOf: " + sbx3.call(sumOf, this, root));
  print("deptOf: " + sbx3.call(depthOf, this, root));

  root.value = -1;
  root.left.value = -1;
  root.right.value = -1;
  root.left.left.value = -1;
  root.left.right.value = -1;

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx3.call(Node.prototype.toString, root));
  print("sumOf: " + sbx3.call(sumOf, this, root));
  print("deptOf: " + sbx3.call(depthOf, this, root));

  sbx3.rollback();

  print(";;; outside sandbox");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; inside sandbox");
  print("tree: " + sbx3.call(Node.prototype.toString, root));
  print("sumOf: " + sbx3.call(sumOf, this, root));
  print("deptOf: " + sbx3.call(depthOf, this, root));

});

// _ _ _____ _____ _ _ ___ ___ 
//| '_/ -_) V / -_) '_(_-</ -_)
//|_| \___|\_/\___|_| /__/\___|

var sbx4 = new Sandbox(this, params);

(function() {

  var sbxroot = sbx4.wrap(root);

  print(";;; outside sandbox/ root");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; outside sandbox/ sbxroot");
  print("tree: " + sbxroot);
  print("sumOf: " + sumOf(sbxroot));
  print("deptOf: " + depthOf(sbxroot));

  print(";;; inside sandbox");
  print("tree: " + sbx4.call(Node.prototype.toString, root));
  print("sumOf: " + sbx4.call(sumOf, this, root));
  print("deptOf: " + sbx4.call(depthOf, this, root));

  setValue(sbxroot);

  print(";;; outside sandbox / root");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; outside sandbox / sbxroot");
  print("tree: " + sbxroot);
  print("sumOf: " + sumOf(sbxroot));
  print("deptOf: " + depthOf(sbxroot));

  print(";;; inside sandbox");
  print("tree: " + sbx4.call(Node.prototype.toString, root));
  print("sumOf: " + sbx4.call(sumOf, this, root));
  print("deptOf: " + sbx4.call(depthOf, this, root));

  sbx4.rollback();

  print(";;; outside sandbox / root");
  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print(";;; outside sandbox / sbxroot");
  print("tree: " + sbxroot);
  print("sumOf: " + sumOf(sbxroot));
  print("deptOf: " + depthOf(sbxroot));

  print(";;; inside sandbox");
  print("tree: " + sbx4.call(Node.prototype.toString, root));
  print("sumOf: " + sbx4.call(sumOf, this, root));
  print("deptOf: " + sbx4.call(depthOf, this, root));

});

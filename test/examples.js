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
  return Math.max(((node.left)?depthOf(node.left)+1:0), ((node.right)?depthOf(node.right)+1:0));
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

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

})();

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

(function() {

  setValue(root);

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
   */ passthrough:[Math, Math.max, valueOf, Object.prototype.toString, Object.prototype.hasOwnProperty],
  /** Output handler
   * (default: ShellOut)
   */ out:ShellOut()
}

var sbx = new Sandbox(this, params);

(function() {

  sbx.call(setValue, this, root);

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

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
  print(";;; All Effects of root");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.writeeffects;
  print(";;; All Effects of root");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.calleffects;
  print(";;; All Effects of root");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

  var ects = sbx.effects;
  print(";;; All Effects of root");
  ects.foreach(function(i, e) {print(e)});
  print("\n");

})();

//    _                          
// __| |_  __ _ _ _  __ _ ___ ___
/// _| ' \/ _` | ' \/ _` / -_|_-<
//\__|_||_\__,_|_||_\__, \___/__/
//                  |___/        

(function() {

  print("HasChanges(root): " + (sbx.hasChangesOn(root)));

  var difso = sbx.changesOf(root);
  print(";;; Changes of root");
  difso.foreach(function(i, e) {print(e)});
  print("\n");

  print("HasChanges: " + (sbx.hasChanges));

  var difs = sbx.changes;
  print(";;; All Changes");
  difs.foreach(function(i, e) {print(e)});
  print("\n");

})();

//    _ _  __  __                            
// __| (_)/ _|/ _|___ _ _ ___ _ _  __ ___ ___
/// _` | |  _|  _/ -_) '_/ -_) ' \/ _/ -_|_-<
//\__,_|_|_| |_| \___|_| \___|_||_\__\___/__/


(function() {

  print("InDifference(root): " + (sbx.hasDifferenceWith(root)));

  var difso = sbx.differencesOf(root);
  print(";;; Differences of root");
  difso.foreach(function(i, e) {print(e)});
  print("\n");

  root.value = -1;

  print("InDifference: " + (sbx.hasDifference));

  var difs = sbx.differences;
  print(";;; All Differences");
  difs.foreach(function(i, e) {print(e)});
  print("\n");

})();

//                    _ _   
// __ ___ _ __  _ __ (_) |_ 
/// _/ _ \ '  \| '  \| |  _|
//\__\___/_|_|_|_|_|_|_|\__|

(function() {

  var wects = sbx.writeeffects;
  print(";;; Read Effects");
  wects.foreach(function(i, e) {print(e)});
  print("\n");

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  wects[0].commit();

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

})();

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

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.writeeffectsOf(root).foreach(function(i, e) {
    print("Rollback: " + e + "/" + e.origin);
    e.rollback()
  });

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.rollbackOf(root);

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.rollback();

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

})();

//                     _   
// _ _ _____ _____ _ _| |_ 
//| '_/ -_) V / -_) '_|  _|
//|_| \___|\_/\___|_|  \__|

(function() {

  print("-----------------------------");

  sbx.call(setValue, this, root);

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.revertOf(root);

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  sbx.revert();

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

})();

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

  sbx.call(setValue, this, root);
  sbx2.call(appendRight, this, root);

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  print("tree: " + sbx2.call(Node.prototype.toString, root));
  print("sumOf: " + sbx2.call(sumOf, this, root));
  print("deptOf: " + sbx2.call(depthOf, this, root));  

  print("InClonflict: " + (sbx.inConflict(sbx2)));
  print("InClonflict: " + (sbx2.inConflict(sbx)));

  var cofts = sbx.conflicts(sbx2);
  print(";;; All Conflicts");
  cofts.foreach(function(i, e) {print(e)});
  print("\n");

  print("InClonflict(o): " + (sbx.inConflictWith(sbx2, root)));
  print("InClonflict(o): " + (sbx2.inConflictWith(sbx, root)));

  var coftso = sbx.conflictsOf(sbx2, root);
  print(";;; Conflicts of root");
  coftso.foreach(function(i, e) {print(e)});
  print("\n");

})();

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
   */ passthrough:[Math, Math.max, valueOf, Object.prototype.toString, Object.prototype.hasOwnProperty],
  /** Output handler
   * (default: ShellOut)
   */ out:ShellOut()
}

var tsbx = new Sandbox(this, params2);

(function() {

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  tsbx.call(setValue, this, root);

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print("tree: " + sbx.call(Node.prototype.toString, root));
  print("sumOf: " + sbx.call(sumOf, this, root));
  print("deptOf: " + sbx.call(depthOf, this, root));

  tsbx.rollback();

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

})();

//               _        _       
// __ _ _ ___ __| |_ __ _| |_ ___ 
//| '_ \ '_/ -_|_-<  _/ _` |  _/ -_)
//| .__/_| \___/__/\__\__,_|\__\___|
//|_|                               

var sbx3 = new Sandbox(this, params);

(function() {
  // TODO
})();

// _ _ _____ _____ _ _ ___ ___ 
//| '_/ -_) V / -_) '_(_-</ -_)
//|_| \___|\_/\___|_| /__/\___|

var sbx4 = new Sandbox(this, params);

(function() {

  var sbxroot = sbx3.wrap(root);

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print("tree: " + sbxroot);
  print("sumOf: " + sumOf(sbxroot));
  print("deptOf: " + depthOf(sbxroot));

  setValue(sbxroot);

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print("tree: " + sbxroot);
  print("sumOf: " + sumOf(sbxroot));
  print("deptOf: " + depthOf(sbxroot));

  sbx3.rollback();

  print("tree: " + root);
  print("sumOf: " + sumOf(root));
  print("deptOf: " + depthOf(root));

  print("tree: " + sbxroot);
  print("sumOf: " + sumOf(sbxroot));
  print("deptOf: " + depthOf(sbxroot));

})();

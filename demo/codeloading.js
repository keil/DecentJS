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


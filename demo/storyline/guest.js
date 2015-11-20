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
}

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

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

setValue(root);

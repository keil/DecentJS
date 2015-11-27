//         _ __   __    _          
// ___ ___| |\ \ / /_ _| |_  _ ___ 
//(_-</ -_)  _\ V / _` | | || / -_)
///__/\___|\__|\_/\__,_|_|\_,_\___|

function setValue (node) {
  if (node) {
    node.value=heightOf(node);
    setValue(node.left);
    setValue(node.right);
  }
}

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

//setValue(root);

var x = 635635;
d= 2542345;

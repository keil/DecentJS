function appendRight (node) {
  var subtree = Node('a', Node('b'), Node('c'));
  node.right = subtree;
}

// _ _  ___ _ _ _ __  __ _| |
//| ' \/ _ \ '_| '  \/ _` | |
//|_||_\___/_| |_|_|_\__,_|_|

appendRight(root);

/*
 * TreatJS: Sandbox 
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 *
 * Copyright (c) 2014, Proglang, University of Freiburg.
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 * All rights reserved.
 *
 * Released under the MIT license
 * http://proglang.informatik.uni-freiburg.de/treatjs/license
 *
 * Author Matthias Keil
 * http://www.informatik.uni-freiburg.de/~keilr/
 */

(function() {

  var object = {};
  var handler = new MetaHandler({});
  var proxy = new Proxy(object, handler);

  //Object.getOwnPropertyDescriptor(proxy, "name");
  //Object.getOwnPropertyNames(proxy);
  //Object.defineProperty(proxy,"name",{});
  //delete proxy.name;
  //Object.freeze(proxy); // TODO
  //Object.seal(proxy); // TODO
  //Object.preventExtensions(proxy);
  //("name" in proxy);
  //Object.prototype.hasOwnProperty.call(proxy, "name");
  //proxy.name;
  //proxy.name = "val";
  //for(prop in proxy){}; // TODO
  //for(prop of proxy){}; // TODO
  //Object.keys(proxy);
  //proxy.apply({}, []);
  //new proxy(...args);

  // TODO:
  // freeze; seal are never called
  // for(prop in proxy){} does not call a trap
  // - Not possible to handle (difference to has/keys!)
  // iterate; enumerate are never called
  // isExtensible is a called trap, but never documented

})();



(function() {
  var object = {};
  var handler = new MetaHandler({});
  var proxy = new Proxy(object, handler);

  Object.freeze(proxy);
  //... call trap: isExtensible ............................................................................................
  //... call trap: preventExtensions .......................................................................................
  //... call trap: getOwnPropertyNames .....................................................................................  

  Object.isFrozen(proxy);
  //... call trap: isExtensible ............................................................................................
  //... call trap: getOwnPropertyNames .....................................................................................

  Object.seal(proxy);
  //... call trap: isExtensible ............................................................................................
  //... call trap: preventExtensions .......................................................................................
  //... call trap: getOwnPropertyNames .....................................................................................  


  Object.isSealed(proxy);
  //... call trap: isExtensible ............................................................................................
  //... call trap: getOwnPropertyNames .....................................................................................  

  for(var i in proxy) {}
  // noting called

})();

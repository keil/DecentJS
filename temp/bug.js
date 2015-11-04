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

  function makeMetaHandler(handler) {
    var metahandler = {
      get: function(target, name, receiver) {
        print("call trap: " + name);
        return target[name];
      }
    };
    return new Proxy(handler, metahandler)
  }

  var object = {};
  var handler = makeMetaHandler({});
  var proxy = new Proxy(object, handler);

  // call:
  Object.freeze(proxy);

  // output:
  // call trap: isExtensible
  // call trap: preventExtensions
  // call trap: getOwnPropertyNames   

});

(function() {

  function makeMetaHandler(handler) {
    var metahandler = {
      get: function(target, name, receiver) {
        print("call trap: " + name);
        return target[name];
      }
    };
    return new Proxy(handler, metahandler)
  }

  var object = {};
  var handler = makeMetaHandler({});
  var proxy = new Proxy(object, handler);

  // call:
  Object.seal(proxy);

  // output:
  // call trap: isExtensible
  // call trap: preventExtensions
  // call trap: getOwnPropertyNames   

})();


(function() {

  function dump(pd) {
    if(pd===undefined) return "undefined";
    else return " value:" + pd.value + " writeable:" + pd.writeable + " enumerable: " + pd.enumerable + " configurable:" + pd.configurable + " get:"+pd.get + " set:"+pd.set;
  }

  function makeMetaHandler(handler) {
    var metahandler = {
      get: function(target, name, receiver) {
        print("call trap: " + name);
        return target[name];
      }
    };
    return new Proxy(handler, metahandler)
  }

  var object = {bo:0,bp:0};
  var handler = makeMetaHandler({
    defineProperty:function(target,name,pd) {
      print("pd inside: "+dump(pd));
      Object.defineProperty(target,name,pd);
    }
  });
  var proxy = new Proxy(object, handler);
  var pd = {value:1};

  // #1

  // call:
  print("pd outside: "+dump(pd));
  // outcome:
  // pd outside:  value:1 writeable:undefined enumerable: undefined configurable:undefined get:undefined set:undefined
  Object.defineProperty(object,"ao",pd); // define pd directly
  Object.defineProperty(proxy,"ap",pd); // define pd indirectly
  // outcome:
  // pd inside:  value:1 writeable:undefined enumerable: false configurable:false get:undefined set:undefined
  // Note: pd differs, 
  // but because ao and ap are still undefined, the result is the same
  print("pd of ao: "+dump(Object.getOwnPropertyDescriptor(object, "ao")));
  print("pd of ap: "+dump(Object.getOwnPropertyDescriptor(object, "ap")));
  print("pd of ap: "+dump(Object.getOwnPropertyDescriptor(proxy, "ap")));
  // outcome:
  // pd of ao:  value:1 writeable:undefined enumerable: false configurable:false get:undefined set:undefined
  // pd of ap:  value:1 writeable:undefined enumerable: false configurable:false get:undefined set:undefined
  // pd of ap:  value:1 writeable:undefined enumerable: false configurable:false get:undefined set:undefined

  // #2

  // call:
  print("pd outside: "+dump(pd));
  // outcome:
  // pd outside:  value:1 writeable:undefined enumerable: undefined configurable:undefined get:undefined set:undefined
  Object.defineProperty(object,"bo",pd); // define pd directly
  Object.defineProperty(proxy,"bp",pd); // define pd indirectly
  // outcome:
  // pd inside:  value:1 writeable:undefined enumerable: false configurable:false get:undefined set:undefined
  // Note: pd differs
  // Not, bo and bp are defined
  print("pd of ao: "+dump(Object.getOwnPropertyDescriptor(object, "bo")));
  print("pd of ap: "+dump(Object.getOwnPropertyDescriptor(object, "bp")));
  print("pd of ap: "+dump(Object.getOwnPropertyDescriptor(proxy, "bp")));
  // pd of ao:  value:1 writeable:undefined enumerable: true configurable:true get:undefined set:undefined
  // pd of ap:  value:1 writeable:undefined enumerable: false configurable:false get:undefined set:undefined
  // pd of ap:  value:1 writeable:undefined enumerable: false configurable:false get:undefined set:undefined   

  // Note:
  // Object.defineProperty updates the fields defined in pd.
  // But, the proxy trap does not get the pd object directly, 
  // undefined fields are (e.g.  enumerable and configurable) are set to false
  // When forwarding pd to the proxy target those fields get also be updated 

});

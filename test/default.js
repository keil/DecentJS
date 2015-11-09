
quit();

(function() {

  function Handler(origin) {
   
    // _____                 
    //|_   _| _ __ _ _ __ ___
    //  | || '_/ _` | '_ (_-<
    //  |_||_| \__,_| .__/__/
    //              |_|      

    /**
     * A trap for Object.getPrototypeOf.
     */
    this.getPrototypeOf = function(target) {
      throw new Error('Trap not implemented.');
      return Object.getPrototypeOf(target);
    }

    /**
     * A trap for Object.setPrototypeOf.
     */
    this.setPrototypeOf = function(target, prototype) {
      throw new Error('Trap not implemented.');
      return Object.setPrototypeOf(target, prototype);
    }

    /**
     * A trap for Object.isExtensible
     */
    this.isExtensible = function(target) {
      return Object.isExtensible(target);
    };

    /** 
     * A trap for Object.preventExtensions.
     */
    this.preventExtensions = function(target) {
      return Object.preventExtensions(target);
    };

    /** 
     * A trap for Object.getOwnPropertyDescriptor.
     */
    this.getOwnPropertyDescriptor = function(target, name) {
      return Object.getOwnPropertyDescriptor(target, name) || {};
    };

    /** 
     * A trap for Object.defineProperty.
     */
    this.defineProperty = function(target, name, desc) {
      // Note: Matthias Keil
      // Object.defineProperty is not equivalent to the behavior 
      // described in the ECMA Standard
      var current = Object.getOwnPropertyDescriptor(target, name);

      for(var key in desc) {
        current[key] = desc[key];
      }

      touch(name);
      return Object.defineProperty(target, name, current);
    };

    /** 
     * A trap for the in operator.
     */
    this.has = function(target, name) {
      return (name in target);
    };

    /**
     * A trap for getting property values.
     */
    this.get = function(target, name, receiver) {
      return target[name];
    };

    /** 
     * A trap for setting property values.
     */
    this.set = function(target, name, value, receiver) {
      return (target[name]=value);
    };

    /**
     * A trap for the delete operator.
     */
    this.deleteProperty = function(target, name) {
      return (delete target[name]);
    };

    /** 
     * A trap for for...in statements.
     */
    this.enumerate = function(target) {

      // TODO, make test
      // test with deleted and new properties
      var properties = new Set();
      for(var property in origin) {
        properties.add(property);
      }
      for(var property in target) {
        properties.add(property);
      }
      return Array.from(properties)[Symbol.iterator]();
    };

    /**
     * A trap for Object.getOwnPropertyNames.
     */
    this.ownKeys = function(target) {

      // TODO, make test
      // test with deleted and new properties
      var properties = new Set();
      for(var property in (ownProperties = Object.getOwnPropertyNames(origin))) {
      properties.add(ownProperties[property]);
      }
      for(var property in (ownProperties = Object.getOwnPropertyNames(target))) {
        properties.add(ownProperties[property]);
      }
      return Array.from(properties); 
    };

    /** 
     * A trap for a function call.
     */
    this.apply = function(target, thisArg, argumentsList) {
      thisArg = thisArg ? thisArg : wrap(global);
      return native ? origin.apply(thisArg, argumentsList) : target.apply(thisArg, argumentsList);
    };

    /** 
     * A trap for the new operator. 
     */
    this.construct = function(target, argumentsList) {
      var thisArg = Object.create(target.prototype);
      var result =  native ? origin.apply(thisArg, argumentsList) : target.apply(thisArg, argumentsList);
      return (result instanceof Object) ? result : thisArg;
    };
  };

})();








































(function() {

  var pc = true;

  function Primitive(value) {
    this.value = value;

    this[Symbol.toPrimitive] = function (hint) {
      print('@hint', hint);
      if (hint == "number") {
        return 10;
      }
      if (hint == "string") {
        return "hello";
      }
      return true;
    }

  }
  Primitive.prototype = {};
  Primitive.prototype.toString = function() {
    return '[primitive Value]'
  };

  var metahandler = {
    get : function(target, name) {
      print("@trap", name);
      return target[name];
  }};

  var handler = {
    get : function(target, name) {
      print("@get", (typeof name === 'symbol') ? name.toString() : name);

      if(name === Symbol.toPrimitive) {
        if (false) return function(hint) {
          return 4711;
        }; else return function() {
          return "4712";
        };
      }

      return target[name];
  }};

  print("-");
  print(new Object());

  print("-");
  print(new Primitive());
  print((new Primitive()).valueOf());

  print("-");
  print(new Proxy(new Primitive(), new Proxy(handler, metahandler)));
  
  print("-");
  print((new Proxy(new Primitive(), new Proxy(handler, metahandler))).valueOf());




})();




quit();

(function() {
  print(Symbol('a')===Symbol('a'));
  print(Symbol.for('a')===Symbol.for('a'));

  var obj = {};
  obj[Symbol('a')] = 4711;
  obj[Symbol.for('a')] = 4712;

  print(obj[Symbol('a')]);
  print(obj[Symbol.for('a')]);

  print('@@', Symbol.keyFor(Symbol.for('a')));
});

(function() {
  var obj = {
    a:4711,
    [Symbol.for('a')]:4712
  };

  print(obj.a);
  print(obj[Symbol.for('a')]);

});

(function() {


// An object without Symbol.toPrimitive property.
var obj1 = {};
print(+obj1);     // NaN
print(`${obj1}`); // "[object Object]"
print(obj1 + ""); // "[object Object]"

// An object with Symbol.toPrimitive property.
var obj2 = {
  [Symbol.toPrimitive](hint) {
    print('@@@', hint);
    if (hint == "number") {
      return 10;
    }
    if (hint == "string") {
      return "hello";
    }
    return true;
  }
};

print(obj2);
print(typeof obj2);
print(obj2+1);
print(1+obj2);
print(+obj2);
print(`${obj2}`);



//print(+obj2);     // 10      -- hint is "number"
//print(`${obj2}`); // "hello" -- hint is "string"
//print(obj2 + ""); // "true"  -- hint is "default"

});


(function() {

var metahandler = { get : function(target, name) {
  print("@", name);
  return target[name];
}};

var handler = {};

// An object without Symbol.toPrimitive property.
var obj1 = {};
print(+obj1);     // NaN
print(`${obj1}`); // "[object Object]"
print(obj1 + ""); // "[object Object]"

// An object with Symbol.toPrimitive property.
var obj2 = {
  [Symbol.toPrimitive] : new Proxy(function(hint) {
    print('@@@', hint);
    if (hint == "number") {
      return 10;
    }
    if (false && hint == "string") {
      return "hello";
    }
    return Math.random()*10;
    //return true;
  }, new Proxy(handler, metahandler))
};

for(var sym of Object.getOwnPropertySymbols(obj2))
  print('%%', sym.toString());

for(var sym of Object.getOwnPropertyNames(Symbol))
  print('&&', sym);



print(obj2);
print(obj2);
print(typeof obj2);
print(obj2===obj2);
/*print(typeof obj2);*/
//print(obj2+1);
//print(1+obj2);
/*print(+obj2);
print(`${obj2}`);*/

//print(+obj2);     // 10      -- hint is "number"
//print(`${obj2}`); // "hello" -- hint is "string"
//print(obj2 + ""); // "true"  -- hint is "default"

print(typeof new Proxy(obj2, {}));

})();

quit();









(function() {

  var object = {};
  var named = {toString:function(){ return "[named Object]"}};

  print("object", object);
  print("named", named);

  var sbx = new Sandbox(this, Sandbox.DEBUG);

  //var object2 = sbx.wrap(object);
  //print("object2", object2);

  var named2 = sbx.wrap(named);
  print("named2", named2);


  //sbx.apply(testx, this, [eval.bind(this)]);



})();
quit();































var metahandler = { get : function(target, name) {
  print("@", name);
  return target[name];
}};

var handler = {};

function A() {};
function B() {};
B.prototype = new A();

var b = new B();

var p = new Proxy(b, new Proxy(handler, metahandler));

print(Object.getPrototypeOf(p).toString());


quit();

/*
   var metahandler = { get : function(target, name) {
   print("@", name);
   return target[name];
   }};

   var handler = {};


   function A() {};
   function B() {};
   B.prototype = new A();
//B.prototype = {};

var P = new Proxy(A, new Proxy(handler, metahandler));
var Q = new Proxy(B, new Proxy(handler, metahandler));

var p = new P();
print(p instanceof P, p instanceof A, p instanceof B);

//var q = new Q();
//print(q instanceof P, q instanceof Q, q instanceof A, q instanceof B);

function AA() {};
AA.prototype = new Proxy(A.prototype, {});
function BB() {};
B.prototype = new Proxy(new A(), {});

var PP = new Proxy(AA, new Proxy(handler, metahandler));
var QQ = new Proxy(BB, new Proxy(handler, metahandler));

var pp = new PP();
print(pp instanceof PP, pp instanceof AA, pp instanceof BB);
print(pp instanceof P, pp instanceof A, pp instanceof B);


//var qq = new QQ();
//print(qq instanceof PP, qq instanceof QQ, qq instanceof AA, qq instanceof BB);


//print(Object.getPrototypeOf(p));
*/






//quit();
load("test/membrane/Object.getPrototypeOf.js");

quit();



// Object.getPrototypeOf
//load("test/membrane/Object.getPrototypeOf.js");


Date.XXX = 4711;
print(Date.XXX);
print(Date);

quit();

var object = {};
object.a = 4711;

print(object.a);
print(Object.getOwnPropertyDescriptor(object, "a"));
delete object.a;
print(object.a);
print(Object.getOwnPropertyDescriptor(object, "a"));

print("LLL");


quit();

function Handler(shadow) {
  this.XisExtensible = function(target) {
    //print(Object.isExtensible(target));
    //print(Object.isExtensible(shadow));
    return Object.isExtensible(target);
  };
  this.preventExtensions = function(target) {
    print("prevent extensions");
    return Object.preventExtensions(target);
  }
}

var shadow = {};
var target = {};
var proxy = new Proxy(target, new Handler(shadow));

print(Object.isExtensible(proxy));
print(Object.preventExtensions(proxy));


quit();


var mySet2 = new Set([1,2,3,4]);
print(mySet2.size); // 4
mySet2.clear();
print(mySet2.size); // 4


var map = new Map();
map.set({}, 4711);
map.set({}, 4712);


for(var p of map) {
  print(p);
}

var array = [1,2,4,6,7,8];
for(var p of array) {
  print(p);
}



load('test/examples.js');







quit();

var values = [{}, {}, {}];
var map = new WeakMap();
map.set(values[0],values[0]);
print(map.has(values[0]));


quit();

var array = [1, 2, "test", {a: 10}];
var set = new WeakSet(array);


print(set.has.apply(set, [array[3]]));

quit();

print(set.has(1));

for(var x in Date.prototype) print(x);

Object.getOwnPropertyNames(Array.prototype);

quit();



//quit();

// test new engine

// Indirect eval will break the encapsulation
// eval.bind ist not equals to eval, and thus not filterewd

// --> implement whitelisting
// --> eval as function call

var x = "L";

function testx (f) {
  "use strict";

  var e = eval;
  print(Function.prototype.toString.apply(f));

  //f("x = 'oIo'; y=2; var z=3;");

  eval("x = 'oIo'; y=2; var z=3;");

  /*
     eval("x = 'oIo'; y=2; var z=3;");
     print(y);
     print(z);
     */

}

var sbx = new Sandbox(this, Sandbox.DEBUG);
sbx.apply(testx, this, [eval.bind(this)]);


print(x);
print(y);
print(z);











quit();

var x = "L";

function test () {
  "use strict";

  var e = eval; 

  e("x = 'oIo'; /*y=2;*/ var z=3;");
  print(z);

}

test();


print(x);
//print(y);
//print(z);











/*
   var x = "L";

   function XTest() {
   }


   function f() {

   var Test = function() {
   }

   var e = eval;

//eval("x=new Test()");
e("x=new Test()");

};

f();

var sbx = new Sandbox(this, Sandbox.DEBUG);
//sbx.apply(f);

print("XXXXX" + x);

*/
quit();

this.objA = {};

var sbx = new Sandbox(this, Sandbox.DEBUG);

sbx.apply(function(y) {
  this.objB = objA;
}, this);


print("---");
print(sbx.readeffectsOf(this));
print(sbx.writeeffectsOf(this));
print("---");
print(sbx.readeffectsOf(objA));
print(sbx.writeeffectsOf(objA));

print('objA' in this);
print('objB' in this);

sbx.writeeffectsOf(this)[0].commit();

print('objA' in this);
print('objB' in this);

objA.x;
objB.x;

objA.y=1;
objB.y=1;

print(sbx.readeffectsOf(objA));
print(sbx.writeeffectsOf(objA));



quit();

this.obj = {};

var sbx = new Sandbox(this, Sandbox.DEBUG);

sbx.apply(function(y) {
  obj.x;
  obj.y = 1;
  obj.y;obj.y;obj.y;
  obj.y;obj.y;obj.y;
}, this);


//print("---");
//print(sbx.readeffectsOf(this));
//print(sbx.writeeffectsOf(this));
print("---");
print(sbx.readeffectsOf(obj));
print(sbx.writeeffectsOf(obj));


/*
 * BUG, is need two different sandbox handler objects,
 * one for the glo9bal, that returns always true for a has requiest, 
 * and one for notmal objects
 *
 */

quit();














/*
   var x = 0;

   var d = new Date();
   var dd = Date.now();
   for (i=0; i<10000; i++) x+=1;
   var e = new Date();
   var ee = Date.now();

   print(d.toString());
   print(e.toString());
   print(d<e);

   print(dd.toString());
   print(ee.toString());
   print(dd<ee);

//print(Date.now());
print((new Date()));

quit();
*/







var x = 4711;

var sbx = new Sandbox({x:1}, Sandbox.DEBUG);

//var obj = sbx.wrap({a:4711, b:4712});
//print(obj.x);

var fun = sbx.wrap(function(y) {
  x= x+y;
  return x;
});

print(fun(1));
print("x : " + x);


/*
 * BUG, is need two different sandbox handler objects,
 * one for the glo9bal, that returns always true for a has requiest, 
 * and one for notmal objects
 *
 */

quit();






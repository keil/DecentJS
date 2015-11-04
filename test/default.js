


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






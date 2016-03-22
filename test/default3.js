/*Array.prototype.x = 4711;
var x = new Array();
print("s" , Reflect.getPrototypeOf(x)===Array.prototype,  Reflect.getPrototypeOf(x).x);

quit();*/

var secret = 0;

function inc () {
  return secret++;
}

var A = {};
Object.defineProperty(A, "x", {get: inc});

//Object.defineProperty(Date, "x", {get: inc});
//Object.defineProperty(Date.prototype, "x", {get: inc});

//Object.defineProperty(Array, "x", {get: inc});
Object.defineProperty(Array.prototype, "x", {get: inc});

//Object.defineProperty(Function.prototype, "x", {get: inc});
//Object.defineProperty(Object.prototype, "x", {get: inc});

var sbx = new Sandbox(this, Sandbox.DEFAULT);
function test () {
  
  //var target = A;

  //var target = Array; // OK
  var target = new Array();
  ///var target = [];
  
  //var target = new Date(); // XXX
  //var target = Date.prototype; // OK
  //var target = Date; // OK
  
  //var target = new Function("return 1;"); // XXX
  //var target = (function(){}); // XXX
  
  //var target = new Object();
  //var target = {};

  print(target.x,target.x,target.x);
  print("secret (sandbox):", secret);
}
sbx.apply(test);
print("secret (global):", secret);




//Object.defineProperty(obj, prop, descriptor)




/*
var secret = 4711;

var sbx = new Sandbox(this, Sandbox.DEFAULT);

function test () {
  return function f(thisArg) {
    thisArg.secret = 4712;
    print("secret (sbx):", secret);
  }
}

var f = sbx.apply(test);
f(this);

print("secret (global):", secret);
*/



// commit of a function
// return auf application



/*
var secret = 4711;

var sbx = new Sandbox(this, Sandbox.DEFAULT);

function test() {
  secret = 4712;
  print("secret (sbx):", secret);
  // ---
  var f = function () {
    secret = 4713;
    print("secret (sbx):", secret);
  }
  f();
  // ---
  var g = new Function('secret = 4714; print("secret (sbx):", secret);' );
  g();
}

sbx.apply(test);



print("secret (global):", secret);
*/
/*

var sbx2 = new Sandbox(this, Sandbox.DEFAULT);

function A(){
  this.a="4711";
}
A.prototype = {};
function B() {
  this.b="4711";
}
B.prototype = new A();

function test2 (A, B) {
  var p = Object.getPrototypeOf(B);
  p.a = 4712;

  var b = new B();
  print("(Sandbox)", "a:", b.a, "b", b.b);

}

sbx2.call(test2, undefined, A, B);


var b = new B();
print("(Global)", "a:", b.a, "b", b.b);


*/
//Object.getPrototypeOf(obj)

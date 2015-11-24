//quit();
load("demo/storyline/host.js");
quit();




var x,y = 1;

var handler = {has:function() {return true;}, get:function(target, name) {print("@", name)}};

with(new Proxy({}, handler)) { 
  x+y+z;

}





quit();

// Storyline Test
// ==============
load("demo/storyline.js");
quit();


/*

var handler = {
  has:function(target, name){
    print("@has", name);
    return true;
  },
  get:function(target, name) {
    print("@get", name);
    return target[name];
  }
}
global = {};
var env = new Proxy(global, handler);

var g = (function() {

with(env) {

  // TODO function f
  var f = function() {
    return x+y;
  }
  //f();
  return f;
}
})();
print(f, global.f, g);

g();






quit();

var x = 4711;
// var y = 4711; // created in g
// var z = 4711 // shoudl be created in sandbox

var f = function() {
  x = 4712;
}

var g = function() {
  z = 4712;
}

var h = function() {
  f(); g();
}

var i = function() {
  this.x = 4714;
}

var sbx = new Sandbox(this, Sandbox.DEBUG);

sbx.eval("var x = 4712;");
//sbx.eval("x = 4712;");

//sbx.eval("var y = 4712;");
//sbx.eval("y = 4712;");

//sbx.eval("f();");
//sbx.eval("g();");
//sbx.eval("h();");

// PROBLEM
//sbx.eval("this.x=4713;");
//sbx.eval("print('@this', this);");

//sbx.eval("i();");

//sbx.eval("var z = 4711;");
//sbx.eval("global = 4712;");

sbx.eval("print('\\nSandbox');");
//sbx.eval("print('@x', x);");

sbx.eval("print('@x', x);");
//sbx.eval("print('@y', y, this.y);");
//sbx.eval("print('@z', z, this.z);");

//f();
//g();
//h();

print("\nGlobal");
print("@x", x, this.x);
//print("@y", y);
//print("@z", z);








*/

/*

quit();
var __a__ = 4711;
var __b__ = 4712;

var sbx = new Sandbox(this, Sandbox.DEBUG);
//sbx.load("demo/fileA.js","demo/fileB.js");
sbx.eval(read("demo/fileA.js"));
sbx.eval(read("demo/fileB.js"));
sbx.eval("print(__a__ , __b__, __b__ instanceof __A__)");


//print(__a__, __b__);
//print(__A__, __B__, __a__, __b__);
*/

//quit();
//load("demo/storyline.js");
//quit();








//quit();
load("demo/storyline/host.js");
//quit();

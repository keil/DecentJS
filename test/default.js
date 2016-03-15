load("test/default2.js");
quit();

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

var sbx = new Sandbox(this, Sandbox.DEFAULT, new Set([root]));

print(";;; outside sandbox");
print("tree: " + root);

print(";;; inside sandbbox");
print("tree: " + sbx.call(root.toString, root));

print(";;; set value inside")
sbx.call(setValue, this, root);

print(";;; outside sandbox");
print("tree: " + root);

print(";;; inside sandbbox");
print("tree: " + sbx.call(root.toString, root));

print(";;; set value outside")
setValue(root);

//print(";;; outside sandbox");
//print("tree: " + root);

//print(";;; inside sandbbox");
//print("tree: " + sbx.call(root.toString, root));

print(";;; operation");
//sbx.revertOn(sbx.wrap(root.left)); // XXX
//sbx.revert();
//sbx.rollback();
//sbx.rebase();

print(";;; outside sandbox");
print("tree: " + root);

print(";;; inside sandbbox");
print("tree: " + sbx.call(root.toString, root));

print(";;; has changes of sandbbox");
print(sbx.hasChanges);
print(";;; has differences of sandbbox");
print(sbx.hasDifferences);

print(";;; all changes of sandbbox");
for(var change of sbx.changes) print(change);

print(";;; all differences of sandbbox");
for(var change of sbx.differences) print(change);

print(";;; all effect on root");
for(var change of sbx.effectsOn(root)) print(change);

quit();


/*
sbx.assert(new Rule(Effect.Set(null, root, 'value'), function() {return true;}));


var jquery = new Ploicy("Commit jQuery/$ to this;");
policy.commit = new Set([
    new Rule.Set(this, "$", null);
    new Rule.Set(this, "jQuery", null);
    ]);

sbx.applyPolicy(jquery);


var jquery = new Ploicy("Commit jQuery/$ to this;");
policy.commit = [
  new Rule([
      new Effect.Set(this, "jQuery"),
      new Effect.Set(this, "$")],
      null
      )
  ];


    new Rule.Any(this, null);
    new Rule.Set(this, "jQuery", null);
    ]);

sbx.applyPolicy(jquery);

*/


/*
var jquery = new Policy("Commit jQuery/$ to this;");
jquery.add(
    Rule.Commit(this, "jQuery", null),
    Rule.Commit(this, "$", null)
    );
sbx.applyPolicy(jquery);
*/
/*
var jquery = new Policy("Commit jQuery/$ to this;");
jquery.add(
    Rule.Commit(root, "value", function() {return true}),
    Rule.Commit(root, "left", null)
    );
sbx.applyPolicy(jquery);
*/

// is a combination of permitted operations in combinations 
// with restrictions.
// predicate ro restrict 




print(";;; outside sandbox");
print("tree: " + root);

print(";;; inside sandbbox");
print("tree: " + sbx.call(root.toString, root));


quit();
/*
Commit(root, 'value')

var r = Policy('name');
r.commit.add(new Rule(
      Rule.Set(root, 'name'), function(sandbox, effect) {
        return true;
      }))





sbx.apply(new Rule.Set(this, 'jQuery'), function() {
  return true;
});


for(var effect of sbx.writeeffect(this)) {
  if(effect.name === 'target') effect.commi();
}
*/







quit();

var object = {z:{x:1, y:2, z:{x:1, y:2}}};

var sbx = new Sandbox(this, Sandbox.DEFAULT);
var wrapped = sbx.wrap(object);

wrapped.x = 4711;
wrapped.y = wrapped.x+1;
wrapped.z.z.z = 4711;


print(sbx.statistic);
print("#effects", sbx.effects.size);
print("#readeffects", sbx.readeffects.size);
print("#writeeffects", sbx.writeeffects.size);
print("#calleffects", sbx.calleffects.size);

//sbx.writeeffects.forEach(function(i, e) {print(e)});

quit();






//var self = sbx.request("sbxdom.js", "code.js");
//sbx.load("benchmark/octane/base.js", "benchmark/octane/deltablue.js", "benchmark/octane/run.js")




/*
print(sbx.statistic);
print("#effects", sbx.effects.size);
print("#readeffects", sbx.readeffects.size);
print("#writeeffects", sbx.writeeffects.size);
print("#calleffects", sbx.calleffects.size);

print("###" + Object.inheritsFrom);
*/



/*
load("lib/sbxdom.js");
var global = makeDOM();
print(global.document);

var global2 = makeDOM();
print(global2.document);

print(global.document === global2.document);

for(var name in global) print(name);
for(var name of Object.getOwnPropertyNames(global)) print(name);

quit();

load("dom.js");

//var sbx = new Sandbox(this, Sandbox.DEFAULT);
//var _document = sbx.wrap(document);

//print(_document.location);
//window.location = "https://rm-keil.de";
//print(_document.location);

*/


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1";
  //fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

quit();
/*
var str = read("sbxdom.js");
var dx = eval(str);
for(var p in dx) print(p);
print("document" in dx);
*/
/*
quit();

(function() {

  var str = read("dom.js");
  eval(str);
  print(this.document);

}).call({
  Function:Function, 
  String:String,
  Array:Array,
  Object:Object,
  Math:Math,
  Date:Date,
  WeakMap:WeakMap,
  RegExp:RegExp,
  Boolean:Boolean,
  Error:Error,
  TypeError:TypeError, 
  Number:Number
}, {});

//print(document);



//print(document);

quit();
*/

//load("dom.js");

(function() {

var sbx = new Sandbox(this, Sandbox.DEFAULT);
var self = sbx.load("sbxdom.js", "code.js");

//print("XXX", self.document);


sbx.writeeffectsOn(this).forEach(function(i, e) {print(e)});
sbx.commitOn(this);

//var d = this.document;

//var document sbx.eval
//print(document);
//var document = 654654;
//print(sbx.eval("return document;"));
//print(document);
//print(dx);

//var __document = sbx.wrap(document);
//__document.getElementById("asdf");

//sbx.eval("var x = 4712;");
//sbx.eval("x = 4712;");


})();




quit();





//quit();
load("demo/storyline/host.js");
quit();

var x,y,z = 1;


var handler = {has:function() {return true;}, get:function(target, name) {print("@get", name); return (name==='eval') ? eval : target[name];}, set:function(target, name) {print("@set", name); return target[name]=value}};
var env = new Proxy({}, handler);

var sbxeval = (function() {
  with(env) {
    return eval.bind({});
    function x(source) {
      //"use strict";
      return eval(source);
    }
  }
})();

print(sbxeval);

sbxeval("x+z+z");
sbxeval("var a=4711");
sbxeval("function f() {}");
print(sbxeval("f"));

//print(f);


//var sbxeval =  eval("with(env) {  }");






quit();

var x,y = 1;

var handler = {has:function() {return true;}, get:function(target, name) {print("@get", name)}, set:function(target, name) {print("@set", name)}};

with(new Proxy({}, handler)) {
  (function(){
    x+y+z;
    a=4711;
    function f () {};
    var g = function() {}
    var h = 11;
  })();
}

//print(f);



quit();

var x,y = 1;

var handler = {has:function() {return true;}, get:function(target, name) {print("@get", name)}, set:function(target, name) {print("@set", name)}};

with(new Proxy({}, handler)) { 
  x+y+z;
  a=4711;
  function f () {};
  var g = function() {}
  var h = '';
}

print(h);



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

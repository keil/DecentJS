(function() {

  function A() {
    this.x = {a:4711};
  }
  function B() {
  }
  B.prototype = new A();

  function dox(A, B) {
    var a = new A();
    var b = new B();
    print('SBX', (new B().x.a));
    b.x.a = 4712;
    print('SBX', (new B().x.a));
    B.prototype.x.a = 4713;
    print('SBX', (new B().x.a));
  }

  print('GLOBAL', (new B().x.a));
  //dox(A, B);
  var sbxx = new Sandbox(this, Sandbox.DEBUG);
  sbxx.apply(dox, this, [A, B]);
  print('GLOBAL', (new B().x.a));

})();

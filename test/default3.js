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
  var g = Function("", 'secret = 4714; print("secret (sbx):", secret);' );
  g();
}

sbx.apply(test);



print("secret (global):", secret);

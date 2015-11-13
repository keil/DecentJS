// Copyright 2013 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

new BenchmarkSuite('zlib', [152815148], [
  new Benchmark('zlib', false, true, 10,
    runZlib, undefined, tearDownZlib, null, 3)]);

// Generate 100kB pseudo-random bytes (compressed 25906 bytes) and
// compress/decompress them 60 times.
var zlibEval = eval;
function runZlib() {
  if (typeof Ya != "function") {
    InitializeZlibBenchmark();
  }
  Ya(["1"]);
}

function tearDownZlib() {
  delete this.$;
  delete this.$a;
  delete this.Aa;
  delete this.Ab;
  delete this.Ba;
  delete this.Bb;
  delete this.C;
  delete this.Ca;
  delete this.Cb;
  delete this.D;
  delete this.Da;
  delete this.Db;
  delete this.Ea;
  delete this.Eb;
  delete this.F;
  delete this.Fa;
  delete this.Fb;
  delete this.G;
  delete this.Ga;
  delete this.Gb;
  delete this.Ha;
  delete this.Hb;
  delete this.I;
  delete this.Ia;
  delete this.Ib;
  delete this.J;
  delete this.Ja;
  delete this.Jb;
  delete this.Ka;
  delete this.Kb;
  delete this.L;
  delete this.La;
  delete this.Lb;
  delete this.Ma;
  delete this.Mb;
  delete this.Module;
  delete this.N;
  delete this.Na;
  delete this.Nb;
  delete this.O;
  delete this.Oa;
  delete this.Ob;
  delete this.P;
  delete this.Pa;
  delete this.Pb;
  delete this.Q;
  delete this.Qa;
  delete this.Qb;
  delete this.R;
  delete this.Ra;
  delete this.Rb;
  delete this.S;
  delete this.Sa;
  delete this.Sb;
  delete this.T;
  delete this.Ta;
  delete this.Tb;
  delete this.U;
  delete this.Ua;
  delete this.Ub;
  delete this.V;
  delete this.Va;
  delete this.Vb;
  delete this.W;
  delete this.Wa;
  delete this.Wb;
  delete this.X;
  delete this.Xa;
  delete this.Y;
  delete this.Ya;
  delete this.Z;
  delete this.Za;
  delete this.ab;
  delete this.ba;
  delete this.bb;
  delete this.ca;
  delete this.cb;
  delete this.da;
  delete this.db;
  delete this.ea;
  delete this.eb;
  delete this.fa;
  delete this.fb;
  delete this.ga;
  delete this.gb;
  delete this.ha;
  delete this.hb;
  delete this.ia;
  delete this.ib;
  delete this.j;
  delete this.ja;
  delete this.jb;
  delete this.k;
  delete this.ka;
  delete this.kb;
  delete this.la;
  delete this.lb;
  delete this.ma;
  delete this.mb;
  delete this.n;
  delete this.na;
  delete this.nb;
  delete this.oa;
  delete this.ob;
  delete this.pa;
  delete this.pb;
  delete this.qa;
  delete this.qb;
  delete this.r;
  delete this.ra;
  delete this.rb;
  delete this.sa;
  delete this.sb;
  delete this.t;
  delete this.ta;
  delete this.tb;
  delete this.u;
  delete this.ua;
  delete this.ub;
  delete this.v;
  delete this.va;
  delete this.vb;
  delete this.w;
  delete this.wa;
  delete this.wb;
  delete this.x;
  delete this.xa;
  delete this.xb;
  delete this.ya;
  delete this.yb;
  delete this.z;
  delete this.za;
  delete this.zb;
}

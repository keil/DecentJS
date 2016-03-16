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

var base_dir = 'benchmark/octane/';

var basefile = (base_dir + 'base.js');
var runfile  = (base_dir + 'run.js');

var benchmarks = [];

benchmarks.push(base_dir + 'richards.js');

/**
 * Note: Matthias Keil
 * deltablue.js
 * Running not possible because benchmark modifies 
 * Object.prototype
 * benchmarks.push(base_dir + 'deltablue.js');
 */
//benchmarks.push(base_dir + 'deltablue.js');

benchmarks.push(base_dir + 'crypto.js');
benchmarks.push(base_dir + 'raytrace.js');
benchmarks.push(base_dir + 'earley-boyer.js'); 
benchmarks.push(base_dir + 'regexp.js');
benchmarks.push(base_dir + 'splay.js'); 
benchmarks.push(base_dir + 'navier-stokes.js');
benchmarks.push(base_dir + 'pdfjs.js'); 
benchmarks.push(base_dir + 'mandreel.js'); 
benchmarks.push([base_dir + 'gbemu-part1.js', base_dir + 'gbemu-part2.js']);
benchmarks.push(base_dir + 'code-load.js');
benchmarks.push(base_dir + 'box2d.js');

/**
 * Note: Matthias Keil
 * zlib.js 
 * Running not possible because benchmark
 * uses an indirect call of eval, which is 
 * not further supported in ES6
 * benchmarks.push([base_dir + 'zlib.js', base_dir + 'zlib-data.js']); //Error: eval not supported
 */

benchmarks.push([base_dir + 'typescript-input.js', base_dir + 'typescript-compiler.js', base_dir + 'typescript.js']);

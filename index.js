/*
 * DecentJS 
 * https://github.com/keil/DecentJS/
 *
 * Copyright (c) 2014-2017, Proglang, University of Freiburg.
 * All rights reserved.
 *
 * Released under the MIT license
 * https://raw.githubusercontent.com/keil/DecentJS/npm/LICENSE
 *
 * Author Matthias Keil
 * http://www.informatik.uni-freiburg.de/~keilr/
 */

module.exports = require('./src/sandbox');

// OLD
require("lib/padding.js");
require("lib/global.js");
require("lib/sbxdom.js");

require("src/misc.js");
require("src/out.js");
require("src/shell.js");
require("src/statistic.js");

require("src/effect.js");
require("src/policy.js");
require("src/rule.js");

require("src/observer.js");
require("src/monitor.js");
require("src/sandbox.js");

require('test/testcase.js');
require('test/metahandler.js');

quit();

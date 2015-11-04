/*
 * TreatJS: Sandbox 
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 *
 * Copyright (c) 2014-2015, Proglang, University of Freiburg.
 * http://proglang.informatik.uni-freiburg.de/treatjs/
 * All rights reserved.
 *
 * Released under the MIT license
 * http://proglang.informatik.uni-freiburg.de/treatjs/license
 *
 * Author Matthias Keil
 * http://www.informatik.uni-freiburg.de/~keilr/
 */

/** ShellOut
 * Sandbox Logging (JavaScript Shell).
 */
function ShellOut() {
  if(!(this instanceof ShellOut)) return new ShellOut();
  else Out.call(this);

  /** Padding Information
  */
  var idWidth = 30;
  var fstWidth = 100;
  var sndWidth = 20;
  var seperator = ".";

  /** Standard Output (Head + Message)
  */
  function out(string) {
    putstr(padding_right(string + " ", seperator, fstWidth));
  }
  define("out", out, this);

  /** Sub-Standard Output (Message)
  */
  function subout(string) {
    putstr(padding_right("... " + string + " ", seperator, fstWidth));
  }
  define("subout", subout, this);

  /** Blank Output (End Of Line)
  */
  function blank() {
    putstr(padding_left(seperator, seperator, sndWidth));
    putstr("\n");
  }
  define("blank", blank, this);

  /** OK Output (End Of Line)
  */
  function ok() {
    putstr(padding_left(" OK", seperator, sndWidth));
    putstr("\n");
  }
  define("ok", ok, this);

  /** DONE Output (End Of Line)
  */
  function done() {
    putstr(padding_left(" DONE", seperator, sndWidth));
    putstr("\n");
  }
  define("done", done, this);

  /** FAILED Output (End Of Line)
  */
  function fail() {
    putstr(padding_left(" FAILED", seperator, sndWidth));
    putstr("\n");
  }
  define("fail", fail, this);

  /** Notice Output (Sub-Output including Blank)
  */
  function notice(string) {
    putstr(padding_right("... " + string + " ", seperator, fstWidth+sndWidth));
    putstr("\n");
  }
  define("notice", notice, this);

  /** Head Output
  */
  function head(id) {
    return padding_right(id + " ", ".", idWidth);
  }
  define("head", head, this);

  //                 _                      
  // _ __  ___ _ __ | |__ _ _ __ _ _ _  ___ 
  //| '  \/ -_) '  \| '_ \ '_/ _` | ' \/ -_)
  //|_|_|_\___|_|_|_|_.__/_| \__,_|_||_\___|

  this.membrane = function(msg, sbx) {
    var id = (sbx!==undefined) ? "@" + sbx.id : "";
    out(head("[Membrane"+id+"]") + " " +msg);
    blank();
  };

  // _                             _   _             
  //| |_ _ _ __ _ _ _  ___ __ _ __| |_(_)___ _ _  ___
  //|  _| '_/ _` | ' \(_-</ _` / _|  _| / _ \ ' \(_-<
  // \__|_| \__,_|_||_/__/\__,_\__|\__|_\___/_||_/__/

  this.transactions = function(msg, sbx) {
    var id = (sbx!==undefined) ? "@" + sbx.id : "";
    out(head("[Transaction"+id+"]") + " " + msg);
    blank();
  };
}
ShellOut.prototype = new Out();

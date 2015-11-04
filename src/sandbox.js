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

/** JavaScript Sandbox
 *
 * @param global The Snadbox Global Object
 * @param params Object
 * @pprestate snapshow objects
 *
 * Sandbox Optione
 *
 * - verbose
 *   Enables verbose mode. (default: false)
 *
 * - statistic
 *   Enables statistic. (default: false)
 *
 * - decompile
 *   Decompiles functions. (default: true)
 *
 * - membrane
 *   Implements a sandbox membrane. (default: true)
 *
 * - effect
 *   Enables effect logging. (default: true)
 *
 * - transparent
 *   Tells the sandbox to be transparent. (default: false)
 *
 * - metahandler
 *   Implements a proxy meta handler. (default: true)
 *
 * - passthrough
 *   Tells the sandbox to do not decompile functions. (default: [])
 *
 * - out
 *   Instance for the output. (default: new Out())
 *
 */
function Sandbox(global, params, prestate) {
  if(!(this instanceof Sandbox)) return new Sandbox(global, params);

  if(!(global instanceof Object))
    throw new TypeError("No Global Object.");

  /** 
   * Verbose Mode
   * (default: false)
   */
  var __verbose__ = configure("verbose", false);

  /** 
   * Enable Statistic
   * (default: false)
   */
  var __statistic__ = configure("statistic", false);

  /*
   * Decompile
   * (default: true)
   */
  var __decompile__ = configure("decompile", true);

  /*
   * Membrane
   * (default: true)
   */
  var __membrane__ = configure("membrane", true);

  /*
   * Effect
   * (default: true)
   */
  var __effect__ = configure("effect", true);

  /*
   * Transparent
   * (default: false)
   */
  var __transparent__ = configure("transparent", false);

  /*
   * MetaHandler
   * (default: true)
   */
  var __metahandler__ = configure("metahandler", true);

  /*
   * Function pass-through
   * (default: {})
   */
  var __passthrough__ = configure("passthrough", []);

  /*
   * Output
   * (default:null);
   */
  var __out__ = configure("out", new Out());

  // TODO
  var __debug__ = configure("debug", false);


  //              __ _                   
  // __ ___ _ _  / _(_)__ _ _  _ _ _ ___ 
  /// _/ _ \ ' \|  _| / _` | || | '_/ -_)
  //\__\___/_||_|_| |_\__, |\_,_|_| \___|
  //                  |___/              
  function configure(param, value) {
    return (param in (params===undefined ? {} : params)) ? params[param] : value;
  };

  //                 _        _                              _        _   
  // _ __ _ _ ___ __| |_ __ _| |_ ___   ____ _  __ _ _ __ __| |_  ___| |_ 
  //| '_ \ '_/ -_|_-<  _/ _` |  _/ -_) (_-< ' \/ _` | '_ (_-< ' \/ _ \  _|
  //| .__/_| \___/__/\__\__,_|\__\___| /__/_||_\__,_| .__/__/_||_\___/\__|
  //|_|                                             |_|                   

  // TODO
  //var snapshot = new WeakMap();

  //if(prestate instanceof Array) for(var i in prestate) {
  //  snapshot.push(prestate[i], clone(prestate[i])); // TODO, CLONE object and function obejcts
  //}

  // _           
  //| |___  __ _ 
  //| / _ \/ _` |
  //|_\___/\__, |
  //       |___/ 

  var id = this;

  /** log(msg)
   * @param msg String message
   */ 
  function log(msg) {
    if(__verbose__) {
      __out__.membrane(msg, id);
    }
  }

  /** logc(msg)
   * @param msg String message
   */ 
  function logc(cmd, arg) {
    if(__verbose__) {
      __out__.membrane("$."+padding_right(cmd+" ", ".", 30)+((arg!==undefined) ? " "+arg : ""), id);
    }
  }

  //    _        _   _    _   _    
  // __| |_ __ _| |_(_)__| |_(_)__ 
  //(_-<  _/ _` |  _| (_-<  _| / _|
  ///__/\__\__,_|\__|_/__/\__|_\__|

  var statistic = new Statistic();

  function increment(op) {
    if(__statistic__) {
      statistic.increment(op);
    }
  }

  //     _     _      _   _          
  //__ _(_)___| |__ _| |_(_)___ _ _  
  //\ V / / _ \ / _` |  _| / _ \ ' \ 
  // \_/|_\___/_\__,_|\__|_\___/_||_|

  function violation(msg) {
    // NOTE: Matthias Keil
    // throw new Error("Unauthorized Access: "+msg);
    // not possible because each 
    // write access calls has before calling set
    log("Unauthorized Access: "+msg);
  }

  // _    _  _      _   _         ___             _   _          
  //(_)__| \| |__ _| |_(_)_ _____| __|  _ _ _  __| |_(_)___ _ _  
  //| (_-< .` / _` |  _| \ V / -_) _| || | ' \/ _|  _| / _ \ ' \ 
  //|_/__/_|\_\__,_|\__|_|\_/\___|_| \_,_|_||_\__|\__|_\___/_||_|

  var FunctionPrototypeToString = Function.prototype.toString;
  var passthrough = new Set((__passthrough__ instanceof Array) ? __passthrough__ : []);

  /** isPassThrough(fun)
   * Checks whether the given function is a pass-through function or not.
   *
   * @param fuc Function Object
   * @return true, if fun is a pass-through function, false otherwise
   */
  function isPassThrough(fun) {
    if(!(fun instanceof Function)) return false;
    else {
      return passthrough.has(fun);
    }

    // Note: Matthias Keil
    // deprecated, Function.bind makes all functions to a native function
    // this, this check will not work as expected
    // return (FunctionPrototypeToString.apply(fun).indexOf('[native code]') > -1);
  }

  // _    ___          _ 
  //(_)__| __|_ ____ _| |
  //| (_-< _|\ V / _` | |
  //|_/__/___|\_/\__,_|_|

  var GlobalEval = eval;

  /** isEval(fun)
   * Checks whether the given function is the global eval function or not.
   *
   * @param fuc Function Object
   * @return true, if fun is eval, false otherwise
   */
  function isEval(fun) {
    if(!(fun instanceof Function)) return false;
    else return (fun===GlobalEval);
  }

  //__ __ ___ _ __ _ _ __ 
  //\ V  V / '_/ _` | '_ \
  // \_/\_/|_| \__,_| .__/
  //                |_|   

  /** Maps target values to sandbox proxies
  */
  var cache = new WeakMap();

  /** Stores the sandbox proies
  */
  var pool = new WeakSet();

  // TODO
  //var reverse = new WeakMap();
  //var pool = new WeakSet();

  /** 
   * wrap(target)
   * Wraps a target object.
   *
   * @param target The Target Object.
   * @return JavaScript Proxy 
   */
  function wrap(target) { 
    //__verbose__ && logc("wrap");

    // If target is a primitive value, then return target
    if (target !== Object(target)) {
      return target;
    }

    //__statistic__ && increment("wrap");

    // If target is undefined, then throw an exception
    // Matthias Keil: should never occur because of Object(target)
    //if(target===undefined)
    //  throw new ReferenceError("Target is undefined.");

    // avoids re-wrapping
    if(pool.has(target)) return target;

    // TODO
    // Membrane ? 
    //if(!(__membrane__))
    //  return target;

    // TODO
    // Note: Matthias Keil
    // deprecated, use passthrough
    // Eval
    //if(isEval(target)) {
    //  return undefined;
    //}

    // Function pass throught
    if((target instanceof Function) && isPassThrough(target)) {
      log("target pass-throught");
      return target;
    }

    // TODO
    // Pre-state snapshot
    //if(snapshot.has(target)) {
    //  return snapshot.get(target); // TODO, new semantics 
    //}

    // If target already wrapped, return cached proxy
    if(cache.has(target)) {
      //log("Cache hit.");
      //increment("Cache hit");
      return cache.get(target);
    } else {
      //log("Cache miss.");
      //increment("Cache miss");

      // TODO, check if  required


      // decompiles function or clones object
      // to preserve typeof/ instanceof
      // and to make an iterable image for loops
      if(target instanceof Function) {
        log("target instanceOf Function");
        var scope = cloneFunction(target);
      } else {
        log("target instanceOf Object");
        var scope = cloneObject(target);
      }

      /*function make(handler) {
      // meta handler ?
      if(!__metahandler__) return handler;

      var metahandler = {
      get: function(target, name) {
      log("Call Trap: "+name);
      // TODO
      if(name in handler) return target[name];
      else throw new ReferenceError("Trap "+name+" not implemented.");
      }
      };
      return new Proxy(handler, metahandler)
      }*/

      // TODO
      //var handler = make(new Membrane(target));
      var handler = new Membrane(target);
      var proxy = new Proxy(scope, handler);

      cache.set(target, proxy);
      //      reverse.set(proxy, target);
      pool.add(proxy);


      return proxy;
    }
  }

  /**
   * unwrap(value)
   * unwraps a sandbox value
   *
   * @param value JavaScript Object
   * @return JavaScript Object
   */
  /*function unwrap(value) {
    if (value !== Object(value)) return value;
    if(!reverse.has(value)) return value;
    return unwrap(reverse.get(value));
    }*/ // TODO

  /**
   * clone(target)
   * clones a JavaScript Object
   *
   * @param target JavaScript Object
   * @return JavaScript Object
   */
  /*function clone(target) {
    if(target instanceof Function) return cloneFunction(target); 
    else return cloneObject(target);
    }*/ // TODO, deprecated

  /**
   * cloneObject(target)
   * clones a JavaScript Object
   *
   * @param target JavaScript Object
   * @return JavaScript Object
   */
  function cloneObject(target) {
    //log("Clone Object."); // TODO

    // TODO
    // transparent ?
    //if(__transparent__)
    //  return target;

    // TODO, not required
    //if(!(target instanceof Object))
    //  throw new Error("No JavaScript Object.");

    var clone = Object.create(Object.getPrototypeOf(target));

    // TODO
    //print(target);
    for (var property in target) {
      if (target.hasOwnProperty(property)) {
        var descriptor = Object.getOwnPropertyDescriptor(target, property);
        Object.defineProperty(clone, property, descriptor);
      }  
    }
    return clone;
  }

  /**
   * cloneFunction(target)
   * clones a JavaScript Function
   *
   * @param target JavaScript Function
   * @return JavaScript Function
   */
  function cloneFunction(target) {
    log("Clone Function.");

    if(!(target instanceof Function))
      throw new Error("No JavaScript Function.");

    var clone = decompile(target, wrap(global));
    // TODO XXX
    //clone.prototype = target.prototype;
    //print("@@@@ " + target.prototype);
    //var xxx = wrap(target.prototype);
    //print("#### " + wrap(target.prototype));
    clone.prototype = wrap(target.prototype); //wrap(target.prototype);
    //print("$$$$ " + clone.prototype);
    return clone;
  }

  // __  __           _                      
  //|  \/  |___ _ __ | |__ _ _ __ _ _ _  ___ 
  //| |\/| / -_) '  \| '_ \ '_/ _` | ' \/ -_)
  //|_|  |_\___|_|_|_|_.__/_| \__,_|_||_\___|

  // XXX deprecated
  //var switches = new WeakMap();

  /*function getSwitchFor(target) {
    if(!switches.has(target)) switches.set(target, new Set());
    return switches.get(target);
    }*/

  /// TODO
  /** Membrabe(global)
   * Implements a sandbox membrane.
   *
   * @param origin The current Global Object.
   */

  function Membrane(origin) {
    // TODO
    //if(!(origin instanceof Object))
    //  throw new TypeError("No Origin (Target) Object.");

    // TODO
    /*
     * List of effected properties
     */
    var properties = new Set();
    //getSwitchFor(origin);

    /** Returns true if the property was touched by the sandbox, false otherwise
    */
    function affected(property) {
      return properties.has(property);
    }
    /** Returns true if the property was not touched by the sandbox, false otherwise
    */
    function unaffected(property) {
      return !affected(property);
    }
    /** Flags a property as touched
    */
    function touch(scope, name) {
      if(unaffected(name)) {
        properties.add(name);
      }
    }

    //  ___                     _   _             
    // / _ \ _ __  ___ _ _ __ _| |_(_)___ _ _  ___
    //| (_) | '_ \/ -_) '_/ _` |  _| / _ \ ' \(_-<
    // \___/| .__/\___|_| \__,_|\__|_\___/_||_/__/
    //      |_|                                   

    /** target, name -> boolean
    */
    function doHas(scope, name) {
      var has = (affected(name)) ? (name in scope) : (name in origin);

      if(origin===global && has===false) {
        // TODO
        // Note: Matthias Keil
        // If target is global, then return true
        //violation(name);
        return true;
      } else {
        return (affected(name)) ? (name in scope) : (name in origin);
      }
    }
    /** target, name -> boolean
    */
    function doHasOwn(scope, name) {
      return (affected(name)) ? 
        Object.prototype.hasOwnProperty.call(scope, name): 
        Object.prototype.hasOwnProperty.call(origin, name);
    }
    /** target, name, receiver -> any
    */
    function doGet(scope, name) {
      var desc = (affected(name)) ? 
        Object.getOwnPropertyDescriptor(scope, name): 
        Object.getOwnPropertyDescriptor(origin, name);

      var getter = desc ? desc.get : undefined;

      if(getter) return evaluate(getter,((affected(name)) ? scope : origin), []);
      else return (affected(name)) ? scope[name] : wrap(origin[name]);
    }
    /** target, name, val, receiver -> boolean
    */
    function doSet(scope, name, value) {
      var desc =  (affected(name)) ? 
        Object.getOwnPropertyDescriptor(scope, name): 
        Object.getOwnPropertyDescriptor(origin, name);

      var setter = desc ? desc.set : undefined;

      if(setter) return evaluate(setter,((affected(name)) ? scope : origin), [value]);
      else {
        touch(scope, name); 
        (scope[name]=value);
      }
      return true;
    }
    /** target, name, propertyDescriptor -> any
    */
    function doDefineProperty(shadow, name, desc) {
      touch(shadow, name);
      // Note: Matthias Keil
      // Object.defineProperty is not equivalent to the behavior 
      // described in the ECMA Standard
      return Object.defineProperty(shadow, name, desc);
    }
    /** target, name -> boolean
    */
    function doDelete(shadow, name) {
      touch(shadow, name);
      return (delete shadow[name]);
    }
    /** target -> [String]
    */
    function doEnumerate(shadow) {
      // Note: Trap is never called
    }
    /** target -> iterator
    */
    function doIterate(shadow) {
      // Note: Trap is never called
    }
    /** target -> [String]
    */
    function doKeys(shadow) {
      // NOTE: Matthias Keil (May 21 2014)
      // The order of
      // *Object.getOwnPropertyNames*
      // corresponds to the order provided by the for...in loop.
      return Object.keys(shadow);
    }
    /** target, name -> PropertyDescriptor | undefined
    */
    function doGetOwnPropertyDescriptor(shadow, name) {
      if(affected(name)) {
        return Object.getOwnPropertyDescriptor(shadow, name);
      } else {
        var desc = Object.getOwnPropertyDescriptor(origin, name);
        if(desc !== undefined) {
          if (desc.value !== undefined) desc.value = wrap(desc.value);
          if (desc.get !== undefined) desc.get = wrap(desc.get);
          if (desc.set !== undefined) desc.set = wrap(desc.set);
        }
        return desc;
      }
    }
    /** target -> [String]
    */
    function doGetOwnPropertyNames(shadow) {
      // NOTE: Matthias Keil (May 21 2014)
      // The order of
      // *Object.getOwnPropertyNames*
      // corresponds to the order provided by the for...in loop.
      return Object.getOwnPropertyNames(shadow);
    }

    // _____                 
    //|_   _| _ __ _ _ __ ___
    //  | || '_/ _` | '_ (_-<
    //  |_||_| \__,_| .__/__/
    //              |_|      

    // TODO, new trap in ES6
    /**
     * A trap for Object.getPrototypeOf.
     */
    this.getPrototypeOf = function(target) {
    }

    // TODO, new trap in ES6
    /**
     * A trap for Object.setPrototypeOf.
     */
    this.setPrototypeOf = function(traget) {}

    /** target, name -> PropertyDescriptor | undefined
     * A trap for Object.getOwnPropertyDescriptor.
     */
    this.getOwnPropertyDescriptor = function(shadow, name) {
      //__verbose__ && logc("getOwnPropertyDescriptor", name);
      __effect__ && trace(new Effect.GetOwnPropertyDescriptor(origin, name));

      return doGetOwnPropertyDescriptor(shadow, name);
    };

    // TODO, deprecated
    /** target -> [String]
    */
    this.getOwnPropertyNames = function(shadow) {
      //__verbose__ && logc("getOwnPropertyNames");
      __effect__ && trace(new Effect.GetOwnPropertyNames(origin));

      return doGetOwnPropertyNames(shadow);
    };

    /** target, name, propertyDescriptor -> any
     * A trap for Object.defineProperty.
     */
    this.defineProperty = function(shadow, name, desc) {
      //__verbose__ && logc("defineProperty", name);
      __effect__ && trace(new Effect.DefineProperty(origin, name));

      return doDefineProperty(shadow, name, desc);
    };

    /** target, name -> boolean
     * A trap for the delete operator.
     */
    this.deleteProperty = function(shadow, name) {
      //__verbose__ && logc("deleteProperty", name);
      __effect__ && trace(new Effect.DeleteProperty(origin, name));

      return doDelete(shadow, name);
    };

    // TODO, deprecated
    /** target -> boolean
    */
    this.freeze = function(shadow) {
      //__verbose__ && logc("freeze");
      __effect__ && trace(new Effect.Freeze(origin));

      return Object.freeze(shadow);
    };

    // TODO, deprecated
    /** target -> boolean
    */
    this.seal = function(shadow) {
      //__verbose__ && logc("seal");
      __effect__ && trace(new Effect.Seal(origin));

      return Object.seal(shadow);
    };

    /** target -> boolean
     * A trap for Object.preventExtensions.
     */
    this.preventExtensions = function(shadow) {
      //__verbose__ && logc("preventExtensions");
      __effect__ && trace(new Effect.PreventExtensions(origin));

      return Object.preventExtensions(shadow);
    };

    /** target -> boolean
     * A trap for Object.isExtensible
     */
    this.isExtensible = function(shadow) {
      //__verbose__ && logc("isExtensible");
      __effect__ && trace(new Effect.IsExtensible(origin));

      return Object.isExtensible(shadow);
    };

    /** target, name -> boolean
     * A trap for the in operator.
     */
    this.has = function(shadow, name) {

      // TODO, BUG, accesst to undefined;
      if(origin===global && name==='undefined') return true;


      //__verbose__ && logc("has", name);
      __effect__ && trace(new Effect.Has(origin, name));

      return doHas(shadow, name);
    };

    // TODO, deprecated
    /** target, name -> boolean
    */
    this.hasOwn = function(shadow, name) {
      //__verbose__ && logc("hasOwn", name);
      __effect__ && trace(new Effect.HasOwn(origin, name));

      return doHasOwn(shadow, name);
    };


    /** target, name, receiver -> any
     * A trap for getting property values.
     */
    this.get = function(shadow, name, receiver) {

      // TODO, BUG, accesst to undefined;
      if(origin===global && name==='undefined') return undefined;

      //__verbose__ && logc("get", name);
      __effect__ && trace(new Effect.Get(origin, name));

      return doGet(shadow, name);
    };

    /** target, name, val, receiver -> boolean
     * A trap for setting property values.
     */
    this.set = function(shadow, name, value, receiver) {
      //__verbose__ && logc("set", name);
      // TODO
      __effect__ && trace(new Effect.Set(origin, name));

      return doSet(shadow, name, value);
    };

    // TODO, new trap in ES6
    /** target -> [String]
     * A trap for for...in statements.
     */
    this.enumerate = function(shadow) {
      //__verbose__ && logc("enumerate");
      __effect__ && trace(new Effect.Enumerate(origin));

      return Object.getOwnPropertyNames(origin);

      // TODO
      // NOTE: Trap is never called
      // return doEnumnerate(scope);
      throw new Error("Unimplemented Trap enumerate.");
    };

    // TODO, deprecated
    /** target -> iterator
    */
    this.__iterate__ = function(shadow) {
      //__verbose__ && logc("iterate");
      __effect__ && trace(new Effect.Iterate(origin));
      // TODO
      // NOTE: Trap is never called
      // return doIterate(scope);
      throw new Error("Unimplemented Trap iterate.");
    };

    // TODO, new in ES6
    /** target) -> [String]
     * A trap for Object.getOwnPropertyNames.
     */
    this.ownKeys = function(shadow) {
      //__verbose__ && logc("keys");
      __effect__ && trace(new Effect.Keys(origin));

      return doKeys(shadow);
    };

    // TODO, deprecated
    /** target) -> [String]
    */
    this.keys = function(shadow) {
      //__verbose__ && logc("keys");
      __effect__ && trace(new Effect.Keys(origin));

      return doKeys(shadow);
    };

    /** target, thisValue, args -> any
     * A trap for a function call.
     */
    this.apply = function(shadow, thisArg, argsArray) {
      //__verbose__ && logc("apply", scope);
      __effect__ && trace(new Effect.Apply(origin));

      thisArg = (thisArg!==undefined) ? thisArg : global;
      argsArray = (argsArray!==undefined) ? argsArray : new Array();

      // Note: 
      // The function in scope is already decompiled.
      return shadow.apply(wrap(thisArg), wrap(argsArray));
    };


    /** target, args -> object
     * A trap for the new operator. 
     */
    this.construct = function(shadow, thisArg, argsArray) {
      //__verbose__ && logc("construct");
      __effect__ && trace(new Effect.Construct(origin));

      //return new scope(wrap(argsArray));

      var newThis = Object.create(shadow.prototype);
      var val = shadow.apply(newThis, wrap(argsArray));
      // return thisArg | val
      return (val instanceof Object) ? val : newThis;
    };
  };

  //  _____                 _ _               
  // / ____|               | | |              
  //| (___   __ _ _ __   __| | |__   _____  __
  // \___ \ / _` | '_ \ / _` | '_ \ / _ \ \/ /
  // ____) | (_| | | | | (_| | |_) | (_) >  < 
  //|_____/ \__,_|_| |_|\__,_|_.__/ \___/_/\_\

  //    _                       _ _     
  // __| |___ __ ___ _ __  _ __(_) |___ 
  /// _` / -_) _/ _ \ '  \| '_ \ | / -_)
  //\__,_\___\__\___/_|_|_| .__/_|_\___|
  //                      |_|           

  /** decompile
   * Decompiles functions.
   * @param fun JavaScript Function
   * @param env The current Global Object
   * @return JavaScript Function
   */
  function decompile(fun, env) {
    logc("decompile", fun.name);
    increment("decompile");

    if(!(fun instanceof Function))
      throw new TypeError("fun");
    if(!(env instanceof Object))
      throw new TypeError("env");

    // Decompile ?
    if(!(__decompile__))
      return fun;

    // Note: Roman Matthias Keil
    // * use strict mode only
    // var body = "(" + fun.toString() + ")"; 
    // var sbxed = eval("(function() { with(env) { return " + body + " }})();");

    try {
      var body = "(function() {'use strict'; return " + ("(" + fun.toString() + ")") + "})();";
      var sbxed = eval("(function() { with(env) { return " + body + " }})();");
      return sbxed;
    } catch(error) {
      throw new SyntaxError("Incompatible function object." + "\n" + fun);
    } 
  }

  /** evaluate
   * Evaluates the given function.
   * @param fun JavaScript Function
   * @param thisArg The current this Object
   * @param argsArray The Function arguments
   * @return Any
   */
  function evaluate(fun, thisArg, argsArray) {
    logc("evaluate", fun);

    if(!(thisArg instanceof Object))
      throw new TypeError("thisArg");
    if(!(argsArray instanceof Array))
      throw new TypeError("argsArray");

    // sandboxed function
    var sbxed = decompile(fun, wrap(global));
    // apply constructor function
    var val = sbxed.apply(wrap(thisArg), wrap(argsArray));
    // return val
    return val;
  }

  /** Construct
   * Evaluates the given constructor.
   * @param fun JavaScript Function
   * @param argsArray The Function arguments
   * @return Object
   */
  function construct(fun, argsArray) {
    logc("construct", fun);

    if(!(argsArray instanceof Array))
      throw new TypeError("argsArray");

    // sandboxed function
    var sbxed = decompile(fun, wrap(global));
    // new this reference
    var thisArg = wrap(Object.create(fun.prototype));
    // apply function
    var val = sbxed.apply(thisArg, wrap(argsArray)); 
    // return thisArg | val
    return (val instanceof Object) ? val : thisArg;
  }

  /** bind
   * Binds the given function in the sandbox.
   * @param fun JavaScript Function
   * @param thisArg The current this Object
   * @param argsArray The Function arguments
   * @return Any
   */
  function bind(fun, thisArg, argsArray) {
    logc("bind", fun);

    if(!(thisArg instanceof Object))
      throw new TypeError("thisArg");
    if(!(argsArray instanceof Array))
      throw new TypeError("argsArray");

    // sandboxed function
    var sbxed = decompile(fun, wrap(global));
    // bind thisArg
    var bound = sbxed.bind(wrap(thisArg));
    // bind arguments
    for(var arg in argsArray) {
      bound = bound.bind(null, wrap(arg));
    }
    // return bound function
    return bound;
  }

  //   _             _      
  //  /_\  _ __ _ __| |_  _ 
  // / _ \| '_ \ '_ \ | || |
  ///_/ \_\ .__/ .__/_|\_, |
  //      |_|  |_|     |__/ 

  define("apply", function(fun, thisArg, argsArray) {

    if(!(fun instanceof Function))
    throw new TypeError("No function object.");

  thisArg = (thisArg!==undefined) ? thisArg : global;
  argsArray = (argsArray!==undefined) ? argsArray : new Array();

  //return unwrap(evaluate(fun, thisArg, argsArray));
  return evaluate(fun, thisArg, argsArray);
  }, this);

  //  ___      _ _ 
  // / __|__ _| | |
  //| (__/ _` | | |
  // \___\__,_|_|_|

  define("call", function(fun, thisArg) {

    if(!(fun instanceof Function))
    throw new TypeError("No function object.");

  thisArg = (thisArg!==undefined) ? thisArg : global;

  var argsArray = [];
  for(var i=0; i<arguments.length;i++) argsArray[i]=arguments[i];

  // pop fun
  argsArray.shift();
  // pop thisArg
  argsArray.shift();

  //return unwrap(evaluate(fun, thisArg, argsArray));
  return evaluate(fun, thisArg, argsArray);
  }, this);

  // ___ _         _ 
  //| _ |_)_ _  __| |
  //| _ \ | ' \/ _` |
  //|___/_|_||_\__,_|

  define("bind", function(fun, thisArg, argsArray) {

    if(!(fun instanceof Function))
    throw new TypeError("No function object.");

  thisArg = (thisArg!==undefined) ? thisArg : global;
  argsArray = (argsArray!==undefined) ? argsArray : new Array();

  return bind(fun, thisArg, argsArray);
  }, this);

  //__      __             
  //\ \    / / _ __ _ _ __ 
  // \ \/\/ / '_/ _` | '_ \
  //  \_/\_/|_| \__,_| .__/
  //                 |_|   

  define("wrap", function(object) {

    if(!(object instanceof Object))
    throw new TypeError("No object.");

  return wrap(object);
  }, this);

  // ______  __  __          _       
  //|  ____|/ _|/ _|        | |      
  //| |__  | |_| |_ ___  ___| |_ ___ 
  //|  __| |  _|  _/ _ \/ __| __/ __|
  //| |____| | | ||  __/ (__| |_\__ \
  //|______|_| |_| \___|\___|\__|___/   


  var readeffects = new WeakMap();
  var writeeffects = new WeakMap();
  var calleffects = new WeakMap();

  var targets = new WeakSet();

  /**
    var readset = new WeakMap();
    var writeset = new WeakMap();
    var callset = new WeakMap();

    var effectset = new WeakMap();

    var readeffects = [];
    var writeeffects = [];
    var calleffects = [];

    var effects = [];

    var readtargets = [];
    var writetargets = [];
    var calltargets = [];

    var targets = [];
    */

  /** saves an sandbox effect
   * @param effect Effect
   */
  function trace(effect) {
    __verbose__ && logc("trace", effect.toString());
    //increment("trace"); / TODO

    // TODO
    // Effect Logging ?
    //if(!__effect__) return true;

    // TODO
    //if(!(effect instanceof Effect.Effect))
    //  throw new TypeError("No effect object.");


    //if(!effectset.has(effect.target)) effectset.set(effect.target, []);

    //effectset.get(effect.target).push(effect);      
    //effects.push(effect);
    //targets.push(effect.target);
    //

    // TODO
    targets.set(effect.target);


    if(effect instanceof Effect.Read) {
      // introduce new target
      if(!readeffects.has(effect.target)) readeffects.set(effect.target, []);

      readeffects.get(effect.target).push(effect);

      //readeffects.push(effect);
      //readtargets.push(effect.target);

    } else if(effect instanceof Effect.Write) {
      // introduce new target
      if(!writeeffects.has(effect.target)) writeeffects.set(effect.target, []);

      writeeffects.get(effect.target).push(effect);
      //writeeffects.push(effect);
      //writetargets.push(effect.target);

    } else if(effect instanceof Effect.Call) {
      // introduce new target
      if(!calleffects.has(effect.target)) calleffects.set(effect.target, []);

      calleffects.get(effect.target).push(effect);
      //calleffects.push(effect);
      //calltargets.push(effect.target);

    }
  }

  /** Get Read Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("readeffectsOf", function(target) {
    if(readeffects.has(target)) return readeffects.get(target);
    else return [];
  }, this);

  /** Get Write Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("writeeffectsOf", function(target) {
    if(writeeffects.has(target)) return writeeffects.get(target);
    else return [];
  }, this);

  /** Get Call Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("calleffectsOf", function(target) {
    if(calleffects.has(target)) return calleffects.get(target);
    else return [];
  }, this);

  /** Get Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("effectsOf", function(target) {  
    // TODO, merge array listst
    //if(effectset.has(target)) return effectset.get(target);
    //else return [];
  }, this);

  /** Get All Read Effects
   * @return JavaScript Array [Effect]
   */
  getter("readeffects", function() {
    // TODO, merge array listst
    return [];
    //return readeffects;
  }, this);

  /** Get All Write Effects
   * @return JavaScript Array [Effect]
   */
  getter("writeeffects", function() {
    // TODO, merge array listst
    return [];
    //rreturn writeeffects;
  }, this);

  /** Get All Call Effects
   * @return JavaScript Array [Effect]
   */
  getter("calleffects", function() {
    // TODO, merge array listst
    return [];
    //rreturn calleffects;
  }, this);

  /** Get All Effects
   * @return JavaScript Array [Effect]
   */
  getter("effects", function() {
    // TODO, merge array listst
    return [];
    //rreturn effects;
  }, this);

  /** In Read-Write Conflict
   * @param read Read Effect
   * @param write Write Effect
   * @return true|false
   */
  /*function inReadWriteConflict(read, write) {
    if(!(read instanceof Effect.Read))
    throw new TypeError("No Read Effect.");

    if(!(write instanceof Effect.Write))
    throw new TypeError("No Write Effect.");

    if(read.target!==write.target)
    return false;

    switch(true) {
    case (write instanceof Effect.Set):
    case (write instanceof Effect.DefineProperty):
    case (write instanceof Effect.DeleteProperty):
  // property specific write effects
  switch(true) { 
  case (read instanceof Effect.Get):
  case (read instanceof Effect.GetOwnPropertyDescriptor):
  case (read instanceof Effect.Has):
  case (read instanceof Effect.HasOwn):
  // property specific read effects
  return (read.name===write.name) && (read.date>write.date);
  break;
  case (read instanceof Effect.GetOwnPropertyNames):
  case (read instanceof Effect.Enumerate):
  case (read instanceof Effect.Iterate):
  case (read instanceof Effect.Keys):
  case (read instanceof Effect.Apply):
  case (read instanceof Effect.Construct):
  case (read instanceof Effect.IsExtensible):
  // property unspecific read effects 
  return true;
  break;
  }
  break;
  case (write instanceof Effect.Freeze):
  case (write instanceof Effect.Seal):
  case (write instanceof Effect.PreventExtensions):
  // property unspecific write effects
  return false;
  break;
  }
  }*/ // TODO

  /** In Write-Write Conflict
   * @param write Write Effect
   * @param writep Write Effect
   * @return true|false
   */
  /*function inWriteWriteConflict(write, writep) {
    if(!(write instanceof Effect.Write))
    throw new TypeError("No Write Effect.");

    if(!(writep instanceof Effect.Write))
    throw new TypeError("No Write Effect.");

    if(write.target!==writep.target)
    return false;

    switch(true) {
    case (write instanceof Effect.Set):
    case (write instanceof Effect.DefineProperty):
    case (write instanceof Effect.DeleteProperty):
  // property specific write effects
  switch(true) {
  case (writep instanceof Effect.Set):
  case (writep instanceof Effect.DefineProperty):
  case (writep instanceof Effect.DeleteProperty):
  // property specific write effects
  return (write.name===writep.name);
  break;
  case (writep instanceof Effect.Freeze):
  case (writep instanceof Effect.Seal):
  case (writep instanceof Effect.PreventExtensions):
  // property unspecific write effects
  return true;
  break;
  }
  break;
  case (write instanceof Effect.Freeze):
  case (write instanceof Effect.Seal):
  case (write instanceof Effect.PreventExtensions):
  // property unspecific write effects
  return false;
  break;
  }
  }*/ // TODO

  /** In Conflict
   * @param e Effect
   * @[aram f Effect
   * @return true|false
   */
  /*function inConflict(e, f) {
    if((e instanceof Effect.Read) && (f instanceof Effect.Read))
    return false;
    else if((e instanceof Effect.Read) && (f instanceof Effect.Write))
    return inReadWriteConflict(e, f);
    else if((e instanceof Effect.Write) && (f instanceof Effect.Read))
    return inReadWriteConflict(f, e);
    else if((e instanceof Effect.Write) && (f instanceof Effect.Write))
    return inWriteWriteConflict(e, f);
    else 
    return false;
    }*/ // TODO

  /** Has Changes With
   * @param target JavaScript Object
   * return true|false
   */
  /*define("hasChangesOn", function(target) {
    var es = this.writeeffectsOf(target);

    var changes = false;
    for(var e in es) {
    var result =  es[e].stat;
    log("check " + es[e] + " = " + result);
    changes = (result) ? true : changes;
    }
    return changes;
    }, this);*/ // TODO

  /** Has Changes
   * return true|false
   */
  /*getter("hasChanges", function() {
    var changes = false;
    for(var i in writetargets) {
    changes = (this.hasChangesOn(writetargets[i])) ? true : changes;
    }
    return changes;

    }, this);*/ // TODO

  /** Changes Of
   * @param target JavaScript Object
   * return [Differences]
   */
  /*define("changesOf", function(target) {
    var sbxA = this;
    var es = this.effectsOf(target);

    var changes = [];
    for(var e in es) {
    var result =  es[e].stat;
    log("check " + es[e] + " = " + result);
    if(result) changes.push(new Effect.Change(sbxA, es[e]));
    }
    return changes;
    }, this);*/ // TODO

  /** Changes 
   * return [Changes]
   */
  /*getter("changes", function() {
    var sbxA = this;
    var es = writeeffects;

    var changes = [];
    for(var e in es) {
    var result =  es[e].stat;
    log("check " + es[e] + " = " + result);
    if(result) changes.push(new Effect.Change(sbxA, es[e]));
    }
    return changes;
    }, this);*/ // TODO

  /** Has Difference With
   * @param target JavaScript Object
   * return true|false
   */
  /*define("hasDifferenceWith", function(target) {
    var es = this.effectsOf(target);

    var difference = false;
    for(var e in es) {
    var result =  es[e].diff;
    log("check " + es[e] + " = " + result);
    difference = (result) ? true : difference;
    }
    return difference;
    }, this);*/ // TODO

  /** Has Difference
   * return true|false
   */
  /*getter("hasDifference", function() {
    var difference = false;
    for(var i in targets) {
    difference = (this.hasDifferenceWith(targets[i])) ? true : difference;
    }
    return difference;

    }, this);*/ // TODO

  /** Differences Of
   * @param target JavaScript Object
   * return [Differences]
   */
  /*define("differencesOf", function(target) {
    var sbxA = this;
    var es = this.effectsOf(target);

    var differences = [];
    for(var e in es) {
    var result =  es[e].diff;
    log("check " + es[e] + " = " + result);
    if(result) differences.push(new Effect.Difference(sbxA, es[e]));
    }
    return differences;
    }, this);*/ // TODO

  /** Differences 
   * return [Differences]
   */
  /*getter("differences", function() {
    var sbxA = this;
    var es = this.effects;

    var differences = [];
    for(var e in es) {
    var result =  es[e].diff;
    log("check " + es[e] + " = " + result);
    if(result) differences.push(new Effect.Difference(sbxA, es[e]));
    }
    return differences;
    }, this);*/ // TODO

  /** Conflicts
   * @param sbx Sandbox
   * @param target JavaScript Object
   * return [Conflict]
   */
  /*define("conflictsOf", function(sbx, target) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    var sbxA = this;
    var sbxB = sbx;

    var es = this.effectsOf(target);
    var fs = sbx.effectsOf(target);

    var conflicts = [];
    for(var e in es) {
    for(var f in fs) {
    var result = (inConflict(es[e], fs[f]));
    log("compare " + es[e] + " - " + fs[f] + " = " + result);
    if(result) conflicts.push(new Effect.Conflict(sbxA, es[e], sbxB, fs[f]));
    }
    }
    return conflicts;
    }, this);*/ // TODO

  /** Conflicts
   * @param sbx Sandbox
   * return [Conflict]
   */
  /*define("conflicts", function(sbx) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    var conflicts = [];
    for(var i in targets) {
    conflicts = conflicts.concat(this.conflictsOf(sbx, targets[i]))
    }
    return conflicts;
    }, this);*/ // TODO

  /** Conflict Of
   * @param sbx Sandbox
   * @param target JavaScript Object
   * return true|false
   */
  /*define("inConflictWith", function(sbx, target) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    var es = this.effectsOf(target);
    var fs = sbx.effectsOf(target);

    var conflict = false;
    for(var e in es) {
    for(var f in fs) {
    var result = (inConflict(es[e], fs[f]));
    log("compare " + es[e] + " - " + fs[f] + " = " + result);
    conflict = (result) ? true : conflict;
    }
    }
    return conflict;
    }, this);*/ // TODO


  /** Conflict Of
   * @param sbx Sandbox
   * @param target JavaScript Object
   * return true|false
   */
  /*define("inConflict", function(sbx) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    var conflict = false; 
    for(var i in targets) {
    conflict = (this.inConflictWith(sbx, targets[i])) ? true : conflict;
    }
    return conflict;

    }, this);*/ // TODO

  /** Rollback Of
   * @param target JavaScript Object
   */
  /*define("rollbackOf", function(target) {
    var es = this.writeeffectsOf(target);

    for(var e in es) {
    es[e].rollback();
    }
    }, this);*/ // TODO

  /** Rollback
  */
  /*define("rollback", function(target) {
    var es = writeeffects;

    for(var e in es) {
    es[e].rollback();
    }
    }, this);*/ // TODO



  /** Revert Of
   * @param target JavaScript Object
   */
  /*define("revertOf", function(target) {
    var sw = switches.get(target);
  // TODO, clear
  sw.clear();
  }, this);*/ // TODO

  /** Rrevert
  */
  /*define("revert", function() {
    for(var i in targets) {
    this.revertOf(targets[i]);
    }
    }, this);*/ // TODO



  /** Commit All Effects
   * @return JavaScript Array [Effect]
   */
  /*define("commit", function() {
    for(i in writeeffects) {
    var effect = writeeffects[i];
    if(effect instanceof Effect.Effect) effect.commit();
    }
    }, this);*/ // TODO

  /** Commit All Effects Of
   * @return JavaScript Array [Effect]
   */
  /* define("commitOf", function(target) {
     var effects = writeset.get(target);
     for(var i in effects) {
     var effect = effects[i];
     if(effect instanceof Effect.Effect) effect.commit();
     }
     }, this);*/ // TODO

  //  _____ _        _   _     _   _      
  // / ____| |      | | (_)   | | (_)     
  //| (___ | |_ __ _| |_ _ ___| |_ _  ___ 
  // \___ \| __/ _` | __| / __| __| |/ __|
  // ____) | || (_| | |_| \__ \ |_| | (__ 
  //|_____/ \__\__,_|\__|_|___/\__|_|\___|

  /** Statistic
  */
  define("statistic", statistic, this);
}

// ___               _ _               ___ ___  
/// __| __ _ _ _  __| | |__  _____ __ |_ _|   \ 
//\__ \/ _` | ' \/ _` | '_ \/ _ \ \ /  | || |) |
//|___/\__,_|_||_\__,_|_.__/\___/_\_\ |___|___/ 

Object.defineProperty(Sandbox.prototype, "id", {
  get: (function() {
    var str = "SBX";
    var i = 0;

    function makeID() {
      i = i+1;
      return (str+(padding_left(String(i), "0", 3)));
    }

    return function() {
      var id = makeID();

      Object.defineProperty(this, "id", {
        get: function() { return id; }});

      return id;
    };
  })()
});

// _       ___ _       _           
//| |_ ___/ __| |_ _ _(_)_ _  __ _ 
//|  _/ _ \__ \  _| '_| | ' \/ _` |
// \__\___/___/\__|_| |_|_||_\__, |
//                           |___/ 

Object.defineProperty(Sandbox.prototype, "toString", {
  get: function() {
    return function() { return "[[Sandbox#" + this.id + "]]"; };
  }
});

//                _          
//__ _____ _ _ __(_)___ _ _  
//\ V / -_) '_(_-< / _ \ ' \ 
// \_/\___|_| /__/_\___/_||_|

Object.defineProperty(Sandbox, "version", {
  value: "DecentJS 1.0.0 (PoC)"
});

Object.defineProperty(Sandbox.prototype, "version", {
  value: Sandbox.version
});

//              __ _      
// __ ___ _ _  / _(_)__ _ 
/// _/ _ \ ' \|  _| / _` |
//\__\___/_||_|_| |_\__, |
//                  |___/ 

Object.defineProperty(Sandbox, "DEFAULT", {
  value: {
    /** Verbose Mode
     * (default: false)
     */ verbose:false,
    /** Enable Statistic
     * (default: false)
     */ statistic:true,
    /** Decompile
     * (default: true)
     */ decompile:true,
    /** Membrane
     * (default: true)
     */ membrane:true,
    /** Effect
     * (default: true)
     */ effect:true,
    /** Transparent Mode
     * (default: false)
     */ transparent:false,
    /** MetaHandler
     * (default: true)
     */ metahandler:true,
    /** Function pass-through
     * (default: [])
     */ passthrough:[],
    /** Output handler
     * (default: ShellOut)
     */ out:ShellOut()
  }
});

Object.defineProperty(Sandbox, "TRANSPARENT", {
  value: {
    /** Verbose Mode
     * (default: false)
     */ verbose:false,
    /** Enable Statistic
     * (default: false)
     */ statistic:false,
    /** Decompile
     * (default: true)
     */ decompile:true,
    /** Membrane
     * (default: true)
     */ membrane:true,
    /** Effect
     * (default: true)
     */ effect:true,
    /** Transparent Mode
     * (default: false)
     */ transparent:true,
    /** MetaHandler
     * (default: true)
     */ metahandler:true,
    /** Function pass-through
     * (default: [])
     */ passthrough:[],
    /** Output handler
     * (default: ShellOut)
     */ out:ShellOut()
  }
});

Object.defineProperty(Sandbox, "DEBUG", {
  value: {
    /** Verbose Mode
     * (default: false)
     */ verbose:true,
    /** Enable Statistic
     * (default: false)
     */ statistic:true,
    /** Decompile
     * (default: true)
     */ decompile:true,
    /** Membrane
     * (default: true)
     */ membrane:true,
    /** Effect
     * (default: true)
     */ effect:true,
    /** Transparent Mode
     * (default: false)
     */ transparent:false,
    /** MetaHandler
     * (default: true)
     */ metahandler:true,
    /** Function pass-through
     * (default: [])
     */ passthrough:[print],
    /** Output handler
     * (default: ShellOut)
     */ out:ShellOut()
  }
});

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
  var __membrane__ = configure("membrane", true); // TODO, deprecated

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
   * Debug Mode
   * (default: false)
   */
  var __debug__ = configure("debug", false);

  /*
   * Function pass-through
   * (default:undefined)
   */
  var __passthrough__ = configure("passthrough", new Set());

  /*
   * Output
   * (default:null);
   */
  var __out__ = configure("out", new Out());

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
  // Pre-state Snapshot Mode currently not available.
  // var snapshot = new WeakMap();
  // if(prestate instanceof Array) for(var i in prestate) {
  //   snapshot.push(prestate[i], clone(prestate[i]));
  // }

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

  // _    _  _      _   _         ___             _   _          
  //(_)__| \| |__ _| |_(_)_ _____| __|  _ _ _  __| |_(_)___ _ _  
  //| (_-< .` / _` |  _| \ V / -_) _| || | ' \/ _|  _| / _ \ ' \ 
  //|_/__/_|\_\__,_|\__|_|\_/\___|_| \_,_|_||_\__|\__|_\___/_||_|

  var toString = Function.prototype.toString;
  //var passthrough = __passthrough__;  
  //new Set((__passthrough__ instanceof Array) ? __passthrough__ : []);

  /** passThrough(fun)
   * Checks whether the given function is a pass-through function or not.
   *
   * @param fuc Function Object
   * @return true, if fun is a pass-through function, false otherwise
   */
  function passThrough(fun) {
    return (fun instanceof Function) && __passthrough__.has(fun);

    //if(!(fun instanceof Function)) return false;
    //else {
    //  return passthrough.has(fun);
    //}

    // Note: Matthias Keil
    // deprecated, Function.bind makes all functions to a native function
    // this, this check will not work as expected
    // return (FunctionPrototypeToString.apply(fun).indexOf('[native code]') > -1);
  }

  // _    ___          _ 
  //(_)__| __|_ ____ _| |
  //| (_-< _|\ V / _` | |
  //|_/__/___|\_/\__,_|_|

  // TODO, strict mode eval is safe

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
  var targets = new WeakMap();

  /** Maps sandbox proxies to handler objects
  */
  var proxies = new WeakMap();

  /** 
   * wrap(target)
   * Wraps a target object.
   *
   * @param target The Target Object.
   * @return JavaScript Proxy 
   */
  function wrap(target) { 
    __verbose__   && logc("wrap");
    __statistic__ && increment(Statistic.WRAP);

    // If target is a primitive value, then return target
    if (target !== Object(target)) {
      return target;
    }

    // Avoids re-wrapping of sandbox proxies
    if(proxies.has(target)) return target;

    // If target already wrapped, return cached proxy
    if(targets.has(target)) {
      __verbose__   && log("Cache hit.");
      __statistic__ && increment(Statistic.CACHEHITT);
      return targets.get(target);
    } else {
      __verbose__   && log("Cache miss.");
      __statistic__ && increment(Statistic.CACHEMISS);
    }

    // decompiles function or clones object
    // to preserve typeof/ instanceof
    // and to make an iterable image for loops
    
    
    if(target instanceof Function) {
      __verbose__ && log("target instanceOf Function");

      // Function pass throught
      var native =  passThrough(target);
      __verbose__ && logc("target pass-throught", native);

      var shadow = cloneFunction(target, native);
    } else {  
      __verbose__ && log("target instanceOf Object");
      var shadow = cloneObject(target);
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

    var handler = new Membrane(target, native);
    var proxy = new Proxy(shadow, handler);

    targets.set(target, proxy);
    proxies.set(proxy, handler);

    return proxy;
  }

  /**
   * cloneObject(target)
   * clones a JavaScript Object
   *
   * @param target JavaScript Object
   * @return JavaScript Object
   */
  function cloneObject(target) {
    __verbose__ && log("Clone Object.");

    var clone = Object.create(Object.getPrototypeOf(target));

    /**
     * Copies all properties (property names) from the target object
     * to the shadow object. 
     *
     * This step is required because of some proxy internal invariants
     * witch require that a non-extensible shadow object is not allowed 
     * to return properties (keys) of the target object.
     */
    for (var property in target) {
      if (target.hasOwnProperty(property)) {
        clone[property] = undefined;
      }  
    }

    return clone;
  }

  /**
   * cloneFunction(target)
   * clones a JavaScript Function
   *
   * @param target JavaScript Function
   * @parem native Flags pass-throught functions
   * @return JavaScript Function
   */
  function cloneFunction(target, native) {
    __verbose__ && log("Clone Function.");

    var clone = native ? (function(){}) : decompile(target, wrap(global));
    //clone.prototype = wrap(target.prototype);  // TODO
    
    /**
     * Note: Matthias Keil
     * clone new
     *
     */

    // do I get access when to the unprotected prototyper when ćreating an object from that 
    
    
    clone.prototype = target.prototype; 
    
    return clone;
  }

  // __  __           _                      
  //|  \/  |___ _ __ | |__ _ _ __ _ _ _  ___ 
  //| |\/| / -_) '  \| '_ \ '_/ _` | ' \/ -_)
  //|_|  |_\___|_|_|_|_.__/_| \__,_|_||_\___|

  /**
   * Sandbox Handler
   * @param origin - Outside Value
   * @param native - Flag for Native Functions
   */
  function Membrane(origin, native = false) {
    if(!(this instanceof Membrane)) return new Membrane(origin, native);

    /*
     * List of modified properties
     */
    var touchedPropertyNames = new Set();

    /*
     * List of modified properties
     */
    Object.defineProperty(this, "touchedPropertyNames", {
      value : touchedPropertyNames
    });

    /**
     * Returns true if the property was touched by the sandbox, false otherwise
     */
    function touched(property) {
      return touchedPropertyNames.has(property);
    }
    /**
     * Returns true if the property was not touched by the sandbox, false otherwise
     */
    function untouched(property) {
      return !touchedPropertyNames.has(property);
    }
    /**
     * Flags a property as touched
     */
    function touch(name) {
      __verbose__   && logc("touch", name);
      __statistic__ && increment(Statistic.TOUCHED);

      touchedPropertyNames.add(name);
    }
   
    // _____                 
    //|_   _| _ __ _ _ __ ___
    //  | || '_/ _` | '_ (_-<
    //  |_||_| \__,_| .__/__/
    //              |_|      

    /**
     * A trap for Object.getPrototypeOf.
     */
    this.getPrototypeOf = function(shadow) {
      __verbose__ && logc("getPrototypeOf");
      __effect__  && trace(new Effect.GetPrototypeOf(origin));

      /**
       * Note: Matthias Keil
       * The current proxy implementation did not support
       * Object.getPrototypeOf.
       */
      // return wrap(Object.getPrototypeOf(shadow));
      throw new Error('Trap not supported.');
    }

    /**
     * A trap for Object.setPrototypeOf.
     */
    this.setPrototypeOf = function(shadow, prototype) {
      __verbose__ && logc("setPrototypeOf");
      __effect__  && trace(new Effect.SetPrototypeOf(origin));

      /**
       * Note: Matthias Keil
       * The current proxy implementation did not support
       * Object.setPrototypeOf.
       */
      // return Object.setPrototypeOf(shadow, prototype);
      throw new Error('Trap not supported.');
    }

    /**
     * A trap for Object.isExtensible
     */
    this.isExtensible = function(shadow) {
      __verbose__ && logc("isExtensible");
      __effect__  && trace(new Effect.IsExtensible(origin));

      return Object.isExtensible(shadow);
    };

    /** 
     * A trap for Object.preventExtensions.
     */
    this.preventExtensions = function(shadow) {
      __verbose__ && logc("preventExtensions");
      __effect__  && trace(new Effect.PreventExtensions(origin));

      return Object.preventExtensions(shadow);
    };

    /** 
     * A trap for Object.getOwnPropertyDescriptor.
     */
    this.getOwnPropertyDescriptor = function(shadow, name) {
      __verbose__ && logc("getOwnPropertyDescriptor", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.GetOwnPropertyDescriptor(origin, (typeof name === 'string') ? name : name.toString()));

      return (touched(name)) ? 
        Object.getOwnPropertyDescriptor(shadow, name) :
        wrap(Object.getOwnPropertyDescriptor(origin, name));
    };

    /** 
     * A trap for Object.defineProperty.
     */
    this.defineProperty = function(shadow, name, desc) {
      __verbose__ && logc("defineProperty", (typeof name === 'string') ? name : name.toString());
      __effect__ &&  trace(new Effect.DefineProperty(origin, (typeof name === 'string') ? name : name.toString()));

      // Note: Matthias Keil
      // Object.defineProperty is not equivalent to the behavior 
      // described in the ECMA Standard
      var current = (touched(name)) ? 
          Object.getOwnPropertyDescriptor(shadow, name):
          wrap(Object.getOwnPropertyDescriptor(origin, name)) || {};

      for(var key in desc) {
        current[key] = desc[key];
      }

      touch(name);
      return Object.defineProperty(shadow, name, current);
    };

    /** 
     * A trap for the in operator.
     */
    this.has = function(shadow, name) {
      __verbose__ && logc("has", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.Has(origin, (typeof name === 'string') ? name : name.toString()));

      if(origin===global) return true;
      else return (touched(name)) ? (name in shadow) : (name in origin);
    };

    /**
     * A trap for getting property values.
     */
    this.get = function(shadow, name, receiver) {
      __verbose__ && logc("get", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.Get(origin, (typeof name === 'string') ? name : name.toString()));

      // Node: Matthias Keil
      // Bug in previous versions. Access to undefined causes a 
      // property access on the global object.
      // TODO, test if this also happens in the new engine
      if(origin===global && name==='undefined') return undefined;

      //print('===================', name.toString());
     // print((Symbol('aaa')).toString());
    //  print((Symbol('aaa')===Symbol('aaa')));
      //throw new Error(name);
  //    print('-------------------', typeof name);

      // TODO, implement getter functions
      return touched(name) ? shadow[name] : wrap(origin[name]);
//        return returnx; // TODO
    };

    /** 
     * A trap for setting property values.
     */
    this.set = function(shadow, name, value, receiver) {
      __verbose__ && logc("set", name);
      __effect__  && trace(new Effect.Set(origin, name));

      // TODO, implement setter functions
      touch(name);
      return (shadow[name]=value);
    };

    /**
     * A trap for the delete operator.
     */
    this.deleteProperty = function(shadow, name) {
      __verbose__ && logc("deleteProperty", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.DeleteProperty(origin, (typeof name === 'string') ? name : name.toString()));

      touch(name);
      return (delete shadow[name]);
    };

    /** 
     * A trap for for...in statements.
     */
    this.enumerate = function(shadow) {
      __verbose__ && logc("enumerate");
      __effect__  && trace(new Effect.Enumerate(origin));

      var properties = new Set();
      for(var property in origin) {
        print(property);
        if(!touched(property) || (property in shadow)) properties.add(property); 
        // TODO, only allowed to add new properties iff proeprty is not touched locally
        // but, we need to make a distinction between touched in case of modified and deleted property names
        // e.g. use a dummy that contains all property names
        // but shadow and origin are given directly to the handler
        // them, every update on the property list is also (this as add and delete) are forwarded to the target)
        // then, when iterating, we consider all properties
        // 
        //
        // until the target is frozen, then we are only allowed to return existing proeprties
        //
        //
        // or, when freezing an object, cloning all property names and 
        // at execution time
      }
      for(var property in shadow) {
        properties.add(property);
      }
      return Array.from(properties)[Symbol.iterator]();
    };

    /**
     * A trap for Object.getOwnPropertyNames.
     */
    this.ownKeys = function(shadow) {
      __verbose__ && logc("ownKeys");
      __effect__  && trace(new Effect.OwnKeys(origin));

      var properties = new Set();
      for(var property of Object.getOwnPropertyNames(origin)) {
        if(!touched(property) || (property in shadow)) properties.add(property);
      }
      for(var property of Object.getOwnPropertyNames(shadow)) {
        properties.add(property);
      }
      return Array.from(properties); 
    };

    /** 
     * A trap for a function call.
     */
    this.apply = function(shadow, thisArg, argumentsList) {
      __verbose__ && logc("apply");
      __effect__  && trace(new Effect.Apply(origin));

      thisArg = thisArg ? thisArg : wrap(global);
      return native ? origin.apply(thisArg, argumentsList) : shadow.apply(thisArg, argumentsList);
    };

    /** 
     * A trap for the new operator. 
     */
    this.construct = function(shadow, argumentsList) {
      __verbose__ && logc("construct");
      __effect__  && trace(new Effect.Construct(origin));

      // TODO, test
      //return new shadow(wrap(argumentsList));
      //quit();
      //

      var thisArg = wrap(Object.create(shadow.prototype));
      var result =  native ? origin.apply(thisArg, argumentsList) : shadow.apply(thisArg, argumentsList);
      // return thisArg | val
      return (result instanceof Object) ? result : thisArg;
      //return wrap((result instanceof Object) ? result : thisArg);

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
    __verbose__   && logc("decompile", fun.name);
    __statistic__ && increment("decompile");

    if(!(fun instanceof Function))
      throw new TypeError("fun");
    if(!(env instanceof Object))
      throw new TypeError("env");

    // Decompile ?
    if(!(__decompile__))
      return fun;

    try {
      var body = "(function() {'use strict'; return " + ("(" + fun.toString() + ")") + "})();";
      var sbxed = eval("(function() { with(env) { return " + body + " }})();");
      return sbxed;
    } catch(error) {
      throw new SyntaxError("Incompatible function object." + "\n" + fun + "\n" + error);
    } 
  }

  /** evaluate
   * Evaluates the given function.
   * @param fun JavaScript Function
   * @param thisArg The current this Object
   * @param argsArray The Function arguments
   * @return Any
   */
  function evaluate(fun, thisArg, argumentsList) {
    __verbose__ && logc("evaluate", fun);

    // sandboxed function
    var sbxed = decompile(fun, wrap(global));
    // apply constructor function
    var result = sbxed.apply(wrap(thisArg), wrap(argumentsList));
    // return val
    return result;
  }

  /** Construct
   * Evaluates the given constructor.
   * @param fun JavaScript Function
   * @param argsArray The Function arguments
   * @return Object
   */
  function construct(fun, argumentsList) {
    __verbose__ && logc("construct", fun);

    // sandboxed function
    var sbxed = decompile(fun, wrap(global));
    // new this reference
    var thisArg = wrap(Object.create(fun.prototype));
    // apply function
    var result = sbxed.apply(thisArg, wrap(argumentsList)); 
    // return thisArg | val
    return (result instanceof Object) ? result : thisArg;
  }

  /** bind
   * Binds the given function in the sandbox.
   * @param fun JavaScript Function
   * @param thisArg The current this Object
   * @param argsArray The Function arguments
   * @return Any
   */
  function bind(fun, thisArg, argumentsList) {
    __verbose__ && logc("bind", fun);

    // sandboxed function
    var sbxed = decompile(fun, wrap(global));
    // bind thisArg
    var bound = sbxed.bind(wrap(thisArg));
    // bind arguments
    for(var arg in argumentsList) {
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

  define("apply", function(fun, thisArg = global, argumentsList = []) {
    if(!(fun instanceof Function)) throw new TypeError("No function object.");
    
    return evaluate(fun, thisArg, argumentsList);
  }, this);

  //  ___      _ _ 
  // / __|__ _| | |
  //| (__/ _` | | |
  // \___\__,_|_|_|

  define("call", function(fun, thisArg = global) {
    if(!(fun instanceof Function)) throw new TypeError("No function object.");

    var argumentsList = [];
    for(var i=2; i<arguments.length;i++) argumentsList[i]=arguments[i];

    return evaluate(fun, thisArg, argumentsList);
  }, this);

  // ___ _         _ 
  //| _ |_)_ _  __| |
  //| _ \ | ' \/ _` |
  //|___/_|_||_\__,_|

  define("bind", function(fun, thisArg = global, argumentsList = []) {
    if(!(fun instanceof Function)) throw new TypeError("No function object.");
    
    return bind(fun, thisArg, argsArray);
  }, this);

  //__      __             
  //\ \    / / _ __ _ _ __ 
  // \ \/\/ / '_/ _` | '_ \
  //  \_/\_/|_| \__,_| .__/
  //                 |_|   

  define("wrap", function(object) {
    if(!(object instanceof Object)) throw new TypeError("No object.");
    
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

  var readtargets = [];
  var writetargets = [];
  var calltargets = [];

  /** saves an sandbox effect
   * @param effect Effect
   */
  function trace(effect) {
    // __verbose__   && logc("trace", effect.toString()); // TODO
    __statistic__ && increment(Statistic.TRACE); 

    if(!(effect instanceof Effect.Effect))
      throw new TypeError("No effect object.");

    if(effect instanceof Effect.Read) {
      if(!readeffects.has(effect.target)) readeffects.set(effect.target, []);

      readeffects.get(effect.target).push(effect);
      readtargets.push(effect.target);

    } else if(effect instanceof Effect.Write) {
      if(!writeeffects.has(effect.target)) writeeffects.set(effect.target, []);

      writeeffects.get(effect.target).push(effect);
      writetargets.push(effect.target);

    } else if(effect instanceof Effect.Call) {
      if(!calleffects.has(effect.target)) calleffects.set(effect.target, []);

      calleffects.get(effect.target).push(effect);
      calltargets.push(effect.target);
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
    var effectsOfTarget = readeffectsOf(target).concat(writeeffectsOf(target)).concat(calleffectsOf(target));
    effectsOfTarget.sort();
    return effectsOfTarget;
  }, this);

  /** Get All Read Effects
   * @return JavaScript Array [Effect]
   */
  getter("readeffects", function() {
    var readEffects = [];

    for(var target of readtargets) {
      readEffects = readEffects.concat(readeffectsOf(target));
    } 
    return readEffects;
  }, this);

  /** Get All Write Effects
   * @return JavaScript Array [Effect]
   */
  getter("writeeffects", function() {
    var writeEffects = [];

    for(var target of writetargets) {
      writeEffects = writeEffects.concat(writeeffectsOf(target));
    } 
    return writeEffects;

  }, this);

  /** Get All Call Effects
   * @return JavaScript Array [Effect]
   */
  getter("calleffects", function() {
    var callEffects = [];

    for(var target of calltargets) {
      callEffects = callEffects.concat(calleffectsOf(target));
    } 
    return writeEffects;
  }, this);

  /** Get All Effects
   * @return JavaScript Array [Effect]
   */
  getter("effects", function() {
    var effects = readeffects.concat(writeeffects).concat(calleffectsOf);
    effects.sort();
    return effects;
  }, this);

  //  _____             __ _ _      _       
  // / ____|           / _| (_)    | |      
  //| |     ___  _ __ | |_| |_  ___| |_ ___ 
  //| |    / _ \| '_ \|  _| | |/ __| __/ __|
  //| |___| (_) | | | | | | | | (__| |_\__ \
  // \_____\___/|_| |_|_| |_|_|\___|\__|___/


  /** In Read-Write Conflict
   * @param read Read Effect
   * @param write Write Effect
   * @return true|false
   */
  function inReadWriteConflict(read, write) {
    if(!(read instanceof Effect.Read))
      throw new TypeError("No Read Effect.");

    if(!(write instanceof Effect.Write))
      throw new TypeError("No Write Effect.");

    if((read.target!==write.target) || (read.name!==write.name) || (read.date<write.date))
      return false;
    else 
      return true;

    /*

       if(read.target!==write.target)
       return false;

    // TODO, should make a distinction between names and unnamed effects

    if(read instanceof NamedReadEffect)


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
    */
  }

  /** In Write-Write Conflict
   * @param write Write Effect
   * @param writep Write Effect
   * @return true|false
   */
  function inWriteWriteConflict(write, writep) {
    if(!(write instanceof Effect.Write))
      throw new TypeError("No Write Effect.");

    if(!(writep instanceof Effect.Write))
      throw new TypeError("No Write Effect.");

    if((write.target!==writep.target) || (write.name!==writep.name))
      return false;
    else 
      return true;


    /*
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
    */

  }


  /** In Conflict
   * @param e Effect
   * @[aram f Effect
   * @return true|false
   */
  function inConflict(e, f) {
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
  }




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

  // _____  _  __  __                                  
  //|  __ \(_)/ _|/ _|                                 
  //| |  | |_| |_| |_ ___ _ __ ___ _ __   ___ ___  ___ 
  //| |  | | |  _|  _/ _ \ '__/ _ \ '_ \ / __/ _ \/ __|
  //| |__| | | | | ||  __/ | |  __/ | | | (_|  __/\__ \
  //|_____/|_|_| |_| \___|_|  \___|_| |_|\___\___||___/



  function hasDifferences(effect, shadow, target) {

    if(effect instanceof Effect.SetPrototypeOf) {
      return Object.getPrototypeOf(origin) !== Object.getPrototypeOf(shadow);

    } else if(effect instanceof Effect.PreventExtensions) {
      return Object.isExtensible(origin) !== Object.isExtensible(shadow);

    } else if(effect instanceof Effect.DefineProperty) {
      (Object.getOwnPropertyDescriptor(shadow, effect.name) !== Object.getOwnPropertyDescriptor(origin, effect.name));

      (target[name]!==this.origin);
      Object.defineProperty(origin, effect.name,  Object.getOwnPropertyDescriptor(shadow, effect.name));

    } else if(effect instanceof Effect.Set) {
      // TODO, compare proeprty descriptoes
      return (origin[effect.name] !== shadow[effect.name]);

    } else if(effect instanceof Effect.DeleteProperty) {
      return (Object.getOwnPropertyDescriptor(shadow, effect.name) !== Object.getOwnPropertyDescriptor(origin, effect.name));

    }
  }



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




  //  _____ _                                 
  // / ____| |                                
  //| |    | |__   __ _ _ __   __ _  ___  ___ 
  //| |    | '_ \ / _` | '_ \ / _` |/ _ \/ __|
  //| |____| | | | (_| | | | | (_| |  __/\__ \
  // \_____|_| |_|\__,_|_| |_|\__, |\___||___/
  //                           __/ |          
  //                          |___/           

  // TODo, changes will not work as before, because we do not see the 
  // value returned at effect time.

  function comparePropertyDescriptor(desc1, desc2) {
    var keys = ["configurable", "enumerable", "value", "writable", "get", "set"];
    for (var key in keys) {
      print("compare key", key); // TODO
      if(desc1[key]===desc2[key]) 
        continue;
      else
        return false;
    }
    return true;
  }

  // how to knwo if the value inssnt writte inside if teh sandbox?
  // changes and differences should only consider the last effect on

  function hasChanges(effect, shadow, origin) {

    if(effect instanceof Effect.GetPrototypeOf) {
      return Object.getPrototypeOf(shadow) !== Object.getPrototypeOf(origin);

    } else if(effect instanceof Effect.IsExtensible) {
      return Object.isExtensible(shadow) !== Object.isExtensible(origin)

    } else if(effect instanceof Effect.GetOwnPropertyDescriptor) {
      return comparePropertyDescriptor(Object.getOwnPropertyDescriptor(shadow, effect.name), Object.getOwnPropertyDescriptor(origin, effect.name));

    } else if(effect instanceof Effect.Has) {
      return (effect.name in shadow) === (effect.name in origin);

    } else if(effect instanceof Effect.Get) {

    } else if(effect instanceof Effect.Enumerate) {

    } else if(effect instanceof Effect.OwnKeys) {

    }

  }


  /** Has Changes With
   * @param target JavaScript Object
   * return true|false
   */
  define("hasChangesOn", function(target) {
    var es = this.writeeffectsOf(target);

    var changes = false;
    for(var e in es) {
      // TODO, unroll needed
      var result =  es[e].stat;
      log("check " + es[e] + " = " + result);
      changes = (result) ? true : changes;
    }
    return changes;
  }, this);

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




  //  _____                          _ _   
  // / ____|                        (_) |  
  //| |     ___  _ __ ___  _ __ ___  _| |_ 
  //| |    / _ \| '_ ` _ \| '_ ` _ \| | __|
  //| |___| (_) | | | | | | | | | | | | |_ 
  // \_____\___/|_| |_| |_|_| |_| |_|_|\__|

  // TODO, unwrap required

  function commit(effct, shadow, origin) {
    if(effect instanceof Effect.SetPrototypeOf) {
      Object.setPrototypeOf(origin, Object.getPrototypeOf(shadow));

    } else if(effect instanceof Effect.PreventExtensions) {
      Object.preventExtensions(origin)

    } else if(effect instanceof Effect.DefineProperty) {
      Object.defineProperty(origin, effect.name,  Object.getOwnPropertyDescriptor(shadow, effect.name));

    } else if(effect instanceof Effect.Set) {
      origin[effect.name]=shadow[effect.name];

    } else if(effect instanceof Effect.DeleteProperty) {
      delete origin[effect.name];

    }
  }

  /** Commit Of Target
   * @return JavaScript Array [Effect]
   */
  define("commitOf", function(target) {
    var effects = writeeffects.get(target);
    for(var effect in effects) {
      commit(effect, state.get(cache.get(target)), target);
    }
  }, this);

  /** Commit All Targets
   * @return JavaScript Array [Effect]
   */
  define("commit", function() {
    for(var target of writetargets) {
      this.commitOf(target);
    }
  }, this);

  // _____       _ _ _                _    
  //|  __ \     | | | |              | |   
  //| |__) |___ | | | |__   __ _  ___| | __
  //|  _  // _ \| | | '_ \ / _` |/ __| |/ /
  //| | \ \ (_) | | | |_) | (_| | (__|   < 
  //|_|  \_\___/|_|_|_.__/ \__,_|\___|_|\_\

  // TODO, unwrap required

  function rollback(effct, shadow, origin) {

    // better to clone origin again 
    // and to delete the switch

    if(effect instanceof Effect.SetPrototypeOf) {
      throw new Error("Rollback not implemented.");
      //Object.setPrototypeOf(shdaow, Object.getPrototypeOf(origin));

    } else if(effect instanceof Effect.PreventExtensions) {
      throw new Error("Rollback not implemented.");
      //Object.preventExtensions(origin);

    } else if(effect instanceof Effect.DefineProperty) {
      throw new Error("Rollback not implemented.");
      //Object.defineProperty(origin, effect.name,  Object.getOwnPropertyDescriptor(shadow, effect.name));

    } else if(effect instanceof Effect.Set) {
      throw new Error("Rollback not implemented.");
      //origin[effect.name]=shadow[effect.name];

    } else if(effect instanceof Effect.DeleteProperty) {
      throw new Error("Rollback not implemented.");
      //delete origin[effect.name];

    }
  }

  // TODO, 

  /** 
   * Rollback Of Target
   * @param target JavaScript Object
   */
  define("rollbackOf", function(target) {
    // TODO, not all to do
    // elemnent can be frozen or properties may be deleted
    // e.g. this can be the difference to revert,
    // revert removes the shadow
    // whereas rollback handles the effects
    // thus I need a special rollback function
    if(switches.has(target)) switches.get(target).clear();
  }, this);

  /** 
   * Rollback All Targets
   */
  define("rollback", function() {
    for(var target of writetargets) {
      this.rollbackOf(target);
    }
  }, this);

  // _____                     _   
  //|  __ \                   | |  
  //| |__) |_____   _____ _ __| |_ 
  //|  _  // _ \ \ / / _ \ '__| __|
  //| | \ \  __/\ V /  __/ |  | |_ 
  //|_|  \_\___| \_/ \___|_|   \__|

  // TODO, deprecated

  /** Revert Of
   * @param target JavaScript Object
   */
  //  define("revertOf", function(target) {
  //    var sw = switches.get(target);
  //    sw.clear();
  //  }, this);

  /** Rrevert
  */
  //  define("revert", function() {
  //    for(var i in targets) {
  //      this.revertOf(targets[i]);
  //    }
  //  }, this);

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
     */ transparent:false,
    /** MetaHandler
     * (default: true)
     */ metahandler:false,
    /** Debug Mode
     * (default: false)
     */ debug:false,
    /** Function pass-through
     * (default: [])
     */ passthrough:new Set(),
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
     */ metahandler:false,
    /** Debug Mode
     * (default: false)
     */ debug:false,
    /** Function pass-through
     * (default: [])
     */ passthrough:new Set(),
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
    /** Debug Mode
     * (default: false)
     */ debug:true,
    /** Function pass-through
     * (default: [])
     */ passthrough:new Set([print]),
    /** Output handler
     * (default: ShellOut)
     */ out:ShellOut()
  }
});

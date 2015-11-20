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
function Sandbox(global = {}, params = [], prestate = []) {
  if(!(this instanceof Sandbox)) return new Sandbox(global, params, prestate);

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
   * Allow Strict Mode Eval
   * (default: false)
   */
  var __eval__ = configure("eval", false);

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
    __verbose__ && __out__.membrane(msg, id);
  }

  /** logc(msg)
   * @param msg String message
   */ 
  function logc(cmd, arg) {
    __verbose__ && __out__.membrane("$."+padding_right(cmd+" ", ".", 30)+((arg!==undefined) ? " "+arg : ""), id);
  }

  //    _        _   _    _   _    
  // __| |_ __ _| |_(_)__| |_(_)__ 
  //(_-<  _/ _` |  _| (_-<  _| / _|
  ///__/\__\__,_|\__|_/__/\__|_\__|

  var statistic = new Statistic();

  function increment(op) {
    __statistic__ && statistic.increment(op);
  }

  // _    _  _      _   _         ___             _   _          
  //(_)__| \| |__ _| |_(_)_ _____| __|  _ _ _  __| |_(_)___ _ _  
  //| (_-< .` / _` |  _| \ V / -_) _| || | ' \/ _|  _| / _ \ ' \ 
  //|_/__/_|\_\__,_|\__|_|\_/\___|_| \_,_|_||_\__|\__|_\___/_||_|

  /** passThrough(fun)
   * Checks whether the given function is a pass-through function or not.
   *
   * @param fuc Function Object
   * @return true, if fun is a pass-through function, false otherwise
   */
  function passThrough(fun) {
    return (fun instanceof Function) && __passthrough__.has(fun);
  }

  /* List of typed arrays
  */
  var typedArrays = new WeakSet([ArrayBuffer, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array]);

  // _    ___          _ 
  //(_)__| __|_ ____ _| |
  //| (_-< _|\ V / _` | |
  //|_/__/___|\_/\__,_|_|

  var GlobalEval = eval;

  //__ __ ___ _ __ _ _ __ 
  //\ V  V / '_/ _` | '_ \
  // \_/\_/|_| \__,_| .__/
  //                |_|   

  /** Maps target values to sandbox proxies
  */
  var proxies = new WeakMap();

  /** Maps sandbox proxies to handler objects
  */
  var handlers = new WeakMap();

  /** Maps target values to shadow objects
  */
  var shadows = new WeakMap();

  /** Maps sandbox proxies to target values
  */
  var targets = new WeakMap();

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

    // Avoid re-wrapping of sandbox proxies
    if(handlers.has(target)) return target;

    // If target already wrapped, return cached proxy
    if(proxies.has(target)) {
      __verbose__   && log("Cache hit.");
      __statistic__ && increment(Statistic.CACHEHITT);
      return proxies.get(target);
    } else {
      __verbose__   && log("Cache miss.");
      __statistic__ && increment(Statistic.CACHEMISS);
    }

    // Makes a shadow object
    if(target instanceof Function) {
      __verbose__ && log("target instanceOf Function");

      // Allow Strict Mode Eval
      // Note: Matthias Keil
      // Eval can't be wrapped it must be nested in the 
      // function scope directly to support strict mode 
      // evaluation
      if(__eval__ && target===GlobalEval) return target;

      // Function pass throught
      var native =  passThrough(target);
      __verbose__ && logc("target pass-throught", native);
      var shadow = cloneFunction(target, native);
    } else {  
      __verbose__ && log("target instanceOf Object");
      var shadow = cloneObject(target);
    }

    // Defines Meta-handler 
    var metahandler = {
      get: function(target, name) {
        __verbose__ && logc("Call Trap: ", name);

        // Throws an exception if a required trap is not present
        if(name in handler) return target[name];
        else throw new ReferenceError(`Trap ${name} not implemented.`);
      }
    };

    // Transparent Mode
    if(__transparent__) {
      shadow = target;
    }

    // Initializes effect logging
    if(__effect__) initialize(target);

    var handler = new Membrane(target, native);
    var proxy = new Proxy(shadow, __metahandler__ ? new Proxy(handler, metahandler) : handler);

    proxies.set(target, proxy);
    handlers.set(proxy, handler);
    shadows.set(target, shadow);
    targets.set(shadow, target);

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

    var clone = native ? (function(){}) : __decompile__ ? decompile(target, wrap(global)) : target;
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

      /**
       * Copies all properties (property names) from the target object
       * to the shadow object. 
       *
       * This step is required because of some proxy internal invariants
       * witch require that a non-extensible shadow object is not allowed 
       * to return properties (keys) of the target object.
       */
      for (var property in origin) {
        if (!touched(property) && origin.hasOwnProperty(property)) {
          Object.defineProperty(shadow, property, wrap(Object.getOwnPropertyDescriptor(origin, property)));
        }
      }

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

      var current = touched(name) ? 
        Object.getOwnPropertyDescriptor(shadow, name) : 
        wrap(Object.getOwnPropertyDescriptor(origin, name));

      if(current === undefined) {
        // non-existing property
        if(Object.isExtensible(shadow)) {
          // extensible object
          touch(name);
          return Object.defineProperty(shadow, name, desc);
        } else {
          // non-extensible object
          throw new TypeError(`${shadow} is not extensible`);
        }
      } else {
        // existing property
        if(current.configurable) {
          // configurable property
          for(var key in desc) {
            current[key] = desc[key];
          }
          // corresponds the ECMA specification
          if(desc.get || desc.set) {
            delete current.value;
            delete current.writable;
          }
          touch(name);
          return Object.defineProperty(shadow, name, current);
        } else {
          // non-configurable property
          if(current.value) {
            current.value = desc.value || current.value;
          } else if(current.get || current.set) {
            current.get = desc.get || current.get;
            current.set = desc.set || current.set;
          } else {
            throw new TypeError(`can't redefine non-configurable property "${name}"`);
          }
          touch(name);
          return Object.defineProperty(shadow, name, current);
        }
      }
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

      // TODO
      /** Handles the Symbol.toPrimitive property
      */
      if(name === Symbol.toPrimitive) return origin[name];
      //if(name === "valueOf") return origin[name];

      // Node: Matthias Keil
      // Bug in previous versions. Access to undefined causes a 
      // property access on the global object.
      // TODO, test if this also happens in the new engine
      if(origin===global && name==='undefined') return undefined;

      // TODO, implement getter functions
      return touched(name) ? shadow[name] : wrap(origin[name]);
    };

    /** 
     * A trap for setting property values.
     */
    this.set = function(shadow, name, value, receiver) {
      __verbose__ && logc("set", name);
      __effect__  && trace(new Effect.Set(origin, name));

      var desc = touched(name) ? 
        Object.getOwnPropertyDescriptor(shadow, name) : 
        wrap(Object.getOwnPropertyDescriptor(origin, name));

      if(desc === undefined) {
        // non-existing property
        if(Object.isExtensible(shadow)) {
          // extensible object
          touch(name);
          (shadow[name]=value);
        } else {
          // non-extensible object
          throw new TypeError(`${shadow} is not extensible`);
        }
      } else {
        // existing property
        if(desc.writable) {
          // writeable property
          touch(name);
          (shadow[name]=value);
        } else {
          // non-writeable property
          throw new TypeError(`"${name}" is read-only`);
        }
      }
      return true;
    };

    /**
     * A trap for the delete operator.
     */
    this.deleteProperty = function(shadow, name) {
      __verbose__ && logc("deleteProperty", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.DeleteProperty(origin, (typeof name === 'string') ? name : name.toString()));

      var desc = touched(name) ? 
        Object.getOwnPropertyDescriptor(shadow, name) : 
        wrap(Object.getOwnPropertyDescriptor(origin, name));

      if(desc === undefined) {
        // non-existing property
        touch(name);
        return (delete shadow[name]);
      } else {
        // existing property
        if(desc.configurable) {
          touch(name);
          return (delete shadow[name]);
        } else {
          // non-configurable property
          throw new TypeError(`property "${name}" is non-configurable and can't be deleted`);
        }
      }
    };

    /** 
     * A trap for for...in statements.
     */
    this.enumerate = function(shadow) {
      __verbose__ && logc("enumerate");
      __effect__  && trace(new Effect.Enumerate(origin));

      var properties = new Set();
      if(Object.isExtensible(shadow)) for(var property in origin) {
        if(!touched(property) || (property in shadow)) properties.add(property); 
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
      if(Object.isExtensible(shadow)) for(var property of Object.getOwnPropertyNames(origin)) {
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

      /* Special treatment for calling native functions
      */
      if(native && thisArg && targets.has(thisArg)) {
        thisArg = targets.get(thisArg);
      }

      thisArg = thisArg ? thisArg : wrap(global);
      return native ? origin.apply(thisArg, argumentsList) : shadow.apply(thisArg, argumentsList);
    };

    /** 
     * A trap for the new operator. 
     */
    this.construct = function(shadow, argumentsList) {
      __verbose__ && logc("construct");
      __effect__  && trace(new Effect.Construct(origin));

      /* Special treatment for constructing new date objects
      */
      if(origin===Date)
        return new Date(Date.apply({}, argumentsList));

      /* Special treatment for constructing typed arrays
      */
      if(typedArrays.has(origin)) {
        switch(argumentsList.length) {
          case 0:
            return new origin();
            break;
          case 1:
            return new origin(argumentsList[0]);
            break;
          case 2:
            return new origin(argumentsList[0], argumentsList[1]);
            break;
          case 3:
            return new origin(argumentsList[0], argumentsList[1], argumentsList[2]);
            break;
          case 4:
            return new origin(argumentsList[0], argumentsList[1], argumentsList[2], argumentsList[3]);
            break;
          default:
            throw new TypeError('Incalid constructor call.');
        }
      }

      // TODO
      //var thisArg = wrap(Object.create(shadow.prototype));
      var thisArg = native ? Object.create(origin.prototype) : Object.create(shadow.prototype);
      var result =  native ? origin.apply(thisArg, argumentsList) : shadow.apply(thisArg, argumentsList);

      // TODO
      // putstr("#######", origin===Object);
      // if(origin===Object) {
      /* copy properties from object.prototype when creating new oejcts
         var objectsShadow = shadows.get(Object.prototype);
         for(var property of Object.getOwnPropertyNames(objectsShadow))
         thisArg[property] = objectsShadow[property];
         result[property] = objectsShadow[property];
      // }
      */

      //return result ? result : thisArg;
      return (result instanceof Object) ? result : thisArg;
    }
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
    __verbose__   && logc("decompile", fun.name ? fun.name : fun.toString());
    __statistic__ && increment(Statistic.DECOMPILE );

    if(!(fun instanceof Function))
      throw new TypeError("fun");
    if(!(env instanceof Object))
      throw new TypeError("env");

    try {
      var body = "(function() {'use strict'; return " + ("(" + fun.toString() + ")") + "})();";
      var sbxed = eval("(function() { with(env) { return " + body + " }})();");
      return sbxed;
    } catch(error) {
      throw new SyntaxError("Incompatible function object." + "\n" + fun + "\n" + error);
    } 
  }

  /** sbxeval
   * Sandbox eval.
   * @param bosy The source body.
   * @param env The current Global Object
   */
/*
  var __sbxeval__ = (function(env) {

    return  eval("with(env) { (function(){'use strict'; return function(source) { return eval(source); }; })()}");



  })(wrap(global));

  print(__sbxeval__);
*/

/*
  function closure(source) {
    return eval(source);
  }

  function sbxeval(source, env) {
    try {
     return eval("with(env) { closure.call(env, source); }");    
      //scoper.call(env, source, env);
     //(function(env) {
     //  return eval("with(env) { scoper.call(env, source) }");
     //}).call(env, env);
    } catch(error) {
      throw new SyntaxError("Incompatible source." + "\n" + source + "\n" + error);
    }
  }*/

  function xsbxeval(source, env) {
    try {
      (function(env) {
        return eval("with(env) {  " + source + " }");
      }).call(env, env);
    } catch(error) {
      throw new SyntaxError("Incompatible source." + "\n" + source + "\n" + error);
    }
  }

  /** ceval
   * Sandbox eval.
   * @param bosy The source body.
   * @param env The current Global Object
   * Note: Deprecated
   */
  function sbxeval(body, env) {
    try {
      var sbxed = eval("with(env) { (function(){'use strict'; " + body + " })()}");
      return sbxed;
    } catch(error) {
      throw new SyntaxError("Incompatible body." + "\n" + body + "\n" + error + "\n" + error.stack);
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
    var sbxed = __decompile__ ? decompile(fun, wrap(global)) : fun;
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
    var sbxed = __decompile__ ? decompile(fun, wrap(global)) : fun;
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
    var sbxed = __decompile__ ? decompile(fun, wrap(global)) : fun;
    // bind thisArg
    var bound = sbxed.bind(wrap(thisArg));
    // bind arguments
    for(var arg in argumentsList) {
      bound = bound.bind(null, wrap(arg));
    }
    // return bound function
    return bound;
  }

  /** run
   * Runs the given source in the sandbox.
   * @param body JavaScript source code
   */
  function run(body) {
    __verbose__ && logc("run", body);
    // evaluates body
    //sbxeval(body, wrap(global));// TODO
    return __sbxeval__(body);
  }

  // TODO


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
    for(var i=2; i<arguments.length;i++) argumentsList.push(arguments[i]);

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

  // _              _ 
  //| |___  __ _ __| |
  //| / _ \/ _` / _` |
  //|_\___/\__,_\__,_|

  define("load", function() {
    if(read) {
      for(var i in arguments) {
        var filename = arguments[i];
        if(typeof filename === "string") {
          var source = read(filename);
          if(typeof source === "string") {
            run(source);
          } else throw new TypeError("Invalid source file.");
        } else throw new TypeError("Invalid filename.");
      }
    } else throw new TypeError("Function read is not supported.");
  }, this);

  // TODO, deprecated
  define("cload", function() {
    if(read) {
      var body = "";
      for(var i in arguments) {
        var filename = arguments[i];
        if(typeof filename === "string") {
          var source = read(filename);
          if(typeof source === "string") body += source;
          else throw new TypeError("Invalid source file.");
        } else throw new TypeError("Invalid filename.");
      }
      run(body);
    } else throw new TypeError("Function read is not supported.");
  }, this);

  //              _ 
  // _____ ____ _| |
  /// -_) V / _` | |
  //\___|\_/\__,_|_|

  define("eval", function(source) {
    if(typeof source === "string") run(source);
    else throw new TypeError("Invalid source string.");
  }, this);

  // TODO, deprecated
  define("ceval", function(source) {
    if(typeof source === "string") ceval(source);
    else throw new TypeError("Invalid source string.");
  }, this);

  //                          _   
  // _ _ ___ __ _ _  _ ___ __| |_ 
  //| '_/ -_) _` | || / -_|_-<  _|
  //|_| \___\__, |\_,_\___/__/\__|
  //           |_|                

  // TODO
  define("request", function(url) {
    if(typeof filename !== "string") throw new TypeError("Invalid url.");

    function processXMLHttpRequest(file, location) {
      var xmlObj = null;
      if (window.XMLHttpRequest) {
        xmlObj = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xmlObj = new ActiveXObject("Microsoft.XMLHTTP");
      } else {
        return true;
      }
      xmlObj.onreadystatechange = function() {
        if(xmlObj.readyState == 4) {
          processXML(xmlObj.responseXML, location);
        }
      }
      xmlObj.open ('GET', file, true);
      xmlObj.send ('');
      return false;
    }

    if(read) {
      var source = read(filename);
      if(typeof source === "string") run(source);
      else throw new TypeError("Invalid source file.");

    } else throw new TypeError("Function read is not supported.");
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

  var readtargets = new Set();
  var writetargets = new Set();
  var calltargets = new Set();

  /** initializes effect cache
   * @param target Object
   */
  function initialize(target) {
    if(!readeffects.has(target)) readeffects.set(target, new Map());
    if(!writeeffects.has(target)) writeeffects.set(target, new Map());
    if(!calleffects.has(target)) calleffects.set(target, new Map());
  }

  /** cleap effect cache
   * @param target Object
   */
  function clean(target) {
    // removes target obejcts
    readtargets.delete(target);
    writetargets.delete(target);
    calltargets.delete(target);

    // initializes new effect cache
    readeffects.set(target, new Map());
    writeeffects.set(target, new Map());
    calleffects.set(target, new Map());
  }

  /** reset write effects 
   * @param target Object
   */
  function reset(target) {
    // removes target obejcts
    writetargets.delete(target);
    // initializes new effect cache
    writeeffects.set(target, new Map());
  }

  /** saves an sandbox effect
   * @param effect Effect
   */
  function trace(effect) {
    __verbose__   && logc("trace", effect.toString());
    __statistic__ && increment(Statistic.TRACE); 

    if(!(effect instanceof Effect.Effect))
      throw new TypeError("No effect object.");

    if(effect instanceof Effect.Read) {
      // Read-Write Conflict detection requires 
      // the LAST read effect 
      readeffects.get(effect.target).set(effect.hashCode(), effect);
      readtargets.add(effect.target);
    } else if(effect instanceof Effect.Write) {
      // Read-Write Conflict detection requires 
      // the FIRST write effect 
      if(!writeeffects.get(effect.target).has(effect.hashCode()))  
        writeeffects.get(effect.target).set(effect.hashCode(), effect);
      writetargets.add(effect.target);
    } else if(effect instanceof Effect.Call) {
      calleffects.get(effect.target).set(effect.hashCode(), effect);
      calltargets.add(effect.target);
    }
  }

  /** Get Read Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("readeffectsOf", function(target) {
    if(readeffects.has(target)) return new Set(readeffects.get(target).values());
    else return new Set();
  }, this);

  /** Get Write Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("writeeffectsOf", function(target) {
    if(writeeffects.has(target)) return new Set(writeeffects.get(target).values());
    else return new Set();
  }, this);

  /** Get Call Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("calleffectsOf", function(target) {
    if(calleffects.has(target)) return new Set(calleffects.get(target).values());
    else return new Set();
  }, this);

  /** Get Effects
   * @param target JavaScript Obejct
   * @return JavaScript Array [Effect]
   */
  define("effectsOf", function(target) {  
    var effectsOfTarget = [...this.readeffectsOf(target), ...this.writeeffectsOf(target), ...this.calleffectsOf(target)];
    effectsOfTarget.sort();
    return new Set(effectsOfTarget);
  }, this);

  /** Get All Read Effects
   * @return JavaScript Array [Effect]
   */
  getter("readeffects", function() {
    var readEffects = [];

    for(var target of readtargets) {
      readEffects = readEffects.concat([...this.readeffectsOf(target)]);
    }
    readEffects.sort();
    return new Set(readEffects);
  }, this);

  /** Get All Write Effects
   * @return JavaScript Array [Effect]
   */
  getter("writeeffects", function() {
    var writeEffects = [];

    for(var target of writetargets) {
      writeEffects = writeEffects.concat([...this.writeeffectsOf(target)]);
    }
    writeEffects.sort();
    return new Set(writeEffects);

  }, this);

  /** Get All Call Effects
   * @return JavaScript Array [Effect]
   */
  getter("calleffects", function() {
    var callEffects = [];

    for(var target of calltargets) {
      callEffects = callEffects.concat([...this.calleffectsOf(target)]);
    }
    callEffects.sort()
    return new Set(callEffects);
  }, this);

  /** Get All Effects
   * @return JavaScript Array [Effect]
   */
  getter("effects", function() {
    var effects = [...this.readeffects, ...this.writeeffects, ...this.calleffects];
    effects.sort();
    return new Set(effects);
  }, this);

  /** Get All Effects
   * @return JavaScript Array [Effect]
   */
  define("cleanOf", function(target) {
    clean(target);
  }, this);

  define("clean", function() {
    var targets = new Set([...readtargets, ...writetargets, ...calltargets]);
    /**
     * Note: Matthias Keil
     * Needs to iterate over all targets because
     * re-inizialization process.
     */
    for(var target of targets) {
      this.cleanOf(target)
    }
  }, this);

  // _____  _  __  __                                  
  //|  __ \(_)/ _|/ _|                                 
  //| |  | |_| |_| |_ ___ _ __ ___ _ __   ___ ___  ___ 
  //| |  | | |  _|  _/ _ \ '__/ _ \ '_ \ / __/ _ \/ __|
  //| |__| | | | | ||  __/ | |  __/ | | | (_|  __/\__ \
  //|_____/|_|_| |_| \___|_|  \___|_| |_|\___\___||___/

  function comparePropertyDescriptor(desc1, desc2) {
    if(desc1===desc2) return true;

    var keys = ["configurable", "enumerable", "value", "writable", "get", "set"];
    for (var key of keys) {
      if(desc1[key]===desc2[key]) continue;
      else return false;
    }
    return true;
  }

  function hasDifferences(effect, shadow, origin) {

    if(effect instanceof Effect.SetPrototypeOf) {
      return Object.getPrototypeOf(origin) !== Object.getPrototypeOf(shadow);

    } else if(effect instanceof Effect.PreventExtensions) {
      return Object.isExtensible(origin) !== Object.isExtensible(shadow);

    } else if(effect instanceof Effect.DefineProperty) {
      return !comparePropertyDescriptor(
          Object.getOwnPropertyDescriptor(shadow, effect.name),
          Object.getOwnPropertyDescriptor(origin, effect.name));

    } else if(effect instanceof Effect.Set) {
      return !comparePropertyDescriptor(
          Object.getOwnPropertyDescriptor(shadow, effect.name),
          Object.getOwnPropertyDescriptor(origin, effect.name));

    } else if(effect instanceof Effect.DeleteProperty) {
      return !comparePropertyDescriptor(
          Object.getOwnPropertyDescriptor(shadow, effect.name),
          Object.getOwnPropertyDescriptor(origin, effect.name));
    } else {
      throw new TypeError("Invalid Effect");
    }
  }

  /** Has Difference With
   * @param target JavaScript Object
   * return true|false
   */
  define("hasDifferenceWith", function(target) {
    var writeeffects = this.writeeffectsOf(target);

    for(var effect of writeeffects) {
      if(hasDifferences(effect, shadows.get(target), target)) return true
      else continue;
    }
    return false;
  }, this);

  /** Has Difference
   * return true|false
   */
  getter("hasDifference", function() {
    for(var target of writetargets) {
      if(this.hasDifferenceWith(target)) return true
      else continue;
    }
    return false;
  }, this);

  /** Differences Of
   * @param target JavaScript Object
   * return [Differences]
   */
  define("differencesOf", function(target) {
    var writeeffects = this.writeeffectsOf(target);

    var differences = [];
    for(var effect of writeeffects) {
      if(hasDifferences(effect, shadows.get(target), target)) {
        differences.push(new Effect.Difference(this, effect));
      }
      else continue;
    }
    differences.sort();
    return new Set(differences);
  }, this);

  /** Differences 
   * return [Differences]
   */
  getter("differences", function() {
    var differences = [];
    for(var target of writetargets) {
      differences = differences.concat([...this.differencesOf(target)]);
    }
    differences.sort();
    return new Set(differences);
  }, this);

  //  _____ _                                 
  // / ____| |                                
  //| |    | |__   __ _ _ __   __ _  ___  ___ 
  //| |    | '_ \ / _` | '_ \ / _` |/ _ \/ __|
  //| |____| | | | (_| | | | | (_| |  __/\__ \
  // \_____|_| |_|\__,_|_| |_|\__, |\___||___/
  //                           __/ |          
  //                          |___/           

  function hasChanges(effect, shadow, snapshot, origin) {
    if(effect instanceof Effect.GetPrototypeOf) {
      return Object.getPrototypeOf(snapshot) !== Object.getPrototypeOf(origin);

    } else if(effect instanceof Effect.IsExtensible) {
      return Object.isExtensible(snapshot) !== Object.isExtensible(origin)

    } else if(effect instanceof Effect.GetOwnPropertyDescriptor) {
      return !comparePropertyDescriptor(
          Object.getOwnPropertyDescriptor(snapshot, effect.name),
          Object.getOwnPropertyDescriptor(origin, effect.name));

    } else if(effect instanceof Effect.Has) {
      return (effect.name in snapshot) === (effect.name in origin);

    } else if(effect instanceof Effect.Get) {
      return !comparePropertyDescriptor(
          Object.getOwnPropertyDescriptor(snapshot, effect.name),
          Object.getOwnPropertyDescriptor(origin, effect.name));

    } else if(effect instanceof Effect.Enumerate) {
      for(var property in origin) {
        if(!(proeprty in snapshot)) return true;
      }
      return false;

    } else if(effect instanceof Effect.OwnKeys) {
      for(var property of Object.getOwnPropertyNames(origin)) {
        if(!snapshot.hasOwnProperty(property)) return true;
      } 
      return false;

    } else {
      throw new TypeError("Invalid Effect");
    }
  }

  /** Has Changes With
   * @param target JavaScript Object
   * return true|false
   */
  define("hasChangesOn", function(origin) {
    if(!snapshots.has(origin)) throw new TypeError("No pre-state snapshot target");
    else {var target = snapshots.get(origin);
      var readeffects = this.readeffectsOf(target);

      for(var effect of readeffects) {
        if(hasChanges(effect, shadows.get(target), origin, target)) return true
        else continue;
      }
      return false;
    }
  }, this);

  /** Has Changes
   * return true|false
   */
  getter("hasChanges", function() {
    for(var target of prestate) {
      if(this.hasChangesOn(target)) return true
      else continue;
    }
    return false;
  }, this);

  /** Changes Of
   * @param target JavaScript Object
   * return [Differences]
   */
  define("changesOf", function(origin) {
    if(!snapshots.has(origin)) throw new TypeError("No pre-state snapshot target");
    else {
      var target = snapshots.get(origin);
      var readeffects = this.readeffectsOf(target);

      var changes = [];
      for(var effect of readeffects) {
        if(hasChanges(effect, shadows.get(target), origin, target)) {
          changes.push(new Effect.Change(this, effect));
        }
        else continue;
      }
      changes.sort();
      return new Set(changes);
    }
  }, this);

  /** Changes 
   * return [Changes]
   */
  getter("changes", function() {
    var changes = [];
    for(var target of prestate) {
      changes = changes.concat([...this.changesOf(target)]);
    }
    changes.sort();
    return new Set(changes);
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
  }

  /** In Conflict
   * @param e Effect
   * @[aram f Effect
   * @return true|false
   */
  function inConflict(e, f) {
    if((e instanceof Effect.Read) && (f instanceof Effect.Read))
      return false;
    else if((e instanceof Effect.Read) && (f instanceof Effect.Write)) {
      return inReadWriteConflict(e, f);
    } else if((e instanceof Effect.Write) && (f instanceof Effect.Read)) {
      return inReadWriteConflict(f, e);
    } else if((e instanceof Effect.Write) && (f instanceof Effect.Write)) {
      return inWriteWriteConflict(e, f);
    } else {
      return false;
    }
  }

  /** Conflict Of
   * @param sbx Sandbox
   * @param target JavaScript Object
   * return true|false
   */
  define("inConflictWith", function(sbx, target) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    for(var e of this.effectsOf(target)) {
      for(var f of sbx.effectsOf(target)) {
        if(inConflict(e, f)) return true;
        else continue;
      }
    }
    return false;
  }, this);

  /** Conflict Of
   * @param sbx Sandbox
   * @param target JavaScript Object
   * return true|false
   */
  define("inConflict", function(sbx) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    var targets = new Set([...readtargets, ...writetargets]);
    for(var target of targets) {
      for(var e of this.effectsOf(target)) {
        for(var f of sbx.effectsOf(target)) {
          if(inConflict(e, f)) return true;
          else continue;
        }
      }
    }
    return false;
  }, this);

  /** Conflicts
   * @param sbx Sandbox
   * @param target JavaScript Object
   * return [Conflict]
   */
  define("conflictsOf", function(sbx, target) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    var conflicts = [];
    for(var e of this.effectsOf(target)) {
      for(var f of sbx.effectsOf(target)) {
        if(inConflict(e, f)) conflicts.push(Effect.Conflict(this, e, sbx, f));
        else continue;
      }
    }
    conflicts.sort();
    return new Set(conflicts);
  }, this);

  /** Conflicts
   * @param sbx Sandbox
   * return [Conflict]
   */
  define("conflicts", function(sbx) {
    if(!(sbx instanceof Sandbox)) throw new TypeError("No Sandbox.");

    var conflicts = [];
    var targets = new Set([...readtargets, ...writetargets]);
    for(var target of targets) {
      for(var e of this.effectsOf(target)) {
        for(var f of sbx.effectsOf(target)) {
          if(inConflict(e, f)) conflicts.push(Effect.Conflict(this, e, sbx, f));
          else continue;
        }
      }
    }
    conflicts.sort();
    return new Set(conflicts);
  }, this);

  //  _____                          _ _   
  // / ____|                        (_) |  
  //| |     ___  _ __ ___  _ __ ___  _| |_ 
  //| |    / _ \| '_ ` _ \| '_ ` _ \| | __|
  //| |___| (_) | | | | | | | | | | | | |_ 
  // \_____\___/|_| |_| |_|_| |_| |_|_|\__|

  function commit(effect, shadow, origin) {
    if(effect instanceof Effect.SetPrototypeOf) {
      Object.setPrototypeOf(origin, Object.getPrototypeOf(shadow));

    } else if(effect instanceof Effect.PreventExtensions) {
      Object.preventExtensions(origin);

    } else if(effect instanceof Effect.DefineProperty) {
      Object.defineProperty(origin, effect.name,  Object.getOwnPropertyDescriptor(shadow, effect.name));

    } else if(effect instanceof Effect.Set) {
      origin[effect.name]=shadow[effect.name];

    } else if(effect instanceof Effect.DeleteProperty) {
      delete origin[effect.name];

    } else throw new TypeError("Invalid Effect" + effect);
  }

  /** Commit Of Target
   * @return JavaScript Array [Effect]
   */
  define("commitOf", function(target) {
    var effects = this.writeeffectsOf(target);
    for(var effect of effects) {
      commit(effect, shadows.get(target), target); 
    }
    // clean effects of commited target
    reset(target);
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

  /** 
   * Rollback Of Target
   * @param target JavaScript Object
   */
  define("rollbackOf", function(target) {
    if(proxies.has(target) && handlers.has(proxies.get(target))) handlers.get(proxies.get(target)).touchedPropertyNames.clear();

    // clean effects of rolled back target
    reset(target);
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

  /** Revert Of
   * @param target JavaScript Object
   */
  define("revertOf", function(target) {
    var proxy = proxies.get(target);

    // clean proxies, handler, shadow objects
    proxies.delete(target);
    handlers.delete(proxy);
    shadows.delete(target);

    // clean effects 
    clean(target);
  }, this);

  /** Revert
  */
  define("revert", function() {
    for(var target of writetargets) {
      this.revertOf(target);
    }
  }, this);

  // _____                     _        _       
  //|  __ \                   | |      | |      
  //| |__) | __ ___ ______ ___| |_ __ _| |_ ___ 
  //|  ___/ '__/ _ \______/ __| __/ _` | __/ _ \
  //| |   | | |  __/      \__ \ || (_| | ||  __/
  //|_|   |_|  \___|      |___/\__\__,_|\__\___|
  //                                            
  //                                            
  //  _____                       _           _   
  // / ____|                     | |         | |  
  //| (___  _ __   __ _ _ __  ___| |__   ___ | |_ 
  // \___ \| '_ \ / _` | '_ \/ __| '_ \ / _ \| __|
  // ____) | | | | (_| | |_) \__ \ | | | (_) | |_ 
  //|_____/|_| |_|\__,_| .__/|___/_| |_|\___/ \__|
  //                   | |                        
  //                   |_|                        

  // stores prestate referencex
  var snapshots = new WeakMap();

  for(var object of prestate) {
    var clone = Object.create(Object.getPrototypeOf(object));
    for (var property of Object.getOwnPropertyNames(object)) {
      Object.defineProperty(clone, property, Object.getOwnPropertyDescriptor(object, property));
    }
    proxies.set(object, wrap(clone));
    snapshots.set(object, clone);
  }

  /// XXX
  var __sbxeval__ = (function(env) {
    return eval("with(env) { (function(){'use strict'; return function(source) {'use strict'; print('#####'); return eval(source); }; })()}");
  })(wrap(global));

  print(__sbxeval__);



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
  value: "DecentJS 1.1.0 (PoC)"
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
     */ passthrough:dumpGlobal(),
    /** Allow Strict Mode Eval
     * (default: false)
     */ eval:false,
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
     */ passthrough:dumpGlobal(),
    /** Allow Strict Mode Eval
     * (default: false)
     */ eval:false,
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
     */ passthrough:dumpGlobal(), 
    /** Allow Strict Mode Eval
     * (default: false)
     */ eval:false,
    /** Output handler
     * (default: ShellOut)
     */ out:ShellOut()
  }
});

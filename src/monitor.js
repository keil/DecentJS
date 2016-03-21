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
function ReferenceMonitor(params = [], sbxwrap, log, logc, increment, self) {
  if(!(this instanceof ReferenceMonitor)) return new ReferenceMonitor(params, sbxwrap, log, logc, increment, self);

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
   * MetaHandler
   * (default: true)
   */
  var __metahandler__ = configure("metahandler", true);

  //              __ _                   
  // __ ___ _ _  / _(_)__ _ _  _ _ _ ___ 
  /// _/ _ \ ' \|  _| / _` | || | '_/ -_)
  //\__\___/_||_|_| |_\__, |\_,_|_| \___|
  //                  |___/              
  function configure(param, value) {
    return (param in (params===undefined ? {} : params)) ? params[param] : value;
  };


  //__ __ ___ _ __ _ _ __ 
  //\ V  V / '_/ _` | '_ \
  // \_/\_/|_| \__,_| .__/
  //                |_|   

  /** Maps target objects to observer proxies
  */
  var proxies = new WeakMap();

  /** Maps observer proxies to handler objects
  */
  var handlers = new WeakMap();

  /** Maps observer proxies to target objects
  */
  var targets = new WeakMap();

  function unwrap(proxy) {
    return targets.has(proxy) ? targets.get(proxy) : proxy;
  }

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

    // Defines Meta-handler 
    var metahandler = {
      get: function(target, name) {
        __verbose__ && logc("Call Trap: ", name);

        // Throws an exception if a required trap is not present
        if(name in handler) return target[name];
        else throw new ReferenceError(`Trap ${name} not implemented.`);
      }
    };

    var handler = new Membrane();
    var proxy = new Proxy(target, __metahandler__ ? new Proxy(handler, metahandler) : handler);

    proxies.set(target, proxy);
    handlers.set(proxy, handler);
    targets.set(proxy, target);

    return proxy;
  }

  // __  __                _                          
  //|  \/  |              | |                         
  //| \  / | ___ _ __ ___ | |__  _ __ __ _ _ __   ___ 
  //| |\/| |/ _ \ '_ ` _ \| '_ \| '__/ _` | '_ \ / _ \
  //| |  | |  __/ | | | | | |_) | | | (_| | | | |  __/
  //|_|  |_|\___|_| |_| |_|_.__/|_|  \__,_|_| |_|\___|

  /**
   * Sandbox Handler
   * @param target - Outside Value
   * @param native - Flag for Native Functions
   * @param touchedPropertyNames - List of modified properties 
   */
  function Membrane() {
    if(!(this instanceof Membrane)) return new Membrane();


    // _______                  
    //|__   __|                 
    //   | |_ __ __ _ _ __  ___ 
    //   | | '__/ _` | '_ \/ __|
    //   | | | | (_| | |_) \__ \
    //   |_|_|  \__,_| .__/|___/
    //               | |        
    //               |_|        

    /**
     * A trap for Object.getPrototypeOf.
     */
    this.getPrototypeOf = function(target) {
      __verbose__ && logc("getPrototypeOf");

      /**
       * Note: Matthias Keil
       * The current proxy implementation did not support
       * Object.getPrototypeOf.
       */
      // return wrap(Object.getPrototypeOf(target));
      throw new Error('Trap not supported.');
    }

    /**
     * A trap for Object.setPrototypeOf.
     */
    this.setPrototypeOf = function(target, prototype) {
      __verbose__ && logc("setPrototypeOf");

      /**
       * Note: Matthias Keil
       * The current proxy implementation did not support
       * Object.setPrototypeOf.
       */
      // return Object.setPrototypeOf(target, prototype);
      throw new Error('Trap not supported.');
    }

    /**
     * A trap for Object.isExtensible
     */
    this.isExtensible = function(target) {
      __verbose__ && logc("isExtensible");

      return Object.isExtensible(target);
    };

    /** 
     * A trap for Object.preventExtensions.
     */
    this.preventExtensions = function(target) {
      __verbose__ && logc("preventExtensions");

      return Object.preventExtensions(target);
    };

    /** 
     * A trap for Object.getOwnPropertyDescriptor.
     */
    this.getOwnPropertyDescriptor = function(target, name) {
      __verbose__ && logc("getOwnPropertyDescriptor", (typeof name === 'string') ? name : name.toString());

      return wrap(Object.getOwnPropertyDescriptor(target, name));
    };

    /** 
     * A trap for Object.defineProperty.
     */
    this.defineProperty = function(target, name, desc) {
      __verbose__ && logc("defineProperty", (typeof name === 'string') ? name : name.toString());

      return Object.defineProperty(target, name, sbxwrap(desc));
    };

    /** 
     * A trap for the in operator.
     */
    this.has = function(target, name) {
      __verbose__ && logc("has", (typeof name === 'string') ? name : name.toString());

      return (name in target);
    };

    /**
     * A trap for getting property values.
     */
    this.get = function(target, name, receiver) {
      __verbose__ && logc("get", (typeof name === 'string') ? name : name.toString());

      if(typeof target[name] === "object") return wrap(target[name]);
      else return target[name];

      return target[name]; wrap(target[name]);
    };

    /** 
     * A trap for setting property values.
     */
    this.set = function(target, name, value, receiver) {
      __verbose__ && logc("set", name);

      return target[name]=sbxwrap(value);
    };

    /**
     * A trap for the delete operator.
     */
    this.deleteProperty = function(target, name) {
      __verbose__ && logc("deleteProperty", (typeof name === 'string') ? name : name.toString());

      return (delete target[name]);
    };

    /** 
     * A trap for for...in statements.
     */
    this.enumerate = function(target) {
      __verbose__ && logc("enumerate");

      return Object.keys(target)[Symbol.iterator]();
    };

    /**
     * A trap for Object.getOwnPropertyNames.
     */
    this.ownKeys = function(target) {
      __verbose__ && logc("ownKeys");

      return Object.getOwnPropertyNames(target);
    };

    /** 
     * A trap for a function call.
     */
    this.apply = function(target, thisArg, argumentsList) {
      __verbose__ && logc("apply");

      return target.apply(sbxwrap(thisArg), sbxwrap(argumentsList));
    };

    /** 
     * A trap for the new operator. 
     */
    this.construct = function(target, argumentsList) {
      __verbose__ && logc("construct");

      return new target(...sbxwrap(argumentsList));
    }
  };

  //__          __              
  //\ \        / /              
  // \ \  /\  / / __ __ _ _ __  
  //  \ \/  \/ / '__/ _` | '_ \ 
  //   \  /\  /| | | (_| | |_) |
  //    \/  \/ |_|  \__,_| .__/ 
  //                     | |    
  //                     |_|    

  define("wrap", wrap, this);

  // _    _                               
  //| |  | |                              
  //| |  | |_ ____      ___ __ __ _ _ __  
  //| |  | | '_ \ \ /\ / / '__/ _` | '_ \ 
  //| |__| | | | \ V  V /| | | (_| | |_) |
  // \____/|_| |_|\_/\_/ |_|  \__,_| .__/ 
  //                               | |    
  //                               |_|    

  define("unwrap", unwrap, this);
}

// _       ___ _       _           
//| |_ ___/ __| |_ _ _(_)_ _  __ _ 
//|  _/ _ \__ \  _| '_| | ' \/ _` |
// \__\___/___/\__|_| |_|_||_\__, |
//                           |___/ 

Object.defineProperty(ReferenceMonitor.prototype, "toString", {
  get: function() {
    return function() { return "[[DecentJS/ReferenceMonitor]]"; };
  }
});


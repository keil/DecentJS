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

// TODO, build construct like sandbox
// e.g. use same confiration menue
//
function Observer(__verbose__=false, __effect__=false, __statistic__=false, __metahandler__=false, log, logc, trace, increment, initialize, self) {

  // TODO, throw if not called with new

  //print("^^" + __verbose__ + __effect__ + __statistic__ + __metahandler__);

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

    // Initializes effect logging
    if(__effect__) initialize(target);

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
    if(!(this instanceof Membrane)) return new Membrane(target, native);


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
      __effect__  && trace(new Effect.GetPrototypeOf(self, target));

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
      __effect__  && trace(new Effect.SetPrototypeOf(self, target));

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
      __effect__  && trace(new Effect.IsExtensible(self, target));

      return Object.isExtensible(target);
    };

    /** 
     * A trap for Object.preventExtensions.
     */
    this.preventExtensions = function(target) {
      __verbose__ && logc("preventExtensions");
      __effect__  && trace(new Effect.PreventExtensions(self, target));

      return Object.preventExtensions(target);
    };

    /** 
     * A trap for Object.getOwnPropertyDescriptor.
     */
    this.getOwnPropertyDescriptor = function(target, name) {
      __verbose__ && logc("getOwnPropertyDescriptor", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.GetOwnPropertyDescriptor(self, target, (typeof name === 'string') ? name : name.toString()));

      return wrap(Object.getOwnPropertyDescriptor(target, name));
    };

    /** 
     * A trap for Object.defineProperty.
     */
    this.defineProperty = function(target, name, desc) {
      __verbose__ && logc("defineProperty", (typeof name === 'string') ? name : name.toString());
      __effect__ &&  trace(new Effect.DefineProperty(self, target, (typeof name === 'string') ? name : name.toString()));

      return Object.defineProperty(target, name, desc);
    };

    /** 
     * A trap for the in operator.
     */
    this.has = function(target, name) {
      __verbose__ && logc("has", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.Has(self, target, (typeof name === 'string') ? name : name.toString()));

      return (name in target);
    };

    /**
     * A trap for getting property values.
     */
    this.get = function(target, name, receiver) {
      __verbose__ && logc("get", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.Get(self, target, (typeof name === 'string') ? name : name.toString()));

      if(typeof target[name] === "object") return wrap(target[name]);
      else return target[name];

      return target[name]; wrap(target[name]);
    };

    /** 
     * A trap for setting property values.
     */
    this.set = function(target, name, value, receiver) {
      __verbose__ && logc("set", name);
      __effect__  && trace(new Effect.Set(self, target, name));

      return target[name]=value;
    };

    /**
     * A trap for the delete operator.
     */
    this.deleteProperty = function(target, name) {
      __verbose__ && logc("deleteProperty", (typeof name === 'string') ? name : name.toString());
      __effect__  && trace(new Effect.DeleteProperty(self, target, (typeof name === 'string') ? name : name.toString()));

      return (delete target[name]);
    };

    /** 
     * A trap for for...in statements.
     */
    this.enumerate = function(target) {
      __verbose__ && logc("enumerate");
      __effect__  && trace(new Effect.Enumerate(self, target));

      return Object.keys(target)[Symbol.iterator]();
    };

    /**
     * A trap for Object.getOwnPropertyNames.
     */
    this.ownKeys = function(target) {
      __verbose__ && logc("ownKeys");
      __effect__  && trace(new Effect.OwnKeys(self, target));

      return Object.getOwnPropertyNames(target);
    };

    /** 
     * A trap for a function call.
     */
    this.apply = function(target, thisArg, argumentsList) {
      __verbose__ && logc("apply");
      __effect__  && trace(new Effect.Apply(self, target));

      thisArg = thisArg ? thisArg : wrap(global);
      return target.apply(thisArg, argumentsList);
    };

    /** 
     * A trap for the new operator. 
     */
    this.construct = function(target, argumentsList) {
      __verbose__ && logc("construct");
      __effect__  && trace(new Effect.Construct(self, target));

      return new target(...argumentsList);

      /*
         var thisArg = Object.create(target.prototype);
         var result =  target.apply(thisArg, argumentsList);

      //return result ? result : thisArg;
      return (result instanceof Object) ? result : thisArg;
      */
    }
  };


  // TODO
  this.wrap = wrap;
  this.unwrap = unwrap;

  /*
  // ___  __  __        _      
  //| __|/ _|/ _|___ __| |_ ___
  //| _||  _|  _/ -_) _|  _(_-<
  //|___|_| |_| \___\__|\__/__/

  var Observer = new Package("Observer");

  // Realm constructor
  Package.export("wrap", wrap, Observer);
  Package.export("unwrap", unwrap, Observer);

  return Observer;
  */

}

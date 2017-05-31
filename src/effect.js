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

const Package = require('package');

module.exports = (function() {

  //     _     _        _   ___ ___  
  // ___| |__ (_)___ __| |_|_ _|   \ 
  /// _ \ '_ \| / -_) _|  _|| || |) |
  //\___/_.__// \___\__|\__|___|___/ 
  //        |__/                     
  //
  var id = 0;
  var ids = new WeakMap();

  function getObjectID(target) {
    if(!ids.has(target)) ids.set(target, id++);
    return ids.get(target);
  }

  // ___  __  __        _   
  //| __|/ _|/ _|___ __| |_ 
  //| _||  _|  _/ -_) _|  _|
  //|___|_| |_| \___\__|\__|  

  function Effect(sandbox, target) {
    if(!(this instanceof Effect)) return new Effect(sandbox, target);

    Object.defineProperties(this, {
      "sandbox": {
        value: sandbox
      },
      "date": {
        value: Date.now()
      },
      "targetId" : {
        value: getObjectID(target)
      },
      "target": {
        value: target
      }
    });
  }
  Effect.prototype = {};
  Effect.prototype.toString = function() {
    return "[[DecentJS/Effect]]";
  }
  Effect.prototype.hashCode = function() {
    return this;
  }

  // ___             _   ___  __  __        _   
  //| _ \___ __ _ __| | | __|/ _|/ _|___ __| |_ 
  //|   / -_) _` / _` | | _||  _|  _/ -_) _|  _|
  //|_|_\___\__,_\__,_| |___|_| |_| \___\__|\__|

  function Read(sandbox, target) {
    if(!(this instanceof Read)) return new Read(sandbox, target);
    else Effect.call(this, sandbox, target);
  }
  Read.prototype = Object.create(Effect.prototype);
  Read.prototype.toString = function() {
    return "[[DecentJS/ReadEffect]]";
  }

  //__      __   _ _         ___  __  __        _   
  //\ \    / / _(_) |_ ___  | __|/ _|/ _|___ __| |_ 
  // \ \/\/ / '_| |  _/ -_) | _||  _|  _/ -_) _|  _|
  //  \_/\_/|_| |_|\__\___| |___|_| |_| \___\__|\__|

  function Write(sandbox, target) {
    if(!(this instanceof Write)) return new Write(sandbox, target);
    else Effect.call(this, sandbox, target);
  }
  Write.prototype = Object.create(Effect.prototype);
  Write.prototype.toString = function() {
    return "[[DecentJS/WriteEffect]]";
  }
  Write.prototype.commit = function() {
    return this.sandbox.commitOf(this);
  }
  Write.prototype.rollback = function() {
    return this.sandbox.rollbackOf(this);
  }

  //  ___      _ _   ___  __  __        _   
  // / __|__ _| | | | __|/ _|/ _|___ __| |_ 
  //| (__/ _` | | | | _||  _|  _/ -_) _|  _|
  // \___\__,_|_|_| |___|_| |_| \___\__|\__|

  function Call(sandbox, target) {
    if(!(this instanceof Call)) return new Call(sandbox, target);
    else Effect.call(this, sandbox, target);
  }
  Call.prototype = Object.create(Effect.prototype);
  Call.prototype.toString = function() {
    return "[[DecentJS/CallEffect]]";
  }

  // ___             _   ___  __  __        _      
  //| _ \___ __ _ __| | | __|/ _|/ _|___ __| |_ ___
  //|   / -_) _` / _` | | _||  _|  _/ -_) _|  _(_-<
  //|_|_\___\__,_\__,_| |___|_| |_| \___\__|\__/__/

  /**
   * An effect for Object.getPrototypeOf.
   */
  function GetPrototypeOf(sandbox, target) {
    if(!(this instanceof Get)) return new GetPrototypeOf(sandbox, target);
    else Read.call(this, sandbox, target);
  }
  GetPrototypeOf.prototype = Object.create(Read.prototype);
  GetPrototypeOf.prototype.toString = function() {
    return "(#" + this.targetId+") "+"getPrototypeOf"; 
  }
  GetPrototypeOf.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"getPrototypeOf"; 
  }

  /**
   * An effect for Object.isExtensible
   */
  function IsExtensible(sandbox, target) {
    if(!(this instanceof IsExtensible)) return new IsExtensible(sandbox, target);
    else Read.call(this, sandbox, target);
  }
  IsExtensible.prototype = Object.create(Read.prototype);
  IsExtensible.prototype.toString = function() {
    return "(#" + this.targetId+") "+"isExtensible";
  }
  IsExtensible.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"isExtensible";
  }

  /** 
   * An effect for Object.getOwnPropertyDescriptor.
   */
  function GetOwnPropertyDescriptor(sandbox, target, name) {
    if(!(this instanceof GetOwnPropertyDescriptor)) return new GetOwnPropertyDescriptor(sandbox, target, name);
    else Read.call(this, sandbox, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  GetOwnPropertyDescriptor.prototype = Object.create(Read.prototype);
  GetOwnPropertyDescriptor.prototype.toString = function() {
    return "(#" + this.targetId+") "+"getOwnPropertyDescriptor [name="+this.name+"]"; 
  }
  GetOwnPropertyDescriptor.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"getOwnPropertyDescriptor"+"/"+this.name; 
  }

  /** 
   * An effect for the in operator.
   */
  function Has(sandbox, target, name) {
    if(!(this instanceof Has)) return new Has(sandbox, target, name);
    else Read.call(this, sandbox, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  Has.prototype = Object.create(Read.prototype);
  Has.prototype.toString = function() {
    return "(#" + this.targetId+") "+"has [name="+this.name+"]"; 
  }
  Has.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"has"+"/"+this.name; 
  }

  /**
   * An effect for getting property values.
   */
  function Get(sandbox, target, name) {
    if(!(this instanceof Get)) return new Get(sandbox, target, name);
    else Read.call(this, sandbox, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  Get.prototype = Object.create(Read.prototype);
  Get.prototype.toString = function() {
    return "(#" + this.targetId+") "+"get [name="+this.name+"]"; 
  }
  Get.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"get"+"/"+this.name; 
  }

  /** 
   * An effect for for...in statements.
   */
  function Enumerate(sandbox, target) {
    if(!(this instanceof Enumerate)) return new Enumerate(sandbox, target);
    else Read.call(this, sandbox, target);
  }
  Enumerate.prototype = Object.create(Read.prototype);
  Enumerate.prototype.toString = function() {
    return "(#" + this.targetId+") "+"enumerate"; 
  }
  Enumerate.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"enumerate"; 
  }

  /**
   * An effect for Object.getOwnPropertyNames.
   */
  function OwnKeys(sandbox, target) {
    if(!(this instanceof OwnKeys)) return new OwnKeys(sandbox, target);
    else Read.call(this, sandbox, target);
  }
  OwnKeys.prototype = Object.create(Read.prototype);
  OwnKeys.prototype.toString = function() {
    return "(#" + this.targetId+") "+"ownKeys"; 
  }
  OwnKeys.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"ownKeys"; 
  }


  //  ___      _ _   ___  __  __        _      
  // / __|__ _| | | | __|/ _|/ _|___ __| |_ ___
  //| (__/ _` | | | | _||  _|  _/ -_) _|  _(_-<
  // \___\__,_|_|_| |___|_| |_| \___\__|\__/__/


  /** 
   * An effect for a function call.
   */
  function Apply(sandbox, target) {
    if(!(this instanceof Apply)) return new Apply(sandbox, target);
    else Call.call(this, sandbox, target);
  }
  Apply.prototype = Object.create(Call.prototype);
  Apply.prototype.toString = function() {
    return "(#" + this.targetId+") "+"apply"; 
  }
  Apply.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"apply"; 
  }

  /** 
   * An effect for the new operator. 
   */
  function Construct(sandbox, target) {
    if(!(this instanceof Construct)) return new Construct(sandbox, target);
    else Call.call(this, sandbox, target);
  }
  Construct.prototype = Object.create(Call.prototype);
  Construct.prototype.toString = function() {
    return "(#" + this.targetId+") "+"construct"; 
  }
  Construct.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"construct"; 
  }

  //__      __   _ _         ___  __  __        _      
  //\ \    / / _(_) |_ ___  | __|/ _|/ _|___ __| |_ ___
  // \ \/\/ / '_| |  _/ -_) | _||  _|  _/ -_) _|  _(_-<
  //  \_/\_/|_| |_|\__\___| |___|_| |_| \___\__|\__/__/

  /**
   * An effect for Object.setPrototypeOf.
   */
  function SetPrototypeOf(sandbox, target) {
    if(!(this instanceof Get)) return new SetPrototypeOf(sandbox, target);
    else Write.call(this, sandbox, target);
  }
  SetPrototypeOf.prototype = Object.create(Write.prototype);
  SetPrototypeOf.prototype.toString = function() {
    return "(#" + this.targetId+") "+"setPrototypeOf"; 
  }
  SetPrototypeOf.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"setPrototypeOf"; 
  }

  /** 
   * An effect for Object.preventExtensions.
   */
  function PreventExtensions(sandbox, target) {
    if(!(this instanceof PreventExtensions)) return new PreventExtensions(sandbox, target);
    else Write.call(this, sandbox, target);
  }
  PreventExtensions.prototype = Object.create(Write.prototype);
  PreventExtensions.prototype.toString = function() {
    return "(#" + this.targetId+") "+"preventExtensions";
  }
  PreventExtensions.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"preventExtensions";
  }

  /** 
   * An effect for Object.defineProperty.
   */
  function DefineProperty(sandbox, target, name) {
    if(!(this instanceof DefineProperty)) return new DefineProperty(sandbox, target, name);
    else Write.call(this, sandbox, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  DefineProperty.prototype = Object.create(Write.prototype);
  DefineProperty.prototype.toString = function() {
    return "(#" + this.targetId+") "+"defineProperty [name="+this.name+"]";
  }
  DefineProperty.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"defineProperty"+"/"+this.name;
  }

  /** 
   * An effect for setting property values.
   */
  function Set(sandbox, target, name) {
    if(!(this instanceof Set)) return new Set(sandbox, target, name);
    else Write.call(this, sandbox, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  Set.prototype = Object.create(Write.prototype);
  Set.prototype.toString = function() {
    return "(#" + this.targetId+") "+"set [name="+this.name+"]";
  }
  Set.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"set"+"/"+this.name;
  }

  /**
   * An effect for the delete operator.
   */
  function DeleteProperty(sandbox, target, name) {
    if(!(this instanceof DeleteProperty)) return new DeleteProperty(sandbox, target, name);
    else Write.call(this, sandbox, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  DeleteProperty.prototype = Object.create(Write.prototype);
  DeleteProperty.prototype.toString = function() {
    return "(#" + this.targetId+") "+"deleteProperty [name="+this.name+"]";
  }
  DeleteProperty.prototype.hashCode = function() {
    return "#"+this.targetId+"/"+"deleteProperty"+"/"+this.name;
  }

  //  ___           __ _ _    _   
  // / __|___ _ _  / _| (_)__| |_ 
  //| (__/ _ \ ' \|  _| | / _|  _|
  // \___\___/_||_|_| |_|_\__|\__|

  function Conflict(sbxA, effectA, sbxB, effectB) {
    if(!(this instanceof Conflict)) return new Conflict(sbxA, effectA, sbxB, effectB);

    if(!(sbxA instanceof Sandbox))
      throw new TypeError("No sandbox object.");
    if(!(sbxB instanceof Sandbox))
      throw new TypeError("No sandbox object.");

    if(!(effectA instanceof Effect))
      throw new TypeError("No effect object.");
    if(!(effectB instanceof Effect))
      throw new TypeError("No effect object.");

    Object.defineProperties(this, {
      "sbxA": {
        value: sbxA
      },
      "sbxB": {
        value: sbxB
      },
      "effectA": {
        value: effectA
      },
      "effectB": {
        value: effectB
      }
    });
  }
  Conflict.prototype = {};
  Conflict.prototype.toString = function() {
    return "Conflict: "
      + this.effectA.toString() + "@" + this.sbxA.id
      + " - "
      + this.effectB.toString() + "@" + this.sbxB.id;
  }

  // ___  _  __  __                         
  //|   \(_)/ _|/ _|___ _ _ ___ _ _  __ ___ 
  //| |) | |  _|  _/ -_) '_/ -_) ' \/ _/ -_)
  //|___/|_|_| |_| \___|_| \___|_||_\__\___|

  function Difference(sbx, effect) {
    if(!(this instanceof Difference)) return new Difference(sbx, effect);

    if(!(sbx instanceof Sandbox))
      throw new TypeError("No sandbox object.");

    if(!(effect instanceof Effect))
      throw new TypeError("No effect object.");

    Object.defineProperties(this, {
      "sbx": {
        value: sbx
      },
      "effect": {
        value: effect
      }  
    });
  }
  Difference.prototype = {};
  Difference.prototype.toString = function() {
    return "Difference: "
      + this.effect.toString() + "@" + this.sbx.id;
  };

  //  ___ _                          
  // / __| |_  __ _ _ _  __ _ ___ ___
  //| (__| ' \/ _` | ' \/ _` / -_|_-<
  // \___|_||_\__,_|_||_\__, \___/__/
  //                    |___/        

  function Change(sbx, effect) {
    if(!(this instanceof Change)) return new Change(sbx, effect);

    if(!(sbx instanceof Sandbox))
      throw new TypeError("No sandbox object.");

    if(!(effect instanceof Effect))
      throw new TypeError("No effect object.");

    Object.defineProperties(this, {
      "sbx": {
        value: sbx
      },
      "effect": {
        value: effect
      }  
    });
  }
  Change.prototype = {};
  Change.prototype.toString = function() {
    return "Change: "
      + this.effect.toString() + "@" + this.sbx.id;
  };

  // ___  __  __        _      
  //| __|/ _|/ _|___ __| |_ ___
  //| _||  _|  _/ -_) _|  _(_-<
  //|___|_| |_| \___\__|\__/__/

  var Effects = new Package("Effect");

  // Core Effects
  Package.export("Effect", Effect, Effects);
  Package.export("Read", Read, Effects);
  Package.export("Write", Write, Effects);
  Package.export("Call", Call, Effects);

  // Effects
  Package.export("GetPrototypeOf", GetPrototypeOf, Effects);
  Package.export("SetPrototypeOf", SetPrototypeOf, Effects);
  Package.export("IsExtensible", IsExtensible, Effects);
  Package.export("PreventExtensions", PreventExtensions, Effects);
  Package.export("GetOwnPropertyDescriptor", GetOwnPropertyDescriptor, Effects);
  Package.export("DefineProperty", DefineProperty, Effects);
  Package.export("Has", Has, Effects);
  Package.export("Get", Get, Effects);
  Package.export("Set", Set, Effects);
  Package.export("DeleteProperty", DeleteProperty, Effects);
  Package.export("Enumerate", Enumerate, Effects);
  Package.export("OwnKeys", OwnKeys, Effects);
  Package.export("Apply", Apply, Effects);
  Package.export("Construct", Construct, Effects);

  // Core Elements
  Package.export("Conflict", Conflict, Effects);
  Package.export("Difference", Difference, Effects);
  Package.export("Change", Change, Effects);

  return Effects;

})();

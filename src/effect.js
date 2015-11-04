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

var Effect = (function() {

  // ___  __  __        _   
  //| __|/ _|/ _|___ __| |_ 
  //| _||  _|  _/ -_) _|  _|
  //|___|_| |_| \___\__|\__|  

  function Effect(target) {
    if(!(this instanceof Effect)) return new Effect(target);

    Object.defineProperties(this, {
      "date": {
        value: Date.now() 
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

  // ___             _   ___  __  __        _   
  //| _ \___ __ _ __| | | __|/ _|/ _|___ __| |_ 
  //|   / -_) _` / _` | | _||  _|  _/ -_) _|  _|
  //|_|_\___\__,_\__,_| |___|_| |_| \___\__|\__|

  function Read(target) {
    if(!(this instanceof Read)) return new Read(target);
    else Effect.call(this, target);
  }
  Read.prototype = Object.create(Effect.prototype);
  Read.prototype.toString = function() {
    return "[[DecentJS/ReadEffect]]";
  }

  //__      __   _ _         ___  __  __        _   
  //\ \    / / _(_) |_ ___  | __|/ _|/ _|___ __| |_ 
  // \ \/\/ / '_| |  _/ -_) | _||  _|  _/ -_) _|  _|
  //  \_/\_/|_| |_|\__\___| |___|_| |_| \___\__|\__|

  function Write(target) {
    if(!(this instanceof Write)) return new Write(target);
    else Effect.call(this, target);
  }
  Write.prototype = Object.create(Effect.prototype);
  Write.prototype.toString = function() {
    return "[[DecentJS/WriteEffect]]";
  }

  //  ___      _ _   ___  __  __        _   
  // / __|__ _| | | | __|/ _|/ _|___ __| |_ 
  //| (__/ _` | | | | _||  _|  _/ -_) _|  _|
  // \___\__,_|_|_| |___|_| |_| \___\__|\__|

  function Call(target) {
    if(!(this instanceof Call)) return new Call(target);
    else Effect.call(this, target);
  }
  Call.prototype = Object.create(Effect.prototype);
  Call.prototype.toString = function() {
    return "[[TreatJS/CallEffect]]";
  }

  // ___             _   ___  __  __        _      
  //| _ \___ __ _ __| | | __|/ _|/ _|___ __| |_ ___
  //|   / -_) _` / _` | | _||  _|  _/ -_) _|  _(_-<
  //|_|_\___\__,_\__,_| |___|_| |_| \___\__|\__/__/

  /** target, name, receiver -> any
  */
  function Get(target, name) {
    if(!(this instanceof Get)) return new Get(target, name);
    else Read.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  Get.prototype = Object.create(Read.prototype);
  Get.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"get [name="+this.name+"]"; 
  }

  /** target, name -> PropertyDescriptor | undefined
  */
  function GetOwnPropertyDescriptor(target, name) {
    if(!(this instanceof GetOwnPropertyDescriptor)) return new GetOwnPropertyDescriptor(target, name);
    else Read.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  GetOwnPropertyDescriptor.prototype = Object.create(Read.prototype);
  GetOwnPropertyDescriptor.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"getOwnPropertyDescriptor [name="+this.name+"]"; 
  }

  /** target -> [String]
  */
  function OwnKeys(target) {
    if(!(this instanceof OwnKeys)) return new OwnKeys(target);
    else Read.call(this, target);
  }
  OwnKeys.prototype = Object.create(Read.prototype);
  OwnKeys.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"getOwnPropertyNames"; 
  }

  /** target, name -> boolean
  */
  function Has(target, name) {
    if(!(this instanceof Has)) return new Has(target, name);
    else Read.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  Has.prototype = Object.create(Read.prototype);
  Has.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"has [name="+this.name+"]"; 
  }

  /** target, name -> boolean
  */
  function HasOwn(target, name) {
    if(!(this instanceof HasOwn)) return new HasOwn(target, name);
    else Read.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  HasOwn.prototype = Object.create(Read.prototype);
  HasOwn.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"hasOwn [name="+this.name+"]"; 
  }

  /** target -> [String]
  */
  function Enumerate(target) {
    if(!(this instanceof Enumerate)) return new Enumerate(target);
    else Read.call(this, target);
    // TODO
  }
  Enumerate.prototype = Object.create(Read.prototype);
  Enumerate.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"enumerate"; 
  }

  /** target -> iterator
  */
  function Iterate(target) {
    if(!(this instanceof Iterate)) return new Iterate(target);
    else Read.call(this, target);
    // TODO
  }
  Iterate.prototype = Object.create(Read.prototype);
  Iterate.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"iterate"; 
  }

  /** target -> [String]
  */
  function Keys(target) {
    if(!(this instanceof Keys)) return new Keys(target);
    else Read.call(this, target);
    // TODO
  }
  Keys.prototype = Object.create(Read.prototype);
  Keys.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"keys"; 
  }

  /** target -> boolean
   * (not documented)
   */
  function IsExtensible(target) {
    if(!(this instanceof IsExtensible)) return new IsExtensible(target);
    else Read.call(this, target);
    // TODO
  }
  IsExtensible.prototype = Object.create(Read.prototype);
  IsExtensible.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"isExtensible";
  }

  //  ___      _ _   ___  __  __        _      
  // / __|__ _| | | | __|/ _|/ _|___ __| |_ ___
  //| (__/ _` | | | | _||  _|  _/ -_) _|  _(_-<
  // \___\__,_|_|_| |___|_| |_| \___\__|\__/__/

  /** target, thisArg, argsArray -> any
  */
  function Apply(target) {
    if(!(this instanceof Apply)) return new Apply(target);
    else Call.call(this, target);
  }
  Apply.prototype = Object.create(Call.prototype);
  Apply.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"apply"; 
  }

  /** target, thisArg, argsArray -> obejct
  */
  function Construct(target) {
    if(!(this instanceof Construct)) return new Construct(target);
    else Call.call(this, target);
  }
  Construct.prototype = Object.create(Call.prototype);
  Construct.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"construct"; 
  }

  //__      __   _ _         ___  __  __        _      
  //\ \    / / _(_) |_ ___  | __|/ _|/ _|___ __| |_ ___
  // \ \/\/ / '_| |  _/ -_) | _||  _|  _/ -_) _|  _(_-<
  //  \_/\_/|_| |_|\__\___| |___|_| |_| \___\__|\__/__/

  /** target, name, propertyDescriptor -> any
  */
  function Set(target, name) {
    if(!(this instanceof Set)) return new Set(target, name);
    else Write.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  Set.prototype = Object.create(Write.prototype);
  Set.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"set [name="+this.name+"]";
  }

  /** target, name, propertyDescriptor -> any
  */
  function DefineProperty(target, name) {
    if(!(this instanceof DefineProperty)) return new DefineProperty(target, name);
    else Write.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  DefineProperty.prototype = Object.create(Write.prototype);
  DefineProperty.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"defineProperty [name="+this.name+"]";
  }

  /** target, name -> boolean
  */
  function DeleteProperty(target, name) {
    if(!(this instanceof DeleteProperty)) return new DeleteProperty(target, name);
    else Write.call(this, target);

    Object.defineProperties(this, {
      "name": {
        value: name
      }
    });
  }
  DeleteProperty.prototype = Object.create(Write.prototype);
  DeleteProperty.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"deleteProperty [name="+this.name+"]";
  }

  /** target -> boolean
  */
  function Freeze(target) {
    if(!(this instanceof Freeze)) return new Freeze(target);
    else Write.call(this, target);
    // TODO
  }
  Freeze.prototype = Object.create(Write.prototype);
  Freeze.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"freeze";
  }

  /** target -> boolean
  */
  function Seal(target) {
    if(!(this instanceof Seal)) return new Seal(target);
    else Write.call(this, target);
    // TODO
  }
  Seal.prototype = Object.create(Write.prototype);
  Seal.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"seal";
  }

  /** target -> boolean
  */
  function PreventExtensions(target) {
    if(!(this instanceof PreventExtensions)) return new PreventExtensions(target);
    else Write.call(this, target);
    // TODO
  }
  PreventExtensions.prototype = Object.create(Write.prototype);
  PreventExtensions.prototype.toString = function() {
    return "(" + this.date + ")"+" "+"preventExtensions";
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
    return "Confict: "
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

  // _____                          _   _          
  //|_   _| _ __ _ _ _  ___ __ _ __| |_(_)___ _ _  
  //  | || '_/ _` | ' \(_-</ _` / _|  _| / _ \ ' \ 
  //  |_||_| \__,_|_||_/__/\__,_\__|\__|_\___/_||_|

  function Transaction(effects) {
    if(!(this instanceof Transaction)) return new Transaction(effects);

    Object.defineProperties(this, {
      "effects": {
        value: effects
      }  
    });

    // TODO
    // Implement differences/ changes/ conflicts ?
    // Or delete

    // TODO
    // add features
    // set of write effects
    //this.effects=effects;
  }
  Transaction.prototype = {};
  Transaction.prototype.toString = function() {
    return "[[DecentJS/Transaction]]";
  };


  // ___  __  __        _      
  //| __|/ _|/ _|___ __| |_ ___
  //| _||  _|  _/ -_) _|  _(_-<
  //|___|_| |_| \___\__|\__/__/

  var Effects = new Package("Effect");

  // Core Prototype
  Package.export("Effect", Effect, Effects);

  // Core Effects
  Package.export("Read", Read, Effects);
  Package.export("Write", Write, Effects);
  Package.export("Call", Call, Effects);

  // Read Effects
  Package.export("Get", Get, Effects);
  Package.export("GetOwnPropertyDescriptor", GetOwnPropertyDescriptor, Effects);
  Package.export("OwnKeys", OwnKeys, Effects);
  Package.export("Has", Has, Effects);
  Package.export("HasOwn", HasOwn, Effects);
  Package.export("Enumerate", Enumerate, Effects);
  Package.export("Iterate", Iterate, Effects);
  Package.export("Keys", Keys, Effects);
  Package.export("Apply", Apply, Effects);
  Package.export("Construct", Construct, Effects);
  Package.export("IsExtensible", IsExtensible, Effects);

  // Write Effects
  Package.export("Set", Set, Effects);
  Package.export("DefineProperty", DefineProperty, Effects);
  Package.export("DeleteProperty", DeleteProperty, Effects);
  Package.export("Freeze", Freeze, Effects);
  Package.export("Seal", Seal, Effects);
  Package.export("PreventExtensions", PreventExtensions, Effects);

  // Core Effects
  Package.export("Conflict", Conflict, Effects);
  Package.export("Difference", Difference, Effects);
  Package.export("Change", Change, Effects);

  // Transaction
  Package.export("Transaction", Transaction, Effects);

  return Effects;

})();

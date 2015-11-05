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


// Object.isExtensible
// Note: Proxy Trap does not exist
load("test/membrane/Object.isExtensible.js");
quit();

//                 _                       
// _ __  ___ _ __ | |__  __ _ _ _ _ _  ___ 
//| '  \/ -_) '  \| '_ \/ _` | '_| ' \/ -_)
//|_|_|_\___|_|_|_|_.__/\__,_|_| |_||_\___|


// A test for Object.getPrototypeOf.

// A test for Object.setPrototypeOf.

// A test for Object.isExtensible.

// A test for Object.preventExtensions.
load("test/membrane/Object.preventExtensions.js");

// A test for Object.getOwnPropertyDescriptor.
//load("test/membrane/Object.getOwnPropertyDescriptor.js");// TODO

// A test for Object.defineProperty.
load("test/membrane/Object.defineProperty.js");

// A test for the in operator.
load("test/membrane/Object.has.js");

// A test for getting property values.
load("test/membrane/Object.get.js"); 

// A test for setting property values.
load("test/membrane/Object.set.js");

// A test for the delete operator.
load("test/membrane/Object.deleteProperty.js");

// A test for for...in statements.
load("test/membrane/Object.enumerate.js");

// A test for Object.getOwnPropertyNames.
load("test/membrane/Object.getOwnPropertyNames.js");

// A test for a function call.
load("test/membrane/Object.apply.js");

// A test for the new operator. 
load("test/membrane/Object.construct.js");



// TODO
// test native function
// and construct e.g. from Date




// Object.hasOwn
//load("test/membrane/Object.hasOwn.js");

// Object.isExtensible
// Note: Proxy Trap does not exist
load("test/membrane/Object.isExtensible.js");





// Note: Proxy Trap ist not implemented

// Object.keys
//load("test/membrane/Object.keys.js"); 

// Object.preventExtensions




// _         _             _         
//| |__  ___| |_  __ ___ _(_)___ _ _ 
//| '_ \/ -_) ' \/ _` \ V / / _ \ '_|
//|_.__/\___|_||_\__,_|\_/|_\___/_|  

// Object.iterate
load("test/membrane/Object.iterate.js");

// Object.freeze
//load("test/membrane/Object.freeze.js"); // TODO

// Object.isFrozen
//load("test/membrane/Object.isFrozen.js"); // TODO

// Object.seal
//load("test/membrane/Object.seal.js"); // TODO

// Object.isSealed
//load("test/membrane/Object.isSealed.js"); // TODO



// typeof proxy
// TODO

// proxy instanceof constructor
// TODO

// Object.getPrototypeOf
//load("test/membrane/Object.getPrototypeOf.js");

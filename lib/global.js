function dumpGlobal() {

  var set = new Set();

  function dump(object) {
    for(var property of Object.getOwnPropertyNames(object)) {
      if(object[property] instanceof Function) set.add(object[property]);
    }
  }
  function add(value) {
    if(value instanceof Function) set.add(value);
  }

  dump(this);

  dump(Object);
  dump(Object.prototype);
  dump(Function);
  dump(Function.prototype);
  dump(Boolean);
  dump(Boolean.prototype);
  dump(Symbol);
  dump(Symbol.prototype);
  dump(Error);
  dump(Error.prototype);

  add(Symbol.toPrimitive);

  dump(EvalError);
  dump(InternalError);
  dump(RangeError);
  dump(ReferenceError);
  dump(StopIteration);
  dump(SyntaxError);
  dump(TypeError);
  dump(URIError);

  dump(Number);
  dump(Number.prototype);
  dump(Math);
  dump(Date);
  dump(Date.prototype);

  dump(String);
  dump(String.prototype);
  dump(RegExp);
  dump(RegExp.prototype);

  dump(Array);
  dump(Array.prototype);

  dump(Int8Array);
  dump(Uint8Array);
  dump(Uint8ClampedArray);
  dump(Int16Array);
  dump(Uint16Array);
  dump(Int32Array);
  dump(Uint32Array);
  dump(Float32Array);
  dump(Float64Array);
  //dump(ParallelArray);

  dump(Map);
  //dump(Map.prototype);
  dump(Set);
  //dump(Set.prototype);
  dump(WeakMap);
  dump(WeakMap.prototype);
  dump(WeakSet);
  dump(WeakSet.prototype);

  dump(ArrayBuffer);
  dump(DataView);
  dump(JSON);

  dump(Iterator);
  //dump(Generator);
  //dump(Promise);

  dump(Reflect);
  dump(Proxy);

  dump(Intl);
  dump(Intl.Collator);
  dump(Intl.DateTimeFormat);
  dump(Intl.NumberFormat);

  if(console) {
    add(console);
    dump(console);
  }

  return set;
}

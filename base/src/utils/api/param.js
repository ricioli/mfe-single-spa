// function isPlainObject(obj) {
//   var proto, Ctor;

//   // Detect obvious negatives
//   if (!obj || toString.call(obj) !== '[object Object]') {
//     return false;
//   }

//   proto = Object.getPrototypeOf(obj);

//   // Objects with no prototype (e.g., `Object.create( null )`) are plain
//   if (!proto) {
//     return true;
//   }

//   // Objects with prototype are plain iff they were constructed by a global Object function
//   Ctor = {}.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
//   return (
//     typeof Ctor === 'function' && {}.hasOwnProperty.toString.call(Ctor) === {}.hasOwnProperty.toString.call(Object)
//   );
// }

function buildParams(prefix, obj, traditional, add) {
  var name;

  if (Array.isArray(obj)) {
    // Serialize array item.
    each(obj, function(i, v) {
      if (traditional || /\[\]$/.test(prefix)) {
        // Treat each array item as a scalar.
        add(prefix, v);
      } else {
        // Item is non-scalar (array or object), encode its numeric index.
        buildParams(prefix + '[' + (typeof v === 'object' && v != null ? i : '') + ']', v, traditional, add);
      }
    });
  } else if (!traditional && toType(obj) === 'object') {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + '.' + name , obj[name], traditional, add);
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
}

var class2type = {};
each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function(i, name) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});

function toType(obj) {
  if (obj == null) return String(obj);

  return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
}

function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function isArrayLike(obj) {
  // Support: real iOS 8.2 only (not reproducible in simulator)
  // `in` check used to prevent JIT error (gh-2145)
  // hasOwn isn't used here due to false negatives
  // regarding Nodelist length in IE
  var length = !!obj && 'length' in obj && obj.length,
    type = toType(obj);

  if (isFunction(obj) || isWindow(obj)) {
    return false;
  }

  return type === 'array' || length === 0 || (typeof length === 'number' && length > 0 && length - 1 in obj);
}

function each(obj, callback) {
  var length,
    i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }

  return obj;
}

function isFunction(obj) {
  return typeof obj === 'function' && typeof obj.nodeType !== 'number';
}

function param(a, traditional) {
  var prefix,
    s = [],
    add = function(key, valueOrFunction) {
      var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
      s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value == null ? '' : value);
    };

  if (a == null) {
    return '';
  }

  // If an array was passed in, assume that it is an array of form elements.
  // if (Array.isArray(a) || (a.jquery && !isPlainObject(a))) {
  if (Array.isArray(a)) {
    // Serialize the form elements
    each(a, function() {
      add(this.name, this.value);
    });
  } else {
    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for (prefix in a) {
      buildParams(prefix, a[prefix], traditional, add);
    }
  }

  return s.join('&');
}

export default param;

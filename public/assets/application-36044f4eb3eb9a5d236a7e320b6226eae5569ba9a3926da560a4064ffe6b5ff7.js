/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
if ("undefined" == typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
+function (t) {
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] >= 4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(jQuery), function () {
    function t(t, e) {
        if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function e(t, e) {
        if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function n(t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }

    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, o = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
            }
        }

        return function (e, n, i) {
            return n && t(e.prototype, n), i && t(e, i), e
        }
    }(), s = function (t) {
        function e(t) {
            return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function n(t) {
            return (t[0] || t).nodeType
        }

        function i() {
            return {
                bindType: r.end, delegateType: r.end, handle: function (e) {
                    if (t(e.target).is(this))return e.handleObj.handler.apply(this, arguments)
                }
            }
        }

        function o() {
            if (window.QUnit)return !1;
            var t = document.createElement("bootstrap");
            for (var e in a)if (void 0 !== t.style[e])return {end: a[e]};
            return !1
        }

        function s(e) {
            var n = this, i = !1;
            return t(this).one(l.TRANSITION_END, function () {
                i = !0
            }), setTimeout(function () {
                i || l.triggerTransitionEnd(n)
            }, e), this
        }

        var r = !1, a = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        }, l = {
            TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
                do {
                    t += ~~(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            }, getSelectorFromElement: function (t) {
                var e = t.getAttribute("data-target");
                return e || (e = t.getAttribute("href") || "", e = /^#[a-z]/i.test(e) ? e : null), e
            }, reflow: function (t) {
                return t.offsetHeight
            }, triggerTransitionEnd: function (e) {
                t(e).trigger(r.end)
            }, supportsTransitionEnd: function () {
                return Boolean(r)
            }, typeCheckConfig: function (t, i, o) {
                for (var s in o)if (o.hasOwnProperty(s)) {
                    var r = o[s], a = i[s], l = a && n(a) ? "element" : e(a);
                    if (!new RegExp(r).test(l))throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + l + '" but expected type "' + r + '".')
                }
            }
        };
        return function () {
            r = o(), t.fn.emulateTransitionEnd = s, l.supportsTransitionEnd() && (t.event.special[l.TRANSITION_END] = i())
        }(), l
    }(jQuery), r = (function (t) {
        var e = "alert", i = t.fn[e], r = {DISMISS: '[data-dismiss="alert"]'},
            a = {CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api"},
            l = {ALERT: "alert", FADE: "fade", SHOW: "show"}, h = function () {
                function e(t) {
                    n(this, e), this._element = t
                }

                return e.prototype.close = function (t) {
                    t = t || this._element;
                    var e = this._getRootElement(t);
                    this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                }, e.prototype.dispose = function () {
                    t.removeData(this._element, "bs.alert"), this._element = null
                }, e.prototype._getRootElement = function (e) {
                    var n = s.getSelectorFromElement(e), i = !1;
                    return n && (i = t(n)[0]), i || (i = t(e).closest("." + l.ALERT)[0]), i
                }, e.prototype._triggerCloseEvent = function (e) {
                    var n = t.Event(a.CLOSE);
                    return t(e).trigger(n), n
                }, e.prototype._removeElement = function (e) {
                    var n = this;
                    if (t(e).removeClass(l.SHOW), !s.supportsTransitionEnd() || !t(e).hasClass(l.FADE))return void this._destroyElement(e);
                    t(e).one(s.TRANSITION_END, function (t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(150)
                }, e.prototype._destroyElement = function (e) {
                    t(e).detach().trigger(a.CLOSED).remove()
                }, e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var i = t(this), o = i.data("bs.alert");
                        o || (o = new e(this), i.data("bs.alert", o)), "close" === n && o[n](this)
                    })
                }, e._handleDismiss = function (t) {
                    return function (e) {
                        e && e.preventDefault(), t.close(this)
                    }
                }, o(e, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }]), e
            }();
        t(document).on(a.CLICK_DATA_API, r.DISMISS, h._handleDismiss(new h)), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function () {
            return t.fn[e] = i, h._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "button", i = t.fn[e], s = {ACTIVE: "active", BUTTON: "btn", FOCUS: "focus"}, r = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: "input",
            ACTIVE: ".active",
            BUTTON: ".btn"
        }, a = {
            CLICK_DATA_API: "click.bs.button.data-api",
            FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
        }, l = function () {
            function e(t) {
                n(this, e), this._element = t
            }

            return e.prototype.toggle = function () {
                var e = !0, n = t(this._element).closest(r.DATA_TOGGLE)[0];
                if (n) {
                    var i = t(this._element).find(r.INPUT)[0];
                    if (i) {
                        if ("radio" === i.type)if (i.checked && t(this._element).hasClass(s.ACTIVE)) e = !1; else {
                            var o = t(n).find(r.ACTIVE)[0];
                            o && t(o).removeClass(s.ACTIVE)
                        }
                        e && (i.checked = !t(this._element).hasClass(s.ACTIVE), t(i).trigger("change")), i.focus()
                    }
                }
                this._element.setAttribute("aria-pressed", !t(this._element).hasClass(s.ACTIVE)), e && t(this._element).toggleClass(s.ACTIVE)
            }, e.prototype.dispose = function () {
                t.removeData(this._element, "bs.button"), this._element = null
            }, e._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = t(this).data("bs.button");
                    i || (i = new e(this), t(this).data("bs.button", i)), "toggle" === n && i[n]()
                })
            }, o(e, null, [{
                key: "VERSION", get: function () {
                    return "4.0.0-alpha.6"
                }
            }]), e
        }();
        t(document).on(a.CLICK_DATA_API, r.DATA_TOGGLE_CARROT, function (e) {
            e.preventDefault();
            var n = e.target;
            t(n).hasClass(s.BUTTON) || (n = t(n).closest(r.BUTTON)), l._jQueryInterface.call(t(n), "toggle")
        }).on(a.FOCUS_BLUR_DATA_API, r.DATA_TOGGLE_CARROT, function (e) {
            var n = t(e.target).closest(r.BUTTON)[0];
            t(n).toggleClass(s.FOCUS, /^focus(in)?$/.test(e.type))
        }), t.fn[e] = l._jQueryInterface, t.fn[e].Constructor = l, t.fn[e].noConflict = function () {
            return t.fn[e] = i, l._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "carousel", r = "bs.carousel", a = "." + r, l = t.fn[e],
            h = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0}, c = {
                interval: "(number|boolean)",
                keyboard: "boolean",
                slide: "(boolean|string)",
                pause: "(string|boolean)",
                wrap: "boolean"
            }, d = {NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right"}, u = {
                SLIDE: "slide" + a,
                SLID: "slid" + a,
                KEYDOWN: "keydown" + a,
                MOUSEENTER: "mouseenter" + a,
                MOUSELEAVE: "mouseleave" + a,
                LOAD_DATA_API: "load.bs.carousel.data-api",
                CLICK_DATA_API: "click.bs.carousel.data-api"
            }, p = {
                CAROUSEL: "carousel",
                ACTIVE: "active",
                SLIDE: "slide",
                RIGHT: "carousel-item-right",
                LEFT: "carousel-item-left",
                NEXT: "carousel-item-next",
                PREV: "carousel-item-prev",
                ITEM: "carousel-item"
            }, f = {
                ACTIVE: ".active",
                ACTIVE_ITEM: ".active.carousel-item",
                ITEM: ".carousel-item",
                NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                INDICATORS: ".carousel-indicators",
                DATA_SLIDE: "[data-slide], [data-slide-to]",
                DATA_RIDE: '[data-ride="carousel"]'
            }, m = function () {
                function l(e, i) {
                    n(this, l), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(i), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(f.INDICATORS)[0], this._addEventListeners()
                }

                return l.prototype.next = function () {
                    if (this._isSliding)throw new Error("Carousel is sliding");
                    this._slide(d.NEXT)
                }, l.prototype.nextWhenVisible = function () {
                    document.hidden || this.next()
                }, l.prototype.prev = function () {
                    if (this._isSliding)throw new Error("Carousel is sliding");
                    this._slide(d.PREVIOUS)
                }, l.prototype.pause = function (e) {
                    e || (this._isPaused = !0), t(this._element).find(f.NEXT_PREV)[0] && s.supportsTransitionEnd() && (s.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                }, l.prototype.cycle = function (t) {
                    t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                }, l.prototype.to = function (e) {
                    var n = this;
                    this._activeElement = t(this._element).find(f.ACTIVE_ITEM)[0];
                    var i = this._getItemIndex(this._activeElement);
                    if (!(e > this._items.length - 1 || e < 0)) {
                        if (this._isSliding)return void t(this._element).one(u.SLID, function () {
                            return n.to(e)
                        });
                        if (i === e)return this.pause(), void this.cycle();
                        var o = e > i ? d.NEXT : d.PREVIOUS;
                        this._slide(o, this._items[e])
                    }
                }, l.prototype.dispose = function () {
                    t(this._element).off(a), t.removeData(this._element, r), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                }, l.prototype._getConfig = function (n) {
                    return n = t.extend({}, h, n), s.typeCheckConfig(e, n, c), n
                }, l.prototype._addEventListeners = function () {
                    var e = this;
                    this._config.keyboard && t(this._element).on(u.KEYDOWN, function (t) {
                        return e._keydown(t)
                    }), "hover" !== this._config.pause || "ontouchstart" in document.documentElement || t(this._element).on(u.MOUSEENTER, function (t) {
                        return e.pause(t)
                    }).on(u.MOUSELEAVE, function (t) {
                        return e.cycle(t)
                    })
                }, l.prototype._keydown = function (t) {
                    if (!/input|textarea/i.test(t.target.tagName))switch (t.which) {
                        case 37:
                            t.preventDefault(), this.prev();
                            break;
                        case 39:
                            t.preventDefault(), this.next();
                            break;
                        default:
                            return
                    }
                }, l.prototype._getItemIndex = function (e) {
                    return this._items = t.makeArray(t(e).parent().find(f.ITEM)), this._items.indexOf(e)
                }, l.prototype._getItemByDirection = function (t, e) {
                    var n = t === d.NEXT, i = t === d.PREVIOUS, o = this._getItemIndex(e), s = this._items.length - 1;
                    if ((i && 0 === o || n && o === s) && !this._config.wrap)return e;
                    var r = t === d.PREVIOUS ? -1 : 1, a = (o + r) % this._items.length;
                    return -1 === a ? this._items[this._items.length - 1] : this._items[a]
                }, l.prototype._triggerSlideEvent = function (e, n) {
                    var i = t.Event(u.SLIDE, {relatedTarget: e, direction: n});
                    return t(this._element).trigger(i), i
                }, l.prototype._setActiveIndicatorElement = function (e) {
                    if (this._indicatorsElement) {
                        t(this._indicatorsElement).find(f.ACTIVE).removeClass(p.ACTIVE);
                        var n = this._indicatorsElement.children[this._getItemIndex(e)];
                        n && t(n).addClass(p.ACTIVE)
                    }
                }, l.prototype._slide = function (e, n) {
                    var i = this, o = t(this._element).find(f.ACTIVE_ITEM)[0], r = n || o && this._getItemByDirection(e, o),
                        a = Boolean(this._interval), l = void 0, h = void 0, c = void 0;
                    if (e === d.NEXT ? (l = p.LEFT, h = p.NEXT, c = d.LEFT) : (l = p.RIGHT, h = p.PREV, c = d.RIGHT), r && t(r).hasClass(p.ACTIVE))return void(this._isSliding = !1);
                    if (!this._triggerSlideEvent(r, c).isDefaultPrevented() && o && r) {
                        this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(r);
                        var m = t.Event(u.SLID, {relatedTarget: r, direction: c});
                        s.supportsTransitionEnd() && t(this._element).hasClass(p.SLIDE) ? (t(r).addClass(h), s.reflow(r), t(o).addClass(l), t(r).addClass(l), t(o).one(s.TRANSITION_END, function () {
                            t(r).removeClass(l + " " + h).addClass(p.ACTIVE), t(o).removeClass(p.ACTIVE + " " + h + " " + l), i._isSliding = !1, setTimeout(function () {
                                return t(i._element).trigger(m)
                            }, 0)
                        }).emulateTransitionEnd(600)) : (t(o).removeClass(p.ACTIVE), t(r).addClass(p.ACTIVE), this._isSliding = !1, t(this._element).trigger(m)), a && this.cycle()
                    }
                }, l._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this).data(r), o = t.extend({}, h, t(this).data());
                        "object" === (void 0 === e ? "undefined" : i(e)) && t.extend(o, e);
                        var s = "string" == typeof e ? e : o.slide;
                        if (n || (n = new l(this, o), t(this).data(r, n)), "number" == typeof e) n.to(e); else if ("string" == typeof s) {
                            if (void 0 === n[s])throw new Error('No method named "' + s + '"');
                            n[s]()
                        } else o.interval && (n.pause(), n.cycle())
                    })
                }, l._dataApiClickHandler = function (e) {
                    var n = s.getSelectorFromElement(this);
                    if (n) {
                        var i = t(n)[0];
                        if (i && t(i).hasClass(p.CAROUSEL)) {
                            var o = t.extend({}, t(i).data(), t(this).data()), a = this.getAttribute("data-slide-to");
                            a && (o.interval = !1), l._jQueryInterface.call(t(i), o), a && t(i).data(r).to(a), e.preventDefault()
                        }
                    }
                }, o(l, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return h
                    }
                }]), l
            }();
        t(document).on(u.CLICK_DATA_API, f.DATA_SLIDE, m._dataApiClickHandler), t(window).on(u.LOAD_DATA_API, function () {
            t(f.DATA_RIDE).each(function () {
                var e = t(this);
                m._jQueryInterface.call(e, e.data())
            })
        }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
            return t.fn[e] = l, m._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "collapse", r = "bs.collapse", a = t.fn[e], l = {toggle: !0, parent: ""},
            h = {toggle: "boolean", parent: "string"}, c = {
                SHOW: "show." + r,
                SHOWN: "shown." + r,
                HIDE: "hide." + r,
                HIDDEN: "hidden." + r,
                CLICK_DATA_API: "click.bs.collapse.data-api"
            }, d = {SHOW: "show", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed"},
            u = {WIDTH: "width", HEIGHT: "height"},
            p = {ACTIVES: ".card > .show, .card > .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]'},
            f = function () {
                function a(e, i) {
                    n(this, a), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(i), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]')), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                }

                return a.prototype.toggle = function () {
                    t(this._element).hasClass(d.SHOW) ? this.hide() : this.show()
                }, a.prototype.show = function () {
                    var e = this;
                    if (this._isTransitioning)throw new Error("Collapse is transitioning");
                    if (!t(this._element).hasClass(d.SHOW)) {
                        var n = void 0, i = void 0;
                        if (this._parent && (n = t.makeArray(t(this._parent).find(p.ACTIVES)), n.length || (n = null)), !(n && (i = t(n).data(r)) && i._isTransitioning)) {
                            var o = t.Event(c.SHOW);
                            if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
                                n && (a._jQueryInterface.call(t(n), "hide"), i || t(n).data(r, null));
                                var l = this._getDimension();
                                t(this._element).removeClass(d.COLLAPSE).addClass(d.COLLAPSING), this._element.style[l] = 0, this._element.setAttribute("aria-expanded", !0), this._triggerArray.length && t(this._triggerArray).removeClass(d.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                var h = function () {
                                    t(e._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).addClass(d.SHOW), e._element.style[l] = "", e.setTransitioning(!1), t(e._element).trigger(c.SHOWN)
                                };
                                if (!s.supportsTransitionEnd())return void h();
                                var u = l[0].toUpperCase() + l.slice(1), f = "scroll" + u;
                                t(this._element).one(s.TRANSITION_END, h).emulateTransitionEnd(600), this._element.style[l] = this._element[f] + "px"
                            }
                        }
                    }
                }, a.prototype.hide = function () {
                    var e = this;
                    if (this._isTransitioning)throw new Error("Collapse is transitioning");
                    if (t(this._element).hasClass(d.SHOW)) {
                        var n = t.Event(c.HIDE);
                        if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                            var i = this._getDimension(), o = i === u.WIDTH ? "offsetWidth" : "offsetHeight";
                            this._element.style[i] = this._element[o] + "px", s.reflow(this._element), t(this._element).addClass(d.COLLAPSING).removeClass(d.COLLAPSE).removeClass(d.SHOW), this._element.setAttribute("aria-expanded", !1), this._triggerArray.length && t(this._triggerArray).addClass(d.COLLAPSED).attr("aria-expanded", !1), this.setTransitioning(!0);
                            var r = function () {
                                e.setTransitioning(!1), t(e._element).removeClass(d.COLLAPSING).addClass(d.COLLAPSE).trigger(c.HIDDEN)
                            };
                            if (this._element.style[i] = "", !s.supportsTransitionEnd())return void r();
                            t(this._element).one(s.TRANSITION_END, r).emulateTransitionEnd(600)
                        }
                    }
                }, a.prototype.setTransitioning = function (t) {
                    this._isTransitioning = t
                }, a.prototype.dispose = function () {
                    t.removeData(this._element, r), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                }, a.prototype._getConfig = function (n) {
                    return n = t.extend({}, l, n), n.toggle = Boolean(n.toggle), s.typeCheckConfig(e, n, h), n
                }, a.prototype._getDimension = function () {
                    return t(this._element).hasClass(u.WIDTH) ? u.WIDTH : u.HEIGHT
                }, a.prototype._getParent = function () {
                    var e = this, n = t(this._config.parent)[0],
                        i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    return t(n).find(i).each(function (t, n) {
                        e._addAriaAndCollapsedClass(a._getTargetFromElement(n), [n])
                    }), n
                }, a.prototype._addAriaAndCollapsedClass = function (e, n) {
                    if (e) {
                        var i = t(e).hasClass(d.SHOW);
                        e.setAttribute("aria-expanded", i), n.length && t(n).toggleClass(d.COLLAPSED, !i).attr("aria-expanded", i)
                    }
                }, a._getTargetFromElement = function (e) {
                    var n = s.getSelectorFromElement(e);
                    return n ? t(n)[0] : null
                }, a._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this), o = n.data(r),
                            s = t.extend({}, l, n.data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);
                        if (!o && s.toggle && /show|hide/.test(e) && (s.toggle = !1), o || (o = new a(this, s), n.data(r, o)), "string" == typeof e) {
                            if (void 0 === o[e])throw new Error('No method named "' + e + '"');
                            o[e]()
                        }
                    })
                }, o(a, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }]), a
            }();
        t(document).on(c.CLICK_DATA_API, p.DATA_TOGGLE, function (e) {
            e.preventDefault();
            var n = f._getTargetFromElement(this), i = t(n).data(r), o = i ? "toggle" : t(this).data();
            f._jQueryInterface.call(t(n), o)
        }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function () {
            return t.fn[e] = a, f._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "dropdown", i = ".bs.dropdown", r = t.fn[e], a = {
            HIDE: "hide" + i,
            HIDDEN: "hidden" + i,
            SHOW: "show" + i,
            SHOWN: "shown" + i,
            CLICK: "click" + i,
            CLICK_DATA_API: "click.bs.dropdown.data-api",
            FOCUSIN_DATA_API: "focusin.bs.dropdown.data-api",
            KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api"
        }, l = {BACKDROP: "dropdown-backdrop", DISABLED: "disabled", SHOW: "show"}, h = {
            BACKDROP: ".dropdown-backdrop",
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: ".dropdown form",
            ROLE_MENU: '[role="menu"]',
            ROLE_LISTBOX: '[role="listbox"]',
            NAVBAR_NAV: ".navbar-nav",
            VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a'
        }, c = function () {
            function e(t) {
                n(this, e), this._element = t, this._addEventListeners()
            }

            return e.prototype.toggle = function () {
                if (this.disabled || t(this).hasClass(l.DISABLED))return !1;
                var n = e._getParentFromElement(this), i = t(n).hasClass(l.SHOW);
                if (e._clearMenus(), i)return !1;
                if ("ontouchstart" in document.documentElement && !t(n).closest(h.NAVBAR_NAV).length) {
                    var o = document.createElement("div");
                    o.className = l.BACKDROP, t(o).insertBefore(this), t(o).on("click", e._clearMenus)
                }
                var s = {relatedTarget: this}, r = t.Event(a.SHOW, s);
                return t(n).trigger(r), !r.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", !0), t(n).toggleClass(l.SHOW), t(n).trigger(t.Event(a.SHOWN, s)), !1)
            }, e.prototype.dispose = function () {
                t.removeData(this._element, "bs.dropdown"), t(this._element).off(i), this._element = null
            }, e.prototype._addEventListeners = function () {
                t(this._element).on(a.CLICK, this.toggle)
            }, e._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = t(this).data("bs.dropdown");
                    if (i || (i = new e(this), t(this).data("bs.dropdown", i)), "string" == typeof n) {
                        if (void 0 === i[n])throw new Error('No method named "' + n + '"');
                        i[n].call(this)
                    }
                })
            }, e._clearMenus = function (n) {
                if (!n || 3 !== n.which) {
                    var i = t(h.BACKDROP)[0];
                    i && i.parentNode.removeChild(i);
                    for (var o = t.makeArray(t(h.DATA_TOGGLE)), s = 0; s < o.length; s++) {
                        var r = e._getParentFromElement(o[s]), c = {relatedTarget: o[s]};
                        if (t(r).hasClass(l.SHOW) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "focusin" === n.type) && t.contains(r, n.target))) {
                            var d = t.Event(a.HIDE, c);
                            t(r).trigger(d), d.isDefaultPrevented() || (o[s].setAttribute("aria-expanded", "false"), t(r).removeClass(l.SHOW).trigger(t.Event(a.HIDDEN, c)))
                        }
                    }
                }
            }, e._getParentFromElement = function (e) {
                var n = void 0, i = s.getSelectorFromElement(e);
                return i && (n = t(i)[0]), n || e.parentNode
            }, e._dataApiKeydownHandler = function (n) {
                if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !t(this).hasClass(l.DISABLED))) {
                    var i = e._getParentFromElement(this), o = t(i).hasClass(l.SHOW);
                    if (!o && 27 !== n.which || o && 27 === n.which) {
                        if (27 === n.which) {
                            var s = t(i).find(h.DATA_TOGGLE)[0];
                            t(s).trigger("focus")
                        }
                        return void t(this).trigger("click")
                    }
                    var r = t(i).find(h.VISIBLE_ITEMS).get();
                    if (r.length) {
                        var a = r.indexOf(n.target);
                        38 === n.which && a > 0 && a--, 40 === n.which && a < r.length - 1 && a++, a < 0 && (a = 0), r[a].focus()
                    }
                }
            }, o(e, null, [{
                key: "VERSION", get: function () {
                    return "4.0.0-alpha.6"
                }
            }]), e
        }();
        t(document).on(a.KEYDOWN_DATA_API, h.DATA_TOGGLE, c._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, h.ROLE_MENU, c._dataApiKeydownHandler).on(a.KEYDOWN_DATA_API, h.ROLE_LISTBOX, c._dataApiKeydownHandler).on(a.CLICK_DATA_API + " " + a.FOCUSIN_DATA_API, c._clearMenus).on(a.CLICK_DATA_API, h.DATA_TOGGLE, c.prototype.toggle).on(a.CLICK_DATA_API, h.FORM_CHILD, function (t) {
            t.stopPropagation()
        }), t.fn[e] = c._jQueryInterface, t.fn[e].Constructor = c, t.fn[e].noConflict = function () {
            return t.fn[e] = r, c._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "modal", r = ".bs.modal", a = t.fn[e], l = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
            h = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, c = {
                HIDE: "hide.bs.modal",
                HIDDEN: "hidden.bs.modal",
                SHOW: "show.bs.modal",
                SHOWN: "shown.bs.modal",
                FOCUSIN: "focusin.bs.modal",
                RESIZE: "resize.bs.modal",
                CLICK_DISMISS: "click.dismiss.bs.modal",
                KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                CLICK_DATA_API: "click.bs.modal.data-api"
            }, d = {
                SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                BACKDROP: "modal-backdrop",
                OPEN: "modal-open",
                FADE: "fade",
                SHOW: "show"
            }, u = {
                DIALOG: ".modal-dialog",
                DATA_TOGGLE: '[data-toggle="modal"]',
                DATA_DISMISS: '[data-dismiss="modal"]',
                FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
            }, p = function () {
                function a(e, i) {
                    n(this, a), this._config = this._getConfig(i), this._element = e, this._dialog = t(e).find(u.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                }

                return a.prototype.toggle = function (t) {
                    return this._isShown ? this.hide() : this.show(t)
                }, a.prototype.show = function (e) {
                    var n = this;
                    if (this._isTransitioning)throw new Error("Modal is transitioning");
                    s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE) && (this._isTransitioning = !0);
                    var i = t.Event(c.SHOW, {relatedTarget: e});
                    t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), t(document.body).addClass(d.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(c.CLICK_DISMISS, u.DATA_DISMISS, function (t) {
                        return n.hide(t)
                    }), t(this._dialog).on(c.MOUSEDOWN_DISMISS, function () {
                        t(n._element).one(c.MOUSEUP_DISMISS, function (e) {
                            t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function () {
                        return n._showElement(e)
                    }))
                }, a.prototype.hide = function (e) {
                    var n = this;
                    if (e && e.preventDefault(), this._isTransitioning)throw new Error("Modal is transitioning");
                    var i = s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE);
                    i && (this._isTransitioning = !0);
                    var o = t.Event(c.HIDE);
                    t(this._element).trigger(o), this._isShown && !o.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), t(document).off(c.FOCUSIN), t(this._element).removeClass(d.SHOW), t(this._element).off(c.CLICK_DISMISS), t(this._dialog).off(c.MOUSEDOWN_DISMISS), i ? t(this._element).one(s.TRANSITION_END, function (t) {
                        return n._hideModal(t)
                    }).emulateTransitionEnd(300) : this._hideModal())
                }, a.prototype.dispose = function () {
                    t.removeData(this._element, "bs.modal"), t(window, document, this._element, this._backdrop).off(r), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null
                }, a.prototype._getConfig = function (n) {
                    return n = t.extend({}, l, n), s.typeCheckConfig(e, n, h), n
                }, a.prototype._showElement = function (e) {
                    var n = this, i = s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE);
                    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && s.reflow(this._element), t(this._element).addClass(d.SHOW), this._config.focus && this._enforceFocus();
                    var o = t.Event(c.SHOWN, {relatedTarget: e}), r = function () {
                        n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(o)
                    };
                    i ? t(this._dialog).one(s.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                }, a.prototype._enforceFocus = function () {
                    var e = this;
                    t(document).off(c.FOCUSIN).on(c.FOCUSIN, function (n) {
                        document === n.target || e._element === n.target || t(e._element).has(n.target).length || e._element.focus()
                    })
                }, a.prototype._setEscapeEvent = function () {
                    var e = this;
                    this._isShown && this._config.keyboard ? t(this._element).on(c.KEYDOWN_DISMISS, function (t) {
                        27 === t.which && e.hide()
                    }) : this._isShown || t(this._element).off(c.KEYDOWN_DISMISS)
                }, a.prototype._setResizeEvent = function () {
                    var e = this;
                    this._isShown ? t(window).on(c.RESIZE, function (t) {
                        return e._handleUpdate(t)
                    }) : t(window).off(c.RESIZE)
                }, a.prototype._hideModal = function () {
                    var e = this;
                    this._element.style.display = "none", this._element.setAttribute("aria-hidden", "true"), this._isTransitioning = !1, this._showBackdrop(function () {
                        t(document.body).removeClass(d.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(c.HIDDEN)
                    })
                }, a.prototype._removeBackdrop = function () {
                    this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                }, a.prototype._showBackdrop = function (e) {
                    var n = this, i = t(this._element).hasClass(d.FADE) ? d.FADE : "";
                    if (this._isShown && this._config.backdrop) {
                        var o = s.supportsTransitionEnd() && i;
                        if (this._backdrop = document.createElement("div"), this._backdrop.className = d.BACKDROP, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(c.CLICK_DISMISS, function (t) {
                                if (n._ignoreBackdropClick)return void(n._ignoreBackdropClick = !1);
                                t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                            }), o && s.reflow(this._backdrop), t(this._backdrop).addClass(d.SHOW), !e)return;
                        if (!o)return void e();
                        t(this._backdrop).one(s.TRANSITION_END, e).emulateTransitionEnd(150)
                    } else if (!this._isShown && this._backdrop) {
                        t(this._backdrop).removeClass(d.SHOW);
                        var r = function () {
                            n._removeBackdrop(), e && e()
                        };
                        s.supportsTransitionEnd() && t(this._element).hasClass(d.FADE) ? t(this._backdrop).one(s.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                    } else e && e()
                }, a.prototype._handleUpdate = function () {
                    this._adjustDialog()
                }, a.prototype._adjustDialog = function () {
                    var t = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                }, a.prototype._resetAdjustments = function () {
                    this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                }, a.prototype._checkScrollbar = function () {
                    this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                }, a.prototype._setScrollbar = function () {
                    var e = parseInt(t(u.FIXED_CONTENT).css("padding-right") || 0, 10);
                    this._originalBodyPadding = document.body.style.paddingRight || "", this._isBodyOverflowing && (document.body.style.paddingRight = e + this._scrollbarWidth + "px")
                }, a.prototype._resetScrollbar = function () {
                    document.body.style.paddingRight = this._originalBodyPadding
                }, a.prototype._getScrollbarWidth = function () {
                    var t = document.createElement("div");
                    t.className = d.SCROLLBAR_MEASURER, document.body.appendChild(t);
                    var e = t.offsetWidth - t.clientWidth;
                    return document.body.removeChild(t), e
                }, a._jQueryInterface = function (e, n) {
                    return this.each(function () {
                        var o = t(this).data("bs.modal"),
                            s = t.extend({}, a.Default, t(this).data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);
                        if (o || (o = new a(this, s), t(this).data("bs.modal", o)), "string" == typeof e) {
                            if (void 0 === o[e])throw new Error('No method named "' + e + '"');
                            o[e](n)
                        } else s.show && o.show(n)
                    })
                }, o(a, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }]), a
            }();
        t(document).on(c.CLICK_DATA_API, u.DATA_TOGGLE, function (e) {
            var n = this, i = void 0, o = s.getSelectorFromElement(this);
            o && (i = t(o)[0]);
            var r = t(i).data("bs.modal") ? "toggle" : t.extend({}, t(i).data(), t(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
            var a = t(i).one(c.SHOW, function (e) {
                e.isDefaultPrevented() || a.one(c.HIDDEN, function () {
                    t(n).is(":visible") && n.focus()
                })
            });
            p._jQueryInterface.call(t(i), r, this)
        }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function () {
            return t.fn[e] = a, p._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = "scrollspy", r = t.fn[e], a = {offset: 10, method: "auto", target: ""},
            l = {offset: "number", method: "string", target: "(string|element)"}, h = {
                ACTIVATE: "activate.bs.scrollspy",
                SCROLL: "scroll.bs.scrollspy",
                LOAD_DATA_API: "load.bs.scrollspy.data-api"
            }, c = {
                DROPDOWN_ITEM: "dropdown-item",
                DROPDOWN_MENU: "dropdown-menu",
                NAV_LINK: "nav-link",
                NAV: "nav",
                ACTIVE: "active"
            }, d = {
                DATA_SPY: '[data-spy="scroll"]',
                ACTIVE: ".active",
                LIST_ITEM: ".list-item",
                LI: "li",
                LI_DROPDOWN: "li.dropdown",
                NAV_LINKS: ".nav-link",
                DROPDOWN: ".dropdown",
                DROPDOWN_ITEMS: ".dropdown-item",
                DROPDOWN_TOGGLE: ".dropdown-toggle"
            }, u = {OFFSET: "offset", POSITION: "position"}, p = function () {
                function r(e, i) {
                    var o = this;
                    n(this, r), this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(i), this._selector = this._config.target + " " + d.NAV_LINKS + "," + this._config.target + " " + d.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function (t) {
                        return o._process(t)
                    }), this.refresh(), this._process()
                }

                return r.prototype.refresh = function () {
                    var e = this, n = this._scrollElement !== this._scrollElement.window ? u.POSITION : u.OFFSET,
                        i = "auto" === this._config.method ? n : this._config.method,
                        o = i === u.POSITION ? this._getScrollTop() : 0;
                    this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
                        var n = void 0, r = s.getSelectorFromElement(e);
                        return r && (n = t(r)[0]), n && (n.offsetWidth || n.offsetHeight) ? [t(n)[i]().top + o, r] : null
                    }).filter(function (t) {
                        return t
                    }).sort(function (t, e) {
                        return t[0] - e[0]
                    }).forEach(function (t) {
                        e._offsets.push(t[0]), e._targets.push(t[1])
                    })
                }, r.prototype.dispose = function () {
                    t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                }, r.prototype._getConfig = function (n) {
                    if (n = t.extend({}, a, n), "string" != typeof n.target) {
                        var i = t(n.target).attr("id");
                        i || (i = s.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
                    }
                    return s.typeCheckConfig(e, n, l), n
                }, r.prototype._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                }, r.prototype._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }, r.prototype._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight
                }, r.prototype._process = function () {
                    var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                        n = this._config.offset + e - this._getOffsetHeight();
                    if (this._scrollHeight !== e && this.refresh(), t >= n) {
                        var i = this._targets[this._targets.length - 1];
                        return void(this._activeTarget !== i && this._activate(i))
                    }
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }, r.prototype._activate = function (e) {
                    this._activeTarget = e, this._clear();
                    var n = this._selector.split(",");
                    n = n.map(function (t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    });
                    var i = t(n.join(","));
                    i.hasClass(c.DROPDOWN_ITEM) ? (i.closest(d.DROPDOWN).find(d.DROPDOWN_TOGGLE).addClass(c.ACTIVE), i.addClass(c.ACTIVE)) : i.parents(d.LI).find("> " + d.NAV_LINKS).addClass(c.ACTIVE), t(this._scrollElement).trigger(h.ACTIVATE, {relatedTarget: e})
                }, r.prototype._clear = function () {
                    t(this._selector).filter(d.ACTIVE).removeClass(c.ACTIVE)
                }, r._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this).data("bs.scrollspy"), o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                        if (n || (n = new r(this, o), t(this).data("bs.scrollspy", n)), "string" == typeof e) {
                            if (void 0 === n[e])throw new Error('No method named "' + e + '"');
                            n[e]()
                        }
                    })
                }, o(r, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return a
                    }
                }]), r
            }();
        t(window).on(h.LOAD_DATA_API, function () {
            for (var e = t.makeArray(t(d.DATA_SPY)), n = e.length; n--;) {
                var i = t(e[n]);
                p._jQueryInterface.call(i, i.data())
            }
        }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function () {
            return t.fn[e] = r, p._jQueryInterface
        }
    }(jQuery), function (t) {
        var e = t.fn.tab, i = {
                HIDE: "hide.bs.tab",
                HIDDEN: "hidden.bs.tab",
                SHOW: "show.bs.tab",
                SHOWN: "shown.bs.tab",
                CLICK_DATA_API: "click.bs.tab.data-api"
            }, r = {DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active", DISABLED: "disabled", FADE: "fade", SHOW: "show"},
            a = {
                A: "a",
                LI: "li",
                DROPDOWN: ".dropdown",
                LIST: "ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)",
                FADE_CHILD: "> .nav-item .fade, > .fade",
                ACTIVE: ".active",
                ACTIVE_CHILD: "> .nav-item > .active, > .active",
                DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
                DROPDOWN_TOGGLE: ".dropdown-toggle",
                DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
            }, l = function () {
                function e(t) {
                    n(this, e), this._element = t
                }

                return e.prototype.show = function () {
                    var e = this;
                    if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(r.ACTIVE) || t(this._element).hasClass(r.DISABLED))) {
                        var n = void 0, o = void 0, l = t(this._element).closest(a.LIST)[0],
                            h = s.getSelectorFromElement(this._element);
                        l && (o = t.makeArray(t(l).find(a.ACTIVE)), o = o[o.length - 1]);
                        var c = t.Event(i.HIDE, {relatedTarget: this._element}), d = t.Event(i.SHOW, {relatedTarget: o});
                        if (o && t(o).trigger(c), t(this._element).trigger(d), !d.isDefaultPrevented() && !c.isDefaultPrevented()) {
                            h && (n = t(h)[0]), this._activate(this._element, l);
                            var u = function () {
                                var n = t.Event(i.HIDDEN, {relatedTarget: e._element}),
                                    s = t.Event(i.SHOWN, {relatedTarget: o});
                                t(o).trigger(n), t(e._element).trigger(s)
                            };
                            n ? this._activate(n, n.parentNode, u) : u()
                        }
                    }
                }, e.prototype.dispose = function () {
                    t.removeClass(this._element, "bs.tab"), this._element = null
                }, e.prototype._activate = function (e, n, i) {
                    var o = this, l = t(n).find(a.ACTIVE_CHILD)[0],
                        h = i && s.supportsTransitionEnd() && (l && t(l).hasClass(r.FADE) || Boolean(t(n).find(a.FADE_CHILD)[0])),
                        c = function () {
                            return o._transitionComplete(e, l, h, i)
                        };
                    l && h ? t(l).one(s.TRANSITION_END, c).emulateTransitionEnd(150) : c(), l && t(l).removeClass(r.SHOW)
                }, e.prototype._transitionComplete = function (e, n, i, o) {
                    if (n) {
                        t(n).removeClass(r.ACTIVE);
                        var l = t(n.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];
                        l && t(l).removeClass(r.ACTIVE), n.setAttribute("aria-expanded", !1)
                    }
                    if (t(e).addClass(r.ACTIVE), e.setAttribute("aria-expanded", !0), i ? (s.reflow(e), t(e).addClass(r.SHOW)) : t(e).removeClass(r.FADE), e.parentNode && t(e.parentNode).hasClass(r.DROPDOWN_MENU)) {
                        var h = t(e).closest(a.DROPDOWN)[0];
                        h && t(h).find(a.DROPDOWN_TOGGLE).addClass(r.ACTIVE), e.setAttribute("aria-expanded", !0)
                    }
                    o && o()
                }, e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var i = t(this), o = i.data("bs.tab");
                        if (o || (o = new e(this), i.data("bs.tab", o)), "string" == typeof n) {
                            if (void 0 === o[n])throw new Error('No method named "' + n + '"');
                            o[n]()
                        }
                    })
                }, o(e, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }]), e
            }();
        t(document).on(i.CLICK_DATA_API, a.DATA_TOGGLE, function (e) {
            e.preventDefault(), l._jQueryInterface.call(t(this), "show")
        }), t.fn.tab = l._jQueryInterface, t.fn.tab.Constructor = l, t.fn.tab.noConflict = function () {
            return t.fn.tab = e, l._jQueryInterface
        }
    }(jQuery), function (t) {
        if ("undefined" == typeof Tether)throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");
        var e = "tooltip", r = ".bs.tooltip", a = t.fn[e], l = {
                animation: !0,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                selector: !1,
                placement: "top",
                offset: "0 0",
                constraints: [],
                container: !1
            }, h = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "string",
                constraints: "array",
                container: "(string|element|boolean)"
            }, c = {TOP: "bottom center", RIGHT: "middle left", BOTTOM: "top center", LEFT: "middle right"},
            d = {SHOW: "show", OUT: "out"}, u = {
                HIDE: "hide" + r,
                HIDDEN: "hidden" + r,
                SHOW: "show" + r,
                SHOWN: "shown" + r,
                INSERTED: "inserted" + r,
                CLICK: "click" + r,
                FOCUSIN: "focusin" + r,
                FOCUSOUT: "focusout" + r,
                MOUSEENTER: "mouseenter" + r,
                MOUSELEAVE: "mouseleave" + r
            }, p = {FADE: "fade", SHOW: "show"}, f = {TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner"},
            m = {element: !1, enabled: !1}, g = {HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual"},
            v = function () {
                function a(t, e) {
                    n(this, a), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._isTransitioning = !1, this._tether = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                }

                return a.prototype.enable = function () {
                    this._isEnabled = !0
                }, a.prototype.disable = function () {
                    this._isEnabled = !1
                }, a.prototype.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled
                }, a.prototype.toggle = function (e) {
                    if (e) {
                        var n = this.constructor.DATA_KEY, i = t(e.currentTarget).data(n);
                        i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (t(this.getTipElement()).hasClass(p.SHOW))return void this._leave(null, this);
                        this._enter(null, this)
                    }
                }, a.prototype.dispose = function () {
                    clearTimeout(this._timeout), this.cleanupTether(), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null
                }, a.prototype.show = function () {
                    var e = this;
                    if ("none" === t(this.element).css("display"))throw new Error("Please use show on visible elements");
                    var n = t.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        if (this._isTransitioning)throw new Error("Tooltip is transitioning");
                        t(this.element).trigger(n);
                        var i = t.contains(this.element.ownerDocument.documentElement, this.element);
                        if (n.isDefaultPrevented() || !i)return;
                        var o = this.getTipElement(), r = s.getUID(this.constructor.NAME);
                        o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && t(o).addClass(p.FADE);
                        var l = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                            h = this._getAttachment(l),
                            c = !1 === this.config.container ? document.body : t(this.config.container);
                        t(o).data(this.constructor.DATA_KEY, this).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({
                            attachment: h,
                            element: o,
                            target: this.element,
                            classes: m,
                            classPrefix: "bs-tether",
                            offset: this.config.offset,
                            constraints: this.config.constraints,
                            addTargetClasses: !1
                        }), s.reflow(o), this._tether.position(), t(o).addClass(p.SHOW);
                        var u = function () {
                            var n = e._hoverState;
                            e._hoverState = null, e._isTransitioning = !1, t(e.element).trigger(e.constructor.Event.SHOWN), n === d.OUT && e._leave(null, e)
                        };
                        if (s.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE))return this._isTransitioning = !0, void t(this.tip).one(s.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION);
                        u()
                    }
                }, a.prototype.hide = function (e) {
                    var n = this, i = this.getTipElement(), o = t.Event(this.constructor.Event.HIDE);
                    if (this._isTransitioning)throw new Error("Tooltip is transitioning");
                    var r = function () {
                        n._hoverState !== d.SHOW && i.parentNode && i.parentNode.removeChild(i), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), n._isTransitioning = !1, n.cleanupTether(), e && e()
                    };
                    t(this.element).trigger(o), o.isDefaultPrevented() || (t(i).removeClass(p.SHOW), this._activeTrigger[g.CLICK] = !1, this._activeTrigger[g.FOCUS] = !1, this._activeTrigger[g.HOVER] = !1, s.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE) ? (this._isTransitioning = !0, t(i).one(s.TRANSITION_END, r).emulateTransitionEnd(150)) : r(), this._hoverState = "")
                }, a.prototype.isWithContent = function () {
                    return Boolean(this.getTitle())
                }, a.prototype.getTipElement = function () {
                    return this.tip = this.tip || t(this.config.template)[0]
                }, a.prototype.setContent = function () {
                    var e = t(this.getTipElement());
                    this.setElementContent(e.find(f.TOOLTIP_INNER), this.getTitle()), e.removeClass(p.FADE + " " + p.SHOW), this.cleanupTether()
                }, a.prototype.setElementContent = function (e, n) {
                    var o = this.config.html;
                    "object" === (void 0 === n ? "undefined" : i(n)) && (n.nodeType || n.jquery) ? o ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[o ? "html" : "text"](n)
                }, a.prototype.getTitle = function () {
                    var t = this.element.getAttribute("data-original-title");
                    return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                }, a.prototype.cleanupTether = function () {
                    this._tether && this._tether.destroy()
                }, a.prototype._getAttachment = function (t) {
                    return c[t.toUpperCase()]
                }, a.prototype._setListeners = function () {
                    var e = this;
                    this.config.trigger.split(" ").forEach(function (n) {
                        if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                            return e.toggle(t)
                        }); else if (n !== g.MANUAL) {
                            var i = n === g.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                o = n === g.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                            t(e.element).on(i, e.config.selector, function (t) {
                                return e._enter(t)
                            }).on(o, e.config.selector, function (t) {
                                return e._leave(t)
                            })
                        }
                        t(e.element).closest(".modal").on("hide.bs.modal", function () {
                            return e.hide()
                        })
                    }), this.config.selector ? this.config = t.extend({}, this.config, {
                        trigger: "manual",
                        selector: ""
                    }) : this._fixTitle()
                }, a.prototype._fixTitle = function () {
                    var t = i(this.element.getAttribute("data-original-title"));
                    (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                }, a.prototype._enter = function (e, n) {
                    var i = this.constructor.DATA_KEY;
                    return n = n || t(e.currentTarget).data(i), n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? g.FOCUS : g.HOVER] = !0), t(n.getTipElement()).hasClass(p.SHOW) || n._hoverState === d.SHOW ? void(n._hoverState = d.SHOW) : (clearTimeout(n._timeout), n._hoverState = d.SHOW, n.config.delay && n.config.delay.show ? void(n._timeout = setTimeout(function () {
                        n._hoverState === d.SHOW && n.show()
                    }, n.config.delay.show)) : void n.show())
                }, a.prototype._leave = function (e, n) {
                    var i = this.constructor.DATA_KEY;
                    if (n = n || t(e.currentTarget).data(i), n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? g.FOCUS : g.HOVER] = !1), !n._isWithActiveTrigger()) {
                        if (clearTimeout(n._timeout), n._hoverState = d.OUT, !n.config.delay || !n.config.delay.hide)return void n.hide();
                        n._timeout = setTimeout(function () {
                            n._hoverState === d.OUT && n.hide()
                        }, n.config.delay.hide)
                    }
                }, a.prototype._isWithActiveTrigger = function () {
                    for (var t in this._activeTrigger)if (this._activeTrigger[t])return !0;
                    return !1
                }, a.prototype._getConfig = function (n) {
                    return n = t.extend({}, this.constructor.Default, t(this.element).data(), n), n.delay && "number" == typeof n.delay && (n.delay = {
                        show: n.delay,
                        hide: n.delay
                    }), s.typeCheckConfig(e, n, this.constructor.DefaultType), n
                }, a.prototype._getDelegateConfig = function () {
                    var t = {};
                    if (this.config)for (var e in this.config)this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                    return t
                }, a._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = t(this).data("bs.tooltip"), o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                        if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, o), t(this).data("bs.tooltip", n)), "string" == typeof e)) {
                            if (void 0 === n[e])throw new Error('No method named "' + e + '"');
                            n[e]()
                        }
                    })
                }, o(a, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return l
                    }
                }, {
                    key: "NAME", get: function () {
                        return e
                    }
                }, {
                    key: "DATA_KEY", get: function () {
                        return "bs.tooltip"
                    }
                }, {
                    key: "Event", get: function () {
                        return u
                    }
                }, {
                    key: "EVENT_KEY", get: function () {
                        return r
                    }
                }, {
                    key: "DefaultType", get: function () {
                        return h
                    }
                }]), a
            }();
        return t.fn[e] = v._jQueryInterface, t.fn[e].Constructor = v, t.fn[e].noConflict = function () {
            return t.fn[e] = a, v._jQueryInterface
        }, v
    }(jQuery));
    !function (s) {
        var a = "popover", l = ".bs.popover", h = s.fn[a], c = s.extend({}, r.Default, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }), d = s.extend({}, r.DefaultType, {content: "(string|element|function)"}), u = {FADE: "fade", SHOW: "show"},
            p = {TITLE: ".popover-title", CONTENT: ".popover-content"}, f = {
                HIDE: "hide" + l,
                HIDDEN: "hidden" + l,
                SHOW: "show" + l,
                SHOWN: "shown" + l,
                INSERTED: "inserted" + l,
                CLICK: "click" + l,
                FOCUSIN: "focusin" + l,
                FOCUSOUT: "focusout" + l,
                MOUSEENTER: "mouseenter" + l,
                MOUSELEAVE: "mouseleave" + l
            }, m = function (r) {
                function h() {
                    return n(this, h), t(this, r.apply(this, arguments))
                }

                return e(h, r), h.prototype.isWithContent = function () {
                    return this.getTitle() || this._getContent()
                }, h.prototype.getTipElement = function () {
                    return this.tip = this.tip || s(this.config.template)[0]
                }, h.prototype.setContent = function () {
                    var t = s(this.getTipElement());
                    this.setElementContent(t.find(p.TITLE), this.getTitle()), this.setElementContent(t.find(p.CONTENT), this._getContent()), t.removeClass(u.FADE + " " + u.SHOW), this.cleanupTether()
                }, h.prototype._getContent = function () {
                    return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
                }, h._jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = s(this).data("bs.popover"), n = "object" === (void 0 === t ? "undefined" : i(t)) ? t : null;
                        if ((e || !/destroy|hide/.test(t)) && (e || (e = new h(this, n), s(this).data("bs.popover", e)), "string" == typeof t)) {
                            if (void 0 === e[t])throw new Error('No method named "' + t + '"');
                            e[t]()
                        }
                    })
                }, o(h, null, [{
                    key: "VERSION", get: function () {
                        return "4.0.0-alpha.6"
                    }
                }, {
                    key: "Default", get: function () {
                        return c
                    }
                }, {
                    key: "NAME", get: function () {
                        return a
                    }
                }, {
                    key: "DATA_KEY", get: function () {
                        return "bs.popover"
                    }
                }, {
                    key: "Event", get: function () {
                        return f
                    }
                }, {
                    key: "EVENT_KEY", get: function () {
                        return l
                    }
                }, {
                    key: "DefaultType", get: function () {
                        return d
                    }
                }]), h
            }(r);
        s.fn[a] = m._jQueryInterface, s.fn[a].Constructor = m, s.fn[a].noConflict = function () {
            return s.fn[a] = h, m._jQueryInterface
        }
    }(jQuery)
}(), function (t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["jquery", "googlemaps!"], e) : t.GMaps = e()
}(this, function () {
    var t = function (t, e) {
        var n;
        if (t === e)return t;
        for (n in e)void 0 !== e[n] && (t[n] = e[n]);
        return t
    }, n = function (t, e) {
        var n, i = Array.prototype.slice.call(arguments, 2), o = [], s = t.length;
        if (Array.prototype.map && t.map === Array.prototype.map) o = Array.prototype.map.call(t, function (t) {
            var n = i.slice(0);
            return n.splice(0, 0, t), e.apply(this, n)
        }); else for (n = 0; n < s; n++)callback_params = i, callback_params.splice(0, 0, t[n]), o.push(e.apply(this, callback_params));
        return o
    }, i = function (t) {
        var e, n = [];
        for (e = 0; e < t.length; e++)n = n.concat(t[e]);
        return n
    }, o = function (t, e) {
        var n = t[0], i = t[1];
        return e && (n = t[1], i = t[0]), new google.maps.LatLng(n, i)
    }, s = function (t, e) {
        var n;
        for (n = 0; n < t.length; n++)t[n] instanceof google.maps.LatLng || (t[n].length > 0 && "object" == typeof t[n][0] ? t[n] = s(t[n], e) : t[n] = o(t[n], e));
        return t
    }, r = function (t, e) {
        var n = t.replace(".", "");
        return "jQuery" in this && e ? $("." + n, e)[0] : document.getElementsByClassName(n)[0]
    }, a = function (t, e) {
        var t = t.replace("#", "");
        return "jQuery" in window && e ? $("#" + t, e)[0] : document.getElementById(t)
    }, l = function (t) {
        var e = 0, n = 0;
        if (t.offsetParent)do {
            e += t.offsetLeft, n += t.offsetTop
        } while (t = t.offsetParent);
        return [e, n]
    }, h = function (e) {
        "use strict";
        var n = document, i = function (e) {
            if ("object" != typeof window.google || !window.google.maps)return "object" == typeof window.console && window.console.error && console.error("Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js."), function () {
            };
            if (!this)return new i(e);
            e.zoom = e.zoom || 15, e.mapType = e.mapType || "roadmap";
            var o, s = function (t, e) {
                    return void 0 === t ? e : t
                }, h = this,
                c = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "maptypeid_changed", "projection_changed", "resize", "tilesloaded", "zoom_changed"],
                d = ["mousemove", "mouseout", "mouseover"],
                u = ["el", "lat", "lng", "mapType", "width", "height", "markerClusterer", "enableNewStyle"],
                p = e.el || e.div, f = e.markerClusterer, m = google.maps.MapTypeId[e.mapType.toUpperCase()],
                g = new google.maps.LatLng(e.lat, e.lng), v = s(e.zoomControl, !0),
                y = e.zoomControlOpt || {style: "DEFAULT", position: "TOP_LEFT"}, w = y.style || "DEFAULT",
                _ = y.position || "TOP_LEFT", b = s(e.panControl, !0), T = s(e.mapTypeControl, !0),
                E = s(e.scaleControl, !0), C = s(e.streetViewControl, !0), z = s(z, !0), S = {},
                I = {zoom: this.zoom, center: g, mapTypeId: m}, O = {
                    panControl: b,
                    zoomControl: v,
                    zoomControlOptions: {style: google.maps.ZoomControlStyle[w], position: google.maps.ControlPosition[_]},
                    mapTypeControl: T,
                    scaleControl: E,
                    streetViewControl: C,
                    overviewMapControl: z
                };
            if ("string" == typeof e.el || "string" == typeof e.div ? p.indexOf("#") > -1 ? this.el = a(p, e.context) : this.el = r.apply(this, [p, e.context]) : this.el = p, void 0 === this.el || null === this.el)throw"No element defined.";
            for (window.context_menu = window.context_menu || {}, window.context_menu[h.el.id] = {}, this.controls = [], this.overlays = [], this.layers = [], this.singleLayers = {}, this.markers = [], this.polylines = [], this.routes = [], this.polygons = [], this.infoWindow = null, this.overlay_el = null, this.zoom = e.zoom, this.registered_events = {}, this.el.style.width = e.width || this.el.scrollWidth || this.el.offsetWidth, this.el.style.height = e.height || this.el.scrollHeight || this.el.offsetHeight, google.maps.visualRefresh = e.enableNewStyle, o = 0; o < u.length; o++)delete e[u[o]];
            for (1 != e.disableDefaultUI && (I = t(I, O)), S = t(I, e), o = 0; o < c.length; o++)delete S[c[o]];
            for (o = 0; o < d.length; o++)delete S[d[o]];
            this.map = new google.maps.Map(this.el, S), f && (this.markerClusterer = f.apply(this, [this.map]));
            var L = function (t, e) {
                var n = "", i = window.context_menu[h.el.id][t];
                for (var o in i)if (i.hasOwnProperty(o)) {
                    var s = i[o];
                    n += '<li><a id="' + t + "_" + o + '" href="#">' + s.title + "</a></li>"
                }
                if (a("gmaps_context_menu")) {
                    var r = a("gmaps_context_menu");
                    r.innerHTML = n;
                    var o, c = r.getElementsByTagName("a"), d = c.length;
                    for (o = 0; o < d; o++) {
                        var u = c[o], p = function (n) {
                            n.preventDefault(), i[this.id.replace(t + "_", "")].action.apply(h, [e]), h.hideContextMenu()
                        };
                        google.maps.event.clearListeners(u, "click"), google.maps.event.addDomListenerOnce(u, "click", p, !1)
                    }
                    var f = l.apply(this, [h.el]), m = f[0] + e.pixel.x - 15, g = f[1] + e.pixel.y - 15;
                    r.style.left = m + "px", r.style.top = g + "px"
                }
            };
            this.buildContextMenu = function (t, e) {
                if ("marker" === t) {
                    e.pixel = {};
                    var n = new google.maps.OverlayView;
                    n.setMap(h.map), n.draw = function () {
                        var i = n.getProjection(), o = e.marker.getPosition();
                        e.pixel = i.fromLatLngToContainerPixel(o), L(t, e)
                    }
                } else L(t, e);
                var i = a("gmaps_context_menu");
                setTimeout(function () {
                    i.style.display = "block"
                }, 0)
            }, this.setContextMenu = function (t) {
                window.context_menu[h.el.id][t.control] = {};
                var e, i = n.createElement("ul");
                for (e in t.options)if (t.options.hasOwnProperty(e)) {
                    var o = t.options[e];
                    window.context_menu[h.el.id][t.control][o.name] = {title: o.title, action: o.action}
                }
                i.id = "gmaps_context_menu", i.style.display = "none", i.style.position = "absolute", i.style.minWidth = "100px", i.style.background = "white", i.style.listStyle = "none", i.style.padding = "8px", i.style.boxShadow = "2px 2px 6px #ccc", a("gmaps_context_menu") || n.body.appendChild(i);
                var s = a("gmaps_context_menu");
                google.maps.event.addDomListener(s, "mouseout", function (t) {
                    t.relatedTarget && this.contains(t.relatedTarget) || window.setTimeout(function () {
                        s.style.display = "none"
                    }, 400)
                }, !1)
            }, this.hideContextMenu = function () {
                var t = a("gmaps_context_menu");
                t && (t.style.display = "none")
            };
            var x = function (t, n) {
                google.maps.event.addListener(t, n, function (t) {
                    void 0 == t && (t = this), e[n].apply(this, [t]), h.hideContextMenu()
                })
            };
            google.maps.event.addListener(this.map, "zoom_changed", this.hideContextMenu);
            for (var k = 0; k < c.length; k++) {
                var A = c[k];
                A in e && x(this.map, A)
            }
            for (var k = 0; k < d.length; k++) {
                var A = d[k];
                A in e && x(this.map, A)
            }
            google.maps.event.addListener(this.map, "rightclick", function (t) {
                e.rightclick && e.rightclick.apply(this, [t]), void 0 != window.context_menu[h.el.id].map && h.buildContextMenu("map", t)
            }), this.refresh = function () {
                google.maps.event.trigger(this.map, "resize")
            }, this.fitZoom = function () {
                var t, e = [], n = this.markers.length;
                for (t = 0; t < n; t++)"boolean" == typeof this.markers[t].visible && this.markers[t].visible && e.push(this.markers[t].getPosition());
                this.fitLatLngBounds(e)
            }, this.fitLatLngBounds = function (t) {
                var e, n = t.length, i = new google.maps.LatLngBounds;
                for (e = 0; e < n; e++)i.extend(t[e]);
                this.map.fitBounds(i)
            }, this.setCenter = function (t, e, n) {
                this.map.panTo(new google.maps.LatLng(t, e)), n && n()
            }, this.getElement = function () {
                return this.el
            }, this.zoomIn = function (t) {
                t = t || 1, this.zoom = this.map.getZoom() + t, this.map.setZoom(this.zoom)
            }, this.zoomOut = function (t) {
                t = t || 1, this.zoom = this.map.getZoom() - t, this.map.setZoom(this.zoom)
            };
            var W, D = [];
            for (W in this.map)"function" != typeof this.map[W] || this[W] || D.push(W);
            for (o = 0; o < D.length; o++)!function (t, e, n) {
                t[n] = function () {
                    return e[n].apply(e, arguments)
                }
            }(this, this.map, D[o])
        };
        return i
    }();
    h.prototype.createControl = function (t) {
        var e = document.createElement("div");
        e.style.cursor = "pointer", !0 !== t.disableDefaultStyles && (e.style.fontFamily = "Roboto, Arial, sans-serif", e.style.fontSize = "11px", e.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px");
        for (var n in t.style)e.style[n] = t.style[n];
        t.id && (e.id = t.id), t.title && (e.title = t.title), t.classes && (e.className = t.classes), t.content && ("string" == typeof t.content ? e.innerHTML = t.content : t.content instanceof HTMLElement && e.appendChild(t.content)), t.position && (e.position = google.maps.ControlPosition[t.position.toUpperCase()]);
        for (var i in t.events)!function (e, n) {
            google.maps.event.addDomListener(e, n, function () {
                t.events[n].apply(this, [this])
            })
        }(e, i);
        return e.index = 1, e
    }, h.prototype.addControl = function (t) {
        var e = this.createControl(t);
        return this.controls.push(e), this.map.controls[e.position].push(e), e
    }, h.prototype.removeControl = function (t) {
        var e, n = null;
        for (e = 0; e < this.controls.length; e++)this.controls[e] == t && (n = this.controls[e].position, this.controls.splice(e, 1));
        if (n)for (e = 0; e < this.map.controls.length; e++) {
            var i = this.map.controls[t.position];
            if (i.getAt(e) == t) {
                i.removeAt(e);
                break
            }
        }
        return t
    }, h.prototype.createMarker = function (e) {
        if (void 0 == e.lat && void 0 == e.lng && void 0 == e.position)throw"No latitude or longitude defined.";
        var n = this, i = e.details, o = e.fences, s = e.outside,
            r = {position: new google.maps.LatLng(e.lat, e.lng), map: null}, a = t(r, e);
        delete a.lat, delete a.lng, delete a.fences, delete a.outside;
        var l = new google.maps.Marker(a);
        if (l.fences = o, e.infoWindow) {
            l.infoWindow = new google.maps.InfoWindow(e.infoWindow);
            for (var h = ["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"], c = 0; c < h.length; c++)!function (t, n) {
                e.infoWindow[n] && google.maps.event.addListener(t, n, function (t) {
                    e.infoWindow[n].apply(this, [t])
                })
            }(l.infoWindow, h[c])
        }
        for (var d = ["animation_changed", "clickable_changed", "cursor_changed", "draggable_changed", "flat_changed", "icon_changed", "position_changed", "shadow_changed", "shape_changed", "title_changed", "visible_changed", "zindex_changed"], u = ["dblclick", "drag", "dragend", "dragstart", "mousedown", "mouseout", "mouseover", "mouseup"], c = 0; c < d.length; c++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function () {
                e[n].apply(this, [this])
            })
        }(l, d[c]);
        for (var c = 0; c < u.length; c++)!function (t, n, i) {
            e[i] && google.maps.event.addListener(n, i, function (n) {
                n.pixel || (n.pixel = t.getProjection().fromLatLngToPoint(n.latLng)), e[i].apply(this, [n])
            })
        }(this.map, l, u[c]);
        return google.maps.event.addListener(l, "click", function () {
            this.details = i, e.click && e.click.apply(this, [this]), l.infoWindow && (n.hideInfoWindows(), l.infoWindow.open(n.map, l))
        }), google.maps.event.addListener(l, "rightclick", function (t) {
            t.marker = this, e.rightclick && e.rightclick.apply(this, [t]), void 0 != window.context_menu[n.el.id].marker && n.buildContextMenu("marker", t)
        }), l.fences && google.maps.event.addListener(l, "dragend", function () {
            n.checkMarkerGeofence(l, function (t, e) {
                s(t, e)
            })
        }), l
    }, h.prototype.addMarker = function (t) {
        var e;
        if (t.hasOwnProperty("gm_accessors_")) e = t; else {
            if (!(t.hasOwnProperty("lat") && t.hasOwnProperty("lng") || t.position))throw"No latitude or longitude defined.";
            e = this.createMarker(t)
        }
        return e.setMap(this.map), this.markerClusterer && this.markerClusterer.addMarker(e), this.markers.push(e), h.fire("marker_added", e, this), e
    }, h.prototype.addMarkers = function (t) {
        for (var e, n = 0; e = t[n]; n++)this.addMarker(e);
        return this.markers
    }, h.prototype.hideInfoWindows = function () {
        for (var t, e = 0; t = this.markers[e]; e++)t.infoWindow && t.infoWindow.close()
    }, h.prototype.removeMarker = function (t) {
        for (var e = 0; e < this.markers.length; e++)if (this.markers[e] === t) {
            this.markers[e].setMap(null), this.markers.splice(e, 1), this.markerClusterer && this.markerClusterer.removeMarker(t), h.fire("marker_removed", t, this);
            break
        }
        return t
    }, h.prototype.removeMarkers = function (t) {
        var e = [];
        if (void 0 === t) {
            for (var n = 0; n < this.markers.length; n++) {
                var i = this.markers[n];
                i.setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(i), h.fire("marker_removed", i, this)
            }
            this.markers = e
        } else {
            for (var n = 0; n < t.length; n++) {
                var o = this.markers.indexOf(t[n]);
                if (o > -1) {
                    var i = this.markers[o];
                    i.setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(i), h.fire("marker_removed", i, this)
                }
            }
            for (var n = 0; n < this.markers.length; n++) {
                var i = this.markers[n];
                null != i.getMap() && e.push(i)
            }
            this.markers = e
        }
    }, h.prototype.drawOverlay = function (t) {
        var e = new google.maps.OverlayView, n = !0;
        return e.setMap(this.map), null != t.auto_show && (n = t.auto_show), e.onAdd = function () {
            var n = document.createElement("div");
            n.style.borderStyle = "none", n.style.borderWidth = "0px", n.style.position = "absolute", n.style.zIndex = 100, n.innerHTML = t.content, e.el = n, t.layer || (t.layer = "overlayLayer");
            var i = this.getPanes(), o = i[t.layer], s = ["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
            o.appendChild(n);
            for (var r = 0; r < s.length; r++)!function (t, e) {
                google.maps.event.addDomListener(t, e, function (t) {
                    -1 != navigator.userAgent.toLowerCase().indexOf("msie") && document.all ? (t.cancelBubble = !0, t.returnValue = !1) : t.stopPropagation()
                })
            }(n, s[r]);
            t.click && (i.overlayMouseTarget.appendChild(e.el), google.maps.event.addDomListener(e.el, "click", function () {
                t.click.apply(e, [e])
            })), google.maps.event.trigger(this, "ready")
        }, e.draw = function () {
            var i = this.getProjection(), o = i.fromLatLngToDivPixel(new google.maps.LatLng(t.lat, t.lng));
            t.horizontalOffset = t.horizontalOffset || 0, t.verticalOffset = t.verticalOffset || 0;
            var s = e.el, r = s.children[0], a = r.clientHeight, l = r.clientWidth;
            switch (t.verticalAlign) {
                case"top":
                    s.style.top = o.y - a + t.verticalOffset + "px";
                    break;
                default:
                case"middle":
                    s.style.top = o.y - a / 2 + t.verticalOffset + "px";
                    break;
                case"bottom":
                    s.style.top = o.y + t.verticalOffset + "px"
            }
            switch (t.horizontalAlign) {
                case"left":
                    s.style.left = o.x - l + t.horizontalOffset + "px";
                    break;
                default:
                case"center":
                    s.style.left = o.x - l / 2 + t.horizontalOffset + "px";
                    break;
                case"right":
                    s.style.left = o.x + t.horizontalOffset + "px"
            }
            s.style.display = n ? "block" : "none", n || t.show.apply(this, [s])
        }, e.onRemove = function () {
            var n = e.el;
            t.remove ? t.remove.apply(this, [n]) : (e.el.parentNode.removeChild(e.el), e.el = null)
        }, this.overlays.push(e), e
    }, h.prototype.removeOverlay = function (t) {
        for (var e = 0; e < this.overlays.length; e++)if (this.overlays[e] === t) {
            this.overlays[e].setMap(null), this.overlays.splice(e, 1);
            break
        }
    }, h.prototype.removeOverlays = function () {
        for (var t, e = 0; t = this.overlays[e]; e++)t.setMap(null);
        this.overlays = []
    }, h.prototype.drawPolyline = function (t) {
        var e = [], n = t.path;
        if (n.length)if (void 0 === n[0][0]) e = n; else for (var i, o = 0; i = n[o]; o++)e.push(new google.maps.LatLng(i[0], i[1]));
        var s = {
            map: this.map,
            path: e,
            strokeColor: t.strokeColor,
            strokeOpacity: t.strokeOpacity,
            strokeWeight: t.strokeWeight,
            geodesic: t.geodesic,
            clickable: !0,
            editable: !1,
            visible: !0
        };
        t.hasOwnProperty("clickable") && (s.clickable = t.clickable), t.hasOwnProperty("editable") && (s.editable = t.editable), t.hasOwnProperty("icons") && (s.icons = t.icons), t.hasOwnProperty("zIndex") && (s.zIndex = t.zIndex);
        for (var r = new google.maps.Polyline(s), a = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l = 0; l < a.length; l++)!function (e, n) {
            t[n] && google.maps.event.addListener(e, n, function (e) {
                t[n].apply(this, [e])
            })
        }(r, a[l]);
        return this.polylines.push(r), h.fire("polyline_added", r, this), r
    }, h.prototype.removePolyline = function (t) {
        for (var e = 0; e < this.polylines.length; e++)if (this.polylines[e] === t) {
            this.polylines[e].setMap(null), this.polylines.splice(e, 1), h.fire("polyline_removed", t, this);
            break
        }
    }, h.prototype.removePolylines = function () {
        for (var t, e = 0; t = this.polylines[e]; e++)t.setMap(null);
        this.polylines = []
    }, h.prototype.drawCircle = function (e) {
        e = t({map: this.map, center: new google.maps.LatLng(e.lat, e.lng)}, e), delete e.lat, delete e.lng;
        for (var n = new google.maps.Circle(e), i = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], o = 0; o < i.length; o++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(n, i[o]);
        return this.polygons.push(n), n
    }, h.prototype.drawRectangle = function (e) {
        e = t({map: this.map}, e);
        var n = new google.maps.LatLngBounds(new google.maps.LatLng(e.bounds[0][0], e.bounds[0][1]), new google.maps.LatLng(e.bounds[1][0], e.bounds[1][1]));
        e.bounds = n;
        for (var i = new google.maps.Rectangle(e), o = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], s = 0; s < o.length; s++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(i, o[s]);
        return this.polygons.push(i), i
    }, h.prototype.drawPolygon = function (e) {
        var o = !1;
        e.hasOwnProperty("useGeoJSON") && (o = e.useGeoJSON), delete e.useGeoJSON, e = t({map: this.map}, e), 0 == o && (e.paths = [e.paths.slice(0)]), e.paths.length > 0 && e.paths[0].length > 0 && (e.paths = i(n(e.paths, s, o)));
        for (var r = new google.maps.Polygon(e), a = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l = 0; l < a.length; l++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(r, a[l]);
        return this.polygons.push(r), h.fire("polygon_added", r, this), r
    }, h.prototype.removePolygon = function (t) {
        for (var e = 0; e < this.polygons.length; e++)if (this.polygons[e] === t) {
            this.polygons[e].setMap(null), this.polygons.splice(e, 1), h.fire("polygon_removed", t, this);
            break
        }
    }, h.prototype.removePolygons = function () {
        for (var t, e = 0; t = this.polygons[e]; e++)t.setMap(null);
        this.polygons = []
    }, h.prototype.getFromFusionTables = function (t) {
        var e = t.events;
        delete t.events;
        var n = t, i = new google.maps.FusionTablesLayer(n);
        for (var o in e)!function (t, n) {
            google.maps.event.addListener(t, n, function (t) {
                e[n].apply(this, [t])
            })
        }(i, o);
        return this.layers.push(i), i
    }, h.prototype.loadFromFusionTables = function (t) {
        var e = this.getFromFusionTables(t);
        return e.setMap(this.map), e
    }, h.prototype.getFromKML = function (t) {
        var e = t.url, n = t.events;
        delete t.url, delete t.events;
        var i = t, o = new google.maps.KmlLayer(e, i);
        for (var s in n)!function (t, e) {
            google.maps.event.addListener(t, e, function (t) {
                n[e].apply(this, [t])
            })
        }(o, s);
        return this.layers.push(o), o
    }, h.prototype.loadFromKML = function (t) {
        var e = this.getFromKML(t);
        return e.setMap(this.map), e
    }, h.prototype.addLayer = function (t, e) {
        e = e || {};
        var n;
        switch (t) {
            case"weather":
                this.singleLayers.weather = n = new google.maps.weather.WeatherLayer;
                break;
            case"clouds":
                this.singleLayers.clouds = n = new google.maps.weather.CloudLayer;
                break;
            case"traffic":
                this.singleLayers.traffic = n = new google.maps.TrafficLayer;
                break;
            case"transit":
                this.singleLayers.transit = n = new google.maps.TransitLayer;
                break;
            case"bicycling":
                this.singleLayers.bicycling = n = new google.maps.BicyclingLayer;
                break;
            case"panoramio":
                this.singleLayers.panoramio = n = new google.maps.panoramio.PanoramioLayer, n.setTag(e.filter), delete e.filter, e.click && google.maps.event.addListener(n, "click", function (t) {
                    e.click(t), delete e.click
                });
                break;
            case"places":
                if (this.singleLayers.places = n = new google.maps.places.PlacesService(this.map), e.search || e.nearbySearch || e.radarSearch) {
                    var i = {
                        bounds: e.bounds || null, keyword: e.keyword || null, location: e.location || null,
                        name: e.name || null, radius: e.radius || null, rankBy: e.rankBy || null, types: e.types || null
                    };
                    e.radarSearch && n.radarSearch(i, e.radarSearch), e.search && n.search(i, e.search), e.nearbySearch && n.nearbySearch(i, e.nearbySearch)
                }
                if (e.textSearch) {
                    var o = {
                        bounds: e.bounds || null,
                        location: e.location || null,
                        query: e.query || null,
                        radius: e.radius || null
                    };
                    n.textSearch(o, e.textSearch)
                }
        }
        if (void 0 !== n)return "function" == typeof n.setOptions && n.setOptions(e), "function" == typeof n.setMap && n.setMap(this.map), n
    }, h.prototype.removeLayer = function (t) {
        if ("string" == typeof t && void 0 !== this.singleLayers[t]) this.singleLayers[t].setMap(null), delete this.singleLayers[t]; else for (var e = 0; e < this.layers.length; e++)if (this.layers[e] === t) {
            this.layers[e].setMap(null), this.layers.splice(e, 1);
            break
        }
    };
    var c, d;
    return h.prototype.getRoutes = function (e) {
        switch (e.travelMode) {
            case"bicycling":
                c = google.maps.TravelMode.BICYCLING;
                break;
            case"transit":
                c = google.maps.TravelMode.TRANSIT;
                break;
            case"driving":
                c = google.maps.TravelMode.DRIVING;
                break;
            default:
                c = google.maps.TravelMode.WALKING
        }
        d = "imperial" === e.unitSystem ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC;
        var n = {avoidHighways: !1, avoidTolls: !1, optimizeWaypoints: !1, waypoints: []}, i = t(n, e);
        i.origin = /string/.test(typeof e.origin) ? e.origin : new google.maps.LatLng(e.origin[0], e.origin[1]), i.destination = /string/.test(typeof e.destination) ? e.destination : new google.maps.LatLng(e.destination[0], e.destination[1]), i.travelMode = c, i.unitSystem = d, delete i.callback, delete i.error;
        var o = this;
        (new google.maps.DirectionsService).route(i, function (t, n) {
            if (n === google.maps.DirectionsStatus.OK) {
                for (var i in t.routes)t.routes.hasOwnProperty(i) && o.routes.push(t.routes[i]);
                e.callback && e.callback(o.routes, t, n)
            } else e.error && e.error(t, n)
        })
    }, h.prototype.removeRoutes = function () {
        this.routes.length = 0
    }, h.prototype.getElevations = function (e) {
        e = t({
            locations: [],
            path: !1,
            samples: 256
        }, e), e.locations.length > 0 && e.locations[0].length > 0 && (e.locations = i(n([e.locations], s, !1)));
        var o = e.callback;
        delete e.callback;
        var r = new google.maps.ElevationService;
        if (e.path) {
            var a = {path: e.locations, samples: e.samples};
            r.getElevationAlongPath(a, function (t, e) {
                o && "function" == typeof o && o(t, e)
            })
        } else delete e.path, delete e.samples, r.getElevationForLocations(e, function (t, e) {
            o && "function" == typeof o && o(t, e)
        })
    }, h.prototype.cleanRoute = h.prototype.removePolylines, h.prototype.renderRoute = function (e, n) {
        var i, o = "string" == typeof n.panel ? document.getElementById(n.panel.replace("#", "")) : n.panel;
        n.panel = o, n = t({map: this.map}, n), i = new google.maps.DirectionsRenderer(n), this.getRoutes({
            origin: e.origin,
            destination: e.destination,
            travelMode: e.travelMode,
            waypoints: e.waypoints,
            unitSystem: e.unitSystem,
            error: e.error,
            avoidHighways: e.avoidHighways,
            avoidTolls: e.avoidTolls,
            optimizeWaypoints: e.optimizeWaypoints,
            callback: function (t, e, n) {
                n === google.maps.DirectionsStatus.OK && i.setDirections(e)
            }
        })
    }, h.prototype.drawRoute = function (t) {
        var e = this;
        this.getRoutes({
            origin: t.origin,
            destination: t.destination,
            travelMode: t.travelMode,
            waypoints: t.waypoints,
            unitSystem: t.unitSystem,
            error: t.error,
            avoidHighways: t.avoidHighways,
            avoidTolls: t.avoidTolls,
            optimizeWaypoints: t.optimizeWaypoints,
            callback: function (n) {
                if (n.length > 0) {
                    var i = {
                        path: n[n.length - 1].overview_path,
                        strokeColor: t.strokeColor,
                        strokeOpacity: t.strokeOpacity,
                        strokeWeight: t.strokeWeight
                    };
                    t.hasOwnProperty("icons") && (i.icons = t.icons), e.drawPolyline(i), t.callback && t.callback(n[n.length - 1])
                }
            }
        })
    }, h.prototype.travelRoute = function (t) {
        if (t.origin && t.destination) this.getRoutes({
            origin: t.origin,
            destination: t.destination,
            travelMode: t.travelMode,
            waypoints: t.waypoints,
            unitSystem: t.unitSystem,
            error: t.error,
            callback: function (e) {
                if (e.length > 0 && t.start && t.start(e[e.length - 1]), e.length > 0 && t.step) {
                    var n = e[e.length - 1];
                    if (n.legs.length > 0)for (var i, o = n.legs[0].steps, s = 0; i = o[s]; s++)i.step_number = s, t.step(i, n.legs[0].steps.length - 1)
                }
                e.length > 0 && t.end && t.end(e[e.length - 1])
            }
        }); else if (t.route && t.route.legs.length > 0)for (var e, n = t.route.legs[0].steps, i = 0; e = n[i]; i++)e.step_number = i, t.step(e)
    }, h.prototype.drawSteppedRoute = function (t) {
        var e = this;
        if (t.origin && t.destination) this.getRoutes({
            origin: t.origin,
            destination: t.destination,
            travelMode: t.travelMode,
            waypoints: t.waypoints,
            error: t.error,
            callback: function (n) {
                if (n.length > 0 && t.start && t.start(n[n.length - 1]), n.length > 0 && t.step) {
                    var i = n[n.length - 1];
                    if (i.legs.length > 0)for (var o, s = i.legs[0].steps, r = 0; o = s[r]; r++) {
                        o.step_number = r;
                        var a = {
                            path: o.path,
                            strokeColor: t.strokeColor,
                            strokeOpacity: t.strokeOpacity,
                            strokeWeight: t.strokeWeight
                        };
                        t.hasOwnProperty("icons") && (a.icons = t.icons), e.drawPolyline(a), t.step(o, i.legs[0].steps.length - 1)
                    }
                }
                n.length > 0 && t.end && t.end(n[n.length - 1])
            }
        }); else if (t.route && t.route.legs.length > 0)for (var n, i = t.route.legs[0].steps, o = 0; n = i[o]; o++) {
            n.step_number = o;
            var s = {
                path: n.path,
                strokeColor: t.strokeColor,
                strokeOpacity: t.strokeOpacity,
                strokeWeight: t.strokeWeight
            };
            t.hasOwnProperty("icons") && (s.icons = t.icons), e.drawPolyline(s), t.step(n)
        }
    }, h.Route = function (t) {
        this.origin = t.origin, this.destination = t.destination, this.waypoints = t.waypoints, this.map = t.map, this.route = t.route, this.step_count = 0, this.steps = this.route.legs[0].steps, this.steps_length = this.steps.length;
        var e = {
            path: new google.maps.MVCArray,
            strokeColor: t.strokeColor,
            strokeOpacity: t.strokeOpacity,
            strokeWeight: t.strokeWeight
        };
        t.hasOwnProperty("icons") && (e.icons = t.icons), this.polyline = this.map.drawPolyline(e).getPath()
    }, h.Route.prototype.getRoute = function (t) {
        var n = this;
        this.map.getRoutes({
            origin: this.origin,
            destination: this.destination,
            travelMode: t.travelMode,
            waypoints: this.waypoints || [],
            error: t.error,
            callback: function () {
                n.route = e[0], t.callback && t.callback.call(n)
            }
        })
    }, h.Route.prototype.back = function () {
        if (this.step_count > 0) {
            this.step_count--;
            var t = this.route.legs[0].steps[this.step_count].path;
            for (var e in t)t.hasOwnProperty(e) && this.polyline.pop()
        }
    }, h.Route.prototype.forward = function () {
        if (this.step_count < this.steps_length) {
            var t = this.route.legs[0].steps[this.step_count].path;
            for (var e in t)t.hasOwnProperty(e) && this.polyline.push(t[e]);
            this.step_count++
        }
    }, h.prototype.checkGeofence = function (t, e, n) {
        return n.containsLatLng(new google.maps.LatLng(t, e))
    }, h.prototype.checkMarkerGeofence = function (t, e) {
        if (t.fences)for (var n, i = 0; n = t.fences[i]; i++) {
            var o = t.getPosition();
            this.checkGeofence(o.lat(), o.lng(), n) || e(t, n)
        }
    }, h.prototype.toImage = function (t) {
        var t = t || {}, e = {};
        if (e.size = t.size || [this.el.clientWidth, this.el.clientHeight], e.lat = this.getCenter().lat(), e.lng = this.getCenter().lng(), this.markers.length > 0) {
            e.markers = [];
            for (var n = 0; n < this.markers.length; n++)e.markers.push({
                lat: this.markers[n].getPosition().lat(),
                lng: this.markers[n].getPosition().lng()
            })
        }
        if (this.polylines.length > 0) {
            var i = this.polylines[0];
            e.polyline = {}, e.polyline.path = google.maps.geometry.encoding.encodePath(i.getPath()), e.polyline.strokeColor = i.strokeColor, e.polyline.strokeOpacity = i.strokeOpacity, e.polyline.strokeWeight = i.strokeWeight
        }
        return h.staticMapURL(e)
    }, h.staticMapURL = function (t) {
        function e(t, e) {
            if ("#" === t[0] && (t = t.replace("#", "0x"), e)) {
                if (e = parseFloat(e), 0 === (e = Math.min(1, Math.max(e, 0))))return "0x00000000";
                e = (255 * e).toString(16), 1 === e.length && (e += e), t = t.slice(0, 8) + e
            }
            return t
        }

        var n, i = [],
            o = ("file:" === location.protocol ? "http:" : location.protocol) + "//maps.googleapis.com/maps/api/staticmap";
        t.url && (o = t.url, delete t.url), o += "?";
        var s = t.markers;
        delete t.markers, !s && t.marker && (s = [t.marker], delete t.marker);
        var r = t.styles;
        delete t.styles;
        var a = t.polyline;
        if (delete t.polyline, t.center) i.push("center=" + t.center), delete t.center; else if (t.address) i.push("center=" + t.address), delete t.address; else if (t.lat) i.push(["center=", t.lat, ",", t.lng].join("")), delete t.lat, delete t.lng; else if (t.visible) {
            var l = encodeURI(t.visible.join("|"));
            i.push("visible=" + l)
        }
        var h = t.size;
        h ? (h.join && (h = h.join("x")), delete t.size) : h = "630x300", i.push("size=" + h), t.zoom || !1 === t.zoom || (t.zoom = 15);
        var c = !t.hasOwnProperty("sensor") || !!t.sensor;
        delete t.sensor, i.push("sensor=" + c);
        for (var d in t)t.hasOwnProperty(d) && i.push(d + "=" + t[d]);
        if (s)for (var u, p, f = 0; n = s[f]; f++) {
            u = [], n.size && "normal" !== n.size ? (u.push("size:" + n.size), delete n.size) : n.icon && (u.push("icon:" + encodeURI(n.icon)), delete n.icon), n.color && (u.push("color:" + n.color.replace("#", "0x")), delete n.color), n.label && (u.push("label:" + n.label[0].toUpperCase()), delete n.label), p = n.address ? n.address : n.lat + "," + n.lng, delete n.address, delete n.lat, delete n.lng;
            for (var d in n)n.hasOwnProperty(d) && u.push(d + ":" + n[d]);
            u.length || 0 === f ? (u.push(p), u = u.join("|"), i.push("markers=" + encodeURI(u))) : (u = i.pop() + encodeURI("|" + p), i.push(u))
        }
        if (r)for (var f = 0; f < r.length; f++) {
            var m = [];
            r[f].featureType && m.push("feature:" + r[f].featureType.toLowerCase()), r[f].elementType && m.push("element:" + r[f].elementType.toLowerCase());
            for (var g = 0; g < r[f].stylers.length; g++)for (var v in r[f].stylers[g]) {
                var y = r[f].stylers[g][v];
                "hue" != v && "color" != v || (y = "0x" + y.substring(1)), m.push(v + ":" + y)
            }
            var w = m.join("|");
            "" != w && i.push("style=" + w)
        }
        if (a) {
            if (n = a, a = [], n.strokeWeight && a.push("weight:" + parseInt(n.strokeWeight, 10)), n.strokeColor) {
                var _ = e(n.strokeColor, n.strokeOpacity);
                a.push("color:" + _)
            }
            if (n.fillColor) {
                var b = e(n.fillColor, n.fillOpacity);
                a.push("fillcolor:" + b)
            }
            var T = n.path;
            if (T.join)for (var E, g = 0; E = T[g]; g++)a.push(E.join(",")); else a.push("enc:" + T);
            a = a.join("|"), i.push("path=" + encodeURI(a))
        }
        var C = window.devicePixelRatio || 1;
        return i.push("scale=" + C), i = i.join("&"), o + i
    }, h.prototype.addMapType = function (t, e) {
        if (!e.hasOwnProperty("getTileUrl") || "function" != typeof e.getTileUrl)throw"'getTileUrl' function required.";
        e.tileSize = e.tileSize || new google.maps.Size(256, 256);
        var n = new google.maps.ImageMapType(e);
        this.map.mapTypes.set(t, n)
    }, h.prototype.addOverlayMapType = function (t) {
        if (!t.hasOwnProperty("getTile") || "function" != typeof t.getTile)throw"'getTile' function required.";
        var e = t.index;
        delete t.index, this.map.overlayMapTypes.insertAt(e, t)
    }, h.prototype.removeOverlayMapType = function (t) {
        this.map.overlayMapTypes.removeAt(t)
    }, h.prototype.addStyle = function (t) {
        var e = new google.maps.StyledMapType(t.styles, {name: t.styledMapName});
        this.map.mapTypes.set(t.mapTypeId, e)
    }, h.prototype.setStyle = function (t) {
        this.map.setMapTypeId(t)
    }, h.prototype.createPanorama = function (t) {
        return t.hasOwnProperty("lat") && t.hasOwnProperty("lng") || (t.lat = this.getCenter().lat(), t.lng = this.getCenter().lng()), this.panorama = h.createPanorama(t), this.map.setStreetView(this.panorama), this.panorama
    }, h.createPanorama = function (e) {
        var n = a(e.el, e.context);
        e.position = new google.maps.LatLng(e.lat, e.lng), delete e.el, delete e.context, delete e.lat, delete e.lng;
        for (var i = ["closeclick", "links_changed", "pano_changed", "position_changed", "pov_changed", "resize", "visible_changed"], o = t({visible: !0}, e), s = 0; s < i.length; s++)delete o[i[s]];
        for (var r = new google.maps.StreetViewPanorama(n, o), s = 0; s < i.length; s++)!function (t, n) {
            e[n] && google.maps.event.addListener(t, n, function () {
                e[n].apply(this)
            })
        }(r, i[s]);
        return r
    }, h.prototype.on = function (t, e) {
        return h.on(t, this, e)
    }, h.prototype.off = function (t) {
        h.off(t, this)
    }, h.prototype.once = function (t, e) {
        return h.once(t, this, e)
    }, h.custom_events = ["marker_added", "marker_removed", "polyline_added", "polyline_removed", "polygon_added", "polygon_removed", "geolocated", "geolocation_failed"], h.on = function (t, e, n) {
        if (-1 == h.custom_events.indexOf(t))return e instanceof h && (e = e.map), google.maps.event.addListener(e, t, n);
        var i = {handler: n, eventName: t};
        return e.registered_events[t] = e.registered_events[t] || [], e.registered_events[t].push(i), i
    }, h.off = function (t, e) {
        -1 == h.custom_events.indexOf(t) ? (e instanceof h && (e = e.map), google.maps.event.clearListeners(e, t)) : e.registered_events[t] = []
    }, h.once = function (t, e, n) {
        if (-1 == h.custom_events.indexOf(t))return e instanceof h && (e = e.map), google.maps.event.addListenerOnce(e, t, n)
    }, h.fire = function (t, e, n) {
        if (-1 == h.custom_events.indexOf(t)) google.maps.event.trigger(e, t, Array.prototype.slice.apply(arguments).slice(2)); else if (t in n.registered_events)for (var i = n.registered_events[t], o = 0; o < i.length; o++)!function (t, e, n) {
            t.apply(e, [n])
        }(i[o].handler, n, e)
    }, h.geolocate = function (t) {
        var e = t.always || t.complete;
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(function (n) {
            t.success(n), e && e()
        }, function (n) {
            t.error(n), e && e()
        }, t.options) : (t.not_supported(), e && e())
    }, h.geocode = function (t) {
        this.geocoder = new google.maps.Geocoder;
        var e = t.callback;
        t.hasOwnProperty("lat") && t.hasOwnProperty("lng") && (t.latLng = new google.maps.LatLng(t.lat, t.lng)), delete t.lat, delete t.lng, delete t.callback, this.geocoder.geocode(t, function (t, n) {
            e(t, n)
        })
    }, "object" == typeof window.google && window.google.maps && (google.maps.Polygon.prototype.getBounds || (google.maps.Polygon.prototype.getBounds = function (t) {
        for (var e, n = new google.maps.LatLngBounds, i = this.getPaths(), o = 0; o < i.getLength(); o++) {
            e = i.getAt(o);
            for (var s = 0; s < e.getLength(); s++)n.extend(e.getAt(s))
        }
        return n
    }), google.maps.Polygon.prototype.containsLatLng || (google.maps.Polygon.prototype.containsLatLng = function (t) {
        var e = this.getBounds();
        if (null !== e && !e.contains(t))return !1;
        for (var n = !1, i = this.getPaths().getLength(), o = 0; o < i; o++)for (var s = this.getPaths().getAt(o), r = s.getLength(), a = r - 1, l = 0; l < r; l++) {
            var h = s.getAt(l), c = s.getAt(a);
            (h.lng() < t.lng() && c.lng() >= t.lng() || c.lng() < t.lng() && h.lng() >= t.lng()) && h.lat() + (t.lng() - h.lng()) / (c.lng() - h.lng()) * (c.lat() - h.lat()) < t.lat() && (n = !n), a = l
        }
        return n
    }), google.maps.Circle.prototype.containsLatLng || (google.maps.Circle.prototype.containsLatLng = function (t) {
        return !google.maps.geometry || google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), t) <= this.getRadius()
    }), google.maps.LatLngBounds.prototype.containsLatLng = function (t) {
        return this.contains(t)
    }, google.maps.Marker.prototype.setFences = function (t) {
        this.fences = t
    }, google.maps.Marker.prototype.addFence = function (t) {
        this.fences.push(t)
    }, google.maps.Marker.prototype.getId = function () {
        return this.__gm_id
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
        "use strict";
        if (null == this)throw new TypeError;
        var e = Object(this), n = e.length >>> 0;
        if (0 === n)return -1;
        var i = 0;
        if (arguments.length > 1 && (i = Number(arguments[1]), i != i ? i = 0 : 0 != i && i != 1 / 0 && i != -1 / 0 && (i = (i > 0 || -1) * Math.floor(Math.abs(i)))), i >= n)return -1;
        for (var o = i >= 0 ? i : Math.max(n - Math.abs(i), 0); o < n; o++)if (o in e && e[o] === t)return o;
        return -1
    }), h
}), function () {
    function t() {
    }

    function e(t, e) {
        for (var n = t.length; n--;)if (t[n].listener === e)return n;
        return -1
    }

    function n(t) {
        return function () {
            return this[t].apply(this, arguments)
        }
    }

    var i = t.prototype, o = this, s = o.EventEmitter;
    i.getListeners = function (t) {
        var e, n, i = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (n in i)i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        } else e = i[t] || (i[t] = []);
        return e
    }, i.flattenListeners = function (t) {
        var e, n = [];
        for (e = 0; e < t.length; e += 1)n.push(t[e].listener);
        return n
    }, i.getListenersAsObject = function (t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function (t, n) {
        var i, o = this.getListenersAsObject(t), s = "object" == typeof n;
        for (i in o)o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(s ? n : {listener: n, once: !1});
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (t, e) {
        return this.addListener(t, {listener: e, once: !0})
    }, i.once = n("addOnceListener"), i.defineEvent = function (t) {
        return this.getListeners(t), this
    }, i.defineEvents = function (t) {
        for (var e = 0; e < t.length; e += 1)this.defineEvent(t[e]);
        return this
    }, i.removeListener = function (t, n) {
        var i, o, s = this.getListenersAsObject(t);
        for (o in s)s.hasOwnProperty(o) && -1 !== (i = e(s[o], n)) && s[o].splice(i, 1);
        return this
    }, i.off = n("removeListener"), i.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function (t, e, n) {
        var i, o, s = t ? this.removeListener : this.addListener, r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)for (i = n.length; i--;)s.call(this, e, n[i]); else for (i in e)e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? s.call(this, i, o) : r.call(this, i, o));
        return this
    }, i.removeEvent = function (t) {
        var e, n = typeof t, i = this._getEvents();
        if ("string" === n) delete i[t]; else if ("object" === n)for (e in i)i.hasOwnProperty(e) && t.test(e) && delete i[e]; else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (t, e) {
        var n, i, o, s = this.getListenersAsObject(t);
        for (o in s)if (s.hasOwnProperty(o))for (i = s[o].length; i--;)n = s[o][i], !0 === n.once && this.removeListener(t, n.listener), n.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function (t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function () {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, t.noConflict = function () {
        return o.EventEmitter = s, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this), function (t) {
    function e(e) {
        var n = t.event;
        return n.target = n.target || n.srcElement || e, n
    }

    var n = document.documentElement, i = function () {
    };
    n.addEventListener ? i = function (t, e, n) {
        t.addEventListener(e, n, !1)
    } : n.attachEvent && (i = function (t, n, i) {
            t[n + i] = i.handleEvent ? function () {
                var n = e(t);
                i.handleEvent.call(i, n)
            } : function () {
                var n = e(t);
                i.call(t, n)
            }, t.attachEvent("on" + n, t[n + i])
        });
    var o = function () {
    };
    n.removeEventListener ? o = function (t, e, n) {
        t.removeEventListener(e, n, !1)
    } : n.detachEvent && (o = function (t, e, n) {
            t.detachEvent("on" + e, t[e + n]);
            try {
                delete t[e + n]
            } catch (i) {
                t[e + n] = void 0
            }
        });
    var s = {bind: i, unbind: o};
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : t.eventie = s
}(this), function (t) {
    function e(t, e) {
        for (var n in e)t[n] = e[n];
        return t
    }

    function n(t) {
        return "[object Array]" === l.call(t)
    }

    function i(t) {
        var e = [];
        if (n(t)) e = t; else if ("number" == typeof t.length)for (var i = 0, o = t.length; i < o; i++)e.push(t[i]); else e.push(t);
        return e
    }

    function o(t, n) {
        function o(t, n, r) {
            if (!(this instanceof o))return new o(t, n);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = i(t), this.options = e({}, this.options), "function" == typeof n ? r = n : e(this.options, n), r && this.on("always", r), this.getImages(), s && (this.jqDeferred = new s.Deferred);
            var a = this;
            setTimeout(function () {
                a.check()
            })
        }

        function l(t) {
            this.img = t
        }

        function h(t) {
            this.src = t, c[t] = this
        }

        o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function () {
            this.images = [];
            for (var t = 0, e = this.elements.length; t < e; t++) {
                var n = this.elements[t];
                "IMG" === n.nodeName && this.addImage(n);
                for (var i = n.querySelectorAll("img"), o = 0, s = i.length; o < s; o++) {
                    var r = i[o];
                    this.addImage(r)
                }
            }
        }, o.prototype.addImage = function (t) {
            var e = new l(t);
            this.images.push(e)
        }, o.prototype.check = function () {
            function t(t, o) {
                return e.options.debug && a && r.log("confirm", t, o), e.progress(t), n++, n === i && e.complete(), !0
            }

            var e = this, n = 0, i = this.images.length;
            if (this.hasAnyBroken = !1, !i)return void this.complete();
            for (var o = 0; o < i; o++) {
                var s = this.images[o];
                s.on("confirm", t), s.check()
            }
        }, o.prototype.progress = function (t) {
            this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
            var e = this;
            setTimeout(function () {
                e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify(e, t)
            })
        }, o.prototype.complete = function () {
            var t = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var e = this;
            setTimeout(function () {
                if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                    var n = e.hasAnyBroken ? "reject" : "resolve";
                    e.jqDeferred[n](e)
                }
            })
        }, s && (s.fn.imagesLoaded = function (t, e) {
            return new o(this, t, e).jqDeferred.promise(s(this))
        }), l.prototype = new t, l.prototype.check = function () {
            var t = c[this.img.src] || new h(this.img.src);
            if (t.isConfirmed)return void this.confirm(t.isLoaded, "cached was confirmed");
            if (this.img.complete && void 0 !== this.img.naturalWidth)return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var e = this;
            t.on("confirm", function (t, n) {
                return e.confirm(t.isLoaded, n), !0
            }), t.check()
        }, l.prototype.confirm = function (t, e) {
            this.isLoaded = t, this.emit("confirm", this, e)
        };
        var c = {};
        return h.prototype = new t, h.prototype.check = function () {
            if (!this.isChecked) {
                var t = new Image;
                n.bind(t, "load", this), n.bind(t, "error", this), t.src = this.src, this.isChecked = !0
            }
        }, h.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, h.prototype.onload = function (t) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(t)
        }, h.prototype.onerror = function (t) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
        }, h.prototype.confirm = function (t, e) {
            this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
        }, h.prototype.unbindProxyEvents = function (t) {
            n.unbind(t.target, "load", this), n.unbind(t.target, "error", this)
        }, o
    }

    var s = t.jQuery, r = t.console, a = void 0 !== r, l = Object.prototype.toString;
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], o) : t.imagesLoaded = o(t.EventEmitter, t.eventie)
}(window), "function" != typeof Object.create && (Object.create = function (t) {
    function e() {
    }

    return e.prototype = t, new e
}), function (t, e, n, i) {
    var o = {
        init: function (e, n) {
            var i = this;
            i.elem = n, i.$elem = t(n), i.imageSrc = i.$elem.data("zoom-image") ? i.$elem.data("zoom-image") : i.$elem.attr("src"), i.options = t.extend({}, t.fn.elevateZoom.options, e), i.options.tint && (i.options.lensColour = "none", i.options.lensOpacity = "1"), "inner" == i.options.zoomType && (i.options.showLens = !1), i.$elem.parent().removeAttr("title").removeAttr("alt"), i.zoomImage = i.imageSrc, i.refresh(1), t("#" + i.options.gallery + " a").click(function (e) {
                return i.options.galleryActiveClass && (t("#" + i.options.gallery + " a").removeClass(i.options.galleryActiveClass), t(this).addClass(i.options.galleryActiveClass)), e.preventDefault(), t(this).data("zoom-image") ? i.zoomImagePre = t(this).data("zoom-image") : i.zoomImagePre = t(this).data("image"), i.swaptheimage(t(this).data("image"), i.zoomImagePre), !1
            })
        }, refresh: function (t) {
            var e = this;
            setTimeout(function () {
                e.fetch(e.imageSrc)
            }, t || e.options.refresh)
        }, fetch: function (t) {
            var e = this, n = new Image;
            n.onload = function () {
                e.largeWidth = n.width, e.largeHeight = n.height, e.startZoom(), e.currentImage = e.imageSrc, e.options.onZoomedImageLoaded(e.$elem)
            }, n.src = t
        }, startZoom: function () {
            var e = this;
            if (e.nzWidth = e.$elem.width(), e.nzHeight = e.$elem.height(), e.isWindowActive = !1, e.isLensActive = !1, e.isTintActive = !1, e.overWindow = !1, e.options.imageCrossfade && (e.zoomWrap = e.$elem.wrap('<div style="height:' + e.nzHeight + "px;width:" + e.nzWidth + 'px;" class="zoomWrapper" />'), e.$elem.css("position", "absolute")), e.zoomLock = 1, e.scrollingLock = !1, e.changeBgSize = !1, e.currentZoomLevel = e.options.zoomLevel, e.nzOffset = e.$elem.offset(), e.widthRatio = e.largeWidth / e.currentZoomLevel / e.nzWidth, e.heightRatio = e.largeHeight / e.currentZoomLevel / e.nzHeight, "window" == e.options.zoomType && (e.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(e.options.zoomWindowBgColour) + ";width: " + String(e.options.zoomWindowWidth) + "px;height: " + String(e.options.zoomWindowHeight) + "px;float: left;background-size: " + e.largeWidth / e.currentZoomLevel + "px " + e.largeHeight / e.currentZoomLevel + "px;display: none;z-index:100;border: " + String(e.options.borderSize) + "px solid " + e.options.borderColour + ";background-repeat: no-repeat;position: absolute;"), "inner" == e.options.zoomType) {
                var n = e.$elem.css("border-left-width");
                e.zoomWindowStyle = "overflow: hidden;margin-left: " + String(n) + ";margin-top: " + String(n) + ";background-position: 0px 0px;width: " + String(e.nzWidth) + "px;height: " + String(e.nzHeight) + "px;float: left;display: none;cursor:" + e.options.cursor + ";px solid " + e.options.borderColour + ";background-repeat: no-repeat;position: absolute;"
            }
            "window" == e.options.zoomType && (lensHeight = e.nzHeight < e.options.zoomWindowWidth / e.widthRatio ? e.nzHeight : String(e.options.zoomWindowHeight / e.heightRatio), lensWidth = e.largeWidth < e.options.zoomWindowWidth ? e.nzWidth : e.options.zoomWindowWidth / e.widthRatio, e.lensStyle = "background-position: 0px 0px;width: " + String(e.options.zoomWindowWidth / e.widthRatio) + "px;height: " + String(e.options.zoomWindowHeight / e.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + e.options.lensOpacity + ";filter: alpha(opacity = " + 100 * e.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + e.options.lensColour + ";cursor:" + e.options.cursor + ";border: " + e.options.lensBorderSize + "px solid " + e.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;"), e.tintStyle = "display: block;position: absolute;background-color: " + e.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + e.nzWidth + "px;height: " + e.nzHeight + "px;", e.lensRound = "", "lens" == e.options.zoomType && (e.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(e.options.borderSize) + "px solid " + e.options.borderColour + ";width:" + String(e.options.lensSize) + "px;height:" + String(e.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;"), "round" == e.options.lensShape && (e.lensRound = "border-top-left-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-top-right-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-bottom-left-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;border-bottom-right-radius: " + String(e.options.lensSize / 2 + e.options.borderSize) + "px;"), e.zoomContainer = t('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + e.nzOffset.left + "px;top:" + e.nzOffset.top + "px;height:" + e.nzHeight + "px;width:" + e.nzWidth + 'px;"></div>'), t("body").append(e.zoomContainer), e.options.containLensZoom && "lens" == e.options.zoomType && e.zoomContainer.css("overflow", "hidden"), "inner" != e.options.zoomType && (e.zoomLens = t("<div class='zoomLens' style='" + e.lensStyle + e.lensRound + "'>&nbsp;</div>").appendTo(e.zoomContainer).click(function () {
                e.$elem.trigger("click")
            }), e.options.tint && (e.tintContainer = t("<div/>").addClass("tintContainer"), e.zoomTint = t("<div class='zoomTint' style='" + e.tintStyle + "'></div>"), e.zoomLens.wrap(e.tintContainer), e.zoomTintcss = e.zoomLens.after(e.zoomTint), e.zoomTintImage = t('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + e.nzWidth + "px; height: " + e.nzHeight + 'px;" src="' + e.imageSrc + '">').appendTo(e.zoomLens).click(function () {
                e.$elem.trigger("click")
            }))), isNaN(e.options.zoomWindowPosition) ? e.zoomWindow = t("<div style='z-index:999;left:" + e.windowOffsetLeft + "px;top:" + e.windowOffsetTop + "px;" + e.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function () {
                e.$elem.trigger("click")
            }) : e.zoomWindow = t("<div style='z-index:999;left:" + e.windowOffsetLeft + "px;top:" + e.windowOffsetTop + "px;" + e.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(e.zoomContainer).click(function () {
                e.$elem.trigger("click")
            }), e.zoomWindowContainer = t("<div/>").addClass("zoomWindowContainer").css("width", e.options.zoomWindowWidth), e.zoomWindow.wrap(e.zoomWindowContainer), "lens" == e.options.zoomType && e.zoomLens.css({backgroundImage: "url('" + e.imageSrc + "')"}), "window" == e.options.zoomType && e.zoomWindow.css({backgroundImage: "url('" + e.imageSrc + "')"}), "inner" == e.options.zoomType && e.zoomWindow.css({backgroundImage: "url('" + e.imageSrc + "')"}), e.$elem.bind("touchmove", function (t) {
                t.preventDefault(), e.setPosition(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
            }), e.zoomContainer.bind("touchmove", function (t) {
                "inner" == e.options.zoomType && e.showHideWindow("show"), t.preventDefault(), e.setPosition(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
            }), e.zoomContainer.bind("touchend", function (t) {
                e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
            }), e.$elem.bind("touchend", function (t) {
                e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
            }), e.options.showLens && (e.zoomLens.bind("touchmove", function (t) {
                t.preventDefault(), e.setPosition(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
            }), e.zoomLens.bind("touchend", function (t) {
                e.showHideWindow("hide"), e.options.showLens && e.showHideLens("hide"), e.options.tint && "inner" != e.options.zoomType && e.showHideTint("hide")
            })), e.$elem.bind("mousemove", function (t) {
                0 == e.overWindow && e.setElements("show"), e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), e.zoomContainer.bind("mousemove", function (t) {
                0 == e.overWindow && e.setElements("show"), e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), "inner" != e.options.zoomType && e.zoomLens.bind("mousemove", function (t) {
                e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), e.options.tint && "inner" != e.options.zoomType && e.zoomTint.bind("mousemove", function (t) {
                e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), "inner" == e.options.zoomType && e.zoomWindow.bind("mousemove", function (t) {
                e.lastX === t.clientX && e.lastY === t.clientY || (e.setPosition(t), e.currentLoc = t), e.lastX = t.clientX, e.lastY = t.clientY
            }), e.zoomContainer.add(e.$elem).mouseenter(function () {
                0 == e.overWindow && e.setElements("show")
            }).mouseleave(function () {
                e.scrollLock || e.setElements("hide")
            }), "inner" != e.options.zoomType && e.zoomWindow.mouseenter(function () {
                e.overWindow = !0, e.setElements("hide")
            }).mouseleave(function () {
                e.overWindow = !1
            }), e.minZoomLevel = e.options.minZoomLevel ? e.options.minZoomLevel : 2 * e.options.scrollZoomIncrement, e.options.scrollZoom && e.zoomContainer.add(e.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (n) {
                e.scrollLock = !0, clearTimeout(t.data(this, "timer")), t.data(this, "timer", setTimeout(function () {
                    e.scrollLock = !1
                }, 250));
                var i = n.originalEvent.wheelDelta || -1 * n.originalEvent.detail;
                return n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault(), 0 < i / 120 ? e.currentZoomLevel >= e.minZoomLevel && e.changeZoomLevel(e.currentZoomLevel - e.options.scrollZoomIncrement) : e.options.maxZoomLevel ? e.currentZoomLevel <= e.options.maxZoomLevel && e.changeZoomLevel(parseFloat(e.currentZoomLevel) + e.options.scrollZoomIncrement) : e.changeZoomLevel(parseFloat(e.currentZoomLevel) + e.options.scrollZoomIncrement), !1
            })
        }, setElements: function (t) {
            if (!this.options.zoomEnabled)return !1;
            "show" == t && this.isWindowSet && ("inner" == this.options.zoomType && this.showHideWindow("show"), "window" == this.options.zoomType && this.showHideWindow("show"), this.options.showLens && this.showHideLens("show"), this.options.tint && "inner" != this.options.zoomType && this.showHideTint("show")), "hide" == t && ("window" == this.options.zoomType && this.showHideWindow("hide"), this.options.tint || this.showHideWindow("hide"), this.options.showLens && this.showHideLens("hide"), this.options.tint && this.showHideTint("hide"))
        }, setPosition: function (t) {
            if (!this.options.zoomEnabled)return !1;
            this.nzHeight = this.$elem.height(), this.nzWidth = this.$elem.width(), this.nzOffset = this.$elem.offset(), this.options.tint && "inner" != this.options.zoomType && (this.zoomTint.css({top: 0}), this.zoomTint.css({left: 0})), this.options.responsive && !this.options.scrollZoom && this.options.showLens && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "lens" != this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight), this.options.tint && (this.zoomTintImage.css("width", this.nzWidth), this.zoomTintImage.css("height", this.nzHeight))), "lens" == this.options.zoomType && this.zoomLens.css({
                width: String(this.options.lensSize) + "px",
                height: String(this.options.lensSize) + "px"
            })), this.zoomContainer.css({top: this.nzOffset.top}), this.zoomContainer.css({left: this.nzOffset.left}),
                this.mouseLeft = parseInt(t.pageX - this.nzOffset.left), this.mouseTop = parseInt(t.pageY - this.nzOffset.top), "window" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.zoomLens.height() / 2, this.Eboppos = this.mouseTop > this.nzHeight - this.zoomLens.height() / 2 - 2 * this.options.lensBorderSize, this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2, this.Eroppos = this.mouseLeft > this.nzWidth - this.zoomLens.width() / 2 - 2 * this.options.lensBorderSize), "inner" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio, this.Eboppos = this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio, this.Eloppos = this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio, this.Eroppos = this.mouseLeft > this.nzWidth - this.nzWidth / 2 / this.widthRatio - 2 * this.options.lensBorderSize), 0 >= this.mouseLeft || 0 > this.mouseTop || this.mouseLeft > this.nzWidth || this.mouseTop > this.nzHeight ? this.setElements("hide") : (this.options.showLens && (this.lensLeftPos = String(this.mouseLeft - this.zoomLens.width() / 2), this.lensTopPos = String(this.mouseTop - this.zoomLens.height() / 2)), this.Etoppos && (this.lensTopPos = 0), this.Eloppos && (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0), "window" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), "inner" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)), "lens" == this.options.zoomType && (this.windowLeftPos = String(-1 * ((t.pageX - this.nzOffset.left) * this.widthRatio - this.zoomLens.width() / 2)), this.windowTopPos = String(-1 * ((t.pageY - this.nzOffset.top) * this.heightRatio - this.zoomLens.height() / 2)), this.zoomLens.css({backgroundPosition: this.windowLeftPos + "px " + this.windowTopPos + "px"}), this.changeBgSize && (this.nzHeight > this.nzWidth ? ("lens" == this.options.zoomType && this.zoomLens.css({"background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"}), this.zoomWindow.css({"background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"})) : ("lens" == this.options.zoomType && this.zoomLens.css({"background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"}), this.zoomWindow.css({"background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"})), this.changeBgSize = !1), this.setWindowPostition(t)), this.options.tint && "inner" != this.options.zoomType && this.setTintPosition(t), "window" == this.options.zoomType && this.setWindowPostition(t), "inner" == this.options.zoomType && this.setWindowPostition(t), this.options.showLens && (this.fullwidth && "lens" != this.options.zoomType && (this.lensLeftPos = 0), this.zoomLens.css({
                left: this.lensLeftPos + "px",
                top: this.lensTopPos + "px"
            })))
        }, showHideWindow: function (t) {
            "show" != t || this.isWindowActive || (this.options.zoomWindowFadeIn ? this.zoomWindow.stop(!0, !0, !1).fadeIn(this.options.zoomWindowFadeIn) : this.zoomWindow.show(), this.isWindowActive = !0), "hide" == t && this.isWindowActive && (this.options.zoomWindowFadeOut ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut) : this.zoomWindow.hide(), this.isWindowActive = !1)
        }, showHideLens: function (t) {
            "show" != t || this.isLensActive || (this.options.lensFadeIn ? this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn) : this.zoomLens.show(), this.isLensActive = !0), "hide" == t && this.isLensActive && (this.options.lensFadeOut ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut) : this.zoomLens.hide(), this.isLensActive = !1)
        }, showHideTint: function (t) {
            "show" != t || this.isTintActive || (this.options.zoomTintFadeIn ? this.zoomTint.css({opacity: this.options.tintOpacity}).animate().stop(!0, !0).fadeIn("slow") : (this.zoomTint.css({opacity: this.options.tintOpacity}).animate(), this.zoomTint.show()), this.isTintActive = !0), "hide" == t && this.isTintActive && (this.options.zoomTintFadeOut ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut) : this.zoomTint.hide(), this.isTintActive = !1)
        }, setLensPostition: function (t) {
        }, setWindowPostition: function (e) {
            var n = this;
            if (isNaN(n.options.zoomWindowPosition)) n.externalContainer = t("#" + n.options.zoomWindowPosition), n.externalContainerWidth = n.externalContainer.width(), n.externalContainerHeight = n.externalContainer.height(), n.externalContainerOffset = n.externalContainer.offset(), n.windowOffsetTop = n.externalContainerOffset.top, n.windowOffsetLeft = n.externalContainerOffset.left; else switch (n.options.zoomWindowPosition) {
                case 1:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = +n.nzWidth;
                    break;
                case 2:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.options.zoomWindowHeight / 2 - n.nzHeight / 2), n.windowOffsetLeft = n.nzWidth);
                    break;
                case 3:
                    n.windowOffsetTop = n.nzHeight - n.zoomWindow.height() - 2 * n.options.borderSize, n.windowOffsetLeft = n.nzWidth;
                    break;
                case 4:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = n.nzWidth;
                    break;
                case 5:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = n.nzWidth - n.zoomWindow.width() - 2 * n.options.borderSize;
                    break;
                case 6:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = -1 * (n.options.zoomWindowWidth / 2 - n.nzWidth / 2 + 2 * n.options.borderSize));
                    break;
                case 7:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = 0;
                    break;
                case 8:
                    n.windowOffsetTop = n.nzHeight, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 9:
                    n.windowOffsetTop = n.nzHeight - n.zoomWindow.height() - 2 * n.options.borderSize, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 10:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.options.zoomWindowHeight / 2 - n.nzHeight / 2), n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize));
                    break;
                case 11:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 12:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = -1 * (n.zoomWindow.width() + 2 * n.options.borderSize);
                    break;
                case 13:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = 0;
                    break;
                case 14:
                    n.options.zoomWindowHeight > n.nzHeight && (n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = -1 * (n.options.zoomWindowWidth / 2 - n.nzWidth / 2 + 2 * n.options.borderSize));
                    break;
                case 15:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = n.nzWidth - n.zoomWindow.width() - 2 * n.options.borderSize;
                    break;
                case 16:
                    n.windowOffsetTop = -1 * (n.zoomWindow.height() + 2 * n.options.borderSize), n.windowOffsetLeft = n.nzWidth;
                    break;
                default:
                    n.windowOffsetTop = n.options.zoomWindowOffety, n.windowOffsetLeft = n.nzWidth
            }
            n.isWindowSet = !0, n.windowOffsetTop += n.options.zoomWindowOffety, n.windowOffsetLeft += n.options.zoomWindowOffetx, n.zoomWindow.css({top: n.windowOffsetTop}), n.zoomWindow.css({left: n.windowOffsetLeft}), "inner" == n.options.zoomType && (n.zoomWindow.css({top: 0}), n.zoomWindow.css({left: 0})), n.windowLeftPos = String(-1 * ((e.pageX - n.nzOffset.left) * n.widthRatio - n.zoomWindow.width() / 2)), n.windowTopPos = String(-1 * ((e.pageY - n.nzOffset.top) * n.heightRatio - n.zoomWindow.height() / 2)), n.Etoppos && (n.windowTopPos = 0), n.Eloppos && (n.windowLeftPos = 0), n.Eboppos && (n.windowTopPos = -1 * (n.largeHeight / n.currentZoomLevel - n.zoomWindow.height())), n.Eroppos && (n.windowLeftPos = -1 * (n.largeWidth / n.currentZoomLevel - n.zoomWindow.width())), n.fullheight && (n.windowTopPos = 0), n.fullwidth && (n.windowLeftPos = 0), "window" != n.options.zoomType && "inner" != n.options.zoomType || (1 == n.zoomLock && (1 >= n.widthRatio && (n.windowLeftPos = 0), 1 >= n.heightRatio && (n.windowTopPos = 0)), n.largeHeight < n.options.zoomWindowHeight && (n.windowTopPos = 0), n.largeWidth < n.options.zoomWindowWidth && (n.windowLeftPos = 0), n.options.easing ? (n.xp || (n.xp = 0), n.yp || (n.yp = 0), n.loop || (n.loop = setInterval(function () {
                n.xp += (n.windowLeftPos - n.xp) / n.options.easingAmount, n.yp += (n.windowTopPos - n.yp) / n.options.easingAmount, n.scrollingLock ? (clearInterval(n.loop), n.xp = n.windowLeftPos, n.yp = n.windowTopPos, n.xp = -1 * ((e.pageX - n.nzOffset.left) * n.widthRatio - n.zoomWindow.width() / 2), n.yp = -1 * ((e.pageY - n.nzOffset.top) * n.heightRatio - n.zoomWindow.height() / 2), n.changeBgSize && (n.nzHeight > n.nzWidth ? ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})) : ("lens" != n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"})), n.changeBgSize = !1), n.zoomWindow.css({backgroundPosition: n.windowLeftPos + "px " + n.windowTopPos + "px"}), n.scrollingLock = !1, n.loop = !1) : (n.changeBgSize && (n.nzHeight > n.nzWidth ? ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})) : ("lens" != n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"})), n.changeBgSize = !1), n.zoomWindow.css({backgroundPosition: n.xp + "px " + n.yp + "px"}))
            }, 16))) : (n.changeBgSize && (n.nzHeight > n.nzWidth ? ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"}), n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})) : ("lens" == n.options.zoomType && n.zoomLens.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"}), n.largeHeight / n.newvaluewidth < n.options.zoomWindowHeight ? n.zoomWindow.css({"background-size": n.largeWidth / n.newvaluewidth + "px " + n.largeHeight / n.newvaluewidth + "px"}) : n.zoomWindow.css({"background-size": n.largeWidth / n.newvalueheight + "px " + n.largeHeight / n.newvalueheight + "px"})), n.changeBgSize = !1), n.zoomWindow.css({backgroundPosition: n.windowLeftPos + "px " + n.windowTopPos + "px"})))
        }, setTintPosition: function (t) {
            this.nzOffset = this.$elem.offset(), this.tintpos = String(-1 * (t.pageX - this.nzOffset.left - this.zoomLens.width() / 2)), this.tintposy = String(-1 * (t.pageY - this.nzOffset.top - this.zoomLens.height() / 2)), this.Etoppos && (this.tintposy = 0), this.Eloppos && (this.tintpos = 0), this.Eboppos && (this.tintposy = -1 * (this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize)), this.Eroppos && (this.tintpos = -1 * (this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), this.options.tint && (this.fullheight && (this.tintposy = 0), this.fullwidth && (this.tintpos = 0), this.zoomTintImage.css({left: this.tintpos + "px"}), this.zoomTintImage.css({top: this.tintposy + "px"}))
        }, swaptheimage: function (e, n) {
            var i = this, o = new Image;
            i.options.loadingIcon && (i.spinner = t("<div style=\"background: url('" + i.options.loadingIcon + "') no-repeat center;height:" + i.nzHeight + "px;width:" + i.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), i.$elem.after(i.spinner)), i.options.onImageSwap(i.$elem), o.onload = function () {
                i.largeWidth = o.width, i.largeHeight = o.height, i.zoomImage = n, i.zoomWindow.css({"background-size": i.largeWidth + "px " + i.largeHeight + "px"}), i.zoomWindow.css({"background-size": i.largeWidth + "px " + i.largeHeight + "px"}), i.swapAction(e, n)
            }, o.src = n
        }, swapAction: function (e, n) {
            var i = this, o = new Image;
            if (o.onload = function () {
                    i.nzHeight = o.height, i.nzWidth = o.width, i.options.onImageSwapComplete(i.$elem), i.doneCallback()
                }, o.src = e, i.currentZoomLevel = i.options.zoomLevel, i.options.maxZoomLevel = !1, "lens" == i.options.zoomType && i.zoomLens.css({backgroundImage: "url('" + n + "')"}), "window" == i.options.zoomType && i.zoomWindow.css({backgroundImage: "url('" + n + "')"}), "inner" == i.options.zoomType && i.zoomWindow.css({backgroundImage: "url('" + n + "')"}), i.currentImage = n, i.options.imageCrossfade) {
                var s = i.$elem, r = s.clone();
                i.$elem.attr("src", e), i.$elem.after(r), r.stop(!0).fadeOut(i.options.imageCrossfade, function () {
                    t(this).remove()
                }), i.$elem.width("auto").removeAttr("width"), i.$elem.height("auto").removeAttr("height"), s.fadeIn(i.options.imageCrossfade), i.options.tint && "inner" != i.options.zoomType && (s = i.zoomTintImage, r = s.clone(), i.zoomTintImage.attr("src", n), i.zoomTintImage.after(r), r.stop(!0).fadeOut(i.options.imageCrossfade, function () {
                    t(this).remove()
                }), s.fadeIn(i.options.imageCrossfade), i.zoomTint.css({height: i.$elem.height()}), i.zoomTint.css({width: i.$elem.width()})), i.zoomContainer.css("height", i.$elem.height()), i.zoomContainer.css("width", i.$elem.width()), "inner" != i.options.zoomType || i.options.constrainType || (i.zoomWrap.parent().css("height", i.$elem.height()), i.zoomWrap.parent().css("width", i.$elem.width()), i.zoomWindow.css("height", i.$elem.height()), i.zoomWindow.css("width", i.$elem.width()))
            } else i.$elem.attr("src", e), i.options.tint && (i.zoomTintImage.attr("src", n), i.zoomTintImage.attr("height", i.$elem.height()), i.zoomTintImage.css({height: i.$elem.height()}), i.zoomTint.css({height: i.$elem.height()})), i.zoomContainer.css("height", i.$elem.height()), i.zoomContainer.css("width", i.$elem.width());
            i.options.imageCrossfade && (i.zoomWrap.css("height", i.$elem.height()), i.zoomWrap.css("width", i.$elem.width())), i.options.constrainType && ("height" == i.options.constrainType && (i.zoomContainer.css("height", i.options.constrainSize), i.zoomContainer.css("width", "auto"), i.options.imageCrossfade ? (i.zoomWrap.css("height", i.options.constrainSize), i.zoomWrap.css("width", "auto"), i.constwidth = i.zoomWrap.width()) : (i.$elem.css("height", i.options.constrainSize), i.$elem.css("width", "auto"), i.constwidth = i.$elem.width()), "inner" == i.options.zoomType && (i.zoomWrap.parent().css("height", i.options.constrainSize), i.zoomWrap.parent().css("width", i.constwidth), i.zoomWindow.css("height", i.options.constrainSize), i.zoomWindow.css("width", i.constwidth)), i.options.tint && (i.tintContainer.css("height", i.options.constrainSize), i.tintContainer.css("width", i.constwidth), i.zoomTint.css("height", i.options.constrainSize), i.zoomTint.css("width", i.constwidth), i.zoomTintImage.css("height", i.options.constrainSize), i.zoomTintImage.css("width", i.constwidth))), "width" == i.options.constrainType && (i.zoomContainer.css("height", "auto"), i.zoomContainer.css("width", i.options.constrainSize), i.options.imageCrossfade ? (i.zoomWrap.css("height", "auto"), i.zoomWrap.css("width", i.options.constrainSize), i.constheight = i.zoomWrap.height()) : (i.$elem.css("height", "auto"), i.$elem.css("width", i.options.constrainSize), i.constheight = i.$elem.height()), "inner" == i.options.zoomType && (i.zoomWrap.parent().css("height", i.constheight), i.zoomWrap.parent().css("width", i.options.constrainSize), i.zoomWindow.css("height", i.constheight), i.zoomWindow.css("width", i.options.constrainSize)), i.options.tint && (i.tintContainer.css("height", i.constheight), i.tintContainer.css("width", i.options.constrainSize), i.zoomTint.css("height", i.constheight), i.zoomTint.css("width", i.options.constrainSize), i.zoomTintImage.css("height", i.constheight), i.zoomTintImage.css("width", i.options.constrainSize))))
        }, doneCallback: function () {
            this.options.loadingIcon && this.spinner.hide(), this.nzOffset = this.$elem.offset(), this.nzWidth = this.$elem.width(), this.nzHeight = this.$elem.height(), this.currentZoomLevel = this.options.zoomLevel, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "window" == this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.options.zoomWindowWidth < this.options.zoomWindowWidth ? this.nzWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens && (this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight)))
        }, getCurrentImage: function () {
            return this.zoomImage
        }, getGalleryList: function () {
            var e = this;
            return e.gallerylist = [], e.options.gallery ? t("#" + e.options.gallery + " a").each(function () {
                var n = "";
                t(this).data("zoom-image") ? n = t(this).data("zoom-image") : t(this).data("image") && (n = t(this).data("image")), n == e.zoomImage ? e.gallerylist.unshift({
                    href: "" + n,
                    title: t(this).find("img").attr("title")
                }) : e.gallerylist.push({href: "" + n, title: t(this).find("img").attr("title")})
            }) : e.gallerylist.push({href: "" + e.zoomImage, title: t(this).find("img").attr("title")}), e.gallerylist
        }, changeZoomLevel: function (t) {
            this.scrollingLock = !0, this.newvalue = parseFloat(t).toFixed(2), newvalue = parseFloat(t).toFixed(2), maxheightnewvalue = this.largeHeight / (this.options.zoomWindowHeight / this.nzHeight * this.nzHeight), maxwidthtnewvalue = this.largeWidth / (this.options.zoomWindowWidth / this.nzWidth * this.nzWidth), "inner" != this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / maxheightnewvalue / this.nzHeight, this.newvalueheight = maxheightnewvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / maxwidthtnewvalue / this.nzWidth, this.newvaluewidth = maxwidthtnewvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1), "lens" == this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.fullwidth = !0, this.newvaluewidth = maxheightnewvalue) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1))), "inner" == this.options.zoomType && (maxheightnewvalue = parseFloat(this.largeHeight / this.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1)), scrcontinue = !1, "inner" == this.options.zoomType && (this.nzWidth > this.nzHeight && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)), this.nzHeight > this.nzWidth && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0))), "inner" != this.options.zoomType && (scrcontinue = !0), scrcontinue && (this.zoomLock = 0, this.changeZoom = !0, this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight && (this.currentZoomLevel = this.newvalueheight, "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({height: String(this.options.zoomWindowHeight / this.heightRatio) + "px"})), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth && ("inner" != this.options.zoomType && this.newvaluewidth > this.newvalueheight && (this.currentZoomLevel = this.newvaluewidth), "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({width: String(this.options.zoomWindowWidth / this.widthRatio) + "px"})), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), "inner" == this.options.zoomType && (this.changeBgSize = !0, this.nzWidth > this.nzHeight && (this.currentZoomLevel = this.newvaluewidth), this.nzHeight > this.nzWidth && (this.currentZoomLevel = this.newvaluewidth))), this.setPosition(this.currentLoc)
        }, closeAll: function () {
            self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
        }, changeState: function (t) {
            "enable" == t && (this.options.zoomEnabled = !0), "disable" == t && (this.options.zoomEnabled = !1)
        }
    };
    t.fn.elevateZoom = function (e) {
        return this.each(function () {
            var n = Object.create(o);
            n.init(e, this), t.data(this, "elevateZoom", n)
        })
    }, t.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: !0,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: !1,
        scrollZoomIncrement: .1,
        minZoomLevel: !1,
        maxZoomLevel: !1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: .4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: .4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: !1,
        constrainType: !1,
        constrainSize: !1,
        loadingIcon: !1,
        cursor: "default",
        responsive: !0,
        onComplete: t.noop,
        onZoomedImageLoaded: function () {
        },
        onImageSwap: t.noop,
        onImageSwapComplete: t.noop
    }
}(jQuery, window, document), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (t) {
    var e, n, i, o, s, r, a = function () {
    }, l = !!window.jQuery, h = t(window), c = function (t, n) {
        e.ev.on("mfp" + t + ".mfp", n)
    }, d = function (e, n, i, o) {
        var s = document.createElement("div");
        return s.className = "mfp-" + e, i && (s.innerHTML = i), o ? n && n.appendChild(s) : (s = t(s), n && s.appendTo(n)), s
    }, u = function (n, i) {
        e.ev.triggerHandler("mfp" + n, i), e.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), e.st.callbacks[n] && e.st.callbacks[n].apply(e, t.isArray(i) ? i : [i]))
    }, p = function (n) {
        return n === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = n), e.currTemplate.closeBtn
    }, f = function () {
        t.magnificPopup.instance || (e = new a, e.init(), t.magnificPopup.instance = e)
    }, m = function () {
        var t = document.createElement("p").style, e = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== t.transition)return !0;
        for (; e.length;)if (e.pop() + "Transition" in t)return !0;
        return !1
    };
    a.prototype = {
        constructor: a, init: function () {
            var n = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(n), e.isIOS = /iphone|ipad|ipod/gi.test(n), e.supportsTransition = m(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = t(document), e.popupsCache = {}
        }, open: function (n) {
            var o;
            if (!1 === n.isObj) {
                e.items = n.items.toArray(), e.index = 0;
                var r, a = n.items;
                for (o = 0; o < a.length; o++)if (r = a[o], r.parsed && (r = r.el[0]), r === n.el[0]) {
                    e.index = o;
                    break
                }
            } else e.items = t.isArray(n.items) ? n.items : [n.items], e.index = n.index || 0;
            if (e.isOpen)return void e.updateItemHTML();
            e.types = [], s = "", n.mainEl && n.mainEl.length ? e.ev = n.mainEl.eq(0) : e.ev = i, n.key ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}), e.currTemplate = e.popupsCache[n.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, n), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = d("bg").on("click.mfp", function () {
                e.close()
            }), e.wrap = d("wrap").attr("tabindex", -1).on("click.mfp", function (t) {
                e._checkIfClose(t.target) && e.close()
            }), e.container = d("container", e.wrap)), e.contentContainer = d("content"), e.st.preloader && (e.preloader = d("preloader", e.container, e.st.tLoading));
            var l = t.magnificPopup.modules;
            for (o = 0; o < l.length; o++) {
                var f = l[o];
                f = f.charAt(0).toUpperCase() + f.slice(1), e["init" + f].call(e)
            }
            u("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (c("MarkupParse", function (t, e, n, i) {
                n.close_replaceWith = p(i.type)
            }), s += " mfp-close-btn-in") : e.wrap.append(p())), e.st.alignTop && (s += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                overflow: e.st.overflowY,
                overflowX: "hidden",
                overflowY: e.st.overflowY
            }) : e.wrap.css({
                top: h.scrollTop(),
                position: "absolute"
            }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                height: i.height(),
                position: "absolute"
            }), e.st.enableEscapeKey && i.on("keyup.mfp", function (t) {
                27 === t.keyCode && e.close()
            }), h.on("resize.mfp", function () {
                e.updateSize()
            }), e.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && e.wrap.addClass(s);
            var m = e.wH = h.height(), g = {};
            if (e.fixedContentPos && e._hasScrollBar(m)) {
                var v = e._getScrollbarSize();
                v && (g.marginRight = v)
            }
            e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : g.overflow = "hidden");
            var y = e.st.mainClass;
            return e.isIE7 && (y += " mfp-ie7"), y && e._addClassToMFP(y), e.updateItemHTML(), u("BuildControls"), t("html").css(g), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
                e.content ? (e._addClassToMFP("mfp-ready"), e._setFocus()) : e.bgOverlay.addClass("mfp-ready"), i.on("focusin.mfp", e._onFocusIn)
            }, 16), e.isOpen = !0, e.updateSize(m), u("Open"), n
        }, close: function () {
            e.isOpen && (u("BeforeClose"), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP("mfp-removing"), setTimeout(function () {
                e._close()
            }, e.st.removalDelay)) : e._close())
        }, _close: function () {
            u("Close");
            var n = "mfp-removing mfp-ready ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (n += e.st.mainClass + " "), e._removeClassFromMFP(n), e.fixedContentPos) {
                var o = {marginRight: ""};
                e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
            }
            i.off("keyup.mfp focusin.mfp"), e.ev.off(".mfp"), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, u("AfterClose")
        }, updateSize: function (t) {
            if (e.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth, i = window.innerHeight * n;
                e.wrap.css("height", i), e.wH = i
            } else e.wH = t || h.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), u("Resize")
        }, updateItemHTML: function () {
            var n = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), n.parsed || (n = e.parseEl(e.index));
            var i = n.type;
            if (u("BeforeChange", [e.currItem ? e.currItem.type : "", i]), e.currItem = n, !e.currTemplate[i]) {
                var s = !!e.st[i] && e.st[i].markup;
                u("FirstMarkupParse", s), e.currTemplate[i] = !s || t(s)
            }
            o && o !== n.type && e.container.removeClass("mfp-" + o + "-holder");
            var r = e["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, e.currTemplate[i]);
            e.appendContent(r, i), n.preloaded = !0, u("Change", n), o = n.type, e.container.prepend(e.contentContainer), u("AfterChange")
        }, appendContent: function (t, n) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[n] ? e.content.find(".mfp-close").length || e.content.append(p()) : e.content = t : e.content = "", u("BeforeAppend"), e.container.addClass("mfp-" + n + "-holder"), e.contentContainer.append(e.content)
        }, parseEl: function (n) {
            var i, o = e.items[n];
            if (o.tagName ? o = {el: t(o)} : (i = o.type, o = {data: o, src: o.src}), o.el) {
                for (var s = e.types, r = 0; r < s.length; r++)if (o.el.hasClass("mfp-" + s[r])) {
                    i = s[r];
                    break
                }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || e.st.type || "inline", o.index = n, o.parsed = !0, e.items[n] = o, u("ElementParse", o), e.items[n]
        }, addGroup: function (t, n) {
            var i = function (i) {
                i.mfpEl = this, e._openClick(i, t, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = t, n.items ? (n.isObj = !0, t.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? t.off(o).on(o, n.delegate, i) : (n.items = t, t.off(o).on(o, i)))
        }, _openClick: function (n, i, o) {
            if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                var s = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                if (s)if (t.isFunction(s)) {
                    if (!s.call(e))return !0
                } else if (h.width() < s)return !0;
                n.type && (n.preventDefault(), e.isOpen && n.stopPropagation()), o.el = t(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), e.open(o)
            }
        }, updateStatus: function (t, i) {
            if (e.preloader) {
                n !== t && e.container.removeClass("mfp-s-" + n), i || "loading" !== t || (i = e.st.tLoading);
                var o = {status: t, text: i};
                u("UpdateStatus", o), t = o.status, i = o.text, e.preloader.html(i), e.preloader.find("a").on("click", function (t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), n = t
            }
        }, _checkIfClose: function (n) {
            if (!t(n).hasClass("mfp-prevent-close")) {
                var i = e.st.closeOnContentClick, o = e.st.closeOnBgClick;
                if (i && o)return !0;
                if (!e.content || t(n).hasClass("mfp-close") || e.preloader && n === e.preloader[0])return !0;
                if (n === e.content[0] || t.contains(e.content[0], n)) {
                    if (i)return !0
                } else if (o && t.contains(document, n))return !0;
                return !1
            }
        }, _addClassToMFP: function (t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        }, _removeClassFromMFP: function (t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        }, _hasScrollBar: function (t) {
            return (e.isIE7 ? i.height() : document.body.scrollHeight) > (t || h.height())
        }, _setFocus: function () {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        }, _onFocusIn: function (n) {
            if (n.target !== e.wrap[0] && !t.contains(e.wrap[0], n.target))return e._setFocus(), !1
        }, _parseMarkup: function (e, n, i) {
            var o;
            i.data && (n = t.extend(i.data, n)), u("MarkupParse", [e, n, i]), t.each(n, function (n, i) {
                if (void 0 === i || !1 === i)return !0;
                if (o = n.split("_"), o.length > 1) {
                    var s = e.find(".mfp-" + o[0]);
                    if (s.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? s[0] !== i[0] && s.replaceWith(i) : "img" === r ? s.is("img") ? s.attr("src", i) : s.replaceWith(t("<img>").attr("src", i).attr("class", s.attr("class"))) : s.attr(o[1], i)
                    }
                } else e.find(".mfp-" + n).html(i)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: a.prototype,
        modules: [],
        open: function (e, n) {
            return f(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = n || 0, this.instance.open(e)
        },
        close: function () {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function (e, n) {
            n.options && (t.magnificPopup.defaults[e] = n.options), t.extend(this.proto, n.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function (n) {
        f();
        var i = t(this);
        if ("string" == typeof n)if ("open" === n) {
            var o, s = l ? i.data("magnificPopup") : i[0].magnificPopup, r = parseInt(arguments[1], 10) || 0;
            s.items ? o = s.items[r] : (o = i, s.delegate && (o = o.find(s.delegate)), o = o.eq(r)), e._openClick({mfpEl: o}, i, s)
        } else e.isOpen && e[n].apply(e, Array.prototype.slice.call(arguments, 1)); else n = t.extend(!0, {}, n), l ? i.data("magnificPopup", n) : i[0].magnificPopup = n, e.addGroup(i, n);
        return i
    };
    var g, v, y, w = function () {
        y && (v.after(y.addClass(g)).detach(), y = null)
    };
    t.magnificPopup.registerModule("inline", {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        }, proto: {
            initInline: function () {
                e.types.push("inline"), c("Close.inline", function () {
                    w()
                })
            }, getInline: function (n, i) {
                if (w(), n.src) {
                    var o = e.st.inline, s = t(n.src);
                    if (s.length) {
                        var r = s[0].parentNode;
                        r && r.tagName && (v || (g = o.hiddenClass, v = d(g), g = "mfp-" + g), y = s.after(v).detach().removeClass(g)), e.updateStatus("ready")
                    } else e.updateStatus("error", o.tNotFound), s = t("<div>");
                    return n.inlineElement = s, s
                }
                return e.updateStatus("ready"), e._parseMarkup(i, {}, n), i
            }
        }
    });
    var _, b = function () {
        _ && t(document.body).removeClass(_)
    }, T = function () {
        b(),
        e.req && e.req.abort()
    };
    t.magnificPopup.registerModule("ajax", {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                e.types.push("ajax"), _ = e.st.ajax.cursor, c("Close.ajax", T), c("BeforeChange.ajax", T)
            }, getAjax: function (n) {
                _ && t(document.body).addClass(_), e.updateStatus("loading");
                var i = t.extend({
                    url: n.src, success: function (i, o, s) {
                        var r = {data: i, xhr: s};
                        u("ParseAjax", r), e.appendContent(t(r.data), "ajax"), n.finished = !0, b(), e._setFocus(), setTimeout(function () {
                            e.wrap.addClass("mfp-ready")
                        }, 16), e.updateStatus("ready"), u("AjaxContentAdded")
                    }, error: function () {
                        b(), n.finished = n.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", n.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(i), ""
            }
        }
    });
    var E, C = function (n) {
        if (n.data && void 0 !== n.data.title)return n.data.title;
        var i = e.st.image.titleSrc;
        if (i) {
            if (t.isFunction(i))return i.call(e, n);
            if (n.el)return n.el.attr(i) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var n = e.st.image, i = ".image";
                e.types.push("image"), c("Open" + i, function () {
                    "image" === e.currItem.type && n.cursor && t(document.body).addClass(n.cursor)
                }), c("Close" + i, function () {
                    n.cursor && t(document.body).removeClass(n.cursor), h.off("resize.mfp")
                }), c("Resize" + i, e.resizeImage), e.isLowIE && c("AfterChange", e.resizeImage)
            }, resizeImage: function () {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var n = 0;
                    e.isLowIE && (n = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - n)
                }
            }, _onImageHasSize: function (t) {
                t.img && (t.hasSize = !0, E && clearInterval(E), t.isCheckingImgSize = !1, u("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            }, findImageSize: function (t) {
                var n = 0, i = t.img[0], o = function (s) {
                    E && clearInterval(E), E = setInterval(function () {
                        if (i.naturalWidth > 0)return void e._onImageHasSize(t);
                        n > 200 && clearInterval(E), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500)
                    }, s)
                };
                o(1)
            }, getImage: function (n, i) {
                var o = 0, s = function () {
                    n && (n.img[0].complete ? (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, u("ImageLoadComplete")) : (o++, o < 200 ? setTimeout(s, 100) : r()))
                }, r = function () {
                    n && (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("error", a.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                }, a = e.st.image, l = i.find(".mfp-img");
                if (l.length) {
                    var h = document.createElement("img");
                    h.className = "mfp-img", n.el && n.el.find("img").length && (h.alt = n.el.find("img").attr("alt")), n.img = t(h).on("load.mfploader", s).on("error.mfploader", r), h.src = n.src, l.is("img") && (n.img = n.img.clone()), h = n.img[0], h.naturalWidth > 0 ? n.hasSize = !0 : h.width || (n.hasSize = !1)
                }
                return e._parseMarkup(i, {
                    title: C(n),
                    img_replaceWith: n.img
                }, n), e.resizeImage(), n.hasSize ? (E && clearInterval(E), n.loadError ? (i.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), e.updateStatus("ready")), i) : (e.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), e.findImageSize(n)), i)
            }
        }
    });
    var z, S = function () {
        return void 0 === z && (z = void 0 !== document.createElement("p").style.MozTransform), z
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (t) {
                return t.is("img") ? t : t.find("img")
            }
        }, proto: {
            initZoom: function () {
                var t, n = e.st.zoom, i = ".zoom";
                if (n.enabled && e.supportsTransition) {
                    var o, s, r = n.duration, a = function (t) {
                        var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            i = "all " + n.duration / 1e3 + "s " + n.easing, o = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, s = "transition";
                        return o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = i, e.css(o), e
                    }, l = function () {
                        e.content.css("visibility", "visible")
                    };
                    c("BuildControls" + i, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom()))return void l();
                            s = a(t), s.css(e._getOffset()), e.wrap.append(s), o = setTimeout(function () {
                                s.css(e._getOffset(!0)), o = setTimeout(function () {
                                    l(), setTimeout(function () {
                                        s.remove(), t = s = null, u("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), c("BeforeClose" + i, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.st.removalDelay = r, !t) {
                                if (!(t = e._getItemToZoom()))return;
                                s = a(t)
                            }
                            s.css(e._getOffset(!0)), e.wrap.append(s), e.content.css("visibility", "hidden"), setTimeout(function () {
                                s.css(e._getOffset())
                            }, 16)
                        }
                    }), c("Close" + i, function () {
                        e._allowZoom() && (l(), s && s.remove(), t = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === e.currItem.type
            }, _getItemToZoom: function () {
                return !!e.currItem.hasSize && e.currItem.img
            }, _getOffset: function (n) {
                var i;
                i = n ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                var o = i.offset(), s = parseInt(i.css("padding-top"), 10), r = parseInt(i.css("padding-bottom"), 10);
                o.top -= t(window).scrollTop() - s;
                var a = {width: i.width(), height: (l ? i.innerHeight() : i[0].offsetHeight) - r - s};
                return S() ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a
            }
        }
    });
    var I = function (t) {
        if (e.currTemplate.iframe) {
            var n = e.currTemplate.iframe.find("iframe");
            n.length && (t || (n[0].src = "//about:blank"), e.isIE8 && n.css("display", t ? "block" : "none"))
        }
    };
    t.magnificPopup.registerModule("iframe", {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                e.types.push("iframe"), c("BeforeChange", function (t, e, n) {
                    e !== n && ("iframe" === e ? I() : "iframe" === n && I(!0))
                }), c("Close.iframe", function () {
                    I()
                })
            }, getIframe: function (n, i) {
                var o = n.src, s = e.st.iframe;
                t.each(s.patterns, function () {
                    if (o.indexOf(this.index) > -1)return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1
                });
                var r = {};
                return s.srcAction && (r[s.srcAction] = o), e._parseMarkup(i, r, n), e.updateStatus("ready"), i
            }
        }
    });
    var O = function (t) {
        var n = e.items.length;
        return t > n - 1 ? t - n : t < 0 ? n + t : t
    }, L = function (t, e, n) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n)
    };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var n = e.st.gallery, o = ".mfp-gallery";
                if (e.direction = !0, !n || !n.enabled)return !1;
                s += " mfp-gallery", c("Open" + o, function () {
                    n.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function () {
                        if (e.items.length > 1)return e.next(), !1
                    }), i.on("keydown" + o, function (t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), c("UpdateStatus" + o, function (t, n) {
                    n.text && (n.text = L(n.text, e.currItem.index, e.items.length))
                }), c("MarkupParse" + o, function (t, i, o, s) {
                    var r = e.items.length;
                    o.counter = r > 1 ? L(n.tCounter, s.index, r) : ""
                }), c("BuildControls" + o, function () {
                    if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = e.arrowLeft = t(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass("mfp-prevent-close"),
                            s = e.arrowRight = t(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass("mfp-prevent-close");
                        o.click(function () {
                            e.prev()
                        }), s.click(function () {
                            e.next()
                        }), e.container.append(o.add(s))
                    }
                }), c("Change" + o, function () {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), c("Close" + o, function () {
                    i.off(o), e.wrap.off("click" + o), e.arrowRight = e.arrowLeft = null
                })
            }, next: function () {
                e.direction = !0, e.index = O(e.index + 1), e.updateItemHTML()
            }, prev: function () {
                e.direction = !1, e.index = O(e.index - 1), e.updateItemHTML()
            }, goTo: function (t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            }, preloadNearbyImages: function () {
                var t, n = e.st.gallery.preload, i = Math.min(n[0], e.items.length), o = Math.min(n[1], e.items.length);
                for (t = 1; t <= (e.direction ? o : i); t++)e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? i : o); t++)e._preloadItem(e.index - t)
            }, _preloadItem: function (n) {
                if (n = O(n), !e.items[n].preloaded) {
                    var i = e.items[n];
                    i.parsed || (i = e.parseEl(n)), u("LazyLoad", i), "image" === i.type && (i.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
                        i.hasSize = !0
                    }).on("error.mfploader", function () {
                        i.hasSize = !0, i.loadError = !0, u("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    t.magnificPopup.registerModule("retina", {
        options: {
            replaceSrc: function (t) {
                return t.src.replace(/\.\w+$/, function (t) {
                    return "@2x" + t
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina, n = t.ratio;
                    n = isNaN(n) ? n() : n, n > 1 && (c("ImageHasSize.retina", function (t, e) {
                        e.img.css({"max-width": e.img[0].naturalWidth / n, width: "100%"})
                    }), c("ElementParse.retina", function (e, i) {
                        i.src = t.replaceSrc(i, n)
                    }))
                }
            }
        }
    }), f()
}), function (t) {
    var e = {animation: "dissolve", separator: ",", speed: 2e3};
    t.fx.step.textShadowBlur = function (e) {
        t(e.elem).prop("textShadowBlur", e.now).css({textShadow: "0 0 " + Math.floor(e.now) + "px black"})
    }, t.fn.textrotator = function (n) {
        var i = t.extend({}, e, n);
        return this.each(function () {
            var e = t(this), n = [];
            t.each(e.text().split(i.separator), function (t, e) {
                n.push(e)
            }), e.text(n[0]);
            var o = function () {
                switch (i.animation) {
                    case"dissolve":
                        e.animate({textShadowBlur: 20, opacity: 0}, 500, function () {
                            s = t.inArray(e.text(), n), s + 1 == n.length && (s = -1), e.text(n[s + 1]).animate({
                                textShadowBlur: 0,
                                opacity: 1
                            }, 500)
                        });
                        break;
                    case"flip":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({
                            "-webkit-transform": " rotateY(-180deg)",
                            "-moz-transform": " rotateY(-180deg)",
                            "-o-transform": " rotateY(-180deg)",
                            transform: " rotateY(-180deg)"
                        });
                        break;
                    case"flipUp":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({
                            "-webkit-transform": " rotateX(-180deg)",
                            "-moz-transform": " rotateX(-180deg)",
                            "-o-transform": " rotateX(-180deg)",
                            transform: " rotateX(-180deg)"
                        });
                        break;
                    case"flipCube":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({
                            "-webkit-transform": " rotateY(180deg)",
                            "-moz-transform": " rotateY(180deg)",
                            "-o-transform": " rotateY(180deg)",
                            transform: " rotateY(180deg)"
                        });
                        break;
                    case"flipCubeUp":
                        e.find(".back").length > 0 && e.html(e.find(".back").html());
                        var o = e.text(), s = t.inArray(o, n);
                        s + 1 == n.length && (s = -1), e.html(""), t("<span class='front'>" + o + "</span>").appendTo(e), t("<span class='back'>" + n[s + 1] + "</span>").appendTo(e), e.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({
                            "-webkit-transform": " rotateX(180deg)",
                            "-moz-transform": " rotateX(180deg)",
                            "-o-transform": " rotateX(180deg)",
                            transform: " rotateX(180deg)"
                        });
                        break;
                    case"spin":
                        e.find(".rotating").length > 0 && e.html(e.find(".rotating").html()), s = t.inArray(e.text(), n), s + 1 == n.length && (s = -1), e.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(n[s + 1]).show().css({
                            "-webkit-transform": " rotate(0) scale(1)",
                            "-moz-transform": "rotate(0) scale(1)",
                            "-o-transform": "rotate(0) scale(1)",
                            transform: "rotate(0) scale(1)"
                        });
                        break;
                    case"fade":
                        e.fadeOut(i.speed, function () {
                            s = t.inArray(e.text(), n), s + 1 == n.length && (s = -1), e.text(n[s + 1]).fadeIn(i.speed)
                        })
                }
            };
            setInterval(o, i.speed)
        })
    }
}(window.jQuery), function (t) {
    function e() {
    }

    function n(t) {
        function n(e) {
            e.prototype.option || (e.prototype.option = function (e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            })
        }

        function o(e, n) {
            t.fn[e] = function (o) {
                if ("string" == typeof o) {
                    for (var r = i.call(arguments, 1), a = 0, l = this.length; l > a; a++) {
                        var h = this[a], c = t.data(h, e);
                        if (c)if (t.isFunction(c[o]) && "_" !== o.charAt(0)) {
                            var d = c[o].apply(c, r);
                            if (void 0 !== d)return d
                        } else s("no such method '" + o + "' for " + e + " instance"); else s("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
                    }
                    return this
                }
                return this.each(function () {
                    var i = t.data(this, e);
                    i ? (i.option(o), i._init()) : (i = new n(this, o), t.data(this, e, i))
                })
            }
        }

        if (t) {
            var s = "undefined" == typeof console ? e : function (t) {
                console.error(t)
            };
            return t.bridget = function (t, e) {
                n(e), o(t, e)
            }, t.bridget
        }
    }

    var i = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], n) : n("object" == typeof exports ? require("jquery") : t.jQuery)
}(window), function (t) {
    function e(e) {
        var n = t.event;
        return n.target = n.target || n.srcElement || e, n
    }

    var n = document.documentElement, i = function () {
    };
    n.addEventListener ? i = function (t, e, n) {
        t.addEventListener(e, n, !1)
    } : n.attachEvent && (i = function (t, n, i) {
            t[n + i] = i.handleEvent ? function () {
                var n = e(t);
                i.handleEvent.call(i, n)
            } : function () {
                var n = e(t);
                i.call(t, n)
            }, t.attachEvent("on" + n, t[n + i])
        });
    var o = function () {
    };
    n.removeEventListener ? o = function (t, e, n) {
        t.removeEventListener(e, n, !1)
    } : n.detachEvent && (o = function (t, e, n) {
            t.detachEvent("on" + e, t[e + n]);
            try {
                delete t[e + n]
            } catch (i) {
                t[e + n] = void 0
            }
        });
    var s = {bind: i, unbind: o};
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? module.exports = s : t.eventie = s
}(this), function (t) {
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : r.push(t))
    }

    function n(t) {
        var n = "readystatechange" === t.type && "complete" !== s.readyState;
        e.isReady || n || i()
    }

    function i() {
        e.isReady = !0;
        for (var t = 0, n = r.length; n > t; t++) {
            (0, r[t])()
        }
    }

    function o(o) {
        return "complete" === s.readyState ? i() : (o.bind(s, "DOMContentLoaded", n), o.bind(s, "readystatechange", n), o.bind(t, "load", n)), e
    }

    var s = t.document, r = [];
    e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], o) : "object" == typeof exports ? module.exports = o(require("eventie")) : t.docReady = o(t.eventie)
}(window), function () {
    function t() {
    }

    function e(t, e) {
        for (var n = t.length; n--;)if (t[n].listener === e)return n;
        return -1
    }

    function n(t) {
        return function () {
            return this[t].apply(this, arguments)
        }
    }

    var i = t.prototype, o = this, s = o.EventEmitter;
    i.getListeners = function (t) {
        var e, n, i = this._getEvents();
        if (t instanceof RegExp) {
            e = {};
            for (n in i)i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n])
        } else e = i[t] || (i[t] = []);
        return e
    }, i.flattenListeners = function (t) {
        var e, n = [];
        for (e = 0; e < t.length; e += 1)n.push(t[e].listener);
        return n
    }, i.getListenersAsObject = function (t) {
        var e, n = this.getListeners(t);
        return n instanceof Array && (e = {}, e[t] = n), e || n
    }, i.addListener = function (t, n) {
        var i, o = this.getListenersAsObject(t), s = "object" == typeof n;
        for (i in o)o.hasOwnProperty(i) && -1 === e(o[i], n) && o[i].push(s ? n : {listener: n, once: !1});
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (t, e) {
        return this.addListener(t, {listener: e, once: !0})
    }, i.once = n("addOnceListener"), i.defineEvent = function (t) {
        return this.getListeners(t), this
    }, i.defineEvents = function (t) {
        for (var e = 0; e < t.length; e += 1)this.defineEvent(t[e]);
        return this
    }, i.removeListener = function (t, n) {
        var i, o, s = this.getListenersAsObject(t);
        for (o in s)s.hasOwnProperty(o) && -1 !== (i = e(s[o], n)) && s[o].splice(i, 1);
        return this
    }, i.off = n("removeListener"), i.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e)
    }, i.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e)
    }, i.manipulateListeners = function (t, e, n) {
        var i, o, s = t ? this.removeListener : this.addListener, r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)for (i = n.length; i--;)s.call(this, e, n[i]); else for (i in e)e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? s.call(this, i, o) : r.call(this, i, o));
        return this
    }, i.removeEvent = function (t) {
        var e, n = typeof t, i = this._getEvents();
        if ("string" === n) delete i[t]; else if (t instanceof RegExp)for (e in i)i.hasOwnProperty(e) && t.test(e) && delete i[e]; else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (t, e) {
        var n, i, o, s = this.getListenersAsObject(t);
        for (o in s)if (s.hasOwnProperty(o))for (i = s[o].length; i--;)n = s[o][i], !0 === n.once && this.removeListener(t, n.listener), n.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }, i.setOnceReturnValue = function (t) {
        return this._onceReturnValue = t, this
    }, i._getOnceReturnValue = function () {
        return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, t.noConflict = function () {
        return o.EventEmitter = s, t
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : o.EventEmitter = t
}.call(this), function (t) {
    function e(t) {
        if (t) {
            if ("string" == typeof i[t])return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, o = 0, s = n.length; s > o; o++)if (e = n[o] + t, "string" == typeof i[e])return e
        }
    }

    var n = "Webkit Moz ms Ms O".split(" "), i = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
        return e
    }) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window), function (t) {
    function e(t) {
        var e = parseFloat(t);
        return -1 === t.indexOf("%") && !isNaN(e) && e
    }

    function n() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0, n = s.length; n > e; e++) {
            t[s[e]] = 0
        }
        return t
    }

    function i(i) {
        function r() {
            if (!u) {
                u = !0;
                var n = t.getComputedStyle;
                if (h = function () {
                        var t = n ? function (t) {
                            return n(t, null)
                        } : function (t) {
                            return t.currentStyle
                        };
                        return function (e) {
                            var n = t(e);
                            return n || o("Style returned " + n + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizeiframe"), n
                        }
                    }(), c = i("boxSizing")) {
                    var s = document.createElement("div");
                    s.style.width = "200px", s.style.padding = "1px 2px 3px 4px", s.style.borderStyle = "solid", s.style.borderWidth = "1px 2px 3px 4px", s.style[c] = "border-box";
                    var r = document.body || document.documentElement;
                    r.appendChild(s);
                    var a = h(s);
                    d = 200 === e(a.width), r.removeChild(s)
                }
            }
        }

        function a(t) {
            if (r(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var i = h(t);
                if ("none" === i.display)return n();
                var o = {};
                o.width = t.offsetWidth, o.height = t.offsetHeight;
                for (var a = o.isBorderBox = !(!c || !i[c] || "border-box" !== i[c]), u = 0, p = s.length; p > u; u++) {
                    var f = s[u], m = i[f];
                    m = l(t, m);
                    var g = parseFloat(m);
                    o[f] = isNaN(g) ? 0 : g
                }
                var v = o.paddingLeft + o.paddingRight, y = o.paddingTop + o.paddingBottom,
                    w = o.marginLeft + o.marginRight, _ = o.marginTop + o.marginBottom,
                    b = o.borderLeftWidth + o.borderRightWidth, T = o.borderTopWidth + o.borderBottomWidth, E = a && d,
                    C = e(i.width);
                !1 !== C && (o.width = C + (E ? 0 : v + b));
                var z = e(i.height);
                return !1 !== z && (o.height = z + (E ? 0 : y + T)), o.innerWidth = o.width - (v + b), o.innerHeight = o.height - (y + T), o.outerWidth = o.width + w, o.outerHeight = o.height + _, o
            }
        }

        function l(t, e) {
            if (getComputedStyle || -1 === e.indexOf("%"))return e;
            var n = t.style, i = n.left, o = t.runtimeStyle, s = o && o.left;
            return s && (o.left = t.currentStyle.left), n.left = e, e = n.pixelLeft, n.left = i, s && (o.left = s), e
        }

        var h, c, d, u = !1;
        return a
    }

    var o = "undefined" == typeof console ? noop : function (t) {
            console.error(t)
        },
        s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], i) : "object" == typeof exports ? module.exports = i(require("desandro-get-style-property")) : t.getSize = i(t.getStyleProperty)
}(window), function (t) {
    function e(t, e) {
        return t[r](e)
    }

    function n(t) {
        if (!t.parentNode) {
            document.createDocumentFragment().appendChild(t)
        }
    }

    function i(t, e) {
        n(t);
        for (var i = t.parentNode.querySelectorAll(e), o = 0, s = i.length; s > o; o++)if (i[o] === t)return !0;
        return !1
    }

    function o(t, i) {
        return n(t), e(t, i)
    }

    var s, r = function () {
        if (t.matchesSelector)return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], n = 0, i = e.length; i > n; n++) {
            var o = e[n], s = o + "MatchesSelector";
            if (t[s])return s
        }
    }();
    if (r) {
        var a = document.createElement("div"), l = e(a, "div");
        s = l ? e : o
    } else s = i;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
        return s
    }) : "object" == typeof exports ? module.exports = s : window.matchesSelector = s
}(Element.prototype), function (t) {
    function e(t, e) {
        for (var n in e)t[n] = e[n];
        return t
    }

    function n(t) {
        for (var e in t)return !1;
        return null, !0
    }

    function i(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    function o(t, o, s) {
        function a(t, e) {
            t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
        }

        var l = s("transition"), h = s("transform"), c = l && h, d = !!s("perspective"), u = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[l], p = ["transform", "transition", "transitionDuration", "transitionProperty"], f = function () {
            for (var t = {}, e = 0, n = p.length; n > e; e++) {
                var i = p[e], o = s(i);
                o && o !== i && (t[i] = o)
            }
            return t
        }();
        e(a.prototype, t.prototype), a.prototype._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, a.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.getSize = function () {
            this.size = o(this.element)
        }, a.prototype.css = function (t) {
            var e = this.element.style;
            for (var n in t) {
                e[f[n] || n] = t[n]
            }
        }, a.prototype.getPosition = function () {
            var t = r(this.element), e = this.layout.options, n = e.isOriginLeft, i = e.isOriginTop,
                o = parseInt(t[n ? "left" : "right"], 10), s = parseInt(t[i ? "top" : "bottom"], 10);
            o = isNaN(o) ? 0 : o, s = isNaN(s) ? 0 : s;
            var a = this.layout.size;
            o -= n ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = s
        }, a.prototype.layoutPosition = function () {
            var t = this.layout.size, e = this.layout.options, n = {};
            e.isOriginLeft ? (n.left = this.position.x + t.paddingLeft + "px", n.right = "") : (n.right = this.position.x + t.paddingRight + "px", n.left = ""), e.isOriginTop ? (n.top = this.position.y + t.paddingTop + "px", n.bottom = "") : (n.bottom = this.position.y + t.paddingBottom + "px", n.top = ""), this.css(n), this.emitEvent("layout", [this])
        };
        var m = d ? function (t, e) {
            return "translate3d(" + t + "px, " + e + "px, 0)"
        } : function (t, e) {
            return "translate(" + t + "px, " + e + "px)"
        };
        a.prototype._transitionTo = function (t, e) {
            this.getPosition();
            var n = this.position.x, i = this.position.y, o = parseInt(t, 10), s = parseInt(e, 10),
                r = o === this.position.x && s === this.position.y;
            if (this.setPosition(t, e), r && !this.isTransitioning)return void this.layoutPosition();
            var a = t - n, l = e - i, h = {}, c = this.layout.options;
            a = c.isOriginLeft ? a : -a, l = c.isOriginTop ? l : -l, h.transform = m(a, l), this.transition({
                to: h,
                onTransitionEnd: {transform: this.layoutPosition},
                isCleaning: !0
            })
        }, a.prototype.goTo = function (t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, a.prototype.moveTo = c ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, a.prototype._nonTransition = function (t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)
        }, a.prototype._transition = function (t) {
            if (!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);
            var e = this._transn;
            for (var n in t.onTransitionEnd)e.onEnd[n] = t.onTransitionEnd[n];
            for (n in t.to)e.ingProperties[n] = !0, t.isCleaning && (e.clean[n] = !0);
            if (t.from) {
                this.css(t.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var g = h && i(h) + ",opacity";
        a.prototype.enableTransition = function () {
            this.isTransitioning || (this.css({
                transitionProperty: g,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(u, this, !1))
        }, a.prototype.transition = a.prototype[l ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (t) {
            this.ontransitionend(t)
        }, a.prototype.onotransitionend = function (t) {
            this.ontransitionend(t)
        };
        var v = {"-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform"};
        a.prototype.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn, i = v[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i], n(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) {
                    e.onEnd[i].call(this), delete e.onEnd[i]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, a.prototype.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
        }, a.prototype._removeStyles = function (t) {
            var e = {};
            for (var n in t)e[n] = "";
            this.css(e)
        };
        var y = {transitionProperty: "", transitionDuration: ""};
        return a.prototype.removeTransitionStyles = function () {
            this.css(y)
        }, a.prototype.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, a.prototype.remove = function () {
            if (!l || !parseFloat(this.layout.options.transitionDuration))return void this.removeElem();
            var t = this;
            this.on("transitionEnd", function () {
                return t.removeElem(), !0
            }), this.hide()
        }, a.prototype.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var t = this.layout.options;
            this.transition({from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0})
        }, a.prototype.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var t = this.layout.options;
            this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function () {
                        this.isHidden && this.css({display: "none"})
                    }
                }
            })
        }, a.prototype.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, a
    }

    var s = t.getComputedStyle, r = s ? function (t) {
        return s(t, null)
    } : function (t) {
        return t.currentStyle
    };
    "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], o) : "object" == typeof exports ? module.exports = o(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (t.Outlayer = {}, t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty))
}(window), function (t) {
    function e(t, e) {
        for (var n in e)t[n] = e[n];
        return t
    }

    function n(t) {
        return "[object Array]" === d.call(t)
    }

    function i(t) {
        var e = [];
        if (n(t)) e = t; else if (t && "number" == typeof t.length)for (var i = 0, o = t.length; o > i; i++)e.push(t[i]); else e.push(t);
        return e
    }

    function o(t, e) {
        var n = p(e, t);
        -1 !== n && e.splice(n, 1)
    }

    function s(t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, n) {
            return e + "-" + n
        }).toLowerCase()
    }

    function r(n, r, d, p, f, m) {
        function g(t, n) {
            if ("string" == typeof t && (t = a.querySelector(t)), !t || !u(t))return void(l && l.error("Bad " + this.constructor.namespace + " element: " + t));
            this.element = t, this.options = e({}, this.constructor.defaults), this.option(n);
            var i = ++v;
            this.element.outlayerGUID = i, y[i] = this, this._create(), this.options.isInitLayout && this.layout()
        }

        var v = 0, y = {};
        return g.namespace = "outlayer", g.Item = m, g.defaults = {
            containerStyle: {position: "relative"},
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
            visibleStyle: {opacity: 1, transform: "scale(1)"}
        }, e(g.prototype, d.prototype), g.prototype.option = function (t) {
            e(this.options, t)
        }, g.prototype._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, g.prototype.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, g.prototype._itemize = function (t) {
            for (var e = this._filterFindItemElements(t), n = this.constructor.Item, i = [], o = 0, s = e.length; s > o; o++) {
                var r = e[o], a = new n(r, this);
                i.push(a)
            }
            return i
        }, g.prototype._filterFindItemElements = function (t) {
            t = i(t);
            for (var e = this.options.itemSelector, n = [], o = 0, s = t.length; s > o; o++) {
                var r = t[o];
                if (u(r))if (e) {
                    f(r, e) && n.push(r);
                    for (var a = r.querySelectorAll(e), l = 0, h = a.length; h > l; l++)n.push(a[l])
                } else n.push(r)
            }
            return n
        }, g.prototype.getItemElements = function () {
            for (var t = [], e = 0, n = this.items.length; n > e; e++)t.push(this.items[e].element);
            return t
        }, g.prototype.layout = function () {
            this._resetLayout(), this._manageStamps();
            var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, t), this._isLayoutInited = !0
        }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function () {
            this.getSize()
        }, g.prototype.getSize = function () {
            this.size = p(this.element)
        }, g.prototype._getMeasurement = function (t, e) {
            var n, i = this.options[t];
            i ? ("string" == typeof i ? n = this.element.querySelector(i) : u(i) && (n = i), this[t] = n ? p(n)[e] : i) : this[t] = 0
        }, g.prototype.layoutItems = function (t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, g.prototype._getItemsForLayout = function (t) {
            for (var e = [], n = 0, i = t.length; i > n; n++) {
                var o = t[n];
                o.isIgnored || e.push(o)
            }
            return e
        }, g.prototype._layoutItems = function (t, e) {
            function n() {
                i.emitEvent("layoutComplete", [i, t])
            }

            var i = this;
            if (!t || !t.length)return void n();
            this._itemsOn(t, "layout", n);
            for (var o = [], s = 0, r = t.length; r > s; s++) {
                var a = t[s], l = this._getItemLayoutPosition(a);
                l.item = a, l.isInstant = e || a.isLayoutInstant, o.push(l)
            }
            this._processLayoutQueue(o)
        }, g.prototype._getItemLayoutPosition = function () {
            return {x: 0, y: 0}
        }, g.prototype._processLayoutQueue = function (t) {
            for (var e = 0, n = t.length; n > e; e++) {
                var i = t[e];
                this._positionItem(i.item, i.x, i.y, i.isInstant)
            }
        }, g.prototype._positionItem = function (t, e, n, i) {
            i ? t.goTo(e, n) : t.moveTo(e, n)
        }, g.prototype._postLayout = function () {
            this.resizeContainer()
        }, g.prototype.resizeContainer = function () {
            if (this.options.isResizingContainer) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, g.prototype._getContainerSize = c, g.prototype._setContainerMeasure = function (t, e) {
            if (void 0 !== t) {
                var n = this.size;
                n.isBorderBox && (t += e ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, g.prototype._itemsOn = function (t, e, n) {
            function i() {
                return o++, o === s && n.call(r), !0
            }

            for (var o = 0, s = t.length, r = this, a = 0, l = t.length; l > a; a++) {
                t[a].on(e, i)
            }
        }, g.prototype.ignore = function (t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, g.prototype.unignore = function (t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, g.prototype.stamp = function (t) {
            if (t = this._find(t)) {
                this.stamps = this.stamps.concat(t);
                for (var e = 0, n = t.length; n > e; e++) {
                    var i = t[e];
                    this.ignore(i)
                }
            }
        }, g.prototype.unstamp = function (t) {
            if (t = this._find(t))for (var e = 0, n = t.length; n > e; e++) {
                var i = t[e];
                o(i, this.stamps), this.unignore(i)
            }
        }, g.prototype._find = function (t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = i(t)) : void 0
        }, g.prototype._manageStamps = function () {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var t = 0, e = this.stamps.length; e > t; t++) {
                    var n = this.stamps[t];
                    this._manageStamp(n)
                }
            }
        }, g.prototype._getBoundingRect = function () {
            var t = this.element.getBoundingClientRect(), e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, g.prototype._manageStamp = c, g.prototype._getElementOffset = function (t) {
            var e = t.getBoundingClientRect(), n = this._boundingRect, i = p(t);
            return {
                left: e.left - n.left - i.marginLeft,
                top: e.top - n.top - i.marginTop,
                right: n.right - e.right - i.marginRight,
                bottom: n.bottom - e.bottom - i.marginBottom
            }
        }, g.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, g.prototype.bindResize = function () {
            this.isResizeBound || (n.bind(t, "resize", this), this.isResizeBound = !0)
        }, g.prototype.unbindResize = function () {
            this.isResizeBound && n.unbind(t, "resize", this), this.isResizeBound = !1
        }, g.prototype.onresize = function () {
            function t() {
                e.resize(), delete e.resizeTimeout
            }

            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var e = this;
            this.resizeTimeout = setTimeout(t, 100)
        }, g.prototype.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, g.prototype.needsResizeLayout = function () {
            var t = p(this.element);
            return this.size && t && t.innerWidth !== this.size.innerWidth
        }, g.prototype.addItems = function (t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, g.prototype.appended = function (t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, g.prototype.prepended = function (t) {
            var e = this._itemize(t);
            if (e.length) {
                var n = this.items.slice(0);
                this.items = e.concat(n), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(n)
            }
        }, g.prototype.reveal = function (t) {
            var e = t && t.length;
            if (e)for (var n = 0; e > n; n++) {
                var i = t[n];
                i.reveal()
            }
        }, g.prototype.hide = function (t) {
            var e = t && t.length;
            if (e)for (var n = 0; e > n; n++) {
                var i = t[n];
                i.hide()
            }
        }, g.prototype.getItem = function (t) {
            for (var e = 0, n = this.items.length; n > e; e++) {
                var i = this.items[e];
                if (i.element === t)return i
            }
        }, g.prototype.getItems = function (t) {
            if (t && t.length) {
                for (var e = [], n = 0, i = t.length; i > n; n++) {
                    var o = t[n], s = this.getItem(o);
                    s && e.push(s)
                }
                return e
            }
        }, g.prototype.remove = function (t) {
            t = i(t);
            var e = this.getItems(t);
            if (e && e.length) {
                this._itemsOn(e, "remove", function () {
                    this.emitEvent("removeComplete", [this, e])
                });
                for (var n = 0, s = e.length; s > n; n++) {
                    var r = e[n];
                    r.remove(), o(r, this.items)
                }
            }
        }, g.prototype.destroy = function () {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "";
            for (var e = 0, n = this.items.length; n > e; e++) {
                this.items[e].destroy()
            }
            this.unbindResize();
            var i = this.element.outlayerGUID;
            delete y[i], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
        }, g.data = function (t) {
            var e = t && t.outlayerGUID;
            return e && y[e]
        }, g.create = function (t, n) {
            function i() {
                g.apply(this, arguments)
            }

            return Object.create ? i.prototype = Object.create(g.prototype) : e(i.prototype, g.prototype), i.prototype.constructor = i, i.defaults = e({}, g.defaults), e(i.defaults, n), i.prototype.settings = {}, i.namespace = t, i.data = g.data, i.Item = function () {
                m.apply(this, arguments)
            }, i.Item.prototype = new m, r(function () {
                for (var e = s(t), n = a.querySelectorAll(".js-" + e), o = "data-" + e + "-options", r = 0, c = n.length; c > r; r++) {
                    var d, u = n[r], p = u.getAttribute(o);
                    try {
                        d = p && JSON.parse(p)
                    } catch (t) {
                        l && l.error("Error parsing " + o + " on " + u.nodeName.toLowerCase() + (u.id ? "#" + u.id : "") + ": " + t);
                        continue
                    }
                    var f = new i(u, d);
                    h && h.data(u, t, f)
                }
            }), h && h.bridget && h.bridget(t, i), i
        }, g.Item = m, g
    }

    var a = t.document, l = t.console, h = t.jQuery, c = function () {
        }, d = Object.prototype.toString,
        u = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (t) {
            return t instanceof HTMLElement
        } : function (t) {
            return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
        }, p = Array.prototype.indexOf ? function (t, e) {
            return t.indexOf(e)
        } : function (t, e) {
            for (var n = 0, i = t.length; i > n; n++)if (t[n] === e)return n;
            return -1
        };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], r) : "object" == typeof exports ? module.exports = r(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : t.Outlayer = r(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
}(window), function (t) {
    function e(t, e) {
        var i = t.create("masonry");
        return i.prototype._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--;)this.colYs.push(0);
            this.maxY = 0
        }, i.prototype.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0], n = t && t.element;
                this.columnWidth = n && e(n).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, i.prototype.getContainerWidth = function () {
            var t = this.options.isFitWidth ? this.element.parentNode : this.element, n = e(t);
            this.containerWidth = n && n.innerWidth
        }, i.prototype._getItemLayoutPosition = function (t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil",
                o = Math[i](t.size.outerWidth / this.columnWidth);
            o = Math.min(o, this.cols);
            for (var s = this._getColGroup(o), r = Math.min.apply(Math, s), a = n(s, r), l = {
                x: this.columnWidth * a,
                y: r
            }, h = r + t.size.outerHeight, c = this.cols + 1 - s.length, d = 0; c > d; d++)this.colYs[a + d] = h;
            return l
        }, i.prototype._getColGroup = function (t) {
            if (2 > t)return this.colYs;
            for (var e = [], n = this.cols + 1 - t, i = 0; n > i; i++) {
                var o = this.colYs.slice(i, i + t);
                e[i] = Math.max.apply(Math, o)
            }
            return e
        }, i.prototype._manageStamp = function (t) {
            var n = e(t), i = this._getElementOffset(t), o = this.options.isOriginLeft ? i.left : i.right,
                s = o + n.outerWidth, r = Math.floor(o / this.columnWidth);
            r = Math.max(0, r);
            var a = Math.floor(s / this.columnWidth);
            a -= s % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var l = (this.options.isOriginTop ? i.top : i.bottom) + n.outerHeight, h = r; a >= h; h++)this.colYs[h] = Math.max(l, this.colYs[h])
        }, i.prototype._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {height: this.maxY};
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        }, i.prototype._getContainerFitWidth = function () {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, i.prototype.needsResizeLayout = function () {
            var t = this.containerWidth;
            return this.getContainerWidth(), t !== this.containerWidth
        }, i
    }

    var n = Array.prototype.indexOf ? function (t, e) {
        return t.indexOf(e)
    } : function (t, e) {
        for (var n = 0, i = t.length; i > n; n++) {
            if (t[n] === e)return n
        }
        return -1
    };
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window), window.Modernizr = function (t, e, n) {
    function i(t) {
        f.cssText = t
    }

    function o(t, e) {
        return typeof t === e
    }

    function s(t, e) {
        return !!~("" + t).indexOf(e)
    }

    function r(t, e) {
        for (var i in t) {
            var o = t[i];
            if (!s(o, "-") && f[o] !== n)return "pfx" != e || o
        }
        return !1
    }

    function a(t, e, i) {
        for (var s in t) {
            var r = e[t[s]];
            if (r !== n)return !1 === i ? t[s] : o(r, "function") ? r.bind(i || e) : r
        }
        return !1
    }

    function l(t, e, n) {
        var i = t.charAt(0).toUpperCase() + t.slice(1), s = (t + " " + g.join(i + " ") + i).split(" ");
        return o(e, "string") || o(e, "undefined") ? r(s, e) : (s = (t + " " + v.join(i + " ") + i).split(" "), a(s, e, n))
    }

    var h, c, d = {}, u = e.documentElement, p = e.createElement("modernizr"), f = p.style, m = "Webkit Moz O ms",
        g = m.split(" "), v = m.toLowerCase().split(" "), y = {}, w = [], _ = w.slice, b = {}.hasOwnProperty;
    c = o(b, "undefined") || o(b.call, "undefined") ? function (t, e) {
        return e in t && o(t.constructor.prototype[e], "undefined")
    } : function (t, e) {
        return b.call(t, e)
    }, Function.prototype.bind || (Function.prototype.bind = function (t) {
        var e = this;
        if ("function" != typeof e)throw new TypeError;
        var n = _.call(arguments, 1), i = function () {
            if (this instanceof i) {
                var o = function () {
                };
                o.prototype = e.prototype;
                var s = new o, r = e.apply(s, n.concat(_.call(arguments)));
                return Object(r) === r ? r : s
            }
            return e.apply(t, n.concat(_.call(arguments)))
        };
        return i
    }), y.cssanimations = function () {
        return l("animationName")
    };
    for (var T in y)c(y, T) && (h = T.toLowerCase(), d[h] = y[T](), w.push((d[h] ? "" : "no-") + h));
    return d.addTest = function (t, e) {
        if ("object" == typeof t)for (var i in t)c(t, i) && d.addTest(i, t[i]); else {
            if (t = t.toLowerCase(), d[t] !== n)return d;
            e = "function" == typeof e ? e() : e, u.className += " " + (e ? "" : "no-") + t, d[t] = e
        }
        return d
    }, i(""), p = null, function (t, e) {
        function n(t, e) {
            var n = t.createElement("p"), i = t.getElementsByTagName("head")[0] || t.documentElement;
            return n.innerHTML = "x<style>" + e + "</style>", i.insertBefore(n.lastChild, i.firstChild)
        }

        function i() {
            var t = v.elements;
            return "string" == typeof t ? t.split(" ") : t
        }

        function o(t) {
            var e = g[t[f]];
            return e || (e = {}, m++, t[f] = m, g[m] = e), e
        }

        function s(t, n, i) {
            if (n || (n = e), c)return n.createElement(t);
            i || (i = o(n));
            var s;
            return s = i.cache[t] ? i.cache[t].cloneNode() : p.test(t) ? (i.cache[t] = i.createElem(t)).cloneNode() : i.createElem(t), !s.canHaveChildren || u.test(t) || s.tagUrn ? s : i.frag.appendChild(s)
        }

        function r(t, n) {
            if (t || (t = e), c)return t.createDocumentFragment();
            n = n || o(t);
            for (var s = n.frag.cloneNode(), r = 0, a = i(), l = a.length; r < l; r++)s.createElement(a[r]);
            return s
        }

        function a(t, e) {
            e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function (n) {
                return v.shivMethods ? s(n, t, e) : e.createElem(n)
            }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-]+/g, function (t) {
                    return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                }) + ");return n}")(v, e.frag)
        }

        function l(t) {
            t || (t = e);
            var i = o(t);
            return v.shivCSS && !h && !i.hasCSS && (i.hasCSS = !!n(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), c || a(t, i), t
        }

        var h, c, d = t.html5 || {}, u = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            p = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            f = "_html5shiv", m = 0, g = {};
        !function () {
            try {
                var t = e.createElement("a");
                t.innerHTML = "<xyz></xyz>", h = "hidden" in t, c = 1 == t.childNodes.length || function () {
                        e.createElement("a");
                        var t = e.createDocumentFragment();
                        return void 0 === t.cloneNode || void 0 === t.createDocumentFragment || void 0 === t.createElement
                    }()
            } catch (t) {
                h = !0, c = !0
            }
        }();
        var v = {
            elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: "3.7.0",
            shivCSS: !1 !== d.shivCSS,
            supportsUnknownElements: c,
            shivMethods: !1 !== d.shivMethods,
            type: "default",
            shivDocument: l,
            createElement: s,
            createDocumentFragment: r
        };
        t.html5 = v, l(e)
    }(this, e), d._version = "2.7.1", d._domPrefixes = v, d._cssomPrefixes = g, d.testProp = function (t) {
        return r([t])
    }, d.testAllProps = l, d.prefixed = function (t, e, n) {
        return e ? l(t, e, n) : l(t, "pfx")
    }, u.className = u.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + " js " + w.join(" "), d
}(0, this.document), function (t, e, n) {
    function i(t) {
        return "[object Function]" == g.call(t)
    }

    function o(t) {
        return "string" == typeof t
    }

    function s() {
    }

    function r(t) {
        return !t || "loaded" == t || "complete" == t || "uninitialized" == t
    }

    function a() {
        var t = v.shift();
        y = 1, t ? t.t ? f(function () {
            ("c" == t.t ? u.injectCss : u.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
        }, 0) : (t(), a()) : y = 0
    }

    function l(t, n, i, o, s, l, h) {
        function c(e) {
            if (!p && r(d.readyState) && (w.r = p = 1, !y && a(), d.onload = d.onreadystatechange = null, e)) {
                "img" != t && f(function () {
                    b.removeChild(d)
                }, 50);
                for (var i in S[n])S[n].hasOwnProperty(i) && S[n][i].onload()
            }
        }

        var h = h || u.errorTimeout, d = e.createElement(t), p = 0, g = 0, w = {t: i, s: n, e: s, a: l, x: h};
        1 === S[n] && (g = 1, S[n] = []), "object" == t ? d.data = n : (d.src = n, d.type = t), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function () {
            c.call(this, g)
        }, v.splice(o, 0, w), "img" != t && (g || 2 === S[n] ? (b.insertBefore(d, _ ? null : m), f(c, h)) : S[n].push(d))
    }

    function h(t, e, n, i, s) {
        return y = 0, e = e || "j", o(t) ? l("c" == e ? E : T, t, e, this.i++, n, i, s) : (v.splice(this.i++, 0, t), 1 == v.length && a()), this
    }

    function c() {
        var t = u;
        return t.loader = {load: h, i: 0}, t
    }

    var d, u, p = e.documentElement, f = t.setTimeout, m = e.getElementsByTagName("script")[0], g = {}.toString, v = [],
        y = 0, w = "MozAppearance" in p.style, _ = w && !!e.createRange().compareNode, b = _ ? p : m.parentNode,
        p = t.opera && "[object Opera]" == g.call(t.opera), p = !!e.attachEvent && !p,
        T = w ? "object" : p ? "script" : "img", E = p ? "script" : T, C = Array.isArray || function (t) {
                return "[object Array]" == g.call(t)
            }, z = [], S = {}, I = {
            timeout: function (t, e) {
                return e.length && (t.timeout = e[0]), t
            }
        };
    u = function (t) {
        function e(t) {
            var e, n, i, t = t.split("!"), o = z.length, s = t.pop(), r = t.length,
                s = {url: s, origUrl: s, prefixes: t};
            for (n = 0; n < r; n++)i = t[n].split("="), (e = I[i.shift()]) && (s = e(s, i));
            for (n = 0; n < o; n++)s = z[n](s);
            return s
        }

        function r(t, o, s, r, a) {
            var l = e(t), h = l.autoCallback;
            l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = i(o) ? o : o[t] || o[r] || o[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, o, s, r, a) : (S[l.url] ? l.noexec = !0 : S[l.url] = 1, s.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : n, l.noexec, l.attrs, l.timeout), (i(o) || i(h)) && s.load(function () {
                c(), o && o(l.origUrl, a, r), h && h(l.origUrl, a, r), S[l.url] = 2
            })))
        }

        function a(t, e) {
            function n(t, n) {
                if (t) {
                    if (o(t)) n || (d = function () {
                        var t = [].slice.call(arguments);
                        u.apply(this, t), p()
                    }), r(t, d, e, 0, h); else if (Object(t) === t)for (l in a = function () {
                        var e, n = 0;
                        for (e in t)t.hasOwnProperty(e) && n++;
                        return n
                    }(), t)t.hasOwnProperty(l) && (!n && !--a && (i(d) ? d = function () {
                        var t = [].slice.call(arguments);
                        u.apply(this, t), p()
                    } : d[l] = function (t) {
                        return function () {
                            var e = [].slice.call(arguments);
                            t && t.apply(this, e), p()
                        }
                    }(u[l])), r(t[l], d, e, l, h))
                } else!n && p()
            }

            var a, l, h = !!t.test, c = t.load || t.both, d = t.callback || s, u = d, p = t.complete || s;
            n(h ? t.yep : t.nope, !!c), c && n(c)
        }

        var l, h, d = this.yepnope.loader;
        if (o(t)) r(t, 0, d, 0); else if (C(t))for (l = 0; l < t.length; l++)h = t[l], o(h) ? r(h, 0, d, 0) : C(h) ? u(h) : Object(h) === h && a(h, d); else Object(t) === t && a(t, d)
    }, u.addPrefix = function (t, e) {
        I[t] = e
    }, u.addFilter = function (t) {
        z.push(t)
    }, u.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", d = function () {
        e.removeEventListener("DOMContentLoaded", d, 0), e.readyState = "complete"
    }, 0)), t.yepnope = c(), t.yepnope.executeStack = a, t.yepnope.injectJs = function (t, n, i, o, l, h) {
        var c, d, p = e.createElement("script"), o = o || u.errorTimeout;
        p.src = t;
        for (d in i)p.setAttribute(d, i[d]);
        n = h ? a : n || s, p.onreadystatechange = p.onload = function () {
            !c && r(p.readyState) && (c = 1, n(), p.onload = p.onreadystatechange = null)
        }, f(function () {
            c || (c = 1, n(1))
        }, o), l ? p.onload() : m.parentNode.insertBefore(p, m)
    }, t.yepnope.injectCss = function (t, n, i, o, r, l) {
        var h, o = e.createElement("link"), n = l ? a : n || s;
        o.href = t, o.rel = "stylesheet", o.type = "text/css";
        for (h in i)o.setAttribute(h, i[h]);
        r || (m.parentNode.insertBefore(o, m), f(n, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, function (t, e) {
    "use strict";
    var n;
    if ("object" == typeof exports) {
        try {
            n = require("moment")
        } catch (t) {
        }
        module.exports = e(n)
    } else"function" == typeof define && define.amd ? define(function (t) {
        try {
            n = t("moment")
        } catch (t) {
        }
        return e(n)
    }) : t.Pikaday = e(t.moment)
}(this, function (t) {
    "use strict";
    var e = "function" == typeof t, n = !!window.addEventListener, i = window.document, o = window.setTimeout,
        s = function (t, e, i, o) {
            n ? t.addEventListener(e, i, !!o) : t.attachEvent("on" + e, i)
        }, r = function (t, e, i, o) {
            n ? t.removeEventListener(e, i, !!o) : t.detachEvent("on" + e, i)
        }, a = function (t, e, n) {
            var o;
            i.createEvent ? (o = i.createEvent("HTMLEvents"), o.initEvent(e, !0, !1), o = w(o, n), t.dispatchEvent(o)) : i.createEventObject && (o = i.createEventObject(), o = w(o, n), t.fireEvent("on" + e, o))
        }, l = function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }, h = function (t, e) {
            return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
        }, c = function (t, e) {
            h(t, e) || (t.className = "" === t.className ? e : t.className + " " + e)
        }, d = function (t, e) {
            t.className = l((" " + t.className + " ").replace(" " + e + " ", " "))
        }, u = function (t) {
            return /Array/.test(Object.prototype.toString.call(t))
        }, p = function (t) {
            return /Date/.test(Object.prototype.toString.call(t)) && !isNaN(t.getTime())
        }, f = function (t) {
            var e = t.getDay();
            return 0 === e || 6 === e
        }, m = function (t) {
            return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
        }, g = function (t, e) {
            return [31, m(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        }, v = function (t) {
            p(t) && t.setHours(0, 0, 0, 0)
        }, y = function (t, e) {
            return t.getTime() === e.getTime()
        }, w = function (t, e, n) {
            var i, o;
            for (i in e)o = void 0 !== t[i], o && "object" == typeof e[i] && null !== e[i] && void 0 === e[i].nodeName ? p(e[i]) ? n && (t[i] = new Date(e[i].getTime())) : u(e[i]) ? n && (t[i] = e[i].slice(0)) : t[i] = w({}, e[i], n) : !n && o || (t[i] = e[i]);
            return t
        }, _ = function (t) {
            return t.month < 0 && (t.year -= Math.ceil(Math.abs(t.month) / 12), t.month += 12), t.month > 11 && (t.year += Math.floor(Math.abs(t.month) / 12), t.month -= 12), t
        }, b = {
            field: null,
            bound: void 0,
            position: "bottom left",
            reposition: !0,
            format: "YYYY-MM-DD",
            defaultDate: null,
            setDefaultDate: !1,
            firstDay: 0,
            formatStrict: !1,
            minDate: null,
            maxDate: null,
            yearRange: 10,
            showWeekNumber: !1,
            minYear: 0,
            maxYear: 9999,
            minMonth: void 0,
            maxMonth: void 0,
            startRange: null,
            endRange: null,
            isRTL: !1,
            yearSuffix: "",
            showMonthAfterYear: !1,
            showDaysInNextAndPreviousMonths: !1,
            numberOfMonths: 1,
            mainCalendar: "left",
            container: void 0,
            i18n: {
                previousMonth: "Previous Month",
                nextMonth: "Next Month",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            },
            theme: null,
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null
        }, T = function (t, e, n) {
            for (e += t.firstDay; e >= 7;)e -= 7;
            return n ? t.i18n.weekdaysShort[e] : t.i18n.weekdays[e]
        }, E = function (t) {
            var e = [], n = "false";
            if (t.isEmpty) {
                if (!t.showDaysInNextAndPreviousMonths)return '<td class="is-empty"></td>';
                e.push("is-outside-current-month")
            }
            return t.isDisabled && e.push("is-disabled"), t.isToday && e.push("is-today"), t.isSelected && (e.push("is-selected"), n = "true"), t.isInRange && e.push("is-inrange"), t.isStartRange && e.push("is-startrange"), t.isEndRange && e.push("is-endrange"), '<td data-day="' + t.day + '" class="' + e.join(" ") + '" aria-selected="' + n + '"><button class="pika-button pika-day" type="button" data-pika-year="' + t.year + '" data-pika-month="' + t.month + '" data-pika-day="' + t.day + '">' + t.day + "</button></td>"
        }, C = function (t, e, n) {
            var i = new Date(n, 0, 1);
            return '<td class="pika-week">' + Math.ceil(((new Date(n, e, t) - i) / 864e5 + i.getDay() + 1) / 7) + "</td>"
        }, z = function (t, e) {
            return "<tr>" + (e ? t.reverse() : t).join("") + "</tr>"
        }, S = function (t) {
            return "<tbody>" + t.join("") + "</tbody>"
        }, I = function (t) {
            var e, n = [];
            for (t.showWeekNumber && n.push("<th></th>"), e = 0; e < 7; e++)n.push('<th scope="col"><abbr title="' + T(t, e) + '">' + T(t, e, !0) + "</abbr></th>");
            return "<thead><tr>" + (t.isRTL ? n.reverse() : n).join("") + "</tr></thead>"
        }, O = function (t, e, n, i, o, s) {
            var r, a, l, h, c, d = t._o, p = n === d.minYear, f = n === d.maxYear,
                m = '<div id="' + s + '" class="pika-title" role="heading" aria-live="assertive">', g = !0, v = !0;
            for (l = [], r = 0; r < 12; r++)l.push('<option value="' + (n === o ? r - e : 12 + r - e) + '"' + (r === i ? ' selected="selected"' : "") + (p && r < d.minMonth || f && r > d.maxMonth ? 'disabled="disabled"' : "") + ">" + d.i18n.months[r] + "</option>");
            for (h = '<div class="pika-label">' + d.i18n.months[i] + '<select class="pika-select pika-select-month" tabindex="-1">' + l.join("") + "</select></div>", u(d.yearRange) ? (r = d.yearRange[0], a = d.yearRange[1] + 1) : (r = n - d.yearRange, a = 1 + n + d.yearRange), l = []; r < a && r <= d.maxYear; r++)r >= d.minYear && l.push('<option value="' + r + '"' + (r === n ? ' selected="selected"' : "") + ">" + r + "</option>");
            return c = '<div class="pika-label">' + n + d.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + l.join("") + "</select></div>", d.showMonthAfterYear ? m += c + h : m += h + c, p && (0 === i || d.minMonth >= i) && (g = !1), f && (11 === i || d.maxMonth <= i) && (v = !1), 0 === e && (m += '<button class="pika-prev' + (g ? "" : " is-disabled") + '" type="button">' + d.i18n.previousMonth + "</button>"), e === t._o.numberOfMonths - 1 && (m += '<button class="pika-next' + (v ? "" : " is-disabled") + '" type="button">' + d.i18n.nextMonth + "</button>"), m += "</div>"
        }, L = function (t, e, n) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + n + '">' + I(t) + S(e) + "</table>"
        }, x = function (r) {
            var a = this, l = a.config(r);
            a._onMouseDown = function (t) {
                if (a._v) {
                    t = t || window.event;
                    var e = t.target || t.srcElement;
                    if (e)if (h(e, "is-disabled") || (!h(e, "pika-button") || h(e, "is-empty") || h(e.parentNode, "is-disabled") ? h(e, "pika-prev") ? a.prevMonth() : h(e, "pika-next") && a.nextMonth() : (a.setDate(new Date(e.getAttribute("data-pika-year"), e.getAttribute("data-pika-month"), e.getAttribute("data-pika-day"))), l.bound && o(function () {
                            a.hide(), l.field && l.field.blur()
                        }, 100))), h(e, "pika-select")) a._c = !0; else {
                        if (!t.preventDefault)return t.returnValue = !1, !1;
                        t.preventDefault()
                    }
                }
            }, a._onChange = function (t) {
                t = t || window.event;
                var e = t.target || t.srcElement;
                e && (h(e, "pika-select-month") ? a.gotoMonth(e.value) : h(e, "pika-select-year") && a.gotoYear(e.value))
            }, a._onKeyChange = function (t) {
                if (t = t || window.event, a.isVisible())switch (t.keyCode) {
                    case 13:
                    case 27:
                        l.field.blur();
                        break;
                    case 37:
                        t.preventDefault(), a.adjustDate("subtract", 1);
                        break;
                    case 38:
                        a.adjustDate("subtract", 7);
                        break;
                    case 39:
                        a.adjustDate("add", 1);
                        break;
                    case 40:
                        a.adjustDate("add", 7)
                }
            }, a._onInputChange = function (n) {
                var i;
                n.firedBy !== a && (e ? (i = t(l.field.value, l.format, l.formatStrict), i = i && i.isValid() ? i.toDate() : null) : i = new Date(Date.parse(l.field.value)), p(i) && a.setDate(i), a._v || a.show())
            }, a._onInputFocus = function () {
                a.show()
            }, a._onInputClick = function () {
                a.show()
            }, a._onInputBlur = function () {
                var t = i.activeElement;
                do {
                    if (h(t, "pika-single"))return
                } while (t = t.parentNode);
                a._c || (a._b = o(function () {
                    a.hide()
                }, 50)), a._c = !1
            }, a._onClick = function (t) {
                t = t || window.event;
                var e = t.target || t.srcElement, i = e;
                if (e) {
                    !n && h(e, "pika-select") && (e.onchange || (e.setAttribute("onchange", "return;"), s(e, "change", a._onChange)));
                    do {
                        if (h(i, "pika-single") || i === l.trigger)return
                    } while (i = i.parentNode);
                    a._v && e !== l.trigger && i !== l.trigger && a.hide()
                }
            }, a.el = i.createElement("div"), a.el.className = "pika-single" + (l.isRTL ? " is-rtl" : "") + (l.theme ? " " + l.theme : ""), s(a.el, "mousedown", a._onMouseDown, !0), s(a.el, "touchend", a._onMouseDown, !0), s(a.el, "change", a._onChange), s(i, "keydown", a._onKeyChange), l.field && (l.container ? l.container.appendChild(a.el) : l.bound ? i.body.appendChild(a.el) : l.field.parentNode.insertBefore(a.el, l.field.nextSibling), s(l.field, "change", a._onInputChange), l.defaultDate || (e && l.field.value ? l.defaultDate = t(l.field.value, l.format).toDate() : l.defaultDate = new Date(Date.parse(l.field.value)), l.setDefaultDate = !0));
            var c = l.defaultDate;
            p(c) ? l.setDefaultDate ? a.setDate(c, !0) : a.gotoDate(c) : a.gotoDate(new Date), l.bound ? (this.hide(), a.el.className += " is-bound", s(l.trigger, "click", a._onInputClick), s(l.trigger, "focus", a._onInputFocus), s(l.trigger, "blur", a._onInputBlur)) : this.show()
        };
    return x.prototype = {
        config: function (t) {
            this._o || (this._o = w({}, b, !0));
            var e = w(this._o, t, !0);
            e.isRTL = !!e.isRTL, e.field = e.field && e.field.nodeName ? e.field : null, e.theme = "string" == typeof e.theme && e.theme ? e.theme : null, e.bound = !!(void 0 !== e.bound ? e.field && e.bound : e.field), e.trigger = e.trigger && e.trigger.nodeName ? e.trigger : e.field, e.disableWeekends = !!e.disableWeekends, e.disableDayFn = "function" == typeof e.disableDayFn ? e.disableDayFn : null;
            var n = parseInt(e.numberOfMonths, 10) || 1;
            if (e.numberOfMonths = n > 4 ? 4 : n, p(e.minDate) || (e.minDate = !1), p(e.maxDate) || (e.maxDate = !1), e.minDate && e.maxDate && e.maxDate < e.minDate && (e.maxDate = e.minDate = !1), e.minDate && this.setMinDate(e.minDate), e.maxDate && this.setMaxDate(e.maxDate), u(e.yearRange)) {
                var i = (new Date).getFullYear() - 10;
                e.yearRange[0] = parseInt(e.yearRange[0], 10) || i, e.yearRange[1] = parseInt(e.yearRange[1], 10) || i
            } else e.yearRange = Math.abs(parseInt(e.yearRange, 10)) || b.yearRange, e.yearRange > 100 && (e.yearRange = 100);
            return e
        }, toString: function (n) {
            return p(this._d) ? e ? t(this._d).format(n || this._o.format) : this._d.toDateString() : ""
        }, getMoment: function () {
            return e ? t(this._d) : null
        }, setMoment: function (n, i) {
            e && t.isMoment(n) && this.setDate(n.toDate(), i)
        }, getDate: function () {
            return p(this._d) ? new Date(this._d.getTime()) : new Date
        }, setDate: function (t, e) {
            if (!t)return this._d = null, this._o.field && (this._o.field.value = "", a(this._o.field, "change", {firedBy: this})), this.draw();
            if ("string" == typeof t && (t = new Date(Date.parse(t))), p(t)) {
                var n = this._o.minDate, i = this._o.maxDate;
                p(n) && t < n ? t = n : p(i) && t > i && (t = i), this._d = new Date(t.getTime()), v(this._d), this.gotoDate(this._d), this._o.field && (this._o.field.value = this.toString(), a(this._o.field, "change", {firedBy: this})), e || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate())
            }
        }, gotoDate: function (t) {
            var e = !0;
            if (p(t)) {
                if (this.calendars) {
                    var n = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                        i = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                        o = t.getTime();
                    i.setMonth(i.getMonth() + 1), i.setDate(i.getDate() - 1), e = o < n.getTime() || i.getTime() < o
                }
                e && (this.calendars = [{
                    month: t.getMonth(),
                    year: t.getFullYear()
                }], "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)), this.adjustCalendars()
            }
        }, adjustDate: function (n, i) {
            var o, s = this.getDate(), r = 24 * parseInt(i) * 60 * 60 * 1e3;
            "add" === n ? o = new Date(s.valueOf() + r) : "subtract" === n && (o = new Date(s.valueOf() - r)), e && ("add" === n ? o = t(s).add(i, "days").toDate() : "subtract" === n && (o = t(s).subtract(i, "days").toDate())), this.setDate(o)
        }, adjustCalendars: function () {
            this.calendars[0] = _(this.calendars[0]);
            for (var t = 1; t < this._o.numberOfMonths; t++)this.calendars[t] = _({
                month: this.calendars[0].month + t,
                year: this.calendars[0].year
            });
            this.draw()
        }, gotoToday: function () {
            this.gotoDate(new Date)
        }, gotoMonth: function (t) {
            isNaN(t) || (this.calendars[0].month = parseInt(t, 10), this.adjustCalendars())
        }, nextMonth: function () {
            this.calendars[0].month++, this.adjustCalendars()
        }, prevMonth: function () {
            this.calendars[0].month--, this.adjustCalendars()
        }, gotoYear: function (t) {
            isNaN(t) || (this.calendars[0].year = parseInt(t, 10), this.adjustCalendars())
        }, setMinDate: function (t) {
            t instanceof Date ? (v(t), this._o.minDate = t, this._o.minYear = t.getFullYear(), this._o.minMonth = t.getMonth()) : (this._o.minDate = b.minDate, this._o.minYear = b.minYear, this._o.minMonth = b.minMonth, this._o.startRange = b.startRange), this.draw()
        }, setMaxDate: function (t) {
            t instanceof Date ? (v(t), this._o.maxDate = t, this._o.maxYear = t.getFullYear(), this._o.maxMonth = t.getMonth()) : (this._o.maxDate = b.maxDate, this._o.maxYear = b.maxYear, this._o.maxMonth = b.maxMonth, this._o.endRange = b.endRange), this.draw()
        }, setStartRange: function (t) {
            this._o.startRange = t
        }, setEndRange: function (t) {
            this._o.endRange = t
        }, draw: function (t) {
            if (this._v || t) {
                var e, n = this._o, i = n.minYear, s = n.maxYear, r = n.minMonth, a = n.maxMonth, l = "";
                this._y <= i && (this._y = i, !isNaN(r) && this._m < r && (this._m = r)), this._y >= s && (this._y = s, !isNaN(a) && this._m > a && (this._m = a)), e = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
                for (var h = 0; h < n.numberOfMonths; h++)l += '<div class="pika-lendar">' + O(this, h, this.calendars[h].year, this.calendars[h].month, this.calendars[0].year, e) + this.render(this.calendars[h].year, this.calendars[h].month, e) + "</div>";
                this.el.innerHTML = l, n.bound && "hidden" !== n.field.type && o(function () {
                    n.trigger.focus()
                }, 1), "function" == typeof this._o.onDraw && this._o.onDraw(this), n.bound && n.field.setAttribute("aria-label", "Use the arrow keys to pick a date")
            }
        }, adjustPosition: function () {
            var t, e, n, o, s, r, a, l, h, c;
            if (!this._o.container) {
                if (this.el.style.position = "absolute", t = this._o.trigger, e = t, n = this.el.offsetWidth, o = this.el.offsetHeight, s = window.innerWidth || i.documentElement.clientWidth, r = window.innerHeight || i.documentElement.clientHeight, a = window.pageYOffset || i.body.scrollTop || i.documentElement.scrollTop, "function" == typeof t.getBoundingClientRect) c = t.getBoundingClientRect(), l = c.left + window.pageXOffset, h = c.bottom + window.pageYOffset; else for (l = e.offsetLeft, h = e.offsetTop + e.offsetHeight; e = e.offsetParent;)l += e.offsetLeft, h += e.offsetTop;
                (this._o.reposition && l + n > s || this._o.position.indexOf("right") > -1 && l - n + t.offsetWidth > 0) && (l = l - n + t.offsetWidth), (this._o.reposition && h + o > r + a || this._o.position.indexOf("top") > -1 && h - o - t.offsetHeight > 0) && (h = h - o - t.offsetHeight), this.el.style.left = l + "px", this.el.style.top = h + "px"
            }
        }, render: function (t, e, n) {
            var i = this._o, o = new Date, s = g(t, e), r = new Date(t, e, 1).getDay(), a = [], l = [];
            v(o), i.firstDay > 0 && (r -= i.firstDay) < 0 && (r += 7);
            for (var h = 0 === e ? 11 : e - 1, c = 11 === e ? 0 : e + 1, d = 0 === e ? t - 1 : t, u = 11 === e ? t + 1 : t, m = g(d, h), w = s + r, _ = w; _ > 7;)_ -= 7;
            w += 7 - _;
            for (var b = 0, T = 0; b < w; b++) {
                var S = new Date(t, e, b - r + 1), I = !!p(this._d) && y(S, this._d), O = y(S, o),
                    x = b < r || b >= s + r, k = b - r + 1, A = e, W = t, D = i.startRange && y(i.startRange, S),
                    P = i.endRange && y(i.endRange, S),
                    H = i.startRange && i.endRange && i.startRange < S && S < i.endRange,
                    M = i.minDate && S < i.minDate || i.maxDate && S > i.maxDate || i.disableWeekends && f(S) || i.disableDayFn && i.disableDayFn(S);
                x && (b < r ? (k = m + k, A = h, W = d) : (k -= s, A = c, W = u));
                var N = {
                    day: k,
                    month: A,
                    year: W,
                    isSelected: I,
                    isToday: O,
                    isDisabled: M,
                    isEmpty: x,
                    isStartRange: D,
                    isEndRange: P,
                    isInRange: H,
                    showDaysInNextAndPreviousMonths: i.showDaysInNextAndPreviousMonths
                };
                l.push(E(N)), 7 == ++T && (i.showWeekNumber && l.unshift(C(b - r, e, t)), a.push(z(l, i.isRTL)), l = [], T = 0)
            }
            return L(i, a, n)
        }, isVisible: function () {
            return this._v
        }, show: function () {
            this.isVisible() || (d(this.el, "is-hidden"), this._v = !0, this.draw(), this._o.bound && (s(i, "click", this._onClick), this.adjustPosition()), "function" == typeof this._o.onOpen && this._o.onOpen.call(this))
        }, hide: function () {
            var t = this._v;
            !1 !== t && (this._o.bound && r(i, "click", this._onClick), this.el.style.position = "static", this.el.style.left = "auto", this.el.style.top = "auto", c(this.el, "is-hidden"), this._v = !1, void 0 !== t && "function" == typeof this._o.onClose && this._o.onClose.call(this))
        }, destroy: function () {
            this.hide(), r(this.el, "mousedown", this._onMouseDown, !0), r(this.el, "touchend", this._onMouseDown, !0), r(this.el, "change", this._onChange), this._o.field && (r(this._o.field, "change", this._onInputChange), this._o.bound && (r(this._o.trigger, "click", this._onInputClick), r(this._o.trigger, "focus", this._onInputFocus), r(this._o.trigger, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el)
        }
    }, x
}), document.addEventListener("DOMContentLoaded", function () {
    var t = function () {
        if ("scrollingElement" in document)return document.scrollingElement;
        var t = document.documentElement, e = t.scrollTop;
        t.scrollTop = e + 1;
        var n = t.scrollTop;
        return t.scrollTop = e, n > e ? t : document.body
    }(), e = function (e) {
        var n = t.scrollTop;
        if (2 > e.length) e = -n; else if (e = document.querySelector(e)) {
            e = e.getBoundingClientRect().top;
            var i = t.scrollHeight - window.innerHeight;
            e = n + e < i ? e : i - n
        } else e = void 0;
        if (e)return new Map([["start", n], ["delta", e]])
    }, n = function (n) {
        var i = n.getAttribute("href"), o = e(i);
        if (o) {
            var s = new Map([["duration", 800]]), r = performance.now();
            requestAnimationFrame(function e(n) {
                s.set("elapsed", n - r), n = s.get("duration");
                var a = s.get("elapsed"), l = o.get("start"), h = o.get("delta");
                t.scrollTop = Math.round(h * (1 - Math.pow(2, -10 * a / n)) + l), s.get("elapsed") < s.get("duration") ? requestAnimationFrame(e) : (history.pushState(null, null, i), t.scrollTop = o.get("start") + o.get("delta"))
            })
        }
    }, i = document.querySelectorAll("a.scroll"), o = i.length - 1;
    0 > o || function t(e, i) {
        var o = e.item(i);
        if (o.addEventListener("click", function (t) {
                t.preventDefault(), n(o)
            }), i)return t(e, i - 1)
    }(i, o)
}), function (t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.ScrollTrigger = e()
}(this, function () {
    "use strict";
    return function (t, e, n) {
        function i() {
            var t = p.bindElement.scrollTop ? p.bindElement.scrollTop : document.documentElement.scrollTop,
                e = p.bindElement.scrollLeft ? p.bindElement.scrollLeft : document.documentElement.scrollLeft;
            h.left == e && h.top == t || p.scrollDidChange(), a.length > 0 || l.length > 0 ? (d = !0, c(i)) : d = !1
        }

        function o(t, e) {
            var n = e.split("("), i = n[0];
            if (n.length > 1 ? (n = n[1].split(")")[0], n = n.indexOf("', '") > -1 ? n.split("', '") : n.indexOf("','") > -1 ? n.split("','") : n.indexOf('", "') > -1 ? n.split('", "') : n.indexOf('","') > -1 ? n.split('","') : [n]) : n = [], n = n.map(function (t) {
                    return s(t)
                }), "function" == typeof p.callScope[i])try {
                p.callScope[i].apply(t.element, n)
            } catch (t) {
                try {
                    p.callScope[i].apply(null, n)
                } catch (t) {
                }
            }
        }

        function s(t) {
            return t += "", '"' == t[0] && (t = t.substr(1)), "'" == t[0] && (t = t.substr(1)), '"' == t[t.length - 1] && (t = t.substr(0, t.length - 1)), "'" == t[t.length - 1] && (t = t.substr(0, t.length - 1)), t
        }

        var r = function (t, e) {
            this.element = e, this.defaultOptions = t, this.showCallback = null, this.hideCallback = null, this.visibleClass = "visible", this.hiddenClass = "invisible", this.addWidth = !1, this.addHeight = !1, this.once = !1;
            var n = 0, i = 0;
            this.left = function (t) {
                return function () {
                    return t.element.getBoundingClientRect().left
                }
            }(this), this.top = function (t) {
                return function () {
                    return t.element.getBoundingClientRect().top
                }
            }(this), this.xOffset = function (t) {
                return function (e) {
                    var i = n;
                    return t.addWidth && !e ? i += t.width() : e && !t.addWidth && (i -= t.width()), i
                }
            }(this), this.yOffset = function (t) {
                return function (e) {
                    var n = i;
                    return t.addHeight && !e ? n += t.height() : e && !t.addHeight && (n -= t.height()), n
                }
            }(this), this.width = function (t) {
                return function () {
                    return t.element.offsetWidth
                }
            }(this), this.height = function (t) {
                return function () {
                    return t.element.offsetHeight
                }
            }(this), this.reset = function (t) {
                return function () {
                    t.removeClass(t.visibleClass), t.removeClass(t.hiddenClass)
                }
            }(this), this.addClass = function (t) {
                var e = function (e, n) {
                    t.element.classList.contains(e) || (t.element.classList.add(e), "function" == typeof n && n())
                }, n = function (e, n) {
                    e = e.trim();
                    var i = new RegExp("(?:^|\\s)" + e + "(?:(\\s\\w)|$)", "ig"), o = t.element.className;
                    i.test(o) || (t.element.className += " " + e, "function" == typeof n && n())
                };
                return t.element.classList ? e : n
            }(this), this.removeClass = function (t) {
                var e = function (e, n) {
                    t.element.classList.contains(e) && (t.element.classList.remove(e), "function" == typeof n && n())
                }, n = function (e, n) {
                    e = e.trim();
                    var i = new RegExp("(?:^|\\s)" + e + "(?:(\\s\\w)|$)", "ig"), o = t.element.className;
                    i.test(o) && (t.element.className = o.replace(i, "$1").trim(), "function" == typeof n && n())
                };
                return t.element.classList ? e : n
            }(this), this.init = function (t) {
                return function () {
                    var e = t.defaultOptions, o = t.element.getAttribute("data-scroll");
                    e && (e.toggle && e.toggle.visible && (t.visibleClass = e.toggle.visible), e.toggle && e.toggle.hidden && (t.hiddenClass = e.toggle.hidden), e.showCallback && (t.showCallback = e.showCallback), e.hideCallback && (t.hideCallback = e.hideCallback), !0 === e.centerHorizontal && (n = t.element.offsetWidth / 2), !0 === e.centerVertical && (i = t.element.offsetHeight / 2), e.offset && e.offset.x && (n += e.offset.x), e.offset && e.offset.y && (i += e.offset.y), e.addWidth && (t.addWidth = e.addWidth), e.addHeight && (t.addHeight = e.addHeight), e.once && (t.once = e.once));
                    var s = o.indexOf("addWidth") > -1, r = o.indexOf("addHeight") > -1, a = o.indexOf("once") > -1;
                    !1 === t.addWidth && !0 === s && (t.addWidth = s), !1 === t.addHeight && !0 === r && (t.addHeight = r), !1 === t.once && !0 === a && (t.once = a), t.showCallback = t.element.hasAttribute("data-scroll-showCallback") ? t.element.getAttribute("data-scroll-showCallback") : t.showCallback, t.hideCallback = t.element.hasAttribute("data-scroll-hideCallback") ? t.element.getAttribute("data-scroll-hideCallback") : t.hideCallback;
                    var l = o.split("toggle(");
                    if (l.length > 1) {
                        var h = l[1].split(")")[0].split(",");
                        String.prototype.trim || (String.prototype.trim = function () {
                            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                        }), t.visibleClass = h[0].trim().replace(".", ""), t.hiddenClass = h[1].trim().replace(".", "")
                    }
                    o.indexOf("centerHorizontal") > -1 && (n = t.element.offsetWidth / 2), o.indexOf("centerVertical") > -1 && (i = t.element.offsetHeight / 2);
                    var c = o.split("offset(");
                    if (c.length > 1) {
                        var d = c[1].split(")")[0].split(",");
                        n += parseInt(d[0].replace("px", "")), i += parseInt(d[1].replace("px", ""))
                    }
                    return t
                }
            }(this)
        };
        this.scrollElement = window, this.bindElement = document.body, this.callScope = window;
        var a = [], l = [], h = {left: -1, top: -1},
            c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (t) {
                    setTimeout(t, 1e3 / 60)
                }, d = !1, u = function (t) {
                return function (e, n, i) {
                    return t.bindElement = void 0 != n && null != n ? n : document.body, t.scrollElement = void 0 != i && null != i ? i : window, t.bind(t.bindElement.querySelectorAll("[data-scroll]")), t
                }
            }(this);
        this.bind = function (e) {
            return function (n) {
                n instanceof HTMLElement && (n = [n]);
                var o = [].slice.call(n);
                return o = o.map(function (e, n) {
                    return new r(t, e).init()
                }), a = a.concat(o), a.length > 0 && 0 == d ? (d = !0, i()) : d = !1, e
            }
        }(this), this.triggerFor = function (t) {
            return function (t) {
                var e = null;
                return a.each(function (n, i) {
                    n.element == t && (e = n)
                }), e
            }
        }(), this.destroy = function (t) {
            return function (e) {
                return a.each(function (t, n) {
                    t.element == e && a.splice(n, 1)
                }), t
            }
        }(this), this.destroyAll = function (t) {
            return function () {
                return a = [], t
            }
        }(this), this.reset = function (t) {
            return function (e) {
                var n = t.triggerFor(e);
                if (null != n) {
                    n.reset();
                    var i = a.indexOf(n);
                    i > -1 && a.splice(i, 1)
                }
                return t
            }
        }(this), this.resetAll = function (t) {
            return function () {
                return a.each(function (t, e) {
                    t.reset()
                }), a = [], t
            }
        }(this), this.attach = function (t) {
            return function (e) {
                return l.push(e), d || (d = !0, i()), t
            }
        }(this), this.detach = function (t) {
            return function (e) {
                var n = l.indexOf(e);
                return n > -1 && l.splice(n, 1), t
            }
        }(this);
        var p = this;
        return this.scrollDidChange = function (t) {
            return function () {
                var e = t.scrollElement.innerWidth || t.scrollElement.offsetWidth,
                    n = t.scrollElement.innerHeight || t.scrollElement.offsetHeight,
                    i = t.bindElement.scrollTop ? t.bindElement.scrollTop : document.documentElement.scrollTop,
                    s = t.bindElement.scrollLeft ? t.bindElement.scrollLeft : document.documentElement.scrollLeft,
                    r = [];
                a.each(function (t, a) {
                    var l = t.left(), c = t.top();
                    h.left > s ? l -= t.xOffset(!0) : h.left < s && (l += t.xOffset(!1)), h.top > i ? c -= t.yOffset(!0) : h.top < i && (c += t.yOffset(!1)), l < e && l >= 0 && c < n && c >= 0 ? (t.addClass(t.visibleClass, function () {
                        t.showCallback && o(t, t.showCallback)
                    }), t.removeClass(t.hiddenClass), t.once && r.push(t)) : (t.addClass(t.hiddenClass), t.removeClass(t.visibleClass, function () {
                        t.hideCallback && o(t, t.hideCallback)
                    }))
                }), l.each(function (o) {
                    o.call(t, s, i, e, n)
                }), r.each(function (t) {
                    var e = a.indexOf(t);
                    e > -1 && a.splice(e, 1)
                }), h.left = s, h.top = i
            }
        }(this), Array.prototype.each = function (t) {
            for (var e = this.length, n = 0; n < e; n++) {
                var i = this[n];
                i && t(i, n)
            }
        }, u(t, e, n)
    }
}), function (t, e, n) {
    "use strict";
    function i(n) {
        if (o = e.documentElement, s = e.body, R(), et = this, n = n || {}, rt = n.constants || {}, n.easing)for (var i in n.easing)B[i] = n.easing[i];
        pt = n.edgeStrategy || "set", ot = {
            beforerender: n.beforerender,
            render: n.render,
            keyframe: n.keyframe
        }, st = !1 !== n.forceHeight, st && (xt = n.scale || 1), at = n.mobileDeceleration || E, ht = !1 !== n.smoothScrolling, ct = n.smoothScrollingDuration || z, dt = {targetTop: et.getScrollTop()}, Nt = (n.mobileCheck || function () {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || t.opera)
        })(), Nt ? (it = e.getElementById(n.skrollrBody || C), it && tt(), $(), Ct(o, [y, b], [w])) : Ct(o, [y, _], [w]), et.refresh(), gt(t, "resize orientationchange", function () {
            var t = o.clientWidth, e = o.clientHeight;
            (e !== Pt || t !== Dt) && (Pt = e, Dt = t, Ht = !0)
        });
        var r = F();
        return function t() {
            U(), mt = r(t)
        }(), et
    }

    var o, s, r = {
            get: function () {
                return et
            }, init: function (t) {
                return et || new i(t)
            }, VERSION: "0.6.30"
        }, a = Object.prototype.hasOwnProperty, l = t.Math, h = t.getComputedStyle, c = "touchstart", d = "touchmove",
        u = "touchcancel", p = "touchend", f = "skrollable", m = f + "-before", g = f + "-between", v = f + "-after",
        y = "skrollr", w = "no-" + y, _ = y + "-desktop", b = y + "-mobile", T = "linear", E = .004, C = "skrollr-body",
        z = 200, S = "center", I = "bottom", O = "___skrollable_id", L = /^(?:input|textarea|button|select)$/i,
        x = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, k = /-([a-z0-9_])/g, A = function (t, e) {
            return e.toUpperCase()
        }, W = /[\-+]?[\d]*\.?[\d]+/g, D = /\{\?\}/g, P = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        H = /[a-z\-]+-gradient/g, M = "", N = "", R = function () {
            var t = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (h) {
                var e = h(s, null);
                for (var n in e)if (M = n.match(t) || +n == n && e[n].match(t))break;
                if (!M)return void(M = N = "");
                M = M[0], "-" === M.slice(0, 1) ? (N = M, M = {
                    "-webkit-": "webkit",
                    "-moz-": "Moz",
                    "-ms-": "ms",
                    "-o-": "O"
                }[M]) : N = "-" + M.toLowerCase() + "-"
            }
        }, F = function () {
            var e = t.requestAnimationFrame || t[M.toLowerCase() + "RequestAnimationFrame"], n = It();
            return (Nt || !e) && (e = function (e) {
                var i = It() - n, o = l.max(0, 1e3 / 60 - i);
                return t.setTimeout(function () {
                    n = It(), e()
                }, o)
            }), e
        }, j = function () {
            var e = t.cancelAnimationFrame || t[M.toLowerCase() + "CancelAnimationFrame"];
            return (Nt || !e) && (e = function (e) {
                return t.clearTimeout(e)
            }), e
        }, B = {
            begin: function () {
                return 0
            }, end: function () {
                return 1
            }, linear: function (t) {
                return t
            }, quadratic: function (t) {
                return t * t
            }, cubic: function (t) {
                return t * t * t
            }, swing: function (t) {
                return -l.cos(t * l.PI) / 2 + .5
            }, sqrt: function (t) {
                return l.sqrt(t)
            }, outCubic: function (t) {
                return l.pow(t - 1, 3) + 1
            }, bounce: function (t) {
                var e;
                if (.5083 >= t) e = 3; else if (.8489 >= t) e = 9; else if (.96208 >= t) e = 27; else {
                    if (!(.99981 >= t))return 1;
                    e = 91
                }
                return 1 - l.abs(3 * l.cos(t * e * 1.028) / e)
            }
        };
    i.prototype.refresh = function (t) {
        var i, o, s = !1;
        for (t === n ? (s = !0, nt = [], Mt = 0, t = e.getElementsByTagName("*")) : t.length === n && (t = [t]), i = 0, o = t.length; o > i; i++) {
            var r = t[i], a = r, l = [], h = ht, c = pt, d = !1;
            if (s && O in r && delete r[O], r.attributes) {
                for (var u = 0, p = r.attributes.length; p > u; u++) {
                    var m = r.attributes[u];
                    if ("data-anchor-target" !== m.name)if ("data-smooth-scrolling" !== m.name)if ("data-edge-strategy" !== m.name)if ("data-emit-events" !== m.name) {
                        var g = m.name.match(/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/);
                        if (null !== g) {
                            var v = {props: m.value, element: r, eventType: m.name.replace(k, A)};
                            l.push(v);
                            var y = g[1];
                            y && (v.constant = y.substr(1));
                            var w = g[2];
                            /p$/.test(w) ? (v.isPercentage = !0, v.offset = (0 | w.slice(0, -1)) / 100) : v.offset = 0 | w;
                            var _ = g[3], b = g[4] || _;
                            _ && "start" !== _ && "end" !== _ ? (v.mode = "relative", v.anchors = [_, b]) : (v.mode = "absolute", "end" === _ ? v.isEnd = !0 : v.isPercentage || (v.offset = v.offset * xt))
                        }
                    } else d = !0; else c = m.value; else h = "off" !== m.value; else if (null === (a = e.querySelector(m.value)))throw'Unable to find anchor target "' + m.value + '"'
                }
                if (l.length) {
                    var T, E, C;
                    !s && O in r ? (C = r[O], T = nt[C].styleAttr, E = nt[C].classAttr) : (C = r[O] = Mt++, T = r.style.cssText, E = Et(r)), nt[C] = {
                        element: r,
                        styleAttr: T,
                        classAttr: E,
                        anchorTarget: a,
                        keyFrames: l,
                        smoothScrolling: h,
                        edgeStrategy: c,
                        emitEvents: d,
                        lastFrameIndex: -1
                    }, Ct(r, [f], [])
                }
            }
        }
        for (_t(), i = 0, o = t.length; o > i; i++) {
            var z = nt[t[i][O]];
            z !== n && (q(z), K(z))
        }
        return et
    }, i.prototype.relativeToAbsolute = function (t, e, n) {
        var i = o.clientHeight, s = t.getBoundingClientRect(), r = s.top, a = s.bottom - s.top;
        return e === I ? r -= i : e === S && (r -= i / 2), n === I ? r += a : n === S && (r += a / 2), (r += et.getScrollTop()) + .5 | 0
    }, i.prototype.animateTo = function (t, e) {
        e = e || {};
        var i = It(), o = et.getScrollTop(), s = e.duration === n ? 1e3 : e.duration;
        return lt = {
            startTop: o,
            topDiff: t - o,
            targetTop: t,
            duration: s,
            startTime: i,
            endTime: i + s,
            easing: B[e.easing || T],
            done: e.done
        }, lt.topDiff || (lt.done && lt.done.call(et, !1), lt = n), et
    }, i.prototype.stopAnimateTo = function () {
        lt && lt.done && lt.done.call(et, !0), lt = n
    }, i.prototype.isAnimatingTo = function () {
        return !!lt
    }, i.prototype.isMobile = function () {
        return Nt
    }, i.prototype.setScrollTop = function (e, n) {
        return ut = !0 === n, Nt ? Rt = l.min(l.max(e, 0), Lt) : t.scrollTo(0, e), et
    }, i.prototype.getScrollTop = function () {
        return Nt ? Rt : t.pageYOffset || o.scrollTop || s.scrollTop || 0
    }, i.prototype.getMaxScrollTop = function () {
        return Lt
    }, i.prototype.on = function (t, e) {
        return ot[t] = e, et
    }, i.prototype.off = function (t) {
        return delete ot[t], et
    }, i.prototype.destroy = function () {
        j()(mt), yt(), Ct(o, [w], [y, _, b]);
        for (var t = 0, e = nt.length; e > t; t++)J(nt[t].element);
        o.style.overflow = s.style.overflow = "", o.style.height = s.style.height = "", it && r.setStyle(it, "transform", "none"), et = n, it = n, ot = n, st = n, Lt = 0, xt = 1, rt = n, at = n, kt = "down", At = -1, Dt = 0, Pt = 0, Ht = !1, lt = n, ht = n, ct = n, dt = n, ut = n, Mt = 0, pt = n, Nt = !1, Rt = 0, ft = n
    };
    var $ = function () {
        var i, r, a, h, f, m, g, v, y, w, _, b;
        gt(o, [c, d, u, p].join(" "), function (t) {
            var o = t.changedTouches[0];
            for (h = t.target; 3 === h.nodeType;)h = h.parentNode;
            switch (f = o.clientY, m = o.clientX, w = t.timeStamp, L.test(h.tagName) || t.preventDefault(), t.type) {
                case c:
                    i && i.blur(), et.stopAnimateTo(), i = h, r = g = f, a = m, y = w;
                    break;
                case d:
                    L.test(h.tagName) && e.activeElement !== h && t.preventDefault(), v = f - g, b = w - _, et.setScrollTop(Rt - v, !0), g = f, _ = w;
                    break;
                default:
                case u:
                case p:
                    var s = r - f, T = a - m;
                    if (49 > T * T + s * s) {
                        if (!L.test(i.tagName)) {
                            i.focus();
                            var E = e.createEvent("MouseEvents");
                            E.initMouseEvent("click", !0, !0, t.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), i.dispatchEvent(E)
                        }
                        return
                    }
                    i = n;
                    var C = v / b;
                    C = l.max(l.min(C, 3), -3);
                    var z = l.abs(C / at), S = C * z + .5 * at * z * z, I = et.getScrollTop() - S, O = 0;
                    I > Lt ? (O = (Lt - I) / S, I = Lt) : 0 > I && (O = -I / S, I = 0), z *= 1 - O, et.animateTo(I + .5 | 0, {
                        easing: "outCubic",
                        duration: z
                    })
            }
        }), t.scrollTo(0, 0), o.style.overflow = s.style.overflow = "hidden"
    }, V = function () {
        var t, e, n, i, s, r, a, h, c, d, u, p = o.clientHeight, f = bt();
        for (h = 0, c = nt.length; c > h; h++)for (t = nt[h], e = t.element, n = t.anchorTarget, i = t.keyFrames, s = 0, r = i.length; r > s; s++)a = i[s], d = a.offset, u = f[a.constant] || 0, a.frame = d, a.isPercentage && (d *= p, a.frame = d), "relative" === a.mode && (J(e), a.frame = et.relativeToAbsolute(n, a.anchors[0], a.anchors[1]) - d, J(e, !0)), a.frame += u, st && !a.isEnd && a.frame > Lt && (Lt = a.frame);
        for (Lt = l.max(Lt, Tt()), h = 0, c = nt.length; c > h; h++) {
            for (t = nt[h], i = t.keyFrames, s = 0, r = i.length; r > s; s++)a = i[s], u = f[a.constant] || 0, a.isEnd && (a.frame = Lt - a.offset + u);
            t.keyFrames.sort(Ot)
        }
    }, Y = function (t, e) {
        for (var n = 0, i = nt.length; i > n; n++) {
            var o, s, l = nt[n], h = l.element, c = l.smoothScrolling ? t : e, d = l.keyFrames, u = d.length, p = d[0],
                y = d[d.length - 1], w = c < p.frame, _ = c > y.frame, b = w ? p : y, T = l.emitEvents,
                E = l.lastFrameIndex;
            if (w || _) {
                if (w && -1 === l.edge || _ && 1 === l.edge)continue;
                switch (w ? (Ct(h, [m], [v, g]), T && E > -1 && (wt(h, p.eventType, kt), l.lastFrameIndex = -1)) : (Ct(h, [v], [m, g]), T && u > E && (wt(h, y.eventType, kt), l.lastFrameIndex = u)), l.edge = w ? -1 : 1, l.edgeStrategy) {
                    case"reset":
                        J(h);
                        continue;
                    case"ease":
                        c = b.frame;
                        break;
                    default:
                    case"set":
                        var C = b.props;
                        for (o in C)a.call(C, o) && (s = X(C[o].value), 0 === o.indexOf("@") ? h.setAttribute(o.substr(1), s) : r.setStyle(h, o, s));
                        continue
                }
            } else 0 !== l.edge && (Ct(h, [f, g], [m, v]), l.edge = 0);
            for (var z = 0; u - 1 > z; z++)if (c >= d[z].frame && c <= d[z + 1].frame) {
                var S = d[z], I = d[z + 1];
                for (o in S.props)if (a.call(S.props, o)) {
                    var O = (c - S.frame) / (I.frame - S.frame);
                    O = S.props[o].easing(O), s = Q(S.props[o].value, I.props[o].value, O), s = X(s), 0 === o.indexOf("@") ? h.setAttribute(o.substr(1), s) : r.setStyle(h, o, s)
                }
                T && E !== z && ("down" === kt ? wt(h, S.eventType, kt) : wt(h, I.eventType, kt), l.lastFrameIndex = z);
                break
            }
        }
    }, U = function () {
        Ht && (Ht = !1, _t());
        var t, e, i = et.getScrollTop(), o = It();
        if (lt) o >= lt.endTime ? (i = lt.targetTop, t = lt.done, lt = n) : (e = lt.easing((o - lt.startTime) / lt.duration), i = lt.startTop + e * lt.topDiff | 0), et.setScrollTop(i, !0); else if (!ut) {
            var s = dt.targetTop - i;
            s && (dt = {
                startTop: At,
                topDiff: i - At,
                targetTop: i,
                startTime: Wt,
                endTime: Wt + ct
            }), o <= dt.endTime && (e = B.sqrt((o - dt.startTime) / ct), i = dt.startTop + e * dt.topDiff | 0)
        }
        if (ut || At !== i) {
            kt = i > At ? "down" : At > i ? "up" : kt, ut = !1;
            var a = {curTop: i, lastTop: At, maxTop: Lt, direction: kt};
            !1 !== (ot.beforerender && ot.beforerender.call(et, a)) && (Y(i, et.getScrollTop()), Nt && it && r.setStyle(it, "transform", "translate(0, " + -Rt + "px) " + ft), At = i, ot.render && ot.render.call(et, a)), t && t.call(et, !1)
        }
        Wt = o
    }, q = function (t) {
        for (var e = 0, n = t.keyFrames.length; n > e; e++) {
            for (var i, o, s, r, a = t.keyFrames[e], l = {}; null !== (r = x.exec(a.props));)s = r[1], o = r[2], i = s.match(/^(@?[a-z\-]+)\[(\w+)\]$/), null !== i ? (s = i[1], i = i[2]) : i = T, o = o.indexOf("!") ? G(o) : [o.slice(1)], l[s] = {
                value: o,
                easing: B[i]
            };
            a.props = l
        }
    }, G = function (t) {
        var e = [];
        return P.lastIndex = 0, t = t.replace(P, function (t) {
            return t.replace(W, function (t) {
                return t / 255 * 100 + "%"
            })
        }), N && (H.lastIndex = 0, t = t.replace(H, function (t) {
            return N + t
        })), t = t.replace(W, function (t) {
            return e.push(+t), "{?}"
        }), e.unshift(t), e
    }, K = function (t) {
        var e, n, i = {};
        for (e = 0, n = t.keyFrames.length; n > e; e++)Z(t.keyFrames[e], i);
        for (i = {}, e = t.keyFrames.length - 1; e >= 0; e--)Z(t.keyFrames[e], i)
    }, Z = function (t, e) {
        var n;
        for (n in e)a.call(t.props, n) || (t.props[n] = e[n]);
        for (n in t.props)e[n] = t.props[n]
    }, Q = function (t, e, n) {
        var i, o = t.length;
        if (o !== e.length)throw"Can't interpolate between \"" + t[0] + '" and "' + e[0] + '"';
        var s = [t[0]];
        for (i = 1; o > i; i++)s[i] = t[i] + (e[i] - t[i]) * n;
        return s
    }, X = function (t) {
        var e = 1;
        return D.lastIndex = 0, t[0].replace(D, function () {
            return t[e++]
        })
    }, J = function (t, e) {
        t = [].concat(t);
        for (var n, i, o = 0, s = t.length; s > o; o++)i = t[o], (n = nt[i[O]]) && (e ? (i.style.cssText = n.dirtyStyleAttr, Ct(i, n.dirtyClassAttr)) : (n.dirtyStyleAttr = i.style.cssText, n.dirtyClassAttr = Et(i), i.style.cssText = n.styleAttr, Ct(i, n.classAttr)))
    }, tt = function () {
        ft = "translateZ(0)", r.setStyle(it, "transform", ft);
        var t = h(it), e = t.getPropertyValue("transform"), n = t.getPropertyValue(N + "transform");
        e && "none" !== e || n && "none" !== n || (ft = "")
    };
    r.setStyle = function (t, e, n) {
        var i = t.style;
        if ("zIndex" === (e = e.replace(k, A).replace("-", ""))) isNaN(n) ? i[e] = n : i[e] = "" + (0 | n); else if ("float" === e) i.styleFloat = i.cssFloat = n; else try {
            M && (i[M + e.slice(0, 1).toUpperCase() + e.slice(1)] = n), i[e] = n
        } catch (t) {
        }
    };
    var et, nt, it, ot, st, rt, at, lt, ht, ct, dt, ut, pt, ft, mt, gt = r.addEvent = function (e, n, i) {
        var o = function (e) {
            return e = e || t.event, e.target || (e.target = e.srcElement), e.preventDefault || (e.preventDefault = function () {
                e.returnValue = !1, e.defaultPrevented = !0
            }), i.call(this, e)
        };
        n = n.split(" ");
        for (var s, r = 0, a = n.length; a > r; r++)s = n[r], e.addEventListener ? e.addEventListener(s, i, !1) : e.attachEvent("on" + s, o), Ft.push({
            element: e,
            name: s,
            listener: i
        })
    }, vt = r.removeEvent = function (t, e, n) {
        e = e.split(" ");
        for (var i = 0, o = e.length; o > i; i++)t.removeEventListener ? t.removeEventListener(e[i], n, !1) : t.detachEvent("on" + e[i], n)
    }, yt = function () {
        for (var t, e = 0, n = Ft.length; n > e; e++)t = Ft[e], vt(t.element, t.name, t.listener);
        Ft = []
    }, wt = function (t, e, n) {
        ot.keyframe && ot.keyframe.call(et, t, e, n)
    }, _t = function () {
        var t = et.getScrollTop();
        Lt = 0, st && !Nt && (s.style.height = ""), V(), st && !Nt && (s.style.height = Lt + o.clientHeight + "px"), Nt ? et.setScrollTop(l.min(et.getScrollTop(), Lt)) : et.setScrollTop(t, !0), ut = !0
    }, bt = function () {
        var t, e, n = o.clientHeight, i = {};
        for (t in rt)e = rt[t], "function" == typeof e ? e = e.call(et) : /p$/.test(e) && (e = e.slice(0, -1) / 100 * n), i[t] = e;
        return i
    }, Tt = function () {
        var t = 0;
        return it && (t = l.max(it.offsetHeight, it.scrollHeight)), l.max(t, s.scrollHeight, s.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight) - o.clientHeight
    }, Et = function (e) {
        var n = "className";
        return t.SVGElement && e instanceof t.SVGElement && (e = e[n], n = "baseVal"), e[n]
    }, Ct = function (e, i, o) {
        var s = "className";
        if (t.SVGElement && e instanceof t.SVGElement && (e = e[s], s = "baseVal"), o === n)return void(e[s] = i);
        for (var r = e[s], a = 0, l = o.length; l > a; a++)r = St(r).replace(St(o[a]), " ");
        r = zt(r);
        for (var h = 0, c = i.length; c > h; h++)-1 === St(r).indexOf(St(i[h])) && (r += " " + i[h]);
        e[s] = zt(r)
    }, zt = function (t) {
        return t.replace(/^\s+|\s+$/g, "")
    }, St = function (t) {
        return " " + t + " "
    }, It = Date.now || function () {
            return +new Date
        }, Ot = function (t, e) {
        return t.frame - e.frame
    }, Lt = 0, xt = 1, kt = "down", At = -1, Wt = It(), Dt = 0, Pt = 0, Ht = !1, Mt = 0, Nt = !1, Rt = 0, Ft = [];
    "function" == typeof define && define.amd ? define([], function () {
        return r
    }) : "undefined" != typeof module && module.exports ? module.exports = r : t.skrollr = r
}(window, document), "function" != typeof Object.create && (Object.create = function (t) {
    function e() {
    }

    return e.prototype = t, new e
}), function (t, e, n) {
    var i = function (t) {
        var i = n.createElement("script"), s = n.getElementsByTagName("head")[0];
        "file://" == e.location.origin ? i.src = "http://www.youtube.com/iframe_api" : i.src = "//www.youtube.com/iframe_api", s.appendChild(i), s = null, i = null, o(t)
    }, o = function (n) {
        "undefined" == typeof YT && void 0 === e.loadingPlayer ? (e.loadingPlayer = !0, e.dfd = t.Deferred(), e.onYouTubeIframeAPIReady = function () {
            e.onYouTubeIframeAPIReady = null, e.dfd.resolve("done"), n()
        }) : "object" == typeof YT ? n() : e.dfd.done(function (t) {
            n()
        })
    };
    YTPlayer = {
        player: null,
        defaults: {
            ratio: 16 / 9,
            videoId: "LSmgKRx5pBo",
            mute: !0,
            repeat: !0,
            width: t(e).width(),
            playButtonClass: "YTPlayer-play",
            pauseButtonClass: "YTPlayer-pause",
            muteButtonClass: "YTPlayer-mute",
            volumeUpClass: "YTPlayer-volume-up",
            volumeDownClass: "YTPlayer-volume-down",
            start: 0,
            pauseOnScroll: !1,
            fitToBackground: !0,
            playerVars: {
                iv_load_policy: 3,
                modestbranding: 1,
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                wmode: "opaque",
                branding: 0,
                autohide: 0
            },
            events: null
        },
        init: function (n, o) {
            var s = this;
            return s.userOptions = o, s.$body = t("body"), s.$node = t(n), s.$window = t(e), s.defaults.events = {
                onReady: function (t) {
                    s.onPlayerReady(t), s.options.pauseOnScroll && s.pauseOnScroll(), "function" == typeof s.options.callback && s.options.callback.call(this)
                }, onStateChange: function (t) {
                    1 === t.data ? (s.$node.find("img").fadeOut(400), s.$node.addClass("loaded")) : 0 === t.data && s.options.repeat && s.player.seekTo(s.options.start)
                }
            }, s.options = t.extend(!0, {}, s.defaults, s.userOptions), s.options.height = Math.ceil(s.options.width / s.options.ratio), s.ID = (new Date).getTime(), s.holderID = "YTPlayer-ID-" + s.ID, s.options.fitToBackground ? s.createBackgroundVideo() : s.createContainerVideo(), s.$window.on("resize.YTplayer" + s.ID, function () {
                s.resize(s)
            }), i(s.onYouTubeIframeAPIReady.bind(s)), s.resize(s), s
        },
        pauseOnScroll: function () {
            var t = this;
            t.$window.on("scroll.YTplayer" + t.ID, function () {
                1 === t.player.getPlayerState() && t.player.pauseVideo()
            }), t.$window.scrollStopped(function () {
                2 === t.player.getPlayerState() && t.player.playVideo()
            })
        },
        createContainerVideo: function () {
            var e = this,
                n = t('<div id="ytplayer-container' + e.ID + '" >                                    <div id="' + e.holderID + '" class="ytplayer-player-inline"></div>                                     </div>                                     <div id="ytplayer-shield" class="ytplayer-shield"></div>');
            e.$node.append(n), e.$YTPlayerString = n, n = null
        },
        createBackgroundVideo: function () {
            var e = this,
                n = t('<div id="ytplayer-container' + e.ID + '" class="ytplayer-container background">                                    <div id="' + e.holderID + '" class="ytplayer-player"></div>                                    </div>                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>');
            e.$node.append(n), e.$YTPlayerString = n, n = null
        },
        resize: function (n) {
            var i = t(e);
            n.options.fitToBackground || (i = n.$node);
            var o, s, r = i.width(), a = i.height(), l = t("#" + n.holderID);
            r / n.options.ratio < a ? (o = Math.ceil(a * n.options.ratio), l.width(o).height(a).css({
                left: (r - o) / 2,
                top: 0
            })) : (s = Math.ceil(r / n.options.ratio), l.width(r).height(s).css({
                left: 0,
                top: (a - s) / 2
            })), l = null, i = null
        },
        onYouTubeIframeAPIReady: function () {
            var t = this;
            t.player = new e.YT.Player(t.holderID, t.options)
        },
        onPlayerReady: function (t) {
            this.options.mute && t.target.mute(), t.target.playVideo()
        },
        getPlayer: function () {
            return this.player
        },
        destroy: function () {
            var n = this;
            n.$node.removeData("yt-init").removeData("ytPlayer").removeClass("loaded"), n.$YTPlayerString.remove(), t(e).off("resize.YTplayer" + n.ID), t(e).off("scroll.YTplayer" + n.ID), n.$body = null, n.$node = null, n.$YTPlayerString = null, n.player.destroy(), n.player = null
        }
    }, t.fn.scrollStopped = function (e) {
        var n = t(this), i = this;
        n.scroll(function () {
            n.data("scrollTimeout") && clearTimeout(n.data("scrollTimeout")), n.data("scrollTimeout", setTimeout(e, 250, i))
        })
    }, t.fn.YTPlayer = function (e) {
        return this.each(function () {
            var n = this;
            t(n).data("yt-init", !0);
            var i = Object.create(YTPlayer);
            i.init(n, e), t.data(n, "ytPlayer", i)
        })
    }
}(jQuery, window, document), function () {
    function t(t, n, i) {
        e(n);
        var o = t.style, s = {};
        for (var r in n)i && (s[r] = o[r] || ""), o[r] = n[r];
        return s
    }

    function e(t) {
        var e;
        t.transition && (e = t.transition, delete t.transition, t[f] = e), t.transform && (e = t.transform, delete t.transform, t[m] = e)
    }

    function n(e, n) {
        for (var i, o = getComputedStyle(e), s = document.createElement("div"), r = y.length; r--;)i = y[r], s.style[i] = o[i];
        return t(s, {
            visibility: "hidden",
            width: n.width + "px",
            height: n.height + "px",
            display: "inline" === o.display ? "inline-block" : o.display
        }), u.deepCopy ? s.innerHTML = e.innerHTML : s.textContent = e.textContent, s
    }

    var i, o, s, r, a = "WebkitAppearance" in document.documentElement.style ? "-webkit-" : "",
        l = document.createElement("div"), h = document.createElement("div"), c = !1, d = !1, u = {
            transitionDuration: ".4s",
            transitionTimingFunction: "cubic-bezier(.4,0,0,1)",
            bgColor: "#fff",
            bgOpacity: 1,
            maxWidth: 300,
            maxHeight: 300,
            onOpen: null,
            onClose: null,
            onBeforeClose: null,
            onBeforeOpen: null
        }, p = function () {
            var t = {}, e = ["webkitTransition", "transition", "mozTransition"],
                n = ["webkitTransform", "transform", "mozTransform"],
                i = {transition: "transitionend", mozTransition: "transitionend", webkitTransition: "webkitTransitionEnd"};
            return e.some(function (e) {
                if (void 0 !== l.style[e])return t.transition = e, t.transEnd = i[e], !0
            }), n.some(function (e) {
                if (void 0 !== l.style[e])return t.transform = e, !0
            }), t
        }(), f = p.transition, m = p.transform, g = m.replace(/(.*)Transform/, "-$1-transform"), v = p.transEnd;
    t(l, {
        position: "fixed",
        display: "none",
        zIndex: 99998,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        backgroundColor: u.bgColor,
        cursor: a + "zoom-out",
        transition: "opacity " + u.transitionDuration + " " + u.transitionTimingFunction
    }), t(h, {position: "fixed", zIndex: 99999, top: "50%", left: "50%", width: 0, height: 0});
    var y = ["position", "display", "float", "top", "left", "right", "bottom", "marginBottom", "marginLeft", "marginRight", "marginTop", "font", "lineHeight", "verticalAlign"],
        w = {
            config: function (e) {
                if (!e)return u;
                for (var n in e)u[n] = e[n];
                return t(l, {
                    backgroundColor: u.bgColor,
                    transition: "opacity " + u.transitionDuration + " " + u.transitionTimingFunction
                }), this
            }, open: function (e, p) {
                if (!c && !d) {
                    i = "string" == typeof e ? document.querySelector(e) : e, u.onBeforeOpen && u.onBeforeOpen(i), c = !0, d = !0, o = i.parentNode;
                    var f = i.getBoundingClientRect(), m = Math.min(u.maxWidth / f.width, u.maxHeight / f.height),
                        y = f.left - (window.innerWidth - f.width) / 2, w = f.top - (window.innerHeight - f.height) / 2;
                    s = n(i, f), r = t(i, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: "",
                        bottom: "",
                        whiteSpace: "nowrap",
                        marginTop: -f.height / 2 + "px",
                        marginLeft: -f.width / 2 + "px",
                        cursor: a + "zoom-out",
                        transform: "translate(" + y + "px, " + w + "px)",
                        transition: ""
                    }, !0);
                    var _ = i.style.width.match(/^([\d\.]+)%$/), b = i.style.height.match(/^([\d\.]+)%$/);
                    if (_ || b) {
                        var T = _ ? +_[1] / 100 : 1, E = b ? +b[1] / 100 : 1;
                        t(h, {width: ~~(f.width / T) + "px", height: ~~(f.height / E) + "px"})
                    }
                    o.appendChild(l), o.appendChild(h), o.insertBefore(s, i), h.appendChild(i), l.style.display = "block";
                    i.offsetHeight;
                    return l.style.opacity = u.bgOpacity, t(i, {
                        transition: g + " " + u.transitionDuration + " " + u.transitionTimingFunction,
                        transform: "scale(" + m + ")"
                    }), i.addEventListener(v, function t() {
                        i.removeEventListener(v, t), d = !1, (p = p || u.onOpen) && p(i)
                    }), this
                }
            }, close: function (e) {
                if (c && !d) {
                    d = !0, u.onBeforeClose && u.onBeforeClose(i);
                    var n = s.getBoundingClientRect(), a = n.left - (window.innerWidth - n.width) / 2,
                        p = n.top - (window.innerHeight - n.height) / 2;
                    return l.style.opacity = 0, t(i, {transform: "translate(" + a + "px, " + p + "px)"}), i.addEventListener(v, function n() {
                        i.removeEventListener(v, n), t(i, r), o.insertBefore(i, s), o.removeChild(s), o.removeChild(l), o.removeChild(h), l.style.display = "none", s = null, c = !1, d = !1, (e = "function" == typeof e ? e : u.onClose) && e(i)
                    }), this
                }
            }, listen: function e(n) {
                if ("string" != typeof n)return t(n, {cursor: a + "zoom-in"}), n.addEventListener("click", function (t) {
                    t.stopPropagation(), c ? w.close() : w.open(n)
                }), this;
                for (var i = document.querySelectorAll(n), o = i.length; o--;)e(i[o])
            }
        };
    l.addEventListener("click", w.close), h.addEventListener("click", w.close), "object" == typeof exports ? module.exports = w : "function" == typeof define && define.amd ? define(function () {
        return w
    }) : this.Zoomerang = w
}(), $(function () {
    $("#spacial-slider").length && slider.initialize()
});
var slider = {
    initialize: function () {
        var t = {animations: Modernizr.cssanimations}, e = {
                WebkitAnimation: "webkitAnimationEnd",
                OAnimation: "oAnimationEnd",
                msAnimation: "MSAnimationEnd",
                animation: "animationend"
            }, n = e[Modernizr.prefixed("animation")], i = document.getElementById("spacial-slider"),
            o = i.querySelector("ul.itemwrap").children, s = 0, r = o.length, a = i.querySelector("nav"),
            l = a.querySelector(".next"), h = a.querySelector(".prev"), c = !1;
        window.navigate_slider = function (e) {
            if (c)return !1;
            c = !0;
            var i = 0, a = o[s];
            "next" === e ? s = s < r - 1 ? s + 1 : 0 : "prev" === e && (s = s > 0 ? s - 1 : r - 1);
            var l = o[s], h = function () {
                this.removeEventListener(n, h), $(this).removeClass("current"), $(this).removeClass("next" === e ? "navOutNext" : "navOutPrev"), 2 === ++i && (c = !1)
            }, d = function () {
                this.removeEventListener(n, d), $(this).addClass("current"), $(this).removeClass("next" === e ? "navInNext" : "navInPrev"), 2 === ++i && (c = !1)
            };
            t.animations ? (a.addEventListener(n, h), l.addEventListener(n, d)) : (h(), d()), $(a).addClass("next" === e ? "navOutNext" : "navOutPrev"), $(l).addClass("next" === e ? "navInNext" : "navInPrev")
        }, function () {
            l.addEventListener("click", function (t) {
                t.preventDefault(), navigate_slider("next"), clearInterval(window.slider_interval)
            }), h.addEventListener("click", function (t) {
                t.preventDefault(), navigate_slider("prev"), clearInterval(window.slider_interval)
            })
        }()
    }
};
$(function () {
    navbar.init(), pricing_charts.init(), global_notifications.init(), ecommerce.init(), retina.init(), zoomerang.init(), animation.init()
});
var animation = {
    lastScrollY: 0, ticking: !1, _this: null, elements: null, init: function () {
        _this = this, _this.elements = $("[data-animate]"), window.addEventListener("scroll", _this.onScroll, !1), _this.update()
    }, onScroll: function () {
        _this.lastScrollY = window.scrollY, _this.requestTick()
    }, requestTick: function () {
        _this.ticking || (requestAnimationFrame(_this.update), _this.ticking = !0)
    }, update: function () {
        for (var t = _this.elements.length - 1; t >= 0; t--) {
            var e = $(_this.elements[t]);
            e.hasClass(e.data("animate")) || _this.isInViewport(e) && _this.triggerAnimate(e)
        }
        _this.ticking = !1
    }, isInViewport: function (t) {
        var e = t.offset().top, n = t.offset().top + t.outerHeight(), i = $(window).scrollTop() + $(window).height(),
            o = $(window).scrollTop();
        return i > e && o < n
    }, triggerAnimate: function (t) {
        var e = t.data("animate"), n = t.data("animate-infinite") || null, i = t.data("animate-delay") || null,
            o = t.data("animate-duration") || null;
        null !== n && t.addClass("infinite"), null !== i && t.css({
            "-webkit-animation-delay": i + "s",
            "-moz-animation-delay": i + "s",
            "animation-delay": i + "s"
        }), null !== o && t.css({
            "-webkit-animation-duration": o + "s",
            "-moz-animation-duration": o + "s",
            "animation-duration": o + "s"
        }), t.addClass("animated " + e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            t.addClass("animated-end")
        })
    }
}, navbar = {
    init: function () {
        window.utils.isMobile() || (this.dropdownHover(), this.transparentFixed()), $(".navbar-nav .dropdown-item").click(function (t) {
            t.stopPropagation()
        }), $(".dropdown-submenu .dropdown-toggle").click(function (t) {
            t.preventDefault(), $(this).parent().toggleClass("show")
        }), this.fixedBottom()
    }, dropdownHover: function () {
        $(".navbar-nav .dropdown").each(function (t, e) {
            var n = $(this);
            n.hover(function () {
                n.addClass("show")
            }, function () {
                n.removeClass("show")
            })
        })
    }, transparentFixed: function () {
        var t = $(".navbar");
        if (t.hasClass("bg-transparent fixed-top")) {
            var e = t.offset().top + 1, n = function () {
                var n = window.scrollY || window.pageYOffset;
                n >= e && t.hasClass("bg-transparent") ? t.removeClass("bg-transparent") : n < e && !t.hasClass("bg-transparent") && t.addClass("bg-transparent")
            };
            $(window).scroll(n)
        }
    }, fixedBottom: function () {
        if ($navbar = $(".navbar"), $navbar.hasClass("navbar-fixed-bottom"))var t = $navbar.offset().top + 1,
            e = function () {
                var e = window.scrollY || window.pageYOffset;
                e >= t && !$navbar.hasClass("navbar-fixed-bottom--stick") ? $navbar.addClass("navbar-fixed-bottom--stick") : e < t && $navbar.hasClass("navbar-fixed-bottom--stick") && $navbar.removeClass("navbar-fixed-bottom--stick")
            };
        $(window).scroll(e)
    }
}, zoomerang = {
    init: function () {
        Zoomerang.config({maxHeight: 730, maxWidth: 900}).listen('[data-trigger="zoomerang"]')
    }
}, ecommerce = {
    init: function () {
        this.displayCart(), this.search()
    }, displayCart: function () {
        var t, e = $(".store-navbar .cart"), n = $("#cart-modal"), i = function () {
            n.addClass("visible"), clearTimeout(t), t = null
        }, o = function () {
            t = setTimeout(function () {
                n.removeClass("visible")
            }, 400)
        };
        e.hover(i, o), n.hover(i, o)
    }, search: function () {
        var t = $(".store-navbar .search-field"), e = t.find(".input-search");
        e.focus(function () {
            t.addClass("focus")
        }), e.blur(function () {
            t.removeClass("focus")
        })
    }
}, global_notifications = {
    init: function () {
        setTimeout(function () {
            $(".global-notification").removeClass("uber-notification").addClass("uber-notification-remove")
        }, 5e3)
    }
}, pricing_charts = {
    init: function () {
        var t = $(".pricing-charts-tabs .tab"), e = $(".pricing-charts .chart header .price");
        t.click(function () {
            t.removeClass("active"), $(this).addClass("active");
            var n = $(this).data("tab"), i = e.filter(":not(." + n + ")");
            i.addClass("go-out"), e.filter("." + n).addClass("active"), setTimeout(function () {
                i.removeClass("go-out").removeClass("active")
            }, 250)
        })
    }
}, retina = {
    init: function () {
        window.devicePixelRatio >= 1.2 && $("[data-2x]").each(function () {
            "IMG" == this.tagName ? $(this).attr("src", $(this).attr("data-2x")) : $(this).css({"background-image": "url(" + $(this).attr("data-2x") + ")"})
        })
    }
};
window.utils = {
    isFirefox: function () {
        return navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    }, isSafari: function () {
        return navigator.userAgent.toLowerCase().indexOf("safari") > -1
    }, debounce: function (t, e, n) {
        var i;
        return function () {
            var o = this, s = arguments, r = function () {
                i = null, n || t.apply(o, s)
            }, a = n && !i;
            clearTimeout(i), i = setTimeout(r, e), a && t.apply(o, s)
        }
    }, isMobile: function () {
        return window.innerWidth <= 1024
    }, parallax_text: function (t, e) {
        function n() {
            s = window.scrollY, i()
        }

        function i() {
            r || (requestAnimationFrame(o), r = !0)
        }

        function o() {
            var n, i = s, o = i / 1.4, a = e + o + "px";
            document.body.style;
            n = i > 0 ? (1e3 - 2.7 * i) / 1e3 : 1, t.css({position: "relative", top: a, opacity: n}), r = !1
        }

        e = void 0 !== e ? e : 0;
        var s = 0, r = !1;
        window.addEventListener("scroll", n, !1)
    }
};
//# sourceMappingURL=theme.min.js.map
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;

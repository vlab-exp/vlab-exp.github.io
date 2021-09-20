(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $author$project$AnalyticsPort$analytics = _Platform_outgoingPort('analytics', $elm$core$Basics$identity);
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$BubbleSortTest$Init = function (a) {
	return {$: 'Init', a: a};
};
var $author$project$Core$Prompt$PromptInfo = {$: 'PromptInfo'};
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$random$Random$andThen = F2(
	function (callback, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed) {
				var _v1 = genA(seed);
				var result = _v1.a;
				var newSeed = _v1.b;
				var _v2 = callback(result);
				var genB = _v2.a;
				return genB(newSeed);
			});
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _v0 = gen(seed);
				var value = _v0.a;
				var newSeed = _v0.b;
				var $temp$revList = A2($elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var $elm$random$Random$list = F2(
	function (n, _v0) {
		var gen = _v0.a;
		return $elm$random$Random$Generator(
			function (seed) {
				return A4($elm$random$Random$listHelp, _List_Nil, n, gen, seed);
			});
	});
var $elm_community$random_extra$Random$Array$array = F2(
	function (arrayLength, generator) {
		return A2(
			$elm$random$Random$map,
			$elm$core$Array$fromList,
			A2($elm$random$Random$list, arrayLength, generator));
	});
var $elm_community$random_extra$Random$Array$rangeLengthArray = F3(
	function (minLength, maxLength, generator) {
		return A2(
			$elm$random$Random$andThen,
			function (len) {
				return A2($elm_community$random_extra$Random$Array$array, len, generator);
			},
			A2($elm$random$Random$int, minLength, maxLength));
	});
var $author$project$BubbleSortTest$init = function (_v0) {
	return _Utils_Tuple2(
		{
			boundary: 6,
			completed: false,
			iter: 0,
			numbers: _List_fromArray(
				[100, 4, 56, 60, 70, 45]),
			prompt: _Utils_Tuple2('Click on the given controls to drive the bubblesort algorithm.', $author$project$Core$Prompt$PromptInfo)
		},
		A2(
			$elm$random$Random$generate,
			$author$project$BubbleSortTest$Init,
			A3(
				$elm_community$random_extra$Random$Array$rangeLengthArray,
				4,
				6,
				A2($elm$random$Random$int, 10, 50))));
};
var $author$project$Core$DefInit = {$: 'DefInit'};
var $elm_community$undo_redo$UndoList$New = function (a) {
	return {$: 'New', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm_community$undo_redo$UndoList$UndoList = F3(
	function (past, present, future) {
		return {future: future, past: past, present: present};
	});
var $elm_community$undo_redo$UndoList$fresh = function (state) {
	return A3($elm_community$undo_redo$UndoList$UndoList, _List_Nil, state, _List_Nil);
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$parser$Parser$deadEndsToString = function (deadEnds) {
	return 'TODO deadEndsToString';
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Core$Analytics$Parser$encodeFlat = function (thing) {
	switch (thing.$) {
		case 'Obj':
			var kvs = thing.a;
			return $elm$json$Json$Encode$object(
				A2(
					$elm$core$List$map,
					function (_v1) {
						var k = _v1.a;
						var v = _v1.b;
						return _Utils_Tuple2(
							k,
							$author$project$Core$Analytics$Parser$encodeFlat(v));
					},
					kvs));
		case 'Dct':
			var kvs = thing.a;
			return $elm$json$Json$Encode$object(
				A2(
					$elm$core$List$map,
					function (_v2) {
						var k = _v2.a;
						var v = _v2.b;
						return _Utils_Tuple2(
							function () {
								if (k.$ === 'Str') {
									var s = k.a;
									return s;
								} else {
									return A2(
										$elm$json$Json$Encode$encode,
										0,
										$author$project$Core$Analytics$Parser$encodeFlat(k));
								}
							}(),
							$author$project$Core$Analytics$Parser$encodeFlat(v));
					},
					kvs));
		case 'Arr':
			var vals = thing.a;
			return A2($elm$json$Json$Encode$list, $author$project$Core$Analytics$Parser$encodeFlat, vals);
		case 'Set':
			var vals = thing.a;
			return A2($elm$json$Json$Encode$list, $author$project$Core$Analytics$Parser$encodeFlat, vals);
		case 'Str':
			var s = thing.a;
			return $elm$json$Json$Encode$string(s);
		case 'Custom':
			if (!thing.b.b) {
				var name = thing.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string(name)),
							_Utils_Tuple2('value', $elm$json$Json$Encode$null)
						]));
			} else {
				if (!thing.b.b.b) {
					var name = thing.a;
					var _v4 = thing.b;
					var val = _v4.a;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'name',
								$elm$json$Json$Encode$string(name)),
								_Utils_Tuple2(
								'value',
								$author$project$Core$Analytics$Parser$encodeFlat(val))
							]));
				} else {
					var name = thing.a;
					var args = thing.b;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'name',
								$elm$json$Json$Encode$string(name)),
								_Utils_Tuple2(
								'value',
								A2($elm$json$Json$Encode$list, $author$project$Core$Analytics$Parser$encodeFlat, args))
							]));
				}
			}
		case 'Lst':
			var vals = thing.a;
			return A2($elm$json$Json$Encode$list, $author$project$Core$Analytics$Parser$encodeFlat, vals);
		case 'Tpl':
			var vals = thing.a;
			return A2($elm$json$Json$Encode$list, $author$project$Core$Analytics$Parser$encodeFlat, vals);
		case 'NumInt':
			var n = thing.a;
			return $elm$json$Json$Encode$int(n);
		case 'NumFloat':
			var n = thing.a;
			return $elm$json$Json$Encode$float(n);
		case 'Fun':
			return $elm$json$Json$Encode$string('<function>');
		case 'Intern':
			return $elm$json$Json$Encode$string('<internals>');
		case 'MayBe':
			var val = thing.a;
			if (val.$ === 'Nothing') {
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string('Nothing')),
							_Utils_Tuple2('value', $elm$json$Json$Encode$null)
						]));
			} else {
				var v = val.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string('Just')),
							_Utils_Tuple2(
							'value',
							$author$project$Core$Analytics$Parser$encodeFlat(v))
						]));
			}
		case 'Boolean':
			var val = thing.a;
			return $elm$json$Json$Encode$bool(val);
		case 'Chr':
			var c = thing.a;
			return $elm$json$Json$Encode$string(c);
		case 'Reslt':
			if (thing.a.$ === 'Ok') {
				var val = thing.a.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string('Ok')),
							_Utils_Tuple2(
							'value',
							$author$project$Core$Analytics$Parser$encodeFlat(val))
						]));
			} else {
				var val = thing.a.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'name',
							$elm$json$Json$Encode$string('Err')),
							_Utils_Tuple2(
							'value',
							$author$project$Core$Analytics$Parser$encodeFlat(val))
						]));
			}
		default:
			return $elm$json$Json$Encode$string('<unit>');
	}
};
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $author$project$Core$Analytics$Parser$Arr = function (a) {
	return {$: 'Arr', a: a};
};
var $author$project$Core$Analytics$Parser$Custom = F2(
	function (a, b) {
		return {$: 'Custom', a: a, b: b};
	});
var $author$project$Core$Analytics$Parser$Dct = function (a) {
	return {$: 'Dct', a: a};
};
var $author$project$Core$Analytics$Parser$Lst = function (a) {
	return {$: 'Lst', a: a};
};
var $author$project$Core$Analytics$Parser$MayBe = function (a) {
	return {$: 'MayBe', a: a};
};
var $author$project$Core$Analytics$Parser$Obj = function (a) {
	return {$: 'Obj', a: a};
};
var $author$project$Core$Analytics$Parser$Reslt = function (a) {
	return {$: 'Reslt', a: a};
};
var $author$project$Core$Analytics$Parser$Set = function (a) {
	return {$: 'Set', a: a};
};
var $author$project$Core$Analytics$Parser$Tpl = function (a) {
	return {$: 'Tpl', a: a};
};
var $author$project$Core$Analytics$Parser$UnitType = {$: 'UnitType'};
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v0 = thunk(_Utils_Tuple0);
			var parse = _v0.a;
			return parse(s);
		});
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $author$project$Core$Analytics$Parser$listHelp = F2(
	function (parser, acc) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (val) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, val, acc));
						}),
					parser),
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(
							$elm$core$List$reverse(acc));
					},
					$elm$parser$Parser$succeed(_Utils_Tuple0))
				]));
	});
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $author$project$Core$Analytics$Parser$list = function (parser) {
	return A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		$author$project$Core$Analytics$Parser$listHelp(parser));
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $elm$parser$Parser$ExpectingVariable = {$: 'ExpectingVariable'};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {col: col, context: context, indent: indent, offset: offset, row: row, src: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$variable = function (i) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var firstOffset = A3($elm$parser$Parser$Advanced$isSubChar, i.start, s.offset, s.src);
			if (_Utils_eq(firstOffset, -1)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, i.expecting));
			} else {
				var s1 = _Utils_eq(firstOffset, -2) ? A7($elm$parser$Parser$Advanced$varHelp, i.inner, s.offset + 1, s.row + 1, 1, s.src, s.indent, s.context) : A7($elm$parser$Parser$Advanced$varHelp, i.inner, firstOffset, s.row, s.col + 1, s.src, s.indent, s.context);
				var name = A3($elm$core$String$slice, s.offset, s1.offset, s.src);
				return A2($elm$core$Set$member, name, i.reserved) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, i.expecting)) : A3($elm$parser$Parser$Advanced$Good, true, name, s1);
			}
		});
};
var $elm$parser$Parser$variable = function (i) {
	return $elm$parser$Parser$Advanced$variable(
		{expecting: $elm$parser$Parser$ExpectingVariable, inner: i.inner, reserved: i.reserved, start: i.start});
};
var $author$project$Core$Analytics$Parser$lowerVar = $elm$parser$Parser$variable(
	{
		inner: function (c) {
			return $elm$core$Char$isAlphaNum(c) || (_Utils_eq(
				c,
				_Utils_chr('.')) || _Utils_eq(
				c,
				_Utils_chr('_')));
		},
		reserved: $elm$core$Set$empty,
		start: $elm$core$Char$isLower
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Core$Analytics$Parser$Boolean = function (a) {
	return {$: 'Boolean', a: a};
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || (_Utils_eq(
			c,
			_Utils_chr('\n')) || _Utils_eq(
			c,
			_Utils_chr('\r')));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$Core$Analytics$Parser$parseBool = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Boolean),
		$elm$parser$Parser$spaces),
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return true;
					},
					$elm$parser$Parser$symbol('True')),
					A2(
					$elm$parser$Parser$map,
					function (_v1) {
						return false;
					},
					$elm$parser$Parser$symbol('False'))
				])),
		$elm$parser$Parser$spaces));
var $author$project$Core$Analytics$Parser$Chr = function (a) {
	return {$: 'Chr', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $author$project$Core$Analytics$Parser$parseChar = A2(
	$elm$parser$Parser$andThen,
	function (s) {
		return ($elm$core$String$length(s) === 3) ? $elm$parser$Parser$succeed(
			$author$project$Core$Analytics$Parser$Chr(
				A3($elm$core$String$slice, 1, 2, s))) : $elm$parser$Parser$problem(s);
	},
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$spaces),
						$elm$parser$Parser$symbol('\'')),
					$elm$parser$Parser$chompWhile(
						function (c) {
							return !_Utils_eq(
								c,
								_Utils_chr('\''));
						})),
				$elm$parser$Parser$symbol('\'')),
			$elm$parser$Parser$spaces)));
var $author$project$Core$Analytics$Parser$Fun = {$: 'Fun'};
var $author$project$Core$Analytics$Parser$parseFun = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Fun),
	$elm$parser$Parser$symbol('<function>'));
var $author$project$Core$Analytics$Parser$Intern = {$: 'Intern'};
var $author$project$Core$Analytics$Parser$parseIntern = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Intern),
	$elm$parser$Parser$symbol('<internals>'));
var $author$project$Core$Analytics$Parser$parseNothing = A2(
	$elm$parser$Parser$ignorer,
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Maybe$Nothing),
			$elm$parser$Parser$spaces),
		$elm$parser$Parser$symbol('Nothing')),
	$elm$parser$Parser$spaces);
var $author$project$Core$Analytics$Parser$NumFloat = function (a) {
	return {$: 'NumFloat', a: a};
};
var $elm$parser$Parser$ExpectingFloat = {$: 'ExpectingFloat'};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {col: s.col + (newOffset - s.offset), context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 'Err') {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.offset, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.src);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.row, s.col - (floatOffset + s.offset), invalid, s.context));
		} else {
			if (_Utils_eq(s.offset, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.offset, intPair, s);
				} else {
					if (floatSettings.$ === 'Err') {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.offset, floatOffset, s.src));
						if (_v1.$ === 'Nothing') {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.offset, s.src)) {
				var zeroOffset = s.offset + 1;
				var baseOffset = zeroOffset + 1;
				return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.hex,
					baseOffset,
					A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.octal,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.binary,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.src),
					s) : A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					_Utils_Tuple2(zeroOffset, 0),
					s)));
			} else {
				return A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					A3($elm$parser$Parser$Advanced$consumeBase, 10, s.offset, s.src),
					s);
			}
		});
};
var $elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				binary: $elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: $elm$core$Result$Ok($elm$core$Basics$identity),
				hex: $elm$core$Result$Err(invalid),
				_int: $elm$core$Result$Ok($elm$core$Basics$toFloat),
				invalid: invalid,
				octal: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$float = A2($elm$parser$Parser$Advanced$float, $elm$parser$Parser$ExpectingFloat, $elm$parser$Parser$ExpectingFloat);
var $author$project$Core$Analytics$Parser$parseNumberFloat = A2(
	$elm$parser$Parser$keeper,
	$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$NumFloat),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$negate),
					$elm$parser$Parser$symbol('-')),
				$elm$parser$Parser$float),
				$elm$parser$Parser$float
			])));
var $author$project$Core$Analytics$Parser$NumInt = function (a) {
	return {$: 'NumInt', a: a};
};
var $elm$parser$Parser$ExpectingInt = {$: 'ExpectingInt'};
var $elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				binary: $elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: $elm$core$Result$Err(invalid),
				hex: $elm$core$Result$Err(invalid),
				_int: $elm$core$Result$Ok($elm$core$Basics$identity),
				invalid: invalid,
				octal: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$int = A2($elm$parser$Parser$Advanced$int, $elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
var $author$project$Core$Analytics$Parser$parseNumberInt = A2(
	$elm$parser$Parser$keeper,
	$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$NumInt),
	$elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$negate),
					$elm$parser$Parser$symbol('-')),
				$elm$parser$Parser$int),
				$elm$parser$Parser$int
			])));
var $author$project$Core$Analytics$Parser$Str = function (a) {
	return {$: 'Str', a: a};
};
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $author$project$Core$Analytics$Parser$escapedChar = A2(
	$elm$parser$Parser$keeper,
	$elm$parser$Parser$succeed(
		function (c) {
			switch (c) {
				case 't':
					return '\t';
				case 'n':
					return '\n';
				case '\"':
					return '\"';
				case '\\':
					return '\\';
				default:
					return '\\' + c;
			}
		}),
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(_Utils_Tuple0),
				$elm$parser$Parser$symbol('\\')),
			$elm$parser$Parser$chompIf(
				function (_v1) {
					return true;
				}))));
var $author$project$Core$Analytics$Parser$notQuote = $elm$parser$Parser$getChompedString(
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed(_Utils_Tuple0),
		$elm$parser$Parser$chompIf(
			function (c) {
				return !_Utils_eq(
					c,
					_Utils_chr('\"'));
			})));
var $author$project$Core$Analytics$Parser$repeatHelp = F2(
	function (parser, acc) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (val) {
							return $elm$parser$Parser$Loop(
								_Utils_ap(acc, val));
						}),
					parser),
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(acc);
					},
					$elm$parser$Parser$succeed(_Utils_Tuple0))
				]));
	});
var $author$project$Core$Analytics$Parser$repeat = function (parser) {
	return A2(
		$elm$parser$Parser$loop,
		'',
		$author$project$Core$Analytics$Parser$repeatHelp(parser));
};
var $author$project$Core$Analytics$Parser$parseString = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Str),
		$elm$parser$Parser$symbol('\"')),
	A2(
		$elm$parser$Parser$ignorer,
		$author$project$Core$Analytics$Parser$repeat(
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[$author$project$Core$Analytics$Parser$escapedChar, $author$project$Core$Analytics$Parser$notQuote]))),
		$elm$parser$Parser$symbol('\"')));
var $author$project$Core$Analytics$Parser$upperVar = $elm$parser$Parser$variable(
	{
		inner: function (c) {
			return $elm$core$Char$isAlphaNum(c) || (_Utils_eq(
				c,
				_Utils_chr('.')) || _Utils_eq(
				c,
				_Utils_chr('_')));
		},
		reserved: $elm$core$Set$empty,
		start: $elm$core$Char$isUpper
	});
function $author$project$Core$Analytics$Parser$cyclic$parseThing() {
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$author$project$Core$Analytics$Parser$cyclic$parseDct(),
								$author$project$Core$Analytics$Parser$cyclic$parseArr(),
								$author$project$Core$Analytics$Parser$cyclic$parseSet(),
								$author$project$Core$Analytics$Parser$cyclic$parseObj(),
								$author$project$Core$Analytics$Parser$parseString,
								$author$project$Core$Analytics$Parser$cyclic$parseLst(),
								$author$project$Core$Analytics$Parser$cyclic$parseTpl(),
								$author$project$Core$Analytics$Parser$cyclic$parseMaybe(),
								$author$project$Core$Analytics$Parser$cyclic$parseResult(),
								$author$project$Core$Analytics$Parser$parseBool,
								$author$project$Core$Analytics$Parser$cyclic$parseCustom(),
								$author$project$Core$Analytics$Parser$parseNumberFloat,
								$author$project$Core$Analytics$Parser$parseNumberInt,
								$author$project$Core$Analytics$Parser$parseChar,
								$author$project$Core$Analytics$Parser$parseFun,
								$author$project$Core$Analytics$Parser$parseIntern
							])),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$symbol(','),
							$elm$parser$Parser$symbol('')
						]))),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseArr() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Arr),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('Array.fromList [')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$lazy(
						function (_v14) {
							return $author$project$Core$Analytics$Parser$list(
								$author$project$Core$Analytics$Parser$cyclic$parseThing());
						}),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol(']')),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseCustom() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Custom),
				$elm$parser$Parser$spaces),
			A2($elm$parser$Parser$ignorer, $author$project$Core$Analytics$Parser$upperVar, $elm$parser$Parser$spaces)),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$lazy(
				function (_v13) {
					return $author$project$Core$Analytics$Parser$list(
						$author$project$Core$Analytics$Parser$cyclic$parseThing());
				}),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseDct() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Dct),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('Dict.fromList [')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$author$project$Core$Analytics$Parser$list(
						$author$project$Core$Analytics$Parser$cyclic$parseDictKeyValue()),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol(']')),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseDictKeyValue() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Tuple$pair),
						$elm$parser$Parser$spaces),
					$elm$parser$Parser$symbol('(')),
				$elm$parser$Parser$spaces),
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$lazy(
					function (_v11) {
						return $author$project$Core$Analytics$Parser$cyclic$parseThing();
					}),
				$elm$parser$Parser$spaces)),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$lazy(
								function (_v12) {
									return $author$project$Core$Analytics$Parser$cyclic$parseThing();
								}),
							$elm$parser$Parser$spaces),
						$elm$parser$Parser$symbol(')')),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$symbol(','),
							$elm$parser$Parser$symbol('')
						]))),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseResult() {
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Reslt),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$author$project$Core$Analytics$Parser$cyclic$parseOk(),
					$author$project$Core$Analytics$Parser$cyclic$parseErr()
				])));
}
function $author$project$Core$Analytics$Parser$cyclic$parseErr() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Result$Err),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('Err')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($elm$core$Basics$identity),
								$elm$parser$Parser$symbol('(')),
							$elm$parser$Parser$spaces),
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$lazy(
									function (_v9) {
										return $author$project$Core$Analytics$Parser$cyclic$parseThing();
									}),
								$elm$parser$Parser$spaces),
							$elm$parser$Parser$symbol(')'))),
						A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$lazy(
							function (_v10) {
								return $author$project$Core$Analytics$Parser$cyclic$parseThing();
							}))
					])),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseMaybe() {
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$MayBe),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$author$project$Core$Analytics$Parser$parseNothing,
					$author$project$Core$Analytics$Parser$cyclic$parseJust()
				])));
}
function $author$project$Core$Analytics$Parser$cyclic$parseJust() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Maybe$Just),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('Just')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($elm$core$Basics$identity),
								$elm$parser$Parser$symbol('(')),
							$elm$parser$Parser$spaces),
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$lazy(
									function (_v7) {
										return $author$project$Core$Analytics$Parser$cyclic$parseThing();
									}),
								$elm$parser$Parser$spaces),
							$elm$parser$Parser$symbol(')'))),
						A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$lazy(
							function (_v8) {
								return $author$project$Core$Analytics$Parser$cyclic$parseThing();
							}))
					])),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseObj() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Obj),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('{')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$author$project$Core$Analytics$Parser$list(
						$author$project$Core$Analytics$Parser$cyclic$parseKeyValue()),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('}')),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseKeyValue() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Tuple$pair),
				$elm$parser$Parser$spaces),
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					A2($elm$parser$Parser$ignorer, $author$project$Core$Analytics$Parser$lowerVar, $elm$parser$Parser$spaces),
					$elm$parser$Parser$symbol('=')),
				$elm$parser$Parser$spaces)),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$lazy(
						function (_v6) {
							return $author$project$Core$Analytics$Parser$cyclic$parseThing();
						}),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$symbol(','),
							$elm$parser$Parser$symbol('')
						]))),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseLst() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Lst),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('[')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$lazy(
					function (_v5) {
						return $author$project$Core$Analytics$Parser$list(
							$author$project$Core$Analytics$Parser$cyclic$parseThing());
					}),
				$elm$parser$Parser$symbol(']')),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseOk() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Result$Ok),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('Ok')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($elm$core$Basics$identity),
								$elm$parser$Parser$symbol('(')),
							$elm$parser$Parser$spaces),
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$lazy(
									function (_v3) {
										return $author$project$Core$Analytics$Parser$cyclic$parseThing();
									}),
								$elm$parser$Parser$spaces),
							$elm$parser$Parser$symbol(')'))),
						A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$lazy(
							function (_v4) {
								return $author$project$Core$Analytics$Parser$cyclic$parseThing();
							}))
					])),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseSet() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($author$project$Core$Analytics$Parser$Set),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('Set.fromList [')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$lazy(
						function (_v2) {
							return $author$project$Core$Analytics$Parser$list(
								$author$project$Core$Analytics$Parser$cyclic$parseThing());
						}),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol(']')),
			$elm$parser$Parser$spaces));
}
function $author$project$Core$Analytics$Parser$cyclic$parseTpl() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('(')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$map,
					function (lst) {
						if (!lst.b) {
							return $author$project$Core$Analytics$Parser$UnitType;
						} else {
							if (!lst.b.b) {
								var val = lst.a;
								return $elm$core$Basics$identity(val);
							} else {
								return $author$project$Core$Analytics$Parser$Tpl(lst);
							}
						}
					},
					$elm$parser$Parser$lazy(
						function (_v1) {
							return $author$project$Core$Analytics$Parser$list(
								$author$project$Core$Analytics$Parser$cyclic$parseThing());
						})),
				$elm$parser$Parser$symbol(')')),
			$elm$parser$Parser$spaces));
}
try {
	var $author$project$Core$Analytics$Parser$parseThing = $author$project$Core$Analytics$Parser$cyclic$parseThing();
	$author$project$Core$Analytics$Parser$cyclic$parseThing = function () {
		return $author$project$Core$Analytics$Parser$parseThing;
	};
	var $author$project$Core$Analytics$Parser$parseArr = $author$project$Core$Analytics$Parser$cyclic$parseArr();
	$author$project$Core$Analytics$Parser$cyclic$parseArr = function () {
		return $author$project$Core$Analytics$Parser$parseArr;
	};
	var $author$project$Core$Analytics$Parser$parseCustom = $author$project$Core$Analytics$Parser$cyclic$parseCustom();
	$author$project$Core$Analytics$Parser$cyclic$parseCustom = function () {
		return $author$project$Core$Analytics$Parser$parseCustom;
	};
	var $author$project$Core$Analytics$Parser$parseDct = $author$project$Core$Analytics$Parser$cyclic$parseDct();
	$author$project$Core$Analytics$Parser$cyclic$parseDct = function () {
		return $author$project$Core$Analytics$Parser$parseDct;
	};
	var $author$project$Core$Analytics$Parser$parseDictKeyValue = $author$project$Core$Analytics$Parser$cyclic$parseDictKeyValue();
	$author$project$Core$Analytics$Parser$cyclic$parseDictKeyValue = function () {
		return $author$project$Core$Analytics$Parser$parseDictKeyValue;
	};
	var $author$project$Core$Analytics$Parser$parseResult = $author$project$Core$Analytics$Parser$cyclic$parseResult();
	$author$project$Core$Analytics$Parser$cyclic$parseResult = function () {
		return $author$project$Core$Analytics$Parser$parseResult;
	};
	var $author$project$Core$Analytics$Parser$parseErr = $author$project$Core$Analytics$Parser$cyclic$parseErr();
	$author$project$Core$Analytics$Parser$cyclic$parseErr = function () {
		return $author$project$Core$Analytics$Parser$parseErr;
	};
	var $author$project$Core$Analytics$Parser$parseMaybe = $author$project$Core$Analytics$Parser$cyclic$parseMaybe();
	$author$project$Core$Analytics$Parser$cyclic$parseMaybe = function () {
		return $author$project$Core$Analytics$Parser$parseMaybe;
	};
	var $author$project$Core$Analytics$Parser$parseJust = $author$project$Core$Analytics$Parser$cyclic$parseJust();
	$author$project$Core$Analytics$Parser$cyclic$parseJust = function () {
		return $author$project$Core$Analytics$Parser$parseJust;
	};
	var $author$project$Core$Analytics$Parser$parseObj = $author$project$Core$Analytics$Parser$cyclic$parseObj();
	$author$project$Core$Analytics$Parser$cyclic$parseObj = function () {
		return $author$project$Core$Analytics$Parser$parseObj;
	};
	var $author$project$Core$Analytics$Parser$parseKeyValue = $author$project$Core$Analytics$Parser$cyclic$parseKeyValue();
	$author$project$Core$Analytics$Parser$cyclic$parseKeyValue = function () {
		return $author$project$Core$Analytics$Parser$parseKeyValue;
	};
	var $author$project$Core$Analytics$Parser$parseLst = $author$project$Core$Analytics$Parser$cyclic$parseLst();
	$author$project$Core$Analytics$Parser$cyclic$parseLst = function () {
		return $author$project$Core$Analytics$Parser$parseLst;
	};
	var $author$project$Core$Analytics$Parser$parseOk = $author$project$Core$Analytics$Parser$cyclic$parseOk();
	$author$project$Core$Analytics$Parser$cyclic$parseOk = function () {
		return $author$project$Core$Analytics$Parser$parseOk;
	};
	var $author$project$Core$Analytics$Parser$parseSet = $author$project$Core$Analytics$Parser$cyclic$parseSet();
	$author$project$Core$Analytics$Parser$cyclic$parseSet = function () {
		return $author$project$Core$Analytics$Parser$parseSet;
	};
	var $author$project$Core$Analytics$Parser$parseTpl = $author$project$Core$Analytics$Parser$cyclic$parseTpl();
	$author$project$Core$Analytics$Parser$cyclic$parseTpl = function () {
		return $author$project$Core$Analytics$Parser$parseTpl;
	};
} catch ($) {
	throw 'Some top-level definitions from `Core.Analytics.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    parseThing\n  │     ↓\n  │    parseArr\n  │     ↓\n  │    parseCustom\n  │     ↓\n  │    parseDct\n  │     ↓\n  │    parseDictKeyValue\n  │     ↓\n  │    parseResult\n  │     ↓\n  │    parseErr\n  │     ↓\n  │    parseMaybe\n  │     ↓\n  │    parseJust\n  │     ↓\n  │    parseObj\n  │     ↓\n  │    parseKeyValue\n  │     ↓\n  │    parseLst\n  │     ↓\n  │    parseOk\n  │     ↓\n  │    parseSet\n  │     ↓\n  │    parseTpl\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $author$project$Core$Analytics$Parser$parse = A2(
	$elm$parser$Parser$keeper,
	$elm$parser$Parser$succeed($elm$core$Basics$identity),
	A2($elm$parser$Parser$ignorer, $author$project$Core$Analytics$Parser$parseThing, $elm$parser$Parser$end));
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$Core$Analytics$Encoder$encodeAction = function (actionString) {
	var parsedAction = A2($elm$parser$Parser$run, $author$project$Core$Analytics$Parser$parse, actionString);
	if (parsedAction.$ === 'Ok') {
		var action = parsedAction.a;
		if (action.$ === 'Custom') {
			if (!action.b.b) {
				var name = action.a;
				return $elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							$elm$json$Json$Encode$string(name)),
							_Utils_Tuple2('payload', $elm$json$Json$Encode$null)
						]));
			} else {
				if (!action.b.b.b) {
					var name = action.a;
					var _v2 = action.b;
					var val = _v2.a;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'type',
								$elm$json$Json$Encode$string(name)),
								_Utils_Tuple2(
								'payload',
								$author$project$Core$Analytics$Parser$encodeFlat(val))
							]));
				} else {
					var name = action.a;
					var args = action.b;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'type',
								$elm$json$Json$Encode$string(name)),
								_Utils_Tuple2(
								'payload',
								A2($elm$json$Json$Encode$list, $author$project$Core$Analytics$Parser$encodeFlat, args))
							]));
				}
			}
		} else {
			return $elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						$elm$json$Json$Encode$string('ActionTypeError')),
						_Utils_Tuple2(
						'payload',
						$elm$json$Json$Encode$string('Please change Msg type to Custom Data type in Elm app'))
					]));
		}
	} else {
		var lst = parsedAction.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('ActionParseError')),
					_Utils_Tuple2(
					'payload',
					$elm$json$Json$Encode$string(
						$elm$parser$Parser$deadEndsToString(lst)))
				]));
	}
};
var $elm$core$Debug$log = _Debug_log;
var $author$project$Core$Analytics$Encoder$encodeModel = function (modelString) {
	var parsedModel = A2($elm$parser$Parser$run, $author$project$Core$Analytics$Parser$parse, modelString);
	if (parsedModel.$ === 'Ok') {
		var model = parsedModel.a;
		return $author$project$Core$Analytics$Parser$encodeFlat(model);
	} else {
		var lst = parsedModel.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					$elm$json$Json$Encode$string('ModelParseError')),
					_Utils_Tuple2(
					'value',
					$elm$json$Json$Encode$string(
						$elm$parser$Parser$deadEndsToString(
							A2($elm$core$Debug$log, 'ModelParseError', lst))))
				]));
	}
};
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$Core$Analytics$generateJson = F2(
	function (msg, model) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'action',
					$author$project$Core$Analytics$Encoder$encodeAction(
						$elm$core$Debug$toString(msg))),
					_Utils_Tuple2(
					'model',
					$author$project$Core$Analytics$Encoder$encodeModel(
						$elm$core$Debug$toString(model)))
				]));
	});
var $author$project$Core$Analytics$sendOutLog = F3(
	function (msg, model, analyticsPort) {
		return analyticsPort(
			A2($author$project$Core$Analytics$generateJson, msg, model));
	});
var $author$project$Core$init = F4(
	function (mapState, analyticsPort, initializer, f) {
		var _v0 = initializer(f);
		var newState = _v0.a;
		var cmd = _v0.b;
		return _Utils_Tuple2(
			$elm_community$undo_redo$UndoList$fresh(newState),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A3(
						$author$project$Core$Analytics$sendOutLog,
						$author$project$Core$DefInit,
						mapState(newState),
						analyticsPort),
						A2($elm$core$Platform$Cmd$map, $elm_community$undo_redo$UndoList$New, cmd)
					])));
	});
var $author$project$BubbleSortTest$setFresh = function (msg) {
	if (msg.$ === 'Init') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$BubbleSortTest$subscriptions = function (model) {
	return $elm$core$Platform$Sub$none;
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $author$project$Core$subscriptions = F2(
	function (subscriber, undolist) {
		return A2(
			$elm$core$Platform$Sub$map,
			$elm_community$undo_redo$UndoList$New,
			subscriber(undolist.present));
	});
var $author$project$Core$Prompt$PromptDanger = {$: 'PromptDanger'};
var $author$project$Core$Prompt$PromptSuccess = {$: 'PromptSuccess'};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $author$project$BubbleSortTest$getNthMaximum = F2(
	function (n, nums) {
		return A2(
			$elm_community$list_extra$List$Extra$getAt,
			n - 1,
			$elm$core$List$reverse(
				$elm$core$List$sort(nums)));
	});
var $author$project$BubbleSortTest$isSorted = function (nums) {
	return _Utils_eq(
		$elm$core$List$sort(nums),
		nums);
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_extra$List$Extra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $elm_community$list_extra$List$Extra$uncons = function (list) {
	if (!list.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var first = list.a;
		var rest = list.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(first, rest));
	}
};
var $elm_community$list_extra$List$Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_Utils_eq(index1, index2) || (index1 < 0)) {
				return l;
			} else {
				if (_Utils_cmp(index1, index2) > 0) {
					var $temp$index1 = index2,
						$temp$index2 = index1,
						$temp$l = l;
					index1 = $temp$index1;
					index2 = $temp$index2;
					l = $temp$l;
					continue swapAt;
				} else {
					var _v0 = A2($elm_community$list_extra$List$Extra$splitAt, index1, l);
					var part1 = _v0.a;
					var tail1 = _v0.b;
					var _v1 = A2($elm_community$list_extra$List$Extra$splitAt, index2 - index1, tail1);
					var head2 = _v1.a;
					var tail2 = _v1.b;
					var _v2 = _Utils_Tuple2(
						$elm_community$list_extra$List$Extra$uncons(head2),
						$elm_community$list_extra$List$Extra$uncons(tail2));
					if ((_v2.a.$ === 'Just') && (_v2.b.$ === 'Just')) {
						var _v3 = _v2.a.a;
						var value1 = _v3.a;
						var part2 = _v3.b;
						var _v4 = _v2.b.a;
						var value2 = _v4.a;
						var part3 = _v4.b;
						return $elm$core$List$concat(
							_List_fromArray(
								[
									part1,
									A2($elm$core$List$cons, value2, part2),
									A2($elm$core$List$cons, value1, part3)
								]));
					} else {
						return l;
					}
				}
			}
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$BubbleSortTest$update = F2(
	function (msg, model) {
		var _v0 = model;
		var iter = _v0.iter;
		var numbers = _v0.numbers;
		var boundary = _v0.boundary;
		switch (msg.$) {
			case 'Swap':
				var cPrompt = 'Swapped the numbers at indices ' + ($elm$core$String$fromInt(iter) + (' and ' + $elm$core$String$fromInt(iter + 1)));
				var a2 = A2(
					$elm$core$Maybe$withDefault,
					-1,
					A2($elm_community$list_extra$List$Extra$getAt, iter + 1, numbers));
				var a1 = A2(
					$elm$core$Maybe$withDefault,
					-1,
					A2($elm_community$list_extra$List$Extra$getAt, iter, numbers));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							numbers: A3($elm_community$list_extra$List$Extra$swapAt, iter, iter + 1, model.numbers),
							prompt: (_Utils_cmp(
								iter + 1,
								$elm$core$List$length(numbers)) < 0) ? ((_Utils_cmp(iter + 1, boundary) < 0) ? ((_Utils_cmp(a1, a2) > 0) ? _Utils_Tuple2(cPrompt + ' , perform next operation.', $author$project$Core$Prompt$PromptSuccess) : _Utils_Tuple2(cPrompt + ' , this operation might be incorrect', $author$project$Core$Prompt$PromptDanger)) : _Utils_Tuple2(cPrompt + ' , you might be deviating from bubblesort', $author$project$Core$Prompt$PromptDanger)) : _Utils_Tuple2('Cannot perform swap here, please rectify your strategy', $author$project$Core$Prompt$PromptDanger)
						}),
					$elm$core$Platform$Cmd$none);
			case 'IncIter':
				var a2 = A2(
					$elm$core$Maybe$withDefault,
					-1,
					A2($elm_community$list_extra$List$Extra$getAt, iter + 1, numbers));
				var a1 = A2(
					$elm$core$Maybe$withDefault,
					-1,
					A2($elm_community$list_extra$List$Extra$getAt, iter, numbers));
				var _v2 = (_Utils_cmp(a1, a2) < 1) ? ((_Utils_cmp(
					iter,
					$elm$core$List$length(numbers) - 1) < 0) ? ((_Utils_cmp(iter, boundary - 1) < 0) ? _Utils_Tuple2(
					iter + 1,
					_Utils_Tuple2('Incremented "i", please perform the next operation', $author$project$Core$Prompt$PromptSuccess)) : _Utils_Tuple2(
					iter + 1,
					_Utils_Tuple2('Incremented "i", you might be deviating from bubblesort algorithm', $author$project$Core$Prompt$PromptDanger))) : _Utils_Tuple2(
					iter,
					_Utils_Tuple2('Cannot Increment "i", please rectify your strategy', $author$project$Core$Prompt$PromptDanger))) : _Utils_Tuple2(
					iter + 1,
					_Utils_Tuple2('Incremented "i", you might be deviating from bubblesort algorithm', $author$project$Core$Prompt$PromptDanger));
				var iter_ = _v2.a;
				var prompt_ = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{iter: iter_, prompt: prompt_}),
					$elm$core$Platform$Cmd$none);
			case 'ResetIter':
				var _v3 = _Utils_eq(iter, boundary - 1) ? _Utils_Tuple2(
					0,
					_Utils_Tuple2('Resetted "i" to 0, please perform next operation', $author$project$Core$Prompt$PromptSuccess)) : _Utils_Tuple2(
					0,
					_Utils_Tuple2('Resetted "i" to 0, you might be deviating from bubblesort algorithm', $author$project$Core$Prompt$PromptDanger));
				var iter_ = _v3.a;
				var prompt_ = _v3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{iter: iter_, prompt: prompt_}),
					$elm$core$Platform$Cmd$none);
			case 'DecBoundary':
				var maxUnsorted = $elm$core$List$maximum(
					A2($elm$core$List$take, boundary - 1, numbers));
				var endList = A2($elm$core$List$drop, boundary - 1, numbers);
				var _v4 = ($author$project$BubbleSortTest$isSorted(endList) && (_Utils_eq(
					A2(
						$author$project$BubbleSortTest$getNthMaximum,
						($elm$core$List$length(numbers) - boundary) + 1,
						numbers),
					A2($elm_community$list_extra$List$Extra$getAt, boundary - 1, numbers)) && (boundary > 1))) ? (((boundary === 2) && (!iter)) ? _Utils_Tuple3(
					boundary - 1,
					_Utils_Tuple2('Decremented "b", Bubblesort completed', $author$project$Core$Prompt$PromptSuccess),
					true) : _Utils_Tuple3(
					boundary - 1,
					_Utils_Tuple2('Decremented "b", please perform next operation', $author$project$Core$Prompt$PromptSuccess),
					model.completed)) : ((boundary > 1) ? _Utils_Tuple3(
					boundary - 1,
					_Utils_Tuple2('Decremented "b", this operation might be incorrect', $author$project$Core$Prompt$PromptDanger),
					model.completed) : _Utils_Tuple3(
					boundary,
					_Utils_Tuple2('Cannot decrement "b", please rectify your strategy', $author$project$Core$Prompt$PromptDanger),
					model.completed));
				var boundary_ = _v4.a;
				var prompt_ = _v4.b;
				var completed_ = _v4.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{boundary: boundary_, completed: completed_, prompt: prompt_}),
					$elm$core$Platform$Cmd$none);
			case 'Init':
				var arr = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							boundary: $elm$core$Array$length(arr),
							numbers: $elm$core$Array$toList(arr)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $elm_community$undo_redo$UndoList$forget = function (_v0) {
	var present = _v0.present;
	var future = _v0.future;
	return A3($elm_community$undo_redo$UndoList$UndoList, _List_Nil, present, future);
};
var $author$project$Core$getUndoListCmds = function (undoListCmds) {
	if (undoListCmds.$ === 'Nothing') {
		return _Utils_Tuple2(
			_Utils_Tuple2($elm$core$Platform$Cmd$none, $elm$core$Platform$Cmd$none),
			_Utils_Tuple2($elm$core$Platform$Cmd$none, $elm$core$Platform$Cmd$none));
	} else {
		var cmds = undoListCmds.a;
		return cmds;
	}
};
var $elm_community$undo_redo$UndoList$redo = function (_v0) {
	var past = _v0.past;
	var present = _v0.present;
	var future = _v0.future;
	if (!future.b) {
		return A3($elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = future.a;
		var xs = future.b;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			A2($elm$core$List$cons, present, past),
			x,
			xs);
	}
};
var $elm_community$undo_redo$UndoList$undo = function (_v0) {
	var past = _v0.past;
	var present = _v0.present;
	var future = _v0.future;
	if (!past.b) {
		return A3($elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = past.a;
		var xs = past.b;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			xs,
			x,
			A2($elm$core$List$cons, present, future));
	}
};
var $author$project$Core$multipleUndoRedo = F3(
	function (count, wrapperMessage, undolist) {
		multipleUndoRedo:
		while (true) {
			var newUndoList = function () {
				switch (wrapperMessage.$) {
					case 'Redo':
						return $elm_community$undo_redo$UndoList$redo(undolist);
					case 'Undo':
						return $elm_community$undo_redo$UndoList$undo(undolist);
					default:
						return undolist;
				}
			}();
			if ((count - 1) > 0) {
				var $temp$count = count - 1,
					$temp$wrapperMessage = wrapperMessage,
					$temp$undolist = newUndoList;
				count = $temp$count;
				wrapperMessage = $temp$wrapperMessage;
				undolist = $temp$undolist;
				continue multipleUndoRedo;
			} else {
				return newUndoList;
			}
		}
	});
var $elm_community$undo_redo$UndoList$new = F2(
	function (event, _v0) {
		var past = _v0.past;
		var present = _v0.present;
		return A3(
			$elm_community$undo_redo$UndoList$UndoList,
			A2($elm$core$List$cons, present, past),
			event,
			_List_Nil);
	});
var $elm_community$undo_redo$UndoList$reset = function (_v0) {
	reset:
	while (true) {
		var past = _v0.past;
		var present = _v0.present;
		if (!past.b) {
			return $elm_community$undo_redo$UndoList$fresh(present);
		} else {
			var x = past.a;
			var xs = past.b;
			var $temp$_v0 = A3($elm_community$undo_redo$UndoList$UndoList, xs, x, _List_Nil);
			_v0 = $temp$_v0;
			continue reset;
		}
	}
};
var $author$project$Core$update = F8(
	function (mapState, analyticsPort, updater, setFresh, undoRedoCount, undoListCmds, wrapperMessage, undolist) {
		var log = F2(
			function (logMsg, logState) {
				return A3(
					$author$project$Core$Analytics$sendOutLog,
					logMsg,
					mapState(logState),
					analyticsPort);
			});
		var _v0 = $author$project$Core$getUndoListCmds(undoListCmds);
		var _v1 = _v0.a;
		var resetCmd = _v1.a;
		var redoCmd = _v1.b;
		var _v2 = _v0.b;
		var undoCmd = _v2.a;
		var forgetCmd = _v2.b;
		switch (wrapperMessage.$) {
			case 'Reset':
				var newUndoList = $elm_community$undo_redo$UndoList$reset(undolist);
				return _Utils_Tuple2(
					newUndoList,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(log, wrapperMessage, newUndoList.present),
								A2($elm$core$Platform$Cmd$map, $elm_community$undo_redo$UndoList$New, resetCmd)
							])));
			case 'Redo':
				var newUndoList = function () {
					if (undoRedoCount.$ === 'Nothing') {
						return $elm_community$undo_redo$UndoList$redo(undolist);
					} else {
						var c = undoRedoCount.a;
						return A3($author$project$Core$multipleUndoRedo, c, wrapperMessage, undolist);
					}
				}();
				return _Utils_Tuple2(
					newUndoList,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(log, wrapperMessage, newUndoList.present),
								A2($elm$core$Platform$Cmd$map, $elm_community$undo_redo$UndoList$New, redoCmd)
							])));
			case 'Undo':
				var newUndoList = function () {
					if (undoRedoCount.$ === 'Nothing') {
						return $elm_community$undo_redo$UndoList$undo(undolist);
					} else {
						var c = undoRedoCount.a;
						return A3($author$project$Core$multipleUndoRedo, c, wrapperMessage, undolist);
					}
				}();
				return _Utils_Tuple2(
					newUndoList,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(log, wrapperMessage, newUndoList.present),
								A2($elm$core$Platform$Cmd$map, $elm_community$undo_redo$UndoList$New, undoCmd)
							])));
			case 'Forget':
				var newUndoList = $elm_community$undo_redo$UndoList$forget(undolist);
				return _Utils_Tuple2(
					newUndoList,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(log, wrapperMessage, newUndoList.present),
								A2($elm$core$Platform$Cmd$map, $elm_community$undo_redo$UndoList$New, forgetCmd)
							])));
			default:
				var msg = wrapperMessage.a;
				var _v6 = A2(updater, msg, undolist.present);
				var newState = _v6.a;
				var cmd = _v6.b;
				return setFresh(msg) ? _Utils_Tuple2(
					$elm_community$undo_redo$UndoList$fresh(newState),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(log, msg, newState),
								A2($elm$core$Platform$Cmd$map, $elm_community$undo_redo$UndoList$New, cmd)
							]))) : _Utils_Tuple2(
					A2($elm_community$undo_redo$UndoList$new, newState, undolist),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(log, msg, newState),
								A2($elm$core$Platform$Cmd$map, $elm_community$undo_redo$UndoList$New, cmd)
							])));
		}
	});
var $author$project$BubbleSortTest$DecBoundary = {$: 'DecBoundary'};
var $author$project$BubbleSortTest$IncIter = {$: 'IncIter'};
var $author$project$BubbleSortTest$ResetIter = {$: 'ResetIter'};
var $author$project$BubbleSortTest$Swap = {$: 'Swap'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$BubbleSortTest$hidePrompt = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'flex', '1')
		]),
	_List_Nil);
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Core$Prompt$promptClass = function (promptType) {
	switch (promptType.$) {
		case 'PromptSuccess':
			return 'prompt--success';
		case 'PromptDanger':
			return 'prompt--danger';
		default:
			return 'prompt--info';
	}
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Core$Prompt$show = function (_v0) {
	var prompt_text = _v0.a;
	var promptType = _v0.b;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class(
				$author$project$Core$Prompt$promptClass(promptType))
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(prompt_text)
			]));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$html$Html$b = _VirtualDom_node('b');
var $author$project$SortedIndicator$sortedIndicator = function (nums) {
	var sortedBgColor = '#388E3C';
	var isSorted = A2(
		$elm$core$List$all,
		function (b) {
			return b;
		},
		A3(
			$elm$core$List$map2,
			F2(
				function (a, b) {
					return _Utils_eq(a, b);
				}),
			nums,
			$elm$core$List$sort(nums)));
	var text = isSorted ? 'SORTED' : 'NOT SORTED';
	var bgColor = '#F57C00';
	var styles = _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'background',
			isSorted ? sortedBgColor : bgColor),
			A2($elm$html$Html$Attributes$style, 'color', '#FFFFFF'),
			A2($elm$html$Html$Attributes$style, 'padding', '10px'),
			A2($elm$html$Html$Attributes$style, 'margin', '0 10px')
		]);
	return A2(
		$elm$html$Html$div,
		styles,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$b,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(text)
					]))
			]));
};
var $author$project$BubbleSortTest$NoMsg = {$: 'NoMsg'};
var $author$project$ListView$cell_gap = 20;
var $author$project$ListView$cell_radius = 56;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $author$project$ListView$crc_ = F6(
	function (col, strokeCol, td, r, x, y) {
		return A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx(
					$elm$core$String$fromFloat(x)),
					$elm$svg$Svg$Attributes$cy(
					$elm$core$String$fromFloat(y)),
					$elm$svg$Svg$Attributes$r(
					$elm$core$String$fromFloat(r)),
					$elm$svg$Svg$Attributes$fill(col),
					$elm$svg$Svg$Attributes$stroke(strokeCol),
					$elm$svg$Svg$Attributes$strokeWidth('4'),
					A2(
					$elm$html$Html$Attributes$style,
					'transition',
					A3(
						$elm$core$String$replace,
						'{n}',
						$elm$core$String$fromFloat(td),
						'all {n}s ease-in-out'))
				]),
			_List_Nil);
	});
var $elm$svg$Svg$Attributes$cursor = _VirtualDom_attribute('cursor');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $author$project$ListView$inplaceFill = '#AED581';
var $elm$svg$Svg$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$ListView$regularFill = '#FFF59D';
var $author$project$ListView$strokeColor = '#F44336';
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$ListView$txt_ = F4(
	function (x, y, fsize, v) {
		return A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(x)),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(y)),
					$elm$svg$Svg$Attributes$fontSize(
					$elm$core$String$fromFloat(fsize)),
					$elm$svg$Svg$Attributes$fill('#112233'),
					$elm$svg$Svg$Attributes$textAnchor('middle'),
					$elm$svg$Svg$Attributes$dominantBaseline('middle')
				]),
			_List_fromArray(
				[
					$elm$svg$Svg$text(v)
				]));
	});
var $author$project$ListView$drawCell = F8(
	function (opts, selected, inplace, idx, v, m, x, y) {
		var textColor = A2($elm$core$Maybe$withDefault, '#000', opts.cellColor);
		var labelStrokeColor = A2(
			$elm$core$Maybe$withDefault,
			selected ? $author$project$ListView$strokeColor : '#fff',
			opts.labelStrokeColor);
		var label = A2($elm$core$Maybe$withDefault, '', opts.label);
		var idxCrc = selected ? A6($author$project$ListView$crc_, '#fff', labelStrokeColor, 0.5, $author$project$ListView$cell_radius / 2, 0, $author$project$ListView$cell_radius * 2) : A6($author$project$ListView$crc_, '#fff', labelStrokeColor, 1, $author$project$ListView$cell_radius / 2, 0, $author$project$ListView$cell_radius * 2);
		var cellColor = A2(
			$elm$core$Maybe$withDefault,
			inplace ? $author$project$ListView$inplaceFill : $author$project$ListView$regularFill,
			opts.cellColor);
		var cfn = function () {
			var _v0 = _Utils_Tuple2(selected, inplace);
			if (_v0.a) {
				if (_v0.b) {
					return A4($author$project$ListView$crc_, cellColor, $author$project$ListView$strokeColor, 0.5, $author$project$ListView$cell_radius);
				} else {
					return A4($author$project$ListView$crc_, cellColor, $author$project$ListView$strokeColor, 0.5, $author$project$ListView$cell_radius);
				}
			} else {
				if (_v0.b) {
					return A4($author$project$ListView$crc_, cellColor, '#fff', 1, $author$project$ListView$cell_radius);
				} else {
					return A4($author$project$ListView$crc_, cellColor, '#fff', 1, $author$project$ListView$cell_radius);
				}
			}
		}();
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$transform(
					$elm$core$String$concat(
						_List_fromArray(
							[
								'translate(',
								$elm$core$String$fromFloat(x * ((2 * $author$project$ListView$cell_radius) + $author$project$ListView$cell_gap)),
								', ',
								$elm$core$String$fromFloat(y),
								')'
							]))),
					$elm$svg$Svg$Attributes$cursor('pointer'),
					$elm$svg$Svg$Events$onClick(m)
				]),
			_List_fromArray(
				[
					A2(cfn, 0, 0),
					idxCrc,
					A4(
					$author$project$ListView$txt_,
					0,
					0,
					40,
					$elm$core$String$fromInt(v)),
					A4(
					$author$project$ListView$txt_,
					0,
					$author$project$ListView$cell_radius * 2,
					25,
					$elm$core$String$fromInt(idx)),
					A4($author$project$ListView$txt_, 0, $author$project$ListView$cell_radius * 3, 25, label)
				]));
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$ListView$no_options = {cellColor: $elm$core$Maybe$Nothing, label: $elm$core$Maybe$Nothing, labelStrokeColor: $elm$core$Maybe$Nothing, textColor: $elm$core$Maybe$Nothing};
var $author$project$ListView$drawcells = F3(
	function (nums, selected, m) {
		var sortedValues = $elm$core$List$sort(
			A2(
				$elm$core$List$map,
				function (_v2) {
					var n = _v2.a;
					var os = _v2.b;
					return n;
				},
				nums));
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$transform(
					$elm$core$String$concat(
						_List_fromArray(
							[
								'translate(',
								$elm$core$String$fromFloat(
								(1200 - ((((2 * $author$project$ListView$cell_radius) + $author$project$ListView$cell_gap) * $elm$core$List$length(nums)) - $author$project$ListView$cell_gap)) / 2),
								', ',
								$elm$core$String$fromFloat(100),
								')'
							])))
				]),
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (p, _v0) {
						var num = _v0.a;
						var opts = _v0.b;
						if (opts.$ === 'Just') {
							var opts_ = opts.a;
							return A8(
								$author$project$ListView$drawCell,
								opts_,
								A2($elm$core$List$member, p, selected),
								_Utils_eq(
									A2(
										$elm$core$Maybe$withDefault,
										-1,
										A2($elm_community$list_extra$List$Extra$getAt, p, sortedValues)),
									num),
								p,
								num,
								m(p),
								p,
								0);
						} else {
							return A8(
								$author$project$ListView$drawCell,
								$author$project$ListView$no_options,
								A2($elm$core$List$member, p, selected),
								_Utils_eq(
									A2(
										$elm$core$Maybe$withDefault,
										-1,
										A2($elm_community$list_extra$List$Extra$getAt, p, sortedValues)),
									num),
								p,
								num,
								m(p),
								p,
								0);
						}
					}),
				nums));
	});
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$BubbleSortTest$viewNums = F3(
	function (nums, iter, bndry) {
		var msg = function (ci) {
			return $author$project$BubbleSortTest$NoMsg;
		};
		var lwidth = 1100;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'flex-grow', '1')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$viewBox(
							'0 0 ' + ($elm$core$String$fromInt(lwidth) + ' 300')),
							A2($elm$html$Html$Attributes$style, 'height', '100%'),
							A2($elm$html$Html$Attributes$style, 'width', '100%')
						]),
					_List_fromArray(
						[
							A3(
							$author$project$ListView$drawcells,
							A2(
								$elm$core$List$indexedMap,
								F2(
									function (i, n) {
										return _Utils_eq(i, bndry) ? _Utils_Tuple2(
											n,
											$elm$core$Maybe$Just(
												{
													cellColor: $elm$core$Maybe$Nothing,
													label: $elm$core$Maybe$Just('b'),
													labelStrokeColor: $elm$core$Maybe$Just('#aed'),
													textColor: $elm$core$Maybe$Nothing
												})) : (_Utils_eq(i, iter) ? _Utils_Tuple2(
											n,
											$elm$core$Maybe$Just(
												{
													cellColor: $elm$core$Maybe$Nothing,
													label: $elm$core$Maybe$Just('i'),
													labelStrokeColor: $elm$core$Maybe$Nothing,
													textColor: $elm$core$Maybe$Nothing
												})) : _Utils_Tuple2(n, $elm$core$Maybe$Nothing));
									}),
								nums),
							_List_fromArray(
								[iter, iter + 1]),
							msg)
						]))
				]));
	});
var $author$project$BubbleSortTest$viewVars = function (vars) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
				A2($elm$html$Html$Attributes$style, 'font-size', '1.3em'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center')
			]),
		A2(
			$elm$core$List$map,
			function (_v0) {
				var name = _v0.a;
				var val = _v0.b;
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							name + (' = ' + $elm$core$String$fromInt(val)))
						]));
			},
			vars));
};
var $author$project$BubbleSortTest$view = function (model) {
	var _v0 = model;
	var numbers = _v0.numbers;
	var iter = _v0.iter;
	var boundary = _v0.boundary;
	var prompt = _v0.prompt;
	var completed = _v0.completed;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('experiment-container')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('feedback-container')
					]),
				_List_fromArray(
					[
						completed ? $author$project$Core$Prompt$show(prompt) : $author$project$BubbleSortTest$hidePrompt,
						$author$project$SortedIndicator$sortedIndicator(numbers)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('observables-container')
					]),
				_List_fromArray(
					[
						$author$project$BubbleSortTest$viewVars(
						_List_fromArray(
							[
								_Utils_Tuple2('index (i)', iter),
								_Utils_Tuple2('boundary (b)', boundary)
							])),
						A3($author$project$BubbleSortTest$viewNums, numbers, iter, boundary)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('controls-container')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$BubbleSortTest$Swap),
								$elm$html$Html$Attributes$class('button__action--primary'),
								$elm$html$Html$Attributes$disabled(completed)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Swap')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$BubbleSortTest$IncIter),
								$elm$html$Html$Attributes$class('button__action--primary'),
								$elm$html$Html$Attributes$disabled(completed)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Increment i')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$BubbleSortTest$ResetIter),
								$elm$html$Html$Attributes$class('button__action--primary'),
								$elm$html$Html$Attributes$disabled(completed)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Reset i')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Events$onClick($author$project$BubbleSortTest$DecBoundary),
								$elm$html$Html$Attributes$class('button__action--primary'),
								$elm$html$Html$Attributes$disabled(completed)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Decrement b')
							]))
					]))
			]));
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations = function (declarations) {
	dropEmptyDeclarations:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			switch (declarations.a.$) {
				case 'StyleBlockDeclaration':
					var declaration = declarations.a;
					var _v1 = declaration.a;
					var properties = _v1.c;
					var rest = declarations.b;
					if ($elm$core$List$isEmpty(properties)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				case 'MediaRule':
					var declaration = declarations.a;
					var styleBlocks = declaration.b;
					var rest = declarations.b;
					if (A2(
						$elm$core$List$all,
						function (_v2) {
							var properties = _v2.c;
							return $elm$core$List$isEmpty(properties);
						},
						styleBlocks)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				case 'SupportsRule':
					var declaration = declarations.a;
					var otherDeclarations = declaration.b;
					var rest = declarations.b;
					if ($elm$core$List$isEmpty(otherDeclarations)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				case 'DocumentRule':
					var declaration = declarations.a;
					var rest = declarations.b;
					return A2(
						$elm$core$List$cons,
						declaration,
						$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
				case 'PageRule':
					var declaration = declarations.a;
					var properties = declaration.b;
					var rest = declarations.b;
					if ($elm$core$List$isEmpty(properties)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				case 'FontFace':
					var declaration = declarations.a;
					var properties = declaration.a;
					var rest = declarations.b;
					if ($elm$core$List$isEmpty(properties)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				case 'Keyframes':
					var declaration = declarations.a;
					var properties = declaration.b;
					var rest = declarations.b;
					if ($elm$core$List$isEmpty(properties)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				case 'Viewport':
					var declaration = declarations.a;
					var properties = declaration.a;
					var rest = declarations.b;
					if ($elm$core$List$isEmpty(properties)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				case 'CounterStyle':
					var declaration = declarations.a;
					var properties = declaration.a;
					var rest = declarations.b;
					if ($elm$core$List$isEmpty(properties)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
				default:
					var declaration = declarations.a;
					var tuples = declaration.a;
					var rest = declarations.b;
					if (A2(
						$elm$core$List$all,
						function (_v3) {
							var properties = _v3.b;
							return $elm$core$List$isEmpty(properties);
						},
						tuples)) {
						var $temp$declarations = rest;
						declarations = $temp$declarations;
						continue dropEmptyDeclarations;
					} else {
						return A2(
							$elm$core$List$cons,
							declaration,
							$ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(rest));
					}
			}
		}
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$dropEmpty = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return {
		charset: charset,
		declarations: $ThinkAlexandria$css_in_elm$Css$Structure$dropEmptyDeclarations(declarations),
		imports: imports,
		namespaces: namespaces
	};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A2(
				$elm$core$String$join,
				' and ',
				A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaExpressionToString, expressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return '@import \"' + (name + ('[' + (A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaQueryToString, mediaQueries)) + ']\"')));
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$spaceIndent = '    ';
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$indent = function (str) {
	return _Utils_ap($ThinkAlexandria$css_in_elm$Css$Structure$Output$spaceIndent, str);
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$noIndent = '';
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintProperty = function (_v0) {
	var key = _v0.key;
	var value = _v0.value;
	var important = _v0.important;
	var suffix = important ? ' !important;' : ';';
	return key + (': ' + (value + suffix));
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintProperties = function (properties) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $ThinkAlexandria$css_in_elm$Css$Structure$Output$indent, $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintProperty),
			properties));
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return ':' + str;
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				$elm$core$String$join,
				'',
				A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return A2(
		$elm$core$String$join,
		' ',
		_List_fromArray(
			[
				$ThinkAlexandria$css_in_elm$Css$Structure$Output$combinatorToString(combinator),
				$ThinkAlexandria$css_in_elm$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = _Utils_ap(
		_List_fromArray(
			[
				$ThinkAlexandria$css_in_elm$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence)
			]),
		A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				$elm$core$Maybe$withDefault,
				'',
				A2($elm$core$Maybe$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return function (a) {
		return _Utils_ap(a, pseudoElementsString);
	}(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
				segments)));
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		var selectorStr = A2(
			$elm$core$String$join,
			', ',
			A2(
				$elm$core$List$map,
				$ThinkAlexandria$css_in_elm$Css$Structure$Output$selectorToString,
				A2($elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					$ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintDeclaration = function (declaration) {
	switch (declaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = declaration.a;
			return A2($ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintStyleBlock, $ThinkAlexandria$css_in_elm$Css$Structure$Output$noIndent, styleBlock);
		case 'MediaRule':
			var mediaQueries = declaration.a;
			var styleBlocks = declaration.b;
			var query = A2(
				$elm$core$String$join,
				',\n',
				A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				$elm$core$String$join,
				'\n\n',
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						$ThinkAlexandria$css_in_elm$Css$Structure$Output$indent,
						$ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintStyleBlock($ThinkAlexandria$css_in_elm$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		default:
			return 'TODO not yet implemented :x';
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$Structure$Output$charsetToString(charset),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$importToString, imports)),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					$elm$core$String$join,
					'\n\n',
					A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($ThinkAlexandria$css_in_elm$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$ThinkAlexandria$css_in_elm$Css$Structure$StyleBlockDeclaration(
								A2($ThinkAlexandria$css_in_elm$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$ThinkAlexandria$css_in_elm$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$ThinkAlexandria$css_in_elm$Css$Structure$mapLast,
									$ThinkAlexandria$css_in_elm$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($ThinkAlexandria$css_in_elm$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock, first, rest, properties),
					A3($ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$ThinkAlexandria$css_in_elm$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$ThinkAlexandria$css_in_elm$Css$Structure$appendToLastSelector,
			$ThinkAlexandria$css_in_elm$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$ThinkAlexandria$css_in_elm$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $ThinkAlexandria$css_in_elm$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$ThinkAlexandria$css_in_elm$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$ThinkAlexandria$css_in_elm$Css$Structure$Selector,
				A2($ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$ThinkAlexandria$css_in_elm$Css$Structure$Selector,
				firstSelector,
				A2($ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$ThinkAlexandria$css_in_elm$Css$Structure$appendToLastSelector,
			$ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$concatDeclarationsAndWarnings = function (declarationsAndWarnings) {
	if (!declarationsAndWarnings.b) {
		return {declarations: _List_Nil, warnings: _List_Nil};
	} else {
		var declarations = declarationsAndWarnings.a.declarations;
		var warnings = declarationsAndWarnings.a.warnings;
		var rest = declarationsAndWarnings.b;
		var result = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$concatDeclarationsAndWarnings(rest);
		return {
			declarations: _Utils_ap(declarations, result.declarations),
			warnings: _Utils_ap(warnings, result.warnings)
		};
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$ThinkAlexandria$css_in_elm$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$ThinkAlexandria$css_in_elm$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$ThinkAlexandria$css_in_elm$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($ThinkAlexandria$css_in_elm$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$ThinkAlexandria$css_in_elm$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var unhandledDeclarations = _v5;
										return unhandledDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$ThinkAlexandria$css_in_elm$Css$Structure$SupportsRule,
									str,
									A2($ThinkAlexandria$css_in_elm$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($ThinkAlexandria$css_in_elm$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							var _v9 = declarations.a;
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							var _v10 = declarations.a;
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($ThinkAlexandria$css_in_elm$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarning = function (_v0) {
	var warnings = _v0.warnings;
	var key = _v0.key;
	var value = _v0.value;
	var important = _v0.important;
	return _Utils_Tuple2(
		warnings,
		{important: important, key: key, value: value});
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarnings = function (properties) {
	return _Utils_Tuple2(
		A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.warnings;
			},
			properties),
		A2(
			$elm$core$List$map,
			function (prop) {
				return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarning(prop).b;
			},
			properties));
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveCounterStyle = function (counterStyleProperties) {
	var _v0 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarnings(counterStyleProperties);
	var warnings = _v0.a;
	var properties = _v0.b;
	return {
		declarations: _List_fromArray(
			[
				$ThinkAlexandria$css_in_elm$Css$Structure$Viewport(properties)
			]),
		warnings: warnings
	};
};
var $ThinkAlexandria$css_in_elm$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveFontFace = function (fontFaceProperties) {
	var _v0 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarnings(fontFaceProperties);
	var warnings = _v0.a;
	var properties = _v0.b;
	return {
		declarations: _List_fromArray(
			[
				$ThinkAlexandria$css_in_elm$Css$Structure$FontFace(properties)
			]),
		warnings: warnings
	};
};
var $ThinkAlexandria$css_in_elm$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _Utils_Tuple2(_List_Nil, _List_Nil);
		} else {
			var _v1 = tuplesToExpand.a;
			var str = _v1.a;
			var tupleProperties = _v1.b;
			var rest = tuplesToExpand.b;
			var _v2 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarnings(tupleProperties);
			var warnings = _v2.a;
			var properties = _v2.b;
			var _v3 = expandTuples(rest);
			var nextWarnings = _v3.a;
			var nextTuples = _v3.b;
			return _Utils_Tuple2(
				_Utils_ap(warnings, nextWarnings),
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(str, properties),
					nextTuples));
		}
	};
	var _v4 = expandTuples(tuples);
	var warnings = _v4.a;
	var newTuples = _v4.b;
	return {
		declarations: _List_fromArray(
			[
				$ThinkAlexandria$css_in_elm$Css$Structure$FontFeatureValues(newTuples)
			]),
		warnings: warnings
	};
};
var $ThinkAlexandria$css_in_elm$Css$Structure$Keyframes = F2(
	function (a, b) {
		return {$: 'Keyframes', a: a, b: b};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveKeyframes = F2(
	function (str, properties) {
		return {
			declarations: _List_fromArray(
				[
					A2($ThinkAlexandria$css_in_elm$Css$Structure$Keyframes, str, properties)
				]),
			warnings: _List_Nil
		};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 'PageRule', a: a, b: b};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolvePageRule = F2(
	function (str, pageRuleProperties) {
		var _v0 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarnings(pageRuleProperties);
		var warnings = _v0.a;
		var properties = _v0.b;
		return {
			declarations: _List_fromArray(
				[
					A2($ThinkAlexandria$css_in_elm$Css$Structure$PageRule, str, properties)
				]),
			warnings: warnings
		};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveViewport = function (viewportProperties) {
	var _v0 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarnings(viewportProperties);
	var warnings = _v0.a;
	var properties = _v0.b;
	return {
		declarations: _List_fromArray(
			[
				$ThinkAlexandria$css_in_elm$Css$Structure$Viewport(properties)
			]),
		warnings: warnings
	};
};
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($ThinkAlexandria$css_in_elm$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$ThinkAlexandria$css_in_elm$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$ThinkAlexandria$css_in_elm$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$ThinkAlexandria$css_in_elm$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($ThinkAlexandria$css_in_elm$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v19 = _Utils_Tuple2(
				$elm$core$List$head(nextResult.declarations),
				$elm$core$List$head(
					$elm$core$List$reverse(declarations)));
			if ((_v19.a.$ === 'Just') && (_v19.b.$ === 'Just')) {
				var nextResultParent = _v19.a.a;
				var originalParent = _v19.b.a;
				return _Utils_ap(
					$elm$core$List$reverse(
						A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							$elm$core$List$tail(
								$elm$core$List$reverse(declarations)))),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var handleInitial = function (declarationsAndWarnings) {
			var result = A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles, nestedStyles, declarationsAndWarnings.declarations);
			return {
				declarations: result.declarations,
				warnings: _Utils_ap(declarationsAndWarnings.warnings, result.warnings)
			};
		};
		var insertStylesToNestedDecl = function (lastDecl) {
			return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$concatDeclarationsAndWarnings(
				A2(
					$ThinkAlexandria$css_in_elm$Css$Structure$mapLast,
					handleInitial,
					A2(
						$elm$core$List$map,
						function (declaration) {
							return {
								declarations: _List_fromArray(
									[declaration]),
								warnings: _List_Nil
							};
						},
						A2($ThinkAlexandria$css_in_elm$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			{declarations: _List_Nil, warnings: _List_Nil},
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return {
			declarations: _Utils_ap(
				newDeclarations,
				_Utils_ap(
					withoutParent(initialResult.declarations),
					withoutParent(nextResult.declarations))),
			warnings: _Utils_ap(initialResult.warnings, nextResult.warnings)
		};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return {declarations: declarations, warnings: _List_Nil};
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var propertyToAppend = styles.a.a;
					var rest = styles.b;
					var _v8 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extractWarning(propertyToAppend);
					var warnings = _v8.a;
					var property = _v8.b;
					var result = A2(
						$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($ThinkAlexandria$css_in_elm$Css$Structure$appendProperty, property, declarations));
					return {
						declarations: result.declarations,
						warnings: _Utils_ap(warnings, result.warnings)
					};
				case 'ExtendSelector':
					var _v9 = styles.a;
					var selector = _v9.a;
					var nestedStyles = _v9.b;
					var rest = styles.b;
					return A4(
						$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$ThinkAlexandria$css_in_elm$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v10 = styles.a;
					var selectorCombinator = _v10.a;
					var nestSnippets = _v10.b;
					var rest = styles.b;
					var chain = F2(
						function (_v14, _v15) {
							var originalSequence = _v14.a;
							var originalTuples = _v14.b;
							var originalPseudoElement = _v14.c;
							var newSequence = _v15.a;
							var newTuples = _v15.b;
							var newPseudoElement = _v15.c;
							return A3(
								$ThinkAlexandria$css_in_elm$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v12 = declaration.a;
								var firstSelector = _v12.a;
								var otherSelectors = _v12.b;
								var nestedStyles = _v12.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remaining = newSelectors.b;
										return _List_fromArray(
											[
												$ThinkAlexandria$css_in_elm$Css$Structure$StyleBlockDeclaration(
												A3($ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock, first, remaining, _List_Nil))
											]);
									}
								}();
								return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$concatDeclarationsAndWarnings(
									_List_fromArray(
										[
											A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations)
										]));
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var snippets = declaration.b;
								return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A5($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveDocumentRule, str1, str2, str3, str4, styleBlock);
							case 'PageRule':
								var str = declaration.a;
								var pageRuleProperties = declaration.b;
								return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolvePageRule, str, pageRuleProperties);
							case 'FontFace':
								var fontFaceProperties = declaration.a;
								return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveFontFace(fontFaceProperties);
							case 'Keyframes':
								var str = declaration.a;
								var properties = declaration.b;
								return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveKeyframes, str, properties);
							case 'Viewport':
								var viewportProperties = declaration.a;
								return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveViewport(viewportProperties);
							case 'CounterStyle':
								var counterStyleProperties = declaration.a;
								return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveCounterStyle(counterStyleProperties);
							default:
								var tuples = declaration.a;
								return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$concatDeclarationsAndWarnings(
						_Utils_ap(
							_List_fromArray(
								[
									A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $ThinkAlexandria$css_in_elm$Css$Preprocess$unwrapSnippet, nestSnippets))));
				case 'WithPseudoElement':
					var _v16 = styles.a;
					var pseudoElement = _v16.a;
					var nestedStyles = _v16.b;
					var rest = styles.b;
					return A4(
						$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$ThinkAlexandria$css_in_elm$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithMedia':
					var _v17 = styles.a;
					var mediaQueries = _v17.a;
					var nestedStyles = _v17.b;
					var rest = styles.b;
					var newDeclarations = function () {
						var _v18 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v18.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v18.a;
							var otherSelectors = _v18.b;
							return _List_fromArray(
								[
									A2(
									$ThinkAlexandria$css_in_elm$Css$Structure$MediaRule,
									mediaQueries,
									_List_fromArray(
										[
											A3($ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)
										]))
								]);
						}
					}();
					return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$concatDeclarationsAndWarnings(
						_List_fromArray(
							[
								A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles, rest, declarations),
								A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations)
							]));
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$expandStyleBlock = function (_v6) {
	var firstSelector = _v6.a;
	var otherSelectors = _v6.b;
	var styles = _v6.c;
	return A2(
		$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$ThinkAlexandria$css_in_elm$Css$Structure$StyleBlockDeclaration(
				A3($ThinkAlexandria$css_in_elm$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return {declarations: _List_Nil, warnings: _List_Nil};
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		var nextResult = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extract(rest);
		var _v5 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toDeclarations(first);
		var declarations = _v5.declarations;
		var warnings = _v5.warnings;
		return {
			declarations: _Utils_ap(declarations, nextResult.declarations),
			warnings: _Utils_ap(warnings, nextResult.warnings)
		};
	}
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveDocumentRule = F5(
	function (str1, str2, str3, str4, styleBlock) {
		var _v3 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		var declarations = _v3.declarations;
		var warnings = _v3.warnings;
		return {
			declarations: A2(
				$elm$core$List$map,
				A4($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				declarations),
			warnings: warnings
		};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			var _v2 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
			var declarations = _v2.declarations;
			var warnings = _v2.warnings;
			return {
				declarations: A2(
					$elm$core$List$map,
					$ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
					declarations),
				warnings: warnings
			};
		};
		var results = A2($elm$core$List$map, handleStyleBlock, styleBlocks);
		return {
			declarations: A2(
				$elm$core$List$concatMap,
				function ($) {
					return $.declarations;
				},
				results),
			warnings: A2(
				$elm$core$List$concatMap,
				function ($) {
					return $.warnings;
				},
				results)
		};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var _v1 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $ThinkAlexandria$css_in_elm$Css$Preprocess$unwrapSnippet, snippets));
		var declarations = _v1.declarations;
		var warnings = _v1.warnings;
		return {
			declarations: _List_fromArray(
				[
					A2($ThinkAlexandria$css_in_elm$Css$Structure$SupportsRule, str, declarations)
				]),
			warnings: warnings
		};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A5($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveDocumentRule, str1, str2, str3, str4, styleBlock);
		case 'PageRule':
			var str = snippetDeclaration.a;
			var pageRuleProperties = snippetDeclaration.b;
			return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolvePageRule, str, pageRuleProperties);
		case 'FontFace':
			var fontFaceProperties = snippetDeclaration.a;
			return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveFontFace(fontFaceProperties);
		case 'Keyframes':
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return A2($ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveKeyframes, str, properties);
		case 'Viewport':
			var viewportProperties = snippetDeclaration.a;
			return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveViewport(viewportProperties);
		case 'CounterStyle':
			var counterStyleProperties = snippetDeclaration.a;
			return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveCounterStyle(counterStyleProperties);
		default:
			var tuples = snippetDeclaration.a;
			return $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var _v1 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $ThinkAlexandria$css_in_elm$Css$Preprocess$unwrapSnippet, snippets));
	var warnings = _v1.warnings;
	var declarations = _v1.declarations;
	return _Utils_Tuple2(
		{charset: charset, declarations: declarations, imports: imports, namespaces: namespaces},
		warnings);
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$compile1 = function (sheet) {
	var _v0 = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$toStructure(sheet);
	var structureStylesheet = _v0.a;
	var warnings = _v0.b;
	return {
		css: $ThinkAlexandria$css_in_elm$Css$Structure$Output$prettyPrint(
			$ThinkAlexandria$css_in_elm$Css$Structure$dropEmpty(structureStylesheet)),
		warnings: warnings
	};
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$compile = function (styles) {
	var results = A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$compile1, styles);
	return {
		css: A2(
			$elm$core$String$join,
			'\n\n',
			A2(
				$elm$core$List$map,
				function ($) {
					return $.css;
				},
				results)),
		warnings: A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.warnings;
			},
			results)
	};
};
var $ThinkAlexandria$css_in_elm$Css$compile = $ThinkAlexandria$css_in_elm$Css$Preprocess$Resolve$compile;
var $ThinkAlexandria$css_in_elm$Css$File$compile = $ThinkAlexandria$css_in_elm$Css$compile;
var $ThinkAlexandria$css_in_elm$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$String$fromListString = function (list) {
	return '[ ' + (A2($elm$core$String$join, ', ', list) + ' ]');
};
var $ThinkAlexandria$css_in_elm$Css$String$fromMediaExpression = function (mediaExpression) {
	var value = function () {
		var _v0 = mediaExpression.value;
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return 'Just ' + x;
		} else {
			return 'Nothing';
		}
	}();
	return '{ feature = ' + (mediaExpression.feature + (', value = ' + (value + ' }')));
};
var $ThinkAlexandria$css_in_elm$Css$String$fromMediaType = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'Print';
		case 'Screen':
			return 'Screen';
		default:
			return 'Speech';
	}
};
var $ThinkAlexandria$css_in_elm$Css$String$fromMediaQuery = function (mediaQuery) {
	switch (mediaQuery.$) {
		case 'AllQuery':
			var mediaExpressions = mediaQuery.a;
			return 'AllQuery ' + $ThinkAlexandria$css_in_elm$Css$String$fromListString(
				A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$String$fromMediaExpression, mediaExpressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var mediaExpressions = mediaQuery.b;
			return 'OnlyQuery ' + ($ThinkAlexandria$css_in_elm$Css$String$fromMediaType(mediaType) + (' ' + $ThinkAlexandria$css_in_elm$Css$String$fromListString(
				A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$String$fromMediaExpression, mediaExpressions))));
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var mediaExpressions = mediaQuery.b;
			return 'NotQuery ' + ($ThinkAlexandria$css_in_elm$Css$String$fromMediaType(mediaType) + (' ' + $ThinkAlexandria$css_in_elm$Css$String$fromListString(
				A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$String$fromMediaExpression, mediaExpressions))));
		default:
			var str = mediaQuery.a;
			return 'CustomQuery ' + str;
	}
};
var $ThinkAlexandria$css_in_elm$Css$String$fromListMediaQuery = function (mediaQueries) {
	return $ThinkAlexandria$css_in_elm$Css$String$fromListString(
		A2($elm$core$List$map, $ThinkAlexandria$css_in_elm$Css$String$fromMediaQuery, mediaQueries));
};
var $ThinkAlexandria$css_in_elm$Css$String$fromPseudoElement = function (pseudoElement) {
	var str = pseudoElement.a;
	return 'PseudoElement ' + str;
};
var $ThinkAlexandria$css_in_elm$Css$String$fromRepeatableSimpleSelector = function (selector) {
	switch (selector.$) {
		case 'ClassSelector':
			var str = selector.a;
			return 'ClassSelector ' + str;
		case 'IdSelector':
			var str = selector.a;
			return 'IdSelector ' + str;
		default:
			var str = selector.a;
			return 'PseudoClassSelector' + str;
	}
};
var $ThinkAlexandria$css_in_elm$Css$String$fromSelectorCombinator = function (selector) {
	switch (selector.$) {
		case 'AdjacentSibling':
			return 'AdjacentSibling';
		case 'GeneralSibling':
			return 'GeneralSibling';
		case 'Child':
			return 'Child';
		default:
			return 'Descendant';
	}
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$propertyWithWarnings = F3(
	function (warnings, key, value) {
		return $ThinkAlexandria$css_in_elm$Css$Preprocess$AppendProperty(
			{important: false, key: key, value: value, warnings: warnings});
	});
var $ThinkAlexandria$css_in_elm$Css$property = $ThinkAlexandria$css_in_elm$Css$propertyWithWarnings(_List_Nil);
var $ThinkAlexandria$css_in_elm$Css$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var key = style.a.key;
					return A2($ThinkAlexandria$css_in_elm$Css$property, desiredKey, key);
				case 'ExtendSelector':
					var selector1 = style.a;
					return A3(
						$ThinkAlexandria$css_in_elm$Css$propertyWithWarnings,
						_List_fromArray(
							[
								'Cannot apply ' + (functionName + (' with inapplicable Style for selector ' + $ThinkAlexandria$css_in_elm$Css$String$fromRepeatableSimpleSelector(selector1)))
							]),
						desiredKey,
						'');
				case 'NestSnippet':
					var combinator = style.a;
					return A3(
						$ThinkAlexandria$css_in_elm$Css$propertyWithWarnings,
						_List_fromArray(
							[
								'Cannot apply ' + (functionName + (' with inapplicable Style for combinator ' + $ThinkAlexandria$css_in_elm$Css$String$fromSelectorCombinator(combinator)))
							]),
						desiredKey,
						'');
				case 'WithPseudoElement':
					var pseudoElem = style.a;
					return A3(
						$ThinkAlexandria$css_in_elm$Css$propertyWithWarnings,
						_List_fromArray(
							[
								'Cannot apply ' + (functionName + (' with inapplicable Style for pseudo-element setter ' + $ThinkAlexandria$css_in_elm$Css$String$fromPseudoElement(pseudoElem)))
							]),
						desiredKey,
						'');
				case 'WithMedia':
					var mediaQuery = style.a;
					return A3(
						$ThinkAlexandria$css_in_elm$Css$propertyWithWarnings,
						_List_fromArray(
							[
								'Cannot apply ' + (functionName + (' with inapplicable Style for media query ' + $ThinkAlexandria$css_in_elm$Css$String$fromListMediaQuery(mediaQuery)))
							]),
						desiredKey,
						'');
				default:
					if (!style.a.b) {
						return A3(
							$ThinkAlexandria$css_in_elm$Css$propertyWithWarnings,
							_List_fromArray(
								['Cannot apply ' + (functionName + ' with empty Style. ')]),
							desiredKey,
							'');
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $ThinkAlexandria$css_in_elm$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $ThinkAlexandria$css_in_elm$Css$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $ThinkAlexandria$css_in_elm$Css$Structure$Compatible = {$: 'Compatible'};
var $ThinkAlexandria$css_in_elm$Css$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			calc: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			flexBasis: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			fontSize: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			length: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			lengthOrAuto: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			lengthOrNone: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			lengthOrNumber: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $ThinkAlexandria$css_in_elm$Css$lengthForOverloadedProperty = A3($ThinkAlexandria$css_in_elm$Css$lengthConverter, $ThinkAlexandria$css_in_elm$Css$IncompatibleUnits, '', 0);
var $ThinkAlexandria$css_in_elm$Css$alignItems = function (fn) {
	return A3(
		$ThinkAlexandria$css_in_elm$Css$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn($ThinkAlexandria$css_in_elm$Css$lengthForOverloadedProperty));
};
var $ThinkAlexandria$css_in_elm$Css$auto = {alignItemsOrAuto: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, cursor: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, flexBasis: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, intOrAuto: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, justifyContentOrAuto: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrAuto: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, overflow: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, textRendering: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, touchAction: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'auto'};
var $ThinkAlexandria$css_in_elm$Css$backgroundColor = function (c) {
	return A3($ThinkAlexandria$css_in_elm$Css$propertyWithWarnings, c.warnings, 'background-color', c.value);
};
var $ThinkAlexandria$css_in_elm$Css$prop1 = F2(
	function (key, arg) {
		return A2($ThinkAlexandria$css_in_elm$Css$property, key, arg.value);
	});
var $ThinkAlexandria$css_in_elm$Css$backgroundImage = $ThinkAlexandria$css_in_elm$Css$prop1('background-image');
var $ThinkAlexandria$css_in_elm$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			$ThinkAlexandria$css_in_elm$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value])));
	});
var $ThinkAlexandria$css_in_elm$Css$border2 = $ThinkAlexandria$css_in_elm$Css$prop2('border');
var $ThinkAlexandria$css_in_elm$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2(
			$ThinkAlexandria$css_in_elm$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value])));
	});
var $ThinkAlexandria$css_in_elm$Css$border3 = $ThinkAlexandria$css_in_elm$Css$prop3('border');
var $ThinkAlexandria$css_in_elm$Css$borderBox = {backgroundClip: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, boxSizing: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'border-box'};
var $ThinkAlexandria$css_in_elm$Css$borderColor = function (c) {
	return A3($ThinkAlexandria$css_in_elm$Css$propertyWithWarnings, c.warnings, 'border-color', c.value);
};
var $ThinkAlexandria$css_in_elm$Css$borderRadius = $ThinkAlexandria$css_in_elm$Css$prop1('border-radius');
var $ThinkAlexandria$css_in_elm$Css$boxSizing = $ThinkAlexandria$css_in_elm$Css$prop1('box-sizing');
var $ThinkAlexandria$css_in_elm$Css$center = $ThinkAlexandria$css_in_elm$Css$prop1('center');
var $ThinkAlexandria$css_in_elm$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $ThinkAlexandria$css_in_elm$Css$Helpers$regex = function (string) {
	return A2(
		$elm$core$Maybe$withDefault,
		$elm$regex$Regex$never,
		$elm$regex$Regex$fromString(string));
};
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$String$trim = _String_trim;
var $ThinkAlexandria$css_in_elm$Css$Helpers$toCssIdentifier = function (identifier) {
	return A3(
		$elm$regex$Regex$replace,
		$ThinkAlexandria$css_in_elm$Css$Helpers$regex('[^a-zA-Z0-9_-]'),
		function (_v1) {
			return '';
		},
		A3(
			$elm$regex$Regex$replace,
			$ThinkAlexandria$css_in_elm$Css$Helpers$regex('\\s+'),
			function (_v0) {
				return '-';
			},
			$elm$core$String$trim(identifier)));
};
var $ThinkAlexandria$css_in_elm$Css$Helpers$identifierToString = F2(
	function (name, identifier) {
		return _Utils_ap(
			$ThinkAlexandria$css_in_elm$Css$Helpers$toCssIdentifier(name),
			$ThinkAlexandria$css_in_elm$Css$Helpers$toCssIdentifier(identifier));
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $ThinkAlexandria$css_in_elm$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$makeSnippet = F2(
	function (styles, sequence) {
		var emptySelector = A3($ThinkAlexandria$css_in_elm$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $ThinkAlexandria$css_in_elm$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$Preprocess$StyleBlockDeclaration(
					A3($ThinkAlexandria$css_in_elm$Css$Preprocess$StyleBlock, emptySelector, _List_Nil, styles))
				]));
	});
var $ThinkAlexandria$css_in_elm$Css$class = F2(
	function (className, styles) {
		return A2(
			$ThinkAlexandria$css_in_elm$Css$makeSnippet,
			styles,
			$ThinkAlexandria$css_in_elm$Css$Structure$UniversalSelectorSequence(
				_List_fromArray(
					[
						$ThinkAlexandria$css_in_elm$Css$Structure$ClassSelector(
						A2($ThinkAlexandria$css_in_elm$Css$Helpers$identifierToString, '', className))
					])));
	});
var $ThinkAlexandria$css_in_elm$Css$color = function (c) {
	return A3($ThinkAlexandria$css_in_elm$Css$propertyWithWarnings, c.warnings, 'color', c.value);
};
var $ThinkAlexandria$css_in_elm$Css$row = {flexDirection: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, flexDirectionOrWrap: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'row'};
var $ThinkAlexandria$css_in_elm$Css$column = _Utils_update(
	$ThinkAlexandria$css_in_elm$Css$row,
	{value: 'column'});
var $ThinkAlexandria$css_in_elm$Css$cursor = $ThinkAlexandria$css_in_elm$Css$prop1('cursor');
var $ThinkAlexandria$css_in_elm$Css$default = {cursor: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'default'};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var $ThinkAlexandria$css_in_elm$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var $ThinkAlexandria$css_in_elm$Css$pseudoClass = function (className) {
	return $ThinkAlexandria$css_in_elm$Css$Preprocess$ExtendSelector(
		$ThinkAlexandria$css_in_elm$Css$Structure$PseudoClassSelector(className));
};
var $ThinkAlexandria$css_in_elm$Css$disabled = $ThinkAlexandria$css_in_elm$Css$pseudoClass('disabled');
var $ThinkAlexandria$css_in_elm$Css$display = $ThinkAlexandria$css_in_elm$Css$prop1('display');
var $ThinkAlexandria$css_in_elm$Css$displayFlex = A2($ThinkAlexandria$css_in_elm$Css$property, 'display', 'flex');
var $ThinkAlexandria$css_in_elm$Css$EmUnits = {$: 'EmUnits'};
var $ThinkAlexandria$css_in_elm$Css$em = A2($ThinkAlexandria$css_in_elm$Css$lengthConverter, $ThinkAlexandria$css_in_elm$Css$EmUnits, 'em');
var $ThinkAlexandria$css_in_elm$Css$flex = $ThinkAlexandria$css_in_elm$Css$prop1('flex');
var $ThinkAlexandria$css_in_elm$Css$flex2 = $ThinkAlexandria$css_in_elm$Css$prop2('flex');
var $ThinkAlexandria$css_in_elm$Css$flexBasis = $ThinkAlexandria$css_in_elm$Css$prop1('flex-basis');
var $ThinkAlexandria$css_in_elm$Css$flexDirection = $ThinkAlexandria$css_in_elm$Css$prop1('flex-direction');
var $ThinkAlexandria$css_in_elm$Css$flexEnd = $ThinkAlexandria$css_in_elm$Css$prop1('flex-end');
var $ThinkAlexandria$css_in_elm$Css$flexGrow = $ThinkAlexandria$css_in_elm$Css$prop1('flex-grow');
var $ThinkAlexandria$css_in_elm$Css$flexShrink = $ThinkAlexandria$css_in_elm$Css$prop1('flex-shrink');
var $ThinkAlexandria$css_in_elm$Css$flexWrap = $ThinkAlexandria$css_in_elm$Css$prop1('flex-wrap');
var $ThinkAlexandria$css_in_elm$Css$fontFamily = $ThinkAlexandria$css_in_elm$Css$prop1('font-family');
var $ThinkAlexandria$css_in_elm$Css$fontSize = $ThinkAlexandria$css_in_elm$Css$prop1('font-size');
var $ThinkAlexandria$css_in_elm$Css$height = $ThinkAlexandria$css_in_elm$Css$prop1('height');
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$core$String$cons = _String_cons;
var $ThinkAlexandria$css_in_elm$Css$withPrecedingHash = function (str) {
	return A2($elm$core$String$startsWith, '#', str) ? str : A2(
		$elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var $ThinkAlexandria$css_in_elm$Css$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		color: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
		green: 0,
		red: 0,
		value: $ThinkAlexandria$css_in_elm$Css$withPrecedingHash(str),
		warnings: $elm$core$List$singleton(
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['Hex color strings must contain exactly 3, 4, 6, or 8 hexadecimal digits, optionally preceded by \"#\".', str, 'is an invalid hex color string.', 'Please see: https://drafts.csswg.org/css-color/#hex-notation'])))
	};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$String$fromList = _String_fromList;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $elm$core$String$toLower = _String_toLower;
var $ThinkAlexandria$css_in_elm$Css$validHex = F5(
	function (str, _v0, _v1, _v2, _v3) {
		var r1 = _v0.a;
		var r2 = _v0.b;
		var g1 = _v1.a;
		var g2 = _v1.b;
		var b1 = _v2.a;
		var b2 = _v2.b;
		var a1 = _v3.a;
		var a2 = _v3.b;
		var toResult = A2(
			$elm$core$Basics$composeR,
			$elm$core$String$fromList,
			A2($elm$core$Basics$composeR, $elm$core$String$toLower, $rtfeldman$elm_hex$Hex$fromString));
		var results = _List_fromArray(
			[
				toResult(
				_List_fromArray(
					[r1, r2])),
				toResult(
				_List_fromArray(
					[g1, g2])),
				toResult(
				_List_fromArray(
					[b1, b2])),
				toResult(
				_List_fromArray(
					[a1, a2]))
			]);
		if ((((((((results.b && (results.a.$ === 'Ok')) && results.b.b) && (results.b.a.$ === 'Ok')) && results.b.b.b) && (results.b.b.a.$ === 'Ok')) && results.b.b.b.b) && (results.b.b.b.a.$ === 'Ok')) && (!results.b.b.b.b.b)) {
			var red = results.a.a;
			var _v5 = results.b;
			var green = _v5.a.a;
			var _v6 = _v5.b;
			var blue = _v6.a.a;
			var _v7 = _v6.b;
			var alpha = _v7.a.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				color: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
				green: green,
				red: red,
				value: $ThinkAlexandria$css_in_elm$Css$withPrecedingHash(str),
				warnings: _List_Nil
			};
		} else {
			return $ThinkAlexandria$css_in_elm$Css$erroneousHex(str);
		}
	});
var $ThinkAlexandria$css_in_elm$Css$hex = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	_v0$4:
	while (true) {
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			if (!_v0.b.b.b.b) {
				var r = _v0.a;
				var _v1 = _v0.b;
				var g = _v1.a;
				var _v2 = _v1.b;
				var b = _v2.a;
				return A5(
					$ThinkAlexandria$css_in_elm$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_v0.b.b.b.b.b) {
					var r = _v0.a;
					var _v3 = _v0.b;
					var g = _v3.a;
					var _v4 = _v3.b;
					var b = _v4.a;
					var _v5 = _v4.b;
					var a = _v5.a;
					return A5(
						$ThinkAlexandria$css_in_elm$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_v0.b.b.b.b.b.b) {
						if (!_v0.b.b.b.b.b.b.b) {
							var r1 = _v0.a;
							var _v6 = _v0.b;
							var r2 = _v6.a;
							var _v7 = _v6.b;
							var g1 = _v7.a;
							var _v8 = _v7.b;
							var g2 = _v8.a;
							var _v9 = _v8.b;
							var b1 = _v9.a;
							var _v10 = _v9.b;
							var b2 = _v10.a;
							return A5(
								$ThinkAlexandria$css_in_elm$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_v0.b.b.b.b.b.b.b.b && (!_v0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _v0.a;
								var _v11 = _v0.b;
								var r2 = _v11.a;
								var _v12 = _v11.b;
								var g1 = _v12.a;
								var _v13 = _v12.b;
								var g2 = _v13.a;
								var _v14 = _v13.b;
								var b1 = _v14.a;
								var _v15 = _v14.b;
								var b2 = _v15.a;
								var _v16 = _v15.b;
								var a1 = _v16.a;
								var _v17 = _v16.b;
								var a2 = _v17.a;
								return A5(
									$ThinkAlexandria$css_in_elm$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _v0$4;
							}
						}
					} else {
						break _v0$4;
					}
				}
			}
		} else {
			break _v0$4;
		}
	}
	return $ThinkAlexandria$css_in_elm$Css$erroneousHex(str);
};
var $ThinkAlexandria$css_in_elm$Css$hover = $ThinkAlexandria$css_in_elm$Css$pseudoClass('hover');
var $ThinkAlexandria$css_in_elm$Css$initial = {alignItems: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, all: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, backgroundAttachment: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, backgroundBlendMode: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, backgroundImage: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, backgroundOrigin: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, backgroundRepeat: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, backgroundRepeatShorthand: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, borderStyle: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, boxSizing: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, color: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, cursor: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, display: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, flexBasis: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, flexDirection: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, flexDirectionOrWrap: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, flexWrap: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, fontFamily: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, fontSize: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, fontStyle: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, fontVariant: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, fontWeight: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, intOrAuto: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, justifyContent: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, length: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrAuto: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrMinMaxDimension: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrNone: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrNumber: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, listStylePosition: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, listStyleType: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, none: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, number: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, numericValue: 0, outline: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, overflow: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, textDecorationLine: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, textDecorationStyle: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, textIndent: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, textRendering: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, textTransform: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, touchAction: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, unitLabel: '', units: $ThinkAlexandria$css_in_elm$Css$IncompatibleUnits, value: 'initial', warnings: _List_Nil, whiteSpace: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible};
var $ThinkAlexandria$css_in_elm$Css$inlineFlex = {display: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'inline-flex'};
var $ThinkAlexandria$css_in_elm$Css$justifyContent = function (fn) {
	return A3(
		$ThinkAlexandria$css_in_elm$Css$getOverloadedProperty,
		'justifyContent',
		'justify-content',
		fn($ThinkAlexandria$css_in_elm$Css$lengthForOverloadedProperty));
};
var $elm$core$String$append = _String_append;
var $ThinkAlexandria$css_in_elm$Css$collectStops = $elm$core$List$map(
	function (_v0) {
		var c = _v0.a;
		var len = _v0.b;
		return A2(
			$elm$core$String$append,
			c.value,
			A2(
				$elm$core$Maybe$withDefault,
				'',
				A2(
					$elm$core$Maybe$map,
					A2(
						$elm$core$Basics$composeL,
						$elm$core$String$cons(
							_Utils_chr(' ')),
						function ($) {
							return $.value;
						}),
					len)));
	});
var $ThinkAlexandria$css_in_elm$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ', ', args) + ')'));
	});
var $ThinkAlexandria$css_in_elm$Css$linearGradient2 = F4(
	function (direction, firstStop, secondStop, stops) {
		return {
			backgroundImage: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			listStyleTypeOrPositionOrImage: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			value: A2(
				$ThinkAlexandria$css_in_elm$Css$cssFunction,
				'linear-gradient',
				A2(
					$elm$core$List$cons,
					'to ' + direction.value,
					$ThinkAlexandria$css_in_elm$Css$collectStops(
						_Utils_ap(
							_List_fromArray(
								[firstStop, secondStop]),
							stops))))
		};
	});
var $ThinkAlexandria$css_in_elm$Css$margin = $ThinkAlexandria$css_in_elm$Css$prop1('margin');
var $ThinkAlexandria$css_in_elm$Css$marginRight = $ThinkAlexandria$css_in_elm$Css$prop1('margin-right');
var $ThinkAlexandria$css_in_elm$Css$minWidth = $ThinkAlexandria$css_in_elm$Css$prop1('min-width');
var $ThinkAlexandria$css_in_elm$Css$monospace = {fontFamily: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'monospace'};
var $ThinkAlexandria$css_in_elm$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var $ThinkAlexandria$css_in_elm$Css$num = function (val) {
	return {
		lengthOrNumber: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
		number: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $ThinkAlexandria$css_in_elm$Css$UnitlessFloat,
		value: $elm$core$String$fromFloat(val)
	};
};
var $ThinkAlexandria$css_in_elm$Css$opacity = $ThinkAlexandria$css_in_elm$Css$prop1('opacity');
var $ThinkAlexandria$css_in_elm$Css$padding = $ThinkAlexandria$css_in_elm$Css$prop1('padding');
var $ThinkAlexandria$css_in_elm$Css$padding2 = $ThinkAlexandria$css_in_elm$Css$prop2('padding');
var $ThinkAlexandria$css_in_elm$Css$paddingLeft = $ThinkAlexandria$css_in_elm$Css$prop1('padding-left');
var $ThinkAlexandria$css_in_elm$Css$paddingRight = $ThinkAlexandria$css_in_elm$Css$prop1('padding-right');
var $ThinkAlexandria$css_in_elm$Css$PercentageUnits = {$: 'PercentageUnits'};
var $ThinkAlexandria$css_in_elm$Css$pct = A2($ThinkAlexandria$css_in_elm$Css$lengthConverter, $ThinkAlexandria$css_in_elm$Css$PercentageUnits, '%');
var $ThinkAlexandria$css_in_elm$Css$pointer = {cursor: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'pointer'};
var $ThinkAlexandria$css_in_elm$Css$PxUnits = {$: 'PxUnits'};
var $ThinkAlexandria$css_in_elm$Css$px = A2($ThinkAlexandria$css_in_elm$Css$lengthConverter, $ThinkAlexandria$css_in_elm$Css$PxUnits, 'px');
var $ThinkAlexandria$css_in_elm$Css$RemUnits = {$: 'RemUnits'};
var $ThinkAlexandria$css_in_elm$Css$rem = A2($ThinkAlexandria$css_in_elm$Css$lengthConverter, $ThinkAlexandria$css_in_elm$Css$RemUnits, 'rem');
var $ThinkAlexandria$css_in_elm$Css$rgb = F3(
	function (red, green, blue) {
		var warnings = ((red < 0) || ((red > 255) || ((green < 0) || ((green > 255) || ((blue < 0) || (blue > 255)))))) ? _List_fromArray(
			[
				'RGB color values must be between 0 and 255. rgb(' + ($elm$core$String$fromInt(red) + (', ' + ($elm$core$String$fromInt(green) + (', ' + ($elm$core$String$fromInt(blue) + ') is not valid.')))))
			]) : _List_Nil;
		return {
			alpha: 1,
			blue: blue,
			color: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible,
			green: green,
			red: red,
			value: A2(
				$ThinkAlexandria$css_in_elm$Css$cssFunction,
				'rgb',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					_List_fromArray(
						[red, green, blue]))),
			warnings: warnings
		};
	});
var $ThinkAlexandria$css_in_elm$Css$sansSerif = {fontFamily: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'sans-serif'};
var $ThinkAlexandria$css_in_elm$Css$solid = {borderStyle: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, textDecorationStyle: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'solid'};
var $ThinkAlexandria$css_in_elm$Css$spaceAround = $ThinkAlexandria$css_in_elm$Css$prop1('space-around');
var $ThinkAlexandria$css_in_elm$Css$start = $ThinkAlexandria$css_in_elm$Css$prop1('start');
var $ThinkAlexandria$css_in_elm$Css$stop = function (c) {
	return _Utils_Tuple2(c, $elm$core$Maybe$Nothing);
};
var $ThinkAlexandria$css_in_elm$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $ThinkAlexandria$css_in_elm$Css$stylesheet = $ThinkAlexandria$css_in_elm$Css$Preprocess$stylesheet;
var $ThinkAlexandria$css_in_elm$Css$toBottom = {angleOrDirection: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'bottom'};
var $ThinkAlexandria$css_in_elm$Css$wrap = {flexDirectionOrWrap: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, flexWrap: $ThinkAlexandria$css_in_elm$Css$Structure$Compatible, value: 'wrap'};
var $author$project$Core$Style$StyleSheet$css = $ThinkAlexandria$css_in_elm$Css$stylesheet(
	_List_fromArray(
		[
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'experiment',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$flexDirection($ThinkAlexandria$css_in_elm$Css$column),
					$ThinkAlexandria$css_in_elm$Css$flexWrap($ThinkAlexandria$css_in_elm$Css$initial),
					$ThinkAlexandria$css_in_elm$Css$height(
					$ThinkAlexandria$css_in_elm$Css$pct(100)),
					$ThinkAlexandria$css_in_elm$Css$flex(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$boxSizing($ThinkAlexandria$css_in_elm$Css$borderBox)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'experiment__simulator',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$flexGrow(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$flexShrink(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$flexBasis($ThinkAlexandria$css_in_elm$Css$auto),
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$flexDirection($ThinkAlexandria$css_in_elm$Css$column)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'experiment__history',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$flexGrow(
					$ThinkAlexandria$css_in_elm$Css$num(0)),
					$ThinkAlexandria$css_in_elm$Css$flexShrink(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$flexBasis($ThinkAlexandria$css_in_elm$Css$auto),
					$ThinkAlexandria$css_in_elm$Css$padding(
					$ThinkAlexandria$css_in_elm$Css$px(4)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$px(4)),
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$flexEnd)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'experiment-container',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$flexGrow(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$flexShrink(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$flexBasis($ThinkAlexandria$css_in_elm$Css$auto),
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$flexDirection($ThinkAlexandria$css_in_elm$Css$column)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'feedback-container',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$flex(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$paddingLeft(
					$ThinkAlexandria$css_in_elm$Css$px(16)),
					$ThinkAlexandria$css_in_elm$Css$paddingRight(
					$ThinkAlexandria$css_in_elm$Css$px(16)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$px(4)),
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$spaceAround),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'observables-container',
			_List_fromArray(
				[
					A2(
					$ThinkAlexandria$css_in_elm$Css$flex2,
					$ThinkAlexandria$css_in_elm$Css$num(7),
					$ThinkAlexandria$css_in_elm$Css$num(0)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$px(4)),
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'controls-container',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$flex(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$paddingLeft(
					$ThinkAlexandria$css_in_elm$Css$px(16)),
					$ThinkAlexandria$css_in_elm$Css$paddingRight(
					$ThinkAlexandria$css_in_elm$Css$px(16)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$px(4)),
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$start),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$flexWrap($ThinkAlexandria$css_in_elm$Css$wrap)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'button__action--primary',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$disabled(
					_List_fromArray(
						[
							$ThinkAlexandria$css_in_elm$Css$opacity(
							$ThinkAlexandria$css_in_elm$Css$num(0.65)),
							$ThinkAlexandria$css_in_elm$Css$cursor($ThinkAlexandria$css_in_elm$Css$default)
						])),
					$ThinkAlexandria$css_in_elm$Css$hover(
					_List_fromArray(
						[
							$ThinkAlexandria$css_in_elm$Css$backgroundImage(
							A4(
								$ThinkAlexandria$css_in_elm$Css$linearGradient2,
								$ThinkAlexandria$css_in_elm$Css$toBottom,
								$ThinkAlexandria$css_in_elm$Css$stop(
									A3($ThinkAlexandria$css_in_elm$Css$rgb, 144, 202, 249)),
								$ThinkAlexandria$css_in_elm$Css$stop(
									A3($ThinkAlexandria$css_in_elm$Css$rgb, 95, 178, 247)),
								_List_Nil))
						])),
					$ThinkAlexandria$css_in_elm$Css$color(
					A3($ThinkAlexandria$css_in_elm$Css$rgb, 0, 0, 0)),
					$ThinkAlexandria$css_in_elm$Css$backgroundColor(
					A3($ThinkAlexandria$css_in_elm$Css$rgb, 144, 202, 249)),
					$ThinkAlexandria$css_in_elm$Css$display($ThinkAlexandria$css_in_elm$Css$inlineFlex),
					A2(
					$ThinkAlexandria$css_in_elm$Css$padding2,
					$ThinkAlexandria$css_in_elm$Css$rem(0.5),
					$ThinkAlexandria$css_in_elm$Css$rem(1)),
					A3(
					$ThinkAlexandria$css_in_elm$Css$border3,
					$ThinkAlexandria$css_in_elm$Css$px(1),
					$ThinkAlexandria$css_in_elm$Css$solid,
					A3($ThinkAlexandria$css_in_elm$Css$rgb, 95, 170, 247)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$px(4)),
					$ThinkAlexandria$css_in_elm$Css$minWidth(
					$ThinkAlexandria$css_in_elm$Css$em(5)),
					$ThinkAlexandria$css_in_elm$Css$fontFamily($ThinkAlexandria$css_in_elm$Css$monospace),
					$ThinkAlexandria$css_in_elm$Css$borderRadius(
					$ThinkAlexandria$css_in_elm$Css$rem(0.5)),
					A2($ThinkAlexandria$css_in_elm$Css$property, 'transition', 'all 0.15s ease-in-out 0s'),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$cursor($ThinkAlexandria$css_in_elm$Css$pointer)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'button__action--secondary',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$disabled(
					_List_fromArray(
						[
							$ThinkAlexandria$css_in_elm$Css$opacity(
							$ThinkAlexandria$css_in_elm$Css$num(0.65)),
							$ThinkAlexandria$css_in_elm$Css$cursor($ThinkAlexandria$css_in_elm$Css$default),
							$ThinkAlexandria$css_in_elm$Css$hover(
							_List_fromArray(
								[
									$ThinkAlexandria$css_in_elm$Css$opacity(
									$ThinkAlexandria$css_in_elm$Css$num(0.5))
								]))
						])),
					$ThinkAlexandria$css_in_elm$Css$hover(
					_List_fromArray(
						[
							$ThinkAlexandria$css_in_elm$Css$backgroundColor(
							A3($ThinkAlexandria$css_in_elm$Css$rgb, 144, 202, 249)),
							$ThinkAlexandria$css_in_elm$Css$color(
							A3($ThinkAlexandria$css_in_elm$Css$rgb, 0, 0, 0))
						])),
					$ThinkAlexandria$css_in_elm$Css$color(
					A3($ThinkAlexandria$css_in_elm$Css$rgb, 0, 0, 0)),
					$ThinkAlexandria$css_in_elm$Css$backgroundColor(
					A3($ThinkAlexandria$css_in_elm$Css$rgb, 255, 255, 255)),
					$ThinkAlexandria$css_in_elm$Css$display($ThinkAlexandria$css_in_elm$Css$inlineFlex),
					A2(
					$ThinkAlexandria$css_in_elm$Css$padding2,
					$ThinkAlexandria$css_in_elm$Css$rem(0.5),
					$ThinkAlexandria$css_in_elm$Css$rem(1)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$px(4)),
					A3(
					$ThinkAlexandria$css_in_elm$Css$border3,
					$ThinkAlexandria$css_in_elm$Css$px(1),
					$ThinkAlexandria$css_in_elm$Css$solid,
					A3($ThinkAlexandria$css_in_elm$Css$rgb, 95, 170, 247)),
					$ThinkAlexandria$css_in_elm$Css$minWidth(
					$ThinkAlexandria$css_in_elm$Css$em(5)),
					$ThinkAlexandria$css_in_elm$Css$fontFamily($ThinkAlexandria$css_in_elm$Css$monospace),
					$ThinkAlexandria$css_in_elm$Css$borderRadius(
					$ThinkAlexandria$css_in_elm$Css$rem(0.5)),
					A2($ThinkAlexandria$css_in_elm$Css$property, 'transition', 'all 0.15s ease-in-out 0s'),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$cursor($ThinkAlexandria$css_in_elm$Css$pointer)
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'svg-icon',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$marginRight(
					$ThinkAlexandria$css_in_elm$Css$em(0.5)),
					$ThinkAlexandria$css_in_elm$Css$height(
					$ThinkAlexandria$css_in_elm$Css$em(1.33))
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'prompt--success',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$fontFamily($ThinkAlexandria$css_in_elm$Css$sansSerif),
					$ThinkAlexandria$css_in_elm$Css$flexGrow(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$color(
					$ThinkAlexandria$css_in_elm$Css$hex('#155724')),
					$ThinkAlexandria$css_in_elm$Css$backgroundColor(
					$ThinkAlexandria$css_in_elm$Css$hex('#d4edda')),
					$ThinkAlexandria$css_in_elm$Css$borderColor(
					$ThinkAlexandria$css_in_elm$Css$hex('#c3e6cb')),
					$ThinkAlexandria$css_in_elm$Css$fontSize(
					$ThinkAlexandria$css_in_elm$Css$em(1.3)),
					$ThinkAlexandria$css_in_elm$Css$boxSizing($ThinkAlexandria$css_in_elm$Css$borderBox),
					A2(
					$ThinkAlexandria$css_in_elm$Css$border2,
					$ThinkAlexandria$css_in_elm$Css$px(1),
					$ThinkAlexandria$css_in_elm$Css$solid),
					$ThinkAlexandria$css_in_elm$Css$borderRadius(
					$ThinkAlexandria$css_in_elm$Css$rem(0.25)),
					A2(
					$ThinkAlexandria$css_in_elm$Css$padding2,
					$ThinkAlexandria$css_in_elm$Css$rem(0.75),
					$ThinkAlexandria$css_in_elm$Css$rem(1.25)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$rem(0.5))
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'prompt--danger',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$fontFamily($ThinkAlexandria$css_in_elm$Css$sansSerif),
					$ThinkAlexandria$css_in_elm$Css$flexGrow(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$color(
					$ThinkAlexandria$css_in_elm$Css$hex('#721c24')),
					$ThinkAlexandria$css_in_elm$Css$backgroundColor(
					$ThinkAlexandria$css_in_elm$Css$hex('#f8d7da')),
					$ThinkAlexandria$css_in_elm$Css$borderColor(
					$ThinkAlexandria$css_in_elm$Css$hex('#f5c6cb')),
					$ThinkAlexandria$css_in_elm$Css$fontSize(
					$ThinkAlexandria$css_in_elm$Css$em(1.3)),
					$ThinkAlexandria$css_in_elm$Css$boxSizing($ThinkAlexandria$css_in_elm$Css$borderBox),
					A2(
					$ThinkAlexandria$css_in_elm$Css$border2,
					$ThinkAlexandria$css_in_elm$Css$px(1),
					$ThinkAlexandria$css_in_elm$Css$solid),
					$ThinkAlexandria$css_in_elm$Css$borderRadius(
					$ThinkAlexandria$css_in_elm$Css$rem(0.25)),
					A2(
					$ThinkAlexandria$css_in_elm$Css$padding2,
					$ThinkAlexandria$css_in_elm$Css$rem(0.75),
					$ThinkAlexandria$css_in_elm$Css$rem(1.25)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$rem(0.5))
				])),
			A2(
			$ThinkAlexandria$css_in_elm$Css$class,
			'prompt--info',
			_List_fromArray(
				[
					$ThinkAlexandria$css_in_elm$Css$displayFlex,
					$ThinkAlexandria$css_in_elm$Css$justifyContent($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$alignItems($ThinkAlexandria$css_in_elm$Css$center),
					$ThinkAlexandria$css_in_elm$Css$fontFamily($ThinkAlexandria$css_in_elm$Css$sansSerif),
					$ThinkAlexandria$css_in_elm$Css$flexGrow(
					$ThinkAlexandria$css_in_elm$Css$num(1)),
					$ThinkAlexandria$css_in_elm$Css$color(
					$ThinkAlexandria$css_in_elm$Css$hex('#004085')),
					$ThinkAlexandria$css_in_elm$Css$backgroundColor(
					$ThinkAlexandria$css_in_elm$Css$hex('#cce5ff')),
					$ThinkAlexandria$css_in_elm$Css$borderColor(
					$ThinkAlexandria$css_in_elm$Css$hex('#b8daff')),
					$ThinkAlexandria$css_in_elm$Css$fontSize(
					$ThinkAlexandria$css_in_elm$Css$em(1.3)),
					$ThinkAlexandria$css_in_elm$Css$boxSizing($ThinkAlexandria$css_in_elm$Css$borderBox),
					A2(
					$ThinkAlexandria$css_in_elm$Css$border2,
					$ThinkAlexandria$css_in_elm$Css$px(1),
					$ThinkAlexandria$css_in_elm$Css$solid),
					$ThinkAlexandria$css_in_elm$Css$borderRadius(
					$ThinkAlexandria$css_in_elm$Css$rem(0.25)),
					A2(
					$ThinkAlexandria$css_in_elm$Css$padding2,
					$ThinkAlexandria$css_in_elm$Css$rem(0.75),
					$ThinkAlexandria$css_in_elm$Css$rem(1.25)),
					$ThinkAlexandria$css_in_elm$Css$margin(
					$ThinkAlexandria$css_in_elm$Css$rem(0.5))
				]))
		]));
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $author$project$Core$Style$style = A3(
	$elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text(
			$ThinkAlexandria$css_in_elm$Css$File$compile(
				_List_fromArray(
					[$author$project$Core$Style$StyleSheet$css])).css)
		]));
var $elm_community$undo_redo$UndoList$Redo = {$: 'Redo'};
var $elm_community$undo_redo$UndoList$Reset = {$: 'Reset'};
var $elm_community$undo_redo$UndoList$Undo = {$: 'Undo'};
var $elm_community$undo_redo$UndoList$hasFuture = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$List$isEmpty),
	function ($) {
		return $.future;
	});
var $elm_community$undo_redo$UndoList$hasPast = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$List$isEmpty),
	function ($) {
		return $.past;
	});
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $author$project$Core$Assets$Icons$redoIcon = function (color) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$class('svg-icon'),
				$elm$svg$Svg$Attributes$viewBox('0 0 20 20'),
				$elm$svg$Svg$Attributes$style('transform: scale(-1,1);')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$d(' M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z ')
					]),
				_List_Nil)
			]));
};
var $author$project$Core$Assets$Icons$resetIcon = function (color) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$class('svg-icon'),
				$elm$svg$Svg$Attributes$viewBox('0 0 20 20')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$d(' M19.305,9.61c-0.235-0.235-0.615-0.235-0.85,0l-1.339,1.339c0.045-0.311,0.073-0.626,0.073-0.949\n                        c0-3.812-3.09-6.901-6.901-6.901c-2.213,0-4.177,1.045-5.44,2.664l0.897,0.719c1.053-1.356,2.693-2.232,4.543-2.232\n                        c3.176,0,5.751,2.574,5.751,5.751c0,0.342-0.037,0.675-0.095,1l-1.746-1.39c-0.234-0.235-0.614-0.235-0.849,0\n                        c-0.235,0.235-0.235,0.615,0,0.85l2.823,2.25c0.122,0.121,0.282,0.177,0.441,0.172c0.159,0.005,0.32-0.051,0.44-0.172l2.25-2.25\n                        C19.539,10.225,19.539,9.845,19.305,9.61z M10.288,15.752c-3.177,0-5.751-2.575-5.751-5.752c0-0.276,0.025-0.547,0.062-0.813\n                        l1.203,1.203c0.235,0.234,0.615,0.234,0.85,0c0.234-0.235,0.234-0.615,0-0.85l-2.25-2.25C4.281,7.169,4.121,7.114,3.961,7.118\n                        C3.802,7.114,3.642,7.169,3.52,7.291l-2.824,2.25c-0.234,0.235-0.234,0.615,0,0.85c0.235,0.234,0.615,0.234,0.85,0l1.957-1.559\n                        C3.435,9.212,3.386,9.6,3.386,10c0,3.812,3.09,6.901,6.902,6.901c2.083,0,3.946-0.927,5.212-2.387l-0.898-0.719\n                        C13.547,14.992,12.008,15.752,10.288,15.752z ')
					]),
				_List_Nil)
			]));
};
var $author$project$Core$Assets$Icons$undoIcon = function (color) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$class('svg-icon'),
				$elm$svg$Svg$Attributes$viewBox('0 0 20 20')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$d(' M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z ')
					]),
				_List_Nil)
			]));
};
var $author$project$Core$viewButtons = function (undolist) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('experiment__history')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($elm_community$undo_redo$UndoList$Undo),
						$elm$html$Html$Attributes$disabled(
						!$elm_community$undo_redo$UndoList$hasPast(undolist)),
						$elm$html$Html$Attributes$class('button__action--secondary')
					]),
				_List_fromArray(
					[
						$author$project$Core$Assets$Icons$undoIcon('black'),
						$elm$html$Html$text('Undo')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($elm_community$undo_redo$UndoList$Redo),
						$elm$html$Html$Attributes$disabled(
						!$elm_community$undo_redo$UndoList$hasFuture(undolist)),
						$elm$html$Html$Attributes$class('button__action--secondary')
					]),
				_List_fromArray(
					[
						$author$project$Core$Assets$Icons$redoIcon('black'),
						$elm$html$Html$text('Redo')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Events$onClick($elm_community$undo_redo$UndoList$Reset),
						$elm$html$Html$Attributes$disabled(
						!($elm_community$undo_redo$UndoList$hasPast(undolist) || $elm_community$undo_redo$UndoList$hasFuture(undolist))),
						$elm$html$Html$Attributes$class('button__action--secondary')
					]),
				_List_fromArray(
					[
						$author$project$Core$Assets$Icons$resetIcon('black'),
						$elm$html$Html$text('Reset')
					]))
			]));
};
var $author$project$Core$view = F2(
	function (viewer, undolist) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('experiment')
				]),
			_List_fromArray(
				[
					$author$project$Core$Style$style,
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('experiment__simulator')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$map,
							$elm_community$undo_redo$UndoList$New,
							viewer(undolist.present))
						])),
					$author$project$Core$viewButtons(undolist)
				]));
	});
var $author$project$BubbleSortTest$main = $elm$browser$Browser$element(
	{
		init: A3($author$project$Core$init, $elm$core$Basics$identity, $author$project$AnalyticsPort$analytics, $author$project$BubbleSortTest$init),
		subscriptions: $author$project$Core$subscriptions($author$project$BubbleSortTest$subscriptions),
		update: A6($author$project$Core$update, $elm$core$Basics$identity, $author$project$AnalyticsPort$analytics, $author$project$BubbleSortTest$update, $author$project$BubbleSortTest$setFresh, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing),
		view: $author$project$Core$view($author$project$BubbleSortTest$view)
	});
_Platform_export({'BubbleSortTest':{'init':$author$project$BubbleSortTest$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));
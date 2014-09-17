"use strict";

var Fs = require('fs');
var Jison = require('jison');
var Path = require('path');

var bnf = Fs.readFileSync(Path.join(__dirname, 'schyntax.jison'), 'utf8');
var parser = new Jison.Parser(bnf);

var formats = [
	"dates(12/25)",
	"dom(1)",
	"dom(30)",
	"dom(29)",
	"dom(8..10)",
	"dom(25..31)",
	"dom(-1)",
	"dom(-3)",
	"dom(-3..-1)",
	"dom(5..-1)",
	"dom(5..-2%2)",
	"dom(5%2)",
	"dom(%3)",
	"dom(20..10)",
	"dom(20..10%2)",
	"dow(sat..sun)",
	"dow(mon..fri)",
	"dow(mon..thu, sat)",
	"dow(%3)",
	"dow(thu%2)",
	"dow(thu..tue%2)",
	"h(6)",
	"h(!6)",
	"h(0..23)",
	"h(12..20, 21)",
	"h(12..22)",
	"h(!12..22)",
	"h(20..4)",
	"h(!20..4)",
	"h(%2)",
	"h(0%2)",
	"h(0..23%2)",
	"h(3%2)",
	"h(3..20%2)",
	"h(%3)",
	"m(6)",
	"m(!6)",
	"m(0..59)",
	"m(12..26, 27)",
	"m(12..28)",
	"m(!12..28)",
	"m(50..10)",
	"m(!50..10)",
	"m(%2)",
	"m(0%2)",
	"m(0..59%2)",
	"m(3%2)",
	"m(3..58%2)",
	"m(%3)",
	"s(6)",
	"s(!6)",
	"s(0..59)",
	"s(12..26, 27)",
	"s(12..28)",
	"s(!12..28)",
	"s(50..10)",
	"s(!50..10)",
	"s(%2)",
	"s(0%2)",
	"s(0..59%2)",
	"s(3%2)",
	"s(3..58%2)",
	"s(%3)"
];

function inspect (obj)
{
	console.log(require('util').inspect(obj, { depth: Infinity }));
}

inspect(parser.parse('group(dom(3..4) days(!monday..friday%2) min() dom(3, 6, 9..17))'));

//for (var i = 0; i < formats.length; i++)
//{
//	try
//	{
//		parser.parse(formats[i]);
//	}
//	catch (ex)
//	{
//		console.error(formats[i]);
//		console.error(ex);
//		break;
//	}
//}


console.log('done');
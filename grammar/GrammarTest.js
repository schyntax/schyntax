"use strict";

var Fs = require('fs');
var Jison = require('jison');
var Path = require('path');
var tests = require('../tests.json');

run();

function run ()
{
	var bnf = Fs.readFileSync(Path.join(__dirname, 'schyntax.jison'), 'utf8');
	var parser = new Jison.Parser(bnf);
	
	for (var name in tests.suites)
	{
		checkSuite(parser, name, tests.suites[name]);
	}

	console.log('done');
}

function checkSuite (parser, suiteName, suite)
{
	var formats = new Set();
	for (var i = 0; i < suite.length; i++)
	{
		var check = suite[i];
		var f = check.format;
		if (formats.has(f))
			continue;

		if (typeof check.parseErrorIndex === 'number') // not checking the invalid stuff for now
			continue;
		
		formats.add(f);
		try
		{
			parser.parse(f);
		}
		catch (ex)
		{
			console.error('FAIL '+ suiteName +': "' + f + '"');
			console.error(ex);
			console.error();
		}
	}
}
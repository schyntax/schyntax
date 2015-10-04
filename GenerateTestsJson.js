var Fs = require('fs');
var Path = require('path');

var TESTS_DIR = Path.join(__dirname, 'tests');
var OUTPUT_FILE = Path.join(__dirname, 'tests.json');

var existingTests = require(OUTPUT_FILE);

var Mode = {
	None: '',
	Description: 'desc',
	Format: 'format',
	ParseErrorIndex: 'parseErrorIndex',
	Date: 'date',
	Next: 'next',
	Prev: 'prev',
};

run();

function run()
{
	var files = Fs.readdirSync(TESTS_DIR);
	var tests = {
		testsVersion: existingTests.testsVersion + 1,
		comment: 'THIS IS A GENERATED FILE. No changes should be made to this file directly. See: https://github.com/schyntax/schyntax/blob/master/WritingTests.md',
		suites: {}
	};
	for (var i = 0; i < files.length; i++)
	{
		var name = files[i];
		var f = Fs.readFileSync(Path.join(TESTS_DIR, name), { encoding: 'utf8' });
		tests.suites[name] = parseTests(name, f);
	}
	
	Fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tests, jsonReplacer, 2));
}

function jsonReplacer(key, value)
{
	if (key === 'lineNumber')
		return undefined;
	
	return value;
}

function parseTests(fileName, input)
{
	var checks = [];
	var c = null;
	var mode = Mode.None;
	
	var lines = input.split(/\r?\n/g);
	for (var i = 0; i < lines.length; i++)
	{
		var line = lines[i];
		var ln = i + 1;
		
		// skip whitespace only lines
		if (/^\s*$/.test(line))
			continue;
		
		// skip comments
		if (/^\s*#/.test(line))
			continue;
		
		var match = /^--\s?(.*)$/.exec(line);
		if (match)
		{
			if (c !== null)
			{
				finalizeCheck(fileName, c);
				checks.push(c);
			}
			
			c = {};
			c.lineNumber = ln;
			mode = Mode.Description;
			
			if (match[1])
				c[mode] = match[1];
			
			continue;
		}
		else if (mode === Mode.None)
		{
			throw new Error(fileName + ': Unexpected data before the first check was defined. Line ' + ln);
		}
		
		var first = true;
		switch (line.substr(0, 3))
		{
			case 'f: ':
				mode = Mode.Format;
				break;
			case 'e: ':
				mode = Mode.ParseErrorIndex;
				break;
			case 'd: ':
				mode = Mode.Date;
				break;
			case 'p: ':
				mode = Mode.Prev;
				break;
			case 'n: ':
				mode = Mode.Next;
				break;
			case '   ':
				first = false;
				break;
			default:
				throw new Error(fileName + ': Unknown text. Line ' + ln);
		}
		
		var exists = typeof c[mode] !== 'undefined';
		if (exists && first)
			throw new Error(fileName + ': Cannot define ' + mode + ' more than once per check. Line ' + ln);

		var text = line.substr(3);
		if (first)
		{
			if (mode === Mode.Date || mode === Mode.Next || mode === Mode.Prev)
			{
				var d = new Date(text + 'Z');
				if (!d)
					throw new Error(fileName + ': Cannot parse date on line ' + ln);
				
				c[mode] = d.toISOString();
			}
			else if (mode === Mode.ParseErrorIndex || mode === Mode.Format)
			{
				c[mode] = text;
			}
			else
			{
				throw new Error(fileName + ': Parser error (not implemented) line ' + ln);
			}
		}
		else
		{
			if (mode === Mode.Description)
			{
				if (!exists)
					c[mode] = '';
				
				c[mode] += '\n' + text;
			}
			else if (mode === Mode.Format)
			{
				c[mode] += '\n' + text;
			}
			else
			{
				throw new Error(fileName + ': Unexpected text on line ' + ln);
			}
		}
	}

	if (c !== null)
	{
		finalizeCheck(fileName, c);
		checks.push(c);
	}
	
	return checks;
}

function finalizeCheck(fileName, check)
{
	var f = check[Mode.Format];
	var e = check[Mode.ParseErrorIndex];
	var d = check[Mode.Date];
	var p = check[Mode.Prev];
	var n = check[Mode.Next];
	
	if (typeof f !== 'string')
		throw new Error(fileName + ': Format must be a string. Check declared on line ' + check.lineNumber);
	
	if (typeof e !== 'undefined')
	{
		var match = /\^(L(\d+))?/.exec(e);
		if (!match)
			throw new Error(fileName + ': Carrot missing in error definition. Check on line ' + check.lineNumber);
		
		var line = match[2] ? Number(match[2]) : 1;
		var index = relativeToAbsoluteIndex(e, line, match.index);
		
		if (index === -1)
			throw new Error(fileName + ': Parse error index was specified outside the bounds of the format string. Check on line ' + check.lineNumber);
		
		check[Mode.ParseErrorIndex] = index;
		
		// make sure prev/next are not defined
		if (p || n)
			throw new Error(fileName + ': Prev/next should not be defined if there is a parse error. Check on line ' + check.lineNumber);
		
		return;
	}
	
	if (!d)
		throw new Error(fileName + ': Schedule without a parse error must have a start date. Check on line ' + check.lineNumber);
}

function relativeToAbsoluteIndex(input, line, column)
{
	var curLine = 1;
	var curCol = -1;
	
	for (var i = 0; i < input.length; i++)
	{
		if (input[i] === '\n')
		{
			if (curLine === line)
				return -1;
			
			curLine++;
			curCol = 0;
		}
		else
		{
			curCol++;
		}
		
		if (curLine === line && curCol === column)
			return i;
	}
	
	return -1;
}

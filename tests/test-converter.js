"use strict";

var suites = {};
var currentSuite = '';

var TestConverter = module.exports;

TestConverter.suite = function (name, runner)
{
	currentSuite = name;
	runner();
};

TestConverter.test = function (format, runner)
{
	if (runner === undefined)
	{
		runner = format;
		format = undefined;
	}
	
	runner.call({ test: { title: format } });
};

TestConverter.check = function (format, date, prev, next)
{
	var suite = suites[currentSuite];
	if (!suite)
	{
		suite = { checks: [] };
		suites[currentSuite] = suite;
	}
	
	suite.checks.push({
		format: format,
		date: date.toISOString(),
		prev: prev.toISOString(),
		next: next.toISOString()
	});
};

TestConverter.writeJson = function ()
{
	require('fs').writeFileSync(require('path').join(__dirname, '..', 'tests.json'), JSON.stringify(suites, null, '  '));
};

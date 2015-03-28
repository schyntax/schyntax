"use strict";

var TestConverter = require('./test-converter');
var suite = TestConverter.suite;
var test = TestConverter.test;
var check = TestConverter.check;

suite('dates', function ()
{
	var f, d, n, p;

	test('Aliases', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');

		check('date(*)', d, p, n);
		check('dates(*)', d, p, n);

		check('DATE(*)', d, p, n);
		check('DATES(*)', d, p, n);
	});

	test('dates(12/25)', function ()
	{
		var f = this.test.title;

		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2013-12-25T00:00:00Z');
		n = new Date('2014-12-25T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-12-25T00:00:00Z');
		p = new Date('2014-12-25T00:00:00Z');
		n = new Date('2015-12-25T00:00:00Z');
		check(f, d, p, n);
	});
});

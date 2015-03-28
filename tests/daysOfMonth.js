"use strict";

var TestConverter = require('./test-converter');
var suite = TestConverter.suite;
var test = TestConverter.test;
var check = TestConverter.check;

suite('daysOfMonth', function ()
{
	var f, d, n, p;

	test('Aliases', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');

		check('dom(*)', d, p, n);
		check('dayofmonth(*)', d, p, n);
		check('daysofmonth(*)', d, p, n);

		check('dayOfMonth(*)', d, p, n);
		check('daysOfMonth(*)', d, p, n);

		check('DOM(*)', d, p, n);
		check('DAYOFMONTH(*)', d, p, n);
		check('DAYSOFMONTH(*)', d, p, n);
	});

	test('dom(1)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-01T00:00:00Z');
		n = new Date('2014-07-01T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-06-01T00:00:00Z');
		n = new Date('2014-07-01T00:00:00Z');
		check(f, d, p, n);
	});

	test('dom(30)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-05-30T00:00:00Z');
		n = new Date('2014-06-30T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-02-16T00:00:00Z');
		p = new Date('2014-01-30T00:00:00Z');
		n = new Date('2014-03-30T00:00:00Z');
		check(f, d, p, n);
	});

	test('dom(29)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-05-29T00:00:00Z');
		n = new Date('2014-06-29T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-02-16T00:00:00Z');
		p = new Date('2014-01-29T00:00:00Z');
		n = new Date('2014-03-29T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2016-02-16T00:00:00Z');
		p = new Date('2016-01-29T00:00:00Z');
		n = new Date('2016-02-29T00:00:00Z');
		check(f, d, p, n);
	});
	
	test('dom(8..10)', function ()
	{
		var f = this.test.title;

		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-10T00:00:00Z');
		n = new Date('2014-07-08T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-05-10T00:00:00Z');
		n = new Date('2014-06-08T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-09T00:00:00Z');
		p = new Date('2014-06-09T00:00:00Z');
		n = new Date('2014-06-10T00:00:00Z');
		check(f, d, p, n);
	});
	
	test('dom(25..31)', function ()
	{
		var f = this.test.title;

		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-30T00:00:00Z');
		p = new Date('2014-06-30T00:00:00Z');
		n = new Date('2014-07-25T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-09T00:00:00Z');
		p = new Date('2014-05-31T00:00:00Z');
		n = new Date('2014-06-25T00:00:00Z');
		check(f, d, p, n);
	});

	test('dom(-1)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-05-31T00:00:00Z');
		n = new Date('2014-06-30T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-02-16T00:00:00Z');
		p = new Date('2014-01-31T00:00:00Z');
		n = new Date('2014-02-28T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2016-02-16T00:00:00Z');
		p = new Date('2016-01-31T00:00:00Z');
		n = new Date('2016-02-29T00:00:00Z');
		check(f, d, p, n);
	});

	test('dom(-3)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-05-29T00:00:00Z');
		n = new Date('2014-06-28T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-02-16T00:00:00Z');
		p = new Date('2014-01-29T00:00:00Z');
		n = new Date('2014-02-26T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2016-02-16T00:00:00Z');
		p = new Date('2016-01-29T00:00:00Z');
		n = new Date('2016-02-27T00:00:00Z');
		check(f, d, p, n);
	});

	test('dom(-3..-1)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-05-31T00:00:00Z');
		n = new Date('2014-06-28T00:00:00Z');
		check(f, d, p, n);
	});

	test('dom(5..-1)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-05-31T00:00:00Z');
		n = new Date('2014-06-05T00:00:00Z');
		check(f, d, p, n);
	});
	
	test('dom(5..-2%2)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-27T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-05-29T00:00:00Z');
		n = new Date('2014-06-05T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-08T00:00:00Z');
		p = new Date('2014-06-07T00:00:00Z');
		n = new Date('2014-06-09T00:00:00Z');
		check(f, d, p, n);
	});
	
	test('dom(5%2)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-27T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-05-31T00:00:00Z');
		n = new Date('2014-06-05T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-08T00:00:00Z');
		p = new Date('2014-06-07T00:00:00Z');
		n = new Date('2014-06-09T00:00:00Z');
		check(f, d, p, n);
	});
	
	test('dom(*%3)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-28T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-06-01T00:00:00Z');
		n = new Date('2014-06-04T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-08T00:00:00Z');
		p = new Date('2014-06-07T00:00:00Z');
		n = new Date('2014-06-10T00:00:00Z');
		check(f, d, p, n);
	});
	
	test('dom(20..10)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-06-01T00:00:00Z');
		n = new Date('2014-06-02T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-12T00:00:00Z');
		p = new Date('2014-06-10T00:00:00Z');
		n = new Date('2014-06-20T00:00:00Z');
		check(f, d, p, n);
	});
	
	test('dom(20..10%2)', function ()
	{
		var f = this.test.title;
		
		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-24T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-01T00:00:00Z');
		p = new Date('2014-06-01T00:00:00Z');
		n = new Date('2014-06-03T00:00:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-05-01T00:00:00Z');
		p = new Date('2014-04-30T00:00:00Z');
		n = new Date('2014-05-02T00:00:00Z');
		check(f, d, p, n);
	});
});

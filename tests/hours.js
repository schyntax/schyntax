"use strict";

var TestConverter = require('./test-converter');
var suite = TestConverter.suite;
var test = TestConverter.test;
var check = TestConverter.check;

suite('hours', function ()
{
	var f, d, n, p;

	test('Aliases', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T19:00:00Z');

		check('h(*)', d, p, n);
		check('hour(*)', d, p, n);
		check('hours(*)', d, p, n);
		check('hourofday(*)', d, p, n);
		check('hoursofday(*)', d, p, n);

		check('H(*)', d, p, n);
		check('HOUR(*)', d, p, n);
		check('HOURS(*)', d, p, n);
		check('HOUROFDAY(*)', d, p, n);
		check('HOURSOFDAY(*)', d, p, n);
	});

	test('h(6)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-25T06:00:00Z');
		n = new Date('2014-06-26T06:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T06:00:00Z');
		p = new Date('2014-06-25T06:00:00Z');
		n = new Date('2014-06-26T06:00:00Z');
		check(f, d, p, n);
	});

	test('h(!6)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T06:00:00Z');
		p = new Date('2014-06-25T05:00:00Z');
		n = new Date('2014-06-25T07:00:00Z');
		check(f, d, p, n);
	});

	test('h(0..23)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T20:00:00Z');
		p = new Date('2014-06-25T20:00:00Z');
		n = new Date('2014-06-25T21:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-25T01:00:00Z');
		check(f, d, p, n);
	});

	test('h(12..20, 21)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T20:00:00Z');
		p = new Date('2014-06-25T20:00:00Z');
		n = new Date('2014-06-25T21:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T08:00:00Z');
		p = new Date('2014-06-24T21:00:00Z');
		n = new Date('2014-06-25T12:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T21:00:00Z');
		n = new Date('2014-06-26T12:00:00Z');
		check(f, d, p, n);
	});

	test('h(12..22)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T20:00:00Z');
		p = new Date('2014-06-25T20:00:00Z');
		n = new Date('2014-06-25T21:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T08:00:00Z');
		p = new Date('2014-06-24T22:00:00Z');
		n = new Date('2014-06-25T12:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T22:00:00Z');
		n = new Date('2014-06-26T12:00:00Z');
		check(f, d, p, n);
	});

	test('h(!12..22)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T11:00:00Z');
		n = new Date('2014-06-25T23:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-25T01:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T23:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
	});

	test('h(20..4)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T10:00:00Z');
		p = new Date('2014-06-25T04:00:00Z');
		n = new Date('2014-06-25T20:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T22:00:00Z');
		p = new Date('2014-06-25T22:00:00Z');
		n = new Date('2014-06-25T23:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T23:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
	});

	test('h(!20..4)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T10:00:00Z');
		p = new Date('2014-06-25T10:00:00Z');
		n = new Date('2014-06-25T11:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T22:00:00Z');
		p = new Date('2014-06-25T19:00:00Z');
		n = new Date('2014-06-26T05:00:00Z');
		check(f, d, p, n);
	});

	test('h(*%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T20:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T11:00:00Z');
		p = new Date('2014-06-25T10:00:00Z');
		n = new Date('2014-06-25T12:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T22:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
	});

	test('h(0%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T20:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T11:00:00Z');
		p = new Date('2014-06-25T10:00:00Z');
		n = new Date('2014-06-25T12:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T22:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
	});

	test('h(0..23%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T20:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T11:00:00Z');
		p = new Date('2014-06-25T10:00:00Z');
		n = new Date('2014-06-25T12:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T22:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
	});

	test('h(3%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T17:00:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T11:00:00Z');
		p = new Date('2014-06-25T11:00:00Z');
		n = new Date('2014-06-25T13:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T23:00:00Z');
		p = new Date('2014-06-25T23:00:00Z');
		n = new Date('2014-06-26T03:00:00Z');
		check(f, d, p, n);
	});

	test('h(3..20%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T17:00:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T21:00:00Z');
		p = new Date('2014-06-25T19:00:00Z');
		n = new Date('2014-06-26T03:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T00:00:00Z');
		p = new Date('2014-06-24T19:00:00Z');
		n = new Date('2014-06-25T03:00:00Z');
		check(f, d, p, n);
	});

	test('h(*%3)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T21:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T01:00:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-25T03:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T21:00:00Z');
		p = new Date('2014-06-25T21:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		check(f, d, p, n);
	});
});

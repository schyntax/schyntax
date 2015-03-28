"use strict";

var TestConverter = require('./test-converter');
var suite = TestConverter.suite;
var test = TestConverter.test;
var check = TestConverter.check;

suite('seconds', function ()
{
	var f, d, n, p;

	test('Aliases', function ()
	{
		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:12Z');
		n = new Date('2014-06-25T18:26:13Z');

		check('s(*)', d, p, n);
		check('sec(*)', d, p, n);
		check('second(*)', d, p, n);
		check('seconds(*)', d, p, n);
		check('secondofminute(*)', d, p, n);
		check('secondsofminute(*)', d, p, n);

		check('S(*)', d, p, n);
		check('SEC(*)', d, p, n);
		check('SECOND(*)', d, p, n);
		check('SECONDS(*)', d, p, n);
		check('SECONDOFMINUTE(*)', d, p, n);
		check('SECONDSOFMINUTE(*)', d, p, n);
	});

	test('s(6)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:06Z');
		n = new Date('2014-06-25T18:27:06Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T17:59:06Z');
		n = new Date('2014-06-25T18:00:06Z');
		check(f, d, p, n);
	});

	test('s(!6)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:12Z');
		n = new Date('2014-06-25T18:26:13Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:06Z');
		p = new Date('2014-06-25T18:00:05Z');
		n = new Date('2014-06-25T18:00:07Z');
		check(f, d, p, n);
	});

	test('s(0..59)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:12Z');
		n = new Date('2014-06-25T18:26:13Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T18:00:01Z');
		check(f, d, p, n);
	});

	test('s(12..26, 27)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:01:26Z');
		p = new Date('2014-06-25T18:01:26Z');
		n = new Date('2014-06-25T18:01:27Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:01:08Z');
		p = new Date('2014-06-25T18:00:27Z');
		n = new Date('2014-06-25T18:01:12Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:50Z');
		p = new Date('2014-06-25T18:00:27Z');
		n = new Date('2014-06-25T18:01:12Z');
		check(f, d, p, n);
	});

	test('s(12..28)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:12Z');
		n = new Date('2014-06-25T18:26:13Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:01:08Z');
		p = new Date('2014-06-25T18:00:28Z');
		n = new Date('2014-06-25T18:01:12Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:01:46Z');
		p = new Date('2014-06-25T18:01:28Z');
		n = new Date('2014-06-25T18:02:12Z');
		check(f, d, p, n);
	});

	test('s(!12..28)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:11Z');
		n = new Date('2014-06-25T18:00:29Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T18:00:01Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:48Z');
		p = new Date('2014-06-25T18:00:48Z');
		n = new Date('2014-06-25T18:00:49Z');
		check(f, d, p, n);
	});

	test('s(50..10)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:10Z');
		n = new Date('2014-06-25T18:00:50Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:52Z');
		p = new Date('2014-06-25T18:00:52Z');
		n = new Date('2014-06-25T18:00:53Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:59Z');
		p = new Date('2014-06-25T18:00:59Z');
		n = new Date('2014-06-25T18:01:00Z');
		check(f, d, p, n);
	});

	test('s(!50..10)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:26Z');
		n = new Date('2014-06-25T18:00:27Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:50Z');
		p = new Date('2014-06-25T18:00:49Z');
		n = new Date('2014-06-25T18:01:11Z');
		check(f, d, p, n);
	});

	test('s(*%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:26Z');
		n = new Date('2014-06-25T18:00:28Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:11Z');
		p = new Date('2014-06-25T18:00:10Z');
		n = new Date('2014-06-25T18:00:12Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:59Z');
		p = new Date('2014-06-25T18:00:58Z');
		n = new Date('2014-06-25T18:01:00Z');
		check(f, d, p, n);
	});

	test('s(0%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:26Z');
		n = new Date('2014-06-25T18:00:28Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:11Z');
		p = new Date('2014-06-25T18:00:10Z');
		n = new Date('2014-06-25T18:00:12Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:59Z');
		p = new Date('2014-06-25T18:00:58Z');
		n = new Date('2014-06-25T18:01:00Z');
		check(f, d, p, n);
	});

	test('s(0..59%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:26Z');
		n = new Date('2014-06-25T18:00:28Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:11Z');
		p = new Date('2014-06-25T18:00:10Z');
		n = new Date('2014-06-25T18:00:12Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:59Z');
		p = new Date('2014-06-25T18:00:58Z');
		n = new Date('2014-06-25T18:01:00Z');
		check(f, d, p, n);
	});

	test('s(3%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:25Z');
		n = new Date('2014-06-25T18:00:27Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:11Z');
		p = new Date('2014-06-25T18:00:11Z');
		n = new Date('2014-06-25T18:00:13Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:59Z');
		p = new Date('2014-06-25T18:00:59Z');
		n = new Date('2014-06-25T18:01:03Z');
		check(f, d, p, n);
	});

	test('s(3..58%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:25Z');
		n = new Date('2014-06-25T18:00:27Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:11Z');
		p = new Date('2014-06-25T18:00:11Z');
		n = new Date('2014-06-25T18:00:13Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:59Z');
		p = new Date('2014-06-25T18:00:57Z');
		n = new Date('2014-06-25T18:01:03Z');
		check(f, d, p, n);
	});

	test('s(*%3)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:00:26.326Z');
		p = new Date('2014-06-25T18:00:24Z');
		n = new Date('2014-06-25T18:00:27Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:11Z');
		p = new Date('2014-06-25T18:00:09Z');
		n = new Date('2014-06-25T18:00:12Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:57Z');
		p = new Date('2014-06-25T18:00:57Z');
		n = new Date('2014-06-25T18:01:00Z');
		check(f, d, p, n);
	});
});

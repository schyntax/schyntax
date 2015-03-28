"use strict";

var TestConverter = require('./test-converter');
var suite = TestConverter.suite;
var test = TestConverter.test;
var check = TestConverter.check;

suite('minutes', function ()
{
	var f, d, n, p;
	
	test('Aliases', function ()
	{
		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:27:00Z');

		check('m(*)', d, p, n);
		check('min(*)', d, p, n);
		check('minute(*)', d, p, n);
		check('minutes(*)', d, p, n);
		check('minuteofhour(*)', d, p, n);
		check('minutesofhour(*)', d, p, n);
		
		check('M(*)', d, p, n);
		check('MIN(*)', d, p, n);
		check('MINUTE(*)', d, p, n);
		check('MINUTES(*)', d, p, n);
		check('MINUTEOFHOUR(*)', d, p, n);
		check('MINUTESOFHOUR(*)', d, p, n);
	});
	
	test('m(6)', function ()
	{
		f = this.test.title;
		
		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:06:00Z');
		n = new Date('2014-06-25T19:06:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-25T18:06:00Z');
		p = new Date('2014-06-25T18:06:00Z');
		n = new Date('2014-06-25T19:06:00Z');
		check(f, d, p, n);
	});
	
	test('m(!6)', function ()
	{
		f = this.test.title;
		
		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-25T18:06:00Z');
		p = new Date('2014-06-25T18:05:00Z');
		n = new Date('2014-06-25T18:07:00Z');
		check(f, d, p, n);
	});
	
	test('m(0..59)', function ()
	{
		f = this.test.title;
		
		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T18:01:00Z');
		check(f, d, p, n);
	});
	
	test('m(12..26, 27)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-25T18:08:00Z');
		p = new Date('2014-06-25T17:27:00Z');
		n = new Date('2014-06-25T18:12:00Z');
		check(f, d, p, n);
		
		d = new Date('2014-06-25T18:50:00Z');
		p = new Date('2014-06-25T18:27:00Z');
		n = new Date('2014-06-25T19:12:00Z');
		check(f, d, p, n);
	});
	
	test('m(12..28)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:08:00Z');
		p = new Date('2014-06-25T17:28:00Z');
		n = new Date('2014-06-25T18:12:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:46:00Z');
		p = new Date('2014-06-25T18:28:00Z');
		n = new Date('2014-06-25T19:12:00Z');
		check(f, d, p, n);
	});
	
	test('m(!12..28)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:11:00Z');
		n = new Date('2014-06-25T18:29:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:00:00Z');
		p = new Date('2014-06-25T18:00:00Z');
		n = new Date('2014-06-25T18:01:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:48:00Z');
		p = new Date('2014-06-25T18:48:00Z');
		n = new Date('2014-06-25T18:49:00Z');
		check(f, d, p, n);
	});
	
	test('m(50..10)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:10:00Z');
		n = new Date('2014-06-25T18:50:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:52:00Z');
		p = new Date('2014-06-25T18:52:00Z');
		n = new Date('2014-06-25T18:53:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:59:00Z');
		p = new Date('2014-06-25T18:59:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);
	});
	
	test('m(!50..10)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:50:00Z');
		p = new Date('2014-06-25T18:49:00Z');
		n = new Date('2014-06-25T19:11:00Z');
		check(f, d, p, n);
	});
	
	test('m(*%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:28:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:11:00Z');
		p = new Date('2014-06-25T18:10:00Z');
		n = new Date('2014-06-25T18:12:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:59:00Z');
		p = new Date('2014-06-25T18:58:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);
	});
	
	test('m(0%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:28:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:11:00Z');
		p = new Date('2014-06-25T18:10:00Z');
		n = new Date('2014-06-25T18:12:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:59:00Z');
		p = new Date('2014-06-25T18:58:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);
	});
	
	test('m(0..59%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:26:00Z');
		n = new Date('2014-06-25T18:28:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:11:00Z');
		p = new Date('2014-06-25T18:10:00Z');
		n = new Date('2014-06-25T18:12:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:59:00Z');
		p = new Date('2014-06-25T18:58:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);
	});
	
	test('m(3%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:25:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:11:00Z');
		p = new Date('2014-06-25T18:11:00Z');
		n = new Date('2014-06-25T18:13:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:59:00Z');
		p = new Date('2014-06-25T18:59:00Z');
		n = new Date('2014-06-25T19:03:00Z');
		check(f, d, p, n);
	});
	
	test('m(3..58%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:25:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:11:00Z');
		p = new Date('2014-06-25T18:11:00Z');
		n = new Date('2014-06-25T18:13:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:59:00Z');
		p = new Date('2014-06-25T18:57:00Z');
		n = new Date('2014-06-25T19:03:00Z');
		check(f, d, p, n);
	});
	
	test('m(*%3)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:12.326Z');
		p = new Date('2014-06-25T18:24:00Z');
		n = new Date('2014-06-25T18:27:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:11:00Z');
		p = new Date('2014-06-25T18:09:00Z');
		n = new Date('2014-06-25T18:12:00Z');
		check(f, d, p, n);

		d = new Date('2014-06-25T18:57:00Z');
		p = new Date('2014-06-25T18:57:00Z');
		n = new Date('2014-06-25T19:00:00Z');
		check(f, d, p, n);
	});
});

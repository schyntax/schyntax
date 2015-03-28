"use strict";

var TestConverter = require('./test-converter');
var suite = TestConverter.suite;
var test = TestConverter.test;
var check = TestConverter.check;

suite('daysOfWeek', function ()
{
	var f, d, n, p;

	test('Aliases', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');

		check('day(*)', d, p, n);
		check('days(*)', d, p, n);
		check('dow(*)', d, p, n);
		check('dayofweek(*)', d, p, n);
		check('daysofweek(*)', d, p, n);
		
		check('dayOfWeek(*)', d, p, n);
		check('daysOfWeek(*)', d, p, n);

		check('DAY(*)', d, p, n);
		check('DAYS(*)', d, p, n);
		check('DOW(*)', d, p, n);
		check('DAYOFWEEK(*)', d, p, n);
		check('DAYSOFWEEK(*)', d, p, n);
	});

	test('Sunday', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-22T00:00:00Z');
		n = new Date('2014-06-29T00:00:00Z');
		
		check('dow(1)', d, p, n);
		check('dow(su)', d, p, n);
		check('dow(sun)', d, p, n);
		check('dow(sunday)', d, p, n);
		check('dow(SU)', d, p, n);
		check('dow(SUN)', d, p, n);
		check('dow(SUNDAY)', d, p, n);
	});

	test('Monday', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-23T00:00:00Z');
		n = new Date('2014-06-30T00:00:00Z');
		
		check('dow(2)', d, p, n);
		check('dow(mo)', d, p, n);
		check('dow(mon)', d, p, n);
		check('dow(monday)', d, p, n);
		check('dow(MO)', d, p, n);
		check('dow(MON)', d, p, n);
		check('dow(MONDAY)', d, p, n);
	});

	test('Tuesday', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-24T00:00:00Z');
		n = new Date('2014-07-01T00:00:00Z');
		
		check('dow(3)', d, p, n);
		check('dow(tu)', d, p, n);
		check('dow(tue)', d, p, n);
		check('dow(tues)', d, p, n);
		check('dow(tuesday)', d, p, n);
		check('dow(TU)', d, p, n);
		check('dow(TUE)', d, p, n);
		check('dow(TUES)', d, p, n);
		check('dow(TUESDAY)', d, p, n);
	});

	test('Wednesday', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-25T00:00:00Z');
		n = new Date('2014-07-02T00:00:00Z');
		
		check('dow(4)', d, p, n);
		check('dow(we)', d, p, n);
		check('dow(wed)', d, p, n);
		check('dow(wednesday)', d, p, n);
		check('dow(WE)', d, p, n);
		check('dow(WED)', d, p, n);
		check('dow(WEDNESDAY)', d, p, n);
	});

	test('Thursday', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-19T00:00:00Z');
		n = new Date('2014-06-26T00:00:00Z');
		
		check('dow(5)', d, p, n);
		check('dow(th)', d, p, n);
		check('dow(thu)', d, p, n);
		check('dow(thur)', d, p, n);
		check('dow(thurs)', d, p, n);
		check('dow(thursday)', d, p, n);
		check('dow(TH)', d, p, n);
		check('dow(THU)', d, p, n);
		check('dow(THUR)', d, p, n);
		check('dow(THURS)', d, p, n);
		check('dow(THURSDAY)', d, p, n);
	});

	test('Friday', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-20T00:00:00Z');
		n = new Date('2014-06-27T00:00:00Z');
		
		check('dow(6)', d, p, n);
		check('dow(fr)', d, p, n);
		check('dow(fri)', d, p, n);
		check('dow(friday)', d, p, n);
		check('dow(FR)', d, p, n);
		check('dow(FRI)', d, p, n);
		check('dow(FRIDAY)', d, p, n);
	});

	test('Saturday', function ()
	{
		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-21T00:00:00Z');
		n = new Date('2014-06-28T00:00:00Z');
		
		check('dow(7)', d, p, n);
		check('dow(sa)', d, p, n);
		check('dow(sat)', d, p, n);
		check('dow(saturday)', d, p, n);
		check('dow(SA)', d, p, n);
		check('dow(SAT)', d, p, n);
		check('dow(SATURDAY)', d, p, n);
	});

	test('dow(sat..sun)', function ()
	{
		f = this.test.title;

		d = new Date('2014-06-25T18:26:00Z');
		p = new Date('2014-06-22T00:00:00Z');
		n = new Date('2014-06-28T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-13T00:00:00Z');
		p = new Date('2014-07-13T00:00:00Z');
		n = new Date('2014-07-19T00:00:00Z');
		check(f, d, p, n);
	});

	test('dow(mon..fri)', function ()
	{
		f = this.test.title;

		d = new Date('2014-07-13T00:00:00Z');
		p = new Date('2014-07-11T00:00:00Z');
		n = new Date('2014-07-14T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-14T00:00:00Z');
		p = new Date('2014-07-14T00:00:00Z');
		n = new Date('2014-07-15T00:00:00Z');
		check(f, d, p, n);
	});

	test('dow(mon..thu, sat)', function ()
	{
		f = this.test.title;

		d = new Date('2014-07-13T00:00:00Z');
		p = new Date('2014-07-12T00:00:00Z');
		n = new Date('2014-07-14T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-17T00:00:00Z');
		p = new Date('2014-07-17T00:00:00Z');
		n = new Date('2014-07-19T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-18T00:00:00Z');
		p = new Date('2014-07-17T00:00:00Z');
		n = new Date('2014-07-19T00:00:00Z');
		check(f, d, p, n);
	});

	test('dow(*%3)', function ()
	{
		f = this.test.title;

		d = new Date('2014-07-13T00:00:00Z');
		p = new Date('2014-07-13T00:00:00Z');
		n = new Date('2014-07-16T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-17T00:00:00Z');
		p = new Date('2014-07-16T00:00:00Z');
		n = new Date('2014-07-19T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-19T00:00:00Z');
		p = new Date('2014-07-19T00:00:00Z');
		n = new Date('2014-07-20T00:00:00Z');
		check(f, d, p, n);
	});

	test('dow(thu%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-07-13T00:00:00Z');
		p = new Date('2014-07-12T00:00:00Z');
		n = new Date('2014-07-17T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-15T00:00:00Z');
		p = new Date('2014-07-12T00:00:00Z');
		n = new Date('2014-07-17T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-11T00:00:00Z');
		p = new Date('2014-07-10T00:00:00Z');
		n = new Date('2014-07-12T00:00:00Z');
		check(f, d, p, n);
	});

	test('dow(thu..tue%2)', function ()
	{
		f = this.test.title;

		d = new Date('2014-07-13T00:00:00Z');
		p = new Date('2014-07-12T00:00:00Z');
		n = new Date('2014-07-14T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-16T00:00:00Z');
		p = new Date('2014-07-14T00:00:00Z');
		n = new Date('2014-07-17T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-15T00:00:00Z');
		p = new Date('2014-07-14T00:00:00Z');
		n = new Date('2014-07-17T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-19T00:00:00Z');
		p = new Date('2014-07-19T00:00:00Z');
		n = new Date('2014-07-21T00:00:00Z');
		check(f, d, p, n);

		d = new Date('2014-07-17T00:00:00Z');
		p = new Date('2014-07-17T00:00:00Z');
		n = new Date('2014-07-19T00:00:00Z');
		check(f, d, p, n);
	});
});

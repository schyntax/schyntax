# ![](https://avatars1.githubusercontent.com/u/8682785?v=2&s=200)

Schyntax is a domain-specific language for defining event schedules in a terse, but readable, format. For example, if you want something to run every five minutes, you could write `min(*%5)`.

This project holds the language documentation and [official test suite](https://github.com/schyntax/schyntax/blob/master/tests.json). The reference implementation is [C# Schyntax](https://github.com/schyntax/cs-schyntax). The is also a fully-compatible [JavaScript implementation](https://github.com/schyntax/js-schyntax).

__If you're interested in porting Schyntax to another language, please [read this](https://github.com/schyntax/schyntax/blob/master/Porting.md).__

## Syntax

Format strings are composed of [groups](#groups) and [expressions](#expressions).

General Syntax Rules:

* Expression uses a similar syntax as function calls in C-Style languages: `name(arg0, arg1, arg2)`. The commas between arguments are optional.
* Format strings are case-insensitive. `dayofmonth` is equivalent to `DAYOFMONTH` or `dayOfMonth`, etc.
* All whitespace is insignificant.
* Fractional numbers are not supported in any expression.
* An argument preceded by a `!` is treated as an exclude. `days(!sat..sun)` means that Saturday through Sunday are excluded from the schedule.
* All expressions accept any number of arguments, and may mix includes and excludes. For example, you might specify every weekday except tuesday as `days(mon..fri, !tues)`.
* All time-related values are evaluated as UTC. `hours(12)` will be noon UTC, not noon local.
* Numeric ranges are specified in the form of `start..end`. For example, `days(1..5)` is the first five days of the month. The order of start and end is significant, and in cases where `start > end` it will be interpreted as a range which wraps. In other words, `minutes(58..2)` means it will run on minutes 58, 59, 0, 1, and 2.
* The `..` operator is inclusive of the start and end values. `1..4` is equal to `1,2,3,4`. There is also a `..<` operator which is the "half-open" range operator, meaning it is inclusive of the start, but exclusive of the end value. `1..<4` is equal to `1,2,3`.
* The wildcard `*` operator means "any value." For example, `min(*)` means "run every minute."
* The `%` operator can be used to define intervals. `seconds(*%2)` will run on all even seconds. `seconds(7%3)` will run at 7,10,13, ...,55, and 58 seconds of every minute. `seconds(7..19%4)` will run at 7,11,15, and 19 seconds. `seconds(57..4%2)` will run at 57,59,1, and 3 seconds. Note that the interval operation is always relative to the start value in the range.

## Expressions

Expressions allow you to define when you want events to occur or when you explicitly do not want them to occur. If your format string does not contain any expressions, it will be invalid and schyntax will throw an exception.

### seconds

Aliases: `s`, `sec`, `second`, `secondOfMinute`, `secondsOfMinute`

Accepts numbers and numeric-range arguments between 0 and 59 inclusive.

### minutes

Aliases: `m`, `min`, `minute`, `minuteofhour`, `minutesOfHour`

Accepts numbers and numeric-range arguments between 0 and 59 inclusive.

### hours

Aliases: `h`, `hour`, `hourOfDay`, `hoursOfDay`

Accepts numbers and numeric-range arguments between 0 and 23 inclusive.

### daysOfWeek

Aliases: `day`, `days`, `dayOfWeek`, `dow`

Accepts numbers and numeric-range arguments between 1 (Sunday) and 7 (Saturday) inclusive. Additionally, you may use textual days. Two or three-character abbreviations are accepted (such as `mo..th` or `mon..thu`) as well as full names (`monday..thursday`). Because `tues`, `thur`, and `thurs` are common abbreviations, those special cases are also accepted, but it may be better to stick to the more predictable 2-3 characters.

### daysOfMonth

Aliases: `dom`, `dayOfMonth`

Accepts numbers and numeric-range arguments between 1 and 31 inclusive. A second range from -31 to -1 is also allowed and are counted as days from the end of the month.

Examples:

* `dom(-1)` The last day of the month.
* `dom(-5..-1)` the last five days of the month.
* `dom(10..-1)` The 10th through the last day of the month.

### daysOfYear

Aliases: `doy`, `dayOfYear`

Accepts numbers and numeric-range arguments between 1 and 366 inclusive. A second range from -366 to -1 is also allowed and are counted as days from the end of the year.

Examples:

* `doy(-1)` The last day of the year.
* `doy(-5..-1)` the last five days of the year.
* `doy(10..-1)` January 10th through December 31st.

### dates

Aliases: `date`

Allows you to include or exclude specific dates or date ranges. Date arguments take the form of `m/d`. Date ranges are `m/d..m/d` and are allowed to span across January 1st. If you need to specify a specific year (generally a bad idea), you can use `yyyy/m/d`. Years 1900 through 2200 are supported.

Examples:

* `dates(!12/25, !7/4)` Run every day except December 25th and July 4th.
* `dates(4/1)` Only run on April 1st.
* `dates(4/1 .. 4/30)` Only run for the month of April.
* `dates(4/1 .. 4/30, !4/16)` Run every day in April except for April 16th.
* `dates(!12/25 .. 1/1)` Run every day except December 25th through January 1st.

## Defaults

When a format string does not include all expression types, some assumptions must be made about the missing values. Schyntax looks at the expression with the highest-resolution, and then sets `exp_name(0)` for any higher-resolution expressions. For example, if `hours` is the highest resolution specified, then `minutes(0) seconds(0)` is implicitly added to the format. All day-level expressions (`daysOfWeek`, `daysOfMonth`, `daysOfYear`, `dates`) are treated as the same resolution. Any other (lower-resolution) missing expression types are considered wildcards, meaning they will match any date/time (equivalent to `exp_name(*)`).

Here are some examples which illustrate these defaults:

* `minutes(10)` will run at ten minutes after the top of every hour on every day.
* `hours(12)` will run at noon UTC everyday.
* `daysOfWeek(mon..fri)` will run at midnight UTC Mondays through Fridays.
* `daysOfWeek(mon) hours(12)` will run at noon UTC on Mondays.
* `daysOfWeek(mon) minutes(0, 30)` will run at the top and half of every hour on Mondays.
* `daysOfYear(*)` will run at midnight (00:00:00) every day.

## Groups

Expressions can be grouped using the `{ expression, expression, ... }` syntax (commas between the expressions are optional). This allows you to setup sets of expressions which are evaluated independently from each other. For example, you may want to have a different set of rules for weekdays vs. weekends.

Examples:

* `{hours(10), days(!sat..sun)} {hours(12), days(sat..sun)}` Runs 10:00 on weekdays, and noon on weekends.
* `{dates(10/1 .. 3/31) hours(12)} {dates(4/1 .. 9/30) hours(14)}` Runs 12:00 during October through March, and at 14:00 during April through September.

All groups are evaluated to find the next or previous applicable date, and they return which ever date which is closest.  All expressions not inside a `{}` are collected and implicitly put into a group.

Nesting of groups is not allowed.

### Want to Help?

There are already two implementations, but there are several ways to contribute if you're interested.

* [Adding tests](https://github.com/schyntax/schyntax/blob/master/WritingTests.md) to the official cross-library suite.
* [Writing ports](https://github.com/schyntax/schyntax/blob/master/Porting.md) for other languages.
* Giving input, and contributing towards [roadmap items](https://github.com/schyntax/schyntax/issues/1)

Bug fixes are always welcome. If possible, try to submit a test with your bug fix. If you would like to contribute features to the schyntax expression language, open an issue on this project with your proposed functionality, syntax changes, and use cases _BEFORE_ you submit a pull request to any of the implementations so that it can be discussed.

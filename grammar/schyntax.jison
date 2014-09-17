
%{
	// AST Classes
	
	function Program (loc, children)
	{
		this.type = 'Program';
		/** @member {Location} */
		this.location = loc;
		this.children = children;
	}
	
	function Group (loc, expressions)
	{
		this.type = 'Group';
		/** @member {Location} */
		this.location = loc;
		/** @member {Expression[]} */
		this.expressions = expressions;
	}
	
	function Expression (loc, name, args)
	{
		this.type = 'Expression';
		/** @member {Location} */
		this.location = loc;
		/** @member {string} */
		this.name = name;
		/** @member {Argument[]} */
		this.arguments = args;
	}
	
	function Argument (loc, exclude, range, modulus)
	{
		this.type = 'Argument';
		/** @member {Location} */
		this.location = loc;
		/** @member {boolean} */
		this.exclude = exclude;
		/** @member {DateValue|IntegerValue} */
		this.start = range ? range.start : null;
		/** @member {DateValue|IntegerValue} */
		this.end = range ? range.end : null;
		/** @member {number} */
		this.modulus = modulus;
	}
	
	function DateValue (loc, year, month, day)
	{
		this.type = 'DateValue';
		/** @member {Location} */
		this.location = loc;
		/** @member {number} */
		this.year = typeof year === 'string' ? parseInt(year, 10) : year;
		/** @member {number} */
		this.month = typeof month === 'string' ? parseInt(month, 10) : month;
		/** @member {number} */
		this.day = typeof day === 'string' ? parseInt(day, 10) : day;
	}
	
	function IntegerValue (loc, int)
	{
		this.type = 'IntegerValue';
		/** @member {Location} */
		this.location = loc;
		/** @member {number} */
		this.value = typeof int === 'string' ? parseInt(int, 10) : int;
	}
	
	function MixinIdentifier ()
	{
		this.type = 'MixinIdentifier';
		/** @member {Location} */
		this.location = loc;
	}
	
	// Range doesn't actually show up in the AST. It's an intermediate class.
	function Range (start, end)
	{
		this.type = 'Range';
		/** @member {DateValue|IntegerValue} */
		this.start = start;
		/** @member {DateValue|IntegerValue} */
		this.end = end;
	}
	
	function Location (firstLine, firstColumn, lastLine, lastColumn, thing)
	{
		this.firstLine = firstLine;
		this.firstColumn = firstColumn;
		this.lastLine = lastLine;
		this.lastColumn = lastColumn;
	}
	
	function loc (tokenInfo)
	{
		return new Location(tokenInfo.first_line, tokenInfo.first_column, tokenInfo.last_line, tokenInfo.last_column);
	}
	
%}

%options flex case-insensitive

/* lexical grammar */
%lex

%%
\s+       { /* ignore whitespace */ }
<<EOF>>     { return 'EOF'; }

'..'      { return '..'; }
'%'       { return '%'; }
'!'       { return '!'; }
'('       { return '('; }
')'       { return ')'; }
'/'       { return '/'; }
','       { return ','; }

[0-9]+      { return 'POSITIVE_INTEGER'; }
\-[0-9]+    { return 'NEGATIVE_INTEGER'; }

\$[a-z][a-z0-9_]* { return 'MIXIN_IDENTIFIER'; }

\b(su|sun|sunday)\b       { return 'SUNDAY'; }
\b(mo|mon|monday)\b       { return 'MONDAY'; }
\b(tu|tue|tuesday|tues)\b     { return 'TUESDAY'; }
\b(we|wed|wednesday)\b      { return 'WEDNESDAY'; }
\b(th|thu|thursday|thur|thurs)\b  { return 'THURSDAY'; }
\b(fr|fri|friday)\b       { return 'FRIDAY'; }
\b(sa|sat|saturday)\b     { return 'SATURDAY'; }

\b(s|sec|second|seconds|secondofminute|secondsofminute)\b { return 'SECONDS'; }
\b(m|min|minute|minutes|minuteofhour|minutesofhour)\b   { return 'MINUTES'; }
\b(h|hour|hours|hourofday|hoursofday)\b       { return 'HOURS'; }
\b(day|days|dow|dayofweek|daysofweek)\b       { return 'DAYS_OF_WEEK'; }
\b(dom|dayofmonth|daysofmonth)\b          { return 'DAYS_OF_MONTH'; }
\b(date|dates)\b                { return 'DATES'; }

\b(group)\b                 { return 'GROUP' }


/lex

%start Program

%% /* language grammar */

/* --- Top Level Grammar */

Program
	: GroupOrExpressionList EOF
		{ return new Program(loc(@$), $1); }
;

GroupOrExpressionList
	: GroupOrExpression
		{ $$ = [ $1 ]; }
	| GroupOrExpressionList GroupOrExpression
		{ $$ = $1.concat($2); }
	| GroupOrExpressionList ',' GroupOrExpression
		{ $$ = $1.concat($3); }
;

/* --- Expressions --- */

GroupOrExpression
	: Group
		{ $$ = $1; }
	| Expression
		{ $$ = $1; }
;

Group
	: GROUP '(' ExpressionList ')'
		{ $$ = new Group(loc(@$), $3); }
;

ExpressionList
	: Expression
		{ $$ = [ $1 ]; }
	| ExpressionList Expression
		{ $$ = $1.concat($2); }
	| ExpressionList ',' Expression
		{ $$ = $1.concat($3); }
;

Expression
	: SecondsExpression
	| MinutesExpression
	| HoursExpression
	| DaysOfWeekExpression
	| DaysOfMonthExpression
	| DatesExpression
;

SecondsExpression
	: SECONDS '(' ')'
		{ $$ = new Expression(loc(@$), 'seconds', []); }
	| SECONDS '(' IntegerArgumentList ')'
		{ $$ = new Expression(loc(@$), 'seconds', $3); }
;

MinutesExpression
	: MINUTES '(' ')'
		{ $$ = new Expression(loc(@$), 'minutes', []); }
	| MINUTES '(' IntegerArgumentList ')'
		{ $$ = new Expression(loc(@$), 'minutes', $3); }
;

HoursExpression
	: HOURS '(' ')'
		{ $$ = new Expression(loc(@$), 'hours', []); }
	| HOURS '(' IntegerArgumentList ')'
		{ $$ = new Expression(loc(@$), 'hours', $3); }
;

DaysOfWeekExpression
	: DAYS_OF_WEEK '(' ')'
		{ $$ = new Expression(loc(@$), 'daysofweek', []); }
	| DAYS_OF_WEEK '(' DayArgumentList ')'
		{ $$ = new Expression(loc(@$), 'daysofweek', $3); }
;

DaysOfMonthExpression
	: DAYS_OF_MONTH '(' ')'
		{ $$ = new Expression(loc(@$), 'daysofmonth', []); }
	| DAYS_OF_MONTH '(' IntegerArgumentList ')'
		{ $$ = new Expression(loc(@$), 'daysofmonth', $3); }
;

DatesExpression
	: DATES '(' ')'
		{ $$ = new Expression(loc(@$), 'dates', []); }
	| DATES '(' DateArgumentList ')'
		{ $$ = new Expression(loc(@$), 'dates', $3); }
;

/* --- Arguments --- */

DateArgumentList
	: DateArgument
		{ $$ = [ $1 ]; }
	| DateArgumentList ',' DateArgument
		{ $$ = $1.concat($3); }
;

IntegerArgumentList
	: IntegerArgument
		{ $$ = [ $1 ]; } 
	| IntegerArgumentList ',' IntegerArgument
		{ $$ = $1.concat($3); }
;

DayArgumentList
	: DayArgument
		{ $$ = [ $1 ]; }
	| DayArgumentList ',' DayArgument
		{ $$ = $1.concat($3); }
;

DateArgument
	: OptionalExclude ModulusLiteral
		{ $$ = new Argument(loc(@$), $1, null, $2); }
	| OptionalExclude DateRange OptionalModulus
		{ $$ = new Argument(loc(@$), $1, $2, $3); }
;

IntegerArgument
	: OptionalExclude ModulusLiteral
		{ $$ = new Argument(loc(@$), $1, null, $2); }
	| OptionalExclude IntegerRange OptionalModulus
		{ $$ = new Argument(loc(@$), $1, $2, $3); }
;

DayArgument
	: OptionalExclude ModulusLiteral
		{ $$ = new Argument(loc(@$), $1, null, $2); }
	| OptionalExclude DayRange OptionalModulus
		{ $$ = new Argument(loc(@$), $1, $2, $3); }
;

OptionalExclude
	: '!'
		{ $$ = true; }
	|
		{ $$ = false; }
;

OptionalModulus
	: ModulusLiteral
	|
		{ $$ = null; }
;

/* --- Ranges --- */

DateRange
	: DateLiteral
		{ $$ = new Range($1, null); }
	| DateLiteral '..' DateLiteral
		{ $$ = new Range($1, $3); }
;

IntegerRange
	: IntegerLiteral
		{ $$ = new Range($1, null); }
	| IntegerLiteral '..' IntegerLiteral
		{ $$ = new Range($1, $3); }
;

DayRange
	: DayOrIntegerLiteral
		{ $$ = new Range($1, null); }
	| DayOrIntegerLiteral '..' DayOrIntegerLiteral
		{ $$ = new Range($1, $3); }
;

/* --- Literals --- */

DateLiteral
	: POSITIVE_INTEGER '/' POSITIVE_INTEGER
		{ $$ = new DateValue(loc(@$), null, $1, $3); }
	| POSITIVE_INTEGER '/' POSITIVE_INTEGER '/' POSITIVE_INTEGER
		{ $$ = new DateValue(loc(@$), $1, $3, $5); }
;

DayLiteral
	: SUNDAY
		{ $$ = new IntegerValue(loc(@$), 1); }
	| MONDAY
		{ $$ = new IntegerValue(loc(@$), 2); }
	| TUESDAY
		{ $$ = new IntegerValue(loc(@$), 3); }
	| WEDNESDAY
		{ $$ = new IntegerValue(loc(@$), 4); }
	| THURSDAY
		{ $$ = new IntegerValue(loc(@$), 5); }
	| FRIDAY
		{ $$ = new IntegerValue(loc(@$), 6); }
	| SATURDAY
		{ $$ = new IntegerValue(loc(@$), 7); }
;

IntegerLiteral
	: POSITIVE_INTEGER
		{ $$ = new IntegerValue(loc(@$), $1); }
	| NEGATIVE_INTEGER
		{ $$ = new IntegerValue(loc(@$), $1); }
;

DayOrIntegerLiteral
	: DayLiteral
	| IntegerLiteral
;

ModulusLiteral
	: '%' POSITIVE_INTEGER
		{ $$ = parseInt($2, 10); }
;

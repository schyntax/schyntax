
%{
	// AST Classes
	
	function Program (children)
	{
		this.type = 'Program';
		this.children = children;
	}
	
	function Group (expressions)
	{
		this.type = 'Group';
		/** @member {Expression[]} */
		this.expressions = expressions;
	}
	
	function Expression (name, args)
	{
		this.type = 'Expression';
		/** @member {string} */
		this.name = name;
		/** @member {Argument[]} */
		this.arguments = args;
	}
	
	function Argument (exclude, range, modulus)
	{
		this.type = 'Argument';
		/** @member {boolean} */
		this.exclude = exclude;
		/** @member {DateValue|IntegerValue} */
		this.start = range ? range.start : null;
		/** @member {DateValue|IntegerValue} */
		this.end = range ? range.end : null;
		/** @member {number} */
		this.modulus = modulus;
	}
	
	function DateValue (year, month, day)
	{
		this.type = 'DateValue';
		/** @member {number} */
		this.year = typeof year === 'string' ? parseInt(year, 10) : year;
		/** @member {number} */
		this.month = typeof month === 'string' ? parseInt(month, 10) : month;
		/** @member {number} */
		this.day = typeof day === 'string' ? parseInt(day, 10) : day;
	}
	
	function IntegerValue (int)
	{
		this.type = 'IntegerValue';
		/** @member {number} */
		this.value = typeof int === 'string' ? parseInt(int, 10) : int;
	}
	
	function MixinIdentifier ()
	{
		this.type = 'MixinIdentifier';
	}
	
	// Range doesn't actually show up in the AST. It's an intermediate class.
	function Range (start, end)
	{
		/** @member {DateValue|IntegerValue} */
		this.start = start;
		/** @member {DateValue|IntegerValue} */
		this.end = end;
	}
	
%}

%options flex case-insensitive

/* lexical grammar */
%lex

%%
\s+                 { /* ignore whitespace */ }
<<EOF>>             { return 'EOF'; }

'..'                { return '..'; }
'%'                 { return '%'; }
'!'                 { return '!'; }
'('                 { return '('; }
')'                 { return ')'; }
'/'                 { return '/'; }
','                 { return ','; }

[0-9]+              { return 'POSITIVE_INTEGER'; }
\-[0-9]+            { return 'NEGATIVE_INTEGER'; }

\$[a-z][a-z0-9_]*   { return 'MIXIN_IDENTIFIER'; }

\b(su|sun|sunday)\b                 { return 'SUNDAY'; }
\b(mo|mon|monday)\b                 { return 'MONDAY'; }
\b(tu|tue|tuesday|tues)\b           { return 'TUESDAY'; }
\b(we|wed|wednesday)\b              { return 'WEDNESDAY'; }
\b(th|thu|thursday|thur|thurs)\b    { return 'THURSDAY'; }
\b(fr|fri|friday)\b                 { return 'FRIDAY'; }
\b(sa|sat|saturday)\b               { return 'SATURDAY'; }

\b(s|sec|second|seconds|secondofminute|secondsofminute)\b   { return 'SECONDS'; }
\b(m|min|minute|minutes|minuteofhour|minutesofhour)\b       { return 'MINUTES'; }
\b(h|hour|hours|hourofday|hoursofday)\b                     { return 'HOURS'; }
\b(day|days|dow|dayofweek|daysofweek)\b                     { return 'DAYS_OF_WEEK'; }
\b(dom|dayofmonth|daysofmonth)\b                            { return 'DAYS_OF_MONTH'; }
\b(date|dates)\b                                            { return 'DATES'; }

\b(group)\b                                                 { return 'GROUP' }


/lex

%start Program

%% /* language grammar */

/* --- Top Level Grammar */

Program
	: GroupOrExpressionList EOF
		{ return new Program($1); }
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
		{ $$ = new Group($3); }
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
		{ $$ = new Expression('seconds', []); }
	| SECONDS '(' IntegerArgumentList ')'
		{ $$ = new Expression('seconds', $3); }
;

MinutesExpression
	: MINUTES '(' ')'
		{ $$ = new Expression('minutes', []); }
	| MINUTES '(' IntegerArgumentList ')'
		{ $$ = new Expression('minutes', $3); }
;

HoursExpression
	: HOURS '(' ')'
		{ $$ = new Expression('hours', []); }
	| HOURS '(' IntegerArgumentList ')'
		{ $$ = new Expression('hours', $3); }
;

DaysOfWeekExpression
	: DAYS_OF_WEEK '(' ')'
		{ $$ = new Expression('daysofweek', []); }
	| DAYS_OF_WEEK '(' DayArgumentList ')'
		{ $$ = new Expression('daysofweek', $3); }
;

DaysOfMonthExpression
	: DAYS_OF_MONTH '(' ')'
		{ $$ = new Expression('daysofmonth', []); }
	| DAYS_OF_MONTH '(' IntegerArgumentList ')'
		{ $$ = new Expression('daysofmonth', $3); }
;

DatesExpression
	: DATES '(' ')'
		{ $$ = new Expression('dates', []); }
	| DATES '(' DateArgumentList ')'
		{ $$ = new Expression('dates', $3); }
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
		{ $$ = new Argument($1, null, $2); }
	| OptionalExclude DateRange OptionalModulus
		{ $$ = new Argument($1, $2, $3); }
;

IntegerArgument
	: OptionalExclude ModulusLiteral
		{ $$ = new Argument($1, null, $2); }
	| OptionalExclude IntegerRange OptionalModulus
		{ $$ = new Argument($1, $2, $3); }
;

DayArgument
	: OptionalExclude ModulusLiteral
		{ $$ = new Argument($1, null, $2); }
	| OptionalExclude DayRange OptionalModulus
		{ $$ = new Argument($1, $2, $3); }
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
		{ $$ = new DateValue(null, $1, $3); }
	| POSITIVE_INTEGER '/' POSITIVE_INTEGER '/' POSITIVE_INTEGER
		{ $$ = new DateValue($1, $3, $5); }
;

DayLiteral
	: SUNDAY
		{ $$ = new IntegerValue(1); }
	| MONDAY
		{ $$ = new IntegerValue(2); }
	| TUESDAY
		{ $$ = new IntegerValue(3); }
	| WEDNESDAY
		{ $$ = new IntegerValue(4); }
	| THURSDAY
		{ $$ = new IntegerValue(5); }
	| FRIDAY
		{ $$ = new IntegerValue(6); }
	| SATURDAY
		{ $$ = new IntegerValue(7); }
;

IntegerLiteral
	: POSITIVE_INTEGER
		{ $$ = new IntegerValue($1); }
	| NEGATIVE_INTEGER
		{ $$ = new IntegerValue($1); }
;

DayOrIntegerLiteral
	: DayLiteral
	| IntegerLiteral
;

ModulusLiteral
	: '%' POSITIVE_INTEGER
		{ $$ = parseInt($2, 10); }
;

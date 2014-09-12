
%{
	// classes
	
	function Program ()
	{
		this.type = 'Program';
		this.groups = [];
	}
	
	function Group ()
	{
		this.type = 'Group';
	}
	
	function Expression ()
	{
		this.type = 'Expression';
	}
	
	function DateArgument ()
	{
		this.type = 'DateArgument';
	}
	
	function DayArgument ()
	{
		this.type = 'DayArgument';
	}
	
	function IntegerArgument ()
	{
		this.type = 'IntegerArgument';
	}
	
	function DateLiteral ()
	{
		this.type = 'DateLiteral';
	}
	
	function DayLiteral ()
	{
		this.type = 'DayLiteral';
	}
	
	function IntegerLiteral ()
	{
		this.type = 'IntegerLiteral';
	}
	
	function MixinIdentifier ()
	{
		this.type = 'MixinIdentifier';
	}
%}

%options flex case-insensitive

/* lexical grammar */
%lex

%%
\s+							{ /* ignore whitespace */ }
<<EOF>>						{ return 'EOF'; }

\.\.						{ return 'RANGE_OPERATOR'; }
'%'							{ return 'MODULUS_OPERATOR'; }
'!'							{ return 'EXCLUDE_OPERATOR'; }

'('							{ return '('; }
')'							{ return ')'; }
'/'							{ return '/'; }
','							{ return ','; }

[0-9]+						{ return 'POSITIVE_INTEGER'; }
\-[0-9]+						{ return 'NEGATIVE_INTEGER'; }

\$[a-z][a-z0-9_]*			{ return 'MIXIN_IDENTIFIER'; }

\b(su|sun|sunday)\b				{ return 'SUNDAY'; }
\b(mo|mon|monday)\b				{ return 'MONDAY'; }
\b(tu|tue|tuesday|tues)\b			{ return 'TUESDAY'; }
\b(we|wed|wednesday)\b				{ return 'WEDNESDAY'; }
\b(th|thu|thursday|thur|thurs)\b	{ return 'THURSDAY'; }
\b(fr|fri|friday)\b				{ return 'FRIDAY'; }
\b(sa|sat|saturday)\b				{ return 'SATURDAY'; }

\b(s|sec|second|seconds|secondofminute|secondsofminute)\b	{ return 'SECONDS'; }
\b(m|min|minute|minutes|minuteofhour|minutesofhour)\b		{ return 'MINUTES'; }
\b(h|hour|hours|hourofday|hoursofday)\b						{ return 'HOURS'; }
\b(day|days|dow|dayofweek|daysofweek)\b							{ return 'DAYS_OF_WEEK'; }
\b(dom|dayofmonth|daysofmonth)\b							{ return 'DAYS_OF_MONTH'; }
\b(date|dates)\b											{ return 'DATES'; }

\b(group)\b														{ return 'GROUP' }


/lex

%start Program

%% /* language grammar */

/* --- Top Level Grammar */

Program
	: GroupOrExpressionList EOF
;

GroupOrExpressionList
	: GroupOrExpression
	| GroupOrExpressionList GroupOrExpression
	| GroupOrExpressionList ',' GroupOrExpression
;

/* --- Expressions --- */

GroupOrExpression
	: Group
	| Expression
;

Group
	: GROUP '(' ExpressionList ')'
;

ExpressionList
	: Expression
	| ExpressionList Expression
	| ExpressionList ',' Expression
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
	| SECONDS '(' IntegerArgumentList ')'
;

MinutesExpression
	: MINUTES '(' ')'
	| MINUTES '(' IntegerArgumentList ')'
;

HoursExpression
	: HOURS '(' ')'
	| HOURS '(' IntegerArgumentList ')'
;

DaysOfWeekExpression
	: DAYS_OF_WEEK '(' ')'
	| DAYS_OF_WEEK '(' DayArgumentList ')'
;

DaysOfMonthExpression
	: DAYS_OF_MONTH '(' ')'
	| DAYS_OF_MONTH '(' IntegerArgumentList ')'
;

DatesExpression
	: DATES '(' ')'
	| DATES '(' DateArgumentList ')'
;

/* --- Arguments --- */

DateArgumentList
	: DateArgument
	| DateArgumentList ',' DateArgument
;

IntegerArgumentList
	: IntegerArgument
	| IntegerArgumentList ',' IntegerArgument
;

DayArgumentList
	: DayArgument
	| DayArgumentList ',' DayArgument
;

DateArgument
	: OptionalExclude DateRange OptionalModulus
;

IntegerArgument
	: ModulusLiteral
	| OptionalExclude IntegerRange OptionalModulus
;

DayArgument
	: ModulusLiteral
	| OptionalExclude DayRange OptionalModulus
;

OptionalExclude
	: EXCLUDE_OPERATOR
	|
;

OptionalModulus
	: ModulusLiteral
	|
;

/* --- Ranges --- */

DateRange
	: DateLiteral
	| DateLiteral RANGE_OPERATOR DateLiteral
;

IntegerRange
	: IntegerLiteral
	| IntegerLiteral RANGE_OPERATOR IntegerLiteral
;

DayRange
	: DayOrIntegerLiteral
	| DayOrIntegerLiteral RANGE_OPERATOR DayOrIntegerLiteral
;

/* --- Literals --- */

DateLiteral
	: POSITIVE_INTEGER '/' POSITIVE_INTEGER
	| POSITIVE_INTEGER '/' POSITIVE_INTEGER '/' POSITIVE_INTEGER
;

DayLiteral
	: SUNDAY
	| MONDAY
	| TUESDAY
	| WEDNESDAY
	| THURSDAY
	| FRIDAY
	| SATURDAY
;

IntegerLiteral
	: POSITIVE_INTEGER
	| NEGATIVE_INTEGER
;

DayOrIntegerLiteral
	: DayLiteral
	| IntegerLiteral
;

ModulusLiteral
	: MODULUS_OPERATOR POSITIVE_INTEGER
;

/* lexical grammar */
%lex

%options case-insensitive

%%

\s+       /* ignore whitespace */
<<EOF>>   return 'EOF'

'..<'     return '..<'
'..'      return '..'
'%'       return '%'
'!'       return '!'
'('       return '('
')'       return ')'
'{'       return '{'
'}'       return '}'
'/'       return '/'
','       return ','
'*'       return '*'

[0-9]+                                                      return 'POSITIVE_INTEGER'
\-[0-9]+                                                    return 'NEGATIVE_INTEGER'

\b(su|sun|sunday)\b                                         return 'SUNDAY'
\b(mo|mon|monday)\b                                         return 'MONDAY'
\b(tu|tue|tuesday|tues)\b                                   return 'TUESDAY'
\b(we|wed|wednesday)\b                                      return 'WEDNESDAY'
\b(th|thu|thursday|thur|thurs)\b                            return 'THURSDAY'
\b(fr|fri|friday)\b                                         return 'FRIDAY'
\b(sa|sat|saturday)\b                                       return 'SATURDAY'
\b(s|sec|second|seconds|secondofminute|secondsofminute)\b   return 'SECONDS'
\b(m|min|minute|minutes|minuteofhour|minutesofhour)\b       return 'MINUTES'
\b(h|hour|hours|hourofday|hoursofday)\b                     return 'HOURS'
\b(day|days|dow|dayofweek|daysofweek)\b                     return 'DAYS_OF_WEEK'
\b(dom|dayofmonth|daysofmonth)\b                            return 'DAYS_OF_MONTH'
\b(date|dates)\b                                            return 'DATES'

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
;

GroupOrExpression
	: Group 
	| Expression
;

ExpressionList
	: Expression
	| ExpressionList Expression
;

Group
	: '{' ExpressionList '}' OptionalComma
	| '{' '}' OptionalComma
;

Expression
	: ExpressionName '(' ArgumentList ')' OptionalComma
;

ExpressionName
	: SECONDS
	| MINUTES
	| HOURS
	| DAYS_OF_WEEK
	| DAYS_OF_MONTH
	| DATES 
;

ArgumentList
	: Argument
	| ArgumentList Argument
;

Argument
	: OptionalExclude ValueRange OptionalInterval OptionalComma
;

ValueRange
	: '*'
	| Value
	| Value RangeOperator Value
;

RangeOperator
	: '..'
	| '..<'
;

Value
	: IntegerValue
	| DateValue
	| DayLiteral
;

IntegerValue
	: POSITIVE_INTEGER
	| NEGATIVE_INTEGER
;

DateValue
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

OptionalComma
	: ','
	|
;

OptionalExclude
	: '!'
	|
;

OptionalInterval
	: '%' POSITIVE_INTEGER
	|
;

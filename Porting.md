# Porting Schyntax

If you're interested in porting Schyntax to another language, that's fantastic, and you've come to the right place. There are already official implementations in [C#](https://github.com/schyntax/cs-schyntax), [JavaScript](https://github.com/schyntax/js-schyntax), and [Go](https://github.com/schyntax/go-schyntax), but that leaves lots of languages which could still benefit from Schyntax.

Unfortunately, the more implementations there are, the more difficult it will be to keep them in sync as the language evolves. Implementations will drift, and users will have inconsistent experiences. There is one way, however, to help prevent them from drifting.

If you look at the source code for three official implementations, you'll notice that they are remarkably similar. Here's the parse group method in each language:

C#

```csharp
private GroupNode ParseGroup()
{
	var group = new GroupNode();
	group.AddToken(Expect(TokenType.OpenCurly));

	while (!IsNext(TokenType.CloseCurly))
	{
		group.AddExpression(ParseExpression());

		if (IsNext(TokenType.Comma)) // optional comma
		{
			group.AddToken(Advance());
		}
	}

	group.AddToken(Expect(TokenType.CloseCurly));
	return group;
}
```

JavaScript

```js
Parser.prototype._parseGroup = function ()
{
	var group = new Node.GroupNode();
	group.addToken(this._expect(TokenType.OpenCurly));

	while (!this._isNext(TokenType.CloseCurly))
	{
		group.addExpression(this._parseExpression());

		if (this._isNext(TokenType.Comma)) // optional comma
		{
			group.addToken(this._advance());
		}
	}

	group.addToken(this._expect(TokenType.CloseCurly));
	return group;
};
```

Go

```go
func (p *Parser) parseGroup() *GroupNode {
	group := &GroupNode{}
	group.AddToken(p.expect(TokenTypeOpenCurly))

	for !p.isNext(TokenTypeCloseCurly) {
		group.AddExpression(p.parseExpression())

		if p.isNext(TokenTypeComma) {
			group.AddToken(p.advance())
		}
	}

	group.AddToken(p.expect(TokenTypeCloseCurly))
	return group
}
```

They're obviously not identical, but they are as similar as the languages allow, and this means that any changes in one implementation are very easy to port over to the others. Problems don't have to be solved twice, bugs don't have to be fixed twice, and all of the implementations will stay consistent.

Each port was created by going through the reference implementation (C#) file by file, function by function, and copying the logic as closely as possible. I strongly urge you to do the same when creating your own port. Ports which follow this style can be accepted as an official port and brought into this GitHub org. Unfortunately, ports which don't follow the same internal structure won't be accepted because they will be too difficult to maintain in parallel.

## Advice on Porting

In general, you'll want to work bottom to top. I would recommend porting in this order:

1. Exceptions
2. Terms
3. Token
4. Nodes
5. LexerBase and Lexer
6. ParserBase and Parser
7. Validator
8. IntermediateRepresentation and IrBuilder
9. Schedule

If you want to port Schtick (the task runner) as well, that's great. It's not a lot of code, but can be tricky to get right, especially in multi-threaded environments. The existing implementations should serve as inspiration, and the API should be as similar as possible, but it may or may not be practical to do a one-to-one port, so use your own discretion. The only strict requirement is that Schyntax and Schtick should be separate repositories (don't include a task runner in your Schyntax implementation).

Feel free to open an issue on this repo if you have questions or need further advice on how to proceed.

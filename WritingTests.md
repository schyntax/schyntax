# Writing Tests for Schyntax

Interested in contributing tests to Schyntax? That's fantastic.

The [tests.json](https://github.com/schyntax/schyntax/blob/master/tests.json) is the official test suite for consumption by the various implementations, but the JSON file is a generated file, and should not be edited directly. Instead they are defined in files in the [tests directory](https://github.com/schyntax/schyntax/tree/master/tests) using a specialized, but very simple, DSL.

## Tests DSL

Most tests follow this format:

```
-- Each test starts with two hyphens, followed by an optional description.
f: schyntax schedule string
d: start date
p: previous date
n: next date
```

For example:

```
-- Every second, starting at a 326 millisecond offset.
f: second(*)
d: 2014-06-25 18:26:12.326
p: 2014-06-25 18:26:12
n: 2014-06-25 18:26:13
```

### Valid Time Not Found Errors

If `p:` and/or `n:` are missing it will be assumed that no previous or next will be found when a search is attempted.

### Syntax Errors

To test that a format string causes a parse error, simply define which column you expect the syntax error to occur at.

```
f: minutes(,)
e:         ^
```

You must not define a `d:`, `p:`, or `n:` if there is a syntax error defined.

### Multi-line Schedules

Schyntax is whitespace insensitive, and if you want to test a multiple-line schedule string, you can do so by indenting the following lines with three spaces.

```
f: minutes(*)
   hours(5..12)
```

You can also define a syntax error for a multi-line schedule by specifying the line number immediately following the carrot.

```
f: minutes(*)
   hours(,)
   days(mon..fri)
e:       ^L2
```

The carrot still points to the column of the error, and `L2` says that it's on the second line of the schedule.

### Multi-line Descriptions

If your description needs to span multiple lines (generally not a good idea), you can indent following lines with three spaces, just like multi-line schedules.

```
-- This is a
   multiple line
   description
```

### Comments

If you need comments in the file, beyond the test descriptions, you can use lines starting with a `#`.

```
# this is a comment
```

Only whole-line comments are supported.

```
f: minutes(*) # this is an invalid comment
```

## Compiling the Tests

If you want to compile the files from the tests directory into the tests.json file, you'll need [node.js](https://nodejs.org) installed. Then simply run: `node CompileTests` in the root of this repository.

You can then copy the modified tests.json file to a Schyntax implementation to try it out. However, __do not submit this modified tests.json file__ in a pull request. Only submit the modified files in the tests directory. If you submit a modified tests.json file, you'll be asked to modify your pull request.

"use strict";

// This script combines all of the json files in the tests directory into a single tests.json file in the root of the repository.

var TestConverter = require('./tests/test-converter');

require('./tests/dates');
require('./tests/daysOfMonth');
require('./tests/daysOfWeek');
require('./tests/hours');
require('./tests/minutes');
require('./tests/seconds');

TestConverter.writeJson();

console.log('Done');
console.log();

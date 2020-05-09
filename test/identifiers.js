const test = require('ava');
const m = require('..');

test('should return the full list of identifiers', (t) => {
  t.deepEqual(m.identifiers(), ['bcrypt']);
});

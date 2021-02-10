const test = require('ava');
const m = require('..');

test("should throw an error if the 'rounds' option is not a number", async (t) => {
  const error = await t.throwsAsync(m.hash('password', {rounds: 'rounds'}));
  t.is(error.message, "The 'rounds' option must be an integer");
});

test("should throw an error if the 'rounds' option is out of range", async (t) => {
  let error = await t.throwsAsync(m.hash('password', {rounds: -1}));
  t.regex(error.message, /The 'rounds' option must be in the range/);

  error = await t.throwsAsync(m.hash('password', {rounds: 32}));
  t.regex(error.message, /The 'rounds' option must be in the range/);
});

test("should throw an error if the 'saltSize' option is out of range", async (t) => {
  let error = await t.throwsAsync(m.hash('password', {saltSize: -1}));
  t.regex(error.message, /The 'saltSize' option must be in the range/);

  error = await t.throwsAsync(m.hash('password', {saltSize: 1025}));
  t.regex(error.message, /The 'saltSize' option must be in the range/);
});

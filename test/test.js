import test from 'ava';
import currency from '../src/currency';

test('should be immutable', t => {
  var value = currency(1),
    // eslint-disable-next-line no-unused-vars
    newValue = value.add(0.25);

  t.is(parseFloat(value), 1, 'original value not modified');
});

test('should be instance of currency', t => {
  var value = currency(1);
  t.true(value instanceof currency, 'value is instance of currency');
});

test('should allow numbers', t => {
  var intVal = currency(1.23);
  t.is(parseFloat(intVal), 1.23, 'currency("1.23") is 1.23');
});

test('should allow strings', t => {
  var strVal = currency('1.23');
  t.is(parseFloat(strVal), 1.23, 'currency("1.23") is 1.23');
});

test('should allow currency', t => {
  var curVal = currency(currency('1.23'));
  t.is(parseFloat(curVal), 1.23, 'currency(currency("1.23")) is 1.23');
});

test('should accept strings with symbols', t => {
  var str1 = currency('$1234.56'),
      str2 = currency('£78.90');
  t.is(parseFloat(str1), 1234.56, 'currency("$1234.56") is 1234.56');
  t.is(parseFloat(str2), 78.90, 'currency("£78.90") is 78.90');
});

test('should allow comma delimited strings', t => {
  var str = currency('1,234,567.89');
  t.is(parseFloat(str), 1234567.89, 'currency("1,234,567.89") is 1234567.89');
});

test('should strip invalid characters', t => {
  var str = currency('a1b2c3');
  t.is(parseFloat(str), 123, 'currency("a1b2c3") is 123');
});

test('should allow negative strings', t => {
  var str1 = currency('(5.24)'),
      str2 = currency('-12.34');
  t.is(parseFloat(str1), -5.24, 'currency("(5.24)") is -5.24');
  t.is(parseFloat(str2), -12.34, 'currency("-12.34") is -12.34');
});

test('should default to 0 with invalid strings', t => {
  t.is(currency('abc').value, 0, 'currency("abc") is 0');
});

test('should return value', t => {
  t.is(currency(1.23).value, 1.23, 'currency.value exists');
});

test('should return intValue', t => {
  t.is(currency(1.23).intValue, 123, 'currency.intValue exists');
});

test('should add floating point value', t => {
  var value = currency(2.51).add(.01);

  t.is(parseFloat(value), 2.52, 'currency(2.51).add(.01) equals decimal value 2.52');
  t.not(parseFloat(value), 2.51+.01, 'currency(2.51).add(.01) does not equal 2.5199999999999996');
});

test('should subtract floating point', t => {
  var value = currency(2.52).subtract(.01);

  t.is(parseFloat(value), 2.51, 'currency(2.52).subtract(.01) equals decimal value 2.51');
  t.not(parseFloat(value), 2.52-.01, 'currency(2.52).subtract(.01) does not equal 2.5100000000000002');
});

test('currency multiplication', t => {
  var value = currency(1.23).multiply(2);
  var floatingValue = currency(.1).multiply(.2);

  t.is(parseFloat(value), 2.46, 'currency(1.23).multiply(2) is 2.46');
  t.is(parseFloat(floatingValue), .02, 'currency(.1).multiply(.2) equals 0.02');
  t.not(parseFloat(floatingValue), .1*.2, 'currency(.1).multiply(.2) does not equal 0.020000000000000004');
});

test('currency multiplication with precision', t => {
  var value = currency(1.369, { precision: 3 }).multiply(3);
  t.is(parseFloat(value), 4.107, 'currency(1.369).multiply(3) is 4.107');
});

test('currency division', t => {
  var value = currency(9.87).divide(2);
  t.is(parseFloat(value), 4.93, 'currency(9.87).divide(2) is 4.93');
});

test('currency division with precision', t => {
  var value = currency(4.107, { precision: 3 }).divide(3);
  t.is(parseFloat(value), 1.369, 'currency(4.107).divide(3) is 1.369');
});

test('should parse negative values', t => {
  var pos = currency(1.23),
      neg = currency(-1.23),
      distribute = neg.distribute(4);

  var total = 0;
  for(var i = 0; i < distribute.length; i++) {
    total += parseFloat(distribute[i]);
  }

  t.is(parseFloat(neg), -1.23, 'currency(-1.23) is -1.23');
  t.is(parseFloat(pos.subtract(2.01)), -0.78, 'currency(1.23).subtract(2.01) is -0.78');
  t.is(parseFloat(distribute[0]), -0.31, 'currency(-1.23).distribute(4), first distributed value is -0.31');
  t.is(total, -1.23, 'currency(-1.23).distribute(4) sum is -1.23');
});

test('should create equal distribution', t => {
  var values = currency(1.00).distribute(4);

  var realValues = [];
  for(var i = 0; i < values.length; i++) {
    realValues.push(parseFloat(values[i]));
  }

  t.is(values.length, 4, 'currency(1.00).distribute(4) creates 4 distributed items');
  t.deepEqual(realValues, [0.25, 0.25, 0.25, 0.25], 'all distributed items are equal');
});

test('should create non-equal distribution with pennies', t => {
  var values = currency(1.01).distribute(4);

  t.is(parseFloat(values[0]), 0.26, 'first value is 0.26');
  t.is(parseFloat(values[1]), 0.25, 'next value is 0.25');

  var total = 0;
  for(var i = 0; i < values.length; i++) {
    total += parseFloat(values[i]);
  }

  t.is(total, 1.01, 'sum of values matches our original amount');
});

test('should get dollar value', t => {
  var value = currency(1.23);

  t.is(value.add(2).dollars(), 3, 'is dollar amount');
  t.is(value.add(.8).dollars(), 2, 'is dollar amount');
  t.is(value.subtract(3).dollars(), -1, 'is negative dollar amount');
});

test('should get cent value', t => {
  var value = currency(1.23);

  t.is(value.cents(), 23, 'is cent amount');
  t.is(value.add(.31).cents(), 54, 'is cent amount');
});

test('should support different precision values', t => {
  let c1 = currency(1.234, { precision: 3 });
  let c2 = currency(1.234, { symbol: '¥', precision: 0 });

  t.is(c1.value, 1.234);
  t.is(c2.value, 1);
  t.is(c1.intValue, 1234);
  t.is(c2.intValue, 1);
  t.is(c1.add(4.567).value, 5.801);
  t.is(c2.add(4.567).value, 6);
  t.is(c1.subtract(4.567).value, -3.333);
  t.is(c2.subtract(4.567).value, -4);
  t.is(c1.cents(), 234);
  t.is(c2.cents(), 0);
  t.is(c1.format(true), '$1.234');
  t.is(c2.format(true), '¥1');
  t.deepEqual(c1.distribute(4).map(x => x.value), [.309, .309, .308, .308]);
  t.deepEqual(c2.distribute(4).map(x => x.value), [1, 0, 0, 0]);
});

test('should use source precision for arithmetic with different precisions', t => {
  let c1 = currency(1.23);
  let c2 = currency(1.239, { precision: 3 });

  t.is(c1.add(c2).value, 2.47);
  t.is(c2.add(c1).value, 2.469);
});

test('should use source formatting for mixed currency formats', t => {
  let c1 = currency('1,234.56');
  let c2 = currency('1 234,56', { separator: ' ', decimal: ',' });

  t.is(c1.add(c2).format(), '2,469.12');
  t.is(c2.add(c1).format(), '2 469,12');
});

test('parse should default rounding', t => {
  var round1 = currency(1.234)
    , round2 = currency(5.6789)
    , multiply = currency(10.00)
    , divide = currency(0.01);

  t.is(round1.value, 1.23, 'value is rounded to nearest cent');
  t.is(round2.value, 5.68, 'value is rounded to nearest cent');
  t.is(multiply.multiply(.001).value, .01, 'multiply value is not rounded');
  t.is(divide.divide(.001).value, 10, 'divide value is not rounded');
});

test('should have int value and real value', t => {
  var value1 = currency(2.51).add(.01)
    , value2 = currency(2.52).subtract(.01);

  t.is(value1.value, 2.52, 'real value is 2.52');
  t.is(value1.intValue, 252, 'int value is 252');
  t.is(value2.value, 2.51, 'real value is 2.51');
  t.is(value2.intValue, 251, 'int value is 251');
});

test('should stringify json', t => {
  var value1 = currency(1.23)
    , value2 = currency(2.51).add(.01)
    , value3 = currency(2.52).subtract(.02);

  t.is(JSON.stringify({ 'value': value1 }), '{"value":1.23}', 'value is 1.23');
  t.is(JSON.stringify({ 'value': value2 }), '{"value":2.52}', 'value is 2.52');
  t.is(JSON.stringify({ 'value': value3 }), '{"value":2.5}', 'value is 2.50');
});

test('should format value using defaults', t => {
  var value1 = currency(1.23).format()
    , value2 = currency(1234.56).format()
    , value3 = currency(1234567.89).format();

  t.is(typeof value1, 'string', 'value is string');
  t.is(value1, '1.23', 'value is "1.23"');
  t.is(value2, '1,234.56', 'value is "1,234.45"');
  t.is(value3, '1,234,567.89', 'value is "1,234,567.89"');
});

test('should format value using international', t => {
  let c = value => currency(value, { separator: '.', decimal: ',' });

  t.is(c(1.23).format(), '1,23', 'value is "1,23"');
  t.is(c(1000.00).format(), '1.000,00', 'value is "1.000,00"');
  t.is(c(1000000.00).format(), '1.000.000,00', 'value is "1.000.000,00"');
});

test('should parse international values', t => {
  let c = value => currency(value, { separator: '.', decimal: ',' });

  t.is(c('1,23').value, 1.23, 'value is "1.23"');
  t.is(c('1.000,00').value, 1000.00, 'value is "1,000.00"');
  t.is(c('1.000.000,00').value, 1000000.00, 'value is "1,000,000.00"');
});

test('should format with symbol', t => {
  t.is(currency(1.23).format(true), '$1.23', 'value is "$1.23"');
});

test('should format without symbol', t => {
  t.is(currency(1.23).format(false), '1.23', 'value is "1.23"');
});

test('should format with international symbol', t => {
  t.is(currency(1.23, { symbol: '£' }).format(true), '£1.23', 'value is "£1.23"');
  t.is(currency(1.23, { symbol: '¥' }).format(true), '¥1.23', 'value is "¥1.23"');
});

test('should return 0.00 currency with invalid input', t => {
  var value = currency(undefined);
  t.is(value.value, 0, 'value is "0.00"');
});

test('should round to nearest increment', t => {
  let c = value => currency(value, { increment: .05 });

  t.is(c(1.00).add(.04).toString(), '1.05', 'value is rounded to 1.05');
  t.is(c(1.00).add(.01).toString(), '1.00', 'value is rounded to 1.00');
  t.is(c(-1.00).add(.04).toString(), '-0.95', 'value is rounded to -0.95');
  t.is(c(-1.00).add(.01).toString(), '-1.00', 'value is rounded to -1.00');
  t.is(c(1.00).add(.04).format(), '1.05', 'value is rounded to 1.05');
  t.is(c(1.00).add(.01).format(), '1.00', 'value is rounded to 1.00');
  t.is(c(1000.00).add(.04).format(), '1,000.05', 'value is rounded to 1.05');
  t.is(c(1000.00).add(.01).format(), '1,000.00', 'value is rounded to 1.00');
  t.is(c(1000000.00).add(.04).format(), '1,000,000.05', 'value is rounded to 1.05');
  t.is(c(1000000.00).add(.01).format(), '1,000,000.00', 'value is rounded to 1.00');
});

test('should round only the final value to nearest increment', t => {
  let c = value => currency(value, { increment: .05 });

  t.is(c(1.00).add(.01).add(.01).add(.01).toString(), '1.05', 'value is rounded to 1.05');
  t.is(c(1.00).subtract(.01).subtract(.01).subtract(.01).toString(), '0.95', 'value is rounded to 0.95');
});

test('should not modify internal values when rounding', t => {
  let c = value => currency(value, { increment: .05 });

  t.is(c(1.00).add(.01).intValue, 101, 'intValue is to 101');
  t.is(c(1.00).add(.01).value, 1.01, 'value is to 1.01');
  t.is(c(1.00).add(.04).intValue, 104, 'intValue is to 104');
  t.is(c(1.00).add(.04).value, 1.04, 'value is to 1.04');
});

test('should allow arbitrary rounding increments', t => {
  let c1 = value => currency(value, { increment: .1 });
  let c2 = value => currency(value, { increment: .25 });
  let c3 = value => currency(value, { increment: 5, precision: 0 });

  t.is(c1(1.06).toString(), '1.10', 'value is rounded to 1.10');
  t.is(c1(-1.06).toString(), '-1.10', 'value is rounded to -1.10');
  t.is(c2(1.17).toString(), '1.25', 'value is rounded to 1.25');
  t.is(c2(-1.17).toString(), '-1.25', 'value is rounded to -1.25');
  t.is(c3(117).toString(), '115', 'value is rounded to 120');
  t.is(c3(-117).toString(), '-115', 'value is rounded to 120');
});

test('should throw exception with invalid input', t => {
  t.throws(function() { currency(undefined, { errorOnInvalid: true }); }, Error, 'Threw exception');
});
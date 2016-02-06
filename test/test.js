var assert = require('assert')
  , currency = require('../currency.js');

describe('currency.js', function() {

  it('should be immutable', function() {
    var value = currency(1),
        /* jshint unused: false */
        newValue = value.add(0.25);

    assert.equal(parseFloat(value), 1, 'original value not modified');
  });

  it('should be instance of currency', function() {
    var value = currency(1);
    assert.ok(value instanceof currency, 'value is instance of currency');
  });

  it('should allow numbers', function() {
    var intVal = currency(1.23);
    assert.strictEqual(parseFloat(intVal), 1.23, 'currency("1.23") is 1.23');
  });

  it('should allow strings', function() {
    var strVal = currency('1.23');
    assert.strictEqual(parseFloat(strVal), 1.23, 'currency("1.23") is 1.23');
  });

  it('should allow currency', function() {
    var curVal = currency(currency('1.23'));
    assert.strictEqual(parseFloat(curVal), 1.23, 'currency(currency("1.23")) is 1.23');
  });

  it('should accept strings with symbols', function() {
    var str1 = currency('$1234.56'),
        str2 = currency('£78.90');
    assert.strictEqual(parseFloat(str1), 1234.56, 'currency("$1234.56") is 1234.56');
    assert.strictEqual(parseFloat(str2), 78.90, 'currency("£78.90") is 78.90');
  });

  it('should allow comma delimited strings', function() {
    var str = currency('1,234,567.89');
    assert.strictEqual(parseFloat(str), 1234567.89, 'currency("1,234,567.89") is 1234567.89');
  });

  it('should strip invalid characters', function() {
    var str = currency('a1b2c3');
    assert.strictEqual(parseFloat(str), 123, 'currency("a1b2c3") is 123');
  });

  it('should allow negative strings', function() {
    var str1 = currency('(5.24)'),
        str2 = currency('-12.34');
    assert.strictEqual(parseFloat(str1), -5.24, 'currency("(5.24)") is -5.24');
    assert.strictEqual(parseFloat(str2), -12.34, 'currency("-12.34") is -12.34');
  });

  it('should add floating point value', function() {
    var value = currency(2.51).add(.01);

    assert.strictEqual(parseFloat(value), 2.52, 'currency(2.51).add(.01) equals decimal value 2.52');
    assert.notStrictEqual(parseFloat(value), 2.51+.01, 'currency(2.51).add(.01) does not equal 2.5199999999999996');
  });

  it('should subtract floating point', function() {
    var value = currency(2.52).subtract(.01);

    assert.strictEqual(parseFloat(value), 2.51, 'currency(2.52).subtract(.01) equals decimal value 2.51');
    assert.notStrictEqual(parseFloat(value), 2.52-.01, 'currency(2.52).subtract(.01) does not equal 2.5100000000000002');
  });

  it('currency multiplication', function() {
    var value = currency(1.23).multiply(2);
    assert.strictEqual(parseFloat(value), 2.46, 'currency(1.23).multiplication(2) is 2.46');
  });

  it('currency division', function() {
    var value = currency(9.87).divide(2);
    assert.strictEqual(parseFloat(value), 4.93, 'currency(9.87).divide(2) is 4.93');
  });

  it('should parse negative values', function() {
    var pos = currency(1.23),
        neg = currency(-1.23),
        distribute = neg.distribute(4);

    var total = 0;
    for(var i = 0; i < distribute.length; i++) {
      total += parseFloat(distribute[i]);
    }

    assert.strictEqual(parseFloat(neg), -1.23, 'currency(-1.23) is -1.23');
    assert.strictEqual(parseFloat(pos.subtract(2.01)), -0.78, 'currency(1.23).subtract(2.01) is -0.78');
    assert.strictEqual(parseFloat(distribute[0]), -0.31, 'currency(-1.23).distribute(4), first distributed value is -0.31');
    assert.strictEqual(total, -1.23, 'currency(-1.23).distribute(4) sum is -1.23');
  });

  it('should create equal distribution', function() {
    var values = currency(1.00).distribute(4);

    var realValues = [];
    for(var i = 0; i < values.length; i++) {
      realValues.push(parseFloat(values[i]));
    }

    assert.strictEqual(values.length, 4, 'currency(1.00).distribute(4) creates 4 distributed items');
    assert.deepEqual(realValues, [0.25, 0.25, 0.25, 0.25], 'all distributed items are equal');
  });

  it('should create non-equal distribution with pennies', function() {
    var values = currency(1.01).distribute(4);

    assert.equal(parseFloat(values[0]), 0.26, 'first value is 0.26');
    assert.equal(parseFloat(values[1]), 0.25, 'next value is 0.25');

    var total = 0;
    for(var i = 0; i < values.length; i++) {
      total += parseFloat(values[i]);
    }

    assert.equal(total, 1.01, 'sum of values matches our original amount');
  });

  it('should get dollar value', function() {
    var value = currency(1.23);

    assert.strictEqual(value.add(2).dollars(), 3, 'is dollar amount');
    assert.strictEqual(value.add(.8).dollars(), 2, 'is dollar amount');
  });

  it('should get cent value', function() {
    var value = currency(1.23);

    assert.strictEqual(value.cents(), 23, 'is cent amount');
    assert.strictEqual(value.add(.31).cents(), 54, 'is cent amount');
  });

  it('parse should default rounding', function() {
    var round1 = currency(1.234)
      , round2 = currency(5.6789)
      , multiply = currency(10.00)
      , divide = currency(0.01);

    assert.strictEqual(round1.value, 1.23, 'value is rounded to nearest cent');
    assert.strictEqual(round2.value, 5.68, 'value is rounded to nearest cent');
    assert.strictEqual(multiply.multiply(.001).value, .01, 'multiply value is not rounded');
    assert.strictEqual(divide.divide(.001).value, 10, 'divide value is not rounded');
  });

  it('should have int value and real value', function() {
    var value1 = currency(2.51).add(.01)
      , value2 = currency(2.52).subtract(.01);

    assert.strictEqual(value1.value, 2.52, 'real value is 2.52');
    assert.strictEqual(value1.intValue, 252, 'int value is 252');
    assert.strictEqual(value2.value, 2.51, 'real value is 2.51');
    assert.strictEqual(value2.intValue, 251, 'int value is 251');
  });

  it('should stringify json', function() {
    var value1 = currency(1.23)
      , value2 = currency(2.51).add(.01)
      , value3 = currency(2.52).subtract(.02);

    assert.strictEqual(JSON.stringify({ 'value': value1 }), '{"value":1.23}', 'value is 1.23');
    assert.strictEqual(JSON.stringify({ 'value': value2 }), '{"value":2.52}', 'value is 2.52');
    assert.strictEqual(JSON.stringify({ 'value': value3 }), '{"value":2.5}', 'value is 2.50');
  });

  it('should format value using defaults', function() {
    var value1 = currency(1.23).format()
      , value2 = currency(1234.56).format()
      , value3 = currency(1234567.89).format();

    assert.strictEqual(typeof value1, 'string', 'value is string');
    assert.strictEqual(value1, '1.23', 'value is "1.23"');
    assert.strictEqual(value2, '1,234.56', 'value is "1,234.45"');
    assert.strictEqual(value3, '1,234,567.89', 'value is "1,234,567.89"');
  });

  it('should format value using international', function() {
    currency.settings.separator = '.';
    currency.settings.decimal = ',';

    assert.strictEqual(currency(1.23).format(), '1,23', 'value is "1,23"');
    assert.strictEqual(currency(1000.00).format(), '1.000,00', 'value is "1.000,00"');
    assert.strictEqual(currency(1000000.00).format(), '1.000.000,00', 'value is "1.000.000,00"');

    currency.settings.separator = ',';
    currency.settings.decimal = '.';
  });

  it('should parse international values', function() {
    currency.settings.separator = '.';
    currency.settings.decimal = ',';

    assert.strictEqual(currency('1,23').format(), '1,23', 'value is "1,23"');
    assert.strictEqual(currency('1.000,00').format(), '1.000,00', 'value is "1.000,00"');
    assert.strictEqual(currency('1.000.000,00').format(), '1.000.000,00', 'value is "1.000.000,00"');

    currency.settings.separator = ',';
    currency.settings.decimal = '.';
  });

  it('should format with symbol', function() {
    assert.strictEqual(currency(1.23).format(true), '$1.23', 'value is "$1.23"');
  });

  it('should format without symbol', function() {
    assert.strictEqual(currency(1.23).format(false), '1.23', 'value is "1.23"');
  });

  it('should format with international symbol', function() {
    currency.settings.symbol = '£';
    assert.strictEqual(currency(1.23).format(true), '£1.23', 'value is "£1.23"');
    currency.settings.symbol = '¥';
    assert.strictEqual(currency(1.23).format(true), '¥1.23', 'value is "¥1.23"');
    currency.settings.symbol = '$';
  });

  it('should format with symbol globally', function() {
    currency.settings.formatWithSymbol = true;
    assert.strictEqual(currency(1.23).format(), '$1.23', 'value is "$1.23"');
    assert.strictEqual(currency(1.23).format(false), '1.23', 'value is "1.23"');
    currency.settings.formatWithSymbol = false;
  });

  it('should return 0.00 currency with invalid input', function() {
    currency.settings.errorOnInvalid = false;
    var value = currency(undefined);
    assert.strictEqual(value.value, 0, 'value is "0.00"');
  });

  it('should throw exception with invalid input', function() {
    currency.settings.errorOnInvalid = true;
    assert.throws(function() { currency(undefined); }, Error, 'Threw exception');
    currency.settings.errorOnInvalid = false;
  });

});
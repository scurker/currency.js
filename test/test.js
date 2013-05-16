module("currency.js");

test("currency should be immutable", function() {
  var value = currency(1),
      newValue = value.add(0.25);

  strictEqual(parseFloat(value), 1, 'original value not modified');
});

test("currency should allow numbers, strings, and currency", function() {
  expect(3);

  var intVal = currency(1.23),
      strVal = currency('1.23'),
      curVal = currency(strVal);

  strictEqual(parseFloat(intVal), 1.23, "currency(1.23) is 1.23");
  strictEqual(parseFloat(strVal), 1.23, "currency('1.23') is 1.23");
  strictEqual(parseFloat(curVal), 1.23, "currency(currency('1.23')) is 1.23");
});

test("currency should allow different types of strings", function() {
  expect(4);

  var str1 = currency('1,234,567.89'),
      str2 = currency('$1234.56'),
      str3 = currency('(5.24)'),
      str4 = currency('a1b2c3');

  strictEqual(parseFloat(str1), 1234567.89, "currency('1,234,567.89') is 1234567.89");
  strictEqual(parseFloat(str2), 1234.56, "currency('$1234.56') is 1234.56");
  strictEqual(parseFloat(str3), -5.24, "currency('(5.24)') is -5.24");
  strictEqual(parseFloat(str4), 123, "currency('a1b2c3') is 123");
});

test("should add floating point value", function() {
  var value = currency(2.51).add(.01);

  strictEqual(parseFloat(value), 2.52, 'currency(2.51).add(.01) equals decimal value 2.52');
  notStrictEqual(parseFloat(value), 2.51+.01, 'currency(2.51).add(.01) does not equal 2.5199999999999996');
});

test("should subtract floating point", function() {
  var value = currency(2.52).subtract(.01);

  strictEqual(parseFloat(value), 2.51, 'currency(2.52).subtract(.01) equals decimal value 2.51');
  notStrictEqual(parseFloat(value), 2.52-.01, 'currency(2.52).subtract(.01) does not equal 2.5100000000000002');
});

test("currency multiplication", function() {
  var value = currency(1.23).multiply(2);
  strictEqual(parseFloat(value), 2.46, 'currency(1.23).multiplication(2) is 2.46');
});

test("currency division", function() {
  var value = currency(9.87).divide(2);
  strictEqual(parseFloat(value), 4.93, 'currency(9.87).divide(2) is 4.93');
});

test("negative values", function() {
  expect(4);

  var pos = currency(1.23),
      neg = currency(-1.23),
      distribute = neg.distribute(4);

  var total = 0;
  for(var i = 0; i < distribute.length; i++) {
    total += parseFloat(distribute[i]);
  }

  strictEqual(parseFloat(neg), -1.23, "currency(-1.23) is -1.23");
  strictEqual(parseFloat(pos.subtract(2.01)), -0.78, "currency(1.23).subtract(2.01) is -0.78");
  strictEqual(parseFloat(distribute[0]), -0.31, "currency(-1.23).distribute(4), first distributed value is -0.31");
  strictEqual(total, -1.23, "currency(-1.23).distribute(4) sum is -1.23");
});

test("should create equal distribution", function() {
  var values = currency(1.00).distribute(4);

  var realValues = [];
  for(var i = 0; i < values.length; i++) {
    realValues.push(parseFloat(values[i]));
  }

  equal(values.length, 4, 'currency(1.00).distribute(4) creates 4 distributed items');
  deepEqual(realValues, [0.25, 0.25, 0.25, 0.25], 'all distributed items are equal');
});

test("should create non-equal distribution with pennies", function() {
  expect(3);

  var values = currency(1.01).distribute(4);

  equal(parseFloat(values[0]), 0.26, 'first value is 0.26');
  equal(parseFloat(values[1]), 0.25, 'next value is 0.25');

  var total = 0;
  for(var i = 0; i < values.length; i++) {
    total += parseFloat(values[i]);
  }

  equal(total, 1.01, 'sum of values matches our original amount');
});

test("should get dollar value", function() {
  var value = currency(1.23);

  strictEqual(value.add(2).dollars(), 3, 'is dollar amount');
  strictEqual(value.add(.8).dollars(), 2, 'is dollar amount');
});

test("should get cent value", function() {
  var value = currency(1.23);

  strictEqual(value.cents(), 23, 'is cent amount');
  strictEqual(value.add(.31).cents(), 54, 'is cent amount');
});
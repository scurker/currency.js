// @flow
import currency from '../src/currency.js';

const currencyInstance: currency = currency(1.23);

// default uses
new currency(1.23);
new currency('1.23');
new currency(currencyInstance);
currency(1.23);
currency('1.23');
currency(currencyInstance);

// options
currency(1.23, {});
currency(1.23, {
  symbol: '$',
  separator: ',',
  decimal: '.',
  errorOnInvalid: true,
  precision: 2,
  increment: .05,
  useVedic: false,
  pattern: '!#',
  negativePattern: '-!#',
  format: (currency, options) => '1.23'
});

// add
currencyInstance.add(1.23);
currencyInstance.add('1.23');
currencyInstance.add(currencyInstance);

// subtract
currencyInstance.subtract(1.23);
currencyInstance.subtract('1.23');
currencyInstance.subtract(currencyInstance);

// multiply
currencyInstance.multiply(1.23);
currencyInstance.multiply('1.23');
currencyInstance.multiply(currencyInstance);

// divide
currencyInstance.divide(1.23);
currencyInstance.divide('1.23');
currencyInstance.divide(currencyInstance);

// distribute
let a1: Array<currency> = currencyInstance.distribute(4);

// dollars
let d1: number = currencyInstance.dollars();

// cents
let c1: number = currencyInstance.cents();

// format
let s1: string = currencyInstance.format();
let s2: string = currencyInstance.format({ symbol: '£' });
let s3: string = currencyInstance.format((currency, options) => '1.23');

// property values
let v1: number = currencyInstance.value;
let v2: number = currencyInstance.intValue;

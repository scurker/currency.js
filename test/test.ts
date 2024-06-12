import currency from 'currency.js';
import * as namedCurrency from 'currency.js';
import interopCurrency = require('currency.js');

const currencyInstance: currency = currency(1.23);
const currencyInstance2: currency = namedCurrency(1.23);
const currencyInstance3: currency = interopCurrency(1.23);

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
  format: (currency: currency, options: currency.Options) => '1.23'
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

// mapDistribute
let elements: Array<string> = ['a', 'b']
let a2: Array<[string, currency]> = currencyInstance.mapDistribute(elements, (element, c) => [element, c]);

// dollars
let d1: number = currencyInstance.dollars();

// cents
let c1: number = currencyInstance.cents();

// format
let s1: string = currencyInstance.format();
let s2: string = currencyInstance.format({ symbol: '£' });
let s3: string = currencyInstance.format((currency: currency, options: currency.Options) => '1.23');

// property values
let v1: number = currencyInstance.value;
let v2: number = currencyInstance.intValue;

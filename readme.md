<div align="center" markdown="1">

![currency.js logo](https://user-images.githubusercontent.com/1062039/31397824-9dfa15f0-adac-11e7-9869-fb20746e90c1.png)

# currency.js

[![Build Status](https://travis-ci.org/scurker/currency.js.svg?branch=master)](https://travis-ci.org/scurker/currency.js)
[![Coverage Status](https://coveralls.io/repos/scurker/currency.js/badge.svg?branch=master&service=github)](https://coveralls.io/github/scurker/currency.js?branch=master)
[![npm](https://img.shields.io/npm/v/currency.js.svg?style=flat)](https://www.npmjs.com/package/currency.js)
[![gzip size](http://img.badgesize.io/https://unpkg.com/currency.js/dist/currency.min.js?compression=gzip)](https://unpkg.com/currency.js/dist/currency.min.js)

</div>

*currency.js* is a lightweight ~1kb javascript library for working with currency values. It was built to work around floating point issues in javascript. This [talk by Bartek Szopka](http://www.youtube.com/watch?v=MqHDDtVYJRI) explains in detail why javascript has floating point issues.

currency.js works with values as integers behind the scenes, resolving some of the most basic precision problems.

```javascript
2.51 + .01;                   // 2.5199999999999996
currency(2.51).add(.01);      // 2.52

2.52 - .01;                   // 2.5100000000000002
currency(2.52).subtract(.01); // 2.51
```

This should work for most *reasonable* values of currencies. As long as your currency values are less than 2<sup>53</sup> (in cents) or 90,071,992,547,409.91 you should be okay.

### Installation

With [npm](https://www.npmjs.com/):

```sh
npm install --save currency.js
```

With [yarn](https://yarnpkg.com):

```sh
yarn add currency.js
```

Via cdn:

```html
<script src="https://unpkg.com/currency.js@~1.2.0/dist/currency.min.js"></script>
```

### Usage

Currency will accept numbers, strings, or the currency object itself as values.

```javascript
currency(123);      // 123.00
currency(1.23);     // 1.23
currency("1.23")    // 1.23
currency("$12.30")  // 12.30

var value = currency("123.45");
currency(value);    // 123.45
```

There's various arithmetic methods that help take the guesswork out of trying to resolve floating point problems.

```javascript
currency(123.50).add(0.23);       // 123.73
currency(5.00).subtract(0.50);    // 4.50
currency(45.25).multiply(3);      // 135.75
currency(1.12).distribute(5);     // [0.23, 0.23, 0.22, 0.22, 0.22]
```

There's even a built in formatter that will automatically place comma delimiters in the right place.

```javascript
currency("2,573,693.75").add("100,275.50").format();  // "2,673,969.25"
currency("1,237.72").subtract(300).format();          // "937.72"
```

You can also change the format, localizing the decimal and/or delimiter to your locale.

```javascript
var euro = value => currency(value, { separator: ".", decimal: "," });
euro("2.573.693,75").add("100.275,50").format();  // "2.673.969,25"
euro("1.237,72").subtract(300).format();          // "937,72"
```

### Options

*currency.js* comes with its own set of default options conforming to USD. You can customize these according to your locale.

`symbol` *default*: `$`<br/>
When `formatWithSymbol` is set to `true`, will include the currency symbol when calling `currency.format()`.

`separator` *default*: `,`<br/>
Separator dividing the number groups when calling `currency.format()`.

`decimal` *default*: `.`<br/>
Decimal used when calling `currency.format()`.

`precision` *default*: `2`<br/>
Number of decimal places to store as cents.

`formatWithSymbol` *default*: `false`<br/>
Includes the `symbol` option when calling `currency.format()`.

`pattern` *default*: `!#`<br/>
Allows you to customize the format pattern using `!` as replacement for the currency symbol and `#` as replacement for the currency amount.

`negativePattern` *default*: `-!#`<br/>
Allows you to customize the negative format pattern using `!` as replacement for the currency symbol and `#` as replacement for the currency amount.

`errorOnInvalid` *default*: `false`<br/>
If an invalid value such as `null` or `undefined` is passed in, will throw an error.

`increment` *default*: `null`<br/>
When implementing a currency that implements rounding, setting the increment value will allow you to set the closest increment to round the display value to. `currency(1.48, { increment: .05 }); // => 1.50`

`useVedic` *default*: `false`<br/>
Formats number groupings using the Indian Numbering System, i.e. `10,00,000.00`

> View more examples and full documentation at [scurker.github.io/currency.js](http://scurker.github.io/currency.js).

### v1.0.0 breaking changes

In all version prior to `v1.0.0`, currency options were global. These global options were removed in `v1.0.0` and now are passed to each instance of currency.js as the second param. This allows you to set options without any unintended side effects.

#### v0.4.x

```js
currency.settings.separator = " ";
currency.settings.decimal = ",";
currency.settings.symbol = "€";
currency.settings.formatWithSymbol = true;
```

#### v1.x

```js
currency(1.23, { separator: " ", decimal: ",", symbol: "€", formatWithSymbol: true })
```

If you need to work with multiple currency values, the easiest way is to setup factory functions with your required currency settings.

```js
const USD = value => currency(value, { symbol: "$", precision: 2 });
const JPY = value => currency(value, { symbol: "¥", precision: 0 });
const GAS = value => currency(value, { precision: 3 });

USD(1234.56).format(true); // "$1,234.56"
JPY(1234.56).format(true); // "¥1,235"
GAS(1234.56).format(true); // "$1,234.560"
```

## Add-ons

* [babel-plugin-transform-currency-operators](https://github.com/scurker/babel-plugin-transform-currency-operators): An experimental babel plugin for transforming currency operations `currency(1.23) + 4.56` to `currency(1.23).add(4.56)`.

## Other Libraries

Maybe currency.js isn't the right fit for your needs. Check out some of these other fine libraries:

* [accounting.js](https://github.com/openexchangerates/accounting.js)
* [dinero.js](https://github.com/sarahdayan/dinero.js)
* [walletjs](https://github.com/dleitee/walletjs)

## License

[MIT](/license)

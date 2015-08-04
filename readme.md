currency.js [![Build Status](https://travis-ci.org/scurker/currency.js.svg?branch=master)](https://travis-ci.org/scurker/currency.js) [![npm](https://img.shields.io/npm/v/currency.js.svg?style=flat)](https://www.npmjs.com/package/currency.js) ![bower](https://img.shields.io/bower/v/currency.js.svg)
===========

*currency.js* is a lightweight javascript library for working with currency values. It was built to work around floating point issues in javascript. This [talk by Bartek Szopka](http://www.youtube.com/watch?v=MqHDDtVYJRI) explains in detail why javascript has floating point issues.

currency.js works with values as integers behind the scenes, resolving some of the most basic precision problems.

```javascript
2.51 + .01;                   // 2.5199999999999996
currency(2.51).add(.01);      // 2.52

2.52 - .01;                   // 2.5100000000000002
currency(2.52).subtract(.01); // 2.51
```

This should work for most *reasonable* values of currencies. As long as your currency values are less than 2<sup>53</sup> (in cents) or 90,071,992,547,409.91 you should be okay.

### Usage

Currency will accept numbers, strings, or the currency object itself as values.

```javascript
currency(123);      // 123.00
currency(1.23);     // 1.23
currency("1.23")    // 1.23
currency("$12.30")  // 12.30

var value = currency('123.45');
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
currency('2,573,693.75').add('100,275.50').format();  // '2,673,969.25'
currency('1,237.72').subtract(300).format();          // '937.72'
```

You can also change the format, localizing the decimal and/or delimiter to your locale.

```javascript
currency.settings.separator = '.';
currency.settings.decimal = ',';
currency('2.573.693,75').add('100.275,50').format();  // '2.673.969,25'
currency('1.237,72').subtract(300).format();          // '937,72'
```

View more examples and full documentation at [scurker.github.io/currency.js](http://scurker.github.io/currency.js).

### Installation

**Install via npm**

* The latest version ```npm install currency.js```
* Or GitHub master branch ```npm install scurker/currency.js```

**Install via bower**

* The latest version ```bower install currency.js```
* Or GitHub master branch ```bower install scurker/currency.js```

**Local Development**

Running locally? You will need [grunt](http://gruntjs.com/) and optionally Java if you want to minify currency.js

1. `npm install`
1. `grunt`

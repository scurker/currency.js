currency.js
===========

*currency.js* is a lightweight javascript library for working with currency values. It was built to work around floating point issues in javascript. This [talk by Bartek Szopka](http://www.youtube.com/watch?v=MqHDDtVYJRI) explains in detail why javascript has floating point issues.

**Examples**
```javascript
currency(123.50).add(0.23);       // 123.73
currency(5.00).subtract(0.50);    // 4.50
currency(45.25).multiply(3);      // 135.75
currency(1.12).distribute(5);     // [0.23, 0.23, 0.22, 0.22, 0.22]
```

Also included is a basic formatter, that allows you to work with and output strings.
```javascript
currency('2,573,693.75').add('100,275.50').format();  // '2,673,969.25'
currency('1,237.72').subtract(300).format();          // '937.72'
```

You can also change the format, converting to international values.
```javascript
currency.settings.seperator = '.';
currency.settings.decimal = ',';
currency('2.573.693,75').add('100.275,50').format();  // '2.673.969,25'
currency('1.237,72').subtract(300).format();          // '937,72'
```

View more examples and documentation at [scurker.github.io/currency.js](http://scurker.github.io/currency.js).

**Install via npm**

*currency.js* is also available from npm:

* The latest version ```npm install currency.js```
* Or GitHub master branch ```npm install scurker/currency.js```

**Local Development**

Running locally? Everything is built with Grunt.

1. `npm install`
1. `grunt`
currency.js
===========

*currency.js* is a lightweight Javascript library for working with currency values.

**Examples**
```javascript
currency(123.50).add(0.23);       // 123.73
currency(5.00).subtract(0.50)     // 4.50
currency(45.25).multiply(3);      // 135.75
currency(1.12).distribute(5);     // [0.23, 0.23, 0.22, 0.22, 0.22]
```

Also included is a basic formatter, that allows you to work with and output strings.
```javascript
currency('2,573,693.75').add('100,275.50').format();  // '2,673,969.25'
currency('1,237.72').subtract(300).format();          // '937.72'
```

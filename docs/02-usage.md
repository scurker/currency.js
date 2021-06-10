## Usage

*currency.js* was built to work around common floating point issues in javascript with a flexible api.

When working with currencies, decimals only need to be precise up to the smallest cent value while avoiding common floating point errors when performing basic arithmetic. *currency.js* resolves this issue by working with integers behind the scenes, so you don't have to be concerned about decimal precision.

For more details on why Javascript has issues with floating point numbers, there's an excellent talk by Bartek Szopka on [everything you never wanted to know about Javascript numbers](http://www.youtube.com/watch?v=MqHDDtVYJRI) explaining why Javascript and other IEEE 754 implementations have floating point issues.

*currency.js* will work with a range of inputs, including `strings`, `numbers`, `decimals`, or another `currency` object.

```js
// Numbers
currency(1); // => "1.00"
currency(123); // => "123.00"

// Decimals
currency(1.00); // => "1.00"
currency(1.23); // => "1.23"

// Strings
currency("1.23"); // => "1.23"
currency("$12.30"); // => "12.30"
currency("£1,234,567.89"); // => "1,234,567.89"

// Currency
let c1 = currency(1.23);
let c2 = currency(4.56);
currency(7.89).add(c1).add(c2); // => "13.68"
```

Currency values are handled transparently behind the scenes, so you don't have to worry about those pesky floating point issues!

```js
2.51 + .01;                   // => 2.5199999999999996
currency(2.51).add(.01);      // => 2.52

2.52 - .01;                   // 2.5100000000000002
currency(2.52).subtract(.01); // 2.51
```

Since *currency.js* handles values internally as integers, there is a limit to the precision that can be stored before encountering precision errors. This should be okay for most reasonable values of currencies. As long as your currencies are less than 2<sup>53</sup> (in cents) or `90,071,992,547,409.91`, you should not see any problems.

*currency.js* also works with a variety of strings. This makes it easy to work into your UI without having to do string to number conversion or vice versa.

```js
var c = currency("$1,234.56").add("890.12"); // 2124.68
c.format(); // 2,124.68

// Negative values
currency("-$5,000").add(1234.56);  // -3765.44
currency("($5,000)").add(1234.56); // -3765.44
```

By default, currency resolves to a `string` value.

```js
// Sets the first input to the resolved currency value
document.getElementsByTagName("input")[0].value = currency(1234.56).add(6.44); // 1241.00
```

*currency.js* stores values as both an `integer` and a `string`. If you need access to the raw numbers, you can access them with `.intValue` or `.value`;

```js
// Get the internal values
currency(123.45).add(.1).value; // => 123.55
currency(123.45).add(.1).intValue; // => 12355
```

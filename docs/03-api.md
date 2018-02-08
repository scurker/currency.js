---
toc: true
---

## Methods

{{{ toc }}}

### add

`currency.add( value )`

Adds a `string`, `number`, or `currency` value to the current currency instance.

```js
currency(123.45).add(.01); // => "123.46"
```

### subtract

`currency.subtract( value )`

Subtracts a `string`, `number`, or `currency` value to the current currency instance.

```js
currency(123.45).subtract(.01); // => "123.44"
```

### multiply

`currency.multiply( number )`

Multiplies the current currency instance by `number`.

```js
currency(123.45).multiply(2); // => "246.90"
```

### divide

`currency.divide( number )`

Divides the current currency instance by `number`.

```js
currency(123.45).divide(2); // => "61.73"
```

### distribute

`currency.distribute( number )`

Distribute takes the currency value, and tries to distribute the amount evenly. Any extra cents left over from the distribution will be stacked onto the first sets of entries.

```js
currency(12.35).distribute(3); // => [4.12, 4.12, 4.11]
currency(12.00).distribute(3); // => [4.00, 4.00, 4.00]
```

### format

`currency.format([ boolean ])`

A simple formatter that returns a human friendly currency format.

```js
currency(1000.00).format(); // => "1,000.00"
currency("1,234,567/90").add("200,000").format(); // => "1,434,567.89"
```

The default formatter can be overridden by passing in options as a second parameter.

```js
var euro = value => currency(value, { separator: ' ', decimal: ',' });

// ...

euro(1000.00).format(); // => "1 000,00"
euro(1234567.89).add("200 000").format(); // => "1 434 567,89"
```

You can also include the currently set `symbol` option in a couple of different ways. By default it's always turned off, but you can turn it on for all instances of the object via options, or by passing in a boolean operator to the `format()` function.

```js
var money = value => currency(value, { formatWithSymbol: true });

money(1000.00).format(); // => "$1,000.00"
money(1000.00).format(false); // => "1,000.00"
```

### dollars

`currency.dollars`

Returns the dollar value of the currency.

```js
currency(123.45).dollars(); // => 123
currency("0.99").dollars(); // => 0
```

### cents

`currency.cents`

Returns the cent value of the currency.

```js
currency(123.45).cents(); // => 45
currency("0.99").cents(); // => 99
```
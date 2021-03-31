---
toc: true
---

## API

{{{ toc }}}

## Properties

### value

`currency.value`

Returns the decimal value of the currency.

```js
currency("123.45").add(.01).value; // => 123.46
```

### intValue

`currency.intValue`

Returns the integer value of the currency.

```js
currency("123.45").add(.01).intValue; // => 12346
```

## Methods

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

`currency.format([ function | options ])`

A simple formatter that returns a human friendly currency format.

```js
currency(1000.00).format(); // => "$1,000.00"
currency("1,234,567/90").add("200,000").format(); // => "$1,434,567.89"
```

The default formatter can be overridden by passing in options as a second parameter.

```js
var euro = value => currency(value, { separator: ' ', decimal: ',', format: ... });

// ...

euro(1000.00).format(); // => "1 000,00"
euro(1234567.89).add("200 000").format(); // => "1 434 567,89"
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
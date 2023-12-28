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

### mapDistribute

`currency.mapDistribute( arrayToDistribute, callbackFn )`
`currency.mapDistribute( arrayToDistribute, callbackFn, thisArg )`

Map an array element distributing the currency value with the array element. See [distribute](#distribute)

#### Parameters

##### `arrayToDistribute`
The array to distribute the value to.

##### `callbackFn`
A function to execute for each element in the array and its own distribution. Its return value is added as a single element in the new array. The function is called with the following arguments:

> `element`
> &nbsp;&nbsp;&nbsp;&nbsp;The current element being processed in the array.
> `distributionElement`
> &nbsp;&nbsp;&nbsp;&nbsp;The current distribution element corresponding to the `element`.
> `index`
> &nbsp;&nbsp;&nbsp;&nbsp;The index of the current element being processed in the array.
> `array`
> &nbsp;&nbsp;&nbsp;&nbsp;The `arrayToDistribute` use on the whole distribution.

##### `thisArg` *optional*
A value to use as `this` when executing `callbackFn`.

```javascript
const paymentInstruments = ['CreditCard1', 'CreditCard2']
const mapped = currency(2.75).mapDistribute(paymentInstruments, callbackFn)
// => the callbackFn is called
// first with CreditCard1 and 1.38
// then CreditCard2 and 1.37

// and mapped would be the array of all the results of callbackFn
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

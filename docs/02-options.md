## Options

You can customize the formatting and parsing of `currency.js` with an optional options object. These values default to US centric currency values, but they can be overridden based on your locale.

### symbol *default*: `"$"`

When `formatWithSymbol` is set to `true`, this currency symbol will be used when calling `currency.format()`.

```js
currency(1.23, { formatWithSymbol: true }).format(); // => "$1.23"
```

### separator *default*: `","`

Separator between the number groupings when calling `currency.format()`.

```js
currency(1234.56, { separator: ',' }).format(); // => "1,234.56"
currency(1234.56, { separator: ' ' }).format(); // => "1 234.56"
```

### decimal *default*: `"."`

```js
currency(1.23, { decimal: '.' }).format(); // => "1.23"
currency(1.23, { decimal: ',' }).format(); // => "1,23"
```

### precision *default*: `2`

Number of decimal places to store as cents.

```js
currency(1.234, { precision: 2 }); // => "1.23"
currency(1.234, { precision: 3 }); // => "1.234"
```

### formatWithSymbol *default*: `false`

Includes the `symbol` option when calling `currency.format()`.

```js
currency(1.23, { formatWithSymbol: true }).format(); // => "$1.23"
currency(1.23, { formatWithSymbol: false }).format(); // => "1.23"
```

### pattern *default*: `!#`

Allows you to customize the format pattern using `!` as replacement for the currency symbol and `#` as replacement for the currency amount.

```js
currency(1.23, {
  pattern: `# !`,
  formatWithSymbol: true
}).format(); // => "1.23 $"
```

### negativePattern *default*: `-!#`

Allows you to customize the negative format pattern using `!` as replacement for the currency symbol and `#` as replacement for the currency amount.

```js
currency(-1.23, {
  negativePattern: `(!#)`,
  formatWithSymbol: true
}).format(); // => "($1.23)"
```

### errorOnInvalid *default*: `false`

If an invalid value such as `null` or `undefined` is passed in, `currency` will throw an error.

```js
currency(undefined, { errorOnInvalid: true }); // throws an error
```

### increment *default*: `null`

When implementing a currency that implements rounding, setting the `increment` value will allow you to set the closest increment to round the display value to.

```js
var currencyRounding = value => currency(value, { increment: .05 });
currencyRounding(1.09); // => { intValue: 109, value: 1.09 }
currencyRounding(1.09).format(); // => "1.10"
currencyRounding(1.06); // => { intValue: 106, value: 1.06 }
currencyRounding(1.06).format(); // => "1.05"
```

### useVedic *default*: `false`

When using a currency that implements the [Indian Numbering System](https://en.wikipedia.org/wiki/Indian_numbering_system), setting `useVedic` will format values with the correct groupings, i.e. `10,00,000.00`.

```js
currency(1234567.89, { useVedic: true }).format(); // => "12,34,567.89"
```

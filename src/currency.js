const defaults = {
  symbol: '$',
  separator: ',',
  decimal: '.',
  formatWithSymbol: false,
  errorOnInvalid: false,
  precision: 2
};

/**
 * Create a new instance of currency.js
 * @param {number|string|currency} value
 * @param {object} [opts]
 */
function currency(value, opts) {
  let that = this;

  if(!(that instanceof currency)) {
    return new currency(value, opts);
  }

  let settings = Object.assign({}, defaults, opts)
    , precision = Math.pow(10, settings.precision)
    , v = parse(value, settings);

  that.intValue = v;
  that.value = v / precision;
  that.settings = settings;
  that.precision = precision;
}

function parse(value, opts, round = true) {
  let v = 0
    , { decimal, errorOnInvalid, precision: decimals } = opts
    , precision = Math.pow(10, decimals);

  if (typeof value === 'number') {
    v = value * precision;
  } else if (value instanceof currency) {
    v = value.value * precision;
  } else if (typeof(value) === 'string') {
    let regex = new RegExp('[^-\\d' + decimal + ']', 'g')
      , decimalString = new RegExp('\\' + decimal, 'g');
    v = parseFloat(
          value
            .replace(/\((.*)\)/, '-$1')   // allow negative e.g. (1.99)
            .replace(regex, '')           // replace any non numeric values
            .replace(decimalString, '.')  // convert any decimal values
            * precision                   // scale number to integer value
        );
    v = v || 0;
  } else {
    if(errorOnInvalid) {
      throw Error("Invalid Input");
    }
    v = 0;
  }

  return round ? Math.round(v) : v;
}

currency.prototype = {

  /**
   * Adds values together.
   * @param {number} number
   * @returns {currency}
   */
  add(number) {
    let { intValue, settings, precision } = this;
    return currency((intValue += parse(number, settings)) / precision, settings);
  },

  /**
   * Subtracts value.
   * @param {number} number
   * @returns {currency}
   */
  subtract(number) {
    let { intValue, settings, precision } = this;
    return currency((intValue -= parse(number, settings)) / precision, settings);
  },

  /**
   * Multiplies values.
   * @param {number} number
   * @returns {currency}
   */
  multiply(number) {
    let { intValue, settings } = this;
    return currency((intValue *= parse(number, settings, false)) / Math.pow(10, settings.precision + 2), settings);
  },

  /**
   * Divides value.
   * @param {number} number
   * @returns {currency}
   */
  divide(number) {
    let { intValue, settings } = this;
    return currency(intValue /= parse(number, settings, false), settings);
  },

  /**
   * Takes the currency amount and distributes the values evenly. Any extra pennies
   * left over from the distribution will be stacked onto the first set of entries.
   * @param {number} count
   * @returns {array}
   */
  distribute(count) {
    let { intValue, precision, settings } = this
      , distribution = []
      , split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count)
      , pennies = Math.abs(intValue - (split * count));

    for (; count !== 0; count--) {
      let item = currency(split / precision, settings);

      // Add any left over pennies
      pennies-- > 0 && (item = parseFloat(item) >= 0 ? item.add(1 / precision) : item.subtract(1 / precision));

      distribution.push(item);
    }

    return distribution;
  },

  /**
   * Returns the dollar value.
   * @returns {number}
   */
  dollars() {
    return ~~this.value;
  },

  /**
   * Returns the cent value.
   * @returns {number}
   */
  cents() {
    let { intValue, precision } = this;
    return ~~(intValue % precision);
  },

  /**
   * Formats the value as a string according to the formatting settings.
   * @param {boolean} useSymbol - format with currency symbol
   * @returns {string}
   */
  format(useSymbol) {
    let { formatWithSymbol, symbol, separator, decimal } = this.settings;

    // set symbol formatting
    typeof(useSymbol) === 'undefined' && (useSymbol = formatWithSymbol);

    return ((useSymbol ? symbol : '') + this)
      .replace(/(\d)(?=(\d{3})+\b)/g, '$1' + separator)
      // replace only the last decimal
      .replace(/\.(\d+)$/, decimal + '$1');
  },

  /**
   * Formats the value as a string according to the formatting settings.
   * @returns {string}
   */
  toString() {
    let { intValue, precision, settings } = this;
    return (intValue / precision).toFixed(settings.precision);
  },

  /**
   * Value for JSON serialization.
   * @returns {float}
   */
  toJSON() {
    return this.value;
  }

};

export default currency;
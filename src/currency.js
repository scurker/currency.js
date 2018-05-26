const defaults = {
  symbol: '$',
  separator: ',',
  decimal: '.',
  formatWithSymbol: false,
  errorOnInvalid: false,
  precision: 2,
  postProcess: null,
  sign: {
    position: 'between', // Possible options: between, start, end
    showPositive: false
  }
};

const round = v => Math.round(v);
const pow = p => Math.pow(10, p);
const rounding = (value, increment) => round(value / increment) * increment;

const groupRegex = /(\d)(?=(\d{3})+\b)/g;
const vedicRegex = /(\d)(?=(\d\d)+\d\b)/g;

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
    , precision = pow(settings.precision)
    , v = parse(value, settings);

  settings.sign = Object.assign({}, defaults.sign, settings.sign);

  that.intValue = v;
  that.value = v / precision;

  // Set default incremental value
  settings.increment = settings.increment || (1 / precision);

  // Support vedic numbering systems
  // see: https://en.wikipedia.org/wiki/Indian_numbering_system
  if(settings.useVedic) {
    settings.groups = vedicRegex;
  } else {
    settings.groups = groupRegex;
  }

  // Intended for internal usage only - subject to change
  this._settings = settings;
  this._precision = precision;
}

function parse(value, opts, useRounding = true) {
  let v = 0
    , { decimal, errorOnInvalid, precision: decimals } = opts
    , precision = pow(decimals)
    , isNumber = typeof value === 'number';

  if (isNumber || value instanceof currency) {
    v = ((isNumber ? value : value.value) * precision);
  } else if (typeof value === 'string') {
    let regex = new RegExp('[^-\\d' + decimal + ']', 'g')
      , decimalString = new RegExp('\\' + decimal, 'g');
    v = value
          .replace(/\((.*)\)/, '-$1')   // allow negative e.g. (1.99)
          .replace(regex, '')           // replace any non numeric values
          .replace(decimalString, '.')  // convert any decimal values
          * precision;                  // scale number to integer value
    v = v || 0;
  } else {
    if(errorOnInvalid) {
      throw Error('Invalid Input');
    }
    v = 0;
  }

  // Handle additional decimal for proper rounding
  v = v.toFixed(1);

  return useRounding ? round(v) : v;
}

currency.prototype = {

  /**
   * Adds values together.
   * @param {number} number
   * @returns {currency}
   */
  add(number) {
    let { intValue, _settings, _precision } = this;
    return currency((intValue += parse(number, _settings)) / _precision, _settings);
  },

  /**
   * Subtracts value.
   * @param {number} number
   * @returns {currency}
   */
  subtract(number) {
    let { intValue, _settings, _precision } = this;
    return currency((intValue -= parse(number, _settings)) / _precision, _settings);
  },

  /**
   * Multiplies values.
   * @param {number} number
   * @returns {currency}
   */
  multiply(number) {
    let { intValue, _settings } = this;
    return currency((intValue *= number) / pow(_settings.precision), _settings);
  },

  /**
   * Divides value.
   * @param {number} number
   * @returns {currency}
   */
  divide(number) {
    let { intValue, _settings } = this;
    return currency(intValue /= parse(number, _settings, false), _settings);
  },

  /**
   * Takes the currency amount and distributes the values evenly. Any extra pennies
   * left over from the distribution will be stacked onto the first set of entries.
   * @param {number} count
   * @returns {array}
   */
  distribute(count) {
    let { intValue, _precision, _settings } = this
      , distribution = []
      , split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count)
      , pennies = Math.abs(intValue - (split * count));

    for (; count !== 0; count--) {
      let item = currency(split / _precision, _settings);

      // Add any left over pennies
      pennies-- > 0 && (item = intValue >= 0 ? item.add(1 / _precision) : item.subtract(1 / _precision));

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
    let { intValue, _precision } = this;
    return ~~(intValue % _precision);
  },

  /**
   * Put sign and symbol in required place.
   * @desc You can override this function by passing new function as the second argument to "format" method.
   * @param {string} symbol - currency symbol. Could be an empty string.
   * @param {string} result - pre-formatted currency value without symbol and sign. Please note, it's always be positive!
   * @param {object} signOptions - options for sign
   * @param {string} signOptions.position - describe position where sign should be placed. Possible values: "between", "start", "end".
   * @param {boolean} signOptions.showPositive - show sign "+" or not.
   * @param {boolean} isPositive - Indicates whether result is positive.
   * @return {string} - Formatted result as a string
   * @private
   */
  _postProcess({ symbol, result, signOptions, isPositive }) {
    const
      positiveSign = signOptions.showPositive ? '+' : '',
      sign = isPositive ? positiveSign : '-',
      cases = {
        'between': () => symbol + sign + result,
        'start':  () => sign + symbol + result,
        'end': () => symbol + result + sign,
      };

    return cases[signOptions.position]();
  },

  /**
   * Formats the value as a string according to the formatting settings.
   * @param {boolean} useSymbol - format with currency symbol
   * @param {function} processFunc - function that overrides default post-processing step.
   * Could be useful when you want to get currency in some absolutely different format, like "($100)" for negative values.
   * @returns {string}
   */
  format(useSymbol, processFunc) {
    const { formatWithSymbol, symbol, separator, decimal, groups, sign, postProcess } = this._settings
      , [dollars, cents] = this.toString().split('.')
      , isPositive = dollars[0] !== '-'
      , positiveDollarsVal =isPositive ? dollars : dollars.slice(1);

    // set symbol formatting
    typeof(useSymbol) === 'undefined' && (useSymbol = formatWithSymbol);

    const head = positiveDollarsVal.replace(groups, '$1' + separator)
      , tail = cents ? decimal + cents : ''
      , process = processFunc || postProcess || this._postProcess
      , config = {
          symbol: (useSymbol ? symbol : ''),
          result: head + tail,
          signOptions: sign,
          isPositive,
        };

    return process.call(this, config);
  },

  /**
   * Formats the value as a string according to the formatting settings.
   * @returns {string}
   */
  toString() {
    let { intValue, _precision, _settings } = this;
    return rounding(intValue / _precision, _settings.increment).toFixed(_settings.precision);
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
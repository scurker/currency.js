/*!
 * currency.js v0.1.1
 * github.com/scurker/currency.js
 */
(function(window) {

  /**
   * Create a new instance of currency.js
   * {number|string|currency}
   */
  var currency = function(value) {
    var that = this;

    if(!(that instanceof currency)) {
      return new currency(value);
    }

    // Set value
    that.value = parse(value);
  };

  // currency.js version
  currency.version = '0.1.1';

  // Default options
  var settings = currency.settings = {
    symbol: '$'
    , seperator: ','
    , decimal: '.'
  };

  // Convert a number to a normalized value
  function parse(value, round) {
    var v = 0;

    // Set default rounding
    typeof(round) === undefined && (round = true);

    if (typeof value === 'number') {
      v = value * 100;
    } else if (value instanceof currency) {
      v = value.value;
    } else {
      var regex = new RegExp('[^-\\d' + settings.decimal + ']', 'g');
      v = parseFloat(
            value
              .replace(/\((.*)\)/, '-$1') // allow negative e.g. (1.99)
              .replace(regex, '')         // replace any non numeric values
              * 100                       // scale number to integer value
          );
      v = isNaN(v) ? 0 : v;
    }

    return round ? Math.round(v) : v;
  }

  currency.prototype = {

    add: function(number) {
      var v = this.value;
      return currency((v += parse(number)) / 100);
    },

    subtract: function(number) {
      var v = this.value;
      return currency((v -= parse(number)) / 100);
    },

    multiply: function(number) {
      var v = this.value;
      return currency((v *= parse(number, true)) / 10000);
    },

    divide: function(number) {
      var v = this.value;
      return currency(v /= parse(number, true));
    },

    distribute: function(count) {
      var value = this.value
        , distribution = []
        , split = Math[value >= 0 ? 'floor' : 'ceil'](value / count)
        , pennies = Math.abs(value - (split * count));

      for(; count != 0; count--) {
        var item = new currency(split / 100);

        // Add any left over pennies
        pennies-- > 0 && (item = parseFloat(item) >= 0 ? item.add(.01) : item.subtract(.01));

        distribution.push(item);
      }

      return distribution;
    },

    dollars: function() {
      return Math.round(this.value / 100);
    },

    cents: function() {
      return Math.round(this.value % 100);
    },

    format: function() {
      return (this + '')
        .replace(/(\d)(?=(\d{3})+\b)/g,'$1' + settings.seperator)
        // replace any decimals
        .replace(/\./, settings.decimal);
    },

    toString: function() {
      return (this.value / 100).toFixed(2);
    }

  };

  window.currency = currency;

})(window);
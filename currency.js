/*!
 * currency.js - v0.2.0
 * http://scurker.github.io/currency.js
 *
 * Copyright (c) 2014 Jason Wilson
 * Released under MIT license
 */
(function(global) {
  "use strict";

  /**
   * Create a new instance of currency.js
   * {number|string|currency}
   */
  var currency = function(value) {
    var that = this;

    if (!(that instanceof currency)) {
      return new currency(value);
    }

    // Set int/real values
    that.intValue = parse(value);
    that.value = that.intValue / 100;
  };

  // currency.js version
  currency.version = '0.2.0';

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
    typeof(round) === 'undefined' && (round = true);

    if (typeof value === 'number') {
      v = value * 100;
    } else if (value instanceof currency) {
      v = value.intValue;
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
      var v = this.intValue;
      return currency((v += parse(number)) / 100);
    },

    subtract: function(number) {
      var v = this.intValue;
      return currency((v -= parse(number)) / 100);
    },

    multiply: function(number) {
      var v = this.intValue;
      return currency((v *= parse(number, false)) / 10000);
    },

    divide: function(number) {
      var v = this.intValue;
      return currency(v /= parse(number, false));
    },

    distribute: function(count) {
      var value = this.intValue
        , distribution = []
        , split = Math[value >= 0 ? 'floor' : 'ceil'](value / count)
        , pennies = Math.abs(value - (split * count));

      for (; count != 0; count--) {
        var item = currency(split / 100);

        // Add any left over pennies
        pennies-- > 0 && (item = parseFloat(item) >= 0 ? item.add(.01) : item.subtract(.01));

        distribution.push(item);
      }

      return distribution;
    },

    dollars: function() {
      return Math.round(this.intValue / 100);
    },

    cents: function() {
      return Math.round(this.intValue % 100);
    },

    format: function() {
      var v = (this + '').split('.');

      return v[0].replace(/(\d)(?=(\d{3})+\b)/g,'$1' + settings.seperator) + settings.decimal + v[1];
    },

    toString: function() {
      return (this.intValue / 100).toFixed(2);
    },

    toJSON: function() {
      return this.value;
    }

  };

  var noGlobal = typeof global === 'undefined';
  if (noGlobal && typeof module === 'object' && typeof module.exports == 'object') {
    module.exports = currency;
  } else if (!noGlobal) {
    global.currency = currency;
  }

})(typeof window !== 'undefined' ? window : undefined);
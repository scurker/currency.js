import currency from './currency.js';

function CurrencyIntl(value, opts) {
  let options = Object.assign({
      locale: 'auto',
      currency: 'USD'
    },
    opts,
    {
      format: (currency, options) => {
        return new Intl.NumberFormat(
          options.locale === 'auto' && navigator ? navigator.language : options.locale || 'en-us',
          {
            style: 'currency',
            currency: options.currency
          }
        ).format(currency.value);
      }
    }
  );

  return currency(value, options);
}

export default CurrencyIntl;
declare namespace currency {
  type Any = number | string | currency;
  type Format = (currency?: currency, opts?: Options) => string;
  interface Constructor {
    (value: currency.Any, opts?: currency.Options): currency,
    new (value: currency.Any, opts?: currency.Options): currency
  }
  interface IntlConstructor {
    (value: currency.Any, opts?: currency.IntlOptions): currencyIntl,
    new (value: currency.Any, opts?: currency.IntlOptions): currencyIntl
  }
  interface Options {
    symbol?: string,
    separator?: string,
    decimal?: string,
    errorOnInvalid?: boolean,
    precision?: number,
    increment?: number,
    useVedic?: boolean,
    pattern?: string,
    negativePattern?: string,
    format?: currency.Format
  }
  interface IntlOptions extends Options {
    locale?: string;
    currency?: string;
  }
}

declare interface currency {
  add(number: currency.Any): currency;
  subtract(number: currency.Any): currency;
  multiply(number: currency.Any): currency;
  divide(number: currency.Any): currency;
  distribute(count: number): Array<currency>;
  dollars(): number;
  cents(): number;
  format(opts?: currency.Options | currency.Format): string;
  toString(): string;
  toJSON(): number;
  readonly intValue: number;
  readonly value: number;
}

declare interface currencyIntl extends currency {
  format(opts?: currency.IntlOptions | currency.Format): string;
}

declare const currency : currency.Constructor;
declare const currencyIntl : currency.IntlConstructor;

declare module 'currency.js' {
  export = currency;
}

declare module 'currency.js/intl' {
  export = currencyIntl;
}
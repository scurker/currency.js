declare module 'currency.js' {
  namespace currency {
    type Any = number | string | currency;
    type Format = (currency?: currency, opts?: Options) => string;
    interface Constructor {
      (value: currency.Any, opts?: currency.Options): currency,
      new(value: currency.Any, opts?: currency.Options): currency
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
      format?: currency.Format,
      fromCents?: boolean
    }
  }

  interface currency {
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

  const currency: currency.Constructor;

  export = currency;
}

declare namespace currency {
  type Any = number | string | currency;
  interface Constructor {
    (value: currency.Any, opts?: currency.Options): currency,
    new (value: currency.Any, opts?: currency.Options): currency
  }
  interface Options {
    symbol?: string,
    separator?: string,
    decimal?: string,
    formatWithSymbol?: boolean,
    errorOnInvalid?: boolean,
    precision?: number,
    increment?: number
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
  format(useSymbol?: boolean): string;
  toString(): string;
  toJSON(): number;
  readonly intValue: number;
  readonly value: number;
}

declare const currency : currency.Constructor;

export = currency;

declare module 'currency.js' {
  export default currency;
}
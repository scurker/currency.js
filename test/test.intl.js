import test from 'ava';
import sinon, { spy, stub } from 'sinon';
import currency from '../src/currency.intl';

let intlSpy, formatSpy;

test.beforeEach(() => {
  formatSpy = spy();
  // eslint-disable-next-line no-empty-function
  global.Intl.NumberFormat = () => {};
  global.navigator = { language: 'en-us' };
  intlSpy = stub(global.Intl, 'NumberFormat').returns({ format: formatSpy });
});

test.afterEach(() => {
  sinon.reset();
});

test.serial('should use Intl.NumberFormat for formatting', t => {
  currency(123.45).format();
  t.true(intlSpy.called);
  t.true(formatSpy.called);
});

test.serial('should pass currency as default style', t => {
  currency(123.45).format();
  t.true(intlSpy.calledWithMatch('en-us', { style: 'currency' }));
});

test.serial('should autodetect locale', t => {
  global.navigator = { language: 'en-gb' };
  currency(123.45).format();
  t.true(intlSpy.calledWithMatch('en-gb'));
});

test.serial('should use currency options locale', t => {
  global.navigator = { language: 'en-us' };
  currency(123.45, { locale: 'en-gb' }).format();
  t.true(intlSpy.calledWithMatch('en-gb'));
});

test.serial('should use format options locale', t => {
  global.navigator = { language: 'en-us' };
  currency(123.45).format({ locale: 'en-gb' });
  t.true(intlSpy.calledWithMatch('en-gb'));
});

test.serial('should use currency options currency', t => {
  currency(123.45, { currency: 'EUR' }).format();
  t.true(intlSpy.calledWithMatch('en-us', { currency: 'EUR' }));
});

test.serial('should use format options currency', t => {
  currency(123.45).format({ currency: 'EUR' });
  t.true(intlSpy.calledWithMatch('en-us', { currency: 'EUR' }));
});

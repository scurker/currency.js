**1.1.4**

* Fixed rounding for string values. ([#116](https://github.com/scurker/currency.js/issues/116)) thanks [@pdcmoreira](https://github.com/pdcmoreira)

**1.1.3**

* Fixed grouping separator for numbers with 0 precision. ([#109](https://github.com/scurker/currency.js/issues/109)) thanks [@hameedraha](https://github.com/hameedraha)

**1.1.2**

* Fixed rounding not always being consistent with half cent values and high precision. ([#102](https://github.com/scurker/currency.js/pull/102)) thanks [@philippetrepanier](https://github.com/philippetrepanier)
* Fixed comma separator appearing in decimals when formatting. ([#104](https://github.com/scurker/currency.js/pull/104)) thanks [@lanceli](https://github.com/lanceli)

**1.1.1**

* Fixed negative distribution values. ([#99](https://github.com/scurker/currency.js/pull/99)) thanks [@andrewkatz](https://github.com/andrewkatz)

**1.1.0**

* `useVedic` option added for displaying groupings using the Indian Numbering System. ([#74](https://github.com/scurker/currency.js/issues/74))
* `increment` option added for incremental rounding on display. ([#70](https://github.com/scurker/currency.js/issues/70))
* Documentation updated to be built from source; should help keep documentation in sync.

**1.0.8**

* Changed module `export default currency` to `export = currency` for Typescript definition. ([#88](https://github.com/scurker/currency.js/issues/88) thanks [@arturnt](https://github.com/arturnt))

**1.0.6**

* Fixed travis deployments. ([#79](https://github.com/scurker/currency.js/issues/79))

**1.0.5**

* Removed `static` properties from flow definition files.

**1.0.2**

* Fixed multiplying with precisions other than 2. ([#76](https://github.com/scurker/currency.js/issues/76) thanks [@usb248](https://github.com/usb248))

**1.0.1**

* Fixed default imports for Typescript. ([#73](https://github.com/scurker/currency.js/issues/73) thanks [@shepherdwind](https://github.com/shepherdwind))

**1.0.0**

* Node < 4 support dropped.
* Separate UMD, ES6, CommonJS modules now available.
* Global currency settings removed. Settings are now passed per currency.js instance.
* Different precision currencies supported. ([#29](https://github.com/scurker/currency.js/issues/29))
* Added Typescript definition. ([#36](https://github.com/scurker/currency.js/issues/36))
* Added Flow definition. ([#37](https://github.com/scurker/currency.js/issues/37))

**0.4.4**

* Fix for currency.min.js being compiled incorrectly.

**0.4.3**

* Added AMD support.
* Fixed issue resolving bundling with webpack/browserify. ([#24](https://github.com/scurker/currency.js/issues/24))
* Updated to latest closure compiler for minification.

**0.4.2**

* Whitelist currency.js files for smaller npm size.

**0.4.1**

* Switched to mocha for testing and added test coverage.

**0.4.0**

* Removed deprecated "seperator" option, is now "separator".
* Currency can now throw an error with undefined inputs with the `errorOnInvalid` option set to true.

**v0.3.4**

* Fix bower package management.

**v0.3.2**

* Fix spelling of "seperator" to "separator".
* Automatic publish to npm when tags are pushed to master.

**v0.3.1**

* Added bower support.

**v0.3.0**

* Added new format option to optionally include the set currency symbol.
* Added travis ci integration.
* Fixed issue where international values were not being formatted correctly. ([#6](https://github.com/scurker/currency.js/issues/6))

**v0.2.0**

* Adding nodejs / commonjs support

**v0.1.4**

* Fixes issue with serializing currency via JSON.stringify ([#1](https://github.com/scurker/currency.js/issues/1))
* Added grunt tasks

**v0.1.3**

* Switching value returned to be the real float value and not the int value.

**v0.1.2**

* Fixed issue with rounding not being defaulted correctly.

**v0.1.1**

* Fixed issue with multiplication/division not allowing precision beyond 2 decimal points.

**v0.1** - Initial version
import pkg from '../package.json';

export default `/*!
 * ${pkg.name} - v${pkg.version}
 * ${pkg.homepage}
 *
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
 * Released under MIT license
 */
`;
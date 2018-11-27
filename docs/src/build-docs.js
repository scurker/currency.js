import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import gzipSize from 'gzip-size';
import prettyBytes from 'pretty-bytes';
import cheerio from 'cheerio';
import highlight from 'highlight.js';
import metalsmith from 'metalsmith';
import ignore from 'metalsmith-ignore';
import markdown from 'metalsmith-markdown';
import handlebars from 'handlebars';
import minimatch from 'minimatch';
import pkg from '../../package.json';

// Configure Highlight.js
highlight.configure({ classPrefix: '' });
const hljs = (code, lang) => !lang ? highlight.highlightAuto(code).value : highlight.highlight(lang, code).value;

function concatFiles(files, metalsmith, done) {
  setImmediate(done);

  const regexMatch = /^(\d+)-/i
      , fileNames = Object.keys(files).filter(name => regexMatch.test(name)).sort();

  let combined = fileNames
    .map(name => ({ name, file: files[name] }))
    .reduce(({ name, file }, { file: nextFile }) => {
      file.contents = new Buffer([file.contents.toString(), `<section>${nextFile.contents.toString()}</section>`].join('\n'));
      return { name, file };
    });

  let { name, file } = combined;
  files[name.replace(regexMatch, '')] = file;

  fileNames.forEach(name => {
    delete files[name];
  });
}

function tableOfContents(files) {
  Object.keys(files).forEach(name => {
    let file = files[name]
      , toc = '';

    if(!file.toc) {
      return;
    }

    let $ = cheerio.load(file.contents.toString())
      , sections = $('h3[id]');

    sections.each(function() {
      let $that = $(this);
      toc += `<li><a href="#${$that.attr('id')}">${$that.text()}</a></li>`;
    });

    file.toc = `<ul>${toc}</ul>`;
  });
}

async function layout(files, metadata) {
  let layout = await promisify(fs.readFile)(path.resolve(__dirname, './layouts/index.hbs'))
    , compiledLayout = handlebars.compile(layout.toString());

  Object.keys(files)
    .filter(file => minimatch(file, '*.html'))
    .forEach(name => files[name].contents = new Buffer(compiledLayout(Object.assign({}, metadata, { contents: files[name].contents }))));
}

async function hbs(files, metalsmith) {
  let metadata = metalsmith.metadata();

  Object.keys(files).forEach(name => {
    let file = files[name]
      , compiled = handlebars.compile(file.contents.toString());
    files[name].contents = new Buffer(compiled(Object.assign({}, metadata, file)));
  });
}

(async () => {
  metalsmith(path.resolve(__dirname, '../'))
    .source('.')
    .use(ignore('src/**/*'))
    .metadata({
      title: 'currency.js',
      description: pkg.description,
      version: pkg.version,
      dist: pkg.browser,
      size: prettyBytes(await gzipSize.file(path.resolve(__dirname, '../../', pkg.browser)))
    })
    .use(markdown({
      highlight: hljs
    }))
    .use(tableOfContents)
    .use(hbs)
    .use(concatFiles)
    .use(layout)
    .build(err => {
      if(err) {
        throw err;
      }
    });
})();
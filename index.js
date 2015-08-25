'use strict';

var path = require('path');

var transformTools = require('browserify-transform-tools');
var convertSourceMap = require('convert-source-map');
var assign = require('object-assign');


var defaults = {
  root: process.cwd(),
  sourceRoot: '/',
};

module.exports = transformTools.makeStringTransform(
  'source-map-path-normalizify',
  function (content, transformOptions, done) {
    var options = assign({}, defaults, transformOptions.config);
    var sourceMap = convertSourceMap.fromSource(content);

    if (!sourceMap) {
      return done(null, content);
    }

    var sources = sourceMap.getProperty('sources');

    sourceMap.setProperty('sources', sources.map(function (source) {
      // The path will be relative to the __dirname.
      // Also, replace "\" with "/" on Windows.
      return path.relative(options.root, source).replace(/\\/g, '/');
    }));

    sourceMap.setProperty('sourceRoot', options.sourceRoot);

    // Remove the old source map and append new
    var result = convertSourceMap.removeComments(content) +
                 sourceMap.toComment();

    done(null, result);
  }
);

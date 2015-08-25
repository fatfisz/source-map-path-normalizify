'use strict';

var path = require('path');

var transformTools = require('browserify-transform-tools');
var convertSourceMap = require('convert-source-map');
var assign = require('object-assign');


var defaults = {
  root: process.cwd(),
  sourceRoot: '/',
};

function transformPath(root, from, to) {
  return root + path.relative(from, to).replace(/\\/g, '/');
}

module.exports = transformTools.makeStringTransform(
  'source-map-path-normalizify',
  function (content, transformOptions, done) {
    var options = assign({}, defaults, transformOptions.config);
    var transformer = transformPath.bind(null, options.sourceRoot, options.root);

    var sourceMap = convertSourceMap.fromSource(content);

    if (!sourceMap) {
      return done(null, content);
    }

    var sources = sourceMap.getProperty('sources');

    sourceMap.setProperty('sources', sources.map(transformer));

    // Remove the old source map and append new
    var result = convertSourceMap.removeComments(content) +
                 sourceMap.toComment();

    done(null, result);
  }
);

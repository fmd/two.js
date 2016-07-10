'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('lodash');
var path = require('path');

var customOpts = {
  entries: ['./src/examples/basic.es6'],
  extensions: ['.es6'],
  debug: true
};

var babelOpts = {
  extensions: ['.es6'],
  presets: ['es2015'],
  sourceMapRelative: path.resolve(__dirname, 'src')
};

var opts = _.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)).transform(babelify.configure(babelOpts))

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('example.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

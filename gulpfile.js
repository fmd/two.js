var gulp = require('gulp');
var gutil = require('gutil');
var watchify = require('watchify');

var fs = require('fs'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    path = require('path');

gulp.task('default', function () {
  browserify({
    debug: true,
    extensions: ['.es6'],
    entries: ['src/examples/basic.es6'],
    plugin: [watchify]
  }).transform(babelify.configure({
    extensions: ['.es6'],
    presets: ['es2015'],
    sourceMapRelative: path.resolve(__dirname, 'src')
  })).bundle()
     .on('error', gutil.log)
     .pipe(fs.createWriteStream('dist/example.js'));
});

var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');

gulp.task('default', function() {
  var b = browserify({
    entries: ['src/two.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  b.on('update', bundle);
  bundle();

  function bundle() {
    b.bundle().pipe(fs.createWriteStream('dist/two.js'));
  }
});

var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');

gulp.task('default', function() {
  browserify('./src/two.js')
    .transform('babelify')
    .bundle()
    .pipe(fs.createWriteStream('dest/two.js'));
});

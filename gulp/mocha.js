/*eslint-disable no-process-exit */
'use strict';
var mocha = require('gulp-mocha');

module.exports = function(gulp, conf) {
  gulp.task('unit', function() {
    return gulp.src(conf.build.unit, {
        read: false
      })
      .pipe(mocha({
        reporter: 'spec'
      }))
      .on('error', function() {
        gulp.fail = true;
      })
      .once('end', function() {
        process.exit();
      });
  });

  gulp.task('func', function() {
    return gulp.src(conf.build.func, {
        read: false
      })
      .pipe(mocha({
        reporter: 'spec'
      }))
      .on('error', function() {
        gulp.fail = true;
      })
      .once('end', function() {
        process.exit();
      });
  });
};

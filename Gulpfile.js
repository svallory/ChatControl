var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('dist', function () {
  gulp.src([
      'global/*.js'
    ])
    .pipe(concat('global.js'))
    .pipe(gulp.dest('dist'));

  gulp.src([
      '**/*.css'
    ])
    .pipe(concat('ecci.css'))
    .pipe(gulp.dest('dist'));

  return gulp.src([
      'user-script.js',
      'helpers.js',
      'ticket/*.js'
    ])
    .pipe(concat('ticket.js')) //the name of the resulting file
    .pipe(gulp.dest('dist')) //the destination folder
});

gulp.task('default', function() {
  var watcher = gulp.watch('**/*.js', ['dist']);
  var watcher = gulp.watch('**/*.css', ['dist']);

  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

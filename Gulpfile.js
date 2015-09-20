var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('dist', ['clean'], function () {
  gulp.src('global/*.js')
    .pipe(concat('global.js'))
    .pipe(gulp.dest('./dist'));

  gulp.src([
      '**/styles.css'
    ])
    .pipe(concat('ecci.css'))
    .pipe(gulp.dest('./dist'));

  return gulp.src('ticket/*.js')
    .pipe(concat('ticket.js')) //the name of the resulting file
    .pipe(gulp.dest('./dist')) //the destination folder
});

gulp.task('clean', function () {
  return gulp.src('dist/*', {read: false}).pipe(clean());
});

gulp.task('default', ['dist']);

gulp.task('watch', function() {
  var watcher = gulp.watch('**/*.js', ['default']);
  var watcher = gulp.watch('**/*.css', ['default']);

  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

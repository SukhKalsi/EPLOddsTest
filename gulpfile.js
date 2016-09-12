var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var nodeMods = './node_modules/';
var srcDir = './src/';
var distDir = './dist/';

// browser sync for development purposes
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// start webserver for local environment
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done);
});

gulp.task('sass', function() {
  return gulp.src(srcDir + 'styles/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      style: 'expanded',
      errLogToConsole: false,
      onError: function(err) {
          return notify().write(err);
      }
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(distDir + 'styles'))
    .pipe(reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }));
});

gulp.task('icons', function() {
    return gulp.src(nodeMods + 'font-awesome/fonts/**.*')
        .pipe(gulp.dest(distDir + 'fonts/'));
});

gulp.task('browserify', function() {
  return browserify(srcDir + 'js/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(distDir + 'js/'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Default development task
gulp.task('default', ['browser-sync', 'icons', 'sass', 'browserify'], function() {
  gulp.watch('styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch([srcDir + 'views/*.html'], ['bs-reload']);
  gulp.watch([srcDir + 'js/**/*.js'], ['bs-reload']);
  gulp.watch([srcDir + 'styles/**/*.scss'], ['sass']);
});


// Build specific tasks

// delete build folder
gulp.task('clean:build', function (cb) {
  del([distDir], cb);
});

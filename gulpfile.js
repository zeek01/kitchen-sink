var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var nodemon      = require('gulp-nodemon');
var notify       = require('gulp-notify');
var gulpSize     = require('gulp-size');
var autoprefixer = require('gulp-autoprefixer');

var sassDevPath  = './scss/styles.scss';
var dest_path    = './public/'

gulp.task('scss', function(){
  gulp.src(sassDevPath)
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', notify.onError(function(error) {
      return 'SCSS error compile: ' + error.message + ' on line ' + error.lineNumber + ' in file ' + error.fileName;
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .on('error', notify.onError(function(error) {
      return 'autoprefixer error compile: ' + error;
    }))
    .pipe(gulp.dest(dest_path + '/css'))
    .pipe(gulpSize({title: 'scss'}))
});

// Restart the server for changes.
gulp.task('default', ['scss'], function () {
 nodemon({ script: 'server.js', ext: 'html js' });
});

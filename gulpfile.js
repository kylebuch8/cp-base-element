const gulp = require('gulp');
const gulpif = require('gulp-if');
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const babel = require('gulp-babel');
const htmlMinifier = require('gulp-html-minifier');
const uglify = require('gulp-uglify');
const sourcesHtmlSplitter = new HtmlSplitter();
const del = require('del');

gulp.task('clean', () => {
  return del(['dist/**/*'])
});

gulp.task('compile', () => {
  return gulp.src(['./*.html', './*.js', '!./gulpfile.js'])
    .pipe(sourcesHtmlSplitter.split())
    .pipe(gulpif(/\.js$/, babel()))
    .pipe(gulpif(/\.js$/, uglify()))
    .pipe(gulpif(/\.html$/, htmlMinifier({
      collapseWhitespace: true,
      minifyCSS: true
    })))
    .pipe(sourcesHtmlSplitter.rejoin())
    .pipe(gulp.dest('dist/compiled/'));
});

gulp.task('build', () => {
  return gulp.src(['./*.html', './*.js', '!./gulpfile.js'])
    .pipe(gulp.dest('dist/default/'));
});

gulp.task('default',
  gulp.series('clean', gulp.parallel('build', 'compile'))
);

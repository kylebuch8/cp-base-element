const gulp = require('gulp');
const gulpif = require('gulp-if');
const HtmlSplitter = require('polymer-build').HtmlSplitter;
const babel = require('gulp-babel');
const htmlMinifier = require('gulp-html-minifier');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sourcesHtmlSplitter = new HtmlSplitter();
const del = require('del');

gulp.task('clean', () => {
  return del(['./*.compiled.*'])
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
    .pipe(gulpif(/\.html$/, replace(/<link rel="import" href="(.*?)(.html)">/g, '<link rel="import" href="$1.compiled$2">')))
    .pipe(sourcesHtmlSplitter.rejoin())
    .pipe(rename({
      suffix: ".compiled"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default',
  gulp.series('clean', 'compile')
);

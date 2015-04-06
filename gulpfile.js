'use strict';

var gulp  = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

gulp.task('compile-app', function () {
	return gulp.src('app/*.es6')
		.pipe(babel())
		.pipe(rename({extname: '.js'}))
		.pipe(gulp.dest('app'));
});

gulp.task('compile-repo', function () {
	return gulp.src('repo/*.es6')
		.pipe(babel())
		.pipe(rename({extname: '.js'}))
		.pipe(gulp.dest('repo'));
});

gulp.task('default', function() {
	gulp.watch('app/*.es6',  ['compile-app']);
	gulp.watch('repo/*.es6', ['compile-repo']);
});

var gulp = require('gulp'),
	uglifyjs = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglifycss = require('gulp-uglifycss'),
	jshint = require('gulp-jshint');

gulp.task("compressjs", function(){
	return gulp.src("js/*.js")
			.pipe(concat("all.js"))
			.pipe(uglifyjs())
			.pipe(rename("app.min.js"))
			.pipe(gulp.dest("dist/"));
});

gulp.task("compresscss", function(){
	return gulp.src("css/*.css")
			.pipe(concat("all.css"))
			.pipe(uglifycss())
			.pipe(rename("app.min.css"))
			.pipe(gulp.dest("dist/"));
});

gulp.task("lint", function(){
	return gulp.src("js/*.js")
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});
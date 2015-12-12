var gulp = require('gulp'),
	uglifyjs = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglifycss = require('gulp-uglifycss'),
	jshint = require('gulp-jshint'),
	htmlreplace = require('gulp-html-replace'),
	bower = require('gulp-bower'),
	minifyHTML = require('gulp-minify-html');


gulp.task("compressjs", function(){
	return gulp.src([
			"vendor/angular/angular.js",
			"vendor/angular-sanitize/angular-sanitize.js",
			"vendor/showdown/dist/showdown.js",
			"vendor/ng-showdown/dist/ng-showdown.js",
			"vendor/angular-bootstrap/ui-bootstrap-tpls.js",
			"vendor/chronicle/chronicle.js",
			"js/app.js"
		])
			.pipe(concat("all.js"))
			.pipe(uglifyjs())
			.pipe(rename("app.min.js"))
			.pipe(gulp.dest("dist/"));
});

gulp.task("compresscss", function(){
	return gulp.src([
			"vendor/bootstrap/dist/css/bootstrap.css",
			"vendor/font-awesome/css/font-awesome.css",
			"css/app.css"
		])
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


gulp.task("build-html", function(){
	var opts = {
		conditionals: true,
		spare: true,
		quotes: true
	}

	gulp.src("index.html")
		.pipe(htmlreplace({
			"css": "app.min.css",
			"js": "app.min.js"
		}))
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest("dist/"));
});

gulp.task("bower", function(){
	return bower();
});
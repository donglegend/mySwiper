var gulp = require("gulp");
var exec = require("child-exec");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task("uglify", function (){
	gulp.src("./src/swiper.js")
		.pipe(uglify())
		.pipe(rename("swiper.min.js"))
		.pipe(gulp.dest("./src"))
})

gulp.task("build", function (){
	gulp.src("./src/**/*")
		.pipe(gulp.dest("./dist"))
})

gulp.task("default", function (){
	exec("compass watch");
})
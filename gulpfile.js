var gulp= require("gulp");
var sass = require("gulp-sass");
var browserSync = require('browser-sync').create();

gulp.task("browser-sync",function(){
 browserSync.init({
     server: {baseDir:"./"},
		 startPath: "/html/map.html"
 });
 gulp.watch("sass/**/*.scss",["sass"]);
 gulp.watch("js/**/*.js").on("change",browserSync.reload)
 gulp.watch("html/**/*.html").on("change", browserSync.reload);
 });

gulp.task("sass",function(){
	gulp.src("sass/**/*.scss")
	.pipe(sass().on("error",sass.logError))
	.pipe(gulp.dest("./css"))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('default',["browser-sync"]);

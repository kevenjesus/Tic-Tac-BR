var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	minifyCSS 	= require('gulp-minify-css'),
	uglify		= require('gulp-uglify');

gulp.task('styles',function(){
	gulp.src('./src/scss/build/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./assets/css/'));
});

gulp.task('scripts',function(){
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./assets/js'))
});

gulp.task('watch',['scripts','styles'],function(){
	gulp.watch('./src/scss/build/*.scss',['styles']);
	gulp.watch('./src/js/*.js',['scripts']);
});
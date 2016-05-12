/*
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var minifyHTML   = require('gulp-minify-html');
//文件名md5后缀
var revCollector = require('gulp-rev-collector');
//路径替换
gulp.task('concat', function() {
    gulp.src(['./src/js/!*.js'])
        .pipe(concat('all.js'))
        .pipe(rev())
        .pipe(gulp.dest('./build/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./build/rev'));
});
gulp.task('rev',function(){
    gulp.src(['./build/rev/!*.json'])
        .pipe(revCollector())
        .pipe(gulp.dest('./build/js'))
});
gulp.task('default',['concat','rev']);
//gulp.watch('.src/js/!*.js',concat);
gulp.task('css', function () {
    return gulp.src('src/css/!*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('scripts', function () {
    return gulp.src('src/js/!*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});
*/
var gulp = require('gulp'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');
gulp.task('clean',function(){
    return gulp.src('temp',{read:false})
        .pipe(clean());
});
gulp.task('css',function(){
    return gulp.src('src/css/*.css')
        .pipe(csso())
        .pipe(rename(function(path){
            path.basename += ".min";
            path.extname = ".css"
        }))
        .pipe(rev())
        .pipe(gulp.dest('temp/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/rev/css'))
})
gulp.task('rev',function(){
    return gulp.src(['build/rev/css/*.json','index.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('./'))
})
gulp.task('default',['clean','css','rev'])
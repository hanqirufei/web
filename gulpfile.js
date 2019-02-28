var gulp = require("gulp");
//压缩html
var htmlClean = require("gulp-htmlclean");
//压缩图片
var imageMin = require("gulp-imagemin");
//压缩js
var uglify = require("gulp-uglify");
//去掉js中调试语句
var debug = require("gulp-strip-debug");
//将less转换成css
var less = require("gulp-less");
//压缩css
var cleanCss = require("gulp-clean-css");
//添加前置
var postCss = require("gulp-postcss")
var autoprefixer = require("autoprefixer");

var watch = require("gulp-watch")
//开启服务器
var connect = require("gulp-connect");

var folder = {
    src:"src/",
    dist:"dist/"
}
//判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
//export NODE_ENV=development   设置环境变量
console.log(devMod);

gulp.task("css",function(){
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        if(!devMod) {
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
        if(!devMod) {
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
})
gulp.task("image",function(){
    gulp.src(folder.src + "image/*")
        .pipe(connect.reload())
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})
gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        if(!devMod) {
            page.pipe(debug())
            page.pipe(uglify())
        }
      
        page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("server", function(){
    connect.server({
        port:"8888",
        livereload:true
    })
})
gulp.task("watch", function() {
    watch(folder.src + "html/*", gulp.series("html"))
    watch(folder.src + "css/*", gulp.series("css"))
    watch(folder.src + "js/*", gulp.series("js"))
})
gulp.task("default", gulp.parallel("watch", "html", "css", "js", "image", "server"));
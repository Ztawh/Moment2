const {src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser").default;
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

// Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: "src/images/*"
};

//HTML-task, kopierar filer
function copyHTML() {
    return src(files.htmlPath).pipe(dest("pub"));
};

//JS-task. Minifiera och konkatenera
function jsTask() {
    return src(files.jsPath)
    .pipe(concat("supermain.js"))
    .pipe(terser())
    .pipe(dest("pub/js"));
};

//CSS-task. Konkatinera
function cssTask(){
    return src(files.cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat("main.css"))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(dest("pub/css"))
    .pipe(browserSync.stream());
};

//Image-task. 
function imgTask(){
    return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest("pub/images"));
};

//Watch-task
function watchTask(){
    browserSync.init({
        server: "./pub"
    });
    return watch([files.htmlPath, files.jsPath, files.cssPath, files.imgPath], parallel(copyHTML, jsTask, cssTask, imgTask)).on("change", browserSync.reload);
};

exports.default = series (
    parallel(copyHTML, jsTask, cssTask, imgTask),
    watchTask
);
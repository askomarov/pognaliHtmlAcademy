const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso"); //минификация стилей
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require('gulp-htmlmin'); //минификация html
const fileinclude = require('gulp-file-include');
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const del = require("del");
const terser = require("gulp-terser"); //обратка и минифик файлов js

//svg sprite
const sprite = () => {
  return gulp.src("source/img/**/*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
};
exports.sprite = sprite;


//webp
const makewebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 70 }))
    .pipe(gulp.dest('source/img'));
};
exports.webp = makewebp;

//images
const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}") //** - смотрит в любую вложенность
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'))
};
exports.images = images;

// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write(".")) //положил файл с картами кодами в корневую папку
    .pipe(gulp.dest("build/css")) //галп положи файлы в папку.
    .pipe(sync.stream());
};
exports.styles = styles;

// Html
const html = () => {
  return gulp.src("source/*.html")
    .pipe(fileinclude())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
};
exports.html = html;

//javascript
const scripts = () => {
  return gulp.src('source/js/script.js')
    .pipe(terser())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
}
exports.scripts = scripts;

//copy
const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico",
    "source/img/**",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};
exports.copy = copy;

//clean
const clean = () => {
  return del("build");
};
exports.clean = clean;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build/'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

//build
const build = gulp.series(
  clean,
  gulp.parallel(html, styles, scripts, sprite), gulp.series(copy));
exports.build = build;

// Watcher
const watcher = () => {
  gulp.watch("source/js/**/*.js", gulp.series("scripts"));
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  build, server, watcher
);

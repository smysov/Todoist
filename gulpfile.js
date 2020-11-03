const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');

sass.compiler = require('node-sass');

//ОЧИСТКА ПАПКИ DIST

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

//КОПИРОВАНИЕ HTML

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

//КОПИРОВАНИЕ ШРИФТОВ

task('fonts', () => {
  return src(`${SRC_PATH}/fonts/*`)
    .pipe(dest(`${DIST_PATH}/fonts`))
    .pipe(reload({ stream: true }));
});

//КОПИРОВАНИЕ КОНТЕНТНЫХ ИЗОБРАЖЕНИЙ

task('copy:pictures', () => {
  return src(`${SRC_PATH}/images/content/*`)
    .pipe(dest(`${DIST_PATH}/img/content`))
    .pipe(reload({ stream: true }));
});

task('copy:icons', () => {
  return src(`${SRC_PATH}/images/icons/*`)
    .pipe(dest(`${DIST_PATH}/img/icons`))
    .pipe(reload({ stream: true }));
});

//КОПИРОВАНИЕ ДЕКОРАТИВНЫХ ИЗОБРАЖЕНИЙ

task('copy:decor', () => {
  return src(`${SRC_PATH}/images/decor/*`)
    .pipe(dest(`${DIST_PATH}/img/decor`))
    .pipe(reload({ stream: true }));
});

//КОПИРОВАНИЕ ФАВИКОНОК

task('copy:favicons', () => {
  return src(`${SRC_PATH}/images/favicons/*.{svg,png,json,jpg,jpeg}`)
    .pipe(dest(`${DIST_PATH}/img/favicons/`))
    .pipe(reload({ stream: true }));
});

//СТИЛИ

task('styles', () => {
  return (
    src([...STYLE_LIBS, `${SRC_PATH}/scss/main.scss`])
      .pipe(gulpif(env === 'dev', sourcemaps.init()))
      .pipe(sassGlob())
      .pipe(concat('main.min.scss'))
      .pipe(sass().on('error', sass.logError))
      //.pipe(px2rem())
      .pipe(
        gulpif(
          env === 'dev',
          autoprefixer({
            cascade: false,
          })
        )
      )
      .pipe(gulpif(env === 'prod', gcmq()))
      .pipe(gulpif(env === 'prod', csso()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(`${DIST_PATH}/css`))
      .pipe(reload({ stream: true }))
  );
});

//ОСНОВНЫЕ СКРИПТЫ

task('scripts', () => {
  return (
    src(`${SRC_PATH}/scripts/*js`)
      .pipe(gulpif(env === 'dev', sourcemaps.init()))
      // .pipe(concat("main.min.js", { newLine: ";" }))
      .pipe(gulpif(env === 'prod', babel({ presets: ['@babel/env'] })))
      .pipe(gulpif(env === 'prod', uglify()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(`${DIST_PATH}/scripts`))
      .pipe(reload({ stream: true }))
  );
});

task('icons', () => {
  return src(`${SRC_PATH}/images/icons/*.svg`)
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: { attrs: '(data.*)' },
          },
        ],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest(`${DIST_PATH}/img/icons`));
});

//СЕРВЕР

task('server', () => {
  browserSync.init({
    server: {
      baseDir: `${DIST_PATH}`,
    },
    open: true,
  });
});

//ГИТХАБ-ПЭЙДЖЕС

task('deploy', () => {
  return gulp.src('./dist/**/*').pipe(ghPages());
});

//СЛЕЖКА ФАЙЛОВ

task('watch', () => {
  watch(`./${SRC_PATH}/scss/**/*.scss`, series('styles'));
  watch(`./${SRC_PATH}/*.html`, series('copy:html'));
  watch(`./${SRC_PATH}/scripts/*.js`, series('scripts'));
});

//ТАСКИ

task(
  'default',
  series(
    'clean',
    parallel(
      'copy:html',
      'copy:pictures',
      'copy:decor',
      'copy:icons',
      'copy:favicons',
      'icons',
      'styles',
      'scripts',
      'fonts'
    ),
    parallel('watch', 'server')
  )
);

task(
  'build',
  series(
    'clean',
    parallel(
      'copy:html',
      'copy:pictures',
      'copy:decor',
      'copy:icons',
      'copy:favicons',
      'icons',
      'styles',
      'scripts',
      'fonts'
    )
  )
);

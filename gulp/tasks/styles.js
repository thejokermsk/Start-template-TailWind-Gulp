const plumber = require('gulp-plumber'),
      scss = require('gulp-sass'),
      autoprefixer = require('autoprefixer'),
      tailwindcss = require('tailwindcss'),
      purgecss = require('@fullhuman/postcss-purgecss'),
      postcss = require('gulp-postcss'),
      cssnano = require('cssnano'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      stylesPATH = {
          "input": "./dev/static/styles/",
          "output": "./build/static/css/"
      };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        const plugins = [
            tailwindcss(),
            autoprefixer({overrideBrowserslist: ['last 3 version']}),
        ]

        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(postcss(plugins))
            .pipe(sourcemaps.write())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
            .on('end', $.browserSync.reload);
    });
    
    $.gulp.task('styles:build', () => {
        const plugins = [
            tailwindcss(),
            autoprefixer({overrideBrowserslist: ['last 3 version']}),
            purgecss({content: ['./build/*.html']})
        ]

        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(postcss(plugins))
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
    $.gulp.task('styles:build-min', () => {
        const plugins = [
            tailwindcss(),
            autoprefixer({overrideBrowserslist: ['last 3 version']}),
            cssnano(),
            purgecss({content: ['./build/*.html']})
        ]

        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(postcss(plugins))
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
};

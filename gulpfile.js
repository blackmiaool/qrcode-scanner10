const gulp = require('gulp');
const less = require('gulp-less');
const transform = require('gulp-transform');
//or just copy the runtime file to your project
const rncss = require('rn-less/src/react-native-css');
const {
    processStyleobject
} = require('rn-less/src/index');
const rename = require("gulp-rename");

const sourceDir='./src';
gulp.task('css', function () {
    return gulp.src([`${sourceDir}/style.less`], {
        base: sourceDir
    })
    .pipe(less({}))
    .pipe(transform('utf8', (code) => {
        code = JSON.stringify(rncss(code), false, 4);
        return code;
    }))
    .pipe(transform('utf8', (code) => {
        try {
            code = processStyleobject({
                code,
                hierarchy: false,
                custom: function ({
                    root,
                    traverseProperty
                }) {
                    traverseProperty(root, function ({ value, property }) {
                        if (typeof value === 'string' && value.match(/^[\d.]+vw$/)) {
                            return value.replace(/([\d.]+)vw/, "(vw*$1)|0");
                        }
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

        return code;
    }))
    .pipe(rename({
        extname: '.less.js'
    }))
    .pipe(gulp.dest(sourceDir));
});

gulp.task('default', (() => {
    gulp.start(['css']);
}));

gulp.watch(`${sourceDir}/style.less`, ['css']);

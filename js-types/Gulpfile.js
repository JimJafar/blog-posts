var gulp = require('gulp');
var traceur = require('gulp-traceur');
var rename = require('gulp-rename');

var traceurOptions = {
    "modules": "amd",
        "script": false,
        "types": true,
        "typeAssertions": true,
        "typeAssertionModule": "assert",
        "annotations": true,
        "sourceMaps": "file"
};

gulp.task('default', function () {
    return gulp.src('src/script.ats')
        .pipe(traceur(traceurOptions))
        .pipe(rename('script.js'))
        .pipe(gulp.dest('compiled'));
});
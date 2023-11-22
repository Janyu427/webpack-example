const gulp = require('gulp');
const watch = require('gulp-watch');
const fs = require('fs');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const webpack = require('webpack-stream');
const mergeStream = require('merge-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('browser-sync', () => {
    browserSync.init(['dist/css/*.css', 'dist/js/*.js'], {        
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('bs-reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task("clean", (cb) => {
    let path = "./dist";

    let del = (path) => {
      if(fs.existsSync(path)){
        let files = fs.readdirSync(path);

        files.forEach((file) => {
          let currentPath = path + "/" + file;

          if(fs.lstatSync(currentPath).isDirectory()){
            del(currentPath);
          }
          else{
            fs.unlinkSync(currentPath);
          }
        });

        fs.rmdirSync(path);
      }
    };

    del(path);
    cb();
});

gulp.task("html", () => {
    return gulp.src("./src/*.html")
    .pipe(gulp.dest("./dist"))
    .pipe(reload({stream:true}))
});

gulp.task('css', () => {
    return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}))
});

gulp.task("image", () => {
    return gulp.src("./src/images/*")
    .pipe(gulp.dest("./dist/images"))
    .pipe(reload({stream:true}))
});

gulp.task("font", () => {
    return gulp.src("./src/fonts/*")
    .pipe(gulp.dest("./dist/fonts"))
    .pipe(reload({stream:true}))
});

gulp.task('js', () => {
    const entryFiles = ['./src/js/common.js', './src/js/pageVideo.js', './src/js/utils.js'];
    const streams = [];

    entryFiles.forEach((entryFile) => {
        const stream = gulp.src(entryFile)
            .pipe(plumber({
                errorHandler: function(error){
                    this.emit('end');
                }
            }))
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest('dist/js'));

        streams.push(stream);
    });

    return mergeStream(...streams);
});

gulp.task('watch', () => {
    w('./src/*.html', 'html');
    w('./src/font/*', 'font');
    w('./src/js/*', 'js');
    w('./src/css/**/*', 'css');
    w('./src/image/*', 'image');

    function w(path, task){
        watch(path, ()=> {
            gulp.start(task);
            browserSync.reload();
        });
    }
});

gulp.task('default', gulp.series('clean', 'html', 'css', 'font', 'js', 'image', 'browser-sync', 'watch'));
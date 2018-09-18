// Course: Webbutveckling III HT18
// Assignment: Moment 3
// Author: Fredrik Waldfelt - frwa1700
// Date: 2018-09-18
// Filename: gulpfile.js
// Description: Gulp configuration file
var 
    // Load gulp and modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    cleanHTML = require('gulp-htmlclean'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

    // Setup folders
    folder = {
        // Source-directories
        src: 'src/',
        srcCss: 'src/css/**/*',
        srcFonts: 'src/fonts/**/*',
        srcHTML: 'src/html/**/*',
        srcJS: 'src/js/**/*',
        srcImages: 'src/images/', // Only take images in one directory
        srcSass: 'src/scss/**/*',

        // Testing-directories
        dev: 'dev/',
        devCSS: 'dev/css/',
        devFonts: 'dev/fonts/',
        devHTML: 'dev/',
        devJS: 'dev/js/',
        devImages: 'dev/images/',

        // Build-directories and settings
        build : {
            dir: 'build/',
            buildCSS: 'build/css/',
            buildFonts: 'build/fonts/',
            buildJS: 'build/js/',
            buildImages: 'build/images/',
            nameCSS: 'style',
        }

    }

    // Create gulp tasks

    /* Sass tasks */
    gulp.task('sass:copy', function(){
        console.log('found sass');
        var
            out = folder.devCSS,
            sassVar = gulp.src(folder.srcSass + '.scss')
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(sourcemaps.write());
                
        return sassVar.pipe(gulp.dest(out));
    })

    gulp.task('sass:build', function(){
        console.log('found sass');
        var
            out = folder.build.buildCSS,
            sassVar = gulp.src(folder.srcSass + '.scss')
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Compress file
                .pipe(sourcemaps.write())
                .pipe(concat(folder.build.nameCSS + '.min.css'));
                
        return sassVar.pipe(gulp.dest(out));
    })
    // Task to copy compressed and move images to dev
    gulp.task('images:copy', function(){
        var
            out = folder.devImages,
            image = gulp.src(folder.srcImages + '**/*.{jpg,jpeg,png,svg,gif}')
                .pipe(newer(out))
                .pipe(imagemin({optimizationLevel: 5}));
            
        return image.pipe(gulp.dest(out));
    })

    gulp.task('images:build', function(){
        console.log('Building images...');
        var
            out = folder.build.buildImages,
            image = gulp.src(folder.srcImages + '**/*.{jpg,jpeg,png,svg,gif}')
                .pipe(newer(out))
                .pipe(imagemin({optimizationLevel: 5}));

        return image.pipe(gulp.dest(out));
    })

    // Task to copy HTML-files to dev
    gulp.task('html:copy', function(){
        var 
            out = folder.devHTML,
            page = gulp.src(folder.srcHTML + '.html')
                .pipe(newer(out)) // Only pipe new files
        return page.pipe(gulp.dest(out)); // Save file
    })
    
    // Task to copy fonts to dev
    gulp.task('fonts:copy', function(){
        var
            out = folder.devFonts,
            fonts = gulp.src(folder.srcFonts)
                .pipe(newer(out));

        return fonts.pipe(gulp.dest(out));
    })
    // Task to copy fonts to dev
    gulp.task('fonts:build', function(){
        var
            out = folder.build.buildFonts,
            fonts = gulp.src(folder.srcFonts)
                .pipe(newer(out));

        return fonts.pipe(gulp.dest(out));
    })

    // Task to copy CSS-files to dev
    gulp.task('css:copy', function(){
        var
            out = folder.devCSS,
            fileName = 'style.css',
            css = gulp.src(folder.srcCss + '*.css')
                .pipe(concat(fileName));  // Concat all css into one file
                

        return css.pipe(gulp.dest(out));
    });

    // Concats, minifies and copies the CSS to build.
    gulp.task('css:build', function(){
        console.log('Building CSS...');
        var
            out = folder.build.buildCSS,
            css = gulp.src(folder.srcCss + '*.css')
                .pipe(concat(folder.build.nameCSS + '.min.css'))
                .pipe(cleanCSS())  // Miniify css
                .pipe(newer(out));

        return css.pipe(gulp.dest(out));
    });

    // Task to copy JS-files to dev
    gulp.task('js:copy', function(){
        var
            out = folder.devJS,
            js = gulp.src(folder.srcJS + '.js')
                .pipe(newer(out));
        return js.pipe(gulp.dest(out));
    });

    gulp.task('js:build', function(){
        console.log('Copying fonts');
        var
            out = folder.build.buildJS,
            js = gulp.src(folder.srcJS + '*.js')
                .pipe(uglify()) // Minify JS
                .pipe(newer(out));
                
        return js.pipe(gulp.dest(out));
    });

    // Task to create page by inserting CSS, JS
    gulp.task('pages:create',['images:copy','fonts:copy', 'css:copy','sass:copy','js:copy','html:copy'], function(){
        var
            out = folder.devHTML,
            css = gulp.src(folder.devCSS + '*.css', {read: false} ),
            js = gulp.src(folder.devJS + '*.js', {read: false} ),

            page = gulp.src(folder.srcHTML + '*.html')
                .pipe(inject(css, {ignorePath:folder.dev, addRootSlash: false})) // Inject CSS
                .pipe(inject(js, {ignorePath:folder.dev, addRootSlash: false})) // Inject JavaScript

        return page.pipe(gulp.dest(out)); // Save file
    });

    gulp.task('pages:build',['images:build', 'js:build', 'fonts:build', 'sass:build', 'css:build'], function(){
        console.log('Building pages');
        var
            out = folder.build.dir,
            css = gulp.src(folder.build.buildCSS + '*.css', {read: false} ),
            js = gulp.src(folder.build.buildJS + '*.js', {read: false} ),

            page = gulp.src(folder.srcHTML + '*.html')
                .pipe(inject(css, {ignorePath:folder.build.dir, addRootSlash: false})) // Inject CSS
                .pipe(inject(js, {ignorePath:folder.build.dir, addRootSlash: false})) // Inject JavaScript
                .pipe(cleanHTML());
        
        return page.pipe(gulp.dest(out));
    });

    // Deletes dev-directory
    gulp.task('del:dev', function(){
        console.log('Deleting dev-files to copy clean files from src.');
        return del(folder.dev);
    })


    // Task to start BrowserSync
    gulp.task('start-server', function(){
        browserSync.init({
            server: {
                baseDir: folder.dev, // Base-direcory of server
            }
        })
    })

    // Task to start watchers
    gulp.task('start-watchers', function(){
        gulp.watch(folder.srcHTML + '.html', ['pages:create']); // Copy new html/css/js/images and injects css/js into html-files
        gulp.watch(folder.srcCss + '.css', ['css:copy']); // Concat and copies CSS-files a
        gulp.watch(folder.srcFonts, ['fonts:copy']); // Copy fonts to dev
        gulp.watch(folder.srcJS + '.js', ['js:copy']); //Copies JS-files
        gulp.watch(folder.srcImages + '**/*.{jpg,jpeg,png,svg,gif}', ['images:copy']); // Copies images
        gulp.watch(folder.srcSass + '.scss', ['sass:copy']); // Checks for changes in scss-files and compiles them
        gulp.watch(folder.dev + '**/*', browserSync.reload); // Reload browser when files changes

        
    })
    
    /**
     * Task to run to start development.
     * Run tasks in this sequence:
     * 1. Deletes ALL files in the dev-folder
     * 2. Copy src-files and injects css/js
     * 3. Start the BrowserSync-server
     * 4. Start watchers to copy new/changed files
     */
    gulp.task('start-dev', function(callback){
        runSequence('del:dev', 'pages:create','start-server', 'start-watchers', callback);
    })
    gulp.task('default', function(callback){
        runSequence('del:dev', 'pages:create','start-server', 'start-watchers', callback);
    })

    /**
     * Tasks to run at build
     * 
     * MAke pages and delete dev-files.
     */
    gulp.task('build', ['pages:build', 'del:dev'], function(){
        console.log('Building complete');
    });


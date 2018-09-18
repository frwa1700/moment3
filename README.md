# Moment 3 i kursen DT173G - Webbutveckling III

## Syfte
Syftet med att skapa automatiserings-processer är att det snabbar upp och förenklar utveckling. Detta då man slipper göra många moment manuellt och det går enkelt att dela upp utvecklingen på flera filer för att sedan slå ihop dessa.

## Beskrivning
## Katalogstruktur
````
.
|____dev
|    |____css
|    |____images
|    |____js
|____build
|    |____css
|    |____images
|    |____jss
|____src
|    |____css
|    |____images
|    |____js
|    |____html
|    |____fonts
|    |____scss
````

### Följande plugins används
1. gulp-newer - Används för att se om en fil har ändrats eller är ny.
2. gulp-inject - Injicerar css- och js-filer i HTML-filer.
3. gulp-imagemin - Komprimering av bilder.
4. gulp-concat - Slår ihop filer.
5. gulp-clean-css - Minifierar CSS-filer.
6. gulp-htmlclean - Rensar HTML-filer från extra mellanslag, kommentarer m.m.
7. gulp-uglify - Minifierar JS
8. browser-sync - Webserver som körs för att kunna ladda om sidor vid ändringar.
9. run-sequence - Köra "tasks" i sekvenser.
10. del - Radera filer.



### Tasks
#### start-dev
Default-uppgift som körs när enbart `gulp` anges.<br>
Kör uppgifterna `del:dev`, `pages:create`, `start-server`, `start-watchers`<br>
Används för att köra utvecklar-läge.

#### build
Skapar en färdig _build_ att publicera i katalogen **build**
Kör uppgifterna: `pages:build`, `del:dev`

#### images:copy
Kopierar och komprimerar **nya/ändrade**  bilder från _källkods-filer_ (**folder.srcImages**) till _utvecklings-filer_ (**folder.devImages**).

#### image:build
Kopierar och komprimerar **nya/ändrade** bilder från _källkods-filer_ (*folder.srcImages*) till _färdiga filer_ (**folder.build.buildImages**).

#### html:copy
Kopierar **nya/ändrade**  HTML-filer från _källkods-filer_ (**folder.srcHTML**) till _utvecklings-filer_ (**folder.devHTML**).

#### fonts:copy
Kopierar **nya/ändrade** typsnitt från _källkods-filer_ (**folder.srcFonts**) till _utvecklings-filer_ (**folder.devFonts**).

#### fonts:build
Kopierar typsnitt från _källkods-filer_ (**folder.srcFonts**) till _färdiga filer_ (**folder.build.buildFonts**).

#### css:copy
Kopierar och slår ihop **alla** CSS-filer från _källkods-filer_ (**folder.srcCss**) till _utvecklings-filer_ (**folder.devCSS**).
Den ihopslagna CSS-filens namn: `style.css`<br>

#### css:build
Kopierar, slår ihop och minifierar CSS-filer från _källkods-filer_ (**folder.srcCss**) till _färdiga filer_ (**folder.build.nameCSS**).
Den ihopslagna och minifierade CSS-filens namn: `style.min.css`<br>

#### js:copy
Kopierar **nya/ändrade** JavaScript från _källkods-filer_ (**folder.srcJS**) till _färdiga filer_ (**folder.devJS**).

#### js:build
Kopierar och slår ihop JavaScript från _källkods-filer_ (**folder.srcJS**) till _färdiga filer_ (**folder.build.buildJS**).
Den ihopslagna JS-filens namn: `script.js`<br>

#### pages:create
Kör uppgifterna: `images:copy`, `js:copy`, `fonts:copy`, `css:copy`<br>
Efter det injiceras Styleshhet och JavaScript i alla HTML-filer.

#### pages:build
Kör uppgifterna: `images:build`, `js:build`, `fonts:build`, `css:build`<br>
Efter de uppgifterna injiceras CSS- och JS-filer innan HTML-filerna rensas från bl.a. kommenterer.
Filerna sparas till _färdiga filer_ (**folder.build.dir**).

#### del:dev
Raderar **alla** _utvecklings-filer_ (**folder.devCSS**).
Anänds innan utvecklings-läge startas för att säkerställa att inga gamla filer finns kvar.

#### start-server
Startar den inbygggda webbservern `browserSync`<br>

#### start-watchers
Skapar watches för att uppdatea automatiskt vid filändringar.
```
    gulp.watch(folder.srcHTML + '.html', ['pages:create']); // Copy new html/css/js/images and injects css/js into html-files
    gulp.watch(folder.srcCss + '.css', ['css:copy']); // Concat and copies CSS-files a
    gulp.watch(folder.srcFonts, ['fonts:copy']); // Copy fonts to dev
    gulp.watch(folder.srcJS + '.js', ['js:copy']); //Copies JS-files
    gulp.watch(folder.srcImages + '**/*.{jpg,jpeg,png,svg,gif}', ['images:copy']); // Copies images
    gulp.watch(folder.dev + '**/*', browserSync.reload); // Reload browser when files changes
````

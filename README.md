# Moment 3 i kursen DT173G - Webbutveckling III

## Syfte
Det finns flera syften med att använda CSS-preprocessorer. De största fördelarna jag ser är återanvändning av kod (exempelvis med @extend, @import) och användandet variabler i scss-koden. Även mixins ser jag användingsområde för då man kan återanvända kod som ska användas på flera ställen.
De inbyggda färfunktionerna (bland annat darken och lighten) ser jag också stor nytta med i andra projekt.

Det svåra i denna uppgiften var att få med en if/else-sats i den webplats jag skapat för detta moment. Så bara för att visa att jag kan lägga in den skapade jag en väldigt enkel if/else-sats.
`Rad 308` skapar CSS om `$slideshow` är satt till true (if), och `rad 365` döljer annars slideshow-elementet (else).

## Beskrivning
En enkel struktur för att använda gulp (och därigenom node.js) för att skapa en enkel html-sida.
Kompilerar scss, komprimerar bilder och injicerar JavaScript/CSS i index.html

### Developer-läge
Startas med `gulp` eller `gulp start-dev`
Tömmer först dev-katalogen för att inte innehålla gamla utdaterade utvecklingsfiler.
Kompilerar scss till css, komprimerar bilder och injicerar JS-/CSS-filer till index.html från src-katalogen.
Allt detta kopieras sedan till dev-katalogen.
Kollar efter förändringar i källkods-filerna och uppdaterar dev-filer samt browser vid förändringar.

### Developer-läge
Startas med `gulp build`
Kompilerar samt komprimerar scss till css, komprimerar bilder och injicerar JS-/CSS-filer till index.html från src-katalogen.
Rensar även html och JavaScript från onödig kod.

Tömmer först build-katalogen, för att undvika äldre filer, för att sedan kopiera de bearbetade filerna dit för publicering.

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


### Nya tasks i Moment 3
#### sass:copy
Kompilerar **SCSS-fierl** till en CSS-fil,  från _källkods-filer_ (**folder.srcSass**) till _utvecklings-filer_ (**folder.devCSS**).

#### sass:build
Kompilerar och komprimerar **SCSS-filer** til en CSS-fil, från _källkods-filer_ (**folder.srcSass**) till _färdiga filer (**folder.build.buildImages**).

### Uppdatera tasks från Moment 2
#### pages:create
Kör uppgifterna: `images:copy`, `js:copy`, `fonts:copy`, `css:copy`, `sass:copy`<br>
Efter det injiceras Styleshhet och JavaScript i alla HTML-filer.

#### pages:build
Kör uppgifterna: `images:build`, `js:build`, `fonts:build`, `css:build`, `sass:build`<br>
Efter de uppgifterna injiceras CSS- och JS-filer innan HTML-filerna rensas från bl.a. kommenterer.
Filerna sparas till _färdiga filer_ (**folder.build.dir**).

#### start-watchers
Skapar watches för att uppdatea automatiskt vid filändringar.
````
    gulp.watch(folder.srcHTML + '.html', ['pages:create']); // Copy new html/css/js/images and injects css/js into html-files
    gulp.watch(folder.srcCss + '.css', ['css:copy']); // Concat and copies CSS-files a
    gulp.watch(folder.srcFonts, ['fonts:copy']); // Copy fonts to dev
    gulp.watch(folder.srcJS + '.js', ['js:copy']); //Copies JS-files
    gulp.watch(folder.srcImages + '**/*.{jpg,jpeg,png,svg,gif}', ['images:copy']); // Copies images
    gulp.watch(folder.srcSass + '.scss', ['sass:copy']); // Checks for changes in scss-files and compiles them
    gulp.watch(folder.dev + '**/*', browserSync.reload); // Reload browser when files changes
````

### Oförändrade tasks från Moment 2
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
Kopierar och komprimerar **nya/ändrade** bilder från _källkods-filer_ (**folder.srcImages**) till _färdiga filer_ (**folder.build.buildImages**).

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

#### del:dev
Raderar **alla** _utvecklings-filer_ (**folder.devCSS**).
Anänds innan utvecklings-läge startas för att säkerställa att inga gamla filer finns kvar.

#### start-server
Startar den inbygggda webbservern `browserSync`<br>

# Moment 2 - automatisering
## Syfte
Detta moment har gått ut på att skapa en automatiserad struktur vid utveckling av webbplats med hjälp av en så kallad "task runner". I detta moment används Gulp. Syftet med en task runner är att göra utvecklarens arbetsprocess smidigare då det går att göra saker som att komprimera bilder, konkatinera filer, minimera filer m.m automatiskt. Detta är saker som utan en task runner skulle ta väldigt lång tid.

Utvecklaren kan alltså arbeta med sina filer och när denne sparar en ändring förs filen över till en publiceringsmapp. I denna mapp har samtliga filer blivit behandlade och redo för publicering, som att filen har blivit minimerad, konkatenerad osv.

## Paket
I denna struktur används olika sorters paket som utför olika saker i automatiseringsprocessen. 
Paketen är:
* gulp-concat. Detta paket konkatenerar flera filer till en och samma.
* gulp-terser. Detta paket minimerar JS-filen. Det betyder att den tar bort allt som inte är nödvändigt i filen, som mellanslag, blankrader, kommentarer osv. Det gör koden fullständigt oläslig, men det gör filen mindre i storlek.
* gulp-cssnano. Detta paket minimerar CSS-filen så denna får en mindre filstorlek.
* gulp-imagemin. Detta paket komprimerar bilder så dessa får en mindre filstorlek.
* browser-sync. Med detta paket går det att skapa en liveserver som uppdaterar sidan så fort utvecklaren sparar en ändrig.
* gulp-sourcemaps. Eftersom både JS-filerna och CSS-filerna blir konkatenerade så kan det vara svårt att se var en viss regel kommer ifrån vid inspektion av sidan i webbläsaren. Detta paket gör så att man kan se i webbläsaren exakt vilken fil regeln finns innan den konkatinerades.

## Tasks
Vid start av gulp i terminalen sker följande:

<!-- * Om en ny CSS-fil, HTML-fil eller JS-fil skapats eller ändrats kommer denna fil att kopieras och skickas till "pub"-mappen (publiceringsmappen). JS-filen och CSS- filen läggs i undermappar js eller css.
* Innan JS-filerna skickas till pub-mappen kommer dessa att konkatineras och minimeras med concat-paketet och terser-paketet. 
* Innan CSS-filerna skickas till pub-mappen kommer sourcemaps att initieras. Sen konkatineras och minimeras dessa med concat-paketet och cssnano-paketet. 
* Om en bild lagts till kommer denna att komprimeras med imagemin-paketet och sen skickas till pub-mappen i underkatalogen "images".
* Efter allt det kommer en watcher att köras. Denna lyssnar på om någonting ändras i någon av ovanstående filer. Om någonting ändras kommer den att köra alla tasks igen. -->

* copyHTML(). Denna task flyttar samtliga HTML-filer till "pub"-mappen (publiceringsmappen).
* jsTask(). Denna task konkatinerar JS-filerna till en "supermain.js"-fil, minimerar den och flyttar den till pub-mappen i undermappen js.
* cssTask(). Denna task initerar en sourcemap för att "komma ihåg" vilka CSS-regler som ligger i vilka CSS-filer. Sen slås CSS-filerna ihop till en och samma, denna minimeras sedan och skickas till pub-mappen i undermappen css. Efter det kommer browser-sync att köra metoden stream() som gör att CSS-reglerna inte sparas som cookies i webbläsaren.
* imgTask(). Denna task komprimerar bilderna och skickar den till pub-mappen i undermappen images.
* watchTask(). Denna task startar en liveserver som öppnar pub-mappen i en webbläsare. Sen lyssnar den på övriga tasks, om någonting ändras i någon av dem kommer alla tasks att köras igen.

Alla tasks förutom watchTask kommer att köras paralellt vid start av gulp i terminalen. Sist körs watchTask som kommer att ligga igång i bakgrunden och lyssna på om någonting förändras i de olika filerna.

## Vill du köra detta på din dator?
Du behöver ha node.js och npm installerat på din dator.

* Öppna din terminal och navigera till en lämplig mapp där du vill spara filerna.
* Skriv sen i din terminal: git clone https://github.com/Ztawh/Moment2.git
Nu finns filerna på din dator.
* Installera gulp genom att skriva i din terminal: npm install gulp-cli -g
(om du har en mac-dator behöver du skriva: sudo npm install gulp-cli -g)
* Skriv sen: gulp
* Nu är gulp igång och det är bara att börja utveckla!




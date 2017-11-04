# Uruchamianie projektu:

Musisz miec zainstalowane node.js i PhoneGap Desktop oraz edytor kodu, najlepiej VS Code

1. Sklonuj repozytorium
2. Przełącz na branch "develop"
3. Wpisz w terminalu w folderze projektu:
    "npm install"
    "npm install -g webpack"
    "webpack"
4. W PhoneGap Desktop dodaj "existing project" i wybierz folder projektu
5. Doinstaluj do VS Code lub innego edytora dodatek TSLint i zrestartuj VS Code(reload nie wystarczy)
6. Jeżeli błędy w kodzie nie podkreślają się na czerwono, wpisz jeszcze "npm install -g tslint" i zrestartuj edytor
7. Jeśli mimo to nie podkreśla, wpisz jeszcze "npm install -g typescript" i zrestartuj

Projekt można uruchomić wpisując w przeglądarce "localhost:3000". Jeżeli wprowadziłeś jakieś zmiany należy wpisać w terminal "webpack", aby je skompilować. Możesz też wpisać "webpack -w", aby zmiany kompilowały się automatycznie po zapisaniu.


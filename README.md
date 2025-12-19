JAK WPROWADZIĆ ZMIANY W PROJEKCIE
Zaakceptuj zaproszenie na githubie
Sklonuj projekt lokalnie (tylko raz!!!!!)
git clone https://github.com/simoneqq/web-game.git
cd web-game
npm install
Pobierz najnowsze zmiany
git pull
Stwórz branch do zadania
git checkout -b <nazwa zadania>
np. git checkout -b fix-collisions

Wprowadzenie zmian
// dodaj zmiany do zapisu
git add .
// zapisz zmiany
git commit -m "opis zmian"
Dodaj branch na GitHuba
git push origin <nazwa zadania>
Stwórz pull requesta (PR)

Wejdź na GitHuba
Pojawi się przycisk Compare & pull request
Wyślij pull request
Czekaj aż ja zaakceptuje PR albo jak ci zależy to sam to zrób

Po zaakceptowaniu PR pobierz aktualizacje

git checkout main
git pull
jak chcesz rozpoczać nowe zadanie to znowu git checkout -b <nazwa zadania>

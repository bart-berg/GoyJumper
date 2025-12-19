Jasne — przepisuję treść z obrazka w formie tekstowej (Markdown):

---

## JAK WPROWADZIĆ ZMIANY W PROJEKCIE

### 1. Zaakceptuj zaproszenie na GitHubie

### 2. Sklonuj projekt lokalnie (tylko raz!!!!)

```bash
git clone https://github.com/simonneq/web-game.git
cd web-game
npm install
```

### 3. Pobierz najnowsze zmiany

```bash
git pull
```

### 4. Stwórz branch do zadania

```bash
git checkout -b <nazwa_zadania>
```

np.

```bash
git checkout -b fix-collisions
```

### 5. Wprowadzenie zmian

```bash
// dodaj zmiany do zapisu
git add .
// zapisz zmiany
git commit -m "opis zmian"
```

### 6. Dodaj branch na GitHuba

```bash
git push origin <nazwa_zadania>
```

### 7. Stwórz pull requesta (PR)

* Wejdź na GitHuba
* Pojawi się przycisk **Compare & pull request**
* Wyślij pull request

### 8. Czekaj aż ja zaakceptuję PR albo jak ci zależy to sam to zrób

### 9. Po zaakceptowaniu PR pobierz aktualizacje

```bash
git checkout main
git pull
```

Jak chcesz rozpocząć nowe zadanie, to znowu:

```bash
git checkout -b <nazwa_zadania>
```

---

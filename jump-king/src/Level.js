import { Platform } from "./platform.js";
import { Line } from "./Line.js";

export const platforms = [
  // 1. GŁÓWNA PODŁOGA (na samym dole)
  // W JK podłoga zaczyna się nieco wyżej niż krawędź ekranu ze względu na UI/wodę
  new Platform(0, 325, 480, 35),

  // 2. LEWA ŚCIANA / SKAŁA
  // Ta, która ogranicza ekran po lewej stronie do połowy wysokości
  new Platform(0, 185, 110, 140),

  // 3. PRAWA ŚCIANA / SKAŁA
  // Odpowiada lewej, tworząc "bramę" wyjściową z pierwszej lokacji
  new Platform(370, 185, 110, 140),

  // 4. TAJEMNICZA PLATFORMA NA GÓRZE (Liście/Krzaki)
  // To to zielone "okienko" na środku u góry ekranu
  new Platform(195, 35, 90, 45)
];


export const slopes = [
  // \ (zjazd w prawo)
  new Line(30, 50, 150, 150),

  // / (zjazd w lewo)

];

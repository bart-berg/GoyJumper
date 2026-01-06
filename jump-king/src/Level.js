import { Platform } from "./platform.js";
import { Line } from "./Line.js";
import { NPC } from "./NPC.js";

export const platforms = [
  //new Platform(x, y, width, height)

  // ===== Limbo 1 (startowy) ( y = 360 -> 0) =====

  //Podłoga
  new Platform(0, 325, 480, 35),

  //Jebany klucz "Ej robert wymyśl co to jest" pierdol sie kurwa
  new Platform(100, 200, 270, 130),

  //Góra klatwi/spawna
  new Platform(0, 270, 40, 3),

  //Góra klatwi prawo
  new Platform(440, 110, 40, 3),

  //Bariera lewo
  new Platform(0, 0, 2, 360),

  //Bariera prawo
  new Platform(480, 0, 2, 360),

  // ===== Limbo 2 ( y = -0 -> -360 ) =====

  //Platforma 1 ( widać na Limbo 1 ) 
  new Platform(230, -10, 80, 20),

  //Platforma 2 ( odbijasz sie od niej )
  new Platform(290, -110, 50, 15),

  //Platforma 3 ( odbijasz się od platformy 2 do niej ) ( możliwe jest skok z platformy 1 na 3 ale to jest definitywnie trudniejszy jump)
  new Platform(180, -110, 50, 15),

  //Platforma 4 ( max jump )
  new Platform(0, -240, 20, 15),

  //Bariera lewo
  new Platform(0, -360, 2, 360),

  //Bariera prawo
  new Platform(480, -360, 2, 360),

  // ===== Limbo 3 ( y = -360 -> -720 ) =====

  //Platforma 1 ( widać na Limbo 2 )
  new Platform(165, -370, 70, 20),

  //Platforma 2 ( widać na Limbo 2 )
  new Platform(295, -370, 55, 20),

  //Platforma 3
  new Platform(460, -430, 20, 15),

  //Platforma 4
  new Platform(255, -460, 70, 20),

  //Platforma 5 ( blokuje skok platformy 1 i 2 )
  new Platform(180, -440, 100, 25),

  //Platforma 6
  new Platform(45, -550, 70, 20),

  //Platforma 7 / Góra klatki
  new Platform(180, -630, 40, 3),

  //Bariera lewo
  new Platform(0, -720, 2, 360),

  //Bariera prawo
  new Platform(480, -720, 2, 360),

  // ===== Limbo 4 ( y = -720 -> -1080 ) =====

  //Platforma 1 ( widać na Limbo 3 )
  new Platform(0, -730, 50, 20),

  //Platforma 2 ( wisi na niej lina )
  new Platform(180, -830, 70, 20),

  //Platforma 3
  new Platform(340, -890, 35, 20),

  //Platforma 4
  new Platform(180, -940, 50, 20),

  //Bariera lewo
  new Platform(0, -1080, 2, 360),

  //Bariera prawo
  new Platform(480, -1080, 2, 360),

  // ===== Limbo 5 ( y = -1080 -> -1440 ) =====

  //Platforma 1 ( widać na Limbo 4 )
  new Platform(0, -1090, 90, 20),

  //Platforma 2 ( widać na Limbo 4 )
  new Platform(180, -1100, 40, 30),

  //Platforma 3
  new Platform(280, -1200, 40, 20),

  //Platforma 4
  new Platform(160, -1280, 25, 100),

  //Platforma 5
  new Platform(310, -1340, 35, 20),

  //Platforma 6
  new Platform(140, -1430, 20, 250),

  //Ściana 1
  new Platform(310, -1340, 20, 160),

  //Bariera lewo
  new Platform(0, -1440, 2, 360),

  //Bariera prawo
  new Platform(480, -1440, 2, 360),

  // ===== Limbo 6 ( y = -1440 -> -1800 ) =====

  //Platforma 1 ( widać na Limbo 5 )
  new Platform(100, -1450, 60, 20),

  //Platforma 2
  new Platform(340, -1535, 50, 15),

  //Platforma 3
  new Platform(135, -1605, 40, 15),

  //Platforma 4 // Góra klatki
  new Platform(45, -1705, 40, 3),

  //Ściana 1 ( widać na Limbo 5 )
  new Platform(340, -1520, 20, 200),

  //Ściana 2
  new Platform(90, -1560, 15, 120),

  //Bariera lewo
  new Platform(0, -1800, 2, 360),

  //Bariera prawo
  new Platform(480, -1800, 2, 360),


  // ===== Limbo 7 ( y = -1800 -> -2160 ) =====
  
  //Platforma 1 / Góra klatki 1 ( dół klatki widać na Limbo 6 )
  new Platform(150, -1820, 40, 3),

  //Platforma 2 / Góra klatki 2 ( dół klatki widać na Limbo 6 )
  new Platform(220, -1840, 40, 3),

  //Platforma 3 / Góra klatki 3
  new Platform(300, -1870, 40, 3),

  //Platforma 4
  new Platform(410, -1880, 30, 10),

  //Platforma 5 ( wisi na niej lina )
  new Platform(305, -1980, 30, 10),

  //Platforma 6 ( wisi na niej lina )
  new Platform(235, -1980, 15, 20),

  //Platforma 7 ( wisi na niej lina )
  new Platform(150, -1980, 30, 10),

  //Platforma 8
  new Platform(0, -2050, 50, 50),

  //Bariera lewo
  new Platform(0, -2160, 2, 360),

  //Bariera prawo
  new Platform(480, -2160, 2, 360),

  //Bariera gruba lewo
  new Platform(0, -2220, 50, 100),

  //Bariera gruba prawo
  new Platform(430, -2220, 50, 100),

  // ===== Lust 1 ( y = -2160 -> -2520 ) =====

  //Checkpoint ( widać na Limbo 7 )
  new Platform(180, -2170, 160, 30),

  //Platforma 1
  new Platform(370, -2220, 30, 10),

  //Schody 1
  new Platform(260, -2300, 30, 10),

  //Schody 2
  new Platform(240, -2310, 30, 10),

  //Schody 3
  new Platform(220, -2320, 30, 10),

  //Schody 4
  new Platform(200, -2330, 30, 10),

  //Platforma 2
  new Platform(75, -2420, 70, 15),

  //Przeszkoda 1 ( odbijasz sie od niej na platforme 2 )
  new Platform(160, -2480, 30, 5),

  //Przeszkoda 2
  new Platform(320, -2480, 30, 5),

  //Bariera gruba lewo
  new Platform(0, -2520, 50, 360),

  //Bariera gruba prawo
  new Platform(430, -2520, 50, 360),

  // ===== Lust 2 ( y = -2520 -> -2880 ) =====

  //Platforma 1
  new Platform(240, -2560, 30, 30),
  
  //Platforma 2
  new Platform(330, -2620, 30, 10),

  //Platforma 3
  new Platform(240, -2650, 30, 15),

  //Platforma 4
  new Platform(160, -2680, 30, 10),

  //Platforma 5
  new Platform(240, -2740, 30, 15),
  
  //Platforma 6
  new Platform(360, -2760, 30, 10),

  //Platforma 7
  new Platform(240, -2800, 30, 15),

  //Bariera gruba lewo
  new Platform(0, -2880, 50, 360),

  //Bariera gruba prawo
  new Platform(430, -2880, 50, 360),

  // ===== Lust 3 ( y = -2880 -> -3240 ) =====

  //Platforma 1 ( widać na Lust 2 )
  new Platform(45, -2890, 70, 15),

  //Platforma 2
  new Platform(210, -2960, 30, 30),

  //Platforma 3
  new Platform(290, -2990, 30, 30),

  //Platforma 4
  new Platform(385, -3030, 50, 15),

  //Platforma 5
  new Platform(175, -3070, 120, 10),

  //Ściana 1
  new Platform(290, -3140, 10, 80),

  //Ściana 2 ( widać na Lust 4 )
  new Platform(220, -3440, 25, 320),

  //Podłoga 1
  new Platform(35, -3070, 110, 10),

  //Bariera gruba lewo
  new Platform(0, -3240, 50, 360),

  //Bariera gruba prawo
  new Platform(430, -3240, 50, 360),

  // ===== Lust 4 ( y = -3240 -> -3600 ) =====

  //Platforma 1 ( widać na Lust 3 )
  new Platform(300, -3270, 25, 40),

  //Platforma 2
  new Platform(300, -3370, 25, 30),

  //Platforma 3
  new Platform(385, -3510, 50, 20),

  //Platforma 4 ( lądujesz na niej po ślizgu )
  new Platform(130, -3380, 40, 20),

  //Platforma 5
  new Platform(45, -3490, 20, 20),

  //Platforma 6
  new Platform(120, -3550, 50, 10),

  //Bariera gruba lewo
  new Platform(0, -3600, 50, 360),

  //Bariera gruba prawo
  new Platform(430, -3600, 50, 360),


  // ===== Lust 5 ( y = -3600 -> -3960 ) =====
  
  //Platforma 1 ( widać na Lust 4 )
  new Platform(160, -3640, 15, 100),

  //Bariera grubsza ( holy shit ) lewo
  new Platform(0, -3960, 100, 360),

  //Bariera grubsza ( holy shit ) prawo
  new Platform(380, -3960, 100, 360),

  // ===== Lust 6 ( y = -3960 -> -4320 ) =====

];


export const slopes = [

  // ===== Limbo 6 ( y = -1440 -> -1800 ) =====
  new Line(135, -1605, 90, -1560, 1),

  new Line(140, -1595, 95, -1550, 1),

  // ===== Lust 2 ( y = -2520 -> -2880 ) =====
  //Do przeszkody 1
  new Line(240, -2560, 160, -2480, 1),
  new Line(240, -2530, 190, -2480, 0),

  //Do przeszkody 2
  new Line(260, -2540, 320, -2480, 0),
  new Line(270, -2560, 350, -2480, 1),

  // ===== Lust 4 ( y = -3240 -> -3600 ) =====
  //Linia górna
  new Line(320, -3560, 160, -3380, 1),
  //Linia dolna
  new Line(335, -3545, 170, -3360, 0),
  //Linia ten no pomiędzy?? zamykająca te obie linie na gurze type shi
  new Line(320, -3560, 335, -3545, 1),

  //Trójkąt po prawej
  new Line(380, -3600, 430, -3560, 0, true),
  //Trójkąt po lewej
  new Line(100, -3600, 50, -3560, 0, true),

  // ===== Lust 5 ( y = -3600 -> -3960 ) =====
  /*
  Trójkąt type shi tylko nie pełny bo w tym JEBANYM momencie sie skapnołem że te JEBANE trójkąty
  działają tylko w stylu chuj-ci-w-dupe czyli nie ma kolizji na tych JEBANYCH przyprostakotnych więc
  JEBAĆ JEBAĆ JEBAĆ JEBAĆ TO KURWA
  pozdro *tutaj umieść borderline pornografie umamusume*
  Robert Giebel
  */
  new Line(240, -3650, 200, -3550, 0, true),

];

export const npcs = [
  new NPC(
    300,
    -2190,
    20,
    [
      [
        "Ty kurwa klocku jebany.",
        "słyszałem że piękna dziewczyna czeka na ostatnim kręgu piekła",
        "chyba nazywa sie Helena"
      ],
      [
        "Tak, uważam że Clair Obscur zasługuje na GOTY.",
        "Translating...",
        "Glory to Israel."
      ]
    ]
  )
];
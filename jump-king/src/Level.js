import { Platform } from "./platform.js";
import { Line } from "./Line.js";
import { NPC } from "./NPC.js";

export const platforms = [
  //new Platform(x, y, width, height)
  //max x = 480

  // ===== Limbo 1 (startowy) ( y = 360 -> 0) =====

  //Podłoga
  new Platform(0, 325, 480, 35),

  //Jebany klucz "Ej robert wymyśl co to jest" pierdol sie kurwa
  new Platform(100, 200, 270, 130),

  //Góra klatwi/spawna
  new Platform(0, 270, 40, 3),

  //Góra klatwi prawo
  new Platform(440, 120, 40, 3),

  //Bariera lewo
  new Platform(0, 0, 2, 360),

  //Bariera prawo
  new Platform(478, 0, 2, 360), // przesunalem bariere w lewo o 2px i teraz kolizja dziala


  // ===== Limbo 2 ( y = -0 -> -360 ) =====

  //Platforma 1 ( widać na Limbo 1 ) 
  new Platform(230, -10, 80, 20),

  //Platforma 2 ( odbijasz sie od niej )
  new Platform(290, -110, 50, 25),

  //Platforma 3 ( odbijasz się od platformy 2 do niej ) ( możliwe jest skok z platformy 1 na 3 ale to jest definitywnie trudniejszy jump)
  new Platform(180, -110, 50, 25),

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
  new Platform(195, -3070, 100, 10),
  
  //Podłoga 1
  new Platform(35, -3070, 100, 10),
  
  //Ściana 1
  new Platform(290, -3140, 10, 80),

  //Ściana 2 ( widać na Lust 4 )
  new Platform(220, -3440, 25, 320),

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

  //Platforma 2 / Przyprostokątna trójkąta
  new Platform(240, -3640, 80, 1),

  //Platforma 3 / Bariera grubsza ( holt shit ) prawo part 2
  new Platform(400, -3860, 80, 90),

  //Platforma 4
  new Platform(200, -3780, 20, 15),

  //Platforma 5
  new Platform(90, -3840, 25, 30),

  //Ściana / Przyprostokątna trójkąta
  new Platform(240, -3640, 1, 90),

  //Bariera grubsza ( holy shit ) lewo
  new Platform(0, -3960, 100, 360),

  //Bariera grubsza ( holy shit ) prawo part 1
  new Platform(380, -3780, 100, 180),

  //Bariera grubsza ( holy shit ) prawo part 3
  new Platform(380, -3950, 100, 100),



  // ===== Lust 6 ( y = -3960 -> -4320 ) =====

  //Platforma 1
  new Platform(210, -4000, 50, 10),

  //Platforma 2
  new Platform(330, -4120, 20, 1),

  //Platforma 3
  new Platform(200, -4200, 20, 40),

  //Prawa strona platformy 3
  new Platform(120, -4200, 20, 40),

  //Środek platformy 3
  new Platform(120, -4180, 80, 20),

  //Bariera grubsza ( holy shit ) lewo
  new Platform(0, -4320, 100, 360),

  //Bariera grubsza ( holy shit ) prawo
  new Platform(380, -4320, 100, 360),

  // ===== Lust 7 ( y = -4320 -> -4680 ) =====

  //Platforma 1
  new Platform(320, -4340, 70, 15),

  //Platforma 2
  new Platform(220, -4440, 40, 15),

  //Platforma 3
  new Platform(90, -4540, 60, 15),

  //Platforma 4 ( fun fact: jak za słabo skoczysz, a tak raczej będzie, Módl Się. )
  new Platform(220, -4620, 30, 15),

  //Dół platformy 4
  new Platform(210, -4605, 50, 10),

  //Bariera grubsza ( holy shit ) lewo
  new Platform(0, -4680, 100, 360),

  //Bariera grubsza ( holy shit ) prawo
  new Platform(380, -4680, 100, 360),

// ===== Gluttony 1 ( y = -4680 -> -5040 ) =====
 
  //Checkpoint lewo
  new Platform(0, -4710, 180, 30),
 
  //Checkpoint prawo
  new Platform(300, -4710, 180, 30),
 
  //Lewo blok
  new Platform(120, -4725, 30, 25),
 
  //Lewo dalej platforma 1 dół
  new Platform(10, -4730, 70, 30),
 
  //Lewo dalej platforma 1
  new Platform(50, -4750, 30, 80),

  //Lewo platforma 2
  new Platform(150, -4820, 40, 20),

  //Lewo platforma 3
  new Platform(80, -4900, 20, 40),
 
  //Prawo blok
  new Platform(350, -4725, 30, 25),
 
  //Prawy dalej platforma 1 dół
  new Platform(400, -4730, 50, 25),
 
  //Prawy dalej platforma 1
  new Platform(430, -4750, 20, 60),
 
  //Prawy platforma 2
  new Platform(450, -4850, 30, 20),

  //Prawy platforma 3
  new Platform(350, -4890, 20, 50),

  //Środek platforma
  new Platform(220, -4970, 30, 40),

  //Lewy trójkąt podstawa
  new Platform(280, -4860, 20, 1),
  //Wysokość
  new Platform(300, -4880, 1, 20),

  //Prawy trójkąt podstawa
  new Platform(150, -4900, 30, 1),
  //Wysokość
  new Platform(150, -4930, 1, 30),

// ===== Gluttony 2 ( y = -5040 -> -5400 ) =====

  //Lewy platforma 1 ( Widać na GLuttony 1 )
  new Platform(50, -5070, 30, 60),

  //Prawy platforma 1 ( Widać na Gluttony 1 )
  new Platform(380, -5050, 70, 20),

  //Środek platforma 2
  new Platform(240, -5200, 15, 20),

  //Lewo platforma 3.1
  new Platform(90, -5250, 40, 20),

  //Lewo platforma 3.2
  new Platform(75, -5280, 20, 50),

  //Prawy platforma 3
  new Platform(350, -5280, 25, 20),

  //Prawy platforma 3 ściana
  new Platform(370, -5340, 15, 80),

  //Prawy platforma 3 sufit / Platforma 5
  new Platform(360, -5340, 15, 20),

  //Środek platforma 4
  new Platform(160, -5340, 40, 20),

  // ===== Gluttony 3 ( y = -5400 -> -5760 ) =====

  //Platforma 1 ( widać na Gluttony 2 )
  new Platform(440, -5420, 40, 25),

  //Platforma 2 / Góra trójkąta
  new Platform(310, -5510, 20, 1),

  //Platforma 3 / Góra trójkąta
  new Platform(130, -5530, 30, 1),

  //Platforma 4
  new Platform(0, -5600, 40, 20),

  //Platforma 5
  new Platform(220, -5700, 30, 60),

  //Część platformy 5
  new Platform(200, -5680, 70, 20),

  // ===== Gluttony 4 ( y = -5760 -> -6120 ) =====

  //Prawy platforma 1 ( widać na gluttony 3 )
  new Platform(380, -5790, 15, 60),

  //Prawy platforma 2
  new Platform(450, -5900, 30, 20), 

  //Lewy platforma 1 / Góra trójkąta
  new Platform(40, -5810, 30, 1),

  //Lewy platforma 2
  new Platform(180, -5920, 30, 30),

  //Środek platforma 1 / Góra trójkąta
  new Platform(320, -6010, 30 , 1),

  // ===== Gluttony 5 ( y = -6120 -> -6480 ) =====

  //Platforma 1 ( widać na gluttony 4 )
  new Platform(200, -6130, 50 , 20),

  //Platforma 2
  new Platform(110, -6170, 20 , 15),

  //Platforma 3 / Góra trójkąta
  new Platform(0, -6280, 30 , 1),

  //Platforma 4 / Góra trójkąta
  new Platform(110, -6320, 50 , 1),

  //Platforma 5
  new Platform(230, -6320, 170 , 15),

  //Platforma 6
  new Platform(370, -6355, 20 , 50),

  //Platforma 7
  new Platform(435, -6435, 15 , 2),

  //Ściana trójkąta na platformie 5
  new Platform(260, -6355, 1 , 50),

  //nwm
  new Platform(425, -6280, 35 , 50),

  // ===== Gluttony 6 ( y = -6480 -> -6840 ) =====

  //Platforma 1
  new Platform(220, -6520, 170 , 15),

  //Nie płacą mi wystarczająco na komentarzowanie każdej pojedyńczej platformy dwudzięstokąta
  new Platform(220, -6510, 130, 40),
  //Platforma 2
  new Platform(250, -6620, 30 , 100),
  new Platform(220, -6580, 35 , 60),

  //Platforma 3
  new Platform(30, -6680, 100 , 60),

  //Platforma 4
  new Platform(30, -6720, 20 , 100),

  //Platforma 5
  new Platform(190, -6770, 140, 1),

  //Platforma 5 dół
  new Platform(230, -6770, 60, 40),

  //Bariera prawo ( widoczna na Gluttony 5 )
  new Platform(450, -6740, 30 , 320),

  //Bariera wyżej
  new Platform(460, -6755, 20, 20),

  // ===== Gluttony 7 ( y = -6840 -> -7200 ) =====

  //Platforma 1
  new Platform(30, -6900, 310, 30),
  new Platform(30, -6900, 10, 70),

  //Platforma 2.1 lewo
  new Platform(40, -6980, 10, 40),

  //Platforma 2.2 lewo
  new Platform(0, -7070 , 10, 40),

  //Platforma 2.3 lewo
  new Platform(90, -7110, 10, 30),
  new Platform(80, -7100, 30, 10),

  //Platforma 2.1 prawo
  new Platform(170, -7020 , 10, 40),

  //Platforma 2.2 prawo
  new Platform(260, -6990, 10, 30),
  new Platform(250, -6980, 30, 10),

  //Platforma 2.3 prawo
  new Platform(310, -7060, 10, 30),
  new Platform(300, -7050, 30, 10),

  //Platforma 3 prawo
  new Platform(210, -7140 , 10, 40),

  // ===== Gluttony 8 ( y = -7200 -> -7560 ) =====

  //Platforma 1 prawo ( widać na Gluttony 7)
  new Platform(390, -7215, 10, 30),
  new Platform(380, -7205, 30, 10),

  //Platforma 1 lewo
  new Platform(0, -7220 , 10, 40),

  //Platforma 2 lewo
  new Platform(470, -7320 , 10, 40),
  //Platforma 2 lewo sufit
  new Platform(470, -7410 , 10, 40),

  //Platforma 3 lewo
  new Platform(310, -7370, 10, 30),
  new Platform(300, -7360, 30, 10),

  //Platforma 4
  new Platform(200, -7470, 10, 30),
  new Platform(190, -7460, 30, 10),

  new Platform(140, -7290, 10, 30),
  new Platform(130, -7280, 30, 10),

  new Platform(40, -7400 , 10, 40),

  // ===== Greed 1 ( y = -7560 -> -7920 ) =====

  //Checkpoint
  new Platform(300, -7580 , 180, 40),

  //Platforma 1
  new Platform(100, -7690 , 160, 30),

  //Platforma 2
  new Platform(30, -7760 , 40, 20),

  // ===== Greed 2 ( y = -7920 -> -8280 ) =====

  //Platforma 1 ( widać na Greed 1 )
  new Platform(170, -7930 , 40, 30),

  //Platforma 2 ( widać na Greed 1 )
  new Platform(280, -7930 , 40, 30),

  //Platforma 3
  new Platform(370, -7990 , 60, 30),

  //Platforma 4
  new Platform(190, -8000 , 90, 20),

  //Platforma 5
  new Platform(70, -8100 , 20, 50),

  //Platforma 6
  new Platform(70, -8180 , 20, 30),

  //Platforma 7
  new Platform(220, -8160 , 60, 20),

  //Ściana
  new Platform(0, -8210 , 20, 100),

  //Ściana trójkąta
  new Platform(220, -8200 , 1, 40),

  // ===== Greed 3 ( y = -8280 -> -8640 ) =====

  //Platforma 1
  new Platform(390, -8310 , 40, 20),

  //Platforma 2
  new Platform(260, -8350 , 40, 20),

  //Lewa ściana:
  //Dół 1 / Platforma lewa 3.1
  new Platform(120, -8350 , 60, 20),
  //Ściana 1
  new Platform(120, -8440 , 20, 100),
  //Dół 2 / Platforma lewa 3.3
  new Platform(90, -8440 , 30, 20),
  //Ściana 2
  new Platform(90, -8640 , 20, 200),

  //Środkowa ściana:
  //Dół 1 / Platforma lewa 3.2
  new Platform(260, -8430 , 30, 30),
  //Ściana 1
  new Platform(280, -8520 , 20, 120),
  //Sufit / Platforma lewa 3.4 / Platforma prawa 3.2
  new Platform(260, -8520 , 30, 20),

  //Prawa ściana:
  //Dół 1 / Platforma prawa 3.1
  new Platform(340, -8470 , 20, 60),

  // ===== Greed 4 ( y = -8640 -> -9000 ) =====

  //Lewa ściana:
  //Ściana 1
  new Platform(90, -8890 , 20, 250),
  //Platforma lewa 1 ( widac na Greed 3 )
  new Platform(105, -8680 , 25, 60),

  //Środkowa ściana:
  //Dół 1
  new Platform(230, -8740 , 50, 40),
  //Ściana 1
  new Platform(230, -8890 , 20, 160),
  //Platforma
  new Platform(210, -8800 , 30, 20),

  //Prawa ściana:
  //Ściana 1
  new Platform(360, -8650 , 20, 200),
  //Dół 1
  new Platform(360, -8650 , 60, 20),
  //Ściana 2
  new Platform(400, -8810 , 20, 170),

  // ===== Greed 5 ( y = -9000 -> -9360 ) =====

  //Platforma 1
  new Platform(30, -9010 , 40, 20),

  //Platforma 2
  new Platform(160, -9110 , 40, 20),

  //Platforma 3
  new Platform(240, -9130 , 30, 20),

  //Platforma 4
  new Platform(360, -9130 , 50, 15),

  //Platforma 5
  new Platform(400, -9144 , 40, 15),

  //Platforma 6
  new Platform(160, -9220 , 180, 20),
  
  // ===== Greed 6 ( y = -9360 -> -9720 ) =====

  //Platforma 1
  new Platform(410, -9370 , 40, 20),

  //Platforma 2
  new Platform(260, -9470 , 40, 15),

  //Platforma 3
  new Platform(100, -9380 , 70, 30),

  //Ściana
  new Platform(160, -9470 , 20, 120),
  //Ściana 2
  new Platform(125, -9490 , 1, 40),

  //Platforma 4
  new Platform(0, -9535 , 15, 40),

  //Platforma 5
  new Platform(140, -9650 , 50, 20),

  // ===== Wrath 1 ( y = -9720 -> -10080 ) =====

  //Checkpoint
  new Platform(270, -9730 , 150, 20),

  new Platform(100, -9800, 200, 20, true, true, 0),

  new Platform(50, -9900, 100, 20, true, false, 1),

  new Platform(0, -10000, 100, 20, true, false, 2),
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
  new Line(320, -3640, 240, -3550, 0, true),

  // ===== Lust 6 ( y = -3960 -> -4320 ) =====
  
  //Elementy tego kurwa jebanego śześciokąta czy chuj wie
  //Lewy slide
  new Line(330, -4120, 290, -4070, 1),
  //Prawy bounce
  new Line(350, -4100, 310, -4050, 0),
  //Prawy górny zamykający
  new Line(350, -4120, 350, -4100, 0),
  //Lewy dolny zamykający
  new Line(290, -4070, 290, -4050, 0),
  //Prawy dolny zamykający
  new Line(310, -4050, 290, -4050, 0),

  //Teraz sie kurwa zachciało ośmiokąt
  //Lewy
  new Line(140, -4200, 160, -4180, 1, true),
  //Prawy
  new Line(200, -4200, 180, -4180, 1, true),

  // ===== Lust 7 ( y = -4320 -> -4680 ) =====

  //Do platformy 4
  //Lewy
  new Line(220, -4620, 210, -4605, 1),
  //Prawy
  new Line(250, -4620, 260, -4605, 1),

  //Jebane trójkąty jebany przed jebanym gluttony jebać
  //Lewy
  new Line(180, -4680, 100, -4600, 0, true),
  //Prawy
  new Line(300, -4680, 380, -4600, 0, true),

  // ===== Gluttony 1 ( y = -4680 -> -5040 ) =====

  //Trójkąt lewy
  new Line(300, -4880, 280, -4860, 1, true),
  //Trójkąt prawy
  new Line(150, -4930, 180, -4900, 1, true),

  // ===== Gluttony 2 ( y = -5040 -> -5400 ) =====
  //Trójkąt lewy
  new Line(230, -5180, 240, -5200, 1, true),
  //Trójkąt prawy
  new Line(255, -5200, 265, -5180, 1, true),

  // ===== Gluttony 3 ( y = -5400 -> -5760 ) =====

  //Trójkąt 1
  new Line(310, -5510, 330, -5500, 0, true),
  //Trójkąt 2
  new Line(130, -5530, 160, -5510, 0, true),
  //Trójkąt 3
  new Line(40, -5600, 50, -5580, 1, true),

  // ===== Gluttony 4 ( y = -5760 -> -6120 ) =====

  //Trójkąt 1
  new Line(40, -5810, 55, -5800, 0, true),
  new Line(70, -5810, 55, -5800, 0, true),
  //Trójkąt 2
  new Line(320, -5995, 350, -6010, 0, true),
  //Randomowy trójkąt na boku mapy???? aka Trójkąt 3
  new Line(0, -6060, 20, -6040, 1, true),

  // ===== Gluttony 5 ( y = -6120 -> -6480 ) =====

  //Trójkąt 1
  new Line(130, -6170, 140, -6155, 1, true),
  //Trójkąt 2
  new Line(30, -6280, 0, -6250, 0, true),
  //Trójkąt 3
  new Line(110, -6320, 135, -6300, 0, true),
  new Line(160, -6320, 135, -6300, 0, true),
  //Trójkąt 4
  new Line(260, -6355, 230, -6320, 1, true),
  //Trójkąt 5 i 6
  new Line(370, -6355, 340, -6320, 1, true),
  new Line(390, -6355, 420, -6320, 1, true),

  //Line górny
  new Line(420, -6320, 460, -6280, 1),
  //Line dolny
  new Line(400, -6305, 425, -6280, 1),

  //Trójkąt 7
  new Line(425, -6230, 460, -6200, 0, true),

  //Trójkąt 8 ( na górze )
  new Line(220, -6470, 240, -6450, 0, true),

  // ===== Gluttony 6 ( y = -6480 -> -6840 ) =====

  //Trójkąt 1 ( widoczny na Gluttony 7 )
  new Line(350, -6470, 375, -6510, 0, true),
  //Trójkąt 2
  new Line(280, -6620, 375, -6520, 1, true),
  //Trójkąt 3
  new Line(250, -6620, 220, -6580, 1, true),
  //Trójkąt 4 i 5
  new Line(130, -6680, 160, -6650, 1, true),
  new Line(130, -6620, 160, -6650, 0, true),
  //Trójkąt 6
  new Line(50, -6720, 110, -6680, 1, true),
  //Trójkąt 7 i 8
  new Line(190, -6770, 230, -6730, 0, true),
  new Line(330, -6770, 290, -6730, 0, true),
  //Trójkąt 9 ( max po prawej, na barierze )
  new Line(460, -6755, 450, -6740, 1, true),

  // ===== Gluttony 7 ( y = -6840 -> -7200 ) =====

  //Trójkąt 1 ( widać na Gluttony 6 )
  new Line(40, -6830, 70, -6870, 0, true),

  // ===== Greed 2 ( y = -7920 -> -8280 ) =====

  //Trójkąt bulu i cierpienia
  new Line(0, -8220, 20, -8210, 1, true),

  //Trójkąt 2
  new Line(220, -8200, 240, -8160, 1, true),

  // ===== Greed 6 ( y = -9360 -> -9720 ) =====

  //Trójkąt bulu i cierpienia the sequel
  new Line(160, -9490, 180, -9470, 1, true),

  //Podwójny Trójkąt bulu i cierpienia: the sequel of the sequel
  new Line(125, -9490, 100, -9470, 1, true),
  new Line(125, -9450, 100, -9470, 0, true),

  
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
  ),
  new NPC(
    420,
    -7600,
    20,
    [
      [
        "Greedy nigga"
      ],
      [
        "Dobra wywalaj, naruszasz moją prywatną przestrzeń",
        "On some Regulus Corny Ass type shit Anosa"
      ]
    ]
  )
];
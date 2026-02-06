import { Platform } from "./Platform.js";
import { Line } from "./Line.js";
import { NPC, MemoryNPC } from "./NPC.js";


export const platforms = [
  
  //new Platform(x, y, width, height)
  //max x = 480

  // ===== Limbo 1 (startowy) ( y = 360 -> 0) =====

  //Podłoga
  new Platform(0, 325, 480, 35),

  //Jebany klucz "Ej robert wymyśl co to jest" pierdol sie kurwa
  new Platform(100, 200, 270, 130),

  //Góra klatwi/spawna
  new Platform(0, 240, 40, 30),

  //Góra klatwi prawo
  new Platform(440, 115, 40, 30),

  //Bariera lewo
  new Platform(0, 0, 2, 360),

  //Bariera prawo
  new Platform(478, 0, 2, 360),

  // ===== Limbo 2 ( y = -0 -> -360 ) =====

  //Platforma 1 ( widać na Limbo 1 ) 
  new Platform(230, -10, 80, 20),

  //Platforma 2 ( odbijasz sie od niej )
  new Platform(290, -110, 50, 15),

  //Platforma 3 ( odbijasz się od platformy 2 do niej ) ( możliwe jest skok z platformy 1 na 3 ale to jest definitywnie trudniejszy jump)
  new Platform(180, -110, 50, 15),

  //Platforma 4 ( max jump )
  new Platform(0, -240, 30, 50),

  //Bariera lewo
  new Platform(0, -360, 2, 360),

  //Bariera prawo
  new Platform(478, -360, 2, 360),

  // ===== Limbo 3 ( y = -360 -> -720 ) =====

  //Platforma 1 ( widać na Limbo 2 )
  new Platform(160, -370, 75, 20),

  //Platforma 2 ( widać na Limbo 2 )
  new Platform(295, -370, 55, 20),

  //Platforma 3
  new Platform(460, -430, 20, 15),

  //Platforma 4
  new Platform(255, -460, 70, 20),

  //Platforma 5 ( blokuje skok platformy 1 i 2 )
  new Platform(180, -450, 100, 25),

  //Platforma 6
  new Platform(45, -550, 70, 20),

  //Platforma 7 / Góra klatki
  new Platform(180, -660, 40, 30),

  //Bariera lewo
  new Platform(0, -720, 2, 360),

  //Bariera prawo
  new Platform(478, -720, 2, 360),

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
  new Platform(478, -1080, 2, 360),

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

  //Ściana 1\
  new Platform(310, -1340, 20, 160),

  //Bariera lewo
  new Platform(0, -1440, 2, 360),

  //Bariera prawo
  new Platform(478, -1440, 2, 360),

  // ===== Limbo 6 ( y = -1440 -> -1800 ) =====

  //Platforma 1 ( widać na Limbo 5 )
  new Platform(100, -1450, 60, 20),

  //Platforma 2
  new Platform(340, -1535, 50, 15),

  //Platforma 3
  new Platform(135, -1605, 40, 15),

  //Platforma 4 // Góra klatki
  new Platform(45, -1735, 40, 30),

  //Ściana 1 ( widać na Limbo 5 )
  new Platform(340, -1520, 20, 200),

  //Ściana 2
  new Platform(90, -1560, 15, 120),

  //Bariera lewo
  new Platform(0, -1800, 2, 360),

  //Bariera prawo
  new Platform(478, -1800, 2, 360),


  // ===== Limbo 7 ( y = -1800 -> -2160 ) =====

  //Platforma 1 / Góra klatki 1 ( dół klatki widać na Limbo 6 )
  new Platform(150, -1850, 40, 30),

  //Platforma 2 / Góra klatki 2 ( dół klatki widać na Limbo 6 )
  new Platform(220, -1870, 40, 30),

  //Platforma 3 / Góra klatki 3
  new Platform(300, -1900, 40, 30),

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
  new Platform(478, -2160, 2, 360),

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
  new Platform(160, -2480, 30, 4),

  //Przeszkoda 2
  new Platform(320, -2480, 30, 4),

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
  new Platform(200, -3000, 30, 10),

  //Platforma 3
  new Platform(290, -2960, 30, 30),

  //Platforma 4
  new Platform(385, -3030, 50, 15),

  //Platforma 5
  new Platform(175, -3070, 120, 10),

  //Ściana 1
  new Platform(290, -3140, 10, 80),

  //Ściana 2 ( widać na Lust 4 )
  new Platform(220, -3445, 25, 320),

  //Podłoga 1
  new Platform(35, -3070, 110, 10),

  //Bariera gruba lewo
  new Platform(0, -3240, 50, 360),

  //Bariera gruba prawo
  new Platform(430, -3240, 50, 360),

  // ===== Lust 4 ( y = -3240 -> -3600 ) =====

  //Platforma 1 ( widać na Lust 3 )
  new Platform(310, -3250, 25, 40),

  //Platforma 2
  new Platform(300, -3400, 25, 30),

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
  new Platform(160, -3630, 15, 90),

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

  //Prawy górny zamykający
  new Platform(350, -4120, 1, 20),
    //Lewy dolny zamykający
  new Platform(290, -4070, 1, 20),
  //Prawy dolny zamykający
  new Platform(290, -4050, 20, 1),

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
  new Platform(280, -4860, 24, 4),
  //Wysokość
  new Platform(300, -4880, 4, 21),

  //Prawy trójkąt podstawa
  new Platform(150, -4900, 30, 4),
  //Wysokość
  new Platform(146, -4930, 4, 34),

  // ===== Gluttony 2 ( y = -5040 -> -5400 ) =====

  //Lewy platforma 1 ( Widać na GLuttony 1 )
  new Platform(50, -5070, 30, 60),

  //Prawy platforma 1 ( Widać na Gluttony 1 )
  new Platform(380, -5050, 70, 20),

  //Środek platforma 2
  new Platform(240, -5200, 15, 24),

  //Trójkąt lewy
  new Platform(230, -5180, 10, 4),
  //Trójkąt prawy
  new Platform(255, -5180, 10, 4),

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
  new Platform(310, -5514, 20, 4),

  new Platform(330, -5514, 4, 15),

  //Platforma 3 / Góra trójkąta
  new Platform(130, -5534, 34, 4),

  new Platform(160, -5530, 4, 21),

  //Platforma 4
  new Platform(0, -5600, 40, 24),
  new Platform(40, -5581, 10, 5),

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
  new Platform(40, -5814, 30, 4),

  //Lewy platforma 2
  new Platform(180, -5920, 30, 30),

  //Środek platforma 1 / Góra trójkąta
  new Platform(316, -6014, 34, 4),
  new Platform(316, -6010, 4, 15),
  new Platform(0, -6040, 20, 4),

  // ===== Gluttony 5 ( y = -6120 -> -6480 ) =====

  //Platforma 1 ( widać na gluttony 4 )
  new Platform(200, -6130, 50, 20),

  //Platforma 2
  new Platform(110, -6170, 20, 18),
  new Platform(130, -6156, 9, 4),

  new Platform(459, -6230, 1, 29),

  //Platforma 3 / Góra trójkąta
  new Platform(0, -6284, 30, 4),

  //Platforma 4 / Góra trójkąta
  new Platform(110, -6324, 50, 4),

  //Platforma 5
  new Platform(230, -6320, 170, 15),

  //Platforma 6
  new Platform(370, -6355, 20, 50),

  //Platforma 7
  new Platform(435, -6435, 15, 2),

  //Ściana trójkąta na platformie 5
  new Platform(260, -6350, 1, 50),

  new Platform(239, -6470, 4, 20),

  //nwm
  new Platform(425, -6280, 35, 50),

  // ===== Gluttony 6 ( y = -6480 -> -6840 ) =====

  //Platforma 1
  new Platform(220, -6520, 170, 15),

  //Nie płacą mi wystarczająco na komentarzowanie każdej pojedyńczej platformy dwudzięstokąta
  new Platform(220, -6510, 130, 40),
  //Platforma 2
  new Platform(250, -6620, 30, 100),
  new Platform(220, -6580, 35, 60),

  //Platforma 3
  new Platform(30, -6680, 100, 60),

  //Platforma 4
  new Platform(30, -6720, 20, 100),

  //Platforma 5
  new Platform(190, -6770, 140, 1),

  //Platforma 5 dół
  new Platform(230, -6770, 60, 40),

  //Bariera prawo ( widoczna na Gluttony 5 )
  new Platform(450, -6740, 30, 320),

  //Bariera wyżej
  new Platform(460, -6755, 20, 20),

  // ===== Gluttony 7 ( y = -6840 -> -7200 ) =====

  //Platforma 1
  new Platform(30, -6900, 310, 30),
  new Platform(30, -6900, 10, 70),

  //Platforma 2.1 lewo
  new Platform(40, -6980, 10, 40),

  //Platforma 2.2 lewo
  new Platform(0, -7070, 10, 40),

  //Platforma 2.3 lewo
  new Platform(90, -7110, 10, 30),
  new Platform(80, -7100, 30, 10),

  //Platforma 2.1 prawo
  new Platform(170, -7020, 10, 40),

  //Platforma 2.2 prawo
  new Platform(260, -6990, 10, 30),
  new Platform(250, -6980, 30, 10),

  //Platforma 2.3 prawo
  new Platform(310, -7060, 10, 30),
  new Platform(300, -7050, 30, 10),

  //Platforma 3 prawo
  new Platform(210, -7140, 10, 40),

  // ===== Gluttony 8 ( y = -7200 -> -7560 ) =====

  //Platforma 1 prawo ( widać na Gluttony 7)
  new Platform(390, -7215, 10, 30),
  new Platform(380, -7205, 30, 10),

  //Platforma 1 lewo
  new Platform(0, -7220, 10, 40),

  //Platforma 2 lewo
  new Platform(470, -7320, 10, 40),
  //Platforma 2 lewo sufit
  new Platform(470, -7410, 10, 40),

  //Platforma 3 lewo
  new Platform(310, -7370, 10, 30),
  new Platform(300, -7360, 30, 10),

  //Platforma 4
  new Platform(200, -7470, 10, 30),
  new Platform(190, -7460, 30, 10),

  new Platform(140, -7290, 10, 30),
  new Platform(130, -7280, 30, 10),

  new Platform(40, -7400, 10, 40),

  // ===== Greed 1 ( y = -7560 -> -7920 ) =====

  //Checkpoint
  new Platform(300, -7580, 180, 40),

  //Platforma 1
  new Platform(100, -7690, 160, 30),

  //Platforma 2
  new Platform(35, -7760, 40, 20),

  // ===== Greed 2 ( y = -7920 -> -8280 ) =====

  //Platforma 1 ( widać na Greed 1 )
  new Platform(170, -7930, 40, 30),

  //Platforma 2 ( widać na Greed 1 )
  new Platform(280, -7930, 40, 30),

  //Platforma 3
  new Platform(370, -7990, 60, 30),

  //Platforma 4
  new Platform(190, -8005, 90, 20),

  //Platforma 5
  new Platform(70, -8060, 20, 50),

  //Platforma 6
  new Platform(70, -8195, 20, 40),

  //Platforma 7
  new Platform(216, -8160, 64, 20),

  //Ściana
  new Platform(0, -8210, 20, 100),

  //Ściana trójkąta
  new Platform(216, -8230, 4, 70),

  // ===== Greed 3 ( y = -8280 -> -8640 ) =====

  //Platforma 1
  new Platform(390, -8310, 50, 20),

  //Platforma 2
  new Platform(260, -8350, 40, 20),

  //Lewa ściana:
  //Dół 1 / Platforma lewa 3.1
  new Platform(120, -8350, 60, 20),
  //Ściana 1
  new Platform(120, -8440, 20, 100),
  //Dół 2 / Platforma lewa 3.3
  new Platform(90, -8440, 30, 20),
  //Ściana 2
  new Platform(90, -8640, 20, 200),

  //Środkowa ściana:
  //Dół 1 / Platforma lewa 3.2
  new Platform(260, -8430, 30, 30),
  //Ściana 1
  new Platform(280, -8520, 20, 120),
  //Sufit / Platforma lewa 3.4 / Platforma prawa 3.2
  new Platform(260, -8520, 30, 20),

  //Prawa ściana:
  //Dół 1 / Platforma prawa 3.1
  new Platform(340, -8470, 20, 60),

  // ===== Greed 4 ( y = -8640 -> -9000 ) =====

  //Lewa ściana:
  //Ściana 1
  new Platform(90, -8890, 20, 250),
  //Platforma lewa 1 ( widac na Greed 3 )
  new Platform(105, -8680, 25, 60),

  //Środkowa ściana:
  //Dół 1
  new Platform(230, -8740, 50, 40),
  //Ściana 1
  new Platform(230, -8890, 20, 160),
  //Platforma
  new Platform(210, -8800, 30, 20),

  //Prawa ściana:
  //Ściana 1
  new Platform(360, -8650, 20, 200),
  //Dół 1
  new Platform(360, -8650, 60, 20),
  //Ściana 2
  new Platform(400, -8810, 20, 170),

  // ===== Greed 5 ( y = -9000 -> -9360 ) =====

  //Platforma 1
  new Platform(30, -9010, 40, 20),

  //Platforma 2
  new Platform(160, -9110, 40, 20),

  //Platforma 3
  new Platform(240, -9130, 30, 20),

  //Platforma 4
  new Platform(360, -9130, 50, 15),

  //Platforma 5
  new Platform(400, -9144, 40, 15),

  //Platforma 6
  new Platform(160, -9220, 180, 20),

  // ===== Greed 6 ( y = -9360 -> -9720 ) =====

  //Platforma 1
  new Platform(410, -9370, 40, 20),

  //Platforma 2
  new Platform(260, -9470, 40, 15),

  //Platforma 3
  new Platform(100, -9380, 70, 30),

  //Ściana
  new Platform(160, -9470, 20, 120),
  new Platform(160, -9486, 1, 16),
  //Ściana 2
  new Platform(124, -9487, 1, 37),

  //Platforma 4
  new Platform(0, -9535, 15, 40),

  //Platforma 5
  new Platform(140, -9650, 50, 20),

  // ===== Wrath 1 ( y = -9720 -> -10080 ) =====

  //Checkpoint
  new Platform(270, -9730, 150, 20),

  //Platforma 1
  new Platform(170, -9810, 25, 25),
  new Platform(195, -9790, 10, 5),
  new Platform(160, -9790, 10, 5),

  //Platforma 2
  new Platform(310, -9920, 15, 1),

  //Platforma 3
  new Platform(415, -9995, 30, 15),

  //Ściana
  new Platform(440, -10080, 20, 100),

  //Dół platformy 2
  new Platform(310, -9920, 1, 15),

  //Dół platformy 2 3
  new Platform(360, -9855, 15, 1),

  //Dół platformy 2 4
  new Platform(374, -9870, 1, 16),

  // ===== Wrath 2 ( y = -10080 -> -10440 ) =====

  //Platforma 1 ( widać na Wrath 1 )
  new Platform(320, -10100, 30, 29),
  new Platform(310, -10075, 10, 4),

  //Platforma 2
  new Platform(100, -10170, 140, 20),

  //Platforma 3
  new Platform(120, -10245, 20, 80),

  //Platforma 4
  new Platform(270, -10300, 20, 1),

  //Platforma 5
  new Platform(390, -10380, 10, 10),

  //Dół platformy 5
  new Platform(385, -10371, 20, 20),

  //Sciana platformy 4
  new Platform(260, -10290, 1, 20),

  //Dół
  new Platform(100, -10155, 110, 35),

  //Ściana
  new Platform(100, -10220, 20, 60),

  // ===== Wrath 3 ( y = -10440 -> -10800 ) =====

  //Platforma 1
  new Platform(290, -10460, 15, 15),

  //Platforma 2
  new Platform(200, -10460, 15, 15),

  //Platforma 3
  new Platform(110, -10460, 5, 30),

  //Platforma 4
  new Platform(200, -10560, 50, 10),

  //Platforma 5
  new Platform(250, -10630, 60, 30),

  //Platforma 6
  new Platform(420, -10620, 60, 30),

  //Platforma 7
  new Platform(230, -10720, 50, 20),

  //Dół platformy 1
  new Platform(290, -10450, 20, 20),

  //Dół platformy 2
  new Platform(200, -10450, 20, 20),

  //Dół platformy 4
  new Platform(190, -10551, 60, 10),

  //Sciana platformy 4 / 5
  new Platform(250, -10610, 1, 50),

  //Dół platformy 7
  new Platform(230, -10701, 70, 14),

  //Podłoga trójkąta prawo góra
  new Platform(400, -10721, 80, 4),

  //Podłoga trójkąta
  new Platform(190, -10691, 40, 4),


  // ===== Herecy 1 ( y = -10800 -> -11160 ) =====
  //Checkpoint
  new Platform(0, -10830, 60, 84),

  //Platforma 1
  new Platform(140, -10940, 100, 15, false),

  //Platforma 2
  new Platform(350, -10950, 85, 15),

  //Platforma 3
  new Platform(385, -11070, 15, 60),

  //Dół trójkąta Checkpoint
  new Platform(60, -10751, 60, 5),

  // ===== Herecy 2 ( y = -11160 -> -11520 ) =====

  //Platforma 1
  new Platform(0, -11175, 110, 30),

  //Platforma 2
  new Platform(360, -11300, 120, 25),

  //Platforma 3
  new Platform(420, -11420, 60, 20),
  new Platform(405, -11405, 15, 5),

  //Lewo bok sufit
  new Platform(0, -11360, 30, 84),
  //Dół tego
  new Platform(30, -11281, 70, 5),

  // ===== Herecy 3 ( y = -11520 -> -11880 ) =====

  //Platforma 1
  new Platform(220, -11530, 100, 20, false),

  //Platforma 3.1
  new Platform(150, -11620, 50, 20, false),

  //Platforma 3.2
  new Platform(270, -11630, 90, 20, false),

  //Platforma 4
  new Platform(340, -11680, 20, 70, false),

  //Platforma 5
  new Platform(160, -11720, 130, 20, false),

  //Platforma 6
  new Platform(40, -11780, 15, 20, false),


  // ===== Herecy 4 ( y = -11880 -> -12240 ) =====

  //Platforma 1
  new Platform(80, -11930, 20, 70, false),

  //Platforma 2
  new Platform(99, -11960, 21, 70, false),

  //Platforma 3
  new Platform(270, -11920, 20, 24, false),
  new Platform(255, -11900, 15, 4),
  new Platform(290, -11900, 15, 4),

  //Platforma 4
  new Platform(430, -12090, 50, 1),

  // ===== Herecy 5 ( y = -12240 -> -12600 ) =====

  //Platforma 1
  new Platform(430, -12250, 15, 120),

  //Platforma 2 - dół
  new Platform(250, -12310, 55, 15),

  //Platforma 2 - góra
  new Platform(270, -12390, 15, 85),

  //Platforma 3 - dół
  new Platform(60, -12390, 55, 15),

  //Platforma 3 - góra
  new Platform(80, -12470, 15, 85),

  // ===== Herecy 6 ( y = -12600 -> -12960 ) =====

  //Platforma 1
  new Platform(230, -12640, 50, 50),

  //Platforma 2
  new Platform(265, -12700, 15, 60),

  //Platforma 3
  new Platform(360, -12640, 60, 20),

  //Ściana platformy 3
  new Platform(360, -12720, 15, 80),

  new Platform(374, -12726, 1, 10),

  //Platforma 4
  new Platform(460, -12640, 20, 20),

  //
  new Platform(405, -12900, 15, 200),

  //Platforma 5
  new Platform(419, -12800, 25, 15),

  //Platforma 6
  new Platform(360, -12900, 50, 15),

  //Platforma 7
  new Platform(130, -12830, 100, 20),

  //Bariera platformy 7
  new Platform(229, -12895, 1, 65),

  // ===== Violence 1 ( y = -12960 -> -13320 ) =====

  //Checkpoint
  new Platform(0.5, -12975, 70, 30),

  //Platforma 1
  new Platform(90, -13065, 30, 5),

  //Ściana platformy 1
  new Platform(85, -13065, 5, 35),

  //Platforma 2 - Zmienna platforma [ 1 ]
  new Platform(290, -13100, 30, 10, true, false, 1),

  //Platforma 3 - Zmienna platforma [ 2 ]
  new Platform(130, -13200, 30, 10, true, false, 2),

  // ===== Violence 2 ( y = -13320 -> -13680 ) =====

  //Platforma 1
  new Platform(310, -13340, 60, 25),

  //Platforma 2 - Zmienna platforma [ 2 ]
  new Platform(170, -13410, 230, 20, true, false, 2),

  //Platforma 3 - Zmienna platforma [ 1 ]
  new Platform(190, -13470, 40, 10, true, false, 1),

  //Platforma 4 - Zmienna platforma [ 1 ]
  new Platform(350, -13540, 60, 20, true, false, 1),
  //Ściana
  new Platform(410, -13580, 20, 60, true, false, 1),
  //Platforma 4.5
  new Platform(410, -13600, 60, 20, true, false, 1),


  // ===== Violence 3 ( y = -13680 -> -14040 ) =====

  //Platforma 1 - Zmienna platforma [ 2 ]
  new Platform(460, -13700, 20, 40, true, false, 2),

  //Platforma 2 - Zmienna platforma [ 2 ]
  new Platform(260, -13760, 30, 20, true, false, 2),

  //Platforma 3 - Zmienna platforma [ 1 ]
  new Platform(80, -13780, 30, 40, true, false, 1),

  //Platforma 4 - Zmienna platforma [ 2 ]
  new Platform(170, -13790, 30, 90, true, false, 2),

  //Ściana - Zmienna platforma [ 1 ]
  new Platform(320, -13960, 15, 260, true, false, 1),

  // ===== Violence 4 ( y = -14040 -> -14400 ) =====

  //Platforma 1 - Zmienna platforma [ 2 ]
  new Platform(100, -14050, 120, 30, true, false, 2),
  //Ściana
  new Platform(150, -14200, 15, 150, true, false, 2),

  //Platforma 2 - Zmienna platforma [ 1 ]
  new Platform(260, -14050, 120, 30, true, false, 1),
  //Ściana
  new Platform(310, -14250, 15, 200, true, false, 1),

  //Platforma 3 - Zmienna platforma [ 2 ]
  new Platform(410, -14210, 20, 20, true, false, 2),

  //Platforma 4 - Zmienna platforma [ 1 ]
  new Platform(475, -14340, 5, 30, true, false, 1),

  // ===== Fraud 1 ( y = -14400 -> -14760 ) =====

  //Checkpoint 1
  new Platform(270, -14420, 80, 40, true, true),

  //Checkpoint 2
  new Platform(110, -14420, 80, 40, true, true),

  //Platforma 2
  new Platform(160, -14440, 135, 60, true, true),

  //Platforma 3
  new Platform(280, -14600, 30, 70, true, true),
  //Dół trójkąta
  new Platform(310, -14570, 40, 5),

  //Platforma 4
  new Platform(150, -14670, 30, 100, true, true),
  //Dół trójkąta
  new Platform(110, -14575, 40, 5),

  //Dół lewego trójkąta
  new Platform(440, -14520, 40, 5),


  // ===== Fraud 2 ( y = -14760 -> -15120 ) =====

  //Platforma 1
  new Platform(0, -14800, 50, 60, true, true),

  //Platforma 2
  new Platform(150, -14870, 40, 30, true, true),
  //Dół trójkąta
  new Platform(120, -14846, 30, 6),

  //Platforma 3
  new Platform(270, -14840, 30, 50, true, true),

  //Filler
  new Platform(300, -14840, 140, 50,),

  //Platforma 4
  new Platform(345, -14890, 18, 60, true, true),

  //Filler
  new Platform(363, -14890, 60, 50,),

  //Platforma 5
  new Platform(420, -14940, 20, 100, true, true),

  //Platforma 6
  new Platform(140, -14950, 40, 20, true, true),

  //Platforma 7
  new Platform(40, -15050, 30, 20, true, true),

  //Dół trójkąta lewego
  new Platform(0, -14890, 50, 5),

  // ===== Fraud 3 ( y = -15120 -> -15480 ) =====

  //Platforma 1
  new Platform(140, -15160, 20, 40, true, true),

  //Platforma 1.5
  new Platform(220, -15180, 20, 40, true, true),

  //Platforma 2
  new Platform(240, -15210, 20, 70, true, true),

  //Platforma 3
  new Platform(300, -15280, 30, 100, true, true),

  //filler
  new Platform(330, -15280, 60, 100,),

  //Platforma 4
  new Platform(370, -15350, 20, 70, true, true),

  // ===== Treachery 1 ( y = -15480 -> -15840 ) =====

  //Checkpoint
  new Platform(450, -15490, 30, 50),

  //Platforma 1
  new Platform(280, -15550, 70, 20, false),

  new Platform(460, -15610, 20, 5),

  new Platform(375, -15660, 5, 20),

  //Platforma NPC
  new Platform(80, -15525, 90, 20),

  //Platforma 2 - Zmienna platforma [ 1 ]
  new Platform(160, -15720, 10, 30, true, false, 1),

  //Platforma 3 - Zmienna platforma [ 2 ]
  new Platform(60, -15680, 20, 40, true, false, 2),

  // ===== Treachery 2 ( y = -15840 -> -16200 ) =====

  //Platforma 1 ( widać na Treachery 1 )
  new Platform(55, -15845, 20, 55),

  //Platforma 2 - Zmienna platforma [ 1 ] ( widać na Treachery 1 )
  new Platform(120, -15850, 20, 50, true, false, 1),

  //Platforma 3
  new Platform(230, -15970, 10, 30, true, true),

  //Platforma 4
  new Platform(310, -15970, 10, 30, true, true),

  //Platforma 5 / filar ( widać na Treachery 1 )
  new Platform(375, -16010, 30, 350, false),

  //Platforma 6
  new Platform(230, -16120, 15, 15,),

  //filler
  new Platform(245, -16120, 35, 15, false),
  
  //Platforma 7
  new Platform(230, -16145, 15, 25, false),

  // ===== Treachery 3 ( y = -16200 -> -16560 ) =====

  //Platforma 1
  new Platform(100, -16260, 80, 20),

  //Platforma 2
  new Platform(310, -16300, 15, 30),

  //Platforma 3
  new Platform(135, -16350, 10, 91),

  //Platforma 4 - filar
  new Platform(40, -16460, 25, 500),


  //Platforma 1
  new Platform(190, -16590, 50, 20, false),

  //Platforma 2
  new Platform(215, -16680, 30, 20, false),

  //Platforma 3
  new Platform(360, -16700, 50, 20, true, true),
  //Filar pod platformą 3
  new Platform(380, -16680, 25, 550),

  //Platforma 4
  new Platform(130, -16860, 60, 20, true, true),

  //Platforma 5 - filar
  new Platform(40, -16860, 25, 200),


  // ===== Treachery 5 ( y = -16920 -> -17280 ) =====


  //Platforma 1 - Zmienna platforma [ 2 ]
  new Platform(40, -16930, 30, 20, true, false, 2),

  //Platforma 2 - Zmienna platforma [ 1 ]
  new Platform(130, -16930, 50, 20, true, false, 1),

  //Platforma 3
  new Platform(370, -17090, 25, 200),

  //saver
  new Platform(370, -17090, 50, 20),

  new Platform(380, -17200, 1, 20),

  //Platforma 4
  new Platform(460, -17190, 20, 30),

  //Lewy filar
  new Platform(40, -17180, 25, 180),

  new Platform(120, -17280, 5, 100),

  // ===== Treachery 6 ( y = -17280 -> -17640 ) =====

  //Platforma 1
  new Platform(440, -17350, 21, 20),

  //Platforma 2
  new Platform(380, -17350, 20, 150, false),
  new Platform(330, -17350, 51, 70, false),

  //Platforma 3 - Zmienna platforma [ 1 ]
  new Platform(120, -17340, 60, 60, true, false, 1),

  //Platforma 4
  new Platform(40, -17410, 15, 15, true, true),


  //Szczyt
  new Platform(120, -17510, 360, 20),
  //Prawa bariera
  new Platform(460, -17500, 20, 220),

  //Lewa bariera trójkąta skalniaka type shit
  new Platform(120, -17490, 1, 40),
];





export const slopes = [

  // ===== Limbo 6 ( y = -1440 -> -1800 ) =====
  new Line(135, -1605, 90, -1560, 1),

  new Line(140, -1595, 95, -1550, 0),

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

  //Teraz sie kurwa zachciało ośmiokąt
  //Lewy
  new Line(140, -4200, 160, -4180, 1, true),
  //Prawy
  new Line(200, -4200, 180, -4180, 1, true),

  // ===== Lust 7 ( y = -4320 -> -4680 ) =====

  //Do platformy 4
  //Lewy
  new Line(220, -4620, 210, -4605, 1, true),
  //Prawy
  new Line(250, -4620, 260, -4605, 1, true),

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
  new Line(400, -6305, 425, -6280, 0),

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
  new Line(0, -8220, 19, -8210, 1, true),

  //Trójkąt 2
  new Line(220, -8200, 240, -8160, 1, true),

  // ===== Greed 6 ( y = -9360 -> -9720 ) =====

  //Trójkąt bulu i cierpienia the sequel
  new Line(160.1, -9490, 180, -9470, 1, true),

  //Podwójny Trójkąt bulu i cierpienia: the sequel of the sequel
  new Line(125, -9490, 100, -9470, 1, true),
  new Line(125, -9450, 100, -9470, 0, true),

  // ===== Wrath 1 ( y = -9720 -> -10080 ) =====

  //Trójkąt 1 i 2
  new Line(195, -9810, 205, -9790, 1, true),
  new Line(170, -9810, 160, -9790, 1, true),

  //Linia dolna
  new Line(310, -9905, 360, -9855, 0),

  //Linia górna
  new Line(325, -9920, 375, -9870, 1),

  // ===== Wrath 2 ( y = -10080 -> -10440 ) =====

  //Trójkąt 1
  new Line(320, -10100, 310, -10075, 1, true),

  //Trójkąt 2
  new Line(240, -10170, 260, -10150, 1, true),

  //Trójkąt 3
  new Line(140, -10245, 210, -10170, 1, true),

  //Trójkąt 4
  new Line(120, -10245, 100, -10220, 1, true),

  //Linia 1
  new Line(270, -10300, 260, -10290, 1),

  //Linia 2
  new Line(290, -10300, 260, -10270, 0),

  //Trójkąt 5 i 6
  new Line(390, -10380, 385, -10370, 1, true),
  new Line(400, -10380, 405, -10370, 1, true),

  //Trójkąt 7
  new Line(460, -10100, 440.1, -10080, 1, true),

  // ===== Wrath 3 ( y = -10440 -> -10800 ) =====

  //Trójkąt 1
  new Line(305, -10460, 310, -10450, 1, true),

  //Trójkąt 2
  new Line(215, -10460, 220, -10450, 1, true),

  //Trójkąt 3
  new Line(200, -10560, 190, -10550, 1, true),

  //Trójkąt 4
  new Line(250, -10541, 310, -10600, 0, true),

  //Trójkąt 5
  new Line(420, -10590, 480, -10540, 0, true),

  //Trójkąt 6 ( prawo góra )
  new Line(480, -10800, 400, -10720, 1, true),

  //Trójkąt 7
  new Line(300, -10700, 280, -10720, 1, true),

  //Trójkąt 8
  new Line(230, -10720, 190, -10690, 1, true),


  // ===== Herecy 1 ( y = -10800 -> -11060 ) =====

  //Trójkąt 1
  new Line(60, -10830, 120, -10750, 1, true),

  // ===== Herecy 2 ( y = -11160 -> -11520 ) =====

  //Trójkąt 1
  new Line(30, -11360, 100, -11280, 1, true),

  //Trójkat 2
  new Line(360, -11300, 340, -11275, 1, true),

  //Trójkąt 3
  new Line(420, -11420, 405, -11405, 1, true),

  // ===== Herecy 4 ( y = -11880 -> -12240 ) =====

  //Trójkąt 1 i 2
  //lewy
  new Line(270, -11920, 255, -11900, 1, true),
  //prawy
  new Line(290, -11920, 305, -11900, 1, true),
  //Trójkąt 3
  new Line(430, -12090, 480, -12040, 0, true),


  // ===== Herecy 5 ( y = -12240 -> -12600 ) =====

  //Trójkąt 1 i 2
  //lewy
  new Line(250, -12310, 235, -12295, 1, true),
  //prawy
  new Line(305, -12310, 320, -12295, 1, true),

  //Trójkąt 3 i 4
  //lewy
  new Line(60, -12390, 45, -12375, 1, true),
  //prawy
  new Line(115, -12390, 130, -12375, 1, true),

  // ===== Herecy 6 ( y = -12600 -> -12960 ) =====

  //Trójkąt 1
  new Line(374.9, -12730, 360, -12720, 1, true),

  //Trójkąt 2
  new Line(230, -12900, 160, -12830, 1, true),


  // ===== Violence 1 ( y = -12960 -> -13320 ) =====

  //Trójkąt 1
  new Line(90, -13030, 120, -13060, 0, true),

  // ===== Fraud 1 ( y = -14400 -> -14760 ) =====

  //Trójkąt 1
  new Line(310, -14600, 350, -14570, 1, true),

  //Trójkąt 2
  new Line(150, -14605, 110, -14575, 1, true),

  //Trójkąt 3 ( lewo przeszkoda )
  new Line(480, -14570, 440, -14520, 1, true),

  // ===== Fraud 2 ( y = -14760 -> -15120 ) =====

  //Trójkąt 1
  new Line(0, -14930, 50, -14890, 1, true),

  //Trójkąt 2
  new Line(150, -14870, 120, -14845, 1, true),

  //Trójkąt 3
  new Line(300, -14840, 345, -14890, 1, true),

  //Trójkąt 4
  new Line(365, -14890, 420, -14940, 1, true),

  //Linia 1
  //Górna
  new Line(180, -14950, 320, -15070, 1),
  //Dolna
  new Line(180, -14930, 330, -15055, 0),
  //Zamykająca
  new Line(320, -15070, 330, -15055, 1),

  // ===== Fraud 3 ( y = -15120 -> -15480 ) =====

  //Trójkąt 1
  new Line(330, -15280, 370, -15350, 1, true),

  // ===== Treachery 1 ( y = -15480 -> -15840 ) =====

  //Trójkąt 1 - filar
  new Line(380, -15640, 405, -15660, 0, true),

  //Trójkąt 2 - prawo
  new Line(480, -15630, 460, -15610, 1, true),

  // ===== Treachery 2 ( y = -15840 -> -16200 ) =====

  //Trójkąt 1 - filar
  new Line(40, -15940, 65, -15960, 0, true),

  // ===== Treachery 4 ( y = -16560 -> -16920 ) =====

  //Trójkąt 1 - filar
  new Line(40, -16630, 65, -16660, 0, true),

  //Linie 1
  //Górna
  new Line(330, -16730, 360, -16700, 1),
  //Dolna
  new Line(320, -16720, 360, -16680, 0),
  //Zamykająca
  new Line(320, -16720, 330, -16730, 1),

  //Linie 2
  //Górna
  new Line(190, -16860, 260, -16800, 1),
  //Dolna
  new Line(190, -16840, 250, -16790, 0),
  //Zamykająca
  new Line(260, -16800, 250, -16790, 0),


  // ===== Treachery 5 ( y = -16920 -> -17280 ) =====

  //Trójkąty lewego filaru
  //Dolny
  new Line(65, -17120, 120, -17180, 0, true),
  //Górny
  new Line(120, -17280, 40, -17180, 1, true),

  //Trójkąty środkowo-prawego filaru
  //Dolny
  new Line(380, -17180, 400, -17200, 0, true),
  //Górny
  new Line(330, -17280, 380, -17240, 0, true),

  //Trójkąty prawe
  //Dolny
  new Line(460, -17280, 480, -17260, 0, true),
  //Górny
  new Line(460, -17160, 480, -17140, 0, true),

  // ===== Treachery 6 ( y = -17280 -> -17640 ) =====
  //Prawy
  new Line(410, -17500, 460, -17440, 0, true),
  //Lewy
  new Line(170, -17500, 120, -17440, 0, true),

  
];

export const shapes = [
  // ===== Limbo 6 =====
  {
    color: "#3f1313",
    points: [
      { x: 135, y: -1605 }, { x: 90, y: -1560 }, 
      { x: 95, y: -1550 }, { x: 140, y: -1595 }
    ]
  },

  // ===== Lust 2 =====
  {
    color: "#3f1313",
    points: [
      { x: 240, y: -2560 }, { x: 160, y: -2480 }, 
      { x: 190, y: -2480 }, { x: 240, y: -2530 }
    ]
  },
  {
    color: "#3f1313",
    points: [
      { x: 270, y: -2560 }, { x: 350, y: -2480 }, 
      { x: 320, y: -2480 }, { x: 260, y: -2540 }
    ]
  },

  // ===== Lust 4 =====
  {
    color: "#3f1313",
    points: [
      { x: 320, y: -3560 }, { x: 160, y: -3380 }, 
      { x: 170, y: -3360 }, { x: 335, y: -3545 }
    ]
  },

  // ===== Lust 6 (Sześciokąt/Bryła) =====
  {
    color: "#3f1313",
    points: [
      { x: 330, y: -4120 }, { x: 350, y: -4120 }, 
      { x: 350, y: -4100 }, { x: 310, y: -4050 }, 
      { x: 290, y: -4050 }, { x: 290, y: -4070 }
    ]
  },

  // ===== Gluttony 5 (Złożona linia na końcu) =====
  {
    color: "#3f1313",
    points: [
      { x: 400, y: -6320 },
      { x: 420, y: -6320 }, { x: 460, y: -6280 }, 
      { x: 425, y: -6280 }, { x: 400, y: -6305 }
    ]
  },

  // ===== Wrath 1 (Linia dół/góra) =====
  {
    color: "#3f1313",
    points: [
      { x: 310, y: -9920 }, { x: 325, y: -9920 },{ x: 375, y: -9870 },
      { x: 375, y: -9855 },{ x: 360, y: -9855 },{ x: 310, y: -9905 }
      
    ]
  },

  // ===== Wrath 2 (Linia 1 i 2) =====
  {
    color: "#3f1313",
    points: [
      { x: 270, y: -10300 }, { x: 260, y: -10290 }, 
      { x: 260, y: -10270 }, { x: 290, y: -10300 }
    ]
  },

  // ===== Fraud 2 (Długa skośna przeszkoda) =====
  {
    color: "#3f1313",
    points: [
      { x: 180, y: -14950 }, { x: 320, y: -15070 }, 
      { x: 330, y: -15055 }, { x: 180, y: -14930 }
    ]
  },

  // ===== Treachery 4 (Linie 1) =====
  {
    color: "#3f1313",
    points: [
      { x: 330, y: -16730 }, { x: 360, y: -16700 }, 
      { x: 360, y: -16680 }, { x: 320, y: -16720 }
    ]
  },

  // ===== Treachery 4 (Linie 2) =====
  {
    color: "#3f1313",
    points: [
      { x: 190, y: -16860 }, { x: 260, y: -16800 }, 
      { x: 250, y: -16790 }, { x: 190, y: -16840 }
    ]
  }
];

export const npcs = [
    //Limbo
    new MemoryNPC(
    300,
    155,
    28,
    40,
    [
[
  "Ach... no proszę, wstałeś.",
  "Myślałem, że poleżysz dłużej.",
  "... Nie pamiętasz, prawda?",
  "Tego, kim jesteś, ani dlaczego tu jesteś.",
  "...",
  "Jeżeli niczego nie żałujesz...",
  "...powinieneś wspiąć się na sam szczyt tego piekła.",
  "Lepsze to niż zgnić tutaj, na dnie..."
],
[
  "Nawet jeżeli, powiedzmy, czegoś żałujesz...",
  "To co tu jest innego do roboty niż wspinaczka w górę?",
  "...No chyba, że chcesz pograć ze mną w papier–kamień–nożyce?"
],
[
  "Ważne, że jeszcze oddychasz.",
  "Reszta się jakoś…",
  "dopisze po drodze."
],
[
  "Im niżej trafisz…",
  "tym szybciej rzeczy wypadają z głowy.",
  "Taka… lokalna atrakcja."
],
[
  "A słyszałeś kiedyś żart o chomiku elektryku?",
  "... Zapomniałem, jak to leciało.",
  "Nie było tam coś o barze i cyrku?",
  "... Chyba pomyliłem żarty."
],
[
  "...A jakbym powiedział ci, że piękna dziewczyna czeka na samej górze,",
  "to by cię zmotywowało?",
  "Zobaczmy... Nazwijmy ją Księżniczka H.",
  "A teraz ruszaj! Idź ją uratować!",
  "...Sorry, to był tylko żart."
],
[
  "Ciekawe.",
  "Nadal tutaj jesteś.",
  "Zgubiłeś może coś?",
  "Albo… kogoś?",
  "..."
],
[
  "...Nie mów mi, że naprawdę chcesz zostać w tej dziurze.",
  "Żadne moje słowo cię nie zmotywowało? Ani trochę?",
  "Nie wzbudziło choćby iskry ciekawości?",
  "..."
],
[
  "Może jak przestanę mówić, to nie będziesz miał wyboru",
  "i zaczniesz się wspinać zamiast marnować czas.",
  "..."
],
[
  "..."
]
    ],
  {
    particleCount: 13,
    sizeMin: 7,
    sizeMax: 13,
    spacing: 2,
    overflow: 5,
    scrambleMin: 1.0,
    scrambleMax: 2.0,
    fadeDuration: 0.1,
    jitter: 0.02
  }
  ),

    //Lust
    new MemoryNPC(
    300,         
    -2215,       
    28,          
    40,          
      [
[
  "Zapomniałem zapytać:",
  "Jak wyglądam w twoich oczach?",
  "Bo miałeś niezłą minę, kiedy mnie zobaczyłeś po przebudzeniu.",
  "Może aż taki piękny jestem?"
],
[
  "Tu wszystko świeci, jakby chciało być gwiazdą.",
  "Trochę to boli w oczy."
],
[
  "Tu jest ciepło.",
  "Ale nie w sensie „piekielnie ciepło”.",
  "Ciepło, które tu jest, jest takie… miłe."
],
[
  "Słyszysz to?",
  "Ktoś woła.",
  "Może ciebie,",
  "a może to tylko echo udające ludzi.",
  "Mimo wszystko, znajomy ten głos.",
  "...Jak zostanę tu dłużej, to chyba oszaleję."
]
      ],
    {
      particleCount: 13,
      sizeMin: 7,
      sizeMax: 13,
      spacing: 2,
      overflow: 5,
      scrambleMin: 1.0,
      scrambleMax: 2.0,
      fadeDuration: 0.1,
      jitter: 0.1
    }
  ),

  //Gluttony
  new MemoryNPC(
  16,         
  -4775,       
  28,          
  40,          
    [
[
  "...",
  "Słyszałeś to?",
  "...",
  "Przepraszam, to był mój brzuch.",
  "Jestem głodny."
],
[
  "Aż mi się przypomniało, jaka dobra kawa była w Off-Office.",
  "Od razu stawiała człowieka na nogi.",
  "A kanapki?",
  "Palce lizać."
],
[
  "Kiedyś pracowałem nad zleceniem do późna.",
  "Bez tej kawy bym padł…",
  "wiele razy."
]
    ],
  {
    particleCount: 13,
    sizeMin: 7,
    sizeMax: 13,
    spacing: 2,
    overflow: 5,
    scrambleMin: 1.0,
    scrambleMax: 2.0,
    fadeDuration: 0.1,
    jitter: 0.2
  }
),

//Greed
new MemoryNPC(
  420,         
  -7625,       
  28,          
  40,          
    [
[
  "...Śmierdzi tu.",
  "I do tego: dlaczego niebo jest na dole?",
  "Wydaje mi się, że zwykle jest, jak spojrzysz w górę.",
  "I te kamienie, co toną w przestworzach…",
  "Coś tu nie gra.",
  "...Czemu się tak na mnie patrzysz?"
],
[
  "Dobra, możemy już się stąd wynosić?",
  "Złe wspomnienia wracają do mnie.",
  "\"Postaw na czerwony\".",
  "Tamtej nocy wróciłem z łzami w oczach.",
  "Nie ze szczęścia."
],
[
  "Jeszcze trochę...",
  "Ach, pytasz o wspinaczkę?",
  "To jednak trochę więcej niż trochę."
],
[
  "Ile to zleceń trzeba było zrobić, by kupić to mieszkanie?",
  "Czy warto było?",
  "...Szczerze — nie.",
  "Szczególnie że myślałem, że po tym wszystko się jakoś ułoży."
]
    ],
  {
    particleCount: 13,
    sizeMin: 7,
    sizeMax: 13,
    spacing: 2,
    overflow: 5,
    scrambleMin: 1.0,
    scrambleMax: 2.0,
    fadeDuration: 0.1,
    jitter: 0.3
  }
),

//Wrath
new MemoryNPC(
  380,         
  -9775,       
  28,          
  40,          
    [
[
  "..."
],
[
  "..."
],
[
  "...",
  "Wybacz, zamyśliłem się."
],
[
  "Jak masz w coś uderzyć, uderz w ścianę.",
  "Ściana nie odda.",
  "I nie narzuci ci rachunku na wartość twojego życia razy dwanaście do potęgi szóstej.",
  "Suma nie wychodzi aż tak olbrzymia, jak się początkowo wydaje."
],
[
  "Trochę się nad tym zastanawiałem…",
  "Chcesz uciec z tego miejsca, prawda?",
  "Ale co, gdyby…",
  "na zewnątrz było jeszcze gorzej?"
],
[
  "Wszyscy nienormalni…",
  "Ale czy w życiu jest czas, by się takimi rzeczami przejmować?",
  "Ważne, że pieniądze się zgadzają.",
  "...Może to ja jestem ten nienormalny.",
  "Ale skoro to ja jestem nienormalny, to boję się, kim jest Ona."
],
[
  "..."
],
[
  "Wiesz, lubię sobie pomarudzić.",
  "Ale takie już życie.",
  "\"Quod erit, erit\" —",
  "to powiedzenie oznacza: \"Co będzie, to będzie\".",
  "Ułatwia pogodzenie się z tym światem."
]
    ],
  {
    particleCount: 13,
    sizeMin: 7,
    sizeMax: 13,
    spacing: 2,
    overflow: 5,
    scrambleMin: 1.0,
    scrambleMax: 2.0,
    fadeDuration: 0.1,
    jitter: 0.7
  }
),



//Fraud
new MemoryNPC(
  110,         
  -14465,       
  28,          
  40,          
    [
[
  "...Po co się ciągle wspinasz?"
],
[
  "Na górze znajdziesz tylko więcej bólu, więc…",
  "Dlaczego?"
],
[
  "Co niby chcesz zrobić po powrocie?"
],
[
  "Znowu żyć w tych okropnych warunkach?",
  "Znowu ryzykować życie dla kilku dodatkowych złotych?"
],
[
  "Nie lepiej byłoby po prostu…",
  "spaść?"
],
[
  "Żyć w Limbo, miejscu cichym i bez konfliktów."
],
[
  "Tam nie zaznasz bólu."
],
[
  "...Tam nie zaznasz straty."
],
[
  "\"Quod erit, erit\""
]
    ],
  {
    particleCount: 13,
    sizeMin: 7,
    sizeMax: 13,
    spacing: 2,
    overflow: 5,
    scrambleMin: 1.0,
    scrambleMax: 2.0,
    fadeDuration: 0.1,
    jitter: 0.9
  }
),
];


const treacheryNPC = new MemoryNPC(
  80,         
  -15555,      
  28,         
  30,
  [       
  [
  "Cicho tu.",
  "Jakby świat wstrzymał oddech.",
  "...",
  "Może to dobre miejsce na rozmowę.",
  "Z kimś, kogo już nie ma."
],
[
  "Nie wiem, czy mnie słyszysz.",
  "Pewnie nie.",
  "Ale i tak mówię.",
  "Zawsze tak miałem."
],
[
  "...",
  "Zawsze mówiłaś,",
  "że za dużo myślę."
],
[
  "A ja myślę teraz jeszcze więcej.",
  "Za nas dwoje.",
  "Na zapas.",
  "Na później."
],
[
  "Gdybym mógł cofnąć czas…",
  "Nie zmieniłbym wszystkiego.",
  "Tylko…",
  "zostałbym chwilę dłużej."
],
[
  "Usiadłbym obok.",
  "Zamiast biec dalej.",
  "Posłuchał.",
  "Naprawdę."
],
[
  "Nie pytam już: dlaczego.",
  "To słowo nic nie daje.",
  "Tylko boli."
],
[
  "Pytam raczej…",
  "czy było nam dobrze.",
  "...",
  "Bo ja pamiętam, że tak."
],
[
  "Jeśli gdzieś jesteś…",
  "Mam nadzieję,",
  "że jest tam jasno.",
  "I spokojnie."
],
[
  "I że nie musisz się martwić.",
  "O mnie.",
  "...",
  "Postaram się."
],
[
  "To chyba wszystko.",
  "Na dziś.",
  "Dziękuję,",
  "że byłaś.",
  "\"Quod erit, erit\""
],
[
  "Engel…",
  "Dobranoc."
]
],             
  {
    particleCount: 13,
    sizeMin: 7,
    sizeMax: 13,
    spacing: 2,
    overflow: 5,
    scrambleMin: 1.0,
    scrambleMax: 2.0,
    fadeDuration: 0.1,
    jitter: 0.1
  }
);

const standImg = new Image();
standImg.src = "./sprites/standing.png";

treacheryNPC.spriteImg = standImg;
treacheryNPC.spriteW = 32;        
treacheryNPC.spriteH = 32;
treacheryNPC.spriteAlpha = 0.18;  
treacheryNPC.spriteFacing = -1;   
treacheryNPC.spriteOffsetX = 0;   
treacheryNPC.spriteOffsetY = 0;

// Rejestracja NPC
npcs.push(treacheryNPC);


export const Circles = [
  {
    name: "LIMBO",
    screenFrom: 1,
    screenTo: 6,
    title: "--- LIMBO ---",
    quotePL: '"Żyli bez kary, lecz zginęli także bez nadziei."',
    quoteLA: '"Sine poena vixerunt, sed sine spe quoque perierunt."',
    shown: false
  },

  {
    name: "LUST",
    screenFrom: 7,
    screenTo: 13,
    title: "--- LUST ---",
    quotePL: '"To, co kochali żarliwie, związało ich na wieczność."',
    quoteLA: '"Quod ardenter amaverunt, eos in aeternum ligavit."',
    shown: false
  },

  {
    name: "GLUTTONY",
    screenFrom: 14,
    screenTo: 21,
    title: "--- GLUTTONY ---",
    quotePL: '"Im więcej brali, tym mniej byli ludźmi."',
    quoteLA: '"Quo plus sumpserunt, eo minus homines facti sunt."',
    shown: false
  },

  {
    name: "GREED",
    screenFrom: 22,
    screenTo: 27,
    title: "--- GREED ---",
    quotePL: '"Chciwość obiecuje pełnie, lecz zostawia pustkę."',
    quoteLA: '"Avaritia promittit plenitudinem, sed relinquit vacuum."',
    shown: false
  },

  {
    name: "WRATH",
    screenFrom: 28,
    screenTo: 30,
    title: "--- WRATH ---",
    quotePL: '"Gniew nimi rządził, aż nie pozostało nic więcej."',
    quoteLA: '"Ira eos rexit, donec nihil aliud restaret."',
    shown: false
  },

  {
    name: "HERESY",
    screenFrom: 31,
    screenTo: 36,
    title: "--- HERESY ---",
    quotePL: '"Odrzucili wiarę i wybrali popiół zamiast prawdy."',
    quoteLA: '"Fidem negaverunt, et cineres pro veritate elegerunt."',
    shown: false
  },

  {
    name: "VIOLENCE",
    screenFrom: 37,
    screenTo: 40,
    title: "--- VIOLENCE ---",
    quotePL: '"Przez krew szukali porządku, a znaleźli chaos."',
    quoteLA: '"Per sanguinem quaesiverunt ordinem, et chaos invenerunt."',
    shown: false
  },

  {
    name: "FRAUD",
    screenFrom: 41,
    screenTo: 43,
    title: "--- FRAUD ---",
    quotePL: '"Pod pozorem prawdy czcili kłamstwo."',
    quoteLA: '"Sub specie veritatis mendacium adoraverunt."',
    shown: false
  },

  {
    name: "TREACHERY",
    screenFrom: 44,
    screenTo: 48,
    title: "--- TREACHERY ---",
    quotePL: '"Tych, których powinni kochać, zdradzili chłodem."',
    quoteLA: '"Quos amare debuerunt, frigore prodiderunt."',
    shown: false
  }
];


export const FINAL_DIALOG = [
  [
    "...Patrzysz na mnie, jak na kogoś obcego.",
    "I chyba tak jest lepiej."
  ],
  [
    "Gdybyś mnie pamiętał.",
    "Każdy krok bolałby bardziej.",
    "Każdy oddech byłby cięższy."
  ],
  [
    "...Nie obwiniaj się.",
    "Nie wtedy.",
    "Nie teraz."
  ],
  [
    "Żyj.",
    "Nawet jeśli bez mojego imienia.",
    "Nawet jeśli beze mnie."
  ],
  [
    "...To wystarczy."
  ]
];

export const cutsceneTrigger = { x: 280, y: -17640, width: 10, height: 120 };
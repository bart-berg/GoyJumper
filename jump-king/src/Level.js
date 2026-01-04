import { Platform } from "./platform.js";
import { Line } from "./Line.js";

export const platforms = [
  new Platform(0, 325, 480, 35),
  new Platform(0, 185, 110, 140),
  new Platform(370, 185, 110, 140),
  new Platform(195, 35, 90, 45)
];


export const slopes = [
  new Line(30, 50, 150, 150, 1), // To będzie śliskie (czerwone)
  // Oryginał: new Line(200, 50, 300, 150, 0)
// Po obniżeniu o 40px:
    new Line(200, 90, 320, 190, 0)
];
import { Platform } from "./platform.js";
import { Line } from "./Line.js";

export const platforms = [
  new Platform(0, 325, 480, 35),
  new Platform(0, 185, 110, 140),
  new Platform(370, 185, 110, 140),
  new Platform(195, 35, 90, 45)
];


export const slopes = [
  new Line(30, 50, 150, 150),
];

import type { PigeonInfo, SensorInfo } from "$lib/types";
import { Sensors } from "$lib/types";

const SENSORS: SensorInfo[] = [
  {
    name: "Carbon Dioxide",
    id: Sensors.co2,
    min: 400,
    max: 6500,
    levels: [400, 600, 800, 1000, 1500],
    units: "ppm",
    info: "Carbon Dioxide is...."
  },
  {
    name: "TVOC",
    id: Sensors.tvocs,
    min: 0,
    max: 6500,
    levels: [0, 65, 220, 650, 2200],
    units: "ppb",
    info: "Total Volatile Organic Compounds...."
  },
  {
    name: "Air Quality Index",
    id: Sensors.aqi,
    min: 1,
    max: 5,
    levels: [1, 2, 3, 4, 5],
    units: "",
    info: "The AQI-UBA air quality index is derived from a guideline by the German Federal Environmental Agency (UBA: Umweltbundesamt) based on a TVOC sum signal.<br><br>Although a local German guideline, it is referenced and adopted by many countries and organizations.<br><br>Recommendation according to the UBA, Bundesgesundheitsblatt - Gesundheitsforschung Gesundheitsschutz 2007, DOI 10.1007/s00103-007-0290-y."
  },
  {
    name: "Carbon Monoxide",
    id: Sensors.co,
    min: 0,
    max: 2000,
    levels: [0, 20, 400, 1000, 1800],
    units: "ppm",
    info: "Carbon Monoxide is...."
  },
  {
    name: "Ethanol",
    id: Sensors.eth,
    min: 0,
    max: 20,
    levels: [0, 1, 5, 15, 18],
    units: "ppm",
    info: "Ethanol...."
  },
  {
    name: "Hydrogen",
    id: Sensors.h2,
    min: 0,
    max: 20,
    levels: [0, 2, 4, 10, 18],
    units: "ppm",
    info: "Hydrogen measures...."
  },
  {
    name: "Methane",
    id: Sensors.meth,
    min: 90,
    max: 2000,
    levels: [90, 100, 300, 500, 1400],
    units: "ppm",
    info: "Methane is...."
  },
];

const PIGEONS: PigeonInfo[] = [
  {
    name: "NO Pigeon",
    id: -1,
    weight: 0,
    age: 0,
    info: ""
  },
  {
    name: "Pigeon 0",
    id: 0,
    weight: 4,
    age: 12,
    info: "This pigeon...."
  },
  {
    name: "Pigeon 1",
    id: 1,
    weight: 4,
    age: 12,
    info: "Another pigeon...."
  },
  {
    name: "Pigeon 2",
    id: 2,
    weight: 4,
    age: 12,
    info: "More pigeon...."
  },
  {
    name: "Pigeon 3",
    id: 3,
    weight: 4,
    age: 12,
    info: "Cool pigeon...."
  },
  {
    name: "Pigeon 4",
    id: 4,
    weight: 4,
    age: 12,
    info: "Fast pigeon...."
  },
  {
    name: "Pigeon 5",
    id: 5,
    weight: 4,
    age: 12,
    info: "Hungry pigeon...."
  },
  {
    name: "Test Pigeon",
    id: 9999,
    weight: 8,
    age: 10,
    info: "Test Pigeon."
  },
];

export { SENSORS, PIGEONS };

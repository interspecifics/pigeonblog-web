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
    info: "The AQI-UBA air quality index is derived from a guideline by the German Federal Environmental Agency (UBA: Umweltbundesamt) based on a TVOC sum signal.\n\nAlthough a local German guideline, it is referenced and adopted by many countries and organizations.\n\nRecommendation according to the UBA, Bundesgesundheitsblatt - Gesundheitsforschung Gesundheitsschutz 2007, DOI 10.1007/s00103-007-0290-y."
  },
  {
    name: "Carbon Monoxide",
    id: Sensors.co,
    min: 0,
    max: 100,
    levels: [0, 20, 40, 60, 80],
    units: "",
    info: "Carbon Monoxide is...."
  },
  {
    name: "Ethanol",
    id: Sensors.eth,
    min: 0,
    max: 100,
    levels: [0, 10, 20, 40, 80],
    units: "",
    info: "Ethanol...."
  },
  {
    name: "Hydrogen",
    id: Sensors.h2,
    min: 0,
    max: 100,
    levels: [0, 20, 40, 60, 80],
    units: "",
    info: "Hydrogen measures...."
  },
  {
    name: "Methane",
    id: Sensors.meth,
    min: 0,
    max: 100,
    levels: [0, 10, 20, 30, 40],
    units: "",
    info: "Methane is...."
  },
];

const PIGEONS: PigeonInfo[] = [
  {
    name: "Pigeon 0",
    id: "Pigeon 0",
    weight: 4,
    age: 12,
    info: "Total Volatile Organic Compounds...."
  },
  {
    name: "Pigeon 1",
    id: "Pigeon 1",
    weight: 4,
    age: 12,
    info: "Total Volatile Organic Compounds...."
  },
  {
    name: "Pigeon 2",
    id: "Pigeon 2",
    weight: 4,
    age: 12,
    info: "Total Volatile Organic Compounds...."
  },
  {
    name: "Pigeon 3",
    id: "Pigeon 3",
    weight: 4,
    age: 12,
    info: "Total Volatile Organic Compounds...."
  },
  {
    name: "Pigeon 4",
    id: "Pigeon 4",
    weight: 4,
    age: 12,
    info: "Total Volatile Organic Compounds...."
  },
  {
    name: "Pigeon 5",
    id: "Pigeon 5",
    weight: 4,
    age: 12,
    info: "Total Volatile Organic Compounds...."
  },
];

export { SENSORS, PIGEONS };

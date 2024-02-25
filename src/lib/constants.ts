import type { PigeonInfo, SensorInfo } from "$lib/types";
import { Sensors } from "$lib/types";

const SENSORS: SensorInfo[] = [
  {
    name: "Air Quality Index",
    id: Sensors.aqi,
    min: 0,
    max: 100,
    levels: [0, 10, 20, 40, 100],
    info: "The Air Quality Index measurement...."
  },
  {
    name: "Carbon Monoxide",
    id: Sensors.co,
    min: 0,
    max: 100,
    levels: [0, 20, 40, 60, 80],
    info: "Carbon Monoxide is...."
  },
  {
    name: "Carbon Dioxide",
    id: Sensors.co2,
    min: 0,
    max: 100,
    levels: [20, 40, 60, 80, 100],
    info: "Carbon Dioxide is...."
  },
  {
    name: "Ethanol",
    id: Sensors.eth,
    min: 0,
    max: 100,
    levels: [0, 10, 20, 40, 100],
    info: "Ethanol...."
  },
  {
    name: "Hydrogen",
    id: Sensors.h2,
    min: 0,
    max: 100,
    levels: [0, 20, 40, 60, 80],
    info: "Hydrogen measures...."
  },
  {
    name: "Methane",
    id: Sensors.meth,
    min: 0,
    max: 100,
    levels: [20, 40, 60, 80, 100],
    info: "Methane is...."
  },
  {
    name: "TVOC",
    id: Sensors.tvocs,
    min: 0,
    max: 100,
    levels: [0, 10, 20, 40, 100],
    info: "Total Volatile Organic Compounds...."
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

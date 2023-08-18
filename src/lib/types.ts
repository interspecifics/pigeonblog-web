enum Sensors {
  NH3 = "NH3",
  OXI = "OXI",
  RED = "RED",
}

type SensorMeasurement = {
  [S in Sensors]: number;
};

type Measurement = SensorMeasurement & {
  lat: number;
  lon: number;
  temp: number;
  pres: number;
  alti: number;
  pigeon: number;
  timestamp: number;
};

export { Measurement, Sensors };

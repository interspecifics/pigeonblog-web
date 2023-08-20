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

type SessionValues = {
  min: number;
  max: number;
  mean: number;
};

type SessionLoc = {
  lat: SessionValues;
  lon: SessionValues;
};

type SessionSensors = {
  [S in Sensors]: SessionValues;
};

type Session = {
  loc: SessionLoc;
  sensors: SessionSensors;
  pigeons: number[];
};

export { Measurement, Sensors, Session };

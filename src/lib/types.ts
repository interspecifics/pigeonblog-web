enum Sensors {
  aqi = "aqi",
  co = "co",
  co2 = "co2",
  eth = "eth",
  h2 = "h2",
  meth = "meth",
  tvocs = "tvocs"
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

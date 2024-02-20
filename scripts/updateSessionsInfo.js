import * as https from "https";

const API_KEY = process.env.API_KEY;
const DB_URL = "https://pigeonblog-db-default-rtdb.firebaseio.com";
const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

const request = (method, url, data) => {
  const dataString = JSON.stringify(data);

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": dataString.length,
    },
    timeout: 1000,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`));
      }

      const body = [];
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        resolve(resString);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request time out"));
    });

    req.write(dataString);
    req.end();
  });
};

const getToken = async (auth_url, api_key) => {
  const postUrl = `${auth_url}?key=${api_key}`;

  let token = "";
  try {
    const resTxt = await request("POST", postUrl, { returnSecureToken: true });
    const resObj = JSON.parse(resTxt);
    token = resObj["idToken"];
  } catch (e) {
    token = "";
  }

  return token;
};

const getStartOfDay = (ts) => {
  return ts - (ts % (24 * 60 * 60 * 1000)) + 1000;
};

const getAllMeasurements = async () => {
  const getUrl = `${DB_URL}/measurements.json`;

  let measurements = [];
  try {
    const resTxt = await request("GET", getUrl, {});
    const resObj = JSON.parse(resTxt);
    measurements = Object.values(resObj).sort(
      (a, b) => a.timestamp - b.timestamp
    );
  } catch ({ name, message }) {
    if (name != "TypeError") console.log(name, message);
    measurements = [];
  }
  return measurements;
};

const roundTo = (n, d) => {
  return parseFloat(n.toFixed(d));
};

const updateMinMax = (sessionVal, val) => {
  if (val < sessionVal.min) sessionVal.min = roundTo(val, 4);
  if (val > sessionVal.max) sessionVal.max = roundTo(val, 4);
};

const getMean = (arr) => {
  return roundTo(arr.reduce((s, v) => s + v, 0) / arr.length, 4);
};

const getEmptyObj = () => {
  return {
    min: Number.MAX_VALUE,
    max: -Number.MAX_VALUE,
    values: [],
  };
};

const processMeasurements = (measurements) => {
  const measurementsByDay = {};

  measurements.forEach((m) => {
    const mDayKey = getStartOfDay(m.timestamp);
    if (!(mDayKey in measurementsByDay)) {
      measurementsByDay[mDayKey] = {
        loc: {
          lat: getEmptyObj(),
          lon: getEmptyObj(),
        },
        sensors: {
          NH3: getEmptyObj(),
          OXI: getEmptyObj(),
          RED: getEmptyObj(),
          aqi: getEmptyObj(),
          co: getEmptyObj(),
          co2: getEmptyObj(),
          eth: getEmptyObj(),
          h2: getEmptyObj(),
          meth: getEmptyObj(),
          tvocs: getEmptyObj(),
        },
        pigeons: new Set(),
      };
    }

    measurementsByDay[mDayKey].pigeons.add(m.pigeon);

    Object.entries(measurementsByDay[mDayKey].loc).forEach(([lk, lv]) => {
      const cleanVal = (lk in m) ? m[lk] : 0;
      updateMinMax(lv, cleanVal);
      lv.values.push(cleanVal);
    });

    Object.entries(measurementsByDay[mDayKey].sensors).forEach(([sk, sv]) => {
      const cleanVal = (sk in m) ? m[sk] : 0;
      updateMinMax(sv, cleanVal);
      sv.values.push(cleanVal);
    });
  });

  Object.values(measurementsByDay).forEach((m) => {
    m.pigeons = Array.from(m.pigeons).sort();

    Object.values(m.loc).forEach((lv) => {
      lv.mean = getMean(lv.values);
      delete lv.values;
    });

    Object.values(m.sensors).forEach((sv) => {
      sv.mean = getMean(sv.values);
      delete sv.values;
    });
  });

  return measurementsByDay;
};

const updateSessions = async (measurementsBySession, token) => {
  const delUrl = `${DB_URL}/sessions.json?auth=${token}`;

  try {
    const resTxt = await request("DELETE", delUrl, {});
    const resObj = JSON.parse(resTxt);
    console.log(resObj);
  } catch (e) {
    console.log(e);
  }

  Object.keys(measurementsBySession).forEach(async (sk) => {
    const putUrl = `${DB_URL}/sessions/${String(sk)}.json?auth=${token}`;

    try {
      const resTxt = await request("PUT", putUrl, measurementsBySession[sk]);
      const resObj = JSON.parse(resTxt);
      console.log(sk, resObj);
    } catch (e) {
      console.log(e);
    }
  });
};

const mToken = await getToken(AUTH_URL, API_KEY);
const m = await getAllMeasurements();
const pm = processMeasurements(m);
updateSessions(pm, mToken);

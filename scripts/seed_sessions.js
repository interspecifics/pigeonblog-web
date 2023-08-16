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

const get_token = async (auth_url, api_key) => {
  const post_url = `${auth_url}?key=${api_key}`;

  let token = "";
  try {
    const res = await request("POST", post_url, { returnSecureToken: true });
    const res_obj = JSON.parse(res);
    token = res_obj["idToken"];
  } catch (e) {
    token = "";
  }

  return token;
};

const get_start_of_day = (ts) => {
  return ts - (ts % (24 * 60 * 60 * 1000)) + 1000;
};

const get_first_measurement_after = async (ts) => {
  const start_of_day = get_start_of_day(ts);
  const start_of_next_day = start_of_day + 24 * 60 * 60 * 1000;

  const get_url = `${DB_URL}/measurements.json?orderBy="timestamp"&startAt=${start_of_next_day}&limitToFirst=1`;

  let measurement = {};
  try {
    const res = await request("GET", get_url, {});
    const res_obj = JSON.parse(res);
    measurement = Object.values(res_obj)[0];
  } catch ({ name, message }) {
    if (name != "TypeError") console.log(name, message);
    measurement = {};
  }
  return measurement;
};

const get_unique_days = async () => {
  const unique_days = new Set();

  let latest_measurement = {
    timestamp: 1000,
  };

  while ("timestamp" in latest_measurement) {
    latest_measurement = await get_first_measurement_after(
      latest_measurement["timestamp"]
    );
    if ("timestamp" in latest_measurement) {
      unique_days.add(get_start_of_day(latest_measurement["timestamp"]));
    }
  }

  return unique_days;
};

const update_sessions = async (unique_days, token) => {
  Array.from(unique_days).forEach(async (d) => {
    const put_url = `${DB_URL}/sessions/${String(d)}.json?auth=${token}`;

    try {
      const res = await request("PUT", put_url, true);
      const res_obj = JSON.parse(res);
      console.log(d, res_obj);
    } catch (e) {
      console.log(e);
    }
  });
};

const m_token = await get_token(AUTH_URL, API_KEY);
const m_days = await get_unique_days();
await update_sessions(m_days, m_token);

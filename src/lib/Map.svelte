<script lang="ts">
  import { onMount } from "svelte";
  import { type EventData, type GeoJSONSource, Map, Popup } from "mapbox-gl";
  import { type Measurement, Sensors, type Session } from "$lib/types";

  import PigeonMenu from "$lib/PigeonMenu.svelte";
  import SensorMenu from "$lib/SensorMenu.svelte";

  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

  export let measurements: Array<Measurement> = [];
  export let session: Session;

  let map: Map;
  let mPopup: Popup;
  let mapContainer: HTMLElement;
  let activePigeons: Array<number>;
  let activeSensors: Array<Sensors>;

  const SENSOR_COLORS: { [key in Sensors]: string } = {
    RED: "#DB2C3C",
    NH3: "#F9C80E",
    OXI: "#455FA2",
  };

  const updateMapSources = () => {
    const geoJson: { [sensorId: string]: any } = {};

    Object.values(Sensors).forEach((sensor) => {
      geoJson[sensor] = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: measurements.map((m) => {
            return {
              type: "Feature",
              properties: {
                pigeon: m.pigeon,
                sensor: sensor,
                value: m[sensor],
                temp: m.temp,
                alti: m.alti,
                pres: m.pres,
                timestamp: m.timestamp,
              },
              geometry: {
                type: "Point",
                coordinates: [m.lon, m.lat],
              },
            };
          }),
        },
      };
    });

    if (typeof map === "undefined" || map === null || !map.isStyleLoaded())
      return;

    Object.values(Sensors).forEach((sensor) => {
      if (map.getSource(sensor)) {
        const sensorSource = map.getSource(sensor) as GeoJSONSource;
        sensorSource.setData(geoJson[sensor].data);
      } else {
        map.addSource(sensor, geoJson[sensor]);
      }
    });

    activePigeons = [...session.pigeons];

    map.flyTo({
      center: [session.loc.lon.mean, session.loc.lat.mean],
      zoom: 10,
      curve: 0.75,
    });
  };

  const updateLayerFilters = (): void => {
    if (!map.getLayer(`${Object.values(Sensors)[0]}-circle`)) return;

    Object.values(Sensors).forEach((sensor) => {
      map.setFilter(
        `${sensor}-circle`,
        ["in", ["get", "pigeon"], ["literal", activePigeons]],
        { validate: false }
      );

      // TODO: put this in a function
      map.setPaintProperty(`${sensor}-circle`, "circle-radius", [
        "interpolate",
        ["linear"],
        ["zoom"],
        8,
        [
          "interpolate",
          ["linear"],
          ["get", "value"],
          session.sensors[sensor].min,
          4,
          session.sensors[sensor].max + 0.001,
          8,
        ],
        15,
        [
          "interpolate",
          ["linear"],
          ["get", "value"],
          session.sensors[sensor].min,
          8,
          session.sensors[sensor].max + 0.001,
          32,
        ],
      ]);
    });
  };

  const updateSensorVisibilities = (): void => {
    if (!map.getLayer(`${Object.values(Sensors)[0]}-circle`)) return;

    Object.values(Sensors).forEach((sensor) => {
      const isActive = activeSensors.includes(sensor);
      const visibilityValue = isActive ? "visible" : "none";
      map.setLayoutProperty(`${sensor}-circle`, "visibility", visibilityValue);
    });
  };

  const hideMapBoxAd = (): void => {
    const mpcs = document.getElementsByClassName("mapboxgl-control-container");
    (mpcs[0] as HTMLDivElement).style.display = "none";
  };

  onMount(() => {
    map = new Map({
      accessToken:
        "pk.eyJ1IjoidGhlcnNhbiIsImEiOiJjbGxmcTY0OGcwdzZxM3NuZ3YyMWpqb3Q4In0.LXXJ8kkXYy2eZa8x0g_6cA",
      container: mapContainer,
      style: "mapbox://styles/thersan/clll2295d00cj01p2dzm9ft1r",
      center: [session.loc.lon.mean, session.loc.lat.mean],
      zoom: 10,
      cooperativeGestures: true,
    });

    map.on("load", () => {
      hideMapBoxAd();
      updateMapSources();
      mPopup = new Popup();

      Object.values(Sensors).forEach((sensor, i) => {
        map.addLayer({
          id: `${sensor}-circle`,
          type: "circle",
          source: sensor,
          minzoom: 8,
          layout: {
            visibility: i == 0 ? "visible" : "none",
          },
          filter: ["in", ["get", "pigeon"], ["literal", session.pigeons]],
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              8,
              [
                "interpolate",
                ["linear"],
                ["get", "value"],
                session.sensors[sensor].min,
                4,
                session.sensors[sensor].max + 0.001,
                8,
              ],
              15,
              [
                "interpolate",
                ["linear"],
                ["get", "value"],
                session.sensors[sensor].min,
                8,
                session.sensors[sensor].max + 0.001,
                32,
              ],
            ],
            "circle-color": SENSOR_COLORS[sensor],
            "circle-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              8,
              0,
              13,
              1,
            ],
          },
        });

        map.on("click", `${sensor}-circle`, (e: EventData): void => {
          const topFeature: GeoJSON.Feature<GeoJSON.Point> = e.features[0];
          const coords = topFeature.geometry.coordinates as [number, number];
          const props = topFeature.properties;

          if (typeof props === undefined || props === null) return;

          const mHtml = `
          Pigeon: ${props.pigeon}
          (${new Date(props.timestamp).toLocaleTimeString("en-US", {
            timeZone: "America/Los_Angeles",
            hourCycle: "h23",
          })})<br>
          ${props.sensor}: ${props.value}<br>
          Location: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`;

          mPopup.setLngLat(coords).setHTML(mHtml).addTo(map);
        });

        map.on("mouseenter", `${sensor}-circle`, () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", `${sensor}-circle`, () => {
          map.getCanvas().style.cursor = "";
        });
      });
    });
  });

  $: if (measurements.length > 0) {
    updateMapSources();
  }
  $: if (activePigeons) {
    mPopup.remove();
    updateLayerFilters();
  }
  $: if (activeSensors) {
    mPopup.remove();
    updateSensorVisibilities();
  }
</script>

<div class="map-container">
  <div id="map" class="map-element" bind:this={mapContainer} />

  <SensorMenu bind:activeSensors />

  <PigeonMenu sessionPigeons={session.pigeons} bind:activePigeons />
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  .map-container {
    width: 100%;
    height: 88vh;
    position: relative;
    margin: 12px 0;
  }

  .map-element {
    width: 100%;
    height: 100%;
  }
</style>

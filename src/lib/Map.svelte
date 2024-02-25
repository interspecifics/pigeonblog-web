<script lang="ts">
  import { onMount } from "svelte";
  import { type EventData, type GeoJSONSource, Map, Popup } from "mapbox-gl";
  import type { Measurement, Sensors, Session } from "$lib/types";

  import { SENSORS } from "$lib/constants";
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

  const MAP_COLORS: string[] = [
    "#DB2C3C",
    "#F9C80E",
    "#455FA2",
  ];

  const updateMapSources = () => {
    const geoJson: { [sensorId: string]: any } = {};

    SENSORS.forEach((sensor) => {
      geoJson[sensor.id] = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: measurements.map((m) => {
            return {
              type: "Feature",
              properties: {
                pigeon: m.pigeon,
                sensorname: sensor.name,
                value: m[sensor.id],
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
          }).filter(o => o.properties.value !== undefined),
        },
      };
    });

    if (typeof map === "undefined" || map === null || !map.isStyleLoaded())
      return;

    SENSORS.forEach((sensor) => {
      if (map.getSource(sensor.id)) {
        const sensorSource = map.getSource(sensor.id) as GeoJSONSource;
        sensorSource.setData(geoJson[sensor.id].data);
      } else {
        map.addSource(sensor.id, geoJson[sensor.id]);
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
    if (!map.getLayer(`${SENSORS[0].id}-circle`)) return;

    SENSORS.forEach((sensor) => {
      map.setFilter(
        `${sensor.id}-circle`,
        ["in", ["get", "pigeon"], ["literal", activePigeons]],
        { validate: false }
      );

      // TODO: put this in a function
      map.setPaintProperty(`${sensor.id}-circle`, "circle-radius", [
        "interpolate",
        ["linear"],
        ["zoom"],
        8,
        [
          "interpolate",
          ["linear"],
          ["get", "value"],
          session.sensors[sensor.id].min,
          4,
          session.sensors[sensor.id].max + 0.001,
          8,
        ],
        15,
        [
          "interpolate",
          ["linear"],
          ["get", "value"],
          session.sensors[sensor.id].min,
          8,
          session.sensors[sensor.id].max + 0.001,
          32,
        ],
      ]);
    });
  };

  const updateSensorVisibilities = (): void => {
    if (!map.getLayer(`${SENSORS[0].id}-circle`)) return;

    SENSORS.forEach((sensor) => {
      const isActive = activeSensors.includes(sensor.id);
      const visibilityValue = isActive ? "visible" : "none";
      map.setLayoutProperty(`${sensor.id}-circle`, "visibility", visibilityValue);
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

      SENSORS.forEach((sensor, i) => {
        map.addLayer({
          id: `${sensor.id}-circle`,
          type: "circle",
          source: sensor.id,
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
                session.sensors[sensor.id].min,
                4,
                session.sensors[sensor.id].max + 0.001,
                8,
              ],
              15,
              [
                "interpolate",
                ["linear"],
                ["get", "value"],
                session.sensors[sensor.id].min,
                8,
                session.sensors[sensor.id].max + 0.001,
                32,
              ],
            ],
            "circle-color": MAP_COLORS[i % MAP_COLORS.length],
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

        map.on("click", `${sensor.id}-circle`, (e: EventData): void => {
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
          ${props.sensorname}: ${props.value}<br>
          Location: ${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`;

          mPopup.setLngLat(coords).setHTML(mHtml).addTo(map);
        });

        map.on("mouseenter", `${sensor.id}-circle`, () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", `${sensor.id}-circle`, () => {
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

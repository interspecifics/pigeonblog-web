<script lang="ts">
  import { onMount } from "svelte";
  import { type GeoJSONSource, Map } from "mapbox-gl";
  import { type Measurement, Sensors, type Session } from "$lib/types";

  import PigeonMenu from "$lib/PigeonMenu.svelte";

  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

  export let measurements: Measurement[] = [];
  export let session: Session;

  let map: Map;
  let mapContainer: HTMLElement;
  let activePigeons: number[];

  const SENSOR_COLORS: { [key in Sensors]: string } = {
    RED: "#ff0000",
    NH3: "#00ff00",
    OXI: "#0000ff",
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
      zoom: 9,
      curve: 0.75,
    });
  };

  const updateLayerFilters = () => {
    if (!map.getLayer(`${Object.values(Sensors)[0]}-circle`)) return;

    Object.values(Sensors).forEach((sensor) => {
      map.setFilter(
        `${sensor}-circle`,
        ["in", ["get", "pigeon"], ["literal", activePigeons]],
        { validate: false }
      );
    });
  };

  const toggleSensor = (ev: MouseEvent): void => {
    const element = ev.target as HTMLDivElement;
    const sensor = element.getAttribute("data-sensor-name") || "";
    element.classList.toggle("active");
    const isActive = element.classList.contains("active");
    const visibilityValue = isActive ? "visible" : "none";
    map.setLayoutProperty(`${sensor}-circle`, "visibility", visibilityValue);
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
      style: "mapbox://styles/mapbox/streets-v12",
      center: [session.loc.lon.mean, session.loc.lat.mean],
      zoom: 9,
    });

    map.on("load", () => {
      hideMapBoxAd();
      updateMapSources();

      Object.values(Sensors).forEach((sensor) => {
        map.addLayer({
          id: `${sensor}-circle`,
          type: "circle",
          source: sensor,
          minzoom: 8,
          layout: {
            visibility: "visible",
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
              12,
              1,
            ],
          },
        });
      });
    });
  });

  $: if (measurements.length > 0) {
    updateMapSources();
  }
  $: if (activePigeons) {
    updateLayerFilters();
  }
</script>

<div class="map-container">
  <div id="map" class="map-element" bind:this={mapContainer} />

  <div class="map-menu-container">
    {#each Object.values(Sensors) as sensor}
      <button
        class="sensor-button active"
        data-sensor-name={sensor}
        on:click={toggleSensor}
      >
        {sensor}
      </button>
    {/each}
  </div>

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

  .map-menu-container {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    z-index: 10;

    .sensor-button {
      min-width: 70px;
      padding: 8px 12px;
      border: #222 1px solid;
      background-color: #fff;
      color: #222;
      margin-bottom: 12px;
      cursor: pointer;

      &:hover {
        background-color: #ddd;
      }

      &.active {
        background-color: #3887be;
        color: #ffffff;
        &:hover {
          background-color: #3074a4;
        }
      }
    }
  }
</style>

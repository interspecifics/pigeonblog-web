<script lang="ts">
  import { onMount } from "svelte";
  import { Map } from "mapbox-gl";

  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

  import type mapboxgl from "mapbox-gl";
  import { type Measurement, Sensors } from "$lib/types";

  export let measurements: Measurement[];

  let map: mapboxgl.Map;
  let mapContainer: HTMLElement;

  onMount(() => {
    const geoJson: { [sensorId: string]: any } = {};

    const sensorColors: { [key in Sensors]: string } = {
      RED: "rgba(200, 20, 20, 0.5)",
      NH3: "rgba(20, 200, 20, 0.5)",
      OXI: "rgba(20, 20, 200, 0.5)",
    };

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

    map = new Map({
      accessToken:
        "pk.eyJ1IjoidGhlcnNhbiIsImEiOiJjbGxmcTY0OGcwdzZxM3NuZ3YyMWpqb3Q4In0.LXXJ8kkXYy2eZa8x0g_6cA",
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-118.2437, 34.0522],
      zoom: 9,
    });

    map.on("load", () => {
      Object.values(Sensors).forEach((sensor) => {
        map.addSource(sensor, geoJson[sensor]);
        map.addLayer({
          id: sensor,
          type: "circle",
          source: sensor,
          layout: {
            visibility: "visible",
          },
          paint: {
            "circle-color": sensorColors[sensor],
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              ["*", ["-", ["get", "value"], 18], 1],
              15,
              ["*", ["-", ["get", "value"], 18], 10],
            ],
          },
        });
      });
    });
  });
</script>

<div id="map" class="map-container" bind:this={mapContainer} />

<style>
  .map-container {
    width: 100%;
    height: 100%;
  }
</style>

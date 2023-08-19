<script lang="ts">
  import { onMount } from "svelte";

  import type { Measurement } from "$lib/types";

  import Card from "$lib/Card.svelte";
  import Map from "$lib/Map.svelte";

  const DB_URL = "https://pigeonblog-db-default-rtdb.firebaseio.com";

  const getMeasurements = async (dts: number): Promise<Measurement[]> => {
    const dtsp1 = dts + 24 * 60 * 60 * 1000;

    const getUrl = `${DB_URL}/measurements.json`;
    const getParams = `orderBy="timestamp"&startAt=${dts}&endAt=${dtsp1}`;

    const res = await fetch(`${getUrl}?${getParams}`);
    const mObjs = await res.json();
    const measurements: Measurement[] = Object.values(mObjs);
    return measurements.sort((a, b) => a.timestamp - b.timestamp);
  };

  const getSessions = async (): Promise<number[]> => {
    const res = await fetch(`${DB_URL}/sessions.json`);
    const sObjs = await res.json();
    const sessions = Object.keys(sObjs).map((k) => parseInt(k));
    return sessions;
  };

  const loadSession = (ev: Event): void => {
    const element = ev.target as HTMLSelectElement;
    sessionTimestamp = parseInt(element.value);
    measurementsP = getMeasurements(sessionTimestamp);
    measurementsP.then((m) => (mapMeasurements = m));
  };

  const getPigeons = (ms: Measurement[]): number[] => {
    const pigeonSet = ms.reduce((a, m) => a.add(m.pigeon), new Set<number>());
    return Array.from(pigeonSet).sort();
  };

  const toDate = (e: number): string =>
    new Date(e).toLocaleDateString("en-us", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  let sessionTimestamp: number;
  let sessionsP: Promise<number[]> = new Promise(() => {});
  let measurementsP: Promise<Measurement[]> = new Promise(() => {});
  let mapMeasurements: Measurement[] = [];

  onMount(async () => {
    sessionsP = getSessions();
    sessionsP.then((sessions) => {
      sessionTimestamp = sessions[0];
      measurementsP = getMeasurements(sessionTimestamp);
      measurementsP.then((m) => (mapMeasurements = m));
    });
  });
</script>

{#await sessionsP}
  <p>...waiting</p>
{:then sessions}
  <select on:change={loadSession}>
    {#each sessions as s}
      <option value={s}>{toDate(s)}</option>
    {/each}
  </select>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<div>Pigeons:</div>
{#await measurementsP}
  <div>...waiting</div>
{:then measurements}
  <div>{getPigeons(measurements).join(", ")}</div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<Map measurements={mapMeasurements} />

{#await measurementsP}
  <div>...waiting</div>
{:then measurements}
  <div class="cards-container">
    {#each measurements as measurement}
      <Card {measurement} />
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  .cards-container {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>

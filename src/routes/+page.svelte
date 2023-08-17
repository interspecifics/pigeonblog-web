<script lang="ts">
  import type { Measurement } from "$lib/types";

  import { onMount } from "svelte";
  import Card from "$lib/Card.svelte";

  const DB_URL = "https://pigeonblog-db-default-rtdb.firebaseio.com";

  const loadMeasurements = async (dts: number): Promise<Measurement[]> => {
    dts = dts || 1;
    const dtsp1 = dts + 24 * 60 * 60 * 1000;

    const getUrl = `${DB_URL}/measurements.json`;
    const getParams = `orderBy="timestamp"&startAt=${dts}&endAt=${dtsp1}`;

    const res = await fetch(`${getUrl}?${getParams}`);
    const mObjs = await res.json();
    const measurements: Measurement[] = Object.values(mObjs);
    return measurements.sort((a, b) => a.timestamp - b.timestamp);
  };

  const loadSessions = async (): Promise<number[]> => {
    const res = await fetch(`${DB_URL}/sessions.json`);
    const sObjs = await res.json();
    const sessions = Object.keys(sObjs).map((k) => parseInt(k));
    return sessions;
  };

  const selectSession = (ev: Event): void => {
    const element = ev.target as HTMLSelectElement;
    sessionTimestamp = parseInt(element.value);
    measurementsP = loadMeasurements(sessionTimestamp);
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

  let sessionTimestamp: number = 0;
  let sessions: number[] = [];
  let measurementsP: Promise<Measurement[]> = new Promise(() => {});

  onMount(async () => {
    sessions = await loadSessions();
    sessionTimestamp = sessions[0];
    measurementsP = loadMeasurements(sessionTimestamp);
  });
</script>

<select on:change={selectSession}>
  {#each sessions as s}
    <option value={s}>{toDate(s)}</option>
  {/each}
</select>

{#await measurementsP}
  <p>...waiting</p>
{:then measurements}
  <div>Pigeons:</div>
  <div>{getPigeons(measurements).join(", ")}</div>

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

<script lang="ts">
  import type { Measurement } from "$lib/types";

  import { onMount } from "svelte";
  import Card from "$lib/Card.svelte";

  const DB_URL = "https://pigeonblog-db-default-rtdb.firebaseio.com";

  const loadMeasurements = async (dts: number) => {
    dts = dts || 1;
    const dtsp1 = dts + 24 * 60 * 60 * 1000;

    const getUrl = `${DB_URL}/measurements.json`;
    const getParams = `orderBy="timestamp"&startAt=${dts}&endAt=${dtsp1}`;

    const res = await fetch(`${getUrl}?${getParams}`);
    const mObjs = await res.json();
    const measurements = Object.keys(mObjs).map((k) => mObjs[k]);
    return measurements.sort((a, b) => a.timestamp - b.timestamp);
  };

  const loadSessions = async () => {
    const res = await fetch(`${DB_URL}/sessions.json`);
    const sObjs = await res.json();
    const sessions = Object.keys(sObjs).map((k) => parseInt(k));
    return sessions;
  };

  const selectSession = (ev: Event) => {
    const element = ev.target as HTMLSelectElement;
    session = parseInt(element.value);
  };

  const toDate = (e: number) =>
    new Date(e).toLocaleDateString("en-us", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  let session: number = 0;
  let sessions: number[] = [];
  let measurementsP: Promise<Measurement[]>;

  onMount(async () => {
    sessions = await loadSessions();
    session = sessions[0];
  });

  $: measurementsP = loadMeasurements(session);
</script>

<select on:change={selectSession}>
  {#each sessions as s}
    <option value={s}>{toDate(s)}</option>
  {/each}
</select>

{#await measurementsP}
  <p>...waiting</p>
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

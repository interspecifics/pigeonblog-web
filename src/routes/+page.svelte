<script lang="ts">
  import { onMount } from "svelte";

  import type { Measurement } from "$lib/types";

  import Map from "$lib/Map.svelte";

  const DB_URL = "https://pigeonblog-db-default-rtdb.firebaseio.com";

  const getMeasurements = async (dts: number): Promise<Measurement[]> => {
    const dtsp1 = dts + 24 * 60 * 60 * 1000;

    const getUrl = `${DB_URL}/measurements.json`;
    const getParams = `orderBy="timestamp"&startAt=${dts}&endAt=${dtsp1}`;

    const resTxt = await fetch(`${getUrl}?${getParams}`);
    const resObj = await resTxt.json();
    const measurements: Measurement[] = Object.values(resObj);
    return measurements.sort((a, b) => a.timestamp - b.timestamp);
  };

  const getSessions = async (): Promise<{ [key in string]: any }> => {
    const resTxt = await fetch(`${DB_URL}/sessions.json`);
    const sessions: { [key in string]: any } = await resTxt.json();
    return sessions;
  };

  const getSessionTimestamps = (sessions: { [key in string]: any }) => {
    return Object.keys(sessions)
      .map((v) => parseInt(v))
      .sort();
  };

  const updateMeasurements = (currentSessionTimestamp: number) => {
    measurementsP = getMeasurements(currentSessionTimestamp);
    measurementsP.then((m) => (measurements = m));
  };

  const loadSession = (ev: Event): void => {
    const element = ev.target as HTMLSelectElement;
    currentSessionTimestamp = parseInt(element.value);
  };

  const toDate = (e: number): string =>
    new Date(e).toLocaleDateString("en-us", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  let currentSessionTimestamp: number;
  let sessionsP: Promise<{ [key in string]: any }> = new Promise(() => {});
  let measurementsP: Promise<Measurement[]> = new Promise(() => {});

  let sessions: { [key in string]: any } = {};
  let measurements: Measurement[] = [];

  onMount(async () => {
    sessionsP = getSessions();
    sessionsP.then((sess) => {
      sessions = sess;
      currentSessionTimestamp = getSessionTimestamps(sessions)[0];
    });
  });

  $: if (currentSessionTimestamp) updateMeasurements(currentSessionTimestamp);
  $: currentSession = sessions[currentSessionTimestamp];
</script>

{#await sessionsP}
  <p>...waiting</p>
{:then pSessions}
  <select on:change={loadSession}>
    {#each getSessionTimestamps(pSessions) as s}
      <option value={s}>{toDate(s)}</option>
    {/each}
  </select>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<div>Pigeons:</div>
{#await sessionsP}
  <div>...waiting</div>
{:then}
  <div>{currentSession.pigeons.join(", ")}</div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

{#if currentSession}
  <Map {measurements} session={currentSession} />
{/if}

{#await measurementsP}
  <div>...waiting</div>
{:then pMeasurements}
  <div>Loaded {pMeasurements.length} data points</div>
{/await}

<script lang="ts">
  import type { Measurement } from "$lib/types";

  export let measurement: Measurement;

  const trunc = (v: number): string => v.toFixed(4);
  const toDate = (e: number): string => new Date(e).toISOString();

  const cardClick = (ev: MouseEvent): void => {
    const element = ev.target as HTMLDivElement;
    const content = element.parentNode?.querySelector(".card-content");
    content?.classList.toggle("hide");
  };
</script>

<div class="card-container">
  <button class="card-title" on:click={cardClick}>
    {toDate(measurement.timestamp)}
  </button>
  <div class="card-content hide">
    <div class="">Pigeon: {measurement.pigeon}</div>
    <div class="">
      Location: ({trunc(measurement.lat)}, {trunc(measurement.lon)})
    </div>
    <div class="">
      Temp: {trunc(measurement.temp)}, Press: {trunc(measurement.pres)}, Alt: {trunc(measurement.alti)}
    </div>
    <div class="">
      NH3: {measurement.NH3}, OXI: {measurement.OXI}, RED: {measurement.RED}
    </div>
  </div>
</div>

<style>
  .card-container {
    box-sizing: border-box;
    width: 24%;
    border: 1px #000 solid;
    margin: 12px 0.5%;
  }

  .card-title {
    display: block;
    width: 100%;
    border: 0;
    background-color: #bbb;
    cursor: pointer;
  }

  .card-content {
    overflow: hidden;
  }

  .card-content.hide {
    height: 0;
  }
</style>

<script lang="ts">
  import type { Measurement } from "$lib/types";

  export let measurement: Measurement;

  const cardClick = (ev: MouseEvent): void => {
    const element = ev.target as HTMLDivElement;
    const content = element.parentNode?.querySelector(".card-content");
    content?.classList.toggle("hide");
  };
</script>

<div class="card-container">
  <button class="card-title" on:click={cardClick}>
    {new Date(measurement.timestamp).toISOString()}
  </button>
  <div class="card-content hide">
    <div class="">Pigeon: {measurement.pigeon}</div>
    <div class="">
      Location: ({measurement.lat.toFixed(4)}, {measurement.lon.toFixed(4)})
    </div>
    <div class="">
      Temp: {measurement.temp.toFixed(2)}, Press: {measurement.pres.toFixed(2)},
      Alt: {measurement.alti.toFixed(2)}
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

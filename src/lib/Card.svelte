<script lang="ts">
  export let measurement;

  const trunc = (v: number) => v.toFixed(4);
  const toDate = (e: number) => new Date(e).toISOString();

  const cardClick = (ev: MouseEvent) => {
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
      Loc: ({trunc(measurement.lat)}, {trunc(measurement.lon)})
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

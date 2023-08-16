<script>
  export let measurement;
  const trunc = (v) => v.toFixed(4);
  const toDate = (e) => new Date(e).toISOString();
  const cardClick = (ev) => {
    const content = ev.target.parentNode.querySelector(".card-content");
    content.classList.toggle("hide");
  };
</script>

<div class="card-container">
  <div class="card-title" on:click={cardClick}>
    {toDate(measurement.timestamp)}
  </div>
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
    cursor: pointer;
  }

  .card-title {
    background-color: #bbb;
  }

  .card-content {
    overflow: hidden;
  }

  .card-content.hide {
    height: 0;
  }
</style>

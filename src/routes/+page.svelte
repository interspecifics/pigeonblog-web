<script>
  export let data;
  import Card from "$lib/Card.svelte";
</script>

<h2>HOME</h2>

<div class="cards-container">
  {#each data.measurements as measurement}
    <Card {measurement}></Card>
  {/each}
</div>

<style>
  .cards-container {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>

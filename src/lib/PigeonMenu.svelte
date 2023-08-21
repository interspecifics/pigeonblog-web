<script lang="ts">
  export let activePigeons: number[];
  export let sessionPigeons: number[];
  $: activePigeonsSet = new Set(sessionPigeons);

  const togglePigeons = (ev: MouseEvent): void => {
    const element = ev.target as HTMLDivElement;
    const pigeon = element.getAttribute("data-pigeon-name") || "";
    element.classList.toggle("active");

    if (element.classList.contains("active")) {
      activePigeonsSet.add(parseInt(pigeon));
    } else {
      activePigeonsSet.delete(parseInt(pigeon));
    }
    activePigeons = Array.from(activePigeonsSet);
  };
</script>

<div class="pigeon-menu-container">
  {#each sessionPigeons as pigeon}
    <button
      class="pigeon-button active"
      data-pigeon-name={pigeon}
      on:click={togglePigeons}
    >
      {pigeon}
    </button>
  {/each}
</div>

<style lang="scss">
  .pigeon-menu-container {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    flex-direction: column;
    z-index: 10;

    .pigeon-button {
      min-width: 70px;
      padding: 8px 12px;
      border: #222 1px solid;
      background-color: #fff;
      color: #222;
      margin-bottom: 12px;
      cursor: pointer;

      &:hover {
        background-color: #ddd;
      }

      &.active {
        background-color: #3887be;
        color: #ffffff;
        &:hover {
          background-color: #3074a4;
        }
      }
    }
  }
</style>

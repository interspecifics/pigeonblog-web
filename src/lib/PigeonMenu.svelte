<script lang="ts">
  export let activePigeons: number[];
  export let sessionPigeons: number[];
  $: activePigeonsSet = new Set(sessionPigeons);

  const updatePigeons = (ev: MouseEvent): void => {
    const element = ev.target as HTMLDivElement;
    const allButtons = document.getElementsByClassName("pigeon-button");

    if (element.classList.contains("active")) {
      Array.from(allButtons)
        .filter((el) => el != element)
        .forEach((el) => {
          el.classList.toggle("active");
        });
    } else {
      Array.from(allButtons)
        .filter((el) => el.classList.contains("active"))
        .forEach((el) => {
          el.classList.toggle("active");
        });
      element.classList.toggle("active");
    }

    activePigeonsSet.clear();
    Array.from(allButtons)
      .filter((el) => el.classList.contains("active"))
      .forEach((el) => {
        const elPigeon = el.getAttribute("data-pigeon-name") || "";
        activePigeonsSet.add(parseInt(elPigeon));
      });

    activePigeons = Array.from(activePigeonsSet);
  };

  const resetElements = (): void => {
    const allButtons = document.getElementsByClassName("pigeon-button");
    Array.from(allButtons).forEach((el) => {
      el.classList.add("active");
    });
  };

  $: if (sessionPigeons) {
    resetElements();
  }
</script>

<div class="pigeon-menu-container">
  {#each sessionPigeons as pigeon}
    <button
      class="pigeon-button active"
      data-pigeon-name={pigeon}
      on:click={updatePigeons}
    >
      {pigeon}
    </button>
  {/each}
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

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
      user-select: none;

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

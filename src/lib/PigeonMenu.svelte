<script lang="ts">
  import { PIGEONS } from "$lib/constants";

  import PigeonInfoCard from "./PigeonInfoCard.svelte";
  import type { PigeonInfo } from "./types";

  export let activePigeons: Array<number>;
  export let sessionPigeons: Array<number>;
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

  const getPigeonInfo = (pid: number): PigeonInfo => {
    const byId = PIGEONS.filter(p => p.id == pid);
    const noId = PIGEONS.filter(p => p.id == -1);
    const pInfo = byId.length > 0 ? byId[0] : noId[0];
    return pInfo
  };

  $: if (sessionPigeons) {
    resetElements();
  }
</script>

<div class="pigeon-menu-container">
  {#each sessionPigeons as pigeon}
    <div class="pigeon-menu-item">
      <button
        class="pigeon-button active"
        data-pigeon-name={pigeon}
        on:click={updatePigeons}
      >
        {pigeon}
      </button>
      <PigeonInfoCard mPigeonInfo={getPigeonInfo(pigeon)} {activePigeons} />
    </div>
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
    gap: 14px;

    .pigeon-menu-item {
      display: flex;
      flex-direction: row;
      gap: 1px;
      align-items: center;

      .pigeon-button {
        min-width: 70px;
        padding: 8px 12px;
        border: #222 1px solid;
        background-color: #fff;
        color: #222;
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
  }
</style>

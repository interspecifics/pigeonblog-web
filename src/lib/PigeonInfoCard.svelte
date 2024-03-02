<script lang="ts">
  import { onMount } from "svelte";
  import type { PigeonInfo } from "$lib/types";

  export let mPigeonInfo: PigeonInfo;
  export let activePigeons: Array<number>;

  let mOverlay: HTMLDivElement;
  let mSensorInfoContainer: HTMLDivElement;
  let mButtonContainer: HTMLDivElement;
  let mButton: HTMLButtonElement;

  const updateButton = (ev: MouseEvent): void => {
    mOverlay.classList.toggle("show");
    mButton.classList.toggle("active");
  };

  onMount(() => {
    mOverlay.addEventListener("click", updateButton);
    mSensorInfoContainer.addEventListener("click", (ev) =>
      ev.stopPropagation()
    );
  });

  $: sensorIsActive = activePigeons && activePigeons.includes(mPigeonInfo.id);
</script>

<div
  class="button-container"
  class:show={sensorIsActive}
  bind:this={mButtonContainer}
>
  <button
    class="button-info-button"
    class:active={0}
    on:click={updateButton}
    bind:this={mButton}
  >
    +
  </button>
</div>

<div class="pigeon-info-overlay" class:show={0} bind:this={mOverlay}>
  <div class="pigeon-info-container" bind:this={mSensorInfoContainer}>
    <h3>{mPigeonInfo.name}</h3>
    <p>{@html mPigeonInfo.info}</p>
  </div>
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  .button-container {
    pointer-events: none;
    opacity: 0;

    .button-info-button {
      height: 50%;
      border: #222 1px solid;
      background-color: #fff;
      color: #222;
      cursor: pointer;
      user-select: none;

      &.active {
        background-color: #3887be;
        color: #ffffff;
        pointer-events: none;
      }

      &:hover {
        background-color: #ddd;
      }
    }

    &.show {
      pointer-events: all;
      opacity: 1;
    }
  }

  .pigeon-info-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10;

    .pigeon-info-container {
      width: 50%;
      height: 50%;
      background-color: #fff;
      padding: 32px;
      pointer-events: none;
    }

    &.show {
      display: flex;
      flex-direction: column;
      pointer-events: all;

      .pigeon-info-container {
        pointer-events: all;
      }
    }
  }
</style>

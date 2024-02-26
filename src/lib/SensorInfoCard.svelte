<script lang="ts">
  import { onMount } from "svelte";
  import type { SensorInfo, Sensors } from "$lib/types";

  export let mSensorInfo: SensorInfo;
  export let activeSensors: Array<Sensors>;

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

  $: sensorIsActive = activeSensors && activeSensors.includes(mSensorInfo.id);
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

<div class="sensor-info-overlay" class:show={0} bind:this={mOverlay}>
  <div class="sensor-info-container" bind:this={mSensorInfoContainer}>
    <h3>{mSensorInfo.name}</h3>
    <p>{mSensorInfo.info}</p>
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
    }

    &.show {
      pointer-events: all;
      opacity: 1;
    }
  }

  .sensor-info-overlay {
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

    .sensor-info-container {
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

      .sensor-info-container {
        pointer-events: all;
      }
    }
  }
</style>

<script lang="ts">
  import type { Sensors } from "$lib/types";
  import { SENSORS } from "$lib/constants";

  export let activeSensors: Array<Sensors>;

  const activeSensorsSet = new Set([SENSORS[0].id]);

  const updateSensors = (ev: MouseEvent): void => {
    const element = ev.target as HTMLDivElement;
    const allButtons = document.getElementsByClassName("sensor-button");

    Array.from(allButtons)
      .filter((el) => el == element || el.classList.contains("active"))
      .forEach((el) => {
        el.classList.toggle("active");
      });

    activeSensorsSet.clear();
    Array.from(allButtons)
      .filter((el) => el.classList.contains("active"))
      .forEach((el) => {
        const elSensor = el.getAttribute("data-sensor-name") || "";
        const mSensor = SENSORS.filter(s => s.id === elSensor)[0];
        activeSensorsSet.add(mSensor.id);
      });

    activeSensors = Array.from(activeSensorsSet);
  };
</script>

<div class="sensor-menu-container">
  {#each SENSORS as sensor, i}
    <button
      class="sensor-button"
      class:active={i == 0}
      data-sensor-name={sensor.id}
      on:click={updateSensors}
    >
      {sensor.name}
    </button>
  {/each}
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  .sensor-menu-container {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    z-index: 10;

    .sensor-button {
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
        pointer-events: none;
      }
    }
  }
</style>

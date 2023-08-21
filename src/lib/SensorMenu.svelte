<script lang="ts">
  import { Sensors } from "$lib/types";

  export let activeSensors: Sensors[];
  const activeSensorsSet = new Set(Object.values(Sensors));

  const toggleSensor = (ev: MouseEvent): void => {
    const element = ev.target as HTMLDivElement;
    const sensor = element.getAttribute("data-sensor-name") || "";
    element.classList.toggle("active");
    if (element.classList.contains("active")) {
      activeSensorsSet.add(sensor as Sensors);
    } else {
      activeSensorsSet.delete(sensor as Sensors);
    }
    activeSensors = Array.from(activeSensorsSet);
  };
</script>

<div class="sensor-menu-container">
  {#each Object.values(Sensors) as sensor}
    <button
      class="sensor-button active"
      data-sensor-name={sensor}
      on:click={toggleSensor}
    >
      {sensor}
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

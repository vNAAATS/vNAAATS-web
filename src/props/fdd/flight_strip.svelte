<script lang="ts">
  import * as utils from "../../typescript/fdd/utils";
  import * as dataHandler from "../../typescript/fdd/data";

  // Elements for spread prop
  export let callsign: string;
  export let type: string;
  export let assignedLevel: number;
  export let assignedMach: number;
  export let track: string;
  export let route: string[];
  export let routeEtas: string[];
  export let departure: string;
  export let arrival: string;
  export let etd: string;
  export let selcal: string;
  export let datalink: boolean;
  export let direction: boolean;
  export let isEquipped: boolean;
  export let state: string;
  export let relevant: boolean;
  export let trackedBy: string;
  export let targetMode: number;
  export let sectorId: string;

  let colour: string = direction ? "bg-blue-10" : "bg-yellow-100";
  let darkerColour: string = direction ? "bg-blue-9" : "bg-yellow-200";
  let opacity: string = "bg-opacity-75";

  // Opacity
  let isActive: boolean = false;
  function stripMouseDown(): void {
    isActive = true;
  }
  function stripMouseUp(): void {
    isActive = false;
  }
</script>

<div class="hover:border-green-500 hover:border-2"
  on:click={() => dataHandler.setAsel(callsign)}>
  {#if track === "RR"}
    <div class="flex flex-col items-center justify-end py-0.5 w-full h-16 {darkerColour} {isActive ? 'bg-opacity-75' : ''} text-black hover:cursor-default"
      on:mousedown={stripMouseDown}
      on:mouseup={stripMouseUp}
      on:mouseleave={stripMouseUp}>
      <div class="flex flex-row justify-start items-center w-full">
        <div class="flex flex-row w-0.32" />
        <div class="flex flex-row w-0.68">
          {#each route as rte}
            <div class="w-1/11 select-none hover:cursor-default">
              {utils.coordToArray(rte).length != 0 ? utils.coordToArray(rte)[0]: rte}
            </div>
          {/each}
        </div>
      </div>
      <div class="flex flex-row justify-start items-center w-full select-none hover:cursor-default">
        <div class="flex flex-row w-0.32" />
        <div class="flex flex-row w-0.68">
          {#each route as rte}
            <div class="w-1/11 select-none hover:cursor-default">
              {utils.coordToArray(rte).length != 0 ? utils.coordToArray(rte)[1] : ""}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
  <div class="flex flex-row items-center w-full h-8 {colour} {isActive ? 'bg-opacity-75' : ''} text-black hover:cursor-default"
    on:mousedown={stripMouseDown}
    on:mouseup={stripMouseUp}
    on:mouseleave={stripMouseUp}>
    <div class="flex flex-row w-1/7 px-2 hover:cursor-default select-none">
      {callsign + (!isEquipped ? "*" : "")}
    </div>
    <div class="flex flex-row w-5/7 hover:cursor-default select-none">
      <!-- TODO fix this alignment -->
      <div class="w-1/7">
        {departure}/{arrival}
      </div>
      <div class="w-1/20">
        {assignedLevel}
      </div>
      <div class="w-1/12">
        M0{assignedMach}
      </div>
      {#each routeEtas as eta}
        <div class="w-1/11">
          {eta != "--" ? eta : "\xa0\xa0\xa0\xa0"}
        </div>
      {/each}
    </div>
    <div class="flex flex-row justify-end w-1/5 hover:cursor-default select-none">
      <div class="w-1/3">B789</div>
      <div class="w-3/7">
        {trackedBy != "" ? trackedBy : "\xa0"}
      </div>
    </div>
  </div>
</div>
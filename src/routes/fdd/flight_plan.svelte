<script lang="ts">
  import * as dataHandler from "../../typescript/fdd/data";
  import * as utils from "../../typescript/fdd/utils";
  import Titlebar from "../../props/fdd/titlebar.svelte";
  import TextInput from "../../props/fdd/text_input.svelte";
  import type { Aircraft } from "../../typescript/fdd/objects";

  // Externals
  let asel: Aircraft;
  $: asel = dataHandler.asel;

  // Component updater (50ms)
  setInterval(() => {
    asel = dataHandler.asel;
  }, 50);
</script>

<div
  class="flex flex-col w-full h-1/3 border-2 border-l-blue-0 border-t-blue-0 border-r-blue-10 border-b-blue-10">
  <Titlebar
    label="Flight Plan - {asel == null ? 'No selection' : asel.Callsign}"/>
  {#if asel != null}
    <div
      class="flex flex-row items-center justify-start px-3 py-3 border-b-2 w-full border-b-blue-0">
      <TextInput
        label={"ACID"}
        identifier={"acid"}
        width={"w-32"}
        value={asel.Callsign}
        isDisabled={true}
      />
      <TextInput
        label={"Type"}
        identifier={"type"}
        width={"w-16"}
        value={asel.Type}
        isDisabled={true}
      />
      <TextInput
        label={"Depart"}
        identifier={"depart"}
        width={"w-14"}
        value={asel.Departure}
        isDisabled={true}
      />

      <TextInput
        label={"Etd"}
        identifier={"etd"}
        width={"w-16"}
        value={asel.Etd.toString() + "z"}
        isDisabled={true}
      />
      <TextInput
        label={"SELCAL"}
        identifier={"selcal"}
        width={"w-16"}
        value={asel.Selcal == "" ? "----" : asel.Selcal}
        isDisabled={true}
      />
      <TextInput
        label={"Datalink"}
        identifier={"datalink"}
        width={"w-32"}
        value={dataHandler.natTrakData.get(asel.Callsign) != null ? "Connected" : "Disconnected"}
        inputForeColour={"text-black"}
        backColour={dataHandler.natTrakData.get(asel.Callsign) != null ? "bg-green-400" : "bg-red-500"}
        isDisabled={true}
      />
      <!-- TODO: Change datalink colour if not connected -->
      <TextInput
        label={"Sector"}
        identifier={"sector"}
        width={"w-10"}
        value={asel.SectorID == "" ? "--" : asel.SectorID}
        isDisabled={true}
      />
    </div>
    <div class="flex flex-row items-top justify-start">
      <div class="flex flex-row justify-start w-1/4">
        <div
          class="flex flex-row items-center justify-center m-1.5 ml-2 w-48 h-8 bg-blue-9 text-black font-bitmap text-xl font-thin">
          {asel.Callsign}
        </div>
      </div>
      <div class="flex flex-row items-start py-1.5 justify-start w-3/4">
        <TextInput
          label={"Spd"}
          identifier={"speed"}
          width={"w-28"}
          value={"M0" + asel.AssignedMach}
          isDisabled={true}
          labelOnTop={false}
        />
        <TextInput
          label={"FL"}
          identifier={"level"}
          width={"w-28"}
          value={asel.AssignedLevel.toString()}
          isDisabled={true}
          labelOnTop={false}
        />
        <TextInput
          label={"Dest"}
          identifier={"dest"}
          width={"w-14"}
          value={asel.Arrival}
          isDisabled={true}
          labelOnTop={false}
        />
      </div>
    </div>
    <div class="flex flex-row items-top pt-1 px-1 ml-1 justify-start">
      <div class="flex flex-row items-start overflow-x-scroll mt-2.5  px-1.5 py-0.5 justify-start w-5/6 h-28 bg-blue-9 
      border-2 border-l-blue-0 border-t-blue-0 border-r-blue-6 border-b-blue-6 text-black font-bitmap text-xl font-thin select-none cursor-default">
        <div class="flex flex-row">
          {#each asel.Route as point, i}
            <div class="flex flex-col pr-6">
              <div>
                {!point.includes("/") ? point : utils.coordToArray(point)[0]}
              </div>
              <div>
                {!point.includes("/") ? "\xa0" : utils.coordToArray(point)[1]}
              </div>
              <div>
                {asel.RouteEtas[i] == "--" ? "\xa0\xa0" : asel.RouteEtas[i]}
              </div>
            </div>
          {/each}
        </div>
      </div>
      <TextInput
        label={"Tck"}
        identifier={"track"}
        width={"w-8"}
        value={asel.Track}
        isDisabled={true}
      />
      <TextInput
        label={"State"}
        identifier={"level"}
        width={"w-9"}
        value={"UC"}
        isDisabled={true}
      />
    </div>
    <div class="flex flex-row items-top pt-0.5 w-full justify-self-start">
      <TextInput
        identifier={"level"}
        value={asel.IsEquipped ? "AGCS EQUIPPED" : "NON COMPLIANT"}
        isDisabled={true}
        widthWhole={"w-full"}
      />
    </div>
  {/if}
</div>

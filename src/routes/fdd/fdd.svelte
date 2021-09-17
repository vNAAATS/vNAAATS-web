<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import * as utils from "../../typescript/fdd/utils";
  import Button from "../../props/fdd/button.svelte";
  import Checkbox from "../../props/fdd/checkbox.svelte";
  import FlightStrip from "../../props/fdd/flight_strip.svelte";
  import * as dataHandler from "../../typescript/fdd/data";
  import * as site from "../../typescript/site";

  // Initialisation of data
  let isLoading: boolean = true;
  let noData: boolean = true;
  onMount(async () => {
    // Bye bye homepage
    site.setHome(false);

    // Start the fetcher
    dataHandler.runDataFetcher();

    // Title
    site.setTitle("Flight Data Display");

  });

  onDestroy(async () => {
    // Hello homepage
    site.setHome(true);
    clearInterval(dataHandler.acUpdateJob);
    clearInterval(dataHandler.tkUpdateJob);
  });

  // Externals
  $: acListKeys = [...dataHandler.networkAircraft.keys()];
  $: tmi = dataHandler.currentTMI;

  // Time string
  $: timeString = utils.parseTime(new Date());

  // DOM updater (1 second)
  setInterval(() => {
    // Reset externals
    acListKeys = [...dataHandler.networkAircraft.keys()];
    tmi = dataHandler.currentTMI;

    // Update time
    timeString = utils.parseTime(new Date());

    // Handle 'loading' and 'no content'
    if (dataHandler.networkAircraft.size > 1 && isLoading) {
      // we can assume if the tracks are downloaded that the data is done loading
      isLoading = false;

      // Check however that we have planes so that we may be able to display "no content" message.
      dataHandler.networkAircraft.forEach(function (value, key) {
        if (Array.from(value.keys()).length > 0) noData = false;
      });
    }
  }, 1000);
</script>

<!-- The main flight data panel with flight strips -->
<div class="flex flex-col w-full border-b-2 border-r-2 border-blue-10">
  <div class="flex flex-row justify-around w-full h-1/14 border-blue-10 border-b-2 text-white py-5 font-regular font-light">
    <div class="flex flex-row items-center justify-start 2xl:scale-100 xl:scale-85">
      <div class="hover:cursor-default">
        <Button label="Default" />
      </div>
      <div class="px-0.5 hover:cursor-default">
        <div class="flex items-center justify-between min-w-5 px-1 border-2 ml-3 border-r-blue-8 border-b-blue-8 border-l-blue-0 border-t-blue-0">
          <Checkbox identifier={"1"} label={"PST"} />
          <Checkbox identifier={"1"} label={"FaD"} />
          <Checkbox identifier={"1"} label={"WST"} />
          <Checkbox identifier={"1"} label={"TERM"} />
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center justify-end 2xl:w-1/5 xl:w-1/6 2xl:scale-100 xl:scale-85 xl:ml-5">
      <div class="flex-row px-3">
        <div class="select-none flex items-center h-10 px-3 text-2xl border-2 hover:cursor-default bg-blue-2 border-r-blue-8 border-b-blue-8 border-l-blue-0 border-t-blue-0">
          {timeString}
        </div>
      </div>
      <div class="flex-row px-3">
        <div class="select-none flex items-center h-10 px-3 text-2xl border-2 hover:cursor-default bg-blue-2 border-r-blue-8 border-b-blue-8 border-l-blue-0 border-t-blue-0">
          {tmi != "" ? tmi : "000"}
        </div>
      </div>
    </div>
    <div class="flex flex-row-reverse items-center 2xl:scale-100 xl:scale-85">
      <div class="px-3 hover:cursor-default">
        <Button label="Default" />
      </div>
      <div class="pr-1.5 font-bitmap font-thin 2xl:text-xl xl:text-base hover:cursor-default">
        <Button
          label={"HL • LL • ALL TK • RR"}
          font={"bitmap"}
          bold={"false"}
          textColour={"text-yellow-300"}
        />
      </div>
    </div>
  </div>
  <div
    class="flex flex-col h-full font-bitmap font-light text-lg overflow-y-scroll overflow-x-hidden">
    <!-- Aircraft component cards -->
    {#if isLoading}
      <div class="select-none flex flex-row w-full h-full justify-items-center justify-center text-2xl my-10 hover:cursor-default">
        Loading data...
      </div>
    {:else if noData}
      <div class="select-none flex flex-row w-full h-full justify-items-center justify-center text-2xl my-10 hover:cursor-default">
        No data on remote.
      </div>
    {:else}
      {#each acListKeys as acTrack}
        {#if dataHandler.networkAircraft.get(acTrack)?.size != 0 && utils.determineTrackRelevance(acTrack)}
          <div class="flex flex-row justify-start w-full bg-grey-500 bg-opacity-70 select-none hover:cursor-default">
            <div class="w-1/2 px-3">
              {acTrack != "RR" ? acTrack : "RANDOM"}
            </div>
            <div class="flex flex-row w-full justify-start">
              {#if acTrack == "RR"}
                RANDOM ROUTINGS
              {:else}
                {#each dataHandler.currentNatTracks.get(acTrack).Route as waypoint}
                  <div class="w-1/10">
                    {waypoint.name}
                  </div>
                {/each}
              {/if}
            </div>
            <div class="1/7 px-3" />
          </div>
        {/if}
        {#each Array.from(dataHandler.networkAircraft.get(acTrack).values()) as ac}
        {#if ac.Relevant && new Date().getUTCMinutes() - new Date(ac.LastUpdated).getUTCMinutes() < 30}
          <FlightStrip 
            callsign={ac.Callsign}
            type={ac.Type}
            assignedLevel={ac.AssignedLevel}
            assignedMach={ac.AssignedMach}
            track={ac.Track}
            route={ac.Route}
            routeEtas={ac.RouteEtas}
            departure={ac.Departure}
            arrival={ac.Arrival}
            trackedBy={ac.TrackedBy}
            isEquipped={ac.IsEquipped}
            direction={ac.Direction ?? false}
          />
          {/if}
        {/each}
      {/each}
    {/if}
  </div>
</div>

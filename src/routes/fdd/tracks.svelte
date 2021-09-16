<script lang="ts">
  import { CronJob } from "cron";
  import type { NatTrack } from "../../typescript/fdd/objects";
  import * as dataHandler from "../../typescript/fdd/data";
  import Titlebar from "../../props/fdd/titlebar.svelte";
  import TrackStrip from "../../props/fdd/track_strip.svelte";

  // Get tracks and sort
  let tracksRaw: string[] = Array.from(dataHandler.currentNatTracks.keys()).sort();
  let eastbound: NatTrack[];
  let westbound: NatTrack[];
  $: eastbound = [];
  $: westbound = [];

  // DOM elements to update
  $: tmi = dataHandler.currentTMI;

  // DOM updater
  let acJob = new CronJob(
    "*/1 * * * * *",
    function () {
      // Set TMI
      tmi = dataHandler.currentTMI;

      // Reset the arrays
      eastbound = [];
      westbound = [];
      let tracksRaw = Array.from(dataHandler.currentNatTracks.keys()).sort();

      for (let i: number = 0; i < tracksRaw.length; i++) {
        //console.log();
        if (dataHandler.currentNatTracks.get(tracksRaw[i]).Direction == 1) {
          eastbound.push(dataHandler.currentNatTracks.get(tracksRaw[i]));
        } else {
          westbound.push(dataHandler.currentNatTracks.get(tracksRaw[i]));
        }
      }
    },
    null,
    true
  );
</script>

<div class="flex flex-col w-full h-10/27 border-2 border-t-blue-0 border-l-blue-0 font-bitmap text-xl font-thin">
  <Titlebar label="Tracks - TMI: {tmi}" />
  <div class="overflow-y-scroll h-full">
    <div class="flex" />
    <div class="flex flex-row justify-center w-full bg-grey-500 bg-opacity-70 select-none hover:cursor-default">
      Westbound
    </div>
    {#each westbound as track}
      <TrackStrip
        id={track.Identifier}
        route={track?.Route}
        flightLevels={track.FlightLevels}
        direction={track.Direction}
        validFrom={track.ValidFrom}
        validTo={track.ValidTo}
      />
    {/each}
    <div class="flex flex-row justify-center w-full bg-grey-500 bg-opacity-70 select-none hover:cursor-default">
      Eastbound
    </div>
    {#each eastbound as track}
      <TrackStrip
        id={track.Identifier}
        route={track.Route}
        flightLevels={track.FlightLevels}
        direction={track.Direction}
        validFrom={track.ValidFrom}
        validTo={track.ValidTo}
      />
    {/each}
  </div>
</div>

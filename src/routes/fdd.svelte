<script lang="ts">
    import { CronJob } from 'cron';
    import { onMount } from "svelte";
    import * as utils from "../typescript/utils";
    import Button from "../props/button.svelte";
    import FlightStrip from "../props/flight_strip.svelte"

    // Initialisation of data
    let isLoading: boolean = true;
    let noData: boolean = true;
    import * as dataHandler from "../typescript/data";
    onMount(async () => {
        dataHandler.runDataFetcher();
    });


    $: acListKeys = [...dataHandler.networkAircraft.keys()];

    // DOM updater
    let acJob = new CronJob('*/1 * * * * *', function() {
        acListKeys = [...dataHandler.networkAircraft.keys()];
        if (dataHandler.networkAircraft.size > 1 && isLoading) {
            // we can assume if the tracks are downloaded that the data is done loading
            isLoading = false;

            // Check however that we have planes so that we may be able to display "no content" message to display.
            dataHandler.networkAircraft.forEach(function(value, key) {
                if (value.size > 0) noData = false;
            });
        } 
        

    }, null, true);
    acJob.start();   
</script>    

<!-- The main flight data panel with flight strips -->
<div class="flex flex-col w-screen">
    <div class="flex flex-row justify-around w-full h-1/14 border-blue-10 border-b-2 text-white p-5 font-regular font-light">
        <div class="flex flex-row items-center justify-start">
            <div class="px-3">
                <Button label="Default"/>
            </div>
            <div class="px-5">
                <div class="flex items-center min-w-1 h-8 px-5 border-2 border-r-blue-8 border-b-blue-8 border-l-blue-0 border-t-blue-0">
                    FILTERS
                </div> 
            </div>
        </div>
        <div class="flex flex-row items-center justify-end w-1/4">
            <div class="flex-row px-3">
                <div class="h-10 px-3 text-2xl border-2 bg-blue-2 border-r-blue-8 border-b-blue-8 border-l-blue-0 border-t-blue-0">
                    12:45
                </div>
            </div>
            <div class="flex-row px-3">
                <div class="h-10 px-3 text-2xl border-2 bg-blue-2 border-r-blue-8 border-b-blue-8 border-l-blue-0 border-t-blue-0">
                    123
                </div>
            </div>
        </div>
        <div class="flex flex-row-reverse items-center">
            <div class="px-3">
                <Button label="Default"/>
            </div>
            <div class="px-3">
                <div class="flex items-center min-w-1 h-8 px-4 border-2 border-r-blue-8 border-b-blue-8 border-l-blue-1 border-t-blue-1">
                    <button class="px-3 text-yellow-200 hover:text-opacity-80 font-bitmap text-xl">
                        HL
                    </button>
                    <div class="text-yellow-200 text-xs">
                        •
                    </div>
                    <button class="px-3 text-yellow-200 hover:text-opacity-80 font-bitmap text-xl">
                        LL
                    </button>
                    <div class="text-yellow-200 text-xs">
                        •
                    </div>
                    <button class="px-3 text-yellow-200 hover:text-opacity-80 font-bitmap text-xl">
                        ALL TK
                    </button>
                    <div class="text-yellow-200 text-xs">
                        •
                    </div>
                    <button class="px-3 text-yellow-200 hover:text-opacity-80 font-bitmap text-xl">
                        RR
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col h-full font-bitmap font-light text-lg">
        <!-- Aircraft component cards -->
        {#if isLoading}
        <div class="flex flex-row w-full h-full justify-items-center justify-center text-2xl my-10">
            Loading data...
        </div>
        {:else}
            {#if noData}
                <div class="flex flex-row w-full h-full justify-items-center justify-center text-2xl my-10">
                    No data to download yet.
                </div>
            {:else}
            {#each acListKeys as acTrack}
                {#if dataHandler.networkAircraft.get(acTrack).size != 0}
                <div class="flex flex-row justify-start w-full bg-grey-500 bg-opacity-70">
                    <div class="w-0.48 px-3">
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
                    <div class="1/7 px-3">
                    </div>
                </div>
                {/if}
                {#each Array.from(dataHandler.networkAircraft.get(acTrack).values()) as ac}
                    <FlightStrip callsign={ac.Callsign} assignedLevel={ac.AssignedLevel} 
                    assignedMach={ac.AssignedMach} track={ac.Track} routeEtas={ac.RouteEtas} departure={ac.Departure} arrival={ac.Arrival} 
                    trackedBy={ac.TrackedBy} isEquipped={ac.IsEquipped} direction={ac.Direction} />
                {/each}
            {/each}
            {/if}
        {/if}
    </div>
</div>

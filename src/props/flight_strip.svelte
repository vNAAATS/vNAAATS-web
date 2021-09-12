<script lang="ts">
    import * as utils from "../typescript/utils";
    // Elements for spread prop
    export let callsign: string;
    //export let type: string;
    export let assignedLevel: number;
    export let assignedMach: number;
    export let track: string;
    export let route: string[];
    export let routeEtas: string[];
    export let departure: string;
    export let arrival: string;
    export let direction: boolean;
    export let isEquipped: boolean;
    export let trackedBy: string;

    let colour:string = direction ? "bg-yellow-100" : "bg-blue-11";
    let darkerColour:string = direction ? "bg-yellow-200" : "bg-blue-10";

    // Opacity
    let isActive: boolean = false;
    function setOpacity(): void {
        if (isActive)
            isActive = false;
        else
            isActive = true;
    }
    
</script>

<div class="hover:border-green-400 hover:border-2 hover:cursor-pointer" on:mousedown={setOpacity} on:mouseup={setOpacity}>
    {#if track === "RR"}
    <div class="flex flex-col items-center w-full h-14 {darkerColour} {isActive ? "bg-opacity-75" : ""} text-black">
        <div class="flex flex-row justify-start items-center w-full">
            <div class="flex flex-row w-0.32"></div>
            <div class="flex flex-row w-0.68">
                {#each route as rte}
                    <div class="w-1/11">
                        {utils.coordToArray(rte).length != 0 ? utils.coordToArray(rte)[0] : rte}
                    </div>
                {/each}
            </div>
        </div>
        <div class="flex flex-row justify-start items-center w-full">
            <div class="flex flex-row w-0.32"></div>
            <div class="flex flex-row w-0.68">
                {#each route as rte}
                    <div class="w-1/11">
                        {utils.coordToArray(rte).length != 0 ? utils.coordToArray(rte)[1] : ""}
                    </div>
                {/each}
            </div>
        </div>
            
    </div>
    {/if}
    <div class="flex flex-row items-center w-full h-8 {colour} {isActive ? "bg-opacity-75" : ""} text-black">
        <div class="flex flex-row w-1/7 px-2">
            {callsign + (isEquipped ? "*" : "")}
        </div>
        <div class="flex flex-row w-5/7">
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
        <div class="flex flex-row justify-end w-1/5">
            <div class="w-1/3">
                B789
            </div>
            <div class="w-2/5">
                {trackedBy != "" ? trackedBy : "\xa0"}
            </div>
        </div>
    </div>    
</div>

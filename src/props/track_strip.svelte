<script lang="ts">
    import type { Waypoint } from "src/typescript/objects";

    export let id: string;
    export let route: Waypoint[];
    export let flightLevels: number[];
    export let direction: number;
    export let validFrom: number;
    export let validTo: number;
    
    // Format the time validity
    let vFDate: Date = new Date(validFrom*1000);
    let vTDate: Date = new Date(validTo*1000);

    let vFString: string = (vFDate.getUTCHours() < 9 ? "0" + vFDate.getUTCHours() : vFDate.getUTCHours()).toString() 
    + (vFDate.getUTCMinutes() < 9 ? "0" + vFDate.getUTCMinutes() : vFDate.getUTCMinutes()).toString();
    let vTString: string = (vTDate.getUTCHours() < 9 ? "0" + vTDate.getUTCHours() : vTDate.getUTCHours()).toString() 
     + (vTDate.getUTCMinutes() < 9 ? "0" + vTDate.getUTCMinutes() : vTDate.getUTCMinutes()).toString();

    let timeString = vFString + "z - " + vTString + "z";
</script>

<div class="flex flex-col text-black select-none hover:cursor-default">
    <div class="flex flex-row px-3 py-1 {direction ? "bg-blue-9": "bg-yellow-300"}">
        <div class="flex flex-row w-2/7">
            {timeString}
        </div>
        <div class="flex flex-row w-4/5">
            {#each flightLevels as level}
                <div class="pr-2.5">
                    {level/100}
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-row px-3 py-1 {direction ? "bg-blue-10": "bg-yellow-100"} border-b-2 border-black border-opacity-30">
        <div class="flex flex-row w-2/7">
            {id}
        </div>
        <div class="flex flex-row w-4/5">
            {#each route as wp}
                <div class="pr-2.5">
                    {wp.name}
                </div>
            {/each}
        </div>
    </div>
    
</div>
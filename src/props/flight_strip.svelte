<script lang="ts">
    console.log("reached")
    // Elements for spread prop
    export let callsign: string;
    //export let type: string;
    export let assignedLevel: number;
    export let assignedMach: number;
    export let track: string;
    //export let route: string[];
    export let routeEtas: string[];
    export let departure: string;
    export let arrival: string;
    export let direction: boolean;
    //export let isEquipped: boolean;
    export let trackedBy: string;

    let colour:string = direction ? "bg-yellow-100" : "bg-blue-11";
</script>


<div class="flex flex-row items-center w-full h-8 {colour} bg-opacity-100 text-black
hover:border-2 hover:border-green-500 hover:cursor-pointer active:bg-opacity-75">
    {#if track != "RR"}
    <div class="flex flex-row w-1/7 px-2">
        {callsign}
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
            {eta != "--" ? eta : "----"}
        </div>
        {/each}
    </div>
    <div class="flex flex-row justify-end w-1/5">
        <div class="w-1/3">
            B789
        </div>
        <div class="w-2/5">
            {trackedBy != "" ? trackedBy : "XXX_CTR"}
        </div>
    </div>
    {:else}
    <div class="flex flex-row w-1/7 px-2">
        {callsign}
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
            {eta != "--" ? eta : "----"}
        </div>
        {/each}
    </div>
    <div class="flex flex-row justify-end w-1/5">
        <div class="w-1/3">
            B789
        </div>
        <div class="w-2/5">
            {trackedBy != "" ? trackedBy : "XXX_CTR"}
        </div>
    </div>
    {/if}
</div>

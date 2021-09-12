<script lang="ts">
    export let identifier: string;
    export let label: string;
    export let startChecked: string = "false";
    export let font: string = "regular";
    export let bold: string = "true";
    export let textColour: string = "white";
    export let margin: string = "1";

    let isBold: boolean = bold === "true" ? true : false;
    let checked: boolean = startChecked === "true" ? true : false;
</script>

<div class="flex flex-row items-center px-{parseInt(margin)}">
    <input type="checkbox" bind:checked={checked} class="custom-check appearance-none outline-none h-3.5 w-3.5 border-2 
    border-l-blue-6 border-t-blue-6 border-r-blue-0 border-b-blue-0 bg-blue-3 checked:bg-blue-1
    checked:border-r-blue-6 checked:border-b-blue-6  checked:border-l-blue-0 checked:border-t-blue-0 hover:cursor-pointer" id={identifier}>
    {#if checked}
    <label for={identifier} class="z-100 absolute justify-start hover:cursor-pointer pointer-events-none">✔</label>
    {/if}
    <label for={identifier} class="text-{textColour} font-{font} {isBold ? "font-black" : ""} px-1.5 pointer-events-none"><strong>{label}</strong></label>
</div>

<script lang="ts">
    import { onMount } from "svelte";
    import Button from "../props/button.svelte";

    // Initialisation of data
    import {runDataFetcher} from "../typescript/data";
    onMount(async () => {
        runDataFetcher();
    });
    
</script>    

<!-- The main flight data panel with flight strips -->
<div class="flex flex-row justify-around w-full h-1/14 border-blue-10 border-b-2 text-white p-5 font-regular font-light">
    <div class="flex flex-row items-center justify-start">
        <div class="px-3">
            <Button label="Default"/>
        </div>
        <div class="px-5">
            <div class="flex items-center min-w-1 h-8 px-5 border-2 border-r-blue-8 border-b-blue-8 border-l-blue-1 border-t-blue-1">
                [FILTERS TBA]
            </div> 
        </div>
    </div>
    <div class="flex flex-row items-center justify-end w-1/4">
        <div class="flex-row px-3">
            <div class="h-10 px-3 text-2xl border-2 bg-blue-2 border-r-blue-8 border-b-blue-8 border-l-blue-1 border-t-blue-1">
                12:45
            </div>
        </div>
        <div class="flex-row px-3">
            <div class="h-10 px-3 text-2xl border-2 bg-blue-2 border-r-blue-8 border-b-blue-8 border-l-blue-1 border-t-blue-1">
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
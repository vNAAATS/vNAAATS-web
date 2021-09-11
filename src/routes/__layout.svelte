<script lang="ts">
import "../styles/globals.postcss";
import * as dataHandler from "../typescript/data"

</script>
<div class="flex flex-col h-screen">
    <div class="flex justify-between items-center w-screen h-1/25 bg-blue-0 border-2 border-l-blue-10 border-t-blue-10 border-r-blue-10 border-b-blue-0">
        <div class="flex w-2/5">
            <div class="px-3">
                Beta 0.1
            </div>
            <div class="px-1/2">
                |
            </div>
            <div class="px-3">
                Aircraft Count: {dataHandler.aircraftCount}
            </div>
        </div>
        <div class="flex flex-row-reverse px-3 w-1/5">
            <div class="px-3">
                vNAAATS Flight Data Display
            </div>
        </div>
        <div class="flex flex-row-reverse w-2/5">
            <div class="px-3">
                Guest User
            </div>
            <div class="px-1/2">
                |
            </div>
            <button class="px-3 font-black hover:text-grey-300">
                Settings
            </button>
            <div class="px-1/2">
                •
            </div>
            <button class="px-3 font-black hover:text-grey-300">
                Manual Data Entry
            </button>
        </div>
    </div>
    <slot/>
</div>
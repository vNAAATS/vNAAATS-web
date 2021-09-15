<script lang="ts">
import { onMount } from "svelte";
 
import * as site from "../typescript/site";

onMount(async () => {
    site.setTitle("Homepage");
});
  
</script>

<div class="flex flex-col h-screen overflow-hidden">
    <div class="flex flex-col items-center justify-center brightness-100 h-full backdrop-filter backdrop-blur-md overflow-y-scroll bg-clip-content scrollbar-none
    transition duration 300 ease-in" style="background-image: url(/banner.png);">
        <img src="/vNAAATS.png" class=""width="40%" height="50%" alt="logo">
        <div class="text-white font-bitmap text-3xl">
            The Virtual North Atlantic Advanced Air Traffic System
        </div>
    </div>
</div>
<script lang="ts">
  import "../styles/globals.postcss";
  import * as dataHandler from "../typescript/fdd/data";
  import config from "../config.json";
  import * as site from "../typescript/site";
import { onMount } from "svelte";

  // Externals
  let count: number = 0;
  $: isHome = site.isHomePage;

  // DOM updater
  // Component updater (50ms)
  setInterval(() => {
    count = dataHandler.aircraftCount;
    isHome = site.isHomePage;
  }, 50);
</script>

<div class="flex flex-col h-screen">
  {#if isHome}
    <div class="overflow-hidden"></div>
  {:else}
    <div class="flex justify-between items-center w-screen h-1/25 bg-blue-0 border-2 border-l-blue-10 border-t-blue-10 border-r-blue-10 border-b-blue-0">
      <div class="flex w-2/5">
        <button class="px-3 font-black hover:text-grey-300 select-none hover:cursor-default">
          {config.isBeta ? "Beta" : "Version"}
          {config.version}
        </button>
        <div class="px-1/2 select-none hover:cursor-default">|</div>
        <div class="px-5 select-none hover:cursor-default">
          Aircraft Count: {count}
        </div>
      </div>
      <div class="flex flex-row-reverse px-3 w-1/5 select-none hover:cursor-default">
        <div class="px-5 select-none hover:cursor-default">
          vNAAATS Flight Data Display
        </div>
      </div>
      <div class="flex flex-row-reverse w-2/5 select-none hover:cursor-default">
        <a href="./">
          <button  class="px-5 font-black hover:text-grey-300 select-none">
            Homepage
          </button>
        </a>
        
        <!--<div class="px-3">Guest User</div>
        <div class="px-1/2 select-none hover:cursor-default">|</div>
        <button class="px-3 font-black hover:text-grey-300 select-none hover:cursor-default">
          Settings
        </button>
        <div class="px-1/2 select-none hover:cursor-default">•</div>
        <button class="px-3 font-black hover:text-grey-300 select-none hover:cursor-default">
          Manual Data Entry
        </button>-->
      </div>
    </div>
  {/if}
  <slot />
</div>

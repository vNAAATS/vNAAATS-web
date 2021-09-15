<script lang="ts">
	import FDD from './fdd.svelte';
    import FlightPlan from './flight_plan.svelte';
    import Tracks from './tracks.svelte'
    import NatTrakData from './nattrak_data.svelte'
</script>

<div class="flex h-screen overflow-hidden">
    <div class="flex flex-row w-3/5 bg-blue-2 border-l-blue-10 border-t-blue-10 border-r-blue-3 border-b-blue-3 border-2">
        <FDD/>
    </div>
    <div class="flex px-0.5 flex-col w-2/5 bg-blue-2 border-l-blue-10 border-t-blue-10 border-r-blue-3 border-b-blue-3 bg-screen border-2">
        <FlightPlan />
        <NatTrakData />
        <Tracks />
        
    </div>
</div>
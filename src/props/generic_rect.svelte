<script lang="ts">
    export let label: string;
    export let height: string = "10"; 
</script>

<!-- Standard button with hover styling -->
<button class="flex items-center justify-center h-{height} px-3 font-regular active:border-r-blue-8 active:border-u-blue-8 
active:border-l-blue-2 active:border-t-blue-2 active:bg-blue-4 active:text-grey-200
border-2 border-l-blue-8 border-t-blue-8 border-r-blue-2 border-b-blue-2 bg-blue-5">
    <strong>{label}</strong>
</button>
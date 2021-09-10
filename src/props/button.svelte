<script lang="ts">
    export let label: string;
    export let height: string = "10"; 
</script>

<!-- Standard button with hover styling -->
<button class="flex items-center justify-center h-{height} px-3 font-regular active:border-r-blue-6 active:border-b-blue-6 
active:border-l-blue-1 active:border-t-blue-1 active:bg-blue-1 active:text-grey-200
border-2 border-l-blue-6 border-t-blue-6 border-r-blue-1 border-b-blue-1 bg-blue-3">
    <strong>{label}</strong>
</button>
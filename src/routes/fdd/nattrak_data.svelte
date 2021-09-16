<script lang="ts">
  import { CronJob } from "cron";
  import * as dataHandler from "../../typescript/fdd/data";
  import Titlebar from "../../props/fdd/titlebar.svelte";
  import TextInput from "../../props/fdd/text_input.svelte";
</script>

<div class="flex flex-col w-full h-8/27 border-2 border-l-blue-0 border-t-blue-0 border-r-blue-10 border-b-blue-10">
  <Titlebar label="natTrak - Disconnected"/>
  <div class="px-2 pt-3 pb-3 text-xl font-bitmap tracking-widest font-black">
    Clearance Information
  </div>
  <div class="flex flex-row justify-start">
    <TextInput identifier="status" label="Status" isDisabled={true} value="No Data" width="w-6/7" widthWhole="w-1/4" backColour="bg-red-500" inputForeColour="text-black"></TextInput>
    <TextInput identifier="issuedAt" label="Clearance Issued" isDisabled={true} value="--" width="w-5/7" widthWhole="w-1/4" ></TextInput>
    <TextInput identifier="nat" label="Track" isDisabled={true} value="--" width="w-5/7" widthWhole="w-1/4"></TextInput>
  </div>
  <div class="flex flex-row justify-start pt-3">
    
    <TextInput identifier="level" label="Level" isDisabled={true} value="--" width="w-6/7" widthWhole="w-1/4"></TextInput>
    <TextInput identifier="mach" label="Mach" isDisabled={true} value="--" width="w-5/7" widthWhole="w-1/4"></TextInput>
    <TextInput identifier="fix" label="Fix" isDisabled={true} value="--" width="w-5/7" widthWhole="w-1/4"></TextInput>
    <TextInput identifier="est" label="Estimation"isDisabled={true} value="--" width="w-6/7" widthWhole="w-1/4"></TextInput>
  </div>
  <div class="justify-start pt-4 pr-6">
    <TextInput identifier="info" label="Extra Information" isDisabled={true} value="--" width="w-full"></TextInput>
  </div>
</div>

<script>import "../styles/globals.postcss";</script>

<div class="flex flex-col h-screen">
    <div class="flex justify-between items-center w-screen h-1/25 bg-blue-">
        <div class="flex w-2/5">
            <div class="px-3">
                Version 0.1
            </div>
            <div class="px-1/2">
                |
            </div>
            <div class="px-3">
                Aircraft Count: X
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
    
    <slot></slot>
</div>




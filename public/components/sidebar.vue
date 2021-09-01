<style scoped>
.sidebar > div {
    height: calc(100vh - 58px);
}
</style>

<template lang="pug">
.sidebar(class="w-1/5 lg:w-1/6 border-r border-neutral-500")
  .flex.flex-col.w-full.text-neutral-1600.bg-neutral-300.flex-shrink-0(@click.away='open = false' class='dark-mode:text-neutral-500 dark-mode:bg-neutral-800 overflow-auto align-top' x-data='{ open: false }')
    .flex-shrink-0.px-8.py-4.mt-4.flex.flex-row.items-center.justify-between
      a.text-lg.font-semibold.tracking-widest.text-neutral-1800.uppercase.rounded-lg(href='#' class='dark-mode:text-black focus:outline-none focus:shadow-outline') 
        | Quick links
      button.rounded-lg.rounded-lg(class='md:hidden focus:outline-none focus:shadow-outline' @click='open = !open')
        svg.w-6.h-6(fill='currentColor' viewbox='0 0 20 20')
          path(x-show='!open' fill-rule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z' clip-rule='evenodd')
          path(x-show='open' fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd')
    nav.flex-grow.px-4.pb-4(:class="{'block': open, 'hidden': !open}" class='md:block md:pb-0 md:overflow-y-auto')
      a.block.px-4.py-2.mt-2.text-sm.font-semibold.text-neutral-1800.bg-neutral-500.rounded-lg(class='dark-mode:bg-neutral-1600 dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') Home Dashboard
      a.block.px-4.py-2.mt-2.text-sm.font-semibold.text-neutral-1800.bg-transparent.rounded-lg(class='dark-mode:bg-transparent dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') Projects & Tasks
      a.block.px-4.py-2.mt-2.text-sm.font-semibold.text-neutral-1800.bg-transparent.rounded-lg(class='dark-mode:bg-transparent dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') People & Teams
      a.block.px-4.py-2.mt-2.text-sm.font-semibold.text-neutral-1800.bg-transparent.rounded-lg(class='dark-mode:bg-transparent dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') Employee Tools
      a.block.px-4.py-2.mt-2.text-sm.font-semibold.text-neutral-1800.bg-transparent.rounded-lg(class='dark-mode:bg-transparent dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') Internal Wiki
    //-   .relative(@click.away='open = false' x-data='{ open: false }')
    //-     button.flex.flex-row.items-center.w-full.px-4.py-2.mt-2.text-sm.font-semibold.text-left.bg-transparent.rounded-lg(@click='open = !open' class='dark-mode:bg-transparent dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:focus:bg-neutral-1600 dark-mode:hover:bg-neutral-1600 md:block hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline')
    //-       span Dropdown
    //-       svg.inline.w-4.h-4.mt-1.ml-1.transition-transform.duration-500.transform(fill='currentColor' viewbox='0 0 20 20' :class="{'rotate-180': open, 'rotate-0': !open}" class='md:-mt-1')
    //-         path(fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd')
    //-     .absolute.right-0.w-full.mt-2.origin-top-right.rounded-md.shadow-lg(x-show='open' x-transition:enter='transition ease-out duration-100' x-transition:enter-start='transform opacity-0 scale-95' x-transition:enter-end='transform opacity-100 scale-100' x-transition:leave='transition ease-in duration-75' x-transition:leave-start='transform opacity-100 scale-100' x-transition:leave-end='transform opacity-0 scale-95')
    //-       .px-2.py-2.bg-white.rounded-md.shadow(class='dark-mode:bg-neutral-800')
    //-         a.block.px-4.py-2.mt-2.text-sm.font-semibold.bg-transparent.rounded-lg(class='dark-mode:bg-transparent dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 md:mt-0 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') Link #1
    //-         a.block.px-4.py-2.mt-2.text-sm.font-semibold.bg-transparent.rounded-lg(class='dark-mode:bg-transparent dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 md:mt-0 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') Link #2
    //-         a.block.px-4.py-2.mt-2.text-sm.font-semibold.bg-transparent.rounded-lg(class='dark-mode:bg-transparent dark-mode:hover:bg-neutral-1600 dark-mode:focus:bg-neutral-1600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-neutral-500 md:mt-0 hover:text-neutral-1800 focus:text-neutral-1800 hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none focus:shadow-outline' href='#') Link #3

      
</template>

<script>

module.exports = {
data() {
    return {

    }
  }
}
</script>
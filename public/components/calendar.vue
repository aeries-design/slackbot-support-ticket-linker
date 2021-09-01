<template lang="pug">
.container.mx-auto.mt-10
  .wrapper.rounded.shadow.w-full
    .header.flex.justify-between.border-neutral-700.border-b.p-2
      span.text-lg.font-bold
        | 2020 July
      .buttons
        button.p-1
          svg.bi.bi-arrow-left-circle(width='1em' fill='neutral' height='1em' viewbox='0 0 16 16' xmlns='http://www.w3.org/2000/svg')
            path(fill-rule='evenodd' d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z')
            path(fill-rule='evenodd' d='M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z')
            path(fill-rule='evenodd' d='M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z')
        button.p-1
          svg.bi.bi-arrow-right-circle(width='1em' fill='neutral' height='1em' viewbox='0 0 16 16' xmlns='http://www.w3.org/2000/svg')
            path(fill-rule='evenodd' d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z')
            path(fill-rule='evenodd' d='M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z')
            path(fill-rule='evenodd' d='M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z')
    table.w-full.border-neutral-700.border-neutral-700
      thead
        tr.text-neutral-1200
          th.p-2.border-neutral-700.border-r.h-10.w-10.text-xs(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm')
            span.hidden(class='xl:block lg:block md:block sm:block') Sunday
            span.block(class='xl:hidden lg:hidden md:hidden sm:hidden') Sun
          th.p-2.border-neutral-700.border-r.h-10.w-10.text-xs(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm')
            span.hidden(class='xl:block lg:block md:block sm:block') Monday
            span.block(class='xl:hidden lg:hidden md:hidden sm:hidden') Mon
          th.p-2.border-neutral-700.border-r.h-10.w-10.text-xs(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm')
            span.hidden(class='xl:block lg:block md:block sm:block') Tuesday
            span.block(class='xl:hidden lg:hidden md:hidden sm:hidden') Tue
          th.p-2.border-neutral-700.border-r.h-10.w-10.text-xs(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm')
            span.hidden(class='xl:block lg:block md:block sm:block') Wednesday
            span.block(class='xl:hidden lg:hidden md:hidden sm:hidden') Wed
          th.p-2.border-neutral-700.border-r.h-10.w-10.text-xs(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm')
            span.hidden(class='xl:block lg:block md:block sm:block') Thursday
            span.block(class='xl:hidden lg:hidden md:hidden sm:hidden') Thu
          th.p-2.border-neutral-700.border-r.h-10.w-10.text-xs(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm')
            span.hidden(class='xl:block lg:block md:block sm:block') Friday
            span.block(class='xl:hidden lg:hidden md:hidden sm:hidden') Fri
          th.p-2.border-neutral-700.border-r.h-10.w-10.text-xs(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 xl:text-sm')
            span.hidden(class='xl:block lg:block md:block sm:block') Saturday
            span.block(class='xl:hidden lg:hidden md:hidden sm:hidden') Sat
      tbody
        tr.text-center.h-20
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 1
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
                .event.bg-purple-400.text-white.rounded.p-1.text-sm.mb-1
                  span.event-name
                    | Meating
                  span.time
                    | 12:00~14:00
                .event.bg-purple-400.text-white.rounded.p-1.text-sm.mb-1
                  span.event-name
                    | Meating
                  span.time
                    | 18:00~20:00
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 2
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 3
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 4
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 6
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-hidden.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 7
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
                .event.bg-blue-400.text-white.rounded.p-1.text-sm.mb-1
                  span.event-name
                    | Shopping
                  span.time
                    | 12:00~14:00
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500.text-sm 8
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
        // line 1
        tr.text-center.h-20
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 9
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 10
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 12
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 13
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 14
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 15
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500.text-sm 16
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
        // line 1
        // line 2
        tr.text-center.h-20
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 16
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 17
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 18
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 19
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 20
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 21
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500.text-sm 22
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
        // line 2
        // line 3
        tr.text-center.h-20
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 23
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 24
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 25
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 26
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 27
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 28
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500.text-sm 29
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
        // line 3
        // line 4
        tr.text-center.h-20
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 30
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 31
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.bg-neutral-100.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 1
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.bg-neutral-100.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 2
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.bg-neutral-100.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 3
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.bg-neutral-100.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500 4
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
          td.border-neutral-700.border.bg-neutral-100.p-1.h-40.w-10.overflow-auto.transition.cursor-pointer.duration-500.ease(class='xl:w-40 lg:w-30 md:w-30 sm:w-20 hover:bg-neutral-300')
            .flex.flex-col.h-40.mx-auto.w-10.mx-auto.overflow-hidden(class='xl:w-40 lg:w-30 md:w-30 sm:w-full')
              .top.h-5.w-full
                span.text-neutral-500.text-sm 5
              .bottom.flex-grow.h-30.py-1.w-full.cursor-pointer
        // line 4


</template>

<script>
const axios = require('axios');

module.exports = {
  data() {
  },
methods : {

},
async mounted () {

},
computed: {}
}
</script>
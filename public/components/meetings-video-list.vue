<template lang="pug">
// wrapper
div
  meetings-subheader
  section.p-10.font-sans.leading-normal.container
    div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-8 row-gap-8" v-if="videos.length")
      a(v-for="video in videos" :href="'/meetings/video/' + video.videoID" class="rounded col-span-1 bg-white grid grid-cols-1 shadow-md text-neutral-1800")
        .px-4.pt-4.flex.flex-col
          div.mb-2
            svg.inline(width='22' height='22' viewbox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg')
              path(fill-rule='evenodd' clip-rule='evenodd' d='M0 10C0 4.48 4.47998 0 10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.47998 20 0 15.52 0 10ZM14 10L8 5.5V14.5L14 10Z' fill='#203858')
            span.inline.pl-2 Video
          .font-bold.text-title.font-body.mb-2 {{video.videoTitle}}
        .mt-auto
          div(class="w-full px-4 pb-3 pt-3")
            span(v-if="video.videoDescription") {{video.videoDescription}} 
  
    div(v-else class="text-center py-20")
      h2.font-aeries.font-bold.text-display No videos found.
        a(href="/meetings/upload" class="text-blue-500 pl-4") Upload one!
</template>

<script>
const axios = require('axios');

module.exports = {
props: ['videos'],
  data() {
    return {}
  },
methods : {},
async mounted () {},
computed: {}
}
</script>
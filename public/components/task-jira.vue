<style scoped>
.text-massive {
  font-size: 48px;
}
</style>

<template lang="pug">
main

  section(v-if="selectedPage == 'home'")
    div(class="container flex xs:flex-col md:flex-row mt-12")
      div(class="w-full md:w-2/5 md:flex-row bg-neutral-500 p-4 rounded-l h-full")
        div(class="xs:flex-col md:flex-row")
          p.font-aeries.font-bold.px-8 Tasks  » Jira  »  {{ $attrs.taskdata.key }}
        div(class="xs:flex-col md:flex-row px-8")
          h1.text-massive.font-bold.font-aeries.leading-tight.tracking-tight.my-8 {{ $attrs.taskdata.fields.summary }}
          p.text-subhead.pb-6 Issue created #[b {{ this.timeSince( new Date( $attrs.taskdata.fields.created ) ) }} ago] in #[b {{$attrs.taskdata.fields.project.name}}]
      div(class="w-full md:w-3/5 bg-white py-12 px-8 rounded-r")
        div(v-if="$attrs.taskdata.fields.priority")
          div(:class="getPriorityColorClassByName($attrs.taskdata.fields.priority.name)").w-6.h-6.rounded-full.pt-6
          h1.text-title.font-bold.font-aeries Priority
          p {{$attrs.taskdata.fields.priority.name}}
        div(class="flex")
          div(class="w-1/2")
            h1.text-title.font-bold.font-aeries.pt-6 
              span Current status
            p {{$attrs.taskdata.fields.status.name}}
          div(class="w-1/2")
            h1.text-title.font-bold.font-aeries.pt-6 Assigned to
            p {{$attrs.taskdata.fields.assignee.displayName}}
        div
          h1.text-title.font-bold.font-aeries.pt-6 Description
          p(v-if="$attrs.taskdata.fields.description") {{$attrs.taskdata.fields.description}}
          p.text-neutral-1000(v-else) No description provided.
        div.w-full.border-b.border-neutral-600.pt-6

        div
          h1.text-title.font-bold.font-aeries.pt-6 Comments ({{$attrs.taskdata.fields.comment.comments.length}})
          .comments
            div(v-if="$attrs.taskdata.fields.comment.comments.length")
              div(v-for="comment in $attrs.taskdata.fields.comment.comments").pt-6 
                p.text-minimum-text.text-neutral-1800.font-bold {{comment.author.displayName}}
                p.text-neutral-1800 {{comment.body}}
            div(v-else)
              p.text-neutral-1000.pt-2 No comments yet.
                  
        div.mt-16
          a(target="_blank" :href="'https://jira.aeries.works/browse/' + $attrs.taskdata.key").cursor-pointer.text-subhead.font-bold.text-blue-700.font-aeries Open task in Jira »

</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        selectedPage: "home",
        currentUser : ""
    }
  },
methods : {
  getPriorityColorClassByName(priorityName) {
    if (priorityName == "Lowest") {
      return "bg-blue-500";
    }
    if (priorityName == "Low") {
      return "bg-blue-500";
    }
    if (priorityName == "Medium") {
      return "bg-orange-600";
    }
    if (priorityName == "High") {
      return "bg-red-600";
    }
    if (priorityName == "Highest") {
      return "bg-red-600";
    }
  },
  timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
},
async mounted () {

},

}
</script>
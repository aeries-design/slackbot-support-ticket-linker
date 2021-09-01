<style scoped>
.design-widget {
  background-image: url('/images/topo-pattern-small.svg')
}
</style>

<template lang="pug">
main
  .w-full
    section(v-if="id && jobs && jobs.length")
        .jobs.mt-14
          table(class="m-auto mt-12")
            thead
              th(class="text-left text-subhead") Title
              th(class="text-left text-subhead") Datetime
              th(class="text-left text-subhead") Accepted
              th(class="text-subhead text-right") Action
            tbody
              tr(v-for="(job, i) in jobs" :class="{'bg-green-400' : job.completed}")
                td(class="py-2 pr-4 text-minimum-text" @click="openActionDialog(job)") {{job.title}}
                td(class="pr-4 text-minimum-text") {{job.date}} {{job['start time']}} - {{job['end time']}}
                td(class="pr-4 text-minimum-text") 
                  span(v-if="job.acceptedBy" @click="unassignJob(job)") {{job.acceptedBy}}
                  span(v-else) -
                td(class="text-right")
                  a(v-if="!job.wistiaURL" class="text-blue-600 cursor-pointer" @click="setZoomRecording(job, i)")
                    span(v-if="!job.zoomURL") Set zoom recording
                    span(v-else) Edit zoom recording
                  a(v-if="job.wistiaURL" class="text-blue-600 cursor-pointer" @click="changeWistiaURL(job)") {{job.wistiaURL}}
  
      
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        jobs: [],
        id: ""
    }
  },
methods : {
  changeWistiaURL(job) {
    console.log(job)
    var url = prompt("Enter new wistia URL");
    if (url) {
    $.ajax({
      url: "/rest/freelancer-dashboard/" + job._id,
      type: "PATCH",
      data: {"wistiaURL" : url},
      success: function(data) {
      console.log(data);
      window.location.reload()
      }
    })
    }
  },
  unassignJob(job) {
    if (confirm("Unassign this job? It will become available for other freelancers to accept.")) {
    $.ajax({
      url: "/rest/freelancer-dashboard/" + job._id,
      type: "PATCH",
      data: {"acceptedBy" : "", "accepted":"false"},
      success: function(data) {
      console.log(data);
      window.location.reload()
      }
    })
    }
  },
  setZoomRecording(job, i) {
    var url = prompt("Enter S3 download URL");
    var globalScope = this;
    if (url) {
    $.ajax({
      url: "/rest/freelancer-dashboard/" + job._id,
      type: "PATCH",
      data: {"zoomURL" : url, "zoomURLAdded" : "true"},
      success: function(data) {
      console.log(data);
      window.location.reload()
      }
    })
    }
  },
openActionDialog(job) {
  var action = prompt("Type 'complete' or 'delete'");
  if (action == 'complete') {
    //TODO: COMPLETE THE THING
    $.ajax({
      url: "/rest/freelancer-dashboard/" + job._id,
      type: "PATCH",
      data: {"completed" : "true"},
      success: function(data) {
      console.log(data);
      window.location.reload()
      }
    })
  } else if (action == 'delete') {
    //TODO: DELETE THE THING
    $.ajax({
      url: "/rest/freelancer-dashboard/" + job._id,
      type: "PATCH",
      data: {"deleted" : "true"},
      success: function(data) {
      console.log(data);
      window.location.reload()
      }
    })
  }
},
getCookie(name) {
  var name = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
},
async mounted () {

      

      //For passing to our function
      var globalScope = this;

      if (this.$attrs.params.id) {
        this.id = this.$attrs.params.id
        window.localStorage.setItem('id', this.$attrs.params.id);
      } else if (localStorage.getItem('id')) {
        this.id = window.localStorage.getItem('id');
      }
      

      //Slack
      axios
      .get('/rest/freelancer-dashboard?$limit=9999&$sort[sortable]=1&deleted[$ne]=true')
      .then(function(response) {
        globalScope.jobs = response.data.data;
      })
},

}
</script>
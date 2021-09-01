<style scoped>
.design-widget {
  background-image: url('/images/topo-pattern-small.svg')
}
</style>

<template lang="pug">
main
  section(v-if="id && jobs && jobs.length && !myJobs.length")
    div.container
      h2(class="text-title md:text-display font-bold font-aeries pt-6") Freelancer ID: {{id}}
      h2(class="text-title md:text-title font-bold font-aeries pt-6 mb-3") 🎬 To get started, accept a job below
      p.pb-6 If you take longer than an hour to complete one job, you will need to re-accept the job. Please only accept a job when you can start it right away and finish it within an hour. You can accept any number of jobs, but only one at a time.

      .numberOfJobs(class="mb-8")
        span There are {{jobs.length}} job(s) left to accept.
      .button(v-if="jobs && jobs.length")
        a(class="bg-blue-600 text-white font-bold px-12 py-3 rounded cursor-pointer" @click="acceptNextJob()") Accept next job
  section(v-else)
    div.container
      div(v-if="myJobs && !myJobs.length")
        span This job has been closed or has no tasks left. Please reach out on Upwork for additional details.

  section(v-if="id && myJobs && myJobs.length")
    div.container
      h2(class="text-title md:text-display font-bold font-aeries pt-6") Freelancer ID: {{id}}
      h2(class="text-title md:text-title font-bold font-aeries pt-6 mb-3") You're currently working on "{{myJobs[0].title}}"
      p.pb-2 Here's the download link. Complete the edit and upload the video according to the instructions you received on Upwork.
      p.pb-6 Please respond through Upwork if you have any questions.
      div.my-6
        a(class="bg-blue-600 text-white font-bold px-12 py-3 rounded cursor-pointer" :href="myJobs[0].zoomURL") Download mp4
      hr.border-neutral-600
      div.my-6
        a(class="bg-red-600 text-white font-bold px-12 py-3 rounded cursor-pointer" @click="completeJob()") I'm done editing
      
</template>   
<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        jobs: [],
        myJobs: [],
        id: ""
    }
  },
methods : {
  completeJob() {
    var globalScope = this;
    var wistiaURL = prompt("What is the Wistia URL to the video you edited and uploaded? If this is unclear, please contact us through Upwork.")
    if (wistiaURL) {
        $.ajax({
          url: "/freelancer-jobs/" + globalScope.myJobs[0]._id,
          type: "PATCH",
          data: {"wistiaURL" : wistiaURL, "status" : "complete"},
          success: function(data) {
          console.log(data);
          window.location.reload()
          }
        })
    } else {
      alert("You must provide the Wistia URL. If this is unclear, contact us through Upwork.")
    }
  },
  acceptNextJob() {
    var globalScope = this;
    var allJobs = ""
      axios
      .get('/freelancer-jobs')
      .then(function(response) {
        allJobs = response.data;
        var firstJob = allJobs[0];
        if (firstJob) {
        $.ajax({
          url: "/freelancer-jobs/" + firstJob._id,
          type: "PATCH",
          data: {"accepted" : "true", "acceptedBy" : globalScope.id},
          success: function(data) {
          console.log(data);
          window.location.reload()
          }
        })
        } else {
          alert("No more jobs found. Please contact us on Upwork to see if any more are available.")
        }

      })
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
      

      //All jobs
      axios
      .get('/freelancer-jobs')
      .then(function(response) {
        globalScope.jobs = response.data;
      })

      //My jobs
      axios
      .get('/my-freelancer-jobs?id=' + this.id)
      .then(function(response) {
        globalScope.myJobs = response.data;
      })
},

}
</script>
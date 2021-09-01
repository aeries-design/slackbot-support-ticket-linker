<template lang="pug">
main
  section
    div.container
      h1.text-display.font-bold.font-aeries.pt-6 Aeriesworks Sentinel
      h2.text-title.font-semi-bold.font-aeries.pb-6 Browser automation utilities
      p.mb-6 Want to check a specific webpage every 30 minutes and take a screenshot? Maybe visit a list of links and fill out some forms, click some buttons on each one? Sentinel is a dashboard for the browser automation scripts built into Aeriesworks using the #[a(href="https://developers.google.com/web/tools/puppeteer" target="_blank").text-blue-700 Puppeteer framework from Google.]
      p.mb-6 You can browse existing automations, or request a new one. Puppeteer scripts can do almost anything a human can do, including even logging in to an account to view information.
      h2.text-title.font-semi-bold.font-aeries.py-6 Automation scripts
  section
    div.container.flex
      div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 col-gap-4 row-gap-4")
        a(v-for="script in automationScripts" :href="script.url"
          class="service bg-white shadow-md inline-flex flex-col p-6 flex-start items-start grid grid-cols-1")
          div
            h1.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.self-center.mb-2 {{script.title}}
            h2.mb-4 {{script.description}}
          div.self-end
            p.text-neutral-1600.text-minimum-text
              | {{script.frequency}}
        a(
          class="service bg-white shadow-md inline-flex flex-col p-6 flex-start items-start grid grid-cols-1 border-neutral-600 border-2 border-dashed")
          div
            h1.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.self-center.mb-2.text-neutral-1000 Your script here
            h2.mb-4.text-neutral-1000 A browser automation script that does what you want
          div.self-end
            p.text-neutral-600.text-minimum-text
              | Set your frequency


</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        automationScripts: [
          {
          "url" : "/sentinel/eagle-one/",
          "title" : "Eagle One",
          "description" : "Performs a regular check on all our mission-critical sites",
          "frequency": "Every 30 minutes"
          }
          // {
          // "url" : "/sentinel/spy-check/",
          // "title" : "Spy Check",
          // "description" : "Performs a daily capture of competitor's homepages",
          // "frequency": "Once a day"
          // }
        ],
        currentUser : "",
        totalSlackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0
    }
  },
methods : {
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

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true')
      .then(function(response) {
        globalScope.totalSlackUsers = response.data.total;
      })

      //Confluence
      axios
      .get('/rest/users?platform=confluence&is_bot[$ne]=true')
      .then(function(response) {
        globalScope.totalConfluenceUsers = response.data.total;
      })
      
      //Slack
      axios
      .get('/rest/users?platform=jira&is_bot[$ne]=true')
      .then(function(response) {
        globalScope.totalJiraUsers = response.data.total;
      })



    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
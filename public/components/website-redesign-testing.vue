<style scoped>
.sidebar > div {
    height: calc(100vh - 58px);
}
</style>

<template lang="pug">
main.flex
  .main-content(class="w-5/6")
    section
      div.container
        h2(class="text-title md:text-display font-bold font-aeries pt-6") Aeries.com testing dashboard
        p.pb-2 Use this page as a guide on which pages you've tested so far as you add notes to the kanban. When you've certified the page as good to go, click "approve".
        h2(class="text-title md:text-display font-bold font-aeries pt-6 pb-6") {{pages.length - checkedPages.length}} pages to check
        
        table(class="w-full table-fixed")
          thead
            tr
              th(colspan="2").text-left Page URL
              th Checked by me
              th.text-right Approve this page
          tbody
            tr(v-for="page in pages" :class="{'opacity-25' : checkedPageURLs.includes(page)}" class="border-b border-neutral-500")
              td(colspan="2" class="py-4 text-left")
                a(@click="" class="text-blue-600 break-all" :href="page") {{page}}
              td(v-if="checkedPageURLs.includes(page)").py-4.text-center Yes
              td(v-else).py-4.text-center No
              td.py-4.text-right
                a(@click="approvePage(page)" class="cursor-pointer inline-block px-12 py-2 bg-blue-700 text-center text-white font-semi-bold font-aeries") Approve
      
  </template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        currentUser : "",
        currentUserID: "",
        totalSlackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
        checkedPages: [

        ],
        pages: [
  'https://staging.aeries.com/',
  'https://staging.aeries.com/solutions',
  'https://staging.aeries.com/solutions/aeries-sis',
  'https://staging.aeries.com/solutions/aeries-communications',
  'https://staging.aeries.com/solutions/aeries-analytics',
  'https://staging.aeries.com/solutions/aeries-financials',
  'https://staging.aeries.com/solutions/aeries-enrollment',
  'https://staging.aeries.com/solutions/aeries-mobile-apps',
  'https://staging.aeries.com/solutions/aeries-cloud',
  'https://staging.aeries.com/blog?cat=aeries-news',
  'https://staging.aeries.com/events/',
  'https://staging.aeries.com/training',
  'https://staging.aeries.com/solutions/implementation',
  'https://staging.aeries.com/blog',
  'https://staging.aeries.com/aeriescon',
  'https://staging.aeries.com/events#events-with-us',
  'https://staging.aeries.com/parents-and-students',
  'https://staging.aeries.com/support',
  'https://staging.aeries.com/contact',
  'https://staging.aeries.com/contact-sales?origin=homepage-hero',
  'https://staging.aeries.com/about/partners-in-education',
  'https://staging.aeries.com/contact-sales?origin=homepage-ender',
  'https://staging.aeries.com/about/',
  'https://staging.aeries.com/about/leadership/',
  'https://staging.aeries.com/careers/',
  'https://staging.aeries.com/about/news-and-press-releases/',
  'https://staging.aeries.com/events',
  'https://staging.aeries.com/support/',
  'https://staging.aeries.com/contact/',
  'https://staging.aeries.com/privacy-center/',
  'https://staging.aeries.com/privacy-center',
  'https://staging.aeries.com/terms-of-service',
  'https://staging.aeries.com/solutions/aeries-hosting',
  'https://staging.aeries.com/contact-sales',
  'https://staging.aeries.com/contact-sales?origin=aeries-sis',
  'https://staging.aeries.com/contact-sales?origin=aeries-sis-hero',
  'https://staging.aeries.com/demo-request',
  'https://staging.aeries.com/contact-sales?origin=aeries-sis-ender',
  'https://staging.aeries.com/contact-sales?origin=aeries-communications',
  'https://staging.aeries.com/contact-sales?origin=aeries-communications-hero',
  'https://staging.aeries.com/contact-sales?origin=aeries-communications-ender',
  'https://staging.aeries.com/contact-sales?origin=aeries-analytics',
  'https://staging.aeries.com/contact-sales?origin=aeries-analytics-hero',
  'https://staging.aeries.com/contact-sales?origin=aeries-analytics-dashboard-library',
  'https://staging.aeries.com/contact-sales?origin=aeries-analytics-empower',
  'https://staging.aeries.com/contact-sales?origin=aeries-analytics-ender',
  'https://staging.aeries.com/contact-sales?origin=aeries-financials',
  'https://staging.aeries.com/contact-sales?origin=aeries-enrollment',
  'https://staging.aeries.com/contact-sales?origin=aeries-enrollment-hero',
  'https://staging.aeries.com/contact-sales?origin=aeries-enrollment-ender',
  'https://staging.aeries.com/contact-sales?origin=aeries-mobile-apps',
  'https://staging.aeries.com/contact-sales?origin=aeries-mobile-apps-ender',
  'https://staging.aeries.com/contact-sales?origin=aeries-cloud',
  'https://staging.aeries.com/contact-sales?origin=aeries-cloud-hero',
  'https://staging.aeries.com/contact-sales?origin=aeries-cloud-ender',
  'https://staging.aeries.com/blog/paddling-upstream-navigating-the-realities-of-distance-and-hybrid-learning/',        
  'https://staging.aeries.com/blog/presidential-address-brent-lloyd/',
  'https://staging.aeries.com/blog/customer-support-status-update/',
  'https://staging.aeries.com/blog/spell-your-name-again-fuzzy-search-to-the-rescue/',
  'https://staging.aeries.com/blog/using-aeries-to-mass-assign-family-keys/',
  'https://staging.aeries.com/blog/bye-bye-bad-data/',
  'https://staging.aeries.com/blog/aeriescon-fall-2019-welcome-address-speaker/',
  'https://staging.aeries.com/blog/adding-superpower-to-your-queries/',
  'https://staging.aeries.com/blog/g-suite-aeries-happy-teacher/',
  'https://staging.aeries.com/blog/nonbinary-gender-support-in-aeries/',
  'https://staging.aeries.com/events/RGF0YSUyMFZhbGlkYXRpb25zJTIwaW4lMjBBZXJpZXMlMjBXZWJpbmFy',
  'https://staging.aeries.com/events/QWVyaWVzJTIwT25saW5lJTIwRW5yb2xsbWVudCUyMFdlYmluYXI=',
  'https://staging.aeries.com/events/V2ViaW5hciUyMFdlZG5lc2RheXMlMjAlMjhGUkVFJTI5JTIwLSUyMExlYXJuJTIwSG93JTIwQWVyaWVzJTIwQ2xvdWQlMjBTZXJ2aWNlcyUyMENhbiUyMFNhdmUlMjBEaXN0cmljdHMlMjBUaW1lJTIwYW5kJTIwUmVzb3VyY2Vz',
  'https://staging.aeries.com/events/QWR2YW5jZWQlMjBRdWVyeSUyMCUyNiUyMFRvb2xzJTIwV2ViaW5hcg==',
  'https://staging.aeries.com/events/V2ViaW5hciUyMFdlZG5lc2RheXMlMjAtRlJFRS0lMjBXaGljaCUyMHNjaGVkdWxpbmclMjBPcHRpb24lMjBmaXRzJTIwWW91ciUyMERpc3RyaWN0JTIwTmVlZHMlMjBmb3IlMjB0aGUlMjAyMDIxLTIyJTIwU2Nob29sJTIwWWVhcg==',
  'https://staging.aeries.com/events/QWVyaWVzQ29uJTIwVmlydHVhbCUyMFN1bW1pdCUyMDIwMjAlMjBSZXBsYXlz',
  'https://staging.aeries.com/events/UHJlcGFyaW5nJTIwZm9yJTIwMjAyMS0yMiUyMFNjaGVkdWxpbmclMjBXZWJpbmFy',
  'https://staging.aeries.com/events/U2NoZWR1bGluZw==',
  'https://staging.aeries.com/events/U2NoZWR1bGluZyUyMGluJTIwQWVyaWVzJTIwLSUyMFVzaW5nJTIwdGhlJTIwU01TJTIwQm9hcmQlMjBXZWJpbmFy',
  'https://staging.aeries.com/events/RmxleCUyMFNjaGVkdWxpbmclMjBpbiUyMEFlcmllcyUyMFdlYmluYXI=',
  'https://staging.aeries.com/events/RWxlbWVudGFyeSUyME1hc3RlciUyMFNjaGVkdWxlJTIwV2ViaW5hcg==',
  'https://staging.aeries.com/training/catalog',
  'https://staging.aeries.com/training/academy',
  'https://staging.aeries.com/about/leadership',
  'https://staging.aeries.com/careers',
  'https://staging.aeries.com/careers/#openings',
  'https://staging.aeries.com/careers/aeries-quality-control-and-documentation-specialist/42/',
  'https://staging.aeries.com/careers/part-time-aeries-trainer/39/',
  'https://staging.aeries.com/careers/aeries-database-administrators/35/',
  'https://staging.aeries.com/careers/aeries-support-analyst/24/',
  'https://staging.aeries.com/privacy-policy',
  'https://staging.aeries.com/workshop-events#eventsContainer',
  'https://staging.aeries.com/training/academy/aeries-district-coordinator',
  'https://staging.aeries.com/training/academy/data-management',
  'https://staging.aeries.com/training/academy/aeries-system-administration',
  'https://staging.aeries.com/training/academy/secondary-school-management',
  'https://staging.aeries.com/training/academy/elementary-school-management',
  'https://staging.aeries.com/training/academy/secondary-counseling-applications',
  'https://staging.aeries.com/training/academy/discipline',
  'https://staging.aeries.com/training/academy/scheduling',
  'https://staging.aeries.com/training/academy/attendance',
  'https://staging.aeries.com/training/academy/fundamentals-of-aeries',
  'https://staging.aeries.com/training/academy/advanced-secondary-teacher-applications',
  'https://staging.aeries.com/training/academy/advanced-elementary-teacher-applications',
  'https://staging.aeries.com/training/academy/aeries-secondary-teacher-portal',
  'https://staging.aeries.com/training/academy/aeries-elementary-teacher-portal',
  'https://staging.aeries.com/training/academy/aeries-secondary-gradebook',
  'https://staging.aeries.com/training/academy/aeries-elementary-gradebook',
  'https://staging.aeries.com/training/academy/'
]
    }
  },
computed : {
  checkedPageURLs() {
    var output = [];
    for (var i = 0; i < this.checkedPages.length; i++) {
      output.push(this.checkedPages[i].url);
    }
    return output;
  }
},
methods : {
fetchApprovals() {
  var globalScope = this;
  axios
    .get('/rest/website-redesign-testing?$limit=9999&user=' + this.currentUserID)
    .then(function(response) {
      globalScope.checkedPages = response.data.data;
  })
},
approvePage(pageURL) {
  var globalScope = this;
  console.log(pageURL)
  if (this.checkedPageURLs.includes(pageURL)) {
    alert("You have already approved this page.")
  } else {
    // this.checkedPages.push(page);
    axios
      .post('/rest/website-redesign-testing', {user: globalScope.currentUserID, url: pageURL})
      .then(function(response) {
        globalScope.fetchApprovals()
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
    var me = this.getCookie('me');
    var meid = this.getCookie('meid');

    if (me) {
        this.currentUser = me;
    }
    if (meid) {
        this.currentUserID = meid;
    }
    

      //For passing to our function
      var globalScope = this;

      this.fetchApprovals();

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
      
      //Jira
      axios
      .get('/rest/users?platform=jira&is_bot[$ne]=true')
      .then(function(response) {
        globalScope.totalJiraUsers = response.data.total;
      })




},

}
</script>
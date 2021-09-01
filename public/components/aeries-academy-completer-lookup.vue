<template lang="pug">
div(class="px-2")
  main

    section
      div.container.flex.flex-col.pt-12
        h1.text-xx-large.font-bold.font-aeries Aeries Academy
        div(class="w-full md:w-3/5")
          h2.text-title.font-bold.font-aeries.mb-4 Completer lookup
          p.text-minimum-text.mb-4 Search for Aeries Academy users and show their certification status. Data refreshes each morning at 4:00 AM.
          
      div.mb-12.container
        h2.text-title.font-bold.font-aeries.mb-4 Filter Aeries Academy completers

        div.filter-options.flex.mb-4
          div(class="w-1/6").pr-4
            input(v-model="userNameFilter" placeholder="Name" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-1/6").pr-4
            input(v-model="userEmailFilter" placeholder="Email" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-1/6").pr-4
            input(v-model="courseNameFilter" placeholder="Course name" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-1/6").pr-4
            input(v-model="courseIDFilter" placeholder="Course ID" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-2/6").pr-4
            select(v-model="certStatusFilter").font-aeries.font-bold.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1.border-b-2.border-neutral-1000
              option All
              option Completed & certified
              option Incomplete
              option No certificate detected - needs to be created
       
        h2.text-title.font-bold.font-aeries.mb-4
          | Showing 
          select(v-model="limitResults").inline.font-aeries.font-bold.leading-tight.inline-block.bg-neutral-500.mx-2.p-2.py-2.mb-1.border-b-2.border-neutral-1000
            option 100
            option 200
            option 500
            option 9999
          | of {{filteredResults.length}} results
        table.text-left.shadow-lg.bg-white.table-fixed
          thead
            tr
              th.bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Name
              th.bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Email
              th.bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Course name
              th.bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Course ID
              th.bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Score
              th.bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Certificate status
          tbody
            tr(v-for="user in filteredResults.slice(0, limitResults)")
              td.border.border-neutral-700.text-left.px-8.py-4 
                span.text-minimum-text.text-neutral-1600 {{user.name}}
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-neutral-1600 {{user.email}}
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-neutral-1600 {{user.courseName}}
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-neutral-1600 {{user.courseID}}
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-neutral-1600 {{user.score}}
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-neutral-1600 {{user.certStatus}}
              
</template>

<script>
const axios = require('axios');
const request = require('request');
const Papa = require('papaparse');

module.exports = {
data() {
    return {
        academyUsers: [],
        currentUser : "",
        userNameFilter: "",
        userEmailFilter: "",
        courseNameFilter: "",
        courseIDFilter: "",
        certStatusFilter: "All",
        limitResults: 100
    }
  },
computed : {
  filteredResults() {
    
    var filterName = this.userNameFilter !== "";
    var filterEmail = this.userEmailFilter !== "";
    var filterCourseName = this.courseNameFilter !== "";
    var filterCourseID = this.courseIDFilter !== "";
    var filterCertStatus = this.certStatusFilter !== "All";

    var results = [];

    for (var i = 0; i < this.academyUsers.length; i++) {
      var user = this.academyUsers[i];
      var includeUser = true;

      //Name
      if (filterName) {
        if (!user.name.includes(this.userNameFilter)) {
          includeUser = false;
        }
      }

      //Email
      if (filterEmail) {
        if (!user.email.includes(this.userEmailFilter)) {
          includeUser = false;
        }
      }

      //Course name
      if (filterCourseName) {
        if (!user.courseName.includes(this.courseNameFilter)) {
          includeUser = false;
        }
      }

      //Course ID
      if (filterCourseID) {
        if (user.courseID.toString() !== this.courseIDFilter) {
          includeUser = false;
        }
      }

      //Cert status
      if (filterCertStatus) {
        if (user.certStatus !== this.certStatusFilter) {
          includeUser = false;
        }
      }

      //If the user matches our criteria, include them in filter results
      if (includeUser) {
        results.push(user);
      }
    
    }
    return results;
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
      .get('/rest/aeries-academy-all-completers?$limit=9999')
      .then(function(response) {
        globalScope.academyUsers = response.data.data;
      })

    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }

},

}
</script>
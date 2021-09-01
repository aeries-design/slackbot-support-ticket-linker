<style scoped>
.design-widget {
  background-image: url('/images/topo-pattern-small.svg')
}
</style>

<template lang="pug">

main
  section
    div.container

  #viewApplicants(v-if="!viewCoverLetter")
    h2(class="text-title md:text-display font-bold font-aeries pt-6 text-center mb-4") Applicants
    section#sortFilterControls(class="flex justify-center")
      div(class="bg-neutral-500 p-3 rounded-sm shadow-lg inline-flex")
        .filterBy(class="m-2")
          div(class="mb-2") Filter by team
          select(type="dropdown" v-model="filterByDepartment" class="font-bold p-2")
            option(value="all") All
            option(v-for="dept in departmentList") {{dept}}
    
    section#applicantsTable(class="bg-neutral-500 m-6 py-6 rounded-sm shadow-lg")
      table(class="w-full table-auto")
        thead
          th(class="text-left text-title font-aeries pl-6") Submitted
          th(class="text-left text-title font-aeries") Department
          th(class="text-left text-title font-aeries") Position
          th(class="text-left text-title font-aeries") Full name
          th(class="text-right text-title font-aeries pr-6") Cover Letter
        tbody
          tr(v-for="application in filteredApplicants" class="hover:bg-neutral-600 h-10")
            td(class="pl-6") {{new Date(application.sumitted).toLocaleString()}}
            td(class="pl-6") {{application.position.dept}}
            td {{application.position.title}}
            td {{application.applicant.fullName}}
            td(class="text-right pr-6")
              a(@click="selectedApplication = application; viewCoverLetter = true;" class="text-blue-600 cursor-pointer hover:bg-blue-200") Click to view cover letter
        
  #viewCoverLetter(v-if="viewCoverLetter")
    .container
      div(class="mb-8 text-title md:text-display font-bold font-aeries pt-6") {{selectedApplication.applicant.fullName}}
      p(class="text-minimum-text uppercase font-bold mb-2") Applicant details
      div(class="text-minimum-text ml-2 border-l-2 pl-2 pt-1 text-neutral-1700 border-neutral-1700")
        div 
          span Education level - 
          span(class="font-bold") {{selectedApplication.applicant.educationLevel}}
        div 
          span State, Zip - 
          span(class="font-bold") {{selectedApplication.applicant.state}}, {{selectedApplication.applicant.zip}}
        div 
          span Email - 
          span(class="font-bold") {{selectedApplication.applicant.email}}
        div(class="mb-8") 
          span Phone - 
          span(class="font-bold") {{selectedApplication.applicant.phone}}

      p(class="text-minimum-text uppercase font-bold mb-2") Cover letter
      div(class="mb-8 italic") {{selectedApplication.applicant.coverLetter}}
      div(class="mb-2")
        a(@click="selectedApplication = {}; viewCoverLetter = false;" class="text-subhead text-blue-600 font-bold cursor-pointer") Back to applicants list
      div(class="mb-2")
        a(@click="archiveApplication(selectedApplication)" class="text-subhead text-orange-800 font-bold cursor-pointer") Archive & hide this applicant

</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        currentUser : "",
        totalSlackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
        applications: [],
        filterByDepartment: "all",
        viewCoverLetter: false,
        selectedApplication: {},
    }
  },
  computed: {
    departmentList() {
      var list = [];
      for (var i = 0; i < this.applications.length; i++) {
        list.push(this.applications[i].position.dept)
      }
      var deduplicatedList = Array.from(new Set(list))
      return deduplicatedList;
    },
    filteredApplicants() {
      var filteredList = [];
      for (var i = 0; i < this.applications.length; i++) {
        if (this.filterByDepartment !== "all") {
          if (this.applications[i].position.dept == this.filterByDepartment) {
            filteredList.push(this.applications[i]);
          }
      } else {
        filteredList.push(this.applications[i]);
      }
    }
    return filteredList;
  },
},
methods : {
archiveApplication(application) {
  var areYouSure = confirm("Hide this applicant from the main list? This data will not be lost.")
  if (areYouSure) {
      application.deleted = "true";
      axios
      .put('https://aeries.services/applicants/' + application._id, application)
      .then(function(response) {
        window.location.reload();
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



      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true')
      .then(function(response) {
        globalScope.totalSlackUsers = response.data.total;
      })

      //Applicants
      axios
      .get('https://aeries.services/applicants?$limit=&$sort[sumitted]=-1&deleted[$ne]=true')
      .then(function(response) {
        globalScope.applications = response.data.data;
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



    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
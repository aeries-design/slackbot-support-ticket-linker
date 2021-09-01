<style scoped>
main {
  background-image: url('/images/topo-pattern.svg'); 
  background-size: 102%; 
  background-repeat: no-repeat; 
  background-position: 0px -140px;
}

.big-dreams {
  background-image: url('/images/geometry-pattern.svg'); 
  background-size: 14%; 
  background-repeat: no-repeat; 
  background-position: 100% 0%;
}

.service {
  max-width: 300px;
}

.content {
  background-color: #f5f6fa;
}

</style>

<template lang="pug">
main.pt-6.h-full(style="")
  design-subheader
  modal(v-if='showSlackUserModal' @close='showSlackUserModal = false')
    // you can use custom content here to overwrite default content
    h3(slot='header') Select Slack users
    div(slot="body")
        slack-users-list-modal(v-on:update:selectedUsers="selectedUsers = $event")
    div(slot="footer")
        button.font-bold.modal-default-button.ml-6(@click="showSlackUserModal = false")
            | OK
  
  section
    div
      div.container.flex
        div(class="w-4/5")
          h2.text-xx-large.font-bold.font-aeries.py-10.text-white Create new sprint

      div.content
        div.container.pt-12
          
          h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Sprints
          
          .flex.flex-wrap
            a(:href="'/design/sprint/?sprintWeek='+sprint.sprintWeek" v-for="sprint in allSprints" class="w-full flex flex-col md:w-1/4 lg:pr-8 pb-6 max-w-sm")
              div(class="flex flex-col h-full px-6 py-4 rounded overflow-hidden shadow-lg bg-white")
                //- div(class="w-12 mb-6")
                //-   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
                .font-bold.text-title.mb-2 {{sprint.sprintName}}
                p.text-gray-700.text-base
                  | {{sprint.sprintWeek}}
            
            a(v-if="!addNewSprintModal" @click="addNewSprintModal = true" class="w-full flex flex-col md:w-1/4 lg:pr-8 pb-6 max-w-sm cursor-pointer opacity-75")
              div(class="flex flex-col h-full px-6 py-4 rounded overflow-hidden shadow-lg bg-white border border-neutral-700 border-dashed")
                //- div(class="w-12 mb-6")
                //-   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
                h1(class="font-bold text-title mb-2 text-neutral-800") + Add new sprint

            a(v-if="addNewSprintModal" class="w-full flex flex-col md:w-1/4 lg:pr-8 pb-6 max-w-sm")
              div(class="flex flex-col h-full px-6 py-4 rounded overflow-hidden shadow-lg bg-white border border-neutral-700 border-dashed")
                //- div(class="w-12 mb-6")
                //-   <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
                h1(class="font-bold text-title mb-2 text-neutral-1900") + Add new sprint
                p
                  select(v-model="sprintWeekString" class="mb-3 w-full font-bold leading-tight inline-block bg-neutral-500 p-2 py-2")
                    option(
                      v-for="monday in allSprintPeriods"
                      v-bind:selected="monday.selected"
                      ) {{monday.title}}
                  input(v-model="sprintName" placeholder="Sprint title" class="w-full font-bold leading-tight block bg-neutral-500 p-3 py-2")
                  div
                    a(@click="createSprint()" class="cursor-pointer block mt-3 py-2 bg-blue-700 w-full text-center text-white font-semi-bold font-aeries") Create sprint
        
        //- div
          div.container.flex.pt-12(v-if="selectedPage == 'kickoff'")
            div(class="w-4/5 text-neutral-1900")
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Let's kick off a sprint!
              p.text-subhead.leading-tight.mb-6 We just need three pieces of information to kick off a new sprint.
              div.mb-12
                p.text-subhead.leading-tight.mb-6 First, choose a week for your sprint. Usually you would use this tool every Monday at the beginning of the sprint you're creating, but you can choose any other week in the future if you're planning ahead.
                p.text-subhead.font-bold.leading-tight.mb-2 1. Which workweek are you creating a sprint for?
                p
                  select(v-model="sprintWeekString").font-aeries.text-title.font-bold.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1.border-b-2.border-neutral-1000
                    option(
                      v-for="monday in allSprintPeriods"
                      v-bind:selected="monday.selected"
                      ) {{monday.title}}
                p.mb-6.text-blue-700.font-bold
                  a.cursor-pointer(href="/design/sprints")
                    span.pr-2 See all sprints
                    <svg class="inline-flex" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9413 0.28427C11.5431 -0.0947137 10.8972 -0.0947783 10.4988 0.284206C10.1006 0.663254 10.1005 1.27777 10.4988 1.65682L13.5177 4.52951H1.02001C0.456693 4.52951 0 4.96408 0 5.50011C0 6.03613 0.456693 6.4707 1.02001 6.4707H13.5175L10.4988 9.34313C10.1005 9.72218 10.1005 10.3367 10.4988 10.7157C10.698 10.9053 10.9591 11 11.2201 11C11.4812 11 11.7422 10.9053 11.9413 10.7157L16.7012 6.18644C17.0996 5.80746 17.0996 5.19288 16.7012 4.81383L11.9413 0.28427Z" fill="#345BA9"/>
                    </svg>
              div.mb-12
                p.text-subhead.leading-tight.mb-6 Then pick a name that will be visible to everyone else in the company. Bonus points if it’s an inside joke or pop culture reference.
                p.text-subhead.font-bold.leading-tight.mb-2 2. What is your sprint called?
                div(class="w-3/5")
                  input(v-model="sprintName" placeholder="E.g. Baby Yoda" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
                  //- p.mb-6(v-if="cookComponentNameFromTitle")
                  //-   span.pr-2 The component tag will be #[strong {{cookComponentNameFromTitle}}]
              div.mb-12
                p.text-subhead.leading-tight.mb-6 Choose any projects that should show as ongoing "Big Tasks". Be sure the tasks in these projects have 'Estimated Hours' set so the ETA can show on the sprint dashboard.
                p.text-subhead.font-bold.leading-tight.mb-2 3. Enter any (comma-separated) project keys
                div(class="w-3/5")
                  input(v-model="projects" placeholder="E.g. DSGNWR" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
                  //- p.mb-6(v-if="cookComponentNameFromTitle")
                  //-   span.pr-2 The component tag will be #[strong {{cookComponentNameFromTitle}}]
              div.mb-12
                p.text-subhead.leading-tight.mb-6 Finally, add any stakeholders (if any) that should be directly involved or informed of the work being done in your sprint. They will be tagged in the sprint kickoff document, inviting them to join meetings and review the sprint documentation as it is published.
                p.text-subhead.font-bold.leading-tight.mb-2 4. Who should be directly involved or informed during this sprint?
                div(class="w-3/5")
                  input(v-model="slackTagList" @click="showSlackUserModal = true" placeholder="Search for Eagles..." class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2 mb-6")
                a(class="cursor-pointer block mt-12 py-2 bg-blue-700 w-1/5 text-center text-white font-semi-bold font-aeries" @click="selectedPage = 'confirm'") Continue
          
          
          
          div.container.flex.pt-12(v-if="selectedPage == 'confirm'")
            div(class="w-4/5 text-neutral-1900")
              p.mb-6.text-blue-700.font-bold.text-subhead
                a.cursor-pointer(@click="selectedPage = 'kickoff'")
                  <svg class="inline-flex" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.05867 0.28427C5.45688 -0.0947137 6.10282 -0.0947783 6.50117 0.284206C6.89945 0.663254 6.89952 1.27777 6.50117 1.65682L3.48235 4.52951H15.98C16.5433 4.52951 17 4.96408 17 5.50011C17 6.03613 16.5433 6.4707 15.98 6.4707H3.48248L6.50117 9.34313C6.89952 9.72218 6.89952 10.3367 6.50117 10.7157C6.302 10.9053 6.04094 11 5.77989 11C5.51883 11 5.25778 10.9053 5.05867 10.7157L0.29876 6.18644C-0.0995883 5.80746 -0.0995883 5.19288 0.29876 4.81383L5.05867 0.28427Z" fill="#345BA9"/>
                  </svg>
                  span.pl-2 Back

              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Almost done...
              p.text-subhead.leading-tight.mb-6 Here's what happens when you click "create sprint".
              ul.list-disc.pl-8
                li.text-subhead.mb-4 Create a subproject in the Design Jira project component with the tag #[strong {{sprintName}}]. Tasks marked as "In Progress" during the sprint will automatically be added to it.
                //- li.text-subhead.mb-4 Move all currently in-progress tasks that were not completed from the last sprint back into the backlog so they can be re-evaluated.
                li.text-subhead.mb-4 Create a #[a.cursor-pointer.text-blue-700(href="https://docs.aeries.works/display/CD/Design+sprints") Confluence page here] called called #[strong {{sprintDocumentTitlePrefix}}] containing document templates for meetings throughout the week.
                  ul.list-disc.pl-8.mt-4
                    li.text-subhead.mb-4 Create a child page underneath it called 
                      span.font-bold {{sprintName}} | Sprint Planning - Monday {{sprintWeek.split(' - ')[0]}}
                    li.text-subhead.mb-4 Create a child page underneath it called 
                      span.font-bold {{sprintName}} | Retrospective - Friday {{sprintWeek.split(' - ')[1]}}     
              div
                a(@click="createSprint()" class="cursor-pointer block mt-12 py-2 bg-blue-700 w-1/5 text-center text-white font-semi-bold font-aeries") Create sprint
         
          div.container.flex.pt-12(v-if="selectedPage == 'congratulations'")
            div(class="w-4/5 text-neutral-1900")
              p.mb-6.text-blue-700.font-bold.text-subhead
                a.cursor-pointer(@click="selectedPage = 'kickoff'")
                  <svg class="inline-flex" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.05867 0.28427C5.45688 -0.0947137 6.10282 -0.0947783 6.50117 0.284206C6.89945 0.663254 6.89952 1.27777 6.50117 1.65682L3.48235 4.52951H15.98C16.5433 4.52951 17 4.96408 17 5.50011C17 6.03613 16.5433 6.4707 15.98 6.4707H3.48248L6.50117 9.34313C6.89952 9.72218 6.89952 10.3367 6.50117 10.7157C6.302 10.9053 6.04094 11 5.77989 11C5.51883 11 5.25778 10.9053 5.05867 10.7157L0.29876 6.18644C-0.0995883 5.80746 -0.0995883 5.19288 0.29876 4.81383L5.05867 0.28427Z" fill="#345BA9"/>
                  </svg>
                  span.pl-2 Back

              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Sprint created!
              p.text-subhead.leading-tight.mb-6 Huzzah and happy day! As you embark on this week's journey, take this message:
              div 
                iframe(width='560' height='315' :src='"https://www.youtube.com/embed/" + congratulationsVideo + "?autoplay=1"' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen='')




</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        selectedPage : "kickoff",
        showSlackUserModal: false,
        selectedUsers : [],
        currentUser : "",
        sprintName: "",
        sprintWeekString: "",
        projects: "",
        addNewSprintModal: false
    }
  },
methods : {
  createSprint() {

    var sprint = {
      sprintName: this.sprintName,
      sprintWeek: this.sprintWeek,
      sprintStakeholders: this.slackTagList
    }

    //Set the projects
    sprint.projects = this.projects.split(',');

    var thisScope = this;

    axios.post('/api/create-design-sprint', sprint)
            .then(function (response) {
                console.log(response);
                thisScope.selectedPage = "congratulations";
            })
            .catch(function (error) {
                alert("Failed to create sprint.")
                console.log(error);
            });
  },
  getMondays(d) {
  // Copy d if provided
  d = d ? new Date(+d) : new Date();
  // Set to start of month
  d.setDate(1);
  d.setMonth(0);
  // Store end year and month
  var endYear = d.getFullYear() + 1;
  var endMonth = d.getMonth();

  // Set to first Monday
  d.setDate(d.getDate() + (8 - (d.getDay() || 7)) % 7);
  var mondays = [new Date(+d)];

  // Create Dates for all Mondays up to end year and month
  while (d.getFullYear() < endYear || d.getMonth() != endMonth) {
    mondays.push(new Date(d.setDate(d.getDate() + 7)));
  }
  return mondays;
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
computed: {
  allSprints() {
    return this.$attrs.sprints;
  },
  congratulationsVideo() {
    var videos = [
      '0qgET1Zhpb8', //Stay calm
      'oyFQVZ2h0V8', //Congratulations anime
      'hpigjnKl7nI', //Watch your profanity
      'xzpndHtdl9A', // Is only a game, why you have to be mad
      's-l2Iq13lPA', //20th Century Fox Airhorn MLG
      'gDRAEktIJWA' //Disney 420 MLG intro
    ]
    return videos[Math.floor(Math.random() * videos.length)];
  },
  cookComponentNameFromTitle() {
            var stripSpaces = this.sprintName.replace(/ +/g, '-').toLowerCase();
            var cookedComponentName = stripSpaces.replace(/[^0-9a-zA-Z-]/gi, '');

            return cookedComponentName;
        },
    slackTagList() {
    var slackTagList = [];
    for (var i = 0; i < this.selectedUsers.length; i++) {
        if (this.selectedUsers[i].profile.real_name) {
          slackTagList.push("@" + this.selectedUsers[i].real_name);
        } else if (this.users[i].profile.display_name) {
          slackTagList.push("@" + this.selectedUsers[i].profile.display_name);
        } else {
          slackTagList.push("@" + this.selectedUsers[i].name);
        }
    }
    return slackTagList.join(", ");
  },
sprintDocumentTitlePrefix() {
  return  this.sprintName + " | " + this.sprintWeek
},
sprintWeek() {
  return this.sprintWeekString.split(' (')[0]
},
allSprintPeriods() {
  var mondays = this.getMondays();
  var mondayStringArray = []
  
  Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
  }

  var prevMonday = new Date();
  prevMonday = new Date(prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7));

  var thisScope = this;

  mondays.forEach(function(mon) {
  
  var fri = mon.addDays(4);
  
  var selected = false;

  var mondayString = mon.toISOString().substr(0, 10).split('-')[1] + "/" + mon.toISOString().substr(0, 10).split('-')[2] //"05/01" 

  var currentMondayString = prevMonday.toISOString().substr(0, 10).split('-')[1] + "/" + prevMonday.toISOString().substr(0, 10).split('-')[2] //"05/01" 


  if (mondayString == currentMondayString) {selected = true};

  var fridayString = fri.toISOString().substr(0, 10).split('-')[1] + "/" + fri.toISOString().substr(0, 10).split('-')[2] //"05/01" 


  var title = mondayString + " - " + fridayString;
  var selectedString = "";
  if (selected == true) {
    selectedString = "(This week)"
    thisScope.sprintWeekString = title + " " + selectedString;
  }
  mondayStringArray.push({title: title + " " + selectedString, selected : selected});

});

return mondayStringArray;
}
},
async mounted () {
      //For passing to our function
      var globalScope = this;

    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
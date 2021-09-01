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
            | Cancel
        button.font-bold.modal-default-button.ml-6(@click="editVideo()")
            | OK
  section
    div
      div.container.flex
        div(class="w-4/5")
          h2.text-xx-large.font-bold.font-aeries.py-10.text-white Daily design standups

      div.content
        div.big-dreams
          
          
          
          div.container.flex.pt-12(v-if="selectedPage == 'standup'")
            div(class="w-4/5 text-neutral-1900")
              div(class="w-3/5 mr-4")
                .font-body.font-bold.leading-tight The current design sprint period is
                a.text-xx-large.font-bold.font-aeries.w-full.leading-tight {{title}}
                .font-body.font-bold.mb-6.leading-tight We're {{daysIn}} day#[span(v-if="daysIn > 1") s] in

              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Standup time!
              p.text-subhead.leading-tight.mb-6 Four quick questions for you!
              div.mb-12
                p.text-subhead.leading-tight.mb-6 As you probably remember, we do our daily standups Tuesday through Thursday to help keep work moving and help each other out.
                p.text-subhead.leading-tight.mb-6 Your responses will be merged into a standup document with responses from other design team members. We'll review the document together for 15 minutes.
                p.text-subhead.font-bold.leading-tight.mb-2 1. What are you up to today?
                div(class="w-full")
                  textarea(v-model="upToToday" placeholder="E.g. I’ve been creating page designs for the daily standup dashboard in Figma" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
                  //- p.mb-6(v-if="cookComponentNameFromTitle")
                  //-   span.pr-2 The component tag will be #[strong {{cookComponentNameFromTitle}}]
                
                //- p
                //-   select(v-model="sprintWeekString").font-aeries.text-title.font-bold.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1.border-b-2.border-neutral-1000
                //-     option(
                //-       v-for="monday in allSprintPeriods"
                //-       v-bind:selected="monday.selected"
                //-       ) {{monday.title}}
              div.mb-12
                p.text-subhead.font-bold.leading-tight.mb-2 2. Are there any roadblocks in your way since we last met?
                div(class="w-full")
                 textarea(v-model="roadblocksToday" placeholder="E.g. I need help with the best way to approach this problem" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
                 //- p.mb-6(v-if="cookComponentNameFromTitle")
                  //-   span.pr-2 The component tag will be #[strong {{cookComponentNameFromTitle}}]
              div(class="flex").mb-12
                div(class="w-1/2 pr-8")
                  p.text-subhead.font-bold.leading-tight.mb-2 3. How do you feel about the current workload?
                  div(class="bg-neutral-400")
                    div(class="colors flex justify-center")
                      div(@click="workloadToday = 'bad'" v-bind:class="{ 'bg-neutral-600': workloadToday == 'bad'}" class="w-1/3 text-center py-4 px-8 hover:bg-neutral-500 cursor-pointer")
                        .bg-red-600.rounded-full.h-12.w-12.inline-block
                        p.font-bold.text-center Bad
                      div(@click="workloadToday = 'mixed'" v-bind:class="{ 'bg-neutral-600': workloadToday == 'mixed'}" class="w-1/3 text-center py-4 px-8 hover:bg-neutral-500 cursor-pointer")
                        .bg-orange-600.rounded-full.h-12.w-12.inline-block
                        p.font-bold.text-center Mixed
                      div(@click="workloadToday = 'good'" v-bind:class="{ 'bg-neutral-600': workloadToday == 'good'}" class="w-1/3 text-center py-4 px-8 hover:bg-neutral-500 cursor-pointer")
                        .bg-green-600.rounded-full.h-12.w-12.inline-block
                        p.font-bold.text-center Good
                    input(v-if="workloadToday !== ''" v-model="workloadTodayWhy" placeholder="Why do you say that?" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
                div(class="w-1/2 pr-8")
                  p.text-subhead.font-bold.leading-tight.mb-2 4. How do you feel about things in general?
                  div(class="bg-neutral-400")
                    div(class="colors flex justify-center")
                      div(@click="sentimentToday = 'bad'" v-bind:class="{ 'bg-neutral-600': sentimentToday == 'bad'}" class="w-1/3 text-center py-4 px-8 hover:bg-neutral-500 cursor-pointer")
                        .bg-red-600.rounded-full.h-12.w-12.inline-block
                        p.font-bold.text-center Bad
                      div(@click="sentimentToday = 'mixed'" v-bind:class="{ 'bg-neutral-600': sentimentToday == 'mixed'}" class="w-1/3 text-center py-4 px-8 hover:bg-neutral-500 cursor-pointer")
                        .bg-orange-600.rounded-full.h-12.w-12.inline-block
                        p.font-bold.text-center Mixed
                      div(@click="sentimentToday = 'good'" v-bind:class="{ 'bg-neutral-600': sentimentToday == 'good'}" class="w-1/3 text-center py-4 px-8 hover:bg-neutral-500 cursor-pointer")
                        .bg-green-600.rounded-full.h-12.w-12.inline-block
                        p.font-bold.text-center Good
                    input(v-if="sentimentToday !== ''" v-model="sentimentTodayWhy" placeholder="Why do you say that?" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
              div.mb-12
               a(class="cursor-pointer block mt-12 py-2 bg-blue-700 w-1/5 text-center text-white font-semi-bold font-aeries" @click="continueToConfirm()") Continue
          
          
          
          div.container.flex.pt-12(v-if="selectedPage == 'confirm'")
            div(class="w-4/5 text-neutral-1900")
              p.mb-6.text-blue-700.font-bold.text-subhead
                a.cursor-pointer(@click="selectedPage = 'standup'")
                  <svg class="inline-flex" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.05867 0.28427C5.45688 -0.0947137 6.10282 -0.0947783 6.50117 0.284206C6.89945 0.663254 6.89952 1.27777 6.50117 1.65682L3.48235 4.52951H15.98C16.5433 4.52951 17 4.96408 17 5.50011C17 6.03613 16.5433 6.4707 15.98 6.4707H3.48248L6.50117 9.34313C6.89952 9.72218 6.89952 10.3367 6.50117 10.7157C6.302 10.9053 6.04094 11 5.77989 11C5.51883 11 5.25778 10.9053 5.05867 10.7157L0.29876 6.18644C-0.0995883 5.80746 -0.0995883 5.19288 0.29876 4.81383L5.05867 0.28427Z" fill="#345BA9"/>
                  </svg>
                  span.pl-2 Back

              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Almost done...
              p.text-subhead.leading-tight.mb-6 When you click "Submit standup", your response will be sent to a queue until all members of the design team have responded, or at 12:30 (whichever comes first). 
              
              p.text-subhead.leading-tight.mb-6 It can be found in the #[a.text-blue-600.font-bold(href="https://docs.aeries.works/display/CD/Design+sprints") current sprint documentation.]
               
              div
                a(@click="submitStandup()" class="cursor-pointer block mt-12 py-2 bg-blue-700 w-1/5 text-center text-white font-semi-bold font-aeries") Submit standup
         
          div.container.flex.pt-12(v-if="selectedPage == 'congratulations'")
            div(class="w-4/5 text-neutral-1900")
              p.mb-6.text-blue-700.font-bold.text-subhead
                a.cursor-pointer(@click="selectedPage = 'standup'")
                  <svg class="inline-flex" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.05867 0.28427C5.45688 -0.0947137 6.10282 -0.0947783 6.50117 0.284206C6.89945 0.663254 6.89952 1.27777 6.50117 1.65682L3.48235 4.52951H15.98C16.5433 4.52951 17 4.96408 17 5.50011C17 6.03613 16.5433 6.4707 15.98 6.4707H3.48248L6.50117 9.34313C6.89952 9.72218 6.89952 10.3367 6.50117 10.7157C6.302 10.9053 6.04094 11 5.77989 11C5.51883 11 5.25778 10.9053 5.05867 10.7157L0.29876 6.18644C-0.0995883 5.80746 -0.0995883 5.19288 0.29876 4.81383L5.05867 0.28427Z" fill="#345BA9"/>
                  </svg>
                  span.pl-2 Back

              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Standup submitted! All set for the meeting.
              p.text-subhead.leading-tight.mb-6 You've done it, you magnificent person.


</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        selectedPage : "standup",
        currentUser : "",
        sprintName: "",
        sprintWeekString: "",
        upToToday: "",
        roadblocksToday: "",
        workloadToday: "",
        sentimentToday: "",
        workloadTodayWhy: "",
        sentimentTodayWhy: ""

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
},
continueToConfirm() {
  if (this.formIsFilledOut == true) {
    this.selectedPage = "confirm"
  } else {
    alert("Looks like you haven't filled out every field yet.")
  }
},
submitStandup() {
    var thisScope = this;
    axios.post('/api/submit-design-standup', this.standup)
            .then(function (response) {
                console.log(response);
                thisScope.selectedPage = "congratulations";
            })
            .catch(function (error) {
                alert("Dang it, something went wrong. Failed to create sprint. " + error)
                console.log(error);
            });
  }
},
computed: {
formIsFilledOut() {
    var standup = this.standup;
    var standupObject = Object.keys(this.standup);
    var submitRequest = true;

    for (var i = 0; i < standupObject.length; i++) {
      console.log(standupObject[i])
      //If no value provided for the fieldl
      if (standup[standupObject[i]] == "") {
          //If the field is the sentiment or workload Why
        if (standupObject[i] == "sentimentTodayWhy" && standup.sentimentToday == "good") {
          //Do nothing
        } else if (standupObject[i] == "workloadTodayWhy" && standup.workloadToday == "good")
        {
          //Do nothing
        } else {
          submitRequest = false;
        }
      }
    }

    return submitRequest;
},
standup() {
var standup = {
      me: this.currentUser,
      date: this.today,
      year: this.year.toString(),
      upToToday : this.upToToday,
      roadblocksToday : this.roadblocksToday,
      workloadToday : this.workloadToday,
      sentimentToday : this.sentimentToday,
      workloadTodayWhy : this.workloadTodayWhy,
      sentimentTodayWhy : this.sentimentTodayWhy,
    }
    return standup;
},
sprintWeek() {
  return this.sprintWeekString.split(' (')[0]
},
monday() {
Date.prototype.addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        }

        Date.prototype.subtractDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() - days);
          return date;
        }

        var monday = new Date();
      var monday = new Date(monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7));
      return monday;
},
mondayString() {
return this.monday.toISOString().substr(0, 10).split('-')[1] + "/" + this.monday.toISOString().substr(0, 10).split('-')[2]
},
friday() {
return this.monday.addDays(4);
},
fridayString() {
return this.friday.toISOString().substr(0, 10).split('-')[1] + "/" + this.friday.toISOString().substr(0, 10).split('-')[2]
},
today() {
var today = new Date();
return today.toISOString().substr(0, 10).split('-')[1] + "/" + today.toISOString().substr(0, 10).split('-')[2]
},
year() {
var today = new Date();
return today.getFullYear();
},
title() {
return this.mondayString + " - " + this.fridayString;
},
daysIn() {
var daysInNumber = new Date().getDate() - this.monday.getDate();
if (daysInNumber == 0) {daysInNumber = 1};
return daysInNumber;
}
},
mounted () {

    //WHO AM I
    var me = this.getCookie('me');

    if (me) {
        this.currentUser = me;
    }
},

}
</script>
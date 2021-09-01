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
  section
    div
      div.container.flex
        div(class="w-4/5")
          h2.text-xx-large.font-bold.font-aeries.py-10.text-white Daily design standups
      div.content
        div.big-dreams
          div.container.flex.pt-12(v-if="selectedPage == 'standup'")
            div(class="w-4/5 text-neutral-1900")
              div(class="w-full mr-4")
                .font-body.font-bold.leading-tight Today is
                a.text-xx-large.font-bold.font-aeries.w-full.leading-tight {{today}}
                .text-subhead.mb-6.leading-tight Time for daily standup {{daysIn}} of 5 this week! For responses, there is {{responses}} so far for today.

              h1.font-aeries.text-xx-large.font-bold.leading-tight Create the standup now!
              p.text-subhead Hit this button to take the current responses ({{responses}}) and create a new Confluence document for the meeting!
              div
                a(@click="createStandup()" class="cursor-pointer block mt-12 py-2 bg-blue-700 w-1/5 text-center text-white font-semi-bold font-aeries") Create standup doc
         
          div.container.flex.pt-12(v-if="selectedPage == 'congratulations'")
            div(class="w-4/5 text-neutral-1900")
              p.mb-6.text-blue-700.font-bold.text-subhead
                a.cursor-pointer(@click="selectedPage = 'standup'")
                  <svg class="inline-flex" width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.05867 0.28427C5.45688 -0.0947137 6.10282 -0.0947783 6.50117 0.284206C6.89945 0.663254 6.89952 1.27777 6.50117 1.65682L3.48235 4.52951H15.98C16.5433 4.52951 17 4.96408 17 5.50011C17 6.03613 16.5433 6.4707 15.98 6.4707H3.48248L6.50117 9.34313C6.89952 9.72218 6.89952 10.3367 6.50117 10.7157C6.302 10.9053 6.04094 11 5.77989 11C5.51883 11 5.25778 10.9053 5.05867 10.7157L0.29876 6.18644C-0.0995883 5.80746 -0.0995883 5.19288 0.29876 4.81383L5.05867 0.28427Z" fill="#345BA9"/>
                  </svg>
                  span.pl-2 Back

              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Standup created! All set for the meeting.
              p.text-subhead.leading-tight.mb-6 Check the #[a(class="text-blue-700 font-bold" href="https://docs.aeries.works/display/CD/Design+sprints") sprint documentation for today's doc!]


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
        responses: 0
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
createStandup() {
  if (this.responses !== 0) {
    var thisScope = this;
    axios.post('/api/create-daily-standup-doc')
            .then(function (response) {
                console.log(response);
                thisScope.selectedPage = "congratulations";
            })
            .catch(function (error) {
                alert("Dang it, something went wrong. Failed to create sprint. " + error)
                console.log(error);
            });
    } else {
      alert('You need at least 1 response before creating the doc! Did the standup form go out to the team today?')
    }
  }
},
computed: {
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

      var thisScope = this;
      axios.get('/rest/design-sprint-standups?date=' + this.today + '&year=' + this.year)
      .then(function (response) {
        console.log(response);
        thisScope.responses = response.data.data.length;
      })
      .catch(function (error) {
        console.log(error);
      });

    //WHO AM I
    var me = this.getCookie('me');

    if (me) {
        this.currentUser = me;
    }
},

}
</script>
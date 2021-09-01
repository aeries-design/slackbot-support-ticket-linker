<style scoped>
.sidebar, .sidebar > div {
    min-height: 100vh;
}
main > .flex {
  min-height: 100vh; 
}

.sidebar > div {
    height: 100%;
}
</style>

<style>
.content_container {
  margin-left: 243px;
}
</style>

<template lang="pug">
.sidebar(class="h-full fixed z-40")
  .flex(class='overflow-auto align-top flex-col w-full text-white bg-neutral-1900 flex-shrink-0')
    div(class="flex-shrink-0 px-12 py-3 flex flex-row justify-between")
      a(class="text-title font-bold font-aeries text-white")
        | Aeriesworks
      button.rounded-lg.rounded-lg(class='md:hidden focus:outline-none focus:shadow-outline')
    nav.flex-grow.px-4.pb-4
      a.label.home.border-b.border-t.border-neutral-1800.block.py-3.text-sm.font-semibold.text-minimum-text.text-neutral-700.bg-transparent(class='hover:text-white focus:bg-neutral-1700 focus:outline-none focus:shadow-outline' :class="{'text-white font-bold' : selectedSidebarPage == '/projects/home'}" href='/projects/home') Home
      
      //- Sessions
      .label.sessions(class="flex justify-between py-4 opacity-75 hover:opacity-100 cursor-pointer" @click="expanded.okrs = !expanded.okrs")
        h2(class="text-minimum-text w-2/3") 
          .icon.icon-collapsed(v-if="!expanded.okrs" class="inline pr-2 relative opacity-50" style="bottom: 1.5px;")
            <svg class="inline" width="12" height="12" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.4918 15.5054L14.6756 13.2764C15.2551 12.685 15.2614 11.7407 14.69 11.1415L9.39252 5.58627L4.51268 0.70643C4.17527 0.369017 3.62821 0.369015 3.2908 0.706428L1.13868 2.85855C0.801267 3.19596 0.801267 3.74302 1.13868 4.08043L9.15373 12.0955L1.32967 19.9196C0.992254 20.257 0.992254 20.804 1.32967 21.1414L3.48179 23.2936C3.8192 23.631 4.36626 23.631 4.70367 23.2936L12.4918 15.5054Z" fill="white"/>
            </svg>
          .icon.icon-expanded(v-if="expanded.okrs" class="inline pr-2 relative opacity-50" style="bottom: 1.5px;")
            <svg class="inline" width="12" height="12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.04121 12.4918L10.2702 14.6756C10.8616 15.255 11.8059 15.2614 12.4051 14.69L17.9603 9.39249L22.8402 4.51265C23.1776 4.17524 23.1776 3.62818 22.8402 3.29077L20.6881 1.13865C20.3507 0.801236 19.8036 0.801236 19.4662 1.13865L11.4511 9.1537L3.62706 1.32964C3.28965 0.992222 2.7426 0.992222 2.40518 1.32964L0.253061 3.48176C-0.0843518 3.81917 -0.0843518 4.36622 0.253061 4.70364L8.04121 12.4918Z" fill="white"/>
            </svg>
          span OKRs
        a(class="text-minimum-text text-neutral-1100 w-1/3" href="/projects/sessions") All sessions
      .okrs(v-if="expanded.okrs")
        a(v-for="session in okrs.sessions" class='block px-4 py-1 text-sm font-semibold text-minimum-text text-neutral-1000 bg-transparent hover:text-white focus:bg-neutral-1700 focus:outline-none focus:shadow-outline' :href='"/projects/goals/" + session._id') 
          .color(:style="{backgroundColor: session.color}").w-3.h-3.rounded-full.inline-block
          span.pl-2 {{session.title}}
        
      //- //- Tasks
      //- .label.tasks(class="flex opacity-75 hover:opacity-100 cursor-pointer py-4 mt-2" @click="expanded.tasks = !expanded.tasks")
      //-   h2(class="text-minimum-text")
      //-     .icon.icon-collapsed(v-if="!expanded.tasks" class="inline pr-2 relative opacity-50" style="bottom: 1.5px;")
      //-       <svg class="inline" width="12" height="12" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      //-       <path d="M12.4918 15.5054L14.6756 13.2764C15.2551 12.685 15.2614 11.7407 14.69 11.1415L9.39252 5.58627L4.51268 0.70643C4.17527 0.369017 3.62821 0.369015 3.2908 0.706428L1.13868 2.85855C0.801267 3.19596 0.801267 3.74302 1.13868 4.08043L9.15373 12.0955L1.32967 19.9196C0.992254 20.257 0.992254 20.804 1.32967 21.1414L3.48179 23.2936C3.8192 23.631 4.36626 23.631 4.70367 23.2936L12.4918 15.5054Z" fill="white"/>
      //-       </svg>
      //-     .icon.icon-expanded(v-if="expanded.tasks" class="inline pr-2 relative opacity-50" style="bottom: 1.5px;")
      //-       <svg class="inline" width="12" height="12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      //-       <path d="M8.04121 12.4918L10.2702 14.6756C10.8616 15.255 11.8059 15.2614 12.4051 14.69L17.9603 9.39249L22.8402 4.51265C23.1776 4.17524 23.1776 3.62818 22.8402 3.29077L20.6881 1.13865C20.3507 0.801236 19.8036 0.801236 19.4662 1.13865L11.4511 9.1537L3.62706 1.32964C3.28965 0.992222 2.7426 0.992222 2.40518 1.32964L0.253061 3.48176C-0.0843518 3.81917 -0.0843518 4.36622 0.253061 4.70364L8.04121 12.4918Z" fill="white"/>
      //-       </svg>
      //-     span Tasks
      //- .tasks(v-if="expanded.tasks")
      //-   a.border-b.border-neutral-1800.block.px-4.py-3.text-sm.font-semibold.text-minimum-text.text-neutral-1000.bg-transparent(class='hover:text-white focus:bg-neutral-1700 focus:outline-none focus:shadow-outline' href='/projects/tasks') My Tasks
      //- //- a.border-b.border-neutral-1800.block.px-4.py-3.text-sm.font-semibold.text-minimum-text.text-neutral-1100.bg-transparent.cursor-not-allowed + Add filter
      
      //- People
      .label.people(class="flex opacity-75 hover:opacity-100 cursor-pointer py-4 mt-2" @click="expanded.people = !expanded.people")
        h2(class="text-minimum-text") 
          .icon.icon-collapsed(v-if="!expanded.people" class="inline pr-2 relative opacity-50" style="bottom: 1.5px;")
            <svg class="inline" width="12" height="12" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.4918 15.5054L14.6756 13.2764C15.2551 12.685 15.2614 11.7407 14.69 11.1415L9.39252 5.58627L4.51268 0.70643C4.17527 0.369017 3.62821 0.369015 3.2908 0.706428L1.13868 2.85855C0.801267 3.19596 0.801267 3.74302 1.13868 4.08043L9.15373 12.0955L1.32967 19.9196C0.992254 20.257 0.992254 20.804 1.32967 21.1414L3.48179 23.2936C3.8192 23.631 4.36626 23.631 4.70367 23.2936L12.4918 15.5054Z" fill="white"/>
            </svg>
          .icon.icon-expanded(v-if="expanded.people" class="inline pr-2 relative opacity-50" style="bottom: 1.5px;")
            <svg class="inline" width="12" height="12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.04121 12.4918L10.2702 14.6756C10.8616 15.255 11.8059 15.2614 12.4051 14.69L17.9603 9.39249L22.8402 4.51265C23.1776 4.17524 23.1776 3.62818 22.8402 3.29077L20.6881 1.13865C20.3507 0.801236 19.8036 0.801236 19.4662 1.13865L11.4511 9.1537L3.62706 1.32964C3.28965 0.992222 2.7426 0.992222 2.40518 1.32964L0.253061 3.48176C-0.0843518 3.81917 -0.0843518 4.36622 0.253061 4.70364L8.04121 12.4918Z" fill="white"/>
            </svg>
          span People
          
      .people(v-if="expanded.people")
        a(:class="{'text-white font-bold' : selectedSidebarPage == '/projects/employees'}" href='/projects/employees' class='hover:text-white focus:bg-neutral-1700 focus:outline-none focus:shadow-outline border-b border-neutral-1800 block px-4 py-3 text-sm font-semibold text-minimum-text text-neutral-1000 bg-transparent') 
          span Employees
        a(:class="{'text-white font-bold' : selectedSidebarPage == '/projects/teams'}" href='/projects/teams' class='hover:text-white focus:bg-neutral-1700 focus:outline-none focus:shadow-outline border-b border-neutral-1800 block px-4 py-3 text-sm font-semibold text-minimum-text text-neutral-1000 bg-transparent') 
          span Teams
      
      //- Virtual Office
      .label.flex.flex-col.my-4
        .block.justify-between.flex
          a.text-minimum-text(href="/virtual-office") Virtual Office
          a.text-minimum-text.text-neutral-1100(href="/virtual-office") All rooms
        
        .block
          p(v-if="virtualOfficeOnlineNow.length == 0").text-minimum-text.text-neutral-1400.mt-4.italic Nobody in any office rooms right now. 
          p.text-neutral-1100.text-minimum-text
            a(href="/virtual-office") Join one!
          div(v-for="participant in virtualOfficeOnlineNow" @click="joinRoom(participant)" class="cursor-pointer hover:bg-neutral-1700")
            div
              img(:src="participant.image" :title="participant.name" class="participant-image xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2 my-2 inline-block")
              span.pl-2.font-bold {{participant.name}}
            div
              span(class="pl-10 text-minimum-text text-neutral-1000 relative" style="bottom: 12px;") 
                span #
                span {{participant.room}}
      
</template>

<script>
const axios = require('axios');
module.exports = {
  data() {
    return {
      okrs: {sessions: []},
      virtualOfficePresence: [],
      expanded: {
        okrs : true,
        tasks: false,
        people: false,
        virtual_office: false
      }
    }
  },
methods : {
refreshPresenceData() {
  //For passing to our function
  var globalScope = this;

  //Slack
  axios
  .get('/rest/virtual-office-presence?$limit=9999')
  .then(function(response) {
    globalScope.virtualOfficePresence = response.data.data;
  })

},
timestampIsNotExpired(timestamp) {
  var tenSecondsAfterTimestamp = timestamp + 10000; // Add 10 seconds
  var rightNow = new Date().getTime();

  // console.log(tenSecondsAfterTimestamp)
  // console.log(rightNow)

  if (rightNow > tenSecondsAfterTimestamp) {
    return false
  } else {
    return true
  }
},
joinRoom(participant) {
  if ($('.' + participant.room).length) {
    $('.' + participant.room).click();
  }
},
},
async mounted () {

    //   setInterval(() => {
    //   this.refreshPresenceData()
    // }, 1000);

  var globalScope = this;
      //OKR sessions
      axios
      .get('/rest/okrs?type=session&$limit=9999')
      .then(function(response) {
        globalScope.okrs.sessions = response.data.data;
      })

      //Virtual office presence
     axios
      .get('/rest/virtual-office-presence?$limit=9999&$sort[timestamp]=-1')
      .then(function(response) {
        globalScope.virtualOfficePresence = response.data.data;
      })
},
computed: {
  virtualOfficeOnlineNow() {
    var output = [];
    for (var i = 0; i < this.virtualOfficePresence.length; i++) {
      if (this.timestampIsNotExpired(this.virtualOfficePresence[i].timestamp)) {
        output.push(this.virtualOfficePresence[i])
      }
    }
    return output;
  },
  selectedSidebarPage() {
    return window.location.pathname;
  }
},
}
</script>
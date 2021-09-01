<style scoped>
main {
  min-height: 100vh;
}

#sessions {
  min-height: 400px;
}
</style>

<style>
#sessions .gantt_layout_root {
    height: calc(100vh - 60px) !important;
}

#sessions .gantt_tree_icon.gantt_file {
    display: none;
}

#sessions .gantt_container {
background-color: transparent;
}

#sessions .gantt_task_content {
    display: none;
}

#sessions .gantt_tree_content {
    font-size: 20px;
    font-weight: bold;
    font-family: 'Aeries Sans';
}

#sessions .gantt_grid_scale .gantt_grid_head_cell {
  border: none;
}

#sessions .gantt_layout_cell_border_top,
#sessions .gantt_layout_cell_border_bottom {
border:none;
}

#sessions .gantt_task_line {
    border-radius: 100px;
    border: none;
}

#sessions .gantt_marker.today {
    background-color: rgb(12 30 65 / 0.1);
    width: 6px;
}

#sessions .gantt_tree_icon.gantt_folder_closed, 
#sessions .gantt_tree_icon.gantt_folder_open {
    display: none;
}

#sessions .gantt_tree_icon.gantt_close, 
#sessions .gantt_tree_icon.gantt_open {
    margin-right: 2px;
}

#sessions .gantt_grid_head_cell {
    text-align: left;
    padding-left: 22px;
}
</style>

<template lang="pug">
main
  projects-modal(
  v-bind:modal="modal" 
  v-bind:okrs="okrs" 
  v-bind:editSessionID="editSessionID"
  v-on:refreshOKRData="refreshOKRSessions()" 
  v-on:updateModalState="updateModalState($event)"
  )
  .flex.w-full
    
    .flex(class="w-96")
      .flex-col.w-full
        sidebar-projects
    
    .flex-col(class="w-full bg-neutral-300 content_container")
      header(class="border-b border-neutral-500 bg-white text-neutral-1900 py-3 flex justify-between items-center")
        div(class="px-2 md:px-8")
          strong(class="font-aeries text-title tracking-tight mr-6")
              span All Sessions
          div.mt-4.inline-block

        div(class="md:px-8")
          span(class="tracking-tight mr-4 text-white font-bold")
              a(class="p-2 px-8 bg-blue-700 rounded-full" href="#" @click="showModal('sessionAdd', true)") +  Create a session

      div
        div
          #sessions
        //- section.content(v-if="currentPage == 'home'" class="w-full mt-14")
        //-   div(class="md:px-8")
        //-     section
        //-         div(class="flex mt-8")
        //-     section
        //-       table(class="w-full table-fixed")
        //-         thead
        //-           tr.border-b-8.border-neutral-600
        //-             th.font-aeries.text-title.pr-8.pb-2.text-left Session
        //-             th.font-aeries.text-title.px-8.pb-2.text-left Status
        //-             th.font-aeries.text-title.px-8.pb-2.text-left Timeframe
        //-             th.font-aeries.text-title.px-8.pb-2.text-left Progress
        //-             th.font-aeries.text-title.px-8.pb-2.text-center Description
        //-         tbody
        //-           tr(v-if="okrs" v-for="session in okrs.sessions" class="border-b border-neutral-500")
        //-             td(class="py-4 text-left pr-8")
        //-               .title.font-semi-bold.text-subhead.text-blue-600.pb-2 
        //-                 .color(:style="{backgroundColor: session.color}").w-3.h-3.rounded-full.inline-block
        //-                 span.pl-2 {{session.title}}
        //-               .owner.text-neutral-1000 {{session.owner}}
        //-             td.px-8.py-4.text-left {{session.status}}
        //-             td.px-8.py-4.text-left {{session.timeframe.start}} - {{session.timeframe.end}} 
        //-             td.px-8.py-4.text-left -
        //-             td(v-if="session.description").px-8.py-4.text-center.text-minimum-text.text-neutral-1200 {{session.description | truncate(210, '...')}}

        
</template>

<script>
const axios = require('axios');

import Chart from '../javascripts/d3-org-chart.js'
import gantt from '../javascripts/dhtmlxgantt.js'

module.exports = {
data() {
    return {
        currentPage: "home",
        currentUser : "",
        currentUserID: "",
        orgChart: [],
        modal : {show: false},
        editSessionID: false,
        okrs: {
          "sessions" : [],
          "objectives" : [],
          "key_results" : [],
          "tasks" : []
        },
        slackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
        taskClickTracker: 0, //Used to implement double-click-to-open functionality on the gantt chat
        tasks: {
            "data": [{
                "id": 1,
                "text": "Project #1",
                "start_date": "01-04-2018",
                "duration": "11",
                "progress": 0.6,
                "open": true,
                "users": ["John", "Mike", "Anna"],
                "priority": "2"
            },
            {
                "id": 2,
                "text": "Task #1",
                "start_date": "03-04-2018",
                "duration": "5",
                "parent": "1",
                "progress": 1,
                "open": true,
                "users": ["John", "Mike"],
                "priority": "1"
            },
            {
                "id": 3,
                "text": "Task #2",
                "start_date": "02-04-2018",
                "duration": "7",
                "parent": "1",
                "progress": 0.5,
                "open": true,
                "users": ["Anna"],
                "priority": "1"
            },
            {
                "id": 4,
                "text": "Task #3",
                "start_date": "02-04-2018",
                "duration": "6",
                "parent": "1",
                "progress": 0.8,
                "open": true,
                "users": ["Mike", "Anna"],
                "priority": "2"
            },
            {
                "id": 5,
                "text": "Task #4",
                "start_date": "02-04-2018",
                "duration": "5",
                "parent": "1",
                "progress": 0.2,
                "open": true,
                "users": ["John"],
                "priority": "3"
            },
            {
                "id": 6,
                "text": "Task #5",
                "start_date": "02-04-2018",
                "duration": "7",
                "parent": "1",
                "progress": 0,
                "open": true,
                "users": ["John"],
                "priority": "2"
            },
            {
                "id": 7,
                "text": "Task #2.1",
                "start_date": "03-04-2018",
                "duration": "2",
                "parent": "3",
                "progress": 1,
                "open": true,
                "users": ["Mike", "Anna"],
                "priority": "2"
            },
            {
                "id": 8,
                "text": "Task #2.2",
                "start_date": "06-04-2018",
                "duration": "3",
                "parent": "3",
                "progress": 0.8,
                "open": true,
                "users": ["Anna"],
                "priority": "3"
            },
            {
                "id": 9,
                "text": "Task #2.3",
                "start_date": "10-04-2018",
                "duration": "4",
                "parent": "3",
                "progress": 0.2,
                "open": true,
                "users": ["Mike", "Anna"],
                "priority": "1"
            },
            {
                "id": 10,
                "text": "Task #2.4",
                "start_date": "10-04-2018",
                "duration": "4",
                "parent": "3",
                "progress": 0,
                "open": true,
                "users": ["John", "Mike"],
                "priority": "1"
            },
            {
                "id": 11,
                "text": "Task #4.1",
                "start_date": "03-04-2018",
                "duration": "4",
                "parent": "5",
                "progress": 0.5,
                "open": true,
                "users": ["John", "Anna"],
                "priority": "3"
            },
            {
                "id": 12,
                "text": "Task #4.2",
                "start_date": "03-04-2018",
                "duration": "4",
                "parent": "5",
                "progress": 0.1,
                "open": true,
                "users": ["John"],
                "priority": "3"
            },
            {
                "id": 13,
                "text": "Task #4.3",
                "start_date": "03-04-2018",
                "duration": "5",
                "parent": "5",
                "progress": 0,
                "open": true,
                "users": ["Anna"],
                "priority": "3"
            }]
        },
    }
  },
  computed: {
    sessionsAsGanttObjects() {
      var output = {"tasks":[]};
      for (var i = 0; i < this.okrs.sessions.length; i++) {
        var sesh = this.okrs.sessions[i];
        output.tasks.push({
          text: sesh.title,
          start_date: parseInt(sesh.timeframe.start),
          end_date: parseInt(sesh.timeframe.end),
          color: sesh.color,
          id: sesh._id,
          parent: sesh.parent_session
        })
      }
      return output;
    },  
    objectivesWithKeyResults() {
      var objectives = this.okrs.objectives;
      var keyResults = this.okrs.key_results;
      for (var i = 0; i < objectives.length; i++) {
        for (var ii = 0; ii < keyResults.length; ii++) {
          if (objectives[i]._id == keyResults[ii].linked_to_objective_id) {
            if (objectives[i].hasOwnProperty('key_results')) {
              objectives[i].key_results.push(keyResults[ii])
            } else {
              objectives[i].key_results = [keyResults[ii]];
            }
          }
        }
      }
      return objectives;
    },
    allTasks() {
      var output = [];
      
      
      //Confluence tasks
      for (var i = 0; i < this.myConfluenceTasks.length; i++) {
        var thisTask = this.myConfluenceTasks[i]
        console.log(this.myConfluenceTasks[i])
        thisTask.type = "Confluence Task";
        output.push(thisTask)
      }

      //Jira tasks
      for (var i = 0; i < this.myJiraTasks.length; i++) {
        var thisTask = {
          title : this.myJiraTasks[i].fields.summary,
          assignee: this.myJiraTasks[i].fields.assignee.key,
          due: this.myJiraTasks[i].fields.duedate
        } 
        thisTask.type = "Jira Task";
        output.push(thisTask)
      }

      //Aeriesworks tasks
      for (var i = 0; i < this.okrs.tasks.length; i++) {
        var thisTask = this.okrs.tasks[i]
        console.log(this.okrs.tasks[i])
        thisTask.type = "Aeriesworks Task";
        output.push(thisTask)
      }

      

      return output;
    },
    mySlackObject() {
      var object = {};
      for (var i = 0; i < this.slackUsers.length; i++) {
        if (this.slackUsers[i].id == this.currentUserID) {
          object = this.slackUsers[i];
        }
      }
      return object;
    }
},
filters: {
        truncate: function (text, length, suffix) {
          if (text.length > length) {
            return text.substring(0, length) + suffix;
          } else {
            return text;
          }
        },
  },
methods : {
getSlackUserByID(slackUserID) {
  for (var i = 0; i < this.slackUsers.length; i++) {
    if (this.slackUsers[i].id == slackUserID) {
      return this.slackUsers[i];
    }
  }
},
  updateModalState(newModalObj) {
    this.modal = newModalObj;    
  },
  showModal(type, show) {
    this.modal.type = type;
    this.modal.show = show;
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
},
refreshOKRSessions() {
  var globalScope = this;
//OKR sessions
      axios
      .get('/rest/okrs?type=session&$limit=9999')
      .then(function(response) {
        globalScope.okrs.sessions = response.data.data;
        
        //Init Gantt when we have sessions
      gantt.plugins({ 
        marker: true 
      });

      var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
      var markerId = gantt.addMarker({
          start_date: new Date(), //a Date object that sets the marker's date
          css: "today", //a CSS class applied to the marker
          text: "", //the marker title
          title: dateToStr( new Date()) // the marker's tooltip
      });
      
      
      gantt.templates.xml_date = gantt.templates.parse_date = function(rawDate){
          return new Date(rawDate * 1000);// UNIX timestamps
      };

      gantt.templates.xml_format = gantt.templates.format_date = function(date){
          // format to UNIX timestamps before sending the update to the server
          return Math.floor(date.valueOf() / 1000);
      };
      
      gantt.config.scales = [
          {unit: "month", step: 1, format: "%F, %Y"},
      ];

      gantt.attachEvent("onTaskClick", function(id,e){
          //any custom logic here
          window.location.href = "/projects/goals/" + id;
          // globalScope.taskClickTracker += 1;

          // if (globalScope.taskClickTracker == 2) {
          //   globalScope.editSessionID = id;
          //   globalScope.showModal('sessionAdd', true)
          //   globalScope.taskClickTracker = 0;
          // }



          return true;
      });

      gantt.config.open_tree_initially = true;
      gantt.config.row_height = 64;
      gantt.config.task_height = 20;
      gantt.config.fit_tasks = true; 
      gantt.config.readonly = true;
      gantt.config.show_progress = false;
      gantt.config.columns = [
          {name:"text",       label:"Session",  width:"*", tree:true }
      ];
      gantt.init("sessions");
      
      gantt.parse(globalScope.sessionsAsGanttObjects)


      })
},
refreshOKRData() {
  var globalScope = this;
        //OKR sessions
      axios
      .get('/rest/okrs?type=session&$limit=9999')
      .then(function(response) {
        globalScope.okrs.sessions = response.data.data;
      })

      //OKR objectives
      axios
      .get('/rest/okrs?type=objective&$limit=9999')
      .then(function(response) {
        globalScope.okrs.objectives = response.data.data;
      })

      //OKR key results
      axios
      .get('/rest/okrs?type=key_result&$limit=9999')
      .then(function(response) {
        globalScope.okrs.key_results = response.data.data;
      })

      //OKR tasks
      axios
      .get('/rest/okrs?type=Aeriesworks%20Task&$limit=9999')
      .then(function(response) {
        globalScope.okrs.tasks = response.data.data;
      })
}

},
async mounted () {

      //For passing to our function
      var globalScope = this;

  

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.slackUsers = response.data.data;
      })

      this.refreshOKRSessions()

      //OKR objectives
      axios
      .get('/rest/okrs?type=objective&$limit=9999')
      .then(function(response) {
        globalScope.okrs.objectives = response.data.data;
      })

      //OKR key results
      axios
      .get('/rest/okrs?type=key_result&$limit=9999')
      .then(function(response) {
        globalScope.okrs.key_results = response.data.data;
      })

      //OKR tasks
      axios
      .get('/rest/okrs?type=Aeriesworks%20Task&$limit=9999')
      .then(function(response) {
        globalScope.okrs.tasks = response.data.data;
      })


    var me = this.getCookie('me');
    var meid = this.getCookie('meid');
    
    if (me) {
        this.currentUser = me;
    }

    if (meid) {
      this.currentUserID = meid;
    }


},

}
</script>
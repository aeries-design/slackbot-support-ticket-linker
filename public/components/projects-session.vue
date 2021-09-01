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
    ref="projectsModal"
    v-bind:modal="modal" 
    v-bind:okrs="okrs"
    v-bind:teams="teams"
    v-bind:selectedObjective="selectedObjective"
    v-bind:lastSelectedObjective="lastSelectedObjective"
    v-bind:selectedTask="selectedTask"
    v-bind:lastSelectedTask="lastSelectedTask"
    v-bind:selectedKeyResult="selectedKeyResult"
    v-bind:selectedKeyResultUpdates="selectedKeyResultUpdates"
    v-bind:autoCompleteSlackUsers="autoCompleteSlackUsers"
    v-bind:mySlackObject="mySlackObject"
    
    v-bind:currentUser="{'id' : currentUserID, 'name' : currentUser}"

    v-on:selectObjective="selectObjective(objective)"
    v-on:updateSelectedKeyResult="updateSelectedKeyResult(kr)"
    v-on:selectElement="selectElement(newElement, $event)"
    v-on:refreshOKRData="refreshOKRData()"
    v-on:clearModalTaskData="clearModalTaskData()"
    v-on:updateModalState="updateModalState($event)"
    v-on:selectKeyResultGiveAnUpdate="selectKeyResultGiveAnUpdate($event, keyResultID)"
    )

  .krDropdown(v-show="krDropdown.show" class="absolute text-blue-600 text-left bg-white shadow-lg w-48")
    div(class="hover:bg-neutral-400 p-3 font-bold" @click="viewKeyResult()") View KR details
    div(class="hover:bg-neutral-400 p-3 font-bold" @click="$refs.projectsModal.backToObjectiveRef = {}; selectKeyResultGiveAnUpdate()") Give an update
    hr(class="border-neutral-400")
    div(class="hover:bg-neutral-400 p-3 font-bold" @click="addNewKeyResultFromKRDropdown()") + Add new KR

  .flex.w-full
      .flex(class="w-96")
        .flex-col.w-full
          sidebar-projects
      .flex-col(class="w-full bg-neutral-300 content_container")
        header(v-if="currentSession" class="border-b border-neutral-500 bg-white text-neutral-1900 py-3 flex justify-between items-center")
          div(class="px-2 md:px-8")
            strong(class="font-aeries text-title tracking-tight mr-6")
                a {{currentSession.title}}
            div.mt-4.inline-block
              strong(class="text-subhead tracking-tight mr-6 py-4 border-b-4 border-blue-600")
                  a(:href='"/projects/goals/"+currentSession._id') Objectives
              strong(class="text-subhead tracking-tight pr-4 py-4")
                  a(:href='"/projects/goals/"+currentSession._id+"/alignment"') Alignment
          div(class="px-2 md:px-8")
            span(@click="$refs.projectsModal.modalObjectiveObject.session_id = currentSession._id; $refs.projectsModal.showObjectiveSessionInput = true; showModal('objectiveAdd', true)" class="cursor-pointer tracking-tight bg-blue-700 p-2 px-6 rounded-full mr-4 text-white font-bold")
                a +  Create OKR

            
            nav.nav
                //- span.nav__link.border-r.border-neutral-1200
        //- header(class="border-b border-neutral-500 bg-white text-neutral-1900 py-4")
        //-   div(class="p-2 md:px-8")
        //-     span(class="tracking-tight bg-neutral-400 p-2 px-6 rounded-full mr-4 text-neutral-1200")
        //-         a(href="#") Filter  +
        //-     span(class="tracking-tight bg-neutral-400 p-2 px-6 rounded-full mr-4 text-neutral-1200")
        //-         a(href="#") Settings & Actions
            
            nav.nav
                //- span.nav__link.border-r.border-neutral-1200

        div
          section.content(v-if="selectedPage == 'home'" class="w-full mt-2")
            div(class="md:px-8")
              section
                table(class="w-full table-fixed")
                  thead
                    tr(class="border-b-4 border-neutral-600")
                      th(class="font-aeries text-subhead p- pl-04 text-left w-3/12") Objective & owner
                      th(class="font-aeries text-subhead p-4 text-left w-1/12") Contains
                      th(class="font-aeries text-subhead p-4 text-left w-4/12") Key results
                      //- th(class="font-aeries text-subhead p-4 text-left w-1/12") Progress
                      th(class="font-aeries text-subhead p-4 text-left w-4/12") Description
                  tbody(v-if="currentSession")
                    tr(v-for="objective in currentSession.childObjectives" class="border-b border-neutral-500")
                      td(class="p-4 text-left pr-8")
                        .title(v-if="objective.title" class="font-semi-bold text-subhead text-blue-600 pb-4 cursor-pointer flex" @click="selectObjective(objective)") 
                          .icon(class="w-1/12 mr-3")
                            img(class="inline" src='/images/goal.svg')
                          .okr-title(class="w-11/12")
                            span {{objective.title}}
                        .owner(class="text-neutral-1000") 
                          .avatar(v-if="getSlackUserByID(objective.owner)" class="inline")
                            img(:src="getSlackUserByID(objective.owner).profile.image_192" :title="getSlackUserByID(objective.owner).real_name" class="participant-image inline mr-2 xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
                            span(class="pt-2") {{getSlackUserByID(objective.owner).real_name}}
                      td(class="p-4 text-left") 
                        
                        div
                          img(class="inline w-4 pr-1" v-if="objective.key_results && objective.key_results.length > 0" src='/images/metric.svg')
                          span(class="text-minimum-text pb-2" v-if="objective.key_results && objective.key_results.length > 0") {{objective.key_results.length}} 
                            span key result
                            span(v-if="objective.key_results.length > 1") s

                        div
                          img(class="inline w-4 pr-1" v-if="objective.tasks && objective.tasks.length > 0" src='/images/task.svg')
                          span(class="text-minimum-text pb-2" v-if="objective.tasks && objective.tasks.length > 0") {{objective.tasks.length}} task
                            span(v-if="objective.tasks.length > 1") s
                        div
                          img(class="inline w-4 pr-1" v-if="objective.childObjectives && objective.childObjectives.length > 0" src='/images/links.svg')
                          span(class="text-minimum-text pb-2" v-if="objective.tasks && objective.childObjectives.length > 0") {{objective.childObjectives.length}} 
                            span(v-if="objective.childObjectives.length == 1") child
                            span(v-if="objective.childObjectives.length > 1") children
                      
                      td(class="p-4 text-left")
                        .keyResults
                          .keyResult(v-for="kr, index in objective.key_results" v-if="kr.deleted !== true" class="mb-2")
                            .title(v-if="kr" class="keyResult font-semi-bold text-blue-600 cursor-pointer inline-block" @click="showKRDropdownBox(kr, $event)")
                              .avatar(class="keyResult inline" v-for="owner in getSlackUserByID(kr.owner, true)" :title="owner.real_name")
                                img(:src="owner.profile.image_192" class="participant-image keyResult inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2")
                              span(class="title keyResult pl-2") {{kr.title | truncate(59, '...')}}
                              p(class="text-neutral-800 text-minimum-text pl-8") Should 
                                span(v-if="kr.kr_type == 'should_increase_to'") increase to 
                                span(v-if="kr.kr_type == 'should_decrease_to'") decrease to 
                                span(v-if="kr.kr_type == 'should_stay_above'") stay above 
                                span(v-if="kr.kr_type == 'should_stay_below'") stay below 
                                span(v-if="kr.kr_type == 'achieved_or_not'") increase to 100%
                                span(v-if="kr.unit == '$'") $
                                span(v-if="kr.kr_type !== 'achieved_or_not'") {{kr.target_number}}
                                span(v-if="kr.unit == '%'") %
                                span(v-if="kr.kr_type !== 'achieved_or_not'") , currently 
                                span(v-if="kr.kr_type == 'achieved_or_not'")
                                  span(v-if="kr.keyResultUpdates && kr.keyResultUpdates.length && kr.keyResultUpdates[0].new_number") , currently {{kr.keyResultUpdates[0].new_number}}%
                                  span(v-else) , currently 0%
                                span(v-else-if="kr.keyResultUpdates && kr.keyResultUpdates.length && kr.keyResultUpdates[0].new_number") {{kr.keyResultUpdates[0].new_number}}
                                span(v-if="kr.keyResultUpdates && kr.keyResultUpdates.length == 0 && kr.kr_type !== 'achieved_or_not'")
                                  span(v-if="kr.unit == '$'") $
                                  span {{kr.initial_number}}
                                  span(v-if="kr.unit == '%'") % 
                      td(class="p-4 text-left")
                        span(v-if="objective.description") {{objective.description | truncate(230, '...')}}
                        span(v-else) -
     
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        selectedPage: "home",
        currentUser : "",
        currentUserID: "",
        selectedObjective: {},
        selectedKeyResult: {},
        selectedKeyResultUpdates: {},
        showAddDropdownBox: false,
        krUpdates: [],
        teams: [],
        krDropdown: {
          show: false,
          krID: "",
        },
        selectedTask: {},
        lastSelectedTask: {},
        okrs: {
          "sessions" : [],
          "objectives" : [],
          "key_results" : [],
          "tasks" : []
        },
        modal : {show: false},
        d3RootElement:   {
    nodeId: "O-0",
    parentNodeId: null,
    width: 342,
    height: 146,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: {
      red: 15,
      green: 140,
      blue: 121,
      alpha: 1
    },
    backgroundColor: {
      red: 51,
      green: 182,
      blue: 208,
      alpha: 1
    },
    nodeImage: {
      url:
        "https://avatars.slack-edge.com/2020-09-05/1342690971669_b60fbdac10bb468a8ec7_192.png",
      width: 100,
      height: 100,
      centerTopDistance: 0,
      centerLeftDistance: 0,
      cornerShape: "CIRCLE",
      shadow: false,
      borderWidth: 0,
      borderColor: {
        red: 19,
        green: 123,
        blue: 128,
        alpha: 1
      }
    },
    nodeIcon: {
      icon: "https://to.ly/1yZnX",
      size: 30
    },
    template:
      '<div>\n                  <div style="margin-left:70px;\n                              margin-top:10px;\n                              font-size:20px;\n                              font-weight:bold;\n                         ">Aeries Software </div>\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:16px;\n                         ">Student Information Systems  </div>\n\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:14px;\n                         "></div>\n\n                 <div style="margin-left:196px;\n                             margin-top:15px;\n                             font-size:13px;\n                             position:absolute;\n                             bottom:5px;\n">             </div>',
    connectorLineColor: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0.1
    },
    connectorLineWidth: 5,
    dashArray: "",
    expanded: false
  },
        allSlackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
    }
  },
  computed: {
    currentSession() {
      var currentSessionID = this.$attrs.params.id;
      for (var i = 0; i < this.okrs.sessions.length; i++) {
        if (this.okrs.sessions[i]._id == currentSessionID) {
          return this.okrs.sessions[i]
        }
      }
    },
    myTeams() {
      var output = [];
      for (var i = 0; i < this.teams.length; i++) {
        for (var ii = 0; ii < this.teams[i].members.length; ii++) {
          if (this.teams[i].members[ii].user_id == this.currentUserID) {
            output.push(this.teams[i])
          }
        }
      }
      return output;
    },
    myObjectivesAcrossSessions() {
      var sessions = this.okrs.sessions.slice()
      for (var i = 0; i < sessions.length; i++) {
        
        //Initialize the variables we'll use to store objectives belonging to us vs our team(s).
        sessions[i].childObjectivesAssignedToMe = [];
        sessions[i].childObjectivesAssignedToMyTeams = [];

        for (var ii = 0; ii < sessions[i].childObjectives.length; ii++) {
          
          //If objective is assigned to me, add it to the 'assigned to me' list.
          if (sessions[i].childObjectives[ii].owner == this.currentUserID) {
            sessions[i].childObjectivesAssignedToMe.push(sessions[i].childObjectives[ii])
          }

          else if (this.objectiveBelongsToAMemberOfMyTeam(sessions[i].childObjectives[ii])) {
            sessions[i].childObjectivesAssignedToMyTeams.push(sessions[i].childObjectives[ii])
          }          

        }
      }
      return sessions;
    },
    myIncompleteTasks() {

      var output = [];
      
      
      // //Confluence tasks
      // for (var i = 0; i < this.myConfluenceTasks.length; i++) {
      //   var thisTask = this.myConfluenceTasks[i]
      //   console.log(this.myConfluenceTasks[i])
      //   thisTask.type = "Confluence Task";
      //   output.push(thisTask)
      // }

      // //Jira tasks
      // for (var i = 0; i < this.myJiraTasks.length; i++) {
      //   var thisTask = {
      //     title : this.myJiraTasks[i].fields.summary,
      //     assignee: this.myJiraTasks[i].fields.assignee.key,
      //     due: this.myJiraTasks[i].fields.duedate
      //   } 
      //   thisTask.type = "Jira Task";
      //   output.push(thisTask)
      // }

      //Aeriesworks tasks
      //Sorting by date created for this view
      var aeriesworksTasks = [];
      for (var i = 0; i < this.okrs.tasks.length; i++) {
        var thisTask = this.okrs.tasks[i]
        if (thisTask.status !== "Done"
            && thisTask.owner == this.currentUserID
            && thisTask.deleted !== true) {
            thisTask.type = "Aeriesworks Task";
            aeriesworksTasks.push(thisTask)
        }
      }

      aeriesworksTasks = aeriesworksTasks.sort((a, b) => (a.recordCreatedAt > b.recordCreatedAt) ? 1 : -1)

      output = output.concat(aeriesworksTasks);



      return output;
    },
    mySlackObject() {
      var object = {};
      for (var i = 0; i < this.allSlackUsers.length; i++) {
        if (this.allSlackUsers[i].id == this.currentUserID) {
          object = this.allSlackUsers[i];
        }
      }
      return object;
    },
    autoCompleteSlackUsers() {
  var output = [];
  var u = this.allSlackUsers;
  for (var i = 0; i < u.length; i++) {
    if (!u[i].deleted && !u[i].is_restricted && ![u].is_bot) {
      var thisUser = u[i];
      thisUser.label = u[i].real_name
      thisUser.key = u[i].id;
      thisUser.value = u[i].id;
      thisUser.desc = u[i].profile.title
      output.push(thisUser);
    }
  }

  var u = this.teams;
  // console.log('teams', u)
  for (var i = 0; i < u.length; i++) {
    if (!u[i].deleted) {
      var thisTeam = u[i];
      thisTeam.label = u[i].name
      thisTeam.key = u[i]._id;
      thisTeam.value = u[i]._id;
      thisTeam.id = u[i]._id;
      thisTeam.desc = u[i].description
      output.push(thisTeam);
    }
  }
  // console.log('output', output)
  return output;
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
  executeQueryParameterActions() {
    const params = new URLSearchParams(window.location.search);
    var action = params.get('action');
    
    var taskID = params.get('taskID');
    var taskObject = this.fetchDataElementByID('task', taskID);

    var objectiveID = params.get('objectiveID');
    var objectiveObject = this.fetchDataElementByID('objective', objectiveID);

    if (objectiveObject) {
      this.$refs.projectsModal.backToObjectiveRef = objectiveObject;
      this.selectedObjective = objectiveObject;
    }

    // console.log(taskObject)

    if (action == 'viewTask') {
      if (taskObject.deleted !== true) {
        this.lastSelectedTask = Object.assign({}, taskObject); 
        this.selectedTask = taskObject;
        this.showModal('taskView', 'show')
      } else {
        //Task is deleted. Clear the query string and don't show thew modal.
        this.deleteQueryStringParameter();
      }
    }

    if (action == 'viewObjective') {
      this.selectObjective(objectiveObject)
    }

    if (action == 'addTask') {
      if (objectiveID) {
        var objective = this.fetchDataElementByID('objective', objectiveID);
        this.$refs.projectsModal.modalTaskObject.linked_to_objective_id = {value: objective._id, label: objective.title};
        this.$refs.projectsModal.showTaskLinkInput = true;
      }

      this.showModal('taskAdd', 'show')
    }

    if (action == 'updateKeyResult') {
      var keyResultID = params.get('keyResultID');
      this.selectKeyResultGiveAnUpdate(keyResultID)
    }

    if (action == 'viewKeyResult') {
      var keyResultID = params.get('keyResultID');
      this.viewKeyResult(keyResultID)
    }
  },
  objectiveBelongsToAMemberOfMyTeam(objective) {
    if (objective.owner.length == 16) {
      for (var i = 0; i < this.myTeams.length; i++) {
        if (objective.owner == this.myTeams[i]._id) {
          return true;
        }
      }
    } else {
      //Not a team, it's a Slack user or something else
    }
    
  },
  setQueryStringParameter(name, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
},
  deleteQueryStringParameter() {
    window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}`));
  },
selectTask(task) {
  this.lastSelectedTask = Object.assign({}, task);
  this.selectedTask = task;
  this.showModal('taskView', true);
  this.setQueryStringParameter('action', 'viewTask'); 
  this.setQueryStringParameter('taskID', task._id)
},
selectElement(newElement, $event) {
  // console.log($event, newElement)
  if ($event.type == 'key_result') {
    this.selectedKeyResult = $event;
    this.viewKeyResult($event._id);
    
  } else if ($event.type == 'objective') {
    this.selectObjective($event)
  } else if ($event.type == 'Aeriesworks Task') {
    this.selectTask($event);
  }
},
addNewKeyResultFromKRDropdown() {
  this.showModal('keyResultAdd', true); 
  this.setQueryStringParameter('action', 'addKeyResult');
  var kr = this.fetchDataElementByID('key_result', this.krDropdown.krID);
  var krObjective = this.fetchDataElementByID('objective', kr.linked_to_objective_id); 
  // this.selectedObjective = krObjective;
  //Make sure the selected objective shows when we open the "add key results" modal.
  this.$refs.projectsModal.setKRModalObjective(krObjective)

},
showAddTask() {
  this.showModal('taskAdd', true); 
  this.setQueryStringParameter('action', 'addTask'); 
  this.$refs.projectsModal.backToObjectiveRef = {};
},
showAddObjective() {
  this.showModal('objectiveAdd', true); 
  this.setQueryStringParameter('action', 'addObjective');
  this.$refs.projectsModal.backToObjectiveRef = {};
  this.$refs.projectsModal.modalObjectiveObject.selected_owner = {value: this.currentUserID, label: this.currentUser}
},
 viewKeyResult(keyResultID) {
    //If the function was called on a specific key result ID, use that otherwise look for whatever KR was clicked last
    var krID = "";
    if (keyResultID) {
      krID = keyResultID;
    } else {
      krID = this.krDropdown.krID;
    }

    var globalScope = this;
    
      axios
      .get('/rest/kr-updates?$sort[update_created_on]=-1&kr_id=' + krID)
      .then(function(response) {
        globalScope.selectedKeyResultUpdates = response.data.data;
        globalScope.selectedKeyResult = globalScope.fetchDataElementByID('key_result', krID);
        globalScope.showModal('keyResultView', true); 
        globalScope.setQueryStringParameter('action', 'viewKeyResult');
        globalScope.setQueryStringParameter('keyResultID', globalScope.selectedKeyResult._id);
        setTimeout(function() { 
          globalScope.$refs.projectsModal.renderChartFromSelectedKeyResult();
        }, 500);
                
      })


  },
updateSelectedKeyResult(kr) {
  this.selectedKeyResult = kr;
},
selectKeyResultGiveAnUpdate(keyResultID) {

    //If the function was called on a specific key result ID, use that otherwise look for whatever KR was clicked last
    var krID = "";
    if (keyResultID) {
      krID = keyResultID;
    } else if (this.krDropdown.krID) {
      krID = this.krDropdown.krID;
    } else if (this.selectedKeyResult) {
      krID = this.selectedKeyResult._id
    }

    var globalScope = this;
    
      axios
      .get('/rest/kr-updates?$sort[update_created_on]=-1&kr_id=' + krID)
      .then(function(response) {
        var kr = globalScope.fetchDataElementByID('key_result', krID)
        // console.log('selectedKR:', kr, krID)
        globalScope.selectedKeyResultUpdates = response.data.data;
        globalScope.selectedKeyResult = kr
        globalScope.showModal('keyResultUpdate', true);
        $('.selectedKeyResultUpdateNewNumber').val(kr.initial_number)
        globalScope.setQueryStringParameter('action', 'updateKeyResult'); 
        globalScope.setQueryStringParameter('keyResultID', kr._id);
        
        setTimeout(function() { 
          var number = 0;

          if (kr.keyResultUpdates[0] && kr.keyResultUpdates[0].new_number) {
            number = parseInt(kr.keyResultUpdates[0].new_number);
          } else {
            number = parseInt(kr.initial_number);
          }
          $('.selectedKeyResultUpdateNewNumber').val(number); 
        }, 100);
        
      })
},
showKRDropdownBox(kr, event) {
    // console.log(event, kr)
  if (event.target.classList[1] == "keyResult") {
    $('.krDropdown').appendTo($(event.target)[0])
    this.krDropdown.show = true;
    this.krDropdown.krID = kr._id;
  }
},
selectUpdateKeyResult() {
    var krID = this.krDropdown.krID;
    
    this.selectedKeyResult = this.fetchDataElementByID('key_result', krID);
    this.showModal('keyResultUpdate', true); 

  
  this.setQueryStringParameter('action', 'updateKeyResult'); 
  this.setQueryStringParameter('keyResultID', this.selectedKeyResult._id);

},
selectObjective(objective) {

  this.lastSelectedObjective = Object.assign({}, objective);
  this.selectedObjective = objective; 

  this.showModal('objectiveView', true); 
  this.setQueryStringParameter('action', 'viewObjective'); 
  this.setQueryStringParameter('objectiveID', objective._id);

},
  clearModalTaskData() {
    this.selectedTask = {};
    this.lastSelectedTask = {};
  },
  clearModalObjectiveData() {
    this.selectedObjective = {};
    this.lastSelectedObjective = {};
  },
  completeTask(task) {
    var globalScope = this;
    var newTask = task;
    newTask.status = "Done";

    axios
    .put('/rest/okrs/' + newTask._id, newTask)
    .then(function(response) {
      globalScope.refreshOKRData();
    })

  },
    updateModalState(newModalObj) {
    this.modal = newModalObj;
  },
  showModal(type, show) {
    this.modal.type = type;
    this.modal.show = show;

    if (type == "taskAdd") {
      setTimeout(function() { $('#taskAddInput').get(0).focus(); }, 20);
    }
  },
  getSlackUserByID(id, returnArray) {

    //If we've been passed a team ID instead of a Slack user ID
    if (id && id.length == 16) {
      
      //DIRTY HACK: We make this look like a slack user object for compatibility purposes
      var team = this.fetchDataElementByID('team', id);
      if (team) {
        var teamName = ""
        var teamID = ""
        var teamDescription = "";

        if (team._id) {
          teamID = team._id;
        }

        if (team.name) {
          teamName = team.name;
        }

        if (team.description) {
          teamDescription = team.description;
        }

      var output = {
        "id": team._id,
        "team_id": "T495EMCAW",
        "name": team.name,
        "deleted": false,
        "real_name": team.name,
        "profile": {
            "title": "",
            "real_name": team.name,
            "real_name_normalized": team.name,
            "display_name": team.name,
            "display_name_normalized": team.name,
            "image_original": "/images/group.svg",
            "email": team.name + "@aeries.com",
            "first_name": team.name,
            "last_name": "",
            "image_24": "/images/group.svg",
            "image_32": "/images/group.svg",
            "image_48": "/images/group.svg",
            "image_72": "/images/group.svg",
            "image_192": "/images/group.svg",
            "image_512": "/images/group.svg",
            "image_1024": "/images/group.svg",
            "team": "T495EMCAW"
        },
        "is_admin": false,
        "is_owner": false,
        "is_primary_owner": false,
        "is_restricted": false,
        "is_ultra_restricted": false,
        "is_bot": false,
        "is_app_user": false,
        "platform": "slack",
        "_id": team._id,
        "label": team.name,
        "key": team._id,
        "value": team._id,
        "desc": team.description
    }
    if (returnArray) {
      return [output]
    } else {
      return output
    }
    }

    } else {
    for (var i = 0; i < this.allSlackUsers.length; i++) {
      if (this.allSlackUsers[i].id == id) {
        if (returnArray) {
          return [this.allSlackUsers[i]];
        } else {
          return this.allSlackUsers[i];
        }
      }
    }
  }
  },
refreshOKRData(executeQueryParameters) {
  // console.log("Refreshing")
  var globalScope = this;
  //Nested this way because calling them without an explicit order was creating duplicate key results on execute

  //OKR tasks
	axios
		.get('/rest/okrs?type=Aeriesworks%20Task&$limit=9999&deleted[$ne]=true')
		.then(function (response) {
			globalScope.okrs.tasks = response.data.data;
			//OKR key results
			axios
				.get('/rest/okrs?type=key_result&$limit=9999&deleted[$ne]=true')
				.then(function (response) {
					globalScope.okrs.key_results = response.data.data;
					//OKR objectives
					axios
						.get('/rest/okrs?type=objective&$limit=9999&deleted[$ne]=true')
						.then(function (response) {
							globalScope.okrs.objectives = response.data.data;
							//OKR sessions
							axios
								.get('/rest/okrs?type=session&$limit=9999&deleted[$ne]=true')
								.then(function (response) {
                  globalScope.okrs.sessions = response.data.data;
                  //OKR sessions
                  axios
                    .get('/rest/teams?$limit=9999&deleted[$ne]=true')
                    .then(function (response) {
                      globalScope.teams = response.data.data;
                    axios
                      .get('/rest/kr-updates?$limit=9999&deleted[$ne]=true')
                      .then(function (response) {
                        globalScope.krUpdates = response.data.data;
                        
                        if (executeQueryParameters) {
                          globalScope.executeQueryParameterActions();
                        }

                        //If we had an objective selected, reselect it
                        if (globalScope.selectedObjective && globalScope.selectedObjective._id) {
                          globalScope.selectedObjective = globalScope.fetchDataElementByID('objective', globalScope.selectedObjective._id);
                        }
                        // console.log(globalScope.okrs)
                      })
                    // console.log(globalScope.okrs)
                  })
                })
            })
        })
    })
},
initializeEscapeKeyHandler() {
  var globalScope = this;
  $(document).on('keydown', function(event) {
       if (event.key == "Escape") {
            $('.modalContent').find('.closeModalButton:visible:first')[0].click();
       }
   });
},
fetchDataElementByID(type, id) {

  //Utility function for getting objectivs, KRs, sessions, or tasks by ID.

  var listRef = [];
  if (type == "objective") {
    listRef = this.okrs.objectives;
  } else if (type == "key_result") {
    listRef = this.okrs.key_results;
  } else if (type == "session") {
    listRef = this.okrs.sessions;
  } else if (type == "task") {
    listRef = this.okrs.tasks;
  } else if (type == "team") {
    listRef = this.teams;
  }
  for (var i = 0; i < listRef.length; i++) {
    if (listRef[i]._id == id) {
      return listRef[i]
    }
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
},



},
async created () {
      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.allSlackUsers = response.data.data;
      })

      // //Confluence
      // axios
      // .get('/rest/users?platform=confluence&is_bot[$ne]=true')
      // .then(function(response) {
      //   globalScope.totalConfluenceUsers = response.data.total;
      // })
      
      // //Jira
      // axios
      // .get('/rest/users?platform=jira&is_bot[$ne]=true')
      // .then(function(response) {
      //   globalScope.totalJiraUsers = response.data.total;
      // })

      //
      //OKRs
      //

      this.refreshOKRData(true)
},
async mounted () {
      //For passing to our function
      var globalScope = this;

      $('body').on('click', function(e) {
      if (e.target.id !== "add" 
      && e.target.classList[1] !== "keyResult") {
        globalScope.showAddDropdownBox = false;
        globalScope.krDropdown.show = false;
      }
      })

    this.initializeEscapeKeyHandler()

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
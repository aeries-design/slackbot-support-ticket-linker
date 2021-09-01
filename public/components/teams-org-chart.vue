<style scoped>
.sidebar, .sidebar > div {
    min-height: 100vh;
    height: 100%;
}
main > .flex {
  min-height: 100vh;
  
}

.modalOverlay {
  width: 100vw;
    height: 100vh;
    background: rgb(0, 0, 0);
    opacity: 0.5;
    z-index: 50;
    position: fixed;
}

.modal {
    width: 800px;
    height: 100%;
    border-radius: 4px;
    z-index: 60;
    background: white;
    margin: 0px auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.ui-autocomplete {
    z-index: 9999;
}
</style>

<style>
#teamChart .center-group > .link:nth-child(1)
{
  display: none;
}

#teamChart > svg {
  height: 100vh;
  width: 100%;
}
</style>

<template lang="pug">
main
  .modalRootContainer(v-show="addTeamModal.show")
    .modal.overflow-y-auto
      .modalContent.p-12
        div(class="float-right text-right w-full mb-8")
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="closeModal()")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        h1(class="text-display font-bold font-aeries mb-12") Create new team


        .propertyRows
          .icon
            img(class="w-10 mb-4" src='/images/group.svg')
          input(id="teamAddInput" v-model.lazy="modalTeamObject.name" type="text" class="font-aeries font-bold text-title w-full bg-neutral-400 p-1 rounded-sm mb-2" placeholder="Enter a team name (e.g. \"Sales\" or \"Design\")")
          .linkedTo.propertyRow(class="border-b border-neutral-500 pb-6 block")


          .linkedTo.propertyRow(class="border-b border-neutral-500 py-4 block")
            .flex
              .flex.flex-col.text-container.inline-block(class="w-1/4")
                span(class="font-bold inline-block") Reports to
              .flex.flex-col
                input(v-show="showTeamLinkInput && !modalTeamObject.selected_parent_team_id" type="text" placeholder="Select a parent team" id="teamSearch" class="bg-neutral-400 p-1 rounded-sm teamSearch")
                span(@click="clearAddTeamParent()" class="cursor-pointer inline hover:bg-neutral-300 py-2" v-if="modalTeamObject && modalTeamObject.selected_parent_team_id && modalTeamObject.selected_parent_team_id.label" class="cursor-pointer inline hover:bg-neutral-300 py-2").font-bold
                  .flex
                    .flex.flex-col
                      img(class="w-8 inline pr-2" src='/images/group.svg')
                    .flex.flex-col 
                      | {{modalTeamObject.selected_parent_team_id.label}}
                      

          .description.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block w-48 mb-4") Description
            textarea(v-model.lazy="modalTeamObject.description" placeholder="Enter description" id="createTeamDescription" class="p-1 border-2 border-neutral-400 text-neutral-1400 rounded-md py-1 w-full bg-neutral-400")
          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="createTeam()") Create team
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="closeModal()") Cancel


  .modalRootContainer(v-show="viewTeamModal.show")
    .modal.overflow-y-auto
      .modalContent.p-12
        div(class="float-right text-right w-full mb-8")
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="closeModal()")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        .icon
          img(class="w-10 mb-4" src='/images/group.svg')
        h1(class="text-display font-bold font-aeries my-6") {{selectedTeam.name}} #[span(class="text-neutral-1200 font-semi-bold") team]

        p {{selectedTeam.description}}

        .buttons(class="mt-6")
          button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="editTeam(selectedTeam)") Edit team
          button(class="text-blue-700 py-4 px-8 font-bold" @click="closeModal()") Close

        hr(class="my-4 border-neutral-600")
        h1(class="text-title font-aeries font-bold") Members
        a(v-if="!showAddMemberLink" class="text-blue-600 cursor-pointer" @click="showAddMemberLink = true;") + Add a member to this team
        .addTeamMember(v-show="showAddMemberLink")
          input(type="text" placeholder="Select a team member" id="addTeamMemberSearch" class="bg-neutral-400 p-1 rounded-sm userSearch")
        
        .members.my-3
          .avatar(v-for="member in selectedTeam.members" @click="removeTeamMember(member)" class="cursor-pointer inline hover:bg-neutral-500 py-3 mr-4")
            img(:src="getSlackUserByID(member.user_id).profile.image_192" :title="getSlackUserByID(member.user_id).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
            span.font-bold {{getSlackUserByID(member.user_id).real_name}}


  .modalRootContainer(v-show="editTeamModal.show")
    .modal.overflow-y-auto
      .modalContent.p-12
        div(class="float-right text-right w-full mb-8")
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="closeModal()")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        h1(class="text-display font-bold font-aeries mb-12") {{selectedTeam.name}} #[span(class="text-neutral-1200 font-semi-bold") team]


        .propertyRows
          .icon
            img(class="w-10 mb-4" src='/images/group.svg')
          input(id="teamAddInput" v-model.lazy="selectedTeam.name" type="text" class="font-aeries font-bold text-title w-full bg-neutral-400 p-1 rounded-sm mb-2" placeholder="Enter a team name (e.g. \"Sales\" or \"Design\")")
          .linkedTo.propertyRow(class="border-b border-neutral-500 pb-6 block")


          .linkedTo.propertyRow(class="border-b border-neutral-500 py-4 block")
            .flex
              .flex.flex-col.text-container.inline-block(class="w-1/4")
                span(class="font-bold inline-block") Reports to
              .flex.flex-col
                input(v-show="showAddMemberLink" type="text" placeholder="Select a parent team" id="editTeamSearch" class="bg-neutral-400 p-1 rounded-sm teamSearch")
                span(class="cursor-pointer inline hover:bg-neutral-300 py-2" v-if="selectedTeam && selectedTeam.selected_parent_team_id && selectedTeam.selected_parent_team_id.label && !showAddMemberLink" class="cursor-pointer inline hover:bg-neutral-300 py-2").font-bold
                  .flex
                    .flex.flex-col
                      img(class="w-8 inline pr-2" src='/images/group.svg')
                    .flex.flex-col 
                      | {{selectedTeam.selected_parent_team_id.label}}
                a(v-if="!showAddMemberLink" class="text-blue-600 cursor-pointer" @click="changeSelectedTeamParent()") Change this team's parent

          .description.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block w-48 mb-4") Description
            textarea(v-model.lazy="selectedTeam.description" placeholder="Enter description" id="createTeamDescription" class="p-1 border-2 border-neutral-400 text-neutral-1400 rounded-md py-1 w-full bg-neutral-400")
          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="updateTeam(selectedTeam)") Edit team
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="closeModal()") Close



  .modalOverlay(v-show="addTeamModal.show || viewTeamModal.show || editTeamModal.show")
  .flex.w-full
    .flex(class="w-96")
      .flex-col.w-full
        sidebar-projects

    .flex-col(class="w-full content_container")
      header(class="border-b border-neutral-500 bg-white text-neutral-1900 py-3 flex justify-between items-center")
        div(class="px-2 md:px-8")
          strong(class="font-aeries text-title tracking-tight mr-6")
              a Teams in Aeries
          div.mt-4.inline-block
            span(@click="selectedPage = 'chart'" class="text-subhead tracking-tight py-3 px-6 cursor-pointer" :class="{'border-blue-600 border-b-4 font-bold' : selectedPage == 'chart'}")
                span Chart
            span(@click="selectedPage = 'list'" class="text-subhead tracking-tight py-4 px-6 hover:bg-blue-100 cursor-pointer" :class="{'border-blue-600 border-b-4 font-bold' : selectedPage == 'list'}")
                span List
        div(class="px-2 md:px-8")
          span(@click="addTeamModal.show = true;" class="cursor-pointer tracking-tight bg-blue-700 p-2 px-6 rounded-full mr-4 text-white font-bold")
              a +  Add team

          
      //- nav.nav
      //-   header(class="border-b border-neutral-500 bg-white text-neutral-1900 py-4")
      //-     div(class="p-2 md:px-8")
      //-       span(class="tracking-tight bg-neutral-400 p-2 px-6 rounded-full mr-4 text-neutral-1200")
      //-           a(href="#") Filter  +
      //-       span(class="tracking-tight bg-neutral-400 p-2 px-6 rounded-full mr-4 text-neutral-1200")
      //-           a(href="#") Settings & Actions
          
      .flex(v-show="selectedPage == 'list'")
        div(class="md:px-8")
          section
            table(class="w-full table-fixed")
              thead
                tr(class="border-b-2 border-neutral-600")
                  th(class="font-aeries text-title p-4 text-left") Name
                  th(class="font-aeries text-title p-4 text-left") # of members
                  th(class="font-aeries text-title p-4 text-center") Description
                  th(class="font-aeries text-title p-4 text-center") Actions
              tbody
                tr(v-for="team in teams" class="border-b border-neutral-500")
                  td(class="py-4 text-left border-l border-neutral-500 p-4 pr-8")
                    .title(@click="viewTeam(team)" class="font-semi-bold text-subhead text-blue-600 pb-2 cursor-pointer") {{team.name}}
                  td(class="px-8 py-4 text-left") 
                    span {{team.members.length}}
                  td(class="px-8 py-4 text-center border-l border-neutral-500 text-minimum-text text-neutral-1200") 
                    span {{team.description}}
                  td(class="px-8 py-4 text-center border-l border-neutral-500 text-minimum-text text-neutral-1200") 
                    span(@click="editTeam(team)" class="font-semi-bold text-subhead text-blue-600 pb-2 cursor-pointer") Edit team


      .flex(v-show="selectedPage == 'chart'")
        .sidebar(class="w-2/12 z-40 shadow-lg")
            .flex(class='px-6 overflow-auto align-top flex-col w-full text-neutral-1900 flex-shrink-0 h-full')
              .section
                .h2(class="font-aeries font-bold text-subhead uppercase mt-6") Options
                .expandAll(class="mt-6")
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" @click="refreshPage()") Refresh chart
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" @click="expandAll()") Expand all
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" @click="collapseAll()") Collapse all
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" v-if="chartLayout == 'h'" @click="switchChartLayout('v')") Switch to vertical layout
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" v-if="chartLayout == 'v'" @click="switchChartLayout('h')") Switch to horizontal layout
              .section
                .h2(class="font-aeries font-bold text-subhead uppercase mt-6") Teams
                p.italic.text-minimum-text.text-neutral-1000 No filters found.
        .all-content(class="w-10/12")
          #home(v-if="currentPage == 'home'" class="w-full")
            section
              .chart-container#teamChart.bg-neutral-300

     
</template>

<script>
const axios = require('axios');

import Chart from '../javascripts/d3-org-chart.js'

module.exports = {
data() {
    return {
    addTeamModal : {show: false},
    editTeamModal : {show: false},
    viewTeamModal : {show: false},
    modalTeamObject: {
      "_id":"",
      "name":"",
      "description":"",
      "selected_parent_team_id" : {'value':'', 'label':''},
      "parent_team_id":"",
      "avatar_image":"",
      "members":[]
    },
    showTeamLinkInput: true,
    currentPage: "home",
    currentUser : "",
    currentUserID: "",
    showAddMemberLink: false,
    selectedTeam: {
      "_id":"",
      "name":"",
      "description":"",
      "selected_parent_team_id" : {"value":"", "label":""},
      "parent_team_id":"",
      "avatar_image":"",
      "members":[]
    },
    teams: [],
    chart: {},
    chartLayout: 'h',
    orgChart: [],
    selectedPage: 'chart',
    executiveTeamID: "",
    allSlackUsers: [],
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
        '<div>\n                  <div style="margin-left:70px;\n                              margin-top:10px;\n                              font-size:30px;\n                              font-weight:bold;\n                         ">Aeries Software </div>\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:16px;\n                         ">Student Information Systems  </div>\n\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:14px;\n                         "></div>\n\n                 <div style="margin-left:196px;\n                             margin-top:15px;\n                             font-size:13px;\n                             position:absolute;\n                             bottom:5px;\n">             </div>',
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
        slackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
    }
  },
  computed: {
    autoCompleteTeamMembers() {
  var output = [];
  var u = this.teams;
  for (var i = 0; i < u.length; i++) {
    if (!u[i].deleted) {
      var team = u[i];
      team.label = u[i].name
      team.key = u[i]._id;
      team.value = u[i]._id;
      team.desc = u[i].description
      output.push(team);
    }
  }
  return output;
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
  return output;
    },
    d3TeamsList() {
      var d3TeamsList = [];
      
      //Push the root element (which is the Aeries Software organization).
      d3TeamsList.push(this.d3RootElement);
      
      for (var i = 0; i < this.teams.length; i++) {
          d3TeamsList.push(this.convertTeamToD3Object(this.teams[i]));
      }
      return d3TeamsList;
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
            return text.substring(0, length) + suffix;
        },
  },
methods : {
  changeSelectedTeamParent() {
    $('#editTeamSearch').val('');
    this.showAddMemberLink = true; 
  },
  viewTeam(team) {
    this.selectedTeam = team;
    this.viewTeamModal.show = true;
  },
  editTeam(team) {
    this.selectedTeam = team;
    this.editTeamModal.show = true;
    this.selectedTeam.selected_parent_team_id = {value: this.selectedTeam.parent_team_id, label: this.getTeamFromID(this.selectedTeam.parent_team_id).name}
  },
  updateTeam(team) {
    var globalScope = this;

    if (team.selected_parent_team_id.value) {
      team.parent_team_id = team.selected_parent_team_id.value;
    }

    delete team.selected_parent_team_id;
    delete team.members;

      axios
      .put('/rest/teams/' + team._id, team)
      .then(function(response) {
        globalScope.refreshData();
      })
  },
  closeModal() {
    this.addTeamModal.show = false;
    this.viewTeamModal.show = false;
    this.editTeamModal.show = false;
    this.showAddMemberLink = false;
  },
  cancelCreateTeam() {
    this.addTeamModal.show = false;
  },
  clearAddTeamParent() {
    this.modalTeamObject.selected_parent_team_id = '';
    $('#teamSearch').val('');
    setTimeout(function() { $('#teamSearch').get(0).focus(); }, 20);
  },
  clearEditTeamParent() {
    this.selectedTeam.parent_team_id = '';
    this.selectedTeam.selected_parent_team_id = '';
    this.showTeamLinkInput = true;
    $('#editTeamSearch').val('');
    setTimeout(function() { $('#editTeamSearch').get(0).focus(); }, 20);
  },
  removeTeamMember(member) {
    var globalScope = this;
    if (confirm('Remove this user from this team?')) {
      axios
      .delete('/rest/team-members/' + member._id)
      .then(function(response) {
        globalScope.refreshData();
      })
    }
  },
  getTeamFromID(teamID) {
    for (var i = 0; i < this.teams.length; i++) {
      if (teamID == this.teams[i]._id) {
        return this.teams[i];
      }
    }
    return false;
  },
  setExecutiveTeamID() {
    for (var i = 0; i < this.teams.length; i++) {
      if (this.teams[i].name == "Executive") {
        this.executiveTeamID = this.teams[i]._id;
        this.modalTeamObject.parent_team_id = {label: "Executive", value: this.executiveTeamID}
        this.modalTeamObject.selected_parent_team_id = {label: "Executive", value: this.executiveTeamID}
      }
    }
  },
  switchChartLayout(layout) {
    this.chartLayout = layout;
    this.renderOrgChart();
  },
  refreshPage() {
    window.location.reload();
  },
expandAll() {
window.chart.expandAll();
},
collapseAll() {
  window.chart.collapseAll();
},
  createTeam() {
    var globalScope = this;
    //First make a copy of the Vue data using Object.assign,
    //because we're about to delete properties from it before posting to the server.
    //If we just say for exammple var okr = this.data,
    //when we delete a property from okr, we delete it from the Vue data.
    var team = Object.assign({}, this.modalTeamObject);

    if (team.selected_parent_team_id.value) {
      team.parent_team_id = team.selected_parent_team_id.value;
    }

    team.recordCreatedBy = this.currentUser.id;

    delete team.selected_parent_team_id;
    delete team.members;
    delete team._id;
    
    // console.log(JSON.stringify(task))

      axios
      .post('/rest/teams', team)
      .then(function(response) {
        globalScope.refreshData()
        globalScope.closeModal();
      })

  },
createTask() {
    var globalScope = this;
    //First make a copy of the Vue data using Object.assign,
    //because we're about to delete properties from it before posting to the server.
    //If we just say for exammple var okr = this.data,
    //when we delete a property from okr, we delete it from the Vue data.
    var team = Object.assign({}, this.modalTeamObject);

    if (team.selected_parent_team_id.value) {
      team.parent_team_id = task.selected_parent_team_id;
    }

    if (task.selected_owner) {
      team.owner = team.selected_owner.value;
    }

    team.recordCreatedBy = this.currentUser.id;

    delete team.selected_linked_to_objective_id;
    delete team.selected_owner;
    
    // console.log(JSON.stringify(task))

      axios
      .post('/rest/okrs', team)
      .then(function(response) {
        globalScope.$emit('refreshOKRData');
        
        //Send us back to the OKR we came from, otherwise close the modal
        if (globalScope.backToObjectiveRef._id) {
              globalScope.updateModalState('objectiveView', true);
              globalScope.backToObjectiveRef = {};
        } else {
        globalScope.updateModalState('taskAdd', false);
        }
        
        globalScope.clearModalTaskData()
      })

  },
getNumberOfChildren(slackUserID) {
  var output = {children: [], count: 0};
  var structure = Object.values(this.orgChart.structure);
  for (var i = 0; i < structure.length; i++) {
    if (structure[i] == slackUserID) {
      output.count += 1;
      output.children.push(structure[i])
    }
  }
  return output;
},
selectTeamOnOrgChart(teamID) {

console.log(teamID)

this.selectedTeam = this.getTeamFromID(teamID);
this.viewTeamModal.show = true;

},
getSlackUserByID(slackUserID) {
  for (var i = 0; i < this.allSlackUsers.length; i++) {
    if (this.allSlackUsers[i].id == slackUserID) {
      return this.allSlackUsers[i];
    }
  }
},
convertTeamToD3Object(team) {

  var parentID = "O-0"; //Default as a child of the org

  // if (this.getUserParentID(slackUser.id)) {
  //   parentID = this.getUserParentID(slackUser.id)
  // }

  //Computed properties

  if (team.parent_team_id) {
    parentID = team.parent_team_id
  }

  var teamDisplayName = team.name;

  // User's default accent color
  var accentColor = "#000";

  //TODO: Color-coded users by primary team


  //Only auto-expand those with less than 6 direct reports for on-load readability
  // var expandChildren = false;

  // var numberOfChildren = this.getNumberOfChildren(slackUser.id);
  // if (numberOfChildren.count < 9) {
  //   console.log(slackUser.profile.real_name, numberOfChildren.count)
  //   var expandChildren = true;
  // }

  var expandChildren = true;

  return   {
    nodeId: team._id,
    parentNodeId: parentID,
    width: 500,
    height: 94,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: {
      red: 192,
      green: 198,
      blue: 208,
      alpha: 1
    },
    backgroundColor: {
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1
    },
    nodeImage: {
      url:
        "",
      width: 48,
      height: 48,
      centerTopDistance: 0,
      centerLeftDistance: -20,
      cornerShape: "SQUARE",
      shadow: false,
      borderWidth: 0,
      borderColor: {
        red: 192,
        green: 198,
        blue: 208,
        alpha: 1
      }
    },
    nodeIcon: {
      icon: "https://to.ly/1yZnX",
      size: 30
    },
    template:
      '<div style="border-top: 3px solid '+accentColor+';"></div><div>\n                  <div style="margin-left:20px; margin-right:38px;\n                              margin-top:17px;\n                              font-size:30px;\n                              font-weight:bold; text-align: left;\n                         ">'+teamDisplayName+ ' (' + team.members.length + ') </div>\n                 <div style="margin-left:20px; margin-right:38px;\n                              margin-top:3px;\n                              font-size:16px;text-align: left;\n                         ">'+team.description+'  </div>\n\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:14px;\n                         "></div>\n\n                 <div style="margin-left:196px;\n                             margin-top:15px;\n                             font-size:13px;\n                             position:absolute;\n                             bottom:5px;\n">             </div>',
    connectorLineColor: {
      red: 192,
      green: 198,
      blue: 208,
      alpha: 1
    },
    connectorLineWidth: 5,
    dashArray: "",
    expanded: expandChildren
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
getUserParentID(slackUserID) {
  if (this.orgChart.structure.hasOwnProperty(slackUserID)) {
    return this.orgChart.structure[slackUserID]
  } else {
    return false
  }
},
initAutoComplete() {

  var globalScope = this;


          //Team search (e.g. parent team)
    console.log(globalScope.autoCompleteTeamMembers)
    $( ".teamSearch" ).on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function(request, response) {
          var results;
          var aData = $.map(globalScope.autoCompleteTeamMembers, function(value, key) {
            return {
              label: value.name,
              value: value._id
            }
          });
          results = $.ui.autocomplete.filter(aData,  request.term );
          
          response(results);
        },
        select: function( event, ui ) {
          console.log(event, ui)
          if (event.target.id == "teamSearch") {
            globalScope.modalTeamObject.selected_parent_team_id = ui.item;
          } else if (event.target.id == "editTeamSearch") {
            globalScope.selectedTeam.selected_parent_team_id = ui.item;
            globalScope.showAddMemberLink = false;
          }
        }
      }).bind('focus', function(){ $(this).autocomplete("search"); } );


    //User search (e.g. owner)
    $( ".userSearch" ).on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function(request, response) {
          var results;
          var aData = $.map(globalScope.autoCompleteSlackUsers, function(value, key) {
            return {
              label: value.label,
              value: value.id
            }
          });
          results = $.ui.autocomplete.filter(aData,  request.term );
          
          response(results);
        },
        select: function( event, ui ) {
          console.log(event, ui)
          if (event.target.id == "addTeamMemberSearch") {
            var user = globalScope.getSlackUserByID(ui.item.value);
            var payload = {
              team_id: globalScope.selectedTeam._id,
              user_id: user.id
            }

            globalScope.addMemberToTeam(user, payload);
            
          }
        }
      }).bind('focus', function(){ $(this).autocomplete("search"); } );



},
addMemberToTeam(user, payload) {
//If user is not already in team, add to team.
  var globalScope = this;
  axios
  .get('/rest/team-members?$limit=9999&team_id='+payload.team_id+'&user_id='+payload.user_id)
  .then(function(response) {
    console.log(response)
    if (response.data.total) {
      alert("This person is already a member of this team.")
        setTimeout(function() { 
          $("#addTeamMemberSearch").val('');
        }, 20);
    } else {
      axios
      .post('/rest/team-members', payload)
      .then(function(response) {
        globalScope.refreshData()
        // globalScope.updateModalState('objectiveView', true);
      })
        setTimeout(function() { 
          $("#addTeamMemberSearch").val('');
        }, 20);
    }
  })


},
refreshData() {
  var globalScope = this;
      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.allSlackUsers = response.data.data;
        globalScope.fetchOrgTeams()
      })
      
},
fetchOrgTeams() {
  var globalScope = this;
  axios
  .get('/rest/teams?$limit=9999')
  .then(function(response) {
    globalScope.teams = response.data.data;
    globalScope.renderOrgChart();
    globalScope.initAutoComplete()
    globalScope.setExecutiveTeamID();
    globalScope.refreshSelectedTeam()
  })
},
refreshSelectedTeam() {
  //This function gets called after we refresh data. It replaces the current selected team data with the latest from the server.
  var selectedTeamID = this.selectedTeam._id;
  for (var i = 0; i < this.teams.length; i++) {
    if (selectedTeamID == this.teams[i]._id) {
      this.selectedTeam = this.teams[i];
    }
  }
},
renderOrgChart() {

  var data = this.d3TeamsList;

console.log(data)
$('.chart-container').empty()
window.chart = new Chart()
  .container(".chart-container")
  .data(data)
  .svgWidth(window.innerWidth)
  .svgHeight(700)
  .initialZoom(0.6)
  .layout(this.chartLayout)
  .onNodeClick((d) => this.selectTeamOnOrgChart(d))
  .render();

$('.node').first().hide();

}
},
async mounted () {
  
      var globalScope = this;

      this.fetchOrgTeams()

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.allSlackUsers = response.data.data;
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
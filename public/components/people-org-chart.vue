<style>
#orgChart .center-group > .link:nth-child(1),
#orgChart .center-group > .link:nth-child(2),
#orgChart .center-group > .link:nth-child(3) {
  display: none;
}

#orgChart > svg {
  height: 100vh;
  width: 100%;
}
</style>

<template lang="pug">
main
  projects-modal(
    v-bind:modal="modal" 
    v-bind:okrs="okrs" 
    v-bind:currentUser="{'id' : currentUserID, 'name' : currentUser}"
    v-bind:selectedUser="selectedUser"
    
    v-on:updateModalState="updateModalState($event)"
    )
  .flex.w-full
    .flex(class="w-96")
      .flex-col.w-full
        sidebar-projects
    .flex-col(class="w-full content_container")
      header(class="border-b border-neutral-500 bg-white text-neutral-1900")
        div(class="header p-2 md:px-8")
          strong(class="font-aeries text-title tracking-tight")
              a(href="/") Aeries Organizational Chart
          
          nav.nav
              //- span.nav__link.border-r.border-neutral-1200

      .flex
        .sidebar(class="w-64 xl:w-2/12 z-40 shadow-lg")
            .flex(class='px-6 overflow-auto align-top flex-col w-full text-neutral-1900 flex-shrink-0 h-full')
              .section
                .h2(class="font-aeries font-bold text-subhead uppercase mt-6") Options
                .expandAll(class="mt-6")
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" @click="refreshPage()") Refresh chart
                  //- .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all") Show / hide leaders
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" @click="expandAll()") Expand all
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" @click="collapseAll()") Collapse all
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" v-if="chartLayout == 'h'" @click="switchChartLayout('v')") Switch to vertical layout
                  .button(class="py-2 rounded border-2 border-neutral-1900 text-neutral-1900 text-center font-bold mb-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-all" v-if="chartLayout == 'v'" @click="switchChartLayout('h')") Switch to horizontal layout
              //- .section
              //-   .h2(class="font-aeries font-bold text-subhead uppercase mt-6") Find People
              //-   input(type="text" class="px-3 py-2 bg-neutral-400 text-minimum-text w-full rounded shadow mt-2 mb-3" placeholder="Start typing...")
              //-   hr(class="my-2 border-neutral-600")
              //-   .people
              //-     .person(v-for="(person, index) in d3UsersList" v-if="slackUsers")
              //-       .avatar(v-if="index < 6 && person.nodeId !== 'O-0'" class="cursor-pointer block hover:bg-neutral-500 px-2 py-3 my-1")
              //-         img(v-if="person.nodeImage.url" :src="person.nodeImage.url" :title="person.slackUserDisplayName" class="inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
              //-         span.font-bold(v-if="person.slackUserDisplayName") {{person.slackUserDisplayName}}
                //- p.italic.text-minimum-text.text-neutral-1000 No filters found.
        .all-content(class="w-10/12")
          #home(v-if="currentPage == 'home'" class="w-full")
            section
              .chart-container#orgChart.bg-neutral-300

     
</template>

<script>
const axios = require('axios');

import Chart from '../javascripts/d3-org-chart.js'

module.exports = {
data() {
    return {
        currentPage: "home",
        currentUser : "",
        currentUserID: "",
        chart: {},
        modal: {show: false, type: ''},
        chartLayout: 'h',
        orgChart: [],
        selectedUser: {},
        myConfluenceTasks: [
          {
            title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
            assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
            due: "29 Sep 2020",
            taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          },
          {
            title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
            assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
            due: "29 Sep 2020",
            taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          },
          {
            title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
            assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
            due: "29 Sep 2020",
            taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          },
          {
            title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
            assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
            due: "29 Sep 2020",
            taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          }
        ],
        myJiraTasks: [
          {
              "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
              "id": "13572",
              "self": "https://jira.aeries.works/rest/api/2/issue/13572",
              "key": "TDWW-322",
              "fields": {
                  "issuetype": {
                      "self": "https://jira.aeries.works/rest/api/2/issuetype/10001",
                      "id": "10001",
                      "description": "The sub-task of the issue",
                      "iconUrl": "https://jira.aeries.works/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype",
                      "name": "Sub-task",
                      "subtask": true,
                      "avatarId": 10316
                  },
                  "parent": {
                      "id": "13565",
                      "key": "TDWW-315",
                      "self": "https://jira.aeries.works/rest/api/2/issue/13565",
                      "fields": {
                          "summary": "System Admin Webinars - Fall 2019",
                          "status": {
                              "self": "https://jira.aeries.works/rest/api/2/status/10000",
                              "description": "",
                              "iconUrl": "https://jira.aeries.works/images/icons/status_generic.gif",
                              "name": "To Do",
                              "id": "10000",
                              "statusCategory": {
                                  "self": "https://jira.aeries.works/rest/api/2/statuscategory/2",
                                  "id": 2,
                                  "key": "new",
                                  "colorName": "blue-gray",
                                  "name": "To Do"
                              }
                          },
                          "priority": {
                              "self": "https://jira.aeries.works/rest/api/2/priority/3",
                              "iconUrl": "https://jira.aeries.works/images/icons/priorities/medium.svg",
                              "name": "Medium",
                              "id": "3"
                          },
                          "issuetype": {
                              "self": "https://jira.aeries.works/rest/api/2/issuetype/10000",
                              "id": "10000",
                              "description": "A task that needs to be done.",
                              "iconUrl": "https://jira.aeries.works/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype",
                              "name": "Task",
                              "subtask": false,
                              "avatarId": 10318
                          }
                      }
                  },
                  "components": [],
                  "timespent": null,
                  "timeoriginalestimate": null,
                  "description": null,
                  "project": {
                      "self": "https://jira.aeries.works/rest/api/2/project/10301",
                      "id": "10301",
                      "key": "TDWW",
                      "name": "Training Dept - Webinars & Workshops",
                      "projectTypeKey": "software",
                      "avatarUrls": {
                          "48x48": "https://jira.aeries.works/secure/projectavatar?avatarId=10324",
                          "24x24": "https://jira.aeries.works/secure/projectavatar?size=small&avatarId=10324",
                          "16x16": "https://jira.aeries.works/secure/projectavatar?size=xsmall&avatarId=10324",
                          "32x32": "https://jira.aeries.works/secure/projectavatar?size=medium&avatarId=10324"
                      }
                  },
                  "customfield_10010": null,
                  "fixVersions": [],
                  "customfield_10011": null,
                  "customfield_10012": null,
                  "aggregatetimespent": null,
                  "resolution": null,
                  "customfield_10005": null,
                  "customfield_10006": "{summaryBean=com.atlassian.jira.plugin.devstatus.rest.SummaryBean@74e102d7[summary={pullrequest=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@68092a19[overall=PullRequestOverallBean{stateCount=0, state='OPEN', details=PullRequestOverallDetails{openCount=0, mergedCount=0, declinedCount=0}},byInstanceType={}], build=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@10ce7628[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BuildOverallBean@3136cfca[failedBuildCount=0,successfulBuildCount=0,unknownBuildCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], review=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@75a78a5c[overall=com.atlassian.jira.plugin.devstatus.summary.beans.ReviewsOverallBean@3011397b[stateCount=0,state=<null>,dueDate=<null>,overDue=false,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], deployment-environment=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@530d6667[overall=com.atlassian.jira.plugin.devstatus.summary.beans.DeploymentOverallBean@5442ab53[topEnvironments=[],showProjects=false,successfulCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], repository=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@1d7e2eed[overall=com.atlassian.jira.plugin.devstatus.summary.beans.CommitOverallBean@249d16d8[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], branch=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@1c1b7272[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BranchOverallBean@5dc24a91[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}]},errors=[],configErrors=[]], devSummaryJson={\"cachedValue\":{\"errors\":[],\"configErrors\":[],\"summary\":{\"pullrequest\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"stateCount\":0,\"state\":\"OPEN\",\"details\":{\"openCount\":0,\"mergedCount\":0,\"declinedCount\":0,\"total\":0},\"open\":true},\"byInstanceType\":{}},\"build\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"failedBuildCount\":0,\"successfulBuildCount\":0,\"unknownBuildCount\":0},\"byInstanceType\":{}},\"review\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"stateCount\":0,\"state\":null,\"dueDate\":null,\"overDue\":false,\"completed\":false},\"byInstanceType\":{}},\"deployment-environment\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"topEnvironments\":[],\"showProjects\":false,\"successfulCount\":0},\"byInstanceType\":{}},\"repository\":{\"overall\":{\"count\":0,\"lastUpdated\":null},\"byInstanceType\":{}},\"branch\":{\"overall\":{\"count\":0,\"lastUpdated\":null},\"byInstanceType\":{}}}},\"isStale\":false}}",
                  "customfield_10007": null,
                  "customfield_10008": null,
                  "customfield_10009": null,
                  "aggregatetimeestimate": null,
                  "resolutiondate": null,
                  "workratio": -1,
                  "summary": "Marketing Email",
                  "lastViewed": null,
                  "watches": {
                      "self": "https://jira.aeries.works/rest/api/2/issue/TDWW-322/watchers",
                      "watchCount": 1,
                      "isWatching": false
                  },
                  "creator": {
                      "self": "https://jira.aeries.works/rest/api/2/user?username=lara",
                      "name": "lara",
                      "key": "lara",
                      "emailAddress": "lara@aeries.com",
                      "avatarUrls": {
                          "48x48": "https://jira.aeries.works/secure/useravatar?ownerId=lara&avatarId=10728",
                          "24x24": "https://jira.aeries.works/secure/useravatar?size=small&ownerId=lara&avatarId=10728",
                          "16x16": "https://jira.aeries.works/secure/useravatar?size=xsmall&ownerId=lara&avatarId=10728",
                          "32x32": "https://jira.aeries.works/secure/useravatar?size=medium&ownerId=lara&avatarId=10728"
                      },
                      "displayName": "Lara Clickner",
                      "active": true,
                      "timeZone": "UTC"
                  },
                  "subtasks": [],
                  "created": "2019-10-02T21:09:23.000+0000",
                  "reporter": {
                      "self": "https://jira.aeries.works/rest/api/2/user?username=lara",
                      "name": "lara",
                      "key": "lara",
                      "emailAddress": "lara@aeries.com",
                      "avatarUrls": {
                          "48x48": "https://jira.aeries.works/secure/useravatar?ownerId=lara&avatarId=10728",
                          "24x24": "https://jira.aeries.works/secure/useravatar?size=small&ownerId=lara&avatarId=10728",
                          "16x16": "https://jira.aeries.works/secure/useravatar?size=xsmall&ownerId=lara&avatarId=10728",
                          "32x32": "https://jira.aeries.works/secure/useravatar?size=medium&ownerId=lara&avatarId=10728"
                      },
                      "displayName": "Lara Clickner",
                      "active": true,
                      "timeZone": "UTC"
                  },
                  "customfield_10000": "0|i00ar3:",
                  "aggregateprogress": {
                      "progress": 0,
                      "total": 0
                  },
                  "customfield_10001": null,
                  "priority": {
                      "self": "https://jira.aeries.works/rest/api/2/priority/3",
                      "iconUrl": "https://jira.aeries.works/images/icons/priorities/medium.svg",
                      "name": "Medium",
                      "id": "3"
                  },
                  "customfield_10100": null,
                  "customfield_10101": null,
                  "customfield_10102": null,
                  "labels": [],
                  "customfield_10103": null,
                  "environment": null,
                  "timeestimate": null,
                  "aggregatetimeoriginalestimate": null,
                  "versions": [],
                  "duedate": null,
                  "progress": {
                      "progress": 0,
                      "total": 0
                  },
                  "issuelinks": [],
                  "votes": {
                      "self": "https://jira.aeries.works/rest/api/2/issue/TDWW-322/votes",
                      "votes": 0,
                      "hasVoted": false
                  },
                  "assignee": {
                      "self": "https://jira.aeries.works/rest/api/2/user?username=david",
                      "name": "david",
                      "key": "david",
                      "emailAddress": "davidc@aeries.com",
                      "avatarUrls": {
                          "48x48": "https://jira.aeries.works/secure/useravatar?ownerId=david&avatarId=11000",
                          "24x24": "https://jira.aeries.works/secure/useravatar?size=small&ownerId=david&avatarId=11000",
                          "16x16": "https://jira.aeries.works/secure/useravatar?size=xsmall&ownerId=david&avatarId=11000",
                          "32x32": "https://jira.aeries.works/secure/useravatar?size=medium&ownerId=david&avatarId=11000"
                      },
                      "displayName": "David Lin-Clark",
                      "active": true,
                      "timeZone": "America/Los_Angeles"
                  },
                  "updated": "2019-10-02T21:09:23.000+0000",
                  "status": {
                      "self": "https://jira.aeries.works/rest/api/2/status/10000",
                      "description": "",
                      "iconUrl": "https://jira.aeries.works/images/icons/status_generic.gif",
                      "name": "To Do",
                      "id": "10000",
                      "statusCategory": {
                          "self": "https://jira.aeries.works/rest/api/2/statuscategory/2",
                          "id": 2,
                          "key": "new",
                          "colorName": "blue-gray",
                          "name": "To Do"
                      }
                  }
              }
          }
        ],
        myAeriesworksTasks: [
          {
            title: "Build the landing page",
            assigned: "David Lin-Clark",
            due: "11 Sep 2021"
          }
        ],
        objectives: [
          {
            title: "Launch internal ADL tool",
            owner: "Design",
            keyResults: [
              {
              title: "Create assets",
              description: "Creation of assets like illustrations, powerpoints, marketing templates, emails, colors, fonts, and other design patterns.",
              dueDate: "15 Oct 2020",
              status: "In progress"
              },
              {
              title: "Internal soft launch",
              description: "Launch a repository of often-updated on-brand, on-message templates for collateral that can be cloned and used for any department's needs. These templates will be the first big investment of effort utilizing the complete and whole Aeries Design Language.",
              dueDate: "30 Oct 2020",
              status: "Not started"
              },
              {
              title: "Ongoing publishing and iteration",
              description: "Publish, iterate, and amplify the design system across all teams so there is a continual discourse on what needs to be added or updated. During this period, hunt down instances of off-brand material and work with the creator(s) to get it updated.",
              dueDate: "13 Nov 2020",
              status: "Not started"
              },
            ],
            description: "Build tools, workflows, resources and assets to form a cohesive Aeries Design Language, so that we can better support sales & marketing campaigns, design beautiful and consistent product UIs, and maintain clear and concise brand standards and guidelines. A primary goal for this objective is a focus on self-serve functionality, as the Aeries Design Language should be highly accessible for all stakeholders - sales, marketing, programming, the event/trade show team, presenters, and customers."
          }
        ],
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
        slackUsers: [],
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
    }
  },
  computed: {
    alphaSlackUsersList() {
      var arr = this.slackUsers;
      console.log(arr)
      arr.sort(function(a, b) {
    var textA = a.profile.real_name.toUpperCase();
    var textB = b.profile.real_name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
      
      return arr
    },
    d3UsersList() {
      var d3UsersList = [];
      
      //Push the root element (which is the Aeries Software organization).
      d3UsersList.push(this.d3RootElement);
      
      for (var i = 0; i < this.alphaSlackUsersList.length; i++) {
        if (this.alphaSlackUsersList[i].is_bot == false 
        && this.alphaSlackUsersList[i].deleted == false
        && this.alphaSlackUsersList[i].is_restricted == false
        && this.alphaSlackUsersList[i].id !== 'USLACKBOT') {
          d3UsersList.push(this.convertSlackUserToD3Object(this.alphaSlackUsersList[i]));
        }
      }
      return d3UsersList;
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
      for (var i = 0; i < this.myAeriesworksTasks.length; i++) {
        var thisTask = this.myAeriesworksTasks[i]
        console.log(this.myAeriesworksTasks[i])
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
            return text.substring(0, length) + suffix;
        },
  },
methods : {
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
    updateModalState(newModalObj) {
    this.modal = newModalObj;    
  },
selectUser(id) {
  this.selectedUser = this.getSlackUserByID(id)
  this.modal = {show: true, type: 'viewUser'}
},
getSlackUserByID(slackUserID) {
  for (var i = 0; i < this.slackUsers.length; i++) {
    if (this.slackUsers[i].id == slackUserID) {
      return this.slackUsers[i];
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
getUserParentID(slackUserID) {
  if (this.orgChart.structure.hasOwnProperty(slackUserID)) {
    return this.orgChart.structure[slackUserID]
  } else {
    return false
  }
},
convertSlackUserToD3Object(slackUser) {

  var parentID = "O-0"; //Default as a child of the org

  // if (this.getUserParentID(slackUser.id)) {
  //   parentID = this.getUserParentID(slackUser.id)
  // }

  //Computed properties

  if (this.orgChart.structure[slackUser.id]) {
    parentID = this.orgChart.structure[slackUser.id]
  }

  var slackUserDisplayName = "";
  if (slackUser.real_name) {
    slackUserDisplayName = slackUser.real_name;
  } else {
    slackUserDisplayName = slackUser.profile.display_name
  }

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

  if (slackUser.id == "U49REUH2A") {
    var expandChildren = true;
  }

    if (slackUser.id == "U4998FVQC") {
    var expandChildren = true;
  }

  console.log(expandChildren)

  return   {
    nodeId: slackUser.id,
    id: slackUser.id,
    parentNodeId: parentID,
    width: 450,
    height: 94,
    slackUserDisplayName: slackUserDisplayName,
    accentColor: accentColor,
    title: slackUser.profile.title,
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
        slackUser.profile.image_192,
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
      '<div style="border-top: 3px solid '+accentColor+';"></div><div>\n                  <div style="margin-left:100px; margin-right:38px;\n                              margin-top:17px;\n                              font-size:30px;\n                              font-weight:bold; text-align: left;\n                         ">'+slackUserDisplayName+' </div>\n                 <div style="margin-left:100px; margin-right:38px;\n                              margin-top:3px;\n                              font-size:16px;text-align: left;\n                         ">'+slackUser.profile.title+'  </div>\n\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:14px;\n                         "></div>\n\n                 <div style="margin-left:196px;\n                             margin-top:15px;\n                             font-size:13px;\n                             position:absolute;\n                             bottom:5px;\n">             </div>',
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
fetchOrgDataUsers() {
  var globalScope = this;
  axios
  .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
  .then(function(response) {
    globalScope.slackUsers = response.data.data;
    globalScope.renderOrgChart();
  })
},
renderOrgChart() {
  var data = this.d3UsersList;
  
$('.chart-container').empty()
window.chart = new Chart()
  .container(".chart-container")
  .data(data)
  .svgWidth(window.innerWidth)
  .svgHeight(700)
  .initialZoom(0.6)
  .layout(this.chartLayout)
  .onNodeClick((d, e) => this.selectUser(d))
  .render();

$('.node').first().hide();

}
},
async mounted () {
      //For passing to our function
      var globalScope = this;

      //Org chart
      //If it exists in the DB, mount it in the view as orgChart. 
      // Otherwise, create the /org/chart endpoint.
      axios
      .get('/rest/org/chart')
      .then(function(response) {
        globalScope.orgChart = response.data;
        globalScope.fetchOrgDataUsers()
      }).catch(function(error) {
        if (error.response.data.code == 404) {
          console.log("Not found")
          axios.post('/rest/org', {_id: 'chart', structure: {}}).then(function(response) {
            globalScope.orgChart = response.data;
            globalScope.fetchOrgDataUsers()
          })
        }
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
<style scoped>
main {
  min-height: 100vh;
}
</style>

<template lang="pug">
main
  projects-modal(
    v-bind:modal="modal" 
    v-bind:okrs="okrs" 
    v-bind:selectedObjective="selectedObjective"
    v-bind:selectedTask="selectedTask"
    v-bind:lastSelectedTask="lastSelectedTask"

    v-on:refreshOKRData="refreshOKRData()" 
    v-on:updateModalState="updateModalState($event)"
    )
  .flex.w-full
    .flex(class="w-96")
      .flex-col.w-full
        sidebar-projects
    .flex-col(class="w-full bg-neutral-300 content_container")
  
      #home.all-content(class="content_container")

      section.content(v-if="currentPage == 'home'" class="w-full mt-8")
        div(class="md:px-12")
          section
              div(class="flex mt-8")
                div(class="block")
                  h2(class="text-title md:text-header font-bold font-aeries p-2") My tasks
                  div(class="hover:bg-neutral-400 text-blue-700 mt-2 font-bold cursor-pointer p-2" @click="showModal('taskAdd', true)") + Add new task
          section 
            table(class="w-full table-fixed")
              thead
                tr.border-b-4.border-neutral-600
                  th(class="font-aeries text-subhead p-4 pl-0 text-left w-3/12") Task
                  th(class="font-aeries text-subhead p-4 text-left w-2/12") Owner
                  th(class="font-aeries text-subhead p-4 text-left hidden xl:table-cell xl:w-3/12") Description
                  th(class="font-aeries text-subhead p-4 text-left w-1/12") Due
                  th(class="font-aeries text-subhead p-4 text-left w-1/12") Status
                  th(class="font-aeries text-subhead p-4 text-left xl:w-2/12 w-4/12") OKR
                  //- th(class="font-aeries text-subhead p-4 text-left w-1/12") Source
                  //- th(class="font-aeries text-subhead p-4 text-center w-2/12") Action
              tbody
                tr(v-for="task in allTasks" class="border-b border-neutral-500 hover:bg-neutral-400")
                  td(class="py-4 text-left pr-8") 
                    div.flex
                      .taskImage.pr-3.pt-1
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="20.954" rx="4" fill="#F7EFBE"/>
                        <rect x="8" y="5.98682" width="9" height="1.99562" rx="0.997812" fill="#FAA31B" fill-opacity="0.3"/>
                        <rect x="8" y="8.98047" width="9" height="1.99562" rx="0.997812" fill="#FAA31B" fill-opacity="0.3"/>
                        <rect x="8" y="11.9736" width="9" height="1.99562" rx="0.997812" fill="#FAA31B" fill-opacity="0.3"/>
                        <rect x="4" y="5.98682" width="2" height="1.99562" rx="0.997812" fill="#FAA31B" fill-opacity="0.66"/>
                        <rect x="4" y="8.98047" width="2" height="1.99562" rx="0.997812" fill="#FAA31B" fill-opacity="0.66"/>
                        <rect x="4" y="11.9736" width="2" height="1.99562" rx="0.997812" fill="#FAA31B" fill-opacity="0.66"/>
                        </svg>

                      .title(class="text-blue-700 cursor-pointer" @click="lastSelectedTask = Object.assign({}, task); selectedTask = task; showModal('taskView', true)") {{task.title}}
                  td(class="p-4 text-left") 
                    .avatar(v-for="owner in getSlackUserByID(task.owner)" @click="lastSelectedTask = Object.assign({}, task); selectedTask = task; showModal('taskView', true)" class="cursor-pointer inline py-3")
                      img(:src="owner.profile.image_192" :title="owner.real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2")
                      span(class="pl-1 pt-1 text-minimum-text") {{owner.real_name}}
                  td(class="p-4 text-left hidden xl:table-cell") 
                    p(class="break-all text-minimum-text cursor-pointer" @click="lastSelectedTask = Object.assign({}, task); selectedTask = task; showModal('taskView', true)" v-if="task.description") {{task.description}}
                  td(class="p-4 text-left cursor-pointer text-minimum-text" @click="lastSelectedTask = Object.assign({}, task); selectedTask = task; showModal('taskView', true)") {{task.due_date}}
                  td(class="p-4 text-left cursor-pointer text-minimum-text" @click="lastSelectedTask = Object.assign({}, task); selectedTask = task; showModal('taskView', true)") {{task.status}}
                  td(class="p-4 text-left title font-semi-bold text-blue-600 text-minimum-text")
                    span(v-if="task.linked_to_objective_id") {{fetchDataElementByID('objective', task.linked_to_objective_id).title}}
                  //- td(class="p-4 text-left") {{task.type}}
                  //- td(class="p-4 text-center")
                    a.text-blue-700.font-semi-bold Complete task
     
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        currentPage: "home",
        currentUser : "",
        currentUserID: "",
        selectedElement: {},
        selectedTask: {},
        lastSelectedTask: {},
        selectedObjective: {},
        elementRevertCopy: {},
        showAddDropdown: false,
        okrs: {
          "sessions" : [],
          "objectives" : [],
          "key_results" : [],
          "tasks" : []
        },
        modal : {
          show: false
        },
        myConfluenceTasks: [
          // {
          //   title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
          //   assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
          //   due: "29 Sep 2020",
          //   taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          // },
          // {
          //   title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
          //   assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
          //   due: "29 Sep 2020",
          //   taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          // },
          // {
          //   title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
          //   assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
          //   due: "29 Sep 2020",
          //   taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          // },
          // {
          //   title: "David Lin-Clark - make Workflow - Using \"Variables & Data Sets\" to generate business card PDFs",
          //   assignee: {name: "David Lin-Clark", confluenceUserID: "~david"},
          //   due: "29 Sep 2020",
          //   taskAppearsOn: {pageTitle: "Workflow - Business cards", pageURL: "https://docs.aeries.works/display/CD/Workflow+-+Business+cards?focusedTaskId=19"}
          // }
        ],
        myJiraTasks: [
          // {
          //     "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          //     "id": "13572",
          //     "self": "https://jira.aeries.works/rest/api/2/issue/13572",
          //     "key": "TDWW-322",
          //     "fields": {
          //         "issuetype": {
          //             "self": "https://jira.aeries.works/rest/api/2/issuetype/10001",
          //             "id": "10001",
          //             "description": "The sub-task of the issue",
          //             "iconUrl": "https://jira.aeries.works/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype",
          //             "name": "Sub-task",
          //             "subtask": true,
          //             "avatarId": 10316
          //         },
          //         "parent": {
          //             "id": "13565",
          //             "key": "TDWW-315",
          //             "self": "https://jira.aeries.works/rest/api/2/issue/13565",
          //             "fields": {
          //                 "summary": "System Admin Webinars - Fall 2019",
          //                 "status": {
          //                     "self": "https://jira.aeries.works/rest/api/2/status/10000",
          //                     "description": "",
          //                     "iconUrl": "https://jira.aeries.works/images/icons/status_generic.gif",
          //                     "name": "To Do",
          //                     "id": "10000",
          //                     "statusCategory": {
          //                         "self": "https://jira.aeries.works/rest/api/2/statuscategory/2",
          //                         "id": 2,
          //                         "key": "new",
          //                         "colorName": "blue-gray",
          //                         "name": "To Do"
          //                     }
          //                 },
          //                 "priority": {
          //                     "self": "https://jira.aeries.works/rest/api/2/priority/3",
          //                     "iconUrl": "https://jira.aeries.works/images/icons/priorities/medium.svg",
          //                     "name": "Medium",
          //                     "id": "3"
          //                 },
          //                 "issuetype": {
          //                     "self": "https://jira.aeries.works/rest/api/2/issuetype/10000",
          //                     "id": "10000",
          //                     "description": "A task that needs to be done.",
          //                     "iconUrl": "https://jira.aeries.works/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype",
          //                     "name": "Task",
          //                     "subtask": false,
          //                     "avatarId": 10318
          //                 }
          //             }
          //         },
          //         "components": [],
          //         "timespent": null,
          //         "timeoriginalestimate": null,
          //         "description": null,
          //         "project": {
          //             "self": "https://jira.aeries.works/rest/api/2/project/10301",
          //             "id": "10301",
          //             "key": "TDWW",
          //             "name": "Training Dept - Webinars & Workshops",
          //             "projectTypeKey": "software",
          //             "avatarUrls": {
          //                 "48x48": "https://jira.aeries.works/secure/projectavatar?avatarId=10324",
          //                 "24x24": "https://jira.aeries.works/secure/projectavatar?size=small&avatarId=10324",
          //                 "16x16": "https://jira.aeries.works/secure/projectavatar?size=xsmall&avatarId=10324",
          //                 "32x32": "https://jira.aeries.works/secure/projectavatar?size=medium&avatarId=10324"
          //             }
          //         },
          //         "customfield_10010": null,
          //         "fixVersions": [],
          //         "customfield_10011": null,
          //         "customfield_10012": null,
          //         "aggregatetimespent": null,
          //         "resolution": null,
          //         "customfield_10005": null,
          //         "customfield_10006": "{summaryBean=com.atlassian.jira.plugin.devstatus.rest.SummaryBean@74e102d7[summary={pullrequest=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@68092a19[overall=PullRequestOverallBean{stateCount=0, state='OPEN', details=PullRequestOverallDetails{openCount=0, mergedCount=0, declinedCount=0}},byInstanceType={}], build=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@10ce7628[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BuildOverallBean@3136cfca[failedBuildCount=0,successfulBuildCount=0,unknownBuildCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], review=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@75a78a5c[overall=com.atlassian.jira.plugin.devstatus.summary.beans.ReviewsOverallBean@3011397b[stateCount=0,state=<null>,dueDate=<null>,overDue=false,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], deployment-environment=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@530d6667[overall=com.atlassian.jira.plugin.devstatus.summary.beans.DeploymentOverallBean@5442ab53[topEnvironments=[],showProjects=false,successfulCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], repository=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@1d7e2eed[overall=com.atlassian.jira.plugin.devstatus.summary.beans.CommitOverallBean@249d16d8[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], branch=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@1c1b7272[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BranchOverallBean@5dc24a91[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}]},errors=[],configErrors=[]], devSummaryJson={\"cachedValue\":{\"errors\":[],\"configErrors\":[],\"summary\":{\"pullrequest\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"stateCount\":0,\"state\":\"OPEN\",\"details\":{\"openCount\":0,\"mergedCount\":0,\"declinedCount\":0,\"total\":0},\"open\":true},\"byInstanceType\":{}},\"build\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"failedBuildCount\":0,\"successfulBuildCount\":0,\"unknownBuildCount\":0},\"byInstanceType\":{}},\"review\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"stateCount\":0,\"state\":null,\"dueDate\":null,\"overDue\":false,\"completed\":false},\"byInstanceType\":{}},\"deployment-environment\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"topEnvironments\":[],\"showProjects\":false,\"successfulCount\":0},\"byInstanceType\":{}},\"repository\":{\"overall\":{\"count\":0,\"lastUpdated\":null},\"byInstanceType\":{}},\"branch\":{\"overall\":{\"count\":0,\"lastUpdated\":null},\"byInstanceType\":{}}}},\"isStale\":false}}",
          //         "customfield_10007": null,
          //         "customfield_10008": null,
          //         "customfield_10009": null,
          //         "aggregatetimeestimate": null,
          //         "resolutiondate": null,
          //         "workratio": -1,
          //         "summary": "Marketing Email",
          //         "lastViewed": null,
          //         "watches": {
          //             "self": "https://jira.aeries.works/rest/api/2/issue/TDWW-322/watchers",
          //             "watchCount": 1,
          //             "isWatching": false
          //         },
          //         "creator": {
          //             "self": "https://jira.aeries.works/rest/api/2/user?username=lara",
          //             "name": "lara",
          //             "key": "lara",
          //             "emailAddress": "lara@aeries.com",
          //             "avatarUrls": {
          //                 "48x48": "https://jira.aeries.works/secure/useravatar?ownerId=lara&avatarId=10728",
          //                 "24x24": "https://jira.aeries.works/secure/useravatar?size=small&ownerId=lara&avatarId=10728",
          //                 "16x16": "https://jira.aeries.works/secure/useravatar?size=xsmall&ownerId=lara&avatarId=10728",
          //                 "32x32": "https://jira.aeries.works/secure/useravatar?size=medium&ownerId=lara&avatarId=10728"
          //             },
          //             "displayName": "Lara Clickner",
          //             "active": true,
          //             "timeZone": "UTC"
          //         },
          //         "subtasks": [],
          //         "created": "2019-10-02T21:09:23.000+0000",
          //         "reporter": {
          //             "self": "https://jira.aeries.works/rest/api/2/user?username=lara",
          //             "name": "lara",
          //             "key": "lara",
          //             "emailAddress": "lara@aeries.com",
          //             "avatarUrls": {
          //                 "48x48": "https://jira.aeries.works/secure/useravatar?ownerId=lara&avatarId=10728",
          //                 "24x24": "https://jira.aeries.works/secure/useravatar?size=small&ownerId=lara&avatarId=10728",
          //                 "16x16": "https://jira.aeries.works/secure/useravatar?size=xsmall&ownerId=lara&avatarId=10728",
          //                 "32x32": "https://jira.aeries.works/secure/useravatar?size=medium&ownerId=lara&avatarId=10728"
          //             },
          //             "displayName": "Lara Clickner",
          //             "active": true,
          //             "timeZone": "UTC"
          //         },
          //         "customfield_10000": "0|i00ar3:",
          //         "aggregateprogress": {
          //             "progress": 0,
          //             "total": 0
          //         },
          //         "customfield_10001": null,
          //         "priority": {
          //             "self": "https://jira.aeries.works/rest/api/2/priority/3",
          //             "iconUrl": "https://jira.aeries.works/images/icons/priorities/medium.svg",
          //             "name": "Medium",
          //             "id": "3"
          //         },
          //         "customfield_10100": null,
          //         "customfield_10101": null,
          //         "customfield_10102": null,
          //         "labels": [],
          //         "customfield_10103": null,
          //         "environment": null,
          //         "timeestimate": null,
          //         "aggregatetimeoriginalestimate": null,
          //         "versions": [],
          //         "duedate": null,
          //         "progress": {
          //             "progress": 0,
          //             "total": 0
          //         },
          //         "issuelinks": [],
          //         "votes": {
          //             "self": "https://jira.aeries.works/rest/api/2/issue/TDWW-322/votes",
          //             "votes": 0,
          //             "hasVoted": false
          //         },
          //         "assignee": {
          //             "self": "https://jira.aeries.works/rest/api/2/user?username=david",
          //             "name": "david",
          //             "key": "david",
          //             "emailAddress": "davidc@aeries.com",
          //             "avatarUrls": {
          //                 "48x48": "https://jira.aeries.works/secure/useravatar?ownerId=david&avatarId=11000",
          //                 "24x24": "https://jira.aeries.works/secure/useravatar?size=small&ownerId=david&avatarId=11000",
          //                 "16x16": "https://jira.aeries.works/secure/useravatar?size=xsmall&ownerId=david&avatarId=11000",
          //                 "32x32": "https://jira.aeries.works/secure/useravatar?size=medium&ownerId=david&avatarId=11000"
          //             },
          //             "displayName": "David Lin-Clark",
          //             "active": true,
          //             "timeZone": "America/Los_Angeles"
          //         },
          //         "updated": "2019-10-02T21:09:23.000+0000",
          //         "status": {
          //             "self": "https://jira.aeries.works/rest/api/2/status/10000",
          //             "description": "",
          //             "iconUrl": "https://jira.aeries.works/images/icons/status_generic.gif",
          //             "name": "To Do",
          //             "id": "10000",
          //             "statusCategory": {
          //                 "self": "https://jira.aeries.works/rest/api/2/statuscategory/2",
          //                 "id": 2,
          //                 "key": "new",
          //                 "colorName": "blue-gray",
          //                 "name": "To Do"
          //             }
          //         }
          //     }
          // }
        ],
        objectives: [
          // {
          //   title: "Launch internal ADL tool",
          //   owner: "Design",
          //   keyResults: [
          //     {
          //     title: "Create assets",
          //     description: "Creation of assets like illustrations, powerpoints, marketing templates, emails, colors, fonts, and other design patterns.",
          //     dueDate: "15 Oct 2020",
          //     status: "In progress"
          //     },
          //     {
          //     title: "Internal soft launch",
          //     description: "Launch a repository of often-updated on-brand, on-message templates for collateral that can be cloned and used for any department's needs. These templates will be the first big investment of effort utilizing the complete and whole Aeries Design Language.",
          //     dueDate: "30 Oct 2020",
          //     status: "Not started"
          //     },
          //     {
          //     title: "Ongoing publishing and iteration",
          //     description: "Publish, iterate, and amplify the design system across all teams so there is a continual discourse on what needs to be added or updated. During this period, hunt down instances of off-brand material and work with the creator(s) to get it updated.",
          //     dueDate: "13 Nov 2020",
          //     status: "Not started"
          //     },
          //   ],
          //   description: "Build tools, workflows, resources and assets to form a cohesive Aeries Design Language, so that we can better support sales & marketing campaigns, design beautiful and consistent product UIs, and maintain clear and concise brand standards and guidelines. A primary goal for this objective is a focus on self-serve functionality, as the Aeries Design Language should be highly accessible for all stakeholders - sales, marketing, programming, the event/trade show team, presenters, and customers."
          // }
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
        slackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
    }
  },
  computed: {
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
    updateModalState(newModalObj) {
    this.modal = newModalObj;    
  },
  showModal(type, show) {
    this.modal.type = type;
    this.modal.show = show;
  },
getSlackUserByID(slackUserID) {
  for (var i = 0; i < this.slackUsers.length; i++) {
    if (this.slackUsers[i].id == slackUserID) {
      return [this.slackUsers[i]];
    }
  }
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
async mounted () {
      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.slackUsers = response.data.data;
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

      //
      //OKRs
      //

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


      $('body').on('click', function(e) {
      if (e.target.id !== "add") {
        globalScope.showAddDropdown = false;
      }
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
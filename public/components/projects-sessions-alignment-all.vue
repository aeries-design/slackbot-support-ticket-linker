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
  .flex.w-full
    .flex(class="w-96")
      .flex-col.w-full
        sidebar-projects
    .flex-col(class="w-full bg-neutral-300 content_container ")
      header(class="border-b border-neutral-500 bg-white text-neutral-1900 py-3 flex justify-between items-center")
        div(class="px-2 md:px-8")
          strong(class="font-aeries text-title tracking-tight mr-6")
              a(href="/") All Sessions
          div.mt-4.inline-block
            strong(class="text-subhead tracking-tight mr-6 py-4")
                a(:href='"/projects/sessions/"') Timeline
            strong(class="text-subhead tracking-tight mr-4 py-4 border-b-4 border-blue-600")
                a(:href='"/projects/goals/alignment"') Alignment
        div(class="px-2 md:px-8")
          a(class="tracking-tight bg-blue-700 p-2 px-6 rounded-full mr-4 text-white font-bold cursor-pointer" @click="showAddObjective()")
              span +  Create OKR

          
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
        section
          .chart-container#teamChart.bg-neutral-300
</template>

<script>
const axios = require('axios');

import Chart from '../javascripts/d3-org-chart.js'

var d3NoParentElement = {
    nodeId: "O-1",
    parentNodeId: "O-0",
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
      '<div style="border-top: 3px solid black;"></div><div>\n                  <div style="margin-left:20px; margin-right:38px;\n                              margin-top:17px;\n                              font-size:30px;\n                              font-weight:bold; text-align: left;\n                         ">No parent found </div>\n                 <div style="margin-left:20px; margin-right:38px;\n                              margin-top:3px;\n                              font-size:16px;text-align: left;\n                         ">  </div>\n\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:14px;\n                         "></div>\n\n                 <div style="margin-left:196px;\n                             margin-top:15px;\n                             font-size:13px;\n                             position:absolute;\n                             bottom:5px;\n">             </div>',
    connectorLineColor: {
      red: 192,
      green: 198,
      blue: 208,
      alpha: 1
    },
    connectorLineWidth: 5,
    dashArray: "",
    expanded: false
  }

var d3RootElement = {
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
    expanded: true
}

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
        chart: {},
        chartLayout: 'h',
        okrs: {
          "sessions" : [],
          "objectives" : [],
          "key_results" : [],
          "tasks" : []
        },
        modal : {show: false},
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
        allSlackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
        dummyID: "hi"
    }
  },
  computed: {
    alignmentData() {
      //All sessions and OKRs
      return this.okrs.tasks.concat(this.okrs.sessions.concat(this.okrs.objectives))
    },
        currentSession() {
      var currentSessionID = this.dummyID;
      for (var i = 0; i < this.okrs.sessions.length; i++) {
        if (this.okrs.sessions[i]._id == currentSessionID) {
          return this.okrs.sessions[i]
        }
      }
    },
    d3TeamsList() {
      var d3TeamsList = [];
      
      //Push the root element (which is the Aeries Software organization).
      d3TeamsList.push(d3RootElement);
      
      for (var i = 0; i < this.teams.length; i++) {
          d3TeamsList.push(this.convertTeamToD3Object(this.teams[i]));
      }
      return d3TeamsList;
    },
    d3ObjectsList() {
      var d3ObjectsList = [];
      
      //Push the root element (which is the Aeries Software organization).
      d3ObjectsList.push(d3RootElement);
      d3ObjectsList.push(d3NoParentElement);
      
      for (var i = 0; i < this.alignmentData.length; i++) {
          var d3Object = this.convertAlignmentDataToD3Object(this.alignmentData[i]);
          if (d3Object && this.alignmentData[i].deleted !== true) {
            d3ObjectsList.push(d3Object);
          }
      }
      return d3ObjectsList;
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
                        
                        globalScope.renderOrgChart();

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
  } else if (!type) {
    listRef = this.alignmentData;
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
renderOrgChart() {

  var originalData = this.d3ObjectsList;
  var data = [];

  function parentExistsInData(parentID) {
    if (parentID == null) {
      return true;
    } else {
      for (var i = 0; i < originalData.length; i++) {
        if (originalData[i].nodeId == parentID) {
          return true;
        }
      }
      return false;
    }
  }

  for (var i = 0; i < originalData.length; i++) {
    if (parentExistsInData(originalData[i].parentNodeId)) {
      data.push(originalData[i]);
    } else {
      originalData[i].parentNodeId = "O-1";
      data.push(originalData[i]);
    }
  }

console.log(data)
$('.chart-container').empty()
window.chart = new Chart()
  .container(".chart-container")
  .data(data)
  .svgWidth(window.innerWidth)
  .svgHeight(700)
  .initialZoom(0.6)
  .layout(this.chartLayout)
  .onNodeClick((d, e) => this.selectElement(e, this.fetchDataElementByID(false, d)))
  .render();

$('.node').first().hide();

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

IDExistsInOKRData(id, type) {
//A function to confirm an ID exists in the OKR data, undeleted.

var allOKRData = [];

if (type) {
  allOKRData = this.okrs[type];
} else {
  allOKRData = this.okrs.sessions.concat(this.okrs.objectives, this.okrs.key_results, this.okrs.tasks);
}

for (var i = 0; i < allOKRData.length; i++) {
  if (allOKRData._id == id) {
    return true
  }
}

return false

},
//convertSessionOrObjectiveToD3Object
convertAlignmentDataToD3Object(data) {

  var parentID = "O-1"; //Default as a child of No Parent Found
  
  var includeObject = true;

  // if (this.getUserParentID(slackUser.id)) {
  //   parentID = this.getUserParentID(slackUser.id)
  // }

  //Exposed vars


//- If it's a task, check if it has a parent. If not, send it to No Parent Found.
  if (data.type == "Aeriesworks Task") {
    if (data.linked_to_objective_id !== "") {
      parentID = data.linked_to_objective_id
    } else {
      includeObject = true;
    }
  }

//- If it's a session, check if it has a parent. If not, attach it to the inserted top-level object.
  if (data.type == "session") {
    if (data.parent_session !== "") {
      parentID = data.parent_session
    } else {
      parentID = "O-0"
    }
  }

//- If it's an OKR, check if it has a parent. If not, attach it to its session.
  if (data.type == "objective") {
    if (data.aligned_to_objective_id !== "") {
      if (this.IDExistsInOKRData(data.aligned_to_objective_id, 'objectives')) {
        parentID = data.aligned_to_objective_id
      } else if (data.session_id) {
        parentID = data.session_id;
      }
    } else {
      if (data.session_id) {
          parentID = data.session_id;
        } else {
          includeObject = true;
        }

        //This is an objective without a session. Don't include it in this list.
        includeObject = true;
      }
    }

  var displayName = data.title;

  var description = data.description;

  // User's default accent color
  var accentColor = "#000";

  var fontSize = "42px";

  var height = 94;

  var width = 500;

  var childTemplate = "";
  if (data.type == "objective") {

  if (displayName.length > 100) {
    height = 170;
    console.log(length)
  }

    fontSize = "30px";
    
    if (displayName.length > 86) {
      displayName = displayName.substring(0, 86) + '...';
    }

    width = 750;
    height = 110;
    if (data.key_results.length) {
      height = 150;
      childTemplate = "<hr class='my-3 border-neutral-600 border-2'>"
      for (var i = 0; i < data.key_results.length; i++) {
        childTemplate += `<div onclick="console.log('${data.key_results[i]._id}')" class='text-title mb-2'>
        <img class="w-8 inline" src="/images/metric.svg" title="Key result">
        <span>${data.key_results[i].title}</span>
        </div>`
        height += 40;
      }
    }
  }


  if (data.type == "Aeriesworks Task") {
    fontSize = "26px";
    width = 600;
    if (displayName.length > 70) {
      displayName = displayName.substring(0, 70) + '...';
    }
  }
  
  //Element type icon
  var icon = '';
  if (data.type == "session") {
    icon = '<img class="inline w-12 pr-2" src="/images/session.svg" title="Session">';
  } else if (data.type == "objective") {
    icon = '<img class="inline w-12" src="/images/goal.svg" title="Objective">';
  } else if (data.type == "key_result") {
    icon = '<img class="inline" src="/images/metric.svg" title="Key result">';
  } else if (data.type == "Aeriesworks Task") {
    icon = '<img class="inline w-12 pr-2" src="/images/task.svg" title="Task">';
  }
  //TODO: Color-coded users by primary team


  //Only auto-expand those with less than 6 direct reports for on-load readability
  // var expandChildren = false;

  // var numberOfChildren = this.getNumberOfChildren(slackUser.id);
  // if (numberOfChildren.count < 9) {
  //   console.log(slackUser.profile.real_name, numberOfChildren.count)
  //   var expandChildren = true;
  // }

  var expandChildren = false;

  if (data.type == "session" && !data.parent_session) {
    expandChildren = true;
  }

if (includeObject) {
  return  {
    nodeId: data._id,
    parentNodeId: parentID,
    width: width,
    height: height,
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
      `<div style="border-top: 3px solid ${accentColor};"></div>
      <div class="flex">
        <div class="font-aeries flex-col my-5 ml-4 w-1/12" style="font-size:${fontSize};font-weight:bold; text-align: left;">${icon}</div> 
        <div class="font-aeries flex-col my-5 w-11/12 pr-4" style="font-size:${fontSize};font-weight:bold; text-align: left;">${displayName}</div> 
      </div>
      <div class="flex flex-row">
        <div class="mx-5 flex-row w-full">${childTemplate}</div>
      </div>`,
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
} else {
  return false
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
      '<div style="border-top: 3px solid '+accentColor+';"></div><div>\n                  <div style="margin-left:20px; margin-right:38px;\n                              margin-top:17px;\n                              font-size:30px;\n                              font-weight:bold; text-align: left;\n                         ">'+teamDisplayName+' </div>\n                 <div style="margin-left:20px; margin-right:38px;\n                              margin-top:3px;\n                              font-size:16px;text-align: left;\n                         ">'+team.description+'  </div>\n\n                 <div style="margin-left:70px;\n                              margin-top:3px;\n                              font-size:14px;\n                         "></div>\n\n                 <div style="margin-left:196px;\n                             margin-top:15px;\n                             font-size:13px;\n                             position:absolute;\n                             bottom:5px;\n">             </div>',
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
}
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
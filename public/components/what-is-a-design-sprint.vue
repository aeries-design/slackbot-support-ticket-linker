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
          h2.text-xx-large.font-bold.font-aeries.py-10.text-white What is a design sprint?

      div.content.pt-24.mt-4.big-dreams
        div.container.flex.text-subhead
          div(class="w-2/6 font-aeries font-bold")
            <svg class="inline" width="27" height="3" viewBox="0 0 27 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="27" height="3" fill="#0C1E41"/>
            </svg>

            span.pl-4 It starts with planning
          div(class="w-4/6") 
            p.mb-6 We meet on Mondays for #[strong sprint planning] to look at all the tasks we need to complete, both now and later. We identify which tasks are big and which ones are little. Then we take big ones and turn them into many little tasks.
            p.mb-6 Then we add little tasks to to our “to do” column for the week, and then do them.
            p.mb-6 Sometimes this meeting can be long, e.g. during an influx of work to be triaged or complicated task to be broken down.
        
        div.container.flex.text-subhead.mt-24
          div(class="w-2/6 font-aeries font-bold")
            <svg class="inline" width="27" height="3" viewBox="0 0 27 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="27" height="3" fill="#0C1E41"/>
            </svg>

            span.pl-4 Then keep at it
          div(class="w-4/6") 
            p.mb-6 Tuesday to Thursday we meet for our #[strong 10 minute daily standup] for the purposes of discussing the progression of our plan for the week.  Others can join or watch the recording later to provide feedback through #[a.font-bold.text-blue-700(href="/meetings") MeetingChat.]
            p.mb-6 This gives an opportunity to adjust course, collaborate, and help each other lift any roadblocks. We can also do a mini-sprint planning for any new tasks.
            p.mb-6 As progress is reflected in task data, the dashboard shows whether we're behind or on track. The estimated completion date of big tasks is updated as well. 

        div.container.flex.text-subhead.mt-24
          div(class="w-2/6 font-aeries font-bold")
            <svg class="inline" width="27" height="3" viewBox="0 0 27 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="27" height="3" fill="#0C1E41"/>
            </svg>

            span.pl-4 Then look back
          div(class="w-4/6") 
            p.mb-6 At the end of the week, we meet for our #[strong 30 minute retrospective] where we review what went well, what did not go well, and discuss what if anything we can do to help set up the following week’s planning for success.
            p.mb-6 We might often find that tasks we thought were little were bigger than expected and vice versa, which can be helpful for future reference.

        div.container.flex.text-subhead.mt-24.mb-48
          div(class="w-2/6 font-aeries font-bold")
            <svg class="inline" width="27" height="3" viewBox="0 0 27 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="27" height="3" fill="#0C1E41"/>
            </svg>

            span.pl-4 Communicate it out
          div(class="w-4/6") 
              p.mb-6 Also on Friday, we publish our weekly company newsletter, This Week In Design. This lets us showcase our work, provide any updates for stakeholders, and helps give each sprint more personality and distinction.

              p.mb-6 Also GIFs.
              a(class="cursor-pointer block mt-12 py-2 bg-blue-700 w-2/5 text-center text-white font-semi-bold font-aeries" href="/design/sprint") Explore design sprints

</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        currentUser : "",
        littleTasks : [
          {
            title: "Update brand assets on ADL dashboard",
            image: "/images/icon-graphic-design.svg"
          },
          {
            title: "Business card for Michael Gerkhe",
            image: "/images/icon-business-card.svg"
          },
          {
            title: "Business card for Sonia Miramontes",
            image: "/images/icon-business-card.svg"
          },
          {
            title: "Business card for Scott Knuckles",
            image: "/images/icon-business-card.svg"
          },
          {
            title: "AeriesCon preview email",
            image: "/images/icon-emails.svg"
          },
          {
            title: "Publish new Gradebook video series",
            image: "/images/icon-video-editing.svg"
          },
          {
            title: "Investigate Aeries Academy optimization",
            image: "/images/icon-general-request.svg"
          },
          {
            title: "Increase Confluence concurrent editors",
            image: "/images/icon-general-request.svg"
          },
        ]
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
}
},
async mounted () {
      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true')
      .then(function(response) {
        globalScope.totalSlackUsers = response.data.total;
      })

      //Confluence
      axios
      .get('/rest/users?platform=confluence&is_bot[$ne]=true')
      .then(function(response) {
        globalScope.totalConfluenceUsers = response.data.total;
      })
      
      //Slack
      axios
      .get('/rest/users?platform=jira&is_bot[$ne]=true')
      .then(function(response) {
        globalScope.totalJiraUsers = response.data.total;
      })



    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
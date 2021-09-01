<style scoped>
.app-container {
height: calc(100vh - 60px);
}

.sidebar-container {
  background-color: #F6F8FA;
}

</style>

<template lang="pug">
main
  modal(v-if='showSlackUserModal' @close='showSlackUserModal = false')
    // you can use custom content here to overwrite default content
    h3(slot='header') Select Slack users
    div(slot="body")
        slack-users-list-modal(v-on:update:selectedUsers="selectedUsers = $event")
    div(slot="footer")
        button.font-bold.modal-default-button.ml-6(@click="showSlackUserModal = false")
            | OK
  section.flex.app-container
    div(class="w-4/5 prototype-container bg-neutral-500")
      div(class="background-label background-label h-full flex flex-col justify-center") 
        h1.flex.self-center.font-aeries.font-bold.text-xx-large.text-neutral-700 No prototype selected
        p.flex.self-center.text-neutral-700 Select one in the sidebar to provide feedback
      
    div(class="w-1/5 sidebar-container").h-full.py-4.border-l-2.border-neutral-600.overflow-y-scroll
      
      .create-prototype-container(v-if="sidebarPage == 'showCreateNewPrototype'")
        .all-remote-feedback.px-3
          .cursor-pointer.font-aeries.font-bold.text-subhead.mb-4(@click="sidebarPage = ''") « Back
          div.mt-3
            .italic.text-minimum-text Title
            input(v-model="newPrototype.title" placeholder="e.g. Aeries.com redesign - Homepage" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div.mt-3
            .italic.text-minimum-text Prototype Iframe URL
            input(v-model="newPrototype.figmaURL" placeholder="e.g. https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F6IeWspNcbBntaqB6mHtsej%2FWebsite-Components%3Fscaling%3Dscale-down-width%26node-id%3D265%253A38&chrome=DOCUMENTATION" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div.mt-3
            .italic.text-minimum-text Thumbnail URL
            input(v-model="newPrototype.thumbnailFilename" placeholder="e.g. https://i.imgur.com/P8FKOgu.png" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div.mt-3
            .italic.text-minimum-text Designer
            input(v-model="newPrototype.designer" placeholder="e.g. Zachary Guerrero" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div.mt-3
            .italic.text-minimum-text Feedback item created by
            div(class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2") {{currentUser}}
          div.mt-3
            .italic.text-minimum-text Feedback phase
            select(v-model="newPrototype.phase").w-full.font-aeries.font-bold.leading-tight.inline-block.bg-neutral-500.p-2.mb-1
              option Primary
              option Secondary
              option Tertiary
          div.mt-3
            .italic.text-minimum-text Type
            select(v-model="newPrototype.type").w-full.font-aeries.font-bold.leading-tight.inline-block.bg-neutral-500.p-2.mb-1
              option Webpage prototype
              option Product prototype
              option General prototype
          div.mt-3
            .italic.text-minimum-text Stakeholders
            input(@click="showSlackUserModal = true" v-model="slackTagList" placeholder="Click here to open user select..." class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
            div.mt-3
            .italic.text-minimum-text Required reading (comma-separated list of Conf doc IDs)
            input(v-model="requiredReading" placeholder="e.g. 37355561,37355562,37355563" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div.mt-3
            .italic.text-minimum-text Questions
            .feedback(v-for="question in newPrototype.feedback")
              input(v-model="question.title" placeholder="e.g. What are your first impressions?" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2 mb-4")
            div.mt-3
              a(@click="addNewQuestion()").text-blue-600.cursor-pointer + Add new question
          
          .divider.border-b.border-neutral-600.pb-4
          div(@click="addNewPrototype()" class="w-3/4 cursor-pointer mt-4 block py-2 bg-blue-700 text-center text-white font-semi-bold font-aeries") Create prototype
          
      div.px-3(v-if="sidebarPage == ''")
        h1.font-aeries.font-bold.text-display Hi {{currentUser.split(' ')[0]}}!
        //- p.mt-2 You are #[b not listed] as a stakeholder on any prototypes.
        p We could use your help. Consider giving feedback on one or more of these items?
        p.mt-4 
        a.text-blue-600.cursor-pointer.text-minimum-text(@click="sidebarPage = 'showCreateNewPrototype'") + Add new design prototype
        .divider.border-b.border-neutral-600.pb-4

        div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-4 row-gap-8 mt-6")
          a(:href="'/figma/feedback/' + proto._id" v-for="proto in prototypes" v-if="proto.deleted !== true" class="cursor-pointer")
            div.text-minimum-text.text-neutral-1200 {{proto.type}}
            div(class="uptime-report bg-white rounded shadow-md")
              div.mb-4
                img(:src="proto.thumbnailFilename" class="border-b border-neutral-600 rounded-t w-full")
              div.pb-4
                h2.font-aeries.font-bold.px-3 {{proto.title}}
                p.text-minimum-text.text-neutral-1000.px-3.pt-3 {{proto.phase}}

      
</template>

<script>

const axios = require('axios');

module.exports = {
  
data() {
    return {
        currentUser : "",
        currentUserID: "",
        prototypes: [],
        showSlackUserModal: false,
        sidebarPage: "",
        selectedUsers: [],
        requiredReading: "",
        newPrototype: {
        feedback: [{title: "", type: "textarea"}],
        stakeholders: []
        }
    }
  },
methods : {
  addNewPrototype() {
    var dataPayload = this.newPrototype;
    dataPayload.requiredReading = this.requiredReadingToArray;
    dataPayload.stakeholders = this.selectedUsersCooked;
    var globalScope = this;
    axios.post('/rest/figma-prototypes/', dataPayload)
      .then(function (response) {
          console.log(response);
          globalScope.prototypes.push(dataPayload);
          globalScope.sidebarPage = "";
      })
      .catch(function (error) {
          console.log(error);
    })
  },
  addNewQuestion() {
    this.newPrototype.feedback.push(
      {title: "", type: "textarea"}
    )
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
}
},
computed : {
    requiredReadingToArray() {
      return this.requiredReading.split(',');
    },
    selectedUsersCooked() {
      var users = this.selectedUsers;
      var newUsers = [];
      

      for (var i = 0; i < users.length; i++) {
        if (users[i].selected == true) {
          newUsers.push({
            type: "",
            user: users[i].real_name,
            userSlackID: users[i].id
          });
        }
      }

    return newUsers;
    },
    slackTagList() {
    var slackTagList = [];
    for (var i = 0; i < this.selectedUsers.length; i++) {
        if (this.selectedUsers[i].profile.real_name) {
          slackTagList.push("@" + this.selectedUsers[i].real_name);
        } else if (this.users[i].profile.display_name) {
          slackTagList.push("@" + this.selectedUsers[i].profile.display_name);
        } else {
          slackTagList.push("@" + this.selectedUsers[i].name);
        }
    }
    return slackTagList.join(", ");
  }
},
async mounted () {

      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/figma-prototypes')
      .then(function(response) {
        globalScope.prototypes = response.data.data;
      })

if (document.querySelector('.prototype-iframe')) {
    var prototypeContainerWidth = document.querySelector('.prototype-container').offsetWidth
    var prototypeContainerHeight = document.querySelector('.prototype-container').offsetHeight

    document.querySelector('.prototype-iframe').width = prototypeContainerWidth;
    document.querySelector('.prototype-iframe').height = prototypeContainerHeight;
}

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
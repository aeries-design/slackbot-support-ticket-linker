<style scoped>
.text-massive {
  font-size: 96px;
  line-height: 80px;
}
</style>

<template lang="pug">
main
  
  section
    div
      div.flex.m-12.shadow-lg
        div(class="flex flex-col w-1/6 bg-white rounded-l p-4")
          div
            h2.font-aeries.font-bold #[a(href="/design/") Design] » Asset Procurement
          div.flex.flex-col.h-full
            .icon
            h1.text-title.font-bold.font-aeries.pt-6 Assets to procure
            p.text-minimum-text.pb-6 This dashboard shows a list of assets that have been flagged by the design team for procurement.
            h2.font-aeries.font-bold.pb-2 Add new asset
            p.text-minimum-text.pb-6 The system will take a screenshot of the page at the URL you provide and add it to this list. 
            div.inputs
              input(v-model="assetSubmission.url" placeholder="Paste URL to envato/freepik/etc" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
              textarea(v-model="assetSubmission.description" placeholder="Why should we procure this asset?" class="w-full mt-4 font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
              a(v-if="fetching == false" class="cursor-pointer block mt-4 py-2 bg-blue-700 text-center text-white font-semi-bold font-aeries" @click="addAsset()") Add asset
              a(v-if="fetching == true" class="cursor-not-allowed opacity-50 block mt-4 py-2 bg-blue-700 text-center text-white font-semi-bold font-aeries") Fetching...
        div(class="w-5/6 bg-neutral-400 py-12 px-8 rounded-r")
          h1.text-title.font-bold.font-aeries Submitted assets
          div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 col-gap-8 row-gap-8 mt-6")
            div(v-for="pip in assets")
              div.text-minimum-text.text-neutral-1200 {{timeSince(new Date(pip.timestamp))}} ago
              div(class="uptime-report bg-white rounded shadow-md")
                div.mb-4
                  img(:src="pip.screenshotPath" @click="openLink(pip.url)" class="border-b border-neutral-600 rounded-t cursor-pointer")
                div.pb-4
                  h2.text-subhead.font-aeries.font-bold.px-3.cursor-pointer(@click="openLink(pip.url)") {{pip.title}}
                  div.px-3.pt-4
                    a.cursor-pointer.text-blue-700.text-minimum-text(@click="moveAssetToJira(pip)") Convert asset to Jira task »
              div.text-minimum-text.text-neutral-1200.pt-4 #[b {{pip.submitter}}] says: 
              div.text-minimum-text.text-neutral-1200 {{pip.description}}

</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        selectedPage: "home",
        fetching: false,
        selectedReport: {},
        selectedPip: {},
        showUptimeReportModal: false,
        assets : [],
        currentUser : "",
        assetSubmission: {
          url: "",
          description: "",
        }
        
    }
  },
methods : {
addAsset() {
    this.fetching = true;
    var thisScope = this;
    var data = this.assetSubmission;
    data.submitter = this.currentUser;

    axios.post('/api/add-asset-procurement', data)
    .then(function (response) {
        console.log(response);
        window.location.reload();
    })
    .catch(function (error) {
        alert("Something went wrong: " + error)
        console.log(error);
    });

  },
  openLink(link) {
    window.open(link, "_blank");
},
moveAssetToJira(asset) {
  if (confirm("This asset will be removed from this dashboard and added to the backlog of the Design work queue. Continue?")) {
    
    var taskData = {
      project: "DSGNQUEUE", 
      summary: "Asset procurement - " + asset.title, 
      priority: "Medium", 
      description: asset.url + "\n " + asset.description
    }

    this.deleteAssetCreateJiraTask(asset, taskData);
  }
},
deleteAssetCreateJiraTask(asset, taskData) {
    axios.delete('/rest/sentinel-asset-procurement/' + asset._id)
    .then(function (response) {
        console.log(response);

        axios.post('/api/create-jira-task', taskData)
        .then(function (response) {
            console.log(response);
            window.open('https://jira.aeries.works/secure/RapidBoard.jspa?rapidView=18&view=detail&selectedIssue=' + response.data.key)
            window.location.reload();
        })
        .catch(function (error) {
            alert("Something went wrong: " + error)
            console.log(error);
        });

    })
    .catch(function (error) {
        alert("Something went wrong: " + error)
        console.log(error);
    });

},
timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
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
getCurrentUser() {
  return this.currentUser;
}
},
async mounted () {
      
      var globalScope = this;

      //Assets
      axios
      .get('/rest/sentinel-asset-procurement?$limit=9999&$sort[timestamp]=-1')
      .then(function(response) {
        globalScope.assets = response.data.data;
      })

    if (this.$attrs.idofselectedpage) {
      this.selectedPage = this.$attrs.idofselectedpage.id;
    }

    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
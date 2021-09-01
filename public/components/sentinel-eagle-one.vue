<style scoped>
.text-massive {
  font-size: 96px;
  line-height: 80px;
}
</style>

<template lang="pug">
main
  // use the modal component, pass in the prop
  modal(v-if='showUptimeReportModal' @close='hideModal()')
      // you can use custom content here to overwrite default content
      h3(slot='header') {{selectedReport.name}} uptime report - {{new Date(selectedPip.timestamp).toLocaleString()}} ({{timeSince(new Date(selectedPip.timestamp))}} ago)
      div(slot="body")
        div(class="w-full")
          div(class="flex flex-col w-full bg-neutral-500 rounded-l")
            h1.text-display.font-bold.font-aeries.pt-6.leading-tight.px-8 Metrics
            div(class="flex w-full px-8")
                div(class="w-1/2")
                  div.my-4
                    h2.text-subhead.font-aeries.font-bold.pb-2 Timestamp 
                    p.text-minimum-text The timestamp when the metrics sample was taken.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.Timestamp}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 Documents 
                    p.text-minimum-text Number of documents in the page.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.Documents}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 Frames 
                    p.text-minimum-text Number of frames in the page.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.Frames}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 JSEventListeners 
                    p.text-minimum-text Number of events in the page.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.JSEventListeners}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 Nodes 
                    p.text-minimum-text Number of DOM nodes in the page.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.Nodes}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 LayoutCount 
                    p.text-minimum-text Total number of full or partial page layout.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.LayoutCount}}
                div(class="w-1/2")
                  div.my-4
                    h2.text-subhead.font-aeries.font-bold.pb-2 RecalcStyleCount 
                    p.text-minimum-text Total number of page style recalculations.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.RecalcStyleCount}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 LayoutDuration 
                    p.text-minimum-text Combined durations of all page layouts.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.LayoutDuration}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 RecalcStyleDuration 
                    p.text-minimum-text Combined duration of all page style recalculations.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.RecalcStyleDuration}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 ScriptDuration 
                    p.text-minimum-text Combined duration of JavaScript execution.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.ScriptDuration}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 TaskDuration 
                    p.text-minimum-text Combined duration of all tasks performed by the browser.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.TaskDuration}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 JSHeapUsedSize 
                    p.text-minimum-text Used JavaScript heap size.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.JSHeapUsedSize}}
                  div.mb-8
                    h2.text-subhead.font-aeries.font-bold.pb-2 JSHeapTotalSize 
                    p.text-minimum-text Total JavaScript heap size.
                    h2.text-title.font-bold.font-aeries {{selectedPip.metrics.JSHeapTotalSize}}
            h1.text-display.font-bold.font-aeries.pt-6.leading-tight.px-8.mb-8 Screenshot
            div(class="flex w-full px-8")
              img(:src="selectedPip.screenshotPath" class="border-b border-neutral-600 rounded-t")
            
      div(slot="footer")
          button.font-bold.modal-default-button.ml-6(@click="hideModal()")
              | OK
  
  
  
  section(v-if="selectedPage == 'home'")
    div.container.flex.mt-12
      div(class="flex flex-col w-2/5 bg-neutral-500 p-4 rounded-l")
        div
          p.font-aeries.font-bold #[a(href="/sentinel/") Sentinel] » EagleOne
        div.flex.flex-col.h-full.justify-center.px-8
          h1.text-massive.font-bold.font-aeries.pt-6.leading-tight.my-8 Is it still up?
          p.text-minimum-text.pb-6 Regularly pinging our critical sites and tools that would impact customer experience or internal workflows during downtime.
      div(class="w-3/5 bg-white py-12 px-8 rounded-r")
        h1.text-title.font-bold.font-aeries.pt-6 Uptime dashboard - critical sites & tools
        div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-8 row-gap-8 mt-6")
          div(v-for="site in sites" @click="changeSelectedPage(site.siteID)" v-bind:style="{ backgroundColor: site.backgroundColor}" class="cursor-pointer uptime-report rounded p-3 shadow-md text-center")
            .icon.bg-white.p-2.inline-flex.rounded.shadow-md.mb-4
              img(:src="site.imageURL" class="w-6")
            h2.text-subhead.font-aeries.font-bold {{site.name}}
            p.text-minimum-text.text-neutral-1000 {{site.url}}
            .uptime.mt-4.text-center
              .pip(v-for="pip in site.uptime" v-bind:class="getStatusBGColor(getColorCodeFromLoadTime(pip.metrics.TaskDuration))" class="w-2 h-2 rounded inline-flex m-1" :title="new Date(pip.timestamp).toLocaleString()")
        div.mt-8
          a(@click="changeSelectedPage('all')").cursor-pointer.text-title.font-bold.text-blue-700.font-aeries See all »

  section
    div(v-for="site in sites" v-if="selectedPage == site.siteID || selectedPage == 'all' ")
      div.flex.m-12.shadow-lg
        div(class="flex flex-col w-1/6 bg-neutral-500 rounded-l p-4")
          div
            p.font-aeries.font-bold #[a(href="/sentinel/") Sentinel] » #[a.cursor-pointer(@click="changeSelectedPage('home')") EagleOne] » {{site.name}}
          div.flex.flex-col.h-full.mt-12
            .icon
              img(:src="site.imageURL" class="w-12 rounded")
            h1.text-title.font-bold.font-aeries.pt-6 {{site.name}}
            p(v-if="site.description").text-minimum-text.pb-6 {{site.description}}
            p(v-else).text-minimum-text.pb-6 No description provided.
        div(class="w-5/6 bg-neutral-400 py-12 px-8 rounded-r")
          h1.text-title.font-bold.font-aeries Uptime reports
          div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 col-gap-8 row-gap-8 mt-6")
            div(v-for="pip in site.uptime" @click="selectedReport = site; selectedPip = pip; showModal()" class="cursor-pointer")
              div.text-minimum-text.text-neutral-1200 {{timeSince(new Date(pip.timestamp))}} ago
              div(class="uptime-report bg-white rounded shadow-md")
                div.mb-8
                  img(:src="pip.screenshotPath" class="border-b border-neutral-600 rounded-t")
                div.pb-4
                  .uptime.px-3
                      .pip(v-bind:class="getStatusBGColor(getColorCodeFromLoadTime(pip.metrics.TaskDuration))" class="w-4 h-4 rounded-full inline-flex m-1" :title="new Date(pip.timestamp).toLocaleString()")

                  h2.text-subhead.font-aeries.font-bold.px-3 Status {{getColorCodeFromLoadTime(pip.metrics.TaskDuration)}}
                  p.text-minimum-text.text-neutral-1000.px-3 {{site.url}}

</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        selectedPage: "home",
        selectedReport: {},
        selectedPip: {},
        showUptimeReportModal: false,
        exampleGoodUptime: [
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
        ],
        exampleSpottyUptime: [
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'red'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'red'},
        ],
        exampleBadUptime: [
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'red'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'red'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'red'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'red'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'red'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'yellow'},
          {'time': 1588275485187, 'status' : 'green'},
          {'time': 1588275485187, 'status' : 'red'},
          {'time': 1588275485187, 'status' : 'red'},
        ],
        sites: [
          {
          "name" : "aeries.com",
          "description": "Sentinel loads the aeries.com homepage to ensure it can be reached.",
          "siteID" : "homepage",
          "url" : "aeries.com",
          "imageURL": "/images/aeries-homepage.png",
          "backgroundColor" : "#fdf0f0",
          "uptime" : []
          },
          {
          "name" : "Confluence",
          "description": "Sentinel loads the Confluence homepage as a logged-out user to check for the presence of any errors or slowness.",
          "siteID" : "confluence",
          "url" : "docs.aeries.works",
          "imageURL": "/images/logo-confluence.svg",
          "backgroundColor" : "#f0f5fd",
          "uptime" : []
          },
          {
          "name" : "Jira",
          "description": "Sentinel visits our Jira instance's homepage as a logged-out user just to ensure it can be reached.",
          "siteID" : "jira",
          "url" : "jira.aeries.works",
          "imageURL": "/images/logo-jira.svg",
          "backgroundColor" : "#e1e9ff",
          "uptime" : []
          },
          {
          "name" : "Freshdesk",
          "description": "Sentinel checks the Freshdesk customer portal, ensuring access and measuring load times.",
          "siteID" : "freshdesk",
          "url" : "support.aeries.com",
          "imageURL": "/images/logo-freshdesk.svg",
          "backgroundColor": "#eafff4",
          "uptime" : []
          }
        //   {
        //   "name" : "Sharepoint",
        //   "url" : "aeriessoftware-my.sharepoint.com",
        //   "imageURL": "/images/logo-sharepoint.svg",
        //   "backgroundColor": "#e9feff",
        //   "uptime" : [
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'red'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'red'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'red'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'red'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'red'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'yellow'},
        //   {'time': 1588275485187, 'status' : 'green'},
        //   {'time': 1588275485187, 'status' : 'red'},
        //   {'time': 1588275485187, 'status' : 'red'},
        // ]
        //   }
        ],
        currentUser : "",
    }
  },
methods : {
changeSelectedPage(page) {
this.selectedPage = page;
if (page !== 'home') {
  window.history.pushState('Object', 'Uptime report', '/sentinel/eagle-one/' + this.selectedPage);
} else {
  window.history.pushState('Object', 'Aeriesworks Sentinel | EagleOne', '/sentinel/eagle-one/');
}
},
showModal() {
//Open the actual modal
this.showUptimeReportModal = true;
var thisID = this.selectedPip._id;
window.history.pushState('Object', 'Uptime report', '/sentinel/eagle-one/' + this.selectedPage + '/' + thisID);
},
hideModal() {
//Open the actual modal
this.showUptimeReportModal = false;
window.history.pushState('Object', 'Uptime report', '/sentinel/eagle-one/' + this.selectedPage);
},
displayActiveModal() {
console.log('displaying')
//If a modal ID was provided on pageload, show it
if (this.$attrs.idofselectedpage.pipID) {
        var pipID = this.$attrs.idofselectedpage.pipID;
        this.selectedPip = this.findPipByID(pipID);
        this.showModal();
}
},
findPipByID(id) {
for (var i = 0; i < this.sites.length; i++) {
  for (var ii = 0; ii < this.sites[i].uptime.length; ii++) {
    console.log(this.sites[i].uptime[ii]._id, id)
    if (this.sites[i].uptime[ii]._id == id) {
      return this.sites[i].uptime[ii];
    }
  }
}
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
getColorCodeFromLoadTime(loadTime) {
  if (loadTime < 3) {
    return "green"
  } else if (loadTime < 4) {
    return "yellow"
  } else if (loadTime > 4) {
    return "red"
  }
},
makeRequestsFromArray(arr) {
//Loop through our array of sites and request the data for each one.
    let index = 0;
    var global = this;
    function repeatedRequest() {
        return axios.get('/rest/sentinel-results?$limit=999&$sort[timestamp]=1&siteID=' + arr[index].siteID).then((body) => {
          console.log(global.sites[index])
            global.sites[index].uptime = body.data.data;
            index++;
            if (index >= arr.length) {
                global.displayActiveModal()
                return 'done'
            }
            return repeatedRequest();
        });

    }
    return repeatedRequest();
},
getStatusBGColor(color) {
  if (color == "yellow") {color = "orange"}
  return 'bg-' + color + '-700'
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
async mounted () {

          //For passing to our function

      this.makeRequestsFromArray(this.sites);


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
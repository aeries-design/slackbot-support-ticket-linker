<template lang="pug">
div(class="px-2")
  main

    section
      div.container.flex.flex-col.pt-12
        img(src="/images/logo-sendgrid.png" class="w-16")
        h1.text-xx-large.font-bold.font-aeries SendGrid
        div(class="w-full md:w-3/5")
          h2.text-title.font-bold.font-aeries.mb-4 Mailing list fail checker
          p.text-minimum-text.mb-4 SendGrid didn't have this feature so we built a way to see failed email sends per-campaign. Just export your mailing list from SendGrid, upload it to this page, and then any/all suppressions associated with the addresses on that list will be found.
          p.text-minimum-text.mb-4 When you use SendGrid to send an email campaign, the only way to see which recipients of that campaign failed to receive your message is to individually copy and paste email addresses one-by-one into not one, but three separate search fields in the "Suppressions" section of SendGrid. One for bounces, one for blocks, and one for invalid address errors.
          p.text-minimum-text.mb-4 With this tool, upload a CSV (for example, an exported SendGrid mailing list) to automate the process of checking for failures across those three lists. This tool really shouldn't have to exist, but we currently have a need for this functionality.
          h2.text-subhead.font-bold.font-aeries.mt-8 What #[a.text-blue-700.underline(target="_blank" href="https://developers.google.com/web/tools/puppeteer") Puppeteer] is doing for you in the background:
          p.text-minimum-text.mb-8.mt-4 Here's a video clip demonstrating the behavior this automation follows to check your list of emails against all the suppression categories in SendGrid. Each email is searched on each of the 3 suppression screens and any errors are recorded.
          video(src="/images/sendgrid-checker.mp4" controls=true style="width: 80%;").shadow-lg.p-2.border.mb-2
          p.text-minimum-text.mb-4.text-neutral-900 In this example, the spreadsheet is only 4 addresses long to better demonstrate how it moves from list to list.

    section
      div.container.flex.flex-col
        div(class="w-full md:w-3/5 mt-6 mb-24")
          h2.text-title.font-bold.font-aeries.mb-4 Upload a CSV
          p.text-minimum-text.mb-4 Make sure it has a column called "email" containing email addresses.
          div.mb-6
            form
              input(type="file" id="csvUpload" v-on:change="onFileChange()")
          div
            a(@click="sendToAPI()" v-if="runningJob == false && fileUploaded").cursor-pointer.bg-blue-700.px-4.py-2.text-white.rounded.font-bold Search for failures
            a(v-if="runningJob == true" disabled).cursor-not-allowed.opacity-75.bg-blue-700.px-4.py-2.text-white.rounded.font-bold Searching...

      div(v-if="mailingList.length").mb-12.px-12
        h2.text-title.font-bold.font-aeries.mb-4 Your mailing list

        p.text-minimum-text.mb-4 For this spreadsheet, it will take around {{calculateTimeToGenerate}} to complete after results begin appearing (which takes about 15 seconds). It also takes a moment to switch to the next column.
        p(v-if="runningJob") Searching for failures..
        table.text-left.shadow-lg.bg-white.table-fixed
          thead
            tr
              th.bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Email address
              th(class="w-2/6").bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Bounced emails
              th(class="w-2/6").bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Blocked emails
              th(class="w-2/6").bg-neutral-400.border.border-neutral-700.text-left.px-8.py-4 Invalid emails
          tbody
            tr(v-for="email in mailingList" v-bind:class="{'bg-red-100' : rowHasError(email)}")
              td.border.border-neutral-700.text-left.px-8.py-4 {{email.email}}
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-red-500.font-bold(v-if="email.bounceResult") {{email.bounceResult}}
                span.text-minimum-text.text-neutral-1200(v-else-if="email.bounceResult == ''") No bounces found.
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-red-500.font-bold(v-if="email.blockResult") {{email.blockResult}}
                span.text-minimum-text.text-neutral-1200(v-else-if="email.blockResult == ''") No blocks found.
              td.border.border-neutral-700.text-left.px-8.py-4
                span.text-minimum-text.text-red-500.font-bold(v-if="email.invalidResult") {{email.invalidResult}}
                span.text-minimum-text.text-neutral-1200(v-else-if="email.invalidResult == ''") No invalid errors found.
</template>

<script>
const axios = require('axios');
const request = require('request');
const Papa = require('papaparse');

module.exports = {
data() {
    return {
        mailingList: [],
        runningJob: false,
        fileUploaded: false,
        responseArray : [],
        currentUser : "",
    }
  },
computed : {
  calculateTimeToGenerate() {
    var time = this.mailingList.length * 3
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    var minutesPlurality = "minute";
    if (minutes > 1 || minutes == 0) {minutesPlurality = "minutes"}

    return minutes + " " + minutesPlurality + " and " + seconds + " seconds";
  }
},
filters: {},
methods : {
rowHasError(row) {
if (!row.bounceResult && !row.blockResult && !row.invalidResult) {
  return false;
} else {
  return true;
}
},
getMailingListObjectByAddress(address) {
  console.log("address: " + address)
  for (var i = 0; i < this.mailingList.length; i++) {
    if (this.mailingList[i].email == address) {
      return this.mailingList[i];
    }
  }
},
updateMailingList() {
//To be called whenever we receive an additional response chunk
for (var i = 0; i < this.responseArray.length; i++) {
  var result = this.responseArray[i];
  if (result.hasOwnProperty('bounceResult')) {
    
    var newBounceResult = this.getMailingListObjectByAddress(result.email).bounceResult = result.bounceResult;

  } else if (result.hasOwnProperty('blockResult')) {

    this.getMailingListObjectByAddress(result.email).blockResult = result.blockResult;

  } else if (result.hasOwnProperty('invalidResult')) {
  
    this.getMailingListObjectByAddress(result.email).invalidResult = result.invalidResult;

  }
}
},
sendToAPI() {
var globalScope = this;
this.runningJob = true;

  const config = {
      onDownloadProgress: function(progressEvent) {
      var uncookedJSON = progressEvent.target.response.slice(0, -1); 
      var cookedJSON = JSON.parse("[" + uncookedJSON + "]")
      globalScope.responseArray = cookedJSON;
      console.log(cookedJSON);
      globalScope.updateMailingList()
      // console.log(progressEvent.data)

    }
  }

  if (this.mailingList.length) {
  axios.post('/api/start-sendgrid-checker-job', this.mailingList, config)
  .then(function (response) {
      console.log(response);
      globalScope.runningJob = false;
  })
  .catch(function (error) {
      console.log(error);
      globalScope.runningJob = false;
  });
  } else {
    alert("Upload a CSV first.");
  }
},
onFileChange() {
  var e = document.querySelector('#csvUpload');
  this.fileUploaded = true;
  var files = e.files || e.dataTransfer.files;
  if (!files.length)
    return;
  this.parseCSV(files[0]);
},
parseCSV(file) {
var globalScope = this;
var config = {
  "complete" : function(results) {
    console.log(results.data);
    var results = results.data;
    results.forEach(function (result) {
        result.bounceResult = null;
        result.blockResult = null;
        result.invalidResult = null;
    });
    globalScope.mailingList = results;
    },
  "header" : true,
  "skipEmptyLines" : true
  }
Papa.parse(file, config); 
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
    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }

},

}
</script>
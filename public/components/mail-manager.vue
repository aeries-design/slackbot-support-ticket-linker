<template lang="pug">
div(class="px-2")
  main

    section(v-html="$attrs.email.campaignData.html_content")
    
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
    $('header').hide()
    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }

},

}
</script>
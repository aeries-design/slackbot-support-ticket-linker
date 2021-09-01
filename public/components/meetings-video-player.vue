<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
  z-index: 9999;
}
ul.dropdown-menu {
    right: -40px;
    top: 40px;
}
</style>

<template lang="pug">
div
  meetings-subheader
  .mt-6.mx-12
        // use the modal component, pass in the prop
        modal(v-if='showEditVideoModal' @close='showEditVideoModal = false')
            // you can use custom content here to overwrite default content
            h3(slot='header') Edit video
            div(slot="body")
                div.mb-4
                    label.block.tracking-wide.text-neutral-1400.text-xs.font-bold(for='grid-last-name')
                        | Video title
                    input#grid-video-title.appearance-none.block.w-full.bg-neutral-400.text-neutral-1700.border.border-neutral-400.rounded.py-3.px-4(v-model="videoObject.videoTitle" name='new-' autocomplete="none" type='text' placeholder='Add a title that describes your video')
                
                div.mb-4
                    label.block.tracking-wide.text-neutral-1400.text-xs.font-bold(for='grid-last-name')
                        | Video description
                    input#grid-video-description.appearance-none.block.w-full.bg-neutral-400.text-neutral-1700.border.border-neutral-400.rounded.py-3.px-4(v-model="videoObject.videoDescription" name='new-' autocomplete="none" type='text' placeholder='Add a title that describes your video')
                
                div.mb-4
                    label.block.tracking-wide.text-neutral-1400.text-xs.font-bold(for='grid-last-name')
                        | Video filename
                    input#grid-video-description.appearance-none.block.w-full.bg-neutral-400.text-neutral-1700.border.border-neutral-400.rounded.py-3.px-4(v-model="videoObject.filename" name='new-' autocomplete="none" type='text' placeholder='Add a title that describes your video')
            
            div(slot="footer")
                button.font-bold.modal-default-button.ml-6(@click="showEditVideoModal = false")
                    | Cancel
                button.font-bold.modal-default-button.ml-6(@click="editVideo()")
                    | OK
        modal(v-if='showEditMessageModal' @close='showEditMessageModal = false')
            // you can use custom content here to overwrite default content
            h3(slot='header') Edit message
            div(slot="body")
                div.mb-4
                    label.block.tracking-wide.text-neutral-1400.text-xs.font-bold(for='grid-last-name')
                        | Message
                    input#grid-video-title.appearance-none.block.w-full.bg-neutral-400.text-neutral-1700.border.border-neutral-400.rounded.py-3.px-4(v-model="focusedMessage.body" name='new-' autocomplete="none" type='text' placeholder='Add a title that describes your video')
                
                div.mb-4
                    label.block.tracking-wide.text-neutral-1400.text-xs.font-bold(for='grid-last-name')
                        | Appears at (in seconds)
                    input#grid-video-description.appearance-none.block.w-full.bg-neutral-400.text-neutral-1700.border.border-neutral-400.rounded.py-3.px-4(v-model="focusedMessage.timestamp" name='new-' autocomplete="none" type='text' placeholder='Add a title that describes your video')

            div(slot="footer")
                button.font-bold.modal-default-button.ml-6(@click="showEditMessageModal = false")
                    | Cancel
                button.font-bold.modal-default-button.ml-6(@click="editMessage()")
                    | OK
        modal(v-if='showCopyVideoURLModal' @close='showCopyVideoURLModal = false')
            // you can use custom content here to overwrite default content
            h3(slot='header') Copy video URL
            div(slot="body")
                div.mb-4
                    label.block.tracking-wide.text-neutral-1400.text-xs.font-bold(for='grid-last-name')
                        | Video URL
                    input#grid-video-title.appearance-none.block.w-full.bg-neutral-400.text-neutral-1700.border.border-neutral-400.rounded.py-3.px-4(v-model="videoURL" name='new-' autocomplete="none" type='text' placeholder='Add a title that describes your video')
                
            div(slot="footer")
                button.font-bold.modal-default-button.ml-6(@click="showCopyVideoURLModal = false")
                    | Close
        div.header
            div
                h1.font-aeries.text-title.font-bold.tracking-tight
                    a(href="/meetings/videos").text-blue-700 Videos 
                    span / 
                    span {{videoObject.videoTitle}}
            div.flex.flex-row.items-center
                div.mr-6
                    select(v-model="timestampOption" class="py-2 px-4 h-10 rounded")
                        option(value="showAllTimestamps") Show all timestamps
                        option(value="showLiveTimestamps") Show 'live' timestamps
                div
                    .dropdown.inline-block.relative
                        button.bg-neutral-500.text-neutral-1700.font-semibold.py-2.pr-3.pl-2.rounded.inline-flex.h-10
                            svg.fill-current.h-4.w-4(xmlns='http://www.w3.org/2000/svg' viewbox='0 0 20 20')
                                path(d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z')
                            ul.dropdown-menu.hidden.text-neutral-1600.pt-1.shadow-lg.static
                                li
                                    a.rounded-b.bg-white.py-2.px-4.block.whitespace-no-wrap(class='hover:bg-neutral-400' href='#' @click='showCopyVideoURLModal = true') Copy URL

                                li
                                    a.rounded-t.bg-white.py-2.px-4.block.whitespace-no-wrap(class='hover:bg-neutral-400' href='#' @click='showEditVideoModal = true') Edit video
                                li
                                    a.bg-white.py-2.px-4.block.whitespace-no-wrap(class='hover:bg-neutral-400' href='#' @click="deleteVideo()") Delete video
        div(class="xs:flex-col xs:w-full flex md:flex-row")
            div(class="flex justify-center flex-col sm:w-full md:w-3/5 border border-neutral-800" style="background-color: #000")
                //- p {{cookTimestamp(currentTime)}}
                video(id="video" controls='true' @timeupdate="currentTime_ = $event.target.currentTime; updateQueryStringParam('t', Math.floor($event.target.currentTime));" style="max-height: calc(70vh - 118px); min-height: 380px;" class="w-full self-center")
                    source(type='video/mp4')
                    |   Your browser does not support the video tag.
            .flex.flex-col(class="sm:w-full md:w-2/5 border-t border-l border-r border-neutral-800 bg-white")
                .m-0
                    .flex-col(class="overflow-y-scroll" style="min-height: 327px; max-height: calc(70vh - 118px);")
                        div(v-for="message in activeMessages" class="pt-3 pb-3 px-3 hover:bg-neutral-400" style="display: flex;justify-content: space-between;")
                            div
                                h2.font-aeries.font-semi-bold {{message.from}}
                                    p(class="inline font-nunito font-bold text-minimum-text text-blue-500 cursor-pointer"
                                    @click="setVideoTime(message.timestamp)"
                                    )  - {{cookTimestamp(message.timestamp)}}
                                p {{message.body}}
                            div
                                .dropdown.inline-block.relative
                                    button.bg-neutral-500.text-neutral-1700.font-semibold.py-2.pr-3.pl-2.rounded.inline-flex.h-10
                                        svg.fill-current.h-4.w-4(xmlns='http://www.w3.org/2000/svg' viewbox='0 0 20 20')
                                            path(d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z')
                                        ul.dropdown-menu.hidden.text-neutral-1600.pt-1.shadow-lg.static
                                            li
                                                a.rounded-t.bg-white.py-2.px-4.block.whitespace-no-wrap(class='hover:bg-neutral-400' href='#' @click='focusedMessage = message; showEditMessageModal = true;') Edit message
                                            li
                                                a.rounded-b.bg-white.py-2.px-4.block.whitespace-no-wrap(class='hover:bg-neutral-400' @click="focusedMessage = message; deleteMessage()" href='#') Delete message

                .mt-auto
                    input(
                    v-model="message"
                    @keyup.enter="addMessage"
                    class='focus:outline-none focus:shadow-outline shadow appearance-none border-neutral-700 border-t border-b w-full py-4 px-3 text-neutral-1700 leading-tight' 
                    type='text' 
                    :placeholder='"Leave a comment at " + cookTimestamp(currentTime)'
                    )
</template>

<script>
const axios = require('axios');

module.exports = {
  data() {
    return {
      currentTime_: 0,
      videoObject: {},
      videoID: "",
      videoTitle: "",
      timestampOption: "showAllTimestamps",
      message: "",
      messages: [],
      username: "",
      userID: "",
      focusedMessage: {},
      showEditVideoModal: false,
      showCopyVideoURLModal: false,
      showEditMessageModal: false
    }
  },
methods : {
    editVideo() {

        video.src = '/videos/' + this.videoObject.filename;
        var thisScope = this;

        axios.post('/api/edit-video/' + this.videoObject._id, this.videoObject)
            .then(function (response) {
                thisScope.showEditVideoModal = false;
            })
            .catch(function (error) {
                alert(error);
            });
    
        
    },
    addMessage() {
        if (this.message.length) {
            var newMessagesArray = this.messages;
             
            var message = this.message;
            var timestamp = this.currentTime;
            var videoID = this.videoID
           
           var username = "Unknown user"
           
            if (this.username) {
                username = this.username;
            }

            var messageObject = {
                from: username,
                body: message,
                timestamp: timestamp,
                videoID: videoID
            }

            newMessagesArray.push(messageObject)

            axios.post('/rest/messages', messageObject)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            console.log(newMessagesArray)

            var thisVideoURL = "https://my.aeries.works/meetings/video/" + this.videoID + "?t="+Math.floor(timestamp)+"&timestampSetting=showLiveTimestamps";
            var slackMessage = "A new message was posted on <"+thisVideoURL+"|"+this.videoObject.videoTitle+"> by "+username+": \n\n _"+message+"_";


            this.postToSlack(slackMessage, "#alerts-clipchat",  {"icon_emoji" :":eye-in-speech-bubble:"});

            this.messages = newMessagesArray;
            this.message = "";
    }

    },
    editMessage() {
        if (this.focusedMessage._id) {
            var thisScope = this;
            axios.patch('/rest/messages/' + this.focusedMessage._id, this.focusedMessage)
            .then(function (response) {
                console.log(response);
                thisScope.showEditMessageModal = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    deleteMessage() {
        if (this.focusedMessage._id) {
            this.focusedMessage.deleted = "1";
            var thisScope = this;
            axios.patch('/rest/messages/' + this.focusedMessage._id, this.focusedMessage)
            .then(function (response) {
                console.log(response);
                thisScope.showEditMessageModal = false;
            })
            .catch(function (error) {
                console.log(error);
            });
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
postToSlack(text, channel, iconObject) {
  var slackWebhookURL = "https://hooks.slack.com/services/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"

  var postObject = {
    "username": "ClipChat Bot",
    "channel": channel,
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": text
        }
      }
    ]
  }

  //Merges 'icon' into 'postObject' whether it's an icon_url or an icon_emoji
  var finalObject = Object.assign(iconObject, postObject);

    console.log(finalObject);

   axios.post(slackWebhookURL, finalObject, {headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }})
     .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
},
    deleteVideo() {
        if (confirm("Really delete video?") == true) {
            axios.post('/api/delete-video/' + this.videoObject._id)
            .then(function (response) {
                console.log(response);
                alert("Video deleted.");
                window.location.href = "/meetings/videos/";
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    setVideoTime(timestamp) {
        this.currentTime_ = timestamp;
        var video = document.getElementById('video');
        video.currentTime = timestamp;
        video.play()
    },

    cookTimestamp(timestamp) {
        //Convert seconds to hh:mm:ss
        var cookedTimestamp = new Date(timestamp * 1000).toISOString().substr(11, 8); // hh:mm:ss

        //If the timestamp is less than an hour long, only show the minutes.
        if (cookedTimestamp[0] == "0" && cookedTimestamp[1] == "0") {
            cookedTimestamp = cookedTimestamp.substring(3);
        }
        
        return cookedTimestamp;
    },

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    updateQueryStringParam(key, value) {
    if (value) {

    var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
        urlQueryString = document.location.search,
        newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
        var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

        if( typeof value == 'undefined' || value == null || value == '' ) { // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace( /[&;]$/, "" );

        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);

        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }

    // no parameter was set so we don't need the question mark
    params = params == '?' ? '' : params;

    window.history.replaceState({}, "", baseUrl + params);
    }
}
},
async mounted () {
    var thisScope = this;
    var videoID = window.location.pathname.split('/video/')[1];
    this.videoID = videoID;

    this.username = this.getCookie('me'); // Set the current user's display name from the cookie
    this.userID = this.getCookie('meid') // Set the current user's Slack ID from the cookie

    axios
      .get('/rest/messages?$limit&deleted[$ne]=1&videoID=' + videoID)
      .then(response => (this.messages = response.data.data))
    
    axios
      .get('/api/video/' + videoID)
      .then(function(response) {
            var obj = response.data[0];
            var video = document.getElementById('video')
            var queryParamTimestamp = thisScope.getParameterByName("t");
            var queryParamTimestampOption = thisScope.getParameterByName("timestampSetting")
            
            thisScope.videoObject = obj;
            video.src = '/videos/' + obj.filename

            if (queryParamTimestamp) {
                thisScope.setVideoTime(queryParamTimestamp)
            }

            if (queryParamTimestampOption) {
                thisScope.timestampOption = queryParamTimestampOption;
            }
        }
        )
    


        
},
computed: {
    videoURL() {
        return window.location.href;
    },
    videoURLTimestamped() {
        updateQueryStringParam('t', Math.floor($event.target.currentTime))
    },
    activeMessages() {
        if (this.timestampOption == "showLiveTimestamps") {
            return this.sortedMessages.filter(message => message.timestamp < (this.currentTime + 1) ); // Offset the message fetch by 1 second so messages you create while the video is paused show up
        } else {
            return this.sortedMessages;
        }
    },
    sortedMessages() {
        return this.messages.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
    },
    currentTime: {
      get: ({ currentTime_ }) => currentTime_,
      set(time) {
      	this.$refs.video.currentTime = time
      }
      }
    }
}
</script>
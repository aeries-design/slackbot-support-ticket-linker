<style>
.virtualOffice .people,
.virtualOffice .tasks,
.virtualOffice .okrs,
.virtualOffice .sessions,
.virtualOffice .home {
  display: none;
}
</style>

<style scoped>
.design-widget {
  background-image: url('/images/topo-pattern-small.svg')
}

.map-image {
  min-width: 1342px;
  min-height: 786px;
}

.roomOverlay {
  background: rgb(22 73 160 / 0.25);
  position: absolute;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.roomOverlay:hover {
  background: #1649A0;
}

.roomLabel {
  color: black;
  padding-left: 4px;
  padding-right: 4px;
  text-align: center;
  font-weight: bold;
  display: none;
  line-height: 20px;
  text-shadow:
       3px 3px 0 #000,
     -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
       1px 1px 0 #000;
}

.roomOverlay:hover > .roomLabel {
  color: white;
  display: block;
}

.participant {
    margin-left: -6px;
}

#room {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0% 50%;
}

#meet {
  z-index: 2;
}

#background {
  position: absolute;
  z-index: 1;
}

.sidebar {
  height: 100%
}

</style>

<template lang="pug">
main.virtualOffice(class="bg-black")
  .flex.w-full
    .flex(class="w-96")
      .flex-col.w-full
        sidebar-projects
    .flex-col(class="w-full content_container")
        .all-content(class="w-full")
          section
            div(class="px-2 md:px-6")
              h2(class="text-title md:text-display font-bold text-white font-aeries pt-2 pl-2") Aeries Virtual Office
              p(class="text-white pb-6 pl-2") Hop into a room to join a video chat channel! Please note this system is experimental - you may experience some lag.
              .tabs.flex
                .tab(@click="changePage('map')" class="text-white pl-2 pr-2 pb-2 pt-2 cursor-pointer opacity-50 hover:bg-neutral-1400 hover:opacity-100" :class="{'opacity-100 font-bold' : currentPage == 'map'}") Room map
                div(class="hover:bg-neutral-1400 hover:opacity-100 flex" v-if="selectedRoom.name !== ''")
                  .tab(class="text-white pl-2 pr-2 pb-2 pt-2 text-center cursor-pointer opacity-100" :class="{'opacity-100 font-bold' : currentPage == 'room'}")
                    .recCircle(class="bg-red-600 w-2 h-2 rounded-full inline-flex")
                  .tab(@click="changePage('room')" class="text-white pr-2 pb-2 pt-2 text-center cursor-pointer opacity-50 hover:opacity-100" :class="{'opacity-100 font-bold' : currentPage == 'room'}") Currently in: #[b.underline {{selectedRoom.name}}]
                  .tab(@click="destroyJitsi()" class="text-white pl-2 pr-2 pb-2 pt-2 text-center cursor-pointer") X
                div(class="flex opacity-50" v-else)
                  .tab(class="text-white pl-2 pr-2 pb-2 pt-2 text-center") Not currently in a room
            #room(v-show="currentPage == 'room'")
              .container
                #meet
                #background
            #map(v-show="currentPage =='map'")
              .map-image-container.relative
                img(src="/images/virtual-office.png" class="w-full") 
                .roomOverlay(
                  v-bind:class="room.roomPathID"
                  v-for="room in rooms" 
                  @click="selectRoom(room.roomPathID, room.name)"
                  v-bind:style="room.mapData")
                    span.roomLabel(class="text-black") {{room.name}}
                    .participants.flex.flex-row
                      .participant(v-for="participant in room.participants")
                        img(:src="participant.image" :title="participant.name" class="participant-image xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
                //- img(src='/images/virtual-office.png' usemap='#image-map' class="mx-auto map-image")
                //- map(name='image-map')
                //-   area(target='' class="hover:bg-white cursor-pointer" alt='Design office' title='Design office' @click="selectRoom()" coords='814,119,918,179' shape='rect')

      
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        currentUser : "",
        currentPage: "map",
        selectedRoom : {
          name: "",
          pathID: ""
        },
        totalSlackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
        presenceData: [],
        rooms: [
          {
            name: "Design office",
            roomPathID: "design",
            mapData: {
              width: "8%",
              height: "8%",
              top: "15%",
              left: "60.5%"
            },
            participants: [
              /*{
                name: "David Lin-Clark",
                image: "https://avatars.slack-edge.com/2020-05-16/1141323892257_c15dd2430c2e7d3849e6_192.jpg"
              },
              {
                name: "Zachary Guerrero",
                image: "https://ca.slack-edge.com/T495EMCAW-UL1GH9Z7S-d93bebb35685-512"
              },*/
            ]
          },
          {
            name: "Brent's office",
            roomPathID: "brent",
            mapData: {
              width: "5%",
              height: "8%",
              top: "15%",
              left: "55.4%"
            },
            participants: [

            ]
          },
          {
            name: "Conference room",
            roomPathID: "conference",
            mapData: {
              width: "10%",
              height: "9%",
              top: "15%",
              left: "45%"
            },
            participants: [

            ]
          },
          {
            name: "Marge's office",
            roomPathID: "marge",
            mapData: {
              width: "3.4%",
              height: "8%",
              top: "15%",
              left: "41.2%"
            },
            participants: [

            ]
          },
          {
            name: "Michael's office",
            roomPathID: "michael",
            mapData: {
              width: "3%",
              height: "8%",
              top: "15%",
              left: "38%"
            },
            participants: [

            ]
          },
          {
            name: "Connie's office",
            roomPathID: "connie",
            mapData: {
              width: "4.2%",
              height: "8.5%",
              top: "29.3%",
              left: "44%"
            },
            participants: [

            ]
          },
          {
            name: "Todd's office",
            roomPathID: "todd",
            mapData: {
              width: "3.9%",
              height: "8.8%",
              top: "29%",
              left: "52%"
            },
            participants: [

            ]
          },
          {
            name: "Copy room",
            roomPathID: "copy",
            mapData: {
              width: "4.2%",
              height: "9.7%",
              top: "29%",
              left: "56%"
            },
            participants: [

            ]
          },
          {
            name: "Support breakout",
            roomPathID: "support-breakout",
            mapData: {
              width: "9%",
              height: "24%",
              top: "15%",
              left: "28.8%"
            },
            participants: [

            ]
          },
          {
            name: "Marketing office",
            roomPathID: "marketing",
            mapData: {
              width: "3.3%",
              height: "8%",
              top: "15%",
              left: "68.7%"
            },
            participants: [

            ]
          },
          {
            name: "Jonathan's office",
            roomPathID: "jonathan",
            mapData: {
              width: "4.3%",
              height: "8%",
              top: "15%",
              left: "72.2%"
            },
            participants: [

            ]
          },
          {
            name: "Sonia's office",
            roomPathID: "sonia",
            mapData: {
              width: "5.4%",
              height: "8%",
              top: "23%",
              left: "76%"
            },
            participants: [

            ]
          },
          {
            name: "Rich's office",
            roomPathID: "rich",
            mapData: {
              width: "6.87%",
              height: "8%",
              top: "31.5%",
              left: "79.6%"
            },
            participants: [

            ]
          },
          {
            name: "Barry's office",
            roomPathID: "barry",
            mapData: {
              width: "5.5%",
              height: "8%",
              top: "39.5%",
              left: "85.6%"
            },
            participants: [

            ]
          },
          {
            name: "Strategy room",
            roomPathID: "strategy",
            mapData: {
              width: "4.7%",
              height: "8.5%",
              top: "29%",
              left: "60.5%"
            },
            participants: [

            ]
          },
          {
            name: "IT room",
            roomPathID: "it-room",
            mapData: {
              width: "3.7%",
              height: "12.5%",
              top: "38%",
              left: "64%"
            },
            participants: [

            ]
          },
          {
            name: "Sales cubicles",
            roomPathID: "sales",
            mapData: {
              width: "7.1%",
              height: "9.8%",
              top: "25.5%",
              left: "67%"
            },
            participants: [

            ]
          },
          {
            name: "Kitchen",
            roomPathID: "break-room",
            mapData: {
              width: "9.1%",
              height: "11.8%",
              top: "37.5%",
              left: "68%"
            },
            participants: [

            ]
          },
          {
            name: "Game room",
            roomPathID: "game-room",
            mapData: {
              width: "6.6%",
              height: "15.8%",
              top: "41.5%",
              left: "78%"
            },
            participants: [

            ]
          },
          {
            name: "Spare conference room",
            roomPathID: "spare-conference-room",
            mapData: {
              width: "5.5%",
              height: "8%",
              top: "56.3%",
              left: "85.6%"
            },
            participants: [

            ]
          },
          {
            name: "Cam's office",
            roomPathID: "cam",
            mapData: {
              width: "5.5%",
              height: "10.6%",
              top: "72.8%",
              left: "85.6%"
            },
            participants: [

            ]
          },
          {
            name: "Tactics room",
            roomPathID: "tactics",
            mapData: {
              width: "4.5%",
              height: "6.5%",
              top: "59%",
              left: "79%"
            },
            participants: [

            ]
          },
          {
            name: "Dev cubicles 3",
            roomPathID: "programming-3",
            mapData: {
              width: "9%",
              height: "12.7%",
              top: "70.6%",
              left: "74.6%"
            },
            participants: [

            ]
          },
          {
            name: "Dev cubicles 2",
            roomPathID: "programming-2",
            mapData: {
              width: "9%",
              height: "12.7%",
              top: "70.6%",
              left: "64.2%"
            },
            participants: [

            ]
          },
          {
            name: "Dev cubicles 1",
            roomPathID: "programming-1",
            mapData: {
              width: "11.2%",
              height: "12.7%",
              top: "70.6%",
              left: "50.7%"
            },
            participants: [

            ]
          },
          {
            name: "Kathy's office",
            roomPathID: "kathy",
            mapData: {
              width: "4.4%",
              height: "8.7%",
              top: "74.6%",
              left: "44.4%"
            },
            participants: [

            ]
          },
          {
            name: "Kevin's office",
            roomPathID: "kevin",
            mapData: {
              width: "5.4%",
              height: "8.0%",
              top: "64.5%",
              left: "85.7%"
            },
            participants: [

            ]
          },
          {
            name: "Kyle's office",
            roomPathID: "kyle",
            mapData: {
              width: "3.7%",
              height: "6.2%",
              top: "59.3%",
              left: "73.2%"
            },
            participants: [

            ]
          },
          {
            name: "Breakout room 3",
            roomPathID: "breakout-3",
            mapData: {
              width: "3%",
              height: "6.2%",
              top: "59.3%",
              left: "69.9%"
            },
            participants: [

            ]
          },
          {
            name: "Breakout room 2",
            roomPathID: "breakout-2",
            mapData: {
              width: "2.8%",
              height: "6.2%",
              top: "59.3%",
              left: "67%"
            },
            participants: [

            ]
          },
          {
            name: "Breakout room 1",
            roomPathID: "breakout-1",
            mapData: {
              width: "2.8%",
              height: "6.2%",
              top: "59.3%",
              left: "64%"
            },
            participants: [

            ]
          },
        ]
    }
  },
methods : {
  selectRoom(roomPathID, roomName) {
    //If we're not entering the chat we're already in
    if (this.selectedRoom.pathID !== roomPathID) {
    this.destroyJitsi()
    this.selectedRoom.pathID = roomPathID
    this.selectedRoom.name = roomName
    this.initializeJitsi(roomPathID)
    } else {
      this.changePage('room');
    }
  },
  destroyJitsi() {
    this.changePage('map')
    this.selectedRoom.name = '';
    this.selectedRoom.pathID = '';
    this.clearPresenceData()


    $('#meet').empty();
  },
  initializeJitsi(roomPathID) {
    this.broadcastPresenceData()
    this.changePage('room')
    var domain = 'meetings.aeries.tools';
    var options = {
    roomName: roomPathID,

    width: '100%',
    height: '700px',
    parentNode: document.querySelector('#meet')
};
var api = new JitsiMeetExternalAPI(domain, options);
api.executeCommands({ 
      displayName: this.currentUser,
      startWithVideoMuted: true
    })
  },


changePage(page) {
  if (page == "map") {

  } else if (page == "room") {
    $('#room').css('background-image', 'url(/images/virtual-office-backgrounds/' + this.selectedRoom.pathID + '.jpg)')
  }

  this.currentPage = page;
},

refreshPresenceData() {
  //For passing to our function
  var globalScope = this;

  //Slack
  axios
  .get('/rest/virtual-office-presence?$limit=9999')
  .then(function(response) {
    globalScope.presenceData = response.data.data;
    globalScope.addPresenceTokens()
  })
  
},

addPresenceTokens() {

  //Loop through every room.
  //Find all the users in that room.
  //After ensuring the token is not expired, (TODO)
  //add them to the participants array for this current loop.
  //when done, update the participants array.
  for (var ii = 0; ii < this.rooms.length; ii++) {
    var roomID = this.rooms[ii].roomPathID;
    var participants = [];
    for (var i = 0; i < this.presenceData.length; i++) {
    if (this.presenceData[i].room == roomID
    && this.timestampIsNotExpired(this.presenceData[i].timestamp)) {
      participants.push(this.presenceData[i]);
    }
    }
    this.rooms[ii].participants = participants;
  }

  //Loop through every user in the presence list.
  //After ensuring the token is not expired, (TODO)
  //Find the room that the user is in
  //And add their name and image to the list of participants in that room.
  // for (var i = 0; i < this.presenceData.length; i++) {
  //   var roomIDThatUserIsIn = this.presenceData[i].room;
  //   for (var ii = 0; ii < this.rooms.length; ii++) {
  //     if (this.rooms[ii].roomPathID == roomIDThatUserIsIn) {
  //       if (participantNotYetAdded())
  //       this.rooms[ii].participants.push(this.presenceData[i]);
  //     }
  //   }
  // }
},

timestampIsNotExpired(timestamp) {
  var tenSecondsAfterTimestamp = timestamp + 10000; // Add 10 seconds
  var rightNow = new Date().getTime();

  console.log(tenSecondsAfterTimestamp)
  console.log(rightNow)

  if (rightNow > tenSecondsAfterTimestamp) {
    return false
  } else {
    return true
  }
},

clearPresenceData() {
  var globalScope = this;
  //For use when exiting a room
      axios
    .delete('/rest/virtual-office-presence/' + this.mySlackUserObject.id)
    .then(function(response) {
      console.log(response);
    globalScope.refreshPresenceData();
    })
},

broadcastPresenceData() {
  //For passing to our function
  var globalScope = this;

  if (this.selectedRoom.pathID !== "") {
    //Slack
    axios
    .patch('/rest/virtual-office-presence/' + globalScope.mySlackUserObject.id, {
      _id: globalScope.mySlackUserObject.id,
      name: globalScope.currentUser,
      image: globalScope.mySlackUserObject.profile.image_192,
      room: globalScope.selectedRoom.pathID,
      timestamp: new Date().getTime()
    })
    .then(function(response) {
      console.log(response);
      globalScope.refreshPresenceData()
    })
    .catch(function(error) {
      axios
    .post('/rest/virtual-office-presence/', {
      _id: globalScope.mySlackUserObject.id,
      name: globalScope.currentUser,
      image: globalScope.mySlackUserObject.profile.image_192,
      room: globalScope.selectedRoom.pathID,
      timestamp: new Date().getTime()
    })
    .then(function(response) {
      console.log(response);
      globalScope.refreshPresenceData()
    })
    })
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
}
},
computed: {
  mySlackUserObject() {
    var meid = this.getCookie('meid')
    for (var i = 0; i < this.totalSlackUsers.length; i++) {
      if (this.totalSlackUsers[i].id == meid) {
        return this.totalSlackUsers[i];
      }
    }
  }
},
async mounted () {

    setInterval(() => {
      this.refreshPresenceData()
    }, 2000);

    setInterval(() => {
      this.broadcastPresenceData();
    }, 6000);

    $('body').addClass('bg-black')

      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.totalSlackUsers = response.data.data;
        globalScope.refreshPresenceData()
      })


    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
<style scoped>
.meeting-item {
    -webkit-meeting-select: none; /* Safari */
  -ms-meeting-select: none; /* IE 10+ and Edge */
  meeting-select: none; /* Standard syntax */
}
</style>

<template lang="pug">
.container.mx-auto.grid.grid-cols-1.row-gap-16.px-4.py-4(class='sm:px-6 sm:py-12 lg:px-8')
  #product-marketing
    div
      //- div
      //-   #clubs.container
      //-     h2.font-aeries.font-semi-bold.text-title Also show
      //-     .filter.mb-10
      //-       label.pr-6
      //-         input(type='checkbox' name='sc' v-model='selectedCategories' value='deleted')
      //-         |  Deleted Users
      //-       label.pr-6
      //-         input(type='checkbox' name='sc' v-model='selectedCategories' value='is_restricted')
      //-         |  Single-Channel Guests
      //-       label.pr-6
      //-         input(type='checkbox' name='sc' v-model='selectedCategories' value='is_bot')
      //-         |  Bots
      //-     ul.clubs-list

      h3.text-subhead.mb-8 This page is currently in alpha. Data may be missing or outdated.
      div(class='sm:flex sm:items-baseline sm:justify-between')
        h2.text-display.leading-8.font-semi-bold.tracking-tight.font-aeries.text-gray-900(class='sm:text-3xl sm:leading-9')
          | Webex meetings - {{filteredMeetings.length}}
      div.mt-6.p-2
        h4.text-title.font-aeries.font-semi-bold.tracking-tight Filters
        div.mt-2
          .inline-block.mr-2
            h3.text-minimum-text Meetings on or after
            input(type="date" v-model="filterStartDate" class="mt-1 border border-neutral-700 rounded-sm p-2")
          .inline-block.mr-2
            h3.text-minimum-text And not later than
            input(type="date" v-model="filterEndDate" class="mt-1 border border-neutral-700 rounded-sm p-2")
    .mt-6.grid.grid-cols-1.row-gap-8
      div(class='lg:grid-cols-3 lg:gap-5 border-t border-neutral-200 pt-2 grid grid-cols-1 row-gap-4')
        div(class='grid grid-cols-1 row-gap-4 sm:grid-cols-2 sm:col-gap-4 sm:row-gap-4 md:grid-cols-3 lg:col-span-4')
          
          div(class="flex p-2 meeting-item cursor-pointer border-dashed border-2 border-transparent hover:border-neutral-500" v-for="(meeting, index) in filteredMeetings" v-bind:class="{ 'bg-neutral-500' : meeting.selected }")
            .flex-1.leading-snug.w-0
              h4(class='hover:text-primary text-body font-aeries text-secondary font-bold') {{meeting.subject}}
              p(class="text-body text-neutral-1600 text-minimum-text") {{cookedTimestamp(meeting.startTime.dateTime, meeting.endTime.dateTime)}}
          
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        meetings: [],
        filterStartDate: "",
        filterEndDate: "",
        selectedCategories: ["All"],
        selectedUsers: [],
        lastSelectedUserIndex: "",
        currentUser : ""
    }
  },
computed : {
  timestampedMeetings() {
    var output = [];
    for (var i = 0; i < this.meetings.length; i++) {
      
      var timestampedMeeting = this.meetings[i];
      timestampedMeeting.timestampStart = new Date(this.meetings[i].startTime.dateTime).getTime()
      timestampedMeeting.timestampEnd = new Date(this.meetings[i].endTime.dateTime).getTime()
      
      output.push(timestampedMeeting);
    
    }

    return output;

  },
  filteredMeetings() {
    var start = new Date(this.filterStartDate).getTime();
    var end = new Date(this.filterEndDate).getTime();
    var cookedEnd = new Date().setDate( new Date(this.filterEndDate).getDate() + 2 );
    var meetings = this.sortedTimestampedMeetings;
    
    var output = [];
    for (var i = 0; i < meetings.length; i++) {
    
    var meetingStart = meetings[i].timestampStart;
    var meetingEnd = meetings[i].timestampEnd;

    //Set flags we can use to make sure that dates have been provided.
    var hasStartFilter = this.filterStartDate !== "";
    var hasEndFilter = this.filterEndDate !== "";



    //Set the conditions for the start and end filters to return true, allowing the object to be pushed.
    if (hasStartFilter) {
      var startFilterCondition = meetingStart >= start;
    } else {
      var startFilterCondition = true
    }

    if (hasEndFilter) {
      var endFilterCondition = meetingEnd <= cookedEnd;
    } else {
      var endFilterCondition = true
    }
    
    if (hasStartFilter || hasEndFilter) {
      //Push if one of our filters is active.
      if (startFilterCondition == true && endFilterCondition == true) {
        output.push(meetings[i]);
      }

    } else {
      output.push(meetings[i]);
    }

    }
    

    return output;

  },
  sortedTimestampedMeetings: function() {
    function compare(a, b) {
      if (a.timestampStart < b.timestampStart)
        return -1;
      if (a.timestampStart > b.timestampStart)
        return 1;
      return 0;
    }

    return this.timestampedMeetings.sort(compare);
  },
  filteredUsers: function() {
			var category = this.selectedCategories;
			if(category.includes("All") && category.length == 1) {
				return this.meetings;
      } else {

        if (category.includes("All") && category.length > 1) {
          this.selectedCategories = this.selectedCategories.filter(e => e !== 'All');
        }

				return this.meetings.filter((meeting) => {
					var keys = Object.keys(meeting);
					var matchFilter = false;
          
          category.forEach((key) => {
						if(meeting[key] === "true") {
							matchFilter = true;
						}
          });
          
					return matchFilter;
				});				
			}
	}
},
methods : {
    cookedTimestamp(startDate, endDate) {
    var meetingDate = new Date(startDate).toLocaleString().split(', ')[0] //We assume here that no meetings go longer than the day they were scheduled for.
    
    var cookedStartDate = new Date(startDate).toLocaleString().split(', ')[1].replace(/:00 /g, '');
    var cookedEndDate = new Date(endDate).toLocaleString().split(', ')[1].replace(/:00 /g, '');
    var meetingDateCooked = meetingDate.split('/')[0] + "/" + meetingDate.split('/')[1];
    
    return meetingDateCooked + " " + cookedStartDate + " - " + cookedEndDate;
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
      var globalScope = this;
      axios
      .get('/rest/webex-meetings?$limit=9999')
      .then(function(response) {
        globalScope.meetings = response.data.data;
        })

    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
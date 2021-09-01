<style scoped>
.user-item {
    -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
}

th {
  text-align: left;
}
</style>

<template lang="pug">
.container.mx-auto.grid.grid-cols-1.row-gap-16.px-4.py-4(class='sm:px-6 sm:py-12 lg:px-8')
  .slack-users
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
      h2.text-display.leading-8.font-semi-bold.tracking-tight.font-aeries.text-gray-900.mb-4(class='sm:text-3xl sm:leading-9')
        | Slack users - {{activeUsers.length}}
      table.w-full
        tr
          th Avatar
          th Name
          th Title
          th Slack ID
        tr(v-for="(user, index) in activeUsers").h-12
          td.avatar
            img.inset-0.z-negative.h-8.rounded-full(loading='lazy' :src="user.profile.image_192" alt='anonymous')
          td.name
            h4(v-if="user.real_name" class='hover:text-primary whitespace-no-wrap text-subhead font-aeries text-secondary font-bold truncate') {{user.real_name}}
            h4(v-else class="hover:text-primary whitespace-no-wrap text-subhead font-bold truncate") {{user.name}}
          td.title
            p(v-if="user.profile.title" class="text-body text-neutral-1600 text-minimum-text") {{user.profile.title}}
            p(v-else class="text-sm text-neutral-800 text-italic text-minimum-text") No title
          td.slackID {{user.id}}

      .divider.border-t-2.border-neutral-500.my-8

      div.mt-6
        h2.text-title.font-aeries.font-semi-bold Copy and paste to Slack to tag a large number of users
        p(class="text-minimum-text mt-2" v-if="slackTagList.length") {{numberOfSelectedUsers}} selected
        p(class="text-minimum-text mt-2" v-else) 0 selected
        textarea(v-model="slackTagList" class="w-full mb-6 p-2 bg-neutral-400")

      div(class='sm:flex sm:items-baseline sm:justify-between')
        h2.text-display.leading-8.font-semi-bold.tracking-tight.font-aeries.text-gray-900(class='sm:text-3xl sm:leading-9')
          | Slack users - {{activeUsers.length}}
    .mt-6.grid.grid-cols-1.row-gap-8
      div(class='lg:grid-cols-4 lg:gap-5 border-t border-neutral-200 pt-2 grid grid-cols-1 row-gap-4')
        div(class='grid grid-cols-1 row-gap-4 sm:grid-cols-2 sm:col-gap-2 sm:row-gap-2 md:grid-cols-4 lg:col-span-4')
          
          div(class="flex user-item p-2 cursor-pointer border-dashed border-2 border-transparent hover:border-neutral-500" v-for="(user, index) in activeUsers" @click="selectUser(user, index, $event)" v-bind:class="{ 'bg-neutral-500' : user.selected }")
            .rounded-full.h-8.w-8.flex-shrink-0.mr-3.mt-1.overflow-hidden.shadow-inner.relative
              img.absolute.inset-0.z-negative.w-full.h-full(loading='lazy' :src="user.profile.image_192" alt='anonymous')
            .flex-1.leading-snug.w-0
              h4(v-if="user.real_name" class='hover:text-primary whitespace-no-wrap text-subhead font-aeries text-secondary font-bold truncate') {{user.real_name}}
              h4(v-else class="hover:text-primary whitespace-no-wrap text-subhead font-bold truncate") {{user.name}}
              p(v-if="user.profile.title" class="text-body text-neutral-1600 text-minimum-text") {{user.profile.title}}
              p(v-else class="text-sm text-neutral-800 text-italic text-minimum-text") No title
          
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        users: [],
        selectedCategories: ["All"],
        selectedUsers: [],
        lastSelectedUserIndex: "",
        currentUser : ""
    }
  },
computed : {
  numberOfSelectedUsers() {
    return this.slackTagList.split(' @').length;
  },
  slackTagList() {
    var slackTagList = [];
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].selected) {
        if (this.users[i].profile.real_name) {
          slackTagList.push("@" + this.users[i].real_name);
        } else if (this.users[i].profile.display_name) {
          slackTagList.push("@" + this.users[i].profile.display_name);
        } else {
          slackTagList.push("@" + this.users[i].name);
        }
      }
    }
    return slackTagList.join(" ");
  },
  activeUsers() {

    //Removing some user types we don't want to show as active Slack users.
    //This also catches users we filter out on mount, like Slackbot and "App team".
    var filters = [
      'deleted',
      'is_restricted',
      'is_bot',
    ]

    return this.users.filter((user) => {
					var keys = Object.keys(user);
					var matchFilter = true;    

          //Loop through the filters we provide above. This sets the true or false result for whether to include it.
          //If slack passes "true" for any of the values we want to filter out, do not include the result in the filter.
          filters.forEach((key) => {
						if(user[key] === "true") {
							matchFilter = false;
						}
          });

					return matchFilter; //true or false
				});
  },
  filteredUsers: function() {
			var category = this.selectedCategories;
			if(category.includes("All") && category.length == 1) {
				return this.users;
      } else {

        if (category.includes("All") && category.length > 1) {
          this.selectedCategories = this.selectedCategories.filter(e => e !== 'All');
        }

				return this.users.filter((user) => {
					var keys = Object.keys(user);
					var matchFilter = false;
          
          category.forEach((key) => {
						if(user[key] === "true") {
							matchFilter = true;
						}
          });
          
					return matchFilter;
				});				
			}
	}
},
methods : {
  selectIntermediateUsers(start, end) {
    var newUsersArray = this.activeUsers;``
    
    for (var i = 0; i < newUsersArray.length; i++) {
      if (i > start && i < end) {
        newUsersArray[i].selected = !newUsersArray[i].selected;
      }
    }
    this.users = newUsersArray;
  },
  selectUser(user, index, $event) {
    console.log($event, user.selected)
    if ($event.shiftKey) {
      this.selectIntermediateUsers(this.lastSelectedUserIndex, (index + 1))
    } else {
      this.$set(user, "selected", !user.selected);
    }
    
    this.lastSelectedUserIndex = index;
    
    // var newUsersArray = this.users;
    // newUsersArray[index].selected = 1;
    // this.users = newUsersArray;

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
      .get('/rest/users?$limit=1000&platform=slack')
      .then(function(response) {
        globalScope.users = response.data.data;
        })

    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
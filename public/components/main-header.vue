<template lang="pug">
header.border-b.border-neutral-1600.bg-neutral-1900.text-white
  div(class="header p-2 md:px-8")
    strong.font-aeries.text-title.tracking-tight
        a(href="/") Aeriesworks
    
    nav.nav
        span.nav__link.border-r.border-neutral-1200
        span(v-if="currentUser")
            a.nav__link(class="text-minimum-text md:text-body") 
              //- span(class="hidden md:inline") Aeries Team › 
              img(v-if="mySlackUserObject" :src="mySlackUserObject.profile.image_192" :title="currentUser" class="participant-image inline mr-2 xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
              span.font-bold {{currentUser}}
              a.ml-2.text-neutral-700(href="/logout") (Sign out)
        a(v-else class="text-blue-700 font-bold nav__link" href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=145184726370.964951757061") Sign in
</template>

<script>
const axios = require('axios');

module.exports = {
  data() {
    return {
        currentUser : "",
        allSlackUsers: []
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

  var globalScope = this;
          //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.allSlackUsers = response.data.data;
      })

    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},
computed: {
  mySlackUserObject() {
    var meid = this.getCookie('meid')
    for (var i = 0; i < this.allSlackUsers.length; i++) {
      if (this.allSlackUsers[i].id == meid) {
        return this.allSlackUsers[i];
      }
    }
  }
},
}
</script>
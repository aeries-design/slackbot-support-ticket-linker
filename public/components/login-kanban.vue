<style scoped>
.flex-container {
  height: 65vh;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
}
</style>

<template lang="pug">
.flex-container
    .container
        .text-center.mx-auto

            div.mb-10
            h1.font-aeries.font-bold.text-display.tracking-tight Aeriesworks Kanban
            div(class="lg:px-20")
                p Please sign in with your Aeries Slack account!

            div.mb-10
            a(class="inline-flex self-center" :href='slackHref')
                img.mx-auto.text-center(src='https://api.slack.com/img/sign_in_with_slack.png')
</template>

<script>

module.exports = {
data() {
    return {
        slackHref : "https://slack.com/oauth/authorize?scope=identity.basic&client_id=145184726370.964951757061&redirect_uri=https://my.aeries.works" + window.location.pathname
    }
},
methods: {
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
},
async mounted () {
    var wekanUserID = this.getCookie('Meteor.userId:/:/kanban');
    var wekanToken = this.getCookie('Meteor.loginToken:/:/kanban');
    if (wekanUserID) {
        window.localStorage.setItem('Meteor.userId:/:/kanban', wekanUserID)
        window.localStorage.setItem('Meteor.loginToken:/:/kanban', wekanToken)
        if (window.location.pathname == "/login/kanban") {
            window.location.href = "/kanban"
        } else {
            window.location.reload();
        }
    }

}
}
</script>
<template lang="pug">
div
  meetings-subheader
  .container.mt-12
      .text-center.mx-auto
          div
              h1.font-aeries.font-bold.text-display.tracking-tight Deep link into videos with timestamped chat
              div(class="lg:px-20")
              p.pb-4 ClipChat lets you annotate any video with sharable timestamps that work kind of like a live stream's chat, but for pre-recorded video. When you watch a video, your team's comments will appear in real-time according to when they were submitted.
              p Tag people to draw their attention to moments in the meeting, or reply to comments from your colleagues.
          div.mt-10.mb-10(v-if="!currentUser")
              a(
                class="inline-flex self-center" 
                href='https://slack.com/oauth/authorize?scope=identity.basic&client_id=145184726370.964951757061'
              )
                  img.mx-auto.text-center(
                    src='https://api.slack.com/img/sign_in_with_slack.png')

          div.mt-10.mb-20(v-else)
              a(class="inline-flex self-center font-aeries font-bold text-title text-blue-700" href='/meetings/videos')
                  | Go to videos ›

          div.flex.flex-row
            div.mb-10.mx-4
                h1.font-aeries.font-bold.text-title.tracking-tight Integrated with the team
                div(class="lg:px-20")
                p Tag other people in the chat using their Slack username to create a notification bringing specific points in the video to their attention. Or simply copy a link to a specific point in the video to discuss elsewhere. 

            div.mb-10.mx-4
                h1.font-aeries.font-bold.text-title.tracking-tight Search & share notes 
                div(class="lg:px-20")
                p Give developers or designers feedback on demonstration video clips or meeting recordings, or create a clickable time map of a meeting's structure and highlight important decision points.

            div.mb-10.mx-4
                h1.font-aeries.font-bold.text-title.tracking-tight Boost open culture
                div(class="lg:px-20")
                p ClipChat offers a portal into all the video content worth giving feedback on or linking into. Add Twitch chat-like functionality to your meeting recordings and enable collective feedback.

</template>

<script>

module.exports = {
data() {
    return {
        currentUser : ""
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
    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
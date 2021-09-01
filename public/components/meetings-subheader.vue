<template lang="pug">
  header.bg-neutral-300.border-b.border-neutral-600.shadow-sm
    div.container.header.flex.flex-row.self-center.align-center.content-center.justify-center
        .text-title.pb-1
            a(href="/meetings").text-blue-700.font-thin ClipChat
        
        nav.nav
            span
              a.ml-2.text-blue-700(href="/meetings/upload") Upload video
            span.nav__link.border-r.border-neutral-500
            span
                a.nav__link 
                a.text-blue-700(href="/meetings/videos") Browse videos</template>

<script>
const axios = require('axios');

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
computed: {}
}
</script>
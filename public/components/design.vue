<style scoped>
main {
  background-image: url('/images/topo-pattern-easel.svg'); 
  background-size: 102%; 
  background-repeat: no-repeat; 
  background-position: 0px -140px;
}

.big-dreams {
  background-image: url('/images/geometry-pattern.svg'); 
  background-size: 14%; 
  background-repeat: no-repeat; 
  background-position: 100% 0%;
}

.service {
  max-width: 300px;
}

.content {
  background-color: #f5f6fa;
}
</style>

<template lang="pug">
main.pt-6.h-full(style="")
  design-subheader
  section
    div
      div.container.pb-48.flex
        div(class="w-4/5")
          h2.text-xx-large.font-bold.font-aeries.py-12.text-white Projects, services and posts
          input(placeholder="What are you searching for? (e.g. mass email templates, icons)" class="w-4/5 appearance-none block bg-neutral-400 text-neutral-1700 border border-neutral-400 rounded py-3 px-4")

      div.content
        div(class="container pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-12 row-gap-4")
          div(class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 row-gap-4")
            h2.text-display.font-bold.font-aeries.w-full.text-center Popular services
            div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-4 row-gap-4")

              div(v-for="service in services"
              class="service bg-white shadow-md inline-flex flex-col p-6 flex-start items-start grid grid-cols-1")
                div
                  img(:src="service.image")
                h2.font-bold.font-aeries.w-full.text-body.mt-2.leading-tight.self-center {{service.title}}
            div(class="w-full self-end")
              .w-full.flex.align-center.justify-center.mt-6.cursor-pointer
                    a.w-full.text-center.border-2.border-blue-700.text-blue-700.py-2.font-bold.font-aeries.text-body.rounded
                      | See all services


          div(class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 row-gap-4")
            h2.text-display.font-bold.font-aeries.w-full.text-center #[a.text-blue-800.cursor-pointer(href="/design/sprint") Current sprint]
            .flex
              div(class="w-1/2")
                div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-2 row-gap-2")
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3 self-center contents-center")
                    div
                      h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title 7
                        div.text-body Big tasks
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3 self-center contents-center")
                    div
                      h2.font-bold.font-aeries.text-subhead.w-full.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title 23
                        div.text-body Little tasks
                div.mt-4.mb-4.border-b.border-1.border-neutral-500
                div
                  div.text-body.font-bold.font-aeries.text-subhead This week
                  div
                    <svg width="100%" height="41" viewBox="0 0 319 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                      <path opacity="0.3" d="M0 14.3796C0 14.3796 18.7814 19.9775 32.451 18.6309C42.6395 17.6276 54.4112 3.94397 66.0595 5.04441C80.5691 6.41538 73.9536 17.9114 88.0491 22.642C102.509 27.496 144.671 13.7121 169.471 14.9558C199.931 16.483 202.336 28.7545 225.953 25.6581C251.748 22.2769 250.296 12.6948 291.463 5.04441C303.881 2.73711 319.101 2.25516 319.101 2.25516V38.084C319.101 38.4608 318.986 38.8339 318.762 39.182C318.538 39.53 318.21 39.8463 317.796 40.1125C317.382 40.3788 316.891 40.5898 316.351 40.7336C315.811 40.8774 315.232 40.9512 314.647 40.9506L4.44073 40.66C3.26236 40.6589 2.13286 40.3563 1.30025 39.8189C0.467647 39.2814 -1.32566e-06 38.5529 0 37.7934L0 14.3796Z" fill="#BE202E"/>
                      <path d="M0 14.4338C0 14.4338 18.7814 20.0563 32.451 18.7026C42.6395 17.6956 54.4112 3.9515 66.0595 5.05695C80.5691 6.43402 73.9536 17.9812 88.0491 22.7331C102.509 27.6085 144.67 13.7633 169.471 15.0117C199.931 16.5458 202.336 28.872 225.953 25.7617C251.748 22.3654 250.296 12.7406 291.463 5.05623C303.881 2.73926 319.101 2.25516 319.101 2.25516" stroke="#EB5D69" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                      <path d="M0 17.8841C0 17.8841 39.742 25.905 52.0813 25.905C80.5536 25.905 88.0424 1.64062 102.509 1.64062C116.976 1.64062 134.2 20.654 169.471 21.0722C191.225 21.3298 199.053 3.96797 223.877 1.64062C245.741 -0.409396 269.518 29.0236 283.288 33.235C297.059 37.4465 319.101 30.7636 319.101 30.7636" stroke="#1649A0" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                      <path opacity="0.5" d="M0 17.9191C0 17.9191 39.742 25.9558 52.0813 25.9558C80.5536 25.9558 88.0419 1.64123 102.509 1.64123C116.977 1.64123 134.2 20.6947 169.471 21.1136C191.225 21.372 199.053 3.9736 223.877 1.64123C245.741 -0.413085 269.518 29.0818 283.288 33.3026C297.059 37.5234 319.101 30.8255 319.101 30.8255V38.0885C319.101 38.8488 318.632 39.5779 317.798 40.1155C316.964 40.6531 315.833 40.9551 314.654 40.9551H4.4474C3.26788 40.9551 2.13666 40.6531 1.30261 40.1155C0.468564 39.5779 0 38.8488 0 38.0885V17.9191Z" fill="#1649A0"/>
                      </g>
                      <defs>
                      <clipPath id="clip0">
                      <rect width="319" height="41" fill="white"/>
                      </clipPath>
                      </defs>
                    </svg>

                div(class="flex-col mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-2 row-gap-2")
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3 self-center contents-center")
                    div
                      h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title.text-red-500 0
                        div.text-body Big tasks created
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3")
                    div
                      h2.font-bold.font-aeries.text-subhead.w-full.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title.text-red-500 16
                        div.text-body Little tasks created
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3")
                    div
                      h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title.text-blue-700 3
                        div.text-body Big tasks closed
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3")
                    div
                      h2.font-bold.font-aeries.text-subhead.w-full.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title.text-blue-700 23
                        div.text-body Little tasks closed
            
              div(class="flex-col border-l border-1 border-neutral-500 ml-2 mr-2")

                  
              div(class="w-1/2")
                div
                  div.text-body.font-bold.font-aeries.text-subhead.mb-2 Can we take new requests?
                  .flex
                    div(class="w-1/2 flex justify-center self-center")
                      <svg width="92" height="82" viewBox="0 0 92 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.2559 80.42C14.7414 76.3464 10.2383 71.0663 7.09311 64.986C3.84319 58.6926 2.15281 51.7151 2.16338 44.6372C2.1627 41.6238 2.4668 38.6181 3.07106 35.6655C4.24147 29.9719 6.52533 24.5637 9.79231 19.7494C14.6404 12.5921 21.4674 6.98951 29.446 3.62048C32.1483 2.48167 34.9571 1.61233 37.8313 1.02517C43.772 -0.180712 49.8957 -0.180712 55.8364 1.02517C61.5497 2.19154 66.9766 4.46751 71.8075 7.72324C78.9895 12.5547 84.6113 19.3581 87.9919 27.3091C89.1342 30.0021 90.0061 32.8012 90.5949 35.6655C91.9185 42.1382 91.793 48.8221 90.2274 55.241C88.584 61.9286 85.4017 68.1434 80.9324 73.394C78.732 75.9819 76.2441 78.3125 73.5163 80.3412L67.6249 72.502C71.9089 69.323 75.4058 65.2089 77.8477 60.4749C79.0846 58.0738 80.0347 55.5364 80.6786 52.9148C82.1807 46.8145 81.9942 40.4225 80.1391 34.4194C78.284 28.4164 74.8297 23.0272 70.1442 18.8259C65.4587 14.6245 59.7174 11.7684 53.5318 10.5616C47.3463 9.35488 40.9481 9.84272 35.0187 11.9732C29.0894 14.1037 23.8509 17.797 19.8613 22.6597C15.8717 27.5225 13.2803 33.3727 12.3632 39.5871C11.4461 45.8015 12.2376 52.1474 14.6534 57.949C17.0692 63.7505 21.0188 68.7905 26.0816 72.532L20.2559 80.4196V80.42Z" fill="#E4EAF0"/>
                      <path d="M21.5664 81.4504C18.4677 79.3902 15.6113 76.9892 13.0511 74.2927C10.5406 71.6482 8.3541 68.7158 6.53766 65.5572C4.73163 62.4127 3.3327 59.0527 2.3743 55.5576C0.60962 49.0784 0.435816 42.2711 1.86757 35.7109C2.49495 32.8537 3.41788 30.0691 4.62155 27.4016C5.8243 24.7417 7.28731 22.2065 8.98936 19.8328C10.7097 17.4362 12.6516 15.2056 14.7896 13.1701L22.9382 20.1023C21.2737 21.6897 19.762 23.4289 18.4228 25.2971C17.0974 27.1476 15.9581 29.1238 15.0216 31.1969C14.0841 33.2765 13.3653 35.4473 12.8768 37.6746C11.7622 42.7866 11.8976 48.0908 13.2715 53.1398C14.0177 55.8641 15.1072 58.4833 16.5138 60.9349C17.9283 63.3971 19.6311 65.6833 21.5865 67.7455C23.5803 69.8483 25.805 71.7211 28.2187 73.3286L21.5664 81.4504Z" fill="#1649A0"/>
                      <path d="M44.9975 72.0292C60.4124 72.5657 73.348 60.5445 73.8899 45.1792C74.4318 29.8138 62.3749 16.9229 46.96 16.3864C31.5451 15.8499 18.6095 27.8711 18.0676 43.2364C17.5257 58.6018 29.5826 71.4927 44.9975 72.0292Z" stroke="#707070" stroke-width="4" stroke-miterlimit="10" stroke-dasharray="1 19"/>
                      <path d="M8.0166 6.78705L44.4897 43.7919C44.4897 43.7919 45.8652 44.7797 46.8331 43.7919C47.801 42.804 46.8331 41.4199 46.8331 41.4199L8.0166 6.78705Z" fill="#414D55"/>
                      </svg>
                    div(class="w-1/2")
                      p.text-minimum-text.mb-2 Bandwidth looks good.
                      p.text-minimum-text.mb-2 Small projects can be accepted quickly, big projects may have a longer acceptance delay.
                      p.text-minimum-text.text-blue-700
                        a Learn more



                div.text-body.font-bold.font-aeries.text-subhead.mt-2 Recently opened tasks
                p.text-minimum-text.text-blue-700.mb-4.mt-2
                        a Multi-state documentation appr...
                p.text-minimum-text.text-blue-700.mb-4.mt-2
                        a Procure branded RFP boxes
                p.text-minimum-text.text-blue-700.mb-4.mt-2
                        a Teacher app UI Makeover
                p.text-minimum-text.text-blue-700.mb-4.mt-2
                        a Process & publish webinar vide...
                p.text-minimum-text.text-blue-700.mb-4.mt-2
                        a Spring 2020 AeriesCon Mailer

            div(class="w-full")
              .w-full.flex.align-center.justify-center.mt-6.cursor-pointer
                    a.w-full.text-center.border-2.border-blue-700.text-blue-700.py-2.font-bold.font-aeries.text-body.rounded
                      | See all tasks and projects
          
        div.big-dreams
          div.container.flex.mt-24
            div(class="w-2/5")
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Small team, big dreams
              p.text-subhead.mb-6
                | Hello! We’re 
                | #[a.text-blue-700 David], 
                | #[a.text-blue-700 Garrett], 
                | #[a.text-blue-700 Adam] and 
                | #[a.text-blue-700 Zack], and we’re the Aeries Design team. 
              p.text-subhead.mb-6
                | We’re a multi-disciplinary team that is working to make the Aeries brand synonymous with words like “intuitive”, “modern” and “consistent”.
              p.text-subhead.mb-6
                | Our team's mission is to empower design across the entire organization. 

            div(class="w-3/5 flex justify-center")
              img(src="/images/design-team.svg")
        div.larger-org
          div.container.flex.mt-24
            div(class="w-3/5 flex justify-start")
              img(src="/images/design-lanes.svg")
            div(class="w-2/5")
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Our place in the larger org
              p.text-subhead.mb-6
                | In the places we overlap with other departments, we’re usually looking to provide a design perspective on usability, beauty, and consistency.
              p.text-subhead.mb-6
                | We help by taking time, doing research and fully developing ideas when the rest of the organization is busy making the magic happen real-time.
        div.blog-reel
          div.container.flex.mt-24
            div(class="w-full")
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Our blah-blah blog
              div(class="flex-col mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 col-gap-2 row-gap-2")
                div(class="bg-purple-800 shadow-md inline-flex flex-col px-2 pb-3 contents-center text-white")
                  div
                    h2.mt-2.leading-tight.flex.flex-col.justify-center
                      p.text-minimum-text.mb-4 David Lin-Clark  #[span.opacity-50 - #[span 31m ago]]
                      div.font-semi-bold.font-aeries.w-full.text-subhead.text-title.mb-6 2020 highlights: momentum is building
                      p.text-minimum-text Here we are again looking at another year. Around this time, our team likes to...
                div(class="bg-blue-800 shadow-md inline-flex flex-col px-2 pb-3 contents-center text-white")
                  div
                    h2.mt-2.leading-tight.flex.flex-col.justify-center
                      p.text-minimum-text.mb-4 Zack Guerrero  #[span.opacity-50 - #[span 4d ago]]
                      div.font-semi-bold.font-aeries.w-full.text-subhead.text-title.mb-6 Aeries Analytics user testing overview
                      p.text-minimum-text The results are in for the user tests of Aeries Analytics and things are looking...
                div(class="bg-red-600 shadow-md inline-flex flex-col px-2 pb-3 contents-center text-white")
                  div
                    h2.mt-2.leading-tight.flex.flex-col.justify-center
                      p.text-minimum-text.mb-4 Garrett Lloyd  #[span.opacity-50 - #[span 1w ago]]
                      div.font-semi-bold.font-aeries.w-full.text-subhead.text-title.mb-6 All-new expressive illustrations released
                      p.text-minimum-text In the beginning, we knew it was paramount to achieve a style that...
                div(class="bg-orange-600 shadow-md inline-flex flex-col px-2 pb-3 contents-center text-white")
                  div
                    h2.mt-2.leading-tight.flex.flex-col.justify-center
                      p.text-minimum-text.mb-4 Adam Remolacio  #[span.opacity-50 - #[span 1w ago]]
                      div.font-semi-bold.font-aeries.w-full.text-subhead.text-title.mb-6 Video report: week of April 6th, 2020
                      p.text-minimum-text Back at it again with another roundup of new videos published this week!               
          div.container.flex.mt-12.mb-24
            div(class="w-full text-center")
              a.font-aeries.text-title.font-bold.text-blue-700 Read design blog posts


</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        currentUser : "",
        services : [
          {
            title: "Graphic design",
            image: "/images/icon-graphic-design.svg"
          },
          {
            title: "Business card",
            image: "/images/icon-business-card.svg"
          },
          {
            title: "Shirts & apparel",
            image: "/images/icon-apparel.svg"
          },
          {
            title: "Emails & customer messaging",
            image: "/images/icon-emails.svg"
          },
          {
            title: "Video editing",
            image: "/images/icon-video-editing.svg"
          },
          {
            title: "General request",
            image: "/images/icon-general-request.svg"
          }
        ]
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
      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true')
      .then(function(response) {
        globalScope.totalSlackUsers = response.data.total;
      })

      //Confluence
      axios
      .get('/rest/users?platform=confluence&is_bot[$ne]=true')
      .then(function(response) {
        globalScope.totalConfluenceUsers = response.data.total;
      })
      
      //Slack
      axios
      .get('/rest/users?platform=jira&is_bot[$ne]=true')
      .then(function(response) {
        globalScope.totalJiraUsers = response.data.total;
      })



    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
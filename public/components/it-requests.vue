<style scoped>

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
  section
    div
      div.container.flex
        div(class="w-4/5")
          h2.text-xx-large.font-bold.font-aeries
            span.inline IT Slack requests
          p.text-title Dashboard for IT Slackbot interactions 
            //- a(class="inline-flex pl-2" href="/design/what-is-a-design-sprint")
            //-   <svg class="inline" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            //-   <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33325 14C2.33325 7.56 7.55992 2.33333 13.9999 2.33333C20.4399 2.33333 25.6666 7.56 25.6666 14C25.6666 20.44 20.4399 25.6667 13.9999 25.6667C7.55992 25.6667 2.33325 20.44 2.33325 14ZM15.1666 18.6667V21H12.8333V18.6667H15.1666ZM13.9999 23.3333C8.85489 23.3333 4.66656 19.145 4.66656 14C4.66656 8.85499 8.85489 4.66666 13.9999 4.66666C19.1449 4.66666 23.3332 8.85499 23.3332 14C23.3332 19.145 19.1449 23.3333 13.9999 23.3333ZM9.33325 11.6667C9.33325 9.08832 11.4216 6.99999 13.9999 6.99999C16.5783 6.99999 18.6666 9.08832 18.6666 11.6667C18.6666 13.1634 17.7449 13.9689 16.8475 14.7531C15.9961 15.4971 15.1666 16.2221 15.1666 17.5H12.8333C12.8333 15.3752 13.9324 14.5327 14.8988 13.7919C15.6569 13.2109 16.3333 12.6924 16.3333 11.6667C16.3333 10.3833 15.2833 9.33332 13.9999 9.33332C12.7166 9.33332 11.6666 10.3833 11.6666 11.6667H9.33325Z" fill="white"/>
            //-   </svg>

      div
        div.container.my-12
          div(class="w-full")
            h1.font-aeries.text-title.font-bold.leading-tight Urgent requests ({{urgentJiraTasks.length}})
            p.text-subhead.mb-6 Requests where the reporter indicated they need help ASAP!
            div(v-if="urgentJiraTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-4 row-gap-4")
              div(v-for="(task, index) in sortByTimestamp(urgentJiraTasks)"
                class="w-full bg-white border-t-4 border-red-600 shadow-md p-4 flex-start items-start grid grid-cols-1 hover:shadow-lg"
                )
                div(class="flex w-full justify-between mb-4")
                  div
                    | {{timeDifference(task.timestamp)}}
                  div(v-if="task.taskID" class="flex bg-white p-1 rounded")
                    a(target="_blank" :href="'https://jira.aeries.works/browse/' + task.taskID")
                      <svg title="User created a ticket for this request." class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve"><g id="_x31_84-jira"><g><g><g><path d="M473.387,243.152C407.892,177.837,321.192,90.509,256.415,26.001 C107.725,174.152,38.546,243.152,38.546,243.152c-7.099,7.098-7.099,18.599,0,25.784 c119.312,118.865,55.522,55.257,217.869,217.063c340.866-339.607,14.106-15.003,216.972-217.152 C480.575,261.751,480.575,250.25,473.387,243.152L473.387,243.152z" style="fill:#0052CC;"/></g></g><polygon points="256.415,324.013 188.135,256 256.415,187.988 324.697,256 " style="fill:#FFFFFF;"/></g></g><g id="Layer_1"/></svg>
                    a(target="_blank" :href="'https://aeriessis.slack.com/archives/'+task.channelID+'/p' + task.threadTimestampID.replace('.', '')")
                      <svg class="ml-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>

                  div(v-else)
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
                
                div
                  img(
                    v-if="task.username && getSlackUserByID(task.userID)" :src="getSlackUserByID(task.userID).profile.image_192"
                    class="rounded-full h-16 w-16 shadow-lg"
                    )
                h2(v-if="getSlackUserByID(task.userID)").font-semi-bold.w-full.mt-2.self-center @{{getSlackUserByID(task.userID).profile.display_name}}
                h2(v-else) No user found for ID {{task.userID}}
                div(class="flex text-blue-700 font-bold text-minimum-text justify-end mt-4")
                  a(class="resolve cursor-pointer" @click="resolveRequest(index, 'urgentJiraTasks')") RESOLVE
            div(v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-4 row-gap-4")
              p.italic None found.

  
        div.container.my-6.mt-12
          div(class="w-full")
            h1.font-aeries.text-title.font-bold.leading-tight Semi-urgent requests ({{semiUrgentJiraTasks.length}})
            p.text-subhead.mb-6 Requests where the reporter indicated they were impeded, but not that they need help ASAP.
            div(v-if="semiUrgentJiraTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 col-gap-4 row-gap-4")
              div(v-for="(task, index) in sortByTimestamp(semiUrgentJiraTasks)"
                class="w-full bg-white shadow-md p-4 flex-start items-start grid grid-cols- hover:shadow-lg border-t-2 border-orange-600"
                )
                div(class="flex w-full justify-between")
                  div
                    | {{timeDifference(task.timestamp)}}
                  div(v-if="task.taskID" class="flex")
                    a(target="_blank" :href="'https://jira.aeries.works/browse/' + task.taskID")
                      <svg title="User created a ticket for this request." class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve"><g id="_x31_84-jira"><g><g><g><path d="M473.387,243.152C407.892,177.837,321.192,90.509,256.415,26.001 C107.725,174.152,38.546,243.152,38.546,243.152c-7.099,7.098-7.099,18.599,0,25.784 c119.312,118.865,55.522,55.257,217.869,217.063c340.866-339.607,14.106-15.003,216.972-217.152 C480.575,261.751,480.575,250.25,473.387,243.152L473.387,243.152z" style="fill:#0052CC;"/></g></g><polygon points="256.415,324.013 188.135,256 256.415,187.988 324.697,256 " style="fill:#FFFFFF;"/></g></g><g id="Layer_1"/></svg>
                    a(target="_blank" :href="'https://aeriessis.slack.com/archives/'+task.channelID+'/p' + task.threadTimestampID.replace('.', '')")
                      <svg class="ml-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>

                  div(v-else)
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
                div.flex.justify-center.mt-6
                  img(
                    v-if="task.username && getSlackUserByID(task.userID)" :src="getSlackUserByID(task.userID).profile.image_192"
                    class="rounded-full h-16 w-16 shadow-lg"
                    )
                h2(v-if="getSlackUserByID(task.userID)").font-semi-bold.w-full.mt-2.self-center @{{getSlackUserByID(task.userID).profile.display_name}}
                h2(v-else) No user found for ID {{task.userID}}
                div(class="flex text-blue-700 font-bold text-minimum-text justify-end mt-4")
                  a(class="resolve cursor-pointer" @click="resolveRequest(index, 'semiUrgentJiraTasks')") RESOLVE
            div(v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-4 row-gap-4")
              p.italic None found.

        div.container.my-6.mt-12
          div(class="w-full")
            h1.font-aeries.text-title.font-bold.leading-tight Non-urgent requests ({{nonUrgentJiraTasks.length}})
            p.text-subhead.mb-6 Requests you can take your time on.
            div(v-if="nonUrgentJiraTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 col-gap-4 row-gap-4")
              div(v-for="(task, index) in sortByTimestamp(nonUrgentJiraTasks)"
                class="w-full bg-white shadow-md p-4 flex-start items-start grid grid-cols-1 hover:shadow-lg"
                )
                div(class="flex w-full justify-between")
                  div
                    | {{timeDifference(task.timestamp)}}
                  div(v-if="task.taskID" class="flex")
                    a(target="_blank" :href="'https://jira.aeries.works/browse/' + task.taskID")
                      <svg title="User created a ticket for this request." class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve"><g id="_x31_84-jira"><g><g><g><path d="M473.387,243.152C407.892,177.837,321.192,90.509,256.415,26.001 C107.725,174.152,38.546,243.152,38.546,243.152c-7.099,7.098-7.099,18.599,0,25.784 c119.312,118.865,55.522,55.257,217.869,217.063c340.866-339.607,14.106-15.003,216.972-217.152 C480.575,261.751,480.575,250.25,473.387,243.152L473.387,243.152z" style="fill:#0052CC;"/></g></g><polygon points="256.415,324.013 188.135,256 256.415,187.988 324.697,256 " style="fill:#FFFFFF;"/></g></g><g id="Layer_1"/></svg>
                    a(target="_blank" :href="'https://aeriessis.slack.com/archives/'+task.channelID+'/p' + task.threadTimestampID.replace('.', '')")
                      <svg class="ml-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>

                  div(v-else)
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
                div.flex.justify-center.mt-6
                  img(
                    v-if="task.username && getSlackUserByID(task.userID)" :src="getSlackUserByID(task.userID).profile.image_192"
                    class="rounded-full h-16 w-16 shadow-lg"
                    )
                h2(v-if="getSlackUserByID(task.userID)").font-semi-bold.w-full.mt-2.self-center @{{getSlackUserByID(task.userID).profile.display_name}}
                h2(v-else) No user found for ID {{task.userID}}
                div(class="flex text-blue-700 font-bold text-minimum-text justify-end mt-4")
                  a(class="resolve cursor-pointer" @click="resolveRequest(index, 'nonUrgentJiraTasks')") RESOLVE
            div(v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-4 row-gap-4")
              p.italic None found.


        div.container.my-6.mt-12
          div(class="w-full")
            h1.font-aeries.text-title.font-bold.leading-tight Quick questions ({{quickQuestions.length}})
            p.text-subhead.mb-6 Messages that the requester did not feel was complicated enough to require the creation of a ticket.
            div(v-if="quickQuestions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 col-gap-4 row-gap-4")
              div(v-for="(task, index) in sortByTimestamp(quickQuestions)"
                class="w-full bg-white shadow-md p-4 flex-start items-start grid grid-cols-1 hover:shadow-lg"
                )
                div(class="flex w-full justify-between mb-4")
                  div
                    | {{timeDifference(task.timestamp)}}
                  a(target="_blank" :href="'https://aeriessis.slack.com/archives/'+task.channelID+'/p' + task.threadTimestampID.replace('.', '')")
                    <svg class="ml-1 w-6 h-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 2447.6 2452.5" viewBox="0 0 2447.6 2452.5"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/><path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/><path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/><path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/></g></svg>
                div
                  img(
                    v-if="task.username && getSlackUserByID(task.userID)" :src="getSlackUserByID(task.userID).profile.image_192"
                    class="rounded-full h-16 w-16 shadow-lg"
                    )
                h2(v-if="getSlackUserByID(task.userID)").font-semi-bold.w-full.mt-2.self-center @{{getSlackUserByID(task.userID).profile.display_name}}
                h2(v-else) No user found for ID {{task.userID}}
                div(class="flex text-blue-700 font-bold text-minimum-text justify-end mt-4")
                  a(class="resolve cursor-pointer" @click="resolveRequest(index, 'quickQuestions')") RESOLVE
            div(v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-4 row-gap-4")
              p.italic None found.

</template>

<script>
const axios = require('axios');

module.exports = {
  props: ['tasks'],
data() {
    return {
        currentUser : "",
        slackUsers: [],
    }
  },
methods : {
  resolveRequest(index, list) {
    if (confirm("Resolve task? This will archive the request so it doesn't show on the dashboard.")) {
         var taskID = this.sortByTimestamp(this[list])[index]._id;
          var thisScope = this;
            axios.patch('/rest/it-slack-requests/' + taskID, {archived: true})
            .then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // console.log(this.sortByTimestamp(list)[index])
    
  },
    sortByTimestamp: function(array) {
    return array.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  },
  timeDifference(previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = new Date().getTime() - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
},
  getSlackUserByID(id) {
    var users = this.slackUsers;
    var user = false;
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        user = users[i];
      }
    }
    return user;
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
  activeTasks() {
    var active = [];
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].hasOwnProperty('archived')) {
        if (this.tasks[i].archived !== true) {
          active.push(this.tasks[i])
        } else {
          //Do nothing, it's archived
        }
      } else {
        active.push(this.tasks[i])
      }
    }
    return active;
  },
  quickQuestions() {
    var questionTasks = [];
    for (var i = 0; i < this.activeTasks.length; i++) {
      if (this.activeTasks[i].hasOwnProperty('taskID') == false
      && this.activeTasks[i].archived !== true) {
        questionTasks.push(this.activeTasks[i])
      }
    }
    return questionTasks;
  },
  urgentJiraTasks() {
    var jiraTaskRequests = [];
    for (var i = 0; i < this.activeTasks.length; i++) {
      if (this.activeTasks[i].hasOwnProperty('taskID') == true
          && this.activeTasks[i].taskUrgency == "Highest") {
        jiraTaskRequests.push(this.activeTasks[i])
      }
    }
    return jiraTaskRequests;
  },
      semiUrgentJiraTasks() {
    var jiraTaskRequests = [];
    for (var i = 0; i < this.activeTasks.length; i++) {
      if (this.activeTasks[i].hasOwnProperty('taskID') == true
          && this.activeTasks[i].taskUrgency == "Medium") {
        jiraTaskRequests.push(this.activeTasks[i])
      }
    }
    return jiraTaskRequests;
  },
    nonUrgentJiraTasks() {
    var jiraTaskRequests = [];
    for (var i = 0; i < this.activeTasks.length; i++) {
      if (this.activeTasks[i].hasOwnProperty('taskID') == true
          && this.activeTasks[i].taskUrgency == "Low") {
        jiraTaskRequests.push(this.activeTasks[i])
      }
    }
    return jiraTaskRequests;
  },
  jiraTasks() {
    var jiraTaskRequests = [];
    for (var i = 0; i < this.activeTasks.length; i++) {
      if (this.activeTasks[i].hasOwnProperty('taskID') == true) {
        jiraTaskRequests.push(this.activeTasks[i])
      }
    }
    return jiraTaskRequests;
  }
},
async mounted () {

      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=999')
      .then(function(response) {
        globalScope.slackUsers = response.data.data;
      })


    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
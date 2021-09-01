<style scoped>
main {
  background-image: url('/images/topo-pattern.svg'); 
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
      div.container.flex
        div(class="w-4/5")
          h2.text-xx-large.font-bold.font-aeries.py-10.text-white 
            span.inline Design sprint dashboard
            a(class="inline-flex pl-2" href="/design/what-is-a-design-sprint")
              <svg class="inline" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33325 14C2.33325 7.56 7.55992 2.33333 13.9999 2.33333C20.4399 2.33333 25.6666 7.56 25.6666 14C25.6666 20.44 20.4399 25.6667 13.9999 25.6667C7.55992 25.6667 2.33325 20.44 2.33325 14ZM15.1666 18.6667V21H12.8333V18.6667H15.1666ZM13.9999 23.3333C8.85489 23.3333 4.66656 19.145 4.66656 14C4.66656 8.85499 8.85489 4.66666 13.9999 4.66666C19.1449 4.66666 23.3332 8.85499 23.3332 14C23.3332 19.145 19.1449 23.3333 13.9999 23.3333ZM9.33325 11.6667C9.33325 9.08832 11.4216 6.99999 13.9999 6.99999C16.5783 6.99999 18.6666 9.08832 18.6666 11.6667C18.6666 13.1634 17.7449 13.9689 16.8475 14.7531C15.9961 15.4971 15.1666 16.2221 15.1666 17.5H12.8333C12.8333 15.3752 13.9324 14.5327 14.8988 13.7919C15.6569 13.2109 16.3333 12.6924 16.3333 11.6667C16.3333 10.3833 15.2833 9.33332 13.9999 9.33332C12.7166 9.33332 11.6666 10.3833 11.6666 11.6667H9.33325Z" fill="white"/>
              </svg>


      div.content
        div.container
          div(class="w-full flex flex-row pt-10")
            a(href="/design/sprints/" class="font-aeries text-subhead font-bold text-blue-700 inline-block justify-center") Sprints /
            a(href="#" class="pl-2 font-aeries text-subhead font-bold text-blue-700 inline-block justify-center")   {{sprint.sprint.sprintName}}
            

        div(class="container pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-12 row-gap-4")

          //- div(class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 row-gap-4")
          //-   h2.text-display.font-bold.font-aeries.w-full.text-center Popular services
          //-   div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-4 row-gap-4")

          //-     div(v-for="service in services"
          //-     class="service bg-white shadow-md inline-flex flex-col p-6 flex-start items-start grid grid-cols-1")
          //-       div
          //-         img(:src="service.image")
          //-       h2.font-bold.font-aeries.w-full.text-body.mt-2.leading-tight.self-center {{service.title}}
          //-   div(class="w-full self-end")
          //-     .w-full.flex.align-center.justify-center.mt-6.cursor-pointer
          //-           a.w-full.text-center.border-2.border-blue-700.text-blue-700.py-2.font-bold.font-aeries.text-body.rounded
          //-             | See all services

          div(class="flex flex-col leading-tight justify-end")
            div(class="w-full flex flex-row")
              div(class="w-3/5 mr-4")
                .font-body.font-bold You're viewing the sprint week of
                a.text-xx-large.font-bold.font-aeries.w-full {{currentlySelectedWeek}}
                div(v-if="daysIn > 7" class="font-body font-bold mb-2 self-center") The sprint ended {{daysIn - 7}} days ago.
                div(v-else-if="daysIn > 0" class="font-body font-bold mb-2 self-center") We're {{daysIn}} day#[span(v-if="daysIn > 1") s] in
                div(v-else class="font-body font-bold mb-2 self-center") {{daysIn.toString().split('-')[1]}} day#[span(v-if="daysIn < -1") s] ago
                //- <svg width="100%" height="41" viewBox="0 0 319 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                //-   <g clip-path="url(#clip0)">
                //-   <path opacity="0.3" d="M0 14.3796C0 14.3796 18.7814 19.9775 32.451 18.6309C42.6395 17.6276 54.4112 3.94397 66.0595 5.04441C80.5691 6.41538 73.9536 17.9114 88.0491 22.642C102.509 27.496 144.671 13.7121 169.471 14.9558C199.931 16.483 202.336 28.7545 225.953 25.6581C251.748 22.2769 250.296 12.6948 291.463 5.04441C303.881 2.73711 319.101 2.25516 319.101 2.25516V38.084C319.101 38.4608 318.986 38.8339 318.762 39.182C318.538 39.53 318.21 39.8463 317.796 40.1125C317.382 40.3788 316.891 40.5898 316.351 40.7336C315.811 40.8774 315.232 40.9512 314.647 40.9506L4.44073 40.66C3.26236 40.6589 2.13286 40.3563 1.30025 39.8189C0.467647 39.2814 -1.32566e-06 38.5529 0 37.7934L0 14.3796Z" fill="#BE202E"/>
                //-   <path d="M0 14.4338C0 14.4338 18.7814 20.0563 32.451 18.7026C42.6395 17.6956 54.4112 3.9515 66.0595 5.05695C80.5691 6.43402 73.9536 17.9812 88.0491 22.7331C102.509 27.6085 144.67 13.7633 169.471 15.0117C199.931 16.5458 202.336 28.872 225.953 25.7617C251.748 22.3654 250.296 12.7406 291.463 5.05623C303.881 2.73926 319.101 2.25516 319.101 2.25516" stroke="#EB5D69" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                //-   <path d="M0 17.8841C0 17.8841 39.742 25.905 52.0813 25.905C80.5536 25.905 88.0424 1.64062 102.509 1.64062C116.976 1.64062 134.2 20.654 169.471 21.0722C191.225 21.3298 199.053 3.96797 223.877 1.64062C245.741 -0.409396 269.518 29.0236 283.288 33.235C297.059 37.4465 319.101 30.7636 319.101 30.7636" stroke="#1649A0" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"/>
                //-   <path opacity="0.5" d="M0 17.9191C0 17.9191 39.742 25.9558 52.0813 25.9558C80.5536 25.9558 88.0419 1.64123 102.509 1.64123C116.977 1.64123 134.2 20.6947 169.471 21.1136C191.225 21.372 199.053 3.9736 223.877 1.64123C245.741 -0.413085 269.518 29.0818 283.288 33.3026C297.059 37.5234 319.101 30.8255 319.101 30.8255V38.0885C319.101 38.8488 318.632 39.5779 317.798 40.1155C316.964 40.6531 315.833 40.9551 314.654 40.9551H4.4474C3.26788 40.9551 2.13666 40.6531 1.30261 40.1155C0.468564 39.5779 0 38.8488 0 38.0885V17.9191Z" fill="#1649A0"/>
                //-   </g>
                //-   <defs>
                //-   <clipPath id="clip0">
                //-   <rect width="319" height="41" fill="white"/>
                //-   </clipPath>
                //-   </defs>
                //- </svg>
              div(class="w-2/5")
                .flex-col
                  div(class="bg-white shadow-md flex-col p-2 mt-2")
                    div
                      h2.font-bold.font-aeries.w-full.text-subhead.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title.text-red-500 {{taskCounts.allTasks}}
                        div.text-body Tasks in sprint
                  div(class="bg-white shadow-md flex-col p-2 mt-2")
                    div
                      h2.font-bold.font-aeries.text-subhead.w-full.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.text-title.text-blue-700 {{taskCounts.tasksClosedCount}}
                        div.text-body Tasks closed
          
          div(class="flex flex-col leading-tight")
            .font-body.font-bold Sprint codename
            a.text-blue-800.text-xx-large.font-bold.font-aeries.w-full {{sprint.sprint.sprintName}}
            .flex
              div(class="w-full")
                div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-2 row-gap-2")
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3 self-center contents-center")
                    div
                      h2.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.mb-2
                          a(:href="'/design/sprint?sprintWeek=' + lastSprint.sprintWeek" v-if="lastSprint").cursor-pointer
                            <svg v-if="lastSprint" width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.65381 0.310113C6.09887 -0.103324 6.8208 -0.103395 7.26601 0.310043C7.71115 0.72355 7.71123 1.39393 7.26601 1.80744L3.89204 4.94129H17.86C18.4896 4.94129 19 5.41536 19 6.00011C19 6.58487 18.4896 7.05894 17.86 7.05894H3.89219L7.26601 10.1925C7.71123 10.606 7.71123 11.2764 7.26601 11.6899C7.04341 11.8967 6.75164 12 6.45987 12C6.16811 12 5.87634 11.8967 5.65381 11.6899L0.333908 6.74885C-0.111303 6.33541 -0.111303 5.66496 0.333908 5.25145L5.65381 0.310113Z" fill="#1D3878"/>
                            </svg>
                            <svg v-else width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.65381 0.310113C6.09887 -0.103324 6.8208 -0.103395 7.26601 0.310043C7.71115 0.72355 7.71123 1.39393 7.26601 1.80744L3.89204 4.94129H17.86C18.4896 4.94129 19 5.41536 19 6.00011C19 6.58487 18.4896 7.05894 17.86 7.05894H3.89219L7.26601 10.1925C7.71123 10.606 7.71123 11.2764 7.26601 11.6899C7.04341 11.8967 6.75164 12 6.45987 12C6.16811 12 5.87634 11.8967 5.65381 11.6899L0.333908 6.74885C-0.111305 6.33541 -0.111305 5.66496 0.333908 5.25145L5.65381 0.310113Z" fill="#C0C6D0"/>
                            </svg>

                        .font-body.font-bold Last week's was
                        a(:href="'/design/sprint?sprintWeek=' + lastSprint.sprintWeek" v-if="lastSprint").text-blue-800.cursor-pointer.text-title.font-bold.font-aeries.w-full {{lastSprint.sprintName}} 
                          p.text-minimum-text ({{lastSprint.sprintWeek}})
                        a(v-else).text-neutral-800.cursor-pointer.text-title.font-bold.font-aeries.w-full Not yet named
                  div(class="bg-white shadow-md inline-flex flex-col px-2 pb-3 self-center contents-center")
                    div
                      h2.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center
                        div.mb-2
                          a(:href="'/design/sprint?sprintWeek=' + nextSprint.sprintWeek" v-if="nextSprint").cursor-pointer
                            <svg v-if="nextSprint" width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.3462 0.310113C12.9011 -0.103324 12.1792 -0.103395 11.734 0.310043C11.2888 0.72355 11.2888 1.39393 11.734 1.80744L15.108 4.94129H1.14001C0.510421 4.94129 0 5.41536 0 6.00011C0 6.58487 0.510421 7.05894 1.14001 7.05894H15.1078L11.734 10.1925C11.2888 10.606 11.2888 11.2764 11.734 11.6899C11.9566 11.8967 12.2484 12 12.5401 12C12.8319 12 13.1237 11.8967 13.3462 11.6899L18.6661 6.74885C19.1113 6.33541 19.1113 5.66496 18.6661 5.25145L13.3462 0.310113Z" fill="#1D3878"/>
                            </svg>
                            <svg v-else width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.3462 0.310113C12.9011 -0.103324 12.1792 -0.103395 11.734 0.310043C11.2888 0.72355 11.2888 1.39393 11.734 1.80744L15.108 4.94129H1.14001C0.510421 4.94129 0 5.41536 0 6.00011C0 6.58487 0.510421 7.05894 1.14001 7.05894H15.1078L11.734 10.1925C11.2888 10.606 11.2888 11.2764 11.734 11.6899C11.9566 11.8967 12.2484 12 12.5401 12C12.8319 12 13.1237 11.8967 13.3462 11.6899L18.6661 6.74885C19.1113 6.33541 19.1113 5.66496 18.6661 5.25145L13.3462 0.310113Z" fill="#C0C6D0"/>
                            </svg>



                        .font-body.font-bold Next week's is
                        a(:href="'/design/sprint?sprintWeek=' + nextSprint.sprintWeek" v-if="nextSprint").text-blue-800.cursor-pointer.text-title.font-bold.font-aeries.w-full {{nextSprint.sprintName}}
                          p.text-minimum-text ({{nextSprint.sprintWeek}})
                        a(v-else).text-neutral-800.text-title.font-bold.font-aeries.w-full Not yet named
        
        //- div
          div.container.flex.mt-12
            div(class="w-full self-center")
              h1.font-aeries.text-title.font-bold.leading-tight 📅
              h1.font-aeries.text-title.font-bold.leading-tight Calendar availability bulletin
              h1.font-body.leading-tight.mb-6.text-neutral-1200 If anyone's not going to be available during normal working hours this week, it'll show here. #[a.text-blue-700 Learn more]
              div.pl-4.border-l-4.border-neutral-700.italic
                div.avatars.mb-1
                  img(src="/images/example-avatar-david.png").inline
                  img(src="/images/example-avatar-zack.png").inline
                  img(src="/images/example-avatar-adam.png").inline
                  img(src="/images/example-avatar-garrett.png").inline
                p.text-subhead.mb-6
                  | Adam and Zack have PTO on their calendars this week. Garrett has an all-day appointment.
                .flex.flex-row
                  p.text-subhead.inline-block.mr-2.self-center
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12.5" cy="12.5" r="12.5" fill="#1D3878"/>
                    <path d="M12.5 15.1245C12.1581 15.1245 11.8651 15.0155 11.6208 14.7975C11.3929 14.5795 11.2464 14.2681 11.1813 13.8632L9.91138 6.59929C9.8951 6.50586 9.88696 6.3813 9.88696 6.22558C9.88696 5.52488 10.1312 4.97989 10.6196 4.59061C11.1243 4.18576 11.7511 3.98334 12.5 3.98334C13.2652 3.98334 13.892 4.18576 14.3804 4.59061C14.8688 4.99546 15.113 5.54824 15.113 6.24894C15.113 6.40465 15.1049 6.52922 15.0886 6.62265L13.7943 13.8632C13.7455 14.2681 13.5989 14.5795 13.3547 14.7975C13.1268 15.0155 12.8419 15.1245 12.5 15.1245ZM12.5 20.7068C11.8162 20.7068 11.2464 20.4888 10.7905 20.0528C10.351 19.6168 10.1312 19.0796 10.1312 18.4412C10.1312 17.8027 10.351 17.2655 10.7905 16.8295C11.2464 16.3935 11.8162 16.1756 12.5 16.1756C13.1675 16.1756 13.721 16.3935 14.1606 16.8295C14.6165 17.2655 14.8444 17.8027 14.8444 18.4412C14.8444 19.0796 14.6165 19.6168 14.1606 20.0528C13.721 20.4888 13.1675 20.7068 12.5 20.7068Z" fill="white"/>
                    </svg>
                  p.inline-block.text-subhead.self-center
                    a.font-bold.border-b-2.border-blue-700.text-blue-700.inline David called out sick today.

        div
          div.container.flex.my-24
            div(class="w-2/5 self-center")
              span.font-bold.text-minimum-text DESIGN TEAM KICKOFF NOTES
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 {{sprint.kickoffNotes.title}}
              .italic(v-html="sprint.kickoffNotes.contents")
              h1.font-aeries.text-title.font-bold.leading-tight.mb-6 • Design team
            div(class="w-3/5 flex self-center justify-center")
              div(class="w-1/2")
                img(:src="'https://docs.aeries.works/' + sprint.kickoffNotes.image").rounded

        div.big-dreams
          div.container.flex.my-20
            div(class="w-full")
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Big tasks ({{Object.keys(sprint.bigTasks).length}})
              div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 col-gap-8 row-gap-8")
                  a(v-for="bigTask in sprint.bigTasks" target="_blank" :href="'https://jira.aeries.works/projects/' + bigTask[0].fields.project.key")
                    div(class="bg-white shadow-md px-4 py-4 self-center contents-center rounded hover:shadow-lg animate")
                      div
                        h2.leading-tight.flex.inline-flex.flex-col.justify-center
                          div.my-2
                            img.h-12(src='/images/icon-graphic-design.svg')
                          a.text-neutral-1900.cursor-pointer.text-display.font-bold.font-aeries.w-full {{bigTask[0].fields.project.name.split('Design Dept - ')[1]}}
                    div(class="w-full py-2 pl-2 flex justify-between")
                      div
                        p.text-subhead.font-semi-bold.inline.pr-3 Estimated completion: {{Math.round(countTaskHours[bigTask[0].fields.project.key] / 8 / 5)}} weeks
                      div
                        p.text-subhead.font-semi-bold.inline.pr-2 {{sprint.bigTasks[bigTask[0].fields.project.key].length}} little tasks 
                        <svg class="inline" width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.7662 0.441099C18.1404 -0.146966 17.1253 -0.147067 16.4992 0.440999C15.8733 1.02916 15.8732 1.9827 16.4992 2.57087L21.2434 7.0284H1.60298C0.717707 7.0284 0 7.70271 0 8.53446C0 9.3662 0.717707 10.0405 1.60298 10.0405H21.2432L16.4992 14.4976C15.8732 15.0858 15.8732 16.0393 16.4992 16.6275C16.8123 16.9216 17.2225 17.0686 17.6328 17.0686C18.043 17.0686 18.4533 16.9216 18.7662 16.6275L26.2465 9.59944C26.8725 9.01137 26.8725 8.05774 26.2465 7.46957L18.7662 0.441099Z" fill="#0C1E41"/>
                        </svg>

        div(v-if="sprint.jiraIssues['DSGNQUEUE']")
          div.container.my-24
            div(class="w-full")
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Little tasks ({{sprint.jiraIssues['DSGNQUEUE'].length}})
              div(class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 col-gap-4 row-gap-4")
                a(v-for="task in sprint.jiraIssues['DSGNQUEUE']"
                  class="w-full shadow-md p-4 flex-start items-start grid grid-cols-1 hover:shadow-lg"
                  v-bind:class="{'bg-white' : task.fields.status.statusCategory.key !== 'done','bg-green-200' : task.fields.status.statusCategory.key == 'done'}"
                  target="_blank" :href="'https://jira.aeries.works/browse/' + task.key"
                  )
                  div
                    img(v-if="task.image" :src="task.image")
                    img(v-else src="/images/icon-general-request.svg")
                  h2(v-bind:class="{'text-green-800' : task.fields.status.statusCategory.key == 'done'}").font-semi-bold.w-full.mt-2.self-center {{task.fields.summary}}
            div(class="w-full mt-12")
              a(href="/design/what-is-a-design-sprint").cursor-pointer.text-title.font-bold.border-blue-700.text-blue-700.inline.pr-4 Curious how design sprints work? Read the post!
              <svg class="inline" width="27" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.7662 0.441099C18.1404 -0.146966 17.1253 -0.147067 16.4992 0.440999C15.8733 1.02916 15.8732 1.9827 16.4992 2.57087L21.2434 7.0284H1.60298C0.717707 7.0284 0 7.70271 0 8.53446C0 9.3662 0.717707 10.0405 1.60298 10.0405H21.2432L16.4992 14.4976C15.8732 15.0858 15.8732 16.0393 16.4992 16.6275C16.8123 16.9216 17.2225 17.0686 17.6328 17.0686C18.043 17.0686 18.4533 16.9216 18.7662 16.6275L26.2465 9.59944C26.8725 9.01137 26.8725 8.05774 26.2465 7.46957L18.7662 0.441099Z" fill="#345BA9"/>
              </svg>


        div
          div.container.my-24
            div(class="w-full")
              h1.font-aeries.text-xx-large.font-bold.leading-tight.mb-6 Learn more about #[span.text-blue-800 {{sprint.sprint.sprintName}}]
            div(class="w-3/5")
              .learn-more.flex.flex-row
                .items(class="w-1/5")
                  .item.font-bold.text-subhead.text-center.px-2.py-6.leading-tight.bg-neutral-400 Planning docs
                  //- .item.text-subhead.text-center.px-2.py-6.leading-tight Retrospective docs
                  //- .item.text-subhead.text-center.px-2.py-6.leading-tight Daily standups
                  //- .item.text-subhead.text-center.px-2.py-6.leading-tight This Week In Design
                  //- .item.text-subhead.text-center.px-2.py-6.leading-tight Meeting recordings
                .learn-more-content(class="w-4/5 p-4 bg-neutral-500")
                  div
                    .inline
                      <svg class="inline" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                        <path d="M0.447903 9.89959C0.320159 10.1272 0.176693 10.3913 0.054845 10.6017C-0.0542184 10.8031 0.00433118 11.0628 0.18652 11.1858L2.7414 12.9036C2.83108 12.9641 2.93924 12.9827 3.0416 12.9553C3.14396 12.9278 3.23194 12.8566 3.28578 12.7576C3.38798 12.5708 3.51965 12.3282 3.66312 12.0683C4.67524 10.2432 5.69327 10.4665 7.52885 11.4242L10.0621 12.7404C10.1581 12.7903 10.2684 12.7957 10.368 12.7552C10.4676 12.7147 10.548 12.632 10.5908 12.5257L11.8073 9.51952C11.8932 9.30481 11.8058 9.05447 11.6108 8.95693C11.0762 8.68208 10.013 8.13453 9.05588 7.62992C5.61269 5.80259 2.68637 5.92069 0.447903 9.89959Z" fill="url(#paint0_linear)"/>
                        <path d="M11.9038 3.0773C12.0316 2.84969 12.175 2.58557 12.2969 2.37514C12.4059 2.17377 12.3474 1.91406 12.1652 1.79108L9.61032 0.0732615C9.51991 0.00672638 9.40827 -0.0157964 9.30207 0.0110742C9.19587 0.0379448 9.10465 0.111795 9.05021 0.214982C8.94802 0.401794 8.81634 0.644436 8.67288 0.904256C7.66075 2.72944 6.64273 2.50612 4.80715 1.54844L2.28175 0.238602C2.18581 0.188707 2.07546 0.183379 1.97586 0.223832C1.87627 0.264286 1.7959 0.347074 1.75309 0.453329L0.536571 3.45951C0.450622 3.67422 0.538077 3.92456 0.7331 4.0221C1.26766 4.29695 2.33088 4.8445 3.28798 5.34911C6.73903 7.1743 9.66535 7.0519 11.9038 3.0773Z" fill="url(#paint1_linear)"/>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear" x1="11.7385" y1="13.7904" x2="8.42555" y2="6.8342" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#0052CC"/>
                        <stop offset="1" stop-color="#2684FF"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="0.613218" y1="-0.81571" x2="3.93126" y2="6.14352" gradientUnits="userSpaceOnUse">
                        <stop offset="0.18" stop-color="#0052CC"/>
                        <stop offset="1" stop-color="#2684FF"/>
                        </linearGradient>
                        <clipPath id="clip0">
                        <rect width="12.3819" height="13" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
 
                    a(target="_blank" :href="'https://docs.aeries.works/pages/viewpage.action?pageId=' + sprint.sprint.confluenceDocs.home").font-bold.text-blue-700 Pages come from the Confluence page for {{sprint.sprint.sprintName}}
                    
                    div.pt-6
                      a(target="_blank" :href="'https://docs.aeries.works' + doc._links.tinyui" v-for="doc in sprint.confluenceDocs.results").text-title.font-aeries.font-bold.border-blue-700.text-blue-700.inline-block.pt-4 {{doc.title}}
                      //- a.text-title.font-aeries.font-bold.border-blue-700.text-blue-700.block.pt-4 Sprint planning - RocketPower
                      //- a.text-title.font-aeries.font-bold.border-blue-700.text-blue-700.block.pt-4 Feedback proposal
                      //- a.text-title.font-aeries.font-bold.border-blue-700.text-blue-700.block.pt-4 Website redesign regroup meeting
                      //- a.text-title.font-aeries.font-bold.border-blue-700.text-blue-700.block.pt-4 Kickoff Notes - RocketPower


</template>

<script>
const axios = require('axios');

module.exports = {
  props: ['sprint'],
data() {
    return {
        lastSprint: {},
        nextSprint: {},
        currentUser : "",
        currentlySelectedWeek: "",
        previousWeek: "",
        nextWeek: "",
        daysIn: 0,
        // littleTasks : [
        //   {
        //     title: "Update brand assets on ADL dashboard",
        //     image: "/images/icon-graphic-design.svg"
        //   },
        //   {
        //     title: "Business card for Michael Gerkhe",
        //     image: "/images/icon-business-card.svg"
        //   },
        //   {
        //     title: "Business card for Sonia Miramontes",
        //     image: "/images/icon-business-card.svg"
        //   },
        //   {
        //     title: "Business card for Scott Knuckles",
        //     image: "/images/icon-business-card.svg"
        //   },
        //   {
        //     title: "AeriesCon preview email",
        //     image: "/images/icon-emails.svg"
        //   },
        //   {
        //     title: "Publish new Gradebook video series",
        //     image: "/images/icon-video-editing.svg"
        //   },
        //   {
        //     title: "Investigate Aeries Academy optimization",
        //     image: "/images/icon-general-request.svg"
        //   },
        //   {
        //     title: "Increase Confluence concurrent editors",
        //     image: "/images/icon-general-request.svg"
        //   },
        // ]
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
computed: {
  taskCounts() {
    var counts = {
      allTasks : 0,
      tasksClosedCount : 0
    }
    if (Object.keys(this.sprint.jiraIssues).length > 0) {
    for (var i = 0; i < this.sprint.jiraIssues['DSGNQUEUE'].length; i++) {
      var task = this.sprint.jiraIssues['DSGNQUEUE'][i];
      counts.allTasks += 1;
      if (task.fields.status.statusCategory.key == "done") {
        counts.tasksClosedCount += 1;
      }
    }
    }
    return counts;
  },
  tasksRemaining() {
    
  },
  countTaskHours() {
    var finalOutput = {};

    var projects = this.sprint.bigTasks;
    console.log(projects,Object.keys(projects))
    for (var i = 0; i < Object.keys(projects).length; i++) {
      var thisProject = Object.keys(projects)[i]
      finalOutput[thisProject] = 0;
      var tasks = projects[thisProject];
      console.log(tasks)
       var hoursCount = 0;
       for (var ii = 0; ii < tasks.length; ii++) {
         if (tasks[ii].fields['customfield_10103']) {
           hoursCount += tasks[ii].fields['customfield_10103']
         }
       }
       finalOutput[thisProject] = hoursCount;
    }
    return finalOutput
  }
},
async mounted () {

      Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }

      Date.prototype.subtractDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
      }

      var monday = new Date();

        if (this.sprint.query.hasOwnProperty('sprintWeek')) {
          monday = new Date(this.sprint.query.sprintWeek.split(' - ')[0] + "/" + new Date().getFullYear());
        }

      var monday = new Date(monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7));
      var friday = monday.addDays(4);

      var lastMonday = monday.subtractDays(7); 
      var lastFriday = friday.subtractDays(7);

      var nextMonday = monday.addDays(7); 
      var nextFriday = friday.addDays(7);

      var mondayString = monday.toISOString().substr(0, 10).split('-')[1] + "/" + monday.toISOString().substr(0, 10).split('-')[2] //"05/01" 
      var fridayString = friday.toISOString().substr(0, 10).split('-')[1] + "/" + friday.toISOString().substr(0, 10).split('-')[2] //"05/01" 

      var lastMondayString = lastMonday.toISOString().substr(0, 10).split('-')[1] + "/" + lastMonday.toISOString().substr(0, 10).split('-')[2] //"05/01" 
      var lastFridayString = lastFriday.toISOString().substr(0, 10).split('-')[1] + "/" + lastFriday.toISOString().substr(0, 10).split('-')[2] //"05/01" 

      var nextMondayString = nextMonday.toISOString().substr(0, 10).split('-')[1] + "/" + nextMonday.toISOString().substr(0, 10).split('-')[2] //"05/01" 
      var nextFridayString = nextFriday.toISOString().substr(0, 10).split('-')[1] + "/" + nextFriday.toISOString().substr(0, 10).split('-')[2] //"05/01" 

        this.daysIn = Math.floor((new Date().getTime() / 84000000) - (friday.getTime() / 84000000));
        if (this.daysIn == 0) {this.daysIn = 1};

        this.currentlySelectedWeek = mondayString + " - " + fridayString;
        this.previousWeek = lastMondayString + " - " + lastFridayString;
        this.nextWeek = nextMondayString + " - " + nextFridayString;
      
      //For passing to our function
      var globalScope = this;
    

      //Get the last sprint
      axios
      .get('/rest/design-sprints?sprintWeek=' + this.previousWeek)
      .then(function(response) {
        globalScope.lastSprint = response.data.data[0];
      })

      //Get the next sprint
      axios
      .get('/rest/design-sprints?sprintWeek=' + this.nextWeek)
      .then(function(response) {
        globalScope.nextSprint = response.data.data[0];
      })



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
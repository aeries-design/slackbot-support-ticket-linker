<style scoped>
.app-container {
height: calc(100vh - 60px);
}

.sidebar-container {
  background-color: #F6F8FA;
}
</style>

<style>
.confluence-doc-sidebar p {
      margin-bottom: 12px;
}

.confluence-doc-sidebar a {
      color: blue;
}
.iframe-blocker {
  z-index: 9999;
}
.confluence-doc-sidebar h1,
.confluence-doc-sidebar h2,
.confluence-doc-sidebar h3,
.confluence-doc-sidebar h4,
.confluence-doc-sidebar h5 {
      font-family: "Aeries Sans";
      font-weight: bold;
      margin-top: 18px;
      margin-bottom: 14px;
}

.confluence-doc-sidebar h1 {
  font-size: 24px;
}


</style>

<template lang="pug">
main
  section.flex.app-container
    div(class="w-4/5 prototype-container bg-neutral-500")
      div(v-show="!activePrototype" class="background-label background-label h-full flex flex-col justify-center") 
        h1.flex.self-center.font-aeries.font-bold.text-xx-large.text-neutral-700 No prototype selected
        p.flex.self-center.text-neutral-700 Select one in the sidebar to provide feedback
      .iframe-blocker.absolute.opacity-25(v-show="sidebarLocked" v-bind:style="{width:containerWidth + 'px', height: containerHeight + 'px'}").bg-white
      iframe(v-show="activePrototype" v-bind:disabled="sidebarLocked" v-bind:class="{'opacity-25 cursor-not-allowed' : sidebarLocked}" class="prototype-iframe" style='border: 1px solid rgba(0, 0, 0, 0.1);' v-bind:width="containerWidth" v-bind:height="containerHeight" :src='figmaURL' allowfullscreen='')

    div(class="w-1/5 sidebar-container").h-full.py-4.border-l-2.border-neutral-600.overflow-y-scroll.overflow-x-hidden
     
      .edit-prototype-container(v-if="editPrototype == true")
          .all-remote-feedback.px-3
            .cursor-pointer.font-aeries.font-bold.text-subhead.mb-4(@click="editPrototype = false") « Back
            div.mt-3
              .italic.text-minimum-text Title
              input(v-model="activePrototype.title" placeholder="e.g. Aeries.com redesign - Homepage" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
            div.mt-3
              .italic.text-minimum-text Prototype Iframe URL
              input(v-model="activePrototype.figmaURL" placeholder="e.g. https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F6IeWspNcbBntaqB6mHtsej%2FWebsite-Components%3Fscaling%3Dscale-down-width%26node-id%3D265%253A38&chrome=DOCUMENTATION" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
            div.mt-3
              .italic.text-minimum-text Thumbnail URL
              input(v-model="activePrototype.thumbnailFilename" placeholder="e.g. https://i.imgur.com/P8FKOgu.png" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
            div.mt-3
              .italic.text-minimum-text Designer
              input(v-model="activePrototype.designer" placeholder="e.g. Zachary Guerrero" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2")
            div.mt-3
              .italic.text-minimum-text Feedback item created by
              div(class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2") {{currentUser}}
            div.mt-3
              .italic.text-minimum-text Feedback phase
              select(v-model="activePrototype.phase").w-full.font-aeries.font-bold.leading-tight.inline-block.bg-neutral-500.p-2.mb-1
                option Primary
                option Secondary
                option Tertiary
            div.mt-3
              .italic.text-minimum-text Type
              select(v-model="activePrototype.type").w-full.font-aeries.font-bold.leading-tight.inline-block.bg-neutral-500.p-2.mb-1
                option Webpage prototype
                option Product prototype
                option General prototype
            div.mt-3
              .italic.text-minimum-text Questions
              .feedback(v-for="question in activePrototype.feedback")
                input(v-model="question.title" placeholder="e.g. What are your first impressions?" class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2 mb-4")
              div.mt-3
                a(@click="addNewQuestion()").text-blue-600.cursor-pointer + Add new question
            
            .divider.border-b.border-neutral-600.pb-4
            div(@click="editActivePrototype()" class="w-3/4 cursor-pointer mt-4 block py-2 bg-blue-700 text-center text-white font-semi-bold font-aeries") Edit prototype details

      .delete-prototype-container(v-if="deletePrototype == true")
          .all-remote-feedback.px-3
            .cursor-pointer.font-aeries.font-bold.text-subhead.mb-4(@click="deletePrototype = false") « Back
            .italic Really delete this prototype?
            
            .divider.border-b.border-neutral-600.pb-4
            div(@click="deleteActivePrototype()" class="w-3/4 cursor-pointer mt-4 block py-2 bg-red-700 text-center text-white font-semi-bold font-aeries") Delete prototype
            
            

      div(v-if="showResponsesFromOthers == true")
        .all-remote-feedback.px-3
            .cursor-pointer.font-aeries.font-bold.text-subhead.mb-4(@click="showResponsesFromOthersSidebar(false)") « Back
            .italic.text-minimum-text Here's some of what eagles had to say about this prototype!
            .divider.border-b.border-neutral-600.pb-4
            div(v-for="response in allRemoteFeedback")
              h1.font-aeries.font-bold.text-title.mt-2.mb-4.mt-6.leading-tight {{response.user}}
              div(v-for="feedback in response.feedback")
                h1.font-aeries.font-bold.text-subhead.mt-2.leading-tight {{feedback.title}}
                .italic.text-minimum-text.mt-2.mb-6 {{feedback.response}}

      div(v-if="showResponsesFromOthers == false && !editPrototype && !deletePrototype")
        .confluence-doc-sidebar(v-if="selectedDoc").px-3
            .cursor-pointer.font-aeries.font-bold.text-subhead.mb-4(@click="selectedDoc = false") « Back
            .italic.text-minimum-text After reading the content below, click this button to confirm you've read it.
            div(@click="markDocRead(selectedDoc.id)" class="cursor-pointer mt-2 block py-3 bg-blue-700 text-center text-white font-semi-bold font-aeries") I've read and understand
            .divider.border-b.border-neutral-600.pb-4
            h1.font-aeries.font-bold.text-title.mt-2.mb-6.leading-tight {{selectedDoc.title}}
            div(v-html="selectedDoc.body.view.value")
            
        div.px-3(v-if="!selectedDoc")
          a(href="/figma/feedback").font-aeries.font-bold.text-subhead Figma Feedback »
          h1.font-aeries.font-bold.text-title.mt-2.leading-tight {{activePrototype.title}}
          div.mb-6
            a(@click="editPrototype = true").text-blue-600.cursor-pointer.text-minimum-text Edit prototype details
            span  - 
            a(@click="deletePrototype = true").text-red-600.cursor-pointer.text-minimum-text Delete prototype

        div.px-3(v-if="!selectedDoc")  
          p.text-minimum-text.font-bold.text-neutral-1600.uppercase Designer
          p.font-bold.font-aeries.text-subhead {{activePrototype.designer}}

        .divider.border-t-2.border-neutral-500.my-4

        .feedback-sidebar-container(v-if="(activePrototype && !sidebarLocked) && !selectedDoc")
          .flex.px-3
            div(class="w-1/2")
              p.text-minimum-text.font-bold.text-neutral-1600.uppercase My stakeholder type
              p.font-bold.font-aeries {{getMyStakeholderType()}}
            div(class="w-1/2").pl-6.border-l-2.border-neutral-500
              p.text-minimum-text.font-bold.text-neutral-1600.uppercase MY RESPONSES
              p.font-bold.font-aeries #[span(v-bind:class="{'text-green-600' : numberOfResponses == activePrototype.feedback.length}") {{numberOfResponses}} of {{activePrototype.feedback.length}}] 
          .feedback-container.mt-4.border-t-2.border-neutral-500
            .feedback(v-for="(item, index) in feedback" :key="item._id" class="flex border-b-2 border-neutral-500 px-3")
              .collapsed(v-show="!expandedFeedback.includes(item.title)" @click="expandFeedbackItem(item.title)" v-bind:class="{'text-green-700 font-bold': item.response !== ''}" class="flex cursor-pointer py-5 w-full")
                div(class="w-8")
                  <svg style="margin: 0 auto;" width="20" height="20" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3137 19.5538L19.3832 16.6582C20.1977 15.8899 20.2066 14.6632 19.4035 13.8847L11.9573 6.66806L5.0982 0.328746C4.62393 -0.109582 3.85499 -0.109583 3.38072 0.328744L0.355701 3.12453C-0.118567 3.56285 -0.118567 4.27352 0.355701 4.71185L11.6217 15.1241L0.624158 25.2882C0.149891 25.7265 0.149891 26.4371 0.624159 26.8755L3.64918 29.6713C4.12345 30.1096 4.89239 30.1096 5.36665 29.6713L16.3137 19.5538Z" fill="#B2BAC5"/>
                  </svg>
                div(class="w-full")
                  h1.leading-tight(class="contents-center align-center self-center") {{item.title}} #[span(v-if="item.response !== ''") ✔️]
              .expanded.flex.flex-col.w-full(v-show="expandedFeedback.includes(item.title)").cursor-pointer.py-5
                div.flex.flex-row
                  div(class="w-8")
                    <svg class="contents-center align-center self-center" width="20" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4462 16.3137L13.3418 19.3832C14.1101 20.1977 15.3368 20.2066 16.1153 19.4035L23.3319 11.9573L29.6713 5.0982C30.1096 4.62393 30.1096 3.85499 29.6713 3.38073L26.8755 0.355704C26.4371 -0.118564 25.7265 -0.118564 25.2882 0.355704L14.8759 11.6217L4.71185 0.624159C4.27352 0.149891 3.56285 0.149891 3.12453 0.624159L0.328745 3.64918C-0.109582 4.12345 -0.109581 4.89239 0.328746 5.36665L10.4462 16.3137Z" fill="#B2BAC5"/>
                    </svg>
                  div(class="w-full")
                    h1.leading-tight(class="contents-center font-bold align-center self-center" @click="expandFeedbackItem(item.title)") {{item.title}}
                textarea(v-model="item.response" v-on:change="updateTextarea()" class="flex flex-row" placeholder="Type here..." class="w-full font-aeries font-bold leading-tight block bg-neutral-500 p-3 py-2 mt-4 h-24")
          div
            p.text-minimum-text.italic.text-neutral-1600.p-3 Your responses are automatically saved
          div.px-3.mt-6.flex.flex-col
            div(class="w-1/6")
              <svg width="58" height="32" viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="16" fill="#C4C4C4"/>
              <rect x="12" width="32" height="32" rx="16" fill="#B4B4B4"/>
              <rect x="26" width="32" height="32" rx="16" fill="#A09F9F"/>
              <path d="M41.034 18.328H43.338V17.554C43.338 15.484 45.876 14.854 45.876 12.604C45.876 11.164 44.598 9.778 42.546 9.778C40.422 9.778 38.874 11.524 38.874 11.524L40.098 13.18C40.098 13.18 41.07 11.938 42.492 11.938C43.176 11.938 43.554 12.406 43.554 12.874C43.554 14.08 41.034 15.07 41.034 17.23V18.328ZM41.016 22H43.32V19.462H41.016V22Z" fill="white"/>
              </svg>

            div(class="w-5/6")
              h1.font-aeries.font-bold.mt-4 Want to see others' feedback on this?
            p.pt-2.text-minimum-text(v-if="numberOfResponses !== activePrototype.feedback.length") To see what others said, just finish providing your responses first

            div(@click="showResponsesFromOthersSidebar(true)" v-bind:class="{'opacity-50 cursor-not-allowed' : numberOfResponses !== activePrototype.feedback.length}" class="w-3/4 cursor-pointer mt-4 block py-2 bg-blue-700 text-center text-white font-semi-bold font-aeries") See what others said

      .locked-sidebar-contents(v-if="(activePrototype && sidebarLocked) && !selectedDoc").px-3
        .sidebarLockedHeader(class="flex")

          div(class="w-1/6")
            <svg width="45" height="63" viewBox="0 0 57 83" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.0827 80.1658H25.4129C15.2884 80.1658 6.98633 71.8658 6.98633 61.7438V18.4219C6.98633 8.3 15.2884 0 25.4129 0H31.1839C41.3084 0 49.6105 8.3 49.6105 18.4219V61.7438C49.5093 71.967 41.3084 80.1658 31.0827 80.1658ZM25.4129 7.389C19.3382 7.389 14.3772 12.3488 14.3772 18.4219V61.7438C14.3772 67.817 19.3382 72.7768 25.4129 72.7768H31.1839C37.2586 72.7768 42.2196 67.817 42.2196 61.7438V18.4219C42.2196 12.3488 37.2586 7.389 31.1839 7.389H25.4129Z" fill="#A5ADBA"/>
              <path d="M25.4124 78.2425C16.4016 78.2425 9.01074 70.8535 9.01074 61.845V18.5232C9.01074 9.41346 16.4016 2.12567 25.4124 2.12567H31.1834C40.1942 2.12567 47.5851 9.51468 47.5851 18.5232V61.845C47.5851 70.8535 40.1942 78.2425 31.1834 78.2425H25.4124ZM25.4124 5.3647C18.224 5.3647 12.3518 11.2354 12.3518 18.422V61.7438C12.3518 68.9303 18.224 74.8011 25.4124 74.8011H31.1834C38.3718 74.8011 44.244 68.9303 44.244 61.7438V18.422C44.244 11.2354 38.3718 5.3647 31.1834 5.3647H25.4124Z" fill="#A5ADBA"/>
              <path d="M56.4948 30.6696H0V83H56.4948V30.6696Z" fill="#F6891F"/>
              <path d="M56.4948 38.0588H0V75.7124H56.4948V38.0588Z" fill="#FAA31B"/>
              <path d="M33.5125 49.5977C33.5125 52.4318 31.1839 54.7599 28.349 54.7599C25.5142 54.7599 23.1855 52.4318 23.1855 49.5977C23.1855 46.7636 25.5142 44.4356 28.349 44.4356C31.1839 44.3343 33.5125 46.6623 33.5125 49.5977Z" fill="#0C1E41"/>
              <path d="M24.4004 66.8045H28.2477H32.095L30.5763 50.4071H25.9191L24.4004 66.8045Z" fill="#0C1E41"/>
            </svg>
          div(class="w-5/6")
            h1.font-aeries.font-bold.text-subhead Your account requires action to unlock feedback for this prototype

        .required-reading-list(v-if="sidebarLocked && !selectedDoc")
          p.mb-2.mt-4 Sorry for the extra step. We really want to hear from you, but first hear us out - the following resources will guarantee more actionable feedback.
          .divider.border-b.border-neutral-600.pb-4
          .required-resources.my-8
            //- a(href="/people/confluence" class="w-full mb-4 block md:inline-block md:mr-8")
            //-   .max-w-sm.rounded.overflow-hidden.shadow-lg.bg-white
            //-     .px-6.py-4
            //-       div(class="w-12 mb-6")
            //-         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" viewBox="0 0 256 246" version="1.1" preserveAspectRatio="xMidYMid"> <defs> <linearGradient x1="99.140087%" y1="112.708084%" x2="33.8589812%" y2="37.7549606%" id="linearGradient-1"> <stop stop-color="#0052CC" offset="18%"/> <stop stop-color="#2684FF" offset="100%"/> </linearGradient> <linearGradient x1="0.92569163%" y1="-12.5823074%" x2="66.1800713%" y2="62.3057471%" id="linearGradient-2"> <stop stop-color="#0052CC" offset="18%"/> <stop stop-color="#2684FF" offset="100%"/> </linearGradient> </defs> <g> <path d="M9.26054484,187.329971 C6.61939782,191.637072 3.65318655,196.634935 1.13393863,200.616972 C-1.12098385,204.42751 0.0895487945,209.341911 3.85635171,211.669157 L56.6792921,244.175582 C58.5334859,245.320393 60.7697695,245.67257 62.8860683,245.153045 C65.0023672,244.633521 66.8213536,243.285826 67.9346417,241.412536 C70.0475593,237.877462 72.7699724,233.285929 75.7361837,228.369333 C96.6621947,193.831256 117.710105,198.057091 155.661356,216.179423 L208.037333,241.087471 C210.020997,242.031639 212.302415,242.132457 214.361632,241.366949 C216.420848,240.601441 218.082405,239.034833 218.967618,237.024168 L244.119464,180.137925 C245.896483,176.075046 244.088336,171.3377 240.056161,169.492071 C229.003977,164.291043 207.021507,153.92962 187.233221,144.380857 C116.044151,109.802148 55.5415672,112.036965 9.26054484,187.329971 Z" fill="url(#linearGradient-1)"/> <path d="M246.11505,58.2319428 C248.756197,53.9248415 251.722408,48.9269787 254.241656,44.9449416 C256.496579,41.1344037 255.286046,36.2200025 251.519243,33.8927572 L198.696303,1.38633231 C196.82698,0.127283893 194.518741,-0.298915762 192.323058,0.209558312 C190.127374,0.718032386 188.241461,2.11550922 187.115889,4.06811236 C185.002971,7.60318607 182.280558,12.1947186 179.314347,17.1113153 C158.388336,51.6493918 137.340426,47.4235565 99.3891748,29.3012247 L47.1757299,4.5150757 C45.1920661,3.57090828 42.9106475,3.47008979 40.8514312,4.2355977 C38.7922149,5.00110562 37.1306578,6.56771434 36.2454445,8.57837881 L11.0935983,65.4646223 C9.31657942,69.5275012 11.1247267,74.2648471 15.1569014,76.1104765 C26.2090859,81.3115044 48.1915557,91.6729274 67.9798418,101.22169 C139.331444,135.759766 199.834028,133.443683 246.11505,58.2319428 Z" fill="url(#linearGradient-2)"/> </g> </svg>
            //-       .font-bold.font-aeries.text-subhead.mb-2 Design team guidelines for giving good feedback
            //-       p.text-gray-700.text-minimum-text
            //-         | You only have to read this once. These are our best practices to ensure your feedback is as high-quality and actionable as possible. 
            a(v-for="doc in $attrs.idofselectedpage.confluenceDocs" @click="selectedDoc = doc" class="cursor-pointer w-full mb-4 block md:inline-block md:mr-8")
              .text-minimum-text.italic.font-bold.text-green-700(v-if="docIsRead(doc.id)") Read & agreed
              .text-minimum-text.italic.text-neutral-1600(v-else) Unread
              .max-w-sm.rounded.overflow-hidden.shadow-lg.bg-white
                .px-6.py-4
                  div(class="w-12 mb-6")
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" viewBox="0 0 256 246" version="1.1" preserveAspectRatio="xMidYMid"> <defs> <linearGradient x1="99.140087%" y1="112.708084%" x2="33.8589812%" y2="37.7549606%" id="linearGradient-1"> <stop stop-color="#0052CC" offset="18%"/> <stop stop-color="#2684FF" offset="100%"/> </linearGradient> <linearGradient x1="0.92569163%" y1="-12.5823074%" x2="66.1800713%" y2="62.3057471%" id="linearGradient-2"> <stop stop-color="#0052CC" offset="18%"/> <stop stop-color="#2684FF" offset="100%"/> </linearGradient> </defs> <g> <path d="M9.26054484,187.329971 C6.61939782,191.637072 3.65318655,196.634935 1.13393863,200.616972 C-1.12098385,204.42751 0.0895487945,209.341911 3.85635171,211.669157 L56.6792921,244.175582 C58.5334859,245.320393 60.7697695,245.67257 62.8860683,245.153045 C65.0023672,244.633521 66.8213536,243.285826 67.9346417,241.412536 C70.0475593,237.877462 72.7699724,233.285929 75.7361837,228.369333 C96.6621947,193.831256 117.710105,198.057091 155.661356,216.179423 L208.037333,241.087471 C210.020997,242.031639 212.302415,242.132457 214.361632,241.366949 C216.420848,240.601441 218.082405,239.034833 218.967618,237.024168 L244.119464,180.137925 C245.896483,176.075046 244.088336,171.3377 240.056161,169.492071 C229.003977,164.291043 207.021507,153.92962 187.233221,144.380857 C116.044151,109.802148 55.5415672,112.036965 9.26054484,187.329971 Z" fill="url(#linearGradient-1)"/> <path d="M246.11505,58.2319428 C248.756197,53.9248415 251.722408,48.9269787 254.241656,44.9449416 C256.496579,41.1344037 255.286046,36.2200025 251.519243,33.8927572 L198.696303,1.38633231 C196.82698,0.127283893 194.518741,-0.298915762 192.323058,0.209558312 C190.127374,0.718032386 188.241461,2.11550922 187.115889,4.06811236 C185.002971,7.60318607 182.280558,12.1947186 179.314347,17.1113153 C158.388336,51.6493918 137.340426,47.4235565 99.3891748,29.3012247 L47.1757299,4.5150757 C45.1920661,3.57090828 42.9106475,3.47008979 40.8514312,4.2355977 C38.7922149,5.00110562 37.1306578,6.56771434 36.2454445,8.57837881 L11.0935983,65.4646223 C9.31657942,69.5275012 11.1247267,74.2648471 15.1569014,76.1104765 C26.2090859,81.3115044 48.1915557,91.6729274 67.9798418,101.22169 C139.331444,135.759766 199.834028,133.443683 246.11505,58.2319428 Z" fill="url(#linearGradient-2)"/> </g> </svg>
                  .font-bold.font-aeries.text-subhead.mb-2 {{doc.title}}
                  p.text-gray-700.text-minimum-text
                    | This prototype has an accompanying document with details you must read before providing feedback.


      
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        editPrototype : false,
        deletePrototype: false,
        currentUser : "",
        currentUserSlackID : "",
        prototypes: [],
        activePrototype: this.$attrs.idofselectedpage.feathersObject,
        containerWidth: 0,
        containerHeight: 0,
        selectedDoc: false,
        sidebarLocked : true,
        expandedFeedback : "",
        numberOfResponses: 0,
        showResponsesFromOthers: false,
        feedback: [],
        myRemoteFeedback: [],
        allRemoteFeedback: [],
        readDocs: {},
    }
  },
created() {
  window.addEventListener("resize", this.windowResized);
},
destroyed() {
  window.removeEventListener("resize", this.windowResized);
},
methods : {
    editActivePrototype() {
    var dataPayload = this.activePrototype;
    var globalScope = this;
    var id = dataPayload._id;
    axios.put('/rest/figma-prototypes/' + id, dataPayload)
      .then(function (response) {
          console.log(response);
          globalScope.editPrototype = "";
      })
      .catch(function (error) {
          console.log(error);
    })
  },
    deleteActivePrototype() {
    var dataPayload = this.activePrototype;
    dataPayload.deleted = true;
    var globalScope = this;
    var id = dataPayload._id;
    axios.put('/rest/figma-prototypes/' + id, dataPayload)
      .then(function (response) {
          console.log(response);
          window.location.href = '/figma/feedback'
      })
      .catch(function (error) {
          console.log(error);
    })
  },
    addNewQuestion() {
    this.activePrototype.feedback.push(
      {title: "", type: "textarea"}
    )
  },
  showResponsesFromOthersSidebar(trueFalse) {
    this.fetchAllRemoteFeedback();
    if (this.numberOfResponses == this.activePrototype.feedback.length) {
    // Go to the sidebar page where responses from others are shown
      this.showResponsesFromOthers = trueFalse;
    }
  },
  getMyStakeholderType() {
    //Am I a stakeholder on this proto?
    var stakeholderType = "";
    for (var i = 0; i < this.activePrototype.stakeholders.length; i++) {
      var stakeholder = this.activePrototype.stakeholders[i];
      if (stakeholder.userSlackID == this.currentUserSlackID) {
        stakeholderType = stakeholder.type;
      }
    }
    if (stakeholderType == "") {
      stakeholderType = "Not a stakeholder"
    }
    return stakeholderType;
  },
  saveResponse() {
    //Determine whether we need to POST or PUT.
    
      //For passing to our function
      var globalScope = this;

      var responseID = globalScope.$attrs.idofselectedpage.params.id + globalScope.currentUserSlackID;
      var payload = {feedback: globalScope.feedback};
      payload._id = responseID;
      payload.user = this.currentUser;
      payload.userSlackID = this.currentUserSlackID;
      payload.prototypeName = this.activePrototype.title;
      payload.prototypeID = this.activePrototype._id;
      payload.prototypeFeedbackPhase = this.activePrototype.prototypeFeedbackPhase
      payload.prototypeType = this.activePrototype.type;
      payload.designer = this.activePrototype.deisgner;
      payload.numberOfResponses = this.numberOfResponses;
      payload.requiredReading = this.activePrototype.requiredReading;
      payload.thumbnail = this.activePrototype.thumbnailFilename

      //Get my remote feedback
      axios
      .get('/rest/figma-prototype-feedback/' + globalScope.$attrs.idofselectedpage.params.id + globalScope.currentUserSlackID )
      .then(function(response) {
        console.log(response)
        globalScope.myRemoteFeedback = response.data;

        axios.put('/rest/figma-prototype-feedback/' + responseID, payload)
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
        });

      }).catch(function(error) {
        //We've never provided feedback on this. Initialize!

        axios.post('/rest/figma-prototype-feedback/', payload)
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });

      })

  },
  fetchAllRemoteFeedback() {
    var globalScope = this;
      //Get my remote feedback
      axios
      .get('/rest/figma-prototype-feedback/?prototypeID=' + this.activePrototype._id)
      .then(function(response) {
        console.log(response)
        globalScope.allRemoteFeedback = response.data.data;
      }).catch(function (error) {
              console.log(error);
        });
  },
  updateTextarea() {
    this.updateNumberOfResponses()
    console.log(this.feedback)
    window.localStorage.setItem(this.$attrs.idofselectedpage.params.id, JSON.stringify(this.feedback));
    this.saveResponse()
  },
  updateNumberOfResponses() {
var count = 0;
for (var i = 0; i < this.feedback.length; i++) {
  if (this.feedback[i].response !== "") {
    count += 1;
  }
}
this.numberOfResponses = count;
},
  expandFeedbackItem(itemTitle) {
    if (this.expandedFeedback == itemTitle) {
      this.expandedFeedback = "";
    } else {
      this.expandedFeedback = itemTitle
    }
  },
  initializeFeedback() {
    var feedback = this.activePrototype.feedback;
    feedback.forEach(function (element) {
      element.response = "";
      element.expanded = false;
    });
    this.feedback = feedback;

    if (window.localStorage.getItem(this.$attrs.idofselectedpage.params.id)) {
      this.feedback = JSON.parse(window.localStorage.getItem(this.$attrs.idofselectedpage.params.id));
    }

    this.updateNumberOfResponses()

  },
  checkIfAllDocsRead() {
    if (this.activePrototype) {
      var docs = this.activePrototype.requiredReading;
      var allRead = true;
      for (var doc in docs) {
        if (this.readDocs.hasOwnProperty(docs[doc]) == false) {
          allRead = false;
        }
      }
        }
      if (allRead == true) {
        this.sidebarLocked = false;
      }
    },
  docIsRead(id) {
    if (this.readDocs.hasOwnProperty(id)) {
      if (this.readDocs[id] == true) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
  },
  markDocRead(id) {
    var obj = this.readDocs;
    obj[id] = true;
    this.readDocs = obj;
    window.localStorage.setItem('readDocs', JSON.stringify(obj));
    this.selectedDoc = false;
    this.checkIfAllDocsRead();
  },
  windowResized(e) {
    this.containerWidth = document.querySelector('.prototype-container').offsetWidth;
    this.containerHeight = document.querySelector('.prototype-container').offsetHeight;
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
allDocsRead() {
if (this.activePrototype) {
var docs = this.activePrototype.requiredReading;
var allRead = true;
for (var doc in docs) {
  if (this.readDocs.hasOwnProperty(docs[doc]) == false) {
    allRead = false;
  }
}
  }
return allRead;
},
figmaURL() {
if (this.activePrototype) {
  if (this.activePrototype.hasOwnProperty('figmaURL')) {
  return this.activePrototype.figmaURL;
} else {
  return "";
}
} else {
  return "";
}
},
// activePrototype () {
//   for (var i = 0; i < this.prototypes.length; i++) {
//     if (this.prototypes[i]._id == this.$attrs.idofselectedpage.params.id) {
//       return this.prototypes[i];
//     }
//   }
// }
},
async mounted () {

      var readDocs = window.localStorage.getItem('readDocs');
      if (readDocs) {
        this.readDocs = JSON.parse(readDocs);
      }

      //For passing to our function
      var globalScope = this;

      //Slack
      axios
      .get('/rest/figma-prototypes')
      .then(function(response) {
        globalScope.prototypes = response.data.data;
      })

      this.checkIfAllDocsRead(); // Unlock sidebar if all required docs read

      this.initializeFeedback(); // Create the reactive object for responses to questions

      this.fetchAllRemoteFeedback(); // Get any/all feedback that others have provided on this prototype

if (document.querySelector('.prototype-container')) {
  this.containerWidth = document.querySelector('.prototype-container').offsetWidth;
  this.containerHeight = document.querySelector('.prototype-container').offsetHeight;
}

    var me = this.getCookie('me');
    var meid = this.getCookie('meid');
    if (me) {
        this.currentUser = me;
    }
    if (meid) {
      this.currentUserSlackID = meid;
    }

},

}
</script>
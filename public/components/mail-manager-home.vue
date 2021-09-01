<style scoped>
.design-widget {
  background-image: url('/images/topo-pattern-small.svg')
}

ul {
  padding-left: 20px;
}

.stakeholderImage {
  width: 32px;
  margin-right:12px;
  margin-top: 2px;
}

.sidebarContainer {
  width: 280px;
}

.vh-full {
  min-height: 100vh;
}

.headerImage {
  background-repeat: no-repeat;
  background-position: center;
  background-size: stretch;
  height: 160px;
}

.emailContent {
  width: 600px;
  height: 68vh;
}

.ui-autocomplete {
    z-index: 9999;
}
</style>

<template lang="pug">
main(class="flex bg-neutral-400 vh-full")
  .sidebar(class="border-r border-neutral-500 bg-white" v-show="page == 'createEditCampaign'")
    .sidebarContainer(class="flex flex-col w-full h-full text-neutral-1600 px-4")
      .sidebarContainerContent(class="flex-shrink-0 px-4 py-6 mt-4 flex flex-row items-center justify-between")  
        a.text-neutral-1200.flex(href='#' @click="goBackToHome()") 
          <svg class="w-6 mr-2 mt-1" width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.50045 0.846191L11.0257 2.37143L4.98963 8.41831L18.1543 8.41831V10.5818L4.98963 10.5818L11.0257 16.6286L9.50045 18.1539L0.846603 9.50004L9.50045 0.846191Z" fill="#7A879B"/>
          </svg>
          span(class="font-bold") Back to emails
      .processWorkflowLogo
        img(src="/images/process-workflows-create-email-campaign.png" class="px-4 py-2")
      
      //- If the campaign is initialized and still in draft mode, show the link to edit it in Sendgrid
      a.openCampaignInSendgrid(v-if="campaign.sendGridCampaignID" class="flex mt-5 mx-4 border-2 rounded-sm border-blue-300 p-1" target="_blank" :href="'https://sendgrid.com/marketing_campaigns/ui/campaigns/'+campaign.sendGridCampaignID+'/edit'")
        img(src="/images/logo-sendgrid.png" class="w-2/12 self-center ml-1 mr-3")
        p(class="w-10/12 self-center font-bold text-minimum-text" style="color: #009ed9;") Edit in SendGrid >

      //- If the campaign has a Confluence document linked then show the link to it
      a.openCampaignInSendgrid(v-if="campaign.confluencePageURL" class="flex mt-5 mx-4 border-2 rounded-sm border-blue-300 p-1" target="_blank" :href="campaign.confluencePageURL" style="border-color: #0d64de;")
        img(src="/images/logo-confluence.svg" class="w-2/12 self-center p-1 ml-1 mr-3")
        p(class="w-10/12 self-center font-bold text-minimum-text" style="color: #0d64de;") View campaign docs >


      nav.steps.flex-grow.px-4.pb-4(v-if="page == 'createEditCampaign'" class='md:block md:pb-0 md:overflow-y-auto mt-2')
        a.step(@click="selectedStep = step.index; selectedSubStep = 1; updateQueryParameter('s', step.index); updateQueryParameter('ss', 1)" v-for="step in steps" class="cursor-pointer flex items-center font-bold mt-6 opacity-50" :class="{'border-blue-600 text-blue-600 opacity-100' : selectedStep == step.index}")
          .roundedNumberContainer(class="border-neutral-1000")
            .roundedNumber(class="rounded-full mr-4" :class="{'border-blue-600' : selectedStep == step.index, 'border-2 px-2' : !stepIsCompleted(step.index)}") 
              span(v-if="stepIsCompleted(step.index)" class="px-1") ✅
              span(v-else) {{step.index}}
          .labelContainer(class="text-neutral-1600")
            .label(class="uppercase" :class="{'text-blue-600' : selectedStep == step.index, 'text-green-600' : stepIsCompleted(step.index)}") {{step.title}}
  
  .main-content.container(v-if="page == 'home'")
    section#campaigns
      
      h1(class="text-display font-aeries font-bold mt-8") Aeries email campaigns
      p Displaying scheduled email campaigns from the Aeries content calendar.

      p(class="mt-4")
        a(@click="emptyCampaignObject(); page = 'createEditCampaign'" class="font-bold text-blue-600 cursor-pointer") + Create new campaign

      hr(class="my-6 border-neutral-600")

      //- .headerNav(class="flex my-8")
      //-   a(class="py-1 font-bold font-aeries text-subhead mr-24 cursor-pointer border-b-4 border-blue-600'") Draft email campaigns 
      //-     span(v-if="globalContactLists.feathersLists") ({{globalContactLists.feathersLists.length}})
      //-   a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-not-allowed") 
      //-     span Sent email campaigns (0)

      .container.my-6.mx-auto
        .flex.flex-wrap.-mx-1(class='lg:-mx-4')
          // Column
          hr(class="my-6 border-neutral-600")
          
          .my-1.px-1.w-full(@click="selectEmailCampaign(emailCampaign)" v-for="emailCampaign in globalContactLists.feathersLists" class='md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 cursor-pointer')
            // Article
            article(class="overflow-hidden rounded-lg shadow-lg bg-white")
              header.flex.items-center.justify-between.leading-tight.p-2(class='md:p-4')
                h1.text-lg
                  a.no-underline.text-black(class='hover:underline font-bold' href='#')
                    | {{emailCampaign.name}}  
                p(class="text-minimum-text text-neutral-1000" v-if="emailCampaign.date")
                  | {{emailCampaign.date}} @ {{emailCampaign.time}}
              section(class="md:px-4 text-minimum-text")
                p(class="whitespace-pre-line") {{emailCampaign.purposeGoalsOutline}}
              footer.flex.leading-none.p-2(class='md:p-4 justify-between')
                .avatar(v-for="owner in getSlackUserByID(emailCampaign.accountableStakeholder, true)" :title="owner.real_name" v-if="owner && owner.profile" class="cursor-pointer inline-block opacity-50")
                  img(:src="owner.profile.image_192" class="participant-image inline w-5 rounded-full border-white border-2")
                  span(class="text-neutral-1900 pl-1 relative text-minimum-text" style="top: 1px;") {{owner.real_name}}
                .icons(class="self-center flex")
                  a.confluenceImage(class="ml-1" title="This campaign has a linked Confluence page" target="_blank" :href="emailCampaign.confluencePageURL" v-if="emailCampaign.confluencePageURL")
                    img(class="w-4 opacity-75 hover:opacity-100 shadow mr-1" src="/images/logo-confluence.svg" style="padding: 2px;")
                  a.sendgridImage(class="ml-1" title="This campaign has a linked Sendgrid campaign" target="_blank" :href="'https://sendgrid.com/marketing_campaigns/ui/campaigns/'+emailCampaign.sendGridCampaignID+'/edit'" v-if="emailCampaign.sendGridCampaignID")
                    img(class="w-4 opacity-75 hover:opacity-100 shadow mr-1" src="/images/logo-sendgrid.png")



  .main-content.container(v-show="page == 'createEditCampaign'")
    
    section#initialization(v-show="selectedStep == 1" class="container")

      .headerNav(class="flex my-8")
        a(class="py-1 font-bold font-aeries text-subhead mr-24 opacity-50 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 1}" @click="selectedSubStep = 1; updateQueryParameter('ss', 1)") Information
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 2, 'text-green-600 border-green-600' : subStepIsCompleted(1,2)}" @click="selectedSubStep = 2; updateQueryParameter('ss', 2)") 
          span(v-if="subStepIsCompleted(1,2)") ✅ 
          span Set campaign name
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 3, 'text-green-600 border-green-600' : subStepIsCompleted(1,3)}" @click="selectedSubStep = 3; updateQueryParameter('ss', 3)") 
          span(v-if="subStepIsCompleted(1,3)") ✅ 
          span Set accountable stakeholder
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 4, 'text-green-600 border-green-600' : subStepIsCompleted(1,4)}" @click="selectedSubStep = 4; updateQueryParameter('ss', 4)") 
          span(v-if="subStepIsCompleted(1,4)") ✅ 
          span Initialize campaign

      .stepOne(v-show="selectedSubStep == 1")
        .introduction.mb-6
          .headerIcon(class="w-10 mb-3")
            img(src="/images/workflow-mail.png")
          h1(class="font-aeries text-title font-bold leading-tight") Initialization
          h3(class="text-subhead leading-tight font-semi-bold") Create a new campaign

          p(class="py-2") 
            | In this stage, someone declares that an email should be sent. This step can be performed by anyone - the person managing the email sendout, an executive stakeholder, or just someone who remembered that an email needed to be sent.

          p(class="py-2") 
            | Emails can be created long before they’re designed, written, or scheduled. For example, we can create emails that we know in advance will need to be sent, such as our recurring mass email welcoming customers back to a new school year, so we can see upcoming.

        
        .actionItems.mb-6
          h1(class="font-aeries text-title font-bold leading-tight mb-4") Action items
          ul(class="list-disc")
            li Someone creates a new campaign in the Aeriesworks mail manager. This initializes the mail manager wizard, creating a new campaign in SendGrid via the API.


        .questionsToAnswer(class="mb-4")
          
          h1(class="font-aeries text-title font-bold leading-tight mb-4")
            | Questions to answer in this phase
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | What is the name of the email campaign?
            p(class="pt-1")
              | The internal-only name which other team members will see when browsing the list of email campaigns.
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | Who is the accountable stakeholder?
            p(class="pt-1 ")
              | The person who will be managing the sending of the email. This is the person who will be answering any questions about the email, approving revisions and ultimately sending it out and monitoring delivery statistics. Usually, this is the person who wants the email to be sent in the first place, or otherwise a member of the marketing team.


        .stakeholdersInvolved(class="mb-4")

          h1(class="font-aeries text-title font-bold leading-tight mb-4") Stakeholders involved in this phase
          
          .stakeholderList
            .stakeholderRow(class="flex mb-4")
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The accountable stakeholder
              
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The creator of the campaign (if different than accountable stakeholder)
        
        .navigationButtons(class="mt-24 flex justify-between")
          a.previous(class="text-neutral-1000 font-aeries font-bold text-subhead cursor-pointer") 
            img(src="/images/back-arrow.png" class="inline w-4 mr-2")
            | Previous
          a.next(class="bg-blue-700 text-white font-aeries font-bold text-subhead cursor-pointer py-2 px-12 rounded")
            | Next


      .stepTwo(v-show="selectedSubStep == 2")
        .my-12
          h1(class="font-aeries text-title font-bold leading-tight") What is the name of the email campaign?
          p(class="leading-tight mt-2 mb-4") This is used for internal reference purposes. Recipients won’t see this.

          input(v-model="campaign.name" class="p-4 w-full" type="text" v-on:change="updateCampaign()" placeholder="Type a campaign name (e.g. '2022 Welcome Back To A New School Year')")

      .stepThree(v-show="selectedSubStep == 3")
        .my-12
          h1(class="font-aeries text-title font-bold leading-tight") Who is the accountable stakeholder?
          p(class="leading-tight mt-2 mb-4") This is the person who will be answering any questions about the email, approving revisions and ultimately sending it out.

          input#accountableStakeholderUserSearch.userSearch(v-show="!selectedAccountableStakeholder" class="p-4 w-full" type="text" placeholder="Search for Aeries team members...")

          .avatar(v-for="owner in getSlackUserByID(selectedAccountableStakeholder, true)" :title="owner.real_name" v-if="owner && owner.profile" @click="selectedAccountableStakeholder = ''; selectedAccountableStakeholder = '';" class="cursor-pointer hover:bg-neutral-500 inline-block")
            img(:src="owner.profile.image_192" class="participant-image inline w-12 rounded-full border-white border-2")
            span(class="text-neutral-1900 pl-1 relative text-subhead font-bold" style="top: 1px;") {{owner.real_name}}

          //- hr(class="my-6 border-neutral-600")
          //- h1(class="font-aeries text-title font-bold leading-tight") Optional secondary stakeholders
          //- p(class="leading-tight mt-2 mb-4") Are there other people overseeing this campaign other than the accountable stakeholder?
          //- a(class="text-blue-600 font-bold cursor-pointer") + Add optional secondary stakeholders


      .stepFour(v-show="selectedSubStep == 4")
        .my-12
          h1(class="font-aeries text-title font-bold leading-tight") With a name and a stakeholder, let's create the campaign.
          p(class="leading-tight mt-2 mb-4") This will create a new campaign draft that others Eagles can see. This does not send email.

          .button(class="mt-8")
            a(v-if="!campaign._id" @click="initializeCampaign()" class="text-white bg-blue-600 cursor-pointer px-12 py-3 rounded shadow-sm") Initialize campaign draft
            a(v-if="campaign._id" class="text-white bg-blue-600 cursor-pointer px-12 py-3 rounded opacity-50") Campaign created!
          
          hr(class="mt-16 border-neutral-600")

          a.openCampaignInSendgrid(v-if="campaign.sendGridCampaignID" class="w-64 flex mt-12 border-2 rounded-sm border-blue-300 p-2" target="_blank" :href="'https://sendgrid.com/marketing_campaigns/ui/campaigns/'+campaign.sendGridCampaignID+'/edit'")
            img(src="/images/logo-sendgrid.png" class="w-2/12 self-center mr-2")
            p(class="w-10/12 self-center font-bold" style="color: #3c71a2") Edit in SendGrid >




    section#scheduling(v-show="selectedStep == 2" class="container") 

      .headerNav(class="flex my-8")
        a(class="py-1 font-bold font-aeries text-subhead mr-24 cursor-pointer opacity-50" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 1}" @click="selectedSubStep = 1; updateQueryParameter('ss', 1)") Information
        a(class="py-1 font-bold font-aeries text-subhead mr-24 cursor-pointer opacity-50" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 2, 'text-green-600 border-green-600' : subStepIsCompleted(2,2)}" @click="selectedSubStep = 2; updateQueryParameter('ss', 2)") 
          span(v-if="subStepIsCompleted(2,2)") ✅ 
          | Set date & time for sendout
      
      .stepOne(v-show="selectedSubStep == 1")
        .mb-6
          .headerIcon(class="w-10 mb-3")
            img(src="/images/workflow-calendar.png")
          h1(class="font-aeries text-title font-bold leading-tight") Scheduling
          h3(class="text-subhead leading-tight font-semi-bold") Decide when it should be sent

          p(class="py-2") 
            | Here, the stakeholder chooses when the email should be sent to recipients. Setting this final deadline at the beginning of the process ensures that enough time can be dedicated for content development, feedback and revision.
        
        .actionItems.mb-6
          h1(class="font-aeries text-title font-bold leading-tight mb-4") Action items
          ul(class="list-disc")
            li Someone provides a date and time that the email should go out through the Aeriesworks mail manager. Note that providing this information won’t actually schedule the campaign to send.


        .questionsToAnswer(class="mb-6")
          
          h1(class="font-aeries text-title font-bold leading-tight mb-4")
            | Questions to answer in this phase
          
          ul(class="list-disc mb-6")
            li(class="font-bold text-subhead") 
              | What is the date and time the email should go out?
            p(class="pt-2")
              | By providing this, the mail manager system will recommend a timeline for content development and feedback, generally recommending a dedicated day of breathing room for each.
            p(class="pt-4")
              | Generally, we send emails earlier in the week (Monday or Tuesday) around 8 AM as we believe that contributes a boost to our open rate.

        .stakeholdersInvolved(class="mb-4")

          h1(class="font-aeries text-title font-bold leading-tight mb-4") Stakeholders involved in this phase
          
          .stakeholderList
            .stakeholderRow(class="flex mb-4")
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The accountable stakeholder

      .stepTwo(v-show="selectedSubStep == 2")
        .my-12
          h1(class="font-aeries text-title font-bold leading-tight") What day should this campaign be sent?
          p(class="leading-tight mt-2 mb-4") For maximum deliverability, it’s generally best to choose a Monday or Tuesday.

          input(v-model="campaign.date" class="p-4 w-full" type="date" placeholder="Choose a date..." v-on:change="updateCampaign()")

        .my-12
          h1(class="font-aeries text-title font-bold leading-tight") What time on that day?
          p(class="leading-tight mt-2 mb-4") If you can, it’s generally best to choose a time around 8 AM.

          input(v-model="campaign.time" class="p-4 w-full" type="time" placeholder="Choose a date..." v-on:change="updateCampaign()")


    section#contacts(v-show="selectedStep == 3" class="container")

      .headerNav(class="flex my-8")
        a(class="py-1 font-bold font-aeries text-subhead mr-24 cursor-pointer opacity-50" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 1}" @click="selectedSubStep = 1; updateQueryParameter('ss', 1)") Information
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 cursor-pointer mr-24" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 2, 'text-green-600 border-green-600' : subStepIsCompleted(3,2)}" @click="selectedSubStep = 2; updateQueryParameter('ss', 2)") 
          span(v-if="subStepIsCompleted(3,2)") ✅ 
          | Select or upload contact list


      .stepOne(v-show="selectedSubStep == 1")
        .introduction.mb-6
          .headerIcon(class="w-10 mb-3")
            img(src="/images/workflow-contacts.png")
          h1(class="font-aeries text-title font-bold leading-tight") Contact List Finalization
          h3(class="text-subhead leading-tight font-semi-bold") Upload the spreadsheet of recipients

          p(class="py-2") 
            | In this step, upload the list of recipients for the campaign. The Aeriesworks mail manager will create this list as a segment in the email marketing platform, and set the campaign’s recipient field to that segment.
          p(class="py-2") 
            | Often contact lists are manually assembled from many different exported lists. Merge these lists into one CSV file before uploading.

        
        .actionItems.mb-6
          h1(class="font-aeries text-title font-bold leading-tight mb-4") Action items
          ul(class="list-disc")
            li(class="py-2")  Select a Sendgrid contact list of recipients who will receive your campaign
            li(class="py-2")  If a suitable one doesn't exist, work with your contact list stakeholder


        .questionsToAnswer(class="mb-4")
          
          h1(class="font-aeries text-title font-bold leading-tight mb-4")
            | Questions to answer in this phase
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | Who is the intended recipient? Who should receive this email?
            p(class="pt-1")
              | How do we compile our contact list? Where are the contacts coming from? Is there anyone not on our list that should be?

        .stakeholdersInvolved(class="mb-6")

          h1(class="font-aeries text-title font-bold leading-tight mb-4") Stakeholders involved in this phase
          
          .stakeholderList
            .stakeholderRow(class="flex mb-4")
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The accountable stakeholder
              
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The stakeholder(s) exporting or otherwise producing the contact list (if different than the accountable stakeholder)

      .stepTwo(v-show="selectedSubStep == 2")
        
        //- UPLOAD
        .upload-csv(v-show="showUploadContactList")
          p 
            a(class="text-blue-600 font-bold cursor-pointer mb-4 block" @click="showUploadContactList = false; contactList = []; contactUploadSuccess = false;") < Back to Select Contact List
          p(class="text-green-600 font-bold mb-6" v-if="contactUploadSuccess") Success! Your contact list has been uploaded and added to the list on the previous screen. Note the final recipient count may show incorrectly (too low) for a few minutes as contacts are added to the list by SendGrid.
          h1(class="font-aeries text-title font-bold leading-tight pb-2") Upload a contact list to SendGrid
          p(class="mb-4") This will create a contact list in SendGrid so you can select it on the previous screen.
          p(class="mb-4") Here is the process:

          ul
            li 1. Make a spreadsheet with one column called "email".
            li 2. Paste your list of email addresses in the "email" column.
            li 3. Ensure no additional columns are present (like "name", "title", etc).
            li 4. Upload the CSV below!

          
          form(class="mt-4" enctype='multipart/form-data' novalidate='')
            h3(class="mb-1 text-minimum-text font-bold") Drag your file or click to browse
            .dropbox
              input.input-file(name="csvUpload" id="csvUpload" class="border border-neutral-1200 border-dashed inline-block p-2" type='file' @change='uploadCSV($event.target.name, $event.target.files);' accept=".csv")

            .submitButtonForm(v-if="contactList.length" class="mt-12")

              h3(class="mb-1 text-minimum-text font-bold") Type a name for your contact list
              input(v-model="contactListName" class="p-4 w-full" type="text" placeholder="e.g. '2021 Welcome Back To A New School Year'")
              
              a(class="text-white bg-blue-600 px-12 py-3 rounded shadow-sm mt-4 inline-block cursor-not-allowed opacity-50" v-if="!contactListName") Create new list with {{contactList.length}} contacts

              a(@click="uploadContactList()" class="text-white bg-blue-600 cursor-pointer px-12 py-3 rounded shadow-sm mt-4 inline-block" v-if="contactListName && !uploadingContactList") Create new list with {{contactList.length}} contacts
              a(class="text-white bg-blue-600 px-12 py-3 rounded shadow-sm mt-4 inline-block cursor-not-allowed opacity-50" v-if="uploadingContactList") Uploading...


          div(v-if="contactList.length" class="mt-8")

            hr(class="my-6 border-neutral-600")


            h1(class="font-aeries text-title font-bold leading-tight pb-2") {{contactList.length}} contacts
            p(v-for="contact in contactList" v-if="contact.email.toLowerCase() !== 'email'") {{contact.email}}


        .selectContacts.mb-6(v-show="!showUploadContactList")
          h1(class="font-aeries text-title font-bold leading-tight pb-2") Select a contact list from SendGrid
          p 
            a(class="text-blue-600 font-bold cursor-pointer" @click="showUploadContactList = true") + Upload new list to SendGrid
          hr(class="my-6 border-neutral-600")
          .contactLists
            .contactList(@click="campaign.contactList = list.id; updateCampaign();" v-for="list in globalContactLists.sendgridLists" :class="{'bg-neutral-500 font-bold' : campaign.contactList == list.id}" class="flex justify-between p-4 hover:bg-neutral-500 cursor-pointer")
              h2(class="text-title") {{list.name}}
              span(class="text-header") {{list.recipient_count}}

        
        //- .uploadContacts.mb-6
        //-   h1(class="font-aeries text-title font-bold leading-tight") Upload a CSV of recipients

        //-   p(class="py-2") 
        //-     | Be sure the spreadsheet has a header labeled “email”.

        //-   .uploadBox(class="w-full h-32 bg-neutral-500 border-2 border-neutral-700 border-dashed flex justify-center items-center text-neutral-1000 font-aeries font-bold text-title")
        //-     span Click here or drag files to upload
        //-   hr(class="my-6 border-neutral-600")
        //-   h1(class="font-aeries text-title font-bold leading-tight") {{campaign.contacts.length}} contacts uploaded
          //- .addContacts.my-4
          //-   a(class="text-blue-600 font-bold cursor-pointer" @click="campaign.contacts.push({'title':'hey'})") + Manually add contact(s)



    section#messaging(v-show="selectedStep == 4" class="container")

      .headerNav(class="flex my-8")
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 1}" @click="selectedSubStep = 1; updateQueryParameter('ss', 1)") Information
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 cursor-pointer mr-24" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 2, 'text-green-600 border-green-600' : subStepIsCompleted(4,2)}" @click="selectedSubStep = 2; updateQueryParameter('ss', 2)") 
          span(v-if="subStepIsCompleted(4,2)") ✅ 
          | Write purpose/goals outline

      .stepOne(v-show="selectedSubStep == 1")
        .introduction.mb-6
          .headerIcon(class="w-10 mb-3")
            img(src="/images/workflow-typewriter.png")
          h1(class="font-aeries text-title font-bold leading-tight") Messaging / Copy Development
          h3(class="text-subhead leading-tight font-semi-bold") Create a rough draft of the email text

          p(class="py-2") 
            | In this phase the stakeholder develops the email copy. Depending on the complexity or importance of the email copy, this might take 5 minutes or it might take several days.
          p(class="py-2") 
            | It’s a good idea to complete this phase without considering email template design, implementing any images, choosing any color, or applying any complex formatting (aside from bolding, italicizing, and applying headers. If the message is already as succint, refined and distilled as possible with no assumptions going into the design phase, that will simplify the design phase.

        
        .actionItems.mb-6
          h1(class="font-aeries text-title font-bold leading-tight mb-4") Action items
          ul(class="list-disc")
            li In Aeriesworks, the accountable stakeholder writes a purpose / goals outline, which are some notes for what the email should generally say, and what the goals of the email are. This is for the benefit of those reviewing the campaign internally.


        .questionsToAnswer(class="mb-4")
          
          h1(class="font-aeries text-title font-bold leading-tight mb-4")
            | Deliverables provided in this section
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | Purpose / goals outline for the email
            p(class="pt-1")
              | For someone being asked to review an email before it goes out, this outline is a guiding light that helps in determining whether an email will achieve its intended goal when sent.

        .stakeholdersInvolved(class="mb-6")

          h1(class="font-aeries text-title font-bold leading-tight mb-4") Stakeholders involved in this phase
          
          .stakeholderList
            .stakeholderRow(class="flex mb-4")
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The accountable stakeholder
              
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The marketing team


      .stepTwo(v-show="selectedSubStep == 2")
        .my-12
          h1(class="font-aeries text-title font-bold leading-tight") What is the purpose / goal of this campaign?
          p(class="mt-2 mb-4")
            | Imagine you were handing off this email campaign for someone else to manage, and they hadn’t been brought up to speed on it yet. After reading this outline, they should have a basic understanding of what the goal of the email is and be able manage it from there.
          p(class="mt-2 mb-4")
            | Also, for someone being asked to review an email before it goes out, this outline is a guiding light that helps in determining whether an email will achieve its intended goal when sent.
          .example(class="mb-8")
            //- a(class="text-blue-600 font-bold cursor-pointer mb-4") What’s an example of a purpose/goal outline?
          textarea(v-model="campaign.purposeGoalsOutline" class="p-4 w-full" placeholder="Type the purpose/goal outline here..." v-on:change="updateCampaign()")

        .my-12
          hr(class="my-6 border-neutral-600")

          img(src="images/logo-confluence.svg" class="mb-4")
          h1(class="font-aeries text-title font-bold leading-tight") Or, add a link to a Confluence document
          p(class="mt-2 mb-4")
            | If this email campaign already has a Confluence document with details, paste the link below. A link to the document will be shown in the sidebar. If your Confluence document already outlines the purpose and goal of your email campaign, you do not need to supply it above.

          input(v-model="campaign.confluencePageURL" class="p-4 w-full" type="text" v-on:change="validateConfluencePageURL()" placeholder="Paste the link to a Confluence document (e.g. 'https://docs.aeries.works/display/EC/Email+Campaign+Messaging')")


    section#design(v-show="selectedStep == 5" class="container")

      .headerNav(class="flex my-8")
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 cursor-pointer mr-24" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 1}" @click="selectedSubStep = 1; updateQueryParameter('ss', 1)") Information
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 2, 'text-green-600 border-green-600' : subStepIsCompleted(5,2)}" @click="selectedSubStep = 2; updateQueryParameter('ss', 2)") 
          span(v-if="subStepIsCompleted(5,2)") ✅ 
          span Choose template
        //- a(class="py-1 font-bold font-aeries text-subhead opacity-50 cursor-pointer mr-24" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 3}" @click="selectedSubStep = 3; updateQueryParameter('ss', 3)") 
        //-   | Push template update

      .stepOne(v-show="selectedSubStep == 1")
        .introduction.mb-6
          .headerIcon(class="w-10 mb-3")
            img(src="/images/workflow-design.png")
          h1(class="font-aeries text-title font-bold leading-tight") Templating & Design
          h3(class="text-subhead leading-tight font-semi-bold") Create the email design from existing templates

          p(class="py-2") 
            | In this phase, a template is selected as a starting place and the overall design of the email is chosen. This includes, if necessary, implementing fonts, colors, and any custom layouts using the Aeriesworks mail manager email builder.
          p(class="py-2") 
            | When this stage is complete, the email is ready for internal feedback from the company at large.

        
        .actionItems.mb-6
          h1(class="font-aeries text-title font-bold leading-tight mb-4") Action items
          ul(class="list-disc")
            li.mb-4 Choose a template for the email on the next page. If a purpose-built template doesn’t exist for the type of email being sent, a simple general-purpose one can be used.
            li.mb-4 Implement the messaging you developed in the previous phase by copy + pasting your content into layout sections.


        .questionsToAnswer(class="mb-12")
          
          h1(class="font-aeries text-title font-bold leading-tight mb-4")
            | Questions to answer in this phase
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | What template should be used for the email?
            p(class="pt-1")
              | To complete this phase, you’ll need to determine whether a template exists that suits the context of the email being sent. If not, a general template can be used or a new one can be created (which can increase lead time on the email by a day).
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | Can the message be made clearer through design?
            p(class="pt-1")
              | Determine whether any changes, for example in layout, color choice, or image selection can improve the overall clarity, succinctness or impact of the email for readers.


        .stakeholdersInvolved(class="mb-6")

          h1(class="font-aeries text-title font-bold leading-tight mb-4") Stakeholders involved in this phase
          
          .stakeholderList
            .stakeholderRow(class="flex mb-4")
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The accountable stakeholder
              
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The design team


      .stepTwo(v-show="selectedSubStep == 2")
        .my-12
          h1(class="font-aeries text-title font-bold leading-tight mb-4") Which email template will you use?

          .templates(class="flex")

            .template(v-for="template in templates" class="w-1/4 cursor-pointer hover:bg-neutral-500 p-2" @click="campaign.selectedTemplate = template._id; updateCampaign()" :class="{'bg-neutral-500' : template._id == campaign.selectedTemplate}")
              .headerImage(class="bg-blue-600 w-full" v-bind:style="{ backgroundImage: 'url(' + template.image + ')' }")
              .label(class="mt-2")
                h2(class="font-bold text-title") {{template.title}}
                p(class="text-minimum-text text-neutral-1000") by {{template.author}}
                p(class="text-minimum-text pt-2") {{template.description}}

      .stepThree(v-show="selectedSubStep == 3")
        .my-12
          h1(class="font-aeries text-title font-bold leading-tight") Input your content
          p The email content editor must open in a new window. This is because the email template contains CSS styling code that would break this page if embedded.
          .emailContentContainer(class="flex justify-center")
            .emailContent
          


    section#approval(v-show="selectedStep == 6" class="container")

      .headerNav(class="flex my-8")
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 cursor-pointer mr-24" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 1}" @click="selectedSubStep = 1; updateQueryParameter('ss', 1)") Information
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 2, 'text-green-600 border-green-600' : subStepIsCompleted(6,2)}" @click="selectedSubStep = 2; updateQueryParameter('ss', 2)") 
          span(v-if="subStepIsCompleted(6,2)") ✅ 
          span Create feedback guide
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 3}" @click="selectedSubStep = 3; updateQueryParameter('ss', 3)") 
          span Notify proofreaders
        a(class="py-1 font-bold font-aeries text-subhead opacity-50 mr-24 cursor-pointer" :class="{'opacity-100 border-b-4 border-blue-600' : selectedSubStep == 4}" @click="selectedSubStep = 4; updateQueryParameter('ss', 4)") 
          span Confirm

      .stepOne(v-show="selectedSubStep == 1")
        .introduction.mb-6
          .headerIcon(class="w-10 mb-3")
            img(src="/images/workflow-approval.png")
          h1(class="font-aeries text-title font-bold leading-tight") Review & Revision
          h3(class="text-subhead leading-tight font-semi-bold") Get feedback from stakeholders and make any changes

          p(class="py-2") 
            | After the first-draft copy and design are both finalized, the email is ready for internal stakeholders to preview. Marking a campaign as ready for review in the Aeriesworks mail manager automatically triggers a Slack notification in #alerts-mass-email calling for any feedback and revisions. That notification links users to a preview of the email equipped with a feedback utility that allows reviewers to make changes and send them to the accountable stakeholder.
        
        .actionItems.mb-6
          h1(class="font-aeries text-title font-bold leading-tight mb-4") Action items
          ul(class="list-disc")
            li.mb-4 Mark the task as “ready for review”, triggering the Slack notification letting people know the campaign is ready for feedback.
            li.mb-4 As feedback and revision suggestions come in, the accountable stakeholder updates the email with those changes. Every time a new version of the campaign is saved, the accountable stakeholder provides a one-line sentence of the changes. A new Slack alert will notify the team of the changes.


        .questionsToAnswer(class="mb-12")
          
          h1(class="font-aeries text-title font-bold leading-tight mb-4")
            | Questions to answer in this phase
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | Who are the feedback stakeholders?
            p(class="pt-1")
              | All emails require signoff from at least the accountable stakeholder managing the email. For messages being sent to >1000 recipients, signoff from an executive is required. 
          
          ul(class="list-disc mb-4")
            li(class="font-bold text-subhead") 
              | How long will feedback be allowed?
            p(class="pt-4")
              | Input a date and time in the Aeriesworks mail manager to add a cutoff for review, so your stakeholders know how to prioritize giving feedback. Sometimes the feedback window is only a couple of hours, but if possible there should be a day or more of leeway.
            p(class="pt-4")
              | Set your cutoff to allow some time before sendout. If you get a last-minute piece of feedback that requires changes, those can’t easily be made if the feedback came in 5 minutes before it’s scheduled to be automatically sent.


        .stakeholdersInvolved(class="mb-6")

          h1(class="font-aeries text-title font-bold leading-tight mb-4") Stakeholders involved in this phase
          
          .stakeholderList
            .stakeholderRow(class="flex mb-4")
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | The accountable stakeholder
              
              .stakeholder(class="flex items-center mr-8")
                .stakeholderImage
                  img(src="/images/user-icon.png")
                .stakeholderLabel
                  | Every stakeholder that is involved in providing feedback on this campaign


      .stepTwo(v-show="selectedSubStep == 2")
        .uploadContacts.mb-6
          h1(class="font-aeries text-title font-bold leading-tight") Alright, let’s get internal feedback on this email

          p(class="py-2") 
            | You’re about to send a Slack notification to internal stakeholders as well as the proofreading team that this email is ready for feedback and revision suggestions. As feedback comes in, you can monitor it on the feedback dashboard.

          hr(class="my-6 border-neutral-600")

          h1(class="font-aeries text-title font-bold leading-tight") What's the last day that feedback can be given?
          p(class="py-2") 
            | You should cut off feedback a day or more before your email goes out.

          input(v-model="campaign.lastDayOfFeedback" class="p-4 w-full" type="date" placeholder="Choose a date..." v-on:change="updateCampaign()")

          hr(class="my-6 border-neutral-600")

          h1(class="font-aeries text-title font-bold leading-tight") Provide stakeholders / proofreaders with an outline of the type of feedback you want on this email
          p(class="py-2") 
            | Your proofreading team will be shown the following message when they click to provide feedback via the link in the notification they'll receive. Write your own feedback guide, or use the buttons below to insert common feedback directives.

          .commonFeedbackTags(class="mb-4")
            a.feedbackTag(v-for="tag in feedbackTags" @click="appendFeedbackTagToFeedbackGuide(tag.blurb)" class="bg-white font-aeries font-bold inline-flex mr-2 px-6 py-1 cursor-pointer shadow")
              | {{tag.title}}

          textarea(v-model="campaign.feedbackGuideDescription" class="p-4 w-full h-48" placeholder="Type the feedback guide here..." v-on:change="updateCampaign()")


      .stepThree(v-show="selectedSubStep == 3")
        .uploadContacts.mb-6
          h1(class="font-aeries text-title font-bold leading-tight") Time to open the flood gates

          p(class="py-2") 
            | Let’s review who’s about to put eyes on your email campaign, so we can make sure everyone who needs to see this gets a notification to come and provide feedback
            span(v-if="campaign.lastDayOfFeedback")  by 
              span(class="font-bold") {{new Date(campaign.lastDayOfFeedback).toLocaleString('en-us', {  weekday: 'long', timeZone: 'UTC' })}}, {{new Date(campaign.lastDayOfFeedback).toLocaleDateString('en-US', {timeZone: 'UTC'})}}.
            span(v-else) .

          hr(class="my-6 border-neutral-600")

          h1(class="font-aeries text-title font-bold leading-tight") The Slack alert you’re about to send
          p(class="py-2") 
            | The alert will also be sent as an email, unless the proofreader has opted out of email notifications for mass email proofreading.

          .slackAlertContainer
            .slackAlert(class="bg-white rounded w-2/5 shadow-xl mt-4")
              .alertContent(class="flex")
                .imageCol(class="flex flex-col w-1/6 my-4 ml-4")
                  .placeholder(class="bg-neutral-500 rounded-sm w-12 h-12 self-center mr-2 mt-1")
                .textCol(class="flex flex-col w-5/6 my-4 mr-4")
                  .headerRow
                    span.name(class="font-bold") Aeriesworks Mass Emails
                    span.time(class="text-neutral-1200 text-minimum-text ml-2") 5:20 PM
                  .bodyRow(class="text-minimum-text mt-1")
                    p Hello! This alert is to let you know that your feedback has been requested on an email campaign draft
                      span(v-if="campaign.name")  entitled #[b {{campaign.name}}]. 
                      span(v-else) . 
                    p(v-if="campaign.lastDayOfFeedback" class="mt-3") You have until #[b {{new Date(campaign.lastDayOfFeedback).toLocaleString('en-us', {  weekday: 'long', timeZone: 'UTC' })}}, {{new Date(campaign.lastDayOfFeedback).toLocaleDateString('en-US', {timeZone: 'UTC'})}}] to proofread and feedback.
                    p(class="mt-3")
                      a(class="text-blue-500 font-bold cursor-pointer") You can preview the email and provide feedback here.
          
          .sendingTo(class="mt-8")
            h1(class="font-aeries text-title font-bold leading-tight") The people you're about to send it to 
            
            .group(class="mt-2")
              h3(class="text-subhead font-bold") 1. Eagle Eyes proofreader group
              p(class="py-2") 
                | This group proofreads every mass email we send - they are automatically notified with a message to #[a(class="text-blue-600 font-bold" target="_blank" href="https://aeriessis.slack.com/archives/C017B8BP788") #team-eagle-eyes.] If you think of someone who should provide feedback, you can tag them in a threaded comment on the notification that appears in that Slack channel.

            .group(class="mt-2")
              h3(class="text-subhead font-bold") 2. The accountable stakeholder (that might be you)
              p(class="py-2") 
                | The accountable stakeholder also is notified that the campaign has been set to "Needs feedback".

          hr(class="my-6 border-neutral-600")

      .stepFour(v-show="selectedSubStep == 4")
        .uploadContacts.mb-6
          h1(class="font-aeries text-title font-bold leading-tight") Set this campaign's status to "needs feedback?"

          p(class="py-2") 
            | This will notify your proofreaders that their attention is requested.

          hr(class="mt-4 mb-8 border-neutral-600")

          .button(class="mt-6")
            a(@click="campaign.status = 'needs_feedback'; updateCampaign()" class="text-white bg-blue-600 cursor-pointer px-12 py-3 rounded shadow-sm" v-if="!campaign.status") Set status to "needs feedback"
            a(class="text-white bg-blue-600 px-12 py-3 rounded shadow-sm opacity-50 cursor-not-allowed" v-if="campaign.status  == 'needs_feedback'") Set status to "needs feedback"
            p(v-if="campaign.status == 'needs_feedback'" class="mt-6") Alright, notification sent to proofreaders! You'll have their feedback or their go-ahead shortly!




              

</template>

<script>

const axios = require('axios');
const Papa = require('papaparse');

module.exports = {
data() {
    return {
        page: "home",
        selectedStep : 1,
        selectedSubStep: 1,
        selectedAccountableStakeholder: "",
        steps : [
          {index: 1, title: 'Initialization'},
          {index: 2, title: 'Scheduling'},
          {index: 3, title: 'Contact List'},
          {index: 4, title: 'Messaging'},
          {index: 5, title: 'Design'},
          {index: 6, title: 'Approval'},
        ],
        feedbackTags: [
          {title: 'Look for typos', blurb: "Of course, we don't want any typos in the email, so if you find any please report them using the on-screen feedback tools."},
          {title: 'Check grammar', blurb: "An area we want to ensure is solid is the overall grammar and sentence structure of the messaging. Please check that in particular."},
          {title: 'Check links', blurb: "There are hyperlinks in this email. Please click on each one and verify that the link leads to the expected location and that the user experience is intact on the other side."},
          {title: 'Verify accuracy', blurb: "Please take special care to verify the accuracy of the information that we state in this email, and reach out to any subject matter experts if necessary."},
          {title: 'Suggest changes', blurb: "We're open to any general changes or suggestions you have in mind, so don't hesitate to give us feedback through the on-screen tools."}
        ],
        campaign: {
          name: "",
          sendGridCampaignID: "",
          accountableStakeholder: "",
          confluencePageURL: "",
          date: "",
          time: "",
          contacts: [],
          contactList: "",
          purposeGoalsOutline: "",
          selectedTemplate: "",
          feedbackGuideDescription: "Here's what I'd like you to focus on while proofing this email: \n\n",
          lastDayOfFeedback: "",
          proofreadersNotified: false,
          status: "",
          _id: ""
        },
        templates: [
          {
            _id: "blank",
            title: "Blank",
            author: "Aeries Design Team",
            description: "A great choice when no more specific template is available for your purposes.",
            image: "/images/email-template-general-purpose.png"
          }
        ],
        contactList: [],
        contactListName: "",
        globalContactLists: {
          sendgridLists: [],
          feathersLists: []
        },
        showUploadContactList: false,
        uploadingContactList: false,
        currentUser : "",
        // emailCampaigns: [],
        totalSlackUsers: 0,
        totalConfluenceUsers: 0,
        totalJiraUsers: 0,
        allSlackUsers: []
    }
  },
methods : {
  uploadCSV(name, files) {
    console.log(name, files)
    var globalScope = this;
    // Parse local CSV file
    Papa.parse(files[0], {
      complete: function(results) {

        if (files[0].name.indexOf('.csv') !== -1
        && results.data[0][0].toLowerCase() == 'email') {

        var title = files[0].name.split('.csv')[0];
        if (globalScope.campaign.name) {
          title = globalScope.campaign.name;
        }

        globalScope.contactListName = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + " - " + title;
        var output = [];
        for (var i = 0; i < results.data.length; i++) {
          if (i !== 0 && results.data[i][0].length) {
            output.push({"email" : results.data[i][0]});
          }
        }
      globalScope.contactList = output;
      } else {
        alert("Invalid file. Be sure you're uploading a CSV file with only one column labeled 'email'.")
        $('#csvUpload')[0].value = null;
      }
      }
      
    });

  },
  uploadContactList() {
    const globalScope = this;
    
    this.uploadingContactList = true;

    //Create new SendGrid mailing list, storing ID
    var mailingListID = "";
    console.log(this.contactListName)

    const payloadData = {
      name: this.contactListName
    }


    axios
    .post('/create-sendgrid-list/', payloadData)
    .then(function(response) {
      if (!response.data.id) {
        alert("Something went wrong uploading the list.")
      } else {
        console.log(response.data.id)
        mailingListID = response.data.id;
      


    //Upload contacts to main pool 1000 at a time every second, storing contact IDs as they come back
    var successfullyUploadedContacts = [];

    console.log(globalScope.contactList)
      
      axios
      .post('/add-sendgrid-list-contacts', globalScope.contactList)
      .then(function(response) { 

        console.log("Add contacts to big bucket: ", response)

        const finalPayload = {
          contacts : response.data.persisted_recipients,
          mailingListID: mailingListID
        }

        console.log("Final payload: ", finalPayload)

          axios
          .post('/add-sendgrid-recipients-to-list', finalPayload)
          .then(function(response) { 
            console.log("DONE: ", response)
            globalScope.contactUploadSuccess = true;
            globalScope.refreshContactLists();
            globalScope.resetUploadContactList()
          })
        
      })


      


      }
    
    })
    

  },
  refreshContactLists() {
    
    var globalScope = this;

    axios
    .get('/get-sendgrid-lists')
    .then(function(response) { 
      globalScope.globalContactLists.sendgridLists = response.data.contactLists.lists;
      globalScope.globalContactLists.feathersLists = response.data.emailCampaigns;
    })
  },
  resetUploadContactList() {
    this.uploadingContactList = false;
    this.contactListName = "";
    this.contactList = [];
    $('#csvUpload')[0].value = null;
  },
 splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  },
  selectEmailCampaign(emailCampaign) {
    this.campaign = emailCampaign; 
    this.page = 'createEditCampaign'; 
    this.selectedStep = 1; 
    this.selectedSubStep = 2;
    if (emailCampaign.accountableStakeholder) {
      this.selectedAccountableStakeholder = emailCampaign.accountableStakeholder;
    }
  },
  goBackToHome() {

    this.updateQueryParameter('ss', '')


    if (this.campaign !== this.returnEmptyCampaignObject() && !this.campaign._id) {
      if (confirm("Are you sure? The campaign you're working on will be lost unless you initialize it.")) {
        this.page = "home"
      }
    } else {
      this.page = "home"
    }
  },
  validateConfluencePageURL() {
    //URL validation function
    function validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }
    if (validURL(this.campaign.confluencePageURL)) {
      this.updateCampaign()
    } else {
      if (this.campaign.confluencePageURL == "") {
        this.updateCampaign()
      } else {
        alert("Please enter a valid URL.")
        this.campaign.confluencePageURL = ""
      }
    }

  },
  initializeCampaign() {
    var globalScope = this;
    var thisCampaign = JSON.parse(JSON.stringify(this.campaign));

    //If no subject exists, use the campaign name
    if (!thisCampaign.subject) {
      thisCampaign.subject = thisCampaign.name;
    }

    var sendgridCampaign = {
      "title": thisCampaign.name,
      "subject": thisCampaign.subject,
      "html_content": "<html><head><title></title></head><body><p>This is a placeholder for an Aeries Email Template!</p></body></html>",
      "editor": "design"
    }

    if (thisCampaign.name && thisCampaign.accountableStakeholder) {
    console.log(thisCampaign)
    delete thisCampaign._id;
      
      axios
      .post('/rest/email-campaigns/', thisCampaign)
      .then(function(response) {
        globalScope.campaign._id = response.data._id;
        console.log(response)
        
        axios
        .post('/create-sendgrid-campaign/', sendgridCampaign)
        .then(function(response) {
          console.log(response.data)
          globalScope.campaign.sendGridCampaignID = response.data.id;
          globalScope.updateCampaign();
        })
      })

    } else {
      alert("Please ensure there is both a campaign name and an accountable stakeholder set.")
    }
  },
  emptyCampaignObject() {
    //Reset the campaign object to initial state, aka 'create new campaign'
    this.selectedStep = 1;
    this.selectedSubStep = 1;
    this.selectedAccountableStakeholder = "";
    this.campaign = this.returnEmptyCampaignObject();
  },
  returnEmptyCampaignObject() {
    return {
          name: "",
          sendGridCampaignID: "",
          accountableStakeholder: "",
          date: "",
          time: "",
          contacts: [],
          contactList: "",
          contactUploadSuccess: "",
          purposeGoalsOutline: "",
          selectedTemplate: "",
          feedbackGuideDescription: "Here's what I'd like you to focus on while proofing this email: \n\n",
          lastDayOfFeedback: "",
          proofreadersNotified: false,
          status: "",
          _id: "",
        }
  },
  updateCampaign() {
    var globalScope = this;
    console.log("Updating campaign", this.campaign, this.campaign._id)
    //If the user is editing an existing campaign, update it
    if (this.campaign._id) {
      //Push the object up
      axios
      .put('/rest/email-campaigns/' + this.campaign._id, this.campaign)
      .then(function(response) {
        axios
        .get('/rest/email-campaigns?$limit=9999&deleted[$ne]=1')
          .then(function(response) {
            globalScope.globalContactLists.feathersLists = response.data.data;
          })
      })
    }
  },
  getSlackUserByID(id, returnArray) {
    for (var i = 0; i < this.autoCompleteSlackUsers.length; i++) {
      if (this.autoCompleteSlackUsers[i].id == id) {
        if (returnArray) {
          return [this.autoCompleteSlackUsers[i]];
        } else {
          return this.autoCompleteSlackUsers[i];
        }
      }
    }
  },
setIframeContents() {
  //https://aeries.tools/nest/tools/email-preview/?id=10881536
  var html = "";
  $.ajax({
    url: "/email-preview/10881536",
    type: "GET",
    success: function(data) {
      console.log(data);
    },
  })
},
updateQueryParameter(key,value) {
if ('URLSearchParams' in window) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value);
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
}
},
appendFeedbackTagToFeedbackGuide(blurb) {
this.campaign.feedbackGuideDescription += blurb + '\n\n';
this.updateCampaign()
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
},
stepIsCompleted(step) {
  if (step == 1) {
    if (this.subStepIsCompleted(1,2) && this.subStepIsCompleted(1,3) && this.subStepIsCompleted(1,4)) {
      return true;
    }
    
  } else if (step == 2) {
    if (this.subStepIsCompleted(2,2)) {
      return true;
    }
  } else if (step == 3) { 
    if (this.subStepIsCompleted(3,2)) {
      return true;
    }
  } else if (step == 4) { 
    if (this.subStepIsCompleted(4,2)) {
      return true;
    }
  } else if (step == 5) {
    if (this.subStepIsCompleted(5,2)) {
      return true;
    }
  } else if (step == 6) {
    if (this.subStepIsCompleted(6,2)) {
      return true;
    }
  }

  return false;
},
  subStepIsCompleted(step,substep) {
    //1 - INITIALIZATION
    if (step == 1) {
      //Campaign name -- is there one?
      if (substep == 2) {
        if (this.campaign.name) {
          return true;
        }
      }
      //Accountable stakeholder -- is one set?
      if (substep == 3) {
        if (this.selectedAccountableStakeholder) {
          return true;
        }
      }
      //SendGrid campaign - is it initialized?
      if (substep == 4) {
        if (this.campaign._id) {
          return true;
        }
      }
    }
    //2 - SCHEDULING
    else if (step == 2) {
      //Date and time - are they set?
      if (substep == 2) {
        if (this.campaign.date && this.campaign.time) {
          return true;
        }
      }
    }
    //3 - CONTACT LIST
    else if (step == 3) {
      if (substep == 2) {
        if (this.campaign.contactList) {
          return true;
        }
      }
    }
    //4 - MESSAGING
    else if (step == 4) {
      //Date and time - are they set?
      if (substep == 2) {
        if (this.campaign.purposeGoalsOutline || this.campaign.confluencePageURL) {
          return true;
        }
      }
    }
    //5 - DESIGN
    else if (step == 5) {
      //Date and time - are they set?
      if (substep == 2) {
        if (this.campaign.selectedTemplate) {
          return true;
        }
      }
    }
    //6 - APPROVAL
    else if (step == 6) {
      //Date and time - are they set?
      if (substep == 2) {
        if (this.campaign.lastDayOfFeedback && this.campaign.feedbackGuideDescription
        && this.campaign.feedbackGuideDescription !== "Here's what I'd like you to focus on while proofing this email: \n\n") {
          return true;
        }
      }
    }





    return false;
  }
},
computed: {
    contactListChunked() {
      if (this.contactList.length) {
        return this.splitArrayIntoChunksOfLen(this.contactList, 1000)
      } else {
        return []
      }
    },
    autoCompleteSlackUsers() {
  var output = [];
  var u = this.allSlackUsers;
  for (var i = 0; i < u.length; i++) {
    if (!u[i].deleted && !u[i].is_restricted && ![u].is_bot) {
      var thisUser = u[i];
      thisUser.label = u[i].real_name
      thisUser.key = u[i].id;
      thisUser.value = u[i].id;
      thisUser.desc = u[i].profile.title
      output.push(thisUser);
    }
  }
  // console.log('output', output)
  return output;
}
},
async mounted () {
      //For passing to our function
      var globalScope = this;
      // this.emailCampaigns = this.$attrs.payload.emailCampaigns;
      //
      this.globalContactLists.sendgridLists = this.$attrs.payload.contactLists.lists;
      this.globalContactLists.feathersLists = this.$attrs.payload.emailCampaigns;

      //Slack
      axios
      .get('/rest/users?platform=slack&is_bot[$ne]=true&deleted[$ne]=true&is_restricted[$ne]=true&$limit=9999')
      .then(function(response) {
        globalScope.allSlackUsers = response.data.data;
      })

      // this.setIframeContents();

      let params = new URLSearchParams(document.location.search.substring(1));
      let step = params.get("s");
      let substep = params.get("ss");

      if (step) {
        this.selectedStep = step;
      }

      if (substep) {
        this.selectedSubStep = substep;
      }

    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }

      //User search (e.g. owner)
    $( ".userSearch" ).on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function(request, response) {
          var results;
          var aData = $.map(globalScope.autoCompleteSlackUsers, function(value, key) {
            return {
              label: value.label,
              value: value.id
            }
          });
          results = $.ui.autocomplete.filter(aData,  request.term );
          
          response(results);
        },
        select: function( event, ui ) {
          console.log(event, ui)
          if (event.target.id == "accountableStakeholderUserSearch") {
            globalScope.campaign.accountableStakeholder = ui.item.value;
            globalScope.selectedAccountableStakeholder = ui.item.value;
            globalScope.updateCampaign();
              setTimeout(function() { 
                $('#accountableStakeholderUserSearch').val('')
                $('#accountableStakeholderUserSearch').get(0).focus()
              }, 20);
            
          }

        }
      }).bind('focus', function(){ $(this).autocomplete("search"); } );


},

}
</script>
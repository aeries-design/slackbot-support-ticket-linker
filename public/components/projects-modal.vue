<style scoped>
.modal {
    width: 800px;
    height: 100%;
    border-radius: 4px;
    z-index: 60;
    background: white;
    margin: 0px auto;
    position: fixed;
    top: 0%;
    right: 0%;
}

.modalOverlay {
  width: 100vw;
    height: 100vh;
    background: rgb(0, 0, 0);
    opacity: 0.5;
    z-index: 50;
    position: fixed;
}

.ui-autocomplete {
    z-index: 9999;
}

input[type=checkbox]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
}
</style>

<template lang="pug">
.modalRootContainer(v-show="modal.show")

  .modal.overflow-y-auto
    .modalContent.py-5.px-12

      //- Adding or editing sessions
      .sessionAdd.modalView(:class="{'selected' : modal.type == 'sessionAdd'}" v-show="modal.type == 'sessionAdd'")
        //- The top row of the modal, e.g. the close button.
        div(class="float-right text-right w-full mb-8")
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="updateModalState('', false)")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        input(v-model.lazy="modalSessionObject.title" type="text" class="font-aeries font-bold text-title w-full bg-neutral-400 p-1 rounded-sm" placeholder="Give a title to this session")
        .propertyRows
          
          //- .owner.propertyRow(class="border-b border-neutral-500 py-4 block")
          //-   .text-container.inline-block.w-48
          //-     span.required(class="text-blue-700 text-subhead") * 
          //-     span(class="font-bold inline-block") Owner
          //-   .selected_owner.inline
          //-     input(v-show="!modalSessionObject.selected_owner.value" type="text" placeholder="Select a team member" id="sessionOwnerSearch" class="bg-neutral-400 p-1 rounded-sm userSearch")
          //-     .avatar(v-if="modalSessionObject.selected_owner.value" @click="clearSessionOwner()" class="inline hover:bg-neutral-500 px-2 py-3 cursor-pointer")
          //-       img(:src="getSlackUserByID(modalSessionObject.selected_owner.value).profile.image_192" :title="getSlackUserByID(modalSessionObject.selected_owner.value).real_name" class="participant-image inline mr-2 xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
          //-       span.font-bold {{getSlackUserByID(modalSessionObject.selected_owner.value).real_name}}
          //-   a(@click="clearSessionOwner()" class="text-blue-600 float-right pt-1 cursor-pointer") Change

          .from.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block") Start date
            input(type="date" v-model.lazy="modalSessionObject.startDate" class="p-1 border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")


          .to.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block") End date
            input(type="date" v-model.lazy="modalSessionObject.endDate" class="p-1 border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")


          .status.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
             span(class="font-bold inline-block") Status
            select(v-model.lazy="modalSessionObject.status" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")
              option Open
              option In progress
              option Archived

          .color.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block") Color
            select(v-model.lazy="modalSessionObject.color" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")
              option DarkSlateBlue
              option Maroon
              option Moccasin
              option DarkSlateGrey
              option FireBrick
              option Indigo
              option DarkOrange
              option MediumAquaMarine
              option OldLace

          .parentSession.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block") Parent session
            a(@click="showCreateSessionShowParentSessionInput = true" v-show="!showCreateSessionShowParentSessionInput" class="text-blue-700 cursor-pointer hover:bg-neutral-300") + Select parent session
            input(v-show="showCreateSessionShowParentSessionInput && !modalSessionObject.selected_parent_session.label" type="text" placeholder="Select a session" id="parentSessionSearch" class="bg-neutral-400 p-1 rounded-sm sessionSearch")
            span(v-if="modalSessionObject.selected_parent_session.label" @click="clearParentSession()" class="cursor-pointer inline hover:bg-neutral-300 py-3").font-bold {{modalSessionObject.selected_parent_session.label}}


          .cadence.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block") Cadence
            select(v-model.lazy="modalSessionObject.cadence" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")
              option Weekly
              option Every two weeks
              option Monthly
          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="createSession()") Create Session
            button(class="closeModalButton rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="updateModalState('', false)") Cancel

      //- Adding objectives
      .objectiveAdd.modalView(:class="{'selected' : modal.type == 'objectiveAdd'}" v-show="modal.type == 'objectiveAdd'")
        div(class="float-right text-right w-full mb-8")
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="updateModalState('', false); deleteQueryStringParameter('action'); revertCreateNewObjectiveModal()")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        .propertyRows
          .icon
            img(src='/images/goal.svg')
          .title.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48.mb-1
              span.required(class="text-blue-700 text-subhead") * 
              span(class="font-bold inline-block") Write your objective
            input(type="text" class="font-aeries font-bold text-title inline-block w-full bg-neutral-400 p-1 rounded-sm" placeholder="Something easier said than done" v-model.lazy="modalObjectiveObject.title")
          
          .owner.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span.required(class="text-blue-700 text-subhead") * 
              span(class="font-bold inline-block") Owner
            .selected_owner.inline
              input(v-show="!modalObjectiveObject.selected_owner.value" v-model="modalObjectiveObject.selected_owner.value" type="text" placeholder="Select a team member" id="objectiveOwnerSearch" class="bg-neutral-400 p-1 rounded-sm userSearch")
              .avatar(v-if="modalObjectiveObject.selected_owner.value && getSlackUserByID(modalObjectiveObject.selected_owner.value)" @click="clearObjectiveOwner()" class="cursor-pointer inline hover:bg-neutral-500 px-2 py-3")
                img(:src="getSlackUserByID(modalObjectiveObject.selected_owner.value).profile.image_192" :title="getSlackUserByID(modalObjectiveObject.selected_owner.value).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
                span.font-bold {{getSlackUserByID(modalObjectiveObject.selected_owner.value).real_name}}
            a(@click="clearObjectiveOwner()" class="text-blue-600 float-right pt-1 cursor-pointer") Change

          .session.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span.required(class="text-blue-700 text-subhead") * 
              span(class="font-bold inline-block") Session
            a(@click="showObjectiveSessionInput = true" v-if="!showObjectiveSessionInput" class="text-blue-700 cursor-pointer hover:bg-neutral-300") + Choose a session
            input(v-show="showObjectiveSessionInput && !modalObjectiveObject.session_id" v-model="modalObjectiveObject.session_id" type="text" placeholder="Select a session" id="addObjectiveSessionSearch" class="bg-neutral-400 p-1 rounded-sm sessionSearch")
            .selected-session.inline(@click="clearAddObjectiveSession()" class="cursor-pointer hover:bg-neutral-300 p-2")
              img(v-if="modalObjectiveObject.session_id" class="inline w-6 pr-1" src='/images/session.svg')
              span(v-if="modalObjectiveObject.session_id" class="inline py-3 pl-1").font-bold {{fetchDataElementByID('session', modalObjectiveObject.session_id).title}}


          .linkedTo.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block") Parent
            a(@click="showAlignmentInput = true" v-if="!showAlignmentInput" class="text-blue-700 cursor-pointer hover:bg-neutral-300") + Align this objective under another objective
            input(v-show="showAlignmentInput && !modalObjectiveObject.selected_aligned_to_objective_id" v-model="modalObjectiveObject.selected_aligned_to_objective_id" type="text" placeholder="Select an objective" id="objectiveAlignmentSearch" class="bg-neutral-400 p-1 rounded-sm objectiveSearch")
            span(v-if="modalObjectiveObject.selected_aligned_to_objective_id" @click="clearAddObjectiveAlignment()" class="cursor-pointer inline hover:bg-neutral-300 py-3").font-bold {{modalObjectiveObject.selected_aligned_to_objective_id.label}}

          .objectiveType.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block w-48 align-top") Type of the objective
            form(class="inline-block" id="typeOfObjective")
              div
                input(type="radio" name="typeOfObjective" v-model.lazy="modalObjectiveObject.objective_type" value="aspirational" id="aspirational" class="mr-2")
                label(name="aspirational" for="aspirational") Aspirational
              div
                input(type="radio" name="typeOfObjective" v-model.lazy="modalObjectiveObject.objective_type" value="committed" id="committed" class="mr-2")
                label(name="committed" for="committed") Committed
          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="createOKR()") Create OKR
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="updateModalState('', false); deleteQueryStringParameter('action'); revertCreateNewObjectiveModal()") Cancel


      //- Viewing objectives
      .objectiveView.modalView(:class="{'selected' : modal.type == 'objectiveView'}" v-show="modal.type == 'objectiveView'")
        
        //- The top row of the modal, e.g. the close button.
        div(class="float-right text-right w-full mb-8")

          a(id="objectiveViewDropdownMenu" class="objectiveViewDropdownMenu font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="objectiveViewDropdown.show = true; objectiveViewDropdown.objectiveID = selectedObjective._id;")
            img(src="/images/three-squares.svg" class="objectiveViewDropdownMenu w-5 pb-2 opacity-25 inline")
          
          .objectiveViewContextDropdown(v-show="objectiveViewDropdown.show" class="absolute text-body text-blue-600 text-left bg-white shadow-lg w-48" style="right: 0;" @click="objectiveViewDropdown.show = true; objectiveViewDropdown.objectiveID = selectedObjective._id;")
            a(:href='"/projects/goals/"+selectedObjective.session_id+"/alignment"')
              div(v-if="selectedObjective.session_id" class="hover:bg-neutral-400 p-3 font-bold cursor-pointer border-b border-neutral-700") 
                span View alignment chart
            div(class="hover:bg-neutral-400 p-3 font-bold text-red-600 cursor-pointer" @click="deleteOKR(selectedObjective)") Delete objective
          

          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="updateModalState('', false); revertSelectedObjective(); deleteQueryStringParameter('action'); deleteQueryStringParameter('objectiveID')")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        
        .deletedAlert(v-if="selectedObjective && selectedObjective.deleted")
          h1(class="text-display font-bold font-aeries") NOTE: This has been deleted. It cannot be updated unless restored.
          hr(class="border-neutral-700 my-2")

        .icon
          img(src='/images/goal.svg' title="Objective")

        .propertyRows
          .title.propertyRow(class="py-4 block")
            h1(v-if="selectedObjective && !showObjectiveEditInput" @click="showObjectiveEditInput = true;" class="font-aeries font-bold text-title w-full focus:bg-neutral-400 hover:bg-neutral-400 p-1 rounded-sm flex") {{selectedObjective.title}}
            input(v-if="selectedObjective && showObjectiveEditInput" v-model.lazy="selectedObjective.title" type="text" id="objectiveViewTitleInput" class="font-aeries font-bold text-title w-full focus:bg-neutral-400 hover:bg-neutral-400 p-1 rounded-sm" placeholder="Something short and sweet")
          
          .session.propertyRow(class="py-4 block")
            .text-container(class="inline-block w-48")
              span(class="inline-block") Session
            .inline
              .selected-session.inline(@click="clearViewObjectiveSession()" v-if="fetchDataElementByID('session', selectedObjective.session_id)" class="px-2 py-3 cursor-pointer hover:bg-neutral-400")
                img(class="inline w-6" src='/images/session.svg')
                span(class="font-bold pl-2") {{fetchDataElementByID('session', selectedObjective.session_id).title}}
              .inline-block(class="py-2 px-3 hover:bg-neutral-300 cursor-pointer" @click="showViewObjectiveShowParentSessionInput = true" v-if="!fetchDataElementByID('session', selectedObjective.session_id) && !showViewObjectiveShowParentSessionInput" style="min-width: 480px;") -
              input(v-show="selectedObjective.session_id == '' && showViewObjectiveShowParentSessionInput == true" type="text" placeholder="Select a session" id="viewObjectiveParentSessionSearch" class="bg-neutral-400 p-1 rounded-sm sessionSearch")

          .owner.propertyRow(class="py-4 block")
            .text-container(class="inline-block w-48")
              span(class="inline-block") Owner
            .selected_owner.inline(v-if="selectedObjective")
              input(v-show="!selectedObjective.owner" type="text" placeholder="Select a team member" id="viewObjectiveOwnerSearch" class="bg-neutral-400 p-1 rounded-sm userSearch")
              .avatar(v-if="getSlackUserByID(selectedObjective.owner)" @click="clearViewObjectiveOwner()" class="cursor-pointer inline hover:bg-neutral-500 px-2 py-3")
                img(:src="getSlackUserByID(selectedObjective.owner).profile.image_192" :title="getSlackUserByID(selectedObjective.owner).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
                span(class="font-bold pl-2") {{getSlackUserByID(selectedObjective.owner).real_name}}

          .parent.propertyRow(class="py-4 block" v-if="selectedObjective")
            .text-container(class="inline-block w-48")
              span(class="inline-block") Parent
            a(@click="showAlignmentInput = true" v-if="showAlignmentInput == false && !selectedObjective.aligned_to_objective_id" class="text-blue-700 cursor-pointer hover:bg-neutral-300") + Align this objective under another objective
            input(v-show="showAlignmentInput && !selectedObjective.aligned_to_objective_id" type="text" placeholder="Select an objective" id="viewObjectiveAlignmentSearch" class="bg-neutral-400 p-1 rounded-sm objectiveSearch")
            .parentObjectiveContainer(@click="clearViewObjectiveAlignment()" class="cursor-pointer inline hover:bg-neutral-400 py-3 px-2" v-if="selectedObjective.aligned_to_objective_id").font-bold 
              img(class="inline w-6" src='/images/goal.svg')
              span(class="pl-3") {{getObjectiveByID(selectedObjective.aligned_to_objective_id).title}}

          .description.propertyRow(class="py-4 flex")
            .text-container.inline-block.w-48
              span(class="inline-block w-48 mb-4 align-top py-2") Description
            span(@click="showObjectiveDescriptionInput = true; focusInput('objectiveDescriptionInput')" class="showObjectiveDescriptionInput hover:bg-neutral-400 cursor-pointer inline-block p-2" v-if="!showObjectiveDescriptionInput && selectedObjective.description == ''" style="min-width: 500px;") -
            span(@click="showObjectiveDescriptionInput = true; focusInput('objectiveDescriptionInput')" class="showObjectiveDescriptionInput hover:bg-neutral-400 cursor-pointer inline-block p-2" v-if="!showObjectiveDescriptionInput && selectedObjective.description !== ''" style="min-width: 500px;") {{selectedObjective.description}}            
            textarea(id="objectiveDescriptionInput" v-show="showObjectiveDescriptionInput" v-on:change="showObjectiveDescriptionInput = false" v-model.lazy="selectedObjective.description" class="p-1 hover:bg-neutral-400 bg-neutral-300 text-neutral-1400 rounded-md py-1 inline-block" style="min-width: 500px;")

          .dynamicElements
            .progress.mb-6
              .header(class="justify-between border-b-2 border-neutral-400")
                .left
                  img(class="inline w-6 p-1" src='/images/progress.svg')
                  .text(class="inline relative" style="top: 2px;")
                    span(class="text-subhead pl-2 font-semi-bold") Progress
                    a(class="text-blue-700 cursor-pointer hover:bg-neutral-300 ml-2" @click="addNewKeyResultFromObjectiveModal()") + Add key result
                .right
                  .text(class="flex")
                    //- span(class="text-neutral-1000 text-minimum-text self-center") Key results
                    //- TODO: Dropdown to decide how to display the "completeness" of the objective

                    //- If there are key results, show the percentage complete of those. Otherwise, show percentage of tasks
                    .progressPercentage(class="inline pl-2" v-if="isNaN(selectedObjectiveKeyResultProgressPercentage) == false")
                      span(v-if="selectedObjectiveKeyResultProgressPercentage")
                        span(v-if="selectedObjectiveKeyResultProgressPercentage > 60" class="text-green-700 text-subhead font-bold") {{selectedObjectiveKeyResultProgressPercentage}}%
                        span(v-else-if="selectedObjectiveKeyResultProgressPercentage > 25" class="text-orange-600 text-subhead font-bold") {{selectedObjectiveKeyResultProgressPercentage}}%
                        span(v-else-if="selectedObjectiveKeyResultProgressPercentage > 1" class="text-orange-700 text-subhead font-bold") {{selectedObjectiveKeyResultProgressPercentage}}%
                        span(v-else-if="selectedObjectiveKeyResultProgressPercentage == 0" class="text-red-600 text-subhead font-bold") {{selectedObjectiveKeyResultProgressPercentage}}%

                    //- Use number of tasks complete if
                    .progressPercentage(v-else-if="selectedObjective.tasks && selectedObjective.tasks.length")
                      span(class="text-subhead font-bold") {{Math.floor(numberOfTasksComplete(selectedObjective.tasks) / selectedObjective.tasks.length * 100)}} %

              .keyResultList.mb-3
                div(v-if="selectedObjective.key_results && !selectedObjective.key_results.length" class="p-2 text-minimum-text text-neutral-1000") No key results. 
                  span(v-if="selectedObjective.tasks && selectedObjective.tasks.length") The objective completion percentage shown reflects % of tasks complete.
                table(class="w-full table-fixed" v-if="selectedObjective")
                  thead
                    tr
                      th(class="font-aeries text-subhead text-left w-1/12")
                      th(class="font-aeries text-subhead pl-0 text-left w-5/12")
                      th(class="font-aeries text-subhead text-left w-2/12")
                      th(class="font-aeries text-subhead text-left w-2/12")
                      th(class="font-aeries text-subhead text-left w-1/12")
                  tbody
                    tr(v-for="(kr, index) in selectedObjective.key_results" v-if="kr.deleted !== true" :class="{'border-b border-neutral-500' : index !== selectedObjective.key_results.length - 1}")
                      td.krBadges(class="py-5 align-top text-left")
                        img(title="Key result" class="w-6 inline pr-2" src='/images/metric.svg')
                        .avatar(v-for="owner in getSlackUserByID(kr.owner, true)" v-if="owner && owner.profile" class="inline")
                          img(:src="owner.profile.image_192" :title="owner.real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2")
                      td.krTitle(class="py-4 text-left pr-2") 
                        div.flex
                          .flex-col
                            .title(class="cursor-pointer hover:text-neutral-1200" @click="selectElement($event, kr); modal.type = 'keyResultView'") {{kr.title}}
                            .subtitle(class="text-neutral-800")
                              p(class="text-minimum-text") Should 
                                span(v-if="kr.kr_type == 'should_increase_to'") increase to 
                                span(v-if="kr.kr_type == 'should_decrease_to'") decrease to 
                                span(v-if="kr.kr_type == 'should_stay_above'") stay above 
                                span(v-if="kr.kr_type == 'should_stay_below'") stay below 

                                //- Some special logic to handle binary complete/incomplete-based KRs.
                                span(v-if="kr.kr_type == 'achieved_or_not'") increase to 100% 
                                
                                  //- Here we show 0% progress unless the last KR update set the new value to 100%.
                                  span(v-if="!kr.keyResultUpdates || !kr.keyResultUpdates.length || kr.keyResultUpdates[0].new_number !== '100'") , current progress at 0%
                                  span(v-else) , currently at 100%
                                span(v-if="kr.kr_type !== 'achieved_or_not'") {{kr.target_number}}
                                  span(v-if="kr.keyResultUpdates[0]") , current progress at {{kr.keyResultUpdates[0].new_number}} 
                                  span(v-else) , currently at {{kr.initial_number}} 
                      td.deadline
                        div(v-if="kr.deadline && kr.deadline !== ''" class="p-2 cursor-pointer font-bold text-fine-print text-neutral-800 text-center") 
                          span {{new Date(kr.deadline).toLocaleString('en-US').split(',')[0]}}
                      td.progressBar
                        .progress(v-if="keyResultPercentComplete(kr)" class="p-2")
                          .progress-bar-container(class="bg-blue-200 h-2 w-full rounded-full")
                            .progress-bar(:style="{ width : keyResultPercentCompleteCooked(kr) + '%' }" class="h-2 rounded-full" :class="{'bg-red-300' : keyResultPercentComplete(kr) < 40, 'bg-blue-600' : keyResultPercentComplete(kr) < 100, 'bg-green-700' : keyResultPercentComplete(kr) > 100, 'bg-green-600' : keyResultPercentComplete(kr) == 100}")
                          
                      td.progressPercentComplete
                        div(v-if="keyResultPercentComplete(kr)" class="p-2 text-left cursor-pointer text-minimum-text"  :class="{'text-red-300' : keyResultPercentComplete(kr) < 40, 'text-blue-600' : keyResultPercentComplete(kr) < 100, 'text-green-700 font-bold' : keyResultPercentComplete(kr) > 100, 'text-green-600' : keyResultPercentComplete(kr) == 100}") 
                          span {{keyResultPercentComplete(kr)}}%
                          span(v-if="keyResultPercentComplete(kr) > 100") !
                      td.updateButton(class="text-right")
                        .updateKeyResult
                          a.giveAnUpdate(@click="selectKeyResultGiveAnUpdate(kr._id)" class="text-fine-print border border-neutral-1000 text-neutral-1000 py-1 px-2 rounded-full font-bold cursor-pointer relative" style="bottom: 3px;") Update


            .tasks.mb-6
              .header(class="justify-between border-b-2 border-neutral-400")
                
                .left
                  img(class="inline w-6 p-1" src='/images/task.svg')
                  .text(class="inline relative" style="top: 2px;")
                    span(class="text-subhead pl-2 font-semi-bold") Tasks
                    a(class="text-blue-700 cursor-pointer hover:bg-neutral-300 ml-2" @click="addNewTaskFromObjectiveModal()") + Add task
                .right
                  .text(class="flex")
                    .progressPercentage(class="inline pl-2")
                      span(v-if="selectedObjective.tasks && selectedObjective.tasks.length" class="text-subhead font-bold" :class="{'text-green-700' : numberOfTasksComplete(selectedObjective.tasks) == selectedObjective.tasks.length, 'text-neutral-800' : numberOfTasksComplete(selectedObjective.tasks) !== selectedObjective.tasks.length}") {{numberOfTasksComplete(selectedObjective.tasks)}} / {{selectedObjective.tasks.length}} done
              
              .taskList.mb-3
                div(v-if="selectedObjective.tasks && !selectedObjective.tasks.length" class="p-2 text-minimum-text text-neutral-1000") No tasks.
                table(class="w-full table-fixed" v-if="selectedObjective")
                  thead
                    tr
                      th(class="font-aeries text-subhead text-left w-8")
                      th(class="font-aeries text-subhead pl-0 text-left w-7/12")
                      th(class="font-aeries text-subhead text-left w-2/12")
                      th(class="font-aeries text-subhead text-left w-2/12")
                  tbody
                    tr(v-for="(task, index) in selectedObjective.tasks" :class="{'border-b border-neutral-500' : index !== selectedObjective.tasks.length - 1, 'opacity-75' : task.status == 'Done'}" class="hover:bg-neutral-400")
                      td(class="py-5 align-top text-left")
                        .avatar(v-for="owner in getSlackUserByID(task.owner, true)" v-if="owner && owner.profile" @click="selectElement($event, task); backToObjectiveRef = selectedObjective;" class="cursor-pointer")
                          img(:src="owner.profile.image_192" :title="owner.real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2")
                      td(class="py-4 text-left pr-8") 
                        div.flex
                          .title(class="text-blue-700 cursor-pointer" @click="selectElement($event, task); backToObjectiveRef = selectedObjective;") {{task.title}}
                      td(class="p-4 text-left cursor-pointer text-minimum-text" @click="selectElement($event, task); backToObjectiveRef = selectedObjective;") {{task.due_date}}
                      td(class="p-4 text-left cursor-pointer text-minimum-text" @click="selectElement($event, task); backToObjectiveRef = selectedObjective;") 
                        span(v-if="task.status == 'Done'" class="bg-green-700 text-white font-bold px-3 py-2 rounded-full text-minimum-text") {{task.status}}
                        span(v-else) {{task.status}}


            .childObjectives.mb-6
              .header(class="justify-between border-b-2 border-neutral-400")
                
                .left
                  img(class="inline w-6 p-1" src='/images/links.svg')
                  .text(class="inline relative" style="top: 2px;")
                    span(class="text-subhead pl-2 font-semi-bold") Child objectives
                    //- a(class="text-blue-700 cursor-pointer hover:bg-neutral-300 ml-2" @click="addNewTaskFromObjectiveModal()") + Add task
                .right
                  .text(class="flex")
                    .progressPercentage(class="inline pl-2")
                      span(v-if="selectedObjective.childObjectives && selectedObjective.childObjectives.length" class="text-title font-bold text-neutral-800") {{selectedObjective.childObjectives.length}} 
                        span okr
                        span(v-if="selectedObjective.childObjectives && selectedObjective.childObjectives.length > 1") s
              
              .childObjectiveList.mb-3
                div(v-if="selectedObjective && selectedObjective.childObjectives && selectedObjective.childObjectives.length == 0") 
                  span(class="text-minimum-text text-neutral-1200 pl-2 mt-2 block") No objectives aligned under this one.
                table(class="w-full table-fixed" v-if="selectedObjective")
                  thead
                    tr
                      th(class="font-aeries text-subhead text-left w-1/12")
                      th(class="font-aeries text-subhead pl-0 text-left w-9/10")
                      th(class="font-aeries text-subhead pl-0 text-left w-2/10")
                  tbody
                    tr(v-for="(objective, index) in selectedObjective.childObjectives" :class="{'border-b border-neutral-500' : index !== selectedObjective.childObjectives.length - 1}" class="hover:bg-neutral-400")
                      td(class="py-5 align-top text-left")
                        .avatar(v-for="owner in getSlackUserByID(objective.owner, true)" v-if="owner && owner.profile" @click="selectElement($event, objective); updateModalState('taskView', true)" class="cursor-pointer")
                          img(:src="owner.profile.image_192" :title="owner.real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2")
                      td(class="py-4 text-left pr-8") 
                        div.flex
                          .title(class="font-semi-bold text-subhead text-blue-600 pb-4 cursor-pointer" @click="selectElement($event, objective); updateModalState('objectiveView', true)") {{objective.title}}
                      td(class="p-4 text-left cursor-pointer text-minimum-text" @click="selectElement($event, objective); updateModalState('objectiveView', true)")
                        div
                          img(class="inline w-4 pr-1" v-if="objective.key_results && objective.key_results.length > 0" src='/images/metric.svg')
                          span(class="text-minimum-text pb-2" v-if="objective.key_results && objective.key_results.length > 0") {{objective.key_results.length}} 
                            span key result
                            span(v-if="objective.key_results.length > 1") s

                        div
                          img(class="inline w-4 pr-1" v-if="objective.tasks && objective.tasks.length > 0" src='/images/task.svg')
                          span(class="text-minimum-text pb-2" v-if="objective.tasks && objective.tasks.length > 0") {{objective.tasks.length}} task
                            span(v-if="objective.tasks.length > 1") s
                        div
                          img(class="inline w-4 pr-1" v-if="objective.childObjectives && objective.childObjectives.length > 0" src='/images/links.svg')
                          span(class="text-minimum-text pb-2" v-if="objective.tasks && objective.childObjectives.length > 0") {{objective.childObjectives.length}} 
                            span(v-if="objective.childObjectives.length == 1") child
                            span(v-if="objective.childObjectives.length > 1") children


            //- .children.mb-12(v-if="selectedObjective.childObjectives")
            //-   .header(class="justify-between border-b-2 border-neutral-400")
            //-     .left
            //-       img(class="inline w-6 p-1" src='/images/links.svg')
            //-       .text(class="inline relative" style="top: 2px;")
            //-         span(class="text-subhead pl-2 font-semi-bold") Child objectives
            //-         //- a(class="text-blue-700 cursor-pointer hover:bg-neutral-300 ml-2") + Link objective
            //-         //- TODO: Implement objective linking from the objective view
            //-         .childObjectives(v-if="selectedObjective.childObjectives.length")
            //-           .childObjective(v-for="objective in selectedObjective.childObjectives")
            //-             .title(v-if="objective.title" class="font-semi-bold text-blue-600 pb-4 cursor-pointer flex" @click="selectObjective(objective)") 
            //-               img(class="inline" src='/images/goal.svg')
            //-               .okr-title(class="inline")
            //-                 span {{objective.title}}
            //-     .right
                  .text(class="inline")

            .comments.mb-6

          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" v-if="selectedObjective && selectedObjective.deleted !== true" @click="updateOKR()") Update OKR
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="closeViewObjective()") Cancel

      //- Adding key results
      .keyResultAdd.modalView(v-show="modal.type == 'keyResultAdd'")

        h1(class="font-aeries font-bold text-title") Create key result

        .keyResultAdd(class="py-5")
          input(v-model.lazy="modalKeyResultObject.title" type="text" class="font-aeries font-bold text-subhead w-full bg-neutral-400 p-3 rounded-sm" placeholder="Write your key result")
          .propertyRows
            
            .addingToObjective(class="block mt-4")
              .text-container.inline-block.w-48
                span(class="font-bold inline-block") Adding to
              .title(v-if="fetchDataElementByID('objective', modalKeyResultObject.linked_to_objective_id)" @click="fetchDataElementByID('objective', modalKeyResultObject.linked_to_objective_id)" class="font-semi-bold text-blue-600 pb-4 cursor-pointer mt-2 flex") 
                .icon
                  img(class="inline w-6" src='/images/goal.svg')
                .okr-title
                  span(class="pl-2 relative" style="top: 2px;") {{fetchDataElementByID('objective', modalKeyResultObject.linked_to_objective_id).title}}

            .keyResultType(class="py-4 block")
              .text-container.inline-block.w-48
                span(class="font-bold inline-block") Key result type
              select(v-model="modalKeyResultObject.kr_type" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1")
                option(value="should_increase_to") Should increase to
                option(value="should_decrease_to") Should decrease to
                option(value="should_stay_above") Should stay above
                option(value="should_stay_below") Should stay below
                option(value="achieved_or_not") Achieved or not (0% / 100%)

            .keyResultUnit(class="py-4 block" v-if="modalKeyResultObject.kr_type !== 'achieved_or_not'")
              .text-container.inline-block.w-48
                span(class="font-bold inline-block") Unit
              select(v-model.lazy="modalKeyResultObject.unit" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1")
                option(value="no_formatting") No formatting
                option(value="$") $
                option(value="%") %

            .keyResultTargetNumber.propertyRow(class="py-4 block" v-if="modalKeyResultObject.kr_type !== 'achieved_or_not'")
              .text-container.inline-block.w-48
                span.required(class="text-blue-700 text-subhead") * 
                span(class="font-bold inline-block") Target number
              input(v-model.lazy="modalKeyResultObject.target_number" type="number" placeholder="Insert target number" class="bg-neutral-400 p-1 rounded-sm")

            .keyResultInitialNumber.propertyRow(class="py-4 block" v-if="modalKeyResultObject.kr_type !== 'achieved_or_not'")
              .text-container.inline-block.w-48
                span.required(class="text-blue-700 text-subhead") * 
                span(class="font-bold inline-block") Initial number
              input(v-model.lazy="modalKeyResultObject.initial_number" type="number" placeholder="Insert initial number" class="bg-neutral-400 p-1 rounded-sm")

            hr(class="border-neutral-500")

            .owner.propertyRow(class="py-4 block")
              .text-container.inline-block.w-48
                span.required(class="text-blue-700 text-subhead") * 
                span(class="font-bold inline-block") Owner
              input(v-show="!modalKeyResultObject.owner && !modalKeyResultObject.selected_owner" type="text" placeholder="Select a team member" id="keyResultAddOwnerSearch" class="bg-neutral-400 p-1 rounded-sm userSearch")
              .avatar(v-if="modalKeyResultObject.selected_owner && getSlackUserByID(modalKeyResultObject.selected_owner.value)" @click="clearAddKeyResultOwner()" class="cursor-pointer inline hover:bg-neutral-500 px-2 py-3")
                img(:src="getSlackUserByID(modalKeyResultObject.selected_owner.value).profile.image_192" :title="getSlackUserByID(modalKeyResultObject.selected_owner.value).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
                span.font-bold {{getSlackUserByID(modalKeyResultObject.selected_owner.value).real_name}}
              a(@click="clearAddKeyResultOwner()" class="text-blue-600 float-right pt-1 cursor-pointer") Change

            .deadline.propertyRow(class="py-4 block")
              
              .text-container(class="inline-block w-48 align-top")
                span(class="font-bold") Deadline

              .text-container.inline-block.w-48
                select(v-model="modalKeyResultObject.deadline_type" class="border-b border-neutral-600 font-bold text-neutral-1400 py-1 text-minimum-text")
                  option(value="none") No specific deadline
                  option(value="flexible") Flexible deadline, can change
                  option(value="hard") Hard deadline, cannot change

                input(v-show="modalKeyResultObject.deadline_type !== 'none'" v-model="modalKeyResultObject.deadline" type="date" class="p-1 border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 mt-4")

          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="createKeyResult()") Create key result
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="closeKeyResultAdd();") Cancel

      //- Providing an update on a key result
      .keyResultUpdate.modalView(v-show="modal.type == 'keyResultUpdate'")
        //- The top row of the modal, e.g. the close button.
        div(class="float-right text-right w-full mb-8")
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="closeKeyResultUpdate()")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        h1(class="font-aeries font-bold text-title w-full rounded-sm py-4") Update this key result:
        .updateKeyResultsHeader
          .keyResultLabels(class="border-l-4 border-neutral-600 pl-4 ml-4")
            h2(class="text-neutral-1600 text-subhead w-full rounded-sm font-bold italic") {{selectedKeyResult.title}}
            p(class="text-neutral-800") Should 
              span(v-if="selectedKeyResult.kr_type == 'should_increase_to'") increase to 
              span(v-if="selectedKeyResult.kr_type == 'should_decrease_to'") decrease to 
              span(v-if="selectedKeyResult.kr_type == 'should_stay_above'") stay above 
              span(v-if="selectedKeyResult.kr_type == 'should_stay_below'") stay below 
              span(v-if="selectedKeyResult.kr_type == 'achieved_or_not'") increase to 100% 
              span(v-if="selectedKeyResult.kr_type !== 'achieved_or_not'") {{selectedKeyResult.target_number}}

            div(v-if="selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length" class="flex")
              div(class="mr-8 text-neutral-1400")
                h2(class="font-aeries font-bold text-subhead w-full rounded-sm pt-4") Current value
                span(v-if="selectedKeyResult && selectedKeyResult.keyResultUpdates.length >= 1 && selectedKeyResult.keyResultUpdates[0].new_number") {{selectedKeyResult.keyResultUpdates[0].new_number}}
                span(v-else class="font-aeries font-bold text-title") {{selectedKeyResult.initial_number}}
          
          h2(class="font-aeries font-bold text-subhead w-full rounded-sm py-4 mt-4") What is the new value?
          
          //- If this KR has status updates, find the latest value from them.
          select(v-if="selectedKeyResult.kr_type == 'achieved_or_not'" v-model="modalKeyResultUpdateObject.new_number" :class="{'selected' : selectedKeyResult.kr_type == 'achieved_or_not'}" class="selectedKeyResultUpdateNewNumber font-aeries font-bold text-title w-full bg-neutral-400 p-2 px-4 rounded-sm")
            option(value="0") 0% (Incomplete)
            option(value="100") 100% (Complete)
          
          input(v-if="selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length >= 1 && selectedKeyResult.kr_type !== 'achieved_or_not'" type="number" :class="{'selected' : selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length >= 1 && selectedKeyResult.kr_type !== 'achieved_or_not'}" class="selectedKeyResultUpdateNewNumber font-aeries font-bold text-title w-full bg-neutral-400 p-2 px-4 rounded-sm" placeholder='Enter a new value...')

          //-Otherwise, supply the KR's initial value because there are no status updates for it.
          input(v-else-if="selectedKeyResult.kr_type !== 'achieved_or_not'" type="number" class="selectedKeyResultUpdateNewNumber selected font-aeries font-bold text-title w-full bg-neutral-400 p-2 px-4 rounded-sm")

          h2(class="font-aeries font-bold text-subhead w-full rounded-sm pt-4 mt-4") Give your colleagues a quick rundown of what changed
          textarea(type="text" v-model.lazy="modalKeyResultUpdateObject.description" class="font-aeries font-bold w-full bg-neutral-400 p-2 px-4 rounded-sm mt-2" placeholder="Give a status update here...")

          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="submitKeyResultUpdate();") Update
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="closeKeyResultUpdate()") Cancel

      //- Viewing key results
      .keyResultView.modalView(v-show="modal.type == 'keyResultView'")
        //- The top row of the modal, e.g. the close button.
        div(class="float-right text-right w-full mb-8")
          a(id="keyResultViewDropdownMenu" class="keyResultViewDropdownMenu font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="keyResultViewDropdown.show = true; keyResultViewDropdown.keyResultID = selectedKeyResult._id;")
            img(src="/images/three-squares.svg" class="keyResultViewDropdownMenu w-5 pb-2 opacity-25 inline")
          .keyResultViewContextDropdown(v-show="keyResultViewDropdown.show" class="absolute text-body text-blue-600 text-left bg-white shadow-lg w-48" style="right: 0;" @click="keyResultViewDropdown.show = true; keyResultViewDropdown.keyResultID = selectedKeyResult._id;")
            //- div(class="hover:bg-neutral-400 p-3 font-bold" @click="selectKeyResultGiveAnUpdate()") Give an update
            //- div(class="hover:bg-neutral-400 p-3 font-bold" @click="viewKeyResult()") View KR details
            //- hr(class="border-neutral-400")
            div(class="hover:bg-neutral-400 p-3 font-bold border-b border-neutral-700 cursor-pointer" @click="selectKeyResultGiveAnUpdate(selectedKeyResult._id)") Give an update
            //- div(class="hover:bg-neutral-400 p-3 font-bold border-b border-neutral-700 cursor-pointer" @click="editKeyResult(selectedKeyResult)") Edit key result
            div(class="hover:bg-neutral-400 p-3 font-bold text-red-600 cursor-pointer" @click="deleteKeyResult(selectedKeyResult)") Delete key result
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="closeKeyResultView()")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        .deletedAlert(v-if="selectedKeyResult && selectedKeyResult.deleted")
          h1(class="text-display font-bold font-aeries") NOTE: This has been deleted. It cannot be updated unless restored.
          hr(class="border-neutral-700 my-2")

        h1(class="font-aeries font-bold text-title w-full rounded-sm pt-4") {{selectedKeyResult.title}}
        .updateKeyResultsHeader
          h2(class="text-neutral-800 text-subhead") Should 
            span(v-if="selectedKeyResult.kr_type == 'should_increase_to'") increase to 
            span(v-if="selectedKeyResult.kr_type == 'should_decrease_to'") decrease to 
            span(v-if="selectedKeyResult.kr_type == 'should_stay_above'") stay above 
            span(v-if="selectedKeyResult.kr_type == 'should_stay_below'") stay below 
            span(v-if="selectedKeyResult.kr_type == 'achieved_or_not'") increase to 100% 
            span(v-if="selectedKeyResult.kr_type !== 'achieved_or_not'") {{selectedKeyResult.target_number}}, currently 
              span(v-if="selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length") {{selectedKeyResult.keyResultUpdates[0].new_number}}
              span(v-else) {{selectedKeyResult.initial_number}}

          
          .w-full(class="flex")
      
            div(class="w-1/2")
              .propertyRows

                .krOwner.my-4
                  span.text-minimum-text.font-bold Owner
                  p(v-if="!selectedKeyResult.owner") -
                  .owner(class="text-neutral-1000") 
                    .avatar(v-for="owner in getSlackUserByID(selectedKeyResult.owner, true)" :title="owner.real_name" v-if="owner && owner.profile")
                      img(:src="owner.profile.image_192" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2")
                      span(class="text-neutral-1900 pl-1 relative" style="top: 1px;") {{owner.real_name}}

                .linkedKRObjective.my-4
                  span.text-minimum-text.font-bold Linked to objective
                  .title(v-if="fetchDataElementByID('objective', selectedKeyResult.linked_to_objective_id)" @click="selectElement($event, fetchDataElementByID('objective', selectedKeyResult.linked_to_objective_id))" class="font-semi-bold text-subhead text-blue-600 pb-4 cursor-pointer flex") 
                    .icon
                      img(class="inline w-6" src='/images/goal.svg')
                    .okr-title
                      span(class="pl-2 relative" style="top: 2px;") {{fetchDataElementByID('objective', selectedKeyResult.linked_to_objective_id).title}}

                .description.my-4
                  span.text-minimum-text.font-bold Description
                  p(v-if="!selectedKeyResult.description") -
                  p(v-else) {{selectedKeyResult.description}}
                  
            div(class="w-1/2")
              
              .chartContainer
                canvas(id="krUpdateChart" width="400" height="360")
              hr(class="border-neutral-500 my-6")

              .latestUpdateContent(v-if="selectedKeyResult && selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length")
                h2(class="font-aeries font-bold text-title w-full rounded-sm" v-if="selectedKeyResult && selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length") {{selectedKeyResult.keyResultUpdates.length}} update
                  span(v-if="selectedKeyResult.keyResultUpdates && (selectedKeyResult.keyResultUpdates.length > 1 || selectedKeyResult.keyResultUpdates.length == 0)") s
                p(v-if="selectedKeyResult && selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length"  class="text-neutral-1200 text-minimum-text italic pb-4") over the course of {{getSelectedKeyResultUpdatesTimeframe()}} from first update to latest

                .latestUpdate(v-if="!showAllKeyResultUpdates && selectedKeyResult && selectedKeyResult.keyResultUpdates.length && owner && owner.profile" v-for="owner in getSlackUserByID(selectedKeyResult.keyResultUpdates[0].created_by, true)")
                  .latestUpdateContainer(class="w-full shadow rounded border border-neutral-700") 
                    .latestUpdateDate
                      p(class="p-2")
                        img(:src="owner.profile.image_192" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2 mr-1")
                        span(class="text-minimum-text text-neutral-1100") {{new Date(selectedKeyResult.keyResultUpdates[0].update_created_on).toLocaleString('en-US')}}
                    
                    hr(class="border-neutral-500")

                    h2(v-if="selectedKeyResult && selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates[0] && selectedKeyResult.keyResultUpdates[0].new_number" class="p-2") {{owner.real_name}} updated the value to {{selectedKeyResult.keyResultUpdates[0].new_number}}

                    hr(class="border-neutral-500")

                    .quotation(class="p-2" v-if="selectedKeyResult && selectedKeyResult.keyResultUpdates.length && selectedKeyResult.keyResultUpdates[0]")
                      .quotation-mark(class="inline" v-if="selectedKeyResult.keyResultUpdates[0].description")
                        img(class="w-5 inline opacity-25" src="/images/quote.svg")
                      h2(v-if="selectedKeyResult.keyResultUpdates[0].description" class="text-neutral-1200 ml-2 inline") {{selectedKeyResult.keyResultUpdates[0].description}}
                      h2(v-else class="italic text-neutral-800 text-minimum-text") No comment provided with update.

                  a(class="text-blue-600 cursor-pointer text-minimum-text mt-4" v-if="!showAllKeyResultUpdates && selectedKeyResult && selectedKeyResult.keyResultUpdates && selectedKeyResult.keyResultUpdates.length" @click="showAllKeyResultUpdates = true;") 
                    span(v-if="selectedKeyResult.keyResultUpdates.length > 1") Show {{selectedKeyResult.keyResultUpdates.length}} updates

              .allUpdates(v-if="selectedKeyResult && showAllKeyResultUpdates && update" v-for="update in selectedKeyResult.keyResultUpdates")
                .update(v-for="owner in getSlackUserByID(update.created_by, true)" v-if="owner && owner.profile" class="mt-4")
                  .updateContainer(class="w-full shadow rounded border border-neutral-700") 
                    .latestUpdateDate(class="p-2")
                      img(:src="owner.profile.image_192" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2 mr-1")
                      span(class="text-minimum-text text-neutral-1100") {{new Date(update.update_created_on)}}
                    
                    hr(class="border-neutral-500")
                    
                    h2(v-if="update.new_number" class="p-2") {{owner.real_name}} updated the value to {{update.new_number}}

                    hr(class="border-neutral-500")

                    .quotation(class="p-2")
                      .quotation-mark(class="inline" v-if="update.description")
                        img(class="w-5 opacity-25 inline" src="/images/quote.svg")
                      h2(v-if="update.description" class="text-neutral-1200 ml-2 inline") {{update.description}}
                      h2(v-else class="italic text-neutral-800 text-minimum-text") No comment provided with update.

              a(class="text-blue-600 cursor-pointer text-minimum-text mt-4" v-if="showAllKeyResultUpdates" @click="showAllKeyResultUpdates = false;") Collapse updates

          .buttons(class="mt-12 text-right")
            //- button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="selectKeyResult(selectedKeyResult); deleteQueryStringParameter('action'); deleteQueryStringParameter('taskID')") Edit key result
            button(class="rounded border-2 border-neutral-500 text-neutral-1500 py-4 px-8 font-bold" @click="closeKeyResultView()") Close


      //- Adding tasks
      .taskAdd.modalView(v-show="modal.type == 'taskAdd'")
        div(class="float-right text-right w-full mb-8")
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="updateModalState('', false); revertCreateNewTask(); deleteQueryStringParameter('action'); deleteQueryStringParameter('taskID')")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        .propertyRows
          .icon
            img(class="w-10 mb-4" src='/images/task.svg')
          input(id="taskAddInput" v-model.lazy="modalTaskObject.title" type="text" class="font-aeries font-bold text-title w-full bg-neutral-400 p-1 rounded-sm" placeholder="Enter a task name")
          
          .owner.propertyRow(class="border-b border-neutral-500 py-4 block" v-show="!viewingDesignRequestPage")
            .text-container.inline-block(class="w-1/4")
              span(class="font-bold inline-block") Owner
            input(v-show="!modalTaskObject.selected_owner" type="text" placeholder="Select a team member" class="bg-neutral-400 p-1 rounded-sm userSearch" id="taskOwnerSearch")
            .avatar(v-if="modalTaskObject.selected_owner && getSlackUserByID(modalTaskObject.selected_owner.value)" @click="clearAddTaskOwner()" class="cursor-pointer inline hover:bg-neutral-500 px-2 py-3")
              img(:src="getSlackUserByID(modalTaskObject.selected_owner.value).profile.image_192" :title="getSlackUserByID(modalTaskObject.selected_owner.value).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
              span.font-bold {{getSlackUserByID(modalTaskObject.selected_owner.value).real_name}}
            a(@click="clearAddTaskOwner()" class="text-blue-600 float-right pt-1 cursor-pointer") Change

          .status.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block(class="w-1/4")
              span(class="font-bold inline-block") Status
            select(v-model.lazy="modalTaskObject.status" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")
              option To-do
              option In progress
              option Done
            div(class="float-right")
              input(type="date" v-model.lazy="modalTaskObject.due_date" class="p-1 border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")

          .linkedTo.propertyRow(class="border-b border-neutral-500 py-4 block" v-show="!viewingDesignRequestPage")
            .flex
              .flex.flex-col.text-container.inline-block(class="w-1/4")
                span(class="font-bold inline-block") Linked to
              .flex.flex-col
                a(@click="showTaskLinkInput = true" v-if="!showTaskLinkInput" class="text-blue-700 cursor-pointer hover:bg-neutral-300") + Add this task to an objective
                input(v-show="showTaskLinkInput && !modalTaskObject.selected_linked_to_objective_id" type="text" placeholder="Select an objective" id="taskObjectiveSearch" class="bg-neutral-400 p-1 rounded-sm objectiveSearch")
                span(@click="clearAddTaskObjective()" class="cursor-pointer inline hover:bg-neutral-300 py-2" v-if="modalTaskObject && modalTaskObject.selected_linked_to_objective_id").font-bold
                  .flex
                    .flex.flex-col
                      img(class="w-8 inline pr-2" src='/images/goal.svg')
                    .flex.flex-col
                      span {{modalTaskObject.selected_linked_to_objective_id.label}}


          .description.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block w-48 mb-4") Description
            textarea(v-model.lazy="modalTaskObject.description" placeholder="Enter description" id="createTaskDescription" class="p-1 border-2 border-neutral-400 text-neutral-1400 rounded-md py-1 w-full bg-neutral-400")
          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="createTask()") 
              span(v-if="!viewingDesignRequestPage") Create task
              span(v-else) Add task to backlog
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="cancelCreateTask()") Cancel

      //- Viewing tasks
      .taskView.modalView(:class="{'selected' : modal.type == 'taskView'}" v-show="modal.type == 'taskView' && activeTask && activeTask.type == 'Aeriesworks Task'")
        //- The top row of the modal, e.g. the close button.
        div(class="float-right text-right w-full mb-8")
          a(id="taskViewDropdownMenu" class="taskViewDropdownMenu font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="taskViewDropdown.show = true; taskViewDropdown.taskID = activeTask._id;")
            img(src="/images/three-squares.svg" class="taskViewDropdownMenu w-5 pb-2 opacity-25 inline")
          .taskViewContextDropdown(v-show="taskViewDropdown.show" class="absolute text-body text-blue-600 text-left bg-white shadow-lg w-48" style="right: 0;" @click="taskViewDropdown.show = true; taskViewDropdown.taskID = activeTask._id;")
            //- div(class="hover:bg-neutral-400 p-3 font-bold" @click="selectKeyResultGiveAnUpdate()") Give an update
            //- div(class="hover:bg-neutral-400 p-3 font-bold" @click="viewKeyResult()") View KR details
            //- hr(class="border-neutral-400")
            div(class="hover:bg-neutral-400 p-3 font-bold text-red-600 cursor-pointer" @click="deleteTask(activeTask)") Delete task
          a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="closeViewTask()")
            img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
        .deletedAlert(v-if="activeTask && activeTask.deleted")
          h1(class="text-display font-bold font-aeries") NOTE: This has been deleted. It cannot be updated unless restored.
          hr(class="border-neutral-700 my-2")
        h1(v-if="activeTask && !showTaskEditInput" @click="showTaskEditInput = true;" class="taskViewTitleInput font-aeries font-bold text-title w-full focus:bg-neutral-400 hover:bg-neutral-400 p-1 rounded-sm flex") {{activeTask.title}}
        input(v-if="activeTask && showTaskEditInput" v-model.lazy="activeTask.title" type="text" id="taskViewTitleInput" class="taskViewTitleInput font-aeries font-bold text-title w-full focus:bg-neutral-400 hover:bg-neutral-400 p-1 rounded-sm" placeholder="Enter a task name")
        .propertyRows
          
          .owner.propertyRow(class="border-b border-neutral-500 py-4 block" v-show="!viewingDesignRequestPage")
            .flex
              .flex.flex-col.text-container.inline-block(class="w-1/4")
                span(class="font-bold inline-block py-3") Owner
              .flex.justify-between.w-full
                .flex.flex-col(v-if="activeTask" class="inline")
                  input(v-show="!activeTask.owner" type="text" placeholder="Select a team member" class="bg-neutral-400 p-1 rounded-sm userSearch" id="taskViewOwnerSearch")
                  .avatar(v-if="getSlackUserByID(activeTask.owner)" @click="clearViewTaskOwner()" class="cursor-pointer inline hover:bg-neutral-500 px-2 py-3")
                    img(:src="getSlackUserByID(activeTask.owner).profile.image_192" :title="getSlackUserByID(activeTask.owner).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
                    span.font-bold {{getSlackUserByID(activeTask.owner).real_name}}
                a.flex(@click="clearViewTaskOwner()" class="text-blue-600 float-right py-3 cursor-pointer") Change owner

          .status.propertyRow(class="border-b border-neutral-500 py-4 block")
            .flex
              .flex.flex-col.text-container.inline-block(class="w-1/4")
                span(class="font-bold inline-block") Status
              .flex.justify-between.w-full
                .flex.flex(class="w-1/4")
                  select(v-if="activeTask" v-model.lazy="activeTask.status" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")
                    option To-do
                    option In progress
                    option Done
                .flex.flex-col(class="w-1/4")
                  input(v-if="activeTask && activeTask.hasOwnProperty('due_date')" type="date" v-model.lazy="activeTask.due_date" class="p-1 border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")

          .linkedTo.propertyRow(class="border-b border-neutral-500 py-4 block" v-show="!viewingDesignRequestPage")
            .flex
              .flex.flex-col.text-container.inline-block(class="w-1/5")
                span(class="font-bold inline-block py-2") Linked to
              .flex.flex-col
                a(@click="showViewTaskLinkInput = true" v-if="activeTask && activeTask.type == 'Aeriesworks Task' && !showViewTaskLinkInput && !activeTask.linked_to_objective_id" class="text-blue-700 cursor-pointer hover:bg-neutral-300 py-2") + Link this task with an objective
                input(v-show="showViewTaskLinkInput && !activeTask.linked_to_objective_id" type="text" placeholder="Select an objective" id="viewTaskObjectiveSearch" class="bg-neutral-400 p-1 rounded-sm objectiveSearch")
                span(@click="clearViewTaskObjective()" class="ml-4 cursor-pointer inline hover:bg-neutral-300 p-2" v-if="activeTask && activeTask.linked_to_objective_id").font-bold 
                  .flex
                    .flex.flex-col
                      img(class="w-6 inline pr-2 pt-1" src='/images/goal.svg')
                    .flex.flex-col(v-if="fetchDataElementByID('objective', activeTask.linked_to_objective_id)")
                      span {{fetchDataElementByID('objective', activeTask.linked_to_objective_id).title}}
                    .flex.flex-col.italic.font-semi-bold(v-else) Objective not found


          .setActiveDesignTask.propertyRow(class="border-b border-neutral-500 py-4 block" v-if="viewingDesignRequestPage")
            .flex
              .flex.flex-col.text-container.inline-block(class="w-1/5")
                span(class="font-bold inline-block py-2") Set task as active
              .flex.flex-col
                .activeTaskLabel(v-if="(selectedTask.activeDesignTask == 'true' && selectedTask.recordCreatedBy == currentUser.id)")
                  span(class="block mt-3 ml-6 text-minimum-text italic") This is your currently-active design task.
                .setActiveTaskButton(v-else)
                  a.button(class="bg-blue-700 text-white font-bold p-2 rounded text-minimum-text shadow-lg ml-4 mt-1 cursor-pointer" @click="setActiveDesignTask()") Make this my active task


          .description.propertyRow(class="border-b border-neutral-500 py-4 block")
            .text-container.inline-block.w-48
              span(class="font-bold inline-block w-48 mb-4") Description
            textarea(v-if="activeTask" v-model.lazy="activeTask.description" placeholder="Enter description" class="p-1 border-2 border-neutral-400 text-neutral-1400 rounded-md py-1 w-full bg-neutral-400")
          .buttons(class="mt-6")
            button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="updateTask(); deleteQueryStringParameter('action'); deleteQueryStringParameter('taskID')") Update task
            button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="closeViewTask()") Cancel


          .editHistory(v-if="activeTask")
            hr(class="border-neutral-500 my-6 block")
            span(class="font-bold inline-block py-2") Edit history
            .edits(v-if="activeTask.editHistory && activeTask.editHistory.length")
              .edit(v-for="edit in activeTask.editHistory" class="text-minimum-text my-2")
                span Task #[b {{edit.edit_type}}d] by 
                .avatar(v-for="owner in getSlackUserByID(edit.recordUpdateBy, true)" v-if="owner" class="inline")
                  img(:src="owner.profile.image_192" :title="owner.real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2 relative" style="bottom: 2px;")
                  span(class="font-bold") {{getSlackUserByID(edit.recordUpdateBy).real_name}}
                span  -
                span(class="text-fine-print text-neutral-1400 pl-1 relative" style="bottom: 1px;") {{new Date(edit.recordUpdatedAt).toLocaleString('en-US')}}
            .createdBy(v-if="activeTask.recordCreatedBy" class="text-minimum-text my-2")
              span Task #[b created] by 
              .avatar(v-for="owner in getSlackUserByID(activeTask.recordCreatedBy, true)" v-if="owner" class="inline")
                img(:src="owner.profile.image_192" :title="owner.real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-6 rounded-full border-white border-2 relative" style="bottom: 2px;")
                span(class="font-bold") {{getSlackUserByID(activeTask.recordCreatedBy).real_name}}
              span  -
              span(class="text-fine-print text-neutral-1400 pl-1 relative" style="bottom: 1px;") {{new Date(activeTask.recordCreatedAt).toLocaleString('en-US')}}

      //- Adding teams
      //- .taskAdd.modalView(v-show="modal.type == 'teamAdd'")
      //-   div(class="float-right text-right w-full mb-8")
      //-     a(class="closeModalButton font-bold text-neutral-600 hover:bg-neutral-400 text-title px-4 py-2 rounded cursor-pointer" @click="updateModalState('', false); revertCreateNewTeam(); deleteQueryStringParameter('action');")
      //-       img(src="/images/close.svg" class="w-5 pb-2 opacity-25 inline")
      //-   .propertyRows
      //-     .icon
      //-       img(class="w-10 mb-4" src='/images/task.svg')
      //-     input(id="taskAddInput" v-model.lazy="modalTaskObject.title" type="text" class="font-aeries font-bold text-title w-full bg-neutral-400 p-1 rounded-sm" placeholder="Enter a task name")
      //-     .owner.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .text-container.inline-block(class="w-1/4")
      //-         span(class="font-bold inline-block") Owner
      //-       input(v-show="!modalTaskObject.selected_owner" type="text" placeholder="Select a team member" class="bg-neutral-400 p-1 rounded-sm userSearch" id="taskOwnerSearch")
      //-       .avatar(v-if="modalTaskObject.selected_owner && getSlackUserByID(modalTaskObject.selected_owner.value)" @click="clearAddTaskOwner()" class="cursor-pointer inline hover:bg-neutral-500 px-2 py-3")
      //-         img(:src="getSlackUserByID(modalTaskObject.selected_owner.value).profile.image_192" :title="getSlackUserByID(modalTaskObject.selected_owner.value).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
      //-         span.font-bold {{getSlackUserByID(modalTaskObject.selected_owner.value).real_name}}
      //-       a(@click="clearAddTaskOwner()" class="text-blue-600 float-right pt-1 cursor-pointer") Change

      //-     .status.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .text-container.inline-block(class="w-1/4")
      //-         span(class="font-bold inline-block") Status
      //-       select(v-model.lazy="modalTaskObject.status" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")
      //-         option To-do
      //-         option In progress
      //-         option Done
      //-       div(class="float-right")
      //-         input(type="date" v-model.lazy="modalTaskObject.due_date" class="p-1 border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")

      //-     .linkedTo.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .flex
      //-         .flex.flex-col.text-container.inline-block(class="w-1/4")
      //-           span(class="font-bold inline-block") Linked to
      //-         .flex.flex-col
      //-           a(@click="showTaskLinkInput = true" v-if="!showTaskLinkInput" class="text-blue-700 cursor-pointer hover:bg-neutral-300") + Add this task to an objective
      //-           input(v-show="showTaskLinkInput && !modalTaskObject.selected_linked_to_objective_id" type="text" placeholder="Select an objective" id="taskObjectiveSearch" class="bg-neutral-400 p-1 rounded-sm objectiveSearch")
      //-           span(@click="clearAddTaskObjective()" class="cursor-pointer inline hover:bg-neutral-300 py-2" v-if="modalTaskObject && modalTaskObject.selected_linked_to_objective_id").font-bold
      //-             .flex
      //-               .flex.flex-col
      //-                 img(class="w-8 inline pr-2" src='/images/goal.svg')
      //-               .flex.flex-col
      //-                 span {{modalTaskObject.selected_linked_to_objective_id.label}}


      //-     .description.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .text-container.inline-block.w-48
      //-         span(class="font-bold inline-block w-48 mb-4") Description
      //-       textarea(v-model.lazy="modalTaskObject.description" placeholder="Enter description" id="createTaskDescription" class="p-1 border-2 border-neutral-400 text-neutral-1400 rounded-md py-1 w-full bg-neutral-400")
      //-     .buttons(class="mt-6")
      //-       button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="createTask()") Create task
      //-       button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="cancelCreateTask()") Cancel



      //- //- Viewing users
      //- .taskView(v-show="modal.type == 'userView' && selectedUser")
      //-   input(v-if="activeTask" v-model.lazy="activeTask.title" type="text" class="font-aeries font-bold text-title w-full bg-neutral-400 p-1 rounded-sm" placeholder="Enter a task name")
      //-   .propertyRows
          
      //-     .owner.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .text-container.inline-block.w-48
      //-         span(class="font-bold inline-block") Owner
      //-       div(v-if="activeTask" class="inline")
      //-         input(v-show="!activeTask.owner" type="text" placeholder="Select a team member" class="bg-neutral-400 p-1 rounded-sm userSearch" id="taskViewOwnerSearch")
      //-         .avatar(v-if="getSlackUserByID(activeTask.owner)" @click="clearViewTaskOwner()" class="cursor-pointer inline hover:bg-neutral-500 px-2 py-3")
      //-           img(:src="getSlackUserByID(activeTask.owner).profile.image_192" :title="getSlackUserByID(activeTask.owner).real_name" class="participant-image inline xs:w-4 sm:w-5 md:w-6 lg:w-8 rounded-full border-white border-2")
      //-           span.font-bold {{getSlackUserByID(activeTask.owner).real_name}}
      //-         a(@click="clearViewTaskOwner()" class="text-blue-600 float-right pt-1 cursor-pointer") Change

      //-     .status.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .text-container.inline-block.w-48
      //-         span(class="font-bold inline-block") Status
      //-       select(v-if="activeTask" v-model.lazy="activeTask.status" class="border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")
      //-         option To-do
      //-         option In progress
      //-         option Done
      //-       div(class="float-right")
      //-         input(v-if="activeTask && activeTask.hasOwnProperty('due_date')" type="date" v-model.lazy="activeTask.due_date" class="p-1 border-2 font-bold border-neutral-600 text-neutral-1400 rounded-md py-1 text-minimum-text")

      //-     .linkedTo.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .text-container.inline-block.w-48
      //-         span(class="font-bold inline-block") Linked to
      //-       a(@click="showViewTaskLinkInput = true" v-if="activeTask && activeTask.type == 'Aeriesworks Task' && !showViewTaskLinkInput && !activeTask.linked_to_objective_id" class="text-blue-700 cursor-pointer hover:bg-neutral-300") + Link this task with an objective
      //-       input(v-show="showViewTaskLinkInput && !activeTask.linked_to_objective_id" type="text" placeholder="Select an objective" id="viewTaskObjectiveSearch" class="bg-neutral-400 p-1 rounded-sm objectiveSearch")
      //-       span(@click="clearViewTaskObjective()" class="cursor-pointer inline hover:bg-neutral-300 py-3" v-if="activeTask && activeTask.linked_to_objective_id").font-bold {{fetchDataElementByID('objective', activeTask.linked_to_objective_id).title}}


      //-     .description.propertyRow(class="border-b border-neutral-500 py-4 block")
      //-       .text-container.inline-block.w-48
      //-         span(class="font-bold inline-block w-48 mb-4") Description
      //-       textarea(v-if="activeTask" v-model.lazy="activeTask.description" placeholder="Enter description" class="p-1 border-2 border-neutral-400 text-neutral-1400 rounded-md py-1 w-full bg-neutral-400")
      //-     .buttons(class="mt-6")
      //-       button(class="rounded bg-blue-700 border-blue-700 border-2 text-white py-4 px-8 mr-4" @click="updateTask()") Update task
      //-       button(class="rounded border-2 border-neutral-500 text-blue-700 py-4 px-8 font-bold" @click="revertSelectedTask(); updateModalState('', false)") Cancel


  .modalOverlay(v-show="modal.show")
</template>

<script>
const axios = require('axios');

const moment = require('moment');
const Chart = require('chart.js');
const chartAnnotation = require('chartjs-plugin-annotation');
const chartTrendline = require('chartjs-plugin-trendline');


//Used to clear the inputs by replacing the reactive v-model data for modalTaskObject
//e.g. after creating a new task or closing the modal.
const modalTaskObjectModel = {
  "archived": false,
  "attachments" : [],
  "deleted" : false,
  "description": "",
  "due_date" : "",
  "selected_linked_to_objective_id" : "",
  "linked_to_objective_id": "",
  "owner" : "",
  "selected_owner" : "",
  "status" : "To-do",
  "title": "",
  "type": "Aeriesworks Task"
}

const modalObjectiveObjectModel = {
  "type" : "objective",
  "title" : "",
  "owner" : "",
  "tags" : [],
  "description" : "",
  "aligned_to_objective_id" : "",
  "selected_aligned_to_objective_id" : "",
  "objective_type" : "aspirational",
  "selected_owner" : "",
  "session_id" : ""
}

const modalKeyResultObjectModel = {
    "type": "key_result",
    "title": "",
    "kr_type": "should_increase_to", //should_increase_to, should_decrease_to, should_stay_below, should_stay_above, achieved_or_not
    "unit": "no_formatting",
    "target_number": "",
    "initial_number": "", //if quantitative KR
    "description": "",
    "owner": "",
    "selected_owner" : "",
    "deadline_type": "none", //flexible or hard
    "deadline": "", // timestamp
    "linked_to_objective_id": "",
    "selected_linked_to_objective_id": "" // placeholder for the UI - doesn't get sent to the server
}

const modalKeyResultUpdateObjectModel = {
    "update_created_on": "",
    "type": "key_result_update",
    "kr_id" : "", 
    "description": "",
    "original_number" : "0",
    "new_number" : "",
    "created_by" : "",
}

const modalSessionObjectModel = {
  "type": "session",
  "description": "",
  "startDate" : "",
  "endDate" : "",
  "color" : "Select a color",
  "title": "",
  "selected_owner": "",
  "parent_session": "",
  "selected_parent_session" : "",
  "session_id": "",
  "status" : "Open",
  "cadence" : "Weekly",
}

const modalTeamObjectModel = {
    "name": "",
    "description": "",
    "parent_team_id": "",
    "avatar_image": ""
}

module.exports = {
  props: [
    'modal', 
    'okrs',
    'teams',
    'selectedElement', 
    'editSessionID', 
    'selectedObjective', 
    'lastSelectedObjective', 
    'selectedTask', 
    'lastSelectedTask', 
    'selectedKeyResult', 
    'selectedKeyResultUpdates', 
    'selectedUser', 
    'currentUser',
    'autoCompleteSlackUsers',
    'mySlackObject',
    'myActiveDesignTasks'],
  data() {
    return {
        modalTaskObject: Object.assign({}, modalTaskObjectModel),
        modalObjectiveObject : Object.assign({},modalObjectiveObjectModel),
        modalKeyResultObject: Object.assign({},modalKeyResultObjectModel),
        modalKeyResultUpdateObject: Object.assign({},modalKeyResultUpdateObjectModel), 
        modalSessionObject: Object.assign({},modalSessionObjectModel),
        showAlignmentInput: false,
        showObjectiveSessionInput: false,
        showTaskLinkInput: false,
        showViewTaskLinkInput: false,
        showAllKeyResultUpdates: false,
        showCreateSessionShowParentSessionInput: false,
        showViewObjectiveShowParentSessionInput: false,
        showObjectiveDescriptionInput: false,
        showTaskEditInput: false,
        showObjectiveEditInput: false,
        createTaskSetActiveDesignTask: false,
        backToObjectiveRef: {},
        currentUserSlackID : "",
        localAutoCompleteSlackUsers: [],
        taskViewDropdown: {
          show: false,
          taskID: "",
        },
        keyResultViewDropdown: {
          show: false,
          keyResultID: "",
        },
        objectiveViewDropdown: {
          show: false,
          objectiveID: "",
        },
    }
  },
methods : {
  getSelectedKeyResultUpdatesTimeframe() {
    var krUpdates = this.selectedKeyResult.keyResultUpdates;
    if (this.selectedKeyResult && this.selectedKeyResult.keyResultUpdates.length) {
      var firstEntryTimestamp = krUpdates[krUpdates.length - 1].update_created_on / 1000;
      var lastEntryTimestamp = krUpdates[0].update_created_on / 1000;
      var difference = lastEntryTimestamp - firstEntryTimestamp;
      var seconds = difference;

      var numyears = function() {
          if (Math.floor(seconds / 31536000) !== 0) {
            return Math.floor(seconds / 31536000) + " years, "
          } else {
            return "";
          }
        }
      var numdays = function() {
          if (Math.floor((seconds % 31536000) / 86400) !== 0) {
            return Math.floor((seconds % 31536000) / 86400) + " days, "
          } else {
            return "";
          }
        }
      var numhours = function() {
          if (Math.floor(((seconds % 31536000) % 86400) / 3600) !== 0) {
            return Math.floor(((seconds % 31536000) % 86400) / 3600) + " hours, "
          } else {
            return "";
          }
        }
      var numminutes = function() {
          if (Math.floor((((seconds % 31536000) % 86400) % 3600) / 60) !== 0) {
            return Math.floor((((seconds % 31536000) % 86400) % 3600) / 60) + " minutes"
          } else {
            return "";
          }
        }
      
      // console.log(seconds, numyears(), numdays(), numhours(), numminutes())

      return numyears() + numdays() + numhours() + numminutes();
    } else {
      return false;
    }
  },
  deleteQueryStringParameter(name) {
    window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}`));
  },
  getSessionByID(id) {
    for (var i = 0; i < this.okrs.sessions.length; i++) {
      if (this.okrs.sessions[i]._id == id) {
        return this.okrs.sessions[i];
      }
    }
  },
  keyResultPercentComplete(kr) {
    var new_number = 0;
    var target_number = 0;

    if (kr.keyResultUpdates && kr.keyResultUpdates.length &&  kr.keyResultUpdates[0].new_number) {
      new_number = kr.keyResultUpdates[0].new_number
    } else {
      new_number = kr.initial_number;
    }

    if (kr.target_number == "") {
      target_number = 100
    } else {
      target_number = kr.target_number;
    }

    if (kr.kr_type == 'should_increase_to' || kr.kr_type == 'achieved_or_not' || kr.kr_type == 'should_stay_above') {
      return Math.floor((new_number * 100) / target_number);
    } else if (kr.kr_type == 'should_decrease_to' || kr.kr_type == 'should_stay_below') {
      return Math.floor((target_number * 100) / new_number);
    }


  },
  keyResultPercentCompleteCooked(kr) {
    if (this.keyResultPercentComplete(kr) > 100) {
      return 100;
    } else {
      return this.keyResultPercentComplete(kr);
    }
  },
  selectKeyResultGiveAnUpdate(keyResultID) {
    // console.log(keyResultID)
    if (this.selectedObjective) {
      this.backToObjectiveRef = this.selectedObjective;
    }
    this.$emit('selectKeyResultGiveAnUpdate', keyResultID);
  },
  closeTaskViewDropdown() {
    this.taskViewDropdown.show = false;
  },
  getObjectiveByID(id) {
    for (var i = 0; i < this.okrs.objectives.length; i++) {
      if (this.okrs.objectives[i]._id == id) {
        return this.okrs.objectives[i];
      }
    }
  },
  fetchDataElementByID(type, id) {

  //Utility function for getting objectivs, KRs, sessions, or tasks by ID.

  var listRef = [];
  if (type == "objective") {
    listRef = this.okrs.objectives;
  } else if (type == "key_result") {
    listRef = this.okrs.key_results;
  } else if (type == "session") {
    listRef = this.okrs.sessions;
  } else if (type == "task") {
    listRef = this.okrs.tasks;
  } else if (type == "team") {
    listRef = this.teams;
  }
  for (var i = 0; i < listRef.length; i++) {
    if (listRef[i]._id == id) {
      return listRef[i]
    }
  }
},
addNewKeyResultFromObjectiveModal() {
  this.updateModalState('keyResultAdd', true);
  this.setQueryStringParameter('action', 'addKeyResult');

  //Make sure the selected objective shows when we open the "add key results" modal.
  this.setKRModalObjective(this.selectedObjective)
  
  //Make sure when we close the window it sends us back to the objective
  this.backToObjectiveRef = this.selectedObjective;
},
addNewTaskFromObjectiveModal() {
  this.updateModalState('taskAdd', true); 
  this.setQueryStringParameter('action', 'addTask');

  //Make sure the selected objective shows when we open the "add task" modal.
  // this.modalTaskObject.linked_to_objective_id = this.selectedObjective._id;
  this.modalTaskObject.selected_linked_to_objective_id = {label: this.selectedObjective.title, value: this.selectedObjective._id}
  this.showTaskLinkInput = true;
  
  //Make sure when we close the window it sends us back to the objective
  this.backToObjectiveRef = this.selectedObjective;
  setTimeout(function() { $('#taskAddInput').get(0).focus(); }, 100);
},
closeViewTask() {
if (this.backToObjectiveRef._id) {
  this.updateModalState('objectiveView', true);
  this.setQueryStringParameter('action', 'viewObjective');
  this.deleteQueryStringParameter('taskID');
  this.backToObjectiveRef = {};
} else {
  this.showTaskEditInput = false; 
  this.revertSelectedTask(); 
  this.updateModalState('', false); 
  this.deleteQueryStringParameter('action'); 
  this.deleteQueryStringParameter('taskID')
}
},
closeKeyResultView() {

//Dump the chart so it doesn't briefly show the next time we open a KR.
$('.chartContainer').html('<canvas id="krUpdateChart" width="400" height="360"></canvas>')

if (this.backToObjectiveRef._id) {
  this.updateModalState('objectiveView', true);
  this.backToObjectiveRef = {};
} else {
this.updateModalState('', false); 
this.deleteQueryStringParameter('action'); 
this.deleteQueryStringParameter('keyResultID')
this.showAllKeyResultUpdates = false;
}
},
closeKeyResultAdd() {
if (this.backToObjectiveRef._id) {  
  this.updateModalState('objectiveView', true);
  // this.backToObjectiveRef = {};
} else {
   this.updateModalState('keyResultAdd', false); 
   this.clearModalKeyResultData(); 
   this.deleteQueryStringParameter('action'); 
   this.deleteQueryStringParameter('keyResultID')
}
},
setKRModalObjective(krObjective) {
  // console.log(krObjective)
  this.modalKeyResultObject.linked_to_objective_id = krObjective._id;
},
  setQueryStringParameter(name, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
},
clearModalTaskData() {
var globalScope = this;
this.$emit('clearModalTaskData');
this.modalTaskObject = modalTaskObjectModel;

//Dirty hack alert - not sure why these weren't clearing with the code above, but whatever.
this.modalTaskObject.title = "";
this.modalTaskObject.description = "";
this.modalTaskObject.linked_to_objective_id = "";

//Set ourselves as the assigned user when creating a new task from the home screen
if (this.currentUser) {
  setTimeout(function() { globalScope.modalTaskObject.selected_owner = {value: globalScope.currentUser.id, label: globalScope.currentUser.name} }, 500);
}
},
clearModalObjectiveData() {
var globalScope = this;
this.$emit('clearModalObjectiveData');
this.modalObjectiveObject = modalObjectiveObjectModel;
this.modalObjectiveObject.title = "";
this.modalObjectiveObject.session_id = "";
this.modalObjectiveObject.aligned_to_objective_id = "";


//Set ourselves as the assigned user when creating a new task from the home screen
if (this.currentUser) {
  setTimeout(function() { globalScope.modalObjectiveObject.selected_owner = {value: globalScope.currentUser.id, label: globalScope.currentUser.name} }, 500);
}

},
createKeyResult() {

  var globalScope = this;
  //First make a copy of the Vue data using Object.assign,
  //because we're about to delete properties from it before posting to the server.
  //If we just say for exammple var okr = this.data,
  //when we delete a property from okr, we delete it from the Vue data.
  var kr = Object.assign({}, this.modalKeyResultObject);

  if (kr.selected_linked_to_objective_id.value) {
    kr.linked_to_objective_id = kr.selected_linked_to_objective_id.value;
  }

  if (kr.selected_owner) {
    kr.owner = kr.selected_owner.value;
  }

  if (kr.kr_type == 'achieved_or_not') {
    kr.target_number = "100";
    kr.initial_number = "0";
  }

  delete kr.selected_linked_to_objective_id;
  delete kr.selected_owner;
  
  // console.log(JSON.stringify(kr))

  axios
  .post('/rest/okrs', kr)
  .then(function(response) {
    globalScope.clearModalKeyResultData();
    globalScope.$emit('refreshOKRData');
    
    
    if (globalScope.backToObjectiveRef._id) {
      globalScope.updateModalState('objectiveView', true);
    } else {
      globalScope.updateModalState('addKeyResult', false);
    }

    //TODO: If we came from an objective, send us back there
  
  })

},
deleteOKR(objective) {
  var globalScope = this;

  // console.log(objective)

  if (confirm("Do you really want to delete this objective?")) {
    
    objective.deleted = "true";
    
    delete objective.tasks;
    delete objective.key_results;
    delete objective.childObjectives;

    axios
    .put('/rest/okrs/' + objective._id, objective)
    .then(function(response) {
      globalScope.$emit('refreshOKRData');
      globalScope.clearModalObjectiveData()
      globalScope.updateModalState('objectiveView', false);
    })
  }
},
deleteKeyResult(keyResult) {
  var globalScope = this;

  // console.log(keyResult)

  if (confirm("Do you really want to delete this key result?")) {
    keyResult.deleted = "true";
    axios
    .put('/rest/okrs/' + keyResult._id, keyResult)
    .then(function(response) {
      globalScope.$emit('refreshOKRData');
      globalScope.clearModalKeyResultData()
      globalScope.updateModalState('keyResultView', false);
    })
  }
},
clearModalKeyResultData() {
var globalScope = this;
this.$emit('clearModalKeyResultData');
this.modalKeyResultObject = modalKeyResultObjectModel;

this.modalKeyResultObject.title = "";
this.modalKeyResultObject.target_number = "";
this.modalKeyResultObject.initial_number = "";
this.modalKeyResultObject.deadline_type = "none";
this.modalKeyResultObject.deadline = "";
this.modalKeyResultObject.owner = "";


//Make sure the UI automatically sets us as the owner when we go to create a new one.
if (this.currentUser) {
  setTimeout(function() { 
    globalScope.modalKeyResultObject.selected_owner = {value: globalScope.currentUser.id, label: globalScope.currentUser.name} 
    
    }, 500);
}
},
  renderChartFromSelectedKeyResult() {
    var globalScope = this;
    setTimeout(function() { 
    // console.log(globalScope.selectedKeyResult)
    var ctx = $("#krUpdateChart")[0].getContext("2d");
var data = {
  datasets: [
    {
      label: "Value updated to",
      data: globalScope.selectedKeyResultUpdatesChartData,
      trendlineLinear: {
        style: "rgba(255,105,180, .8)",
        lineStyle: "dotted",
        width: 2
      }
    }
  ]
};

var myLineChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: {
    legend: {display: false},
    trendlineLinear: {
      style: "rgba(255,105,180, .8)",
      lineStyle: "dotted|solid",
      width: 2
    },
    annotation: {
      events: ["click"],
      annotations: [
        {
          drawTime: "afterDatasetsDraw",
          id: "hline",
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: globalScope.selectedKeyResult.target_number || 100,
          borderColor: "grey",
          borderWidth: 2,
          label: {
            content: globalScope.selectedKeyResult.kr_type.replace(/_/g, ' ') + " " + globalScope.selectedKeyResult.target_number,
            enabled: true
          },
          onClick: function(e) {
            // The annotation is is bound to the `this` variable
            // console.log("Annotation", e.type, this);
          }
        }
      ]
    },
    scales: {
      yAxes: [{
          ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                // console.log(value)
                if (Number.isInteger(value)) {
                  return parseInt(value);
                } else {
                  return value;
                }
                  
              }
          }
      }],
      xAxes: [{
          scaleLabel: {
            display: true
          },
          type: "time",
          time: {
            //TODO: Set this to 'hour' if we only have 1 day of updates to display
            unit: "day",
            minUnit: "minute",
            displayFormats: {
              second: "mm:ss"
            }
          }
        }]
    }
  }
});
}, 10);
  },
  createOKR() {

    //First check if we have the required fields.

    

    var globalScope = this;
    //First make a copy of the Vue data using Object.assign,
    //because we're about to delete properties from it before posting to the server.
    //If we just say for exammple var okr = this.data,
    //when we delete a property from okr, we delete it from the Vue data.
    var okr = Object.assign({}, this.modalObjectiveObject);
    if (okr.session_id && okr.selected_owner) {
    okr.tags = Object.assign([], this.modalObjectiveObject.tags);

    if (okr.selected_aligned_to_objective_id.value) {
      okr.aligned_to_objective_id = okr.selected_aligned_to_objective_id.value;
    }

    if (okr.selected_owner) {
      okr.owner = okr.selected_owner.value;
    }

    okr.type = 'objective';

    delete okr.selected_aligned_to_objective_id;
    delete okr.selected_owner;
    // console.log(JSON.stringify(okr))

      axios
      .post('/rest/okrs', okr)
      .then(function(response) {
        globalScope.$emit('refreshOKRData')
        globalScope.selectElement({}, response.data)
        globalScope.clearModalObjectiveData()
        // globalScope.updateModalState('objectiveView', true);
      })

    } else {
      //Output error text for invalid OKR creation.
      var errorText = "";
      if (okr.selected_owner == "") {
        errorText += "The owner field cannot be blank. ";
      }
      if (okr.session_id == "") {
        errorText += "The session field cannot be blank. ";
      }
      alert(errorText)
    }

  },
  selectElement($event, newElement) {
    // console.log($event, newElement)

    //We're selecting a key result from the Objectives modal. Be sure we return to it when we close the key result.
    if (newElement.type == "key_result" || (newElement.type == "Aeriesworks Task" && this.selectedObjective)) {
      this.backToObjectiveRef = this.selectedObjective;
    }
    
    this.$emit('selectElement', newElement);
  },
    updateOKR() {
    var globalScope = this;

    // console.log(this.selectedObjective)

    var okr = Object.assign({}, this.selectedObjective);
    okr.recordUpdateBy = this.currentUser.id;
    
    delete okr.tasks;
    delete okr.key_results;

      axios
      .put('/rest/okrs/' + okr._id, okr)
      .then(function(response) {
        globalScope.$emit('refreshOKRData');
        globalScope.clearModalObjectiveData()
        globalScope.updateModalState('objectiveView', false);
      })

  },
  closeViewObjective() {
  //Send us back to the OKR we came from, otherwise close the modal
  if (this.backToObjectiveRef._id && this.backToObjectiveRef._id !== this.selectedObjective._id) {
        this.updateModalState('objectiveView', true);
        this.backToObjectiveRef = {};
  } else {
    this.updateModalState('', false);
    this.revertSelectedObjective();
    this.deleteQueryStringParameter('action');
    this.deleteQueryStringParameter('objectiveID')
  }
  },
  createTask() {
    var globalScope = this;
    //First make a copy of the Vue data using Object.assign,
    //because we're about to delete properties from it before posting to the server.
    //If we just say for exammple var okr = this.data,
    //when we delete a property from okr, we delete it from the Vue data.
    var task = Object.assign({}, this.modalTaskObject);
    task.tags = Object.assign([], this.modalTaskObject.tags);

    if (task.selected_linked_to_objective_id.value) {
      task.linked_to_objective_id = task.selected_linked_to_objective_id.value;
    }

    if (task.selected_owner) {
      task.owner = task.selected_owner.value;
    }

    task.recordCreatedBy = this.currentUser.id;

    delete task.selected_linked_to_objective_id;
    delete task.selected_owner;
    
    // console.log(JSON.stringify(task))

      axios
      .post('/rest/okrs', task)
      .then(function(response) {
        globalScope.$emit('refreshOKRData');
        
        //Send us back to the OKR we came from, otherwise close the modal
        if (globalScope.backToObjectiveRef._id) {
              globalScope.updateModalState('objectiveView', true);
              globalScope.backToObjectiveRef = {};
        } else {
        globalScope.updateModalState('taskAdd', false);
        }
        
        globalScope.clearModalTaskData()
      })

  },
  cancelCreateTask() {
    if (this.backToObjectiveRef._id) {
      this.updateModalState('objectiveView', true);
      this.setQueryStringParameter('action', 'viewObjective');
      this.deleteQueryStringParameter('taskID');
      this.backToObjectiveRef = {};
    } else {
      this.updateModalState('', false); 
      this.revertCreateNewTask(); 
      this.deleteQueryStringParameter('action'); 
      this.deleteQueryStringParameter('taskID');
    }
  },
  deleteTask(task) {
    var globalScope = this;

    // console.log(task)


    if (confirm("Do you really want to delete this task?")) {
      task.deleted = "true";
      axios
      .put('/rest/okrs/' + task._id, task)
      .then(function(response) {
        globalScope.$emit('refreshOKRData');
        globalScope.clearModalTaskData()
        globalScope.updateModalState('taskView', false);
      })
    }
  },
  numberOfTasksComplete(tasks) {
    if (tasks) {
    var number = 0;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].status == "Done") {
        number += 1
      }
    }
    return number;
    }
  },
  createSession() {
    var globalScope = this;
    //First make a copy of the Vue data using Object.assign,
    //because we're about to delete properties from it before posting to the server.
    //If we just say for exammple var okr = this.data,
    //when we delete a property from okr, we delete it from the Vue data.
    var session = Object.assign({}, this.modalSessionObject);

    if (session.selected_parent_session.value) {
      session.parent_session = session.selected_parent_session.value;
    }

    session.start = new Date(session.startDate).getTime() / 1000;
    session.end = new Date(session.endDate).getTime() / 1000

    delete session.startDate;
    delete session.endDate;
    // console.log(session)

  if (this.editSessionID) {

    axios
    .put('/rest/okrs/' + this.editSessionID, session)
    .then(function(response) {
      globalScope.$emit('refreshOKRData')
      globalScope.updateModalState('sessionAdd', false);
    })

  } else {

    axios
    .post('/rest/okrs', session)
    .then(function(response) {
      globalScope.$emit('refreshOKRData')
      globalScope.updateModalState('sessionAdd', false);
    })

  }

  },
  updateTask() {
    var globalScope = this;

    // console.log(this.selectedTask)
      var taskPayload = Object.assign({}, this.selectedTask);
      delete taskPayload.editHistory;
      taskPayload.recordUpdateBy = this.currentUser.id;
      axios
      .put('/rest/okrs/' + taskPayload._id, taskPayload)
      .then(function(response) {
        globalScope.$emit('refreshOKRData');
        globalScope.clearModalTaskData()
        
        //Send us back to the OKR we came from, otherwise close the modal
        if (globalScope.backToObjectiveRef._id) {
              globalScope.updateModalState('objectiveView', true);
              globalScope.backToObjectiveRef = {};
        } else {
        globalScope.updateModalState('taskView', false);
        }
        
      })

  },
  revertSelectedTask() {
    var task = this.selectedTask;
    var originalTask = this.lastSelectedTask;
    for (var i = 0; i < Object.keys(task).length; i++) {
      task[Object.keys(task)[i]] = originalTask[Object.keys(task)[i]]; 
    }
  },
  revertCreateNewTask() {
    // var task = this.modalTaskObject;
    // for (var i = 0; i < Object.keys(task).length; i++) {
    //   task[Object.keys(task)[i]] = "";
    // }
    this.clearModalTaskData()
  },
  revertSelectedObjective() {
    var objective = this.selectedObjective;
    var originalObjective = this.lastSelectedObjective;

    this.showAlignmentInput = false;
    this.showObjectiveDescriptionInput = false;
    this.showCreateObjectiveShowParentSessionInput = true;
    $('#viewObjectiveParentSessionSearch').val('');

    for (var i = 0; i < Object.keys(objective).length; i++) {
      if (Object.keys(objective)[i] !== "tasks"
      && Object.keys(objective)[i] !== "key_results"
      && Object.keys(objective)[i] !== "childObjectives") {
        objective[Object.keys(objective)[i]] = originalObjective[Object.keys(objective)[i]];
      }
    }
  },
  revertCreateNewObjectiveModal() {
    
    this.showAlignmentInput = false;
    this.showObjectiveDescriptionInput = false;

    this.modalObjectiveObject.type = "objective";
    this.modalObjectiveObject.title = "";
    this.modalObjectiveObject.owner = "";
    this.modalObjectiveObject.tags = [];
    this.modalObjectiveObject.description = "";
    this.modalObjectiveObject.aligned_to_objective_id = "";
    this.modalObjectiveObject.selected_aligned_to_objective_id = "";
    this.modalObjectiveObject.objective_type = "aspirational";
    this.modalObjectiveObject.selected_owner = "";
    this.modalObjectiveObject.session_id = "";
  },
  focusInput(inputID) {
    setTimeout(function() { $('#' + inputID).get(0).focus(); }, 20);
  },
  clearSessionOwner() {
    this.modalSessionObject.selected_owner = '';
    $('#sessionOwnerSearch').val('');
    setTimeout(function() { $('#sessionOwnerSearch').get(0).focus(); }, 20);
  },
  clearAddTaskOwner() {
    this.modalTaskObject.selected_owner = '';
    $('#taskOwnerSearch').val('');
    setTimeout(function() { $('#taskOwnerSearch').get(0).focus(); }, 20);
  },
  clearAddKeyResultOwner() {
    this.modalKeyResultObject.selected_owner = '';
    $('#keyResultAddOwnerSearch').val('');
    setTimeout(function() { $('#keyResultAddOwnerSearch').get(0).focus(); }, 20);
  },
  clearViewTaskOwner() {
    this.activeTask.owner = '';
    $('#taskViewOwnerSearch').val('');
    setTimeout(function() { $('#taskViewOwnerSearch').get(0).focus(); }, 20);
  },
  
    clearParentSession() {
    this.modalSessionObject.selected_parent_session = '';
    $('#parentSessionSearch').val('');
    setTimeout(function() { $('#parentSessionSearch').get(0).focus(); }, 20);
  },
  clearObjectiveOwner() {
    this.modalObjectiveObject.selected_owner = '';
    $('#objectiveOwnerSearch').val('');
    setTimeout(function() { $('#objectiveOwnerSearch').get(0).focus(); }, 20);
  },
  clearViewObjectiveSession() {
    this.selectedObjective.session_id = '';
    $('#viewObjectiveParentSessionSearch').val('');
    setTimeout(function() { $('#viewObjectiveParentSessionSearch').get(0).focus(); }, 20);
  },
  clearViewObjectiveOwner() {
    this.selectedObjective.owner = '';
    $('#viewObjectiveOwnerSearch').val('');
    setTimeout(function() { $('#viewObjectiveOwnerSearch').get(0).focus(); }, 20);
  },
  clearAddObjectiveSession() {
    this.modalObjectiveObject.session_id = '';
    $('#addObjectiveSessionSearch').val('');
    setTimeout(function() { $('#addObjectiveSessionSearch').get(0).focus(); }, 20);
  },
  clearAddObjectiveAlignment() {
    // if (confirm("Un-align this objective?")) {
      this.modalObjectiveObject.selected_aligned_to_objective_id = '';
      this.showAlignmentInput = false;
      $('#objectiveAlignmentSearch').val('');
      setTimeout(function() { $('#objectiveAlignmentSearch').get(0).focus(); }, 20);
    // }
  },
  clearViewObjectiveAlignment() {
    // if (confirm("Un-align this objective?")) {
      this.selectedObjective.aligned_to_objective_id = '';
      this.showAlignmentInput = false;
      $('#viewObjectiveAlignmentSearch').val('');
      setTimeout(function() { $('#viewObjectiveAlignmentSearch').get(0).focus(); }, 20);
    // }
  },
  clearAddTaskObjective() {
      this.modalTaskObject.selected_linked_to_objective_id = '';
      this.showTaskLinkInput = false;
      $('#taskObjectiveSearch').val('');
      setTimeout(function() { $('#taskObjectiveSearch').get(0).focus(); }, 20);
  },
  clearViewTaskObjective() {
      this.selectedTask.linked_to_objective_id = '';
      this.showViewTaskLinkInput = false;
      $('#viewTaskObjectiveSearch').val('');
      setTimeout(function() { $('#viewTaskObjectiveSearch').get(0).focus(); }, 20);
  },
  getSlackUserByID(id, returnArray) {

    //If we've been passed a team ID instead of a Slack user ID
    if (id && id.length > 12) {
      
      //DIRTY HACK: We make this look like a slack user object for compatibility purposes
      var team = this.fetchDataElementByID('team', id);
      var output = {
        "id": team._id,
        "team_id": "T495EMCAW",
        "name": team.name,
        "deleted": false,
        "real_name": team.name,
        "profile": {
            "title": "",
            "real_name": team.name,
            "real_name_normalized": team.name,
            "display_name": team.name,
            "display_name_normalized": team.name,
            "image_original": "/images/group.svg",
            "email": team.name + "@aeries.com",
            "first_name": team.name,
            "last_name": "",
            "image_24": "/images/group.svg",
            "image_32": "/images/group.svg",
            "image_48": "/images/group.svg",
            "image_72": "/images/group.svg",
            "image_192": "/images/group.svg",
            "image_512": "/images/group.svg",
            "image_1024": "/images/group.svg",
            "team": "T495EMCAW"
        },
        "is_admin": false,
        "is_owner": false,
        "is_primary_owner": false,
        "is_restricted": false,
        "is_ultra_restricted": false,
        "is_bot": false,
        "is_app_user": false,
        "platform": "slack",
        "_id": team._id,
        "label": team.name,
        "key": team._id,
        "value": team._id,
        "desc": team.description
    }
    if (returnArray) {
      return [output]
    } else {
      return output
    }

    } else {
    for (var i = 0; i < this.autoCompleteSlackUsers.length; i++) {
      if (this.autoCompleteSlackUsers[i].id == id) {
        if (returnArray) {
          return [this.autoCompleteSlackUsers[i]];
        } else {
          return this.autoCompleteSlackUsers[i];
        }
      }
    }
  }
  },
krUpdateChangedTo(kr) {
if (kr.original_number > kr.new_number) {
  return "decreased";
} else if (kr.original_number < kr.new_number) {
  return "increased";
} else {
  return "changed"
}
},
submitKeyResultUpdate() {

  var globalScope = this;

  var kr = this.selectedKeyResult;
  var modalKR = this.modalKeyResultUpdateObject;

  var originalNumber = "";
  var newNumber = "";

  if (this.selectedKeyResult && this.selectedKeyResult.keyResultUpdates.length && this.selectedKeyResult.keyResultUpdates[0].new_number) {
    originalNumber = this.selectedKeyResult.keyResultUpdates[0].new_number;
  } else {
    originalNumber = kr.initial_number;
  }

  if (modalKR.new_number) {
    if (modalKR.new_number !== "") {
      newNumber = modalKR.new_number;
    } else {
      newNumber = $('.selectedKeyResultUpdateNewNumber.selected').val();
    }
  } else {
    newNumber = $('.selectedKeyResultUpdateNewNumber.selected').val();
  }

  if (newNumber !== "") {

  var updateObject = {
    "update_created_on": new Date().getTime(),
    "created_by": this.currentUser.id,
    "type": "key_result_update",
    "kr_id" : kr._id, 
    "description": modalKR.description,
    "original_number" : originalNumber,
    "new_number" : newNumber,
}

// console.log(updateObject)

this.modalKeyResultUpdateObject = modalKeyResultUpdateObjectModel;
this.modalKeyResultUpdateObject.description = "";

axios
.post('/rest/kr-updates', updateObject)
.then(function(response) {
  globalScope.$emit('refreshOKRData')
  
  if (globalScope.backToObjectiveRef._id) {
    globalScope.updateModalState('objectiveView', true);
  } else {
    globalScope.updateModalState('', false)
  }

  globalScope.deleteQueryStringParameter('action'); 
  globalScope.deleteQueryStringParameter('keyResultID');
})

  } else {
    alert("New value cannot be blank.")
  }

},
closeKeyResultUpdate() {
if (this.backToObjectiveRef._id) {
  this.updateModalState('objectiveView', true);
  this.backToObjectiveRef = {};
} else {
  this.revertSelectedTask();
  this.updateModalState('', false);
  this.deleteQueryStringParameter('action');
  this.deleteQueryStringParameter('keyResultID');
}
},
updateSelectedKeyResult(kr) {
this.$emit('updateSelectedKeyResult', kr)
},
updateModalState(modalType, show) {
  var modalObject = {
    type: modalType,
    show: show
  }
this.$emit('updateModalState', modalObject)
},

setActiveDesignTask() {
      var globalScope = this;
      var taskPayload = Object.assign({}, this.selectedTask);
      console.log("Pre-emitted", taskPayload)
      this.$emit('setActiveDesignTask', taskPayload)
},
},
async created () {

},
async mounted () {

  var globalScope = this;

    this.localAutoCompleteSlackUsers = []
    for(var i = 0; i < this.autoCompleteSlackUsers.length; i++) {
      this.localAutoCompleteSlackUsers.push(Object.assign({}, this.autoCompleteSlackUsers[i]));
    }

  if (this.selectedElement) {
    this.modalObjectiveObject.session_id = this.selectedElement.id;
  }

    
    //Init user search for "Owners" fields
    //User search with multiple selections possible
    //Keeping this for now as a code example of multiple entried (e.g. tags, or multiple people on one element)
    
    // function split( val ) {
    //   return val.split( /,\s*/ );
    // }
    // function extractLast( term ) {
    //   return split( term ).pop();
    // }
    
    // $( ".userSearch" ).on( "keydown", function( event ) {
    //     if ( event.keyCode === $.ui.keyCode.TAB &&
    //         $( this ).autocomplete( "instance" ).menu.active ) {
    //       event.preventDefault();
    //     }
    //   })
    //   .autocomplete({
    //     minLength: 0,
    //     source: function(request, response) {
    //       var results;
    //       var aData = $.map(globalScope.autoCompleteSlackUsers, function(value, key) {
    //         return {
    //           label: value.real_name,
    //           value: value.real_name
    //         }
    //       });
    //       results = $.ui.autocomplete.filter(aData,  extractLast( request.term ));
          
    //       response(results);
    //     },
    //     focus: function() {
    //       // prevent value inserted on focus
    //       return false;
    //     },
    //     select: function( event, ui ) {
    //       var terms = split( this.value );
    //       // remove the current input
    //       terms.pop();
    //       // add the selected item
    //       terms.push( ui.item.value );
    //       // add placeholder to get the comma-and-space at the end
    //       terms.push( "" );
    //       this.value = terms.join( ", " );
    //       return false;
    //     }
    //   });

    function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }



    //INITIALIZING AUTOCOMPLETE ON SEARCH FIELDS

    //Session search - select a parent session
    $( ".sessionSearch" ).on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function(request, response) {
          var results;
          var aData = $.map(globalScope.okrs.sessions, function(value, key) {
            return {
              label: value.title,
              value: value._id
            }
          });
          results = $.ui.autocomplete.filter(aData,  request.term );
          
          response(results);
        },
        select: function( event, ui ) {

          // console.log(event, ui)

          if (event.target.id == "viewObjectiveParentSessionSearch") {
            globalScope.selectedObjective.session_id = ui.item.value;
          } else if (event.target.id == "addObjectiveSessionSearch") {
            globalScope.modalObjectiveObject.session_id = ui.item.value;
          } else {
            globalScope.modalSessionObject.selected_parent_session = ui.item;
          }

        }
      }).bind('focus', function(){ $(this).autocomplete("search") });





    //Objective search (e.g. parent)
    $( ".objectiveSearch" ).on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 0,
        source: function(request, response) {
          var results;
          var aData = $.map(globalScope.okrs.objectives, function(value, key) {
            return {
              label: value.title,
              value: value._id
            }
          });
          results = $.ui.autocomplete.filter(aData,  request.term );
          
          response(results);
        },
        select: function( event, ui ) {
          // console.log(event, ui)
          if (event.target.id == "taskObjectiveSearch") {
            globalScope.modalTaskObject.selected_linked_to_objective_id = ui.item;
          } else if (event.target.id == "viewTaskObjectiveSearch") {
            globalScope.selectedTask.linked_to_objective_id = ui.item.value;
          } else if (event.target.id == "objectiveAlignmentSearch") {
          globalScope.modalObjectiveObject.selected_aligned_to_objective_id = ui.item;
          } else if (event.target.id == "viewObjectiveAlignmentSearch") {
            if (ui.item.value == globalScope.selectedObjective._id) {
              alert("You cannot set an objective as a child of itself.")
              setTimeout(function() { 
                $('#viewObjectiveAlignmentSearch').val('');
              }, 20);
            } else {
              globalScope.selectedObjective.aligned_to_objective_id = ui.item.value;
            }
          
          }
        }
      }).bind('focus', function(){ $(this).autocomplete("search") });





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
          if (event.target.id == "sessionOwnerSearch") {
            globalScope.modalSessionObject.selected_owner = ui.item;
          } else if (event.target.id == "objectiveOwnerSearch") {
            globalScope.modalObjectiveObject.selected_owner = ui.item;
          } else if (event.target.id == "viewObjectiveOwnerSearch") {
            globalScope.selectedObjective.owner = ui.item.value;
          } else if (event.target.id == "taskOwnerSearch") {
            globalScope.modalTaskObject.selected_owner = ui.item;
          }  else if (event.target.id == "taskViewOwnerSearch") {
            globalScope.activeTask.owner = ui.item.value;
          }  else if (event.target.id == "keyResultOwnerSearch") {
            globalScope.modalKeyResultObject.selected_owner = ui.item;
          }  else if (event.target.id == "keyResultAddOwnerSearch") {
            globalScope.modalKeyResultObject.selected_owner = ui.item;
          }
        }
      }).bind('focus', function(){ $(this).autocomplete("search"); } );





if (this.selectedElement && this.selectedElement.type == "task") {
  this.selectElement(this.fetchDataElementByID('task', this.selectedElement.id))
}


this.clearModalTaskData();
this.clearModalObjectiveData();




      $('body').on('click', function(e) {
      if (e.target.classList[0] !== "taskViewDropdownMenu") {
        globalScope.taskViewDropdown.show = false;
      }

      if (e.target.classList[0] !== "keyResultViewDropdownMenu") {
        globalScope.keyResultViewDropdown.show = false;
      }

      if (e.target.classList[0] !== "objectiveViewDropdownMenu") {
        globalScope.objectiveViewDropdown.show = false;
      }

      if (e.target.classList[0] !== "taskViewTitleInput") {
        globalScope.showTaskEditInput = false;
      }


      if (e.target.classList[0] !== "showObjectiveDescriptionInput" && e.target.id !== "objectiveDescriptionInput") {
        globalScope.showObjectiveDescriptionInput = false;
      }
      })


},
computed: {
      viewingDesignRequestPage() {
        if (window.location.pathname == "/projects/design") {
          return true;
        }
        return false;
      },
      selectedKeyResultUpdatesChartData() {
        if (this.selectedKeyResult.keyResultUpdates) {
        //Take the currently selected key result and generate our chart data so we can visualize updates.
        var output = [];
        
        // Data looks like this
        // {
        //   x: moment("01:00:00", "HH:mm:ss"),
        //   y: 0
        // },
        // {
        //   x: moment("01:00:01", "HH:mm:ss"),
        //   y: 10
        // }

      //Update the chart code so it incorporates the initial number and recordCreatedAt date
      output.push({
        x: moment(this.selectedKeyResult.recordCreatedAt),
        y: this.selectedKeyResult.initial_number,
      })

      for (var i = 0; i < this.selectedKeyResult.keyResultUpdates.length; i++) {
        output.push({
          x: moment(this.selectedKeyResult.keyResultUpdates[i].update_created_on),
          y: this.selectedKeyResult.keyResultUpdates[i].new_number,
        })
      }
      return output;
        } else {
          return false;
        }
      },
      selectedObjectiveKeyResultProgressPercentage() {
        if (this.selectedObjective.key_results) {
        var totals = [];
        var numberOfCompletedKRs = 0;
        
        for (var i = 0; i < this.selectedObjective.key_results.length; i++) {
          var kr = this.selectedObjective.key_results[i];
          var percentComplete = 0;
          
            
            var target_number = parseFloat(kr.target_number);

            var new_number = parseFloat(kr.initial_number);
            
            if (kr.keyResultUpdates && kr.keyResultUpdates.length && kr.keyResultUpdates[0].new_number) {
              new_number = parseFloat(kr.keyResultUpdates[0].new_number);
            } else {
              new_number = parseFloat(kr.initial_number);
            }

            if (kr.type == "achieved_or_not") {
              kr.target_number = 100
              if (kr.keyResultUpdates.length == 0) {
                new_number = 0;
              }
            }
            
            // console.log("checking if completed:", kr, new_number >= target_number)
            
            if (kr.kr_type == 'should_increase_to' || kr.kr_type == 'achieved_or_not' || kr.kr_type == 'should_stay_above') {
              if (new_number >= target_number) {
                numberOfCompletedKRs += 1;
              }
            } else if (kr.kr_type == 'should_decrease_to' || kr.kr_type == 'should_stay_below') {
                if (new_number <= target_number) {
                  numberOfCompletedKRs += 1;
                }
            }
          
          }

        // console.log(numberOfCompletedKRs)
        // console.log(numberOfCompletedKRs, this.selectedObjective.key_results.length);
        return parseInt(((numberOfCompletedKRs * 100) / this.selectedObjective.key_results.length));
        } else {
          return false;
        }
      },
  activeTask() {
    return this.selectedTask;
  },
// modalSessionObject() {
// if (this.editSessionID) {
//   return this.getSessionByID(this.editSessionID)
// } else {
//   return this.modalSessionObject;
// }
// },

},
}
</script>
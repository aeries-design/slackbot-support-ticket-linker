<style scoped>
.design-widget {
  background-image: url('/images/topo-pattern-small.svg')
}

section {
  margin-bottom: 56px;
}

.remove-item {
  display: none;
}

div:hover > div > .remove-item {
  display: flex;
}

@media (max-width: 640px) {
  .remove-item {
    display: flex;
    padding-top: 12px;
    padding-bottom: 12px;
  }
}
</style>

<template lang="pug">
div(class="px-2")
  main(v-if="selectedPage == 'home'")

    section
      div.container.flex.flex-col
        h1.text-display.font-bold.font-aeries.pt-12 Employee reimbursement form
        p.text-subhead.mb-8 Let's start with some basic info! We auto-filled these for you - just make sure your name is correct.
        div(class="md:flex w-full md:w-3/5")
          div(class="w-full md:w-3/5 mb-6 mr-12")
              p.mb-2.italic Employee name
              input.h-12(v-model="currentUser"  class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-2/5")
              p.mb-2.italic Date submitted
              input.h-12(v-model="currentDate" type="date" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2")
    section
      div.container.flex.flex-col
        p.text-subhead.mb-8 Next, select which types of reimbursements you'll be submitting.
        h2(class="text-title font-bold font-aeries mb-4 text-center md:text-left") I need to be reimbursed for...
        div(class="flex flex-wrap justify-center md:justify-start")
          div(@click="toggleActive('mileage')" v-bind:class="{'bg-neutral-500 shadow-inner' : reimbursementTypes.mileage.isActive, 'bg-white shadow-md' : !reimbursementTypes.mileage.isActive}" class="text-center inline-flex flex-col px-2 pb-3 self-center contents-center mr-4 mb-4 cursor-pointer")
              h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center.mr-4
                <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4H6.5C5.83997 4 5.29004 4.42 5.07996 5.01L3 11V19C3 19.55 3.44995 20 4 20H5C5.55005 20 6 19.55 6 19V18H18V19C18 19.55 18.45 20 19 20H20C20.55 20 21 19.55 21 19V11L18.92 5.01ZM6.8501 6H17.14L18.1801 9H5.81006L6.8501 6ZM5 16H19V11.34L18.89 11H5.12L5 11.34V16ZM7.5 12C6.67163 12 6 12.6716 6 13.5C6 14.3284 6.67163 15 7.5 15C8.32837 15 9 14.3284 9 13.5C9 12.6716 8.32837 12 7.5 12ZM15 13.5C15 12.6716 15.6716 12 16.5 12C17.3284 12 18 12.6716 18 13.5C18 14.3284 17.3284 15 16.5 15C15.6716 15 15 14.3284 15 13.5Z" fill="black" fill-opacity="0.54"/>
                </svg>
                div.text-body Mileage
          div(@click="toggleActive('lodging')" v-bind:class="{'bg-neutral-500 shadow-inner' : reimbursementTypes.lodging.isActive, 'bg-white shadow-md' : !reimbursementTypes.lodging.isActive}" class="text-center inline-flex flex-col px-2 pb-3 self-center contents-center mr-4 mb-4 cursor-pointer")
              h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center.mr-4
                <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H22V21H2V3H12V7ZM4 19H6V17H4V19ZM6 15H4V13H6V15ZM4 11H6V9H4V11ZM6 7H4V5H6V7ZM8 19H10V17H8V19ZM10 15H8V13H10V15ZM8 11H10V9H8V11ZM10 7H8V5H10V7ZM20 19V9H12V11H14V13H12V15H14V17H12V19H20ZM18 11H16V13H18V11ZM16 15H18V17H16V15Z" fill="black" fill-opacity="0.54"/>
                </svg>
                div.text-body Lodging
          div(@click="toggleActive('airfare')" v-bind:class="{'bg-neutral-500 shadow-inner' : reimbursementTypes.airfare.isActive, 'bg-white shadow-md' : !reimbursementTypes.airfare.isActive}" class="text-center inline-flex flex-col px-2 pb-3 self-center contents-center mr-4 mb-4 cursor-pointer")
              h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center.mr-4
                <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 16V14L13.5 9V3.5C13.5 2.67 12.83 2 12 2C11.17 2 10.5 2.67 10.5 3.5V9L2.5 14V16L10.5 13.5V19L8.5 20.5V22L12 21L15.5 22V20.5L13.5 19V13.5L21.5 16Z" fill="black" fill-opacity="0.54"/>
                </svg>
                div.text-body Airfare
          div(@click="toggleActive('meals')" v-bind:class="{'bg-neutral-500 shadow-inner' : reimbursementTypes.meals.isActive, 'bg-white shadow-md' : !reimbursementTypes.meals.isActive}" class="text-center inline-flex flex-col px-2 pb-3 self-center contents-center mr-4 mb-4 cursor-pointer")
              h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center.mr-4
                <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 9H11V2H13V9C13 11.21 11.21 13 9 13V22H7V13C4.79004 13 3 11.21 3 9V2H5V9H7V2H9V9ZM16 14V6C16 4.23999 18.24 2 21 2V22H19V14H16Z" fill="black" fill-opacity="0.54"/>
                </svg>

                div.text-body Meals
          div(@click="toggleActive('other')" v-bind:class="{'bg-neutral-500 shadow-inner' : reimbursementTypes.other.isActive, 'bg-white shadow-md' : !reimbursementTypes.other.isActive}" class="text-center inline-flex flex-col px-2 pb-3 self-center contents-center mr-4 mb-4 cursor-pointer")
              h2.font-bold.font-aeries.w-full.text-subhead.mt-2.leading-tight.flex.inline-flex.flex-col.justify-center.mr-4
                <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1.5H19C20.1 1.5 21 2.39999 21 3.5V17.5C21 18.6 20.1 19.5 19 19.5H15L12 22.5L9 19.5H5C3.89001 19.5 3 18.6 3 17.5V3.5C3 2.39999 3.89001 1.5 5 1.5ZM14.17 17.5H19V3.5H5V17.5H9.83002L10.41 18.08L12 19.67L13.58 18.09L14.17 17.5ZM11 16.5V14.5H13V16.5H11ZM14 8.5C14 7.39999 13.1 6.5 12 6.5C10.9 6.5 10 7.39999 10 8.5H8C8 6.29001 9.78998 4.5 12 4.5C14.21 4.5 16 6.29001 16 8.5C16 9.78293 15.21 10.4733 14.4407 11.1455C13.711 11.7833 13 12.4046 13 13.5H11C11 11.6787 11.9421 10.9566 12.7704 10.3217C13.4202 9.82361 14 9.37921 14 8.5Z" fill="black" fill-opacity="0.54"/>
                </svg>
                div.text-body Other

    section(v-if="reimbursementTypes.mileage.isActive")
      div.container
        h2.text-title.font-bold.font-aeries.mb-4 
          <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.92 5.01C18.72 4.42 18.16 4 17.5 4H6.5C5.83997 4 5.29004 4.42 5.07996 5.01L3 11V19C3 19.55 3.44995 20 4 20H5C5.55005 20 6 19.55 6 19V18H18V19C18 19.55 18.45 20 19 20H20C20.55 20 21 19.55 21 19V11L18.92 5.01ZM6.8501 6H17.14L18.1801 9H5.81006L6.8501 6ZM5 16H19V11.34L18.89 11H5.12L5 11.34V16ZM7.5 12C6.67163 12 6 12.6716 6 13.5C6 14.3284 6.67163 15 7.5 15C8.32837 15 9 14.3284 9 13.5C9 12.6716 8.32837 12 7.5 12ZM15 13.5C15 12.6716 15.6716 12 16.5 12C17.3284 12 18 12.6716 18 13.5C18 14.3284 17.3284 15 16.5 15C15.6716 15 15 14.3284 15 13.5Z" fill="black" fill-opacity="0.54"/>
          </svg>
          | Mileage (${{mileageTotal}})
        div(class="hidden md:flex w-full p-2")
          div(class="w-1/6 italic") Date
          div(class="w-1/6 italic") Starting location
          div(class="w-1/6 italic") End destination
          div(class="w-1/6 italic") Miles driven
          div(class="w-2/6 italic") Reimbursement rate ($ / mile)
          div(class="italic")
              
        div(class="flex flex-wrap w-full hover:bg-neutral-400 p-2" v-for="(mileage, index) in reimbursement.mileage")
          div(class="w-full md:w-1/6 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Date
              input.h-12(type="date" v-model="mileage.date" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/6 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Starting location
              input.h-12(type="text" v-model="mileage.startingLocation" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/6 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") End destination
              input.h-12(type="text" v-model="mileage.endDestination" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/6 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Miles driven
              input.h-12(type="number" v-model="mileage.milesDriven" min="0.00" step="0.5" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/6 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Miles driven
              input.h-12(disabled type="number" v-model="reimbursementRate" min="0.005" step="0.005" value="0.575" title="Field cannot be edited." class="cursor-not-allowed opacity-50 w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/6 flex")
              a(@click="removeItem(index, 'mileage')").remove-item.flex.flex-row.flex-grow.h-full.self-center.justify-center.items-center.text-minimum-text.text-red-600.font-bold.cursor-pointer Remove
          
        div(class="flex w-4/5 mb-4 p-2")
          a(@click="addNewReimbursementRow('mileage')").text-blue-700.font-bold.cursor-pointer + Add

    section(v-if="reimbursementTypes.lodging.isActive")
      div.container
        h2.text-title.font-bold.font-aeries.mb-4 
          <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H22V21H2V3H12V7ZM4 19H6V17H4V19ZM6 15H4V13H6V15ZM4 11H6V9H4V11ZM6 7H4V5H6V7ZM8 19H10V17H8V19ZM10 15H8V13H10V15ZM8 11H10V9H8V11ZM10 7H8V5H10V7ZM20 19V9H12V11H14V13H12V15H14V17H12V19H20ZM18 11H16V13H18V11ZM16 15H18V17H16V15Z" fill="black" fill-opacity="0.54"/>
          </svg>
          | Lodging (${{lodgingTotal}})
        div(class="hidden md:flex w-full p-2")
          div(class="w-1/5 italic") Date
          div(class="w-1/5 italic") Location
          div(class="w-1/5 italic") Nights
          div(class="w-1/5 italic") Nightly rate ($ / night)
          div(class="w-1/5 italic")
              
        div(class="flex flex-wrap w-full mb-4 hover:bg-neutral-400 p-2" v-for="lodging in reimbursement.lodging")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Date
              input.h-12(type="date" v-model="lodging.date" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Location
              input.h-12(type="text" v-model="lodging.location" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Nights
              input.h-12(type="number" v-model="lodging.nights" min="0" step="1" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Nightly rate ($ / night)
              input.h-12(type="number" v-model="lodging.nightlyRate" min="0" step="1" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 flex")
              a(@click="removeItem(index, 'lodging')").remove-item.flex.flex-row.flex-grow.h-full.self-center.justify-center.items-center.text-minimum-text.text-red-600.font-bold.cursor-pointer Remove
          
        div(class="flex w-4/5 mb-4 p-2")
          a(@click="addNewReimbursementRow('lodging')").text-blue-700.font-bold.cursor-pointer + Add
          
    section(v-if="reimbursementTypes.airfare.isActive")
      div.container
        h2.text-title.font-bold.font-aeries.mb-4 
          <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.5 16V14L13.5 9V3.5C13.5 2.67 12.83 2 12 2C11.17 2 10.5 2.67 10.5 3.5V9L2.5 14V16L10.5 13.5V19L8.5 20.5V22L12 21L15.5 22V20.5L13.5 19V13.5L21.5 16Z" fill="black" fill-opacity="0.54"/>
          </svg>
          | Airfare (${{airfareTotal}})
        div(class="hidden md:flex w-full p-2")
          div(class="w-1/5 italic") Date of departure
          div(class="w-1/5 italic") Date of return
          div(class="w-1/5 italic") Airline
          div(class="w-1/5 italic") Total airfare cost ($)
          div(class="w-1/5 italic")
              
        div(class="flex flex-wrap w-full hover:bg-neutral-400 p-2" v-for="airfare in reimbursement.airfare")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Date of departure
              input.h-12(type="date" v-model="airfare.dateOfDeparture" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Date of return
              input.h-12(type="date" v-model="airfare.dateOfReturn" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Airline
              input.h-12( v-model="airfare.airline" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Total airfare cost ($)
              input.h-12(type="number" v-model="airfare.totalAirfare" min="0.00" step="0.01" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/5 flex")
              a(@click="removeItem(index, 'airfare')").remove-item.flex.flex-row.flex-grow.h-full.self-center.justify-center.items-center.text-minimum-text.text-red-600.font-bold.cursor-pointer Remove
          

        div(class="flex w-4/5 mb-4 p-2")
          a(@click="addNewReimbursementRow('airfare')").text-blue-700.font-bold.cursor-pointer + Add
          
    section(v-if="reimbursementTypes.meals.isActive")
      div.container
        h2.text-title.font-bold.font-aeries.mb-4 
          <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 9H11V2H13V9C13 11.21 11.21 13 9 13V22H7V13C4.79004 13 3 11.21 3 9V2H5V9H7V2H9V9ZM16 14V6C16 4.23999 18.24 2 21 2V22H19V14H16Z" fill="black" fill-opacity="0.54"/>
          </svg>
          | Meals (${{mealsTotal}})
        div(class="hidden md:flex w-full p-2")
          div(class="w-1/4 italic") Date
          div(class="w-1/4 italic") Location
          div(class="w-1/4 italic") Total cost ($)
          div(class="w-1/4 italic")
              
        div(class="flex flex-wrap w-full hover:bg-neutral-400 p-2" v-for="meals in reimbursement.meals")
          div(class="w-full md:w-1/4 pr-4 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Date
              input.h-12(type="date" v-model="meals.date" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/4 pr-4 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Location
              input.h-12( v-model="meals.location" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/4 pr-4 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Total cost ($)
              input.h-12(type="number" v-model="meals.totalCost" min="0.00" step="0.01" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/4 flex")
              a(@click="removeItem(index, 'meals')").remove-item.flex.flex-row.flex-grow.h-full.self-center.justify-center.items-center.text-minimum-text.text-red-600.font-bold.cursor-pointer Remove
          

        div(class="flex w-4/5 mb-4 p-2")
          a(@click="addNewReimbursementRow('meals')").text-blue-700.font-bold.cursor-pointer + Add
          
    section(v-if="reimbursementTypes.other.isActive")
      div.container
        h2.text-title.font-bold.font-aeries.mb-4 
          <svg class="self-center mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1.5H19C20.1 1.5 21 2.39999 21 3.5V17.5C21 18.6 20.1 19.5 19 19.5H15L12 22.5L9 19.5H5C3.89001 19.5 3 18.6 3 17.5V3.5C3 2.39999 3.89001 1.5 5 1.5ZM14.17 17.5H19V3.5H5V17.5H9.83002L10.41 18.08L12 19.67L13.58 18.09L14.17 17.5ZM11 16.5V14.5H13V16.5H11ZM14 8.5C14 7.39999 13.1 6.5 12 6.5C10.9 6.5 10 7.39999 10 8.5H8C8 6.29001 9.78998 4.5 12 4.5C14.21 4.5 16 6.29001 16 8.5C16 9.78293 15.21 10.4733 14.4407 11.1455C13.711 11.7833 13 12.4046 13 13.5H11C11 11.6787 11.9421 10.9566 12.7704 10.3217C13.4202 9.82361 14 9.37921 14 8.5Z" fill="black" fill-opacity="0.54"/>
          </svg>
          | Other (${{otherTotal}})
        div(class="hidden md:flex w-full p-2")
          div(class="w-1/4 italic") Date
          div(class="w-1/4 italic") Description
          div(class="w-1/4 italic") Total cost ($)
          div(class="w-1/4 italic")
              
        div(class="flex flex-wrap w-full hover:bg-neutral-400 p-2" v-for="other in reimbursement.other")
          div(class="w-full md:w-1/4 pr-4 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Date
              input.h-12(type="date" v-model="other.date" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/4 pr-4 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Description
              input.h-12(v-model="other.description" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/4 pr-4 md:pr-4 sm:pb-4 md:pb-0")
              p(class="block md:hidden") Total cost ($)
              input.h-12(v-model="other.totalCost" type="number" min="0.00" step="0.01" class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 py-2")
          div(class="w-full md:w-1/4 flex")
              a(@click="removeItem(index, 'other')").remove-item.flex.flex-row.flex-grow.h-full.self-center.justify-center.items-center.text-minimum-text.text-red-600.font-bold.cursor-pointer Remove
          
        div(class="flex w-4/5 mb-4")
          a(@click="addNewReimbursementRow('other')").text-blue-700.font-bold.cursor-pointer + Add
    section(v-if="atLeastOneTypeIsSelected")
      div.container
    
    section(v-if="atLeastOneTypeIsSelected")
      div.container
        h1.text-display.font-bold.font-aeries Total reimbursements: ${{reimbursementGrandTotal}}
        a(v-if="reimbursementGrandTotal == 0" class="cursor-pointer block mb-24 mt-16 py-3 opacity-75 cursor-not-allowed bg-blue-700 w-full md:w-1/5 text-center text-white font-semi-bold font-aeries") Reimburse more than $0
    
        div(v-if="reimbursementGrandTotal > 0")
          h1.text-subhead.font-bold.font-aeries.leading-tight.mt-6.pb-2 Before you submit, please briefly explain the business purpose of the expense.
          textarea(placeholder="Type here..." class="w-full font-aeries text-subhead font-bold leading-tight block bg-neutral-500 p-3 h-24")
          a(@click="submitRequest()" class="cursor-pointer block mb-24 mt-16 py-3 bg-blue-700 md:w-1/5 text-center text-white font-semi-bold font-aeries") Submit


  main(v-if="selectedPage == 'done'")
    section
      div.container
        h1.text-display.font-bold.font-aeries.pt-12 Reimbursement request submitted
        p.text-subhead.mb-8 It will be reviewed soon for approval. If you have any questions about your request, please contact the HR manager.
        
</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
      selectedPage : "home",
        reimbursementTypes: {
          mileage: {isActive: false},
          lodging: {isActive: false},
          airfare: {isActive: false},
          meals: {isActive: false},
          other: {isActive: false}
        },
        reimbursement: {
          mileage: [
            {
              date: "",
              startingLocation : "",
              endDestination: "",
              milesDriven: 0
            }
            ],
          lodging: [
            {
              date: "",
              location: "",
              nights: 0,
              nightlyRate: 0
            }
          ],
          airfare: [
            {
              dateOfDeparture: "",
              dateOfReturn: "",
              airline: "",
              totalAirfare: 0
            }
          ],
          meals: [
            {
              date: "",
              location: "",
              totalCost: 0
            }
          ],
          other: [
            {
              date: "",
              description: "",
              totalCost: 0,

            }
          ]
        },
        currentUser : "",
        currentDate : new Date().toISOString().substr(0, 10)
    }
  },
computed : {
  mileageTotal() {
    var total = 0;
    for (var i = 0; i < this.reimbursement.mileage.length; i++) {
        
        if (this.reimbursement.mileage[i].milesDriven !== 0) {
          total += parseFloat(this.reimbursement.mileage[i].milesDriven);
        }
    }
    if (isNaN(total)) {
      total = 0
    }

    return (total * this.reimbursementRate).toFixed(2);
  },
  lodgingTotal() {
    var total = 0;
    for (var i = 0; i < this.reimbursement.lodging.length; i++) {
      var nights = parseFloat(this.reimbursement.lodging[i].nights);
      var nightlyRate = parseFloat(this.reimbursement.lodging[i].nightlyRate);
      console.log(nights, nightlyRate)
        total += (nights * nightlyRate)
    }
    if (isNaN(total)) {
      total = 0
    }
    return total.toFixed(2);
  },
  airfareTotal() {
    var total = 0;
    for (var i = 0; i < this.reimbursement.airfare.length; i++) {
  total += parseFloat(this.reimbursement.airfare[i].totalAirfare);
    }
    if (isNaN(total)) {
      total = 0
    }
    return total.toFixed(2);
  },
  mealsTotal() {
    var total = 0;
    for (var i = 0; i < this.reimbursement.meals.length; i++) {
  total += parseFloat(this.reimbursement.meals[i].totalCost);
    }
    if (isNaN(total)) {
      total = 0
    }
    return total.toFixed(2);
  },
  otherTotal() {
    var total = 0;
    for (var i = 0; i < this.reimbursement.other.length; i++) {
  total += parseFloat(this.reimbursement.other[i].totalCost);
    }
    if (isNaN(total)) {
      total = 0
    }
    return total.toFixed(2);
  },
  reimbursementGrandTotal() {
    return (parseFloat(this.mileageTotal) + parseFloat(this.lodgingTotal) + parseFloat(this.airfareTotal) + parseFloat(this.mealsTotal) + parseFloat(this.otherTotal)).toFixed(2)
  },
  reimbursementRate() {
    return 0.575;
  },
  atLeastOneTypeIsSelected() {
    var types = Object.keys(this.reimbursementTypes)
    var selected = false;

    for (var i = 0; i < types.length; i++) {
      if (this.reimbursementTypes[types[i]].isActive == true) {
        selected = true;
      }
    }
    if (selected) {
      return true;
    } else {
      return false;
    }
  }
},
methods : {
submitRequest() {
  if (confirm("Submit reimbursement request?")) {
  var payload = {
    currentUser : this.currentUser,
    currentDate : this.currentDate,
    reimbursementRequest: this.reimbursement,
    reimbursementTotals: {
      mileageTotal: this.mileageTotal,
      lodgingTotal: this.lodgingTotal,
      airfareTotal: this.airfareTotal,
      mealsTotal: this.mealsTotal,
      otherTotal: this.otherTotal,
      reimbursementGrandTotal: this.reimbursementGrandTotal
    }
  }


  var thisScope = this;
  axios.post('/api/submit-reimbursement-request', payload)
            .then(function (response) {
                console.log(response);
                thisScope.selectedPage = "done";
            })
            .catch(function (error) {
                alert("An error occurred. Your request has not been submitted.")
                console.log(error);
            });
  }
},
removeItem: function (index, type) {
    if (confirm("Remove item?")) {
      this.reimbursement[type].splice(index, 1);
    }
},
toggleActive : function(reimbursement) {
  this.reimbursementTypes[reimbursement].isActive = !this.reimbursementTypes[reimbursement].isActive;
},
addNewReimbursementRow(reimbursement) {
  var reimbursementTemplates = {
          mileage: [
            {
              date: "",
              startingLocation : "",
              endDestination: "",
              milesDriven: 0
            }
            ],
          lodging: [
            {
              date: "",
              location: "",
              nights: 0,
              nightlyRate: 0
            }
          ],
          airfare: [
            {
              dateOfDeparture: "",
              dateOfReturn: "",
              airline: "",
              totalAirfare: 0
            }
          ],
          meals: [
            {
              date: "",
              location: "",
              totalCost: 0
            }
          ],
          other: [
            {
              date: "",
              description: "",
              totalCost: 0
            }
          ]
        }

this.reimbursement[reimbursement].push(reimbursementTemplates[reimbursement][0]);

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
async mounted () {
    var me = this.getCookie('me');
    if (me) {
        this.currentUser = me;
    }
},

}
</script>
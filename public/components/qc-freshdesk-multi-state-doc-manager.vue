<template lang="pug">
div(class="px-2")
  main

    section
      div.container.flex.flex-col.pt-12
        img(src="/images/logo-freshdesk.svg" class="w-16")
        h1.text-xx-large.font-bold.font-aeries Freshdesk
        div(class="w-3/5")
          h2.text-title.font-bold.font-aeries Multi-state document manager
          p.text-minimum-text.mb-4 This tool allows you to find a category, folder, or article on our Freshdesk instance and flag it as state-specific content. This is used for example to get California state reporting documentation out of the way of Texas users browsing the support site.
          p.mb-8
            a.text-blue-700 Don’t know what this is? Learn more ›
    
    section
      div.container.flex.flex-col
        div(class="w-3/5")
          h2.text-title.font-bold.font-aeries.mb-4 Search for...
          .tab-row(class="flex flex-row")
            .tab(v-for="item in searchableItems" @click="activeItem = item" v-bind:class="{'border-neutral-1400 font-bold' : activeItem == item}" class="px-6 py-3 border-b-4 text-center border-neutral-600 hover:bg-neutral-500 cursor-pointer") 
              | {{item}}

    section(v-if="activeItem == 'Categories'")
      div.container.mt-6
          div(class="w-full flex flex-col md:w-4/5 mb-6 mr-12")
            h1.text-xx-large.font-bold.font-aeries.text-neutral-600.mb-8 Showing solution categories
            .categories
              .category(v-for="category in categoryResults")
                div(class="flex flex-row")
                  div(class="w-4/5")
                    p.category-id.text-neutral-1200.text-minimum-text {{category.id}}
                    h1.name.text-display.font-bold.font-aeries.leading-tight {{category.name}}
                    p.description.pb-2(v-if="category.description") {{category.description}}
                    p.no-description(v-else).text-neutral-1200.pb-2 No description provided
                    p.created-modified.text-neutral-1000.text-minimum-text Created {{getDate(category.created_at)}}  #[span.px-2 •]  Last updated {{getDate(category.updated_at)}}
                  div(class="w-1/5 flex flex-col align-center justify-center contents-center content-center")
                    select(v-on:change="updateState(category, 'Categories', $event)" v-bind:value="getItemState(category.id.toString(), 'Categories')").font-aeries.font-bold.text-subhead.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1
                      option.font-bold(
                        v-for="region in selectableRegions"
                        ) {{region}}
                .divider.container.border-b-2.border-neutral-500.mt-6.mb-8

    section(v-if="activeItem == 'Folders'")
      div.container.flex.flex-col.mt-8
          h2.text-title.font-bold.font-aeries.mb-4 See folders by category
          div(class="w-2/6 flex flex-col align-center justify-center contents-center content-center")
            select(v-on:change="fetchCategoryFolders()" v-model="folderCategory").font-aeries.font-bold.text-subhead.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1
              option(value="" disabled selected) Select category...
              option.font-bold(
                v-for="category in categoryResults"
                ) {{category.name}}

          div(v-if="folderCategory" class="w-full flex flex-col md:w-4/5 my-6 mr-12")
            h1.text-xx-large.font-bold.font-aeries.text-neutral-600 Showing folders in the category:
            h1.text-title.font-bold.font-aeries.text-neutral-600.mb-8 {{folderCategory}}
            .categories
              .category(v-for="folder in folderResults")
                div(class="flex flex-row")
                  div(class="w-4/5")
                    p.category-id.text-neutral-1200.text-minimum-text {{folder.id}}
                    h1.name.text-display.font-bold.font-aeries.leading-tight {{folder.name}}
                    p.description.pb-2(v-if="folder.description") {{folder.description}}
                    p.no-description(v-else).text-neutral-1200.pb-2 No description provided
                    p.created-modified.text-neutral-1000.text-minimum-text Created {{getDate(folder.created_at)}}  #[span.px-2 •]  Last updated {{getDate(folder.updated_at)}}
                  div(class="w-1/5 flex flex-col align-center justify-center contents-center content-center")
                    select(v-on:change="updateState(folder, 'Categories', $event)" v-bind:value="getItemState(folder.id.toString(), 'Categories')").font-aeries.font-bold.text-subhead.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1
                      option.font-bold(
                        v-for="region in selectableRegions"
                        ) {{region}}
                .divider.container.border-b-2.border-neutral-500.mt-6.mb-8



    section(v-if="activeItem == 'Articles'")
      div.container.flex.flex-col.mt-8
          h2.text-title.font-bold.font-aeries Find articles by folder
          .flex.flex-row.mt-4
            div(class="w-2/6 flex flex-col align-center justify-center contents-center content-center")
              h2.text-subhead.font-bold.font-aeries.pb-2 Category
              select(v-on:change="fetchArticleCategoryFolders()" v-model="articleFolderCategory").font-aeries.font-bold.text-subhead.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1
                option(value="" disabled selected) Select category...
                option.font-bold(
                  v-for="category in categoryResults"
                  ) {{category.name}}
            
            div(v-if="articleFolderResults.length" class="w-2/6 flex flex-col align-center justify-center contents-center content-center ml-4")
              h2.text-subhead.font-bold.font-aeries.pb-2 Folder
              select(v-on:change="fetchFolderArticles()" v-model="articleFolder").font-aeries.font-bold.text-subhead.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1
                option(value="" disabled selected) Select folder...
                option.font-bold(
                  v-for="category in articleFolderResults"
                  ) {{category.name}}
          
          div(v-if="articleFolderCategory" class="w-full flex flex-col md:w-4/5 my-6 mr-12")
            h1.text-xx-large.font-bold.font-aeries.text-neutral-600 Showing articles in the folder:
            h1.text-title.font-bold.font-aeries.text-neutral-600.mb-8 {{articleFolder}}
            
            .articles
              .article(v-for="article in articleResults")
                div(class="flex flex-row")
                  div(class="w-4/5")
                    p.category-id.text-neutral-1200.text-minimum-text {{article.id}}
                    h1.name.text-display.font-bold.font-aeries.leading-tight {{article.title}}
                    p.description.pb-2(v-if="article.description") {{article.description_text | truncate( 150, '...')}}
                    p.no-description(v-else).text-neutral-1200.pb-2 No description provided
                    p.created-modified.text-neutral-1000.text-minimum-text Created {{getDate(article.created_at)}}  #[span.px-2 •]  Last updated {{getDate(article.updated_at)}}
                  div(class="w-1/5 flex flex-col align-center justify-center contents-center content-center")
                    select(v-on:change="updateState(article, 'Articles', $event)" v-bind:value="getItemState(article.id.toString(), 'Articles')").font-aeries.font-bold.text-subhead.leading-tight.inline-block.bg-neutral-500.p-2.py-2.mb-1
                      option.font-bold(
                        v-for="region in selectableRegions"
                        ) {{region}}

                .divider.container.border-b-2.border-neutral-500.mt-6.mb-8

      //- div.container.flex.flex-col.mt-8
      //-     div(class="w-full flex md:w-3/5 mb-6 mr-12")
      //-       input.h-12(v-model="searchString" class="w-full font-aeries text-title font-bold leading-tight block bg-neutral-500 p-3 py-2" placeholder="Search for an article")
      //-       a(style="background: #25c16f;" class="cursor-pointer p-2 px-4 pt-3 bg-blue-700 text-center text-white font-semi-bold font-aeries ml-3") Search

</template>

<script>
const axios = require('axios');
const request = require('request');

module.exports = {
data() {
    return {
        articleFolderCategory: "",
        articleFolder: "",
        folderCategory: "",
        activeItem : "Categories",
        searchableItems: [
          "Categories",
          "Folders",
          "Articles"
        ],
        selectableRegions: [
          "Texas",
          "California",
          "Not set"
        ],
        searchString: "",
        currentUser : "",
        categoryResults: [], // Store the categories for display in the "Categories" tab
        folderResults: [], // Store the folders for display in the "Folders" tab
        articleFolderResults: [], // Store the folders for display in the "Articles" tab
        articleResults: [], //Store the articles for display in the "Articles" tab
        feathersPayload: []
    }
  },
computed : {
},
filters: {
        truncate: function (text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
  },
methods : {
  fetchCategoryFolders(name) {
    var category = this.getCategoryFromName(name);

    var thisScope = this;

    var apiKey = "l5unWs67Dy4KdmY836C",
  password = "x",
  url = "https://aeriessis.freshdesk.com/api/v2/solutions/categories/"+category.id+"/folders",
  auth = "Basic " + new Buffer(apiKey + ":" + password).toString("base64");
request(
  {
    url: url,
    json: true,
    method: 'GET',
    headers: {
      "Authorization": auth,
      "Content-Type": "application/json"
    }
  },
  function (error, response, body) {
    thisScope.folderResults = body;

  })
  },
  fetchArticleCategoryFolders(name) {
    var category = this.getArticleCategoryFromName(name);

    var thisScope = this;

    var apiKey = "l5unWs67Dy4KdmY836C",
  password = "x",
  url = "https://aeriessis.freshdesk.com/api/v2/solutions/categories/"+category.id+"/folders",
  auth = "Basic " + new Buffer(apiKey + ":" + password).toString("base64");
request(
  {
    url: url,
    json: true,
    method: 'GET',
    headers: {
      "Authorization": auth,
      "Content-Type": "application/json"
    }
  },
  function (error, response, body) {
    thisScope.articleFolderResults = body;

  })
  },
    fetchFolderArticles(name) {
    //When the user selects a folder in the "Articles" tab, show the results.
    var folder = this.getFolderFromName();

    var thisScope = this;

  var apiKey = "l5unWs67Dy4KdmY836C",
  password = "x",
  url = "https://aeriessis.freshdesk.com/api/v2/solutions/folders/"+folder.id+"/articles",
  auth = "Basic " + new Buffer(apiKey + ":" + password).toString("base64");
request(
  {
    url: url,
    json: true,
    method: 'GET',
    headers: {
      "Authorization": auth,
      "Content-Type": "application/json"
    }
  },
  function (error, response, body) {
    console.log(error, body)
    thisScope.articleResults = body;

  })
  },
  getCategoryFromName() {
    //Utility function to loop through the data.
    //User is in the "Folders" tab, filtering down to a specific folder category.
    var category = false;

    for (var i = 0; i < this.categoryResults.length; i++) {
      if (this.categoryResults[i].name == this.folderCategory) {
        category = this.categoryResults[i];
      }
    }
    if (category) {
      return category;
    }
  },
  getArticleCategoryFromName() {
    //Utility function to loop through the data.
    //User is in the "Article" tab, filtering down to a specific category.
    var category = false;

    for (var i = 0; i < this.categoryResults.length; i++) {
      if (this.categoryResults[i].name == this.articleFolderCategory) {
        category = this.categoryResults[i];
      }
    }
    if (category) {
      return category;
    }
  },
  getFolderFromName() {
    //User is in the "Article" tab, filtering down to a specific folder.
    var folder = false;

    for (var i = 0; i < this.articleFolderResults.length; i++) {
      if (this.articleFolderResults[i].name == this.articleFolder) {
        folder = this.articleFolderResults[i];
      }
    }
    if (folder) {
      return folder;
    }
  },
  
  updateState(element, type, event) {
    var thisScope = this;
    var formerState = this.getItemState(element.id.toString(), type)

    var itemHadState = this.itemHasState(element.id.toString(), type)
    console.log(itemHadState, event.target.value) 

    if (event.target.value == "Not set") {
        //delete
                  request(
      {
        url: "https://aeries.services/freshdesk-article-states/" + element.id,
        json: true,
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      },
      function (error, response, body) {
        console.log(body);
        thisScope.refreshFeathersPayload() 
      })
      } else if (itemHadState == true) {
          request(
      {
        url: "https://aeries.services/freshdesk-article-states/" + element.id,
        json: true,
        method: 'PUT',
        body: {"type" : type, "state" : event.target.value},
        headers: {
          "Content-Type": "application/json"
        }
      },
      function (error, response, body) {
        console.log(body);
        thisScope.refreshFeathersPayload() 
      })

    } else {
      //If a state was already set, create a PUT request to overwrite
          request(
      {
        url: "https://aeries.services/freshdesk-article-states/",
        json: true,
        method: 'POST',
        body: {"type" : type, "state" : event.target.value, "_id" : element.id.toString()},
        headers: {
          "Content-Type": "application/json"
        }
      },
      function (error, response, body) {
        console.log(body);
        thisScope.refreshFeathersPayload() 
      })
          
    }

    //As long as there wasn't a state already set, create a post request.
    


  },
  getDate(date) {
    return new Date(date).toLocaleDateString();
  },
getItemState(id, type) {
  
  var itemsWithState = this.feathersPayload;
  var itemState = false;

  for (var i = 0; i < itemsWithState.length; i++) {
    if (id == itemsWithState[i]._id && type == itemsWithState[i].type) {
      itemState = itemsWithState[i];
    }
  }
  if (itemState == false) {
    return "Not set";
  } else {
    return itemState.state;
  }
  
},
refreshFeathersPayload() {
  var thisScope = this;
request(
{
  url: "https://aeries.services/freshdesk-article-states?$limit",
  json: true,
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  }
},
function (error, response, body) {
  thisScope.feathersPayload = body.data;
      console.log(body);
})
},
refreshFreshdeskPayload() {
var thisScope = this;

    var apiKey = "l5unWs67Dy4KdmY836C",
  password = "x",
  url = "https://aeriessis.freshdesk.com/api/v2/solutions/categories",
  auth = "Basic " + new Buffer(apiKey + ":" + password).toString("base64");
request(
  {
    url: url,
    json: true,
    method: 'GET',
    headers: {
      "Authorization": auth,
      "Content-Type": "application/json"
    }
  },
  function (error, response, body) {
    thisScope.categoryResults = body;

  })

},
itemHasState(id, type) {
  
  var itemsWithState = this.feathersPayload;
  var itemState = false;

  for (var i = 0; i < itemsWithState.length; i++) {
    if (id == itemsWithState[i]._id && type == itemsWithState[i].type) {
      itemState = itemsWithState[i];
    }
  }
  if (itemState == false) {
    return false;
  } else {
    return true;
  }
  
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

  this.refreshFeathersPayload();
  this.refreshFreshdeskPayload()
},

}
</script>
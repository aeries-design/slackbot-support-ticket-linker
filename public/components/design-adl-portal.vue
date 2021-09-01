<style scoped>
.categoryBadge {
    bottom: 52px;
    left: 12px;
    position: relative;
    border: 2px solid white;
    border-radius: 6px;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 8em;
  height: 8em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(210, 210, 210, 0.5);
  border-right: 1.1em solid rgba(210, 210, 210, 0.5);
  border-bottom: 1.1em solid rgba(210, 210, 210, 0.5);
  border-left: 1.1em solid #BE202E;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}



</style>

<style>
.confluenceDocumentation p {
      margin-bottom: 12px;
}

.confluenceDocumentation a {
      color: blue;
}

.confluenceDocumentation h1,
.confluenceDocumentation h2,
.confluenceDocumentation h3,
.confluenceDocumentation h4,
.confluenceDocumentation h5 {
      font-family: "Aeries Sans";
      font-weight: bold;
      margin-top: 18px;
      margin-bottom: 14px;
}

.confluenceDocumentation h1 {
  font-size: 24px;
}

.confluenceDocumentation ul {
    list-style: disc;
}

.confluenceDocumentation ul > li {
    margin-left: 30px;
}
</style>

<template lang="pug">
main
  section
    div.container.flex.flex-col
      h1.text-display.font-bold.font-aeries.pt-12 Aeries Design Language Portal
      p.text-subhead.mb-8 Everything you need to jump-start your projects!
      
  section
    div.container.flex
      
      div.sidebar(class="w-1/4 flex")
        div(class="pr-8")
          .search.mb-2
            input(placeholder="Find assets..." class="h-12 w-full leading-tight block bg-white rounded border-1 border-neutral-1600 p-3 py-2")
          .categories
            .sidebarLink(v-for="link in categories")
              .sidebarLinkItem(v-if="link.disabled" title="Category not yet complete" class="py-2 px-5 hover:bg-neutral-500 cursor-not-allowed opacity-25" :class="{'font-bold bg-neutral-500' : selectedCategory == link.id}")
                span {{link.title}}
              .sidebarLinkItem(v-else @click="selectCategory(link.id)" class="py-2 px-5 cursor-pointer hover:font-bold hover:bg-neutral-500" :class="{'font-bold bg-neutral-500' : selectedCategory == link.id}")
                span {{link.title}}
            
            .sidebarLink(class="py-2 px-5 font-bold cursor-pointer hover:font-bold hover:bg-neutral-500")
              span + Request a new resource
          hr(class="mx-5 my-2 border-neutral-600")
          img(src="/images/adl-aeries-plug.png" class="p-5" title="Let's start designing!")

      
      div.selectedResourceScreen(v-if="resourceIsSelected == true" class="w-3/4 flex-row")
        .headerSection(class="w-full flex flex-col")
          .flex
            div(class="w-3/5 md:pr-8")
              img(src="/images/pencils.svg" class="pb-1")
              h1.text-title.font-bold.font-aeries.self-start.pb-2.pt-4 {{selectedResource.title}}
              p.text-neutral-1200.text-minimum-text {{selectedResource.description}}
              .buttons
                .button.block(v-for="button in selectedResource.buttons")
                  a(target="_blank" :href="button.href" class="bg-blue px-4 py-2 rounded shadow inline-block text-white mt-4") {{button.text}}
            div(class="w-2/5")
              img(:src="'/images/'+selectedResource.headerImage+'.png'" class="pb-1")
          
          hr.my-6.opacity-25.pb-4.mt-16
          
          .flex.confluenceDocumentation.block
            .loader(v-if="!selectedConfluencePage.body") Loading...
            .documentationContainer(v-if="selectedConfluencePage.body" v-html="selectedConfluencePage.body.view.value")
            
          
          .iconBank(v-if="selectedResource.id == 'icon-bank'")
            hr.my-6.opacity-25.pb-4.mt-24.mb-20
            .illustrations
              .illustration(v-for="image in iconBank" v-if="image.figmaImageURL" class="w-1/6 inline-block p-4 cursor-pointer hover:bg-neutral-500")
                img(:src="image.figmaImageURL" class="m-auto")
                p.text-center.text-minimum-text.pt-2.font-bold {{image.name}}

          .illustrationBank(v-if="selectedResource.id == 'illustration-bank'")
            hr.my-6.opacity-25.pb-4.mt-24.mb-20
            .illustrations
              .illustration(v-for="image in illustrationBank" v-if="image.figmaImageURL" class="w-1/3 inline-block p-5")
                img(:src="image.figmaImageURL")
                p.text-center.text-minimum-text.pt-2.font-bold {{image.name}}
          
          .requestResourceEdit(class="block mb-12")
            hr.my-6.opacity-25.pb-4
            h1.text-display.font-bold.font-aeries.leading-none.text-neutral-1600 Not what you were hoping for?
            .solutions-type.text-minimum-text.text-neutral-1300.font-semi-bold.pt-2(class='md:text-base')
              | If the design team can modify this resource or create a new one for you, don't hesitate to let us know.
            .solutions-link-button.mt-6
              a.inline.border-2.border-red-700.text-red-700.rounded.px-4.py-1.font-bold(:href='"/design/adl/request-new-resource?ref=" + selectedResource.id') Request resource            

      div.catalog(v-if="resourceIsSelected == false" class="w-3/4 flex-row")
        .headerSection(v-if="selectedCategory == 'featured'" class="w-full bg-white p-2 rounded-sm shadow-sm flex flex-col")
          .dashed-border-box.border-2.border-dashed.p-8.border-blue-100.flex
            div(class="w-3/5 md:pr-8")
              img(src="/images/pencils.svg" class="pb-1")
              h1.text-title.font-bold.font-aeries.self-start.pb-2.pt-4 Assets and templates for Eagles
              p.text-neutral-1200.text-minimum-text No more starting from scratch. Grab a blueprint for success with tried-and-true templates from the Aeries Design team. Copy, customize, and bring your ideas to life in no time!
            div(class="w-2/5")
              img(src="/images/adl-header-splash.png" class="pb-1")
              
        .featuredCategorySection.flex.flex-col(v-if="selectedCategory == 'featured'")
          h1.text-subhead.font-bold.font-aeries.self-start.pt-4.my-4 Featured categories
          .categories.flex.flex-row
            .category(v-for="category in categories" @click="selectCategory(category.id)" class="pr-4 w-32 cursor-pointer" :class="{'cursor-not-allowed opacity-25' : category.disabled}" v-if="isFeaturedCategory(category)")
              img(:src="'/images/adl-category-' + category.id + '.png'" class="shadow-md")
              p.text-center.text-minimum-text.text-neutral-1500.pt-3 {{category.title}}

        .resourcesSection.flex.flex-col
          h1.text-subhead.font-bold.font-aeries.self-start.pt-4.my-4(v-if="selectedCategory == 'featured'") Featured resources
          h1.text-subhead.font-bold.font-aeries.self-start.pt-4.my-4(v-else) {{getCategoryByID(selectedCategory).title}}
          .resources
            .resource(v-for="resource in selectedCategoryResources" @click="selectResource(resource)" :class="{'opacity-25 cursor-not-allowed' : resource.disabled}" class="md:pr-4 mb-6 w-full md:w-1/3 inline-block cursor-pointer")
              img(:src="'/images/'+resource.headerImage+'.png'" class="mb-4 rounded-sm shadow")
              .absolute
                img(:src="'/images/adl-category-' + resource.category + '.png'" :title="resource.category" class="categoryBadge shadow w-12 h-12")
              .title.pt-2 {{resource.title}}
              .author.text-neutral-1000.text-minimum-text.pt-1 {{resource.author}}
              .description.text-minimum-text.pt-2 {{resource.description}}
          
          div(v-if="selectedCategory !== 'featured'")
            hr.my-6.opacity-25.pb-4
            h1.text-display.font-bold.font-aeries.leading-none.text-neutral-1600 Not finding it?
            .solutions-type.text-minimum-text.text-neutral-1300.font-semi-bold.pt-2(class='md:text-base')
              | Let the design team know if there's something useful we can create for you.
            .solutions-link-button.mt-6
              a.inline.border-2.border-red-700.text-red-700.rounded.px-4.py-1.font-bold(href='/design/adl/request-new-resource') Request a new resource


        .whatsADLSection(v-if="selectedCategory == 'featured'")
          .flex.my-8
            div(class="w-3/5 self-center mt-4")
              h1.text-title.font-bold.font-aeries.self-start.pb-4 What’s “ADL”?
              p.text-neutral-1200 ADL is short for “Aeries Design Language”, and it’s how we refer to all the assets, guidelines and principles that make up the Aeries brand. Not just graphics, but words, tone, templates, best practices, and more.
              p.mt-4
                a(class="text-neutral-800" target="_blank" href="https://docs.aeries.works/display/CD/Aeries+Design+Language") Learn more
            div(class="w-2/5")
              img(src="/images/building-aeries-cloud.png" class="p-6")

</template>

<script>
const axios = require('axios');

module.exports = {
data() {
    return {
        currentUser : "",
        slackUsers: [],
        selectedResource: {},
        selectedConfluencePage: {},
        resourceIsSelected : false,
        illustrationBank: [],
        iconBank: [],
        selectedCategory: "featured",
        illustrationURLs: [
          {
          figmaImageURL: "",
          id: "",
          name: ""}
        ],
        iconURLs: [
          {
          figmaImageURL: "",
          id: "",
          name: ""}
        ],
        featuredCategories: [
          "marketing",
          "style-guides",
          "icons-illustrations",
          "component-blocks",
          "slide-decks",
          "prototypes",
          "email-templates"
        ],
        categories : [
          {title: "Featured", id : "featured"},
          {title: "Marketing", id : "marketing", disabled: true},
          {title: "Style Guides", id : "style-guides"},
          {title: "Icons / Illustrations", id : "icons-illustrations", disabled: false},
          {title: "Component Blocks", id : "component-blocks", disabled: true},
          {title: "Slide Decks", id : "slide-decks"},
          {title: "Prototypes", id : "prototypes", disabled: true},
          {title: "Email Templates", id : "email-templates", disabled: true},
          {title: "Brand Kit", id : "brand-kit", disabled: true},
          {title: "Stock Photos", id : "stock-photos", disabled: true},
          {title: "Stock Music", id : "stock-music", disabled: true},
          {title: "Fonts", id : "fonts", disabled: true},
          {title: "Motion Graphics", id : "motion-graphics", disabled: true},
        ],
        resources : [
          {
            title  : "ADL 1.0 marketing style guide",
            disabled: false,
            href: "https://docs.aeries.works/display/CD/Aeries+Design+Language",
            category: "style-guides",
            author : "Aeries Design Team",
            id : "marketing-style-guide",
            headerImage : "marketing-style-guide",
            confluencePageID : '41689874',
            description : "The principles and guidelines to follow when representing Aeries in marketing."
          },
          {
            title  : "Logos and brand kit",
            disabled: false,
            href: "",
            category: "brand-kit",
            author : "Aeries Design Team",
            id : "logos-brand-kit",
            headerImage : "logos-brand-kit",
            confluencePageID : '55542125',
            description : "Logos, brandmarks, and other assets you can provide to clients and partners."
          },
          {
            title  : "ADL 1.0 presentation kit",
            disabled: false,
            buttons: [
              {
                href: "https://aeries-design.s3-us-west-1.amazonaws.com/assets/adl-presentation-kit/Aeries+Slide+Kit.pptx",
                text: "Download presentation kit"
              },
              {
                href: "https://aeriessoftware-my.sharepoint.com/:p:/g/personal/davidc_aeries_com/EbIUJEPD_1FDvfiPHqac43kBom9u9I2kAQJyIoSEhCl8Aw?e=Qjv4Nf",
                text: "Open PowerPoint Online",
              }
            ],
            category: "slide-decks",
            author : "Aeries Design Team",
            id : "presentation-kit",
            headerImage : "presentation-kit",
            confluencePageID : '55542310',
            description : "The official comprenehsive presentation kit to build beautiful on-brand slide decks."
          },
          {
            title  : "ADL 1.0 core email templates",
            disabled: true,
            href: "",
            category: "email-templates",
            author : "Aeries Design Team",
            id : "core-email-templates",
            headerImage : "core-email-templates",
            confluencePageID : '55542125',
            description : "The official lineup of branded email templates for building mass emails."
          },
          {
            title  : "ADL 1.0 core marketing templates",
            disabled: true,
            href: "",
            category: "marketing",
            author : "Aeries Design Team",
            id : "core-marketing-templates",
            headerImage : "core-marketing-templates",
            confluencePageID : '55542125',
            description : "Customizable templates for creating on-brand print marketing assets."
          },
          {
            title  : "ADL 1.0 web content block builder",
            disabled: true,
            href: "",
            category: "component-blocks",
            author : "Aeries Design Team",
            id : "web-content-block-builder",
            headerImage : "web-content-block-builder",
            confluencePageID : '55542125',
            description : "Tools to help you create on-brand web content to be published on aeries.com."
          },
          {
            title  : "Aeries Illustration Bank",
            disabled: false,
            href: "",
            category: "icons-illustrations",
            author : "Aeries Design Team",
            id : "illustration-bank",
            headerImage : "illustration-bank",
            confluencePageID : '55542424',
            description : "Artwork of people, things, and situations related to schools and Aeries."
          },
          {
            title  : "Aeries Icon Bank",
            disabled: false,
            href: "",
            category: "icons-illustrations",
            author : "Aeries Design Team",
            id : "icon-bank",
            headerImage : "icon-bank",
            confluencePageID : '55542422',
            description : "Icons representing people, things, and situations related to schools and Aeries."
          }
        ]
    }
  },
computed : {
  selectedCategoryResources() {
    var resources = [];
    
    if (this.selectedCategory !== "featured") {
    for (var i = 0; i < this.resources.length; i++) {
      if (this.resources[i].category == this.selectedCategory) {
        resources.push(this.resources[i]);
      }
    }
    return resources;
  } else {
    return this.resources;
  }
  }
},
methods : {
    fetchFigmaIllustrationBank() {
    const endpoint = "/files/F6ZBfBCRQChkhw4usAqexC/nodes?ids=2:699";
    var globalScope = this;
    const PERSONAL_ACCESS_TOKEN = '141294-dea76dfc-e666-470e-b99a-582f19f245af';
    return fetch('https://api.figma.com/v1' + endpoint, {
        method: 'GET',
        headers: { "x-figma-token": PERSONAL_ACCESS_TOKEN }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
      // console.log(data);
      var illArr = [];
      var ill = data.nodes["2:699"].document.children;
      for (var i = 0; i < ill.length; i++) {
        illArr.push({id: ill[i].id, name: ill[i].name})
      }
      globalScope.illustrationBank = illArr;
      globalScope.fetchFigmaIllustrationImages()
    }).catch(function (error) {
        return { err: error };
    });
  },
    fetchFigmaIconBank() {
    const endpoint = "/files/7IXqVnpxTBNTw3JjBvaJMu";
    var globalScope = this;
    const PERSONAL_ACCESS_TOKEN = '141294-dea76dfc-e666-470e-b99a-582f19f245af';
    return fetch('https://api.figma.com/v1' + endpoint, {
        method: 'GET',
        headers: { "x-figma-token": PERSONAL_ACCESS_TOKEN }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
      console.log(data);
      
      var iconArr = [];
      var icon = data.document.children[0].children;
      for (var i = 0; i < icon.length; i++) {
        if (icon[i].type == "COMPONENT") { //We only want icons that have been created as components
          iconArr.push({id: icon[i].id, name: icon[i].name})
        }
      }
      console.log(JSON.stringify(iconArr));
      globalScope.iconBank = iconArr;
      globalScope.fetchFigmaIconImages()
    }).catch(function (error) {
        return { err: error };
    });
  },
  fetchFigmaIllustrationImages() {
    
    var idArray = [];
    for (var i = 0; i < 15; i++) {
      idArray.push(this.illustrationBank[i].id);
    }
    const endpoint = "/images/F6ZBfBCRQChkhw4usAqexC?ids=" + idArray.join();
    console.log(endpoint)
    var globalScope = this;
    const PERSONAL_ACCESS_TOKEN = '141294-dea76dfc-e666-470e-b99a-582f19f245af';
    return fetch('https://api.figma.com/v1' + endpoint, {
        method: 'GET',
        headers: { "x-figma-token": PERSONAL_ACCESS_TOKEN }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
      // console.log(data);
      globalScope.illustrationURLs = data.images;
      var urls = data.images;
      var idArray = Object.keys(urls);
      for (var i = 0; i < idArray.length; i++) {

        //Get the Figma node ID and the AWS asset link
        globalScope.addImageURLToIllustration(idArray[i], Object.values(urls)[i])
      }

    }).catch(function (error) {
        return { err: error };
    });
  },
    fetchFigmaIconImages() {
    
    var idArray = [];
    for (var i = 0; i < this.iconBank.length; i++) {
      idArray.push(this.iconBank[i].id);
    }
    const endpoint = "/images/7IXqVnpxTBNTw3JjBvaJMu?scale=2&format=svg&ids=" + idArray.join();
    console.log(endpoint)
    var globalScope = this;
    const PERSONAL_ACCESS_TOKEN = '141294-dea76dfc-e666-470e-b99a-582f19f245af';
    return fetch('https://api.figma.com/v1' + endpoint, {
        method: 'GET',
        headers: { "x-figma-token": PERSONAL_ACCESS_TOKEN }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
      // console.log(data);
      globalScope.iconURLs = data.images;
      var urls = data.images;
      var idArray = Object.keys(urls);
      for (var i = 0; i < idArray.length; i++) {

        //Get the Figma node ID and the AWS asset link
        globalScope.addImageURLToIcon(idArray[i], Object.values(urls)[i])
      }

    }).catch(function (error) {
        return { err: error };
    });
  },
  addImageURLToIllustration(id, imageURL) {
    for (var i = 0; i < this.illustrationBank.length; i++) {
      if (this.illustrationBank[i].id == id) {
        this.illustrationBank[i].figmaImageURL = imageURL;
      }
    }
  },
  addImageURLToIcon(id, imageURL) {
    for (var i = 0; i < this.iconBank.length; i++) {
      if (this.iconBank[i].id == id) {
        this.iconBank[i].figmaImageURL = imageURL;
      }
    }
  },
  fixImageLinksInAPIResponse(bodyViewValue) {
    var string = bodyViewValue;
    var fixSrc = string.replace(/src="\//g, 'src="https://docs.aeries.works/');
    var fixHref = fixSrc.replace(/href="\//g, 'target="_blank" href="https://docs.aeries.works/');
    return fixHref;
  },
  setSelectedConfluencePage(pageID) {
    var globalScope = this;
          axios
      .get('/api/get-confluence-page?id=' + pageID)
      .then(function(response) {
        console.log(response.data)

        //Fix relative download links in API response, make them absolute
        var fixedHTML = globalScope.fixImageLinksInAPIResponse(response.data.body.view.value)
        response.data.body.view.value = fixedHTML;

        globalScope.selectedConfluencePage = response.data;
      })
  },
  selectCategory(categoryID) {
    this.resourceIsSelected = false;
    this.selectedCategory = categoryID
  },
  selectResource(resource) {
    this.selectedResource = resource;
    this.selectedCategory = ""
    this.selectedConfluencePage = "";
    this.resourceIsSelected = true;
    this.setSelectedConfluencePage(resource.confluencePageID) // Set the Confluence page content
  },
  isFeaturedCategory(category) {
    if (this.featuredCategories.includes(category.id)) {
      return true;
    } else {
      return false;
    }
  },
  getCategoryByID(id) {
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == id) {
        return this.categories[i];
      }
    }
  },
},
async mounted () {
  this.fetchFigmaIllustrationBank();
  this.fetchFigmaIconBank();
}

}
</script>
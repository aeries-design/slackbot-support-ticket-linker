<style scoped>
.inputFile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: black;
    display: inline-block;
}

.inputFile:focus + label,
.inputFile + label:hover {
    background-color: red;
}
</style>

<template lang="pug">
div
    meetings-subheader
    section.py-20
        .container.bg-white.shadow-lg.rounded.px-8.pt-6.pb-8.mb-4.flex.flex-col.my-2
            form(id="uploadFields" autocomplete="none")
                .-mx-3.mb-6(class='md:flex')
                    .px-3(class='md:w-1/2')
                        label.block.uppercase.tracking-wide.text-neutral-1400.text-xs.font-bold.mb-2(for='grid-last-name')
                            | Video title
                        input#grid-video-title.appearance-none.block.w-full.bg-neutral-400.text-neutral-1400.border.border-neutral-400.rounded.py-3.px-4(v-model="title" name='new-' autocomplete="none" type='text' placeholder='Add a title that describes your video')
                    .px-3(class='md:w-1/2')
                        label.block.uppercase.tracking-wide.text-neutral-1400.text-xs.font-bold.mb-2(for='grid-last-name')
                            | Video URL
                        input#grid-video-id.appearance-none.block.w-full.text-neutral-1400.border-b.border-neutral-400.py-3(v-model="cookedFormVideoURL" readonly="true" name='new-' autocomplete="none" type='text')
                .-mx-3.mb-6(class='md:flex')
                    .px-3(class='md:w-full')
                        label.block.uppercase.tracking-wide.text-neutral-1400.text-xs.font-bold.mb-2(for='grid-password')
                            | Video description
                        textarea#grid-password.appearance-none.block.w-full.bg-neutral-400.text-neutral-1400.border.border-neutral-400.rounded.py-3.px-4.mb-3(v-model="description" name='new-' autocomplete="none" placeholder='Tell viewers about your video')
            div
                form(action='/api/upload-video' enctype='multipart/form-data' method='post' id="uploadVideo" class="w-full")
                    label.block.uppercase.tracking-wide.text-neutral-1400.text-xs.font-bold.mb-2(for='grid-password')
                        | Upload MP4 video file
                    input(type='file' class="inputFile" id='inputFile' name='file-to-upload' class="border-dashed p-6 border-2 border-neutral-600 cursor-pointer")
                    //- input(type='submit' value='Upload' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right cursor-pointer")
                a(v-on:click="submitUpload" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right cursor-pointer") Upload
</template>

<script>
const axios = require('axios');

module.exports = {
    data() {
        return {
            title: "",
            description: ""
        }
    },
    methods: {
        //TODO: THis should be one function!!!
        submitUpload() {

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/upload-video");
            var thisScope = this;

            xhr.onload = function(event){ 
                thisScope.createVideoRecord()
            }; 
            
            var form = document.getElementById('uploadVideo');
            var fdata = new FormData(form);
            xhr.send(fdata);
        },
        createVideoRecord() {
            var video = {
                videoTitle: this.title,
                videoDescription: this.description,
                videoID: this.cookVideoIDFromTitle
            }

            axios.post('/api/create-video-record', video)
            .then(function (response) {
                console.log(response);
                window.open('/meetings/video/' + video.videoID)
                window.location.href = "/meetings/videos";
            })
            .catch(function (error) {
                alert("Failed to create a video record.")
                console.log(error);
            });

        }
    },
    computed: {
        cookVideoIDFromTitle() {
            var stripSpaces = this.title.replace(/ +/g, '-').toLowerCase();
            var cookedVideoID = stripSpaces.replace(/[^0-9a-zA-Z-]/gi, '');

            return cookedVideoID;
        },
        cookedFormVideoURL() {
            //Logic to control the URL preview (e.g. make it hide when no title is present).
            var finalURL = window.location.host + "/meetings/video/" + this.cookVideoIDFromTitle;
            if (!this.cookVideoIDFromTitle.length) {
                finalURL = "";
            }
            return finalURL;
        }
    }
}
</script>
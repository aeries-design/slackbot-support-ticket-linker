<style scoped>
.flex-container {
  height: 65vh;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
}
</style>

<template lang="pug">
.flex-container
    .container
        .text-center.mx-auto

            div.mb-10
            h1.font-aeries.font-bold.text-display.tracking-tight Not logged in!
            div(class="lg:px-20")
                p To access Aeriesworks, please sign in with your Aeries Slack account.

            div.mb-10
            a(class="inline-flex self-center" :href='slackHref')
                img.mx-auto.text-center(src='https://api.slack.com/img/sign_in_with_slack.png')
</template>

<script>

module.exports = {
data() {
    return {
        slackHref : "https://slack.com/oauth/authorize?scope=identity.basic&client_id=145184726370.964951757061&redirect_uri=https://my.aeries.works" + window.location.pathname
    }
}
}
</script>
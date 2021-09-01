<template lang="pug">
transition(name='modal')
  .modal-mask
    .modal-wrapper.p-8
      .modal-container(style="max-width: 1024px;")
        .text-title.font-aeries.font-bold.flex.justify-between
          slot(name='header')
            | default header
          button.font-bold.modal-default-button(@click="$emit('close')")
              | X
        .modal-body
          slot(name='body')
            | default body
        .modal-footer
          slot(name='footer')
            button.font-bold.modal-default-button(@click="$emit('close')")
              | OK

</template>

<script>

module.exports = {

}
</script>
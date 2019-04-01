<template>
  <div class="error">
    <h2>Oh no! Something went wrong!</h2>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>

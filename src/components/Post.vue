<template>
  <article class="post">
    <h2>{{ post.title }}</h2>
    <p>User {{ post.userId }}</p>
    <p class="content">
      {{ post.body }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post{
  margin:20px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>

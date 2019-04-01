<template>
  <div id="app">
    <loading data-test="loading" v-if="loading"></loading>
    <error-message data-test="error" v-else-if="error" :message="message"></error-message>
    <template v-else>
      <div class="left-side">
        <post v-for="post in getUserPosts"
              :key="post.id"
              :post="post"></post>
      </div>
      <div class="right-side">
        <post v-for="post in getOtherPosts"
              :key="post.id"
              :post="post"></post>
      </div>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import Post from './components/Post';

const {
  mapState: postState,
  mapGetters: postGetters,
  mapActions: postActions,
} = createNamespacedHelpers('posts');

export default {
  name: 'App',
  components: {
    Loading,
    ErrorMessage,
    Post,
  },
  computed: {
    ...postState([
      'loading',
      'message',
      'error',
    ]),
    ...postGetters([
      'getUserPosts',
      'getOtherPosts',
    ]),
  },
  methods: {
    startUp() {
      this.fetchPosts()
        .then(this.handleFetchPostsSuccess)
        .catch(this.handleFetchPostsError);
    },
    ...postActions([
      'fetchPosts',
      'handleFetchPostsSuccess',
      'handleFetchPostsError',
    ]),
  },
  created() {
    this.startUp();
  },
};
</script>

<style>
  #app{
    display:flex;
    flex-flow: row nowrap;
  }
</style>

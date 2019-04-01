import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const DEFAULT_USER = 1;

export default {
  POSTS_URL,
  DEFAULT_USER,
  namespaced: true,
  state: {
    posts: [],
    message: '',
    loading: true,
    error: false,
  },
  getters: {
    getUserPosts(state) {
      return state.posts.filter(e => e.userId === DEFAULT_USER);
    },
    getOtherPosts(state) {
      return state.posts.filter(e => e.userId !== DEFAULT_USER);
    },
  },
  mutations: {
    SET_POSTS(state, payload) {
      state.posts = [...payload];
    },
    SET_MESSAGE(state, payload) {
      state.message = `${payload}`;
    },
    SET_LOADING(state, payload) {
      state.loading = !!payload;
    },
    SET_ERROR(state, payload) {
      state.error = !!payload;
    },
  },
  actions: {
    fetchPosts({ commit }) {
      commit('SET_LOADING', true);
      return axios.get(POSTS_URL);
    },
    handleFetchPostsSuccess({ commit }, response) {
      commit('SET_POSTS', response.data);
      commit('SET_LOADING', false);
      return Promise.resolve(response);
    },
    handleFetchPostsError({ commit }, response) {
      commit('SET_MESSAGE', response.message);
      commit('SET_ERROR', true);
      commit('SET_LOADING', false);
      return Promise.reject(response);
    },
  },
};

import Vue from 'vue';
import Vuex from 'vuex';
import App from '@/App';
import store from '@/store';
import axios from 'axios';
import sinon from 'sinon';

Vue.use(Vuex);

describe('App.vue', () => {
  let vm;

  beforeEach(() => {
    App.store = store;
    sinon.spy(axios, 'get');
    const Constructor = Vue.extend(App);
    vm = new Constructor().$mount();
  });
  afterEach(() => {
    axios.get.restore();
    store.commit('posts/SET_POSTS', []);
    store.commit('posts/SET_MESSAGE', '');
    store.commit('posts/SET_LOADING', true);
    store.commit('posts/SET_ERROR', false);
  });

  describe('root component', () => {
    it('should have id of app', () => {
      expect(vm.$el.id).to.equal('app');
    });
    it('should display a loading component by default', () => {
      expect(vm.$el.querySelectorAll('[data-test="loading"]'))
        .to.be.lengthOf(1);
    });
  });
});

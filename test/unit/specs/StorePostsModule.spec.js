import posts from '@/store/modules/posts';
import sinon from 'sinon';
import axios from 'axios';


describe('@/store/modules/posts', () => {
  it('should be namespaced', () => {
    expect(posts.namespaced).to.be.a('boolean').equal(true);
  });
  describe('default state', () => {
    it('should have an empty array called posts', () => {
      expect(posts.state.posts).to.be.a('array')
        .with.lengthOf(0);
    });
    it('should have a string called message', () => {
      expect(posts.state.message).to.be.a('string')
        .with.lengthOf(0);
    });
    it('should have a boolean called loading', () => {
      expect(posts.state.loading).to.be.a('boolean').equal(true);
    });
    it('should have a boolean called error', () => {
      expect(posts.state.error).to.be.a('boolean').equal(false);
    });
  });

  describe('getters', () => {
    let state = {};
    beforeEach(() => {
      state = {
        ...posts.state,
      };
      state.posts = [];
      state.posts.push({ userId: 1 });
      state.posts.push({ userId: 2 });
      state.posts.push({ userId: 2 });
      state.posts.push({ userId: 3 });
    });
    afterEach(() => {
      state = {};
      posts.state.posts = [];
    });
    describe('getUserPosts', () => {
      it('should return only posts with userId: 1', () => {
        const userPosts = posts.getters.getUserPosts(state);
        expect(userPosts)
          .to.be.a('array')
          .lengthOf(1);
        expect(userPosts[0].userId).to.equal(1);
      });
    });
    describe('getOtherPosts', () => {
      it('should return posts that do not have userId: 1', () => {
        const otherPosts = posts.getters.getOtherPosts(state);
        expect(otherPosts)
          .to.be.a('array')
          .lengthOf(3);
        expect(otherPosts[0].userId).to.equal(2);
        expect(otherPosts[1].userId).to.equal(2);
        expect(otherPosts[2].userId).to.equal(3);
      });
    });
  });

  describe('mutations', () => {
    describe('SET_POSTS', () => {
      it('should set state.posts to an array', () => {
        const state = {
          posts: [],
        };
        const payload = [1, 2, 3, 4, 5];
        posts.mutations.SET_POSTS(state, payload);
        expect(state.posts).to.deep.equal(payload);
      });
    });
    describe('SET_MESSAGE', () => {
      it('should set state.message to a string', () => {
        const state = {
          message: '',
        };
        const payload = 'Testing';
        posts.mutations.SET_MESSAGE(state, payload);
        expect(state.message).to.equal(payload);
      });
    });
    describe('SET_LOADING', () => {
      it('should set state.loading to a boolean', () => {
        const state = {
          loading: true,
        };
        const payload = false;
        posts.mutations.SET_LOADING(state, payload);
        expect(state.loading).to.equal(payload);
      });
    });
    describe('SET_ERROR', () => {
      it('should set state.error to a boolean', () => {
        const state = {
          error: false,
        };
        const payload = true;
        posts.mutations.SET_ERROR(state, payload);
        expect(state.error).to.equal(payload);
      });
    });
  });
  describe('actions', () => {
    const context = {
      commit: (mut, pl) => [mut, pl],
      dispatch: (act, pl) => [act, pl],
    };
    beforeEach(() => {
      sinon.spy(axios, 'get');
      sinon.spy(context, 'commit');
      sinon.spy(context, 'dispatch');
    });
    afterEach(() => {
      axios.get.restore();
      context.commit.restore();
      context.dispatch.restore();
    });

    describe('handleFetchPostsSuccess', () => {
      const response = {
        data: ['data'],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {},
      };
      it('should commit data to SET_POSTS', () => {
        posts.actions.handleFetchPostsSuccess(context, response);
        expect(context.commit.calledWith('SET_POSTS', response.data))
          .to.be.equal(true);
        expect(context.commit.calledWith('SET_LOADING', false))
          .to.be.equal(true);
      });
    });
    describe('handleFetchPostsError', () => {
      const response = {
        message: 'Error!',
        status: 404,
        statusText: 'NOT FOUND',
        headers: {},
        config: {},
        request: {},
      };
      it('should commit message to SET_MESSAGE', () => {
        posts.actions.handleFetchPostsError(context, response);
        expect(context.commit.calledWith('SET_MESSAGE', response.message))
          .to.be.equal(true);
        expect(context.commit.calledWith('SET_ERROR', true))
          .to.be.equal(true);
        expect(context.commit.calledWith('SET_LOADING', false))
          .to.be.equal(true);
      });
    });
    describe('fetchPosts', () => {
      it(`should call ${posts.POSTS_URL}`, () => {
        posts.actions.fetchPosts(context);
        expect(context.commit.calledWith('SET_LOADING', true), 'set loading')
          .to.be.equal(true);
        expect(axios.get.calledWithMatch(posts.POSTS_URL))
          .to.be.equal(true);
      });
    });
  });
});

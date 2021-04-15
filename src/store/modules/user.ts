import { SET_USER_DETAIL, SET_USER_LOADING } from '@/store/mutation-types';
import { User } from '@/api/user';

interface IState {
  detail: Record<string, any>;
  isLoading: boolean;
}

const initState = (): IState => {
  return {
    detail: {},
    isLoading: false
  };
};

const state: IState = {
  isLoading: initState().isLoading,
  detail: initState().detail
};

const actions = {
  // @ts-ignore
  async getDetail({ dispatch, commit }, payload) {
    const query = payload.query || {};
    const user = new User();
    const { success, response } = await user.getDetail(payload.id, query);

    if (success) {
      // set detail vào vuex detail
      commit(SET_USER_DETAIL, response.data);
      if (payload.cb) {
        payload.cb(response.data);
      }
    } else {
      switch (response.code) {
        case 401:
          dispatch('auth/logout', {}, { root: true });
          break;
        case 422:
          console.log('422', response.data.errors);
          break;
        default:
          console.log('defailt');
          break;
      }
    }
  },
  // @ts-ignore
  async create({ dispatch }, payload) {
    const query = payload.query || {};
    const user = new User();
    const { success, response } = await user.create(payload.data, query);

    if (success) {
      payload.cb && payload.cb(response.data);
    } else {
      switch (response.code) {
        case 401:
          dispatch('auth/logout', {}, { root: true });
          break;
        case 422:
          console.log('422', response.data.errors);
          break;
        default:
          console.log('internal server error');
          break;
      }
    }
  }
};

const mutations = {
  [SET_USER_DETAIL]: (state: IState, detail: Record<string, any>) => {
    state.detail = detail;
  },
  [SET_USER_LOADING]: (state: IState, loading: boolean) => {
    state.isLoading = loading;
  }
};

const getters = {
  userDetail: (state: IState) => state.detail,
  userLoading: (state: IState) => state.isLoading
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

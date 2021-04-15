import { forEach } from 'lodash';
import Vuex from 'vuex';
import { createLogger } from 'vuex';
import { SET_INITIAL_STATE } from './mutation-types';

function loadModules() {
  const packs = require.context(
    // The relative path of the components folder
    './modules',
    // Whether or not to look in subfolders
    true,
    // The regular expression used to match base component filenames
    /[A-Za-z0-9-_,\s]/
  );

  const modules = {};

  packs.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const module = matched[1];
      // @ts-ignore
      modules[module] = packs(key).default;
    }
  });
  return modules;
}

const modules = loadModules();

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  // strict: debug,
  state: {},
  actions: {
    resetState({ commit }) {
      forEach(modules, (module, name) => {
        // @ts-ignore
        if (module.mutations[SET_INITIAL_STATE]) {
          // @ts-ignore
          if (module.namespaced) {
            commit(name + '/' + SET_INITIAL_STATE);
          } else {
            commit(SET_INITIAL_STATE);
          }
        }
      });
    }
  },
  modules: {
    ...modules
  },
  plugins: debug ? [createLogger()] : []
});

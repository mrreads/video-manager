import { createStore } from "vuex";

export default createStore({
  state: {
    videoPath: null
  },

  getters: {
    getVideoPath: state => state.videoPath
  },

  mutations: {
    setVideoPath: (state, data) => { state.videoPath = data; },
    deleteVideoPath: (state) => { state.videoPath = null; }
  },

  actions: {},

  modules: {},
});

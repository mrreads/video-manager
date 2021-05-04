import { createStore } from "vuex";

export default createStore({
  state: {
    videoPath: null,
    videoLoaded: false
  },

  getters: {
    getVideoPath: state => state.videoPath,
    getVideoLoaded: state => state.videoLoaded
  },

  mutations: {
    setVideoPath: (state, data) => { 
      state.videoPath = data;
      state.videoLoaded = (state.videoPath != null)
    },
    deleteVideoPath: (state) => { 
      state.videoPath = null;
      state.videoLoaded = (state.videoPath != null)
    }
  },

  actions: {},

  modules: {},
});

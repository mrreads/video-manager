<template>
  <div class="info">
    <h1>Выбрать видео</h1>
    <h2> {{ this.$store.getters.getVideoPath }} </h2>
    <el-button @click="openFileLoadModal">Загрузить видео</el-button>
  </div>
</template>

<script>

import { mapMutations } from "vuex";

export default {
  name: "Info",

  methods: {
    ...mapMutations(["setVideoPath", "deleteVideoPath"]),

    openFileLoadModal: function() {
      const remote = require("electron").remote;
      const dialog = remote.dialog;

      dialog
        .showOpenDialog(remote.getCurrentWindow(), { properties: ["openFile"] })
        .then((result) => {
          if (result.canceled === false)
          {
              this.setVideoPath(result.filePaths[0]);
          }
        });
    },
  },
};
</script>

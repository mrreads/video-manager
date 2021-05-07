<template>
  <el-main class="info">
    
    <h1>Выбрать видео</h1>

    <br>

    <el-button @click="openFileLoadModal">Загрузить видео</el-button>

    <el-button @click="deleteVideoPath" :disabled="!this.$store.getters.getVideoLoaded">Удалить видео</el-button>

    <br>

  </el-main>



  <template v-if="this.$store.getters.getVideoLoaded">
    <hr>
    <el-main class="info">
      
      <h1>Информация о видео</h1>
      
      <p> Путь: {{ getVideoInfo.format.filename }} </p>
      <p> Размер: {{ getVideoInfo.format.size }} </p>
      <p> Битрейт: {{ getVideoInfo.format.bit_rate }} </p>
      <p> Длительность: {{ getVideoInfo.format.duration }} </p>
    
    </el-main>
  </template>

</template>

<script>

import { mapMutations } from "vuex";

export default {
  name: "Info",
  data() {
    return {
      videoInfo: null,
    }
  },

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

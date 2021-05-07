<template>

  <br>

  <el-divider content-position="left"> <h1> Выбрать видео </h1></el-divider>

  <el-main class="info">

    <el-button @click="openFileLoadModal"> Загрузить видео </el-button>
    <el-button @click="deleteVideoPath" :disabled="!this.$store.getters.getVideoLoaded">Удалить видео</el-button>

    <br>
  </el-main>

  <br>
  <br>

  <transition name="el-zoom-in-top">
    <div v-if="this.$store.getters.getVideoLoaded">
      <el-divider content-position="left"> <h1> Информация о видео </h1> </el-divider>

      <el-main class="info" v-if="this.$store.getters.getVideoLoaded">
        
        <el-tabs v-model="activeName">

          <el-tab-pane label="Общая информация" name="general">
            <p> Путь: {{ getVideoInfo?.format.filename }} </p>
            <p> Размер: {{ getVideoInfo?.format.size }} </p>
            <p> Битрейт: {{ getVideoInfo?.format.bit_rate }} </p>
            <p> Длительность: {{ getVideoInfo?.format.duration }} </p>
          </el-tab-pane>

          <el-tab-pane label="Дополнительная информация" name="additional">
            <p> фывфыв </p>
          </el-tab-pane>
        </el-tabs>
      
      </el-main>
    </div>
  </transition>

</template>

<script>

import { mapMutations } from "vuex";

export default {
  name: "Info",
  data() {
    return {
      activeName: 'general',
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

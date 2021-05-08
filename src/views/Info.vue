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

      <el-main class="info tech" v-if="this.$store.getters.getVideoLoaded">
        
        <el-tabs v-model="activeName">

          <el-tab-pane label="Общая информация" name="general">
            <p :title="getVideoInfo?.format.filename"> 
              <strong> Путь: </strong> {{ getVideoInfo?.format.filename }} 
            </p>

            <p :title="getVideoInfo?.format.size + ' байт'"> 
              <strong> Размер: </strong> {{ fileSize }} 
            </p>

            <p :title="getVideoInfo?.format.bit_rate + ' бит  '"> 
              <strong> Битрейт: </strong> {{ videoBitrate }}
            </p>

            <p :title="getVideoInfo?.format.duration + ' секунд'"> 
              <strong> Длительность: </strong> {{ new Date(getVideoInfo?.format.duration * 1000).toISOString().substr(11, 8) }} 
            </p>
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
  
  computed: {
    fileSize: function() {
      let decimals = 2;
      let bytes = this.getVideoInfo?.format.size;

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Байт', 'Кбайт', 'Мбайт', 'Гбайт', 'Тбайт', 'Пбайт', 'Пбайт', 'Збайт', 'Ибайт'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    videoBitrate: function() {
      let decimals = 2;
      let bytes = this.getVideoInfo?.format.bit_rate;

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Бит/c', 'Кбит/с', 'Мбит/с', 'Гбит/c', 'Тбит/с', 'Пбит/c', 'Эбит/с', 'Збит/с', 'Ибит/с'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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

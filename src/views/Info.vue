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
            <div class="content_info">
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
            </div>
          </el-tab-pane>

          <el-tab-pane label="Дополнительная информация" name="additional">
              <el-tabs tabPosition="left">

                <el-tab-pane v-if="videoInfo_video.length > 0" label="Видео">
                    <el-tabs tab-position="top" class="audio_stream">
                      <el-tab-pane :label="(s.tags?.title) ? s.tags.title : s.codec_name" v-for="s in videoInfo_video" :key="s.index">
                        <div class="content_info">
                          <p> <strong> Кодек: </strong> {{ s.codec_name }} </p>
                          <p class="additional"> <strong> Полное название кодека: </strong> {{ s.codec_long_name }} </p>

                          <p :title="s.coded_width + 'x' + s.coded_height"> <strong> Высота: </strong> {{ s.coded_height }}</p>
                          <p class="additional" :title="s.coded_width + 'x' + s.coded_height"> <strong> Ширина: </strong> {{ s.coded_width }}</p>

                          <p class="additional"> <strong> Соотношение сторон экрана: </strong> {{ s.display_aspect_ratio }}</p>

                          <p> <strong> Частота кадров: </strong> {{ convertFrameRate(s.r_frame_rate) }}</p>
                          <p class="additional"> <strong> Битность видео: </strong> {{ s.bits_per_raw_sample }}</p>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                 
                </el-tab-pane>

                <el-tab-pane v-if="videoInfo_audio.length > 0" label="Аудио">
                  <el-tabs tab-position="top" class="video_stream">
                      <el-tab-pane :label="(s.tags?.title) ? s.tags.title : s.codec_name" v-for="s in videoInfo_audio" :key="s.index">
                        <div class="content_info">
                          <p v-if="s.tags?.title"> <strong> Язык: </strong> {{ s.tags?.title }}</p>

                          <p :title="s.codec_long_name"> <strong> Кодек: </strong> {{ s.codec_name }}</p>
                          <p class="additional"> <strong> Битрейт: </strong> {{ s.sample_rate }}</p>
                        </div>
                      </el-tab-pane>
                  </el-tabs>

                </el-tab-pane>

                <el-tab-pane v-if="videoInfo_subtitle.length > 0" label="Субтитры">
                  
                  <el-tabs tab-position="top" class="video_stream">
                    <el-tab-pane :label="(s.tags?.title) ? s.tags.title : s.codec_name" v-for="s in videoInfo_subtitle" :key="s.index">
                      <div class="content_info">
                        <p> <strong> Кодек: </strong> {{ s.codec_long_name }} </p>
                        <p class="additional"> <strong> Код кодека: </strong> {{ s.codec_name }} </p>

                        <p v-if="s.tags?.title"> <strong> Язык: </strong> {{ s.tags?.title }} </p>
                        <p v-if="s.tags?.language" :class="(s.tags?.title) ? 'additional' : ''"> <strong> Код языка: </strong> {{ s.tags?.language }} </p>
                       </div>
                    </el-tab-pane>
                  </el-tabs>
                
                </el-tab-pane>

                <el-tab-pane v-if="videoInfo_attachment.length > 0" label="Вложения">

                  <el-tabs tab-position="top" class="video_stream">
                    <el-tab-pane :label="(s.tags?.filename) ? s.tags?.filename : s.codec_name" v-for="s in videoInfo_attachment" :key="s.index">
                      <div class="content_info">
                        <p> <strong> Тип: </strong> {{ s.codec_long_name }} </p>
                        <p class="additional"> <strong> Формат: </strong> {{ s.codec_name }} </p>

                        <p v-if="s.tags?.filename"> <strong> Название файла: </strong> {{ s.tags?.filename }} </p>
                        <p v-if="s.tags?.mimetype" class="additional"> <strong> MIME-TIP файла: </strong> {{ s.tags.mimetype }} </p>
                       </div>
                    </el-tab-pane>
                  </el-tabs>
                
                </el-tab-pane>
                
              </el-tabs>
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
    },

    videoInfo_video: function() {
      return this.getVideoInfo.streams.filter(s => s.codec_type == 'video')
    },

    videoInfo_audio: function() {
      return this.getVideoInfo.streams.filter(s => s.codec_type == 'audio')
    },

    videoInfo_subtitle: function() {
      return this.getVideoInfo.streams.filter(s => s.codec_type == 'subtitle')
    },

    videoInfo_attachment: function() {
      return this.getVideoInfo.streams.filter(s => s.codec_type == 'attachment')
    },
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

    convertFrameRate: function(fps) {
      return eval(fps).toFixed(2);
    }
  },
};
</script>

<template>
  <br />

  <el-divider content-position="left"> <h1> {{ t('info.title_choose') }} </h1></el-divider>

  <el-main class="info">
    <el-button @click="openFileLoadModal"> {{ t('info.select') }} </el-button>
    <el-button
      @click="deleteVideoPath"
      :disabled="!this.$store.getters.getVideoLoaded">  
      {{ t('info.delete') }}  
    </el-button>

    <br />
  </el-main>

  <br />
  <br />

  <transition name="el-zoom-in-top">
    <div v-if="this.$store.getters.getVideoLoaded">
      <el-divider content-position="left">
        <h1>{{ t('info.title_info') }}</h1>
      </el-divider>

      <el-main class="info tech" v-if="this.$store.getters.getVideoLoaded">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="t('info.general_info')" name="general">
            <div class="content_info">
              <p :title="getVideoInfo?.format.filename">
                <strong> {{ t('info.general_path') }}: </strong> {{ getVideoInfo?.format.filename }}
              </p>

              <p :title="getVideoInfo?.format.size + ' ' + t('size.bytes')">
                <strong> {{ t('info.general_size') }}: </strong> {{ fileSize }}
              </p>

              <p :title="getVideoInfo?.format.bit_rate + ' ' + t('size.bytes/s')">
                <strong> {{ t('info.general_bitrate') }}: </strong> {{ videoBitrate }}
              </p>

              <p :title="getVideoInfo?.format.duration + ' ' + t('time.second')">
                <strong> {{ t('info.general_duration') }}: </strong>
                {{
                  new Date(getVideoInfo?.format.duration * 1000)
                    .toISOString()
                    .substr(11, 8)
                }}
              </p>
            </div>
          </el-tab-pane>

          <el-tab-pane :label="t('info.title_additional')" name="additional">
            <el-tabs tabPosition="left">
              <el-tab-pane v-if="videoInfo_video.length > 0" :label="t('info.additional_video')">
                <el-tabs tab-position="top" class="audio_stream">
                  <el-tab-pane
                    :label="s.tags?.title ? s.tags.title : s.codec_name"
                    v-for="s in videoInfo_video"
                    :key="s.index"
                  >
                    <div class="content_info">
                      <p><strong> {{ t('info.additional_codec') }}: </strong> {{ s.codec_name }}</p>
                      <p class="additional">
                        <strong> {{ t('info.additional_codec_full') }}: </strong>
                        {{ s.codec_long_name }}
                      </p>

                      <p :title="s.coded_width + 'x' + s.coded_height">
                        <strong> {{ t('info.additional_height') }}: </strong> {{ s.coded_height }}
                      </p>
                      <p
                        class="additional"
                        :title="s.coded_width + 'x' + s.coded_height"
                      >
                        <strong> {{ t('info.additional_width') }}: </strong> {{ s.coded_width }}
                      </p>

                      <p class="additional">
                        <strong> {{ t('info.additional_aspect') }}: </strong>
                        {{ s.display_aspect_ratio }}
                      </p>

                      <p>
                        <strong> {{ t('info.additional_framerate') }}: </strong>
                        {{ convertFrameRate(s.r_frame_rate) }}
                      </p>
                      <p class="additional">
                        <strong> {{ t('info.additional_raw_sample') }}: </strong>
                        {{ s.bits_per_raw_sample }}
                      </p>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>

              <el-tab-pane v-if="videoInfo_audio.length > 0" :label="t('info.additional_audio')">
                <el-tabs tab-position="top" class="video_stream">
                  <el-tab-pane
                    :label="s.tags?.title ? s.tags.title : s.codec_name"
                    v-for="s in videoInfo_audio"
                    :key="s.index"
                  >
                    <div class="content_info">
                      <p v-if="s.tags?.title">
                        <strong> {{ t('info.additional_lang') }}: </strong> {{ s.tags?.title }}
                      </p>

                      <p :title="s.codec_long_name">
                        <strong> {{ t('info.additional_codec') }}: </strong> {{ s.codec_name }}
                      </p>
                      <p class="additional">
                        <strong> {{ t('info.additional_bitrate') }}: </strong> {{ s.sample_rate }}
                      </p>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>

              <el-tab-pane
                v-if="videoInfo_subtitle.length > 0"
                :label="t('info.additional_subtitle')"
              >
                <el-tabs tab-position="top" class="video_stream">
                  <el-tab-pane
                    :label="s.tags?.title ? s.tags.title : s.codec_name"
                    v-for="s in videoInfo_subtitle"
                    :key="s.index"
                  >
                    <div class="content_info">
                      <p><strong> {{ t('info.additional_codec') }}: </strong> {{ s.codec_long_name }}</p>
                      <p class="additional">
                        <strong> {{ t('info.additional_codec_code') }}: </strong> {{ s.codec_name }}
                      </p>

                      <p v-if="s.tags?.title">
                        <strong> {{ t('info.additional_lang') }}: </strong> {{ s.tags?.title }}
                      </p>
                      <p
                        v-if="s.tags?.language"
                        :class="s.tags?.title ? 'additional' : ''"
                      >
                        <strong> {{ t('info.additional_lang_code') }}: </strong> {{ s.tags?.language }}
                      </p>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>

              <el-tab-pane
                v-if="videoInfo_attachment.length > 0"
                :label="t('info.additional_attachment')"
              >
                <el-tabs tab-position="top" class="video_stream">
                  <el-tab-pane
                    :label="s.tags?.filename ? s.tags?.filename : s.codec_name"
                    v-for="s in videoInfo_attachment"
                    :key="s.index"
                  >
                    <div class="content_info">
                      <p><strong> {{ t('info.additional_type') }}: </strong> {{ s.codec_long_name }}</p>
                      <p class="additional">
                        <strong> {{ t('info.additional_format') }}: </strong> {{ s.codec_name }}
                      </p>

                      <p v-if="s.tags?.filename">
                        <strong> {{ t('info.additional_namefile') }}: </strong>
                        {{ s.tags?.filename }}
                      </p>
                      <p v-if="s.tags?.mimetype" class="additional">
                        <strong> {{ t('info.additional_mine') }}: </strong> {{ s.tags.mimetype }}
                      </p>
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
import { useI18n } from "vue-i18n";

export default {
  name: "Info",

  setup() {
    const { t } = useI18n();
    return { t };
  },

  data() {
    return {
      activeName: "general",
      videoInfo: null,
    };
  },

  computed: {
    fileSize: function () {
      let decimals = 2;
      let bytes = this.getVideoInfo?.format.size;

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = [
        this.t('size.bytes'),
        this.t('size.KB'),
        this.t('size.MB'),
        this.t('size.GB'),
        this.t('size.TB'),
        this.t('size.EB'),
        this.t('size.ZB'),
        this.t('size.YB')
      ];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    videoBitrate: function () {
      let decimals = 2;
      let bytes = this.getVideoInfo?.format.bit_rate;

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = [
        this.t('size.bytes/s'),
        this.t('size.KB/s'),
        this.t('size.MB/s'),
        this.t('size.GB/s'),
        this.t('size.TB/s'),
        this.t('size.EB/s'),
        this.t('size.ZB/s'),
        this.t('size.YB/s')
      ];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    videoInfo_video: function () {
      return this.getVideoInfo.streams.filter((s) => s.codec_type == "video");
    },

    videoInfo_audio: function () {
      return this.getVideoInfo.streams.filter((s) => s.codec_type == "audio");
    },

    videoInfo_subtitle: function () {
      return this.getVideoInfo.streams.filter(
        (s) => s.codec_type == "subtitle"
      );
    },

    videoInfo_attachment: function () {
      return this.getVideoInfo.streams.filter(
        (s) => s.codec_type == "attachment"
      );
    },
  },

  methods: {
    ...mapMutations(["setVideoPath", "deleteVideoPath"]),

    openFileLoadModal: function () {
      const remote = require("electron").remote;
      const dialog = remote.dialog;

      dialog
        .showOpenDialog(remote.getCurrentWindow(), { properties: ["openFile"] })
        .then((result) => {
          if (result.canceled === false) {
            this.setVideoPath(result.filePaths[0]);
          }
        });
    },

    convertFrameRate: function (fps) {
      return eval(fps).toFixed(2);
    },
  },
};
</script>

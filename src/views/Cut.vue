<template>
  <br />
  <el-divider content-position="left"> <h1> {{ t('cut.title') }} </h1> </el-divider>

  <el-main>

    <div class="block">
      <el-slider
        :max="this.videoDuration"
        v-model="cutValue"
        :format-tooltip="formatTooltip"
        range show-stops>
      </el-slider>
    
      <el-time-picker is-range disabled v-model="valTimePicker"> </el-time-picker>
      
    </div>
  </el-main>
</template>

<script>
import { useI18n } from "vue-i18n";
export default
{
  name: "Cut",

  setup() {
    const { t } = useI18n();
    return { t };
  },

  computed: {
    onlyHours: function () {
      return Math.floor(this.videoDuration / 3600);
    },
    onlyMinutes: function () {
      return Math.floor(this.videoDuration % 3600 / 60);
    },
    onlySeconds: function () {
      return Math.floor(this.videoDuration % 3600 % 60);
    },

    cutStart: function() {
      return {
        "seconds": this.cutValue[0],
        "converted": new Date(this.cutValue[0] * 1000).toISOString().substr(11, 8),
        "separated": {
          "hours": Math.floor(this.cutValue[0] / 3600),
          "minutes": Math.floor(this.cutValue[0] % 3600 / 60),
          "seconds": Math.floor(this.cutValue[0] % 3600 % 60)
        }
      }
    },
    cueEnd: function() {
      return {
        "seconds": this.cutValue[1],
        "converted": new Date(this.cutValue[1] * 1000).toISOString().substr(11, 8),
        "separated": {
          "hours": Math.floor(this.cutValue[1] / 3600),
          "minutes": Math.floor(this.cutValue[1] % 3600 / 60),
          "seconds": Math.floor(this.cutValue[1] % 3600 % 60)
        }
      }
    },

    valTimePicker: function() {
      return [new Date(2020, 0, 0, this.cutStart.separated.hours, this.cutStart.separated.minutes, this.cutStart.separated.seconds), 
              new Date(2020, 0, 0, this.cueEnd.separated.hours, this.cueEnd.separated.minutes, this.cueEnd.separated.seconds)];
    }
  },

  methods: {
    formatTooltip(val) {
        return new Date(val * 1000).toISOString().substr(11, 8)
    },
  },

  data() {
    return {
      videoInfo: this.getVideoInfo,
      videoDuration: Math.floor(this.getVideoInfo.format.duration),
      
      cutValue: [0, this.getVideoInfo.format.duration],
    }
  },
}
</script>
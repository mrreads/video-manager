<template>
  <br />
  <el-divider content-position="left"> <h1>{{ t('convert.title') }}</h1> </el-divider>
  <el-main>

    <el-row>
      <el-select v-model="currentExt" placeholder="Select" disabled>
        <el-option
          v-for="ext in allVideoExt"
          :key="ext.value"
          :label="ext.value"
          :value="ext.value">
        </el-option>
      </el-select>
    
      <el-select v-model="newVideoExt" placeholder="Select">
        <el-option
          v-for="ext in allVideoExt.filter(e => e.value != currentExt)"
          :key="ext.value"
          :label="ext.value"
          :value="ext.value">
        </el-option>
      </el-select>
      
      <el-button>Конвертировать</el-button>
    </el-row>

    <el-row>
      <el-select v-model="currentExt" placeholder="Select" disabled>
        <el-option
          v-for="ext in allVideoExt"
          :key="ext.value"
          :label="ext.value"
          :value="ext.value">
        </el-option>
      </el-select>
    
      <el-select v-model="newAudioExt" placeholder="Select">
        <el-option
          v-for="ext in allAudioExt.filter(e => e.value != currentExt)"
          :key="ext.value"
          :label="ext.value"
          :value="ext.value">
        </el-option>
      </el-select>
      
      <el-button>Оставь звук</el-button>
    </el-row>

  </el-main>
</template>

<script>
import { useI18n } from "vue-i18n";
const path = require('path');

export default
{
  name: "Convert",
  
  setup() {
    const { t } = useI18n();
    return { t };
  },

  data() {
    return {
      currentExt: path.parse(this.getVideoInfo?.format.filename).ext,
      newVideoExt: null,
      newAudioExt: null,

      allVideoExt: [
        { value: '.mp4'},
        { value: '.avi'},
        { value: '.mkv'},
      ],

      allAudioExt: [
        { value: '.mp3'},
        { value: '.wav'},
        { value: '.flac'},
      ]
    }
  }
}
</script>
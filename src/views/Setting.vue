<template>
  <br />
  <el-divider content-position="left"> <h1>{{ t('setting.title') }}</h1> </el-divider>
  <el-main>
    
    <div class="setting">
      <p> {{ t('setting.select_lang') }}: </p>
      <el-select v-model="currentLocale" :placeholder="t('setting.select_lang')" @change="changeLang">
        <el-option
          v-for="lang in locales"
          :key="lang.value"
          :label="lang.label"
          :value="lang.value">
          <span style="float: left">{{ lang.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ lang.value }}</span>
        </el-option>
      </el-select>
    </div>

  </el-main>
</template>

<script>
import { useI18n } from "vue-i18n";
export default
{
  name: "Settings",

  data() {
    return {
      locales: [
        {
          value: 'en',
          label: 'English'
        }, {
          value: 'ru',
          label: 'Russian'
        }],
        currentLocale: this.$i18n.locale
    }
  },

  setup() {
    const { t } = useI18n();
    return { t };
  },

  methods: {
    changeLang: function() {
      this.$i18n.locale = this.currentLocale;
    }
  }
}
</script>
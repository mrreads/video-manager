<template>
  <br />
  <el-divider content-position="left"> <h1>{{ t('setting.title') }}</h1> </el-divider>

  <el-main>
    <p>test</p>
  </el-main>
</template>

<script>
import { useI18n } from "vue-i18n";
export default
{
  name: "Setting",

  setup() {
    const { t } = useI18n();
    return { t };
  }
}
</script>
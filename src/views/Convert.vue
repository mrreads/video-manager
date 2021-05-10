<template>
  <br />
  <el-divider content-position="left"> <h1>{{ t('convert.title') }}</h1> </el-divider>
  <el-main>

  </el-main>
</template>

<script>
import { useI18n } from "vue-i18n";
export default
{
  name: "Convert",

  setup() {
    const { t } = useI18n();
    return { t };
  },
}
</script>
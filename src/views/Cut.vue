<template>
  <br />
  <el-divider content-position="left"> <h1> {{ t('cut.title') }} </h1> </el-divider>

  <el-main>
    <p> asdasd </p>
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
  }
}
</script>
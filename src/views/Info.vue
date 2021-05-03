<template>
  <div class="info">
      <h1>Выбрать видео</h1>
      <el-button @click="openFileLoadModal">Загрузить видео</el-button>
  </div>
</template>

<script>
export default {
  name: "Info",

  methods: {
    openFileLoadModal: () => {
      const remote = require("electron").remote
      const dialog = remote.dialog

      dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ["openFile"] })
      .then(result => {
          if (result.canceled === false)
              console.log(result.filePaths);
      });
    }
  }
}
</script>
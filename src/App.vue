<template>
  <SideBar />
  <div class="content">
    <TitleBar />
    <router-view />
  </div>
</template>

<script>
import TitleBar from "./components/TitleBar.vue";
import SideBar from "./components/SideBar.vue";

export default {  
  name: "App",
  components: {
    SideBar,
    TitleBar,
  },
}
</script>

<style src="./assets/css/general.css"></style>

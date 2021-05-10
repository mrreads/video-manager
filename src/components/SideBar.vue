<template>
  <div class="sidebar">
    <router-link to="/info" class="sidebar__button">
      <i class="el-icon-film"></i
    ></router-link>

    <router-link
      v-if="$store.getters.getVideoLoaded"
      to="/convert"
      class="sidebar__button"
      ><i class="el-icon-s-operation"></i
    ></router-link>
    <div v-else class="sidebar__button disabled">
      <i class="el-icon-s-operation"></i>
    </div>

    <router-link
      v-if="$store.getters.getVideoLoaded"
      to="/cut"
      class="sidebar__button"
      ><i class="el-icon-scissors"></i
    ></router-link>
    <div v-else class="sidebar__button disabled">
      <i class="el-icon-scissors"></i>
    </div>

    <router-link to="/setting" class="sidebar__button setting"
      ><i class="el-icon-s-tools"></i
    ></router-link>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  align-self: stretch;
  flex-flow: column nowrap;
  flex-grow: 1;

  width: 55px;
  min-width: 55px;
  max-width: 55px;
  padding-top: 30px;
  padding-bottom: 5px;

  background-color: #303133;
}

.sidebar__button {
  font-size: 1.7em;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 60px;
  margin: 5px 0;
  padding: 10px 0;

  cursor: pointer;
  transition: 0.3s background-color;

  color: white;
}

.sidebar__button:not(.disabled):hover {
  background-color: #505153;
}

.sidebar__button.disabled {
  cursor: default;

  opacity: 0.3;
}
.sidebar__button.setting {
  margin-top: auto;
}
</style>

import { createRouter, createWebHistory } from "vue-router";

import Info from "../views/Info.vue";
import Cut from "../views/Cut.vue";
import Convert from "../views/Convert.vue";
import Setting from "../views/Setting.vue";

const routes = [
  {
    path: "/",
    component: Info,
  },
  {
    path: "/info",
    component: Info,
  },
  {
    path: "/cut",
    component: Cut,
  },
  {
    path: "/convert",
    component: Convert,
  },
  {
    path: "/setting",
    component: Setting,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

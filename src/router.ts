import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Edit.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    {
      name: "view",
      path: "/view/:data",
      component: () => import("./views/View.vue"),
    }
  ],
});

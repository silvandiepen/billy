import { createRouter, createWebHistory } from "vue-router";

import Edit from "@/views/Edit.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: () => import("./views/Archive.vue"), },

  { path: "/edit", component: Edit },
  {
    name: "view",
    path: "/view/:data",
    component: () => import("./views/View.vue"),
  }
  ],
});

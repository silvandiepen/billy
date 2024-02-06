import { createRouter, createWebHistory } from "vue-router";


export const RouteName = {
  ARCHIVE : 'archive',
  EDIT : 'edit',
  VIEW : 'view'
}


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: RouteName.ARCHIVE,
      path: "/",
      component: () => import("./views/Archive.vue"),
    },
    {
      name: RouteName.EDIT,
      path: "/edit",
      component: () => import("./views/Edit.vue"),
    },
    {
      name: RouteName.VIEW,
      path: "/view/:data",
      component: () => import("./views/View.vue"),
    }
  ],
});

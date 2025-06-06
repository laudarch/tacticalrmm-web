import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import { useAuthStore } from "@/stores/auth";
import routes from "./routes";

// useful for importing router outside of vue components
// import {router} from "@/router"
export const router = new createRouter({
  routes,
  history: createWebHistory(process.env.VUE_ROUTER_BASE),
});

export default function (/* { store } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
      ? createWebHistory
      : createWebHashHistory;

  const Router = new createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE,
    ),
  });

  Router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requireAuth) {
      if (!auth.loggedIn) {
        auth.next = to.fullPath;
        next({
          name: "Login",
        });
      } else {
        next();
      }
    } else if (to.meta.requiresVisitor) {
      if (auth.loggedIn) {
        next({
          name: "Dashboard",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
}

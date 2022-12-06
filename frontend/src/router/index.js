import { createRouter, createWebHistory } from "vue-router";
// import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { useAuthStore } from "../store/auth";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movieslider",
      component: () => import("../components/sliders/MoviesSlider.vue"),
    },
    {
      path: "/homeslider",
      component: () => import("../components/sliders/HomeSlider.vue"),
    },
    {
      path: "/genreslider",
      component: () => import("../components/sliders/GenresSlider.vue"),
    },

    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUp.vue"),
      beforeEnter: (to, from) => {
        const auth_route = useAuthStore();
        if (auth_route.getAuth) {
          return { name: "home" };
        }
      },
    },

    {
      path: "/movies",
      name: "movies",
      component: () => import("../views/movies/MoviesView.vue"),
    },
    {
      path: "/movies/:id",
      component: () => import("../views/movies/MoviesDetails.vue"),
    },

    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchingView.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("../views/policy/PrivacyView.vue"),
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("../views/policy/TermsView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: (to, from) => {
        const auth_route = useAuthStore();
        if (auth_route.getAuth) {
          return { name: "home" };
        }
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/users/AdminPanel.vue"),
      meta: {
        adminAuth: true,
        requireAuth: true,
      },
    },
    {
      path: "/movie_edit/:id",
      name: "movie_edit",
      component: () => import("../views/users/EditPanel.vue"),
      meta: {
        adminAuth: true,
        requireAuth: true,
      },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/users/UserPanel.vue"),
      meta: {
        requireAuth: true,
      },
    },

    {
      path: "/:catchAll(.*)",
      component: () => import("../components/notfound/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const auth_route = useAuthStore();
  if (to.meta.requireAuth) {
    if (!auth_route.getAuth) {
      return { name: "login" };
    } else if (to.meta.adminAuth) {
      if (auth_route.getAuth === "admin") {
        return;
      } else {
        return { name: "home" };
      }
    } else if (
      auth_route.getAuth === "user" ||
      auth_route.getAuth === "admin"
    ) {
      return;
    } else {
      return { name: "login" };
    }
  } else {
    return;
  }
});

export default router;

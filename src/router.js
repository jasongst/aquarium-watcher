import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: "/profile",
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: "/aquariums",
      name: "aquariums",
      component: () => import("./components/AquariumList")
    },
    {
      path: "/aquariums/:id",
      name: "aquarium-details",
      component: () => import("./components/Aquarium")
    },
    {
      path: "/add",
      name: "aquarium-add",
      component: () => import("./components/AddAquarium")
    }
  ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
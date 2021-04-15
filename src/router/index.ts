import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import authRouter from './auth';
import store from '@/store';
import { App } from '@vue/runtime-core';

const routes: Array<any> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  authRouter,
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    meta: {
      title: '404'
    },
    component: () => import('@/views/errors/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  linkActiveClass: 'active',
  routes
});

// router.beforeEach((to, from, next) => {
//   if (!to.matched.length) console.warn('no match 111');
//   next();
// });

async function fetchUserInfo(auth: string | null) {
  // @ts-ignore
  if (auth && !store.state.auth.user.id) {
    await store.dispatch('auth/profile', {});
  }
}

router.beforeEach(async (to, from, next) => {
  // @ts-ignore
  document.title = to.meta.title || 'App';
  next();

  // const auth = Token.getTokenFromStorage() || null;
  // if (to.matched.some(record => record.meta.require_auth) && !auth) {
  //   next({
  //     name: 'login'
  //   });
  // } else if (to.matched.some(record => record.meta.guest) && auth) {
  //   await fetchUserInfo(auth);
  //   next({
  //     name: 'provinces'
  //   });
  // } else {
  //   await fetchUserInfo(auth);
  //   next();
  // }
});

export default {
  install: (app: App): void => {
    app.use(router);
  }
};

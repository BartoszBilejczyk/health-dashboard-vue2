import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
        import(/* webpackChunkName: 'dashboard' */ '../views/Dashboard.vue')
  },
  {
    path: '*',
    redirect: () => '/dashboard'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

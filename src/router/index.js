import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Login = () => import(/* webpackChunkName: "login" */ '../views/login.vue');
// const Chat = () => import(/* webpackChunkName: "chat" */ '../views/chat.vue');
import Chat from '../views/chat.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TransactionsView from '../views/TransactionsView.vue';
import CalanderView from '../views/CalanderView.vue';
import ProfileView from '../views/ProfileView.vue';
import NotfoundView from '../views/NotfoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
    },
    {
      path: '/calander',
      name: 'calander',
      component: CalanderView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    { path: '/:paths(.*)*', name: 'NotFound', component: NotfoundView },
  ],
});

export default router;

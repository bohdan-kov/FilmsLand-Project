import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import HomePage from "@/pages/HomePage.vue";
import DiscoverFilmsPage from "@/pages/DiscoverFilmsPage.vue";
import MediaDetailsPage from "@/pages/MediaDetailsPage.vue";
import AuthorizationLoginPage from "@/pages/AuthorizationLoginPage.vue";
import AuthorizationRegistrationPage from "@/pages/AuthorizationRegistrationPage.vue";
import AuthorizationProfilePage from "@/pages/AuthorizationProfilePage.vue";

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'discover-films', component: DiscoverFilmsPage },
      { path: 'media-details/:id', component: MediaDetailsPage },
      { path: 'authorization/login', component: AuthorizationLoginPage },
      { path: 'authorization/registration', component: AuthorizationRegistrationPage },
      { path: 'authorization/profile/:id', component: AuthorizationProfilePage },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
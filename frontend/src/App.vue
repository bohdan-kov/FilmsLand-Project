<template>
  <MainLayout  class="app-layout">
    <router-view />
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
})

</script>

<style>

</style>

<template>
  <div class="app-layout-content">
    <nav-bar class="app-navbar" :style="{ top: navTop + 'px' }" />

    <main class="app-main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

import NavBar from '@/components/sections/NavBar.vue';

export default {
  components: { NavBar },
  setup() {
    const releaseFilmsData = ref([]);

    const navTop = ref(0);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (delta > 0 && navTop.value > -60) {
        navTop.value = Math.max(navTop.value - delta, -60);
      } else if (delta < 0 && navTop.value < 0) {
        navTop.value = Math.min(navTop.value - delta, 0);
      }

      lastScrollY = currentScrollY;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });




    return { releaseFilmsData, navTop };
  }
};
</script>


<style lang="scss" scoped>

</style>
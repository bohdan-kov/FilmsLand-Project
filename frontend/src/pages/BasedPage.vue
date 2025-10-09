<template>
  <div class="home__view-inner">
    <div class="home__view-wrapper pt-[60px]">
      <div class="page__container">
        <home-footer/>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { getUpcomingMovies } from '@/services/movieService';

import HomeFooter from '@/components/sections/HomeFooter.vue';

export default {
  components: { NavBar, HomeFooter },
  setup() {
    const releaseFilmsData = ref([]);


    const fetchAPI = async (fetchFunction, targetData, limit, applyFilter = true) => {
      try {
        const response = await fetchFunction();
        if (!Array.isArray(response)) throw new Error(`Invalid response for ${targetData}`);
        targetData.value = applyFilter
          ? response.filter(({ backdrop_path, original_title, original_name, overview }) => 
              backdrop_path && (original_title || original_name) && overview).slice(0, limit)
          : response.slice(0, limit);
      } catch (error) {
        console.error(`Error fetching ${targetData}:`, error);
      }
    };

    fetchAPI(getUpcomingMovies, releaseFilmsData, 10);

    return { releaseFilmsData };
  }
};
</script>

<style scoped>
</style>
<template>
  <div class="home__view-inner">
    <div class="home__view-wrapper pt-[60px]">
      <div class="page__container">
        <release-slider :filmsData="releaseFilmsData" />
        <app-slider 
          title="The Most Trending Now"
          :filmsData="trendingFilmsData" />
        <app-slider
          title="Popular Films"
          :filmsData="popularFilmsData"
        />
        <movies-category/>
        <app-slider
          title="Popular TV series"
          :filmsData="popularSeriesData"
        />
      </div>

      <watch-everywhere/>

      <div class="page__container">
        <home-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { getUpcomingMovies, getPopularMovies, getPopularSeries, getTrendingMovies } from '@/services/movieService';

import ReleaseSlider from '@/components/sliders/ReleaseSlider.vue';
import MoviesCategory from '@/components/sections/MoviesCategory.vue';
import WatchEverywhere from '@/components/sections/WatchEverywhere.vue';
import HomeFooter from '@/components/sections/HomeFooter.vue';
import AppSlider from '@/components/sliders/AppSlider.vue';

export default {
  components: { ReleaseSlider, AppSlider, MoviesCategory, WatchEverywhere, HomeFooter },
  setup() {
    const releaseFilmsData = ref([]);
    const trendingFilmsData = ref([]);
    const popularFilmsData = ref([]);
    const popularSeriesData = ref([]);


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
    fetchAPI(getTrendingMovies, trendingFilmsData, 15);
    fetchAPI(getPopularMovies, popularFilmsData, 15);
    fetchAPI(getPopularSeries, popularSeriesData, 15);

    return { releaseFilmsData, trendingFilmsData, popularFilmsData, popularSeriesData };
  }
};
</script>

<style scoped>
</style>
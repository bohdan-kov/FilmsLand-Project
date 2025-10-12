<template>
  <swiper
    :modules="modules"
    :slides-per-view="getSlidesPerView"
    :space-between="20"
    :loop="false"
    :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
    :pagination="false"
    :scrollbar="{ draggable: true }"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    class="release__slider-inner mb-[78px] mt-[20px]"
  >
    <swiper-slide v-for="(item, index) in filmsData" :key="item.id || index">
      <large-media-card 
        :item="item" 
        :is-favorite="isFavorite(item.id || item.movieId)"
      />
    </swiper-slide>

    <div class="swiper-button-next !w-[40px] !h-[40px]">
      <button-next />
    </div>
    <div class="swiper-button-prev !w-[40px] !h-[40px]">
      <button-prev />
    </div>
  </swiper>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar, Autoplay, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";

import LargeMediaCard from '../cards/LargeMediaCard.vue';
import buttonPrev from "@/components/UI/buttonPrev";
import buttonNext from "@/components/UI/buttonNext";

export default {
  components: {
    Swiper,
    SwiperSlide,
    buttonPrev,
    buttonNext,
    LargeMediaCard
  },
  props: {
    filmsData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const userStore = useUserStore();
    const { favoriteMovies } = storeToRefs(userStore);

    const windowWidth = ref(window.innerWidth);

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });

    const favoritesMediaIds = computed(() => {
      return favoriteMovies.value?.map((item) => Number(item.movieId)) || [];
    });
    
    const isFavorite = (mediaId) => {
      return favoritesMediaIds.value.includes(Number(mediaId));
    };

    const getSlidesPerView = computed(() => {
      return windowWidth.value > 768 ? 2 : 1;
    });


    return {
      getSlidesPerView,
      modules: [Navigation, Scrollbar, Autoplay, A11y],
      favoritesMediaIds,
      isFavorite
    };
  },
};
</script>

<style scoped></style>

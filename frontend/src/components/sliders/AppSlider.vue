<template>
  <div class="app__content mb-[102px]">
    <div class="app__content-top" v-if="title">
      <h3
        class="app__content-title text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]"
      >
        {{ title }}
      </h3>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="getSlidesPerView"
      :space-between="20"
      :loop="false"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :pagination="{ el: '.swiper-steps', clickable: true }"
      :scrollbar="{ draggable: true }"
      class="app__slider-inner"
    >
      <swiper-slide v-for="(item, index) in filmsData" :key="index">
        <small-media-card 
          class="my-[10px]" 
          :item="item" 
          :is-favorite="isFavorite(item.id || item.movieId)" 
        />
      </swiper-slide>

      <div class="swiper-steps mt-[30px]"></div>

      <div class="swiper-button-next !w-[40px] !h-[40px]">
        <button-next />
      </div>
      <div class="swiper-button-prev !w-[40px] !h-[40px]">
        <button-prev />
      </div>
    </swiper>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import buttonPrev from "@/components/UI/buttonPrev";
import buttonNext from "@/components/UI/buttonNext";
import SmallMediaCard from "@/components/cards/SmallMediaCard.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    buttonPrev,
    buttonNext,
    SmallMediaCard,
  },
  props: {
    filmsData: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    paddingSlider: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const userStore = useUserStore();
    const { favoriteMovies } = storeToRefs(userStore);
    
    const windowWidth = ref(window.innerWidth);
    
    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };
    
    onMounted(() => {
      window.addEventListener("resize", updateWindowWidth);
    });
    
    onUnmounted(() => {
      window.removeEventListener("resize", updateWindowWidth);
    });
    
    const favoritesMediaIds = computed(() => {
      return favoriteMovies.value?.map((item) => Number(item.movieId)) || [];
    });
    
    const isFavorite = (mediaId) => {
      return favoritesMediaIds.value.includes(Number(mediaId));
    };
    
    const getSlidesPerView = computed(() => {
      const width = windowWidth.value - props.paddingSlider;
      return width > 1500 ? 5 : width > 1150 ? 4 : width > 850 ? 3 : width > 570 ? 2 : 1;
    });
    
    return {
      getSlidesPerView,
      modules: [Navigation, Pagination, Scrollbar, Autoplay, A11y],
      favoritesMediaIds,
      isFavorite
    };
  },
};
</script>

<style scoped></style>
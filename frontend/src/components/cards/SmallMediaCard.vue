<template>
  <div
    class="small-media-card relative h-[380px] w-[265px] rounded-[10px] transition-transform duration-300 ease-in-out hover:translate-y-[-10px]"
  >
    <div
      class="small-media-card__desc absolute bottom-0 w-full min-h-[20%] pt-[7px] pr-[12px] pb-[18px] pl-[4px] bg-[rgba(16,16,16,0.30)] backdrop-blur-[2px] opacity-0"
    >
      <div class="small-media-card__top flex items-start justify-between">
        <h3 class="small-media-card__title font-contrast text-[25px] font-normal">
          {{ mediaTitle }}
        </h3>
        <button-like :is-favorite="isFavorite" @click="handleFavorites" />
      </div>
      <div class="small-media-card__date">{{ releaseYear }}</div>
      <button-info @click="navigateToDetails(mediaId)" class="float-right" />
    </div>
    <img
      v-if="mediaPosterUrl"
      class="small-media-card__img w-full h-full object-cover rounded-[10px]"
      :src="mediaPosterUrl"
      :alt="`Poster for ${mediaTitle}`"
    />

    <div
      class="small-media-card__rating absolute top-[10px] left-[10px] flex gap-[10px] items-center bg-[rgba(16,16,16,0.50)] backdrop-blur-[2px] rounded-[10px] p-[3px]"
    >
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        class="ipc-icon ipc-icon--star-inline"
        viewBox="0 0 24 24"
        fill="#f5c518"
        role="presentation"
      >
        <path
          d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"
        />
      </svg>
      {{ formattedRating }}
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';



import { addFavoriteMovie, removeFavoriteMovie } from "@/services/movieFavoriteService.js";

import ButtonInfo from "../UI/buttonInfo.vue";
import ButtonLike from "../UI/buttonLike.vue";

export default {
  components: {
    ButtonInfo,
    ButtonLike,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      toast: useToast(),
    };
  },
  computed: {
    mediaTitle() {
      return (
        this.item.original_title ||
        this.item.original_name ||
        this.item.title ||
        'Untitled'
      );
    },
    mediaId() {
      return this.item.id || this.item.movieId;
    },
    mediaReleaseDate() {
      return this.item.release_date || this.item.releaseDate || this.item.first_air_date;
    },
    mediaPoster() {
      return this.item.poster_path || this.item.backdrop_path || this.item.posterUrl;
    },
    releaseYear() {
      if (!this.item) return "In release";
      const releaseDate = this.mediaReleaseDate;
      return releaseDate ? releaseDate.split("-")[0] : "In release";
    },
    formattedRating() {
      const rating = Number(this.item.vote_average || this.item.rating)
      return rating ? rating.toFixed(1) : "-";
    },
    mediaPosterUrl() {
      const path = this.mediaPoster;
      return path ? `https://image.tmdb.org/t/p/original${path}` : null;
    },
    authToken() {
      return localStorage.getItem("token");
    },
    ...mapStores(useUserStore),
  },
  methods: {
    navigateToDetails(mediaId) {
      this.$router.push(`/media-details/${mediaId}`);
    },
    async handleFavorites() {
      if (this.isFavorite) {
        await this.handleRemoveFromFavorites();
      } else {
        await this.handleAddToFavorites();
      }
    },
    async handleAddToFavorites() {
      const payload = {
        movieId: this.mediaId,
        title: this.mediaTitle,
        releaseDate: this.mediaReleaseDate,
        rating: this.formattedRating,
        posterUrl: this.mediaPoster,
      };
      
      try {
        await addFavoriteMovie(payload, this.authToken);

        this.userStore.addFavorite(payload);
      } catch (error) {
        this.toast.error(`Не вдалося додати до обраного. ${error}`, {
          position: "bottom-right",
          timeout: 2000,
        });
        console.error("Failed to add to favorites:", error);
      }
    },
    async handleRemoveFromFavorites() {
      try {
        await removeFavoriteMovie(this.mediaId, this.authToken);

        this.userStore.removeFavorite(this.mediaId);
      } catch (error) {
        this.toast.error(`Не вдалося видалити з обраного. ${error}`, {
          position: "bottom-right",
          timeout: 2000,
        });
        console.error("Failed to add to favorites:", error);
      }
    },
  },
};
</script>

<style scoped>
@keyframes scale-in-ver-bottom {
  0% {
    transform: scaleY(0);
    transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
    opacity: 1;
  }
}

.swiper-slide-active .small-media-card__desc,
.small-media-card:hover .small-media-card__desc {
  animation: scale-in-ver-bottom 0.3s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
</style>
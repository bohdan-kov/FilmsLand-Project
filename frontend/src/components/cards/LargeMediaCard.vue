<template>
  <div class="large-media-card relative rounded-[10px]">
    <div
      class="large-media-card__desc absolute right-0 w-[35%] h-full p-[21px_16px_23px_14px] rounded-r-[10px] bg-[rgba(16,16,16,0.30)] backdrop-blur-[2px]"
    >
      <h2 class="large-media-card__title truncate font-contrast text-[30px]">
        {{ mediaTitle }}
      </h2>
      <div class="mb-[15px] truncate">Date Release: {{ item.release_date }}</div>
      <div class="overflow-hidden text-ellipsis max-h-[45%]">
        {{ item.overview }}
      </div>
      <div class="large-media-card__action flex gap-[6px] absolute bottom-[23px]">
        <button-info @click="navigateToDetails(item.id)" />
        <button-like
          :is-favorite="isFavorite"
          @click="handleFavorites()"
          class="bg-[#053BA3]"
        />
      </div>
    </div>
    <div
      class="large-media-card__rating absolute top-[10px] left-[10px] flex gap-[10px] items-center bg-[rgba(16,16,16,0.50)] backdrop-blur-[2px] rounded-[10px] p-[3px]"
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
      {{ formattedRating(item) }}
    </div>
    <img
      class="large-media-card__img rounded-[10px]"
      :src="mediaPosterUrl"
      alt="no-img"
    />
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";
import { useToast } from 'vue-toastification';

import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "@/services/movieFavoriteService.js";

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
    },
  },
  data() {
    return {
      toast: useToast(),
    }
  },
  computed: {
    mediaTitle() {
      return (
        this.item.original_title ||
        this.item.original_name ||
        this.item.title ||
        "Untitled"
      );
    },
    mediaId() {
      return this.item.id || this.item.movieId;
    },
    releaseYear() {
      if (!this.item) return "In release";
      const releaseDate =
        this.item.release_date || this.item.releaseDate || this.item.first_air_date;
      return releaseDate ? releaseDate.split("-")[0] : "In release";
    },
    mediaPosterUrl() {
      const path =
        this.item.backdrop_path || this.item.poster_path || this.item.posterUrl;
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
    formattedRating() {
      const rating = Number(this.item.vote_average || this.item.rating);
      return rating ? rating.toFixed(1) : "-";
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
        movieId: this.item.id,
        title: this.mediaTitle,
        releaseDate: this.item?.release_date || this.item?.first_air_date,
        rating: this.formattedRating(this.item),
        posterUrl: this.item.poster_path,
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

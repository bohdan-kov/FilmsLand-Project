<template>
  <div class="media-listCard__inner flex flex-wrap gap-[32px]">
    <div v-for="(media, index) in mediaDate" class="media-listCard__item" :key="index">
      <media-card :item="media" :is-favorite="isFavorite(media.id)" />
    </div>
    <div class="media-listCard__no-data pt-[10px]" v-if="!mediaDate.length">
      Nothing was found for your search.
    </div>
  </div>
</template>

<script>
import MediaCard from "./SmallMediaCard.vue";
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  components: { MediaCard },
  props: {
    mediaDate: {
      type: Object,
    },
  },

  computed: {
    ...mapStores(useUserStore),
    favoritesMediaIds() {
      return this.userStore.favoriteMovies?.map((item) => Number(item.movieId)) || [];
    },
  },
  methods: {
    isFavorite(mediaId) {
      return this.favoritesMediaIds.includes(Number(mediaId));
    },
  },
};
</script>

<style lang="scss" scoped></style>

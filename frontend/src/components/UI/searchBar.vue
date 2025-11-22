<template>
  <div
    class="search-bar__inner relative flex bg-[#1C2331] px-[10px] rounded-[8px] transition-all duration-150"
  >
    <div class="search-bar__control flex items-center justify-between">
      <img
        class="search-bar__icon cursor-pointer w-[20px] h-[20px]"
        src="@/assets/images/icons/search.svg"
        alt="search-icon"
        @click="toggleSearch"
      />
      <input
        v-model="searchValue"
        ref="searchInput"
        class="search-bar__input bg-transparent outline-none text-white"
        :class="{ 'ml-[5px]': searchActive }"
        @blur="handleBlur"
        :style="{ width: searchActive ? '300px' : '0px' }"
        type="text"
        placeholder="Пошук..."
      />
    </div>
    <div
      class="search-bar__content absolute top-[calc(100%+5px)] left-0 w-full bg-[#1C2331] rounded-[8px] overflow-y-auto"
      v-if="searchActive"
    >
      <ul class="search-bar__list max-h-[425px]">
        <li
          v-for="film in searchResults"
          class="search-bar__item p-[12px] flex items-center gap-[6px] cursor-pointer"
          :key="film.id"
          @click="navigateToDetails(film)"
        >
          <div class="search-bar__item-poster">
            <img
              data-v-e7f3f0ae=""
              class="small-media-card__img w-[60px] object-cover rounded-[10px]"
              :src="`https://image.tmdb.org/t/p/original/${film.poster_path}`"
              alt="Poster for Ballad of a Small Player"
            />
          </div>
          <div class="search-bar__item-content">
            <h6 class="search-bar__item-title">{{ film.title }}</h6>
            <p class="search-bar__item-release">2025</p>
          </div>
          <div class="search-bar__item-rating ml-auto">
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
            {{ formattedRating(film) }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { searchMovies } from "@/services/movieService";
import { ref, nextTick, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchValue = ref("");
const searchActive = ref(false);
const searchInput = ref(null);
const searchResults = ref([]);
const isLoading = ref(false);

let debounceTimer = null;

const toggleSearch = () => {
  searchActive.value = !searchActive.value;
  if (searchActive.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
};

const performSearch = async (query) => {
  if (query.length < 2) {
    searchResults.value = [];
    return;
  }

  isLoading.value = true;
  try {
    const response = await searchMovies(query);
    const responseFilters = response.results.filter(
      ({ backdrop_path, original_title, overview, release_date }) =>
        backdrop_path && original_title && overview && release_date
    );
    searchResults.value = responseFilters || [];
    console.log("searchResults.value", searchResults.value);
  } catch (error) {
    console.error(error);
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

const formattedRating = (film) => {
  const rating = Number(film?.vote_average || film?.rating);
  return rating ? rating.toFixed(1) : "-";
};

const handleBlur = () => {
  searchValue.value = "";

  setTimeout(() => {
    searchActive.value = false;
  }, 200);
};

const navigateToDetails = (film) => {
  searchActive.value = false;
  searchValue.value = "";
  router.push(`/media-details/${film.id}`);
};

watch(searchValue, (newValue) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => performSearch(newValue), 300);
});
</script>

<style scoped>
.search-bar__input {
  opacity: 1;
  transition: width 0.15s ease-in-out, opacity 0.15s ease-in-out;
}

.search-bar__input[style*="width: 0"] {
  opacity: 0;
}

.search-bar__input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-bar__content {
  scrollbar-width: thin;
  scrollbar-color: #053ba3 #1c2331;
}

.search-bar__content::-webkit-scrollbar {
  width: 8px;
  background: #1c2331;
}

.search-bar__content::-webkit-scrollbar-thumb {
  background: #053ba3;
  border-radius: 8px;
}
</style>

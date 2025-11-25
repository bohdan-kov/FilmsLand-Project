<template>
  <div class="media-list-inner">
    <div class="media-list-wrapper pt-[60px]">
      <div class="page__container mb-[50px] min-h-screen">
        <h2
          class="mt-[50px] text-3xl mb-[20px] font-heading inline-block pr-11 relative before:content-[url('@/assets/images/icons/title.svg')] before:absolute before:right-0 before:-top-[10px]"
        >
          {{ pageTitle }}
        </h2>

        <div class="media-list-box flex flex-col lg:flex-row gap-[30px]">
          <div class="media-list-filters lg:min-w-[260px] lg:max-w-[260px] flex flex-col gap-3">
            <sort-dropdown v-model="filters.sort_by" />
            <filters-dropdown v-model="filters" :genreListsData="genreListsData" />
          </div>
          
          <div class="media-list-content relative w-full">
            <media-list-card v-if="!pageLoading" :mediaDate="displayedMovies" />
            
            <svg
              v-else
              class="media-list-content--loading absolute left-0 right-0 top-[50%] transform -translate-y-1/2 my-0 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="50"
              height="50"
            >
              <g>
                <circle
                  stroke-dasharray="164.93361431346415 56.97787143782138"
                  r="35"
                  stroke-width="10"
                  stroke="#053ba9"
                  fill="none"
                  cy="50"
                  cx="50"
                >
                  <animateTransform
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                    dur="1.3333333333333333s"
                    repeatCount="indefinite"
                    type="rotate"
                    attributeName="transform"
                  />
                </circle>
              </g>
            </svg>
          </div>
        </div>

        <!-- Пагінація для обох режимів -->
        <div class="pagination mt-8 flex justify-center items-center gap-4">
          <pagination-nav
            :totalPages="totalPages"
            :currentPage="filters.page"
            @onChangePage="onChangePage"
          />
        </div>

        <home-footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, defineProps, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { getGenreMovies, getDiscoverMovies } from "@/services/movieService";

import HomeFooter from "@/components/sections/HomeFooter.vue";
import SortDropdown from "@/components/filter-panel/SortDropdown.vue";
import FiltersDropdown from "@/components/filter-panel/FiltersDropdown.vue";
import MediaListCard from "@/components/cards/MediaListCard.vue";
import PaginationNav from "@/components/UI/paginationNav.vue";

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (val) => ["discover", "mylist"].includes(val),
  },
});

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const genreListsData = ref([]);
const discoverMoviesData = ref([]);
const pageLoading = ref(props.mode === "discover");
const pageCache = ref(new Map());
const totalPages = ref(1);

const filters = ref({
  sort_by: "popularity.desc",
  page: parseInt(route.query.page) || 1,
  "release_date.gte": "",
  "release_date.lte": "",
  with_genres: "",
  "vote_average.gte": "",
  "vote_average.lte": "",
  "vote_count.gte": "",
});

const pageTitle = computed(() => {
  return props.mode === "discover" ? "Discover Films" : "My List";
});

const displayedMovies = computed(() => {
  if (props.mode === "discover") {
    return discoverMoviesData.value;
  } else {
    return filterAndSortLocalMovies();
  }
});

const filterAndSortLocalMovies = () => {
  let movies = [...userStore.favoriteMovies];

  if (filters.value["release_date.gte"]) {
    movies = movies.filter((m) => m.releaseDate >= filters.value["release_date.gte"]);
  }
  if (filters.value["release_date.lte"]) {
    movies = movies.filter((m) => m.releaseDate <= filters.value["release_date.lte"]);
  }

  if (filters.value["vote_average.gte"]) {
    movies = movies.filter((m) => (m.rating || 0) >= Number(filters.value["vote_average.gte"]));
  }
  if (filters.value["vote_average.lte"]) {
    movies = movies.filter((m) => (m.rating || 0) <= Number(filters.value["vote_average.lte"]));
  }

  if (filters.value["vote_count.gte"]) {
    movies = movies.filter((m) => (m.vote_count || 0) >= Number(filters.value["vote_count.gte"]));
  }

  if (filters.value.with_genres) {
    const selectedGenres = filters.value.with_genres.split(",").map(Number);
    movies = movies.filter((m) => {
      const movieGenres = m.genre_ids || m.genres || [];
      return selectedGenres.some((g) => movieGenres.includes(g));
    });
  }

  const [field, order] = filters.value.sort_by.split(".");
  const sortFn =
    {
      popularity: (a, b) => (b.rating || 0) - (a.rating || 0),
      release_date: (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
      title: (a, b) => a.title.localeCompare(b.title),
      vote_average: (a, b) => (b.rating || 0) - (a.rating || 0),
    }[field] || (() => 0);

  movies.sort(sortFn);
  if (order === "asc") movies.reverse();

  if (props.mode === "mylist") {
    totalPages.value = Math.ceil(movies.length / 20);
  }

  const start = (filters.value.page - 1) * 20;
  const end = start + 20;
  return movies.slice(start, end);
};

const fetchDiscoverMovies = async () => {
  if (props.mode !== "discover") return;

  const cacheKey = JSON.stringify(filters.value);
  if (pageCache.value.has(cacheKey)) {
    discoverMoviesData.value = pageCache.value.get(cacheKey);
    pageLoading.value = false;
    return;
  }

  pageLoading.value = true;
  const { response, total_pages } = await getDiscoverMovies(filters.value);

  totalPages.value = total_pages < 500 ? total_pages : 500;

  if (Array.isArray(response)) {
    const filtered = response
      .filter(({ backdrop_path, poster_path }) => backdrop_path || poster_path)
      .slice(0, 20);
    discoverMoviesData.value = filtered;
    pageCache.value.set(cacheKey, filtered);
  }
  pageLoading.value = false;
};

const fetchGenreMovies = async () => {
  try {
    const response = await getGenreMovies();
    if (Array.isArray(response)) {
      genreListsData.value = response;
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

const onChangePage = (newPage) => {
  if (newPage !== filters.value.page) {
    filters.value.page = newPage;
    
    // Оновлення URL тільки для discover
    if (props.mode === "discover") {
      router.push({
        path: "/discover-films",
        query: { ...route.query, page: newPage },
      });
    } else {
      router.push({
        path: "/my-list",
        query: { ...route.query, page: newPage },
      });
    }
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }
};

watch(
  () => props.mode,
  async () => {
    filters.value.page = 1;
    
    pageCache.value.clear();
    
    await nextTick();
    
    if (props.mode === "discover") {
      discoverMoviesData.value = [];
      pageLoading.value = true;
      await fetchDiscoverMovies();
    }
  }
);

watch(
  () => filters.value.page,
  (newPage) => {
    const path = props.mode === "discover" ? "/discover-films" : "/my-list";
    router.push({
      path,
      query: { ...route.query, page: newPage },
    });
  }
);

watch(
  filters,
  () => {
    if (props.mode === "discover") {
      fetchDiscoverMovies();
    }
  },
  { deep: true }
);

onMounted(() => {
  fetchGenreMovies();
  
  if (!route.query.page) {
    filters.value.page = 1;
  }
  
  if (props.mode === "discover") {
    fetchDiscoverMovies();
  }
});
</script>

<style scoped></style>
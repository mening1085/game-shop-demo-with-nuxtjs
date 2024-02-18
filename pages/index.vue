<template>
  <div>
    <Carousel :items-to-show="2.5" :wrap-around="true" :autoplay="2000">
      <Slide v-for="(slide, i) in slides" :key="i">
        <div class="carousel__item">
          <img
            width="100%"
            height="200px"
            :src="slide.thumbnail"
            alt="slide.title"
          />
        </div>
      </Slide>
    </Carousel>

    <div class="flex justify-center bg-white py-2 gap-4">
      <div class="basis-1/6">
        <div>
          <label for="platform" class="text-[12px] font-bold text-red-500"
            >Platform</label
          >
        </div>
        <select
          v-model="platform"
          class="form_control w-full"
          @change="fetchGames()"
        >
          <option value="">All</option>
          <option
            v-for="platform in platforms"
            :key="platform"
            :value="platform"
          >
            {{ platform }}
          </option>
        </select>
      </div>

      <div class="basis-1/6">
        <div>
          <label for="category" class="text-[12px] font-bold text-red-500"
            >Category</label
          >
        </div>
        <select
          v-model="category"
          class="form_control w-full"
          @change="fetchGames()"
        >
          <option value="">All</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <div class="basis-1/6">
        <div>
          <label for="sort" class="text-[12px] font-bold text-red-500">
            Sort
          </label>
        </div>
        <select
          v-model="sort"
          class="form_control w-full"
          @change="fetchGames()"
        >
          <option value="">All</option>
          <option v-for="sort in sorts" :key="sort" :value="sort">
            {{ sort }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-6 mt-4 p-6">
      <div v-for="(game, i) in items" :key="i">
        <CardItem :game="game" />
      </div>
    </div>

    <div class="flex justify-center items-center gap-4">
      <button
        @click="paginate.currentPage = paginate.currentPage - 1"
        :disabled="paginate.currentPage == 1"
        class="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Prev
      </button>
      <button
        @click="paginate.currentPage = paginate.currentPage + 1"
        :disabled="paginate.currentPage * paginate.perPage >= paginate.total"
        class="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Next
      </button>

      <div class="text-red-500">
        {{ paginate.currentPage }} /
        {{ Math.ceil(paginate.total / paginate.perPage) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gameApi from "../server/gameApi";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { useFavoriteStore } from "../stores/favorites";

const config = useRuntimeConfig();

const games = ref([]);
const slides = ref([]);
const paginate = ref({
  currentPage: 1,
  perPage: 12,
  total: 0,
});

// filters
const platforms = ref(["pc", "browser"]);
const categories = ref([
  "mmorpg",
  "shooter",
  "strategy",
  "moba",
  "racing",
  "sports",
  "social",
  "sandbox",
  "open-world",
  "survival",
  "pvp",
  "pve",
  "pixel",
  "voxel",
  "zombie",
  "turn-based",
  "first-person",
  "third-Person",
  "top-down",
  "tank",
  "space",
  "sailing",
  "side-scroller",
  "superhero",
  "permadeath",
  "card",
  "battle-royale",
  "mmo",
  "mmofps",
  "mmotps",
  "3d",
  "2d",
  "anime",
  "fantasy",
  "sci-fi",
  "fighting",
  "action-rpg",
  "action",
  "military",
  "martial-arts",
  "flight",
  "low-spec",
  "tower-defense",
  "horror",
  "mmorts",
]);
const sorts = ref(["popularity", " release-date", "alphabetical", "relevance"]);
// params
const platform = ref("");
const category = ref("");
const sort = ref("");

const items = computed(() => {
  const start = (paginate.value.currentPage - 1) * paginate.value.perPage;
  const end = start + paginate.value.perPage;
  return games.value.slice(start, end);
});

onMounted(async () => {
  // all games
  await fetchGamesReleaseDate();
  await fetchGames();
});

const fetchGames = async () => {
  const res = await gameApi.get(config, {
    platform: platform.value ? platform.value : null,
    category: category.value ? category.value : null,
    "sort-by": sort.value ? sort.value : null,
  });

  games.value = res.data;
  // set pagination
  paginate.value.total = res.data.length;
  paginate.value.currentPage = 1;
};
const fetchGamesReleaseDate = async () => {
  const gameReleaseDate = await gameApi.get(config, {
    platform: platform.value ? platform.value : null,
    category: category.value ? category.value : null,
    "sort-by": "release-date",
  });
  slides.value = gameReleaseDate.data.slice(0, 10);
};
</script>

<style>
.carousel__item {
  width: 100% !important;
}
.form_control {
  @apply text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-gray-600 border border-gray-200 rounded-lg outline-gray-600 appearance-none;
}
</style>

<template>
  <div>
    <div class="grid grid-cols-4 gap-6 mt-4 p-6">
      <div v-for="(game, i) in items" :key="i">
        <CardItem :game="game" />
      </div>
    </div>

    <div
      class="flex justify-center items-center gap-4"
      v-if="games.length > 12"
    >
      <button
        @click="paginate.currentPage = paginate.currentPage - 1"
        :disabled="paginate.currentPage == 1"
        class="text-white px-4 py-2 rounded-lg"
        :class="paginate.currentPage == 1 ? 'bg-gray-300' : 'bg-red-500'"
      >
        Prev
      </button>
      <button
        @click="paginate.currentPage = paginate.currentPage + 1"
        :disabled="paginate.currentPage * paginate.perPage >= paginate.total"
        class="bg-red-500 text-white px-4 py-2 rounded-lg"
        :class="
          paginate.currentPage * paginate.perPage >= paginate.total
            ? 'bg-gray-300'
            : 'bg-red-500'
        "
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
import { useFavoriteStore } from "../../stores/favorites";

const store = useFavoriteStore();

const games = ref([]);
const paginate = ref({
  currentPage: 1,
  perPage: 12,
  total: 0,
});

const items = computed(() => {
  const start = (paginate.value.currentPage - 1) * paginate.value.perPage;
  const end = start + paginate.value.perPage;
  return games.value.slice(start, end);
});

onMounted(async () => {
  // all games
  games.value = store.favorites;
  // set pagination
  paginate.value.total = games.value.length;
  paginate.value.currentPage = 1;
});
</script>

<style>
.carousel__item {
  width: 100% !important;
}
.form_control {
  @apply text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-gray-600 border border-gray-200 rounded-lg outline-gray-600 appearance-none;
}
</style>

<template>
  <header class="main-bg text-white">
    <div class="px-6 flex justify-between items-center h-[60px]">
      <div class="uppercase">
        <nuxt-link to="/" class="text-red-500 font-bold text-2xl">
          Free to play
        </nuxt-link>
      </div>
      <ul class="flex gap-4">
        <li>
          <nuxt-link class="item" to="/">
            <Icon icon="mdi:home" />
            Home
          </nuxt-link>
        </li>
        <li class="relative">
          <nuxt-link class="item" to="/favorite">
            <Icon icon="material-symbols:favorite" />
            Favorite
          </nuxt-link>
          <span
            v-if="favorites.length > 0"
            class="absolute top-[-10px] right-[-10px] bg-red-500 flex justify-center items-center rounded-full text-xs px-1"
          >
            {{ favorites.length }}
          </span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useFavoriteStore } from "../stores/favorites";

const store = useFavoriteStore();
const favorites = computed(() => store.favorites);
</script>

<style lang="css">
.item {
  @apply flex items-center;
}
</style>

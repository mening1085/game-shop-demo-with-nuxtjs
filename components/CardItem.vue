<template>
  <div class="card-item bg-gray-800 rounded overflow-hidden">
    <div class="card-item__image">
      <nuxt-link :to="'/game/' + game?.id">
        <img
          :src="game?.thumbnail"
          alt="game image"
          class="w-full h-full object-cover"
        />
      </nuxt-link>
    </div>
    <div class="p-2">
      <div class="card-item__content">
        <nuxt-link :to="'/game/' + game?.id">
          <h3 class="text-xl font-bold text-white">
            {{ game?.title }}
          </h3>
        </nuxt-link>
        <p class="text-gray-500 truncate overflow-hidden">
          {{ game?.short_description }}
        </p>
      </div>

      <div class="flex justify-between items-center mt-1">
        <div>
          <button @click="addFavorite()">
            <Icon
              :icon="checkFavoriteIcon() ? 'mdi:heart' : 'mdi:heart-outline'"
              class="text-2xl text-red-500"
            />
          </button>
        </div>
        <div class="flex gap-1 items-center">
          <div
            class="bg-gray-500 rounded font-bold text-[11px] flex items-center px-1 h-[15px]"
          >
            {{ game.genre }}
          </div>
          <Icon :icon="checkIcon(game?.platform)" class="text-white text-2xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useFavoriteStore } from "../stores/favorites";
export default {
  name: "CardItem",
  components: {
    Icon,
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  computed: {},

  methods: {
    checkIcon(platform) {
      switch (platform) {
        case "PC (Windows)":
          return "mdi:windows";
        case "Web Browser":
          return "mdi:web";
        default:
          return "mdi:help-circle";
      }
    },
    checkFavoriteIcon() {
      return useFavoriteStore().checkFavorite(this.game.id);
    },
    addFavorite() {
      const store = useFavoriteStore();
      if (store.favorites.find((f) => f.id == this.game.id)) {
        store.removeFavorite(this.game.id);
      } else {
        store.addFavorite(this.game);
      }
    },
  },
};
</script>

<style></style>

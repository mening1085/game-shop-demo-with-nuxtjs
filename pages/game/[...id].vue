<template>
  <div class="text-white">
    <Carousel :items-to-show="2.5" :wrap-around="true" :autoplay="2000">
      <Slide v-for="(slide, i) in game?.screenshots" :key="i">
        <div class="carousel__item">
          <img
            width="100%"
            height="200px"
            :src="slide.image"
            alt="slide.title"
          />
        </div>
      </Slide>
    </Carousel>

    <div class="p-[3rem]">
      <div class="flex gap-8 mb-8">
        <div class="basis-2/5">
          <img width="100%" :src="game.thumbnail" :alt="game?.title" />
        </div>
        <div class="basis-3/5">
          <h1 class="text-4xl font-bold mb-2">
            <a
              :href="game?.game_url"
              target="_blank"
              class="hover:text-red-500"
            >
              {{ game?.title }}
            </a>
          </h1>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Description :</span>
            {{ game?.short_description }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Category :</span> {{ game?.genre }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Platform :</span> {{ game?.platform }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Publisher :</span> {{ game?.publisher }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Developer :</span> {{ game?.developer }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Release Date :</span>
            {{ game?.release_date }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Status :</span>
            {{ game?.status }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px] flex items-center">
            <span class="font-bold mr-2">Ref : </span>
            <a
              :href="game?.freetogame_profile_url"
              target="_blank"
              class="hover:text-red-500"
            >
              {{ game?.freetogame_profile_url }}
            </a>
          </div>
        </div>
      </div>

      <div class="flex gap-8">
        <div class="basis-2/5">
          <div class="text-[20px] font-bold">Minimum System Requirements</div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">OS :</span>
            {{ game?.minimum_system_requirements?.os }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Processor :</span>
            {{ game?.minimum_system_requirements?.processor }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Memory :</span>
            {{ game?.minimum_system_requirements?.memory }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Graphics :</span>
            {{ game?.minimum_system_requirements?.graphics }}
          </div>
          <div class="text-gray-500 mb-2 text-[16px]">
            <span class="font-bold">Storage :</span>
            {{ game?.minimum_system_requirements?.storage }}
          </div>
        </div>
        <div class="basis-3/5">Detail: {{ game?.description }}</div>
      </div>
    </div>

    <div
      class="flex justify-center w-[80%] mx-auto mb-6"
      v-for="(slide, i) in game?.screenshots"
      :key="i"
    >
      <img width="100%" :src="slide.image" alt="slide.title" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gameApi from "../../server/gameApi";
import { useRoute } from "vue-router";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { Icon } from "@iconify/vue";

const route = useRoute();
const config = useRuntimeConfig();
const game = ref({});
onMounted(async () => {
  const res = await gameApi.detail(config, route.params.id[0]);
  game.value = res.data;
});
</script>

<style></style>

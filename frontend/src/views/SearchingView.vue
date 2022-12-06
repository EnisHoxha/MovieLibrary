<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Header from "../components/HeaderComponent.vue";
import MovieNotFound from "../components/notfound/MovieNotFound.vue";
const host = import.meta.env.VITE_API_URL;

const router = useRouter();
const route = useRoute();
const search_term = ref("");
const movies = ref([]);

search_term.value = route.query.movie_name;

watchEffect((search_term) => {
  search_term.value = route.query.movie_name;

  // console.log(search_term.value);

  const params = new URLSearchParams();
  params.append("name", search_term.value);

  const request = {
    params: params,
  };
  axios
    .get(`${host}/api/movies/search`, request, { withCredentials: true })
    .then((res) => {
      movies.value = res.data.movie;
    })
    .catch((error) => {
      // console.log(error);
    });
});
</script>

<template >
  <Header />
  <section class="px-6 mx-5 pt-8">
    <h1 v-if="movies.length  >=1" class=" md:text-4xl text-xl font-semibold dark:text-white border-l-8 pl-1  border-yellow-500">Results for: {{search_term}}</h1>
    <h1 v-else class=" md:text-4xl text-xl font-semibold dark:text-white border-l-8 pl-1 border-red-500">No results for: {{search_term}}</h1>
    <MovieNotFound v-if="movies.length <1" />
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-8">

      <div v-for="movie in movies" :key="movie.id">
        <router-link :to="`/movies/${movie._id}`">
          <img :src="`${host}/static/`+ movie.poster_img" class="h-3/4 w-full hover:opacity-75  object-fill  tansition easy-in-out duration-150" />
        </router-link>
        <h1 v-bind:title="movie.movie_title" class="	truncate captalize  text-md pt-3 pl-1   font-semibold  text-gray-900 dark:text-white">{{movie.movie_title}}</h1>
        <div class=" flex">
          <svg class="fill-current text-yellow-500 w-4 h-4 mt-1" viewBox="0 0 24 24">
            <g data-name="Layer 2">
              <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" />
            </g>
          </svg><span class="ml-2 dark:text-stone-300">{{movie.imdb_rating}} | {{movie.release_date}} </span><br />
        </div>
        <span class="text-sm text-gray-500" v-for="genre in movie.genres" :key="genre.id">
          <span class="truncate   rounded px-1 py-1 text-sm text-gray-500  ">
            {{genre}}
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

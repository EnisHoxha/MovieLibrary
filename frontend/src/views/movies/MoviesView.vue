<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../store/auth";
import { storeToRefs } from "pinia";
import Header from "../../components/HeaderComponent.vue";

const auth_store = useAuthStore();
const user = auth_store.getAuth;
const movies = ref([]);
const error = ref();
const fotografia = "movie_poster.jpg";

const getMovies = async () => {
  await axios
    .get("http://localhost:5002/api/movies")
    .then((res) => {
      movies.value = res.data;
      console.log(res.data);
    })
    .catch((error) => {
      error.value = error;
      console.log(error);
    });
};

onMounted(() => {
  getMovies();
});
</script>

<template>
  <Header />
  <section class="px-6 mx-5 t-8">
    <h1 class="uppercase mt-5 text-yellow-500 text-lg font-semibold">
      Popular Movies
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-3">

      <div v-for="movie in movies.movies" :key="movie.id">
        <router-link :to="`/movies/${movie._id}`">
          <img :src="'http://localhost:5002/static/'+ movie.poster_img" class="h-3/4 w-full rounded-sm hover:opacity-75  object-fill  tansition easy-in-out duration-150" />
        </router-link>
        <h1 v-bind:title="movie.movie_title" class="	truncate captalize  text-md pt-3 pl-1   font-semibold  text-gray-900 dark:text-white">{{movie.movie_title}}</h1>
        <div class=" flex">
          <svg class="fill-current text-yellow-500 w-4 h-4 mt-1" viewBox="0 0 24 24">
            <g data-name="Layer 2">
              <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" />
            </g>
          </svg><span class="ml-2 dark:text-stone-300">{{movie.imdb_rating}} | {{movie.release_date}} </span><br />
        </div>
        <div class="flex truncate">
          <span class="text-sm text-gray-500" v-for="genre in movie.genres" :key="genre.id">
            <span class="truncate   rounded px-1 py-1 text-xs text-gray-500  ">
              {{genre}}
            </span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
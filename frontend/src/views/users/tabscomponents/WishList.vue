<script setup>
import { ref, onMounted } from "vue";
import { useWishlistStore } from "../../../store/wishlist";
const wishlist_store = useWishlistStore();

const removeMovie = (movie) => {
  const item = JSON.parse(localStorage.getItem("movies"));
  for (let i = 0; i < item.length; i++) {
    if (item[i]._id === movie._id) {
      item.splice(i, 1);
    }
  }
  wishlist_store.movies = item;
  localStorage.setItem("movies", JSON.stringify(item));
  //   alert("movies deleted successfully");
};
</script>


<template>
  <section class="sm:px-6  ">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between  mt-5 ">
      <h1 class="uppercase  text-yellow-500 text-lg font-semibold">
        Your WishList of Movies
      </h1>

    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">

      <div v-for="movie in wishlist_store.movies" :key="movie.id" class="shadow-md ">
        <router-link :to="`/movies/${movie._id}`">
          <img :src="'http://localhost:5002/static/'+ movie.poster_img" class="h-3/4 w-full rounded-sm hover:opacity-75  object-fill  tansition easy-in-out duration-150" />

          <h1 v-bind:title="movie.movie_title" class="	truncate captalize text-md pt-3 pl-1  font-semibold  text-gray-900 dark:text-white">{{movie.movie_title}}</h1>
          <div class=" flex text-sm">
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
        </router-link>
        <div class="py-1 text-sm">
          <button @click="removeMovie(movie)" class="bg-yellow-500 p-1.5 rounded">Delete</button>
        </div>
      </div>
    </div>

    <!-- Pagination with load more button -->

  </section>
</template>
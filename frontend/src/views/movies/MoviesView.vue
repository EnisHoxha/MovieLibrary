<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../store/auth";
import { storeToRefs } from "pinia";
import Header from "../../components/HeaderComponent.vue";
import { usePaginationStore } from "../../store/pagination";
import { useToast } from "vue-toastification";
const host = import.meta.env.VITE_API_URL;
const auth_store = useAuthStore();
const pagination_store = usePaginationStore();
const user = auth_store.getAuth;
const toast = useToast();
const movies = ref([]);
const all_movie_length = ref(0);
const pageLimit = ref();
pageLimit.value = pagination_store.getPage;
const error = ref();
const sort_word = ref("latest");

function sorting() {
  if (sort_word.value === "latest") {
    return movies.value.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else if (sort_word.value === "release_date") {
    return movies.value.sort((p1, p2) =>
      p1.release_date < p2.release_date
        ? 1
        : p1.release_date > p2.release_date
        ? -1
        : 0
    );
  } else if (sort_word.value === "imdb_rating") {
    return movies.value.sort((p1, p2) =>
      p1.imdb_rating < p2.imdb_rating
        ? 1
        : p1.imdb_rating > p2.imdb_rating
        ? -1
        : 0
    );
  }
}

const getMovies = async () => {
  await axios
    .get(`${host}/api/movies/?limit=${pageLimit.value}`, {
      withCredentials: true,
    })
    .then((res) => {
      movies.value = res.data.movies;
      sorting();
      // limit.value = movies.value.length;
      pagination_store.changePage(movies.value.length);
    })
    .catch((error) => {
      // console.log(error);
      toast.error("Something went wrong!");
    });

  await axios
    .get(`${host}/api/movies`, { withCredentials: true })
    .then((res) => {
      all_movie_length.value = res.data.movies.length;
    })
    .catch((error) => {
      // console.log(error);
      toast.error("Something went wrong!");
    });
};

const loadMore = async () => {
  pagination_store.changePage(movies.value.length + 10);
  pageLimit.value = pagination_store.getPage;
  var element = document.getElementById("spiner");
  element.classList.toggle("hidden");
  await axios
    .get(`${host}/api/movies/?limit=${pageLimit.value}`, {
      withCredentials: true,
    })
    .then((res) => {
      movies.value = res.data.movies;
      sorting();
      pageLimit.value = pagination_store.getPage;
      element.classList.toggle("hidden");
    })
    .catch((error) => {
      // console.log(error);
      toast.error("Something went wrong!");
    });
};

onMounted(() => {
  getMovies();
});
</script>

<template>
  <Header />
  <section class="px-6 mx-5 pt-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between  mt-5 ">
      <h1 class="uppercase  text-yellow-500 text-lg font-semibold">
        Popular Movies
      </h1>

      <div class="flex items-center  ">
        <label for="filters" class="block mr-1  text-sm font-medium text-gray-900 dark:text-white">Filter:</label>
        <select @change="sorting()" v-model="sort_word" id="filters" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:p-2 p-1   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option disabled>Select filtering</option>
          <option value="release_date">Newest</option>
          <option value="imdb_rating">Imdb rating</option>
          <option value="latest">Recently added</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-3">

      <div v-for="movie in movies" :key="movie.id">
        <router-link :to="`/movies/${movie._id}`">
          <img :src="`${host}/static/`+ movie.poster_img" class="h-3/4 w-full rounded-sm hover:opacity-75  object-fill  tansition easy-in-out duration-150" />

          <h1 v-bind:title="movie.movie_title" class="	truncate captalize  text-md pt-3 pl-1   font-semibold  text-gray-900 dark:text-white">{{movie.movie_title}}</h1>
          <div class=" flex items-center text-sm">
            <svg class="fill-current text-yellow-500 w-4 h-4  " viewBox="0 0 24 24">
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
      </div>
    </div>

    <!-- Pagination with load more button -->

    <section class="load more">
      <div id="spiner" class="hidden container mx-auto flex justify-center ">
        <svg class="inline  mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>

      <div class=" p-4 sm:p-6 sm:mt-2  constainer mx-auto flex justify-center" v-if=" pageLimit < all_movie_length ">
        <button @click="loadMore()" class="dark:text-white text-xl font-bold bg-yellow-500 p-3 rounded-sm ">Load More</button>
      </div>

      <!-- <div v-else class="p-8 container mx-auto flex justify-center">
        <p class="inline p-2 dark:text-white sm:text-2xl font-semibold border border-yellow-500   ">All Movies Loaded</p>
      </div> -->
    </section>
  </section>
</template>

<style scoped>
</style>
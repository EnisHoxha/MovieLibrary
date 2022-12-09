<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useWishlistStore } from "../../store/wishlist";
import { useAuthStore } from "../../store/auth";
import _ from "lodash";
import { useToast } from "vue-toastification";
import Header from "../../components/HeaderComponent.vue";
import Footer from "../../components/FooterComponent.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css";

const host = import.meta.env.VITE_API_URL;
const router = useRouter();
const route = useRoute();
const auth_store = useAuthStore();
const wishlist_store = useWishlistStore();
const toast = useToast();
const movie = ref({});
const similar_movies = ref([]);
const movies = localStorage.getItem("movies");

const swiperOptions = {
  modules: [Navigation, Autoplay],
  autoplayConfig: {
    delay: 2000,
    disableOnIteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    400: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    414: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 10,
    },

    768: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 8,
      spaceBetween: 20,
    },
  },
};

const getMovie = async () => {
  await axios
    .get(`${host}/api/movies/` + route.params.id, {
      withCredentials: true,
    })
    .then((res) => {
      movie.value = res.data.movie;
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
};

const addWishlist = (movie) => {
  const data = _.find(wishlist_store.getMovies, movie);
  if (data) {
    toast.error("Movie already in wishlist");
    // console.log("product already in wishlist");
    // console.log(wishlist_store.getMovies);
  } else {
    wishlist_store.addMovie(movie);
    toast.success("Movie successfully added to wishlist");
    // console.log("Product successfully added to wishlist");
  }
};

const playTrailer = () => {
  const element = document.getElementById("playTrailer");
  element.classList.toggle("hidden");
};

const similarMovies = async () => {
  const genre = await movie.value.genres[0];
  await axios
    .get(`${host}/api/movies/typeGenre?genre=${genre}`, {
      withCredentials: true,
    })
    .then((res) => {
      similar_movies.value = res.data;
    })
    .catch((error) => {
      error.value = error;
      // console.log(error);
      toast.error("Something went wrong!");
    });
};

function closeVideo() {
  router.go();
}

onMounted(() => {
  getMovie();
  setTimeout(() => {
    similarMovies();
  }, 1000);
});
</script>

<template>
  <Header />
  <section>

    <div>
      <div class=" container gap-4 mx-auto flex flex-col sm:flex-row mt-6 md:mt-20 border-b p-8   border-gray-600  md:mb-2  ">
        <img :src="`${host}/static/`+movie.poster_img" alt="" class="h-full w-80 rounded-md  object-fill dark:opacity-80" />
        <div class="lg:ml-24 sm:ml-2">
          <h1 class="md:text-4xl text-xl dark:text-zinc-50 font-semibold">{{ movie.movie_title }}</h1>
          <span class="text-gray-500 text-xs md:text-sm flex ">
            <svg class="fill-current text-yellow-500 w-4 h-4 mr-1" viewBox="0 0 24 24">
              <g data-name="Layer 2">
                <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" />
              </g>
            </svg>
            {{ movie.imdb_rating  }} | {{ movie.release_date }} |

            <span :key="index" v-for="(item, index) in movie.genres" class="ml-1">
              {{ item}}
              <span v-if="movie.genres.length - 1 != index" class="ml-1">,</span>
            </span>
          </span>
          <p class="mt-5 flex items-center text-zinc-50">
            <svg class="w-6 h-6 inline-block pr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ movie.runtime}} min
          </p>

          <div class="mt-5 dark:text-gray-300 ">
            <span class="mt-5 font-semibold">Featured Cast:</span>

            <div class="flex ">
              <div :key="index" v-for="(actor, index) in movie.actors">
                <span class=" bg-gray-100 text-gray-800 text-xs font-semibold  rounded dark:bg-gray-700 dark:text-gray-300 inline-block px-1 py-1.5"><span class="pr-1 inline-block">{{ actor }}</span></span>
                <span v-if="movie.actors.length - 1 != index" class="pr-2"></span>
              </div>
            </div>
          </div>
          <div class="mt-5 dark:text-gray-50">
            <!-- <span class="mt-5 font-semibold text-sm">Description</span> -->
            <p class="font-light text-sm ">{{movie.description}}</p>
          </div>
          <div class="mt-5 flex flex font-medium text-xs md:text-base ">
            <!-- <a v-if="movie.movie_link" :href="`${movie.movie_link}`" target="_blank" class="rounded bg-yellow-500 px-5 py-3 first-letter:sm:py-3 inline-flex items-center  text-black ">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>

              <span class="ml-3">Play Trailer</span>
            </a> -->

            <button v-if="movie.movie_link" @click="playTrailer" class="rounded bg-yellow-500 px-5 py-3 first-letter:sm:py-3 inline-flex items-center  text-black ">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              <span class="ml-3">Play Trailer</span>
            </button>

            <a v-else href="" class="rounded bg-yellow-500 px-5 py-3 first-letter:sm:py-3 inline-flex items-center  text-black ">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>

              <span class="ml-3">Play Trailer</span>
            </a>

            <button :disabled="!auth_store.auth" @click="addWishlist(movie)" class="rounded bg-yellow-500 px-5 py-3 inline-flex items-center text-black  ml-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>

              <span class="ml-3">Favourite</span>
            </button>

          </div>
        </div>
      </div>

      <!-- More info -->

      <div class="container mx-auto flex flex-col sm:flex-row p-8 border-b border-gray-600 ">
        <div class="sm:w-1/2 w-full dark:text-white text-sm">
          <h1 class="text-xl  underline font-bold">More Info</h1>
          <p class="pt-3">Official language: {{movie.original_language}}</p>
          <p>Age Restrict: {{movie.adult ?'Yes':"No age restriction"}} </p>
          <p>Budget: {{movie.budget}} $</p>
        </div>
        <div class="sm:w-1/2 w-full">
          <h1 class="dark:text-white text-xl underline font-bold mt-5 sm:mt-0">Movie Studio</h1>
          <p class="text-xs dark:text-white mt-2 bg-gray-100 text-gray-800 text-xs font-semibold  rounded dark:bg-gray-700 dark:text-gray-300 inline-block px-1 py-1.5">{{movie.film_studio}}</p>
        </div>
      </div>

      <!--Similar Movies -->
      <div class="container mx-auto pb-8 border-b border-gray-600">
        <div class=" pt-8  pl-8">
          <h1 class="dark:text-white font-bold text-2xl sm:text-3xl category pl-2  border-yellow-500  border-l-8 ">
            More like this
          </h1>
        </div>
        <section class=" p-8 ">
          <swiper :breakpoints='swiperOptions.breakpoints' :modules="swiperOptions.modules" :autoplay="swiperOptions.autoplayConfig">
            <swiper-slide v-for="movie in similar_movies.movie" :key="movie.id">
              <div>
                <a :href="`/movies/${movie._id}`">
                  <img :src="`${host}/static/`+ movie.poster_img" class="h-52 w-full object-fill rounded-sm hover:opacity-75   tansition easy-in-out duration-150" />
                </a>
                <h1 v-bind:title="movie.movie_title" class="	truncate captalize  text-sm pt-3 pl-1   font-semibold  text-gray-900 dark:text-white">{{movie.movie_title}}</h1>
                <div class=" flex items-center">
                  <svg class="fill-current text-yellow-500 w-3 h-3  " viewBox="0 0 24 24">
                    <g data-name="Layer 2">
                      <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" />
                    </g>
                  </svg><span class="ml-2 dark:text-stone-300 text-xs">{{movie.imdb_rating}} | {{movie.release_date}} </span><br />
                </div>
                <div class="  flex truncate ">
                  <span class=" text-gray-500" v-for="genre in movie.genres" :key="genre.id">
                    <span class=" rounded text-xs pl-1 text-gray-500  ">
                      {{genre}}
                    </span>

                  </span>

                </div>
              </div>
            </swiper-slide>

            ...
          </swiper>
        </section>
      </div>
      <!-- Play trailer section -->
      <div class="hidden z-50 px-10 py-6 md:px-20 h-screen w-screen flex flex-col  fixed top-0 right-0 bottom-0 bg-black " id="playTrailer">
        <div class="flex justify-end mb-6 dark:text-white ">
          <button @click="playTrailer();closeVideo()" class="bg-yellow-500 rounded  sm:w-10 right-0 p-1 pointer-events-auto"> <svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg></button>
        </div>
        <iframe class="h-full  w-full " :src="`${movie.movie_link}`" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
      </div>
      <!-- End of play trailer section -->
    </div>
  </section>
  <Footer />
</template>

<style scoped>
</style>
<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import "swiper/css/navigation";
import "swiper/css";
import axios from "axios";
const host = import.meta.env.VITE_API_URL;

const movies = ref([]);

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
    1920: {
      slidesPerView: 10,
      spaceBetween: 20,
    },
  },
};

const getMovies = async () => {
  await axios
    .get(`${host}/api/movies/typeGenre?genre=War`, { withCredentials: true })
    .then((res) => {
      movies.value = res.data;
      //   console.log(res.data);
    })
    .catch((error) => {
      error.value = error;
      // console.log(error);
    });
};

onMounted(() => {
  getMovies();
});
</script>

<template>
  <section class="md:p-12 p-6 ">
    <h1 class="md:text-4xl font-medium dark:text-white border-l-4 border-yellow-500 my-2 pl-2">War Movies</h1>
    <swiper :breakpoints='swiperOptions.breakpoints' :navigation="true" :loop="true" :modules="swiperOptions.modules" :autoplay="swiperOptions.autoplayConfig">

      <swiper-slide v-for="movie in movies.movie" :key="movie.id">
        <div>
          <router-link :to="`/movies/${movie._id}`">
            <img :src="`${host}/static/`+ movie.poster_img" class="h-52 w-full object-fill rounded-sm hover:opacity-75   tansition easy-in-out duration-150" />
          </router-link>
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
</template>

<style >
</style>>
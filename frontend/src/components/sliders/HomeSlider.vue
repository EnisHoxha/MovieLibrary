<script setup>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

const movies = ref([]);

const swiperOptions = {
  modules: [Navigation, Autoplay, Pagination],
  autoplayConfig: {
    delay: 7000,
    disableOnIteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    // 320: {
    //   slidesPerView: 2,
    //   spaceBetween: 10,
    // },
    // 400: {
    //   slidesPerView: 2,
    //   spaceBetween: 40,
    // },
    // 414: {
    //   slidesPerView: 3,
    //   spaceBetween: 10,
    // },
    // 640: {
    //   slidesPerView: 4,
    //   spaceBetween: 10,
    // },

    // 768: {
    //   slidesPerView: 4,
    //   spaceBetween: 25,
    // },
    // 1024: {
    //   slidesPerView: 6,
    //   spaceBetween: 20,
    // },
    1280: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
};

const getMovies = async () => {
  await axios
    .get("http://localhost:5002/api/movies/typeFeatured")
    .then((res) => {
      movies.value = res.data;
      // console.log(res.data);
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
  <section class="md:p-12 p-6 ">
    <h1 class="md:text-4xl font-medium dark:text-white border-l-4 border-yellow-500 my-2 pl-2">Featured</h1>
    <swiper :breakpoints='swiperOptions.breakpoints' navigation :pagination="{ clickable: true }" :loop="true" :modules="swiperOptions.modules" :autoplay="swiperOptions.autoplayConfig">

      <swiper-slide v-for="movie in movies.movie" :key="movie.id">
        <div>
          <router-link :to="`/movies/${movie._id}`">
            <img :src="'http://localhost:5002/static/'+ movie.featured_img" class="h-[50vh] sm:h-[70vh] md:h-[60vh] lg:h-[90vh] w-full rounded-[12px] object-cover sm:object-fill rounded-md opacity-100 dark:opacity-75  tansition easy-in-out duration-150" />
          </router-link>
          <div class="sm:absolute bottom-20 left-6">
            <router-link :to="`/movies/${movie._id}`">
              <h1 v-bind:title="movie.movie_title" class="	truncate captalize  sm:text-4xl pt-3 pl-1  font-semibold  sm:text-white dark:text-white text-gray-900">{{movie.movie_title}}</h1>
              <div class=" flex items-center ">
                <svg class="fill-current text-yellow-500 w-3 h-3  " viewBox="0 0 24 24">
                  <g data-name="Layer 2">
                    <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z" data-name="star" />
                  </g>
                </svg><span class="ml-2 sm:text-stone-300 dark:text-stone-300 text-md">{{movie.imdb_rating}} | {{movie.release_date}} </span><br />
              </div>
              <div class="  flex truncate ">
                <span class=" sm:text-white dark:text-white" v-for="genre in movie.genres" :key="genre.id">
                  <span class=" rounded text-xs pl-1   ">
                    {{genre}}
                  </span>

                </span>

              </div>
              <div class="md:w-1/2 sm:w-3/4">
                <p class="pl-1 sm:text-white dark:text-white font-light text-xs sm:text-lg leading-4 sm:leading-6 ">{{movie.description}}</p>
              </div>
            </router-link>
          </div>

        </div>
      </swiper-slide>

      ...
    </swiper>
  </section>
</template>

<style scoped>
.swiper-button-next,
.swiper-button-prev {
  background-color: white !important;
  box-shadow: 0 0 9px #adadad;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 10px;
  font-weight: bolder;
  top: 30%;
  opacity: 0.8;
}
</style>>

<script setup>
import Footer from "../../components/FooterComponent.vue";
</script>


<template>
  <Header />
  <section>

    <div>
      <div class=" container gap-4 mx-auto flex flex-col sm:flex-row mt-6 md:mt-20 border-b p-8   border-gray-600  md:mb-2 animate-pulse ">
        <div class="h-96 w-80 rounded-md  object-fill dark:opacity-80 dark:bg-slate-700 bg-slate-200 ">
        </div>
        <div class="lg:ml-24 sm:ml-2 ">
          <div class=" w-80 md:w-96 h-11 dark:bg-slate-700 bg-slate-200 rounded-md">
            <h1 class="md:text-4xl text-xl dark:text-zinc-50 font-semibold "></h1>
          </div>

          <div class="mt-5 flex flex font-medium text-xs md:text-base w-60 lg:w-60 h-11 dark:bg-slate-700 bg-slate-200 rounded-md ">
            <!-- <a v-if="movie.movie_link" :href="`${movie.movie_link}`" target="_blank" class="rounded bg-yellow-500 px-5 py-3 first-letter:sm:py-3 inline-flex items-center  text-black ">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
  
                <span class="ml-3">Play Trailer</span>
              </a> -->

          </div>
        </div>

      </div>

      <!-- More info -->

      <!-- Play trailer section -->

      <!-- End of play trailer section -->
    </div>

  </section>

</template>

  <style  scoped>
</style>
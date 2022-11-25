<script setup>
// import { useDark, useToggle } from "@vueuse/core";
import { onMounted, ref } from "vue";
import Header from "../components/HeaderComponent.vue";
import Footer from "../components/FooterComponent.vue";
import MoviesSlider from "../components/sliders/MoviesSlider.vue";
import HomeSlider from "../components/sliders/HomeSlider.vue";

// const isDark = useDark();
// const toggleDark = useToggle(isDark);

var isDark = ref();

const darkMode = () => {
  if (localStorage.theme === "dark" || localStorage.getItem("theme") === null) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    isDark.value = true;
  }
};
const addDark = () => {
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark";
  isDark.value = true;
};

const removeDark = () => {
  document.documentElement.classList.remove("dark");
  localStorage.theme = "light";
  isDark.value = false;
};

onMounted(() => {
  darkMode();
});
</script>

<template>
  <Header />
  <HomeSlider />
  <section class="md:p-12 p-6">
    <h1 class="md:text-6xl text-2xl sm:text-4xl dark:text-white  my-2   pl-2  border-l-4 border-yellow-500 font-bold ">Theater in your Home... <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sm:w-16 sm:h-16 h-8 w-8 inline">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </span></h1>
  </section>
  <MoviesSlider />
  <div class="container mx-auto  bg-green-300 p-5 mb-12 dark:bg-slate-800 text-white">
    <div class="columns-1  items-center ">
      <h1 class=" font-extrabold  p-2 text-gray-900 dark:text-green font-mono ">Card header</h1>
      <p class="font-mono p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti commodi et omnis, voluptatibus velit, aspernatur dicta eveniet sint eum a iure id mollitia, pariatur odit. Ducimus adipisci doloribus dolorem quaerat?</p>
      <button v-if="isDark" @click="removeDark()" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5 p-2">Light</button>

      <button class="bg-green-900 rounded p-3" @click="addDark() " v-if="!isDark">
        Dark
      </button>

    </div>
    <p class="text-black dark:text-white">{{isDark}}</p>
  </div>

  <Footer />
</template>

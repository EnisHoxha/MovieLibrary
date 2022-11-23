<script setup>
// import { useDark, useToggle } from "@vueuse/core";
import { onMounted, ref } from "vue";
import Header from "../components/HeaderComponent.vue";
import Footer from "../components/FooterComponent.vue";
import MoviesSlider from "../components/sliders/MoviesSlider.vue";

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

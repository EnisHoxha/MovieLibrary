<script setup>
// import { useDark, useToggle } from "@vueuse/core";
import { onMounted, ref } from "vue";
import Header from "../components/HeaderComponent.vue";
import Footer from "../components/FooterComponent.vue";
import MoviesSlider from "../components/sliders/MoviesSlider.vue";
import SeriesSlider from "../components/sliders/SeriesSlider.vue";
import ActionSlider from "../components/sliders/genres/ActionSlider.vue";
import DramaSlider from "../components/sliders/genres/DramaSlider.vue";
import BiographySlider from "../components/sliders/genres/BiographySlider.vue";
import HomeSlider from "../components/sliders/HomeSlider.vue";
import WarSlider from "../components/sliders/genres/WarSlider.vue";

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
  <SeriesSlider />
  <ActionSlider />
  <DramaSlider />
  <BiographySlider />
  <WarSlider />
  <Footer />
</template>

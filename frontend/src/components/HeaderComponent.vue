<script setup>
import { ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";
import axios from "axios";
const host = import.meta.env.VITE_API_URL;

const router = useRouter();
const route = useRoute();
const $cookies = inject("$cookies");
const auth_store = useAuthStore();
const search_term = ref("");
const search_error = ref("");
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

const logOut = async () => {
  let tokens = {
    token: "token",
    user_auth: "user_auth",
  };
  await axios
    .post(`${host}/api/auth/logout`, tokens, {
      withCredentials: true,
    })
    .then((res) => {
      router.push({ name: "home" });
      router.go();
    });
};

const openMenu = () => {
  var element = document.getElementById("navbar-search");
  element.classList.toggle("hidden");
};

const searchMovies = () => {
  if (search_term.value.length > 3) {
    if (route.name != "search") {
      router.push({ name: "search", query: { movie_name: search_term.value } });
    } else {
      router.push({ query: { movie_name: search_term.value } });
      setTimeout(() => {
        router.go();
      }, 1);
    }
  } else {
    search_error.value = "Include more than 3 characters in search box";
  }
};

onMounted(() => {
  darkMode();
});
</script>

<template >
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5  shadow-lg shadow-gray-100 dark:bg-gray-900 dark:shadow-md dark:shadow-slate-800">
    <div class=" flex flex-wrap items-center justify-between md:px-6">
      <router-link to="/" class="flex sm:items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="MovieLibrary Logo" />
        <span class="self-center text-md md:text:xl font-semibold whitespace-nowrap dark:text-white">MovieLibrary</span>
      </router-link>

      <div class="flex md:order-2">
        <button @click="openMenu()" type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
        <div class="relative hidden md:block">
          <input @keyup.enter="searchMovies()" v-model="search_term" type="text" id="search-navbar" class="block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />

          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <button @click="searchMovies()" class="cursor-pointer">
              <svg class="w-5 h-5 text-gray-500 pointer-events-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <span class="sr-only">Search icon</span>
          </div>
          <small class="text-red-500 absolute left-0 font-bold text-xs ">{{search_error}}</small>
        </div>
        <div class="flex pl-0 md:pl-4 xl:pl-4 items-center">
          <button @click="removeDark()" v-if="isDark" class="sm:ml-3 sm:mr-3 hover:bg-gray-100 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-700 dark:border-gray-700 p-2 rounded">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </button>
          <button @click="addDark()" v-if="!isDark" class="ml-3 mr-3 hover:bg-gray-100 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-gray-700 dark:border-gray-700 p-2 rounded">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <router-link to="/login" class="sm:ml-1 sm:mr-3">
            <button v-if="!auth_store.getAuth" class="text-gray-700 bg-gray-100 dark:bg-gray-700 rounded md:hover:text-primary-700 md:dark:hover:text-white dark:text-gray-400 dark:hover:text-white md:dark:hover:md:dark:hover:bg-gray-700 dark:border-gray-700 p-2">
              Login
            </button>

            <button @click.prevent="logOut()" v-if="auth_store.getAuth" class="text-gray-700 bg-gray-100 dark:bg-gray-700 rounded md:hover:text-primary-700 md:dark:hover:text-white dark:text-gray-400 dark:hover:text-white md:dark:hover:md:dark:hover:bg-gray-700 dark:border-gray-700 p-2">
              Logout
            </button>
          </router-link>
        </div>
        <button @click="openMenu()" data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
          <span class="sr-only">Open menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-search">
        <div class="relative mt-3 md:hidden">
          <input @keyup.enter="searchMovies()" v-model="search_term" type="text" id="search-navbar" class="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">

            <button @click="searchMovies()" class="cursor-pointer">
              <svg class="w-5 h-5 text-gray-500 pointer-events-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <small class="text-red-500 absolute left-0 font-bold text-xs ">{{search_error}}</small>
        </div>
        <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link to="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</router-link>
          </li>
          <li>
            <router-link to="/movies" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Movies
            </router-link>
          </li>
          <li>
            <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Genres</a>
          </li>
          <li v-if="auth_store.getAuth">
            <router-link v-if="auth_store.auth ==='admin'" to="/admin" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent hover:underline md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              My Account
            </router-link>
            <router-link v-else to="/user" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent hover:underline md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              My Account
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import Header from "../components/HeaderComponent.vue";
import Footer from "../components/FooterComponent.vue";
import { useToast } from "vue-toastification";
const host = import.meta.env.VITE_API_URL;
const router = useRouter();
const email = ref();
const password = ref();
const customError = ref();
const toast = useToast();

const login = async () => {
  let newUser = {
    email: email.value,
    password: password.value,
  };
  await axios
    .post(`${host}/api/auth/login`, newUser, {
      withCredentials: true,
    })
    .then(
      (res) => {
        // console.log(res.data.user.role);

        // const userRole = $cookies.get("user_auth");
        // const key = import.meta.env.VITE_CRYPTOJS_KEY;
        // auth_store.changeAuth(userRole, key);
        // const value = res.data.user.role;
        toast.success("Successfully login!");
        customError.value = "";
        router.push({ name: "home" });
        setTimeout(() => {
          router.go();
        }, 1000);
      },
      (error) => {
        toast.error("Something went wrong");
        customError.value = error.response.data.msg;
        console.log(error.response.data.msg);
      }
    );
};
</script>

<template>
  <Header />
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <router-link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        Welcome back
      </router-link>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" method="post">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <p v-if="customError" class="text-red-500">
                    {{customError}}
                  </p>
                </div>

              </div>

            </div>
            <button @click.prevent="login()" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-600">Sign in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link to="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

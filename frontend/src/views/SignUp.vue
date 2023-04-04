<script setup>
import { ref, inject, onUpdated } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
// import VueCookies from "vue-cookies";
import CryptoJS from "crypto-js";
import Header from "../components/HeaderComponent.vue";
import Footer from "../components/FooterComponent.vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";
const host = import.meta.env.VITE_API_URL;
const $cookies = inject("$cookies");
const router = useRouter();
const route = useRoute();
const toast = useToast();
const auth_store = useAuthStore();

const customError = ref();

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
});

const signUp = async (values) => {
  await axios
    .post(`${host}/api/auth/register`, values, {
      withCredentials: true,
    })
    .then(
      (res) => {
        customError.value = "";
        toast.success("Successfully sign up,now you can login");
        router.push({ name: "login" });
        // router.go();
      },
      (error) => {
        toast.error("Something went wrong!");
        customError.value = error.response.data.msg;
        // console.log(error.response.data.msg);
      }
    );
};
</script>

<template  >
  <Header />
  <section class="bg-gray-50 dark:bg-gray-900 mb-5">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-10 md:h-screen lg:py-0">
      <router-link to="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        Join MovieLibrary community
      </router-link>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up to MovieLibrary
          </h1>
          <Form @submit="signUp" class="space-y-4 md:space-y-6" method="post" :validation-schema="schema" v-slot="{errors}">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
              <Field type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" :class="{'is-invalid':errors.name}" />
              <p class="text-red-500 text-sm">{{errors.name}}</p>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <Field type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="" />
              <p class="text-red-500 text-sm">{{errors.email}}</p>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <Field type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              <p class="text-red-500 text-sm ">{{errors.password}}</p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div v-if="customError" class="flex items-center h-5">
                  <p v-if="customError" class="text-red-500">
                    {{customError}}
                  </p>
                </div>

              </div>

            </div>
            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-600">Sign up</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already registered?
              <router-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</router-link>
            </p>

          </Form>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>

<style scoped>
textarea:focus,
input:focus {
  outline: none;
}

/* input {
  background: black;
  color: white;
} */
</style>
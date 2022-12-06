<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const host = import.meta.env.VITE_API_URL;

const router = useRouter();
const toast = useToast();

const movie_title = ref("");
const budget = ref(0);
const movie_link = ref("");
const actors = ref([]);
const directors = ref([]);
const genres = ref([]);
const original_language = ref("");
const image = ref("");
const featured_image = ref("");
const release_date = ref("");
const runtime = ref("");
const imdb_rating = ref(0);
const type = ref("");
const film_studio = ref("");
const description = ref("");

const selectImages = (e) => {
  let selectedFile = e.target.files[0];
  image.value = selectedFile;
};

const selectFeatured = (e) => {
  let selectedFile = e.target.files[0];
  featured_image.value = selectedFile;
};

const upload = async () => {
  const formData = new FormData();
  formData.append("movie_title", movie_title.value);
  formData.append("budget", budget.value);
  formData.append("movie_link", movie_link.value);
  let actor = actors.value.split(";");
  for (let i = 0; i < actor.length; i++) {
    formData.append("actors", actor[i]);
  }
  let director = directors.value.split(";");
  for (let i = 0; i < director.length; i++) {
    formData.append("directors", director[i]);
  }
  let genre = genres.value.split(";");
  for (let i = 0; i < genre.length; i++) {
    formData.append("genres", genre[i]);
  }
  formData.append("original_language", original_language.value);
  formData.append("image", image.value);
  formData.append("featured_image", featured_image.value);
  formData.append("release_date", release_date.value);
  formData.append("runtime", runtime.value);
  formData.append("imdb_rating", imdb_rating.value);
  formData.append("type", type.value);
  formData.append("film_studio", film_studio.value);
  formData.append("description", description.value);

  await axios
    .post(`${host}/api/movies`, formData, {
      withCredentials: true,
    })
    .then((res) => {
      toast.success("Movie saved sucessfully");
      setTimeout(() => {
        router.go();
      }, 1000);
    })
    .catch((error) => {
      toast.error("Something went wrong!");
      // console.log(error);
    });
};
</script>

<template>
  <section>
    <h1 class="m-2 dark:text-white text-2xl font-semibold mb-3">Add Movie</h1>
    <form method="post " class="p-2">

      <div class="grid gap-6 mb-6 md:grid-cols-2 ">
        <div>
          <label for="movie_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie name</label>
          <input v-model="movie_title" type="text" id="movie_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movie title" required>
        </div>
        <div>
          <label for="budget" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Budget</label>
          <input v-model="budget" type="text" id="budget" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Budget in $" required>
        </div>
        <div>
          <label for="language" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Original movie language</label>
          <input v-model="original_language" type="text" id="language" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example EN" required>
        </div>
        <div>
          <label for="rating" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IMDB rating</label>
          <input v-model="imdb_rating" type="text" id="rating" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example 7.8" required>
        </div>
        <div>
          <label for="release_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release date</label>
          <input v-model="release_date" type="text" id="release_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2022" required>
        </div>
        <div>
          <label for="runtime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Runtime</label>
          <input v-model="runtime" type="number" id="runtime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
        </div>
        <div class="mb-6">
          <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
          <input v-model="type" type="text" id="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movie or Series" required>
        </div>
        <div class="mb-6">
          <label for="movie_studio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Film Studio</label>
          <input v-model="film_studio" type="text" id="movie_studio" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SONY" required>
        </div>
        <div class="mb-6">

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="image">Movie poster</label>
          <input @change="selectImages" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="image" type="file" name="image">
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or WEBP Image Formats.</p>

        </div>
        <div class="mb-6">

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="featured_image">Movie featured</label>
          <input @change="selectFeatured" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="featured_image" type="file" name="featured_image">
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or WEBP Image Formats.</p>

        </div>

        <div class="mb-6">
          <label for="directors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Directors</label>
          <input v-model="directors" type="text" id="directors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Director Name" required>
        </div>
        <div class="mb-6">
          <label for="actors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Actors</label>
          <input v-model="actors" type="text" id="actors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Actor Name" required>
        </div>
        <div class="mb-6">
          <label for="genres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genres</label>
          <input v-model="genres" type="text" id="genres" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Action" required>
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie description</label>
          <textarea v-model="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Short movie description here..."></textarea>
        </div>
        <div class="mb-6">
          <label for="movie_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie link</label>
          <input v-model="movie_link" type="text" id="movie_link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com" required>
        </div>

      </div>

      <button @click.prevent="upload()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Movie</button>
    </form>

  </section>
</template>
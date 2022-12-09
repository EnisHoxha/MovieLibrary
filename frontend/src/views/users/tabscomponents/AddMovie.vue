<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
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
const runtime = ref(0);
const imdb_rating = ref(0);
const type = ref("");
const film_studio = ref("");
const description = ref("");

const schema = yup.object().shape({
  movie_title: yup.string().required(),
  budget: yup
    .number()
    .min(7000, "budget can't be less than 70000$")
    .max(400000000, "budget can't be more than 400000000$")
    .required(),
  image: yup.mixed().required("Poster_image is required"),
  featured_image: yup.mixed().required("Backdrop_image is required"),
  original_language: yup.string().required(),
  imdb_rating: yup.number().min(1).max(10).required(),
  release_date: yup
    .string()
    .required("Please enter the year when movie was released"),
  runtime: yup
    .number()
    .min(30, "Runtime can't be less than 30 minutes")
    .max(180, "Runtime can't be more than 180 minutes")
    .required(),
  type: yup
    .string()
    .required(
      "Field required enter 'Movie' or 'Series' with first leter captalized "
    ),
  film_studio: yup.string().required("Enter movie production studio"),
  // directors: yup.array().required(),
  // actors: yup.array().required(),
  // genres: yup.array().required(),
  description: yup.string().required("Short movie description is required"),
  movie_link: yup
    .string()
    .required("Enter movie trailer link from youtube embedded"),
});

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
    <Form @submit="upload" method="post " class="p-2" :validation-schema="schema" v-slot="{errors}">

      <div class="grid gap-6 mb-6 md:grid-cols-2 ">
        <div>
          <label for="movie_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie name</label>
          <Field name="movie_title" v-model="movie_title" type="text" id="movie_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movie title" required />
          <p class="text-sm text-red-500">{{errors.movie_title}}</p>
        </div>
        <div>
          <label for="budget" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Budget</label>
          <Field v-model="budget" name="budget" type="text" id="budget" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Budget in $" required />
          <p class="text-red-500 text-sm">{{errors.budget}}</p>
        </div>
        <div>
          <label for="language" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Original movie language</label>
          <Field v-model="original_language" name="original_language" type="text" id="language" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example EN" required />
          <p class="text-red-500 text-sm">{{errors.original_language}}</p>
        </div>
        <div>
          <label for="rating" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IMDB rating</label>
          <Field v-model="imdb_rating" name="imdb_rating" type="text" id="rating" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example 7.8" required />
          <p class="text-red-500 text-sm">{{errors.imdb_rating}}</p>
        </div>
        <div>
          <label for="release_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release date</label>
          <Field v-model="release_date" name="release_date" type="text" id="release_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2022" required />
          <p class="text-red-500 text-sm">{{errors.release_date}}</p>
        </div>
        <div>
          <label for="runtime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Runtime</label>
          <Field v-model="runtime" name="runtime" type="number" id="runtime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          <p class="text-red-500 text-sm">{{errors.runtime}}</p>
        </div>
        <div class="mb-6">
          <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
          <Field v-model="type" name="type" type="text" id="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Movie or Series" required />
          <p class="text-red-500 text-sm">{{errors.type}}</p>
        </div>
        <div class="mb-6">
          <label for="movie_studio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Film Studio</label>
          <Field v-model="film_studio" name="film_studio" type="text" id="movie_studio" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SONY" required />
          <p class="text-red-500 text-sm">{{errors.film_studio}}</p>
        </div>
        <div class="mb-6">

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="image">Movie poster</label>
          <Field @change="selectImages" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="image" type="file" name="image" />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or WEBP Image Formats.</p>
          <p class="text-red-500 text-sm">{{errors.image}}</p>
        </div>
        <div class="mb-6">

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="featured_image">Movie featured</label>
          <Field @change="selectFeatured" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="featured_image" type="file" name="featured_image" />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or WEBP Image Formats.</p>
          <p class="text-red-500 text-sm">{{errors.featured_image}}</p>
        </div>

        <div class="mb-6">
          <label for="directors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Directors</label>
          <Field v-model="directors" name="directors" type="text" id="directors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Director Name" required />
          <p class="text-red-500 text-sm">{{errors.directors}}</p>
        </div>
        <div class="mb-6">
          <label for="actors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Actors</label>
          <Field v-model="actors" name="actors" type="text" id="actors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Actor Name" required />
          <p class="text-red-500 text-sm">{{errors.actors}}</p>
        </div>
        <div class="mb-6">
          <label for="genres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genres</label>
          <Field v-model="genres" name="genres" type="text" id="genres" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Action" required />
          <p class="text-red-500 text-sm">{{errors.genres}}</p>
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie description</label>
          <Field as="textarea" id="description" name="description" v-model="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Short movie description here..." />
          <p class="text-red-500 text-sm">{{errors.description}}</p>
        </div>
        <div class="mb-6">
          <label for="movie_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie link</label>
          <Field v-model="movie_link" name="movie_link" type="text" id="movie_link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://example.com" required />
          <p class="text-red-500 text-sm">{{errors.movie_link}}</p>
        </div>

      </div>

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Movie</button>
    </Form>

  </section>
</template>
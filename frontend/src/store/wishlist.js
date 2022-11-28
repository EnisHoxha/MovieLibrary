import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", {
  state: () => {
    return {
      movies: [],
    };
  },

  actions: {
    addMovie(movie) {
      this.movies.push(movie);
      localStorage.setItem("movies", JSON.stringify(this.movies));
    },
  },

  getters: {
    getMovies: (state) => {
      return state.movies;
    },
  },
});

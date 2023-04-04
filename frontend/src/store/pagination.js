import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", {
  state: () => {
    return {
      pageItems: 10,
    };
  },

  actions: {
    changePage(page) {
      this.pageItems = page;
      sessionStorage.setItem("page", this.pageItems);
    },
  },

  getters: {
    getPage(state) {
      //uncomment if you want page number to persist in refresh
      //   if (sessionStorage.getItem("page")) {
      //     state.pageItems = sessionStorage.getItem("page");
      //     return state.pageItems;
      //   } else {
      //           return state.pageItems;
      //   }
      return state.pageItems;
    },
  },
});

import { defineStore } from "pinia";
import { VueCookies } from "vue-cookies";
import CryptoJS from "crypto-js";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      auth: "",
    };
  },

  actions: {
    changeAuth(value, key) {
      const user_auth = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_auth="))
        ?.split("=")[1];

      if (user_auth) {
        const decoded_userRole = CryptoJS.AES.decrypt(value, key);
        const originalText = decoded_userRole.toString(CryptoJS.enc.Utf8);
        this.auth = originalText;
      } else {
        this.auth = "";
      }
    },
  },

  getters: {
    getAuth: (state) => {
      return state.auth;
    },
  },
});

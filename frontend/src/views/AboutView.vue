<script setup>
import { useUserStore } from "../store/users";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const user_store = useUserStore();
const { users, getUsers } = storeToRefs(user_store);

const user_local = ref({
  name: "",
  surname: "",
});

const addUser = () => {
  user_store.create(user_local.value);

  user_local.value = {
    name: "",
    surname: "",
    id: "",
  };
};
</script>

<template>
  <div class="about">
    <p>{{users}}</p>
    <router-link to="signup" class="bg-black text-white">SignUp</router-link>
    <!-- <form action="" method="post"> -->
    <input type="text" name="name" v-model="user_local.name">
    <label for="name">name</label>
    <input type="text" name="surname" v-model="user_local.surname">
    <label for="surname">surname</label>
    <input type="text" name="id" v-model="user_local.id">
    <label for="id">id</label>

    <button @click.prevent="addUser()">Add user</button>
    <!-- </form> -->
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

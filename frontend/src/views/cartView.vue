<script setup>
import { ref } from "vue";

const user = ref({
  name: "",
  id: "",
});

const users = ref([]);

function addUser() {
  users.value.push(user.value);

  user.value = {
    name: "",
    id: "",
  };
}
</script>

<template>

  <div>
    <h1 class="font-bold ">This is an protected route...</h1>
    <label for="name">Your name:</label>
    <input type="text" name="name" v-model="user.name">
    <label for="id">Your id:</label>
    <input type="text" name="id" v-model="user.id">
    <button @click="addUser()">Add User</button>
    <router-link to="/signUp"> go login</router-link>
  </div>
  <div v-for="user in users" :key="user.id">
    <h1>{{user.name}}</h1>
    <h1>{{user.id}}</h1>
  </div>
</template>
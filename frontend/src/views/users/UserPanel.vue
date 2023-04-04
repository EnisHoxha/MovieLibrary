<script setup>
import { ref, onMounted } from "vue";
import Header from "../../components/HeaderComponent.vue";
import UserProfile from "./tabscomponents/UserProfile.vue";
import WishList from "./tabscomponents/WishList.vue";

const tabNumber = ref(0);
</script>

<template>
  <Header />
  <div class="container mx-auto p-4 sm:p-8">
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-xs sm:text-sm sm:font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
        <li class="sm:mr-2" role="presentation">
          <button @click="tabNumber=0" class="inline-block  p-2 sm:p-4 rounded-t-lg border-b-2 dark:text-white" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Profile
          </button>
        </li>
        <li class="sm:mr-2" role="presentation">
          <button @click="tabNumber = 1;" class="inline-block p-2 sm:p-4 rounded-t-lg border-b-2 border-transparent dark:text-white hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            WishList
          </button>
        </li>

      </ul>
    </div>
    <div id="myTabContent">
      <div v-if="tabNumber===0" class=" sm:p-4 bg-gray-50 rounded-lg dark:bg-gray-800 " id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <UserProfile />
      </div>
      <div v-if="tabNumber===1" class=" p-4  bg-gray-50 rounded-lg dark:bg-gray-800 min-h-screen " id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
        <WishList />
      </div>

    </div>
  </div>

</template>
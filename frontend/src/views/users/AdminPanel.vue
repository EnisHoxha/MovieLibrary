<script setup>
import { ref, onMounted } from "vue";
import Header from "../../components/HeaderComponent.vue";
import UserProfile from "./tabscomponents/UserProfile.vue";
import AddMovie from "./tabscomponents/AddMovie.vue";
import EditMovie from "./tabscomponents/EditMovie.vue";
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
            Add movies
          </button>
        </li>
        <li class="sm:mr-2" role="presentation">
          <button @click="tabNumber=2;" class="inline-block p-2 sm:p-4 rounded-t-lg border-b-2 border-transparent dark:text-white hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit Movie
          </button>
        </li>
        <li class="" role="presentation">
          <button @click="tabNumber=3" class="inline-block p-2 sm:p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:text-white" id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            Contacts</button>
        </li>
      </ul>
    </div>
    <div id="myTabContent">
      <div v-if="tabNumber===0" class=" p-4 bg-gray-50 rounded-lg dark:bg-gray-800 " id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <UserProfile />
      </div>
      <div v-if="tabNumber===1" class=" p-4 bg-gray-50 rounded-lg dark:bg-gray-800 " id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
        <AddMovie />
      </div>
      <div v-if="tabNumber===2" class=" p-4 bg-gray-50 rounded-lg dark:bg-gray-800" id="settings" role="tabpanel" aria-labelledby="settings-tab">
        <EditMovie />
      </div>
      <div v-if="tabNumber===3" class=" p-4 bg-gray-50 rounded-lg dark:bg-gray-800 " id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
        <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
      </div>
    </div>
  </div>

</template>
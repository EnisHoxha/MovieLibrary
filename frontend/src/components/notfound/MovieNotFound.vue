<template>
  <section class=" h-screen  w-full flex flex-col justify-center items-center bg-slate-100 dark:bg-inherit ">
    <h1 class="text-9xl font-extrabold dark:text-white tracking-widest">404</h1>
    <div class="bg-red-500 px-2 text-xs rounded rotate-12 absolute">
      Movie not found
    </div>
    <button class="mt-5">
      <router-link to="/" class="relative inline-block text-sm font-medium text-black dark:text-red-500 group active:text-red-500 focus:outline-none focus:ring">
        <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

        <span class="relative block px-8 py-3 dark:bg-[#1A2238] bg-slate-100 border border-current">
          Go Home
        </span>
      </router-link>
    </button>
  </section>
</template>
<template>
  <!-- sidebar layout starts here -->
  <div class="flex min-h-screen">
    <div class="flex flex-col w-72">
      <div
        class="
          flex flex-col flex-grow
          bg-theme-black
          border-r border-gray-100
          shadow-lg
        "
        id="sidebar"
      >
        <!-- sidebar content starts here -->
        <div class="flex flex-col flex-shrink-0">
          <div class="w-full text-center border-b border-theme-green">
            <h1
              class="
                text-3xl
                font-bold
                text-neutral-600
                font-serif
                text-theme-green
                eading-6
                my-2
              "
            >
              SITRA
            </h1>
          </div>
          <div class="flex flex-col flex-grow mt-2">
            <nav class="flex-1 space-y-1">
              <ul class="overflow-y-auto">
                <li v-for="content in contents" :key="content.id" class="">
                  <router-link
                    :to="content.link"
                    class="
                      text-base
                      inline-flex
                      text-theme-green
                      focus:shadow-outline
                      items-center
                      transition
                      transform
                      ease-in
                      duration-200
                      hover:text-yellow-300
                      p-2
                      mt-1
                      rounded-xl
                      cursor-pointer
                    "
                  >
                    <i :class="content.icon" class="m-3"></i>
                    {{ content.text }}</router-link
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div
        class="
          flex flex-shrink-0
          p-4
          bg-gradient-to-tl
          from-theme-green
          to-gray-600
          text-green-900
        "
      >
        <a class="block w-full group">
          <div class="flex items-center">
            <div>
              <img
                class="inline-block rounded-full h-9 w-9"
                src="https://d33wubrfki0l68.cloudfront.net/c5b13c40dad2f6fe28f2f7f016c9d027f2a39306/afe15/images/wickedlabslogo.jpg"
                alt=""
              />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ depName }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Sidebar",
  props: ["contents"],
  setup() {
    const depName = ref(sessionStorage.getItem("depName"));
    return {
      depName,
    };
  },
};
</script>

<style>
</style>
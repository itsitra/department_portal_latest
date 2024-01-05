<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <div
      class="text-xl font-bold breadcrumbs mb-10 p-2 w-2/4 ml-96 flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900"
    >
      <ul>
        <li>
          <a>Textile Calculations - Upload</a>
        </li>
      </ul>
    </div>
    <div class="mr-12 mt-8 ml-96 w-auto">
      <a
        href="http://lab.sitraonline.org.in/energyauditapi/index.php/multi"
        class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition duration-500 ease-linear hover:bg-theme-black hover:text-theme-green"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
      </a>
    </div>
    <div class="grid grid-cols-4 gap-5 w-3/4 ml-96 mr-12 mt-10">
      <div class="w-10 h-10">
        <div
          @click="
            uploadFiles({
              fileno: 1,
            })
          "
          :class="[btn1 ? 'btn-disabled' : '']"
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition duration-500 ease-linear hover:bg-theme-black hover:text-theme-green"
        >
          <span class="text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </span>
          <span class="mt-2 text-base leading-normal"> Upload UKG File </span>
        </div>
      </div>
      <div class="w-10 h-10">
        <div
          :class="[btn2 ? 'btn-disabled' : '']"
          @click="
            uploadFiles({
              fileno: 2,
            })
          "
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition duration-500 ease-linear hover:bg-theme-black hover:text-theme-green"
        >
          <span class="text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </span>
          <span class="mt-2 text-base leading-normal"> Upload Power File </span>
        </div>
      </div>
      <div class="w-10 h-10">
        <div
          :class="[btn3 ? 'btn-disabled' : '']"
          @click="
            uploadFiles({
              fileno: 3,
            })
          "
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition duration-500 ease-linear hover:bg-theme-black hover:text-theme-green"
        >
          <span class="text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </span>
          <span class="mt-2 text-base leading-normal"> Upload PCY file </span>
        </div>
      </div>
      <div class="w-10 h-10">
        <div
          :class="[btn4 ? 'btn-disabled' : '']"
          @click="
            uploadFiles({
              fileno: 4,
            })
          "
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition duration-500 ease-linear hover:bg-theme-black hover:text-theme-green"
        >
          <span class="text-4xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </span>
          <span class="mt-2 text-base leading-normal">
            Upload Oper Params file
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useUpload from "../composable/Engineering/fileUpload.js";
export default {
  name: "Multi Upload",
  setup() {
    const { uploadFiles } = useUpload();
    let btn1 = ref(false);
    let btn2 = ref(false);
    let btn3 = ref(false);
    let btn4 = ref(false);

    if (sessionStorage.getItem(`file1`) == 1) {
      btn1.value = true;
    }
    if (sessionStorage.getItem(`file2`) == 2) {
      btn2.value = true;
    }
    if (sessionStorage.getItem(`file3`) == 3) {
      btn3.value = true;
    }
    if (sessionStorage.getItem(`file4`) == 4) {
      btn4.value = true;
    }
    return {
      uploadFiles,
      btn1,
      btn2,
      btn3,
      btn4,
    };
  },
};
</script>

<style>
</style>
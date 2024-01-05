<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <div
      class="text-xl font-bold breadcrumbs mb-10 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900"
    >
      <ul>
        <li>
          <a>Energy Calculations - Electrical</a>
        </li>
      </ul>
    </div>
    <h1
      class="mb-5 text-4xl font-bold uppercase underline text-theme-black hover:text-theme-green transition duration-300 ease-out"
    >
      go step by step
    </h1>
    <span class="text-xs text-red-400 font-bold text-left mb-4"
      >Note: Your file name must be electrical.csv</span
    >
    <div class="grid grid-rows-1 grid-cols-2 gap-5 bg-grey-lighter">
      <a
        href="http://lab.sitraonline.org.in/energyauditapi/index.php/upload"
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
      <div
        @click="uploadData"
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
        <span class="mt-2 text-base leading-normal"> Upload The file </span>
      </div>
      <div
        @click="showModal"
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
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <span class="mt-2 text-base leading-normal">Calculate</span>
      </div>
      <export-excel
        :data="opData"
        name="output.csv"
        type="csv"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span class="mt-2 text-base leading-normal"> DownLoad Output </span>
      </export-excel>

      <div class="flex items-center justify-center gap-5 flex-wrap col-span-2">
        <button
          class="btn bg-theme-green text-black hover:text-theme-green"
          @click="f1"
        >
          f1
        </button>
        <button
          class="btn bg-theme-green text-black hover:text-theme-green"
          @click="f2"
        >
          f2
        </button>
        <button
          class="btn bg-theme-green text-black hover:text-theme-green"
          @click="f3"
        >
          f3
        </button>
        <button
          class="btn bg-theme-green text-black hover:text-theme-green"
          @click="f4"
        >
          f4
        </button>
        <button
          class="btn bg-theme-green text-black hover:text-theme-green"
          @click="f5"
        >
          f5
        </button>
      </div>
      <export-excel
        :data="j_data"
        :name="fileName"
        type="csv"
        class="flex flex-col col-span-2 items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer transition duration-500 ease-linear hover:bg-theme-black hover:text-theme-green"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span class="mt-2 text-base leading-normal"> DownLoad Result </span>
      </export-excel>
    </div>
    <div v-if="show" class="w-full relative -top-100 left-56">
      <calcu-modal />
    </div>
  </div>
</template>

<script>
import useUpload from "../../composable/Engineering/fileUpload";
import calcuModal from "./calcuModal.vue";
import useEngineering from "../../composable/Engineering/useEngineering";
export default {
  components: { calcuModal },
  name: "File upload",
  setup() {
    const { opData, uploadData } = useUpload();

    const { show, showModal, j_data, f1, f2, f3, f4, f5, fileName } =
      useEngineering();

    return {
      show,
      showModal,
      j_data,
      opData,
      uploadData,
      f1,
      f2,
      f3,
      f4,
      f5,
      fileName,
    };
  },
};
</script>

<style>
</style>
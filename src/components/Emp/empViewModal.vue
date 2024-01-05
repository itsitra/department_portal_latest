<template>
  <!-- <teleport to="body"> -->

  <div
    class="p-10 max-w-4xl fixed top-40 right-32 overflow-hidden card shadow-2xl modal-box bg-gradient-to-bl from-theme-green to-theme-black">
    <div class="card-body relative">
      <div class="cursor-pointer absolute top-0  right-0" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div class="w-full">
        <div class="tabs">
          <button @click="changeData(0)" class="tab tab-lifted" :class="[empD == 0 ? 'tab-active' : '']">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg></button><button :class="[empD == 1 ? 'tab-active' : '']" @click="changeData(1)"
            class="tab tab-lifted">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg></button><button :class="[empD == 2 ? 'tab-active' : '']" @click="changeData(2)"
            class="tab tab-lifted">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <button :class="[empD == 3 ? 'tab-active' : '']" @click="changeData(3)" class="tab tab-lifted">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg></button><button :class="[empD == 4 ? 'tab-active' : '']" @click="changeData(4)"
            class="tab tab-lifted">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </button>
        </div>
        <user-details />
      </div>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<script>
// import { onMounted, onUnmounted } from "@vue/runtime-core";
import useEmp from "../../composable/Emp/useEmp";
import userDetails from "./Details/userDetails.vue";
export default {
  components: { userDetails },
  name: "EmpView",
  props: ["closeModal"],
  setup() {
    const { empData, changeData, changeD, empD } = useEmp();

    // onMounted(() => {
    //   // console.log("mounted", changeD.value);
    // });

    // onUnmounted(() => {
    //   // console.log("empdata unmounted", empData.value);

    //   // console.log(changeD.value);
    // });

    return {
      empData,
      changeD,
      changeData,
      empD,
    };
  },
};
</script>

<style>
</style>
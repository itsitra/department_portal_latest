<template>
  <div class="btn-group ml-96 mb-5">
    <!-- previous -->
    <button
      v-if="currentState != 1"
      @click="prev"
      class="btn btn-sm bg-theme-green text-theme-black hover:bg-white"
    >
      Previous
    </button>
    <!-- previous -->
    <button
      class="btn btn-sm"
      v-for="(pageNumber, i) in pages.slice(currentState - 1, currentState + 2)"
      @click="state(pageNumber)"
      :key="i"
    >
      {{ pageNumber }}
    </button>
    <!-- next btn -->
    <button
      @click="next"
      v-if="currentState < pages.length"
      class="btn btn-sm bg-theme-green text-theme-black hover:bg-white"
    >
      Next
    </button>
    <!-- next btn -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["currentState", "pages", "state", "prev", "next"],
};
</script>

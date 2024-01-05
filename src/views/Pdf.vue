<template>
  <div v-if="loading" class="flex items-center justify-center min-h-screen">
    <img src="../assets/830.svg" class="" alt="loader" />
  </div>
  <div v-else>
    <pdf :id="id" :depCode="depCode" />
  </div>
</template>

<script>
import pdf from "../components/pdf.vue";
import usePdf from "../composable/usePdf.js";

import { useRoute } from "vue-router";
export default {
  components: { pdf },
  setup() {
    const router = useRoute();

    let id = router.params.id;
    let depCode = Number(router.params.depCode);

    const d = JSON.stringify({
      gatePassId: id,
    });
    const { getData, loading } = usePdf();
    getData(d);
    return {
      id,
      loading, depCode
    };
  },
};
</script>

<style>
</style>
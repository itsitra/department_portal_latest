<template>
  <div class="bg-white card shadow-lg p-5 relative h-40 overflow-y-scroll">
    <div id="symbols" class="flex gap-5 flex-wrap">
      <div v-for="char in items" :key="char.id">
        <p
          class="btn btn-sm btn-outline"
          @click="buttonActions(`${char.char}`)"
        >
          {{ char.char }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "ReceiptSymbolModal",
  setup() {
    const buttonActions = (val) => {
      let browserAgent = navigator.userAgent;
      if (browserAgent.includes("Chrome")) {
        navigator.clipboard.writeText(val);
      } else {
        alert("This Feature Only Works in Chrome");
      }
    };
    const items = ref([]);
    const itemselect = () => {
      items.value = [];
      axios
        .get(`http://192.168.1.9/departmentportalapitestreceipt/index.php/api/specialChar`)
        .then((res) => {
          // console.log(typeof res.data);

          res.data.forEach((element) => {
            items.value.push(element);
          });

          // console.log(items.value);
        })
        .catch((err) => alert(err));
    };

    onMounted(() => {
      //  console.log("nm");
      itemselect();
    });
    return { buttonActions, items, itemselect };
  },
};
</script>

<style>
</style>
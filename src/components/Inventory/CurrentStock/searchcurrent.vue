<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">Search Stock</span>
    </label>
    <div class="flex space-x-2">
      <input
        type="text"
        v-model="query"
        placeholder="Search"
        class="w-full input focusring input-sm input-bordered"
      />
      <button
        @click="
          queryItem({
            endPoint: 'searchStock',
            table: 'current_stock',
            query: query,
          })
        "
        class="
          btn btn-sm
          font-bold
          bg-theme-black
          text-theme-green
          hover:bg-theme-green hover:text-theme-black
        "
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
import search from "../../../composable/search";
import cStock from "../../../composable/currentStock/useCStock";
export default {
  name: "Current Search",
  setup() {
    const { stockData, getStock } = cStock();
    const { queryData, query, data } = search();
    const queryItem = (q) => {
      if (query.value != "") {
        // console.log("search");
        queryData(q);
        let l = stockData.value.length;
        stockData.value.splice(0, l);
        data.value = stockData.value;

        // console.log(stockData.value);
      } else if (query.value == "") {
        let l = stockData.value.length;
        stockData.value.splice(0, l);
        getStock();
        // console.log("pagination");
      }
    };
    return {
      query,
      queryItem,
    };
  },
};
</script>

<style>
</style>
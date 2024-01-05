<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">Search Item</span>
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
            endPoint: 'searchItem',
            table: 'item_master',
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
import useItemTable from "../../../composable/item/useItemTable";
export default {
  name: "Search",
  setup() {
    const { itemdata, loading, getData } = useItemTable();
    const { queryData, query, data } = search();
    const queryItem = (q) => {
      if (query.value != "") {
        // console.log("search");
        queryData(q);
        loading.value = true;
        let l = itemdata.value.length;
        itemdata.value.splice(0, l);
        data.value = itemdata.value;
        loading.value = false;
        // console.log(itemdata.value);
      } else if (query.value == "") {
        getData(1);
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
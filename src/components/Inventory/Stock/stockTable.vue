<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between">
      <p class="text-base font-serif">
        Current Page:<span class="text-xl">{{ pageno }}</span>
      </p>
      <pagination
        :currentState="currentState"
        :state="state"
        :prev="prev"
        :next="next"
        :pages="pages"
      />
    </div>
    <div>
      <div v-if="loading" class="flex items-center justify-center">
        <img src="../../../assets/830.svg" alt="loading svg" />
      </div>
      <table v-else class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>Trans Id</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th>{{ tableHeader5 }}</th>
            <th>{{ tableHeader6 }}</th>
            <!-- <th>Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in stockData" :key="d.transId">
            <th>{{ d.transId }}</th>
            <th>{{ d.itemCode }}</th>
            <td>{{ d.itemDescription }}</td>
            <td>{{ d.batchNo }}</td>
            <td>{{ d.expiryDate }}</td>
            <td>{{ d.fromName }}</td>
            <td>{{ d.toName }}</td>
          </tr>
        </tbody>
      </table>
      <p class="text-base font-serif mt-3">
        Total Pages:<span class="text-xl">{{ pages.length }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import pagination from "../../pagination.vue";
import useStockTable from "../../../composable/Stock/useStockTable";

export default {
  name: "Stock Table",
  components: { pagination },
  props: [
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
    "tableHeader6",
  ],
  setup() {
    const {
      getData,
      currentState,
      prev,
      next,
      state,
      loading,
      stockData,
      pageno,
      pages,
      depName,
    } = useStockTable();
    // const {  tableData } = stock();
    getData(currentState.value);
    return {
      stockData,
      currentState,
      prev,
      next,
      state,
      loading,
      pageno,
      pages,
      depName,
    };
  },
};
</script>

<style scoped>
thead th {
  background: none;
  font-size: 14px;
}
</style>
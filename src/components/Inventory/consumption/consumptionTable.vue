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
            <th class="text-left">Cons ID</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th>{{ tableHeader5 }}</th>
            <th>{{ tableHeader6 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in consumptionData" :key="d.consId">
            <th>{{ d.consId }}</th>
            <th>{{ d.itemCode }}</th>
            <td>{{ d.Item_Description }}</td>
            <td>{{ d.batchNo }}</td>
            <td>{{ d.expiryDate }}</td>
            <td>{{ d.quantity }}</td>
            <td>{{ d.consDate }}</td>
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
import Pagination from "../../pagination.vue";

import consumption from "../../../composable/consumption/useConsumption";

export default {
  components: { Pagination },
  name: "Table",
  props: [
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
    "tableHeader6",
    "tableHeader7",
    "tableData",
  ],
  setup() {
    const {
      consumptionData,
      getData,
      prev,
      next,
      pageno,
      pages,
      currentState,
      state,
      loading,
    } = consumption();

    getData(currentState.value);
    return {
      consumptionData,
      getData,
      prev,
      next,
      pageno,
      pages,
      currentState,
      state,
      loading,
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
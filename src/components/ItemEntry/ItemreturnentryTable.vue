<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between">
      <p class="text-base font-serif">
        Current Page:<span class="text-xl">{{ pageno }}</span>
      </p>
      <pagination :currentState="currentState" :state="state" :prev="prev" :next="next" :pages="pages" />
    </div>
    <div>
      <div v-if="loading" class="flex items-center justify-center">
        <img src="../../assets/830.svg" alt="loading svg" />
      </div>
      <table v-else class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>IRE Id</th>
            <th>GatePass Id</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th>{{ tableHeader5 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in itemReturndata" :key="d.sno">
            <th>{{ d.sno }}</th>
            <td>{{ d.rgpId }}</td>
            <td>{{ d.description }}</td>
            <td>{{ d.quantity }}</td>
            <td>{{ d.recdQty }}</td>
            <td>{{ d.createdDate.slice(0, 11) }}</td>
            <td>{{ d.recievingdate.slice(0, 11) }}</td>
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
import itemTable from "../../composable/itemReturn/useItemReutnTable";
import Pagination from "../pagination.vue";

export default {
  components: { Pagination },
  name: "Table",
  props: [
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
    "tableData",
  ],
  setup() {
    const {
      rgpId,
      department,
      getData,
      itemReturndata,
      state,
      prev,
      next,
      currentState,
      loading,
      pageno,
      pages,
    } = itemTable();
    getData(currentState.value);

    return {
      rgpId,
      department,
      getData,
      itemReturndata,
      state,
      prev,
      next,
      currentState,
      loading,
      pageno,
      pages,
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
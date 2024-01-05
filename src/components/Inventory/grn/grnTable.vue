<template>
  <div>
    <div v-if="grnView">
      <grn-view
        :closeGrnView="closeGrnView"
        :dataThere="dataThere"
        :grnDataList="grnDataList"
      />
    </div>
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
            <th class="text-left">GRN ID</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>

            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in tableData" :key="d.grnId" class="text-left">
            <!-- {{
              d
            }} -->
            <th class="text-left">{{ d.grnId }}</th>
            <td>{{ d.GrnNo }}</td>
            <td>{{ d.grnSupplierName }}</td>
            <td>{{ d.grnDate.slice(0, 11) }}</td>
            <!-- <td>{{ d.createdDate.slice(0, 11) }}</td> -->
            <td class="flex space-x-4 justify-evenly">
              <span
                @click="showGrnView(d.grnId)"
                class="text-yellow-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-base font-serif mt-3">
      Total Pages:<span class="text-xl">{{ pages.length }}</span>
    </p>
  </div>
</template>

<script>
import useGrnTable from "../../../composable/grn/useGrnTable";
import Pagination from "../../pagination.vue";
import grnView from "./grnView.vue";
export default {
  components: { grnView, Pagination },
  name: "Table",
  props: ["tableHeader1", "tableHeader2", "tableHeader3"],
  setup() {
    const {
      tableData,
      showGrnView,
      closeGrnView,
      grnView,
      dataThere,
      grnDataList,
      state,
      prev,
      next,
      getData,
      pages,
      loading,
      currentState,
      pageno,
    } = useGrnTable();

    getData(currentState.value);

    return {
      tableData,
      showGrnView,
      closeGrnView,
      grnView,
      dataThere,
      grnDataList,
      state,
      prev,
      next,
      pageno,
      pages,
      loading,
      currentState,
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
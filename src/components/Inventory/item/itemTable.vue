<template>
  <div v-if="showEdit">
    <item-edit :closeModal="closeModal" />
  </div>
  <div class="overflow-x-auto w-full" v-else>
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
            <th class="text-left">Item ID</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, i) in itemdata" :key="d.itemId" class="text-left">
            <!-- {{
              d
            }} -->
            <th class="text-left">{{ d.itemId }}</th>
            <td>{{ d.itemCode }}</td>
            <td>{{ d.itemDescription }}</td>
            <td>{{ d.unit }}</td>
            <td>{{ d.minOrderQty }}</td>
            <td class="flex space-x-4 justify-evenly">
              <span
                @click="showEditModal(i)"
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
              <span
                @click="deleteData(d.itemId)"
                class="text-red-600 cursor-pointer"
                ><svg
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  /></svg
              ></span>
            </td>
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
import itemEdit from "./itemEdit.vue";
import useItemTable from "../../../composable/item/useItemTable";
import Pagination from "../../pagination.vue";
export default {
  components: { itemEdit, Pagination },
  name: "Table",
  props: [
    "deleteData",
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableData",

    "showEditModal",
    "showEdit",
    "closeModal",
  ],
  setup() {
    const {
      prev,
      state,
      currentState,
      next,
      loading,
      pages,
      pageno,
      getData,
      itemdata,
    } = useItemTable();

    getData(currentState.value);
    return {
      prev,
      state,
      currentState,
      next,
      loading,
      pages,
      pageno,
      itemdata,
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
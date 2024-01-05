<template>
  <div class="overflow-x-auto">
    <pagination
      class="flex items-start justify-end"
      :currentState="currentState"
      :state="state"
      :prev="prev"
      :next="next"
      :pages="pages"
    />
    <div v-if="loading" class="flex items-center justify-center">
      <img src="../../assets/830.svg" alt="loading svg" />
    </div>

    <table v-else class="table w-full table-compact table-zebra mb-5">
      <thead>
        <tr class="bg-gray-300 text-gray-700 font-extrabold">
          <th>Id</th>
          <th>{{ tableHeader1 }}</th>
          <th>{{ tableHeader2 }}</th>
          <th>{{ tableHeader3 }}</th>
          <th>{{ tableHeader4 }}</th>
          <th>{{ tableHeader5 }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in empTable" :key="d.Reg_id">
          <th>{{ d.Reg_id }}</th>
          <td>{{ d.Candidate_name }}</td>
          <td>{{ d.Candidate_mailid }}</td>
          <td>{{ d.Candidate_mobileno }}</td>
          <td>{{ d.Present_City }}</td>
          <td>
            <span
              class="text-yellow-500 cursor-pointer"
              @click="showEmpView(d.Reg_id)"
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="empView">
      <emp-view-modal :closeModal="closeEmpView" />
    </div>

    <p class="text-base font-serif mt-3">
      Total Pages:<span class="text-xl">{{ pages.length  }}</span>
    </p>
  </div>
</template>

<script>
import Pagination from "../pagination.vue";
import useEmp from "../../composable/Emp/useEmp";
import EmpViewModal from "./empViewModal.vue";

export default {
  components: { Pagination, EmpViewModal },
  name: "Table",
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
      empTable,
      state,
      prev,
      next,
      currentState,
      loading,
      pageno,
      pages,
      showEmpView,
      closeEmpView,
      empView,
    } = useEmp();

    // console.log(currentState.value);

    getData(currentState.value);

    return {
      getData,
      empTable,
      state,
      prev,
      next,
      currentState,
      loading,
      pageno,
      pages,
      showEmpView,
      closeEmpView,
      empView,
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
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
      <!-- <div v-if="loading" class="flex items-center justify-center">
        <img src="../../../assets/830.svg" alt="loading svg" />
      </div> -->
      <table class="table w-full table-compact table-zebra p-1">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th class="text-left">S.No</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th>{{ tableHeader5 }}</th>
            <th>{{ tableHeader6 }}</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(d, i) in conferenceData"
            :key="d.custid"
            class="text-left"
          >
            <th class="text-left">{{ i + 1 }}</th>
            <td>{{ d.registeredDate }}</td>
            <td>{{ d.customerName }}</td>
            <td>{{ d.amount }}</td>
            <td>{{ d.total_participants }}</td>
            <td>{{ d.payment_status }}</td>
            <td>{{ d.eventtype }}</td>
            <td class="flex space-x-4 justify-evenly">
              <span
                @click="showModal(i)"
                class="text-yellow-400 cursor-pointer tooltip"
                data-tip="View Data"
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
      <p class="text-base font-serif mt-3">
        Total Pages:<span class="text-xl">{{ pages.length }}</span>
      </p>
      <div v-if="viewData">
        <ConferenceView :data="participants" :closemodal="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import ConferencePaginate from "../../../composable/Emp/Conference/ConferencePagination";
import ConferenceTablejs from "../../../composable/Emp/Conference/Conference";
import ConferenceView from "../../../components/Emp/Conference/ConferenceView.vue";
import Pagination from "../../../components/pagination.vue";
export default {
  components: { Pagination, ConferenceView },
  name: "Conferencetable",
  props: [
    "tableData",
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
    "tableHeader6",
    "data",
    "showModal",
    "closeModal",
    "viewData",
  ],
  setup() {
    const { state, prev, next, currentState, participants } =
      ConferenceTablejs();
    const { getData, conferenceData, pages, loading, pageno } =
      ConferencePaginate();
    return {
      conferenceData,
      pages,
      getData,
      pageno,
      loading,
      currentState,
      state,
      prev,
      next,
      participants,
    };
  },
};
</script>

<style>
</style>
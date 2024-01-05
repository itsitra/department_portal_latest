<template>
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

  <table class="table w-full table-compact table-zebra mb-5">
    <thead>
      <tr class="bg-gray-300 text-gray-700 font-extrabold">
        <th class="text-left">S.No</th>
        <th>{{ tableHeader1 }}</th>
        <th>{{ tableHeader2 }}</th>
        <th>{{ tableHeader3 }}</th>
        <th>{{ tableHeader4 }}</th>
        <th>{{ tableHeader5 }}</th>
        <th>{{ tableHeader6 }}</th>
        <th>{{ tableHeader7 }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(d, i) in eventsData" :key="i">
        <th class="text-left">{{ i + 1 }}</th>
        <td>{{ d.registeredDate }}</td>
        <td>{{ d.title }}</td>
        <td>{{ d.customerName }}</td>
        <td>{{ d.amount }}</td>
        <td>{{ d.webinar_date }}</td>
        <td>{{ d.reg_status }}</td>
        <td>{{ d.payment_status }}</td>
      </tr>
    </tbody>
  </table>
  <p class="text-base font-serif mt-3">
    Total Pages:<span class="text-xl">{{ pages.length }}</span>
  </p>
</template>

<script>
import useEvents from "../../../composable/Emp/Events/useEvents";
import Pagination from "../../pagination.vue";
export default {
  name: "EventsTable",
  components: { Pagination },
  props: [
    "tableData",
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
    "tableHeader6",
    "tableHeader7",
  ],
  setup() {
    const {
      eventsData,
      pageno,
      pages,
      state,
      currentState,
      prev,
      next,
      loading,
    } = useEvents();
    return {
      eventsData,
      pageno,
      pages,
      state,
      currentState,
      prev,
      next,
      loading,
    };
  },
};
</script>

<style>
</style>
<template>
  <div class="mr-12 mt-8 ml-72 w-auto">
    <div
      class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative"
    >
      <div
        class="text-xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900"
      >
        <ul>
          <li>
            <a>Sitra Events</a>
          </li>
        </ul>
      </div>
      <div
        class="absolute top-7 right-10 tooltip tooltip-left"
        data-tip="Keep Your search empty and Click search and then click export"
      >
        <export-excel
        :data="eventsData"
          :fields="json_fields"
          name="events_data.csv"
          type="csv"
          class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
        >
          Export Data
        </export-excel>
      </div>
      <div v-if="loading" class="flex items-center justify-center">
        <img src="../assets/830.svg" alt="loading svg" />
      </div>
      <div v-else class="w-full">
        <eventstable
          :tableHeader1="'Registered Date'"
          :tableHeader2="'Title'"
          :tableHeader3="'Customer'"
          :tableHeader4="'Amount'"
          :tableHeader5="'Program Date'"
          :tableHeader6="'Reg.Status'"
          :tableHeader7="'Payment. Status'"
          :tableData="eventsData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import eventstable from "../components/Emp/Events/eventstable.vue";
import useEvents from "../composable/Emp/Events/useEvents";
export default {
  name: "Events",
  components: { eventstable },
  setup() {
    const { eventsData, getData, loading } = useEvents();
    onMounted(() => {
      getData(1);
    });
    return { eventsData, loading };
  },
};
</script>

<style>
</style>
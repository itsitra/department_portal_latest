<template>
  <div class="mr-12 mt-8 ml-80 w-auto">
    <div class="flex items-center justify-center text-2xl flex-col font-bold">
      <div
        class="text-xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900"
      >
        <ul>
          <li>
            <a> Current Registration and Updation Statistics</a>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-3 w-full">
        <div class="flex items-center justify-center">
          <emp-pie v-if="chartshow" :statdata="empStats" />
          <div v-else class="w-full ml-28">
            <img src="../assets/plantLoading.gif" alt="" />
            <!-- <button @click="() => (chartshow = !chartshow)" class="btn">
              Show Chart
            </button> -->
          </div>
        </div>
        <EmpStats class="col-span-2" />
      </div>
    </div>
    <div class="">
      <EmpTable
        class="w-full mt-10"
        :tableData="[
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },

          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },

          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
          {
            Sno: '1',
            name: 'priya',
            email: 'priya@gmail.com',
            mobno: '9424652898',
            city: 'coimbatore',
          },
        ]"
        :tableHeader1="'NAME'"
        :tableHeader2="'E-Mail'"
        :tableHeader3="'Mobile No'"
        :tableHeader4="'City'"
        :tableHeader5="'Action'"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import EmpPie from "../components/Emp/empPie.vue";
import EmpStats from "../components/Emp/empStats.vue";
import EmpTable from "../components/Emp/empTable.vue";
import useStats from "../composable/Emp/useEmpStats";

export default {
  components: { EmpStats, EmpTable, EmpPie },
  setup() {
    const chartshow = ref(false);
    const { empStats } = useStats();
    // console.log(empStats.value);
    if (empStats.value != []) {
      setTimeout(() => {
        chartshow.value = true;
      }, 4000);
    }

    return { empStats, chartshow };
  },
};
</script>

<style>
</style>
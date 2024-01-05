<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div
      class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative">
      <div class="absolute top-8 right-11" v-if="depCode === 4">
        <export-excel :data="data" :fields="json_fields" name="pending_data.csv" type="csv" class="
            btn
            bg-theme-black
            text-theme-green
            hover:bg-theme-green hover:text-theme-black
            shadow-lg
            btn-sm
          ">
          Export Data
        </export-excel>
      </div>
      <div
        class="text-xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900">
        <ul>
          <li>
            <p>Pending Table</p>
          </li>
        </ul>
      </div>
      <pendingTable class="w-full" :tableData="data" :tableHeader1="'Supplier'" :tableHeader2="'Item'"
        :tableHeader3="'SentQty'" :tableHeader4="'RecdQty'" :tableHeader5="'Pending'" :tableHeader6="'Sent Date'" :tableHeader7="'Due Date'" />
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "@vue/runtime-core";
import pendingTable from "../components/pending/pendingTable.vue";
import pending from "../composable/pending/usePending";
export default {
  name: "Supplier",
  components: { pendingTable },
  setup() {
    const { getData, data, clearData } = pending();
    onMounted(() => {
      // console.log("Mounted");
      getData(sessionStorage.getItem("depCode"));
    });
    let depCode = Number(sessionStorage.getItem("depCode"))
    let json_fields = {
      "Sno": "Sno",
      "Gate pass ID": "RGP_Id",
      "Supplier Name": "Supplier_Name",
      "Item Name": "Item_Name",
      "Sent Qty": "Sent_Qty",
      "Recd Qty": "Recd_Qty",
      "Pending Qty": "Pending_Qty",
      "Sent Date": "Sent_Date",
      "Due Date": "returnDate",
      "Department Name": "Department_Name",
    };
   // alert(depCode);
    onUnmounted(() => {
      // console.log("UnMounted");
      clearData();
    });
    return {
      data, json_fields, depCode
    };
  },
};
</script>

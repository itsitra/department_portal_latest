<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div
      class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative"
    >
      <div
        class="text-xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900"
      >
        <ul>
          <li>
            <p>Current Stock Table</p>
          </li>
        </ul>
      </div>
      <div
        class="absolute top-7 right-10 tooltip tooltip-left"
        data-tip="Keep Your search empty and Click search and then click export"
      >
        <export-excel
          :data="stockData"
          :fields="json_fields"
          name="stock_data.csv"
          type="csv"
          class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
        >
          Export Data
        </export-excel>
      </div>
      <div class="absolute top-16 bottom-0 left-7">
        <searchcurrent />
      </div>
      <current-stock
        class="w-full mt-16"
        :tableHeader0="'Stock ID'"
        :tableHeader1="'Department'"
        :tableHeader2="'Item Code'"
        :tableHeader3="'Description'"
        :tableHeader4="'Opening'"
        :tableHeader5="'Receipt'"
        :tableHeader6="'Consumption'"
        :tableHeader7="'Closing'"
        :tableHeader8="'Batch No'"
        :tableHeader9="'Expiry Date'"
        :data="stockData"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import currentStock from "../components/Inventory/CurrentStock/currentStock.vue";
import cStock from "../composable/currentStock/useCStock";
import Searchcurrent from "../components/Inventory/CurrentStock/searchcurrent.vue";
export default {
  name: "Current Stock",
  components: { currentStock, Searchcurrent },
  setup() {
    let json_fields = {
      "Stock Id": "stockId",
      "Department Name": "depName",
      "Item Code": "itemCode",
      Description: "itemDesc",
      Openings: "opening",
      Additions: "additions",
      Deletions: "deletions",
      Closings: "closing",
      "Batch No": "batchNo",
      "Expiry Date": "expDate",
    };
    const { getStock, stockData, loading } = cStock();
    onMounted(() => {
      getStock();
    });
    return {
      stockData,
      loading,
      json_fields,
    };
  },
};
</script>

<style>
</style>
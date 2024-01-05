<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div v-if="modal">
      <stock-modal :heading="'GRN'" :closeModal="closeModal" />
    </div>
    <div
      v-else
      class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative"
    >
      <div
        class="text-xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900"
      >
        <ul>
          <li>
            <p>Transfer Table</p>
          </li>
        </ul>
      </div>
      <div
        class="absolute top-7 right-10 tooltip"
        data-tip="Click to Add Data"
        v-if="SCode === HCode"
      >
        <button
          class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
          @click="openModal"
        >
          ADD
        </button>
      </div>
      <stock-table
        class="w-full"
        :tableHeader1="'Item Code '"
        :tableHeader2="'Description'"
        :tableHeader3="'Batch No '"
        :tableHeader4="'Expiry Date'"
        :tableHeader5="'From'"
        :tableHeader6="'To'"
      />
    </div>
  </div>
</template>

<script>
import stock from "../composable/Stock/useStock";
import StockTable from "../components/Inventory/Stock/stockTable.vue";
import StockModal from "../components/Inventory/Stock/stockModal.vue";
export default {
  components: { StockTable, StockModal },
  setup() {
    const { openModal, modal, closeModal } = stock();
    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    const purchase = Number(sessionStorage.getItem("depCode"));
    return {
      openModal,
      modal,
      closeModal,
      SCode,
      HCode,
      purchase,
    };
  },
};
</script>

<style>
</style>
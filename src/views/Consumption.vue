<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div v-if="modal">
      <consumption-modal :heading="'GRN'" :closeModal="closeModal" />
    </div>
    <div
      v-else
      class="
        border-2 border-theme-black
        mx-5
        w-full
        p-6
        flex flex-col flex-wrap
        justify-center
        items-center
        relative
      "
    >
      <div
        class="
          text-xl
          font-bold
          breadcrumbs
          mb-3
          p-2
          w-full
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-theme-green
          to-gray-400
          text-green-900
        "
      >
        <ul>
          <li>
            <p>Consumption</p>
          </li>
        </ul>
      </div>
      <div
        class="absolute top-7 right-10 tooltip"
        data-tip="Click to Add Data"
        v-if="SCode != HCode"
      >
        <button
          class="
            btn
            bg-theme-black
            text-theme-green
            hover:bg-theme-green hover:text-theme-black
            shadow-lg
            btn-sm
          "
          @click="openModal"
        >
          ADD
        </button>
      </div>
      <consumption-table
        class="w-full"
        :tableHeader1="'Item Code'"
        :tableHeader2="'Description'"
        :tableHeader3="'Batch No '"
        :tableHeader4="'Expiry Date'"
        :tableHeader5="'Quantity'"
        :tableHeader6="'Cons Date'"
      />
    </div>
  </div>
</template>

<script>
import consumption from "../composable/consumption/useConsumption";
import ConsumptionModal from "../components/Inventory/consumption/consumptionModal.vue";
import ConsumptionTable from "../components/Inventory/consumption/consumptionTable.vue";
export default {
  components: { ConsumptionModal, ConsumptionTable },
  setup() {
    const { openModal, modal, closeModal } = consumption();
    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    return {
      openModal,
      modal,
      closeModal,
      SCode,
      HCode,
    };
  },
};
</script>

<style>
</style>
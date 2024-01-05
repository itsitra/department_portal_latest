<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div v-if="modal">
      <mill-proforma-modal :heading="'MILL DETAILS'" :closeModal="closeModal" />
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
            <p>Mill Details</p>
          </li>
        </ul>
      </div>

      <mill-table
        class="w-full"
        :tableHeader1="'Mill Name '"
        :tableHeader2="'Job Title '"
        :tableHeader3="'No of posts'"
        :tableHeader4="'Package Fees'"
        :tableHeader5="'Post Date'"
      />
    </div>
  </div>
</template>

<script>
import MillProformaModal from "../components/Emp/Mill/millProformaModal.vue";
import MillTable from "../components/Emp/Mill/millTable.vue";
import mill from "../composable/Emp/Mill/useMill";
export default {
  components: { MillProformaModal, MillTable },
  setup() {
    const { modal, closeModal } = mill();

    return {
      modal,
      closeModal,
    };
  },
};
</script>
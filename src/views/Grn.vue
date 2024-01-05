<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div v-if="modal">
      <grn-modal :heading="'GRN'" :closeModal="closeModal" />
    </div>
    <div v-else class="
        border-2 border-theme-black
        mx-5
        w-full
        p-6
        flex flex-col flex-wrap
        justify-center
        items-center
        relative
      ">
      <div class="
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
        ">
        <ul>
          <li>
            <p>Goods Recipt Note</p>
          </li>
        </ul>
      </div>
      <div class="flex ">
        <div class="form-control btn btn-sm  absolute top-7 left-10">
          <label for="fileup" class="cursor-pointer">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </span>
          </label>
          <input id="fileup" type="file" class="hidden"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/excel"
            @change="handleUpload" />
        </div>
        <div class="absolute top-7 right-10 tooltip" data-tip="Click to Add Data" v-if="SCode != HCode">
          <button class="
            btn
            bg-theme-black
            text-theme-green
            hover:bg-theme-green hover:text-theme-black
            shadow-lg
            btn-sm
          " @click="openModal">
            ADD
          </button>
        </div>
      </div>

      <grn-table class="w-full" :tableHeader1="'GRN No '" :tableHeader2="'Supplier Name'" :tableHeader3="'GRN Date'" />
    </div>
  </div>
</template>

<script>
import GrnModal from "../components/Inventory/grn/grnModal.vue";
import GrnTable from "../components/Inventory/grn/grnTable.vue";
import grn from "../composable/grn/useGrn";
export default {
  components: { GrnModal, GrnTable },
  setup() {
    const { openModal, modal, closeModal, handleUpload } = grn();
    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    return {
      openModal,
      modal,
      closeModal,
      SCode,
      HCode,
      handleUpload
    };
  },
};
</script>
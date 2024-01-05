<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div v-if="showModal">
      <supplier-modal :updateData="updateData" :closeModal="closeModal" />
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
            <p>Supplier Master</p>
          </li>
        </ul>
      </div>
      <div class="absolute top-7 right-10" v-if="SCode != HCode">
        <button
          class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
          @click="openModal"
        >
          Create Supplier
        </button>
      </div>
      <SupplierTable
        class="w-full"
        :editModal="editModal"
        :showEditModal="showEditModal"
        :deleteData="deleteData"
        :data="editData"
        :tableHeader1="'Name'"
        :tableHeader2="'Mail ID'"
        :tableHeader3="'City'"
        :tableHeader4="'Mobile number'"
        :viewData="viewData"
        :closeEditModal="closeEditModal"
      />
    </div>
  </div>
</template>

<script>
import SupplierModal from "../components/Supplier/SupplierModal.vue";
import SupplierTable from "../components/Supplier/SupplierTable.vue";
import supplier from "../composable/supplier/useSupplier";
export default {
  name: "Supplier",
  components: { SupplierTable, SupplierModal },
  setup() {
    const {
      data,
      updateData,
      editdata,
      editModal,
      openModal,
      showModal,
      closeModal,
      deleteData,
      editData,
      showEditModal,
      viewData,
      closeEditModal,
      editClick,
    } = supplier();
    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    return {
      data,
      updateData,
      editdata,
      openModal,
      showModal,
      closeModal,
      deleteData,
      editModal,
      editData,
      showEditModal,
      viewData,
      closeEditModal,
      editClick,
      SCode,
      HCode,
    };
  },
};
</script>

<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div v-if="showModal">
      <ReturnEntry :closeModal="closeModal" :showModal="showModal" />
    </div>
    <div v-else
      class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative">
      <div
        class="text-xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900">
        <ul>
          <li>
            <p>Return Entry</p>
          </li>
        </ul>
      </div>
      <div class="absolute top-7 right-10" v-if="SCode != HCode && depCode === 4">
        <button class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
          @click="openModal">
          Return Entry
        </button>
      </div>
      <TableReturn class="w-full" :tableHeader1="'Item'" :tableHeader2="'Sent'" :tableHeader3="'Recieved'"
        :tableHeader4="'Recd on'" :tableHeader5="'Received on'" />
    </div>
  </div>
</template>

<script>
import ReturnEntry from "../components/ItemEntry/ItemreturnentryModal.vue";
import TableReturn from "../components/ItemEntry/ItemreturnentryTable.vue";
import itemReturn from "../composable/itemReturn/useItemReturn";
export default {
  name: "Supplier",
  components: { ReturnEntry, TableReturn },
  setup() {
    const {
      loading,
      rgpId,
      description,
      quantity,
      recQuantity,
      openModal,
      closeModal,
      showModal,
    } = itemReturn();
    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    const depCode = Number(sessionStorage.getItem("depCode"));
    return {
      loading,
      rgpId,
      description,
      quantity,
      recQuantity,
      openModal,
      closeModal,
      showModal,
      SCode,
      HCode,
      depCode,
    };
  },
};
</script>

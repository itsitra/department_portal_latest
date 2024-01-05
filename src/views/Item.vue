<template>
  <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
    <div v-if="modal">
      <item-modal
        :updateData="updateData"
        :closeModal="closeModal"
        :showModal="modal"
      />
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
            <p>Item Master</p>
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
      <div class="absolute top-16 bottom-0 left-7">
        <serach-item />
      </div>
      <item-table
        class="w-full mt-20"
        :deleteData="deleteData"
        :tableHeader1="'Item Code'"
        :tableHeader2="'Description'"
        :tableHeader3="'Unit'"
        :tableHeader4="'Min Qty'"
        :showEditModal="showEditModal"
        :closeModal="closeEditModal"
        :showEdit="showEdit"
      />
    </div>
  </div>
</template>

<script>
import itemModal from "../components/Inventory/item/itemModal.vue";
import ItemTable from "../components/Inventory/item/itemTable.vue";
import ItemModal from "../components/Inventory/item/itemModal.vue";

import item from "../composable/item/useItem";
import SerachItem from "../components/Inventory/item/serachItem.vue";

export default {
  components: { itemModal, ItemTable, ItemModal, SerachItem },
  setup() {
    const {
      openModal,
      modal,
      closeModal,
      updateData,
      itemdata,
      deleteData,
      showEditModal,
      closeEditModal,
      showEdit,
    } = item();
    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    return {
      openModal,
      modal,
      closeModal,
      updateData,
      itemdata,
      deleteData,
      showEditModal,
      closeEditModal,
      showEdit,
      SCode,
      HCode,
    };
  },
};
</script>

<style>
</style>
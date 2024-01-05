<template>
  <div v-if="edit" class="ml-56 my-10">
    <GatePassEditModal :heading="'Sample\'s Gate Pass Edit'" />
  </div>
  <div class="mr-12 mt-8 ml-72 w-auto" v-else>
    <div v-if="showModal">
      <GatepassModal
        :heading="'Sample\'s Gate Pass'"
        :updateData="saveData"
        :closeModal="closeModal"
        :showModal="showModal"
      />
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
            <a>Sample's Gate Pass</a>
          </li>
        </ul>
      </div>
      <div v-if="SCode != HCode" class="absolute top-8 right-10 transform">
        <button
          class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
          @click="openModal"
        >
          Create Gate Pass
        </button>
      </div>
      <GatePassTable
        class="w-full"
        :deleteData="deleteData"
        :tableHeader1="'Supplier / Customer Name'"
        :tableHeader2="'Type'"
        :tableHeader3="'No Of Items'"
        :tableHeader4="'Date'"
        :tableHeader5="'Supplier Type'"
      />
    </div>
  </div>
</template>

<script>
import gatePass from "../composable/gatePass/samplepass/useSampleGatePass";
import GatepassModal from "../components/Gatepass/samplespass/SampleGatePassModal.vue";
import GatePassTable from "../components/Gatepass/samplespass/SampleGatepassTable.vue";
import GatePassEditModal from "../components/Gatepass/samplespass/SampleGatePassEdit.vue";
import gatePassModal from "../composable/gatePass/samplepass/useSampleGatePassModal";
export default {
  name: "RGP",
  components: { GatePassTable, GatepassModal, GatePassEditModal },
  setup() {
    const { saveData, openModal, showModal, closeModal, deleteData } =
      gatePass();

    const { edit } = gatePassModal();

    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    return {
      saveData,
      openModal,
      showModal,
      closeModal,
      deleteData,
      SCode,
      HCode,
      edit,
    };
  },
};
</script>

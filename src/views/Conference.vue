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
            <p>Conference Trainning</p>
          </li>
        </ul>
      </div>

      <div
        class="absolute top-7 right-10 tooltip tooltip-left"
        data-tip="Keep Your search empty and Click search and then click export"
      >
        <export-excel
          :data="conferenceExport"
          :fields="json_fields"
          name="conference_data.csv"
          type="csv"
          class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
        >
          Export Data
        </export-excel>
      </div>
      <div v-if="loading" class="flex items-center justify-center">
        <img src="../assets/830.svg" alt="loading svg" />
      </div>
      <div v-else class="w-full">
        <ConferenceTable
          class="w-full"
          :tableHeader1="'Registered Date'"
          :tableHeader2="'Customer'"
          :tableHeader3="'Amount'"
          :tableHeader4="'Total Participants'"
          :tableHeader5="'Payment. Status'"
          :tableHeader6="'Event Form Type'"
          :showModal="showModal"
          :closeModal="closeModal"
          :data="conferenceData"
          :viewData="modal"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import { onMounted } from "@vue/runtime-core";
import ConferenceTable from "../components/Emp/Conference/ConferenceTable.vue";
import ConferenceTablejs from "../composable/Emp/Conference/Conference";

export default {
  name: "Conference",
  components: { ConferenceTable },
  setup() {
    const {
      data,
      updateData,
      editdata,
      editModal,
      showModal,
      closeModal,
      modal,
      editClick,
      conferenceData,
      getDataExcelConference,
      conferenceExport,
      loading,
    } = ConferenceTablejs();
    let json_fields = {
      "Webinar Title": "title",
      "Mill Name": "customerName",
      "Participant Name": "Participant_Name",
      "Participant Desigination": "Participant_Desig",
      "Participant Email": "Participant_Email",
      "Participant Mobile": "Participant_Mobile",
      "Payment Status": "payment_status",
      Amount: "amount",
      "Mobile No": "MobileNo",
      "Address 1": "Address1",
      "Address 2": "Address2",
      City: "City",
      State: "State",
      Pincode: "Pincode",

      "Gst No": "gstno",
    };
    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");

    onMounted(() => {
      getDataExcelConference();
    });

    return {
      data,
      updateData,
      editdata,
      showModal,
      closeModal,
      editModal,
      editClick,
      SCode,
      HCode,
      modal,
      conferenceData,
      conferenceExport,
      loading,

      json_fields,
    };
  },
};
</script>
  
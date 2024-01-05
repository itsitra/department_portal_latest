<template>
  <div v-if="edit" class="ml-56 my-10">
    <GatePassEditModal :heading="'Gate Pass Edit'" />
  </div>
  <div class="mr-12 mt-8 ml-72 w-auto" v-else>
    <div v-if="showModal">
      <GatepassModal :heading="'Gate Pass'" :updateData="saveData" :closeModal="closeModal" :showModal="showModal" />
    </div>

    <div v-else
      class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative">
      <div class="absolute top-7 left-10" v-if="depCode === '4'">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-sm">Export Data</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
            <li>
              <div class="form-control">
                <label class="label gap-3">
                  <span class="label-text font-bold text-xs">Department Name</span>


                </label>
                <input v-model="searchData.dep" class="input input-sm input-bordered focusring" />
              </div>
              <div class="form-control">
                <label class="label gap-3">
                  <span class="label-text font-bold text-xs">Supplier/Customer Name</span>


                </label>
                <input v-model="searchData.sname" class="input input-sm input-bordered focusring" />
              </div>
              <div class="form-control">
                <label class="label gap-3">
                  <span class="label-text font-bold text-xs">Gatepass Type</span>


                </label>
                <input v-model="searchData.type" class="input input-sm input-bordered focusring" />
              </div>
              <div class="form-control">
                <label class="label gap-3">
                  <span class="label-text font-bold text-xs">From Date <strong
                      class="text-red-600 font-bold">*</strong></span>
                </label>
                <input v-model="searchData.fromdate" class="input input-sm input-bordered focusring" type="date" />
              </div>
              <div class="form-control">
                <label class="label gap-3">
                  <span class="label-text font-bold text-xs">To Date <strong
                      class="text-red-600 font-bold">*</strong></span>
                </label>
                <input v-model="searchData.todate" class="input input-sm input-bordered focusring" type="date" />
              </div>
              <div class="flex mt-2 gap-4">

                <button class="btn btn-xs" @click.prevent="serachReport" :disabled="serachloading">Search <span
                    class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg></span>
                </button>
                <export-excel :data="reportdata" :fields="json_fields" name="gatepass.csv" type="csv" class="
                      btn
                      bg-theme-black
                      text-theme-green
                      hover:bg-theme-green hover:text-theme-black
                      shadow-lg
                      btn-xs
                    ">
                  Export Data <span class="ml-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </span>
                </export-excel>
              </div>
            </li>

          </ul>
        </div>


      </div>
      <div
        class="text-xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900">
        <ul>
          <li>
            <a>Gate Pass</a>
          </li>
        </ul>
      </div>
      <div v-if="SCode != HCode" class="absolute top-8 right-10 transform">
        <button class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm"
          @click="openModal">
          Create Gate Pass
        </button>
      </div>
      <GatePassTable class="w-full" :deleteData="deleteData" :tableHeader1="'Supplier / Customer Name'"
        :tableHeader2="'Type'" :tableHeader3="'No Of Items'" :tableHeader4="'Date'" :tableHeader5="'Supplier Type'" />
    </div>
  </div>

</template>

<script>
import gatePass from "../composable/gatePass/useGatePass";
import GatepassModal from "../components/Gatepass/GatepassModal.vue";
import GatePassTable from "../components/Gatepass/GatePassTable.vue";
import GatePassEditModal from "../components/Gatepass/GatePassEditModal.vue";
import gatePassModal from "../composable/gatePass/useGatePassModal";
export default {
  name: "RGP",
  components: { GatePassTable, GatepassModal, GatePassEditModal },
  setup() {
    const { saveData, openModal, showModal, closeModal, deleteData, searchData, serachReport, reportdata, serachloading } =
      gatePass();

    const { edit } = gatePassModal();

    let json_fields = {
      "Gatepass Id": "RGP_Id",
      "Gatepass Type": "Gate_Pass",
      "User Type": "typeuser",
      "Department Name": "Department_Name",
      "Staff Name": "Staff_Name",
      "Customer Name": "name",
      "Supplier Name": "Supplier_Name",
      "Gatepass Date": "RGP_Date",
      "Transport Mode": "Transport_Mode",
      "Transport Company": "Transport_Company",
      "Vehicle No": "Vehicle_No",
      "No of Items": "No_of_Items",
      "Purpose": "Purpose",
      "Approximate Cost": "App_Cost",
      "Remarks": "remarks",
      "DC Number": "dcNumber",
      "Item Name": "Description",
      "UOM": "UOM",
      "Quantity": "Quantity",
      "Amount": "amount",
    };

    const SCode = sessionStorage.getItem("userCode");
    const HCode = sessionStorage.getItem("hodCode");
    const depCode = sessionStorage.getItem("depCode");

    return {
      saveData,
      openModal,
      showModal,
      closeModal,
      deleteData,
      SCode,
      HCode,
      edit, json_fields, depCode, searchData, serachReport, reportdata, serachloading
    };
  },
};
</script>

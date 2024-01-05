<template>
  <div
    class="max-w-4xl p-6 mx-auto fixed top-48 left-52 -right-20 z-50 overflow-hidden bg-gradient-to-b from-theme-green to-theme-black rounded-md shadow-md modal-box mb-4">
    <div @click="closeModal" class="ml-800 absolute top-2 left-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div class="overflow-y-auto relative p-2" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <h1 class="text-2xl font-bold text-theme-black capitalize">
        <span>Return Entry</span>
      </h1>
      <div v-if="loading" class="flex items-center justify-center">
        <img src="../../assets/830.svg" alt="loading svg" />
      </div>
      <div class="form-control mt-5">
        <label class="label">
          <span class="label-text font-bold tracking-wide">Department Name</span>
        </label>
        <div class="relative flex items-center">
          <div class="absolute border-r-2 border-blue-400 py-1 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-theme-black" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <select class="select w-full max-w-xs pl-10 focusring select-sm"  @change="getRgpId($event)">
            <option disabled>Department Names</option>
            <option v-for="(dep, i) in depName" :key="i" :value="dep.Department_Code" >
              {{ dep.Department_Name }}
            </option> 
          </select>
        </div>
      </div>
      <form class="grid grid-cols-2 grid-rows-2 gap-2" @submit.prevent="saveData">
        <div class="form-control mt-3">
          <label class="label">
            <span class="label-text font-bold tracking-wide">RGP ID</span>
          </label>
          <div class="relative flex items-center">
            <div class="absolute border-r-2 border-blue-400 py-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-theme-black" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>

            <select v-model="rgpId" class="select w-full max-w-xs pl-10 focusring select-sm" @change="getLineEntry($event)">
              <option disabled>RGPId</option>
              <option v-for="id in rgpID" :key="id" :value="id" >
                {{ id }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-control col-span-2 ">
          <label class="label">

            <span class="label-text font-bold tracking-wide">Description</span>
            <span class="form-control">
              <label class="label cursor-pointer">
                <input type="checkbox" class="toggle toggle-xs" v-model="multiselecttoggle"
                  @change="multitoggleaction" />
              </label>
            </span>
          </label>
          <div class="relative flex items-center">
            <div class="absolute border-r-2 border-blue-400 py-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-theme-black" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div v-if="multiselecttoggle" class="w-full bg-white rounded-md pl-10">
              <v-select multiple label="Description" :options="itemReturnEntry" v-model="description">
              </v-select>
            </div>
            <div v-else class="w-10">
              <select v-model="description" class="select w-96  pl-10 focusring select-sm">
                <option disabled>Description</option>
                <option v-for="(item, i) in itemReturnEntry" :key="i" :value="item.Description" @click="getQuantity(i)">
                  {{ item.Description }}
                </option>
              </select>
            </div>

          </div>
        </div>
        <div class="form-control mt-3">
          <label class="label">
            <span class="label-text font-bold tracking-wide">Sent Quantity</span>
          </label>
          <input v-model="quantity" type="text" placeholder="Quantity" readonly="readonly" class="input input-sm" />
        </div>
        <div class="form-control mt-3">
          <label class="label">
            <span class="label-text font-bold">Receivied Quantity</span>
          </label>
          <input v-model="recevedQuantity" type="text" placeholder="Receivied Quantity" readonly="readonly"
            class="input input-sm focusring" />
        </div>
        <div class="form-control mt-3">
          <label class="label">
            <span class="label-text font-bold">Recieving Date</span>
          </label>
          <input v-model="recievingdate" type="date" class="input input-sm focusring" />
        </div>

        <div class="form-control mt-3">
          <label class="label">
            <span class="label-text font-bold tracking-wide">Recieving Quantity</span>
          </label>
          <input v-model="recQuantity" type="text" placeholder="Receiving Quantity"
            class="input input-sm w-min focusring" min="1" :max="recevedQuantity == 0 ? quantity : recevedQuantity" />
        </div>
        <div class="form-control w-full col-span-3">
          <label class="label">
            <span class="label-text font-bold tracking-wide">Remarks</span>
          </label>
          <input v-model="remarks" type="text" placeholder="Remarks" class="input input-sm focusring" />
        </div>

        <div class="flex justify-center items-center col-span-4 mt-10">
          <input class="btn font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black"
            value="Save" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onUnmounted, watch } from "@vue/runtime-core";
import itemReturn from "../../composable/itemReturn/useItemReturn";
export default {
  name: "Supplier Model",
  props: ["closeModal", "openModal"],
  setup(props) {
    const {
      rgpId,
      description,
      remarks,
      quantity,
      recQuantity,
      loading,
      rgpID,
      getLineEntry,
      getRgpId,
      itemReturnEntry,
      recevedQuantity,
      getQuantity,
      saveReturnEntry,
      sno,
      rgpDate,
      getSupplierData,
      depName, recievingdate, multiselecttoggle, multitoggleaction, getQtyMulti, tempDesc
    } = itemReturn();
    getSupplierData();
    const saveData = () => {
      if (description.value !== "" && rgpId.value !== "" && recQuantity.value !== "" && recievingdate.value !== "") {
        if (recQuantity <= recevedQuantity || recQuantity <= quantity) {


          let itemReturn = JSON.stringify({
            sno: sno.value,
            rgpDate: rgpDate.value,
            rgpId: Number(rgpId.value),
            description: tempDesc.value !== null ? tempDesc.value : description.value,
            recdQty: recQuantity.value,
            remarks: remarks.value,
            recievingdate: recievingdate.value,
            createdBy: sessionStorage.getItem("depCode"),
          });
          // console.log(itemReturn)
          saveReturnEntry(itemReturn);

          clearData();
          props.closeModal();
        } else {
          alert("Check the Receiving quantity")
        }
      } else {
        alert("Select All Fields")
      }

    };
    watch(() => description.value, () => {
      if (typeof description.value === 'object') {
        getQtyMulti()
      }

    });

    onUnmounted(() => {
      (rgpId.value = ""),
        (description.value = ""),
        (remarks.value = ""),
        (quantity.value = ""),
        (recQuantity.value = "");
      multiselecttoggle.value = false
    });
    const clearData = () => {
      (rgpId.value = ""),
        (description.value = ""),
        (remarks.value = ""),
        (quantity.value = ""),
        (recQuantity.value = "");
    };

    return {
      rgpId,
      depName,
      description,
      remarks,
      quantity,
      recQuantity,
      loading,
      rgpID,
      recevedQuantity,
      saveData,
      getLineEntry,
      itemReturnEntry,
      getQuantity,
      saveReturnEntry,
      getRgpId, recievingdate, multiselecttoggle, multitoggleaction
    };
  },
};
</script>

<style>
</style>
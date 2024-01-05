<template>
  <div
    class="max-w-5xl p-6 mx-auto static top-16 left-72 right-0 z-50 overflow-hidden bg-gradient-to-b from-theme-green to-theme-black rounded-md shadow-md modal-box mb-4">
    <div @click="closeModal" class="ml-800 cursor-pointer absolute top-2 left-48">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div class="overflow-y-auto relative" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <h1 class="text-2xl font-bold text-theme-black capitalize">
        <span>Supplier Form</span>
      </h1>

      <form class="p-2" @submit.prevent="saveData">

        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide">Supplier Type</span>
          </label>
          <div class="relative flex items-center">
            <div class="absolute border-r-2 border-blue-400 py-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-theme-black" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>

            <select v-model="supplierType" class="select select-bordered w-4/12 pl-12 focusring select-sm">
              <option>Supplier</option>
              <option>Sitra Staff</option>
              <option v-if="depCode === 10">Service Supplier</option>
              <option v-if="depCode === 10">Thirdparty Supplier</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4 grid-rows-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier Name
                <strong class="text-red-600 font-bold text-xl">*</strong></span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-theme-black" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <input type="text" placeholder="Name" v-model="supplierName" name="supplierName"
                class="input input-bordered pr-5 pl-12 w-full focusring input-sm" />
            </div>
          </div>
          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier Phone</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input v-model="supplierPhone" type="number" name="supplierPhone" placeholder="." maxlength="11"
                minlength="10" class="input input-bordered w-full pl-12 pr-5 focusring input-sm" />
            </div>
          </div>

          <div class="form-control row-span-2">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier Address
                <strong class="text-red-600 font-bold text-xl">*</strong></span>
            </label>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute top-3 ml-3" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <textarea v-model="supplierAddress" name="supplierAddress"
                class="textarea h-32 textarea-bordered w-full pl-11 pr-5 focusring" placeholder="."></textarea>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier City</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <input v-model="supplierCity" type="text" name="supplierCity" placeholder="."
                class="input input-bordered w-full pl-12 focusring input-sm" />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier State</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input v-model="supplierState" type="text" placeholder="." name="supplierState"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm" />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier Pincode</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input v-model="supplierPin" type="number" name="supplierPin" placeholder="."
                class="input input-bordered w-full pr-5 pl-12 focusring input-sm" />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier Email</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input v-model="supplierEmail" type="text" name="supplierEmail" placeholder="."
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm" />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Supplier GST no</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <input v-model="supplierGst" type="text" name="supplierGst" placeholder="."
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm" />
            </div>
          </div>
          <div class="flex justify-center row-start-4 col-start-2">
            <input class="btn font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black"
              value="Save" type="submit" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref } from "@vue/runtime-core";
import supplierModal from "../../composable/supplier/useSupplierModal";
export default {
  name: "Supplier Model",
  props: ["closeModal", "updateData"],
  setup(props) {
    const {
      supplierName,
      supplierAddress,
      supplierCity,
      supplierState,
      supplierPin,
      supplierEmail,
      supplierPhone,
      supplierGst,
      supplierType,
    } = supplierModal();

    const saveData = () => {
      if (supplierType.value === "Sitra Staff") {
        if (supplierName.value.length !== 0) {
          let supplierData = {
            supplierType: supplierType.value,
            supplierName:
              supplierName.value.length == 0
                ? document.getElementsByName("supplierName")[0].placeholder
                : supplierName.value,
            supplierAddress:
              supplierAddress.value.length == 0
                ? document.getElementsByName("supplierAddress")[0].placeholder
                : supplierAddress.value,
            supplierCity:
              supplierCity.value.length == 0
                ? document.getElementsByName("supplierCity")[0].placeholder
                : supplierCity.value,
            supplierState:
              supplierState.value.length == 0
                ? document.getElementsByName("supplierState")[0].placeholder
                : supplierState.value,
            supplierPin:
              supplierPin.value.length == 0
                ? document.getElementsByName("supplierPin")[0].placeholder
                : supplierPin.value,
            supplierEmail:
              supplierEmail.value.length == 0
                ? document.getElementsByName("supplierEmail")[0].placeholder
                : supplierEmail.value,
            supplierPhone:
              supplierPhone.value.length == 0
                ? document.getElementsByName("supplierPhone")[0].placeholder
                : supplierPhone.value,
            supplierGst:
              supplierGst.value.length == 0
                ? document.getElementsByName("supplierGst")[0].placeholder
                : supplierGst.value,
          };
          // console.log(supplierData);
          props.updateData(supplierData);
          clearData();
        } else {
          alert("Enter Data for Every Field or just for Important Fields");
        }
      } else if (supplierType.value === "Supplier") {
        if (
          supplierName.value.length !== 0 &&
          supplierAddress.value.length !== 0
        ) {
          let supplierData = {
            supplierType: supplierType.value,
            supplierName:
              supplierName.value.length == 0
                ? document.getElementsByName("supplierName")[0].placeholder
                : supplierName.value,
            supplierAddress:
              supplierAddress.value.length == 0
                ? document.getElementsByName("supplierAddress")[0].placeholder
                : supplierAddress.value,
            supplierCity:
              supplierCity.value.length == 0
                ? document.getElementsByName("supplierCity")[0].placeholder
                : supplierCity.value,
            supplierState:
              supplierState.value.length == 0
                ? document.getElementsByName("supplierState")[0].placeholder
                : supplierState.value,
            supplierPin:
              supplierPin.value.length == 0
                ? document.getElementsByName("supplierPin")[0].placeholder
                : supplierPin.value,
            supplierEmail:
              supplierEmail.value.length == 0
                ? document.getElementsByName("supplierEmail")[0].placeholder
                : supplierEmail.value,
            supplierPhone:
              supplierPhone.value.length == 0
                ? document.getElementsByName("supplierPhone")[0].placeholder
                : supplierPhone.value,
            supplierGst:
              supplierGst.value.length == 0
                ? document.getElementsByName("supplierGst")[0].placeholder
                : supplierGst.value,
          };
          // console.log(supplierData);
          props.updateData(supplierData);
          clearData();
        } else {
          alert("Enter Data for Every Field or just for Important Fields");
        }
      } else if (supplierType.value === "Service Supplier") {
        if (
          supplierName.value.length !== 0 &&
          supplierAddress.value.length !== 0
        ) {
          let supplierData = {
            supplierType: 'CS',
            supplierName:
              supplierName.value.length == 0
                ? document.getElementsByName("supplierName")[0].placeholder
                : supplierName.value,
            supplierAddress:
              supplierAddress.value.length == 0
                ? document.getElementsByName("supplierAddress")[0].placeholder
                : supplierAddress.value,
            supplierCity:
              supplierCity.value.length == 0
                ? document.getElementsByName("supplierCity")[0].placeholder
                : supplierCity.value,
            supplierState:
              supplierState.value.length == 0
                ? document.getElementsByName("supplierState")[0].placeholder
                : supplierState.value,
            supplierPin:
              supplierPin.value.length == 0
                ? document.getElementsByName("supplierPin")[0].placeholder
                : supplierPin.value,
            supplierEmail:
              supplierEmail.value.length == 0
                ? document.getElementsByName("supplierEmail")[0].placeholder
                : supplierEmail.value,
            supplierPhone:
              supplierPhone.value.length == 0
                ? document.getElementsByName("supplierPhone")[0].placeholder
                : supplierPhone.value,
            supplierGst:
              supplierGst.value.length == 0
                ? document.getElementsByName("supplierGst")[0].placeholder
                : supplierGst.value,
          };
          // console.log(supplierData);
          props.updateData(supplierData);
          clearData();
        } else {
          alert("Enter Data for Every Field or just for Important Fields");
        }
      } else if (supplierType.value === "Thirdparty Supplier") {
        if (
          supplierName.value.length !== 0 &&
          supplierAddress.value.length !== 0
        ) {
          let supplierData = {
            supplierType: 'CT',
            supplierName:
              supplierName.value.length == 0
                ? document.getElementsByName("supplierName")[0].placeholder
                : supplierName.value,
            supplierAddress:
              supplierAddress.value.length == 0
                ? document.getElementsByName("supplierAddress")[0].placeholder
                : supplierAddress.value,
            supplierCity:
              supplierCity.value.length == 0
                ? document.getElementsByName("supplierCity")[0].placeholder
                : supplierCity.value,
            supplierState:
              supplierState.value.length == 0
                ? document.getElementsByName("supplierState")[0].placeholder
                : supplierState.value,
            supplierPin:
              supplierPin.value.length == 0
                ? document.getElementsByName("supplierPin")[0].placeholder
                : supplierPin.value,
            supplierEmail:
              supplierEmail.value.length == 0
                ? document.getElementsByName("supplierEmail")[0].placeholder
                : supplierEmail.value,
            supplierPhone:
              supplierPhone.value.length == 0
                ? document.getElementsByName("supplierPhone")[0].placeholder
                : supplierPhone.value,
            supplierGst:
              supplierGst.value.length == 0
                ? document.getElementsByName("supplierGst")[0].placeholder
                : supplierGst.value,
          };
          // console.log(supplierData);
          props.updateData(supplierData);
          clearData();
        } else {
          alert("Enter Data for Every Field or just for Important Fields");
        }
      }
      else {
        alert("Select Supplier Type");
      }
    };

    onUnmounted(() => {
      (supplierType.value = ""),
        (supplierName.value = ""),
        (supplierAddress.value = ""),
        (supplierCity.value = ""),
        (supplierState.value = ""),
        (supplierPin.value = ""),
        (supplierEmail.value = ""),
        (supplierPhone.value = ""),
        (supplierGst.value = "");
    });
    const clearData = () => {
      (supplierType.value = ""),
        (supplierName.value = ""),
        (supplierAddress.value = ""),
        (supplierCity.value = ""),
        (supplierState.value = ""),
        (supplierPin.value = ""),
        (supplierEmail.value = ""),
        (supplierPhone.value = ""),
        (supplierGst.value = "");
      props.closeModal();
      // console.log("clear data fun");
    };

    let depCode = ref(Number(sessionStorage.getItem('depCode')))
    return {
      supplierName,
      supplierAddress,
      supplierCity,
      supplierState,
      supplierPin,
      supplierEmail,
      supplierPhone,
      supplierGst,
      saveData,
      supplierType, depCode
    };
  },
};
</script>

<style>
</style>
<template>
  <div
    class="p-6 mx-auto max-w-3xl fixed top-40 left-72 right-0 z-50 overflow-hidden card shadow-2xl modal-box mb-4 bg-gradient-to-bl from-theme-green to-theme-black"
  >
    <div class="card-body relative">
      <div class="flex justify-between mb-5">
        <div
          @click="
            () => {
              editClick = !editClick;
            }
          "
          class="cursor-pointer text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <div
          @click="closeView"
          class="cursor-pointer absolute top-0 transform translate-x-9 -translate-y-2 left-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <form class="grid grid-cols-3 gap-3" @submit.prevent="saveData">
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier Name</span
            >
          </label>

          <div class="flex items-center">
            <input
              v-model="supplierName"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :readonly="editClick"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier City</span
            >
          </label>
          <div class="flex items-center">
            <input
              v-model="supplierCity"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :readonly="editClick"
            />
          </div>
        </div>
        <div class="form-control row-span-2">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier Address</span
            >
          </label>
          <div class="flex items-center">
            <textarea
              v-model="supplierAddress"
              type="text"
              class="textarea w-full h-32 textarea-bordered border-theme-green focusring"
              :readonly="editClick"
            ></textarea>
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier Sate</span
            >
          </label>
          <div class="flex items-center">
            <input
              v-model="supplierState"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :readonly="editClick"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier Pincode</span
            >
          </label>
          <div class="flex items-center">
            <input
              v-model="supplierPin"
              type="number"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :readonly="editClick"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier Email</span
            >
          </label>
          <div class="flex items-center">
            <input
              v-model="supplierEmail"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :readonly="editClick"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier Phone</span
            >
          </label>
          <div class="flex items-center">
            <input
              v-model="supplierPhone"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :readonly="editClick"
            />
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Supplier GST</span
            >
          </label>
          <div class="flex items-center">
            <input
              v-model="supplierGst"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :readonly="editClick"
            />
          </div>
        </div>
        <div class="flex justify-center row-start-4 col-start-2">
          <input
            class="btn font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black"
            value="Update"
            type="submit"
            :disabled="editClick"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onUnmounted } from "@vue/runtime-core";
import supplier from "../../composable/supplier/useSupplier";
import supplierModal from "../../composable/supplier/useSupplierModal.js";
export default {
  name: "Supplier View",
  props: ["data", "closeView", "editModal"],
  setup(props) {
    const { editClick } = supplier();
    const {
      supplierName,
      supplierAddress,
      supplierCity,
      supplierState,
      supplierPin,
      supplierEmail,
      supplierPhone,
      supplierGst,
    } = supplierModal();

    // Setting values to the supplier data from the props data from supplier table 🔃🏃‍♂️.
    props.data.forEach((e) => {
      supplierName.value = e.supplierName;
      supplierAddress.value = e.supplierAddress;
      supplierCity.value = e.supplierCity;
      supplierState.value = e.supplierState;
      supplierPin.value = e.supplierPin;
      supplierEmail.value = e.supplierEmail;
      supplierPhone.value = e.supplierPhone;
      supplierGst.value = e.supplierGst;
    });

    // Const value i = 0, cuz there is only one data in the array.
    const i = 0;

    // To save the updated data i use this function 📦.
    const saveData = () => {
      let d = {
        supplierCode: props.data[0].supplierCode,
        supplierName: supplierName.value,
        supplierAddress: supplierAddress.value,
        supplierCity: supplierCity.value,
        supplierState: supplierState.value,
        supplierPin: supplierPin.value,
        supplierEmail: supplierEmail.value,
        supplierPhone: supplierPhone.value,
        supplierGst: supplierGst.value,
      };
      props.editModal(d);
      props.closeView();
    };

    // Unmounting Compontent Data for not getting mixed by view component🛬.
    onUnmounted(() => {
      supplierName.value = "No-Data";
      supplierAddress.value = "No-Data";
      supplierCity.value = "Coimbatore";
      supplierState.value = "TamilNadu";
      supplierPin.value = "641014";
      supplierEmail.value = "supplier@email.com";
      supplierPhone.value = "0422-4215333";
      supplierGst.value = "No-Data";
      editClick.value = true;
    });
    return {
      saveData,
      i,
      editClick,
      supplierName,
      supplierAddress,
      supplierCity,
      supplierState,
      supplierPin,
      supplierEmail,
      supplierPhone,
      supplierGst,
    };
  },
};
</script>

<style>
</style>
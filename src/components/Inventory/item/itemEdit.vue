<template>
  <div
    class="max-w-5xl p-6 mx-auto absolute top-20 right-5 z-50 overflow-hidden bg-gradient-to-b from-theme-green to-theme-black rounded-md shadow-md modal-box mb-4"
  >
    <div class="flex justify-between mb-5">
      <div
        @click="() => (editClick = !editClick)"
        class="cursor-pointer text-blue-500"
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
      <div @click="closeModal" class="cursor-pointer">
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
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>

    <div
      class="overflow-y-auto relative"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <h1 class="text-2xl font-bold text-theme-black capitalize">
        <span>Item Master</span>
      </h1>

      <form class="p-2" @submit.prevent="update">
        <div class="grid grid-cols-3 gap-4 mt-4 grid-rows-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Item Code
                <strong class="text-red-600 font-bold text-xl">*</strong></span
              >
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
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
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Code"
                v-model="itemCode"
                class="input input-bordered pr-5 pl-12 w-full focusring input-sm"
                :readonly="editClick"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Description
                <strong class="text-red-600 font-bold text-xl">*</strong></span
              >
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <input
                v-model="description"
                type="text"
                placeholder="description"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                :readonly="editClick"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Description1</span
              >
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <input
                v-model="description1"
                type="text"
                placeholder="description"
                :readonly="editClick"
                class="input input-bordered w-full pl-12 focusring input-sm"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Unit</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
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
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                v-model="unit"
                type="text"
                placeholder="unit"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                :readonly="editClick"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Quantity</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
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
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <input
                v-model="quantity"
                type="number"
                placeholder="quantity"
                class="input input-bordered w-full pr-5 pl-12 focusring input-sm"
                :readonly="editClick"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label flex flex-col gap-2">
              <span class="label-text font-bold tracking-wide"
                >Expiry Check</span
              >
              <div class="flex gap-5 mt-2">
                <label class="cursor-pointer label gap-5">
                  <span class="label-text font-bold tracking-wide text-white"
                    >Yes</span
                  >
                  <input
                    v-model="expiryDateCheck"
                    type="radio"
                    name="opt"
                    :checked="expiryDateCheck==='Y'"
                    class="radio border-2 border-black"
                    value="Y"
                    :readonly="editClick"
                  />
                </label>
                <label class="cursor-pointer label gap-5">
                  <span class="label-text font-bold tracking-wide text-white"
                    >No</span
                  >
                  <input
                    v-model="expiryDateCheck"
                    type="radio"
                    name="opt"
                    :checked="expiryDateCheck==='N'"
                    class="radio border-2 border-black"
                    value="N"
                    :readonly="editClick"
                  />
                </label>
              </div>
            </label>
          </div>

          <div class="flex justify-center col-start-2">
            <input
              class="btn font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black"
              :disabled="editClick"
              value="Update"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onUnmounted } from '@vue/runtime-core';
import item from "../../../composable/item/useItem.js";
import itemModal from "../../../composable/item/useItemModol";
export default {
  name: "ItemEdit",
  props: ["closeModal"],
  setup() {
    const { editData, editClick, updateEdit } = item();

    let date = new Date();

    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();
    date = mm + "-" + dd + "-" + yyyy;
    const update = () => {
      let jdata = JSON.stringify({
        itemId: editData.value[0].itemId,
        itemCode: itemCode.value,
        itemDescription: description.value,
        itemDescription1: description1.value,
        unit: unit.value,
        minOrderQty: quantity.value,
        createdBy: sessionStorage.getItem("userCode"),
        modifiedBy: sessionStorage.getItem("userCode"),
        modifiedDate: date,
        expiryDateCheck: expiryDateCheck.value,
      });
      updateEdit(jdata);
    };

    const {
      itemCode,
      description,
      description1,
      quantity,
      unit,
      expiryDateCheck,
    } = itemModal();

    itemCode.value = editData.value[0].itemCode;
    description.value = editData.value[0].itemDescription;
    description1.value = editData.value[0].itemDescription1;
    unit.value = editData.value[0].unit;
    quantity.value = editData.value[0].minOrderQty;
    expiryDateCheck.value = editData.value[0].expiryDateCheck;

    onUnmounted(()=>{
        itemCode.value = "";
    description.value = "";
    description1.value = "";
    unit.value = "";
    quantity.value = "";
    expiryDateCheck.value = "";
    })

    return {
      editData,
      itemCode,
      description,
      description1,
      quantity,
      unit,
      expiryDateCheck,
      editClick,
      update,
    };
  },
};
</script>
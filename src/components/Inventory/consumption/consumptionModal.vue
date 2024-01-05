<template>
  <div
    class="max-w-5xl p-6 mx-auto absolute top-48 left-72 right-0 z-50 overflow-hidden bg-gradient-to-b from-theme-green to-theme-black rounded-md shadow-md modal-box mb-4"
  >
    <div
      @click="closeModal"
      class="ml-800 cursor-pointer absolute top-2 left-48"
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
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div
      class="overflow-y-auto relative"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <h1 class="text-2xl font-bold text-theme-black capitalize">
        <span>Consumption</span>
      </h1>

      <form class="p-2" @submit.prevent="save">
        <div class="grid grid-cols-3 gap-4 mt-4 grid-rows-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >ItemCode
                <strong class="text-red-600 font-bold text-xl">*</strong></span
              >
            </label>
            <div class="relative">
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

              <select
                v-model="itemCode"
                class="select select-bordered w-full pl-12 focusring select-sm"
              >
                <option
                  v-for="(item, i) in itemData"
                  :value="item.itemCode"
                  :key="i"
                  @click="getTotal(i)"
                >
                  {{ item.itemCode }}
                </option>
              </select>
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
                readonly
                type="text"
                placeholder="description"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
              />
            </div>
          </div>

          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Batch No</span>
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
                v-model="batchNo"
                readonly
                type="text"
                placeholder="BatchNo"
                class="input input-bordered w-full pl-12 focusring input-sm"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Expiry Date</span
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                v-model="expDate"
                type="text"
                placeholder="Date"
                readonly
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
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
              />
            </div>
          </div>
          <div class="flex justify-center col-start-2">
            <input
              class="btn font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black"
              value="Save"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { onUnmounted } from "@vue/runtime-core";
import consumption from "../../../composable/consumption/useConsumption";

export default {
  name: "consumption",
  props: ["heading", "closeModal"],
  setup() {
    const {
      getItemData,
      itemData,
      getTotal,
      expDate,
      quantity,
      description,
      batchNo,
      itemCode,
      saveData,
      itemId,
    } = consumption();
    const date = new Date();

    onUnmounted(() => {
      itemData.value = [];
      batchNo.value=""
      quantity.value=""
      expDate.value=""
      itemId.value=""
      description.value=""
      // console.log("unMounted", itemData.value);
    });
    const save = () => {
      let d = {
        itemCode: itemCode.value,
        expiryDate: expDate.value,
        quantity: quantity.value,
        itemDescription: description.value,
        batchNo: batchNo.value,
        departmentCode: sessionStorage.getItem("depCode"),
        itemId: itemId.value,
        constDate:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
      };
      saveData(d);
    };

    getItemData();
    return {
      itemData,
      getTotal,
      expDate,
      quantity,
      description,
      batchNo,
      itemCode,
      save,
    };
  },
};
</script>

<style>
</style>
<template>
  <div
    class="p-6 mx-auto max-w-4xl fixed top-16 left-72 right-0 z-50 overflow-hidden card shadow-2xl bg-base-100 modal-box mb-4 bg-gradient-to-bl from-theme-green to-theme-black">
    <div class="card-body relative">
      <div @click="showView" class="cursor-pointer absolute top-0 transform translate-x-9 -translate-y-2 left-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">Gate pass</span>
          </label>
          <div class="flex items-center">
            <input readonly :value="data[i].gatePass" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">Staff Name</span>
          </label>
          <div class="flex items-center">
            <input readonly :value="data[i].staffName" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">Customer
              Name</span>
          </label>
          <div class="flex items-center" v-if="data[i].supplierName === null">
            <input readonly :value="data[i].name" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
          <div class="flex items-center" v-else>
            <input readonly :value="data[i].supplierName" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">Transport Mode</span>
          </label>

          <div class="flex items-center">
            <input readonly :value="data[i].transportMode" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">Transport Company</span>
          </label>
          <div class="flex items-center">
            <input readonly :value="data[i].transportCompany" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">Vehicle No</span>
          </label>
          <div class="flex items-center">
            <input readonly :value="data[i].vehicleNo" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">No of items</span>
          </label>
          <div class="flex items-center">
            <input readonly :value="data[i].noOfItems" type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm" />
          </div>
        </div>
        <!-- <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Purpose</span
            >
          </label>
          <div class="flex items-center">
            <input
              readonly
              :value="data[i].purpose"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
            />
          </div>
        </div> -->
        <!-- <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Approximate Cost</span
            >
          </label>
          <div class="flex items-center">
            <input
              readonly
              :value="data[i].appCost"
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
            />
          </div>
        </div> -->
        <div class="form-control col-span-4">
          <label class="label">
            <span class="label-text font-bold tracking-tight leading-tight text-white">Remarks
            </span>
          </label>

          <textarea readonly :value="data[i].remarks" name="supplierAddress"
            class="textarea h-32 w-full border-theme-green focusring" placeholder="Remarks"></textarea>
        </div>

        <!-- <div class="flex space-x-4">
               <p class="font-serif font-semibold text-lg text-red-600">Supplier GST no:</p>
               <p>{{data[i].description}}</p>
           </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Supplier View",
  props: [
    "data",
    "showView",
    "viewI",
    "supplierName",
    "supplierAddress",
    "supplierCity",
    "supplierState",
    "supplierPin",
    "supplierEmail",
    "supplierPhone",
    "supplierGst",
  ],
  setup(props) {
    const i = ref(props.viewI);
    // console.log(i.value);
    // console.log(props.data[i.value]);
    return {
      i,
    };
  },
};
</script>

<style>
</style>
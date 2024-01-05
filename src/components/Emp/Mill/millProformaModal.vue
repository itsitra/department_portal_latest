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
        <span>Mill Proforma</span>
      </h1>

      <form class="p-2" @submit.prevent="save">
        <div class="grid grid-cols-3 gap-4 mt-4 grid-rows-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Amount
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
                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="amount"
                readonly
                type="number"
                placeholder="amount"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Cgst
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
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                  />
                </svg>
              </div>
              <input
                v-model="cgst"
                type="number"
                placeholder="cgst"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Sgst
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
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                  />
                </svg>
              </div>
              <input
                v-model="sgst"
                type="number"
                placeholder="sgst"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Igst
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
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                  />
                </svg>
              </div>
              <input
                v-model="igst"
                type="number"
                placeholder="igst"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Gross
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
                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="gross"
                type="number"
                placeholder="gross"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
              />
            </div>
          </div>

          <div class="flex justify-center col-start-2">
            <input
              class="btn font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black"
              value="Save"
              type="submit"
              :readonly="clicked"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import millProformaModal from "../../../composable/Emp/Mill/useMillModal";
import mill from "../../../composable/Emp/Mill/useMill";

export default {
  name: "mill",
  props: ["heading", "closeModal"],
  setup() {
    const { amount, cgst, sgst, igst, gross, postdata, clicked } =
      millProformaModal();
    const { tempData } = mill();
    amount.value = tempData.value[0].amount;

    const save = () => {
      let d = {
        reqId: Number(tempData.value[0].reqId),
        amount: Number(tempData.value[0].amount),
        cgst: cgst.value,
        sgst: sgst.value,
        igst: igst.value,
        gross: gross.value,
      };
      postdata(d);
    };

    // getItemData();
    return {
      amount,
      cgst,
      sgst,
      igst,
      gross,
      postdata,
      save,
      clicked,
    };
  },
};
</script>

<style>
</style>
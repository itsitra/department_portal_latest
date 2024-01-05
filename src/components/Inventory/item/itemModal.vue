<template>
  <div class="
      max-w-5xl
      p-6
      mx-auto
      absolute
      top-0
      left-72
      right-0
      bg-gradient-to-b
      from-theme-green
      to-theme-black
      rounded-md
      shadow-md
      modal-box
      mb-4
    ">
    <div @click="closeModal"
      :class="[currentState === 0 ? 'ml-800 cursor-pointer absolute top-2 left-44' : 'ml-800 cursor-pointer absolute top-2 left-36']">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div class="overflow-y-auto relative" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <h1 class="text-2xl font-bold text-theme-black capitalize">
        <span>Item Master</span>
      </h1>
      <div class="tabs tabs-boxed w-32 mt-2">
        <a :class="[currentState == 0 ? 'tab tab-active' : 'tab']" @click="() => currentState = 0"><svg
            xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg></a>
        <a :class="[currentState == 1 ? 'tab tab-active' : 'tab']" @click="() => currentState = 1"><svg
            xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
          </svg></a>
      </div>
      <form class="p-2" @submit.prevent="saveData" v-if="currentState === 0">
        <div class="grid grid-cols-3 gap-4 mt-4 grid-rows-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Item Code
                <strong class="text-red-600 font-bold text-xl">*</strong></span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>

              <input type="text" placeholder="Code" v-model="itemCode" class="
                  input input-bordered
                  pr-5
                  pl-12
                  w-full
                  focusring
                  input-sm
                " />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Description
                <strong class="text-red-600 font-bold text-xl">*</strong></span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <input v-model="description" type="text" placeholder="description" class="
                  input input-bordered
                  w-full
                  pl-12
                  pr-5
                  focusring
                  input-sm
                " />
            </div>
          </div>

          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Description1</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <input v-model="description1" type="text" placeholder="description"
                class="input input-bordered w-full pl-12 focusring input-sm" />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Unit</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              <select v-model="unit" class="select select-bordered select-sm focusring pl-12  pr-5  w-full">
                <option v-for="uni in units" :key="uni" :value="uni" class="select select-xs">
                  {{ uni }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Min Order Quantity</span>
            </label>
            <div class="relative flex items-center">
              <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <input v-model="quantity" type="number" placeholder="quantity" class="
                  input input-bordered
                  w-full
                  pr-5
                  pl-12
                  focusring
                  input-sm
                " />
            </div>
          </div>
          <div class="form-control mt-5">
            <label class="cursor-pointer label">
              <span class="label-text font-bold tracking-wide">Expiry Check</span>
              <div class="flex flex-row">
                <label class="cursor-pointer label gap-2">
                  <span class="label-text font-bold tracking-wide text-white">Yes</span>
                  <input v-model="expiryDateCheck" type="radio" name="opt" class="radio border-2 border-black"
                    value="Y" />
                </label>
                <label class="cursor-pointer label gap-2">
                  <span class="label-text font-bold tracking-wide text-white">No</span>
                  <input v-model="expiryDateCheck" type="radio" name="opt" class="radio border-2 border-black"
                    value="N" />
                </label>
              </div>
            </label>
          </div>

          <div class="flex justify-center col-start-2">
            <input class="
                btn
                font-bold
                bg-theme-black
                text-theme-green
                hover:bg-theme-green hover:text-theme-black
              " value="Save" type="submit" />
          </div>
        </div>
      </form>
      <div v-if="currentState === 1" class="mt-5">
        <div class="">
          <div class=" flex gap-10 items-start justify-between">
            <div class="form-control  btn btn-sm">
              <label for="fileup" class="cursor-pointer"><span><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg></span></label>
              <input id="fileup" type="file" class="hidden"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/excel"
                @change="handleUpload">
            </div>
            <div class="form-control">
              <button @click.prevent="saveData" class="
                btn btn-sm
                font-bold
                bg-theme-black
                text-theme-green
                hover:bg-theme-green hover:text-theme-black
              ">Save</button>

            </div>
          </div>

          <table class="table w-full table-compact  mt-5">
            <thead>
              <tr class="bg-gray-300 text-gray-700 font-extrabold">
                <th>Item Code</th>
                <th>Unit</th>
                <th>Expiry Check</th>
                <th>Description</th>

              </tr>
            </thead>
            <tbody class="overflow-scroll">
              <tr v-for="(item, i) in items" :key="i">
                <td class="text-center">{{ item.itemcode }}</td>
                <td class="text-center">{{ item.unit }}</td>
                <td class="text-center">{{ item.expiryCheck }}</td>
                <td>{{ item.description.replace(/\s/g, "") }}</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { onUnmounted } from '@vue/runtime-core';
import useModal from "../../../composable/item/useItemModol";
export default {
  name: "Supplier Model",
  props: ["closeModal", "showModal", "updateData"],
  setup(props) {
    const {
      itemCode,
      description,
      description1,
      unit,
      quantity,
      expiryDateCheck, currentState, upload, units, handleUpload, items
    } = useModal();

    let date = new Date();

    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = date.getFullYear();
    date = mm + "-" + dd + "-" + yyyy;
    const saveData = () => {
      if (currentState.value === 0) {
        let itemMaster = {
          itemCode: itemCode.value,
          itemDescription: description.value,
          itemDescription1: description1.value,
          unit: unit.value,
          minOrderQty: quantity.value,
          createdBy: sessionStorage.getItem("userCode"),
          modifiedBy: sessionStorage.getItem("userCode"),
          modifiedDate: date,
          expiryDateCheck: expiryDateCheck.value,
        };

        let jdata = JSON.stringify(itemMaster);
        props.updateData(jdata);
      } else {
        let jdata = JSON.stringify(items.value)
        props.updateData(jdata);
        // console.log(jdata)
      }


      // console.log("saveData fun");
      clearData();
    };

    onUnmounted(() => {
      (itemCode.value = ""),
        (description.value = ""),
        (description1.value = ""),
        (unit.value = "");
      quantity.value = null;
      items.value = []
    })
    const clearData = () => {
      (itemCode.value = ""),
        (description.value = ""),
        (description1.value = ""),
        (unit.value = "");
      quantity.value = null;
      props.closeModal();
      // console.log("clear data fun");
    };

    return {
      saveData,
      itemCode,
      description,
      description1,
      unit,
      quantity,
      expiryDateCheck, currentState, upload, units, handleUpload, items
    };
  },
};
</script>
<style scoped>
thead th {
  background: none;
  font-size: 14px;
}
</style>
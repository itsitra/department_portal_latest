<template>
  <div
    class="max-w-5xl p-6 mx-auto static top-0 left-72 right-0 z-50 bg-gradient-to-b from-theme-green to-theme-black rounded-md shadow-md modal-box mb-20"
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
    <div class="overflow-y-auto relative">
      <h1 class="text-2xl font-bold text-theme-black capitalize">
        <span>{{ heading }}</span>
      </h1>

      <form class="p-2 flex flex-col w-full">
        <!-- Header data entry -->

        <div class="grid grid-cols-4 gap-6 mt-4">
          <div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >GRN No
                  <strong class="text-red-600 font-bold">*</strong></span
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
                  v-model="grn"
                  class="select select-bordered w-52 pl-12 focusring select-sm"
                >
                  <option
                    v-for="(g, i) in grnno"
                    :value="g.GrnNo"
                    :key="i"
                    @click="getGrnItem(g.GrnNo)"
                  >
                    {{ g.GrnNo }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="divider mt-9"></div>
      <h1 class="text-lg font-bold text-theme-black capitalize">
        <span>Add Details of product</span>
      </h1>
      <!-- line data entry -->
      <!-- <div class="grid grid-cols-4 gap-6 mt-2"> -->
      <div class="grid grid-cols-3 gap-2">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >ItemCode <strong class="text-red-600 font-bold">*</strong></span
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
              class="select select-bordered w-52 pl-12 focusring select-sm"
            >
              <option
                v-for="(item, i) in itemDataGrn"
                :value="item.Item_Code"
                :key="i"
                @click="getDes(i)"
              >
                {{ item.Item_Code }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Description
              <strong class="text-red-600 font-bold">*</strong></span
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
              placeholder="Description"
              readonly
              class="input input-bordered focusring pl-12 input-sm"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Batch No <strong class="text-red-600 font-bold">*</strong></span
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
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              v-model="batchNo"
              type="text"
              placeholder="BatchNo"
              :readonly="valueNeed"
              class="input input-bordered focusring pl-12 input-sm"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Expiry Date
              <strong class="text-red-600 font-bold">*</strong></span
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
              v-model="expiryDate"
              type="date"
              placeholder="Date"
              :readonly="valueNeed"
              class="input input-bordered w-52 focusring pl-12 input-sm"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Quantity <strong class="text-red-600 font-bold">*</strong></span
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
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <input
              v-model="quantity"
              type="text"
              placeholder="Quantity"
              class="input input-bordered focusring pl-12 input-sm"
            />
          </div>
        </div>

        <div class="form-control mt-9 w-32">
          <input
            @click="addLineEntry"
            class="btn bg-theme-black text-theme-green btn-sm"
            type="button"
            value="Add"
          />
        </div>
      </div>
      <!-- line table -->
      <div class="overflow-x-auto mt-12">
        <table class="table w-full table-compact">
          <thead>
            <tr class="bg-gray-300 text-gray-700 font-extrabold">
              <th>Item Code</th>
              <th>Description</th>
              <th>Batch No</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <!-- <th>Expiry Check</th> -->
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="line in lineEntries" :key="line.itemCode">
              <th>{{ line.itemCode }}</th>
              <td>{{ line.description }}</td>
              <td>{{ line.batchNo }}</td>
              <td>{{ line.expiryDate }}</td>
              <td>{{ line.quantity }}</td>
              <td>{{ line.Price }}</td>

              <!-- <td>{{ line.expiryDateChecked }}</td> -->
              <td class="cursor-pointer" @click="deleteData(i)">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center mt-10">
      <button
        class="px-6 py-2 font-bold tracking-wide bg-theme-black transition-colors duration-200 transform text-theme-green rounded-xl focus:outline-none focus:bg-gray-600"
        @click.prevent="save"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "@vue/runtime-core";
import useModal from "../../../composable/grn/useGrnModal";
import itemReturn from "../../../composable/itemReturn/useItemReturn";

export default {
  name: "grn",
  props: ["heading", "closeModal"],
  setup(props) {
    const { getItemData, itemData } = itemReturn();
    getItemData();
    const {
      grnDate,
      supplierName,
      name,
      Price,
      itemCode,
      description,
      batchNo,
      expiryDate,
      quantity,
      suppliers,
      lineEntries,
      addLineEntry,
      deleteData,
      saveData,
      getGrnNo,
      itemId,
      getDes,
      valueNeed,
      grnno,
      grn,
      getGrnItem,
      itemDataGrn,
    } = useModal();
    const save = () => {
      let d = {
        supplierCode: supplierName.value,
        supplierName: name.value,
        departmentCode: sessionStorage.getItem("depCode"),
        createdBy: sessionStorage.getItem("depCode"),
        grnDate: grnDate.value,
        grnno: grn.value,
        grnItems: [...lineEntries.value],
      };
      saveData(d);
      props.closeModal();
    };

    onMounted(() => {
      getGrnNo();
    });
    onUnmounted(() => {
      lineEntries.value = [];
      suppliers.value = [];
      grnDate.value = "";
      itemData.value = [];
    });
    return {
      grnDate,
      supplierName,
      name,
      Price,
      itemCode,
      description,
      batchNo,
      expiryDate,
      quantity,
      suppliers,
      addLineEntry,
      lineEntries,
      deleteData,
      saveData,
      save,
      grnno,
      itemId,
      itemData,
      getDes,
      valueNeed,
      grn,
      getGrnItem,
      itemDataGrn,
    };
  },
};
</script>

<style>
</style>
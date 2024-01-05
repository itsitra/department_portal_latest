<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    @click="backdropClose"
    v-if="receiptmodalitem"
  ></div>
  <div
    v-if="receiptmodalitem"
    class="p-6 mx-auto max-w-4xl fixed top-44 left-72 right-0 z-50 overflow-hidden card shadow-2xl modal-box mb-4 bg-gray-50"
  >
    <div class="tabs">
      <a
        :class="[
          currentstateitemmater == 0
            ? 'tab tab-bordered tab-active'
            : 'tab tab-bordered',
        ]"
        @click="changeState(0)"
        >Search Item
      </a>
      <a
        :class="[
          currentstateitemmater == 1
            ? 'tab tab-bordered tab-active'
            : 'tab tab-bordered',
        ]"
        @click="changeState(1)"
        >Upload Items</a
      >
      <a
        :class="[
          currentstateitemmater == 2
            ? 'tab tab-bordered tab-active'
            : 'tab tab-bordered',
        ]"
        @click="changeState(2)"
        >Create Items</a
      >
    </div>
    <div id="cardbody">
      <div id="searchfield" v-if="currentstateitemmater == 0">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide text-white"
              >Search Item</span
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
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              v-model="serachitem"
              type="text"
              name="itemserach"
              placeholder="Search Item"
              class="input input-bordered w-full pl-12 pr-5 focusring"
              @input="serachItemMaster(serachitem)"
            />
          </div>
        </div>
        <div class="divider"></div>
        <div id="items" class="space-y-5 overflow-y-scroll p-5 h-96">
          <div v-if="searchdataitem.length !== 0" class="space-y-5">
            <div
              class="h-15 w-full bg-white rounded-xl shadow-lg p-5"
              v-for="itemsearch in searchdataitem"
              :key="itemsearch.itemId"
            >
              <div class="flex gap-5 items-center justify-between">
                <p>{{ itemsearch.itemCode }}</p>
                <p>{{ itemsearch.itemDescription }}</p>
                <p>{{ itemsearch.itemType }}</p>
                <p>{{ itemsearch.calibrationType }}</p>
              </div>
            </div>
          </div>

          <div class="h-15 w-full bg-white rounded-xl shadow-lg p-5" v-else>
            Type Item Name To Search
          </div>
        </div>
      </div>
      <div id="excelimport" v-if="currentstateitemmater == 1">
        <div id="excelaction" class="flex items-end justify-end">
          <div
            class="form-control bg-white shadow-lg p-2 rounded-lg hover:bg-green-300 duration-300 transition-all ease-in"
          >
            <label for="fileup" class="cursor-pointer"
              ><span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  /></svg></span
            ></label>
            <input
              id="fileup"
              type="file"
              class="hidden"
              @change="handleUpload($event, 'itemmodal')"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/excel"
            />
          </div>
        </div>
        <div
          id="excelcountsandaction"
          class="flex items-start justify-between mt-5"
        >
          <p>Total Records:{{ itemsupload.length }}</p>
          <button
            @click.prevent="saveitemmaster('upload')"
            class="btn btn-sm btn-success"
            :disabled="itemsupload.length === 0"
          >
            Save
          </button>
        </div>
        <div id="exceltable" class="mt-5 overflow-y-scroll px-5 h-98">
          <table class="table w-full table-compact">
            <thead>
              <tr class="bg-gray-300 text-gray-700 font-extrabold">
                <th>Name</th>
                <th>Item Type</th>
                <!-- <th>Cali Type</th> -->
                <!-- <th>Cali Cost</th> -->
              </tr>
            </thead>
            <tbody class="overflow-scroll">
              <tr v-for="(item, i) in itemsupload" :key="i">
                <td>{{ item.desc }}</td>
                <td>{{ item.itemtype }}</td>
                <!-- <td>{{ item.calitype }}</td>
                <td>{{ item.appcost }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="itementry" v-if="currentstateitemmater == 2">
        <div id="entryactions" class="flex items-end justify-end my-2">
          <div
            class="p-2 bg-white rounded-md shadow-md cursor-pointer flex gap-2 items-center justify-center"
          >
            <input
              type="number"
              class="input input-bordered input-sm w-15"
              @change="itemlen($event)"
            />

            <button
              class="flex gap-2 btn btn-sm btn-success"
              :disabled="ietmlistdata.length === 0"
              @click.prevent="saveitemmaster('insert')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>New Item</span>
            </button>
          </div>
        </div>
        <div id="itememtryitems">
          <div
            v-if="ietmlistdata.length == 0"
            class="w-full bg-white rounded-xl shadow-lg p-5"
          >
            Enter Items Count To Insert
          </div>
          <div v-else class="space-y-4 h-98 overflow-y-scroll p-5">
            <div
              class="w-full bg-white rounded-xl shadow-lg p-5"
              v-for="(item, i) in ietmlistdata"
              :key="i"
            >
              <div class="flex gap-5 flex-wrap">
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold tracking-wide"
                      >Item Code
                      <strong class="text-red-600 font-bold text-xl"
                        >*</strong
                      ></span
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
                      v-model="item.itemcode"
                      type="text"
                      placeholder="Itrem code"
                      class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                    />
                  </div>
                </div> -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold tracking-wide"
                      >Description
                      <strong class="text-red-600 font-bold text-xl"
                        >*</strong
                      ></span
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
                      v-model="item.desc"
                      type="text"
                      placeholder="description"
                      class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                    />
                  </div>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold tracking-wide"
                      >Item Type
                      <strong class="text-red-600 font-bold text-xl"
                        >*</strong
                      ></span
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
                    <select
                      v-model="item.itemtype"
                      class="select select-bordered select-sm focusring pl-12 pr-5 w-full"
                    >
                      <option value="Dimesion">Dimension</option>
                      <option value="Textile">Textile</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Thermal">Thermal</option>
                      <option value="Volume">Volume</option>
                      <option value="Mass">Mass</option>
                      <option value="Balance">Balance</option>
                      <option value="Electro Techinical">
                        Electro Techinical
                      </option>
                      <option value="Speed">Speed</option>
                    </select>
                  </div>
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold tracking-wide"
                      >Calibration Type
                      <strong class="text-red-600 font-bold text-xl"
                        >*</strong
                      ></span
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
                    <select
                      v-model="item.calitype"
                      class="select select-bordered select-sm focusring pl-12 pr-5 w-full"
                    >
                      <option>On site</option>
                      <option>In-House</option>
                      <option>Third Party</option>
                    </select>
                  </div>
                </div> -->

                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text font-bold tracking-wide"
                      >Item Cost
                      <strong class="text-red-600 font-bold text-xl"
                        >*</strong
                      ></span
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
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="item.itemcost"
                      type="number"
                      placeholder="Cost"
                      class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                    />
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useReciptModal from "../../composable/Receipt/useReciptmodal";
export default {
  name: "Receipt Item Modal",
  props: ["backdropClose", "receiptmodalitem"],
  setup() {
    const {
      handleUpload,
      itemsupload,
      saveitemmaster,
      currentstateitemmater,
      changeState,
      ietmlistdata,
      createItremInputLength,
      itemlen,
      serachitem,
      serachItemMaster,
      searchdataitem,
    } = useReciptModal();
    return {
      changeState,
      currentstateitemmater,
      createItremInputLength,
      itemlen,
      ietmlistdata,
      handleUpload,
      itemsupload,
      saveitemmaster,
      serachitem,
      serachItemMaster,
      searchdataitem,
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
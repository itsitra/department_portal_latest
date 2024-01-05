<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    @click="closeModal"
  ></div>
  <div
    class="p-6 ml-80 max-w-6xl fixed top-72 left-52 right-0 z-50 overflow-hidden card shadow-2xl modal-box mb-4 bg-gray-50 h-72"
  >
    <div id="modalitems">
      <div class="tabs">
        <a
          :class="[
            currentstate === 1
              ? 'tab tab-lifted tab-active'
              : 'tab  tab-lifted',
          ]"
          @click="tabschange(1)"
          >Items</a
        >
        <a
          :class="[
            currentstate === 2 ? 'tab tab-lifted tab-active' : 'tab tab-lifted',
          ]"
          @click="tabschange(2)"
          >Service</a
        >
        <a
          :class="[
            currentstate === 3 ? 'tab tab-lifted tab-active' : 'tab tab-lifted',
          ]"
          @click="tabschange(3)"
          >Third-party</a
        >
        <a
          :class="[
            currentstate === 4 ? 'tab tab-lifted tab-active' : 'tab tab-lifted',
          ]"
          @click="tabschange(4)"
          >Others</a
        >
      </div>
      <div id="tabsmenuitems" class="mt-5">
        <div id="current1" v-if="currentstate === 1">
          <div class="flex gap-2" id="menuitemsselect1">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-2">Received Items </span>
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.recItems"
                  value="1"
                  @change="itemsstate($event, 1, 'items')"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-2">Received Items By customer</span>
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.recItems"
                  value="2"
                  @change="itemsstate($event, 1, 'items')"
                />
              </label>
            </div>
          </div>
          <div id="reportfiled">
            <div class="flex gap-5">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold tracking-wide text-black"
                    >From Date</span
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
                    type="date"
                    placeholder="From Date"
                    class="input input-bordered input-sm w-full pl-12 pr-5 focusring"
                    v-model="data.fromdate"
                    :max="today"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold tracking-wide text-black"
                    >To Date
                  </span>
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
                    type="date"
                    placeholder="To Date"
                    class="input input-bordered w-full input-sm pl-12 pr-5 focusring"
                    v-model="data.todate"
                    :max="today"
                  />
                </div>
              </div>

              <div class="form-control" v-if="tabmenuitems.recItems === 2">
                <label class="label">
                  <span class="label-text">Search Customer</span>
                </label>
                <div class="flex space-x-2 relative">
                  <input
                    type="text"
                    placeholder="Search"
                    class="w-full input focusring input-sm input-bordered"
                    v-model="data.custnamequery"
                  />
                  <button
                    @click.prevent="getCustData(data.custnamequery)"
                    class="btn btn-sm font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black absolute w-10 right-0"
                  >
                    <span v-if="queryLoading">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span v-else>
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
                    </span>
                  </button>
                </div>
              </div>

              <div class="form-control w-96" v-if="tabmenuitems.recItems === 2">
                <label class="label">
                  <span class="label-text font-bold tracking-wide"
                    >Search / Select User</span
                  >
                </label>
                <div class="w-full">
                  <v-select label="name" :options="cust" v-model="data.custid">
                  </v-select>
                </div>
              </div>
              <div class="flex justify-center mt-9">
                <button
                  class="btn btn-sm btn-success"
                  @click.prevent="reportgenerate('items')"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="current2" v-if="currentstate === 2">
          <div class="flex gap-2 flex-wrap" id="menuitemsselect2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.serviceItems"
                  value="1"
                  @change="itemsstate($event, 2, 'service')"
                />
                <span class="label-text ml-2">Service Despatched </span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.serviceItems"
                  value="2"
                  @change="itemsstate($event, 2, 'service')"
                />
                <span class="label-text ml-2">Servicing Items</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.serviceItems"
                  value="3"
                  @change="itemsstate($event, 2, 'service')"
                />
                <span class="label-text ml-2"
                  >Servicing Items Particular Vendor</span
                >
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.serviceItems"
                  value="4"
                  @change="itemsstate($event, 2, 'service')"
                />
                <span class="label-text ml-2"
                  >Servicing Items Not Serviced</span
                >
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.serviceItems"
                  value="5"
                  @change="itemsstate($event, 2, 'service')"
                />
                <span class="label-text ml-2"
                  >Servicing Items Pending with Vendor</span
                >
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.serviceItems"
                  value="6"
                  @change="itemsstate($event, 2, 'service')"
                />
                <span class="label-text ml-2"
                  >Servicing Items Pending in Sitra</span
                >
              </label>
            </div>
          </div>
          <div id="reportfiled">
            <div class="flex gap-5">
              <div class="form-control" v-if="tabmenuitems.serviceItems !== 5">
                <label class="label">
                  <span class="label-text font-bold tracking-wide text-black"
                    >From Date</span
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
                    type="date"
                    placeholder="From Date"
                    class="input input-bordered input-sm w-full pl-12 pr-5 focusring"
                    v-model="data.fromdate"
                    :max="today"
                  />
                </div>
              </div>
              <div class="form-control" v-if="tabmenuitems.serviceItems !== 5">
                <label class="label">
                  <span class="label-text font-bold tracking-wide text-black"
                    >To Date
                  </span>
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
                    type="date"
                    placeholder="To Date"
                    class="input input-bordered w-full input-sm pl-12 pr-5 focusring"
                    v-model="data.todate"
                    :max="today"
                  />
                </div>
              </div>
              <div
                class="form-control"
                v-if="
                  tabmenuitems.serviceItems === 3 ||
                  tabmenuitems.serviceItems === 5
                "
              >
                <label class="label">
                  <span class="label-text font-bold tracking-wide"
                    >Select Supplier
                  </span>
                </label>
                <div class="relative">
                  <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-theme-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <select
                    class="select select-bordered w-full pl-12 focusring select-sm"
                    v-model="data.supplierCode"
                  >
                    <option
                      v-for="(supplier, i) in suppliers"
                      :value="supplier.supplierCode"
                      :key="i"
                    >
                      <!-- {{ supplier.supplierCode }} -->
                      {{ supplier.supplierName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="flex justify-center mt-9">
                <button
                  class="btn btn-sm btn-success"
                  @click.prevent="reportgenerate('service')"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="current3" v-if="currentstate === 3">
          <div class="flex gap-2 flex-wrap" id="menuitemsselect3">
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.thirdpartyCali"
                  value="1"
                  @change="itemsstate($event, 3, 'thirdparty')"
                />
                <span class="label-text ml-2"
                  >Items Sent For Thirdparty Calibration
                </span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.thirdpartyCali"
                  value="2"
                  @change="itemsstate($event, 3, 'thirdparty')"
                />
                <span class="label-text ml-2">Thirdparty Calibration</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.thirdpartyCali"
                  value="3"
                  @change="itemsstate($event, 3, 'thirdparty')"
                />
                <span class="label-text ml-2"
                  >Thirdparty Calibration Particular Vendor</span
                >
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.thirdpartyCali"
                  value="4"
                  @change="itemsstate($event, 3, 'thirdparty')"
                />
                <span class="label-text ml-2">Items Not Calibrated</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.thirdpartyCali"
                  value="5"
                  @change="itemsstate($event, 3, 'thirdparty')"
                />
                <span class="label-text ml-2"
                  >Calibration Items pending with Vendor</span
                >
              </label>
            </div>
          </div>
          <div id="reportfiled">
            <div class="flex gap-5">
              <div
                class="form-control"
                v-if="tabmenuitems.thirdpartyCali !== 5"
              >
                <label class="label">
                  <span class="label-text font-bold tracking-wide text-black"
                    >From Date</span
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
                    type="date"
                    placeholder="From Date"
                    class="input input-bordered input-sm w-full pl-12 pr-5 focusring"
                    v-model="data.fromdate"
                    :max="today"
                  />
                </div>
              </div>
              <div
                class="form-control"
                v-if="tabmenuitems.thirdpartyCali !== 5"
              >
                <label class="label">
                  <span class="label-text font-bold tracking-wide text-black"
                    >To Date
                  </span>
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
                    type="date"
                    placeholder="To Date"
                    class="input input-bordered w-full input-sm pl-12 pr-5 focusring"
                    v-model="data.todate"
                    :max="today"
                  />
                </div>
              </div>
              <div
                class="form-control"
                v-if="
                  tabmenuitems.thirdpartyCali === 3 ||
                  tabmenuitems.thirdpartyCali === 5
                "
              >
                <label class="label">
                  <span class="label-text font-bold tracking-wide"
                    >Select Supplier
                  </span>
                </label>
                <div class="relative">
                  <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-theme-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <select
                    class="select select-bordered w-full pl-12 focusring select-sm"
                    v-model="data.supplierCode"
                  >
                    <option
                      v-for="(supplier, i) in suppliers"
                      :value="supplier.supplierCode"
                      :key="i"
                    >
                      <!-- {{ supplier.supplierCode }} -->
                      {{ supplier.supplierName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="flex justify-center mt-9">
                <button
                  class="btn btn-sm btn-success"
                  @click.prevent="reportgenerate('thirdparty')"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="current4" v-if="currentstate === 4">
          <div class="flex gap-2" id="menuitemsselect4">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-2"
                  >Calibration Items Pending in Sitra
                </span>
                <input
                  type="radio"
                  name="radio-4"
                  class="radio radio-accent"
                  v-model="tabmenuitems.others"
                  @change="itemsstate($event, 4, 'others')"
                  value="1"
                />
              </label>
            </div>
          </div>
          <div id="reportfiled">
            <div class="flex gap-5">
              <div
                class="flex justify-center mt-9"
                v-if="tabmenuitems.others === 1"
              >
                <button
                  class="btn btn-sm btn-success"
                  @click.prevent="reportgenerate('others')"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted } from "@vue/runtime-core";
import useReceiptReport from "../../composable/Receipt/useReceiptReport";

export default {
  name: "ReceiptReportModal",
  props: ["closeModal"],
  setup() {
    const {
      tabschange,
      currentstate,
      tabmenuitems,
      itemsstate,
      getCustData,
      queryLoading,
      cust,
      today,
      data,
      reportgenerate,
      suppliers,
    } = useReceiptReport();

    onUnmounted(() => {
      tabmenuitems.value = {
        recItems: 1,
        recItemCust: 1,
        serviceDes: 1,
        serviceItems: 1,
        serviceItemsByvendor: 1,
        serviceingItemsNotServiced: 1,
        serviceingItemsPeindingwithVendor: 1,
        serviceingItemsPeindinginSitra: 1,
        thirdpartyCaliItems: 1,
        thirdpartyCali: 1,
        thirdpartyCaliByVendor: 1,
        itemNotCalibrated: 1,
        caliItemsWithVendor: 1,
        caliItemsPendinginSitra: 1,
        custnamequery: "",
        custid: "",
        fromdate: "",
        todate: "",
      };
      data.value.custid = "";
      data.value.custnamequery = "";
      data.value.fromdate = "";
      data.value.todate = "";
      data.value.type = "";
    });
    return {
      tabschange,
      currentstate,
      tabmenuitems,
      itemsstate,
      getCustData,
      queryLoading,
      cust,
      today,
      data,
      reportgenerate,
      suppliers,
    };
  },
};
</script>

<style>
</style>
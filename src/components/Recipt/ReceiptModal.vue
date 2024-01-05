<template>
  <div
    class="max-w-5xl p-6 mx-auto relative bottom-10 left-10 right-10 max-h-full bg-gradient-to-b from-theme-green to-theme-black rounded-md shadow-md modal-box mb-20"
  >
    <div
      @click="closeModal"
      class="ml-800 cursor-pointer absolute top-2 left-44"
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
        <div class="flex gap-6">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search Customer</span>
            </label>
            <div class="flex space-x-2 relative">
              <input
                type="text"
                placeholder="Search"
                class="w-full input focusring input-sm input-bordered"
                v-model="reciptEntry.custnamequery"
              />
              <button
                @click.prevent="getCustData(reciptEntry.custnamequery)"
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

          <div class="form-control w-96 tooltip" :data-tip="reciptEntry.custdetails !== null ? reciptEntry.custdetails['city'] : 'Select Customer'">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Search / Select User</span
              >
            </label>
            <div class="w-full">
              <v-select
                label="name"
                :options="cust"
                v-model="reciptEntry.custdetails"
              ></v-select>
            </div>
          </div>
          <div>
            <label class="label">
              <span class="label-text font-bold tracking-wide">DC Number</span>
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
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>

              <input
                v-model="reciptEntry.dcnumber"
                type="text"
                placeholder="Dc# and Date"
                name="Dc# and Date"
                class="input input-bordered w-full pl-12 focusring input-sm"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-4 gap-2">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Staff Name
                <strong class="text-red-600 font-bold">*</strong></span
              >
            </label>
            <div class="relative flex items-center">
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
                v-model="reciptEntry.staffid"
              >
                <option
                  v-for="(staff, i) in staffs"
                  :key="i"
                  :value="staff.Staff_Code"
                >
                  {{ staff.Staff_Name }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="label">
              <span class="label-text font-bold tracking-wide">MIR Number</span>
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>

              <input
                v-model="reciptEntry.mirnumber"
                type="text"
                placeholder="MIR Number"
                name="MIR Number"
                class="input input-bordered w-full pl-12 focusring input-sm"
              />
            </div>
          </div>

          <div>
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Received Date</span
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <input
                v-model="reciptEntry.receiveddate"
                type="date"
                name="Date"
                class="input input-bordered w-full pl-12 focusring input-sm"
                :max="today"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >No of Items</span
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <input
                readonly="readonly"
                v-model="reciptEntry.noofitems"
                type="number"
                placeholder="No of items"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm input-disabled"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Calibration Cost</span
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
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <input
                readonly="readonly"
                v-model="reciptEntry.totalcost"
                type="number"
                placeholder="Total Cost"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm input-disabled"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Approximate Cost</span
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
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <input
                readonly="readonly"
                v-model="reciptEntry.totalapproxcost"
                type="number"
                placeholder="Total Cost"
                class="input input-bordered w-full pl-12 pr-5 focusring input-sm input-disabled"
              />
            </div>
          </div>
          <div class="form-control col-span-5">
            <label class="label">
              <span class="label-text font-bold tracking-wide">Remarks </span>
            </label>
            <div class="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 absolute top-3 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <textarea
                v-model="reciptEntry.remarks"
                name="supplierAddress"
                class="textarea h-32 textarea-bordered w-full pl-11 pr-5 focusring"
                placeholder="."
              ></textarea>
            </div>
          </div>
        </div>
      </form>
      <div class="divider mt-0"></div>
      <div class="">
        <div class="form-control flex-row items-start justify-between">
          <label class="label">
            <span
              class="label-text text-lg font-bold text-theme-black capitalize"
              >Add Item Details or New Item Details</span
            >
          </label>
          <div class="flex gap-4">
            <div class="bg-white p-1 rounded-lg items-center justify-center">
              <label for="fileup" class="cursor-pointer"
                ><span>
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    /></svg></span
              ></label>
              <input
                id="fileup"
                type="file"
                class="hidden"
                @change="handleUpload($event, 'receiptmodal')"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/excel"
              />
            </div>

            <div>
              <input
                type="checkbox"
                class="toggle toggle-accent"
                @change="toogleLine($event)"
              />
            </div>
          </div>
        </div>
        <div id="symbolshelpermodal" v-if="symbolshelper">
          <ReceiptSymbolsModal />
        </div>
      </div>

      <!-- line data entry -->

      <div
        class="form-control flex-row items-center justify-end"
       
      >
        <label class="label cursor-pointer">
          <span class="label-text text-white font-bold">Copy</span>
        </label>
        <input
          type="checkbox"
          class="checkbox"
          v-model="copystatus"
          @change="copychange($event)"
        />
      </div>
      <div
        class="flex gap-2 flex-wrap"
        id="inputline"
        v-if="filedstatus === 'itemselect'"
      >
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Item Name <strong class="text-red-600 font-bold">*</strong></span
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
              v-model="itemstype.desc"
              @change="itemchange($event)"
              class="select select-bordered select-sm focusring pl-12"
            >
              <option
                v-for="item in items"
                :key="item.itemId"
                :value="item.itemDescription"
                class="select select-xs"
              >
                {{ item.itemDescription }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Item type <strong class="text-red-600 font-bold">*</strong></span
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <input
              v-model="itemstype.itemtype"
              type="text"
              placeholder="Item Type"
              readonly="readonly"
              class="input input-bordered focusring pl-12 input-sm input-disabled"
            />
            <!-- <select v-model="itemtype" class="select select-bordered select-sm focusring pl-12">
                                   <option value="">
                                        select fgdf
                                   </option>
                                   <option v-for="uni in units" :key="uni" :value="uni" class="select select-xs">
                                        {{ uni }}
                                   </option>
                              </select> -->
          </div>
        </div>
        <!-- <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Item Code <strong class="text-red-600 font-bold">*</strong></span
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
              v-model="itemstype.itemcode"
              type="text"
              placeholder="Item Code"
              readonly="readonly"
              class="input input-bordered focusring pl-12 input-sm input-disabled"
            />
          </div>
        </div> -->

        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Cali Cost <strong class="text-red-600 font-bold">*</strong></span
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
              v-model="itemstype.appcost"
              type="number"
              placeholder="Cost"
              class="input input-bordered focusring pl-12 input-sm"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Approx Cali Cost <strong class="text-red-600 font-bold">*</strong></span
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
              v-model="itemstype.appxcost"
              type="number"
              placeholder="Cost"
              class="input input-bordered focusring pl-12 input-sm"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Calibration type
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
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <!-- <input v-model="itemstype.calitype" type="text" placeholder="Cali Type"
                                   readonly="readonly"
                                   class="input input-bordered focusring pl-12 input-sm input-disabled" /> -->
            <select
              v-model="itemstype.calitype"
              class="select select-bordered select-sm focusring pl-12"
            >
              <option>On site</option>
              <option>In-House</option>
              <option>Third Party</option>
              <!-- <option v-for="uni in units" :key="uni" :value="uni" class="select select-xs">
                                        {{ uni }}
                                   </option> -->
            </select>
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Range <strong class="text-red-600 font-bold">*</strong></span
            >
          </label>
          <div class="relative flex items-center">
            <div
              class="absolute border-r-2 border-blue-400 py-1 px-2 cursor-pointer tooltip tooltip-bottom"
              data-tip="Symbols Helper"
              @click="symbolshelpershowclose"
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
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              v-model="itemstype.range"
              type="text"
              placeholder="Range"
              class="input input-bordered focusring pl-12 input-sm"
            />
            <!-- <select v-model="callibrationtype"
                                   class="select select-bordered select-sm focusring pl-12">
                                   <option value="">
                                        select fgdf
                                   </option>
                                   <option v-for="uni in units" :key="uni" :value="uni" class="select select-xs">
                                        {{ uni }}
                                   </option>
                              </select> -->
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Instrument S.No
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
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <input
              v-model="itemstype.macid"
              type="text"
              placeholder="Serial Number"
              class="input input-bordered focusring pl-12 input-sm"
            />
            <!-- <select v-model="callibrationtype"
                                   class="select select-bordered select-sm focusring pl-12">
                                   <option value="">
                                        select fgdf
                                   </option>
                                   <option v-for="uni in units" :key="uni" :value="uni" class="select select-xs">
                                        {{ uni }}
                                   </option>
                              </select> -->
          </div>
        </div>

        <div class="form-control mt-9">
          <input
            @click="
              addLineEntry({
                macid: itemstype.macid,
                range: itemstype.range,
                appcost: itemstype.appcost,
                appxcost: itemstype.appxcost,
                itemtype: itemstype.itemtype,
                calitype: itemstype.calitype,
                desc: itemstype.desc,
                itemnew: 'N',
                edit: true,
              })
            "
            class="btn bg-theme-black text-theme-green btn-sm"
            type="button"
            value="Add"
          />
        </div>
      </div>
      <div
        id="uploadneworinsert"
        class="grid grid-flow-row gap-5 mt-2"
        v-if="filedstatus === 'upload'"
      >
        <div class="flex gap-2 flex-wrap" id="inputline">
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
                v-model="itemstype.desc"
                type="text"
                placeholder="Description"
                class="input input-bordered focusring pl-12 input-sm"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Item type
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
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <select
                v-model="itemstype.itemtype"
                class="select select-bordered select-sm focusring pl-12 pr-5 w-full"
              >
                <option value="Dimesion">Dimension</option>
                <option value="Pressure">Pressure</option>
                <option value="Thermal">Thermal</option>
                <option value="Volume">Volume</option>
                <option value="Mass">Mass</option>
                <option value="Balance">Balance</option>
                <option value="Electro Techinical">Electro Techinical</option>
                <option value="Speed">Speed</option>
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Calibration type
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
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <select
                v-model="itemstype.calitype"
                class="select select-bordered select-sm focusring pl-12 pr-5 w-full"
              >
                <option value="onsite">On site</option>
                <option value="inhouse">In-House</option>
                <option value="thirdparty">Third Party</option>
              </select>
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Cali Cost
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
                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="itemstype.appcost"
                type="value"
                placeholder="Cost"
                class="input input-bordered focusring pl-12 input-sm"
              />
            </div>
          </div>
           <div class="form-control">
          <label class="label">
            <span class="label-text font-bold tracking-wide"
              >Approx Cali Cost <strong class="text-red-600 font-bold">*</strong></span
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
              v-model="itemstype.appxcost"
              type="value"
              placeholder="Cost"
              class="input input-bordered focusring pl-12 input-sm"
            />
          </div>
        </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Range <strong class="text-red-600 font-bold">*</strong></span
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="itemstype.range"
                type="text"
                placeholder="Range"
                class="input input-bordered focusring pl-12 input-sm"
              />
              <!-- <select v-model="callibrationtype"
                                   class="select select-bordered select-sm focusring pl-12">
                                   <option value="">
                                        select fgdf
                                   </option>
                                   <option v-for="uni in units" :key="uni" :value="uni" class="select select-xs">
                                        {{ uni }}
                                   </option>
                              </select> -->
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Instrument S.No<strong class="text-red-600 font-bold"
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="itemstype.macid"
                type="text"
                placeholder="Serial Number"
                class="input input-bordered focusring pl-12 input-sm"
              />
              <!-- <select v-model="callibrationtype"
                                   class="select select-bordered select-sm focusring pl-12">
                                   <option value="">
                                        select fgdf
                                   </option>
                                   <option v-for="uni in units" :key="uni" :value="uni" class="select select-xs">
                                        {{ uni }}
                                   </option>
                              </select> -->
            </div>
          </div>

          <div class="form-control mt-9">
            <input
              @click="
                addLineEntry({
                  macid: itemstype.macid,
                  range: itemstype.range,
                  appcost: itemstype.appcost,
                  appxcost: itemstype.appxcost,
                  itemtype: itemstype.itemtype,
                  calitype: itemstype.calitype,
                  desc: itemstype.desc,
                  itemnew: 'Y',
                  edit: false,
                })
              "
              class="btn bg-theme-black text-theme-green btn-sm"
              type="button"
              value="Add"
            />
          </div>
        </div>
      </div>

      <!-- line table -->
      <div class="overflow-x-auto mt-12 h-full">
        <table class="table w-full table-compact">
          <thead>
            <tr class="bg-gray-300 text-gray-700 font-extrabold">
              <th>S.No</th>
              <th>Description</th>
              <th>Cali Type</th>
              <th>Item Type</th>
              <th>Cost</th>
              <th>Approx Cost</th>
              <th>Range</th>
              <th>Mac ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, i) in lineitems" :key="i" class="">
              <td>
                <input
                :value="i+1"
                  type="text"
                />
              </td>
              <td>
                <input
                  v-model="lineitems[i].desc"
                  type="text"
                  :readonly="line.edit"
                />
              </td>
              <td>
                <input
                  v-model="lineitems[i].calitype"
                  type="text"
                  :readonly="line.edit"
                />
              </td>
              <td>
                <input
                  v-model="lineitems[i].itemtype"
                  type="text"
                  :readonly="line.edit"
                />
              </td>
              <td>
                <input
                  v-model="lineitems[i].appcost"
                  type="text"
                  :readonly="line.edit"
                />
              </td>
              <td>
                <input
                  v-model="lineitems[i].appxcost"
                  type="text"
                  :readonly="line.edit"
                />
              </td>
              <td>
                <input
                  v-model="lineitems[i].range"
                  type="text"
                  :readonly="lineEdit"
                />
              </td>
              <td>
                <input
                  v-model="lineitems[i].macid"
                  type="text"
                  :readonly="lineEdit"
                />
              </td>
           
              <!-- <td>
                                        <input v-model="lineEntries[i].amount" @change="lineEditChangeAmount(i)"
                                             type="number" :readonly="lineEdit" />
                                   </td> -->
              <td class="cursor-pointer flex gap-4">
                <span @click="editline(i)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[lineEdit ? 'h-6 w-6' : 'h-6 w-6 text-red-500']"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </span>
                <span @click="deleteData(i)">
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
                </span>
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
import useReciptModal from "../../composable/Receipt/useReciptmodal";
import { onMounted, onUnmounted, ref } from "@vue/runtime-core";
import ReceiptSymbolsModal from "./ReceiptSymbolsModal.vue";
export default {
  name: "ReciptModal",
  props: ["closeModal", "showModal", "updateData", "heading"],
  setup() {
    let symbolshelper = ref(false);
    const symbolshelpershowclose = () => {
      symbolshelper.value = !symbolshelper.value;
    };
    const {
      reciptEntry,
      handleUpload,
      reciptitems,
      itemsupload,
      itemstype,
      getCustData,
      queryLoading,
      cust,
      staffs,
      getStaffsData,
      addLineEntry,
      deleteData,
      lineEdit,
      lineitems,
      toogleLine,
      filedstatus,
      saveData,
      editline,
      itemselect,
      items,
      itemchange,
      today,
      copystatus,
      copydata,
      copychange,
    } = useReciptModal();
    const depcode = JSON.stringify({
      departmentCode: sessionStorage.getItem("depCode"),
    });
    let save = () => {
      if (
        reciptEntry.value.staffid !== "" &&
        (reciptEntry.value.custdetails !== [] ||
          reciptEntry.value.custdetails !== null)
      ) {
        if (lineitems.value.length !== 0) {
          reciptEntry.value["items"] = lineitems.value;
          reciptEntry.value["depcode"] = sessionStorage.getItem("depCode");
          let jdata = JSON.stringify(reciptEntry.value);

          if (confirm("Are you sure to save this data") === true) {
            saveData(jdata);
          } else {
            return;
          }
        } else {
          alert("There Must be atleast one Item in-order to create a recipt");
        }
      } else {
        alert("Select Mandatory Field Staff Name and Customer");
      }
    };
    onMounted(() => {
      getStaffsData(depcode);
      itemselect();
      filedstatus.value = "itemselect";
    });
    onUnmounted(() => {
      lineitems.value = [];
      reciptEntry.value = {
        custnamequery: "",
        custdetails: null,
        dcnumber: "",
        staffid: "",
        noofitems: "",
        mirnumber: "",
        totalcost: "",
        receiveddate: "",
        remarks: "",
      };
      copystatus.value = false;
      items.value = [];
      copydata.value = {};
    });
    return {
      filedstatus,
      reciptEntry,
      handleUpload,
      reciptitems,
      itemsupload,
      itemstype,
      getCustData,
      queryLoading,
      cust,
      staffs,
      addLineEntry,
      deleteData,
      lineEdit,
      lineitems,
      toogleLine,
      saveData,
      save,
      editline,
      items,
      itemchange,
      today,
      copystatus,
      copydata,
      copychange,
      symbolshelpershowclose,
      symbolshelper,
    };
  },
  components: { ReceiptSymbolsModal },
};
</script>

<style>
</style>
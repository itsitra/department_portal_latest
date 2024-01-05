<template>
  <div
    class="max-w-5xl p-6 mx-auto relative bottom-10 left-10 right-10 max-h-full bg-gradient-to-b from-theme-green to-theme-black rounded-md shadow-md modal-box mb-20"
  >
    <div v-if="modalLoad">
      <img
        src="../../assets/wait.png"
        alt="loader"
        class="flex items-center justify-center mx-auto animate-bounce w-20 h-20"
      />
    </div>
    <div v-else class="h-screen">
      <div
        @click="closeEditModal"
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
      <div class="">
        <h1 class="text-2xl font-bold text-theme-black capitalize">
          <span>{{ heading }}</span>
        </h1>

        <form class="p-2 flex flex-col w-full">
          <!-- Header data entry -->
          <div class="form-control" v-if="depCode === 4">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Department Name</span
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
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>

              <select
                class="select pl-10 focusring select-sm"
                v-model="depNamePurchase"
              >
                <option disabled>Department Names</option>
                <option
                  v-for="(dep, i) in depName"
                  :key="i"
                  :value="dep.Department_Code"
                >
                  {{ dep.Department_Name }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">Gate Pass</span>
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
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>

                <select
                  v-model="gatePass"
                  class="select select-bordered pl-12 focusring select-sm"
                >
                  <option>Returnable</option>
                  <option>Non-returnable</option>
                </select>
              </div>
            </div>
            <div class="form-control mt-7">
              <label class="label gap-3">
                <input
                  type="checkbox"
                  name=""
                  class="checkbox-primary checkbox"
                  v-model="userCheck"
                  @click="() => (userCheck = !userCheck)"
                />
                <span class="label-text font-bold text-xs">Customer Data</span>
              </label>
            </div>
            <div class="form-control" v-if="userCheck">
              <label class="label">
                <span class="label-text">Search Customer</span>
              </label>
              <div class="flex space-x-2 relative">
                <input
                  type="text"
                  placeholder="Search"
                  class="w-full input focusring input-sm input-bordered"
                  v-model="query"
                />
                <button
                  class="btn btn-sm font-bold bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black absolute w-10 right-0"
                  @click.prevent="getCustData(query)"
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
            <div
              class="form-control w-96 tooltip"
              v-if="userCheck"
              :data-tip="
                custSelected !== null ? custSelected.city : 'Select Customer'
              "
            >
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Search / Select User</span
                >
              </label>
              <div class="w-full">
                <v-select
                  label="name"
                  :options="cust"
                  v-model="custSelected"
                ></v-select>
              </div>
            </div>
          </div>
          <div
            :class="[
              gatePass === 'Non-returnable'
                ? 'grid grid-cols-5 gap-2'
                : 'grid grid-cols-4 gap-2',
            ]"
          >
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
                  v-model="staffName"
                  class="select select-bordered w-full pl-12 focusring select-sm"
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

            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Supplier Name
                  <strong class="text-red-600 font-bold">*</strong></span
                >
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
                  :disabled="userCheck"
                  v-model="supplierName"
                  :class="[
                    userCheck
                      ? 'select select-bordered w-full pl-12 focusring select-sm select-disabled'
                      : 'select select-bordered w-full pl-12 focusring select-sm',
                  ]"
                >
                  <option
                    v-for="(supplier, i) in suppliers"
                    :value="supplier.supplierCode"
                    :key="i"
                  >
                    {{ supplier.supplierName }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Transport Mode</span
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
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>

                <input
                  v-model="transportMode"
                  type="text"
                  placeholder="Transport Mode"
                  class="input input-bordered w-full pl-12 focusring input-sm"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Transport Company</span
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <input
                  v-model="transportCompany"
                  type="text"
                  placeholder="Transport Company"
                  class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Vechile No</span
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
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
                <input
                  v-model="vechileNo"
                  type="text"
                  placeholder="Vechile number"
                  class="input input-bordered w-full pr-5 pl-12 focusring input-sm"
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
                  v-model="noOfItems"
                  type="number"
                  placeholder="No of items"
                  class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Purpose
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
                  v-model="purpose"
                  type="text"
                  placeholder="Purpose for Gatepass"
                  class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Total Cost
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
                  v-model="totalapproximateCost"
                  type="number"
                  placeholder="Cost"
                  readonly="readonly"
                  class="input input-bordered w-full pl-12 pr-5 focusring input-disabled input-sm"
                />
              </div>
            </div>
            <div class="form-control" v-if="gatePass === 'Returnable'">
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >Approximate Return Date
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
                  v-model="returndate"
                  type="date"
                  placeholder=""
                  class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                />
              </div>
            </div>
            <div
              class="form-control col-span-2"
              v-if="gatePass === 'Non-returnable'"
            >
              <label class="label">
                <span class="label-text font-bold tracking-wide"
                  >DC Number</span
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
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>

                <input
                  v-model="dcnumber"
                  type="text"
                  placeholder="Dc# and Date"
                  name="Dc# and Date"
                  class="input input-bordered w-full pl-12 focusring input-sm"
                />
              </div>
            </div>
            <div
              :class="[
                gatePass === 'Non-returnable'
                  ? 'form-control col-span-5'
                  : 'form-control col-span-4',
              ]"
            >
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
                  v-model="remarks"
                  name="supplierAddress"
                  class="textarea h-32 textarea-bordered w-full pl-11 pr-5 focusring"
                  placeholder="Remarks"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
        <div class="divider mt-0"></div>
        <h1 class="text-lg font-bold text-theme-black capitalize">
          <span>Add Details of product</span>
        </h1>
        <!-- line data entry -->
        <!-- <div class="grid grid-cols-4 gap-6 mt-2"> -->
        <div class="flex gap-1">
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
                class="input input-bordered focusring pl-12 input-sm"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Unit <strong class="text-red-600 font-bold">*</strong></span
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
              <select
                v-model="unit"
                class="select select-bordered select-sm focusring pl-12"
              >
                <option
                  v-for="uni in units"
                  :key="uni"
                  :value="uni"
                  class="select select-xs"
                >
                  {{ uni }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Quantity
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
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <input
                v-model="quantity"
                type="number"
                placeholder="Quantity"
                class="input input-bordered focusring pl-12 input-sm"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold tracking-wide"
                >Approximate Cost
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
                v-model="approximateCost"
                type="number"
                placeholder="Cost"
                class="input input-bordered focusring pl-12 input-sm"
              />
            </div>
          </div>
          <div class="form-control mt-9">
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
                <th></th>
                <th>Description</th>
                <th v-if="lineEntries[0].unit !== ''">Unit</th>
                <th v-else>Cali Status</th>

                <th>Quantity</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(line, i) in lineEntries" :key="i">
                <th>{{ i + 1 }}</th>
                <td>
                  <input
                    v-model="lineEntries[i].description"
                    type="text"
                    :readonly="lineEdit"
                  />
                </td>
                <td v-if="lineEntries[i].unit !== ''">
                  <input
                    v-model="lineEntries[i].unit"
                    type="text"
                    :readonly="lineEdit"
                  />
                </td>
                <td v-else>
                  <p>{{ lineEntries[i].CaliStatus }}</p>
                </td>
                <td>
                  <input
                    v-model="lineEntries[i].quantity"
                    type="number"
                    :readonly="lineEdit"
                  />
                </td>
                <td>
                  <input
                    v-model="lineEntries[i].amount"
                    @change="lineEditChangeAmount(i)"
                    type="number"
                    :readonly="lineEdit"
                  />
                </td>
                <td class="cursor-pointer flex gap-4">
                  <span @click="lineEditOpt">
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
          @click.prevent="editData"
        >
          Update Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "@vue/runtime-core";
import gatePassModal from "../../composable/gatePass/useGatePassModal";
import axios from "axios";
export default {
  name: "RGP Model",
  props: ["closeModal", "showModal", "heading"],
  setup() {
    const {
      addLineEntry,
      deleteData,
      lineEntries,
      staffName,
      transportMode,
      transportCompany,
      vechileNo,
      noOfItems,
      purpose,
      returndate,
      approximateCost,
      supplierName,
      description,
      unit,
      gatePass,
      quantity,
      date,
      suppliers,
      remarks,
      staffs,
      getSupplierData,
      getStaffsData,
      edit,
      showEditModal,
      closeEditModal,
      updateModal,
      rgpId,
      modalLoad,
      deleteLine,
      lineEdit,
      lineEditOpt,
      lineEditChangeAmount,
      totalapproximateCost,
      cust,
      queryLoading,
      query,
      custSelected,
      getCustData,
      userCheck,
      dcnumber,
      units,
    } = gatePassModal();
    const depcode = JSON.stringify({
      departmentCode: sessionStorage.getItem("depCode"),
    });
    onMounted(() => {
      // console.log("mounted");
      getSupplierData();
      getStaffsData(depcode);
      // console.log(suppliers.value, staffs.value);
      if (sessionStorage.getItem("depCode") === "4") {
        getDepName();
      }
    });
    let depCode = Number(sessionStorage.getItem("depCode"));
    const depNamePurchase = ref("");
    const depName = ref([]);

    const getDepName = () => {
      depName.value = [];
      let headersList = {
        Accept: "*",
        "Content-Type": "application/json",
      };
      let reqOptions = {
        url: ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectDepartment`,
        method: "GET",
        headers: headersList,
      };
      axios.request(reqOptions).then(function (res) {
        res.data.forEach((i) => {
          depName.value.push(i);
        });
      });
    };
    onUnmounted(() => {
      // console.log("unmounted");
      depName.value = [];
      noOfItems.value = 0;
      suppliers.value = [];
      staffs.value = [];
      lineEntries.value = [];
      gatePass.value = "";
      transportMode.value = "";
      transportCompany.value = "";
      vechileNo.value = "";
      purpose.value = "";
      returndate.value = "";
      approximateCost.value = "";
      description.value = "";
      quantity.value = "";
      unit.value = "";
      remarks.value = "";
      totalapproximateCost.value = "";
      cust.value = [];
      custSelected.value = null;
      userCheck.value = false;
      // console.log(suppliers.value, staffs.value, lineEntries.value);
    });

    const editData = () => {
      // console.log(rgpId.value);
      if (lineEntries.value.length !== 0) {
        let data = {
          rgpId: rgpId.value,
          createdDate: date.toLocaleDateString(),
          departmentCode:
            depNamePurchase.value != ""
              ? depNamePurchase.value
              : Number(sessionStorage.getItem("depCode")),
          staffCode: Number(staffName.value),
          supplierCode: userCheck.value ? null : Number(supplierName.value),
          gatePass: gatePass.value,
          transportMode: transportMode.value,
          transportCompany: transportCompany.value,
          vehicleNo: vechileNo.value,
          noOfItems: noOfItems.value,
          purpose: purpose.value,
          returndate: gatePass.value === "Returnable" ? returndate.value : "",
          remarks: remarks.value,
          appCost: totalapproximateCost.value,
          lineEntries: [...lineEntries.value],
          dcNumber: dcnumber.value,
          typeuser: userCheck.value ? "customer" : "supplier",
        };

        if (userCheck.value) {
          data = { ...data, ...custSelected.value };
        }
        updateModal(data);
        closeEditModal();
      } else {
        alert("Need Atleast One Item, In order to update the gatepass");
      }
      // console.log(data);
    };

    return {
      addLineEntry,
      deleteData,
      lineEntries,
      staffName,
      transportMode,
      transportCompany,
      vechileNo,
      noOfItems,
      deleteLine,
      purpose,
      returndate,
      approximateCost,
      supplierName,
      description,
      unit,
      gatePass,
      quantity,
      remarks,
      suppliers,
      staffs,
      edit,
      editData,
      showEditModal,
      closeEditModal,
      modalLoad,
      totalapproximateCost,
      lineEdit,
      lineEditOpt,
      lineEditChangeAmount,
      cust,
      queryLoading,
      query,
      custSelected,
      getCustData,
      userCheck,
      dcnumber,
      units,
      depNamePurchase,
      depName,
      depCode,
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
<template>
  <div class="w-full">
    <div v-if="smallmodal">
      <SmallModal
        :smallaction="smallactionclose"
        :passtype="passtype"
        :itemcount="itemcount"
      />
    </div>
    <div class="flex justify-between">
      <p class="text-base font-serif">
        Current Page:<span class="text-xl">{{ currentstate }}</span>
      </p>
      <pagination
        :currentState="currentstate"
        :state="state"
        :prev="prev"
        :next="next"
        :pages="pages"
      />
    </div>
    <div v-if="loading" class="flex items-center justify-center">
      <img src="../../assets/830.svg" alt="loading svg" />
    </div>
    <div v-else class="w-full space-y-5">
      <div
        class="flex w-full items-start justify-between bg-gray-400 p-2 rounded-md"
      >
        <th class="w-full">Receipt ID</th>
        <th class="w-full">{{ tableHeader1 }}</th>
          <!--   <th>
              <div class="dropdown">
                <label tabindex="0" class="">{{ tableHeader1 }}</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <div class="form-control">
                      <label class="label gap-3">
                        <span class="label-text font-bold text-xs">Search</span>
                      
                      </label>
                      <input v-model="searchHead.Mirnumber" class="input input-sm focusring input-bordered" @change="
                        search({
                          receipt: 'receipt',
                        })
                      " />
                    </div>
                  </li>
                </ul>
              </div>
            </th>-->
        <th class="w-full">{{ tableHeader2 }}</th> 
        <th class="w-full">{{ tableHeader3 }}</th>
        <th class="w-full">{{ tableHeader4 }}</th>
        <th class="w-full">Actions</th>
      </div>

      <div
        v-for="(d, i) in tabledata"
        :key="i"
        :class="[
          tabledata[i].itemvisible
            ? ' items-start justify-between flex  border-2 rounded-lg '
            : 'hover:bg-gray-300 rounded-xl p-2 shadow-md duration-300 transition-all ease-linear',
        ]"
      >
        <div
          :class="[
            d.itemvisible
              ? 'flex w-full flex-col  duration-300 transition-all ease-in-out bg-gray-200 p-2'
              : 'w-full',
          ]"
        >
          <div
            :class="[
              d.itemvisible
                ? 'flex justify-between items-start w-full mb-5 font-bold text-xl'
                : 'flex w-full items-start justify-between ',
            ]"
          >
            <p class="w-full text-center">{{ d.receiptNo }}</p>
            <p class="w-full text-center">{{ d.Mirnumber }}</p>
            <p class="w-full text-center">{{ d.name }}</p>
            <p class="w-full text-center">{{ d.noOfItems }}</p>
            <p class="w-full text-center">{{ d.receivedDate }}</p>
          
            <p
              class="items-center flex justify-center cursor-pointer w-full text-center"
              @click="actionClick(d.itemvisible, i)"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    d.itemvisible
                      ? 'h-8 w-10 rounded-xl bg-black text-white transform transition-transform rotate-180 duration-200 ease-in'
                      : 'h-8 w-10 rounded-xl bg-black text-white ',
                  ]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </p>
          </div>
          <hr v-if="d.itemvisible" class="divider mt-0" />
          <div
            v-if="d.itemvisible"
            class="w-full h-full p-5 duration-300 transition-all ease-out"
          >
            <div class="w-full p-2">
              <div id="actions" class="flex gap-3 items-end justify-end">
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text mr-2">Customer Gatepass</span>
                    <input
                      type="checkbox"
                      class="toggle toggle-accent toggle-sm"
                      @change="custclick($event, d.items, i)"
                    />
                  </label>
                </div>
                <div class="dropdown dropdown-left dropdown-end">
                  <label tabindex="0" class="btn m-1 btn-ghost btn-sm">
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
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </label>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li @click="smallaction('service', d)">
                      <a>Service Gatepass</a>
                    </li>
                    <li @click="smallaction('thirdparty', d)">
                      <a>Thirdparty Gatepass</a>
                    </li>
                    <li
                      @click="smallaction('customer', d)"
                      v-if="toggleCustpass"
                    >
                      <a>Customer Gatepass</a>
                    </li>
                    <li><a>Sticker Print</a></li>
                  </ul>
                </div>
                <!-- <div class="dropdown dropdown-top dropdown-end">
                                             <label tabindex="0" class="btn btn-sm btn-outline">Save</label>
                                             <ul tabindex="0"
                                                  class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mb-3">
                                                  <li>
                                                       <div class="form-control">
                                                            <label class="label">
                                                                 <span class="label-text font-bold tracking-wide">Staff
                                                                      Name

                                                                      <strong
                                                                           class="text-red-600 font-bold text-xl">*</strong></span>
                                                            </label>
                                                            <div class="relative flex items-center">
                                                                 <div
                                                                      class="absolute border-r-2 border-blue-400 py-1 px-2">
                                                                      <svg xmlns="http://www.w3.org/2000/svg"
                                                                           class="h-6 w-6" fill="none"
                                                                           viewBox="0 0 24 24" stroke="currentColor"
                                                                           stroke-width="2">
                                                                           <path stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                      </svg>
                                                                 </div>
                                                                 <select
                                                                      class="select select-bordered select-sm focusring pl-12  pr-5  w-full">
                                                                      <option>
                                                                           On site
                                                                      </option>
                                                                      <option>
                                                                           In-House
                                                                      </option>
                                                                      <option>
                                                                           Third Party
                                                                      </option>
                                                                 </select>
                                                            </div>
                                                       </div>
                                                  </li>
                                                  <li>
                                                       <div class="form-control">
                                                            <label class="label">
                                                                 <span class="label-text font-bold tracking-wide">Completed
                                                                      Date

                                                                      <strong
                                                                           class="text-red-600 font-bold text-xl">*</strong></span>
                                                            </label>
                                                            <div class="relative flex items-center">
                                                                 <div
                                                                      class="absolute border-r-2 border-blue-400 py-1 px-2">
                                                                      <svg xmlns="http://www.w3.org/2000/svg"
                                                                           class="h-6 w-6" fill="none"
                                                                           viewBox="0 0 24 24" stroke="currentColor"
                                                                           stroke-width="2">
                                                                           <path stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                      </svg>

                                                                 </div>
                                                                 <input type="date" :max="today" placeholder="date"
                                                                      class="
                                                                                     input input-bordered
                                                                                     w-full
                                                                                     pl-12
                                                                                     pr-5
                                                                                     focusring
                                                                                     input-sm
                                                                                     " />
                                                            </div>
                                                       </div>
                                                  </li>
                                                  <li class="my-2 "><button class="btn btn-sm btn-ghost ">Save
                                                       </button>
                                                  </li>
                                             </ul>
                                        </div> -->
              </div>
              <div id="itemslist" class="mt-2">
                <table class="table w-full table-zebra table-compact">
                  <thead>
                    <tr>
                      <!-- <th> <input type="checkbox"
                                                                 class="checkbox checkbox-sm checkbox-accent"
                                                                 @change="selectAll($event, d, i)"></th> -->
                      <th></th>
                      <th>Id</th>
                      <th>Item Name</th>

                      <th>Calibration Type</th>
                      <th>Item Type</th>
                      <th>Status</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, j) in d.items" :key="j" class="relative">
                      <!-- :disabled="item.trackStatus === 'sentout' || item.trackStatus === 'rejected' || (item.calicertified === 'certified' || item.calicompleted === 'completed' || item.despatch === 'despatched')" -->
                      <td>
                        <input
                          type="checkbox"
                          class="checkbox checkbox-sm checkbox-accent"
                          v-model="item.itemselect"
                          :disabled="item.itemselectstatus"
                          @change="passItemsFun($event, item, d.receiptNo, d)"
                        />
                      </td>
                      <td>{{ j + 1 }}</td>
                      <td>{{ item.Description.toUpperCase() }}</td>
                      <td>{{ item.caliType.toUpperCase() }}</td>
                      <td>{{ item.itemType.toUpperCase() }}</td>

                      <td class="cursor-pointer group relative">
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
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                        <div
                          class="invisible absolute group-hover:visible -top-23 w-100 bg-white -left-100 p-2 rounded-xl rounded-br-none shadow-md"
                        >
                          <ul class="steps w-full">
                            <li class="step step-primary">
                              Item <br />
                              Received
                            </li>
                            <!-- <li class="step step-primary">In-process</li> -->
                            <li
                              :class="[
                                item.trackStatus == 'sentout' ||
                                item.trackStatus == 'returned'
                                  ? 'step step-primary'
                                  : 'step',
                              ]"
                            >
                              TR/Service <br />
                              Sent Out
                            </li>
                            <li
                              :class="[
                                item.trackStatus == 'returned'
                                  ? 'step step-primary'
                                  : 'step',
                              ]"
                            >
                              TR/Service <br />Returned
                            </li>
                            <li
                              :class="[
                                item.calicompleted == 'completed'
                                  ? 'step step-primary'
                                  : 'step',
                              ]"
                            >
                              Cali <br />Completed
                            </li>
                            <li
                              :class="[
                                item.calicertified == 'certified'
                                  ? 'step step-primary'
                                  : 'step',
                              ]"
                            >
                              Certificate <br />Completed
                            </li>
                            <li
                              :class="[
                                item.despatch == 'despatched'
                                  ? 'step step-primary'
                                  : 'step',
                              ]"
                            >
                              Certificate <br />Despatched
                            </li>
                            <li
                              :class="[
                                item.trackStatus == 'rejected'
                                  ? 'step step-primary'
                                  : 'step',
                              ]"
                            >
                              Rejected
                            </li>
                            <li
                              :class="[
                                item.gatepass == 'non-returnable'
                                  ? 'step step-primary'
                                  : 'step',
                              ]"
                            >
                              Done
                            </li>
                          </ul>
                          <div
                            class="ml-2 inline-block overflow-hidden -bottom-3 absolute right-0 transform rotate-180"
                          >
                            <div
                              class="h-3 w-4 origin-bottom-left rotate-45 transform border border-neutral-500 bg-white shadow-md"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td class="flex gap-2 justify-center">
                        <div
                          class="dropdown dropdown-top dropdown-end tooltip"
                          :data-tip="`RGPID : ${item.RGP_Id}`"
                          v-if="
                            item.trackStatus === 'sentout' &&
                            item.Approval === 'Y'
                          "
                        >
                          <label tabindex="0" class="btn btn-sm btn-warning"
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
                                d="M15 19l-7-7 7-7"
                              /></svg
                          ></label>
                          <ul
                            tabindex="0"
                            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mb-3"
                          >
                            <li>
                              <div class="form-control">
                                <label class="label">
                                  <span
                                    class="label-text font-bold tracking-wide"
                                    >Return Date

                                    <strong
                                      class="text-red-600 font-bold text-xl"
                                      >*</strong
                                    ></span
                                  >
                                </label>
                                <div class="relative flex items-center">
                                  <div
                                    class="absolute border-r-2 border-blue-400 py-1 px-2"
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <input
                                    type="date"
                                    :max="today"
                                    v-model="itemreturn.date"
                                    placeholder="date"
                                    class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                                  />
                                </div>
                              </div>
                            </li>
                            <li class="my-2">
                              <button
                                @click.prevent="
                                  statusupdates(
                                    'returned',
                                    item.recLineNo,
                                    item.RGP_Id,
                                    item.Description,
                                    item
                                  )
                                "
                                class="btn btn-sm btn-ghost"
                              >
                                Save
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="ml-12" v-else></div>
                        <button
                          class="btn btn-sm btn-error"
                          :disabled="
                            item.trackStatus === 'rejected' ||
                            item.calicompleted === 'completed' ||
                            item.calicertified === 'certified' ||
                            item.calicompleted === 'despatched' ||
                            item.trackStatus === 'sentout' ||
                            item.gatepass === 'non-returnable'
                          "
                          @click.prevent="
                            statusupdates(
                              'rejected',
                              item.recLineNo,
                              item.RGP_Id,
                              item.Description,
                              item
                            )
                          "
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <div class="dropdown dropdown-top dropdown-end">
                          <label
                            tabindex="0"
                            :class="[
                              item.calicompleted == 'completed' ||
                              item.trackStatus === 'rejected' ||
                              item.trackStatus === 'sentout' ||
                              item.gatepass === 'non-returnable'
                                ? 'btn  btn-sm btn-disabled'
                                : 'btn  btn-sm btn-success',
                            ]"
                            >Completed</label
                          >
                          <ul
                            tabindex="0"
                            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mb-3"
                          >
                            <li>
                              <div class="form-control">
                                <label class="label">
                                  <span
                                    class="label-text font-bold tracking-wide"
                                    >Staff Name

                                    <strong
                                      class="text-red-600 font-bold text-xl"
                                      >*</strong
                                    ></span
                                  >
                                </label>
                                <div class="relative flex items-center">
                                  <div
                                    class="absolute border-r-2 border-blue-400 py-1 px-2"
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                  </div>
                                  <select
                                    v-model="itemcompleted.staff"
                                    class="select select-bordered select-sm focusring pl-12 pr-5 w-full"
                                  >
                                    <option
                                      v-for="(staff, i) in staffs"
                                      :value="staff.Staff_Code"
                                      :key="i"
                                    >
                                      {{ staff.Staff_Name }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="form-control">
                                <label class="label">
                                  <span
                                    class="label-text font-bold tracking-wide"
                                    >Completed Date

                                    <strong
                                      class="text-red-600 font-bold text-xl"
                                      >*</strong
                                    ></span
                                  >
                                </label>
                                <div class="relative flex items-center">
                                  <div
                                    class="absolute border-r-2 border-blue-400 py-1 px-2"
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <input
                                    type="date"
                                    :max="today"
                                    v-model="itemcompleted.date"
                                    placeholder="date"
                                    class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                                  />
                                </div>
                              </div>
                            </li>
                            <li class="my-2">
                              <button
                                :disabled="item.calicompleted == 'completed'"
                                @click.prevent="
                                  statusupdates(
                                    'completed',
                                    item.recLineNo,
                                    0,
                                    0,
                                    item
                                  )
                                "
                                class="btn btn-sm btn-ghost"
                              >
                                Save
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="dropdown dropdown-top dropdown-end">
                          <label
                            tabindex="0"
                            :class="[
                              item.calicertified == 'certified' ||
                              item.trackStatus === 'rejected' ||
                              item.trackStatus === 'sentout' ||
                              (item.gatepass === 'non-returnable' && item.gatepass==='completed')
                                ? 'btn  btn-sm btn-disabled'
                                : 'btn  btn-sm btn-info',
                            ]"
                            >Certificate</label
                          >
                          <ul
                            tabindex="0"
                            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mb-3"
                          >
                            <li>
                              <div class="form-control">
                                <label class="label">
                                  <span
                                    class="label-text font-bold tracking-wide"
                                    >Completed Date

                                    <strong
                                      class="text-red-600 font-bold text-xl"
                                      >*</strong
                                    ></span
                                  >
                                </label>
                                <div class="relative flex items-center">
                                  <div
                                    class="absolute border-r-2 border-blue-400 py-1 px-2"
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <input
                                    type="date"
                                    v-model="itemcertified.date"
                                    :max="today"
                                    placeholder="date"
                                    class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                                  />
                                </div>
                              </div>
                            </li>
                            <li class="my-2">
                              <button
                                @click.prevent="
                                  statusupdates(
                                    'certified',
                                    item.recLineNo,
                                    0,
                                    0,
                                    item
                                  )
                                "
                                class="btn btn-sm btn-ghost"
                              >
                                Save Certificate
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="dropdown dropdown-top dropdown-end">
                          <label
                            tabindex="0"
                            :class="[
                              item.despatch == 'despatched' ||
                              item.trackStatus === 'rejected' ||
                              item.trackStatus === 'sentout' ||
                              item.gatepass === 'non-returnable'
                                ? 'btn  btn-sm btn-disabled'
                                : 'btn  btn-sm',
                            ]"
                            >Despatched</label
                          >
                          <ul
                            tabindex="0"
                            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mb-3"
                          >
                            <li>
                              <div class="form-control">
                                <label class="label">
                                  <span
                                    class="label-text font-bold tracking-wide"
                                    >Completed Date

                                    <strong
                                      class="text-red-600 font-bold text-xl"
                                      >*</strong
                                    ></span
                                  >
                                </label>
                                <div class="relative flex items-center">
                                  <div
                                    class="absolute border-r-2 border-blue-400 py-1 px-2"
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
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <input
                                    type="date"
                                    :max="today"
                                    v-model="itemdespatched.date"
                                    placeholder="date"
                                    class="input input-bordered w-full pl-12 pr-5 focusring input-sm"
                                  />
                                </div>
                              </div>
                            </li>
                            <li class="my-2">
                              <button
                                @click.prevent="
                                  statusupdates(
                                    'despatched',
                                    item.recLineNo,
                                    0,
                                    0,
                                    item
                                  )
                                "
                                class="btn btn-sm btn-ghost"
                              >
                                Despatch
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td
                        class="absolute -right-5 -top-2 transform rounded"
                        v-if="
                          item.trackStatus === 'sentout' ||
                          item.trackStatus === 'returned' ||
                          item.trackStatus === 'rejected' ||
                          item.calicertified ||
                          item.calicompleted ||
                          item.despatch
                        "
                      >
                        <div
                          class="badge badge-primary"
                          v-if="
                            item.trackStatus === 'sentout' ||
                            (item.trackStatus === 'returned' &&
                              item.calicompleted &&
                              item.calicertified &&
                              item.despatch)
                          "
                        >
                          {{ item.trackStatus }}
                        </div>
                        <div
                          class="badge badge-success"
                          v-if="
                            item.calicompleted &&
                            item.calicertified !== 'certified'
                          "
                        >
                          c
                        </div>
                        <div
                          class="badge badge-info"
                          v-if="
                            item.calicertified && item.despatch !== 'despatched'
                          "
                        >
                          certified
                        </div>
                        <div
                          class="badge badge-secondary"
                          v-if="item.despatch && item.despatch === 'despatched'"
                        >
                          D
                        </div>
                        <div
                          class="badge badge-error"
                          v-if="
                            item.trackStatus && item.trackStatus === 'rejected'
                          "
                        >
                          R
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-base font-serif mt-3">
      Total Pages:<span class="text-xl">{{ pages.length }}</span>
    </p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import SmallModal from "./SmallModal.vue";
import useReciptModal from "../../composable/Receipt/useReciptmodal";
import Pagination from "../pagination.vue";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Recipt Table",
  props: [
    "tabledata",
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    
    "actionClick",
    "itemslectAll",
  ],
  setup(props) {
    const {
      loading,
      currentstate,
      pages,
      prev,
      next,
      state,
      getReciptTableData,
      passItemsFun,
      itemreturn,
      statusupdates,
      staffs,
      getStaffsData,
      itemcompleted,
      itemdespatched,
      itemcertified,
      passitems,
      today,
      custclick,
      toggleCustpass,
      search,
      searchHead,
    } = useReciptModal();
    let action = ref(false);
    const selectAll = (e, data, index) => {
      if (e.target.checked) {
        props.itemslectAll(e.target.checked, data, index);
      } else {
        props.itemslectAll(e.target.checked, data, index);
      }
    };
    const depcode = JSON.stringify({
      departmentCode: sessionStorage.getItem("depCode"),
    });
    onMounted(() => {
      getReciptTableData(currentstate.value);
      getStaffsData(depcode);
    });
    let smallmodal = ref(false);
    let passtype = ref("");
    let itemcount = ref(Number(""));
    let items = ref([]);
    const smallaction = (type, tabledata) => {
      items.value = [];
      smallmodal.value = !smallmodal.value;
      passtype.value = type;
      props.tabledata.forEach((e) => {
        e.items.filter((v) => {
          if (v.itemselect) {
            items.value.push(v);
          }
        });
      });
      if (passitems.value.length === 0) {
        tabledata.items.forEach((i) => {
          if (i.itemselect) {
            passitems.value.push(i);
          }
        });
      }
      itemcount.value = items.value.length;
    };
    const smallactionclose = () => {
      smallmodal.value = !smallmodal.value;
    };
    return {
      action,
      selectAll,
      smallaction,
      smallmodal,
      passtype,
      itemcount,
      loading,
      currentstate,
      pages,
      prev,
      next,
      state,
      passItemsFun,
      itemreturn,
      statusupdates,
      staffs,
      itemcompleted,
      itemdespatched,
      itemcertified,
      smallactionclose,
      today,
      custclick,
      toggleCustpass,
      search,
      searchHead,
    };
  },
  components: { SmallModal, Pagination },
};
</script>


<style scoped>
thead th {
  background: none;
  font-size: 14px;
}
</style>
<template>
  <div class="w-full">
    <div class="flex justify-between">
      <p class="text-base font-serif">
        Current Page:<span class="text-xl">{{ pageno }}</span>
      </p>
      <pagination :currentState="currentState" :state="state" :prev="prev" :next="next" :pages="pages" />
    </div>
    <div v-if="loading" class="flex items-center justify-center">
      <img src="../../assets/830.svg" alt="loading svg" />
    </div>
    <div v-else class="p-1">
      <table class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>
              <div class="dropdown dropdown-top">
                <label tabindex="0" class="">Gatepass ID</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <div class="form-control">
                      <label class="label gap-3">
                        <span class="label-text font-bold text-xs">Search</span>
                        <!-- <span class="text-green-400 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span> -->
                      </label>
                      <input v-model="serachData.rgpId" class="input input-sm focusring input-bordered" @change="
                        search({
                          gatepass: 'gatepass',
                        })
                      " />
                    </div>
                  </li>
                </ul>
              </div>
            </th>
            <th v-if="depCode === '4'">
              <div class="dropdown">
                <label tabindex="0" class="">Department name</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <div class="form-control">
                      <label class="label gap-3">
                        <span class="label-text font-bold text-xs">Search</span>
                        <!-- <span class="text-green-400 cursor-pointer" >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span> -->
                      </label>
                      <input v-model="serachData.depname" class="input input-sm focusring input-bordered" @change="
                        search({
                          gatepass: 'gatepass',
                        })
                      " />
                    </div>
                  </li>
                </ul>
              </div>
            </th>
            <th>
              <div class="dropdown">
                <label tabindex="0" class="">{{ tableHeader1 }}</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <div class="form-control">
                      <label class="label gap-3">
                        <span class="label-text font-bold text-xs">Search</span>
                        <!-- <span class="text-green-400 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span> -->
                      </label>
                      <input v-model="serachData.scname" class="input input-sm focusring input-bordered" @change="
                        search({
                          gatepass: 'gatepass',
                        })
                      " />
                    </div>
                  </li>
                </ul>
              </div>
            </th>
            <th>
              <div class="dropdown">
                <label tabindex="0" class="">{{ tableHeader5 }}</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <div class="form-control">
                      <label class="label gap-3">
                        <span class="label-text font-bold text-xs">Search</span>
                        <!-- <span class="text-green-400 cursor-pointer" >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span> -->
                      </label>
                      <input v-model="serachData.typeuser" class="input input-sm focusring input-bordered" @change="
                        search({
                          gatepass: 'gatepass',
                        })
                      " />
                    </div>
                  </li>
                </ul>
              </div>
            </th>
            <th>
              <div class="dropdown">
                <label tabindex="0" class="">{{ tableHeader2 }}</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <div class="form-control">
                      <label class="label gap-3">
                        <span class="label-text font-bold text-xs">Search</span>
                        <!-- <span class="text-green-400 cursor-pointer" >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span> -->
                      </label>
                      <input v-model="serachData.gatepass" class="input input-sm focusring input-bordered" @change="
                        search({
                          gatepass: 'gatepass',
                        })
                      " />
                    </div>
                  </li>
                </ul>
              </div>
            </th>

            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, i) in gatePassData" :key="i">
            <th>{{ d.rgpId }}</th>
            <td v-if="depCode === '4'">
              {{ d.departmentName }}
            </td>

            <td>
              {{
                  d.supplierName === null
                    ? `${d.name.length === 35
                      ? `${d.name.substring(0, 25)}...`
                      : d.name
                    }`
                    : `${d.supplierName.length === 45
                      ? `${d.supplierName.substring(0, 30)}...`
                      : d.supplierName
                    }`
              }}
            </td>
            <td class="capitalize">{{ d.typeuser }}</td>
            <td>{{ d.gatePass === "Non-returnable" ? "NR" : "R" }}</td>

            <td>{{ d.noOfItems }}</td>
            <td>{{ d.rgpDate.slice(0, 11) }}</td>
            <td class="dropdown dropdown-left items-center flex justify-center">
              <label tabindex="0" class="m-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg></label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box gap-3">
                <li v-if="
                  d.forward == 'N' && d.approval == 'N' && userCode != hodCode
                ">
                  <a class="cursor-pointer text-indigo-600 tooltip tooltip-bottom" data-tip="Edit"
                    @click="showEditModal(d)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </a>
                </li>
                <li class="text-warning">
                  <a class="cursor-pointer tooltip tooltip-bottom" @click="showView(++i)" data-tip="Show">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                </li>
                <li class="text-purple-600">
                  <a class="cursor-pointer text-blue-600 tooltip" @click="lineView(gatePassData[i].rgpId)"
                    data-tip="Items">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg></a>
                </li>
                <li v-if="
                  d.forward == 'Y' && d.approval == 'Y' && userCode != hodCode
                ">
                  <router-link :to="{
                    name: 'pdf',
                    params: { id: gatePassData[i].rgpId, depCode: d.departmentCode },
                  }" target="_blank">
                    <span class="cursor-pointer text-purple-500 tooltip" data-tip="Print Pass"><svg
                        xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg></span>
                  </router-link>
                </li>
                <li v-if="hodCode == userCode" class="text-red-600">
                  <a @click="deleteData(d.rgpId)" class="cursor-pointer tooltip" data-tip="Delete"><svg
                      xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg></a>
                </li>
                <li v-if="userCode == hodCode && d.forward === 'Y'">
                  <a v-if="
                    d.forward == 'Y' &&
                    d.approval == 'Y' &&
                    userCode == hodCode
                  ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </a>
                  <a v-else class="flex flex-col gap-5">
                    <div data-tip="Accept" class="tooltip">
                      <svg @click="
                        sendStatus({
                          accept: 'Y',
                          rgpId: d.rgpId,
                        })
                      " xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer text-green-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div data-tip="Return" class="tooltip tooltip-top" @click="
                      sendStatus({
                        accept: 'N',
                        rgpId: d.rgpId,
                      })
                    ">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                    </div>
                  </a>
                </li>
                <li v-if="
                  d.forward == 'N' && d.approval == 'N' && userCode != hodCode
                " class="text-green-500">
                  <a data-tip="Forward" class="tooltip tooltip">
                    <svg @click="
                      sendStatus({
                        forward: 'Y',
                        rgpId: d.rgpId,
                        toemail: d.toemail,
                      })
                    " xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                    </svg>
                  </a>
                </li>
                <li v-if="
                  d.forward == 'Y' && d.approval == 'N' && userCode != hodCode
                " class="text-yellow-500">
                  <a data-tip="Pending" class="tooltip tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
                </li>
                <li v-if="
                  d.forward == 'Y' && d.approval == 'Y' && userCode != hodCode
                " class="text-blue-500">
                  <a data-tip="Accepted" class="tooltip cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="text-base font-serif mt-3">
      Total Pages:<span class="text-xl">{{ pages.length }}</span>
    </p>
    <div v-if="view">
      <gate-pass-view :data="gatePassData" :viewI="viewI" :showView="showView" />
    </div>

    <div v-if="lineview">
      <gatePassLine :data="linedata" :hide="hide" :loading="loadingt" />
    </div>
  </div>
</template>

<script>
import gatePassTable from "../../composable/gatePass/useGatePassTable";
import gatePassModal from "../../composable/gatePass/useGatePassModal";
import gatePassPaginate from "../../composable/gatePass/useGatePassPaginate";
import gatePassLine from "./GatePassLine.vue";
import GatePassView from "./GatePassView.vue";
import Pagination from "../pagination.vue";

export default {
  components: { GatePassView, Pagination, gatePassLine },
  name: "GatePassTable",
  props: [
    "deleteData",
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableData",
    "tableHeader5",
  ],
  setup() {
    const {
      view,
      viewI,
      showView,
      currentState,
      state,
      prev,
      next,
      lineEntry,
      lineView,
      lineview,
      hide,
      linedata,
      loadingt,
      sendStatus,
      userCode,
      hodCode,
      depCode,
    } = gatePassTable();
    const { edit, showEditModal } = gatePassModal();
    const {
      pages,
      pageno,
      loading,
      gatePassData,
      getData,
      search,
      serachData,
    } = gatePassPaginate();
    return {
      view,
      viewI,
      showView,
      currentState,
      state,
      prev,
      next,
      pages,
      pageno,
      loading,
      gatePassData,
      getData,
      lineEntry,
      lineView,
      lineview,
      hide,
      linedata,
      loadingt,
      edit,
      sendStatus,
      userCode,
      hodCode,
      showEditModal,
      depCode,
      search,
      serachData,
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
<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between">
      <p class="text-base font-serif">
        Current Page:<span class="text-xl">{{ pageCount }}</span>
      </p>
      <pagination
        :currentState="currentState"
        :state="state"
        :prev="prev"
        :next="next"
        :pages="page"
      />
    </div>
    <div>
      <div v-if="loading" class="flex items-center justify-center">
        <img src="../../../assets/830.svg" alt="loading svg" />
      </div>
      <table v-else class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>ID</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th>{{ tableHeader5 }}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in tableData" :key="d.reqId">
            <th>{{ d.reqId }}</th>
            <th>{{ d.millName }}</th>
            <td>{{ d.jobTitle }}</td>
            <td>{{ d.noOfPosts }}</td>
            <td>{{ d.fees }}</td>
            <td>{{ d.createdOn }}</td>
            <td class="flex items-center justify-center">
              <span
                class="cursor-pointer"
                @click="
                  openModal({
                    reqId: d.reqId,
                    amount: d.fees,
                  })
                "
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <!-- <span
                @click="
                  mailProforma({
                    mailId: d.mailId,
                    millName: d.millName,
                    fees: Number(d.fees),
                    cgst: Number(d.cgst),
                    sgst: Number(d.sgst),
                    igst: Number(d.igst),
                    addr1: d.addr1,
                    addr2: d.addr2,
                    city: d.city,
                    state: d.state,
                    pincode: Number(d.pincode),
                  })
                "
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span> -->
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <p class="text-base font-serif mt-3">
        Total Pages:<span class="text-xl">{{ pages   + 1 }}</span>
      </p> -->
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import millTable from "../../../composable/Emp/Mill/useMillTable";
import mill from "../../../composable/Emp/Mill/useMill";
import pagination from "../../pagination.vue";
import millMail from "../../../composable/Emp/Mill/useMillMail";

export default {
  name: "Table",
  props: [
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
  ],
  components: { pagination },
  setup() {
    const {
      tableData,
      getData,
      loading,
      currentState,
      page,
      pageCount,
      prev,
      state,
      next,
    } = millTable();
    const { openModal } = mill();
    const { mailProforma } = millMail();
    onMounted(() => {
      getData(currentState.value);
    });
    return {
      tableData,
      openModal,
      loading,
      currentState,
      page,
      pageCount,
      state,
      prev,
      next,
      mailProforma,
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
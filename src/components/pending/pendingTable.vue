<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between">
      <!-- <p class="text-base font-serif">
        Current Page:<span class="text-xl">{{ pageno }}</span>
      </p> -->
      <!-- <pagination
        :currentState="currentState"
        :state="state"
        :prev="prev"
        :next="next"
        :pages="pages"
      /> -->
    </div>
    <div>
      <!-- <div v-if="loading" class="flex items-center justify-center">
        <img src="../../assets/830.svg" alt="loading svg" />
      </div> -->
      <table class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>Id</th>
            <th>{{ tableHeader1 }}</th>
            <th>{{ tableHeader2 }}</th>
            <th>{{ tableHeader3 }}</th>
            <th>{{ tableHeader4 }}</th>
            <th>{{ tableHeader5 }}</th>
            <th>{{ tableHeader6 }}</th>
            <th>{{ tableHeader7 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in tableData" :key="d.Sno">
            <th>{{ d.RGP_Id }}</th>
            <td>{{ d.Supplier_Name }}</td>
            <td>{{ d.Item_Name }}</td>
            <td>{{ d.Sent_Qty }}</td>
            <td>{{ d.Recd_Qty }}</td>
            <td>{{ d.Pending_Qty }}</td>
            <td>{{ d.Sent_Date.slice(0, 11) }}</td>
            <td>{{ d.returnDate }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <p class="text-base font-serif mt-3">
       Total Pages:<span class="text-xl">{{ pages.length + 1 }}</span>
      </p> -->
    </div>
  </div>
</template>

<script>
// import Pagination from "../pagination.vue";

export default {
  //   components: { Pagination },
  name: "Table",
  props: [
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
    "tableHeader6",
    "tableHeader7",
    "tableData",
  ],
};
</script>

<style scoped>
thead th {
  background: none;
  font-size: 14px;
}
</style>
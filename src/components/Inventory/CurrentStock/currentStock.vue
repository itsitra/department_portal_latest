<template>
  <div class="overflow-x-auto">
    <div v-if="loading" class="flex items-center justify-center">
      <img src="../../../assets/830.svg" alt="loading svg" />
    </div>
    <table v-else class="table w-full table-compact table-zebra">
      <thead>
        <tr class="bg-gray-300 text-gray-700 font-extrabold">
          <th>{{ tableHeader0 }}</th>
          <th>{{ tableHeader1 }}</th>
          <th>{{ tableHeader2 }}</th>
          <th>{{ tableHeader3 }}</th>
          <th>{{ tableHeader4 }}</th>
          <th>{{ tableHeader5 }}</th>
          <th>{{ tableHeader6 }}</th>
          <th>{{ tableHeader7 }}</th>
          <th>{{ tableHeader8 }}</th>
          <th>{{ tableHeader9 }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in data" :key="d.stockId">
          <th>{{ d.stockId }}</th>
          <th>{{ d.depName }}</th>
          <td>{{ d.itemCode }}</td>
          <th>{{ d.itemDesc }}</th>
          <td>{{ d.opening }}</td>
          <td>{{ d.additions }}</td>
          <td>{{ d.deletions }}</td>
          <td>{{ d.closing }}</td>
          <td>{{ d.batchNo }}</td>
          <td>{{ d.expDate.slice(0, 11) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CurrentStock",
  props: [
    "tableHeader0",
    "tableHeader1",
    "tableHeader2",
    "tableHeader3",
    "tableHeader4",
    "tableHeader5",
    "tableHeader6",
    "tableHeader7",
    "tableHeader8",
    "tableHeader9",
    "data",
    "loading",
  ],
};
</script>

<style scoped>
thead th {
  background: none;
  font-size: 14px;
}
</style>
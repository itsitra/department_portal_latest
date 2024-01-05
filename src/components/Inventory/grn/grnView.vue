<template>
  <div class="
      p-10
      max-w-4xl
      fixed
      top-40
      right-32
      z-50
      overflow-hidden
      card
      shadow-2xl
      modal-box
      bg-gradient-to-bl
      from-theme-green
      to-theme-black
    ">
    <div class="card-body relative">
      <div @click="closeGrnView" class="
          cursor-pointer
          absolute
          top-0
          transform
          translate-x-9
          -translate-y-2
          right-0
        ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div v-if="dataThere" class="flex items-center justify-center animate-bounce">
        <img src="../../../assets/wait.png" class="w-15" alt="" />
      </div>
      <table v-else class=" table w-full table-compact">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>Item Code</th>
            <th>Description</th>
            <th>Batch No</th>
            <th>Expiry Date</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in grnDataList" :key="d.sNo">
            <th>{{ d.itemCode }}</th>
            <td>{{ d.itemDescription }}</td>
            <td>{{ d.batchNo }}</td>
            <td>{{ d.expiryDate }}</td>
            <td>{{ d.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "grnView",
  props: ["closeGrnView", "dataThere", "grnDataList"],
};
</script>

<style scoped>
thead th {
  background: none;
  font-size: 14px;
}

.table {
  border-collapse: separate;
}
</style>
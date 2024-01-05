<template>
  <div
    class="p-6 mx-auto max-w-4xl fixed top-16 left-72 right-0 z-50 overflow-hidden card shadow-2xl bg-base-100 modal-box mb-4 bg-gradient-to-bl from-theme-green to-theme-black"
  >
    <div class="card-body relative">
      <div
        @click="hide"
        class="cursor-pointer absolute top-0 transform translate-x-9 -translate-y-2 left-800"
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
      <div v-if="loading" class="flex items-center justify-center">
        <svg
          class="w-10 h-10"
          version="1.1"
          id="L3"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
          xml:space="preserve"
        >
          <circle
            fill="none"
            stroke="#fff"
            stroke-width="4"
            cx="50"
            cy="50"
            r="44"
            style="opacity: 0.5"
          />
          <circle
            fill="#fff"
            stroke="#e74c3c"
            stroke-width="3"
            cx="8"
            cy="54"
            r="6"
          >
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 48"
              to="360 50 52"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="table w-full table-zebra table-compact bg-transparent">
          <thead>
            <tr class="bg-gray-300 text-gray-700 font-extrabold">
              <th>Description</th>
              <th>UOM</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, i) in data" :key="i">
              <th>{{ d.description }}</th>
              <td>{{ d.unit }}</td>
              <td>{{ d.quantity }}</td>
              <td>{{ d.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "hide", "loading"],
};
</script>

<style scoped>
thead th {
  background: none;
  font-size: 14px;
}
table {
  border-collapse: separate;
}
</style>
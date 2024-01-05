<template>
     <div
          class="p-6 mx-auto max-w-4xl fixed top-44 left-80 right-0 z-50 overflow-hidden card shadow-2xl bg-base-100 modal-box mb-4 bg-gradient-to-bl from-theme-green to-theme-black">
          <div class="card-body relative">
               <div @click="closeQrView"
                    class="cursor-pointer absolute top-0 transform translate-x-9 -translate-y-2 left-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
               </div>
               <div class="text-2xl font-bold font-serif ">
                    <h1 class="text-white">Gate Pass ID: <span class="text-black">{{ gpHeader[0].rgpId }}</span></h1>
               </div>
               <div class="grid grid-cols-3 gap-3">
                    <div class="form-control">
                         <label class="label">
                              <span class="label-text font-bold tracking-tight leading-tight text-white">Department Name
                              </span>
                         </label>
                         <div class="flex items-center">
                              <input readonly type="text" :value="gpHeader[0].depName"
                                   class="input input-bordered w-full border-theme-green focusring input-sm" />
                         </div>
                    </div>

                    <div class="form-control">
                         <label class="label">
                              <span class="label-text font-bold tracking-tight leading-tight text-white">Supplier Name /
                                   Customer Name</span>
                         </label>
                         <div class="flex items-center">
                              <input readonly type="text" :value="gpHeader[0].scname"
                                   class="input input-bordered w-full border-theme-green focusring input-sm" />
                         </div>

                    </div>
                    <div class="form-control">
                         <label class="label">
                              <span class="label-text font-bold tracking-tight leading-tight text-white">Sent Date
                              </span>
                         </label>
                         <div class="flex items-center">
                              <input readonly type="text" :value="gpHeader[0].sentdate"
                                   class="input input-bordered w-full border-theme-green focusring input-sm" />
                         </div>
                    </div>
                    <div class="form-control">
                         <label class="label">
                              <span class="label-text font-bold tracking-tight leading-tight text-white">No.Of.Items
                              </span>
                         </label>

                         <div class="flex items-center">
                              <input readonly type="text" :value="gpHeader[0].noofitems"
                                   class="input input-bordered w-full border-theme-green focusring input-sm" />
                         </div>
                    </div>
               </div>
               <div class="mt-5">
                    <table class="table w-full table-zebra table-compact bg-transparent">
                         <thead>
                              <tr class="bg-gray-300 text-gray-700 font-extrabold">
                                   <th>Description</th>
                                   <th>Sent QTY</th>
                                   <th>Received QTY</th>
                                   <th>Pending QTY</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr v-for="(d, i) in gpLine" :key="i">
                                   <th>{{ d.itemname }}</th>
                                   <td>{{ d.sentqty }}</td>
                                   <td>{{ d.recQty }}</td>
                                   <td>{{ d.penQty }}</td>
                              </tr>
                         </tbody>
                    </table>
               </div>
          </div>
     </div>
</template>

<script>
import qrDetails from "../../composable/Details/qrDetails"

export default {
     name: "Details Modal",

     setup() {
          const { gpHeader, gpLine, closeQrView
          } = qrDetails()
          return {
               gpHeader, gpLine, closeQrView

          }
     }
}
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
<template>
     <div class="card border shadow-lg">
          <div class="card-title flex items-center justify-center gap-5">
               <h1 class="">Enter Gatepass ID </h1>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                         d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
               </svg>
          </div>
          <div class="form-control card-body">
               <label class="label">
                    <span class="label-text font-bold tracking-wide">Gatepass Number</span>
               </label>
               <div class="relative flex items-center">
                    <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                   d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                         </svg>
                    </div>

                    <input v-model="gpNumber" type="text" placeholder="Gatepass Challan Number"
                         class="input input-bordered w-full pl-12 focusring input-sm" />
               </div>
          </div>
          <div class="form-control mx-7 my-2">
               <input class="btn bg-theme-black text-theme-green btn-sm" type="button" value="Search"
                    @click="searchQr" />
          </div>
     </div>
</template>

<script>
import qrDetails from "../../composable/Details/qrDetails"
export default {
     name: "qrdetails",
     setup() {
          const { gpNumber, searchQr
          } = qrDetails()
          return {
               gpNumber, searchQr
          }
     }

}
</script>

<style>
</style>
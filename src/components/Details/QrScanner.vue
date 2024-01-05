<template>

     <div class="border shadow-xl card">
          <div class="card-title flex items-center justify-center gap-5">
               <h1 class="">Scan for Details </h1>
               <span class="cursor-pointer ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                         <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
               </span>

          </div>
          <div>
               <qr-stream @decode="decode" :camera="camera">
                    <div style="color: red;"
                         class="border w-44 h-44 ml-40 mt-24 items-center justify-center border-red-500"></div>
               </qr-stream>
          </div>

     </div>


</template>

<script>

import { QrStream } from '../../../node_modules/vue3-qr-reader/dist/vue3-qr-reader.common'
import qrDetails from "../../composable/Details/qrDetails"

export default {
     name: "QR SCanner",
     components: {
          QrStream,

     },
     setup() {
          const { decode, camera,
          } = qrDetails()
          return {
               decode, camera,

          }
     }
}
</script>

<style>
</style>
<template>
     <div class="mr-12 ml-96 w-auto grid grid-flow-col grid-cols-2 gap-5 h-screen items-center justify-center">
          <div>
               <qr-details :gpNumber="gpNumber" />
          </div>

          <div>
               <QrScanner />
          </div>
     </div>

     <div v-if="qrdataView">
          <details-modal />
     </div>
</template>

<script>
import DetailsModal from '../components/Details/DetailsModal.vue';
import QrDetails from '../components/Details/QrDetails.vue';
import QrScanner from "../components/Details/QrScanner.vue";
import qrDetails from "../composable/Details/qrDetails"
export default {
     name: "Details",
     components: { QrScanner, QrDetails, DetailsModal },
     setup() {
          const { gpNumber,
               qrdata,
               decode,
               showViewQr,
               qrdataView, } = qrDetails()
          return {
               gpNumber,
               qrdata,
               decode,
               showViewQr,
               qrdataView,
          }
     }
}
</script>

<style>
</style>
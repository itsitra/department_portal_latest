<template>
     <div class="min-h-screen mr-12 mt-8 ml-72 w-auto">
          <div
               class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative">
               <div class="absolute top-8 left-10 transform"
                    v-if="reportableheader.length !== 0 && reporttabledata.length !== 0">
                    <export-excel :data="reporttabledata" :fields="jsonfields" name="report.csv" type="csv"
                         class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm">
                         Export Data
                    </export-excel>
               </div>
               <div
                    class="text-2xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900 ">

                    <ul>
                         <li>
                              <p>Receipt Reports</p>
                         </li>
                    </ul>

               </div>
               <div class="absolute top-8 right-10 transform">
                    <button @click="calireportmodal()"
                         class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm">
                         Generate Report
                    </button>
               </div>
               <ReceiptReportTable :tableHeader1="'Receipt No'" :tableHeader2="'Customer Name'"
                    :tableHeader3="'ItemName'" :tableHeader4="'Name'" />
          </div>
          <div v-if="calireportmodalstatus">
               <Receiptreportmodal :closeModal="calireportmodal" />
          </div>
     </div>
</template>

<script>
import ReceiptReportTable from '../components/Recipt/ReceiptReportTable.vue';
import Receiptreportmodal from '../components/Recipt/Receiptreportmodal.vue';
import useReceiptReport from '../composable/Receipt/useReceiptReport';
export default {
     name: 'ReceiptReport',
     components: { ReceiptReportTable, Receiptreportmodal },
     setup() {
          const { calireportmodal, calireportmodalstatus, reportableheader, reporttabledata, jsonfields } = useReceiptReport()

          return {
               calireportmodal, calireportmodalstatus, reportableheader, reporttabledata, jsonfields
          }
     }
}
</script>

<style>
</style>
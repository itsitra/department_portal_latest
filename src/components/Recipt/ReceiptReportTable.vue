<template>
     <div v-if="reportableheader.length === 0 && reporttabledata.length === 0" class="flex items-center justify-center">
          <p>Generate Report To Get Data</p>
     </div>
     <table v-else class="table w-full table-compact table-zebra p-1">
          <thead>
               <tr class="bg-gray-300 text-gray-700 font-extrabold">
                    <th v-for="(header, i) in reportableheader" :key="i">
                         {{ header }}</th>

               </tr>
          </thead>
          <tbody v-if="reportstate === 'itemperioddata'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dateofreceipt }}</td>
                    <td>{{ d.itemdetails }}</td>
                    <td>{{ d.recqty }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'itemperioddatacust'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dateofreceipt }}</td>
                    <td>{{ d.custname }}</td>
                    <td>{{ d.itemdetails }}</td>
                    <td>{{ d.recqty }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'thirdpartysentout'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>

               </tr>
          </tbody>
          <tbody v-if="reportstate === 'thirdpartyreturn'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.receiptDate }}</td>

               </tr>
          </tbody>
          <tbody v-if="reportstate === 'thirdpartyreturnsupplier'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.Supplier_Name }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.receiptDate }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'thirdpartyrejected'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.receiptDate }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'thirdpartysentoutsupplier'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'servicesentout'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>

               </tr>
          </tbody>
          <tbody v-if="reportstate === 'servicereturned'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.receiptDate }}</td>

               </tr>
          </tbody>
          <tbody v-if="reportstate === 'servicereturnedsupplier'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.receiptDate }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'servicerejected'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
                    <td>{{ d.receiptDate }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'servicesentoutpending'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
               </tr>
          </tbody>
          <tbody v-if="reportstate === 'others'">
               <tr v-for="(d, i) in reporttabledata" :key="i" class="text-left">
                    <td>{{ d.Sno }}</td>
                    <td>{{ d.dcNo }}</td>
                    <td>{{ d.dcDate }}</td>
                    <td>{{ d.vendorName }}</td>
                    <td>{{ d.detailsOfItem }}</td>
                    <td>{{ d.recqty }}</td>
               </tr>
          </tbody>
     </table>

</template>

<script>
import useReceiptReport from '../../composable/Receipt/useReceiptReport'

export default {
     name: "ReceiptReportTable",
     props: [
          "tableHeader1",
          "tableHeader2",
          "tableHeader3",
          "tableHeader4",
     ],
     setup() {
          const { reportableheader, reporttabledata, reportdate, reportstate } = useReceiptReport()
          return {
               reportableheader, reporttabledata, reportdate, reportstate
          }
     }
}
</script>

<style scoped>
thead th {
     background: none;
     font-size: 14px;
}
</style>
<template>
     <div v-if="reciptmodal" class="ml-56 my-10">
          <ReceiptModal :heading="'Recepit Entry'" :closeModal="reciptModalShowClose" />
     </div>
     <div class="min-h-screen mr-12 mt-8 ml-72 w-auto" v-else>
          <div
               class="border-2 border-theme-black mx-5 w-full p-6 flex flex-col flex-wrap justify-center items-center relative">
               <div class="absolute top-8 left-10 transform">
                    <button @click="itemmastermodalopen()"
                         class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm">
                         Item Master
                    </button>
               </div>
               <div
                    class="text-2xl font-bold breadcrumbs mb-3 p-2 w-full flex items-center justify-center bg-gradient-to-br from-theme-green to-gray-400 text-green-900 ">

                    <ul>
                         <li>
                              <p>Receipt</p>
                         </li>
                    </ul>

               </div>
               <div class="absolute top-8 right-10 transform">
                    <button @click="reciptModalShowClose()"
                         class="btn bg-theme-black text-theme-green hover:bg-theme-green hover:text-theme-black shadow-lg btn-sm">
                         Create Receipt
                    </button>
               </div>
               <ReceiptTable class="w-full"  :tableHeader1="'MIR Number'"
                    :tableHeader2="'Customer Name'" :tableHeader3="'No Of Items'" :tableHeader4="'Received Date'" :tabledata="tabledata"
                    :actionClick="actionClick" :itemslectAll="itemslectAll" />
          </div>
     </div>
     <div class="bg-black ">
          <ReceiptitemModal :receiptmodalitem="receiptmodalitem" :backdropClose="backdropClose" />
     </div>
</template>

<script>
import ReceiptTable from '../components/Recipt/ReceiptTable.vue';
import ReceiptModal from '../components/Recipt/ReceiptModal.vue';
import ReceiptitemModal from '../components/Recipt/ReceiptitemModal.vue';
import useReciptModal from '../composable/Receipt/useReciptmodal';

export default {
     name: "Receipt",
     components: { ReceiptTable, ReceiptModal, ReceiptitemModal },
     setup() {
          const { tabledata,
               backdropClose,
               itemmastermodalopen,
               itemslectAll,
               actionClick,
               reciptmodal, receiptmodalitem,
               reciptModalShowClose, } = useReciptModal()

          return { tabledata, actionClick, reciptModalShowClose, reciptmodal, receiptmodalitem, backdropClose, itemmastermodalopen, itemslectAll };
     },

}
</script>

<style>
</style>
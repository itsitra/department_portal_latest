<template>
     <div
          class="p-6 mx-auto  fixed top-44 left-72 right-0 z-50 overflow-hidden card shadow-2xl modal-box mb-4 bg-gray-50 ">
          <div id="close" class="flex justify-end items-end mb-2 cursor-pointer" @click="smallaction">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                         d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
          </div>
          <div id="cardbody">
               <div id="itememtryitems" class="grid gap-2">
                    <!-- <div class="form-control">
                         <label class="label cursor-pointer">
                              <span class="label-text">Customer or Supplier</span>
                              <input type="checkbox" class="toggle toggle-primary" @change="toggleuser($event)" />
                         </label>
                    </div> -->
                    <div class="flex gap-2">

                         <div class="form-control w-full" v-if="passtype !== 'customer'">
                              <label class="label">
                                   <span class="label-text font-bold tracking-wide">Select Supplier <strong
                                             class="text-red-600 font-bold text-xl">*</strong></span>
                              </label>
                              <div class="relative">
                                   <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-theme-black"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                   </div>


                                   <select class="select select-bordered w-full pl-12 focusring select-sm"
                                        v-model="supplierid">
                                        <option v-for="(supplier, i) in suppliers" :value="supplier.supplierCode"
                                             :key="i">
                                             <!-- {{ supplier.supplierCode }} -->
                                             {{ supplier.supplierName }}
                                        </option>
                                   </select>
                              </div>
                         </div>
                    </div>

               </div>

               <div class="form-control">
                    <label class="label">
                         <span class="label-text font-bold tracking-wide">Staff
                              Name

                              <strong class="text-red-600 font-bold text-xl">*</strong></span>
                    </label>
                    <div class="relative flex items-center">
                         <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                   stroke="currentColor" stroke-width="2">
                                   <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                         </div>
                         <select class="select select-bordered select-sm focusring pl-12  pr-5  w-full"
                              v-model="staffid">
                              <option v-for="(staff, i) in staffs" :value="staff.Staff_Code" :key="i">
                                   {{ staff.Staff_Name }}
                              </option>
                         </select>
                    </div>
               </div>
               <div v-if="passtype === 'customer'">
                    <label class="label">
                         <span class="label-text font-bold tracking-wide">Dc Number</span>
                    </label>
                    <div class="relative flex items-center">
                         <div class="absolute border-r-2 border-blue-400 py-1 px-2">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                   stroke="currentColor" stroke-width="2">
                                   <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                              </svg>
                         </div>

                         <input v-model="dcnumber" type="text" name="dcnumber" disabled
                              class="input input-bordered w-full pl-12 focusring input-sm" />
                    </div>
               </div>
               <div class="form-control">
                    <label class="flex gap-2  items-end justify-end ">
                         <span class="label-text">Total Items :</span>
                         <span class="label-text text-xl">{{ passitems.length }}</span>
                    </label>
               </div>
               <div class="my-5">
                    <button @click.prevent="save"
                         class="px-6 w-full py-2 font-bold tracking-wide bg-theme-black transition-colors duration-200 transform text-theme-green rounded-xl focus:outline-none focus:bg-gray-600">
                         {{ gatepasstype }}
                    </button>
               </div>
          </div>
     </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onMounted, onUnmounted } from '@vue/runtime-core';

import useReciptModal from '../../composable/Receipt/useReciptmodal';
export default {
     name: "Small Action Modal",
     props: ["smallaction", "passtype", "itemcount"],
     setup(props) {
          const { suppliers, staffs, passitems, receiptnumber, postgatepass, getSupplierData, tempcusdc } = useReciptModal()

          // let username = ref("Customer");
          let supplierid = ref(Number(''))
          let staffid = ref(Number(''));
          let dcnumber = ref('')
          dcnumber.value = tempcusdc.value
          let usertype = ref("");
          let gatepasstype = ref("")
          if (props.passtype == 'service') {
               gatepasstype.value = "Service Gatepass"
          } else if (props.passtype == 'thirdparty') {
               gatepasstype.value = "ThirdParty Gatepass"
          } else {
               gatepasstype.value = "Customer Gatepass"
          }

          const save = () => {
               if (passitems.value.length > 0) {
                    if (gatepasstype.value == "Service Gatepass") {
                         let jdata = JSON.stringify({
                              depcode: sessionStorage.getItem('depCode'),
                              staffid: staffid.value,
                              suppliercode: supplierid.value,
                              noofitems: passitems.value.length,
                              items: passitems.value,
                              receiptNo: receiptnumber.value,
                              gatepasstype: 'service'
                         })

                         postgatepass(jdata, 'service')
                    } else if (gatepasstype.value == "ThirdParty Gatepass") {
                         let jdata = JSON.stringify({
                              depcode: sessionStorage.getItem('depCode'),
                              staffid: staffid.value,
                              suppliercode: supplierid.value,
                              noofitems: passitems.value.length,
                              items: passitems.value,
                              receiptNo: receiptnumber.value,
                              gatepasstype: 'thirdparty'
                         })

                         postgatepass(jdata, 'thirdparty')
                    } else {
                         let jdata = JSON.stringify({
                              depcode: sessionStorage.getItem('depCode'),
                              dcNumber: dcnumber.value,
                              staffid: staffid.value,
                              suppliercode: supplierid.value,
                              noofitems: passitems.value.length,
                              items: passitems.value,
                              receiptNo: receiptnumber.value,
                              gatepasstype: 'NonReturnable'
                         })


                         postgatepass(jdata, 'customer')
                    }
               } else {
                    alert("Either One item should be selected to create a gatepass")
               }


          }



          onMounted(() => {
               if (props.passtype == 'service') {
                    getSupplierData('CS')
               } else if (props.passtype == 'thirdparty') {
                    getSupplierData('CT')
               }

          })
          onUnmounted(() => {
               passitems.value = []
          })
          return {
               usertype, gatepasstype, suppliers, supplierid, staffid, staffs, save, passitems, dcnumber
          }
     }
}
</script>

<style>
</style>
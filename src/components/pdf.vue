<template>
  <!--<section class="mx-auto container p-10" v-if="data[1].length <= 12">-->
  <section v-if="data[1].length <= 12">
    <div class="relative mt-10">
    <!--<div class="relative mt-5">-->
      <div @click="print" class="cursor-pointer absolute -top-9 noprint">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 bg-gray-100 rounded-lg px-2 hover:scale-125 hover:bg-green-400 duration-500 ease-out transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      </div>
    </div>
    <div class="flex justify-end" v-if="data[0][0].Gate_Pass === 'Returnable'">
      <qr-code :text="gatepass" :size="50"></qr-code>
    </div>

    <div class="max-w-full">
      <p class="text-right mr-5">ORI/GC/BC</p>
      <div class="border-2 border-blue-400">
        <div class="flex" id="header">
          <!-- image div -->
          <div
            class="border-r-2 border-b-2 border-blue-400 py-3 px-2 w-max flex-shrink h-[110px]"
          >
            <img src="../assets/sitralogo.png" class="h-20" alt="logo" />
          </div>
          <!-- heading -->
          <div class="flex-grow text-sm">
            <div class="text-sm font-serif font-bold">
              <h1 class="text-center">
                THE SOUTH INDIA TEXTILE RESEARCH ASSOCIATION
              </h1>
            </div>
            <div class="text-sm font-sans font-bold">
              <p class="text-center">
                13/37, Avinashi Road, Civil Aerodrome Post,
              </p>
            </div>
            <div class="text-sm font-sans font-bold">
              <p class="text-center">
                Coimbatore - 641014, India. Phone: 0422 - 4215333, 4215308,
                2574367-9
              </p>
            </div>
            <div class="border-b-2 border-blue-400 text-sm font-sans font-bold">
              <p class="text-center">GSTIN: 33AAAAT3433H1ZT</p>
            </div>
            <div class="border-b-2 border-blue-400 text-sm font-sans font-bold">
              <!-- gatepass Title -->
              <div class="text-center">
                <h3>
                  DELIVERY CHALLAN: ({{ data[0][0].Gate_Pass.toUpperCase() }})
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-6 text-xs border-blue-400"
          id="generalDetails"
        >
          <div class="col-start-1 col-end-7 border-b-2 border-blue-400">
            <!--  signs-->
            <div class="grid grid-flow-col grid-cols-3">
              <p class="col-span-2 font-bold">Consignee Details :</p>
              <div class="grid grid-flow-col grid-cols-2">
                <div
                  class="border-l-2 border-blue-400 text-right font-bold text-xs"
                >
                  <p class="mr-1">Department:</p>
                </div>
                <div class="border-l-2 border-blue-400 text-left">
                  <p class="ml-1">{{ data[0][0].Department_Name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="general1"
            class="border-r-2 border-blue-400 col-span-4 grid grid-flow-col text-xs"
          >
            <!-- name ,address,gst -->
            <div class="font-bold">
              <div id="name" class="border-b-2 border-blue-400">
                <div class="">
                  <p>Name:</p>
                </div>
              </div>

              <div id="address" class="border-b-2 border-blue-400 h-16">
                <div class="">
                  <p>Address:</p>
                </div>
              </div>
              <div id="gst" class="">
                <div class="">
                  <p class="pt-1">GSTIN:</p>
                </div>
              </div>
            </div>
            <div id="general1-2" class="col-span-3 border-l-2 border-blue-400">
              <!-- name ,address,gst -->
              <div id="name" class="border-b-2 border-blue-400">
                <div class="ml-1">
                  <!-- <p>{{ data[i].supplierName }}</p> -->
                  <p>
                    {{
                      data[0][0].Supplier_Name === null
                        ? data[0][0].name
                        : data[0][0].Supplier_Name
                    }}
                  </p>
                  <!-- <p>hii</p> -->
                </div>
              </div>
              <div id="address" class="border-b-2 border-blue-400 h-16">
                <div class="ml-1">
                  <!-- <p>{{ data[i].supplierName }}:</p> -->
                  <p class="w-full text-left leading-tight tracking-wide">
                    {{
                      data[0][0].Supplier_Address === null
                        ? `${data[0][0].address1}${data[0][0].address2}`
                        : data[0][0].Supplier_Address
                    }}
                    <br />
                    {{
                      data[0][0].Supplier_City === null
                        ? data[0][0].city
                        : data[0][0].Supplier_City
                    }}
                    -
                    {{
                      data[0][0].Supplier_Pincode === null
                        ? data[0][0].pincode
                        : data[0][0].Supplier_Pincode
                    }}
                    <br />
                    {{
                      data[0][0].Supplier_State === null
                        ? data[0][0].state
                        : data[0][0].Supplier_State
                    }}
                  </p>
                </div>
              </div>
              <div id="gst" class="mt-1">
                <div class="ml-1">
                  <!-- <p>{{ data[i].supplierName }}:</p> -->
                  <p>
                    {{
                      data[0][0].Supplier_GST === null
                        ? data[0][0].gstin
                        : data[0][0].Supplier_GST
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="general2-1"
            class="text-left col-span-2 grid grid-flow-col text-xs"
          >
            <div
              class="text-xs font-bold"
              v-if="
                data[0][0].Gate_Pass === 'Non-returnable' ||
                data[0][0].Gate_Pass === 'samplegatepass'
              "
            >
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2">Delivery challan:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2">Date:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2">Transport mode:</p>
              </div>
              <div class="border-b-2 border-blue-400 text-right">
                <p class="mr-2 text-xs">Transport Company:</p>
              </div>
              <div class="border-b-2 border-blue-400 text-right">
                <p class="text-right mr-2">Vehicle #:</p>
              </div>
              <div>
                <p class="text-right mr-2">Cust. DC# and DATE:</p>
              </div>
            </div>
            <div
              class="text-xs font-bold"
              v-if="data[0][0].Gate_Pass === 'Returnable'"
            >
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2 text-xs">Delivery challan:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2 text-xs">Date:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2 text-xs">Transport mode:</p>
              </div>
              <div class="border-b-2 border-blue-400 text-right">
                <p class="mr-2 text-xs">Transport Company:</p>
              </div>
              <div class="">
                <p class="text-right mr-2 text-xs">Vehicle #:</p>
              </div>
            </div>
            <div
              id="general2-2"
              class="text-left border-l-2 border-blue-400 text-xs"
              v-if="
                data[0][0].Gate_Pass === 'Non-returnable' ||
                data[0][0].Gate_Pass === 'samplegatepass'
              "
            >
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1 &&
                  data[0][0].dcNumber.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].RGP_Id }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400'
                    : 'border-b-2 border-blue-400 h-6',
                ]"
              >
                <p>{{ data[0][0].RGP_Date.slice(0, 11) }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Mode.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].Transport_Mode }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].Transport_Company }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Vehicle_No.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'h-6',
                ]"
              >
                <p>{{ data[0][0].Vehicle_No }}</p>
              </div>
              <div>
                <p>{{ data[0][0].dcNumber }}</p>
              </div>
            </div>
            <div
              id="general2-2"
              class="text-left border-l-2 border-blue-400 text-xs"
              v-if="data[0][0].Gate_Pass === 'Returnable'"
            >
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].RGP_Id }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400'
                    : 'border-b-2 border-blue-400 h-6',
                ]"
              >
                <p>
                  {{
                    data[0][0].RGP_Date.slice(8, 10) +
                    "/" +
                    data[0][0].RGP_Date.slice(5, 7) +
                    "/" +
                    data[0][0].RGP_Date.slice(0, 4)
                  }}
                </p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400'
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].Transport_Mode }}</p>
              </div>
              <div class="border-b-2 border-blue-400 h-7">
                <p>{{ data[0][0].Transport_Company }}</p>
              </div>
              <div class="">
                <p>{{ data[0][0].Vehicle_No }}</p>
              </div>
            </div>
          </div>

          <div id="general3" class="col-start-1 col-end-7">
            <div class="border-b-2 border-blue-400 border-t-2">
              <p>
                Please receive the following articles in good order and return
                the attached copy duly signed for our record
              </p>
            </div>
          </div>
        </div>
        <div id="table" class="text-sm">
          <!-- table Headings -->
          <div class="overflow-x-auto">
            <table class="table-compact w-full table">
              <thead>
                <tr>
                  <th class="border-r-2 border-blue-400 px-0 text-2xs">Sno</th>
                  <th class="border-r-2 border-blue-400 px-12 text-2xs">
                    Product Description
                  </th>
                  <th
                    class="border-r-2 border-blue-400 px-0 text-2xs"
                    v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                  >
                    Range
                  </th>
                  <th class="border-r-2 border-blue-400 text-2xs">Unit</th>
                  <th class="border-r-2 border-blue-400 text-2xs">Qty</th>
                  <th>Approx value</th>
                </tr>
              </thead>
              <tbody class="border-t-2 border-b-2 border-blue-400">
                <tr
                  v-for="(d, i) in printclick || data[1].length > 12
                    ? data[1].slice(0, 12)
                    : data[1]"
                  :key="i"
                >
                  <td class="border-r-2 border-blue-400">
                    {{ i + 1 }}
                  </td>

                  <td class="border-r-2 border-blue-400 text-xs">
                    <!-- {{ d.Description }} -->
                    <span v-if="d.Description.length >= 50">
                      <span>
                        {{ d.Description.slice(0, 20) }} <br />
                        <span>{{
                          d.Description.slice(21, d.Description.length)
                        }}</span>
                        <span
                          v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                          > - {{ d.serialno }}
                          <span
                            v-if="
                              data[0][0].Gate_Pass !== 'Returnable' &&
                              depCode === 10 &&
                              data[0][0].receiptNo !== ''
                            "
                          >
                          <!--   - {{ d.CaliStatus }} --></span
                          ></span 
                        >
                      </span>
                    </span>
                    <span v-else>
                      {{ d.Description }}
                      <span v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                        > - {{ d.serialno }}
                        <span
                          v-if="
                            data[0][0].Gate_Pass !== 'Returnable' &&
                            depCode === 10 &&
                            data[0][0].receiptNo !== ''
                          "
                        >
                       <!--  - {{ d.CaliStatus }} --></span
                        ></span
                      >
                    </span>
                  </td>
                  <td
                    class="border-r-2 border-blue-400"
                    v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                  >
                    {{ d.range }}
                  </td>
                  <td class="border-r-2 border-blue-400">
                    {{ d.UOM }}
                  </td>
                  <td class="border-r-2 border-blue-400">
                    {{ d.Quantity }}
                  </td>
                  <td class="border-blue-400">
                    {{
                      data[0][0].Gate_Pass === "samplegatepass"
                        ? ""
                        : `&#8377;`
                    }}{{ d.amount }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="border-blue-400 text-sm ml-16 border-l-2"
          v-if="data[0][0].remarks !== ''"
        >
          <p class="text-xs">Note :{{ data[0][0].remarks }}</p>
        </div>
        <div
          :class="[
            data[0][0].remarks !== ''
              ? 'border-b-2 border-t-2 border-blue-400 text-left text-sm'
              : 'border-b-2 border-blue-400 text-left text-sm',
          ]"
        >
          <p class="ml-16">Purpose: {{ data[0][0].Purpose }}</p>
        </div>
        <div class="grid grid-cols-3 grid-rows-5 h-36">
          <div
            class="col-start-1 col-end-4 row-start-1 row-end-6 border-r-2 border-blue-400 p-2"
          >
            <p class="text-sm">
              Terms and Conditions :
              <br />
              # No claims will be admitted by us for any loss or damage in
              transit.
              <br />
              # Subject to Coimbatore Jurisdiction
            </p>
          </div>
          <div class="col-start-4 p-2 text-sm">
            <p>For The South India Textile Research Association</p>
            <br />
           <div v-if="depCode === 10">
            <img src="../assets/e-sign.jpg" class="h-10 w-75 mx-auto" />
            <p class="text-center">(E-Sign)</p>
          </div>
            <div v-else>
            <br />
            <br />
          </div>
            
            <p class="text-center">Authorised Signatory</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="mx-auto container p-10" v-else>
    <div class="relative mt-5">
      <div @click="print" class="cursor-pointer absolute -top-9 noprint">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 bg-gray-100 rounded-lg px-2 hover:scale-125 hover:bg-green-400 duration-500 ease-out transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      </div>
    </div>
    <div class="flex justify-end" v-if="data[0][0].Gate_Pass === 'Returnable'">
      <qr-code :text="gatepass" :size="50"></qr-code>
    </div>

    <div class="max-w-full">
      <p class="text-right mr-5">ORI/GC/BC</p>
      <div class="border-2 border-blue-400">
        <div class="flex" id="header">
          <!-- image div -->
          <div
            class="border-r-2 border-b-2 border-blue-400 py-3 px-2 w-max flex-shrink h-[110px]"
          >
            <img src="../assets/sitralogo.png" class="h-20" alt="logo" />
          </div>
          <!-- heading -->
          <div class="flex-grow text-sm">
            <div class="text-sm font-serif font-bold">
              <h1 class="text-center">
                THE SOUTH INDIA TEXTILE RESEARCH ASSOCIATION
              </h1>
            </div>
            <div class="text-sm font-sans font-bold">
              <p class="text-center">
                13/37, Avinashi Road, Civil Aerodrome Post,
              </p>
            </div>
            <div class="text-sm font-sans font-bold">
              <p class="text-center">
                Coimbatore - 641014, India. Phone: 0422 - 4215333, 4215308,
                2574367-9
              </p>
            </div>
            <div class="border-b-2 border-blue-400 text-sm font-sans font-bold">
              <p class="text-center">GSTIN: 33AAAAT3433H1ZT</p>
            </div>
            <div class="border-b-2 border-blue-400 text-sm font-sans font-bold">
              <!-- gatepass Title -->
              <div class="text-center">
                <h3>
                  DELIVERY CHALLAN: ({{ data[0][0].Gate_Pass.toUpperCase() }})
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-6 text-xs border-blue-400"
          id="generalDetails"
        >
          <div class="col-start-1 col-end-7 border-b-2 border-blue-400">
            <!--  signs-->
            <div class="grid grid-flow-col grid-cols-3">
              <p class="col-span-2 font-bold">Consignee Details :</p>
              <div class="grid grid-flow-col grid-cols-2">
                <div
                  class="border-l-2 border-blue-400 text-right font-bold text-xs"
                >
                  <p class="mr-1">Department:</p>
                </div>
                <div class="border-l-2 border-blue-400 text-left">
                  <p class="ml-1">{{ data[0][0].Department_Name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="general1"
            class="border-r-2 border-blue-400 col-span-4 grid grid-flow-col text-xs"
          >
            <!-- name ,address,gst -->
            <div class="font-bold">
              <div id="name" class="border-b-2 border-blue-400">
                <div class="">
                  <p>Name:</p>
                </div>
              </div>

              <div id="address" class="border-b-2 border-blue-400 h-16">
                <div class="">
                  <p>Address:</p>
                </div>
              </div>
              <div id="gst" class="">
                <div class="">
                  <p class="pt-1">GSTIN:</p>
                </div>
              </div>
            </div>
            <div id="general1-2" class="col-span-3 border-l-2 border-blue-400">
              <!-- name ,address,gst -->
              <div id="name" class="border-b-2 border-blue-400">
                <div class="ml-1">
                  <!-- <p>{{ data[i].supplierName }}</p> -->
                  <p>
                    {{
                      data[0][0].Supplier_Name === null
                        ? data[0][0].name
                        : data[0][0].Supplier_Name
                    }}
                  </p>
                  <!-- <p>hii</p> -->
                </div>
              </div>
              <div id="address" class="border-b-2 border-blue-400 h-16">
                <div class="ml-1">
                  <!-- <p>{{ data[i].supplierName }}:</p> -->
                  <p class="w-full text-left leading-tight tracking-wide">
                    {{
                      data[0][0].Supplier_Address === null
                        ? `${data[0][0].address1}${data[0][0].address2}`
                        : data[0][0].Supplier_Address
                    }}
                    <br />
                    {{
                      data[0][0].Supplier_City === null
                        ? data[0][0].city
                        : data[0][0].Supplier_City
                    }}
                    -
                    {{
                      data[0][0].Supplier_Pincode === null
                        ? data[0][0].pincode
                        : data[0][0].Supplier_Pincode
                    }}
                    <br />
                    {{
                      data[0][0].Supplier_State === null
                        ? data[0][0].state
                        : data[0][0].Supplier_State
                    }}
                  </p>
                </div>
              </div>
              <div id="gst" class="mt-1">
                <div class="ml-1">
                  <!-- <p>{{ data[i].supplierName }}:</p> -->
                  <p>
                    {{
                      data[0][0].Supplier_GST === null
                        ? data[0][0].gstin
                        : data[0][0].Supplier_GST
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="general2-1"
            class="text-left col-span-2 grid grid-flow-col text-xs"
          >
            <div
              class="text-xs font-bold"
              v-if="
                data[0][0].Gate_Pass === 'Non-returnable' ||
                data[0][0].Gate_Pass === 'samplegatepass'
              "
            >
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2">Delivery challan:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2">Date:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2">Transport mode:</p>
              </div>
              <div class="border-b-2 border-blue-400 text-right">
                <p class="mr-2 text-xs">Transport Company:</p>
              </div>
              <div class="border-b-2 border-blue-400 text-right">
                <p class="text-right mr-2">Vehicle #:</p>
              </div>
              <div>
                <p class="text-right mr-2">Cust. DC# and DATE:</p>
              </div>
            </div>
            <div
              class="text-xs font-bold"
              v-if="data[0][0].Gate_Pass === 'Returnable'"
            >
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2 text-xs">Delivery challan:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2 text-xs">Date:</p>
              </div>
              <div class="border-b-2 border-blue-400">
                <p class="text-right mr-2 text-xs">Transport mode:</p>
              </div>
              <div class="border-b-2 border-blue-400 text-right">
                <p class="mr-2 text-xs">Transport Company:</p>
              </div>
              <div class="">
                <p class="text-right mr-2 text-xs">Vehicle #:</p>
              </div>
            </div>
            <div
              id="general2-2"
              class="text-left border-l-2 border-blue-400 text-xs"
              v-if="
                data[0][0].Gate_Pass === 'Non-returnable' ||
                data[0][0].Gate_Pass === 'samplegatepass'
              "
            >
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1 &&
                  data[0][0].dcNumber.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].RGP_Id }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400'
                    : 'border-b-2 border-blue-400 h-6',
                ]"
              >
                <p>{{ data[0][0].RGP_Date.slice(0, 11) }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Mode.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].Transport_Mode }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].Transport_Company }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Vehicle_No.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'h-6',
                ]"
              >
                <p>{{ data[0][0].Vehicle_No }}</p>
              </div>
              <div>
                <p>{{ data[0][0].dcNumber }}</p>
              </div>
            </div>
            <div
              id="general2-2"
              class="text-left border-l-2 border-blue-400 text-xs"
              v-if="data[0][0].Gate_Pass === 'Returnable'"
            >
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400 '
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].RGP_Id }}</p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400'
                    : 'border-b-2 border-blue-400 h-6',
                ]"
              >
                <p>
                  {{
                    data[0][0].RGP_Date.slice(8, 10) +
                    "/" +
                    data[0][0].RGP_Date.slice(5, 7) +
                    "/" +
                    data[0][0].RGP_Date.slice(0, 4)
                  }}
                </p>
              </div>
              <div
                :class="[
                  data[0][0].Transport_Company.length >= 1
                    ? 'border-b-2 border-blue-400'
                    : 'border-b-2 border-blue-400 h-8',
                ]"
              >
                <p>{{ data[0][0].Transport_Mode }}</p>
              </div>
              <div class="border-b-2 border-blue-400 h-7">
                <p>{{ data[0][0].Transport_Company }}</p>
              </div>
              <div class="">
                <p>{{ data[0][0].Vehicle_No }}</p>
              </div>
            </div>
          </div>

          <div id="general3" class="col-start-1 col-end-7">
            <div class="border-b-2 border-blue-400 border-t-2">
              <p>
                Please receive the following articles in good order and return
                the attached copy duly signed for our record
              </p>
            </div>
          </div>
        </div>
        <div id="table" class="text-sm">
          <!-- table Headings -->
          <div class="overflow-x-auto">
            <table class="table-compact w-full table">
              <thead>
                <tr>
                  <th class="border-r-2 border-blue-400 px-0 text-2xs">Sno</th>
                  <th class="border-r-2 border-blue-400 px-12 text-2xs">
                    Product Description
                  </th>
                  <th
                    class="border-r-2 border-blue-400 px-0 text-2xs"
                    v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                  >
                    Range
                  </th>
                  <th class="border-r-2 border-blue-400 text-2xs">Unit</th>
                  <th class="border-r-2 border-blue-400 text-2xs">Qty</th>
                  <th class="border-r-2 border-blue-400 text-2xs">Approximate<br/>value</th>
                </tr>
              </thead>
              <tbody class="border-t-2 border-b-2 border-blue-400">
                <tr
                  v-for="(d, i) in data[1].length > 12
                    ? data[1].slice(0, 12)
                    : data[1]"
                  :key="i"
                >
                  <td class="border-r-2 border-blue-400">
                    {{ i + 1 }}
                  </td>

                  <td class="border-r-2 border-blue-400 text-xs">
                    <!-- {{ d.Description }} -->
                    <span v-if="d.Description.length >= 50">
                      <span>
                        {{ d.Description.slice(0, 20) }} <br />
                        <span>{{
                          d.Description.slice(21, d.Description.length)
                        }}</span>
                        <span
                          v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                          >- {{ d.serialno }}
                          <span
                            v-if="
                              data[0][0].Gate_Pass !== 'Returnable' &&
                              depCode === 10 &&
                              data[0][0].receiptNo !== ''
                            "
                          >
                          <!-- - {{ d.CaliStatus }} --></span
                          ></span
                        >
                      </span>
                    </span>
                    <span v-else>
                      {{ d.Description }}
                      <span v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                        >- {{ d.serialno }}
                        <span
                          v-if="
                           // data[0][0].Gate_Pass !== 'Returnable' &&
                            depCode === 10 &&
                            data[0][0].receiptNo !== ''
                          "
                        >
                    <!--      - {{ d.CaliStatus }} --></span
                        ></span
                      >
                    </span>
                  </td>
                  <td
                    class="border-r-2 border-blue-400"
                    v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                  >
                    {{ d.range }}
                  </td>
                  <td class="border-r-2 border-blue-400">
                    {{ d.UOM }}
                  </td>
                  <td class="border-r-2 border-blue-400">
                    {{ d.Quantity }}
                  </td>
                  <td class="border-r-2 border-blue-400">
                    {{
                      data[0][0].Gate_Pass === "samplegatepass"
                        ? ""
                        : `&#8377;`
                    }}{{ d.amount }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="border-2 border-blue-400 mt-52">
        <div class="overflow-x-auto">
        <table
          :class="[
            data[1].length > 12 ? 'table-compact w-full table' : 'hidden',
          ]"
        >
          <thead>
            <tr>
              <th class="border-r-2 border-blue-400 px-0 text-2xs">Sno</th>
              <th class="border-r-2 border-blue-400 px-12 text-2xs">
                Product Description
              </th>
              <th
                class="border-r-2 border-blue-400 px-0 text-2xs"
                v-if="depCode === 10 && data[0][0].receiptNo !== ''"
              >
                Range
              </th>
              <th class="border-r-2 border-blue-400 text-2xs">Unit</th>
              <th class="border-r-2 border-blue-400 text-2xs">Qty</th>
              <th class="border-r-2 border-blue-400 text-2xs">Approximate<br/>value</th>
            </tr>
          </thead>
          <tbody class="border-t-2 border-b-2 border-blue-400">
            <tr v-for="(d, i) in data[1].slice(12, data[1].length)" :key="i">
              <td class="border-r-2 border-blue-400">
                {{ 12 + (i + 1) }}
              </td>

              <td class="border-r-2 border-blue-400 text-xs">
                <!-- {{ d.Description }} -->
                <span v-if="d.Description.length >= 50">
                  <span>
                    {{ d.Description.slice(0, 20) }} <br />
                    <span>{{
                      d.Description.slice(21, d.Description.length)
                    }}</span>
                    <span v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                      >- {{ d.serialno }}
                      <span
                        v-if="
                          data[0][0].Gate_Pass !== 'Returnable' &&
                          depCode === 10 &&
                          data[0][0].receiptNo !== ''
                        "
                      >
                    <!--   - {{ d.CaliStatus }} --></span
                      ></span
                    >
                  </span>
                </span>
                <span v-else>
                  {{ d.Description }}
                  <span v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                    >- {{ d.serialno }}
                    <span
                      v-if="
                        //data[0][0].Gate_Pass !== 'Returnable' &&
                        depCode === 10 &&
                        data[0][0].receiptNo !== ''
                      "
                    >
                 <!--     - {{ d.CaliStatus }} --></span
                    ></span
                  >
                </span>
              </td>
               <td
                    class="border-r-2 border-blue-400"
                    v-if="depCode === 10 && data[0][0].receiptNo !== ''"
                  >
                    {{ d.range }}
                  </td>
              <td class="border-r-2 border-blue-400">
                {{ d.UOM }}
              </td>
              <td class="border-r-2 border-blue-400">
                {{ d.Quantity }}
              </td>
              <td class="border-r-2 border-blue-400">
                {{ data[0][0].Gate_Pass === "samplegatepass" ? "" : `&#8377;`
                }}{{ d.amount }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="border-blue-400 text-sm ml-16 border-l-2"
          v-if="data[0][0].remarks !== ''"
        >
          <p class="text-xs">Note :{{ data[0][0].remarks }}</p>
        </div>
        <div
          :class="[
            data[0][0].remarks !== ''
              ? 'border-b-2 border-t-2 border-blue-400 text-left text-sm'
              : 'border-b-2 border-blue-400 text-left text-sm',
          ]"
        >
          <p class="ml-16">Purpose: {{ data[0][0].Purpose }}</p>
        </div>
        <div class="grid grid-cols-3 grid-rows-5 h-36">
          <div
            class="col-start-1 col-end-4 row-start-1 row-end-6 border-r-2 border-blue-400 p-2"
          >
            <p class="text-sm">
              Terms and Conditions :
              <br />
              # No claims will be admitted by us for any loss or damage in
              transit.
              <br />
              # Subject to Coimbatore Jurisdiction
            </p>
          </div>
             <div class="col-start-4 p-2 text-sm">
            <p>For The South India Textile Research Association</p>
            <br />
           <div v-if="depCode === 10">
            <img src="../assets/e-sign.jpg" class="h-10 w-75 mx-auto" />
             <p class="text-center">(E-Sign)</p>
          </div>
            <div v-else>
            <br />
            <br />
          </div> 
            <p class="text-center">Authorised Signatory</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity";
import usePdf from "../composable/usePdf.js";

export default {
  name: "pdf",
  props: ["id", "depCode"],
  setup() {
    const { data } = usePdf();
    let gatepass;

    let printclick = ref(false);

    gatepass = `http://192.168.1.9/departmentportalapitestreceipt/index.php/api/qrData?id=${data.value[0][0].RGP_Id}`;

    const print = () => {
      printclick.value = true;
      window.print();
    };

    return {
      print,
      data,
      gatepass,
      printclick,
    };
  },
};
</script>

<style scoped>
thead th {
  background: none;
  font-size: 14px;
}

@media print {
  .noprint {
    visibility: hidden;
  }
}
</style>
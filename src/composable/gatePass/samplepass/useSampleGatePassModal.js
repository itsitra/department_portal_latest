import axios from "axios";
import { ref } from "vue";
import gatePassTable from "./useSampleGatePassTable";
import gatePassPaginate from "./useSampleGatePassPaginate";

const { getData } = gatePassPaginate();
const { lineEntry, linedata } = gatePassTable();
const lineEntries = ref([]);
const gatePass = ref("Gate Pass");
const staffName = ref("Staff Name");
const supplierName = ref("Supplier Name");
const transportMode = ref("");
const transportCompany = ref("");
const vechileNo = ref("");
const noOfItems = ref(Number(0));
const purpose = ref("");
const approximateCost = ref(Number(0));
const description = ref("");
const unit = ref("");
const quantity = ref(Number(0));
const modalLoad = ref(false);
const totalapproximateCost = ref(Number());
const remarks = ref("");
const lineEdit = ref(true);
const userCheck = ref(false);
const cust = ref([]);
const query = ref("");
const inwardno = ref([]);
const inwardSelected = ref(null);
let queryLoading = ref(false);
const custSelected = ref(null);
const edit = ref(false);
const dcnumber = ref("");
const units = ref([
  "BAG",
  "BAL",
  "BDL",
  "BKL",
  "BOU",
  "BOX",
  "BTL",
  "BUN",
  "CAN",
  "CBM",
  "CCM",
  "CMS",
  "CTN",
  "DOZ",
  "DRM",
  "GGK",
  "GMS",
  "GRS",
  "GYD",
  "KGS",
  "KLR",
  "KME",
  "LTR",
  "MLT",
  "MTR",
  "MTS",
  "NOS",
  "OTH",
  "PAC",
  "PCS",
  "PRS",
  "QTL",
  "ROL",
  "SET",
  "SQF",
  "SQM",
  "SQY",
  "TBS",
  "TGM",
  "THD",
  "TON",
  "TUB",
  "UGS",
  "UNT",
  "YDS",
]);
const suppliers = ref([]);

const staffs = ref([]);

const date = new Date();

let rgpId = ref("");

const closeEditModal = () => {
  edit.value = !edit.value;
};

const showEditModal = (e) => {
  noOfItems.value = [];
  modalLoad.value = true;
  // console.log(modalLoad.value);
  edit.value = !edit.value;
  let a = [e];
  // console.log(a);
  rgpId.value = a[0].rgpId;
  lineEntry(a[0].rgpId);
  gatePass.value = a[0].gatePass;
  staffName.value = a[0].staffCode;
  supplierName.value = a[0].supplierCode;
  transportMode.value = a[0].transportMode;
  transportCompany.value = a[0].transportCompany;
  vechileNo.value = a[0].vehicleNo;
  noOfItems.value = Number(a[0].noOfItems);
  purpose.value = a[0].purpose;
  totalapproximateCost.value = a[0].appCost;
  remarks.value = a[0].remarks;
  dcnumber.value = a[0].dcNumber;
  userCheck.value = a[0].typeuser === "customer" ? true : false;

  if (a[0].typeuser === "customer") {
    getCustData(a[0].name);
  }

  setTimeout(() => {
    linedata.value.forEach((d) => {
      d["rgpId"] = a[0].rgpId;
      lineEntries.value.push(d);
      // console.log(d);
    });
    modalLoad.value = false;
  }, 10500);
};

const updateModal = (data) => {
  let jdata = JSON.stringify(data);
  // console.log(jdata);
  axios
    .put(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/updateRetGpHeader`,
      jdata
    )
    .then(() => {
      getData(1);
    })
    .catch((err) => alert(err));
};

const deleteLine = (sno, i) => {
  axios
    .put(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/deleteLine?sno=${sno}`
    )
    .then((res) => {
      if (res.data === "true") {
        deleteData(i);
      } else {
        alert("Error Deleting Data, try Again Later");
      }
    })
    .catch((err) => alert(err));
};

const getSupplierData = () => {
  // console.log("get supplier");
  axios
    .get(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectSupplier`
    )
    .then((res) => {
      if (res.status == 200) {
        // console.log(suppliers.value.length <= 0);
        if (suppliers.value.length <= 0) {
          res.data.forEach((d) => {
            suppliers.value.push(d);
          });
        }
      }
      // console.log(suppliers.value);
    });
};

const getStaffsData = (d) => {
  // console.log("getStaff");
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectStaff`,
      d
    )
    .then((res) => {
      if (res.status == 200) {
        res.data.forEach((d) => {
          staffs.value.push(d);
        });
      }
      // console.log(staffs.value)
    });
};

const getCustData = (q) => {
  queryLoading.value = true;
  cust.value = [];
  axios
    .get(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/limsCustomer?search=${q}`
    )
    .then((res) => {
      if (res.status == 200) {
        if (res.data === "false") {
          alert("No Customer Data");
          queryLoading.value = false;
        } else {
          res.data.forEach((d) => {
            cust.value.push(d);
          });

          queryLoading.value = false;
        }
      }
    });
};

const getInward = (i) => {
  queryLoading.value = true;
  inwardno.value = [];
  axios
    .get(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/getInward?inwardno=${i}`
    )
    .then((res) => {
      if (res.status == 200) {
        if (res.data === "false") {
          alert("No Inward Data");
          queryLoading.value = false;
        } else {
          res.data.forEach((d) => {
            inwardno.value.push(d);
          });

          queryLoading.value = false;
        }
      }
    });
};

const getNoofSample = (i) => {
  quantity.value = inwardno.value[i].noofsamples;
};
const addLineEntry = () => {
  if (unit.value.length === 0) {
    alert("Enter Data other than NoData");
  } else {
    if (noOfItems.value == 0) {
      noOfItems.value += 1;
    } else {
      noOfItems.value = noOfItems.value + 1;
    }
    if (totalapproximateCost.value === 0) {
      totalapproximateCost.value = approximateCost.value;
    } else if (totalapproximateCost.value !== 0) {
      totalapproximateCost.value =
        Number(totalapproximateCost.value) + approximateCost.value;
    }
    lineEntries.value.push({
      unit: unit.value,
      description: description.value,
      quantity: quantity.value,
      amount: approximateCost.value,
    });
    cleanLineData();
  }
};

const cleanLineData = () => {
  (unit.value = ""),
    (description.value = ""),
    (quantity.value = 0),
    (approximateCost.value = 0);
};

const cleanData = () => {
  (staffName.value = ""),
    (supplierName.value = ""),
    (transportMode.value = ""),
    (transportCompany.value = ""),
    (vechileNo.value = ""),
    (noOfItems.value = 0),
    (purpose.value = ""),
    (approximateCost.value = 0);
  query.value = "";
};

const deleteData = (i) => {
  if (noOfItems.value == 0) {
    noOfItems.value -= 1;
    totalapproximateCost.value =
      totalapproximateCost.value - totalapproximateCost.value;
  } else {
    noOfItems.value = noOfItems.value - 1;
    totalapproximateCost.value =
      totalapproximateCost.value - lineEntries.value[i].amount;
  }
  if (lineEntries.value.length === 1) {
    alert(
      "Note: There Must be One item in Order to Save or Update the Gate pass"
    );
    lineEntries.value.splice(i, 1);
  }
  lineEntries.value.splice(i, 1);
};

const lineEditOpt = () => {
  lineEdit.value = !lineEdit.value;
};
const lineEditChangeAmount = (i) => {
  if (lineEntries.value.length === 1) {
    totalapproximateCost.value = lineEntries.value[i].amount;
  } else if (lineEntries.value.length !== 1) {
    let sum = 0;

    lineEntries.value.forEach((item) => {
      sum += item.amount;
    });

    totalapproximateCost.value = sum;
  }
};

const gatePassModal = () => {
  return {
    totalapproximateCost,
    addLineEntry,
    deleteData,
    lineEntries,
    staffName,
    transportMode,
    transportCompany,
    vechileNo,
    noOfItems,
    purpose,
    approximateCost,
    supplierName,
    description,
    unit,
    gatePass,
    quantity,
    date,
    cleanData,
    getSupplierData,
    suppliers,
    getStaffsData,
    staffs,
    edit,
    showEditModal,
    closeEditModal,
    updateModal,
    rgpId,
    modalLoad,
    remarks,
    deleteLine,
    lineEdit,
    lineEditOpt,
    userCheck,
    lineEditChangeAmount,
    getCustData,
    cust,
    query,
    queryLoading,
    custSelected,
    dcnumber,
    units,
    inwardSelected,
    inwardno,
    getInward,
    getNoofSample,
  };
};

export default gatePassModal;

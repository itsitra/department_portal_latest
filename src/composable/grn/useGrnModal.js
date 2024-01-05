import axios from "axios";
import { ref } from "vue";
import useGrnTable from "./useGrnTable";

const { getData } = useGrnTable();

// let date = new Date();
// eslint-disable-next-line no-useless-escape
// console.log(date.toISOString().slice(0, 10).replace(/\-/g, "/"));
const grnDate = ref("");
const Price = ref("");
const supplierName = ref("");
const name = ref("");
const itemCode = ref("");
const description = ref("");
const batchNo = ref("");
const expiryDate = ref("");
const quantity = ref("");
const lineEntries = ref([]);
const suppliers = ref([]);
const expiryDateCheck = ref("");
const itemId = ref("");
const valueNeed = ref(false);
const grnno = ref([]);
const grn = ref("");
const itemDataGrn = ref([]);

const getDes = (i) => {
  // console.log(itemDataGrn.value[i].GrnDate);
  valueNeed.value =
    itemDataGrn.value[i].Expiry_Date_Check == "Y" ? false : true;
  itemId.value = itemDataGrn.value[i].Item_id;
  Price.value = itemDataGrn.value[i].Price;
  description.value = itemDataGrn.value[i].Item_Description;
  grnDate.value = itemDataGrn.value[i].GrnDate;
  supplierName.value = itemDataGrn.value[i].Supplier_Code;
  name.value = itemDataGrn.value[i].Supplier_Name;
  expiryDateCheck.value = itemDataGrn.value[i].Expiry_Date_Check;
  // quantity.value = itemDataGrn.value[i].GrnQty;
};

const getSupplierData = () => {
  // console.log("get supplier");
  axios
    .get(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectSupplier`
    )
    .then((res) => {
      if (res.data) {
        res.data.forEach((d) => {
          suppliers.value.push(d);
        });
      }
      // console.log(suppliers.value);
    });
};

const getGrnNo = () => {
  // console.log("get supplier");
  grnno.value = [];
  axios
    .get(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectGrnNo`
    )
    .then((res) => {
      if (res.data) {
        res.data.forEach((d) => {
          grnno.value.push(d);
        });
      }
      // console.log(suppliers.value);
    })
    .catch((err) => {
      alert(err);
    });
};
// const getGrnItembyid = (d) => {
//   itemDataGrn.value = [];
//   axios
//     .post(
//       ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectGrnItems`,
//       JSON.stringify({
//         grnId: d,
//       })
//     )
//     .then((res) => {
//       if (res.data != []) {
//         res.data.forEach((d) => {
//           itemDataGrn.value.push(d);
//         });
//       }
//     })
//     .catch((err) => {
//       alert(err);
//     });
// };

const getGrnItem = (d) => {
  itemDataGrn.value = [];
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectGrnItems`,
      JSON.stringify({
        grnId: d,
      })
    )
    .then((res) => {
      if (res.data != []) {
        res.data.forEach((d) => {
          itemDataGrn.value.push(d);
        });
      }
    })
    .catch((err) => {
      alert(err);
    });
};
const cleanLineData = () => {
  itemCode.value = "";
  description.value = "";
  quantity.value = "";
  batchNo.value = "";
  expiryDate.value = "";
  expiryDateCheck.value = "";
  itemId.value = "";
};
const addLineEntry = () => {
  lineEntries.value.push({
    itemId: itemId.value,
    itemCode: itemCode.value,
    Price: Price.value,
    description: description.value,
    quantity: quantity.value,
    batchNo: batchNo.value,
    expiryDate: expiryDate.value,
    expiryDateChecked: expiryDateCheck.value,
  });

  // console.log(expiryDateCheck.value);
  // console.log(lineEntries.value);
  cleanLineData();
};

const deleteData = (i) => {
  lineEntries.value.splice(--i, 1);
};

const saveData = (d) => {
  let jdata = JSON.stringify(d);
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertGrnDetails`,
      jdata
    )
    .then((res) => {
      if (res.status == 200) {
        getData(1);
        // console.log(tableData.value);
      }
    })
    .catch((err) => alert(err));
};

const useModal = () => {
  return {
    grnDate,
    supplierName,
    name,
    itemCode,
    Price,
    description,
    batchNo,
    expiryDate,
    quantity,
    suppliers,
    getSupplierData,
    addLineEntry,
    lineEntries,
    deleteData,
    saveData,
    expiryDateCheck,
    itemId,
    getDes,
    valueNeed,
    getGrnNo,
    grnno,
    grn,
    getGrnItem,
    itemDataGrn,
  };
};

export default useModal;

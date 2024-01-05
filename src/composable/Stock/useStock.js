import axios from "axios";
import { ref } from "vue";
import consumption from "../consumption/useConsumption";
import useStockTable from "../Stock/useStockTable.js";

const { itemData } = consumption();
const { getData } = useStockTable();
let modal = ref(false);
const openModal = () => (modal.value = !modal.value);
const closeModal = () => (modal.value = !modal.value);

const tableData = ref([]);
const depData = ref([]);
const itemCode = ref("");
const description = ref("");
const batchno = ref("");
const expDate = ref("");
const quantity = ref(Number(""));
const fromDep = ref("");
const toDep = ref("");
const itemId = ref("");
const saveData = (d) => {
  let jdata = JSON.stringify(d);
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertTransfers`,
      jdata
    )
    .then((res) => {
      if (res.data) {
        getData(1);
      }
    })
    .catch((err) => alert(err));
};

const getTotal = (i) => {
  // console.log(itemData.value[i]);
  description.value = itemData.value[i].itemDescription;
  itemCode.value = itemData.value[i].itemCode;
  batchno.value = itemData.value[i].batchNo;
  expDate.value = itemData.value[i].expiryDate;
  itemId.value = itemData.value[i].itemId;
};

const stock = () => {
  return {
    modal,
    openModal,
    closeModal,
    saveData,
    tableData,
    depData,
    itemCode,
    description,
    batchno,
    expDate,
    quantity,
    fromDep,
    toDep,
    getTotal,
    itemId,
  };
};
export default stock;

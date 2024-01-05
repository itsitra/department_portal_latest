import axios from "axios";
import { ref } from "vue";

const consumptionData = ref([]);
const currentState = ref(1);
let pages = ref([]);
let pageno = ref();
let loading = ref(false);
let description = ref("");
let batchNo = ref("");
let expDate = ref("");
let quantity = ref("");
let itemCode = ref("");
let itemId = ref(Number(""));

const itemData = ref([]);
const state = (pageNumber) => {
  currentState.value = pageNumber;
  getData(currentState.value);
};

const prev = () => {
  currentState.value--;
};
const next = () => {
  currentState.value++;
};

const numbersForPage = () => {
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
  });
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/consumptionDataCount`,
      jdata
    )
    .then((res) => {
      // console.log(res.data);
      for (let i = 0; i < res.data; i++) {
        pages.value.push(i + 1);
      }
      // console.log(pages.value);
      loading.value = false;
    })
    .catch((err) => alert(err));
};
numbersForPage();

const getData = async (pageNo) => {
  loading.value = true;

  const d = JSON.stringify({
    pageNo: pageNo,
    departmentCode: sessionStorage.getItem("depCode"),
  });
  pageno.value = pageNo;
  // console.log("clicked", pageNo);
  await axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/consumptionPagination`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      loading.value = false;
      if (res.data.length != 0) {
        if (
          consumptionData.value.length >= res.data.length ||
          consumptionData.value.length <= res.data.length
        ) {
          // console.log("1st if");
          consumptionData.value.splice(0, 10);
          res.data.forEach((e) => {
            consumptionData.value.push(e);
            // console.log(e)
          });
          // console.log(consumptionData.value);
        }
      }
    })
    .catch((err) => alert(err));
};

const getTotal = (i) => {
  description.value = itemData.value[i].itemDescription;
  batchNo.value = itemData.value[i].batchNo;
  expDate.value = itemData.value[i].expiryDate;
  itemId.value = itemData.value[i].itemId;
};

const getItemData = () => {
  itemData.value = [];
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
  });
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectCurrent`,
      jdata
    )
    .then((res) => {
      res.data.filter((e) => {
        if (e.itemCode) {
          itemData.value.push(e);
        }
      });
    })
    .catch((err) => alert(err));
};

let modal = ref(false);
const openModal = () => (modal.value = !modal.value);
const closeModal = () => (modal.value = !modal.value);

const saveData = (d) => {
  // console.log(d);
  let jadta = JSON.stringify(d);
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertConsumption`,
      jadta
    )
    .then((res) => {
      if (res.status == 200) {
        closeModal();
      }
      // console.log(res);
    })
    .catch((err) => alert(err));
};

const consumption = () => {
  return {
    modal,
    openModal,
    closeModal,
    getData,
    next,
    pageno,
    pages,
    prev,
    state,
    currentState,
    consumptionData,
    loading,
    getItemData,
    itemData,
    getTotal,
    expDate,
    quantity,
    description,
    batchNo,
    itemCode,
    saveData,
    itemId,
  };
};
export default consumption;

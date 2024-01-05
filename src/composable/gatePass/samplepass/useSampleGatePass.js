import axios from "axios";
import { ref } from "vue";
import gatePassPaginate from "./useSampleGatePassPaginate";

const { getData, loading } = gatePassPaginate();
let showModal = ref(false);

const saveData = (d) => {
  loading.value = true;
  // console.log(d);
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertGatePass",
    method: "POST",
    headers: headersList,
    data: d,
  };
  axios.request(reqOptions).then(function (response) {
    if (response.status == 200) {
      getData(1);
    }
    // console.log(response.data);
  });
};

const deleteData = (i) => {
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: "  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/deleteGatePass",
    method: "POST",
    headers: headersList,
    data: JSON.stringify({
      rgpId: i,
    }),
  };
  axios.request(reqOptions).then(function (response) {
    if (response.status == 200) {
      getData(1);
    }
  });
  // console.log("delete fun");
};

const openModal = () => (showModal.value = !showModal.value);
const closeModal = () => (showModal.value = !showModal.value);

const gatePass = () => {
  return { saveData, showModal, deleteData, openModal, closeModal };
};

export default gatePass;

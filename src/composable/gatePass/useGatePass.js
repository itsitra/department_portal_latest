import axios from "axios";
import { ref } from "vue";
import gatePassPaginate from "./useGatePassPaginate";

const { getData, loading } = gatePassPaginate();
let showModal = ref(false);
const searchData = ref({
  dep: " ",
  sname: " ",
  type: " ",
  fromdate: "",
  todate: "",
});
let serachloading = ref(false);

let reportdata = ref([]);

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

const serachReport = () => {
  if (searchData.value.fromdate !== "" && searchData.value.todate !== "") {
    serachloading.value = true;
    reportdata.value = [];
    if (searchData.value !== "") {
      if (searchData.value.type === "R") {
        searchData.value.type = "Returnable";
      } else if (searchData.value.type === "NR") {
        searchData.value.type = "Non-returnable";
      }
      let jdata = JSON.stringify({
        search: searchData.value,
      });
      axios
        .post(
          ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/GatepassExport`,
          jdata
        )
        .then((res) => {
          // console.log("1st if");

          res.data.forEach((i) => {
            reportdata.value.push(i);
          });
          serachloading.value = false;
          // console.log(gatePassData.value);

          searchData.value = {
            dep: " ",
            sname: " ",
            type: " ",
            fromdate: "",
            todate: "",
          };
        })
        .catch((err) => {
          serachloading.value = false;
          alert(err);
        });
    }
  } else {
    alert("From Date and To Date is Mandatory");
    serachloading.value = false;
  }
};

const openModal = () => (showModal.value = !showModal.value);
const closeModal = () => (showModal.value = !showModal.value);

const gatePass = () => {
  return {
    saveData,
    showModal,
    deleteData,
    openModal,
    closeModal,
    searchData,
    serachReport,
    reportdata,
    serachloading,
  };
};

export default gatePass;

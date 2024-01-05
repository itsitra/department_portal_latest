import axios from "axios";
import { ref } from "vue";

let grnView = ref(false);
let dataThere = ref(false);
const tableData = ref([]);

const currentState = ref(1);
let pages = ref([]);
let pageno = ref();
let loading = ref(false);

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
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/grnDataCount`,
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
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/grnPagination`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      loading.value = false;
      if (res.data.length != 0) {
        if (
          tableData.value.length >= res.data.length ||
          tableData.value.length <= res.data.length
        ) {
          // console.log("1st if");
          tableData.value.splice(0, 10);
          res.data.forEach((e) => {
            tableData.value.push(e);
            // console.log(e)
          });
          // console.log(tableData.value);
        }
      }
    })
    .catch((err) => alert(err));
};
const grnDataList = ref([]);
// const getData = () => {
//   axios
//     .post(`  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectGrnDetails`, {
//       departmentCode: sessionStorage.getItem("depCode"),
//     })
//     .then((res) => {
//       if (tableData.value.length == res.data.length) {
//         console.log("returned");
//         return tableData.value;
//       } else {
//         // console.log(res.data);
//         res.data.forEach((e) => {
//           tableData.value.push(e);
//         });
//       }
//     })
//     .catch((err) => alert(err));
// };
const showGrnView = (d) => {
  // console.log(grnDataList.value);

  dataThere.value = true;
  grnView.value = !grnView.value;
  let j = JSON.stringify({
    grnId: d,
  });
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectGrnItems`,
      j
    )
    .then((res) => {
      res.data.forEach((e) => {
        grnDataList.value.push(e);
      });
      // console.log(res);
      // console.log(grnDataList.value);

      dataThere.value = false;
    })
    .catch((err) => alert(err));
};

const closeGrnView = () => {
  grnView.value = !grnView.value;
  grnDataList.value = [];
  // console.log(grnDataList.value);
};

const useGrnTable = () => {
  return {
    getData,
    showGrnView,
    closeGrnView,
    tableData,
    grnView,
    dataThere,
    grnDataList,
    state,
    prev,
    next,
    pageno,
    pages,
    loading,
    currentState,
  };
};

export default useGrnTable;

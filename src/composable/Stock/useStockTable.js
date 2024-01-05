import axios from "axios";
import { ref } from "vue";

const currentState = ref(1);
let pages = ref([]);
let pageno = ref();
let loading = ref(false);
const stockData = ref([]);
const depName = ref([]);
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
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/transferDataCount`,
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
    depCode: sessionStorage.getItem("depCode"),
  });
  pageno.value = pageNo;
  // console.log("clicked", pageNo);
  await axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/transferPagination`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      loading.value = false;
      if (res.data.length != 0) {
        if (
          stockData.value.length >= res.data.data.length ||
          stockData.value.length <= res.data.data.length
        ) {
          stockData.value.splice(0, 10);
          // console.log(res.data[0]);
          res.data.dep.forEach((e) => {
            depName.value.push(e);
          });
          res.data.data.forEach((e) => {
            stockData.value.push(e);
          });
          stockData.value.forEach((e, i) => {
            if (e.fromDeptCode && e.toDeptCode) {
              res.data.dep.filter((w) => w.departmentCode === e.fromDeptCode);

              res.data.dep.filter((w) => {
                if (w.departmentCode === e.fromDeptCode) {
                  stockData.value[i]["fromName"] = w.departmentName;
                }
              });

              res.data.dep.filter((w) => {
                if (w.departmentCode === e.toDeptCode) {
                  stockData.value[i]["toName"] = w.departmentName;
                }
              });
              // console.log(dT);
            }
          });

          // console.log(stockData.value);
          // console.log(depName.value);
        }
      }
    })
    .catch((err) => alert(err));
};

const useStockTable = () => {
  return {
    getData,
    pageno,
    pages,
    prev,
    next,
    state,
    currentState,
    loading,
    stockData,
    depName,
  };
};

export default useStockTable;

import axios from "axios";
import { ref } from "vue";

const tableData = ref([]);

let loading = ref(false);
let pageCount = ref(Number());
let page = ref([]);
let currentState = ref(1);

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

const getpageCount = () => {
  axios
    .post(
      `http://sitraonline.org.in/employementhubapi/index.php/api/GetDataCount`
    )
    .then((res) => {
      if (res.data.data) {
        pageCount.value = res.data.data;
        for (let i = 0; i < res.data.data; i++) {
          page.value.push(i + 1);
        }
      }
    })
    .catch((err) => {
      alert(err);
    });
};
getpageCount();
const getData = (d) => {
  let jdata = JSON.stringify({
    pageNo: d,
  });
  loading.value = true;
  axios
    .post(
      `http://sitraonline.org.in/employementhubapi/index.php/api/GetMillRequirement`,
      jdata
    )
    .then((res) => {
      if (res.data.data) {
        tableData.value.splice(0, 10);
        res.data.data.forEach((e) => {
          tableData.value.push(e);
        });
        loading.value = false;
      }
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
};
const millTable = () => {
  return {
    tableData,
    getData,
    loading,
    pageCount,
    currentState,
    page,
    state,
    prev,
    next,
  };
};
export default millTable;

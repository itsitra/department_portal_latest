import { ref } from "vue";
import axios from "axios";

const currentState = ref(1);
let pages = ref([]);
let pageno = ref();
let empTable = ref([]);
let loading = ref(false);

const empData = ref([]);
let changeD = ref([]);
let empD = ref(Number(0));
let empView = ref(false);

let dataThere = ref(true);

const changeData = (i) => {
  // console.log("clicked");
  empD.value = i;
  changeD.value = empData.value[i];
};

const showEmpView = (id) => {
  dataThere.value = false;
  empView.value = !empView.value;
  let jdata = JSON.stringify({
    Reg_id: id,
  });
  axios
    .post(
      `http://sitraonline.org.in/employementhubapi/index.php/api/totalEmpData`,
      jdata
    )
    .then((res) => {
      // console.log(res.data);
      if (empData.value.length == 5) {
        dataThere.value = true;
        empData.value = [];
        // console.log(empData.value);
      }
      res.data.forEach((e) => {
        empData.value.push(e);
      });
      // changeD.value.push(res.data[0]);
      dataThere.value = true;
      // console.log(empData.value);
      changeData(0);
    })
    .catch((err) => alert(err));
};

const closeEmpView = () => (empView.value = !empView.value);

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
  axios
    .post(
      `http://sitraonline.org.in/employementhubapi/index.php/api/totalPageCount`
    )
    .then((res) => {
      for (let i = 0; i < res.data; i++) {
        pages.value.push(i + 1);
      }
      loading.value = false;
    })
    .catch((err) => alert(err));
};
numbersForPage();

const getData = async (pageNo) => {
  loading.value = true;

  const d = JSON.stringify({
    pageNo: pageNo,
  });
  pageno.value = pageNo;
  // console.log("clicked", pageNo);
  await axios
    .post(
      `http://sitraonline.org.in/employementhubapi/index.php/api/totalPagination`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      loading.value = false;
      if (
        empTable.value.length >= res.data.length ||
        empTable.value.length <= res.data.length
      ) {
        empTable.value.splice(0, 10);
        res.data.forEach((e) => {
          empTable.value.push(e);
        });
      }
    })
    .catch((err) => alert(err));
};

const useEmp = () => {
  return {
    getData,
    empTable,
    state,
    prev,
    next,
    currentState,
    loading,
    pageno,
    pages,
    showEmpView,
    closeEmpView,
    empView,
    empData,
    changeData,
    changeD,
    empD,
    dataThere,
  };
};

export default useEmp;

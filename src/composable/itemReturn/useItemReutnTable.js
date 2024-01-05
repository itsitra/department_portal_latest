import axios from "axios";
import { ref } from "vue";

const rgpId = ref([]);
const department = ref([]);

let itemReturndata = ref([]);
let pages = ref([]);
let pageno = ref();

let loading = ref(false);

const currentState = ref(1);

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
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/getRetPageCount`,
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
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/getRetPage`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      loading.value = false;
      if (
        itemReturndata.value.length >= res.data.length ||
        itemReturndata.value.length <= res.data.length
      ) {
        itemReturndata.value.splice(0, 10);
        res.data.forEach((e) => {
          itemReturndata.value.push(e);
          // console.log(e)
        });
        // console.log(itemReturndata.value);
      }
    })
    .catch((err) => alert(err));
};

const itemTable = () => {
  return {
    rgpId,
    department,
    getData,
    itemReturndata,
    state,
    prev,
    next,
    currentState,
    loading,
    pageno,
    pages,
  };
};

export default itemTable;

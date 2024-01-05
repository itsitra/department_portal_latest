import axios from "axios";
import { ref } from "vue";
const currentState = ref(1);
let pages = ref([]);
let pageno = ref();
let loading = ref(false);
const itemdata = ref([]);
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
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/itemDataCount`,
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
  });
  pageno.value = pageNo;
  // console.log("clicked", pageNo);
  await axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/itemPagination`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      loading.value = false;
      if (res.data.length != 0) {
        if (
          itemdata.value.length >= res.data.length ||
          itemdata.value.length <= res.data.length
        ) {
          // console.log("1st if");
          itemdata.value.splice(0, 10);
          res.data.forEach((e) => {
            itemdata.value.push(e);
            // console.log(e)
          });
          // console.log(itemdata.value);
        }
      }
    })
    .catch((err) => alert(err));
};

const useItemTable = () => {
  return {
    getData,
    next,
    pageno,
    prev,
    state,
    currentState,
    pages,
    loading,
    itemdata,
  };
};

export default useItemTable;

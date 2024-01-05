import { ref } from "vue";
import axios from "axios";

let gatePassData = ref([]);

let pages = ref([]);

let pageno = ref();

let loading = ref(false);

const numbersForPage = () => {
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
    gatepass: "samplegatepass",
  });
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/gatePassDataCount`,
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
    gatepass: "samplegatepass",
  });
  pageno.value = pageNo;
  // console.log("clicked", pageNo);
  await axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/gatePassPagination`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      if (res.data != null) {
        gatePassData.value.splice(0, 10);
        res.data.forEach((i) => {
          gatePassData.value.push(i);
        });

        // console.log(gatePassData.value);
      }

      loading.value = false;
    })
    .catch((err) => alert(err));
};

const gatePassPaginate = () => {
  return {
    getData,
    gatePassData,
    pages,
    loading,
    pageno,
  };
};

export default gatePassPaginate;

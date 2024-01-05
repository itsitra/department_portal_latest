import { ref } from "vue";
import axios from "axios";

let supplierData = ref([]);
let pages = ref([]);
let pageno = ref(0);

let loading = ref(false);

const numbersForPage = () => {
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
  });
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/supplierDataCount`,
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
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/supplierPagination`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      if (
        supplierData.value.length >= res.data.length ||
        supplierData.value.length <= res.data.length
      ) {
        supplierData.value.splice(0, 10);
        res.data.forEach((i) => {
          supplierData.value.push(i);
        });

        // console.log(supplierData.value);
      }

      loading.value = false;
    })
    .catch((err) => alert(err));
};

const supplierPaginate = () => {
  return {
    getData,
    supplierData,
    pages,
    loading,
    pageno,
  };
};

export default supplierPaginate;

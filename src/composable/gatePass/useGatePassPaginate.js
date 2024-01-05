import { ref } from "vue";
import axios from "axios";

let gatePassData = ref([]);

let pages = ref([]);

let pageno = ref();

let loading = ref(false);

const serachData = ref({
  rgpId: "",
  depname: "",
  scname: "",
  typeuser: "",
  gatepass: "",
});

const numbersForPage = () => {
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
    gatepass: "gatepass",
  });
  axios
    .post(
      `   http://192.168.1.9/departmentportalapitestreceipt/index.php/api/gatePassDataCount`,
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
    gatepass: "gatepass",
  });
  pageno.value = pageNo;
  // console.log("clicked", pageNo);
  await axios
    .post(
      `   http://192.168.1.9/departmentportalapitestreceipt/index.php/api/gatePassPagination`,
      d
    )
    .then((res) => {
      //console.log(res.data);
      if (
        gatePassData.value.length >= res.data.length ||
        gatePassData.value.length <= res.data.length
      ) {
        // console.log("1st if");

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

const search = (data) => {
  if (serachData.value !== "") {
    if (serachData.value.gatepass === "R") {
      serachData.value.gatepass = "Returnable";
    } else if (serachData.value.gatepass === "NR") {
      serachData.value.gatepass = "Non-returnable";
    }
    let jdata = JSON.stringify({
      departmentCode: Number(sessionStorage.getItem("depCode")),
      gatepass: data.gatepass,
      search: serachData.value,
    });
    axios
      .post(
        ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/searchGatepass`,
        jdata
      )
      .then((res) => {
        gatePassData.value = [];
        if (
          gatePassData.value.length >= res.data.length ||
          gatePassData.value.length <= res.data.length
        ) {
          // console.log("1st if");

          res.data.forEach((i) => {
            gatePassData.value.push(i);
          });

          // console.log(gatePassData.value);
        }

        serachData.value = {
          rgpId: "",
          depname: "",
          scname: "",
          typeuser: "",
          gatepass: "",
        };
      })
      .catch((err) => alert(err));
  }
};
const gatePassPaginate = () => {
  return {
    getData,
    gatePassData,
    pages,
    loading,
    pageno,
    search,
    serachData,
  };
};

export default gatePassPaginate;

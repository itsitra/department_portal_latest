import { ref } from "vue";
import axios from "axios";

let conferenceData = ref([]);
let pages = ref([]);
let pageno = ref();

let loading = ref(false);

const numbersForPage = () => {
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
  });
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/conferenceDataCount`,
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
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/conference`,
      d
    )
    .then((res) => {
      // console.log(res.data);
      if (
        conferenceData.value.length >= res.data.length ||
        conferenceData.value.length <= res.data.length
      ) {
        conferenceData.value.splice(0, 10);
        if (res.data != []) {
          res.data.forEach((i) => {
            conferenceData.value.push(i);
          });
        } else {
          alert("No Data");
        }

        // console.log(conferenceData.value);
      }

      loading.value = false;
    })
    .catch((err) => alert(err));
};
// const currentState = ref(1);

// const state = (pageNumber) => {
//   currentState.value = pageNumber;
//   getData(currentState.value);
// };
// const prev = () => {
//   currentState.value--;
// };
// const next = () => {
//   currentState.value++;
// };

const ConferencePaginate = () => {
  return {
    getData,
    conferenceData,
    pages,
    loading,
    pageno,
    // state,
    // prev,
    // next,
    // currentState,
  };
};

export default ConferencePaginate;

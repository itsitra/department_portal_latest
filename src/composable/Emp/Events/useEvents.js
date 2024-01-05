import axios from "axios";
import { ref } from "vue";

let eventsData = ref([]);

let pages = ref([]);

let pageno = ref();

let loading = ref(false);

const numbersForPage = () => {
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
    // gatepass: "gatepass",
  });
  axios
    .post(
      `   http://192.168.1.9/departmentportalapitestreceipt/index.php/api/conferenceDataCount`,
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
    // gatepass: "gatepass",
  });
  pageno.value = pageNo;
  // console.log("clicked", pageNo);
  await axios
    .post(
      `   http://192.168.1.9/departmentportalapitestreceipt/index.php/api/conference`,
      d
    )
    .then((res) => {
      //console.log(res.data);
      if (
        eventsData.value.length >= res.data.length ||
        eventsData.value.length <= res.data.length
      ) {
        // console.log("1st if");

        eventsData.value.splice(0, 10);
        res.data.forEach((i) => {
          eventsData.value.push(i);
        });

        // console.log(eventsData.value);
      }

      loading.value = false;
    })
    .catch((err) => alert(err));
};
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
const useEvents = () => {
  return {
    getData,
    eventsData,
    pages,
    loading,
    pageno,
    state,
    currentState,
    prev,
    next,
  };
};

export default useEvents;

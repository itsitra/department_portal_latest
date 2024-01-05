const { ref } = require("vue");
import axios from "axios";
import gatePassPaginate from "./useSampleGatePassPaginate";

const view = ref(false);
const lineview = ref(false);
const linedata = ref([]);
const loadingt = ref(false);
const viewI = ref(Number());

const userCode = sessionStorage.getItem("userCode");
const hodCode = sessionStorage.getItem("hodCode");
const depCode = sessionStorage.getItem("depCode");
const showView = (i) => {
  view.value = !view.value;
  viewI.value = --i;
};

const { getData } = gatePassPaginate();
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
const sendStatus = (d) => {
  let jdata = JSON.stringify(d);
  // console.log(jdata);
  axios
    .put(
      `   http://192.168.1.9/departmentportalapitestreceipt/index.php/api/approval`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      if (res.status == 200) {
        getData(1);
      }
    })
    .catch((err) => alert(err));
};
const lineEntry = (d) => {
  const jdata = JSON.stringify({
    rgpId: Number(d),
  });
  // console.log(jdata);
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectRetGpLine`,
      jdata
    )
    .then((res) => {
      let count = linedata.value.length;

      loadingt.value = false;
      if (count < res.data.length) {
        linedata.value.splice(0, count);
        res.data.forEach((d) => {
          linedata.value.push(d);
        });
      } else {
        linedata.value.splice(0, count);
        res.data.forEach((d) => {
          linedata.value.push(d);
        });
        // console.log(linedata.value);
      }
    })
    .catch((err) => alert(err));
};

const lineView = (d) => {
  loadingt.value = true;
  lineview.value = !lineview.value;
  // console.log("line view clicked");
  lineEntry(d);
};

const hide = () => {
  lineview.value = !lineview.value;
  // console.log("clicked", lineview.value);
};

if (currentState.value == 1) {
  getData(currentState.value);
}
const gatePassTable = () => {
  return {
    view,
    viewI,
    showView,
    currentState,
    state,
    prev,
    next,
    lineEntry,
    lineView,
    lineview,
    hide,
    linedata,
    loadingt,
    sendStatus,
    userCode,
    hodCode,
    depCode,
  };
};

export default gatePassTable;

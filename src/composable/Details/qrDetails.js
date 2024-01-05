import axios from "axios";
import { ref } from "vue";

const gpNumber = ref("");
let camera = ref("auto");
const gpHeader = ref([]);
const gpLine = ref([]);
let scannerSucess = ref(false);

const loading = ref(false);

const qrdataView = ref(false);

const showViewQr = () => {
  qrdataView.value = true;
};

const closeQrView = () => {
  qrdataView.value = false;
  camera.value = "auto";
};

const decode = async (decodedString) => {
  let result = decodedString;
  gpHeader.value = [];
  gpLine.value = [];
  loading.value = true;
  if (result != "") {
    axios
      .get(result)
      .then((res) => {
        if (res.data) {
          gpHeader.value.push(...res.data[0]);
          gpLine.value.push(...res.data[1]);
        }
        loading.value = false;
        showViewQr();
      })
      .catch((err) => {
        alert(err);
        loading.value = false;
      });
    camera.value = "off";
  }
};

// const timeout = (ms) => {
//   return new Promise((resolve) => {
//     window.setTimeout(resolve, ms);
//   });
// };

const searchQr = () => {
  loading.value = true;
  gpHeader.value = [];
  gpLine.value = [];
  axios
    .get(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/qrData?id=${gpNumber.value}`
    )
    .then((res) => {
      if (res.data) {
        gpHeader.value.push(...res.data[0]);
        gpLine.value.push(...res.data[1]);
        loading.value = false;
        showViewQr();
      } else {
        loading.value = false;
        camera.value = "auto";
      }
    })
    .catch((err) => {
      alert(err);
      loading.value = false;
      camera.value = "auto";
    });
};

const qrDetails = () => {
  return {
    gpNumber,
    loading,
    decode,
    showViewQr,
    qrdataView,
    searchQr,
    camera,

    closeQrView,
    scannerSucess,
    gpHeader,
    gpLine,
  };
};

export default qrDetails;

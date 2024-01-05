import axios from "axios";
import { ref } from "vue";

let opData = ref([]);

const getOP = () => {
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_download_output/`
    )
    .then((res) => {
      // console.log(res.data);
      res.data.forEach((e) => {
        opData.value.push(e);
      });
      // console.log(opData.value);
    })
    .catch((err) => alert(err));
};
const uploadData = () => {
  // console.log("cliacke");
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/uploadExcel`
    )
    .then((res) => {
      // console.log(res);
      if (res.data == "") {
        getOP();
        runCalc();
      }
    })
    .catch((err) => alert(err));
};

const uploadFiles = (d) => {
  // console.log("clicked", d.fileno);
  sessionStorage.setItem(`file${d.fileno}`, d.fileno);

  let jdata = JSON.stringify(d);
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_textile_import`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      if (res.status == 200) {
        window.location.reload();
      }
    })
    .catch((err) => alert(err));
};
const runCalc = () => {
  // console.log("clicked");
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_import/`
    )
    .then((res) => console.log(res))
    .catch((err) => alert(err));
};

const useUpload = () => {
  return {
    uploadData,
    runCalc,
    opData,
    uploadFiles,
  };
};

export default useUpload;

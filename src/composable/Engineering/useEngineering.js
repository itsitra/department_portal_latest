import axios from "axios";
import { ref } from "vue";
const v = ref(Number());
const uc = ref(Number());
const cc = ref(Number());
const lpf = ref(Number());
const con = ref(Number());
const un = ref(Number());
const md = ref(Number());
const va = ref(Number());

let loading = ref(false);
let j_data = ref([]);
let show = ref(false);
let fileName = ref("result.csv");
const showModal = () => {
  show.value = true;
};

const closeModal = () => {
  show.value = false;
};

const submitCalc = () => {
  loading.value = true;
  let data = {
    v: v.value,
    uc: uc.value,
    cc: cc.value,
    lpf: lpf.value,
    con: con.value,
    un: un.value,
    md: md.value,
    va: va.value,
  };

  let jdata = JSON.stringify(data);
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_calc/`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      j_data.value.push(res.data);
      // console.log(j_data.value);
      loading.value = false;
      show.value = false;
    })
    .catch((err) => alert(err));
};

const f1 = () => {
  j_data.value = [];
  loading.value = true;
  fileName.value = "F1.csv";
  let data = {
    fileno: "F1",
  };

  let jdata = JSON.stringify(data);
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_download/`,
      jdata
    )
    .then((res) => {
      console.log(res.data);
      res.data.forEach((e) => {
        j_data.value.push(e);
      });

      console.log(j_data.value);
      loading.value = false;
      show.value = false;
    })
    .catch((err) => alert(err));
};

const f2 = () => {
  j_data.value = [];

  loading.value = true;
  fileName.value = "F2.csv";
  let data = {
    fileno: "F2",
  };

  let jdata = JSON.stringify(data);
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_download/`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      res.data.forEach((e) => {
        j_data.value.push(e);
      });
      // console.log(j_data.value);
      loading.value = false;
      show.value = false;
    })
    .catch((err) => alert(err));
};
const f3 = () => {
  j_data.value = [];

  loading.value = true;
  fileName.value = "F3.csv";
  let data = {
    fileno: "F3",
  };

  let jdata = JSON.stringify(data);
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_download/`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      res.data.forEach((e) => {
        j_data.value.push(e);
      });
      // console.log(j_data.value);
      loading.value = false;
      show.value = false;
    })
    .catch((err) => alert(err));
};
const f4 = () => {
  j_data.value = [];

  loading.value = true;
  fileName.value = "F4.csv";
  let data = {
    fileno: "F4",
  };

  let jdata = JSON.stringify(data);
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_download/`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      res.data.forEach((e) => {
        j_data.value.push(e);
      });
      // console.log(j_data.value);
      loading.value = false;
      show.value = false;
    })
    .catch((err) => alert(err));
};
const f5 = () => {
  j_data.value = [];

  loading.value = true;
  fileName.value = "F5.csv";
  let data = {
    fileno: "F5",
  };

  let jdata = JSON.stringify(data);
  axios
    .post(
      `http://lab.sitraonline.org.in/energyauditapi/index.php/api/web_app_electrical_download/`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      res.data.forEach((e) => {
        j_data.value.push(e);
      });
      // console.log(j_data.value);
      loading.value = false;
      show.value = false;
    })
    .catch((err) => alert(err));
};

const useEngineering = () => {
  return {
    v,
    uc,
    cc,
    lpf,
    con,
    un,
    md,
    va,
    submitCalc,
    showModal,
    closeModal,
    show,
    j_data,
    f1,
    f2,
    f3,
    f4,
    f5,
    fileName,
  };
};

export default useEngineering;

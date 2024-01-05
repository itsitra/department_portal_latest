import axios from "axios";
import { ref } from "vue";
import router from "../../router/index";

const depName = ref("");

const pass = ref("");

let loading = ref(false);

let error = ref(false);

const done = ref(false);
let message = ref("");
const login = async (d) => {
  loading.value = true;
  await axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/LoginUser`,
      d
    )
    .then((res) => {
      // console.log(res.data.length > 0);
      if (res.data.length > 0) {
        let depCode = res.data[0].Department_Code;
        let hodCode = res.data[0].HOD_Code;
        let userCode = res.data[0].User_Code;

        sessionStorage.setItem("depCode", depCode);
        sessionStorage.setItem("hodCode", hodCode);
        sessionStorage.setItem("userCode", userCode);
        sessionStorage.setItem("depName", res.data[0].Department_Name);
        // console.log(res.data);

        if (res.data) {
          router.push({ name: "Dashboard" });

          loading.value = false;
        } else {
          // console.log(res.data);
          loading.value = false;
        }
      } else {
        message.value = "User Name Password Does not Exists or Incorrect";
        loading.value = false;
        error.value = true;
      }
    })
    .catch((err) => {
      // console.log(err);
      if (err) {
        message.value = "Network Error";
        error.value = true;
        loading.value = false;
      }
    });
};

const closeError = () => {
  error.value = !error.value;
};

const auth = () => {
  return {
    depName,
    pass,
    login,
    loading,
    done,
    error,
    closeError,
    message,
  };
};
export default auth;

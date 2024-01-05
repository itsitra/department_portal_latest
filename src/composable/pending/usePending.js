import axios from "axios";
import { ref } from "vue";

const data = ref([]);

const getData = (d) => {
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/getPending`,
      JSON.stringify({
        depCode: Number(d),
      })
    )
    .then((res) => {
      res.data.forEach((i) => {
        if (i.Pending_Qty != "0") {
          // console.log("if statement");
          data.value.push(i);
        }
      });
      // console.log(data.value);
    })
    .catch((err) => alert(err));
};

const clearData = () => {
  data.value = [];
};
const pending = () => {
  return { getData, data, clearData };
};

export default pending;

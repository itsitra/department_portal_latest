import axios from "axios";
import { ref } from "vue";

let data = ref([]);
let query = ref("");
const queryData = (d) => {
  // console.log(d);
  let jdata = JSON.stringify({
    table: d.table,
    query: d.query,
  });
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/${d.endPoint}`,
      jdata
    )
    .then((res) => {
      // console.log(res);
      res.data.forEach((e) => {
        data.value.push(e);
      });
    })
    .catch((err) => alert(err));
};

const search = () => {
  return {
    queryData,
    data,
    query,
  };
};

export default search;

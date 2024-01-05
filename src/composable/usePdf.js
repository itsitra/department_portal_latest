import axios from "axios";
import { ref } from "vue";

const data = ref([]);

let loading = ref(false);

const getData = (d) => {
  loading.value = true;
  axios
    .post(
      `http://192.168.1.9/departmentportalapitestreceipt/index.php/api/printData`,
      d
    )
    .then((res) => {
      if (res.data === false) {
        alert("Print Not Avaliable");
        window.close();
      } else {
        res.data.forEach((i) => {
          data.value.push(i);
        });
      }

      //   data.value.push(res.data);
      setTimeout(() => {
        if (res.status == 200) {
          loading.value = false;
        }
      }, 3000);
    })
    .catch((err) => alert(err));
};

const usePdf = () => {
  return {
    getData,
    data,
    loading,
  };
};

export default usePdf;

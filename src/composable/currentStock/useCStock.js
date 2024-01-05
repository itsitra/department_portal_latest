import axios from "axios";
import { ref } from "vue";

const stockData = ref([]);
let loading = ref(false);

const getStock = () => {
  loading.value = true;
  axios
    .get(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectStock`
    )
    .then((res) => {
      stockData.value = [];
      // if (stockData.value.length == res.data.length) {
      //   loading.value = false;
      //   return stockData.value;
      // }
      res.data.forEach((e) => {
        stockData.value.push(e);
      });
      loading.value = false;
    })
    .catch((err) => alert(err));
};

const cStock = () => {
  return {
    getStock,
    stockData,
    loading,
  };
};
export default cStock;

import { ref } from "vue";
import supplierPaginate from "./useSupplierPagination";

const { getData } = supplierPaginate();

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
if (currentState.value == 1) {
  getData(currentState.value);
}
const supplierTable = () => {
  return {
    state,
    prev,
    next,
    currentState,
  };
};

export default supplierTable;

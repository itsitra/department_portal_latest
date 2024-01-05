import { ref } from "vue";

let modal = ref(false);

let tempData = ref([]);

const openModal = (i) => {
  modal.value = !modal.value;
  tempData.value.push(i);
};
const closeModal = () => (modal.value = !modal.value);
const mill = () => {
  return {
    modal,
    openModal,
    closeModal,
    tempData,
  };
};

export default mill;

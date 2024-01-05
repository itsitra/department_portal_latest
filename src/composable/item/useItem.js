import axios from "axios";
import { ref } from "vue";

import useItemTable from "./useItemTable";

const { getData, itemdata } = useItemTable();

let modal = ref(false);

let showEdit = ref(false);

let editData = ref([]);
let editClick = ref(true);

const saveData = (d) => {
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: "  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertItemMaster",
    method: "POST",
    headers: headersList,
    data: d,
  };
  axios.request(reqOptions).then(function (response) {
    if (response.status == 200) {
      getData(1);
    }
    // console.log(response.data);
  });
};
const updateData = (d) => {
  saveData(d);
  // console.log("update data fun");
};

const updateEdit = (d) => {
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: "  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/updateItemMaster",
    method: "PUT",
    headers: headersList,
    data: d,
  };
  axios.request(reqOptions).then(function (response) {
    if (response.status == 200) {
      closeEditModal();
      getData(1);
    }
  });
};

const deleteData = (d) => {
  let jdata = JSON.stringify({
    itemId: d,
  });
  axios
    .put(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/deleteItemMaster`,
      jdata
    )
    .then((res) => {
      if (res.status == 200) {
        getData(1);
        itemdata.value.splice(0, itemdata.value.length);
      }
    })
    .catch((err) => {
      alert(err);
    });
};

const openEdit = () => (editClick.value = !editClick.value);

const openModal = () => (modal.value = !modal.value);
const closeModal = () => (modal.value = !modal.value);

const showEditModal = (i) => {
  showEdit.value = !showEdit.value;
  editData.value.push(itemdata.value[i]);
};
const closeEditModal = () => {
  // console.log("colse");
  editClick.value = true;
  showEdit.value = !showEdit.value;
};

const item = () => {
  return {
    modal,
    openModal,
    closeModal,
    updateData,
    getData,
    deleteData,
    showEditModal,
    closeEditModal,
    showEdit,
    openEdit,
    editData,
    editClick,
    updateEdit,
    itemdata,
  };
};

export default item;

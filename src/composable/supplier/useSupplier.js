// Imports from files and packages 🚚 👇
import { ref } from "vue";
import axios from "axios";
import supplierPaginate from "./useSupplierPagination";

// getData Function is from supplier Pagination file getData with pagenumber.
const { getData, supplierData } = supplierPaginate();

// Imports from files and packages 🚚 👆.

// Initializing Data and Boolean State's 👋
let showModal = ref(false);

let showEdit = ref(false);

let data = ref([]);

let viewData = ref(false);
let editClick = ref(true);

let editData = ref([]);

// Functions to process and enumulate data 👇 goes here 🎉.

// To Save Data📦: 👇

// To save supplier Data from the user i check if the data is object or not, need to check it in some other way

// Note: "Error in data Means" Error in db or the use must have type data that is not the type of data to be sent to db.

const saveData = (d) => {
  if (typeof d === "object") {
    axios
      .post(
        `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertSupplier`,
        d
      )
      .then((res) => {
        if (res.data === true) {
          getData(1);
        } else {
          alert("Error Saving Data");
        }
      })
      .catch((err) => {
        if (err) {
          alert("Error Saving Data");
        }
      });
  } else {
    alert("Enter in Data");
  }
};

// I don't know why i created this updateData function, but i did and i used it mostly in my code.
const updateData = (d) => {
  saveData(d);
};

// To Save Data📦 👆.

// To Detele data🚮:

// To Delete supplier data we must sent SupplierCode to do so and i check for supplierCode is an int or not in order to delete it.

const deleteData = () => {
  // i in params
  alert("Feature Not Avaliable at the moment");
  // if (typeof i === "object") {
  //   document.getElementById("app").style.cursor = "wait";
  //   axios
  //     .post(
  //       `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/deleteSupplier`,
  //       i
  //     )
  //     .then((res) => {
  //       if (res) {
  //         document.getElementById("app").style.cursor = "auto";
  //         getData(1);
  //       } else {
  //         document.getElementById("app").style.cursor = "auto";
  //         alert("Error Deleting Data");
  //       }
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         document.getElementById("app").style.cursor = "auto";
  //         alert("Error in Data.");
  //       }
  //     });
  // }
};

// To Detele data🚮 👆.

// To Edit Data📝: 👇

const showEditModal = (i) => {
  if (typeof i === "number") {
    viewData.value = !viewData.value;
    editData.value = [];
    showEdit.value = !showEdit.value;
    editData.value.push(supplierData.value[i]);
  } else {
    alert("Try Again");
  }
};

// This function is for closing the view modal which is opened also it can be used to open also.
const closeEditModal = () => {
  viewData.value = !viewData.value;
};

// changes edit click value to true or flase. In order to show user update btn and also show data as readonly.
const editClicked = () => {
  editClick.value = !editClick.value;
};

// To Update Supplier data i used this function
const editModal = (d) => {
  if (typeof d === "object") {
    document.getElementById("app").style.cursor = "wait";
    editClick.value = !editClick.value;
    const jdata = JSON.stringify(d);
    axios
      .put(
        `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/updateSupplier`,
        jdata
      )
      .then((res) => {
        if (res.data) {
          getData(1);
          document.getElementById("app").style.cursor = "auto";
        } else {
          alert("Try again");
          document.getElementById("app").style.cursor = "auto";
        }
      })
      .catch((err) => {
        if (err) {
          alert("Error in Data");
          document.getElementById("app").style.cursor = "auto";
        }
      });
  }
};

// To Edit Data📝 👆.

// Opening and closing modal functions 📬📭 👇
const openModal = () => (showModal.value = !showModal.value);
const closeModal = () => (showModal.value = !showModal.value);

// Opening and closing modal functions 📬📭 👆

// Exporting all data and functions in this file under this name 📦🏗 👇.

const supplier = () => {
  return {
    showModal,
    showEditModal,
    data,
    updateData,
    deleteData,
    editModal,
    openModal,
    closeModal,
    getData,
    saveData,
    editClicked,
    editData,
    viewData,
    editClick,
    closeEditModal,
  };
};

export default supplier;

// Exporting all data and functions in this file under this name 📦🏗 👆.

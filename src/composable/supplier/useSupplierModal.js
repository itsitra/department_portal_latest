// Imports from files and packages 🚚 👇
import { ref } from "vue";
// Imports from files and packages 🚚 👆

// Initializing Data and Boolean State's 👋
const supplierName = ref("");
const supplierAddress = ref("");
const supplierCity = ref("");
const supplierState = ref("");
const supplierPin = ref("");
const supplierEmail = ref("");
const supplierPhone = ref("");
const supplierGst = ref("");
const supplierType = ref("");

// Exporting all data and functions in this file under this name 📦🏗 👇.
const supplierModal = () => {
  return {
    supplierName,
    supplierAddress,
    supplierCity,
    supplierState,
    supplierPin,
    supplierEmail,
    supplierPhone,
    supplierGst,
    supplierType,
  };
};

export default supplierModal;

// Exporting all data and functions in this file under this name 📦🏗 👆.

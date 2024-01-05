import { ref } from "vue";
import useModal from "./useGrnModal";
import * as XLSX from "xlsx/xlsx.mjs";
import axios from "axios";

const { getSupplierData } = useModal();
let modal = ref(false);
const openModal = () => {
  getSupplierData();
  modal.value = !modal.value;
};
const closeModal = () => (modal.value = !modal.value);

const handleUpload = (e) => {
  var files = e.target.files,
    f = files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: "array" });
    let sheetName = workbook.SheetNames[0];
    // console.log(workbook);
    let worksheet = workbook.Sheets[sheetName];
    let temp = [];
    temp = XLSX.utils.sheet_to_json(worksheet);
    let tempFinalData = [];
    temp.forEach((d) => {
      tempFinalData.push({
        itemCode: d.ItemID,
        unit: d.Unit,
        department: d.Department,
        prNo: d.PRNo,
        prDate: d.PRDate,
        supplierCode: d.SupplierCode,
        supplierName: d.SupplierName,
        description: d.Description.replace(/[^a-zA-Z0-9]/g, " "),
        poNo: d.PONo,
        poDate: d.PODate,
        price: d.Price,
        inwardNo: d.InvNO,
        inwardDate: d.InvDate,
        grnNo: d.GRNNo,
        grnDate: d.GRNDate,
        qcDate: d.QCDate,
        grnQty: d.GRNQty,
        value: d.Value,
        gst: d.GST,
        gstValue: d.GST_Value,
        prjName: d.PRJName,
      });
    });
    // console.log(temp);
    // console.log(JSON.stringify(tempFinalData));
    axios
      .post(
        ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/postGrn`,
        tempFinalData
      )
      .then((res) => {
        if (res.data.data === true) {
          alert("Grn Data Saved Sucessfully");
        } else {
          alert(res.data.data);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  reader.readAsArrayBuffer(f);
};
const grn = () => {
  return {
    modal,
    openModal,
    closeModal,
    handleUpload,
  };
};

export default grn;

import { ref } from "vue";
import * as XLSX from "xlsx/xlsx.mjs";

const itemCode = ref(Number());
const description = ref("");

const description1 = ref("");
const unit = ref("");
const quantity = ref(Number());
const expiryDateCheck = ref("N");

const currentState = ref(0);
const upload = ref(1);
const units = ref([
  "BAG",
  "BAL",
  "BDL",
  "BKL",
  "BOU",
  "BOX",
  "BTL",
  "BUN",
  "CAN",
  "CBM",
  "CCM",
  "CMS",
  "CTN",
  "DOZ",
  "DRM",
  "GGK",
  "GMS",
  "GRS",
  "GYD",
  "KGS",
  "KLR",
  "KME",
  "LTR",
  "MLT",
  "MTR",
  "MTS",
  "NOS",
  "OTH",
  "PAC",
  "PCS",
  "PRS",
  "QTL",
  "ROL",
  "SET",
  "SQF",
  "SQM",
  "SQY",
  "TBS",
  "TGM",
  "THD",
  "TON",
  "TUB",
  "UGS",
  "UNT",
  "YDS",
]);

const items = ref([]);

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

    temp.forEach((j) => {
      // Object.keys(temp).some((key) => console.log(key === "ItemCode"));
      let jdata = {
        itemcode: j.ItemCode,
        expiryCheck: j.SubSubClass === "Chemical" ? "Y" : "N",
        description: j.Description.replace(/[^a-zA-Z0-9]/g, " "),
        unit: "NOS",
        createdBy: sessionStorage.getItem("depCode"),
      };
      items.value.push(jdata);
    });
  };
  reader.readAsArrayBuffer(f);
};
const useModal = () => {
  return {
    itemCode,
    description,
    description1,
    unit,
    quantity,
    expiryDateCheck,
    currentState,
    upload,
    units,
    handleUpload,
    items,
  };
};

export default useModal;

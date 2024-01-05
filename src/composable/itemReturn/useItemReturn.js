import axios from "axios";
import { ref } from "vue";
import itemTable from "../itemReturn/useItemReutnTable";
import gatePassModal from "../gatePass/useGatePassModal";

const { getSupplierData, suppliers } = gatePassModal();

const rgpId = ref(Number());
const sno = ref(Number());
const rgpDate = ref("");
const description = ref(null);
const recievingdate = ref("");
const remarks = ref("");
const quantity = ref(Number());
const recevedQuantity = ref(Number());
const recQuantity = ref(Number());
const rgpID = ref([]);
const depName = ref([]);

const itemReturnEntry = ref([]);

const showModal = ref(false);
let multiselecttoggle = ref(false);
const loading = ref(false);
const { getData } = itemTable();
const openModal = () => {
  showModal.value = !showModal.value;

  getDepName();
};
const closeModal = () => {
  showModal.value = !showModal.value;
  rgpID.value = [];
  itemReturnEntry.value = [];
  depName.value = [];
};

const getRgpId = (e) => {
  rgpID.value = [];
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/getRgpId`,
    method: "POST",
    headers: headersList,
    data: JSON.stringify({
      depCode: e.currentTarget.value,
    }),
  };
  axios.request(reqOptions).then(function (res) {
    res.data.forEach((i) => {
      if (i.st != 0) {
        rgpID.value.push(i.st);
      }
    });
    const uniqSort = (arr = []) => {
      const map = {};
      const res = [];
      for (let i = 0; i < arr.length; i++) {
        if (!map[arr[i]]) {
          map[arr[i]] = true;
          res.push(arr[i]);
        }
      }
      return res.sort((a, b) => a - b);
    };
    rgpID.value = uniqSort(rgpID.value);
  });
};

/*const getRgpId = () => {
  rgpID.value = [];
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/getRgpId`,
    method: "POST",
    headers: headersList,
  };
  axios.request(reqOptions).then(function (res) {
    res.data.forEach((i) => {
      rgpID.value.push(i);
    });
  });
};*/

const getDepName = () => {
  depName.value = [];
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectDepartment`,
    method: "GET",
    headers: headersList,
  };
  axios.request(reqOptions).then(function (res) {
    res.data.forEach((i) => {
      depName.value.push(i);
    });
  });
};
const getQuantity = (i) => {
  if (typeof description.value === "string") {
    quantity.value = itemReturnEntry.value[i].Quantity;
    recevedQuantity.value = itemReturnEntry.value[i].recdQty;
    sno.value = itemReturnEntry.value[i].Sno;
    rgpDate.value = itemReturnEntry.value[i].RGP_Date;
  }
};
let tempDesc = ref(null);
const getQtyMulti = () => {
  console.log(description.value);
  let tempqty;
  let temprecqty;
  let tempSno;
  let tempRgpdate;
  if (description.value !== null && description.value != []) {
    description.value.forEach((e) => {
      if (tempqty === null || tempqty === undefined) {
        tempqty = e.Quantity;
        temprecqty = e.recdQty;
        tempSno = e.Sno;
        tempDesc.value = e.Description;
        tempRgpdate = e.RGP_Date;
      } else {
        tempqty = tempqty + "," + e.Quantity;
        temprecqty = temprecqty + "," + e.recdQty;
        tempSno = tempSno + "," + e.Sno;
        tempDesc.value = tempDesc.value + "," + e.Description;
        tempRgpdate = tempRgpdate + "," + e.RGP_Date;
      }
    });
  }

  quantity.value = tempqty;
  recevedQuantity.value = temprecqty;
  sno.value = tempSno;
  rgpDate.value = tempRgpdate;
};

const getLineEntry = (e) => {
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectItemRetEntry`,
    method: "POST",
    headers: headersList,
    data: JSON.stringify({
      rgpId: e.currentTarget.value,
    }),
  };
  axios.request(reqOptions).then(function (res) {
    if (typeof description.value === "object") {
      description.value = [];
    }
    itemReturnEntry.value.splice(0, itemReturnEntry.value.length);
    let pending = res.data.filter((d) => {
      if (d.st == "pending") {
        return d;
      }
    });
    pending.forEach((i) => {
      itemReturnEntry.value.push(i);
    });
  });
};
const getDepRgp = (i) => {
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectItemRetEntry`,
    method: "POST",
    headers: headersList,
    data: JSON.stringify({
      rgpId: i,
    }),
  };
  axios.request(reqOptions).then(function (res) {
    itemReturnEntry.value.splice(0, itemReturnEntry.value.length);
    let pending = res.data.filter((d) => {
      if (d.st == "pending") {
        return d;
      }
    });
    pending.forEach((i) => {
      itemReturnEntry.value.push(i);
    });
  });
};
const saveReturnEntry = (i) => {
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertItemRetEntry`,
    method: "POST",
    headers: headersList,
    data: i,
  };
  axios.request(reqOptions).then(function (response) {
    if (response.status == 200) {
      getData(1);
    }
  });
};
const deleteData = (i) => {
  let headersList = {
    Accept: "*",
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/`,
    method: "POST",
    headers: headersList,
    data: JSON.stringify({
      rgpId: i,
    }),
  };
  axios.request(reqOptions).then(function (response) {
    if (response.status == 200) {
      getData(1);
    }
  });
  // data.value.splice(--i, 1);
  // console.log("delete fun");
};

const itemData = ref([]);

const getItemData = () => {
  axios
    .get(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectItemMaster`
    )
    .then((res) => {
      res.data.forEach((e) => {
        itemData.value.push(e);
      });
      // console.log(itemData);
    })
    .catch((err) => {
      alert(err);
    });
};
const multitoggleaction = () => {
  multiselecttoggle.value != multiselecttoggle.value;
  description.value = null;
  quantity.value = "";
  recevedQuantity.value = "";
  sno.value = "";
  rgpDate.value = "";
};

const itemReturn = () => {
  return {
    loading,
    depName,
    deleteData,
    rgpId,
    description,
    remarks,
    quantity,
    recQuantity,
    openModal,
    closeModal,
    showModal,
    getRgpId,
    rgpID,
    getLineEntry,
    itemReturnEntry,
    getQuantity,
    saveReturnEntry,
    sno,
    rgpDate,
    getSupplierData,
    suppliers,
    getItemData,
    itemData,
    getDepRgp,
    recevedQuantity,
    recievingdate,
    multiselecttoggle,
    multitoggleaction,

    getQtyMulti,
    tempDesc,
  };
};

export default itemReturn;

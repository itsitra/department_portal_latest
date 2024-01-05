import { ref } from "vue";
import axios from "axios";
import * as XLSX from "xlsx/xlsx.mjs";

let loading = ref(false);
let reciptmodal = ref(false);
let receiptmodalitem = ref(false);

const reciptEntry = ref({
  custnamequery: "",
  custdetails: null,
  dcnumber: "",
  staffid: "",
  noofitems: "",
  mirnumber: "",
  totalcost: "",
  totalapproxcost: "",
  receiveddate: "",
  remarks: "",
  recDate: "",
});

let lineitems = ref([]);
const itemstype = ref({
  itemcode: "",
  desc: "",
  itemtype: "",
  calitype: "",
  appcost: "",
  appxcost: "",
  range: "",
  macid: "",
});
let itemsupload = ref([]);

let passitems = ref([]);
let tempdataforsmallmodal = ref(null);

let receiptnumber = ref(Number(""));

let queryLoading = ref(false);
let cust = ref([]);

let today = ref("");

let reciptitems = ref([]);
const handleUpload = (e, type) => {
  if (type === "itemmodal") {
    let files = e.target.files,
      f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });
      let sheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[sheetName];
      let temp = [];
      temp = XLSX.utils.sheet_to_json(worksheet);

      temp.forEach((j) => {
        // Object.keys(temp).some((key) => console.log(key === "ItemCode"));
        let jdata = {
          // itemcode: j.ItemCode,
          desc: j.Description.replace(/[^a-zA-Z0-9]/g, " "),
          itemtype: j.Itemtype.replace(/[^a-zA-Z0-9]/g, " "),
          // calitype: j.Calitype.replace(/[^a-zA-Z0-9]/g, " "),
          // appcost: j.Cost,
          createdBy: sessionStorage.getItem("depCode"),
        };
        itemsupload.value.push(jdata);
      });
    };
    reader.readAsArrayBuffer(f);
  } else if (type === "receiptmodal") {
    let files = e.target.files,
      f = files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });
      let sheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[sheetName];
      let temp = [];
      temp = XLSX.utils.sheet_to_json(worksheet);
      let noofitems;
      let cost = 0;
      let totalapproxcost = 0;
      temp.forEach((j, index) => {
        // Object.keys(temp).some((key) => console.log(key === "ItemCode"));
        noofitems = index + 1;
        cost = cost + j.Calicost;
        totalapproxcost = totalapproxcost + j.Caliapproxcost;

        let jdata = {
          desc: j.Description.replace(/[^a-zA-Z0-9]/g, " "),
          itemtype: j.Itemtype.replace(/[^a-zA-Z0-9]/g, " "),
          calitype: j.Calitype.replace(/[^a-zA-Z0-9]/g, " "),
          appcost: j.Calicost,
          appxcost: j.Caliapproxcost,
          range: j.Range,
          macid: j.Serialno,
        };
        lineitems.value.push(jdata);
      });
      reciptEntry.value.noofitems = Number(noofitems);
      reciptEntry.value.totalcost = Number(cost);
      reciptEntry.value.totalapproxcost = Number(totalapproxcost);
    };
    reader.readAsArrayBuffer(f);
  }
};

const getCustData = (q) => {
  queryLoading.value = true;
  cust.value = [];
  axios
    .get(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/limsCustomer?search=${q}`
    )
    .then((res) => {
      if (res.status == 200) {
        if (res.data === "false") {
          alert("No Customer Data");
          queryLoading.value = false;
        } else {
          res.data.forEach((d) => {
            cust.value.push(d);
          });

          queryLoading.value = false;
        }
        queryLoading.value = false;
      }
    });
};
let staffs = ref([]);
const getStaffsData = (d) => {
  // console.log("getStaff");
  staffs.value = [];
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectStaff`,
      d
    )
    .then((res) => {
      if (res.status == 200) {
        res.data.forEach((d) => {
          staffs.value.push(d);
        });
      }
      // console.log(staffs.value)
    });
};

const addLineEntry = (d) => {
  reciptEntry.value.noofitems = Number(reciptEntry.value.noofitems) + 1;
  if (Number(reciptEntry.value.totalcost) === 0) {
    reciptEntry.value.totalcost = d.appcost;
    reciptEntry.value.totalapproxcost = d.appxcost;
  } else if (Number(reciptEntry.value.totalcost) !== 0) {
    reciptEntry.value.totalcost = reciptEntry.value.totalcost + d.appcost;
    reciptEntry.value.totalapproxcost =
      reciptEntry.value.totalapproxcost + d.appxcost;
  }
  if (Object.values(d).every((x) => x !== null && x !== "" && x !== 0)) {
    lineitems.value.push(d);
  } else {
    alert("Enter All Values");
  }

  clearItemsField();
  if (copystatus.value) {
    copyaction(d);
  }
};

const clearItemsField = () => {
  itemstype.value.appcost = "";
  itemstype.value.appxcost = "";
  itemstype.value.calitype = "";
  itemstype.value.desc = "";
  itemstype.value.itemcode = "";
  itemstype.value.itemtype = "";
  itemstype.value.macid = "";
  itemstype.value.range = "";
};
//conditon to create a receipt
const deleteData = (i) => {
  if (lineitems.value.length != 1) {
    reciptEntry.value.noofitems = Number(reciptEntry.value.noofitems) - 1;
    reciptEntry.value.totalcost =
      Number(reciptEntry.value.totalcost) - lineitems.value[i].appcost;
    reciptEntry.value.totalapproxcost =
      Number(reciptEntry.value.totalapproxcost) - lineitems.value[i].appxcost;
    lineitems.value.splice(i, 1);
  } else {
    alert("There Must be atleast one item in the table to create a receipt");
    reciptEntry.value.noofitems = Number(reciptEntry.value.noofitems) - 1;
    reciptEntry.value.totalcost =
      Number(reciptEntry.value.totalcost) - lineitems.value[i].appcost;
    reciptEntry.value.totalapproxcost =
      Number(reciptEntry.value.totalapproxcost) - lineitems.value[i].appxcost;
    lineitems.value.splice(i, 1);
  }
};

let lineEdit = ref(true);
const editline = (i) => {
  lineEdit.value = !lineEdit.value;

  lineEditChangeAmount(i);
};
const lineEditChangeAmount = (i) => {
  if (lineitems.value.length === 1) {
    reciptEntry.value.totalcost = lineitems.value[i].amount;
    reciptEntry.value.totalapproxcost = lineitems.value[i].appxcost;
  } else if (lineitems.value.length !== 1) {
    let sum = 0;
    let appxsum = 0;

    lineitems.value.forEach((item) => {
      sum += item.appcost;
      appxsum += item.appxcost;
    });

    reciptEntry.value.totalcost = sum;
    reciptEntry.value.totalapproxcost = appxsum;
  }
};
let filedstatus = ref("itemselect");
const toogleLine = (e) => {
  if (e.target.checked) {
    filedstatus.value = "upload";
  } else {
    filedstatus.value = "itemselect";
    copystatus.value = false;
    // lineitems.value = [];
  }
};

const reciptModalShowClose = () => {
  reciptmodal.value = !reciptmodal.value;
};
const saveData = (d) => {
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertReceipt`,
      d
    )
    .then((res) => {
      if (res.data.status && res.data.data != "Failure") {
        alert("Data Saved");
        reciptModalShowClose();
      } else {
        alert("Error Saving Data");
      }
    });
};
let tabledata = ref({
  Mirnumber: "",
  custname: "",
});

const getReciptTableData = (d) => {
  // console.log("getStaff");
  tabledata.value = [];
  pages.value = [];

  numbersForPage();
  let jdata = JSON.stringify({
    pageNo: d,
    depcode: sessionStorage.getItem("depCode"),
    receipt: "receipt",
  });
  loading.value = true;
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectReceiptPagination`,
      jdata
    )
    .then((res) => {
      if (res.data.status) {
        res.data.data.forEach((d) => {
          d.items.forEach((e) => {
            e["itemselectstatus"] = false;
            if (e.trackStatus === "sentout") {
              e["itemselectstatus"] = true;
            }
            if (e.calicertified === "certified") {
              e["itemselectstatus"] = true;
            }
            if (e.calicompleted === "completed") {
              e["itemselectstatus"] = true;
            }
            if (e.despatch === "despatched") {
              e["itemselectstatus"] = true;
            }
            if (e.trackStatus === "rejected") {
              e["itemselectstatus"] = true;
            }
            if (e.gatepass === "non-returnable") {
              e["itemselectstatus"] = true;
            }
          });
          tabledata.value.push(d);
        });
        loading.value = false;
      } else {
        loading.value = false;
        alert("Error Getting Data");
      }
      // console.log(staffs.value)
    });
};
const actionClick = (d, i) => {
  tabledata.value.forEach((e) => {
    e.itemvisible = false;
  });
  if (d == true) {
    tabledata.value[i].itemvisible = false;
  } else {
    tabledata.value[i].itemvisible = true;
  }
  itemslectAll(false);
};

const itemslectAll = (bool) => {
  tabledata.value.forEach((e) => {
    e.items.forEach((d) => {
      if (
        (d.trackStatus != "sentout" ||
          d.trackStatus === "completed" ||
          d.trackStatus === "certified") &&
        (e.RGP_Id != "" || e.RGP_Id != null)
      ) {
        d.itemselect = bool;
      }
    });
  });
  // if (bool) {
  //   let tempSelectAll = [];
  //   data.items.forEach((e) => {
  //     if (e.trackStatus != "sentout" && (e.RGP_Id != "" || e.RGP_Id != null)) {
  //       tempSelectAll.push(e);
  //     }
  //   });

  //   console.log(tempSelectAll);
  //   tempdataforsmallmodal.value = [tabledata.value[index]];
  //   tempdataforsmallmodal.value[0].items = tempSelectAll;
  //   console.log(tempdataforsmallmodal.value[0].items);
  //   // tempdataforsmallmodal.value = tabledata.value[index];

  //   // tempdataforsmallmodal.value.items = tempSelectAll;
  //   // console.log(tempdataforsmallmodal.value);
  // }
};

const passItemsFun = (event, d, receipt, tableData) => {
  if (event.target.checked) {
    if (passitems.value.length !== 0) {
      passitems.value.push(d);
    }
  } else {
    passitems.value.forEach((element, i) => {
      if (element.itemCode === d.itemCode) {
        passitems.value.splice(i, 1);
      }
    });
  }

  receiptnumber.value = receipt;
  tempdataforsmallmodal.value = tableData;
};
const backdropClose = () => {
  receiptmodalitem.value = false;
  itemsupload.value = [];
  ietmlistdata.value = [];
  searchdataitem.value = [];
  serachitem.value = "";
};
const itemmastermodalopen = () => {
  receiptmodalitem.value = true;
};
let currentstate = ref(1);

const state = (pageNumber) => {
  currentstate.value = pageNumber;
  getReciptTableData(currentstate.value);
};
const prev = () => {
  currentstate.value--;
};
const next = () => {
  currentstate.value++;
};
let pages = ref([]);
const numbersForPage = () => {
  let jdata = JSON.stringify({
    depCode: sessionStorage.getItem("depCode"),
  });
  axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/receiptDataCount`,
      jdata
    )
    .then((res) => {
      // console.log(res.data);
      for (let i = 0; i < res.data; i++) {
        pages.value.push(i + 1);
      }
      // console.log(pages.value);
      loading.value = false;
    })
    .catch((err) => alert(err));
};

let items = ref([]);

const itemselect = () => {
  items.value = [];
  axios
    .get(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectReceiptItemMaster`
    )
    .then((res) => {
      // console.log(res.data);
      if (res.data.status) {
        res.data.data.forEach((element) => {
          items.value.push(element);
        });
      }

      // console.log(pages.value);
    })
    .catch((err) => alert(err));
};

const itemchange = (id) => {
  let val = id.target.value;
  items.value.filter((e) => {
    if (e.itemDescription === val) {
      // itemstype.value.itemcode = e.itemCode;
      // itemstype.value.appcost = Math.round(e.cost);

      itemstype.value.itemtype = e.itemType;
    }
  });
};

let suppliers = ref([]);
const getSupplierData = (data) => {
  // console.log("get supplier");
  suppliers.value = [];
  let jdata = JSON.stringify({
    type: data,
  });
  axios
    .post(
      `  http://192.168.1.9/departmentportalapitestreceipt/index.php/api/selectSupplier`,
      jdata
    )
    .then((res) => {
      if (res.status == 200) {
        // console.log(suppliers.value.length <= 0);
        if (suppliers.value.length <= 0) {
          res.data.forEach((d) => {
            suppliers.value.push(d);
          });
        }
      }
      // console.log(suppliers.value);
    });
};

const gettoday = () => {
  let date = new Date();
  today.value = date.toISOString().slice(0, 10);
};

gettoday();

const postgatepass = async (jdata, type) => {
  let rgpid;
  let status = axios
    .post(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/receiptGatepass`,
      jdata
    )
    .then((res) => {
      if (res.data.status && res.data.data != "") {
        alert("Gatepass Generated Successfully");
        rgpid = res.data.data;
      } else {
        alert("Error Creating Gatepass");
      }
      return true;
    })
    .catch((err) => alert(err));

  await status.then((res) => {
    if (res) {
      let data = JSON.parse(jdata);
      tempdataforsmallmodal.value.items.forEach((e) => {
        data.items.forEach((f) => {
          if (e.recLineNo == f.recLineNo) {
            e.RGP_Id = rgpid;
            e.itemselect = false;
            e.itemselectstatus = true;
            if (type == "customer") {
              e.gatepass = "non-returnable";
              e.itemselectstatus = true;
            }
            e.Approval = null;
            e.trackStatus = "sentout";
          }
          if (e.gatepass !== null) {
            e.itemselectstatus = true;
          }
        });
        tabledata.value.items = [];
        tabledata.value.items.push(e);
        // console.log(tabledata.value);
      });
    }
  });
};

// const selectallcheck = (data) => {
//   data.items.forEach((element) => {
//     if (element.trackStatus === "sendout") {
//       element.itemselect = false;
//     }
//   });
//   let temp = data.items;

//   tabledata.value.forEach((d) => {
//     if (d.receiptNo == data.receiptNo) {
//       console.log(temp);
//     }
//   });
//   // console.log(tabledata.value);
// };

let itemreturn = ref({
  date: "",
  trackStatus: "returned",
  recLineNo: "",
  rgpId: "",
  description: "",
});

let itemreject = ref({
  date: "",
  trackStatus: "rejected",
  recLineNo: "",
  rgpId: "",
  description: "",
});

let itemcompleted = ref({
  date: "",
  trackStatus: "completed",
  staff: "",
  recLineNo: "",
});

let itemcertified = ref({
  date: "",
  trackStatus: "certified",
  recLineNo: "",
});

let itemdespatched = ref({
  date: "",
  trackStatus: "despatched",
  recLineNo: "",
});
const statusupdates = (status, recLineNo, rgpid, desc, item) => {
  if (status === "returned") {
    itemreturn.value.description = desc;
    itemreturn.value.recLineNo = recLineNo;
    itemreturn.value.rgpId = rgpid;
    let jdata = JSON.stringify(itemreturn.value);
    axios
      .put(
        " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/receiptReturn",
        jdata
      )
      .then((res) => {
        if (res.data.data == "Success") {
          alert("Data Saved Successfully");

          item.trackStatus = "returned";
          item.itemselectstatus = false;
          itemreturn.value.date = "";
        } else {
          alert("Error Saving Data");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (status === "rejected") {
    itemreject.value.description = desc;
    itemreject.value.recLineNo = recLineNo;
    itemreject.value.rgpId = rgpid;

    let jdata = JSON.stringify(itemreject.value);
    axios
      .put(
        " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/receiptReturn",
        jdata
      )
      .then((res) => {
        if (res.data.data == "Success") {
          alert("Data Saved Successfully");
          item.trackStatus = "rejected";
          item.itemselectstatus = true;
        } else {
          alert("Error Saving Data");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  if (status === "completed") {
    itemcompleted.value.recLineNo = recLineNo;
    let jdata = JSON.stringify(itemcompleted.value);
    axios
      .put(
        " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/updateStatus",
        jdata
      )
      .then((res) => {
        if (res.data.data == "Success") {
          alert("Data Saved Successfully");
          itemcompleted.value.date = "";
          itemcompleted.value.staff = "";
          item.itemselectstatus = true;
          item.calicompleted = "completed";
        } else {
          alert("Error Saving Data");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (status === "certified") {
    itemcertified.value.recLineNo = recLineNo;
    let jdata = JSON.stringify(itemcertified.value);
    axios
      .put(
        " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/updateStatus",
        jdata
      )
      .then((res) => {
        if (res.data.data == "Success") {
          alert("Data Saved Successfully");
          itemcertified.value.date = "";
          item.calicertified = "certified";
          item.itemselectstatus = true;
        } else {
          alert("Error Saving Data");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (status === "despatched") {
    itemdespatched.value.recLineNo = recLineNo;
    let jdata = JSON.stringify(itemdespatched.value);
    axios
      .put(
        " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/updateStatus",
        jdata
      )
      .then((res) => {
        if (res.data.data == "Success") {
          alert("Data Saved Successfully");
          itemdespatched.value.date = "";
          item.despatch = "despatched";
          item.itemselectstatus = true;
        } else {
          alert("Error Saving Data");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
};
// let calicertified = [];
// let calicompleted = [];
// let despatch = [];
// let trackStatus = [];
// let RGP_Id = [];
let temptrackitemstaus = [];
let tempcusdc = ref("");
let toggleCustpass = ref(false);
const custclick = (e, items, i) => {
  let status = e.target.checked;
  toggleCustpass.value = !toggleCustpass.value;
  if (status) {
    // calicertified = [];
    // calicompleted = [];
    // despatch = [];
    // trackStatus = [];
    // RGP_Id = [];
    temptrackitemstaus = [];

    items.forEach((d) => {
      // calicertified.push(d.calicertified);
      // calicompleted.push(d.calicompleted);
      // despatch.push(d.despatch);
      // trackStatus.push(d.trackStatus);
      // RGP_Id.push(d.RGP_Id);
      // if (d.trackStatus !== "sentout") {
      //   d.calicertified = "";
      //   d.RGP_Id = "";
      //   d.calicompleted = "";
      //   d.despatch = "";
      //   d.trackStatus = "";
      // }

      temptrackitemstaus.push(d.itemselectstatus);

      if (d.itemselect) {
        d.itemselect = false;
      }

      if (
        d.trackStatus === "returned" ||
        d.gatepass === "non-returnable" ||
        d.trackStatus === "sentout"
      ) {
        d.itemselectstatus = true;
      } else {
        d.itemselectstatus = false;
      }
      if (d.calicompleted === "completed") {
        d.itemselectstatus = false;
      } else {
        d.itemselectstatus = true;
      }

      if (d.trackStatus === "rejected" && d.gatepass !== "non-returnable") {
        d.itemselectstatus = false;
      }

      // if (
      //   (d.trackStatus === "sentout" || d.gatepass === "non-returnable") &&
      //   d.calicompleted !== "completed"
      // ) {
      //   d.itemselectstatus = true;
      // } else {
      //   d.itemselectstatus = false;
      // }
    });
    tempcusdc.value = tabledata.value[i].Dcnumber;
  } else {
    items.forEach((d, index) => {
      // d.RGP_Id =
      //   RGP_Id[index] === null || RGP_Id[index] === "" ? "" : RGP_Id[index];
      // d.calicertified =
      //   calicertified[index] === null
      //     ? "" || calicertified[index] === ""
      //     : calicertified[index];
      // d.calicompleted =
      //   calicompleted[index] === null
      //     ? "" || calicompleted[index] === ""
      //     : calicompleted[index];
      // d.despatch =
      //   despatch[index] === null || despatch[index] === ""
      //     ? ""
      //     : despatch[index];
      // d.trackStatus =
      //   trackStatus[index] === null || trackStatus[index] === ""
      //     ? ""
      //     : trackStatus[index];

      d.itemselect = false;
      d.itemselectstatus = temptrackitemstaus[index];

      tempcusdc.value = tabledata.value[i].Dcnumber;
      // d.itemselectstatus = true;
    });
  }
};

let copystatus = ref(false);
let copydata = ref({});

const copyaction = (data) => {
  if (copystatus.value && Object.keys(copydata.value).length === 0) {
    copydata.value = data;
  }
  // if (!copystatus.value) {
  //   copydata.value = {};
  //   console.log(copydata.value);
  // }

  if (copystatus.value && Object.keys(copydata.value).length > 0) {
    // console.log(Object.keys(copydata.value).length);
    itemstype.value.appcost = Number(copydata.value.appcost);
    itemstype.value.appxcost = Number(copydata.value.appxcost);
    itemstype.value.calitype = copydata.value.calitype;
    itemstype.value.itemtype = copydata.value.itemtype;
    itemstype.value.itemcode = copydata.value.itemcode;
    itemstype.value.desc = copydata.value.desc;
    itemstype.value.range = copydata.value.range;
  }
};

const copychange = (e) => {
  if (e.target.checked) {
    copystatus.value = true;
  } else {
    // console.log(e.target.checked);
    copystatus.value = false;
    copydata.value = {};
    clearItemsField();
  }
};
let ietmlistdata = ref([]);
let currentstateitemmater = ref(0);
const changeState = (e) => {
  if (e == 2) {
    ietmlistdata.value = [];
  }
  currentstateitemmater.value = e;
};

let createItremInputLength = 0;
const itemlen = (e) => {
  let len = Number(e.target.value);
  if (len != 0) {
    ietmlistdata.value = [];
    for (let i = 0; i < len; i++) {
      ietmlistdata.value.push({
        // itemcode: "",
        desc: "",
        itemtype: "",
        // calitype: "",
        // appcost: "",
      });
    }
  } else {
    ietmlistdata.value = [];
  }
};

const saveitemmaster = (type) => {
  if (type === "upload") {
    let jdata = JSON.stringify(itemsupload.value);
    axios
      .post(
        ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertReceiptItemMaster`,
        jdata
      )
      .then((res) => {
        if (res.data.data === "Success") {
          alert("Items Saved");
        } else {
          alert("Error Saving Data");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  if (type === "insert") {
    if (ietmlistdata.value.length > 0) {
      if (
        ietmlistdata.value.filter(
          (element) => element.desc === "" && element.itemtype === ""
        ).length > 0
      )
        return alert("Cannot Save empty details");
      let jdata = JSON.stringify(ietmlistdata.value);
      axios
        .post(
          ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/insertReceiptItemMaster`,
          jdata
        )
        .then((res) => {
          if (res.data.data === "Success") {
            alert("Items Saved");
          } else {
            alert("Error Saving Data");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      return alert("Cannot Save empty details");
    }
  }
};
const search = (data) => {
  if (tabledata.value !== "") {
    /*if (tabledata.value.receipt === "R") {
      tabledata.value.receipt = "Returnable";
    } else if (tabledata.value.receipt === "NR") {
      tabledata.value.receipt = "Non-returnable";
    }*/
    let jdata = JSON.stringify({
      departmentCode: Number(sessionStorage.getItem("depCode")),
      receipt: data.receipt,
      search: tabledata.value,
    });
    axios
      .post(
        ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/searchReceipt`,
        jdata
      )
      .then((res) => {
        tabledata.value = [];
        if (
          tabledata.value.length >= res.data.length ||
          tabledata.value.length <= res.data.length
        ) {
          // console.log("1st if");

          res.data.forEach((i) => {
            tabledata.value.push(i);
          });

          // console.log(gatePassData.value);
        }

        tabledata.value = {
          Mirnumber: "",
          custname: "",
        };
      })
      .catch((err) => alert(err));
  }
};
let searchdataitem = ref([]);
let serachitem = ref("");
const serachItemMaster = (d) => {
  searchdataitem.value = [];
  axios
    .get(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/searchItemReceipt?query=${d}`
    )
    .then((res) => {
      if (res.data.data) {
        searchdataitem.value = [...res.data.data];
      } else {
        alert("No Data Found");
      }
    });
};
const useReciptModal = () => {
  return {
    reciptEntry,
    handleUpload,
    reciptitems,
    itemsupload,
    itemstype,
    getCustData,
    queryLoading,
    cust,
    staffs,
    getStaffsData,
    addLineEntry,
    deleteData,
    lineEdit,
    lineitems,
    toogleLine,
    filedstatus,
    saveData,
    editline,
    tabledata,
    backdropClose,
    itemmastermodalopen,
    itemslectAll,
    actionClick,
    reciptmodal,
    receiptmodalitem,
    reciptModalShowClose,
    getReciptTableData,
    loading,
    currentstate,
    state,
    prev,
    next,
    pages,
    items,
    itemselect,
    itemchange,
    suppliers,
    getSupplierData,
    passItemsFun,
    passitems,
    receiptnumber,
    postgatepass,
    itemreturn,
    statusupdates,
    itemreject,
    itemcompleted,
    itemdespatched,
    itemcertified,
    today,
    custclick,
    copystatus,
    copydata,
    copyaction,
    copychange,
    saveitemmaster,
    currentstateitemmater,
    changeState,
    ietmlistdata,
    createItremInputLength,
    itemlen,
    searchdataitem,
    serachItemMaster,
    serachitem,
    tempcusdc,
    toggleCustpass,
    // selectallcheck,
    search,
  };
};

export default useReciptModal;

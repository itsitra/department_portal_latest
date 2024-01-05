import axios from "axios"; //for http request
import { ref } from "vue";
import useReciptModal from "./useReciptmodal";

const { getCustData, queryLoading, cust, today, getSupplierData, suppliers } =
  useReciptModal();

let currentstate = ref(1); //for state selection

const tabschange = (state) => {
  currentstate.value = state;
};
let tabmenuitems = ref({
  //for item details
  recItems: 1,
  serviceDes: 1,
  serviceItems: 1,
  thirdpartyCali: 1,
  others: 0,
});

let data = ref({
  //for customer details
  custnamequery: "",
  custid: "",
  fromdate: "",
  todate: "",
  type: "",
  supplierCode: "",
});
const itemsstate = (e, state, name) => {
  let value = Number(e.target.value);
  if (state === 1 && name === "items") {
    //conditions to get the data
    if (value === 1) {
      data.value.custid = "";
      data.value.custnamequery = "";
    }
    tabmenuitems.value.recItems = value;
  }

  if (state === 3 && name === "thirdparty") {
    tabmenuitems.value.thirdpartyCali = value;
    if (
      tabmenuitems.value.thirdpartyCali === 3 ||
      tabmenuitems.value.thirdpartyCali === 5
    ) {
      getSupplierData("CT");
    }
  }
  if (state === 2 && name === "service") {
    tabmenuitems.value.serviceItems = value;
    if (value === 3 || value == 5) {
      getSupplierData("CS");
    }
  }
  if (state === 4 && name === "others") {
    tabmenuitems.value.others = value;
  }
};

let reportableheader = ref([]);
let reporttabledata = ref([]);
let reportdate = ref("");

let reportstate = ref("");

let jsonfields = ref(null);
const reportgenerate = (type) => {
  reportableheader.value = [];
  reporttabledata.value = [];

  if (
    (data.value.fromdate !== "" && data.value.todate !== "") ||
    tabmenuitems.value.thirdpartyCali === 5 ||
    tabmenuitems.value.serviceItems === 5 ||
    tabmenuitems.value.others === 1
  ) {
    if (tabmenuitems.value.recItems === 1 && type === "items") {
      //the condition for item upto 2
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/itemReport",
          jadata
        )
        .then((res) => {
          //conditions as calireportmodal()
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });
            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "itemperioddata";
            jsonfields.value = {
              Sno: "Sno",
              "Date of Receipt": "dateofreceipt",
              "Details of Item": "itemdetails",
              "Received Quantity": "recqty",
            };

            calireportmodal(); //<--
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.recItems === 2 && type === "items") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        custid: data.value.custid.custid,
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/itemReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "itemperioddatacust";
            jsonfields.value = {
              Sno: "Sno",
              "Customer Name": "custname",
              "Date of Receipt": "dateofreceipt",
              "Details of Item": "itemdetails",
              "Received Quantity": "recqty",
            };

            calireportmodal(); //<----- like continous process
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.thirdpartyCali === 1 && type === "thirdparty") {
      //here the condition for thirdparty upto 5
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "sentout",
        receiptgatepass: "thirdparty",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/thirdpartyReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "thirdpartysentout";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.thirdpartyCali === 2 && type === "thirdparty") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "returned",
        receiptgatepass: "thirdparty",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/thirdpartyReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "thirdpartyreturn";
            jsonfields.value = {
              Sno: "Sno",
              "Dc Number": "dcNo",
              "Dc Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details Of Item": "detailsOfItem",
              Quantity: "recqty",
              "Received Quantity": "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.thirdpartyCali === 3 && type === "thirdparty") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "returned",
        receiptgatepass: "thirdparty",
        supplierCode: data.value.supplierCode,
      });

      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/thirdpartyReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "thirdpartyreturnsupplier";
            jsonfields.value = {
              Sno: "Sno",
              "Dc Number": "dcNo",
              "Dc Date": "dcDate",
              "Vendor Name": "Supplier_Name",
              "Details Of Item": "detailsOfItem",
              Quantity: "recqty",
              "Received Quantity": "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.thirdpartyCali === 4 && type === "thirdparty") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "rejected",
        receiptgatepass: "thirdparty",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/thirdpartyReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "thirdpartyrejected";
            jsonfields.value = {
              Sno: "Sno",
              "Dc Number": "dcNo",
              "Dc Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details Of Item": "detailsOfItem",
              Quantity: "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.thirdpartyCali === 5 && type === "thirdparty") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "sentout",
        receiptgatepass: "thirdparty",
        supplierCode: data.value.supplierCode,
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/thirdpartyReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "thirdpartysentoutsupplier"; //reportstate only have difference
            jsonfields.value = {
              Sno: "Sno",
              "Customer Name": "custname",
              "Date of Receipt": "dateofreceipt",
              "Details of Item": "itemdetails",
              "Received Quantity": "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.serviceItems === 1 && type === "service") {
      //here for service upto item=6
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "sentout",
        receiptgatepass: "service",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/serviceReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "servicesentout";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.serviceItems === 2 && type === "service") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "returned",
        receiptgatepass: "service",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/serviceReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "servicereturned";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
              "Received Quantity": "recqty",
              "Receipt Date": "receiptDate",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.serviceItems === 3 && type === "service") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "returned",
        supplierCode: data.value.supplierCode,
        receiptgatepass: "service",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/serviceReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "servicereturnedsupplier";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
              "Received Quantity": "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.serviceItems === 4 && type === "service") {
      let jadata = JSON.stringify({
        fromdate: data.value.fromdate,
        todate: data.value.todate,
        trackStatus: "rejected",
        receiptgatepass: "service",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/serviceReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "servicerejected";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.serviceItems === 5 && type === "service") {
      let jadata = JSON.stringify({
        trackStatus: "sentout",
        receiptgatepass: "service",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/serviceReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "servicesentoutpending";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.serviceItems === 6 && type === "service") {
      let jadata = JSON.stringify({
        trackStatus: "service",
      });
      axios
        .post(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/serviceReport",
          jadata
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "service";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (tabmenuitems.value.others === 1 && type === "others") {
      //here the conditions for others has only one
      axios
        .get(
          " http://192.168.1.9/departmentportalapitestreceipt/index.php/api/sitracalipenReport"
        )
        .then((res) => {
          if (res.data.data !== "Failure") {
            reportableheader.value.push(...res.data.header);

            res.data.data.forEach((e) => {
              e["recqty"] = 1;
            });

            reporttabledata.value.push(...res.data.data);
            reportdate.value = res.data.Reportdate;
            reportstate.value = "others";
            jsonfields.value = {
              Sno: "Sno",
              "SITRA DC NO": "dcNo",
              "DC Date": "dcDate",
              "Vendor Name": "vendorName",
              "Details of item": "detailsOfItem",
              Qty: "recqty",
            };

            calireportmodal();
          } else {
            alert("No Data Found");
            calireportmodal();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  } else {
    alert("Enter Both From Date And To Date");
  }
};

let calireportmodalstatus = ref(false);
const calireportmodal = () => {
  calireportmodalstatus.value = !calireportmodalstatus.value;
};
const useReceiptReport = () => {
  //for return the result
  return {
    currentstate,
    tabschange,
    tabmenuitems,
    itemsstate,
    getCustData,
    queryLoading,
    cust,
    today,
    data,
    reportgenerate,
    reportableheader,
    reporttabledata,
    reportdate,
    reportstate,
    calireportmodalstatus,
    calireportmodal,
    jsonfields,
    suppliers,
  };
};
export default useReceiptReport;

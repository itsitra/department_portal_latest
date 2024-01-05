import { ref } from "vue";

const depName = ref(sessionStorage.getItem("depName"));
const depCode = ref(sessionStorage.getItem("depCode"));
const hodCode = ref(
  sessionStorage.getItem("hodCode") === sessionStorage.getItem("userCode")
);

let calireportmodalstatus = ref(false);
const calireportmodal = () => {
  calireportmodalstatus.value = !calireportmodalstatus.value;
};
const dash = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },
  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);

const menus = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },
  {
    title: "Gate Pass",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/supplier",
        title: "Supplier",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/gatepass",
        title: "Pass Entry",
        icon: "fas fa-shipping-fast",
      },
      {
        href: "/samplegatepass",
        title: "Sample GP",
        icon: "fas fa-vial",
      },
      {
        href: "/returnentry",
        title: "Item Return",
        icon: "fas fa-truck-loading",
      },
      {
        href: "/pending",
        title: "Pending Returnable",
        icon: "fas fa-exclamation",
      },
    ],
  },
  {
    title: "Inventory",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/item",
        title: "Item",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/grn",
        title: "GRN",
        icon: "fas fa-boxes",
      },
      {
        href: "/consumption",
        title: "Consumption",
        icon: "fas fa-box-open",
      },
      {
        href: "/transfer",
        title: "Transfer",
        icon: "fas fa-people-carry",
        // badge: {
        //   text: "Comming Soon",
        //   class: "default-badge",
        // },
      },
      {
        href: "/stock",
        title: "Stock",
        icon: "fas fa-dolly-flatbed fas",
      },
    ],
  },
  {
    title: "Textile Engg",
    icon: "fa-regular fa-folder",
    child: [
      {
        title: "Electrical Calculation",
        href: "/engineering",
        icon: "fas fa-square-root-alt",
      },
      {
        title: "Textile Calc",
        icon: "fas fa-atlas",
        child: [
          {
            href: "/upload",
            title: "File uploads",
            icon: "fas fa-cloud-upload-alt",
          },
          {
            href: "/",
            title: "UKG",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
          {
            href: "/",
            title: "Exp Power",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
          {
            href: "/",
            title: "PCY,PSV,VSS",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
          {
            href: "/",
            title: "Ober Param",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
        ],
      },
    ],
  },
  {
    title: "Trainning",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/empStats",
        title: "Candidate's Stat",
        icon: "fas fa-chart-line",
      },
      {
        title: "Mill Details",
        icon: "fas fa-archive",
        child: [
          {
            href: "/milldetails",
            title: "Mill Records",
            icon: "fas fa-address-book",
          },
        ],
      },
      {
        href: "/conference",
        title: "Conference Trainning",
        icon: "fas fa-chart-line",
      },
    ],
  },

  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);

const purchase = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },
  {
    title: "Gate Pass",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/supplier",
        title: "Supplier",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/gatepass",
        title: "Pass Entry",
        icon: "fas fa-shipping-fast",
      },
      {
        href: "/samplegatepass",
        title: "Sample GP",
        icon: "fas fa-vial",
      },
      {
        href: "/returnentry",
        title: "Item Return",
        icon: "fas fa-truck-loading",
      },
      {
        href: "/pending",
        title: "Pending Returnable",
        icon: "fas fa-exclamation",
      },
    ],
  },
  {
    title: "Inventory",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/item",
        title: "Item",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/grn",
        title: "GRN",
        icon: "fas fa-boxes",
      },
      {
        href: "/consumption",
        title: "Consumption",
        icon: "fas fa-box-open",
      },
      {
        href: "/transfer",
        title: "Transfer",
        icon: "fas fa-people-carry",
        // badge: {
        //   text: "Comming Soon",
        //   class: "default-badge",
        // },
      },
      {
        href: "/stock",
        title: "Stock",
        icon: "fas fa-dolly-flatbed fas",
      },
    ],
  },
  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);

const eng = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },
  //   {
  //     title: "Gate Pass",
  //     icon: "fa-regular fa-folder",
  //     child: [
  //       {
  //         href: "/supplier",
  //         title: "Supplier",
  //         icon: "fas fa-cart-plus",
  //       },
  //       {
  //         href: "/gatepass",
  //         title: "Pass Entry",
  //         icon: "fas fa-shipping-fast",
  //       },
  //       {
  //         href: "/samplegatepass",
  //         title: "Sample GP",
  //         icon: "fas fa-vial",
  //       },

  //       {
  //         href: "/pending",
  //         title: "Pending Returnable",
  //         icon: "fas fa-exclamation",
  //       },
  //     ],
  //   },
  {
    title: "Calibration Lab",
    icon: "fas fa-receipt",
    child: [
      {
        href: "/supplier",
        title: "Supplier",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/recipt",
        title: "Receipt",
        icon: "fas fa-receipt",
      },
      {
        href: "/gatepass",
        title: "Pass Entry",
        icon: "fas fa-shipping-fast",
      },

      {
        title: "Reports",
        icon: "fas fa-file-download",
      },
      {
        href: "/pending",
        title: "Pending Returnable",
        icon: "fas fa-exclamation",
      },
    ],
  },
  {
    title: "Textile Engg",
    icon: "fa-regular fa-folder",
    child: [
      {
        title: "Electrical Calculation",
        href: "/engineering",
        icon: "fas fa-square-root-alt",
      },
      {
        title: "Textile Calc",
        icon: "fas fa-atlas",
        child: [
          {
            href: "/upload",
            title: "File uploads",
            icon: "fas fa-cloud-upload-alt",
          },
          {
            href: "/",
            title: "UKG",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
          {
            href: "/",
            title: "Exp Power",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
          {
            href: "/",
            title: "PCY,PSV,VSS",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
          {
            href: "/",
            title: "Ober Param",
            icon: "fas fa-square-root-alt",

            badge: {
              text: "Comming Soon",
              class: "default-badge",
            },
          },
        ],
      },
    ],
  },
  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);

const training = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },
  {
    title: "Gate Pass",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/supplier",
        title: "Supplier",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/gatepass",
        title: "Pass Entry",
        icon: "fas fa-shipping-fast",
      },
      {
        href: "/samplegatepass",
        title: "Sample GP",
        icon: "fas fa-vial",
      },
      {
        href: "/returnentry",
        title: "Item Return",
        icon: "fas fa-truck-loading",
      },
    ],
  },
  {
    title: "Trainning",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/empStats",
        title: "Candidate's Stat",
        icon: "fas fa-chart-line",
      },
      {
        title: "Mill Details",
        icon: "fas fa-archive",
        child: [
          {
            href: "/milldetails",
            title: "Mill Records",
            icon: "fas fa-address-book",
          },
        ],
      },
      {
        href: "/conference",
        title: "Conference Trainning",
        icon: "fas fa-chart-line",
      },
    ],
  },
  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);

const coechem = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },
  {
    title: "Gate Pass",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/supplier",
        title: "Supplier",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/gatepass",
        title: "Pass Entry",
        icon: "fas fa-shipping-fast",
      },
      {
        href: "/samplegatepass",
        title: "Sample GP",
        icon: "fas fa-vial",
      },
      {
        href: "/returnentry",
        title: "Item Return",
        icon: "fas fa-truck-loading",
      },
    ],
  },
  {
    title: "Inventory",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/item",
        title: "Item",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/grn",
        title: "GRN",
        icon: "fas fa-boxes",
      },
      {
        href: "/consumption",
        title: "Consumption",
        icon: "fas fa-box-open",
      },
      {
        href: "/transfer",
        title: "Transfer",
        icon: "fas fa-people-carry",
      },
    ],
  },
  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);

const subDep = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },

  {
    title: "Gate Pass",
    icon: "fa-regular fa-folder",
    child: [
      {
        href: "/supplier",
        title: "Supplier",
        icon: "fas fa-cart-plus",
      },
      {
        href: "/gatepass",
        title: "Pass Entry",
        icon: "fas fa-shipping-fast",
      },
      {
        href: "/samplegatepass",
        title: "Sample GP",
        icon: "fas fa-vial",
      },
      {
        href: "/returnentry",
        title: "Item Return",
        icon: "fas fa-truck-loading",
      },
    ],
  },
  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);

const gateSecurity = ref([
  {
    header: "Department Portal",
    title: "Main Navigation",
    hiddenOnCollapse: true,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: "fa-regular fa-folder",
  },
  {
    href: "/details",
    title: "Details",
    icon: "fas fa-qrcode",
  },

  {
    title: "Log-out",
    icon: "fa-solid fa-power-off",
    class: "logout",
  },
  {
    header: `${
      hodCode.value ? `${depName.value} HOD` : `${depName.value} Staff`
    }`,
    class: "separator",
    hiddenOnCollapse: true,
  },
]);
const whichMenu = () => {
  return depCode.value == "1" || depCode.value == "2"
    ? menus.value
    : depCode.value == "10"
    ? eng.value
    : depCode.value == "4"
    ? purchase.value
    : depCode.value == "6" ||
      depCode.value == "13" ||
      depCode.value == "12" ||
      depCode.value == "14" ||
      depCode.value == "15" ||
      depCode.value == "16"
    ? coechem.value
    : depCode.value == "11"
    ? training.value
    : depCode.value == "3" ||
      depCode.value == "5" ||
      depCode.value == "7" ||
      depCode.value == "8" ||
      depCode.value == "9" ||
      depCode.value == "18"
    ? subDep.value
    : depCode.value == "17"
    ? gateSecurity.value
    : menus.value;
};

const usedashboard = () => {
  return {
    menus,
    purchase,
    eng,
    training,
    coechem,
    subDep,
    dash,
    depCode,
    whichMenu,
    calireportmodalstatus,
    calireportmodal,
    hodCode,
  };
};

export default usedashboard;

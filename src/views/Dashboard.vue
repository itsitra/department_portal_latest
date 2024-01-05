<template>
  <div class="">
    <sidebar-menu
      :menu="finalMenu"
      :theme="theme"
      :width="width"
      @item-click="onItemClick"
    />
    <div id="content">
      <div class="lg:pl-0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { useRouter } from "vue-router";
import { onBeforeMount, ref } from "@vue/runtime-core";

export default {
  name: "Dashboard",
  components: {
    SidebarMenu,
  },
  props: {
    theme: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "300px",
    },
  },
  setup() {
    const router = useRouter();

    const depName = ref(sessionStorage.getItem("depName"));
    const depCode = ref(sessionStorage.getItem("depCode"));
    const hodCode = ref(
      sessionStorage.getItem("hodCode") === sessionStorage.getItem("userCode")
    );

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
            icon: "fas fa-users",
          },
          {
            href: "/events",
            title: "Sitra Events",
            icon: "fas fa-address-book",
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
            href: "/receipt",
            title: "Receipt",
            icon: "fas fa-receipt",
            // disabled: true,
          },
          {
            href: "/gatepass",
            title: "Pass Entry",
            icon: "fas fa-shipping-fast",
          },

          {
            href: "/receiptreports",
            title: "Reports",
            icon: "fas fa-file-download",
            // disabled: true,
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
          {
            href: "/events",
            title: "Sitra Events",
            icon: "fas fa-address-book",
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
        title: "JTC",
        icon: "fa-regular fa-folder",
        child: [
          {
            href: "/conference",
            title: "Conference Trainning",
            icon: "fas fa-chart-line",
          },
          // {
          //   href: "/events",
          //   title: "Sitra Events",
          //   icon: "fas fa-address-book",
          // },
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

    let finalMenu = ref(null);
    onBeforeMount(() => {
      finalMenu.value = whichMenu();
    });

    const onItemClick = (event, item) => {
      if (item.title == "Log-out") {
        sessionStorage.clear();
        router.push({ name: "Home" });
        location.reload();
      }

      // console.log(window.location.pathname);
      // if (window.location.pathname === "/conference") {
      //   console.log(item.href);
      //   window.history.pushState(item.href);
      // }
      // if (item.title === 'Reports' && route.name === 'Receipt') {
      //   calireportmodal()
      // }
    };

    // watch(() => route.name, () => {
    //   calireportmodalstatus.value = false
    // });
    // calireportmodal, calireportmodalstatus

    return {
      menus,
      purchase,
      eng,
      training,
      coechem,
      subDep,
      dash,
      depCode,
      onItemClick,
      hodCode,
      finalMenu,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&display=swap");

.v-sidebar-menu {
  background-color: #2e3345;
}

.v-sidebar-menu .vsm--header {
  color: rgb(255, 255, 255);
}

.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
  background-color: transparent;
}

.v-sidebar-menu .vsm--header {
  font-size: 19px;
  font-family: "Fira Sans", sans-serif;
  letter-spacing: 2px;
  color: #34ffce;
}

.v-sidebar-menu .vsm--header.separator {
  width: auto;
  border-top: 1px solid;
  font-size: 15px;

  text-align: center;
  background: rgb(52, 255, 206);
  background: linear-gradient(
    90deg,
    rgba(52, 255, 206, 1) 0%,
    rgba(46, 51, 69, 1) 81%
  );
}

.v-sidebar-menu {
  position: fixed;
}

.v-sidebar-menu .vsm--title {
  color: #34ffce;
}

.v-sidebar-menu .vsm--icon {
  color: #34ffce;
}

.v-sidebar-menu .vsm--badge {
  color: azure;
  font-size: 12px;
}

.v-sidebar-menu.vsm_expanded .vsm--link_level-1.vsm--link_open {
  background-color: #2e3345;
}

.v-sidebar-menu.vsm_expanded .vsm--link_level-1.vsm--link_open .vsm--icon {
  background-color: #34ffce;
  color: black;
}

.v-sidebar-menu .vsm--link_level-1.vsm--link_active {
  -webkit-box-shadow: 3px 0 0 0 #34ffce inset;
  box-shadow: inset 3px 0 0 0 #34ffce;
}

.v-sidebar-menu .vsm--link.logout {
  margin-top: auto;
}

.v-sidebar-menu .vsm--badge_default,
.v-sidebar-menu .vsm--toggle-btn {
  color: #fff;
  background-color: #1e1e21;
  display: none;
}
</style>
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import pdf from "../views/Pdf.vue";

const requireAuth = (to, from, next) => {
  if (!sessionStorage.getItem("depCode")) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pdf/:id/:depCode",
    name: "pdf",
    component: pdf,
    props: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,

    children: [
      {
        path: "/details",
        name: "Details",
        component: () =>
          import(/*webpackChunkName:"supplier"*/ "../views/Details.vue"),
      },
      {
        path: "/supplier",
        name: "Supplier",
        component: () =>
          import(/*webpackChunkName:"supplier"*/ "../views/Supplier.vue"),
      },
      {
        path: "/upload",
        name: "Upload",
        component: () =>
          import(/*webpackChunkName:"supplier"*/ "../views/uploads.vue"),
      },
      {
        path: "/engineering",
        name: "Engineering",
        component: () =>
          import(/*webpackChunkName:"supplier"*/ "../views/Engineering.vue"),
      },
      {
        path: "/receipt",
        name: "Receipt",
        component: () =>
          import(/*webpackChunkName:"supplier"*/ "../views/Receipt.vue"),
      },
      {
        path: "/receiptreports",
        name: "ReceiptReport",
        component: () =>
          import(/*webpackChunkName:"supplier"*/ "../views/ReceiptReport.vue"),
      },
      {
        path: "/empStats",
        name: "Candidates Stats",
        component: () =>
          import(/*webpackChunkName:"supplier"*/ "../views/Training.vue"),
      },

      {
        path: "/gatepass",
        name: "GatePass",
        component: () =>
          import(/*webpackChunkName:"gatepass"*/ "../views/Gatepass.vue"),
      },
      {
        path: "/samplegatepass",
        name: "SamplePass",
        component: () =>
          import(/*webpackChunkName:"gatepass"*/ "../views/Samplepass.vue"),
      },
      {
        path: "/returnentry",
        name: "Itemreturnentry",
        component: () =>
          import(
            /*webpackChunkName:"itemreturnentry"*/ "../views/Itemreturnentry.vue"
          ),
      },
      {
        path: "/pending",
        name: "Pending",
        component: () =>
          import(/*webpackChunkName:"pending"*/ "../views/Pending.vue"),
      },
      {
        path: "/item",
        name: "Item",
        component: () =>
          import(/*webpackChunkName:"item"*/ "../views/Item.vue"),
      },
      {
        path: "/grn",
        name: "GRN",
        component: () => import(/*webpackChunkName:"grn"*/ "../views/Grn.vue"),
      },
      {
        path: "/consumption",
        name: "Consumption",
        component: () =>
          import(/*webpackChunkName:"consumption"*/ "../views/Consumption.vue"),
      },
      {
        path: "/transfer",
        name: "Transfer",
        component: () =>
          import(/*webpackChunkName:"transfer"*/ "../views/Transfer.vue"),
      },
      {
        path: "/stock",
        name: "Stock",
        component: () =>
          import(/*webpackChunkName:"stock"*/ "../views/Stock.vue"),
      },
      {
        path: "/milldetails",
        name: "Mill Details",
        component: () =>
          import(/*webpackChunkName:"MillDetails"*/ "../views/MillDetails.vue"),
      },
      {
        path: "/conference",
        name: "Conference Trainning",
        component: () =>
          import(/*webpackChunkName:"conference"*/ "../views/Conference.vue"),
      },
      {
        path: "/events",
        name: "events",
        component: () =>
          import(/*webpackChunkName:"conference"*/ "../views/Events.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // base: process.env.NODE_ENV === "development" ? "/" : "/Departmentportal/",
  routes,
});

export default router;

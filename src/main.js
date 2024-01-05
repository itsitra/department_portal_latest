import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import excel from "vue-excel-export";
import "vue-select/dist/vue-select.css";
import VueQRCodeComponent from "vue-qrcode-component";
import vSelect from "vue-select";

createApp(App)
  .component("v-select", vSelect)
  .component("qr-code", VueQRCodeComponent)
  .use(excel)
  .use(router)
  .mount("#app");

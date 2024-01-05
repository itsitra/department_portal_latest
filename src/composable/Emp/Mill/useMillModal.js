import axios from "axios";
import { ref } from "vue";

import mill from "./useMill";

const { closeModal } = mill();

const amount = ref(Number());
const cgst = ref(Number());
const sgst = ref(Number());
const igst = ref(Number());
const gross = ref(Number());
const clicked = ref(false);

const postdata = (d) => {
  clicked.value = true;
  let jdata = JSON.stringify(d);
  axios
    .post(
      `http://sitraonline.org.in/employementhubapi/index.php/api/postSitProforma`,
      jdata
    )
    .then((res) => {
      if (res.data.data) {
        clicked.value = false;
        closeModal();
      } else {
        clicked.value = false;
        alert("Error Saving Data");
        closeModal();
      }
    })
    .catch((err) => {
      clicked.value = false;
      alert(err);
    });
};

const millProformaModal = () => {
  return {
    amount,
    cgst,
    sgst,
    igst,
    gross,
    postdata,
    clicked,
  };
};

export default millProformaModal;

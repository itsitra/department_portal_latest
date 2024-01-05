import axios from "axios";
import { ref } from "vue";
import ConferencePaginate from "./ConferencePagination";

const { getData, conferenceData } = ConferencePaginate();

const currentState = ref(1);

let conferenceExport = ref([]);

let modal = ref(false);

const showModal = (i) => {
  modal.value = true;
  let temp = conferenceData.value[i].participants;
  participants.value = [...temp];
};

const closeModal = () => {
  modal.value = false;
};
let participants = ref([]);

const state = (pageNumber) => {
  currentState.value = pageNumber;
  getData(currentState.value);
};

const prev = () => {
  currentState.value--;
};

const next = () => {
  currentState.value++;
};
if (currentState.value == 1) {
  getData(currentState.value);
}

const getDataExcelConference = async () => {
  // console.log("clicked", pageNo);
  conferenceExport.value = [];
  await axios
    .get(
      ` http://192.168.1.9/departmentportalapitestreceipt/index.php/api/conferenceExport`
    )
    .then((res) => {
      // console.log(res.data);
      if (res.data) {
        res.data.forEach((i) => {
          conferenceExport.value.push(i);
        });
        // console.log(conferenceExport.value);
      }
    })
    .catch((err) => alert(err));
};
const ConferenceTable = () => {
  return {
    state,
    prev,
    next,
    currentState,
    showModal,
    closeModal,
    modal,
    participants,
    getDataExcelConference,
    conferenceExport,
    // ConferencePaginate,
  };
};

export default ConferenceTable;

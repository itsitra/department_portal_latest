import axios from "axios";
import { ref } from "vue";

getApplication()
const empStats=ref([])
let data = ref(true)

function getApplication(){
  
      let headersList = {
        "Accept": "*",
        "Content-Type": "application/json" 
       }
       let reqOptions = {
        url: "http://sitraonline.org.in/employementhubapi/index.php/api/totalView",
        method: "GET",
        headers: headersList,
       
      }
      axios.request(reqOptions).then(function (response) {
        // console.log(response.data)
        empStats.value.push({
          totalReg:response.data[0].total,
          totalAppl:response.data[1].total,
          totalQual:response.data[2].total,
          totalExp:response.data[3].total,
          totalLang:response.data[4].total,
          totalOther:response.data[5].total,
          totalPaySuc:response.data[6].total,
          totalPayFail:response.data[7].total

          })
        // console.log(empStats.value[0].totalReg);
        data.value = false
      })
     
}


const useStats =()=>{
  return{
   empStats,getApplication,data
  }
}

export default useStats
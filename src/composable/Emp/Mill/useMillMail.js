import axios from "axios";
import { ref } from "vue";

const loading = ref(false)

const mailProforma=(d)=>{
    
    loading.value = true
    let jdata = JSON.stringify(d)
    // console.log(jdata,"clicked")
    // axios.post(`https://sitramailer.herokuapp.com/ProformaMail`,jdata).then(res=>{
    axios.post(`http://192.168.1.19:4000/ProformaMail`,jdata).then(res=>{
        if (res.data.data[0]) {
       loading.value = true
       alert("Mail Sent")
        }else if (res.data.data){
            loading.value = true
            alert("Error Sending mail");
        }
    }).catch(err=>{
    alert(err)
    loading.value = true
})
}

const millMail =()=>{
    return{
        mailProforma,loading
    }
}

export default millMail
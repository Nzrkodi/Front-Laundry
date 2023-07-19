import iziToast from "izitoast";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { useRouter } from "vue-router";

const envSctructure = {
  production:'production',
  staging:'staging',
  development:'development',
  local:'local',
  prod:'production',
  stg:'staging',
  dev:'development',
  prd:'production',
  loc:'local'
}

const router = useRouter()

export default{
  envTransform(env) {
    return envSctructure[env]
  },

  getRange(meta){
    let page = meta.page || 1;
    let limit = meta.limit || 10;
  
    let start = (page - 1) * limit + 1;
    let end = start + limit - 1;
  
    return {
      start: start,
      end: end
    };
  },

  getNumber(index, meta){
    const range = this.getRange(meta);
	  return range.start + index;
  },

  toastSuccess(opt) {
    switch (opt.type) {
      case "success":
        iziToast.success({
          title: opt.title,
          message: opt.msg,
          position: "topRight"
        });
        break;
      
      case "info":
        iziToast.info({
          title: opt.title,
          message: opt.msg,
          position: "topRight"
        });
        break;

      case "warning":
        iziToast.warning({
          title: opt.title,
          message: opt.msg,
          position: "topRight"
        });
        break;

      case "error":
        iziToast.error({
          title: opt.title,
          message: opt.msg,
          position: "topRight"
        });
        break;
    
      default:
        break;
    }
  },

  sweetAlertQuestion(opt){
    Swal.fire({
      title             : opt.title,
      text              : opt.msg,
      icon              : 'warning',
      showCancelButton  : true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : opt.confirmMsg,
      cancelButtonText  : 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        opt.callback()
      }
    })
  },

  encryptScope(scope){
    let token = scope
    let tokenEncrypt = CryptoJS.AES.encrypt(
      token,
      import.meta.env.VITE_ENCRYPT_KEY
    ).toString();
    localStorage.setItem("scope", tokenEncrypt)
  },

  getDecryptScope(){
    let tokenEncrypt = localStorage.getItem("scope")
    let tokenDecrypt = CryptoJS.AES.decrypt(
      tokenEncrypt,
      import.meta.env.VITE_ENCRYPT_KEY
    ).toString(CryptoJS.enc.Utf8)

    return tokenDecrypt
  },

  tokenConfig(){
    const userToken = localStorage.getItem("token")
    return {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  },

  checkIfLogin(status){
    if (status == 401) {
      localStorage.clear()

      this.toastSuccess({
        type: "warning",
        title: "Sesi login telah berakhir",
        msg: "Login kembali untuk masul"
      })

      return true
    } else {
      return false
    }
  }
}
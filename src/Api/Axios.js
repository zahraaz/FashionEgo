import axios from "axios";

const api = axios.create({
  baseURL:"http://localhost:8000"
});



api.interceptors.request.use(async(config)=>{
const token=JSON.parse(localStorage.getItem("user"));


if(token){
  config.headers["authorization"]=`Bearer ${token.token}`
}
return config;

})




export { api };
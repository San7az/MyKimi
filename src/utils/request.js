import axios from 'axios'
const instance = axios.create({
  baseURL:'',
  timeout:1000,
  headers:{}
})

instance.interceptors.request.use(function(config){
  return config;
}, function (error){
  return Promise.reject(error);
});

instance.interceptors.response.use
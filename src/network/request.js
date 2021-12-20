import axios from "axios";
export function request(config) {
  const instance1 = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    // timeout: 10000,
  });
  instance1.interceptors.request.use(config => {
    return config
  }, err => {
    console.log('请求报错', err)
  })
  instance1.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('响应报错', err)
  })
  return instance1(config)
}

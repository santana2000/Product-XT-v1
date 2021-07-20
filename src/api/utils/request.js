import axios from 'axios'
import { Message } from 'element-ui'
import { ld } from '@/api/utils/loading'
import { config } from '_vue@2.6.12@vue/types/umd';

// 如何发起并发请求

const TIME_OUT = 10000;
const BASE_URL = window.GlobalConfig.BASE_URL;
const service = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    withCredentials: false
})

// getHeader需要再次封装，可自定义配置请求头
service.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

service.interceptors.request.use(
    (config) => {
        if (config.timeout > TIME_OUT) {
            Message({
                message: `请求超时，当前为${config.timeout / 1000}秒`,
                type: 'warning',
                duration: 1500
            })
        }
        return config;

    },
    (error) => {
        console.log(error,'error');
        return Promise.reject(error)
    }
);

service.interceptors.response.use(
    (response) => {
        // 需要统一走promise吗
        // res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
        if (response.status === 200) {
            if (response.config.method === 'put') {
                Message({
                    message: `请求成功`,
                    type: 'success',
                    duration: 1500
                })
            }
            return response.data || response.data.data;
        } else {
            Message({
                message: response.data.msg,
                type: 'warning',
                duration: 1500
            })
            return Promise.reject(response)
        }
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default service

// 请求方法的封装
// 接口api的统一管理
export const get = config => service({ method: "get", ...config })
export const post = config => service({ method: "post", ...config })
export const del = config => service({ method: "delete", ...config })
export const put = config => service({ method: "put", ...config })
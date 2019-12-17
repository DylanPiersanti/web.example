import axios from 'axios';

export default {
    install(Vue) {

        const headers = {
            'Content-Type': 'application/json',
        }

        const token = localStorage.getItem('token')
        if (token) {
            headers.authorization = `Bearer ${token}`
        }


        const instance = axios.create({
            baseURL: 'http://localhost:3000/',
            headers
        })

        instance.interceptors.response.use(response => response, error => {
            /**
             * Redirect to login when Jwt is expired
             */
            if (error.response &&
                error.response.status === 401 &&
                error.response.config.headers.authorization) {
                // Remove localStorage token
                localStorage.removeItem('token')
                window.location = './'
            }
            return Promise.reject(error)
        })

        Vue.prototype.$axios = instance
    }
}
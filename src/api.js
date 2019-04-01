import axios from "axios";
import store from "./store"

const API = axios.create({
    baseURL: '/api'
})

function setAPIToken(token) {
    API.defaults.headers = {
        "Authorization": "Bearer " + token
    }
}

// We want to intercept API errors. If they are 401 (Unauthorized) or
// 403 (Forbidden), we want to make sure the user is logged out.

API.interceptors.response.use(null, (error) => {
    if(store.state.isLoggedIn) {
        let status = error.response.status
        if(status === 401 || status === 403) {
            store.commit('logoutUser')
        }
    }
    return Promise.reject(error)
})

export default API
export {API, setAPIToken}
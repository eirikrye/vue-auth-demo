import Vue from "vue"
import Vuex from "vuex"

import { API, setAPIToken } from "./api"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    isAdmin: false,
    apiToken: "",
    userProfile: null,
    numLoading: 0
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    isLoading: state => state.numLoading > 0,
    hasProfile: state => state.userProfile !== null,
    isAdmin: state => state.isAdmin || false
  },
  mutations: {
    loginUser(state, token) {
      state.isLoggedIn = true
      state.apiToken = token
      localStorage.setItem("apiToken", token)
      setAPIToken(token)
    },
    logoutUser(state) {
      state.isLoggedIn = false
      localStorage.removeItem("apiToken")
      state.apiToken = ""
      state.userProfile = null
      state.username = null
    },
    loadUser(state, user) {
      let profile = user.profile
      state.userProfile = profile
      state.isAdmin = user.admin
      state.username = user.username
    },
    incLoading(state) {
      state.numLoading += 1
    },
    subLoading(state) {
      state.numLoading -= 1
    }
  },
  actions: {
    // login(context, credentials) {
    //   return new Promise((resolve, reject) => {
    //     context.commit("startLoading")
    //     API.post("/login", credentials)
    //       .then(result => {
    //         let token = result.data.token
    //         context.commit("loginUser", token)
    //         return context.dispatch("getProfile")
    //       })
    //       .then(profile => {
    //         console.log("then profile: ", profile)
    //         resolve()
    //       })
    //       .catch(error => {
    //         console.log(error)
    //         reject(error)
    //       })
    //       .finally(() => {
    //         context.commit("stopLoading")
    //       })
    //   })
    // },
    async login(context, credentials) {
      context.commit("incLoading")
      try {
        let result = await API.post("/login", credentials)
        let token = result.data.token
        context.commit("loginUser", token)
        await context.dispatch("getProfile")
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      } finally {
        context.commit("subLoading")
      }
    },
    getProfile(context) {
      return new Promise((resolve, reject) => {
        context.commit("incLoading")
        API.get("/me")
          .then(result => {
            let user = result.data
            context.commit("loadUser", user)
            resolve(user)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
          .finally(() => {
            context.commit("subLoading")
          })
      })
    },
    async updateProfile(context, newProfile) {
      const data = {
        profile: newProfile
      }
      context.commit("incLoading")
      try {
        let result = await API.patch("/me", data)
        let user = result.data
        context.commit("loadUser", user)
      } catch (err) {
        console.log(err)
      } finally {
        context.commit("subLoading")
      }
    }
  }
})

// Let's see if an apiToken has been stored in the browser's localStorage.
// In that case, we make sure the user is logged in.

const apiToken = localStorage.getItem("apiToken")

if (apiToken) {
  store.commit("loginUser", apiToken)
  store.dispatch("getProfile")
}

export default store

import Vue from "vue"
import Vuex from "vuex"

import { API, setAPIToken } from "./api"

// https://gist.github.com/jed/982883
let generateUUID = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateUUID)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    isAdmin: false,
    apiToken: "",
    userProfile: null,
    numLoading: 0,
    notifications: []
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
    addNotification(state, data) {
      let notification = {
        uuid: generateUUID(),
        severity: data.severity,
        contents: data.contents
      }
      state.notifications.push(notification)
    },
    dismissNotification(state, uuid) {
      state.notifications = state.notifications.filter((notification) => {
        return notification.uuid !== uuid
      })
    },
    incLoading(state) {
      state.numLoading += 1
    },
    subLoading(state) {
      state.numLoading -= 1
    }
  },
  actions: {
    async login(context, credentials) {
      context.commit("incLoading")
      try {
        let result = await API.post("/login", credentials)
        let token = result.data.token
        context.commit("loginUser", token)
        context.commit("addNotification", {
          "severity": "success",
          "contents": "Login successful!"
        })
        await context.dispatch("getProfile")
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      } finally {
        context.commit("subLoading")
      }
    },
    async getProfile(context) {
      context.commit("incLoading")
      try {
        let result = await API.get("/me")
        let user = result.data
        context.commit("loadUser", user)
        return Promise.resolve(user)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        context.commit("subLoading")
      }
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
        context.commit("addNotification", {
          "severity": "success",
          "contents": "Profile updated!"
        })
        return Promise.resolve()
      } catch (err) {
        context.commit("addNotification", {
          "severity": "danger",
          "contents": "Failed to update profile!"
        })
        return Promise.reject(err)
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

import Vue from 'vue'
import Vuex from 'vuex'

import { API, setAPIToken } from './api';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiToken: '',
    profile: {},
    isProfileLoaded: false,
    loading: false
  },
  mutations: {
    loginUser(state, token) {
      state.isLoggedIn = true
      state.apiToken = token
      localStorage.setItem('apiToken', token)
      setAPIToken(token)
    },
    logoutUser(state) {
      state.isLoggedIn = false
      localStorage.removeItem('apiToken')
      state.apiToken = ''
      state.isProfileLoaded = false
      state.profile = {}
    },
    setProfile(state, profile) {
      state.isProfileLoaded = true
      state.profile = profile
    },
    startLoading(state) {
      console.log("Start loading.")
      state.loading = true
    },
    stopLoading(state) {
      console.log("Stop loading.")
      state.loading = false
    }
  },
  actions: {
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        context.commit('startLoading')
        API.post('/login', credentials)
          .then(async (result) => {
            let token = result.data.token
            context.commit('loginUser', token)
            await context.dispatch('getProfile')
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject()
          })
          .finally(() => {
            context.commit('stopLoading')
          })
      })
    },
    getProfile(context) {
      return new Promise((resolve, reject) => {
        context.commit('startLoading')
        API.get('/me')
          .then((result) => {
            let profile = result.data
            context.commit('setProfile', profile)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject()
          })
          .finally(() => {
            context.commit('stopLoading')
          })
      })
    }
  }
})

// Let's see if an apiToken has been stored in the browser's localStorage.
// In that case, we make sure the user is logged in.

const apiToken = localStorage.getItem('apiToken')

if (apiToken) {
  store.commit('loginUser', apiToken)
  store.dispatch('getProfile')
}

export default store

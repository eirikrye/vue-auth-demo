import Vue from "vue"
import Router from "vue-router"
import store from "./store"


import Home from "./views/Home.vue"
import Login from "./views/Login.vue"
import UserProfile from "./views/UserProfile.vue"
import AllUsers from './views/AllUsers.vue'
import Admin from "./views/Admin.vue"

Vue.use(Router)

function adminGuard(to, from, next) {
  if (store.getters.isLoggedIn) {
    if (store.getters.isAdmin) {
      next()
    } else {
      next(false)
    }
  } else {
    next({ name: "login" })
  }
}

function authenticatedGuard(to, from, next) {
  if (store.state.isLoggedIn) {
    next()
  } else {
    next({ name: "login" })
  }
}

function unauthenticatedGuard(to, from, next) {
  if (store.state.isLoggedIn) {
    next({ name: "profile" })
  } else {
    next()
  }
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: 'is-active',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/me",
      name: "profile",
      component: UserProfile,
      beforeEnter: authenticatedGuard
    },
    {
      path: "/users",
      name: "users",
      component: AllUsers,
      beforeEnter: authenticatedGuard
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: unauthenticatedGuard
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      beforeEnter: adminGuard
    }
  ]
})

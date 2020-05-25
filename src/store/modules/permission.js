import { asyncRoutes, constantRoutes } from '@/router'
import * as menuApi from '@/api/system/sysmenu'
import store from '../index'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // 上面是原前端控制路由
      // 下面是后台动态生成路由传递给前端
      const userId = store.getters.userId
      menuApi
        .generateRoute({ userId })
        .then(res => {
          accessedRoutes = generateVueRoute(res.data)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }).catch(error => {
          console.log('request', error)
        })
    }).catch(error => {
      console.log('promise', error)
      reject(error)
    })
  }
}

function generateVueRoute(routes) {
  const newRoutes = []
  for (const route of routes) {
    if (route.component == 'layout') {
      route.component = () => import('@/layout')
    } else {
      route.component = view(route.component)
      // route.component = ()=> import(route.component);
    }
    if (route.children && route.children.length) {
      route.children = generateVueRoute(route.children)
    }
    newRoutes.push(route)
  }
  // 添加404（不知放在常规路由就会有问题，把异步路由放在前面也是）
  newRoutes.push({ path: '*', redirect: '/404', hidden: true })
  return newRoutes
}

function view(path) {
  return function(resolve) {
    require([`@/views/${path}.vue`], resolve)
  }
  // return function (resolve) {
  //   import(`@/views/${path}.vue`).then(mod => {
  //     resolve(mod)
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

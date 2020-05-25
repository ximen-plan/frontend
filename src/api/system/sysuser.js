import request from '@/utils/request'

const api = {
  login: '/system/sysUser/login',
  logout: '/system/sysUser/logout',
  info: '/system/sysUser/getUserInfo',
  findUserById: '/system/sysUser/findById',
  update: '/system/sysUser/update',
  page: '/system/sysUser/page',
  add: '/system/sysUser/add'
}

//登录
export function login(data) {
  return request({
    url: api.login,
    method: 'post',
    data
  })
}

//获取用户信息
export function getInfo(token) {
  return request({
    url: api.info,
    method: 'get',
  })
}

//登出
export function logout() {
  return request({
    url: api.logout,
    method: 'get'
  })
}


//分页查询
export function page(params) {
  return request({
    url: api.page + '/' + params.pageNumber + '/' +params.pageSize,
    method: 'get',
    params: {searchKey: params.searchKey}
  })
}

//根据ID查询用户
export function findUserById(params) {
  return request({
    url: api.findUserById + '/' + params.userId,
    method: 'get',
  })
}

export function update(data) {
  return request({
    url: api.update,
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}



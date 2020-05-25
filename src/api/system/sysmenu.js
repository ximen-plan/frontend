import request from '@/utils/request'

const api = {
  list: '/system/sysMenu/list',
  add: '/system/sysMenu/add',
  del: '/system/sysMenu/del',
  menuAndButton: '/system/sysMenu/menuAndButton',
  generateRoute: '/system/sysUser/generateRoute'
}

//list
export function list(params) {
  return request({
    url: api.list,
    method: 'get',
    params
  })
}

//获取路由权限
export function generateRoute(params) {
  return request({
    url: api.generateRoute + '/' + params.userId,
    method: 'get',
  })
}

//添加
export function add(data) {
  return request({
    url: api.add,
    method: 'post',
    data
  })
}

//删除
export function del({id}) {
  return request({
    url: api.del + '/' + id,
    method: 'delete',
  })
}

//菜单和按钮权限
export function menuAndButton() {
  return request({
    url: api.menuAndButton,
    method: 'get',
  })
}

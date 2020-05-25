import request from '@/utils/request'

const api = {
  findAllRoles: '/system/sysRole/findAllRoles',
  page: '/system/sysRole/page',
  update: '/system/sysRole/update'
}

//page
export function page(params) {
  return request({
    url: api.page + '/' + params.pageNumber + '/' + params.pageSize,
    method: 'get',
  })
}

//查询所有角色
export function findAllRoles() {
  return request({
    url: api.findAllRoles,
    method: 'get',
  })
}

//更新
export function update(data) {
  return request({
    url: api.update,
    method: 'put',
    data
  })
}

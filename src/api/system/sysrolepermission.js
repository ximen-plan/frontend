import request from '@/utils/request'

const api = {
  findPermissionIdsByRoleIdExcludeExistChild: '/system/sysRolePermission/findPermissionIdsByRoleIdExcludeExistChild',
}


//菜单和按钮权限
export function findPermissionIdsByRoleIdExcludeExistChild({roleId}) {
  return request({
    url: api.findPermissionIdsByRoleIdExcludeExistChild + '/' + roleId,
    method: 'get',
  })
}



import request from '@/utils/request'

const api = {
  findRoleIdsByUserId: '/system/sysUserRole/findRoleIdsByUserId'
}

//获取用户信息
export function findRoleIdsByUserId(params) {
  return request({
    url: api.findRoleIdsByUserId + '/' + params.userId,
    method: 'get',
  })
}

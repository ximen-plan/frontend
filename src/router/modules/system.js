
const systemRouter = {
    path: '/system',
    component: () => import('@/layout'),
    alwaysShow: true,
    redirect: '/system/user',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'system'
  },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/pages/UserManage'),
        name: '用户管理',
        meta: { title: '用户管理',permission: 'user:page' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/pages/RoleManage'),
        name: '角色管理',
        meta: { title: '角色管理',permission: 'role:page' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/pages/MenuManage'),
        name: '菜单管理',
        meta: { title: '菜单管理',permission: 'menu:page' }
      },
      {
        path: 'hello',
        component: () => import('@/views/system/pages/Hello'),
        name: '菜单管理',
        meta: { title: '11管理',permission: 'menu:page' }
      }
    ]
}

export default systemRouter;

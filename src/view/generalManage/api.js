import request from '@/assets/utils/request'

// ---------------------------------------------------用户-------------------------------------------------------------

// 新增用户
export function userAdd(data) {
  return request[2]({
    url: '/User',
    method: 'post',
    data
  })
}

// 批量删除用户
export function userDelete() {
  return request[2]({
    url: '/User/' + data,
    method: 'delete'
  })
}

// 更新用户
export function userEdit(data) {
  return request[2]({
    url: '/User',
    method: 'put',
    data
  })
}

// 获取用户列表
export function getUserList(params) {
  return request[2]({
    url: '/User',
    method: 'get',
    params
  })
}

// 获取在线用户列表
export function getOnlineUserList(data) {
  return request[2]({
    url: '/User/getOnlineAdminList',
    method: 'post',
    data
  })
}

// 重置用户密码
export function restPwd(data) {
  return request[2]({
    url: '/User/restPwd',
    method: 'post',
    data
  })
}

// ---------------------------------------------------部门-------------------------------------------------------------

// 新增或修改部门
export function addOrEditDept(data) {
  return request[2]({
    url: '/Dept',
    method: 'post',
    data
  })
}

// 删除部门
export function deleteDept(id) {
  return request[2]({
    url: '/Dept?id=' + id,
    method: 'delete'
  })
}

// 获取部门信息
export function getDeptDetail(id) {
  return request[2]({
    url: '/Dept?id=' + id,
    method: 'get'
  })
}

// 获取部门列表
export function getDeptList(data) {
  return request[2]({
    url: '/Dept',
    method: 'post',
    data
  })
}

// 获取部门树
export function getDeptTree() {
  return request[2]({
    url: '/Dept/tree',
    method: 'get'
  })
}
// ---------------------------------------------------角色-------------------------------------------------------------

// 新增或修改角色
export function addOrEditRole(data) {
  return request[2]({
    url: '/Role',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(params) {
  return request[2]({
    url: '/Role?' + params,
    method: 'delete'
  })
}

// 获取角色信息e
export function getRoleById(params) {
  return request[2]({
    url: '/Role',
    method: 'get',
    params
  })
}

// 获取角色列表
export function getRoleList(params) {
  return request[2]({
    url: '/Role',
    method: 'get',
    params
  })
}

// 设置角色菜单权限
export function updateRoleMenus(params) {
  return request[2]({
    url: '/role/updateMenus',
    method: 'get',
    params
  })
}

// ---------------------------------------------------菜单-------------------------------------------------------------

// 增加菜单
export function addMenu(data) {
  return request[2]({
    url: '/CategoryMenu',
    method: 'post',
    data
  })
}

// 删除菜单
export function categoryMenudelete(data) {
  return request[2]({
    url: '/CategoryMenu',
    method: 'delete',
    data
  })
}

// 编辑菜单
export function categoryMenuEdit(data) {
  return request[2]({
    url: '/CategoryMenu',
    method: 'put',
    data
  })
}

// 获取所有菜单列表
export function getAllMenu(params) {
  return request[2]({
    url: '/categoryMenu/getAll',
    method: 'get',
    params
  })
}

// 获取所有二级菜单-按钮列表
export function getButtonAll(params) {
  return request[2]({
    url: '/categoryMenu/getButtonAll',
    method: 'get',
    params
  })
}

// 获取菜单列表
export function getList(params) {
  return request[2]({
    url: '/CategoryMenu',
    method: 'get',
    params
  })
}

// 获取菜单树
export function getTree(params) {
  return request[2]({
    url: '/CategoryMenu/tree',
    method: 'get',
    params
  })
}

// 置顶菜单
export function stickMenu(data) {
  return request[2]({
    url: '/categoryMenu/stick',
    method: 'post',
    data
  })
}

// -------------------------------------字典管理-------------------------------------------

// 字典分类修改
export function DbDictEdit(data) {
    return request[2]({
        url: '/DbDict',
        method: 'put',
        data
    })
}

// 字典分类list
export function DbDictList() {
    return request[2]({
        url: '/DbDict',
        method: 'get',
        params: {
            current: 1,
            size: 10000
        }
    })
}

// 字典分类add
export function DbDictAdd(data) {
    return request[2]({
        url: '/DbDict',
        method: 'post',
        data
    })
}

// 字典分类delete
export function DbDictDelete(id) {
    return request[2]({
        url: '/DbDict/' + id,
        method: 'delete'
    })
}

// 字典分类树
export function DbDictTree() {
    return request[2]({
        url: '/DbDict/tree',
        method: 'get'
    })
}

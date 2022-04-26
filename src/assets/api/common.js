import request from '@/assets/utils/request'

// 退出登录
export function logout() {
    return request[0]({
        url: '/auth/logout',
        method: 'post'
    })
}

// 登录
export function login(params) {
    return request[0]({
        url: '/auth/login',
        method: 'get',
        params
    })
}

// 强退用户
export function userFoeceLogout(data) {
    return request[0]({
        url: '/User​/forceLogout',
        method: 'post',
        data
    })
}

// 获取当前用户的菜单
export function getMenu() {
    return request[0]({
        url: '/auth/getMenu',
        method: 'get'
    })
}

// 获取当前用户的菜单
export function getMenuTree() {
    return request[0]({
        url: '/auth/getMenuTree',
        method: 'get'
    })
}

// 获取当前用户的菜单
export function getUserInfo(params) {
    return request[0]({
        url: '/auth/info',
        method: 'get',
        params
    })
}
